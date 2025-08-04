export interface CustomerReview {
  id: string;
  productId?: string; // Optional: if review is for a specific product
  userName: string;
  userLocation?: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string; // YYYY-MM-DD
  verifiedPurchase: boolean;
  photos?: string[]; // URLs to review photos
  helpfulVotes: number;
  unhelpfulVotes: number;
  businessResponse?: {
    responderName: string;
    responseText: string;
    responseDate: string; // YYYY-MM-DD
  };
}

export interface ReviewSubmissionFormData {
  productId?: string;
  userName: string;
  userEmail: string; // For internal use, not displayed
  rating: number;
  comment: string;
  photos?: File[];
}

export interface ProfessionalEndorsement {
  id: string;
  professionalName: string;
  title: string;
  company: string;
  quote: string;
  photoUrl: string;
  date: string; // YYYY-MM-DD
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  problem: string;
  solution: string;
  results: string;
  imageUrl: string;
  fullStoryLink?: string;
}
