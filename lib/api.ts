import {
	CheckoutFormData,
	OrderConfirmationData,
	ShippingAddress,
	ShippingOption,
	PromoCode,
} from "@/types/checkout";
import { CartItem, Product, PRODUCT_CATEGORIES } from "@/types/product";
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
import { FAQItem, FAQCategory } from "@/types/faq"; // New import
import { format } from "date-fns";
import { ReturnFormValues } from "@/types/returns";
import { TradeSupportTicket } from "@/types/trade";
import { mockFAQData } from "@/data/mock-faq";
import { mockContentArchive } from "@/data/mock-content-archive";
import { mockProfessionalEndorsements } from "@/data/mock-professional-endorsements";
import { mockCaseStudies } from "@/data/mock-casestudies";
import { mockCustomerReviews } from "@/data/mock-customer-reviews";
import { mockCustomerStories } from "@/data/mock-customer-stories";
import { mockContests } from "@/data/mock-contests";
import { mockSocialMediaPosts } from "@/data/mock-social-media-posts";
import { mockGalleryProjects } from "@/data/mock-gallery-projects";
import { mockShippingOptions } from "@/data/mock-shipping-options";
import { mockPromoCodes } from "@/data/mock-promo-codes";
import { mockPortfolioProjects } from "@/data/mock-portfolio-projects";
import { mockConsultationPackages } from "@/data/mock-consulatation-packages";
import { mockProducts } from "@/data/mock-products";
// import { SupportTicket } from "@/types/contact";

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
			resolve(mockShippingOptions);
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
			resolve(mockPromoCodes);
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
					id: "ORD-20240729-001",
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
				{
					id: "ORD-20240501-003",
					date: "2024-05-01",
					totalAmount: 45.99,
					status: "Processing",
					items: [
						{
							productId: "roller-kit-001",
							name: "Premium Roller Kit",
							color: "N/A",
							finish: "N/A",
							quantity: 1,
							price: 45.99,
							image:
								"https://images.pexels.com/photos/6508390/pexels-photo-6508390.jpeg?auto=compress&cs=tinysrgb&w=400",
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
					estimatedDelivery: "2024-05-05",
				},
				{
					id: "ORD-20240315-004",
					date: "2024-03-15",
					totalAmount: 234.97,
					status: "Delivered",
					items: [
						{
							productId: "bathroom-paint-006",
							name: "Bathroom & Kitchen Paint",
							color: "Spa Blue",
							finish: "Satin",
							quantity: 2,
							price: 94.99,
							image:
								"https://images.pexels.com/photos/6782381/pexels-photo-6782381.jpeg?auto=compress&cs=tinysrgb&w=800",
						},
						{
							productId: "primer-001",
							name: "Premium Primer",
							color: "White",
							finish: "N/A",
							quantity: 1,
							price: 44.99,
							image:
								"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=400",
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
					estimatedDelivery: "2024-03-20",
					trackingNumber: "TRK456789123",
				},
			]);
		}, 1000); // Simulate network delay
	});
};

export const mockSubmitTicket = async (
	ticket: TradeSupportTicket
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

/**
 * Mocks submitting a return request.
 * @param returnData The data for the return request.
 * @returns A promise that resolves with return details or rejects with an error.
 */

export const mockSubmitReturnRequest = async (returnData: {
	orderId: string;
	items: Array<{
		productId: string;
		quantity: number;
		reason: string;
	}>;
	customerInfo: {
		name: string;
		email: string;
		phone?: string;
	};
	returnReason: string;
	additionalComments?: string;
}): Promise<{
	returnId: string;
	returnLabel: string;
	estimatedRefund: number;
}> => {
	console.log("Submitting return request:", returnData);
	await new Promise((resolve) => setTimeout(resolve, 1200));

	// Simulate occasional failure
	if (Math.random() < 0.05) {
		throw new Error("Failed to process return request. Please try again.");
	}

	const returnId = `RET-${Date.now()}`;
	const estimatedRefund = returnData.items.reduce(
		(sum, item) => sum + 89.99 * item.quantity,
		0
	);

	return {
		returnId,
		returnLabel: `https://example.com/return-label/${returnId}`,
		estimatedRefund,
	};
};

export const mockTrackReturn = async (
	returnId: string
): Promise<{
	status:
		| "initiated"
		| "label_printed"
		| "in_transit"
		| "received"
		| "processed"
		| "refunded";
	estimatedCompletion: string;
	updates: Array<{
		date: string;
		status: string;
		description: string;
	}>;
}> => {
	await new Promise((resolve) => setTimeout(resolve, 800));

	return {
		status: "in_transit",
		estimatedCompletion: "2024-02-05",
		updates: [
			{
				date: "2024-01-25",
				status: "Return Initiated",
				description: "Return request submitted and approved",
			},
			{
				date: "2024-01-26",
				status: "Return Label Generated",
				description: "Prepaid return label sent to your email",
			},
			{
				date: "2024-01-27",
				status: "Package Shipped",
				description: "Package picked up by carrier",
			},
		],
	};
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
			resolve(
				mockProducts.filter(
					(p) => p.category === PRODUCT_CATEGORIES.EXTERIOR_PAINT
				)
			);
		}, 1000); // Simulate network delay
	});
};

