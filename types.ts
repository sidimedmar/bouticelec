export interface Product {
  id: number;
  // Bilingual Fields
  titleFr: string;
  titleAr: string;
  subtitleFr: string;
  subtitleAr: string;
  sellingPointFr: string;
  sellingPointAr: string;
  
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  
  // Technical & Logistics
  features: string[]; // Shared features or could be bilingual if needed
  stock: number;
  stockAlert: number;
  packaging: string;
  warranty?: string;
  sizeGuide?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Language = 'fr' | 'ar';

export interface Translation {
  [key: string]: {
    fr: string;
    ar: string;
  }
}

export interface SiteContent {
  storeName: string;
  heroTitle: { fr: string; ar: string };
  heroSubtitle: { fr: string; ar: string };
  footerText: { fr: string; ar: string };
}