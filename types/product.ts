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
	category: string;
	sku: string;
	weatherResistance?: string; // e.g., "Excellent", "Good"
	durabilityRating?: number; // 1-5 scale
	surfaceTypes?: string[]; // e.g., "Wood", "Masonry", "Metal"
	climateZones?: string[]; // e.g., "Hot & Humid", "Cold & Dry"
	maintenanceSchedule?: MaintenanceSchedule;
	beforeAfterImages?: BeforeAfterImage[];
}

export interface CartItem {
	productId: string;
	colorId: string;
	finishId: string;
	quantity: number;
	price: number;
}
