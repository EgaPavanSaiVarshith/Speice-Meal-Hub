'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import OrderStatusTracker from '@/components/order-status-tracker';
import { Search, Package } from 'lucide-react';

function TrackOrderSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center gap-2 w-1/4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [submittedOrderId, setSubmittedOrderId] = useState(initialOrderId);

  useEffect(() => {
    setSubmittedOrderId(initialOrderId);
    setOrderId(initialOrderId);
  }, [initialOrderId]);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSubmittedOrderId(orderId.trim());
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
          <Package className="h-4 w-4 inline mr-1" />Live Tracking
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Track Your Order</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Enter your order ID to get real-time delivery updates.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>
            Your order ID was shown after payment — it looks like <span className="font-mono text-primary font-semibold">SPICE-12345</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackOrder} className="flex gap-2 mb-8">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="e.g., SPICE-12345"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                className="pl-10 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button type="submit" className="rounded-full px-6">
              Track
            </Button>
          </form>

          {submittedOrderId ? (
            <Suspense fallback={<TrackOrderSkeleton />}>
              <OrderStatusTracker orderId={submittedOrderId} />
            </Suspense>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-4xl mb-3">📦</p>
              <p>Enter your order ID above to track your delivery.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <TrackOrderSkeleton />
          </CardContent>
        </Card>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}