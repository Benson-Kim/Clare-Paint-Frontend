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
import { FAQItem, FAQCategory } from "@/types/faq"; // New import
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
			resolve([
				{
					id: "virtual-basic",
					name: "Virtual Color Kickstart",
					type: "virtual",
					price: 75.0,
					description:
						"A quick virtual session to get your color journey started. Perfect for small projects or initial ideas.",
					features: [
						"30-minute video call",
						"Personalized color palette (3-5 colors)",
						"Digital mood board",
						"Follow-up email with recommendations",
					],
					duration: "30 minutes",
					image:
						"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
				},
				{
					id: "in-home-standard",
					name: "In-Home Color Harmony",
					type: "in-home",
					price: 250.0,
					description:
						"Comprehensive in-home consultation for a cohesive color scheme throughout your space.",
					features: [
						"90-minute in-home visit",
						"Detailed color scheme for up to 3 rooms",
						"Paint sample recommendations",
						"Lighting analysis",
						"Post-consultation summary report",
					],
					duration: "90 minutes",
					image:
						"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
				},
				{
					id: "commercial-pro",
					name: "Commercial Space Transformation",
					type: "commercial",
					price: 500.0,
					description:
						"Expert color strategy for commercial properties, focusing on brand identity and functionality.",
					features: [
						"2-hour on-site consultation",
						"Brand-aligned color palette",
						"Durability and maintenance recommendations",
						"Project timeline guidance",
						"Priority support",
					],
					duration: "120 minutes",
					image:
						"https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
				},
			]);
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
			resolve([
				{
					id: "proj-res-001",
					name: "Modern Living Room Refresh",
					client: "Sarah & Tom D.",
					description:
						"Transformed a dull living space into a vibrant, modern sanctuary with a cohesive color palette.",
					imageUrls: [
						"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
						"https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
						"https://images.pexels.com/photos/1866147/pexels-photo-1866147.jpeg?auto=compress&cs=tinysrgb&w=800",
					],
					type: "residential",
					colorPalette: ["#F5F5DC", "#5B7B7A", "#2C2C2C", "#C4A57B"],
				},
				{
					id: "proj-com-001",
					name: "Tech Office Revitalization",
					client: "Innovate Solutions",
					description:
						"Created an inspiring and productive environment for a tech startup, using colors that promote creativity and focus.",
					imageUrls: [
						"https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800",
						"https://images.pexels.com/photos/3862633/pexels-photo-3862633.jpeg?auto=compress&cs=tinysrgb&w=800",
						"https://images.pexels.com/photos/3862634/pexels-photo-3862634.jpeg?auto=compress&cs=tinysrgb&w=800",
					],
					type: "commercial",
					colorPalette: ["#E0E0E0", "#006994", "#2C2C2C", "#F5F5F5"],
				},
				{
					id: "proj-res-002",
					name: "Cozy Bedroom Retreat",
					client: "Jane M.",
					description:
						"Designed a serene and cozy bedroom atmosphere with soft, muted tones for ultimate relaxation.",
					imageUrls: [
						"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
						"https://images.pexels.com/photos/1743230/pexels-photo-1743230.jpeg?auto=compress&cs=tinysrgb&w=800",
					],
					type: "residential",
					colorPalette: ["#D3D3D3", "#E6E6FA", "#F5F5DC", "#FFFFFF"],
				},
			]);
		}, 700);
	});
};

// --- New Gallery API Mocks ---

