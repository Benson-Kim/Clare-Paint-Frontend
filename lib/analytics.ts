/**
 * Analytics event types
 */
export enum AnalyticsEvent {
	// Page views
	PAGE_VIEW = "page_view",

	// E-commerce
	PRODUCT_VIEW = "product_view",
	ADD_TO_CART = "add_to_cart",
	REMOVE_FROM_CART = "remove_from_cart",
	BEGIN_CHECKOUT = "begin_checkout",
	CHECKOUT_STEP = "checkout_step",
	PURCHASE = "purchase",
	REFUND = "refund",

	// Search
	SEARCH = "search",
	SEARCH_RESULTS = "search_results",

	// User actions
	SIGN_UP = "sign_up",
	LOGIN = "login",
	LOGOUT = "logout",

	// Wishlist
	ADD_TO_WISHLIST = "add_to_wishlist",
	REMOVE_FROM_WISHLIST = "remove_from_wishlist",

	// Orders
	REORDER = "reorder",
	VIEW_ORDER = "view_order",
	CANCEL_ORDER = "cancel_order",

	// Engagement
	SHARE = "share",
	CLICK = "click",
	FORM_SUBMIT = "form_submit",
	ERROR = "error",
}

/**
 * Analytics properties interface
 */
export interface AnalyticsProperties {
	[key: string]: string | number | boolean | null | undefined | AnalyticsItem[];
}

/**
 * E-commerce item interface
 */
export interface AnalyticsItem {
	item_id: string;
	item_name: string;
	item_category?: string;
	item_variant?: string;
	price?: number;
	quantity?: number;
	currency?: string;
}

/**
 * Purchase data interface
 */
export interface PurchaseData {
	transaction_id: string;
	value: number;
	currency: string;
	tax?: number;
	shipping?: number;
	items: AnalyticsItem[];
	coupon?: string;
}

/**
 * Analytics service class
 */
class AnalyticsService {
	private isInitialized = false;
	private isDevelopment = process.env.NODE_ENV === "development";
	private queue: Array<{ event: string; properties: AnalyticsProperties }> = [];

	/**
	 * Initialize analytics services
	 */
	init() {
		if (this.isInitialized) return;

		try {
			// Initialize Google Analytics
			if (typeof window !== "undefined" && window.gtag) {
				this.isInitialized = true;
				this.log("Analytics initialized");

				// Process queued events
				this.queue.forEach(({ event, properties }) => {
					this.track(event, properties);
				});
				this.queue = [];
			}
		} catch (error) {
			console.error("Failed to initialize analytics:", error);
		}
	}

