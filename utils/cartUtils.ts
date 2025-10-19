import { CartItem } from "@/types/product";
import { ShippingOption, PromoCode } from "@/types/cart";

export const calculateSubtotal = (items: CartItem[]): number => {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTax = (
	subtotal: number,
	taxRate: number = 0.08
): number => {
	return subtotal * taxRate;
};

export const calculateDiscount = (
	subtotal: number,
	promoCode: PromoCode | null
): number => {
	if (!promoCode) return 0;

	if (promoCode.type === "percentage") {
		const discount = subtotal * (promoCode.discount / 100);
		return promoCode.maxDiscount
			? Math.min(discount, promoCode.maxDiscount)
			: discount;
	} else {
		return promoCode.discount;
	}
};

export const calculateShipping = (
	subtotal: number,
	shippingOption: ShippingOption,
	promoCode: PromoCode | null
): number => {
	// Free shipping over $100
	if (subtotal >= 100) return 0;

	// Free shipping promo code
	if (promoCode?.code === "FREESHIP") return 0;

	return shippingOption.price;
};

export const calculateTotal = (
	subtotal: number,
	shipping: number,
	tax: number,
	discount: number
): number => {
	return Math.max(0, subtotal + shipping + tax - discount);
};

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "KES",
	}).format(amount);
};

export const calculateCoverage = (
	items: CartItem[],
	products: any[]
): number => {
	return items.reduce((total, item) => {
		const product = products.find((p) => p.id === item.productId);
		if (!product) return total;

		const coverage = parseInt(product.coverage?.match(/(\d+)/)?.[1] || "350");
		return total + coverage * item.quantity;
	}, 0);
};

export const estimateProjectCost = (
	squareFeet: number,
	coatsNeeded: number = 2,
	pricePerGallon: number = 89.99,
	coveragePerGallon: number = 350
): {
	gallonsNeeded: number;
	totalCost: number;
	costPerSqFt: number;
} => {
	const totalSqFt = squareFeet * coatsNeeded;
	const gallonsNeeded = Math.ceil(totalSqFt / coveragePerGallon);
	const totalCost = gallonsNeeded * pricePerGallon;
	const costPerSqFt = totalCost / squareFeet;

	return {
		gallonsNeeded,
		totalCost,
		costPerSqFt,
	};
};

export const validatePromoCode = (
	code: string,
	subtotal: number,
	availableCodes: PromoCode[]
): PromoCode | null => {
	const promo = availableCodes.find(
		(p) => p.code.toLowerCase() === code.toLowerCase()
	);

	if (!promo) return null;

	// Check minimum order amount
	if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
		return null;
	}

	// Check expiry date
	if (promo.expiryDate && new Date() > new Date(promo.expiryDate)) {
		return null;
	}

	// Check usage limit
	if (
		promo.usageLimit &&
		promo.usedCount &&
		promo.usedCount >= promo.usageLimit
	) {
		return null;
	}

	return promo;
};

export const groupCartItemsByProject = (items: CartItem[], products: any[]) => {
	return items.reduce((groups, item) => {
		const product = products.find((p) => p.id === item.productId);
		const projectName = product?.category || "General Project";

		if (!groups[projectName]) {
			groups[projectName] = [];
		}

		groups[projectName].push({
			...item,
			product,
			color: product?.colors.find((c: any) => c.id === item.colorId),
			finish: product?.finishes.find((f: any) => f.id === item.finishId),
		});

		return groups;
	}, {} as Record<string, any[]>);
};

export const generateCartSummary = (items: CartItem[], products: any[]) => {
	const itemsWithDetails = items.map((item) => {
		const product = products.find((p) => p.id === item.productId);
		return {
			...item,
			product,
			coverage: product
				? parseInt(product.coverage?.match(/(\d+)/)?.[1] || "350")
				: 350,
		};
	});

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalCoverage = itemsWithDetails.reduce(
		(sum, item) => sum + item.coverage * item.quantity,
		0
	);
	const totalValue = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const uniqueProducts = new Set(items.map((item) => item.productId)).size;
	const uniqueColors = new Set(items.map((item) => item.colorId)).size;

	return {
		totalItems,
		totalCoverage,
		totalValue,
		uniqueProducts,
		uniqueColors,
		averageItemPrice: totalValue / totalItems,
		coveragePerDollar: totalCoverage / totalValue,
	};
};