const mockGalleryProjects: GalleryProject[] = [
	{
		id: "gal-001",
		userId: "user-1",
		userName: "PaintPro Sarah",
		title: "Vibrant Living Room Makeover",
		description:
			"Transformed my dull living room into a bright and inviting space using bold blues and a touch of sage green. The before and after is incredible!",
		beforeImageUrl:
			"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
		afterImageUrl:
			"https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
		colorPalette: ["#4A90E2", "#5B7B7A", "#F5F5DC"],
		paintProductsUsed: [
			{ productId: "premium-interior-paint-001", colorId: "ocean-blue" },
		],
		likes: 125,
		views: 1500,
		submissionDate: "2024-07-20",
		status: "approved",
		tags: ["living-room", "modern", "bold", "residential"],
		commentsCount: 15,
	},
	{
		id: "gal-002",
		userId: "user-2",
		userName: "DIY_Dave",
		title: "Cozy Bedroom Retreat",
		description:
			"Used a soft, warm cream to create a serene and cozy atmosphere in our master bedroom. Perfect for relaxation!",
		beforeImageUrl:
			"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
		afterImageUrl:
			"https://images.pexels.com/photos/1743230/pexels-photo-1743230.jpeg?auto=compress&cs=tinysrgb&w=800",
		colorPalette: ["#F5F5DC", "#D3D3D3"],
		paintProductsUsed: [
			{ productId: "bedroom-sanctuary-003", colorId: "warm-cream" },
		],
		likes: 88,
		views: 950,
		submissionDate: "2024-07-18",
		status: "approved",
		tags: ["bedroom", "cozy", "neutral", "residential"],
		commentsCount: 8,
	},
	{
		id: "gal-003",
		userId: "user-3",
		userName: "ProPainter_Mike",
		title: "Commercial Office Transformation",
		description:
			"Revitalized a corporate office space with a professional and inspiring color scheme. Improved employee morale and productivity!",
		beforeImageUrl:
			"https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800",
		afterImageUrl:
			"https://images.pexels.com/photos/3862633/pexels-photo-3862633.jpeg?auto=compress&cs=tinysrgb&w=800",
		colorPalette: ["#2C2C2C", "#E0E0E0", "#006994"],
		paintProductsUsed: [
			{ productId: "commercial-pro", colorId: "charcoal-gray" },
		],
		likes: 210,
		views: 2300,
		submissionDate: "2024-07-10",
		status: "approved",
		tags: ["office", "commercial", "modern", "professional"],
		commentsCount: 22,
	},
	{
		id: "gal-004",
		userId: "user-4",
		userName: "HomeRenovator",
		title: "Kitchen Cabinet Refresh",
		description:
			"Gave my kitchen a fresh new look by repainting the cabinets. It feels so much brighter now!",
		beforeImageUrl:
			"https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg?auto=compress&cs=tinysrgb&w=800",
		afterImageUrl:
			"https://images.pexels.com/photos/3926543/pexels-photo-3926543.jpeg?auto=compress&cs=tinysrgb&w=800",
		colorPalette: ["#FFFFFF", "#F5F5DC"],
		paintProductsUsed: [
			{ productId: "kitchen-bath-002", colorId: "pure-white" },
		],
		likes: 95,
		views: 1100,
		submissionDate: "2024-07-05",
		status: "approved",
		tags: ["kitchen", "cabinets", "refresh", "residential"],
		commentsCount: 10,
	},
];

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

const mockSocialMediaPosts: SocialMediaPost[] = [
	{
		id: "sm-001",
		platform: "instagram",
		username: "paint_inspiration",
		profileUrl: "https://instagram.com/paint_inspiration",
		imageUrl:
			"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Loving this sage green in a cozy reading nook! #paintideas #homedecor",
		likes: 1230,
		comments: 45,
		postUrl: "https://instagram.com/p/12345",
		timestamp: "2024-07-30T10:00:00Z",
		hashtags: ["paintideas", "homedecor", "sagewhisper"],
	},
	{
		id: "sm-002",
		platform: "facebook",
		username: "DreamHomesOfficial",
		profileUrl: "https://facebook.com/dreamhomesofficial",
		imageUrl:
			"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Our latest project: a modern living room with a stunning accent wall! What do you think?",
		likes: 890,
		comments: 70,
		postUrl: "https://facebook.com/post/67890",
		timestamp: "2024-07-29T14:30:00Z",
		hashtags: ["livingroom", "accentwall", "interiordesign"],
	},
	{
		id: "sm-003",
		platform: "pinterest",
		username: "ColorTrendsDaily",
		profileUrl: "https://pinterest.com/colortrendsdaily",
		imageUrl:
			"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Deep burgundy is making a comeback! Perfect for a dramatic dining room.",
		likes: 2100,
		comments: 120,
		postUrl: "https://pinterest.com/pin/112233",
		timestamp: "2024-07-28T09:15:00Z",
		hashtags: ["burgundy", "diningroom", "colortrends"],
	},
];

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

