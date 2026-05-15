'use client';

import { useState } from 'react';
import { Loader2, Wand2, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { suggestOrderCustomizations } from '@/ai/flows/suggest-order-customizations';
import type { MenuItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { restaurants } from '@/lib/restaurants';
import { useRouter } from 'next/navigation';

interface OrderCustomizationDialogProps {
  item: MenuItem;
  restaurantId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderCustomizationDialog({
  item,
  restaurantId,
  isOpen,
  onOpenChange,
}: OrderCustomizationDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const isSpecialItem = item.category === 'Desserts' || item.category === 'Beverages';
  const [preference, setPreference] = useState(isSpecialItem ? 'normal' : 'medium');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [flatNo, setFlatNo] = useState('');
  const [building, setBuilding] = useState('');
  const [location, setLocation] = useState('');

  const restaurant = restaurants.find(r => r.id === restaurantId);

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    setAiSuggestions([]);
    try {
      const result = await suggestOrderCustomizations({
        order: item.name,
        dietaryRestrictions: dietaryRestrictions || 'None',
      });
      setAiSuggestions(result.suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate suggestions at this time.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (!flatNo || !building || !location) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Address',
        description: 'Please fill in all address details before proceeding.',
      });
      return;
    }

    const query = new URLSearchParams({
      itemId: item.id,
      itemName: item.name,
      price: item.price.toString(),
      imageId: item.imageId,
      restaurantId: restaurantId,
      spiceLevel: preference,
      address: `${flatNo}, ${building}, ${location}`,
      ...(dietaryRestrictions && { instructions: dietaryRestrictions }),
    }).toString();

    router.push(`/checkout?${query}`);
  };

  const spiceOptions = isSpecialItem
    ? [
        { value: 'normal', label: item.category === 'Desserts' ? 'Normal' : 'Regular' },
        { value: 'mild', label: 'Mild' },
        { value: 'cool', label: 'Extra Cool' },
      ]
    : [
        { value: 'mild', label: '🌿 Mild' },
        { value: 'medium', label: '🌶️ Medium' },
        { value: 'hot', label: '🔥 Hot' },
      ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-1">
          {/* Header */}
          <DialogHeader className="mb-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-32 h-32 bg-muted rounded-xl overflow-hidden shrink-0">
                {(() => {
                  const image = PlaceHolderImages.find(p => p.id === item.imageId);
                  return image ? (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                  );
                })()}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <DialogTitle className="font-headline text-2xl">{item.name}</DialogTitle>
                    <DialogDescription className="mt-1">{item.description}</DialogDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm shrink-0">{item.category}</Badge>
                </div>
                {restaurant && (
                  <p className="text-sm font-semibold text-muted-foreground mt-1">📍 {restaurant.name}</p>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5">
            {/* Spice / Preference Level */}
            <div className="space-y-2">
              <Label className="font-bold text-sm">
                {isSpecialItem
                  ? item.category === 'Desserts' ? 'Sweetness Level' : 'Temperature Preference'
                  : 'Spice Level'}
              </Label>
              <RadioGroup
                value={preference}
                onValueChange={setPreference}
                className="flex flex-wrap gap-3"
              >
                {spiceOptions.map(opt => (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer transition-colors ${
                      preference === opt.value
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPreference(opt.value)}
                  >
                    <RadioGroupItem value={opt.value} id={`pref-${opt.value}`} className="hidden" />
                    <Label htmlFor={`pref-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <Label className="font-bold text-sm">📦 Delivery Address</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="flatNo" className="text-xs text-muted-foreground">Flat / Room No.</Label>
                  <Input
                    id="flatNo"
                    placeholder="e.g., 4B"
                    value={flatNo}
                    onChange={e => setFlatNo(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="building" className="text-xs text-muted-foreground">Building / Society</Label>
                  <Input
                    id="building"
                    placeholder="e.g., Spice Heights"
                    value={building}
                    onChange={e => setBuilding(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="location" className="text-xs text-muted-foreground">Area / Landmark</Label>
                <Input
                  id="location"
                  placeholder="e.g., Near Kompally Bus Stand"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <Label htmlFor="restrictions" className="font-bold text-sm">Special Instructions <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Textarea
                id="restrictions"
                placeholder="e.g., no nuts, extra cilantro, less oil..."
                value={dietaryRestrictions}
                onChange={e => setDietaryRestrictions(e.target.value)}
                className="resize-none min-h-[80px]"
              />
            </div>

            {/* AI Suggestions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={handleGenerateSuggestions}
                disabled={isGenerating}
                className="w-full rounded-full"
              >
                {isGenerating
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...</>
                  : <><Wand2 className="mr-2 h-4 w-4" /> ✨ Get AI Customization Ideas</>
                }
              </Button>
              {aiSuggestions.length > 0 && (
                <div className="p-4 bg-secondary rounded-xl text-sm border border-primary/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-primary" /> AI Suggestions
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6 flex gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="button" onClick={handleProceedToCheckout} className="flex-1 rounded-full">
              Proceed to Checkout →
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
