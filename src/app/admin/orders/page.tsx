'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Clock, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

interface Order {
  orderId: string;
  itemName: string;
  totalAmount: string;
  customerName: string;
  customerPhone: string;
  address: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  timestamp: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('spicemeal-orders') || '[]');
      setOrders(savedOrders.sort((a: Order, b: Order) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    };

    loadOrders();
    const interval = setInterval(loadOrders, 3000); // Refresh every 3s
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: 'ACCEPTED' | 'REJECTED') => {
    const updatedOrders = orders.map(order => 
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('spicemeal-orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);

    toast({
      title: newStatus === 'ACCEPTED' ? 'Order Accepted' : 'Order Rejected',
      description: `Order #${orderId} status has been updated.`,
      variant: newStatus === 'REJECTED' ? 'destructive' : 'default',
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black font-headline tracking-tighter">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Manage incoming orders and delivery status.</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary px-4 py-1 text-sm font-bold">
          <Clock className="h-4 w-4 mr-2 animate-pulse" /> Live Kitchen Feed
        </Badge>
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-bold text-muted-foreground">No orders received yet</h3>
          <p className="text-muted-foreground">Wait for customers to place orders from the main site.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <Card key={order.orderId} className={`overflow-hidden border-2 transition-all ${
              order.status === 'PENDING' ? 'border-primary ring-1 ring-primary shadow-lg' : 'border-border opacity-80'
            }`}>
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Order ID</span>
                      <h3 className="text-2xl font-black font-mono tracking-tighter">{order.orderId}</h3>
                    </div>
                    <Badge className={`${
                      order.status === 'PENDING' ? 'bg-orange-500' : 
                      order.status === 'ACCEPTED' ? 'bg-green-600' : 'bg-destructive'
                    } text-white font-bold`}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        <span className="font-bold">{order.itemName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{order.customerPhone}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span>{order.address}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l w-full md:w-64">
                  <div className="text-center mb-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</p>
                    <p className="text-2xl font-black tracking-tighter">₹{order.totalAmount}</p>
                  </div>
                  {order.status === 'PENDING' ? (
                    <>
                      <Button 
                        onClick={() => updateOrderStatus(order.orderId, 'ACCEPTED')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                      >
                        <Check className="mr-2 h-4 w-4" /> Accept Order
                      </Button>
                      <Button 
                        onClick={() => updateOrderStatus(order.orderId, 'REJECTED')}
                        variant="destructive"
                        className="w-full font-bold"
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
                      </Button>
                    </>
                  ) : (
                    <p className="text-center text-sm font-bold text-muted-foreground italic py-4">
                      {order.status === 'ACCEPTED' ? 'Processed ✓' : 'Rejected ✗'}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
