'use client';

import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, CookingPot, Bike, PartyPopper, Ban, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { OrderStatus } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface OrderStatusTrackerProps {
  orderId: string;
}

const statuses: OrderStatus[] = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

const statusMessages: Record<string, string> = {
  'Order Placed': 'We have received your order! Restaurant is confirming...',
  'Preparing': 'Chef is preparing your delicious meal with extra care.',
  'Out for Delivery': 'Your order is picked up! Our rider is on the way.',
  'Delivered': 'Order delivered. Enjoy your meal and don\'t forget to rate us!',
  'Cancelled': 'This order has been cancelled.',
};

const statusIcons = {
  'Order Placed': CheckCircle2,
  'Preparing': CookingPot,
  'Out for Delivery': Bike,
  'Delivered': PartyPopper,
  'Cancelled': Ban,
};

function FeedbackForm({ orderId }: { orderId: string }) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ orderId, rating, comment });
    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for helping us improve.',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="text-center p-8 bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold">Thank You!</h3>
            <p>Your feedback has been received.</p>
        </div>
    );
  }

  return (
    <Card className="mt-8 bg-secondary border-primary">
      <CardHeader>
        <CardTitle>Rate Your Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea 
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" disabled={rating === 0}>Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function OrderStatusTracker({ orderId }: OrderStatusTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Order Placed');
  const [progress, setProgress] = useState(12.5);
  const [otp, setOtp] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a random 4-digit OTP for this order
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(newOtp);

    // Initial check for order acceptance
    const checkOrderAcceptance = () => {
      const savedOrders = JSON.parse(localStorage.getItem('spicemeal-orders') || '[]');
      const currentOrder = savedOrders.find((o: any) => o.orderId === orderId);
      
      if (currentOrder?.status === 'ACCEPTED') {
        startTrackingProcess();
        return true;
      } else if (currentOrder?.status === 'REJECTED') {
        setCurrentStatus('Cancelled');
        setProgress(0);
        return true;
      }
      return false;
    };

    const startTrackingProcess = () => {
      // Clear any existing timeouts
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];

      setCurrentStatus('Order Placed');
      setProgress(12.5);
      setIsOtpVerified(false);
      setUserEnteredOtp('');

      // Step 1: Placed to Preparing
      const t1 = setTimeout(() => {
        setCurrentStatus('Preparing');
        setProgress(37.5);
        toast({ title: 'Order Update', description: statusMessages['Preparing'] });
      }, 8000);

      // Step 2: Preparing to Out for Delivery
      const t2 = setTimeout(() => {
        setCurrentStatus('Out for Delivery');
        setProgress(62.5);
        toast({ 
          title: 'Rider is arriving!', 
          description: 'Your rider is nearby. Please have your delivery code ready.',
        });
      }, 16000);

      timeoutIds.current = [t1, t2];
    };

    if (!checkOrderAcceptance()) {
      // Set initial state to waiting
      setCurrentStatus('Order Placed');
      setProgress(12.5);
      
      // Check every 2 seconds
      const acceptanceInterval = setInterval(() => {
        if (checkOrderAcceptance()) {
          clearInterval(acceptanceInterval);
        }
      }, 2000);
      
      return () => clearInterval(acceptanceInterval);
    }

    return () => timeoutIds.current.forEach(clearTimeout);
  }, [orderId]);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEnteredOtp === otp) {
      setIsOtpVerified(true);
      setCurrentStatus('Delivered');
      setProgress(100);
      toast({
        title: 'Delivery Confirmed!',
        description: 'Enjoy your delicious SpiceMeal!',
      });
    } else {
      toast({
        title: 'Invalid Code',
        description: 'The code you entered does not match. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleCancelOrder = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setCurrentStatus('Cancelled');
    setProgress(0);
    toast({
        title: 'Order Cancelled',
        description: `Your order #${orderId} has been cancelled.`,
        variant: 'destructive'
    });
  };

  if (currentStatus === 'Cancelled') {
    return (
        <div className="text-center text-destructive flex flex-col items-center gap-4 animate-in fade-in zoom-in">
            <Ban className="w-16 h-16" />
            <h3 className="text-xl font-semibold">Order Cancelled</h3>
            <p>Order #{orderId} has been successfully cancelled.</p>
        </div>
    );
  }

  const currentIndex = statuses.indexOf(currentStatus);
  const isDelivered = currentStatus === 'Delivered';
  const isOutForDelivery = currentStatus === 'Out for Delivery';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-muted-foreground">Order #{orderId}</h3>
        <p className="text-3xl font-bold text-primary tracking-tight">{currentStatus}</p>
        <p className="text-sm text-muted-foreground italic px-4">
          {statusMessages[currentStatus]}
        </p>
      </div>

      <Progress value={progress} className="h-3 shadow-inner bg-secondary" />
      
      <div className="flex justify-between relative px-2">
        {statuses.map((status, index) => {
          const Icon = statusIcons[status];
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={status} className="flex flex-col items-center text-center w-1/4">
              <div className={`rounded-full p-4 transition-all duration-500 transform ${
                isCurrent ? 'scale-125 ring-4 ring-primary/20 bg-primary text-primary-foreground shadow-lg' : 
                isActive ? 'bg-primary/80 text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className={`mt-4 font-bold text-xs uppercase tracking-tighter ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {status}
              </p>
            </div>
          );
        })}
      </div>

      {isOutForDelivery && (
        <Card className="border-2 border-primary bg-primary/5 shadow-xl animate-bounce-subtle">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-primary flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Delivery Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background border-2 border-dashed border-primary rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-widest">Your Secret Delivery Code</p>
              <p className="text-5xl font-mono font-black text-primary tracking-[0.5em] pl-[0.5em]">{otp}</p>
            </div>
            
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-center text-sm font-medium">
                Please enter the code above to confirm delivery receipt:
              </p>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  maxLength={4}
                  placeholder="Enter 4-digit code" 
                  value={userEnteredOtp}
                  onChange={(e) => setUserEnteredOtp(e.target.value)}
                  className="text-center text-xl font-bold tracking-widest h-12 border-2"
                />
                <Button type="submit" className="h-12 px-8 font-bold">
                  Confirm
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {!isDelivered && !isOutForDelivery && (
        <div className="text-center pt-4">
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-destructive">Cancel Order</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently cancel your order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go Back</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelOrder} className="bg-destructive text-destructive-foreground">Confirm Cancellation</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      )}

      {isDelivered && (
        <div className="animate-in slide-in-from-bottom duration-1000">
          <FeedbackForm orderId={orderId} />
        </div>
      )}
    </div>
  );
}
