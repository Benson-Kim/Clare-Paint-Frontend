// lib/api-service.ts

import {
	CheckoutFormData,
	OrderConfirmationData,
	ShippingAddress,
	ShippingOption,
	PromoCode,
} from "@/types/checkout";
import { CartItem, Product, WishlistItem } from "@/types/product";
import { DashboardStats } from "@/types/account";
import { mockProducts } from "@/data/mock-products";
import { mockShippingOptions } from "@/data/mock-shipping-options";
import { mockPromoCodes } from "@/data/mock-promo-codes";
import { mockOrderHistory } from "@/data/mock-order-history";
import { CustomerReview, ReviewSubmissionFormData } from "@/types/reviews";
import { mockCustomerReviews } from "@/data/mock-customer-reviews";
import { mockWishlistItems } from "@/data/mock-wishlist";
import { ColorPalette } from "@/types/colors";
import { mockColorPalettes } from "@/data/mock-color-palette";
import { useAuthStore } from "@/store/account-store";

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const USE_JSON_SERVER = process.env.NEXT_PUBLIC_USE_JSON_SERVER === "true";

export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const { accessToken, refreshAccessToken } = useAuthStore.getState();

	const url = endpoint.startsWith("http")
		? endpoint
		: `${API_BASE_URL}${endpoint}`;

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...((options.headers as Record<string, string>) || {}),
	};

	if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

	let response = await fetch(url, { ...options, headers });

	// If unauthorized, try refreshing
	if (response.status === 401) {
		await refreshAccessToken();
		const newToken = useAuthStore.getState().accessToken;

		if (newToken) {
			headers["Authorization"] = `Bearer ${newToken}`;
			response = await fetch(url, { ...options, headers });
		}
	}

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`API error: ${response.statusText} - ${errorText}`);
	}

	return response.json();
}

/**
 * Simulate network delay for mock data
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic fetch-or-mock switch
 */
export async function fetchOrMock<T>(
	endpoint: string,
	mockData: T,
	delayMs = 500,
	options?: RequestInit
): Promise<T> {
	if (USE_JSON_SERVER) {
		try {
			const res = await apiFetch<T>(endpoint, options);
			return res;
		} catch (error) {
			console.warn(
				`JSON server not reachable, using mock data for ${endpoint}`,
				error
			);
		}
	}

	await delay(delayMs);
	return mockData;
}

/**
 * Fetch all products or filter by category
 */

export async function fetchProducts(category?: string): Promise<Product[]> {
	const endpoint = category
		? `/products?category=${encodeURIComponent(category)}`
		: "/products";

	console.log(`[fetchProducts] Endpoint: ${endpoint}`);

	const data = await fetchOrMock<Product[]>(endpoint, mockProducts);

	interface ProductsResponse {
		products: Product[];
	}

	const productsArray = Array.isArray(data)
		? data
		: Array.isArray((data as ProductsResponse).products)
		? (data as ProductsResponse).products
		: [];

	if (!USE_JSON_SERVER && category) {
		const filtered = productsArray.filter((p) => {
			const productCategory = p.category?.trim().toLowerCase();
			return (
				productCategory === category ||
				productCategory.replace(/ /g, "_") === category
			);
		});

		return filtered;
	}

	return productsArray;
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string): Promise<Product> {
	const mockProduct = mockProducts.find((p) => p.id === id);
	if (!mockProduct) throw new Error("Mock product not found");

	return fetchOrMock<Product>(`/products/${id}`, mockProduct);
}

/**
 * Search products by query
 */
export async function searchProducts(query: string): Promise<Product[]> {
	const lowerQuery = query.toLowerCase();

	const mockResult = mockProducts.filter(
		(p) =>
			p.name.toLowerCase().includes(lowerQuery) ||
			p.description.toLowerCase().includes(lowerQuery) ||
			p.brand.toLowerCase().includes(lowerQuery)
	);

	return fetchOrMock<Product[]>(
		`/products?q=${encodeURIComponent(query)}`,
		mockResult,
		400
	);
}

/**
 * Fetch color palettes
 */
export async function fetchColorPalettes(): Promise<ColorPalette[]> {
	const endpoint = "/colorpalettes";

	return fetchOrMock<ColorPalette[]>(endpoint, mockColorPalettes, 300);
}

/**
 * Fetch shipping options
 */
export async function fetchShippingOptions(): Promise<ShippingOption[]> {
	const endpoint = "/shippingOptions";

	return fetchOrMock<ShippingOption[]>(endpoint, mockShippingOptions, 300);
}

/**
 * Fetch promo codes
 */
export async function fetchPromoCodes(): Promise<PromoCode[]> {
	const endpoint = "/promoCodes?active=true";

	return fetchOrMock<PromoCode[]>(endpoint, mockPromoCodes, 200);
}

/**
 * Fetch promo codes
 */
export async function fetchWishlistProducts(): Promise<WishlistItem[]> {
	const endpoint = "/wishlist";

	return fetchOrMock<WishlistItem[]>(endpoint, mockWishlistItems, 200);
}