const mockContests: Contest[] = [
	{
		id: "contest-001",
		name: "Summer Refresh Challenge",
		description:
			"Show us your best summer home refresh project! Transform a room with a fresh coat of paint and win amazing prizes.",
		startDate: "2024-08-01",
		endDate: "2024-08-31",
		theme: "Bright & Airy Spaces",
		prizes: [
			"Gift Card ($500)",
			"Paint Supply Bundle",
			"Featured on Social Media",
		],
		rulesUrl: "/contest-rules-summer-refresh.pdf",
		imageUrl:
			"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
		status: "active",
	},
	{
		id: "contest-002",
		name: "Kids Room Creativity",
		description:
			"Unleash your creativity in your child's room! Submit your most imaginative and colorful kids' room paint projects.",
		startDate: "2024-09-15",
		endDate: "2024-10-15",
		theme: "Playful & Imaginative",
		prizes: ["Tablet", "Custom Mural Kit", "Paint Store Credit ($200)"],
		rulesUrl: "/contest-rules-kids-room.pdf",
		imageUrl:
			"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
		status: "upcoming",
	},
];

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

const mockCustomerStories: CustomerStory[] = [
	{
		id: "story-001",
		title: "From Drab to Fab: Our Living Room Journey",
		customerName: "Emily & John D.",
		location: "San Francisco, CA",
		story:
			"We always dreamed of a living room that felt both modern and cozy. With the help of your color consultation service, we chose a beautiful sage green that completely transformed our space. The paint quality was exceptional, and the process was much smoother than we anticipated. We spend so much more time in here now!",
		imageUrl:
			"https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
		projectType: "Residential Interior",
		date: "2024-06-10",
	},
	{
		id: "story-002",
		title: "A Fresh Start for Our Small Business",
		customerName: "Maria S. (Cafe Owner)",
		location: "Austin, TX",
		story:
			"Our cafe needed a serious facelift to attract more customers. Your commercial paint recommendations were spot on! We went with a warm, inviting yellow and a clean white trim. The new look has significantly boosted our foot traffic and customer reviews. Thank you for helping us create such a welcoming atmosphere!",
		imageUrl:
			"https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
		projectType: "Commercial Interior",
		date: "2024-05-22",
	},
	{
		id: "story-003",
		title: "DIY Success: Our Nursery Project",
		customerName: "Jessica L.",
		location: "Seattle, WA",
		story:
			"As first-time parents, decorating the nursery felt daunting. Your eco-friendly, low-VOC paint made us feel safe, and the soft lavender color created the perfect calming environment. It was surprisingly easy to apply, and we're so proud of the result. Our little one loves their new room!",
		imageUrl:
			"https://images.pexels.com/photos/1743230/pexels-photo-1743230.jpeg?auto=compress&cs=tinysrgb&w=800",
		projectType: "Residential Nursery",
		date: "2024-04-15",
	},
];

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

