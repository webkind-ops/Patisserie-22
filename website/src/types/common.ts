/**
 * Common App & Utility Types
 */

export interface StoreContactInfo {
  storeName: string;
  tagline: string;
  openingHours: string;
  daysOpen: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  instagram: string;
  instagramUrl: string;
  fssaiLicNo: string;
}

export interface AppConfig {
  baseUrl: string;
  menuPath: string;
  qrMenuUrl: string;
  currency: {
    symbol: string;
    code: string;
    position: 'prefix' | 'suffix';
  };
  store: StoreContactInfo;
}