	/**
	 * Track an event
	 */
	track(event: AnalyticsEvent | string, properties: AnalyticsProperties = {}) {
		// Queue events if not initialized
		if (!this.isInitialized) {
			this.queue.push({ event, properties });
			return;
		}

		try {
			// Add timestamp
			const enrichedProperties = {
				...properties,
				timestamp: new Date().toISOString(),
				page_url: typeof window !== "undefined" ? window.location.href : "",
				page_title: typeof document !== "undefined" ? document.title : "",
			};

			// Send to Google Analytics
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("event", event, enrichedProperties);
			}

			// Send to other analytics services (e.g., Mixpanel, Amplitude)
			// window.mixpanel?.track(event, enrichedProperties);

			this.log(`Event tracked: ${event}`, enrichedProperties);
		} catch (error) {
			console.error("Failed to track event:", error);
		}
	}

	/**
	 * Track page view
	 */
	pageView(path: string, title?: string) {
		this.track(AnalyticsEvent.PAGE_VIEW, {
			page_path: path,
			page_title: title || document?.title,
		});
	}

	/**
	 * Track product view
	 */
	viewProduct(product: {
		id: string;
		name: string;
		category?: string;
		price?: number;
		currency?: string;
	}) {
		this.track(AnalyticsEvent.PRODUCT_VIEW, {
			item_id: product.id,
			item_name: product.name,
			item_category: product.category,
			price: product.price,
			currency: product.currency || "USD",
		});
	}

	/**
	 * Track add to cart
	 */
	addToCart(item: AnalyticsItem) {
		this.track(AnalyticsEvent.ADD_TO_CART, {
			currency: item.currency || "USD",
			value: (item.price || 0) * (item.quantity || 1),
			items: [item],
		});
	}

	/**
	 * Track remove from cart
	 */
	removeFromCart(item: AnalyticsItem) {
		this.track(AnalyticsEvent.REMOVE_FROM_CART, {
			currency: item.currency || "USD",
			value: (item.price || 0) * (item.quantity || 1),
			items: [item],
		});
	}

	/**
	 * Track checkout begin
	 */
	beginCheckout(items: AnalyticsItem[], value: number, currency = "USD") {
		this.track(AnalyticsEvent.BEGIN_CHECKOUT, {
			currency,
			value,
			items,
		});
	}

	/**
	 * Track checkout step
	 */
	checkoutStep(step: number, stepName: string, value?: number) {
		this.track(AnalyticsEvent.CHECKOUT_STEP, {
			checkout_step: step,
			checkout_step_name: stepName,
			value,
		});
	}

	/**
	 * Track purchase
	 */
	purchase(data: PurchaseData) {
		this.track(AnalyticsEvent.PURCHASE, { ...data });
	}

	/**
	 * Track search
	 */
	search(query: string, results?: number) {
		this.track(AnalyticsEvent.SEARCH, {
			search_term: query,
			search_results: results,
		});
	}

	/**
	 * Track user sign up
	 */
	signUp(method: string) {
		this.track(AnalyticsEvent.SIGN_UP, { method });
	}

	/**
	 * Track user login
	 */
	login(method: string) {
		this.track(AnalyticsEvent.LOGIN, { method });
	}

	/**
	 * Track error
	 */
	error(
		errorMessage: string,
		errorStack?: string,
		context?: AnalyticsProperties
	) {
		this.track(AnalyticsEvent.ERROR, {
			error_message: errorMessage,
			error_stack: errorStack,
			...context,
		});
	}

	/**
	 * Set user properties
	 */
	setUser(userId: string, properties?: AnalyticsProperties) {
		try {
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("set", { user_id: userId });
				if (properties) {
					window.gtag("set", "user_properties", properties);
				}
			}
			this.log("User identified:", userId);
		} catch (error) {
			console.error("Failed to set user:", error);
		}
	}

	/**
	 * Clear user data
	 */
	clearUser() {
		try {
			if (typeof window !== "undefined" && window.gtag) {
				window.gtag("set", { user_id: null });
			}
			this.log("User cleared");
		} catch (error) {
			console.error("Failed to clear user:", error);
		}
	}

	/**
	 * Log analytics events in development
	 */
	private log(message: string, data?: unknown) {
		if (this.isDevelopment) {
			console.log(`[Analytics] ${message}`, data || "");
		}
	}
}

// Export singleton instance
export const analytics = new AnalyticsService();

// React hooks for analytics
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Hook to track page views
 */
export function usePageTracking() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
		analytics.pageView(url);
	}, [pathname, searchParams]);
}

/**
 * Hook to track component mount
 */
export function useComponentTracking(
	componentName: string,
	properties?: AnalyticsProperties
) {
	useEffect(() => {
		analytics.track("component_view", {
			component_name: componentName,
			...properties,
		});
	}, [componentName, properties]);
}

/**
 * Hook to track checkout progress
 */
export function useCheckoutTracking(step: number, stepName: string) {
	const prevStep = useRef(step);

	useEffect(() => {
		if (step !== prevStep.current) {
			analytics.checkoutStep(step, stepName);
			prevStep.current = step;
		}
	}, [step, stepName]);
}

/**
 * Hook to track form interactions
 */
export function useFormTracking(formName: string) {
	const trackFormStart = () => {
		analytics.track("form_start", { form_name: formName });
	};

	const trackFormSubmit = (success: boolean, error?: string) => {
		analytics.track("form_submit", {
			form_name: formName,
			success,
			error,
		});
	};

	const trackFieldError = (fieldName: string, errorMessage: string) => {
		analytics.track("form_field_error", {
			form_name: formName,
			field_name: fieldName,
			error_message: errorMessage,
		});
	};

	return {
		trackFormStart,
		trackFormSubmit,
		trackFieldError,
	};
}

/**
 * Hook to track user interactions
 */
export function useInteractionTracking() {
	const trackClick = (
		elementName: string,
		properties?: AnalyticsProperties
	) => {
		analytics.track(AnalyticsEvent.CLICK, {
			element_name: elementName,
			...properties,
		});
	};

	const trackHover = (elementName: string, duration?: number) => {
		analytics.track("hover", {
			element_name: elementName,
			duration,
		});
	};

	const trackScroll = (depth: number) => {
		analytics.track("scroll", {
			scroll_depth: depth,
		});
	};

	return {
		trackClick,
		trackHover,
		trackScroll,
	};
}

// Declare gtag for TypeScript
declare global {
	interface Window {
		gtag?: (command: string, action: string | object, params?: object) => void;
		dataLayer?: unknown[];
	}
}
