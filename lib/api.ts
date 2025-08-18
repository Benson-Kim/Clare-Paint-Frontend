import {
	CheckoutFormData,
	OrderConfirmationData,
	ShippingAddress,
	ShippingOption,
	PromoCode,
} from "@/types/checkout";
import { CartItem, Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { mockExteriorPaints } from "@/data/mock-exterior-paints";
import { Order, DashboardStats } from "@/types/account";
import {
	ConsultationPackage,
	ConsultationSlot,
	BookingFormData,
	PortfolioProject,
} from "@/types/consultation";
import {
	GalleryProject,
	ProjectSubmissionFormData,
	SocialMediaPost,
	Contest,
	ContestSubmissionFormData,
	CustomerStory,
} from "@/types/gallery";
import {
	CustomerReview,
	ReviewSubmissionFormData,
	ProfessionalEndorsement,
	CaseStudy,
} from "@/types/reviews";
import {
	NewsletterSubscription,
	NewsletterSubscriptionFormData,
	ContentArchiveItem,
} from "@/types/newsletter";
import { FAQItem, FAQCategory } from "@/types/faq";
import { SupportTicket } from "@/types/contact";
import { ReturnFormValues } from "@/types/returns";
import { format } from "date-fns";

/**
 * Mocks an API call to validate a shipping address.
 * @param address The shipping address to validate.
 * @returns A promise that resolves with a boolean indicating validity.
 */
export const mockValidateAddress = async (
	address: ShippingAddress
): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Simulate some validation logic
			if (address.zipCode.length >= 5 && address.city && address.country) {
				resolve(true); // Address is valid
			} else {
				resolve(false); // Address is invalid
			}
		}, 500); // Simulate network delay
	});
};

/**
 * Mocks an API call to process an order.
 * @param formData The complete checkout form data.
 * @param cartItems The items in the cart.
 * @param subtotal The subtotal of the order.
 * @param total The total amount of the order.
 * @returns A promise that resolves with order confirmation data or rejects with an error.
 */
export const mockProcessOrder = async (
	formData: CheckoutFormData,
	cartItems: CartItem[],
	subtotal: number,
	total: number
): Promise<OrderConfirmationData> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate random success/failure
			const success = Math.random() > 0.1; // 90% success rate

			if (success) {
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

				resolve({
					orderId,
					totalAmount: total,
					estimatedDelivery,
					items: itemsWithDetails,
					shippingAddress: formData.shippingAddress,
					paymentMethodSummary,
					mixingInstructionsLink:
						"https://support.clairepaints.new/docs/paint-mixing-instructions",
				});
			} else {
				reject(
					new Error(
						"Payment failed or an unexpected error occurred. Please try again."
					)
				);
			}
		}, 1500); // Simulate network delay for order processing
	});
};

/**
 * Mocks fetching available shipping options.
 * @returns A promise that resolves with an array of shipping options.
 */
export const mockFetchShippingOptions = async (): Promise<ShippingOption[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "standard",
					name: "Standard Shipping",
					description: "5-7 business days",
					price: 0,
					estimatedDays: "5-7 days",
				},
				{
					id: "expedited",
					name: "Expedited Shipping",
					description: "2-3 business days",
					price: 15.99,
					estimatedDays: "2-3 days",
				},
				{
					id: "overnight",
					name: "Overnight Shipping",
					description: "Next business day",
					price: 29.99,
					estimatedDays: "1 day",
				},
			]);
		}, 300);
	});
};

/**
 * Mocks fetching available promo codes.
 * @returns A promise that resolves with an array of promo codes.
 */
export const mockFetchPromoCodes = async (): Promise<PromoCode[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					code: "SAVE10",
					discount: 10,
					type: "percentage",
					description: "10% off your order",
				},
				{
					code: "FREESHIP",
					discount: 0,
					type: "fixed",
					description: "Free standard shipping",
				},
				{
					code: "PAINT25",
					discount: 25,
					type: "fixed",
					description: "$25 off orders over $200",
					minOrderAmount: 200,
				},
			]);
		}, 200);
	});
};

/**
 * Mocks fetching user's order history.
 * @returns A promise that resolves with an array of Order objects.
 */
