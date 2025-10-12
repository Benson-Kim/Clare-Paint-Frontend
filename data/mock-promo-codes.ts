import { PromoCode } from "@/types/checkout";

export const mockPromoCodes: PromoCode[] = [
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
];
