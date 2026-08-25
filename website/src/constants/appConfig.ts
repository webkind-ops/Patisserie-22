import { AppConfig } from '@/types/common';

/**
 * Single Source of Truth Configuration for Patisserie'22
 * Modifying this file updates QR code generation targets, store information, and metadata.
 */
export const appConfig: AppConfig = {
  // Base domain configuration - automatically uses network IP / current origin if available
  baseUrl:
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
      ? window.location.origin
      : 'http://192.168.1.38:5173',
  menuPath: '/menu',

  // Computed full QR target URL (points to local network IP or live domain)
  get qrMenuUrl(): string {
    if (typeof window !== 'undefined' && window.location.origin) {
      if (
        window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1'
      ) {
        return `${window.location.origin}${this.menuPath}`;
      }
    }
    return `http://192.168.1.38:5173${this.menuPath}`;
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
    tagline: 'Artisan Bakery & Fine Viennoiserie',
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
