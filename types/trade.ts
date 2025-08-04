export interface TradeAccount {
  id: string;
  businessName: string;
  businessType: 'sole_proprietorship' | 'partnership' | 'llc' | 'corporation' | 'other';
  taxId: string;
  status: 'pending' | 'approved' | 'suspended' | 'rejected';
  tier: 'starter' | 'professional' | 'contractor' | 'enterprise';
  discountRate: number;
  creditLimit: number;
  paymentTerms: string;
  accountManager: string;
  createdAt: string;
  lastOrderDate?: string;
  totalVolume: number;
  yearToDateVolume: number;
}

export interface TradeContact {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface TradeAddress {
  type: 'billing' | 'shipping' | 'job_site';
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  deliveryInstructions?: string;
}

export interface TradeOrder {
  id: string;
  orderNumber: string;
  status: 'draft' | 'submitted' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  requestedDeliveryDate?: string;
  actualDeliveryDate?: string;
  items: TradeOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paymentTerms: string;
  purchaseOrderNumber?: string;
  jobSiteAddress?: TradeAddress;
  notes?: string;
  trackingNumbers?: string[];
}

export interface TradeOrderItem {
  productId: string;
  productName: string;
  brand: string;
  color: string;
  finish: string;
  size: string;
  unitPrice: number;
  tradePrice: number;
  quantity: number;
  totalPrice: number;
  leadTime: string;
  inStock: boolean;
}

export interface TradeProject {
  id: string;
  name: string;
  description: string;
  client: string;
  jobSiteAddress: TradeAddress;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  startDate: string;
  endDate: string;
  estimatedBudget: number;
  actualCost: number;
  paintEstimate: number;
  paintUsed: number;
  crewMembers: string[];
  orders: string[]; // Order IDs
  notes: string;
  photos: string[];
  completionPercentage: number;
}

export interface TradeInvoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
  paymentMethod?: string;
  paymentDate?: string;
  terms: string;
  notes?: string;
}

export interface TradeDiscount {
  tier: string;
  minVolume: number;
  discountRate: number;
  features: string[];
  paymentTerms: string;
  freeDeliveryThreshold: number;
  accountManagerType: 'none' | 'shared' | 'dedicated' | 'executive';
}

export interface TradeSupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'delivery' | 'product' | 'account' | 'other';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  customerSatisfaction?: number;
  attachments?: string[];
}

export interface TradeAnalytics {
  totalOrders: number;
  totalVolume: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    productName: string;
    quantity: number;
    revenue: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    orders: number;
    volume: number;
    revenue: number;
  }>;
  paymentHistory: Array<{
    date: string;
    amount: number;
    method: string;
    status: string;
  }>;
}

export interface TradeRegistrationData {
  businessInfo: {
    businessName: string;
    businessType: TradeAccount['businessType'];
    taxId: string;
    yearsInBusiness: number;
    licenseNumber?: string;
    insuranceProvider?: string;
    annualVolume: string;
    employeeCount: number;
  };
  contactInfo: TradeContact & TradeAddress;
  businessOperations: {
    serviceAreas: string[];
    specialties: string[];
    equipmentOwned: string[];
    certifications: string[];
  };
  references: Array<{
    companyName: string;
    contactName: string;
    phone: string;
    email?: string;
    relationship: string;
  }>;
  documents: Array<{
    type: string;
    name: string;
    url: string;
    verified: boolean;
  }>;
  agreements: {
    termsAccepted: boolean;
    creditCheckAuthorized: boolean;
    marketingOptIn: boolean;
  };
}