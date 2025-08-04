export interface NewsletterSubscription {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed' | 'pending';
  preferences: string[]; // e.g., 'interior_paint', 'exterior_paint', 'color_trends', 'diy_tips', 'promotions'
  frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
  subscribedAt: string; // ISO date string
  lastUpdated?: string; // ISO date string
}

export interface NewsletterSubscriptionFormData {
  email: string;
  userName?: string;
  preferences: string[];
  frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
}

export interface ContentArchiveItem {
  id: string;
  title: string;
  description: string;
  publishDate: string; // YYYY-MM-DD
  imageUrl: string;
  categories: string[]; // e.g., 'color_trends', 'diy_tips'
  contentUrl: string; // Link to full content
}
