'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { offers } from '@/lib/offers';
import { restaurants } from '@/lib/restaurants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tag, ArrowRight } from 'lucide-react';

export default function OffersPage() {
  const router = useRouter();

  const handleOrderNow = (restaurantId: string) => {
    router.push(`/menu?restaurantId=${restaurantId}`);
  };

  const getRestaurantName = (restaurantId: string) => {
    return restaurants.find(r => r.id === restaurantId)?.name;
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">🎉 Limited Time</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Special Offers</h1>
        <p className="text-lg text-muted-foreground mt-2">Delicious combos at unbeatable prices. Grab them before they&apos;re gone!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map(offer => {
          const image = PlaceHolderImages.find(p => p.id === offer.imageId);
          const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
          return (
            <Card key={offer.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="relative w-full h-52 bg-muted">
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10">🎁</div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
                    {discount}% OFF
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <Badge variant="secondary" className="text-xs">Combo Deal</Badge>
                </div>
                <CardTitle className="font-headline text-xl mt-1">{offer.name}</CardTitle>
                <CardDescription>{offer.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="font-semibold text-sm mb-2">Available at:</p>
                <div className="flex flex-wrap gap-2">
                  {offer.restaurantIds.map(id => (
                    <Badge key={id} variant="outline">{getRestaurantName(id)}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-between items-center mt-auto">
                <div>
                  <p className="text-xl font-bold text-primary">₹{offer.price}</p>
                  <p className="text-sm text-muted-foreground line-through">₹{offer.originalPrice}</p>
                </div>
                <Button onClick={() => handleOrderNow(offer.restaurantIds[0])} className="rounded-full">
                  Order Now <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
