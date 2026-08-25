import { MenuItem } from './menu';

export interface CartItem {
  cartItemId: string; // unique key combining item.id + selectedWeight/options
  item: MenuItem;
  quantity: number;
  selectedWeight?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'takeaway' | 'dine-in' | 'delivery';

export interface OrderCustomerInfo {
  name: string;
  phone?: string;
  orderType: OrderType;
  tableNumber?: string;
  notes?: string;
}

export interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, quantity?: number, selectedWeight?: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getItemQuantityInCart: (itemId: string, selectedWeight?: string) => number;
}