export const mockFetchOrderHistory = async (): Promise<Order[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "ORD-1629876543210-123",
					date: "2024-07-29",
					totalAmount: 189.98,
					status: "Delivered",
					items: [
						{
							productId: "premium-interior-paint-001",
							name: "Premium Interior Paint",
							color: "Sage Whisper",
							finish: "Matte",
							quantity: 1,
							price: 89.99,
							image:
								"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
						},
						{
							productId: "eco-friendly-paint-002",
							name: "Eco-Friendly Interior Paint",
							color: "Forest Green",
							finish: "Satin",
							quantity: 1,
							price: 79.99,
							image:
								"https://images.pexels.com/photos/6782373/pexels-photo-6782373.jpeg?auto=compress&cs=tinysrgb&w=800",
						},
						{
							productId: "brush-set-001",
							name: "Professional Brush Set",
							color: "N/A",
							finish: "N/A",
							quantity: 1,
							price: 19.99,
							image:
								"https://images.pexels.com/photos/1838564/pexels-photo-1838564.jpeg?auto=compress&cs=tinysrgb&w=400",
						},
					],
					shippingAddress: {
						firstName: "John",
						lastName: "Doe",
						address1: "123 Main St",
						city: "Anytown",
						state: "CA",
						zipCode: "90210",
					},
					estimatedDelivery: "2024-08-05",
					trackingNumber: "TRK123456789",
				},
				{
					id: "ORD-20240615-002",
					date: "2024-06-15",
					totalAmount: 129.99,
					status: "Shipped",
					items: [
						{
							productId: "luxury-paint-003",
							name: "Luxury Designer Paint",
							color: "Deep Burgundy",
							finish: "Eggshell",
							quantity: 1,
							price: 129.99,
							image:
								"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
						},
					],
					shippingAddress: {
						firstName: "Jane",
						lastName: "Smith",
						address1: "456 Oak Ave",
						city: "Sometown",
						state: "NY",
						zipCode: "10001",
					},
					estimatedDelivery: "2024-06-20",
					trackingNumber: "TRK987654321",
				},
			]);
		}, 1000); // Simulate network delay
	});
};

/**
 * Mocks fetching user's dashboard statistics.
 * @returns A promise that resolves with dashboard stats.
 */
export const mockFetchDashboardStats = async (): Promise<DashboardStats> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
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
			});
		}, 800);
	});
};

/**
 * Mocks reordering items from a previous order.
 * @param orderId The ID of the order to reorder.
 * @returns A promise that resolves when items are added to cart.
 */
export const mockReorderItems = async (orderId: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const success = Math.random() > 0.1; // 90% success rate
			if (success) {
				resolve();
			} else {
				reject(new Error("Failed to add items to cart. Please try again."));
			}
		}, 1000);
	});
};

/**
 * Mocks fetching exterior paint products.
 * @returns A promise that resolves with an array of Product objects.
 */
export const mockFetchExteriorPaints = async (): Promise<Product[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockExteriorPaints);
		}, 1000); // Simulate network delay
	});
};

// ... (rest of the file remains the same)

// --- New FAQ API Mocks ---

const mockFAQData: FAQItem[] = [
	// ... FAQ data
];

export const mockFetchFAQs = async (
	query?: string,
	category?: FAQCategory
): Promise<FAQItem[]> => {
	// ... implementation
};

export const mockVoteFAQ = async (
	faqId: string,
	type: "helpful" | "unhelpful"
): Promise<{ helpfulVotes: number; unhelpfulVotes: number }> => {
	// ... implementation
};

export const mockSubmitTicket = async (
	ticket: SupportTicket
): Promise<{ success: boolean; message: string }> => {
	console.log("Submitting support ticket:", ticket);
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

	if (ticket.subject.toLowerCase().includes("spam")) {
		return Promise.reject(
			new Error("Your ticket was flagged as spam. Please revise and resubmit.")
		);
	}

	return {
		success: true,
		message: `Ticket received! Your reference number is ${(
			Math.random() * 100000
		).toFixed(0)}. We'll respond within 24-48 hours.`,
	};
};

export const mockSubmitReturnRequest = async (
	returnData: ReturnFormValues
): Promise<{ success: boolean; message: string; rma: string }> => {
	console.log("Submitting return request:", returnData);
	await new Promise((resolve) => setTimeout(resolve, 1200));

	if (returnData.orderId.includes("000")) {
		return Promise.reject(new Error("This order ID is not eligible for returns."));
	}

	const rma = `RMA-${Date.now()}`;
	return {
		success: true,
		message: "Your return request has been approved. A prepaid return label and instructions have been sent to your email.",
		rma,
	};
};
