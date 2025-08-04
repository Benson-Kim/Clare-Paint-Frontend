export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping: boolean;
}

export interface PaymentMethod {
  type: 'credit' | 'debit' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
  estimatedDelivery: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  minOrderAmount?: number;
  maxDiscount?: number;
  expiryDate?: string;
  usageLimit?: number;
  usedCount?: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  carrier: string;
  trackingAvailable: boolean;
}

export interface CartProject {
  id: string;
  name: string;
  description?: string;
  roomType?: string;
  estimatedArea?: number;
  items: string[]; // Cart item IDs
  createdAt: string;
  updatedAt: string;
}

export interface SavedItem {
  id: string;
  productId: string;
  colorId: string;
  finishId: string;
  quantity: number;
  price: number;
  savedAt: string;
  notes?: string;
}

export interface CartAnalytics {
  sessionId: string;
  itemsAdded: number;
  itemsRemoved: number;
  timeSpent: number;
  abandonedAt?: string;
  convertedAt?: string;
  totalValue: number;
}