// Trade Program API functions
export const mockProcessBulkOrder = async (
	items: any[]
): Promise<{ success: boolean; orderId: string }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				orderId: `BO-${Date.now()}`,
			});
		}, 1500);
	});
};

export const mockSaveOrderTemplate = async (
	template: any
): Promise<{ success: boolean; templateId: string }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				templateId: `TPL-${Date.now()}`,
			});
		}, 1000);
	});
};

export const mockValidateUploadFile = async (file: File): Promise<any> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				isValid: true,
				validRows: 45,
				totalRows: 50,
				errors: [],
				warnings: ["5 rows have missing color information"],
			});
		}, 2000);
	});
};

/**
 * Mocks fetching consultation packages.
 * @returns A promise that resolves with an array of ConsultationPackage objects.
 */
export const mockFetchConsultationPackages = async (): Promise<
	ConsultationPackage[]
> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockConsultationPackages);
		}, 500);
	});
};

/**
 * Mocks fetching available consultation slots for a given date.
 * @param date The date to fetch slots for (YYYY-MM-DD).
 * @returns A promise that resolves with an array of ConsultationSlot objects.
 */
export const mockFetchAvailableSlots = async (
	date: string
): Promise<ConsultationSlot[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const slots: ConsultationSlot[] = [];
			const today = new Date();
			const requestedDate = new Date(date);

			// Only return slots for today or future dates
			if (
				requestedDate <
				new Date(today.getFullYear(), today.getMonth(), today.getDate())
			) {
				resolve([]);
				return;
			}

			const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
			times.forEach((time, index) => {
				// Simulate some slots being unavailable randomly
				const isAvailable = Math.random() > 0.2;
				slots.push({
					id: `${date}-${time}`,
					date,
					time,
					isAvailable,
				});
			});
			resolve(slots);
		}, 300);
	});
};

/**
 * Mocks booking a consultation.
 * @param bookingData The data for the consultation booking.
 * @returns A promise that resolves with a success message or rejects with an error.
 */
export const mockBookConsultation = async (
	bookingData: BookingFormData
): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const success = Math.random() > 0.1; // 90% success rate
			if (success) {
				console.log("Booking successful:", bookingData);
				resolve(
					`Your ${bookingData.serviceType} consultation for ${bookingData.date} at ${bookingData.time} has been confirmed!`
				);
			} else {
				reject(
					new Error(
						"Failed to book consultation. The slot might be taken or an error occurred."
					)
				);
			}
		}, 1000);
	});
};

/**
 * Mocks fetching portfolio projects.
 * @returns A promise that resolves with an array of PortfolioProject objects.
 */
export const mockFetchPortfolioProjects = async (): Promise<
	PortfolioProject[]
> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockPortfolioProjects);
		}, 700);
	});
};

// --- New Gallery API Mocks ---

/**
 * Mocks fetching gallery projects.
 * @returns A promise that resolves with an array of GalleryProject objects.
 */
export const mockFetchGalleryProjects = async (): Promise<GalleryProject[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockGalleryProjects.filter((p) => p.status === "approved"));
		}, 700);
	});
};

