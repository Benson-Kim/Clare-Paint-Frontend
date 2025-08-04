import { create } from 'zustand';
import { ConsultationPackage } from '@/types/consultation';

interface ConsultationStore {
  isBookingModalOpen: boolean;
  selectedPackage: ConsultationPackage | null;
  openBookingModal: (pkg: ConsultationPackage) => void;
  closeBookingModal: () => void;
}

export const useConsultationStore = create<ConsultationStore>((set) => ({
  isBookingModalOpen: false,
  selectedPackage: null,
  openBookingModal: (pkg) => set({ isBookingModalOpen: true, selectedPackage: pkg }),
  closeBookingModal: () => set({ isBookingModalOpen: false, selectedPackage: null }),
}));
