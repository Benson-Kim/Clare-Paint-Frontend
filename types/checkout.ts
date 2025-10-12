import { z } from "zod";

// Zod Schemas for validation
export const shippingAddressSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	company: z.string().optional(),
	address1: z.string().min(1, "Address Line 1 is required"),
	address2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zipCode: z
		.string()
		.min(5, "Zip Code is required")
		.max(10, "Zip Code is too long"),
	country: z.string().min(1, "Country is required"),
	phone: z.string().optional(),
});

export const paymentMethodSchema = z
	.object({
		type: z.enum(["credit", "paypal"], {
			message: "Payment method is required",
		}),
		cardNumber: z.string().optional(),
		expiryMonth: z.string().optional(),
		expiryYear: z.string().optional(),
		cvv: z.string().optional(),
		cardholderName: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.type === "credit") {
			if (
				!data.cardNumber ||
				!/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ""))
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Valid card number is required",
					path: ["cardNumber"],
				});
			}
			if (!data.expiryMonth || !/^(0[1-9]|1[0-2])$/.test(data.expiryMonth)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Valid month (MM) is required",
					path: ["expiryMonth"],
				});
			}
			if (!data.expiryYear || !/^\d{2}$/.test(data.expiryYear)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Valid year (YY) is required",
					path: ["expiryYear"],
				});
			} else {
				const currentYear = new Date().getFullYear() % 100;
				const currentMonth = new Date().getMonth() + 1;
				const inputYear = parseInt(data.expiryYear, 10);
				const inputMonth = parseInt(data.expiryMonth || "0", 10);

				if (
					inputYear < currentYear ||
					(inputYear === currentYear && inputMonth < currentMonth)
				) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Card has expired",
						path: ["expiryYear"],
					});
				}
			}
			if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Valid CVV (3-4 digits) is required",
					path: ["cvv"],
				});
			}
			if (!data.cardholderName || data.cardholderName.trim() === "") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Cardholder name is required",
					path: ["cardholderName"],
				});
			}
		}
	});

export const checkoutFormSchema = z.object({
	shippingAddress: shippingAddressSchema,
	billingAddress: shippingAddressSchema.optional(),
	sameAsShipping: z.boolean().default(true),
	shippingOption: z.object({
		id: z.string().min(1, "Shipping option is required"),
		name: z.string(),
		description: z.string(),
		price: z.number(),
		estimatedDays: z.string(),
		carrier: z.string(),
		trackingAvailable: z.boolean(),
	}),
	paymentMethod: paymentMethodSchema,
	promoCode: z.string().optional(),
});

// TypeScript Types inferred from Zod Schemas
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

// Additional types for order processing
export interface OrderConfirmationData {
	orderId: string;
	totalAmount: number;
	estimatedDelivery: string;
	items: Array<{
		productId: string;
		name: string;
		color: string;
		finish: string;
		quantity: number;
		price: number;
		image: string;
	}>;
	shippingAddress: ShippingAddress;
	paymentMethodSummary: string;
	mixingInstructionsLink: string;
}

export interface ShippingOption {
	id: string;
	name: string;
	description: string;
	price: number;
	estimatedDays: string;
}

export interface PromoCode {
	code: string;
	discount: number;
	type: "percentage" | "fixed";
	description: string;
	minOrderAmount?: number;
	maxDiscount?: number;
	expiryDate?: string;
	usageLimit?: number;
	usedCount?: number;
}