/**
 * Remove from wishlist
 * @param productId
 * @returns
 */

export async function removeFromWishlist(productId: string): Promise<void> {
	const endpoint = `/wishlist/${productId}`;

	if (USE_JSON_SERVER) {
		await apiFetch(endpoint, { method: "DELETE" });
		return;
	}

	// Mock behavior
	await delay(300);
	return;
}

/**
 * Validate shipping address
 */
export async function validateAddress(
	address: ShippingAddress
): Promise<boolean> {
	const isValid =
		!!address.city && !!address.country && address.zipCode.trim().length >= 5;

	return fetchOrMock("/validate-address", isValid, 500, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(address),
	});
}

/**
 * Process order
 */
export async function processOrder(
	formData: CheckoutFormData,
	cartItems: CartItem[],
	subtotal: number,
	total: number
): Promise<OrderConfirmationData> {
	await delay(1500);

	// 10% random failure (simulate payment errors)
	if (Math.random() < 0.1) {
		throw new Error(
			"Payment failed or an unexpected error occurred. Please try again."
		);
	}

	const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
	const estimatedDelivery = formData.shippingOption.estimatedDays;

	const itemsWithDetails = cartItems.map((item) => {
		const product = mockProducts.find((p) => p.id === item.productId);
		const color = product?.colors.find((c) => c.id === item.colorId);
		const finish = product?.finishes.find((f) => f.id === item.finishId);

		return {
			productId: item.productId,
			name: product?.name || "Unknown Product",
			color: color?.name || "Unknown Color",
			finish: finish?.name || "Unknown Finish",
			quantity: item.quantity,
			price: item.price,
			image:
				color?.image ||
				"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
		};
	});

	const paymentMethodSummary =
		formData.paymentMethod.type === "credit"
			? `Credit Card (**** **** **** ${formData.paymentMethod.cardNumber?.slice(
					-4
			  )})`
			: "PayPal";

	// Define the order object
	const orderPayload = {
		id: orderId,
		date: new Date().toISOString(),
		totalAmount: total,
		status: "Processing",
		items: itemsWithDetails,
		shippingAddress: formData.shippingAddress,
		estimatedDelivery,
		trackingNumber: null,
	};

	await fetchOrMock("/orders", orderPayload, 500, {
		method: "POST",
		body: JSON.stringify(orderPayload),
	});

	return {
		orderId,
		totalAmount: total,
		estimatedDelivery,
		items: itemsWithDetails,
		shippingAddress: formData.shippingAddress,
		paymentMethodSummary,
		mixingInstructionsLink:
			"https://support.clairepaints.com/docs/paint-mixing-instructions",
	};
}

/**
 * Fetch user's order history
 */
export async function fetchOrderHistory() {
	const endpoint = "/orders?_sort=date&_order=desc";

	return fetchOrMock(endpoint, mockOrderHistory, 1000);
}

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
	const mockStats: DashboardStats = {
		totalOrders: 4,
		totalSpent: 600.93,
		savedColors: 12,
		completedProjects: 3,
		paintUsed: 8.5,
		favoriteColor: {
			name: "Sage Whisper",
			hex: "#5B7B7A",
			timesOrdered: 3,
		},
	};

	return fetchOrMock("/dashboard", mockStats, 800);
}

/**
 * Reorder items from a previous order
 */
export async function reorderItems(
	orderId: string
): Promise<{ success: boolean }> {
	const mockResponse = { success: true };

	const result = await fetchOrMock(
		`/orders/${orderId}/reorder`,
		mockResponse,
		1000,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ orderId }),
		}
	);

	// Optional: simulate failure in mock mode
	if (!USE_JSON_SERVER && Math.random() < 0.1) {
		throw new Error("Failed to add items to cart. Please try again.");
	}

	return result;
}

/**
 * Fetch reviews for a product
 */
export async function fetchReviews(
	productId?: string
): Promise<CustomerReview[]> {
	const endpoint = productId ? `/reviews?productId=${productId}` : "/reviews";

	return fetchOrMock<CustomerReview[]>(endpoint, mockCustomerReviews, 700);
}

/**
 * Submit a review
 */
export async function submitReview(
	reviewData: ReviewInput
): Promise<ReviewSubmissionFormData> {
	const reviewPayload: ReviewSubmissionFormData = {
		...reviewData,
		id: `rev-${Date.now()}`,
		date: new Date().toISOString().split("T")[0],
		verifiedPurchase: true,
		helpfulVotes: 0,
		unhelpfulVotes: 0,
	};

	return fetchOrMock("/reviews", reviewPayload, 1500, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(reviewPayload),
	});
}

// Export all original mock functions for backward compatibility
export {
	fetchShippingOptions as mockFetchShippingOptions,
	fetchPromoCodes as mockFetchPromoCodes,
	validateAddress as mockValidateAddress,
	processOrder as mockProcessOrder,
	fetchOrderHistory as mockFetchOrderHistory,
	fetchDashboardStats as mockFetchDashboardStats,
	reorderItems as mockReorderItems,
};
