import { Bike, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DeliveryPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">🚴 Fast & Reliable</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Delivery Services</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Get your favorite spicy meals delivered hot and fresh, right to your doorstep.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="mx-auto bg-primary/15 text-primary rounded-full p-5 w-fit">
              <MapPin className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline mt-4">Delivery Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We deliver across Hyderabad — including Kompally, Maisammaguda, Balanagar, Dulapally, and Kukatpally.</p>
            <p className="mt-3 text-sm text-primary font-medium">Enter your address at checkout to confirm availability.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/30">
          <CardHeader>
            <div className="mx-auto bg-primary/15 text-primary rounded-full p-5 w-fit">
              <IndianRupee className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline mt-4">Delivery Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Orders under ₹500: <span className="font-bold">₹40</span></p>
            <p>Orders ₹500 and above: <span className="font-bold text-primary text-lg">FREE 🎉</span></p>
            <p className="mt-3 text-sm text-muted-foreground">Fees are calculated automatically at checkout.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="mx-auto bg-primary/15 text-primary rounded-full p-5 w-fit">
              <Clock className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline mt-4">Estimated Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Typical delivery time is <span className="font-bold text-foreground">30–45 minutes</span>.</p>
            <p className="mt-2 text-muted-foreground">During peak hours (6–9 PM), it may take up to <span className="font-bold text-foreground">60 minutes</span>.</p>
            <p className="mt-3 text-sm text-primary font-medium">Track your order in real-time!</p>
          </CardContent>
        </Card>
      </div>

      {/* Safety Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-4">Your Safety is Our Priority</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            In our commitment to your health and safety, we have implemented strict hygiene protocols for all our delivery partners and partner restaurants.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Contactless delivery available upon request</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Daily temperature checks for delivery partners</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Surgical-grade masks and sanitization mandatory</span>
            </li>
          </ul>
        </div>
        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Bike className="text-primary" /> Delivery FAQ
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold mb-1">What if my order is late?</p>
              <p className="text-muted-foreground">If your order exceeds the estimated time by more than 15 mins, please contact our support.</p>
            </div>
            <div>
              <p className="font-bold mb-1">Can I change the delivery address?</p>
              <p className="text-muted-foreground">Address changes are possible only until the restaurant accepts the order.</p>
            </div>
            <div>
              <p className="font-bold mb-1">How can I track my order?</p>
              <p className="text-muted-foreground">Use the "Track Order" link in the menu and enter your order ID.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Steps */}
      <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8">Ready to eat?</h2>
        <Button asChild className="rounded-full px-8" size="lg">
          <Link href="/restaurants">Start Your Order</Link>
        </Button>
      </div>
    </div>
  );
}
