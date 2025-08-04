export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  finish: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    zipCode: string;
  };
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface SavedColor {
  id: string;
  productId: string;
  colorId: string;
  finishId: string;
  name: string;
  hex: string;
  image: string;
  savedAt: string;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  photos: string[]; // URLs to project photos
  paintUsed: {
    productId: string;
    colorId: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
  status: 'Planning' | 'In Progress' | 'Completed';
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'paypal';
  last4: string;
  expiry: string;
  cardholderName: string;
  isDefault: boolean;
}

export interface UserAddress {
  id: string;
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
  isDefault: boolean;
  type: 'shipping' | 'billing' | 'both';
}

export interface PaintUsageRecord {
  id: string;
  productId: string;
  colorId: string;
  quantityUsed: number; // in gallons
  date: string;
  projectId?: string;
  notes?: string;
  coverage: number; // square feet covered
}

export interface ColorRecommendation {
  id: string;
  colorId: string;
  productId: string;
  name: string;
  hex: string;
  image: string;
  reason: string;
  confidence: number; // 0-100
  roomType: string;
  generatedAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  savedColors: number;
  completedProjects: number;
  paintUsed: number; // total gallons
  favoriteColor: {
    name: string;
    hex: string;
    timesOrdered: number;
  };
}