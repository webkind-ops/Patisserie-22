/**
 * Menu Domain Types for Patisserie'22
 */

export type MenuCategoryId =
  | 'all'
  | 'hampers'
  | 'cakes'
  | 'fruit-cakes'
  | 'premium-cakes'
  | 'bento-cakes'
  | 'custom-cakes'
  | 'kids-cakes'
  | 'pastries'
  | 'cupcakes'
  | 'cupcakes-box'
  | 'cheesecakes-jar'
  | 'cheesecakes-baked'
  | 'desserts'
  | 'brownies'
  | 'brownies-box'
  | 'muffins'
  | 'drinks'
  | 'seasonal-specials';

export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'eggless' | 'gluten-free';

export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'limited';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  price: number;
  dietary: DietaryType;
  availability: AvailabilityStatus;
  image: string;
  featured: boolean;
  
  // Hamper & Custom Cake specializations
  isStartingPrice?: boolean;
  suitableOccasion?: string;
  isCustomizable?: boolean;
  leadTime?: string;
  images?: string[];
  variants?: ProductVariant[];

  // Future extension placeholders
  badgeText?: string;
  allergens?: string[];
  portion?: string;
  prepTimeMinutes?: number;
}

export interface CategoryInfo {
  id: MenuCategoryId;
  label: string;
  iconName?: string;
  description?: string;
}

export interface MenuFilterState {
  searchQuery: string;
  selectedCategory: MenuCategoryId;
  dietaryFilter: DietaryType | 'all';
}
