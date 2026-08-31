import { AppConfig } from '@/types/common';

/**
 * Single Source of Truth Configuration for Patisserie'22
 * Modifying this file updates QR code generation targets, store information, and metadata.
 */
export const appConfig: AppConfig = {
  // Base domain configuration
  baseUrl: 'https://patisserie22.in',
  menuPath: '/menu',

  // Computed full QR target URL
  get qrMenuUrl(): string {
    return `${this.baseUrl}${this.menuPath}`;
  },

  // Currency configuration
  currency: {
    symbol: '₹',
    code: 'INR',
    position: 'prefix',
  },

  // Store profile, official contact details, and location
  store: {
    storeName: "Patisserie'22",
    tagline: 'Artisan Bakery & Fresh Bakes Since 2022',
    openingHours: '11:00 AM – 10:00 PM',
    daysOpen: 'Tuesday to Sunday (Closed on Mondays)',
    whatsappNumber: '+917011352004',
    whatsappDisplay: '+91 70113 52004',
    address: {
      line1: 'G-1, Chetan Complex, Shreshtha Vihar',
      line2: 'LSC, Delhi',
      city: 'Delhi',
      postalCode: '110092',
      country: 'India',
    },
    phone: '+91 70113 52004',
    instagram: '@patisserie22_',
    instagramUrl: 'https://www.instagram.com/patisserie22_/',
    fssaiLicNo: 'Lic. No. 23325003002448',
  },
};
