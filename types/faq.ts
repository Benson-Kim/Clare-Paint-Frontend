export type FAQCategory = 'all' | 'product_questions' | 'shipping_returns' | 'color_matching' | 'technical_support';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  keywords: string[];
  helpfulVotes: number;
  unhelpfulVotes: number;
  relatedQuestions: string[]; // Array of FAQItem IDs
}
