export interface GalleryProject {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  beforeImageUrl?: string;
  afterImageUrl: string;
  colorPalette?: string[]; // Hex codes
  paintProductsUsed?: { productId: string; colorId: string; }[];
  likes: number;
  views: number;
  submissionDate: string; // YYYY-MM-DD
  status: 'pending' | 'approved' | 'rejected';
  tags: string[];
  commentsCount: number;
}

export interface ProjectSubmissionFormData {
  title: string;
  description: string;
  beforeImageFile?: File;
  afterImageFile: File;
  colorPalette?: string[];
  paintProductsUsed?: { productId: string; colorId: string; }[];
  tags: string[];
}

export interface SocialMediaPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'pinterest';
  username: string;
  profileUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
  timestamp: string; // ISO string
  hashtags: string[];
}

export interface Contest {
  id: string;
  name: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  theme: string;
  prizes: string[];
  rulesUrl: string;
  imageUrl: string;
  status: 'active' | 'upcoming' | 'past';
}

export interface ContestSubmissionFormData {
  contestId: string;
  projectName: string;
  description: string;
  imageFile: File;
  consentToRules: boolean;
}

export interface CustomerStory {
  id: string;
  title: string;
  customerName: string;
  location: string;
  story: string;
  imageUrl: string;
  projectType: string;
  date: string; // YYYY-MM-DD
}
