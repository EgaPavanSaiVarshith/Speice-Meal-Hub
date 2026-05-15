export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Courses' | 'Pizzas' | 'Tiffins' | 'Meals' | 'Desserts' | 'Beverages' | 'Burgers' | 'Snacks';
  status: 'available' | 'sold-out';
  imageId: string;
  restaurantIds: string[];
};

export type Offer = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  restaurantIds: string[];
  itemIds: string[];
  imageId: string;
};

export type OrderStatus = 'Order Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
