import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CheckoutFormData, ShippingAddress, PaymentMethod, ShippingOption, OrderConfirmationData } from '@/types/checkout';

interface CheckoutStore {
  formData: Partial<CheckoutFormData>;
  currentStep: number;
  orderData: OrderConfirmationData | null;
  setShippingAddress: (address: ShippingAddress, sameAsShipping: boolean) => void;
  setShippingOption: (option: ShippingOption) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPromoCode: (code: string) => void;
  setOrderData: (data: OrderConfirmationData) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  clearCheckoutData: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      formData: {
        sameAsShipping: true,
      },
      currentStep: 1,
      orderData: null,

      setShippingAddress: (address, sameAsShipping) => {
        set((state) => ({
          formData: {
            ...state.formData,
            shippingAddress: address,
            billingAddress: sameAsShipping ? address : state.formData.billingAddress,
            sameAsShipping,
          },
        }));
      },

      setShippingOption: (option) => {
        set((state) => ({
          formData: {
            ...state.formData,
            shippingOption: option,
          },
        }));
      },

      setPaymentMethod: (method) => {
        set((state) => ({
          formData: {
            ...state.formData,
            paymentMethod: method,
          },
        }));
      },

      setPromoCode: (code) => {
        set((state) => ({
          formData: {
            ...state.formData,
            promoCode: code,
          },
        }));
      },

      setOrderData: (data) => {
        set({ orderData: data });
      },

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      goToStep: (step) => set({ currentStep: step }),
      clearCheckoutData: () => set({ 
        formData: { sameAsShipping: true }, 
        currentStep: 1,
        orderData: null 
      }),
    }),
    {
      name: 'checkout-storage',
      partialize: (state) => ({ 
        formData: state.formData, 
        currentStep: state.currentStep,
        orderData: state.orderData 
      }),
    }
  )
);