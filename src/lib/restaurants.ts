export type Restaurant = {
  id: string;
  name: string;
  location: string;
  rating: number;
  openingHours: string;
  imageId: string;
};

export const restaurants: Restaurant[] = [
  { id: 'restaurant-1', name: 'Bawarchi', location: 'Maisammaguda', rating: 4.5, openingHours: '11:00 AM - 11:00 PM', imageId: 'restaurant-bawarchi' },
  { id: 'restaurant-2', name: 'Mehfil', location: 'Balanagar', rating: 4.8, openingHours: '12:00 PM - 12:00 AM', imageId: 'restaurant-mehfil' },
  { id: 'restaurant-3', name: 'Sampradaya', location: 'Dulapally', rating: 4.2, openingHours: '11:30 AM - 10:30 PM', imageId: 'restaurant-sampradaya' },
  { id: 'restaurant-4', name: 'Raghavendra Hotels', location: 'Kompally', rating: 4.6, openingHours: '7:00 AM - 10:00 PM', imageId: 'restaurant-raghavendra' },
  { id: 'restaurant-5', name: 'Pizza Hut', location: 'Balanagar', rating: 4.4, openingHours: '10:00 AM - 11:00 PM', imageId: 'restaurant-pizzahut' },
  { id: 'restaurant-6', name: 'Dominos', location: 'Kukatpally', rating: 4.3, openingHours: '10:00 AM - 1:00 AM', imageId: 'restaurant-dominos' },
];