const mockCustomerReviews: CustomerReview[] = [
	{
		id: "rev-001",
		productId: "premium-interior-paint-001",
		userName: "Sarah M.",
		userLocation: "New York, NY",
		rating: 5,
		comment:
			"Exceptional quality paint! The coverage is fantastic and the color stayed true to the sample. Easy to apply and looks professional.",
		date: "2024-07-25",
		verifiedPurchase: true,
		photos: [
			"https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		helpfulVotes: 15,
		unhelpfulVotes: 1,
		businessResponse: {
			responderName: "Paint Store Support",
			responseText:
				"Thank you, Sarah! We are thrilled to hear you love our Premium Interior Paint. Your beautiful living room transformation is truly inspiring!",
			responseDate: "2024-07-26",
		},
	},
	{
		id: "rev-002",
		productId: "eco-friendly-paint-002",
		userName: "Mike R.",
		userLocation: "Austin, TX",
		rating: 4,
		comment:
			"Great eco-friendly option. No strong odors and safe for the kids. Took two coats on a dark wall, but overall very happy.",
		date: "2024-07-20",
		verifiedPurchase: true,
		photos: [],
		helpfulVotes: 8,
		unhelpfulVotes: 0,
	},
	{
		id: "rev-003",
		productId: "luxury-paint-003",
		userName: "Jennifer L.",
		userLocation: "Los Angeles, CA",
		rating: 5,
		comment:
			"Absolutely stunning colors and finish. Worth every penny! My dining room looks like a masterpiece.",
		date: "2024-07-18",
		verifiedPurchase: true,
		photos: [
			"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		helpfulVotes: 22,
		unhelpfulVotes: 2,
	},
	{
		id: "rev-004",
		productId: "bathroom-paint-006",
		userName: "David S.",
		userLocation: "Miami, FL",
		rating: 4,
		comment:
			"Perfect for our bathroom renovation. No mold issues after 6 months! The Spa Blue is very calming.",
		date: "2024-07-10",
		verifiedPurchase: true,
		photos: [],
		helpfulVotes: 10,
		unhelpfulVotes: 0,
	},
	{
		id: "rev-005",
		userName: "Anonymous User",
		rating: 3,
		comment:
			"The paint color was a bit different than expected from the online swatch. Quality is decent though.",
		date: "2024-07-05",
		verifiedPurchase: false,
		photos: [],
		helpfulVotes: 3,
		unhelpfulVotes: 5,
	},
];

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

const mockProfessionalEndorsements: ProfessionalEndorsement[] = [
	{
		id: "prof-001",
		professionalName: "Eleanor Vance",
		title: "Lead Interior Designer",
		company: "Vance Design Studio",
		quote:
			"The depth of color and durability of these paints are unmatched. My clients consistently rave about the results. A truly professional-grade product.",
		photoUrl:
			"https://images.pexels.com/photos/3760303/pexels-photo-3760303.jpeg?auto=compress&cs=tinysrgb&w=400",
		date: "2024-05-10",
	},
	{
		id: "prof-002",
		professionalName: "Marcus Thorne",
		title: "Master Painter & Contractor",
		company: "Thorne Painting Solutions",
		quote:
			"I've used countless brands over 30 years, and this paint consistently delivers superior coverage and a flawless finish. It saves me time and ensures client satisfaction.",
		photoUrl:
			"https://images.pexels.com/photos/3760304/pexels-photo-3760304.jpeg?auto=compress&cs=tinysrgb&w=400",
		date: "2024-04-20",
	},
	{
		id: "prof-003",
		professionalName: "Sophia Chen",
		title: "Architectural Color Consultant",
		company: "Color Harmony Group",
		quote:
			"Their color palette is incredibly sophisticated, and the technical support is invaluable. I confidently recommend their products for both residential and commercial projects.",
		photoUrl:
			"https://images.pexels.com/photos/3760305/pexels-photo-3760305.jpeg?auto=compress&cs=tinysrgb&w=400",
		date: "2024-06-01",
	},
];

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

const mockCaseStudies: CaseStudy[] = [
	{
		id: "case-001",
		title: "Historic Home Restoration: Bringing Victorian Charm to Life",
		clientName: "The Evergreen Family",
		industry: "Residential",
		problem:
			"Faded, peeling paint on a 100-year-old Victorian home, requiring historically accurate colors and durable exterior protection.",
		solution:
			"Utilized specialized exterior paints with advanced weather resistance, meticulously color-matched to original historical swatches, and applied with expert techniques.",
		results:
			"The home was restored to its original grandeur, with vibrant, long-lasting colors that enhanced its curb appeal and protected it from the elements. Client satisfaction was extremely high.",
		imageUrl:
			"https://images.pexels.com/photos/164009/pexels-photo-164009.jpeg?auto=compress&cs=tinysrgb&w=800",
		fullStoryLink: "#",
	},
	{
		id: "case-002",
		title: "Corporate Office Transformation: Boosting Productivity with Color",
		clientName: "Innovate Solutions Inc.",
		industry: "Commercial",
		problem:
			"A drab, uninspiring office environment leading to low employee morale and perceived lack of creativity.",
		solution:
			"Conducted a comprehensive color consultation to select a palette that promotes focus, creativity, and collaboration, using low-VOC interior paints for a healthier workspace.",
		results:
			"Employees reported increased satisfaction and productivity. The vibrant new environment reflected the company's innovative spirit and impressed visiting clients.",
		imageUrl:
			"https://images.pexels.com/photos/3862633/pexels-photo-3862633.jpeg?auto=compress&cs=tinysrgb&w=800",
		fullStoryLink: "#",
	},
];

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

const mockContentArchive: ContentArchiveItem[] = [
	{
		id: "arc-001",
		title: "Top 5 Interior Paint Trends for 2024",
		description:
			"Discover the colors and finishes dominating interior design this year.",
		publishDate: "2024-07-15",
		imageUrl:
			"https://images.pexels.com/photos/6782372/pexels-photo-6782372.jpeg?auto=compress&cs=tinysrgb&w=800",
		categories: ["color_trends", "interior_paint"],
		contentUrl: "#",
	},
	{
		id: "arc-002",
		title: "DIY Guide: Painting Your Kitchen Cabinets Like a Pro",
		description:
			"Step-by-step instructions for a flawless cabinet transformation.",
		publishDate: "2024-07-01",
		imageUrl:
			"https://images.pexels.com/photos/3926543/pexels-photo-3926543.jpeg?auto=compress&cs=tinysrgb&w=800",
		categories: ["diy_tips", "interior_paint"],
		contentUrl: "#",
	},
	{
		id: "arc-003",
		title: "Protecting Your Home: Best Exterior Paints for Harsh Climates",
		description:
			"Learn about durable exterior paint options that withstand extreme weather.",
		publishDate: "2024-06-15",
		imageUrl:
			"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=800",
		categories: ["exterior_paint", "diy_tips"],
		contentUrl: "#",
	},
	{
		id: "arc-004",
		title: "Color Spotlight: The Versatility of Sage Green",
		description:
			"Explore the calming and sophisticated appeal of sage green in various settings.",
		publishDate: "2024-06-01",
		imageUrl:
			"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
		categories: ["color_trends"],
		contentUrl: "#",
	},
];

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

const mockFAQData: FAQItem[] = [
	{
		id: "faq-001",
		question: "What is the best paint for a living room?",
		answer:
			"For living rooms, we recommend our Premium Interior Latex Paint. It offers excellent durability, washability, and a smooth finish, perfect for high-traffic areas. Eggshell or satin finishes are popular choices for their subtle sheen and easy maintenance.",
		category: "product_questions",
		keywords: ["living room", "interior paint", "best paint", "finish"],
		helpfulVotes: 45,
		unhelpfulVotes: 2,
		relatedQuestions: ["faq-002", "faq-003"],
	},
	{
		id: "faq-002",
		question: "How many gallons of paint do I need for a room?",
		answer:
			"A general rule of thumb is that one gallon of paint covers approximately 350-400 square feet with one coat. To calculate your needs, measure the length and height of each wall, multiply them to get the square footage, and add them together. Subtract the area of windows and doors. We recommend two coats for optimal coverage and durability. Our online paint calculator can help you get a precise estimate!",
		category: "product_questions",
		keywords: ["gallons", "coverage", "calculator", "quantity"],
		helpfulVotes: 60,
		unhelpfulVotes: 5,
		relatedQuestions: ["faq-001", "faq-003"],
	},
	{
		id: "faq-003",
		question:
			"What is the difference between matte, eggshell, and satin finishes?",
		answer:
			"These terms refer to the sheen level of the paint. Matte has the least shine, offering a smooth, non-reflective surface that hides imperfections well. Eggshell has a very subtle, low sheen, resembling an eggshell, and is more durable than matte. Satin has a soft, velvety sheen, is highly durable, and easy to clean, making it ideal for high-traffic areas like kitchens and bathrooms. Semi-gloss and gloss have progressively higher sheens and are best for trim, doors, and cabinets.",
		category: "product_questions",
		keywords: [
			"finish",
			"sheen",
			"matte",
			"eggshell",
			"satin",
			"semi-gloss",
			"gloss",
		],
		helpfulVotes: 75,
		unhelpfulVotes: 3,
		relatedQuestions: ["faq-001"],
	},
	{
		id: "faq-004",
		question: "What is your return policy?",
		answer:
			"We offer a 30-day return policy for unopened, unused paint and supplies in their original condition. Custom-tinted paints are non-returnable. Please bring your original receipt for a full refund or exchange. For online orders, please contact customer service to arrange a return.",
		category: "shipping_returns",
		keywords: ["return", "policy", "refund", "exchange"],
		helpfulVotes: 30,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-005"],
	},
	{
		id: "faq-005",
		question: "How long does shipping take?",
		answer:
			"Standard shipping typically takes 5-7 business days. Expedited shipping is available for 2-3 business days, and overnight shipping delivers on the next business day. Delivery times may vary based on your location and product availability.",
		category: "shipping_returns",
		keywords: ["shipping", "delivery", "time", "expedited", "overnight"],
		helpfulVotes: 25,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-004"],
	},
	{
		id: "faq-006",
		question: "How can I get help with color matching?",
		answer:
			"We offer several resources for color matching! You can use our online color matching tool by uploading a photo, order free color samples to test at home, or book a virtual or in-home color consultation with our expert designers. For precise matches, visit one of our stores with a sample of the color you wish to match.",
		category: "color_matching",
		keywords: ["color match", "consultation", "samples", "tool"],
		helpfulVotes: 55,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-007"],
	},
	{
		id: "faq-007",
		question: "Can I get a custom paint color mixed?",
		answer:
			"Yes, we offer custom paint color mixing services! Bring in a sample of the color you want to match (e.g., a fabric swatch, a piece of trim, or a photo), and our in-store experts will use our advanced color-matching technology to create your perfect custom shade. Please note that custom-mixed paints are non-returnable.",
		category: "color_matching",
		keywords: ["custom color", "mixed paint", "match", "shade"],
		helpfulVotes: 40,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-006"],
	},
	{
		id: "faq-008",
		question: "My paint looks different on the wall than in the can. Why?",
		answer:
			"Several factors can influence how paint color appears. Lighting (natural vs. artificial, warm vs. cool), surrounding colors in the room, and the texture of the wall can all affect perception. Always test a sample on your wall and observe it throughout the day under different lighting conditions before committing to the entire room.",
		category: "color_matching",
		keywords: ["color difference", "lighting", "swatch", "sample"],
		helpfulVotes: 38,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-006"],
	},
	{
		id: "faq-009",
		question: "I am having trouble applying the paint. What should I do?",
		answer:
			"Ensure your surface is properly prepared (clean, dry, smooth). Check the paint can for specific application instructions, including recommended tools (brush, roller, sprayer) and temperature/humidity conditions. If the paint is too thick, it might need thinning (check the label first, as not all paints can be thinned). Watch our application guide videos for step-by-step tutorials.",
		category: "technical_support",
		keywords: ["application", "trouble", "paint", "thick", "thinning", "guide"],
		helpfulVotes: 28,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-010"],
	},
	{
		id: "faq-010",
		question: "How do I clean paint brushes and rollers?",
		answer:
			"For latex or water-based paints, rinse brushes and rollers thoroughly with warm, soapy water until the water runs clear. Squeeze out excess water and reshape brushes before drying. For oil-based paints, use mineral spirits or a paint thinner for cleaning, then wash with soap and water. Always clean tools immediately after use for best results.",
		category: "technical_support",
		keywords: ["clean", "brushes", "rollers", "latex", "oil-based"],
		helpfulVotes: 35,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-009"],
	},
];

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
