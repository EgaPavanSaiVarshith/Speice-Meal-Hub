'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { restaurants } from '@/lib/restaurants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
        />
      ))}
      <span className="ml-1 font-bold text-sm">{rating.toFixed(1)}</span>
    </div>
  );
}

function RestaurantSkeleton() {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      {[1, 2, 3].map(i => (
        <Card key={i} className="overflow-hidden flex flex-col md:flex-row h-auto md:h-48">
          <Skeleton className="w-full md:w-48 h-48" />
          <div className="flex-grow p-6 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function RestaurantsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectRestaurant = (restaurantId: string) => {
    router.push(`/menu?restaurantId=${restaurantId}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">🏪 Our Partners</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Choose a Restaurant</h1>
        <p className="text-lg text-muted-foreground mt-2">Select a location to explore its menu and place an order.</p>
      </header>

      {isLoading ? (
        <RestaurantSkeleton />
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8">
          {restaurants.map((restaurant, index) => {
            const image = PlaceHolderImages.find(p => p.id === restaurant.imageId);
            return (
              <Card
                key={restaurant.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col md:flex-row group"
              >
                <div className="relative w-full md:w-48 h-48 bg-muted shrink-0 overflow-hidden">
                  {image ? (
                    <img
                      src={image.imageUrl}
                      alt={image.description}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400';
                        (e.target as HTMLImageElement).onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10">🏪</div>
                  )}
                </div>
                <div className="flex-grow flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{restaurant.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          {restaurant.location}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={restaurant.rating >= 4.5 ? 'default' : 'secondary'}
                        className="text-sm font-bold px-3 py-1 shrink-0"
                      >
                        ⭐ {restaurant.rating.toFixed(1)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{restaurant.openingHours}</span>
                      </div>
                      <StarRating rating={restaurant.rating} />
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button
                      onClick={() => handleSelectRestaurant(restaurant.id)}
                      className="w-full rounded-full transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      View Menu <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
