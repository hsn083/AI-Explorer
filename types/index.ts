export interface Product {
  id: number;
  _id?: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  originalPrice?: number;
  description: string;
  features: string[];
  benefits: string[];
  image: string;
  popular: boolean;
  badge: string | null;
  duration: string;
  sold: number;
  soldCount?: number;
}

export interface Review {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  verifiedPurchase: boolean;
  isDemo: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  color: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Hero {
  headline: string;
  subtitle: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
  floatingIcons: Array<{
    name: string;
    icon: string;
    position: { x: number; y: number };
    delay: number;
  }>;
}

export interface Settings {
  businessName: string;
  whatsappNumber: string;
  whatsappLink: string;
  businessHours: string;
  email: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
  };
  trustBadges: Array<{
    icon: string;
    text: string;
  }>;
  statistics: Array<{
    value: number;
    label: string;
  }>;
  whyChooseUs: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}