/**
 * Mocks submitting a new project to the gallery.
 * @param formData The project submission data.
 * @returns A promise that resolves with the newly created GalleryProject.
 */
export const mockSubmitProject = async (
	formData: ProjectSubmissionFormData
): Promise<GalleryProject> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const newProject: GalleryProject = {
				id: `gal-${Date.now()}`,
				userId: "user-current", // Placeholder for current user
				userName: "NewUser", // Placeholder for current user
				title: formData.title,
				description: formData.description,
				beforeImageUrl: formData.beforeImageFile
					? URL.createObjectURL(formData.beforeImageFile)
					: undefined,
				afterImageUrl: URL.createObjectURL(formData.afterImageFile),
				colorPalette: formData.colorPalette,
				paintProductsUsed: formData.paintProductsUsed,
				likes: 0,
				views: 0,
				submissionDate: format(new Date(), "yyyy-MM-dd"),
				status: "pending", // New submissions are pending moderation
				tags: formData.tags,
				commentsCount: 0,
			};
			mockGalleryProjects.push(newProject); // Add to mock data
			resolve(newProject);
		}, 1500);
	});
};

/**
 * Mocks voting/liking a gallery project.
 * @param projectId The ID of the project to like.
 * @returns A promise that resolves with the updated like count.
 */
export const mockVoteProject = async (projectId: string): Promise<number> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const project = mockGalleryProjects.find((p) => p.id === projectId);
			if (project) {
				project.likes += 1; // Simulate a like
				resolve(project.likes);
			} else {
				reject(new Error("Project not found."));
			}
		}, 300);
	});
};

/**
 * Mocks fetching social media posts.
 * @returns A promise that resolves with an array of SocialMediaPost objects.
 */
export const mockFetchSocialMediaFeed = async (): Promise<
	SocialMediaPost[]
> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockSocialMediaPosts);
		}, 600);
	});
};

/**
 * Mocks fetching contests.
 * @returns A promise that resolves with an array of Contest objects.
 */
export const mockFetchContests = async (): Promise<Contest[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockContests);
		}, 500);
	});
};

/**
 * Mocks submitting a contest entry.
 * @param formData The contest submission data.
 * @returns A promise that resolves with a success message.
 */
export const mockSubmitContestEntry = async (
	formData: ContestSubmissionFormData
): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.1) {
				// 90% success rate
				console.log("Contest entry submitted:", formData);
				resolve(
					"Your contest entry has been submitted successfully! Good luck!"
				);
			} else {
				reject(new Error("Failed to submit contest entry. Please try again."));
			}
		}, 1500);
	});
};

/**
 * Mocks fetching featured customer stories.
 * @returns A promise that resolves with an array of CustomerStory objects.
 */
export const mockFetchCustomerStories = async (): Promise<CustomerStory[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockCustomerStories);
		}, 800);
	});
};

// --- New Reviews API Mocks ---

/**
 * Mocks fetching customer reviews.
 * @returns A promise that resolves with an array of CustomerReview objects.
 */
export const mockFetchReviews = async (): Promise<CustomerReview[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockCustomerReviews);
		}, 700);
	});
};

/**
 * Mocks submitting a new customer review.
 * @param formData The review submission data.
 * @returns A promise that resolves with the newly created CustomerReview.
 */
export const mockSubmitReview = async (
	formData: ReviewSubmissionFormData
): Promise<CustomerReview> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const newReview: CustomerReview = {
				id: `rev-${Date.now()}`,
				productId: formData.productId,
				userName: formData.userName,
				userLocation: "Online Customer", // Default for new submissions
				rating: formData.rating,
				comment: formData.comment,
				date: format(new Date(), "yyyy-MM-dd"),
				verifiedPurchase: true, // Simulate as verified for simplicity
				photos: formData.photos
					? formData.photos.map((file) => URL.createObjectURL(file))
					: [],
				helpfulVotes: 0,
				unhelpfulVotes: 0,
			};
			mockCustomerReviews.unshift(newReview); // Add to the beginning of mock data
			resolve(newReview);
		}, 1500);
	});
};

/**
 * Mocks voting on a review's helpfulness.
 * @param reviewId The ID of the review.
 * @param type 'helpful' or 'unhelpful'.
 * @returns A promise that resolves with the updated vote counts.
 */
