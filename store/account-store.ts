import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the possible dashboard sections
export type DashboardSection =
  | 'dashboard'
  | 'order-history'
  | 'saved-colors'
  | 'project-gallery'
  | 'addresses'
  | 'payment-methods'
  | 'color-recommendations'
  | 'paint-usage';

interface AccountStore {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      activeSection: 'dashboard',
      setActiveSection: (section) => set({ activeSection: section }),
      isMobileMenuOpen: false,
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({ activeSection: state.activeSection }),
    }
  )
);