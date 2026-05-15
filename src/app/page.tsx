'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Clock, ShieldCheck, Zap, Utensils, Pizza, Coffee, Beef } from "lucide-react";
import { menuItems } from "@/lib/data";
import type { MenuItem } from '@/lib/types';
import OrderCustomizationDialog from '@/components/order-customization-dialog';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const featuredDishes = menuItems.slice(0, 3);
  const topPicks = menuItems.slice(3, 8);
  
  const heroImage = PlaceHolderImages.find(p => p.id === 'spicy-food');

  const categories = [
    { name: "Biryani", icon: <Utensils className="h-6 w-6" />, color: "bg-orange-100 text-orange-600" },
    { name: "Pizza", icon: <Pizza className="h-6 w-6" />, color: "bg-red-100 text-red-600" },
    { name: "Curries", icon: <Beef className="h-6 w-6" />, color: "bg-yellow-100 text-yellow-600" },
    { name: "Desserts", icon: <Coffee className="h-6 w-6" />, color: "bg-pink-100 text-pink-600" },
    { name: "Snacks", icon: <Zap className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
  ];

  const whyUs = [
    { icon: <Star className="h-8 w-8 text-primary" />, title: "Top Rated", desc: "All our partner restaurants are rated 4.2+ by thousands of happy customers." },
    { icon: <Clock className="h-8 w-8 text-primary" />, title: "Fast Delivery", desc: "Hot meals at your door in 30–45 minutes. Real-time tracking included." },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Hygiene Assured", desc: "We only partner with restaurants that meet our strict hygiene standards." },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 py-12 px-4 md:px-6">
        <Skeleton className="h-[60vh] w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover -z-20 scale-105 animate-slow-zoom"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 -z-10" />
        <div className="container px-4 md:px-6">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
            🔥 Authentic Indian Flavors
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold font-headline drop-shadow-2xl mb-6 leading-tight">
            Order Your Favorite<br />Spicy Meals
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 font-medium">
            From the best kitchens in Hyderabad, delivered hot to your doorstep in 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
              <Link href="/restaurants">
                Order Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold text-lg px-10 py-7 rounded-full transition-all hover:scale-105">
              <Link href="/offers">
                Special Offers
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 bg-background border-b overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold font-headline">Popular Categories</h2>
              <p className="text-muted-foreground text-sm">Explore by your favorite cuisine</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/restaurants"
                className="flex flex-col items-center gap-3 min-w-[100px] group transition-transform hover:-translate-y-1"
              >
                <div className={`${cat.color} p-5 rounded-2xl shadow-sm transition-all group-hover:shadow-md group-hover:scale-105`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-bold">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks Horizontal */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-headline">Top Picks For You</h2>
              <p className="text-muted-foreground">The most ordered dishes today</p>
            </div>
            <Button variant="link" asChild className="p-0">
              <Link href="/restaurants" className="font-bold text-primary">See all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {topPicks.map((item, index) => {
              const image = PlaceHolderImages.find(p => p.id === item.imageId);
              return (
                <div key={item.id} className="min-w-[280px] md:min-w-[320px]">
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all h-full flex flex-col group">
                    <div className="relative h-44 bg-muted cursor-pointer" onClick={() => setSelectedItem(item)}>
                      {image ? (
                        <img
                          src={image.imageUrl}
                          alt={image.description}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10">🍛</div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-black border-0 shadow-sm backdrop-blur-sm font-bold">
                          ⭐ {(4.2 + (index * 0.1)).toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-primary text-lg">₹{item.price}</span>
                        <Button size="sm" variant="outline" className="rounded-full px-4 h-8 text-xs font-bold" onClick={() => setSelectedItem(item)}>
                          Add +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 bg-background rounded-2xl border hover:border-primary/50 transition-colors shadow-sm">
                <div className="bg-primary/10 rounded-xl p-3 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-headline mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <OrderCustomizationDialog
          item={selectedItem}
          restaurantId={selectedItem.restaurantIds[0]}
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
