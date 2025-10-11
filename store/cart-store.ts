import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem, validateCartItem, CART_CONSTRAINTS } from "@/types/product";

export class CartError extends Error {
	constructor(message: string, public code: string) {
		super(message);
		this.name = "CartError";
	}
}

interface CartStore {
	items: CartItem[];
	isOpen: boolean;
	version: number;

	addItem: (item: CartItem) => void;
	removeItem: (productId: string, colorId: string, finishId: string) => void;
	updateQuantity: (
		productId: string,
		colorId: string,
		finishId: string,
		quantity: number
	) => void;
	clearCart: () => void;
	setIsOpen: (isOpen: boolean) => void;

	getTotalItems: () => number;
	getTotalPrice: () => number;
	getItemCount: (
		productId: string,
		colorId: string,
		finishId: string
	) => number;
	hasItem: (productId: string, colorId: string, finishId: string) => boolean;
	getItem: (
		productId: string,
		colorId: string,
		finishId: string
	) => CartItem | undefined;

	_validateOperation: () => void;
}

const STORE_VERSION = 1;

/**
 * Finds item index in cart
 */
function findItemIndex(
	items: CartItem[],
	productId: string,
	colorId: string,
	finishId: string
): number {
	return items.findIndex(
		(item) =>
			item.productId === productId &&
			item.colorId === colorId &&
			item.finishId === finishId
	);
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get): CartStore => ({
			items: [],
			isOpen: false,
			version: STORE_VERSION,

			addItem: (newItem: CartItem) => {
				try {
					const validatedItem = validateCartItem(newItem);

					set((state) => {
						if (state.items.length >= CART_CONSTRAINTS.MAX_ITEMS) {
							throw new CartError(
								`Cannot add more than ${CART_CONSTRAINTS.MAX_ITEMS} different items to cart`,
								"MAX_ITEMS_EXCEEDED"
							);
						}

						if (validatedItem.quantity < CART_CONSTRAINTS.MIN_QUANTITY) {
							throw new CartError(
								`Minimum quantity is ${CART_CONSTRAINTS.MIN_QUANTITY}`,
								"INVALID_QUANTITY"
							);
						}

						if (validatedItem.quantity > CART_CONSTRAINTS.MAX_QUANTITY) {
							throw new CartError(
								`Maximum quantity is ${CART_CONSTRAINTS.MAX_QUANTITY}`,
								"INVALID_QUANTITY"
							);
						}

						if (validatedItem.price < CART_CONSTRAINTS.MIN_PRICE) {
							throw new CartError("Invalid product price", "INVALID_PRICE");
						}

						const existingItemIndex = findItemIndex(
							state.items,
							validatedItem.productId,
							validatedItem.colorId,
							validatedItem.finishId
						);

						if (existingItemIndex > -1) {
							const updatedItems = [...state.items];
							const newQuantity =
								updatedItems[existingItemIndex].quantity +
								validatedItem.quantity;

							if (newQuantity > CART_CONSTRAINTS.MAX_QUANTITY) {
								throw new CartError(
									`Cannot add more. Maximum quantity per item is ${CART_CONSTRAINTS.MAX_QUANTITY}`,
									"MAX_QUANTITY_EXCEEDED"
								);
							}

							updatedItems[existingItemIndex] = {
								...updatedItems[existingItemIndex],
								quantity: newQuantity,
							};

							return { items: updatedItems };
						}

						return { items: [...state.items, validatedItem] };
					});
				} catch (error) {
					if (error instanceof CartError) {
						console.error("[Cart Store]", error.message);
						throw error;
					}
					console.error("[Cart Store] Unexpected error:", error);
					throw new CartError("Failed to add item to cart", "UNKNOWN_ERROR");
				}
			},

			removeItem: (productId: string, colorId: string, finishId: string) => {
				set((state) => {
					const filteredItems = state.items.filter(
						(item) =>
							!(
								item.productId === productId &&
								item.colorId === colorId &&
								item.finishId === finishId
							)
					);
					if (filteredItems.length === state.items.length) {
						console.warn("[Cart Store] Item not found for removal:", {
							productId,
							colorId,
							finishId,
						});
					}

					return { items: filteredItems };
				});
			},

			updateQuantity: (
				productId: string,
				colorId: string,
				finishId: string,
				quantity: number
			) => {
				try {
					if (quantity <= 0) {
						get().removeItem(productId, colorId, finishId);
						return;
					}
					if (quantity > CART_CONSTRAINTS.MAX_QUANTITY) {
						throw new CartError(
							`Maximum quantity is ${CART_CONSTRAINTS.MAX_QUANTITY}`,
							"INVALID_QUANTITY"
						);
					}
					set((state) => {
						const itemIndex = findItemIndex(
							state.items,
							productId,
							colorId,
							finishId
						);

						if (itemIndex === -1) {
							console.warn("[Cart Store] Item not found for quantity update");
							return state;
						}

						const updatedItems = [...state.items];
						updatedItems[itemIndex] = {
							...updatedItems[itemIndex],
							quantity,
						};

						return { items: updatedItems };
					});
				} catch (error) {
					if (error instanceof CartError) {
						console.error("[Cart Store]", error.message);
						throw error;
					}
					throw new CartError("Failed to update quantity", "UNKNOWN_ERROR");
				}
			},

			clearCart: () => {
				set({ items: [], isOpen: false });
			},

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},

			setIsOpen: (isOpen: boolean) => set({ isOpen }),

			getItemCount: (productId: string, colorId: string, finishId: string) => {
				const item = get().items.find(
					(item) =>
						item.productId === productId &&
						item.colorId === colorId &&
						item.finishId === finishId
				);
				return item?.quantity ?? 0;
			},

			hasItem: (productId: string, colorId: string, finishId: string) => {
				return get().items.some(
					(item) =>
						item.productId === productId &&
						item.colorId === colorId &&
						item.finishId === finishId
				);
			},

			getItem: (productId: string, colorId: string, finishId: string) => {
				return get().items.find(
					(item) =>
						item.productId === productId &&
						item.colorId === colorId &&
						item.finishId === finishId
				);
			},
			_validateOperation: () => {
				const state = get();

				if (state.items.length > CART_CONSTRAINTS.MAX_ITEMS) {
					console.error(
						"[Cart Store] Store integrity violation: too many items"
					);
					set({ items: state.items.slice(0, CART_CONSTRAINTS.MAX_ITEMS) });
				}

				const validItems = state.items.filter((item) => {
					try {
						validateCartItem(item);
						return true;
					} catch {
						console.error("[Cart Store] Invalid item found:", item);
						return false;
					}
				});
				if (validItems.length !== state.items.length) {
					set({ items: validItems });
				}
			},
		}),
		{
			name: "cart-storage",
			version: STORE_VERSION,
			storage: createJSONStorage(() => localStorage),

			migrate: (persistedState: unknown, version: number) => {
				if (version < STORE_VERSION) {
					console.log(
						"[Cart Store] Migrating from version",
						version,
						"to",
						STORE_VERSION
					);

					return {
						items: [],
						isOpen: false,
						version: STORE_VERSION,
					};
				}
				return persistedState as CartStore;
			},

			partialize: (state) => ({
				items: state.items,
				version: state.version,
			}),
			merge: (persistedState: unknown, currentState: CartStore) => {
				return {
					...currentState,
					...(persistedState as Partial<CartStore>),
					isOpen: false,
				};
			},
		}
	)
);

export function useAddToCart() {
	const addItem = useCartStore((state) => state.addItem);
	const setIsOpen = useCartStore((state) => state.setIsOpen);

	return {
		addToCart: (item: CartItem, openCart = true) => {
			try {
				addItem(item);
				if (openCart) {
					setIsOpen(true);
				}
				return { success: true };
			} catch (error) {
				if (error instanceof CartError) {
					return { success: false, error: error.message, code: error.code };
				}
				return { success: false, error: "An unexpected error occurred" };
			}
		},
	};
}
