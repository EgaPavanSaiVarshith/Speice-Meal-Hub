import type { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'appetizer-1',
    name: 'Samosa Chaat',
    description: 'Crispy samosas crushed and topped with yogurt, tamarind and mint chutneys.',
    price: 50,
    category: 'Appetizers',
    status: 'available',
    imageId: 'samosa-chaat',
    restaurantIds: ['restaurant-1', 'restaurant-2']
  },
  {
    id: 'appetizer-2',
    name: 'Paneer Tikka',
    description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
    price: 330,
    category: 'Appetizers',
    status: 'available',
    imageId: 'paneer-tikka',
    restaurantIds: ['restaurant-1', 'restaurant-3']
  },
  {
    id: 'appetizer-3',
    name: 'Vegetable Pakora',
    description: 'Mixed vegetable fritters deep-fried in a chickpea flour batter.',
    price: 250,
    category: 'Appetizers',
    status: 'sold-out',
    imageId: 'vegetable-pakora',
    restaurantIds: ['restaurant-2']
  },
  // Main Courses
  {
    id: 'main-1',
    name: 'Butter Chicken',
    description: 'Grilled chicken cooked in a smooth buttery and creamy tomato based gravy.',
    price: 250,
    category: 'Main Courses',
    status: 'available',
    imageId: 'butter-chicken',
    restaurantIds: ['restaurant-1', 'restaurant-2', 'restaurant-3']
  },
  {
    id: 'main-2',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a creamy spinach gravy.',
    price: 270,
    category: 'Main Courses',
    status: 'available',
    imageId: 'palak-paneer',
    restaurantIds: ['restaurant-1', 'restaurant-3']
  },
  {
    id: 'main-3',
    name: 'Paneer Butter Masala',
    description: 'Cubes of paneer cooked in a rich and creamy tomato-based gravy.',
    price: 350,
    category: 'Main Courses',
    status: 'available',
    imageId: 'paneer-butter-masala',
    restaurantIds: ['restaurant-2']
  },
  {
    id: 'main-4',
    name: 'Chana Masala',
    description: 'A classic chickpea curry with onions, tomatoes, and a blend of spices.',
    price: 200,
    category: 'Main Courses',
    status: 'available',
    imageId: 'chana-masala',
    restaurantIds: ['restaurant-1', 'restaurant-2']
  },
  {
    id: 'main-5',
    name: 'Butter Naan',
    description: 'Soft and fluffy Indian bread brushed with butter.',
    price: 80,
    category: 'Main Courses',
    status: 'available',
    imageId: 'butter-naan',
    restaurantIds: ['restaurant-1', 'restaurant-2', 'restaurant-3']
  },
  {
    id: 'main-6',
    name: 'Hyderabadi Chicken Biryani',
    description: 'A world-renowned dish, slow-cooked with fragrant basmati rice, tender chicken, and a blend of exotic spices.',
    price: 450,
    category: 'Main Courses',
    status: 'available',
    imageId: 'hyderabadi-chicken-biryani',
    restaurantIds: ['restaurant-1', 'restaurant-3']
  },
  {
    id: 'main-7',
    name: 'Hyderabadi Mutton Biryani',
    description: 'Succulent pieces of mutton marinated and cooked with long-grain basmati rice and traditional Hyderabadi spices.',
    price: 550,
    category: 'Main Courses',
    status: 'available',
    imageId: 'hyderabadi-mutton-biryani',
    restaurantIds: ['restaurant-2']
  },
  {
    id: 'main-8',
    name: 'Dal Makhani',
    description: 'A classic North Indian dish made with black lentils, red kidney beans, butter, and cream.',
    price: 280,
    category: 'Main Courses',
    status: 'available',
    imageId: 'dal-makhani',
    restaurantIds: ['restaurant-1', 'restaurant-2', 'restaurant-3']
  },
  {
    id: 'main-9',
    name: 'Malai Kofta',
    description: 'Fried potato and paneer balls in a rich and creamy mild gravy made with sweet onions and tomatoes.',
    price: 320,
    category: 'Main Courses',
    status: 'available',
    imageId: 'malai-kofta',
    restaurantIds: ['restaurant-2', 'restaurant-3']
  },
  // Pizzas
  {
    id: 'pizza-1',
    name: 'Pan Supreme Pizza',
    description: 'Pizza Hut Signature Pan Pizza with loaded toppings and extra cheese.',
    price: 450,
    category: 'Pizzas',
    status: 'available',
    imageId: 'pan-pizza',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Feast',
    description: 'Classic pepperoni pizza with 100% mozzarella cheese.',
    price: 390,
    category: 'Pizzas',
    status: 'available',
    imageId: 'pepperoni-pizza',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'pizza-3',
    name: 'Farmhouse Pizza',
    description: 'Dominos Classic with onion, capsicum, tomato & grilled mushroom.',
    price: 380,
    category: 'Pizzas',
    status: 'available',
    imageId: 'farmhouse-pizza',
    restaurantIds: ['restaurant-6']
  },
  {
    id: 'pizza-4',
    name: 'Veggie Paradise',
    description: 'Golden Corn, Black Olives, Capsicum & Red Paprika.',
    price: 420,
    category: 'Pizzas',
    status: 'available',
    imageId: 'supreme-pizza',
    restaurantIds: ['restaurant-6']
  },
  {
    id: 'pizza-5',
    name: 'Tandoori Paneer Pizza',
    description: 'Spiced paneer cubes with onions and green chillies on a crispy base.',
    price: 430,
    category: 'Pizzas',
    status: 'available',
    imageId: 'tandoori-paneer-pizza',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'pizza-6',
    name: 'Mexican Green Wave',
    description: 'A mexican inspired pizza with capsicum, onion, tomato and jalapeno.',
    price: 440,
    category: 'Pizzas',
    status: 'available',
    imageId: 'margherita-pizza',
    restaurantIds: ['restaurant-6']
  },
  {
    id: 'pizza-7',
    name: 'Paneer Makhani Pizza',
    description: 'Flavorful paneer in a rich makhani gravy on a thin crust.',
    price: 460,
    category: 'Pizzas',
    status: 'available',
    imageId: 'paneer-pizza',
    restaurantIds: ['restaurant-6']
  },
  // Tiffins
  {
    id: 'tiffin-1',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with sambar and chutney.',
    price: 120,
    category: 'Tiffins',
    status: 'available',
    imageId: 'idli-sambar',
    restaurantIds: ['restaurant-4']
  },
  {
    id: 'tiffin-2',
    name: 'Masala Dosa',
    description: 'A crispy crepe made from fermented batter, filled with a savory potato filling, served with sambar and chutney.',
    price: 150,
    category: 'Tiffins',
    status: 'available',
    imageId: 'masala-dosa',
    restaurantIds: ['restaurant-4']
  },
  {
    id: 'tiffin-3',
    name: 'Puri',
    description: 'Deep-fried bread served with a side of potato curry.',
    price: 130,
    category: 'Tiffins',
    status: 'available',
    imageId: 'puri-bhaji',
    restaurantIds: ['restaurant-4']
  },
  {
    id: 'tiffin-4',
    name: 'Vada',
    description: 'Crispy, savory fried lentil doughnuts, served with sambar and chutney.',
    price: 110,
    category: 'Tiffins',
    status: 'available',
    imageId: 'vada',
    restaurantIds: ['restaurant-4']
  },
  // Meals
  {
    id: 'meal-1',
    name: 'South Indian Thali',
    description: 'A complete meal with rice, sambar, rasam, poriyal, curd, and a sweet.',
    price: 250,
    category: 'Meals',
    status: 'available',
    imageId: 'veg-thali',
    restaurantIds: ['restaurant-4']
  },
  {
    id: 'meal-2',
    name: 'North Indian Thali',
    description: 'A platter with dal, paneer, mixed vegetable curry, roti, rice, and raita.',
    price: 280,
    category: 'Meals',
    status: 'available',
    imageId: 'north-indian-thali',
    restaurantIds: ['restaurant-1', 'restaurant-2']
  },
  // Desserts
  {
    id: 'dessert-1',
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid balls soaked in a light sugar syrup.',
    price: 50,
    category: 'Desserts',
    status: 'available',
    imageId: 'gulab-jamun',
    restaurantIds: ['restaurant-1', 'restaurant-2']
  },
  {
    id: 'dessert-2',
    name: 'Ras Malai',
    description: 'Cottage cheese dumplings soaked in sweetened, thickened milk.',
    price: 70,
    category: 'Desserts',
    status: 'available',
    imageId: 'ras-malai',
    restaurantIds: ['restaurant-1', 'restaurant-3']
  },
  // Beverages
  {
    id: 'beverage-1',
    name: 'Mango Lassi',
    description: 'A refreshing yogurt-based drink with sweet mango pulp.',
    price: 100,
    category: 'Beverages',
    status: 'available',
    imageId: 'mango-lassi',
    restaurantIds: ['restaurant-1', 'restaurant-2', 'restaurant-3']
  },
  {
    id: 'beverage-2',
    name: 'Masala Chai',
    description: 'Traditional Indian tea brewed with aromatic spices and milk.',
    price: 50,
    category: 'Beverages',
    status: 'available',
    imageId: 'masala-chai',
    restaurantIds: ['restaurant-1', 'restaurant-3']
  },
  {
    id: 'beverage-3',
    name: 'Thums Up',
    description: 'A popular Indian cola with a strong, spicy flavor.',
    price: 50,
    category: 'Beverages',
    status: 'available',
    imageId: 'thums-up',
    restaurantIds: ['restaurant-2', 'restaurant-3']
  },
  // Burgers
  {
    id: 'burger-1',
    name: 'Pizza Hut Special Burger',
    description: 'A thick juicy patty with signature herbs.',
    price: 180,
    category: 'Burgers',
    status: 'available',
    imageId: 'classic-chicken-burger',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'burger-2',
    name: 'Dominos Cheesy Burger',
    description: 'Crispy patty with overflowing liquid cheese.',
    price: 160,
    category: 'Burgers',
    status: 'available',
    imageId: 'spicy-paneer-burger',
    restaurantIds: ['restaurant-6']
  },
  // Snacks
  {
    id: 'snack-1',
    name: 'PH Garlic Breadsticks',
    description: 'Pizza Hut Style buttery breadsticks.',
    price: 140,
    category: 'Snacks',
    status: 'available',
    imageId: 'pizza-hut-garlic-bread',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'snack-2',
    name: 'Choco Lava Cake',
    description: 'Dominos Signature dessert with molten chocolate inside.',
    price: 110,
    category: 'Snacks',
    status: 'available',
    imageId: 'choco-lava-cake',
    restaurantIds: ['restaurant-6']
  },
  {
    id: 'snack-3',
    name: 'Potato Wedges',
    description: 'Crispy and seasoned wedges, a Pizza Hut favorite.',
    price: 130,
    category: 'Snacks',
    status: 'available',
    imageId: 'potato-wedges',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'snack-4',
    name: 'Zingy Parcel',
    description: 'A snacky pocket filled with paneer and spices.',
    price: 90,
    category: 'Snacks',
    status: 'available',
    imageId: 'zingy-parcel',
    restaurantIds: ['restaurant-6']
  },
  {
    id: 'snack-5',
    name: 'Cheesy Fries',
    description: 'Crispy french fries loaded with melted cheese.',
    price: 150,
    category: 'Snacks',
    status: 'available',
    imageId: 'cheesy-fries',
    restaurantIds: ['restaurant-5', 'restaurant-6']
  },
  // Beverages
  {
    id: 'beverage-4',
    name: 'Pepsi',
    description: 'Refreshing Pepsi - Perfect for Pizza Hut.',
    price: 60,
    category: 'Beverages',
    status: 'available',
    imageId: 'pepsi',
    restaurantIds: ['restaurant-5']
  },
  {
    id: 'beverage-5',
    name: 'Coca-Cola',
    description: 'Classic Coke - Perfect for Dominos.',
    price: 60,
    category: 'Beverages',
    status: 'available',
    imageId: 'coca-cola',
    restaurantIds: ['restaurant-6']
  }
];

export const menuCategories = ['Appetizers', 'Main Courses', 'Pizzas', 'Burgers', 'Snacks', 'Tiffins', 'Meals', 'Desserts', 'Beverages'];
