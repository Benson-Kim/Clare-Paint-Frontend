export interface ConsultationPackage {
  id: string;
  name: string;
  type: 'virtual' | 'in-home' | 'commercial';
  price: number;
  description: string;
  features: string[];
  duration: string;
  image: string;
}

export interface ConsultationSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  isAvailable: boolean;
}

export interface BookingFormData {
  packageId: string;
  serviceType: 'virtual' | 'in-home' | 'commercial';
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string; // For in-home
  projectBrief: string;
  designerId?: string; // For designer collaboration
}

export interface PortfolioProject {
  id: string;
  name: string;
  client: string;
  description: string;
  imageUrls: string[];
  type: 'residential' | 'commercial';
  colorPalette: string[]; // Hex codes
}