export const mockVoteReviewHelpfulness = async (
	reviewId: string,
	type: "helpful" | "unhelpful"
): Promise<{ helpfulVotes: number; unhelpfulVotes: number }> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const review = mockCustomerReviews.find((r) => r.id === reviewId);
			if (review) {
				if (type === "helpful") {
					review.helpfulVotes += 1;
				} else {
					review.unhelpfulVotes += 1;
				}
				resolve({
					helpfulVotes: review.helpfulVotes,
					unhelpfulVotes: review.unhelpfulVotes,
				});
			} else {
				reject(new Error("Review not found."));
			}
		}, 300);
	});
};

/**
 * Mocks submitting a business response to a review.
 * @param reviewId The ID of the review.
 * @param responseText The response text.
 * @returns A promise that resolves with the updated review.
 */
export const mockSubmitBusinessResponse = async (
	reviewId: string,
	responseText: string
): Promise<CustomerReview> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const review = mockCustomerReviews.find((r) => r.id === reviewId);
			if (review) {
				review.businessResponse = {
					responderName: "Paint Store Management",
					responseText,
					responseDate: format(new Date(), "yyyy-MM-dd"),
				};
				resolve(review);
			} else {
				reject(new Error("Review not found."));
			}
		}, 500);
	});
};

/**
 * Mocks fetching professional endorsements.
 * @returns A promise that resolves with an array of ProfessionalEndorsement objects.
 */
export const mockFetchProfessionalEndorsements = async (): Promise<
	ProfessionalEndorsement[]
> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockProfessionalEndorsements);
		}, 600);
	});
};

/**
 * Mocks fetching detailed case studies.
 * @returns A promise that resolves with an array of CaseStudy objects.
 */
export const mockFetchCaseStudies = async (): Promise<CaseStudy[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockCaseStudies);
		}, 800);
	});
};

// --- New Newsletter API Mocks ---

// In-memory store for mock subscriptions
const mockSubscriptions: NewsletterSubscription[] = [];

/**
 * Mocks subscribing a user to the newsletter.
 * @param formData The subscription data.
 * @returns A promise that resolves with the new subscription.
 */
export const mockSubscribeToNewsletter = async (
	formData: NewsletterSubscriptionFormData
): Promise<NewsletterSubscription> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const existing = mockSubscriptions.find(
				(s) => s.email === formData.email
			);
			if (existing) {
				if (existing.status === "subscribed") {
					reject(new Error("You are already subscribed to our newsletter."));
					return;
				} else {
					// Re-subscribe
					existing.status = "subscribed";
					existing.preferences = formData.preferences;
					existing.frequency = formData.frequency;
					existing.lastUpdated = new Date().toISOString();
					resolve(existing);
					return;
				}
			}

			const newSubscription: NewsletterSubscription = {
				id: `sub-${Date.now()}`,
				email: formData.email,
				status: "subscribed",
				preferences: formData.preferences,
				frequency: formData.frequency,
				subscribedAt: new Date().toISOString(),
			};
			mockSubscriptions.push(newSubscription);
			resolve(newSubscription);
		}, 1000);
	});
};

/**
 * Mocks fetching a user's subscription details.
 * @param email The user's email.
 * @returns A promise that resolves with the subscription or null if not found.
 */
export const mockFetchSubscription = async (
	email: string
): Promise<NewsletterSubscription | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const subscription = mockSubscriptions.find((s) => s.email === email);
			resolve(subscription || null);
		}, 500);
	});
};

/**
 * Mocks updating a user's subscription preferences.
 * @param updatedSubscription The updated subscription data.
 * @returns A promise that resolves with the updated subscription.
 */
export const mockUpdateSubscription = async (
	updatedSubscription: NewsletterSubscription
): Promise<NewsletterSubscription> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const index = mockSubscriptions.findIndex(
				(s) => s.id === updatedSubscription.id
			);
			if (index !== -1) {
				mockSubscriptions[index] = {
					...updatedSubscription,
					lastUpdated: new Date().toISOString(),
				};
				resolve(mockSubscriptions[index]);
			} else {
				reject(new Error("Subscription not found."));
			}
		}, 1000);
	});
};

