import {
	TradeAccount,
	TradeProject,
	TradeOrder,
	TradeInvoice,
	TradeRegistrationData,
	TradeSupportTicket,
} from "@/types/trade";

/**
 * Mock API functions for trade program functionality
 */

export const mockSubmitTradeRegistration = async (
	data: TradeRegistrationData
): Promise<{ success: boolean; accountId?: string; message: string }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Simulate registration processing
			const success = Math.random() > 0.1; // 90% success rate

			if (success) {
				resolve({
					success: true,
					accountId: `TRADE-${Date.now()}`,
					message:
						"Registration submitted successfully. You will receive approval notification within 2-3 business days.",
				});
			} else {
				resolve({
					success: false,
					message:
						"Registration failed. Please check your information and try again.",
				});
			}
		}, 2000);
	});
};

export const mockVerifyTradeAccount = async (
	accountId: string
): Promise<TradeAccount> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: accountId,
				businessName: "Rodriguez Painting Contractors",
				businessType: "llc",
				taxId: "12-3456789",
				status: "approved",
				tier: "professional",
				discountRate: 15,
				creditLimit: 50000,
				paymentTerms: "Net 30",
				accountManager: "Mike Rodriguez",
				createdAt: "2024-01-01",
				lastOrderDate: "2024-01-20",
				totalVolume: 125000,
				yearToDateVolume: 25000,
			});
		}, 1000);
	});
};

export const mockFetchTradeProjects = async (
	accountId: string
): Promise<TradeProject[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "proj-001",
					name: "Downtown Office Complex",
					description:
						"Complete interior renovation of 50,000 sq ft office building",
					client: "ABC Corporation",
					jobSiteAddress: {
						type: "job_site",
						address1: "123 Business Ave",
						city: "Downtown",
						state: "CA",
						zipCode: "90210",
						country: "USA",
						isDefault: false,
						deliveryInstructions: "Deliver to loading dock on north side",
					},
					status: "in_progress",
					startDate: "2024-01-15",
					endDate: "2024-03-15",
					estimatedBudget: 75000,
					actualCost: 45000,
					paintEstimate: 200,
					paintUsed: 120,
					crewMembers: ["John Smith", "Maria Garcia", "Tom Wilson"],
					orders: ["order-001", "order-002"],
					notes: "Client requested eco-friendly paints only",
					photos: [],
					completionPercentage: 60,
				},
				{
					id: "proj-002",
					name: "Residential Exterior Refresh",
					description: "Exterior painting for luxury home development",
					client: "Sunset Homes",
					jobSiteAddress: {
						type: "job_site",
						address1: "456 Maple Street",
						city: "Suburbs",
						state: "CA",
						zipCode: "90211",
						country: "USA",
						isDefault: false,
					},
					status: "planning",
					startDate: "2024-02-01",
					endDate: "2024-02-28",
					estimatedBudget: 35000,
					actualCost: 0,
					paintEstimate: 150,
					paintUsed: 0,
					crewMembers: ["John Smith", "Alex Brown"],
					orders: [],
					notes: "Weather dependent - monitor forecast",
					photos: [],
					completionPercentage: 0,
				},
			]);
		}, 800);
	});
};

export const mockFetchTradeOrders = async (
	accountId: string
): Promise<TradeOrder[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "order-001",
					orderNumber: "TO-2024-001",
					status: "delivered",
					orderDate: "2024-01-15",
					requestedDeliveryDate: "2024-01-18",
					actualDeliveryDate: "2024-01-18",
					items: [
						{
							productId: "trade-001",
							productName: "Professional Interior Latex - Contractor Grade",
							brand: "Artisan Pro",
							color: "Antique White",
							finish: "Eggshell",
							size: "5 litre",
							unitPrice: 89.99,
							tradePrice: 72.0,
							quantity: 20,
							totalPrice: 1440.0,
							leadTime: "1-2 days",
							inStock: true,
						},
					],
					subtotal: 1800.0,
					discount: 360.0,
					tax: 115.2,
					shipping: 0,
					total: 1555.2,
					paymentTerms: "Net 30",
					purchaseOrderNumber: "PO-ABC-2024-001",
					notes: "Deliver to loading dock",
				},
			]);
		}, 600);
	});
};

