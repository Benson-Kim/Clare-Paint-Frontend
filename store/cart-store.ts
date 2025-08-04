import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/product';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, colorId: string, finishId: string) => void;
  updateQuantity: (productId: string, colorId: string, finishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setIsOpen: (isOpen: boolean) => void;
  getItemCount: (productId: string, colorId: string, finishId: string) => number;
  hasItem: (productId: string, colorId: string, finishId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.productId === newItem.productId &&
              item.colorId === newItem.colorId &&
              item.finishId === newItem.finishId
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId: string, colorId: string, finishId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.productId === productId && 
                item.colorId === colorId && 
                item.finishId === finishId)
          ),
        }));
      },

      updateQuantity: (productId: string, colorId: string, finishId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, colorId, finishId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && 
            item.colorId === colorId && 
            item.finishId === finishId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      setIsOpen: (isOpen: boolean) => set({ isOpen }),

      getItemCount: (productId: string, colorId: string, finishId: string) => {
        const item = get().items.find(
          (item) =>
            item.productId === productId &&
            item.colorId === colorId &&
            item.finishId === finishId
        );
        return item ? item.quantity : 0;
      },

      hasItem: (productId: string, colorId: string, finishId: string) => {
        return get().items.some(
          (item) =>
            item.productId === productId &&
            item.colorId === colorId &&
            item.finishId === finishId
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);