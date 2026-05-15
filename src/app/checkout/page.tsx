'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Wallet, HandCoins, ShieldCheck, MapPin, Phone, User, ChevronRight, CheckCircle2 } from 'lucide-react';

const deliverySchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number.'),
  address: z.string().min(5, 'Detailed address is required.'),
  landmark: z.string().optional(),
});

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
      <Skeleton className="h-80 w-full" />
    </div>
  );
}

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('');

  const itemId = searchParams.get('itemId');
  const price = searchParams.get('price');
  const itemName = searchParams.get('itemName');
  const initialAddress = searchParams.get('address') || '';
  const imageId = searchParams.get('imageId');

  const deliveryForm = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { fullName: '', phoneNumber: '', address: initialAddress, landmark: '' },
  });

  if (!itemId || !price || !itemName) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-2">No Item Selected</h2>
        <Button onClick={() => router.push('/restaurants')} className="rounded-full px-8 mt-4">
          Browse Menu
        </Button>
      </div>
    );
  }

  const itemPrice = Number(price);
  const taxAmount = itemPrice * 0.1;
  const deliveryCharge = itemPrice >= 500 ? 0 : 40;
  const totalAmount = (itemPrice + taxAmount + deliveryCharge).toFixed(2);

  const onDeliverySubmit = (values: z.infer<typeof deliverySchema>) => {
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast({ title: 'Select Payment', description: 'Please choose a payment method.', variant: 'destructive' });
      return;
    }
    const orderId = `SPICE-${Math.floor(Math.random() * 90000) + 10000}`;
    
    // Save order to mock database for admin to see
    const orderData = {
      orderId,
      itemName,
      totalAmount,
      customerName: deliveryForm.getValues('fullName'),
      customerPhone: deliveryForm.getValues('phoneNumber'),
      address: deliveryForm.getValues('address'),
      status: 'PENDING',
      timestamp: new Date().toISOString(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('spicemeal-orders') || '[]');
    localStorage.setItem('spicemeal-orders', JSON.stringify([...existingOrders, orderData]));

    toast({
      title: '🎉 Order Received!',
      description: `Waiting for restaurant to accept your order #${orderId}.`,
    });
    router.push(`/track-order?orderId=${orderId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Form Section */}
      <div className="md:col-span-2 space-y-6">
        
        {/* Step 1: Delivery Address */}
        <Card className={`transition-all duration-500 shadow-md ${step === 1 ? 'border-primary ring-1 ring-primary' : 'opacity-70'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>1</div>
              <CardTitle className="text-xl">Delivery Details</CardTitle>
            </div>
            {step === 2 && (
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-primary font-bold">Change</Button>
            )}
          </CardHeader>
          {step === 1 && (
            <CardContent className="pt-4">
              <Form {...deliveryForm}>
                <form onSubmit={deliveryForm.handleSubmit(onDeliverySubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={deliveryForm.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Enter your name" className="pl-10 h-11" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={deliveryForm.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="10-digit mobile number" className="pl-10 h-11" maxLength={10} {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={deliveryForm.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Flat / House No / Street" className="pl-10 h-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={deliveryForm.control} name="landmark" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nearby location" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full rounded-full h-12 text-lg font-bold shadow-lg mt-2">
                    Proceed to Payment <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          )}
          {step === 2 && (
            <CardContent className="py-4 bg-muted/20">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold">{deliveryForm.getValues('fullName')} • {deliveryForm.getValues('phoneNumber')}</p>
                  <p className="text-sm text-muted-foreground leading-tight mt-1">{deliveryForm.getValues('address')}</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Step 2: Payment Options */}
        <Card className={`transition-all duration-500 shadow-md ${step === 2 ? 'border-primary ring-1 ring-primary' : 'opacity-70 pointer-events-none'}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-muted'}`}>2</div>
              <CardTitle className="text-xl">Payment Method</CardTitle>
            </div>
          </CardHeader>
          {step === 2 && (
            <CardContent className="space-y-3 pt-4">
              {[
                { id: 'upi', name: 'UPI (GPay / PhonePe / Paytm)', icon: <Wallet className="h-5 w-5" />, desc: 'Instant & Secure' },
                { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="h-5 w-5" />, desc: 'Visa, Mastercard, RuPay' },
                { id: 'cod', name: 'Cash on Delivery', icon: <HandCoins className="h-5 w-5" />, desc: 'Pay at your doorstep' },
              ].map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-full ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                      {method.icon}
                    </div>
                    <div>
                      <p className="font-bold">{method.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{method.desc}</p>
                    </div>
                  </div>
                  {paymentMethod === method.id && <CheckCircle2 className="h-6 w-6 text-primary" />}
                </div>
              ))}
              
              <div className="pt-6">
                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full rounded-full h-14 text-xl font-black shadow-xl"
                  disabled={!paymentMethod}
                >
                  Place Order • ₹{totalAmount}
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-green-600" /> Secure Encryption
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Sidebar: Bill Summary */}
      <div className="space-y-6">
        <Card className="sticky top-24 shadow-xl border-none overflow-hidden">
          <div className="bg-primary h-2 w-full" />
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-black tracking-tight">Bill Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 bg-muted/40 p-3 rounded-xl border border-border/50">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-sm">
                {(() => {
                  const image = PlaceHolderImages.find(p => p.id === imageId);
                  return image ? (
                    <Image src={image.imageUrl} alt={image.description} fill className="object-cover" />
                  ) : <div className="bg-primary/20 w-full h-full flex items-center justify-center">🍽️</div>;
                })()}
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black truncate">{itemName}</p>
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">Qty: 1</p>
              </div>
              <p className="font-black text-primary">₹{itemPrice}</p>
            </div>

            <div className="space-y-2.5 pt-2 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Total</span>
                <span className="font-bold">₹{itemPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST & Packaging</span>
                <span className="font-bold">₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                {deliveryCharge === 0 
                  ? <span className="text-green-600 font-black">FREE</span> 
                  : <span className="font-bold">₹{deliveryCharge.toFixed(2)}</span>}
              </div>
            </div>
            
            <div className="pt-4 border-t-2 border-dashed border-muted-foreground/20 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase">Grand Total</p>
                <p className="text-2xl font-black tracking-tighter leading-none">₹{totalAmount}</p>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-black text-primary border border-primary/20">
                SAVING ₹{deliveryCharge > 0 ? deliveryCharge : 40}
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-xl border border-green-100 mt-2 flex gap-3 items-center">
              <div className="bg-green-600 text-white p-1 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <p className="text-[11px] font-bold text-green-800 leading-tight">
                This order qualifies for <span className="underline">FREE</span> delivery!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-muted/20 min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-8 flex items-end gap-2">
          <h1 className="text-4xl font-black font-headline tracking-tighter">Checkout</h1>
          <div className="h-1.5 w-1.5 bg-primary rounded-full mb-2" />
        </header>
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutPageContent />
        </Suspense>
      </div>
    </div>
  );
}
