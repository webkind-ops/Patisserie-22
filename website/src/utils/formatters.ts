import { appConfig } from '@/constants/appConfig';
import { DietaryType, AvailabilityStatus } from '@/types/menu';

/**
 * Formats a number into a localized currency string
 */
export function formatCurrency(amount: number): string {
  const { symbol, position } = appConfig.currency;
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);

  return position === 'prefix'
    ? `${symbol}${formattedNumber}`
    : `${formattedNumber} ${symbol}`;
}

/**
 * Returns human readable label and indicator color token for dietary types
 */
export function getDietaryMeta(dietary: DietaryType): {
  label: string;
  shortLabel: string;
  badgeClass: string;
  dotColor: string;
} {
  switch (dietary) {
    case 'veg':
      return {
        label: 'Vegetarian',
        shortLabel: 'Veg',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        dotColor: 'bg-emerald-600',
      };
    case 'eggless':
      return {
        label: 'Eggless',
        shortLabel: 'Eggless',
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
        dotColor: 'bg-amber-600',
      };
    case 'vegan':
      return {
        label: '100% Vegan',
        shortLabel: 'Vegan',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-300',
        dotColor: 'bg-teal-600',
      };
    case 'gluten-free':
      return {
        label: 'Gluten-Free',
        shortLabel: 'GF',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-300',
        dotColor: 'bg-purple-600',
      };
    case 'non-veg':
      return {
        label: 'Non-Vegetarian',
        shortLabel: 'Non-Veg',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-600',
      };
    default:
      return {
        label: dietary,
        shortLabel: dietary,
        badgeClass: 'bg-lavender-50 text-charcoal border-lavender-200',
        dotColor: 'bg-lavender-500',
      };
  }
}

/**
 * Returns availability presentation meta
 */
export function getAvailabilityMeta(status: AvailabilityStatus): {
  label: string;
  isAvailable: boolean;
  badgeClass: string;
} {
  switch (status) {
    case 'in_stock':
      return {
        label: 'Available',
        isAvailable: true,
        badgeClass: 'text-emerald-700 bg-emerald-50/80 border-emerald-200',
      };
    case 'limited':
      return {
        label: 'Few Left Today',
        isAvailable: true,
        badgeClass: 'text-amber-800 bg-amber-50/80 border-amber-200',
      };
    case 'out_of_stock':
      return {
        label: 'Sold Out',
        isAvailable: false,
        badgeClass: 'text-charcoal-muted bg-gray-100 border-gray-200',
      };
  }
}

/**
 * Builds direct WhatsApp chat link
 */
export function getWhatsAppUrl(message: string = "Hello Patisserie'22, I am viewing the QR menu and have a question."): string {
  const cleanNumber = appConfig.store.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