export const mockFetchTradeInvoices = async (
	accountId: string
): Promise<TradeInvoice[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "inv-001",
					invoiceNumber: "INV-2024-001",
					orderId: "order-001",
					issueDate: "2024-01-18",
					dueDate: "2024-02-17",
					status: "sent",
					subtotal: 1440.0,
					discount: 360.0,
					tax: 115.2,
					total: 1555.2,
					amountPaid: 0,
					balance: 1555.2,
					terms: "Net 30",
					notes: "Payment due within 30 days of invoice date",
				},
			]);
		}, 500);
	});
};

export const mockSubmitBulkOrder = async (
	items: any[],
	projectId?: string
): Promise<{ success: boolean; orderId?: string; message: string }> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const success = Math.random() > 0.05; // 95% success rate

			if (success) {
				resolve({
					success: true,
					orderId: `TO-${Date.now()}`,
					message:
						"Bulk order submitted successfully. You will receive confirmation within 1 hour.",
				});
			} else {
				resolve({
					success: false,
					message:
						"Order submission failed. Please check your items and try again.",
				});
			}
		}, 1500);
	});
};

export const mockCreateSupportTicket = async (
	ticket: Omit<TradeSupportTicket, "id" | "createdAt" | "updatedAt">
): Promise<TradeSupportTicket> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				...ticket,
				id: `TKT-${Date.now()}`,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				status: "open",
			});
		}, 1000);
	});
};

export const mockFetchSupportTickets = async (
	accountId: string
): Promise<TradeSupportTicket[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "TKT-001",
					subject: "Color matching for large commercial project",
					description:
						"Need assistance matching existing paint color for office building renovation",
					priority: "high",
					status: "in_progress",
					category: "technical",
					assignedTo: "Sarah Chen",
					createdAt: "2024-01-20T10:00:00Z",
					updatedAt: "2024-01-22T14:30:00Z",
				},
				{
					id: "TKT-002",
					subject: "Delivery scheduling for job site",
					description: "Need to coordinate delivery for multiple locations",
					priority: "medium",
					status: "open",
					category: "delivery",
					createdAt: "2024-01-18T09:15:00Z",
					updatedAt: "2024-01-18T09:15:00Z",
				},
			]);
		}, 700);
	});
};

export const mockCalculateTradeDiscount = (
	volume: number,
	tier: string
): { discount: number; savings: number; nextTierVolume?: number } => {
	const tiers = {
		starter: { discount: 5, minVolume: 5000 },
		professional: { discount: 10, minVolume: 25000 },
		contractor: { discount: 15, minVolume: 75000 },
		enterprise: { discount: 25, minVolume: 200000 },
	};

	const currentTier = tiers[tier as keyof typeof tiers];
	const discount = currentTier.discount;
	const savings = volume * (discount / 100);

	// Find next tier
	const tierEntries = Object.entries(tiers);
	const currentIndex = tierEntries.findIndex(([key]) => key === tier);
	const nextTier = tierEntries[currentIndex + 1];

	return {
		discount,
		savings,
		nextTierVolume: nextTier ? nextTier[1].minVolume : undefined,
	};
};

export const mockGenerateInvoice = async (
	orderId: string
): Promise<TradeInvoice> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: `inv-${Date.now()}`,
				invoiceNumber: `INV-${Date.now()}`,
				orderId,
				issueDate: new Date().toISOString().split("T")[0],
				dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
					.toISOString()
					.split("T")[0],
				status: "draft",
				subtotal: 2500.0,
				discount: 375.0,
				tax: 170.0,
				total: 2295.0,
				amountPaid: 0,
				balance: 2295.0,
				terms: "Net 30",
			});
		}, 1000);
	});
};
