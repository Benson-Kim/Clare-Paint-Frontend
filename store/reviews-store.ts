import { create } from 'zustand';

interface ReviewsStore {
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
}

export const useReviewsStore = create<ReviewsStore>((set) => ({
  isReviewModalOpen: false,
  openReviewModal: () => set({ isReviewModalOpen: true }),
  closeReviewModal: () => set({ isReviewModalOpen: false }),
}));
