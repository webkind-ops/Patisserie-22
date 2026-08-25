import { MenuItem } from '@/types/menu';
import { CartItem, OrderCustomerInfo } from '@/types/cart';
import { appConfig } from '@/constants/appConfig';

export interface CakeWeightOption {
  label: string;
  multiplier: number;
}

export const CAKE_WEIGHT_OPTIONS: CakeWeightOption[] = [
  { label: '500g (0.5 kg)', multiplier: 1.0 },
  { label: '1 kg', multiplier: 1.9 },
  { label: '1.5 kg', multiplier: 2.8 },
  { label: '2 kg', multiplier: 3.6 },
];

/**
 * Checks if a menu item is a cake or custom cake that supports weight configuration
 */
export const isWeightConfigurable = (item: MenuItem): boolean => {
  return [
    'cakes',
    'fruit-cakes',
    'premium-cakes',
    'cheesecakes-baked',
    'custom-cakes'
  ].includes(item.category);
};

/**
 * Calculates unit price based on selected weight option
 */
export const calculateItemUnitPrice = (item: MenuItem, selectedWeight?: string): number => {
  if (!selectedWeight) return item.price;

  // Check if item has specific variants (e.g. precise 1 Kg price)
  if (item.variants && item.variants.length > 0) {
    const variant = item.variants.find(v => v.name === selectedWeight);
    if (variant) return variant.price;
  }

  // Fallback to multipliers if configurable and no specific variant matches
  if (isWeightConfigurable(item)) {
    const option = CAKE_WEIGHT_OPTIONS.find((opt) => opt.label === selectedWeight);
    if (!option) return item.price;
    // Round to clean multiples of 10
    return Math.round((item.price * option.multiplier) / 10) * 10;
  }

  return item.price;
};

/**
 * Creates unique ID for a cart item
 */
export const generateCartItemId = (itemId: string, selectedWeight?: string): string => {
  return selectedWeight ? `${itemId}_${selectedWeight}` : itemId;
};

/**
 * Generates formatted WhatsApp checkout URL with structured order summary
 * No emojis, no prices/totals in message (owner calculates manually)
 */
export const generateWhatsAppOrderUrl = (
  items: CartItem[],
  customerInfo?: OrderCustomerInfo
): string => {
  const { store } = appConfig;
  const cleanPhone = store.whatsappNumber.replace(/[^0-9]/g, '');

  let message = `Hello ${store.storeName},\n`;
  message += `I would like to place an order from your menu:\n\n`;
  message += `Order Details:\n`;

  items.forEach((ci, index) => {
    const weightText = ci.selectedWeight ? ` (${ci.selectedWeight})` : '';
    message += `${index + 1}. ${ci.item.name}${weightText} - Quantity: ${ci.quantity}\n`;
  });

  message += `\n`;

  if (customerInfo) {
    message += `Customer Details:\n`;
    if (customerInfo.name.trim()) {
      message += `- Name: ${customerInfo.name.trim()}\n`;
    }
    message += `- Order Type: ${customerInfo.orderType.toUpperCase()}\n`;
    if (customerInfo.tableNumber?.trim()) {
      message += `- Table No: ${customerInfo.tableNumber.trim()}\n`;
    }
    if (customerInfo.notes?.trim()) {
      message += `- Note: ${customerInfo.notes.trim()}\n`;
    }
    message += `\n`;
  }

  message += `Please confirm my order. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
