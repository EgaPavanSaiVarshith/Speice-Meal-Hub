'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { menuItems, menuCategories } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import OrderCustomizationDialog from '@/components/order-customization-dialog';
import { restaurants } from '@/lib/restaurants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AlertTriangle, Search } from 'lucide-react';

function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-xl border bg-card">
          <Skeleton className="w-full h-48" />
          <div className="p-6 space-y-3 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="p-6 pt-0 flex justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [restaurantItems, setRestaurantItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const restaurant = restaurants.find(r => r.id === restaurantId);

  useEffect(() => {
    setIsLoading(true);
    if (restaurantId) {
      const items = menuItems.filter(item => item.restaurantIds.includes(restaurantId));
      setRestaurantItems(items);
    }
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [restaurantId]);

  if (!restaurantId || !restaurant) {
    return (
      <div className="container mx-auto py-24 px-4 md:px-6 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Restaurant Selected</h1>
        <p className="text-muted-foreground mb-6">Please select a restaurant to view the menu.</p>
        <Button onClick={() => router.push('/restaurants')} className="rounded-full px-8">Choose a Restaurant</Button>
      </div>
    );
  }

  const categoryFilteredItems = activeCategory === 'All'
    ? restaurantItems
    : restaurantItems.filter(item => item.category === activeCategory);

  const filteredItems = categoryFilteredItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableCategories = ['All', ...menuCategories.filter(cat => restaurantItems.some(item => item.category === cat))];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Menu for {restaurant.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">Explore a world of flavors, crafted with love and the finest spices.</p>
        <Button variant="link" onClick={() => router.push('/restaurants')} className="mt-1">
          ← Change Restaurant
        </Button>
      </header>

      <div className="mb-8 max-w-md mx-auto relative">
        <Input
          type="text"
          placeholder="Search for a dish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-full"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {availableCategories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <MenuSkeleton />
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => {
            const isSoldOut = item.status === 'sold-out';
            const image = PlaceHolderImages.find(p => p.id === item.imageId);
            return (
              <Card
                key={item.id}
                className={`flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isSoldOut ? 'opacity-60' : ''}`}
              >
                <div className="relative w-full h-48 bg-muted">
                  {image ? (
                    <img
                      src={image.imageUrl}
                      alt={image.description}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10">🍛</div>
                  )}
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-base px-4 py-1">Sold Out</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-5 flex-grow">
                  <CardTitle className="font-headline text-lg mb-1">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between items-center">
                  <p className={`text-lg font-bold ${isSoldOut ? 'text-muted-foreground' : 'text-primary'}`}>
                    ₹{item.price}
                  </p>
                  <Button onClick={() => setSelectedItem(item)} disabled={isSoldOut} size="sm" className="rounded-full">
                    Customize
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl text-muted-foreground">No dishes found matching &quot;{searchQuery}&quot;.</p>
          <Button variant="link" onClick={() => setSearchQuery('')}>Clear search</Button>
        </div>
      )}

      {selectedItem && (
        <OrderCustomizationDialog
          item={selectedItem}
          restaurantId={restaurantId as string}
          isOpen={!!selectedItem}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedItem(null);
            }
          }}
        />
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <MenuSkeleton />
      </div>
    }>
      <MenuPageContent />
    </Suspense>
  )
}
