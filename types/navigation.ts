export interface NavigationItem {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	dropdownId?: string;
	items?: NavigationSubItem[];
}

export interface NavigationSubItem {
	label: string;
	href: string;
	description?: string;
	featured?: boolean;
	icon?: React.ReactNode;
}

export interface SearchSuggestion {
	id: string;
	text: string;
	type: "product" | "color" | "category" | "recent" | "popular";
	count?: number;
	image?: string;
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	isAuthenticated: boolean;
}

export interface CartSummary {
	itemCount: number;
	totalPrice: number;
	items: CartPreviewItem[];
}

export interface CartPreviewItem {
	id: string;
	name: string;
	color: string;
	finish: string;
	quantity: number;
	price: number;
	image: string;
}

export interface WishlistSummary {
	itemCount: number;
	items: WishlistPreviewItem[];
}

export interface WishlistPreviewItem {
	id: string;
	name: string;
	color: string;
	price: number;
	image: string;
	inStock: boolean;
}
