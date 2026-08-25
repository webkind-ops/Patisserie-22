import { CategoryInfo } from '@/types/menu';

/**
 * All Menu Categories for Patisserie'22
 */
export const MENU_CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'All Items', iconName: 'Sparkles' },
  { id: 'cakes', label: 'Cakes', iconName: 'Cake' },
  { id: 'fruit-cakes', label: 'Fruit Cakes', iconName: 'Cake' },
  { id: 'premium-cakes', label: 'Premium Cakes', iconName: 'Flame' },
  { id: 'bento-cakes', label: 'Bento Cakes', iconName: 'CakeSlice' },
  { id: 'custom-cakes', label: 'Custom Cakes', iconName: 'CakeSlice', description: 'Bespoke handcrafted celebration & theme cakes made to order' },
  { id: 'kids-cakes', label: 'Kids Cakes', iconName: 'CakeSlice', description: 'Special handcrafted cakes for kids celebrations' },
  { id: 'pastries', label: 'Pastries', iconName: 'Cookie' },
  { id: 'cupcakes', label: 'Cupcakes', iconName: 'CupSoda' },
  { id: 'cupcakes-box', label: 'Cupcakes (Box)', iconName: 'Gift' },
  { id: 'cheesecakes-jar', label: 'Cheesecake - Jar', iconName: 'IceCream' },
  { id: 'cheesecakes-baked', label: 'Cheesecake - Baked', iconName: 'CakeSlice' },
  { id: 'desserts', label: 'Desserts', iconName: 'IceCream' },
  { id: 'brownies', label: 'Brownies', iconName: 'Square' },
  { id: 'brownies-box', label: 'Brownies (Box)', iconName: 'Gift' },
  { id: 'muffins', label: 'Muffins', iconName: 'CupSoda' },
  { id: 'drinks', label: 'Drinks', iconName: 'Coffee' },
  { id: 'hampers', label: 'Hampers', iconName: 'Gift', description: 'Curated artisan gift hampers for celebrations & corporate gifting' },
];
