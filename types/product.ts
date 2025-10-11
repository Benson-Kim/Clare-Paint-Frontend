import z from "zod";

export interface ProductColor {
	id: string;
	name: string;
	hex: string;
	image: string;
	inStock: boolean;
	rgb: {
		r: number;
		g: number;
		b: number;
	};
}

export interface ProductFinish {
	id: string;
	name: string;
	description: string;
	sheen: string;
	price: number;
	coverage: string;
	inStock: boolean;
}

export interface ProductReview {
	id: string;
	userName: string;
	rating: number;
	comment: string;
	date: string;
	verified: boolean;
}

export interface BeforeAfterImage {
	id: string;
	before: string; // URL to before image
	after: string; // URL to after image
	description?: string;
}

export interface MaintenanceSchedule {
	interval: string; // e.g., "Annually", "Every 2-3 years"
	tasks: string[]; // e.g., "Inspect for cracks", "Clean surface"
}

export interface Product {
	id: string;
	name: string;
	brand: string;
	description: string;
	basePrice: number;
	category: ProductCategory;
	colors: ProductColor[];
	finishes: ProductFinish[];
	features: string[];
	coverage: string;
	dryTime: string;
	application: string[];
	reviews: ProductReview[];
	rating: number;
	reviewCount: number;
	inStock: boolean;
	images?: string[];
	sku: string;
	reorderable?: boolean;
	weatherResistance?: string; // e.g., "Excellent", "Good"
	durabilityRating?: number; // 1-5 scale
	surfaceTypes?: string[]; // e.g., "Wood", "Masonry", "Metal"
	climateZones?: string[]; // e.g., "Hot & Humid", "Cold & Dry"
	maintenanceSchedule?: MaintenanceSchedule;
	beforeAfterImages?: BeforeAfterImage[];
}

export const cartItemSchema = z.object({
	productId: z.string().min(1, "Product ID is required"),
	colorId: z.string().min(1, "Color ID is required"),
	finishId: z.string().min(1, "Finish ID is required"),
	quantity: z.number().int().positive().max(999, "Maximum quantity is 999"),
	price: z.number().positive("Price must be positive"),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export interface CartItemWithDetails extends CartItem {
	product: Product;
	color: ProductColor;
	finish: ProductFinish;
	totalPrice: number;
}

export const PRODUCT_CATEGORIES = {
	INTERIOR_PAINT: "interior paint",
	EXTERIOR_PAINT: "exterior paint",
	SPECIALTY_PAINT: "specialty paint",
	INTERIOR_PRIMER: "interior_primer",
	EXTERIOR_PRIMER: "exterior primer",
	PAINT_KIT: "paint kit",
	SPRAY_PAINT: "spray paint",
	PAINT_SAMPLE: "paint sample",
	PAINT_ACCESSORY: "paint accessory",
	BRUSH: "brush",
	ROLLER: "roller",
	PAINT_TRAY: "paint tray",
	TAPE: "painter's tape",
	COVERAGE_SHEET: "coverage sheet",
	SAFETY_GEAR: "safety gear",
	CLEANING_SUPPLY: "cleaning supply",
	TOOL_KIT: "tool kit",
	TOOL: "tool",
	ACCESSORY: "accessory",
} as const;

export const CART_CONSTRAINTS = {
	MIN_QUANTITY: 1,
	MAX_QUANTITY: 999,
	MAX_ITEMS: 50,
	MIN_PRICE: 0.01,
} as const;

export type ProductCategory =
	(typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

export function isReorderableProduct(product: Product): boolean {
	return (product.reorderable ?? false) && product.inStock;
}

export function isPaintProduct(category: ProductCategory): boolean {
	return (
		category === PRODUCT_CATEGORIES.INTERIOR_PAINT ||
		category === PRODUCT_CATEGORIES.EXTERIOR_PAINT ||
		category === PRODUCT_CATEGORIES.SPECIALTY_PAINT ||
		category === PRODUCT_CATEGORIES.INTERIOR_PRIMER ||
		category === PRODUCT_CATEGORIES.EXTERIOR_PRIMER
	);
}

export function validateCartItem(item: Partial<CartItem>): CartItem {
	return cartItemSchema.parse(item);
}