/**
 * Mocks unsubscribing a user from the newsletter.
 * @param email The user's email.
 * @returns A promise that resolves on success.
 */
export const mockUnsubscribe = async (email: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const subscription = mockSubscriptions.find((s) => s.email === email);
			if (subscription) {
				subscription.status = "unsubscribed";
				subscription.lastUpdated = new Date().toISOString();
				resolve();
			} else {
				reject(new Error("Subscription not found."));
			}
		}, 500);
	});
};

/**
 * Mocks fetching content archive items.
 * @param filters Optional filters for categories or date range.
 * @returns A promise that resolves with an array of ContentArchiveItem.
 */
export const mockFetchContentArchive = async (filters?: {
	category?: string;
}): Promise<ContentArchiveItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let filtered = mockContentArchive;
			if (filters?.category) {
				filtered = filtered.filter((item) =>
					item.categories.includes(filters.category!)
				);
			}
			resolve(filtered);
		}, 700);
	});
};

/**
 * Mocks fetching personalized content recommendations.
 * (This would typically use user data/preferences from the backend)
 * @param email The user's email for personalization.
 * @returns A promise that resolves with an array of ContentArchiveItem.
 */
export const mockFetchRecommendations = async (
	email: string
): Promise<ContentArchiveItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const userSubscription = mockSubscriptions.find((s) => s.email === email);
			if (!userSubscription || userSubscription.status !== "subscribed") {
				resolve([]); // No recommendations for unsubscribed or non-existent users
				return;
			}

			// Simulate recommendations based on preferences
			let recommendations: ContentArchiveItem[] = [];
			if (userSubscription.preferences.includes("interior_paint")) {
				recommendations.push(mockContentArchive[0], mockContentArchive[1]);
			}
			if (userSubscription.preferences.includes("exterior_paint")) {
				recommendations.push(mockContentArchive[2]);
			}
			if (userSubscription.preferences.includes("color_trends")) {
				recommendations.push(mockContentArchive[0], mockContentArchive[3]);
			}
			if (userSubscription.preferences.includes("diy_tips")) {
				recommendations.push(mockContentArchive[1]);
			}

			// Remove duplicates and limit
			recommendations = Array.from(new Set(recommendations));
			resolve(recommendations.slice(0, 3)); // Limit to 3 recommendations
		}, 1000);
	});
};

// --- New FAQ API Mocks ---

/**
 * Mocks fetching FAQ items.
 * @param query Optional search query.
 * @param category Optional category filter.
 * @returns A promise that resolves with an array of FAQItem.
 */
export const mockFetchFAQs = async (
	query?: string,
	category?: FAQCategory
): Promise<FAQItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let filteredFAQs = mockFAQData;

			if (category && category !== "all") {
				filteredFAQs = filteredFAQs.filter((faq) => faq.category === category);
			}

			if (query) {
				const lowerCaseQuery = query.toLowerCase();
				filteredFAQs = filteredFAQs.filter(
					(faq) =>
						faq.question.toLowerCase().includes(lowerCaseQuery) ||
						faq.answer.toLowerCase().includes(lowerCaseQuery) ||
						faq.keywords.some((keyword) =>
							keyword.toLowerCase().includes(lowerCaseQuery)
						)
				);
			}
			resolve(filteredFAQs);
		}, 500);
	});
};

/**
 * Mocks voting on an FAQ's helpfulness.
 * @param faqId The ID of the FAQ.
 * @param type 'helpful' or 'unhelpful'.
 * @returns A promise that resolves with the updated vote counts.
 */
export const mockVoteFAQ = async (
	faqId: string,
	type: "helpful" | "unhelpful"
): Promise<{ helpfulVotes: number; unhelpfulVotes: number }> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const faq = mockFAQData.find((f) => f.id === faqId);
			if (faq) {
				if (type === "helpful") {
					faq.helpfulVotes += 1;
				} else {
					faq.unhelpfulVotes += 1;
				}
				resolve({
					helpfulVotes: faq.helpfulVotes,
					unhelpfulVotes: faq.unhelpfulVotes,
				});
			} else {
				reject(new Error("FAQ not found."));
			}
		}, 200);
	});
};
