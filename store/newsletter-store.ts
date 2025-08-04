import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsletterSubscription } from '@/types/newsletter';

interface NewsletterStore {
  subscriptionStatus: 'subscribed' | 'unsubscribed' | 'pending' | null;
  currentSubscription: NewsletterSubscription | null;
  userEmail: string | null; // Stored to easily fetch/update subscription

  setSubscriptionStatus: (status: 'subscribed' | 'unsubscribed' | 'pending' | null) => void;
  setCurrentSubscription: (subscription: NewsletterSubscription | null) => void;
  setUserEmail: (email: string | null) => void;
  clearSubscription: () => void;
}

export const useNewsletterStore = create<NewsletterStore>()(
  persist(
    (set) => ({
      subscriptionStatus: null,
      currentSubscription: null,
      userEmail: null,

      setSubscriptionStatus: (status) => set({ subscriptionStatus: status }),
      setCurrentSubscription: (subscription) => set({ currentSubscription: subscription, subscriptionStatus: subscription?.status || null }),
      setUserEmail: (email) => set({ userEmail: email }),
      clearSubscription: () => set({ subscriptionStatus: null, currentSubscription: null, userEmail: null }),
    }),
    {
      name: 'newsletter-storage', // unique name for localStorage
      partialize: (state) => ({ userEmail: state.userEmail, currentSubscription: state.currentSubscription }),
      onRehydrateStorage: (state) => {
        // After rehydration, set the subscription status based on the stored currentSubscription
        if (state.currentSubscription) {
          state.setSubscriptionStatus(state.currentSubscription.status);
        }
      },
    }
  )
);
