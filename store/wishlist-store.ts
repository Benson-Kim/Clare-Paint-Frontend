import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WishlistItem, CartItem } from "@/types/product";
import { fetchWishlistProducts, removeFromWishlist } from "@/lib/api-service";
import { useCartStore } from "@/store/cart-store";

interface WishlistStore {
	items: WishlistItem[];
	loading: boolean;
	error?: string;

	fetchItems: () => Promise<void>;
	addToWishlist: (item: WishlistItem) => void;
	removeItem: (productId: string) => Promise<void>;
	clear: () => void;
	getCount: () => number;
	addToCart: (item: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistStore>()(
	persist(
		(set, get) => ({
			items: [],
			loading: false,
			error: undefined,

			/**
			 * Fetch wishlist items (from API or mock)
			 */
			fetchItems: async () => {
				set({ loading: true });
				try {
					const items = await fetchWishlistProducts();
					set({ items, loading: false });
				} catch (error) {
					console.error("[Wishlist Store] Fetch failed:", error);
					set({ loading: false, error: "Failed to fetch wishlist" });
				}
			},

			/**
			 * Add a product to wishlist
			 */
			addToWishlist: (item: WishlistItem) => {
				set((state) => {
					if (state.items.some((i) => i.id === item.id)) return state;
					return { items: [...state.items, item] };
				});
			},

			/**
			 * Remove a product from wishlist (API + local)
			 */
			removeItem: async (productId: string) => {
				try {
					await removeFromWishlist(productId);
					set((state) => ({
						items: state.items.filter((item) => item.id !== productId),
					}));
				} catch (error) {
					console.error("[Wishlist Store] Remove failed:", error);
				}
			},

			/**
			 * Clear all wishlist items
			 */
			clear: () => set({ items: [] }),

			/**
			 * Get total wishlist count
			 */
			getCount: () => get().items.length,

			/**
			 * Add wishlist item to cart (and remove from wishlist)
			 */
			addToCart: (wishlistItem: WishlistItem) => {
				try {
					const { addItem, setIsOpen } = useCartStore.getState();

					const cartItem: CartItem = {
						productId: wishlistItem.id,
						price: wishlistItem.price,
						quantity: 1,
						colorId: "default", // fallback values
						finishId: "default",
					};

					addItem(cartItem);
					setIsOpen(true);

					// remove from wishlist
					set((state) => ({
						items: state.items.filter((i) => i.id !== wishlistItem.id),
					}));
				} catch (error) {
					console.error("[Wishlist Store] Failed to add to cart:", error);
				}
			},
		}),
		{
			name: "wishlist-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ items: state.items }),
			onRehydrateStorage: () => (state) => {
				console.log(
					"[Wishlist Store] Rehydrated",
					state?.items?.length ?? 0,
					"items"
				);
			},
		}
	)
);
