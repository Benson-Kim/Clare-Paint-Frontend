export interface HeaderProps {
	className?: string;
	variant?: "default" | "minimal" | "checkout" | "overlay" | "account";
	isSticky?: boolean;
	overlay?: boolean;
}

export interface NavigationItem {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	dropdownId?: string;
	items?: NavigationSubItem[];
	icon?: React.ReactNode;
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
	memberSince?: string;
	preferences?: {
		language: string;
		currency: string;
		notifications: boolean;
	};
}

export interface CartSummary {
	itemCount: number;
	totalPrice: number;
	items: CartPreviewItem[];
	freeShippingThreshold: number;
	remainingForFreeShipping: number;
}

export interface CartPreviewItem {
	id: string;
	productId: string;
	name: string;
	brand: string;
	color: string;
	finish: string;
	quantity: number;
	price: number;
	totalPrice: number;
	image: string;
}

export interface WishlistSummary {
	itemCount: number;
	items: WishlistPreviewItem[];
}

export interface WishlistPreviewItem {
	id: string;
	productId: string;
	name: string;
	brand: string;
	color: string;
	price: number;
	originalPrice?: number;
	image: string;
	inStock: boolean;
	rating: number;
	onSale?: boolean;
	savedAt: string;
}

export interface HeaderState {
	isScrolled: boolean;
	isVisible: boolean;
	activeDropdown: string | null;
	isMobileMenuOpen: boolean;
	isSearchOpen: boolean;
	scrollDirection: "up" | "down" | null;
	lastScrollY: number;
}

export interface DropdownProps {
	onClose: () => void;
	className?: string;
}

export interface SearchOverlayProps {
	isOpen: boolean;
	onClose: () => void;
	onSearch: (query: string) => void;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
}

export interface MobileNavigationProps {
	isOpen: boolean;
	onClose: () => void;
	onSearch: (query: string) => void;
	currentPath: string;
}

export interface DesktopNavigationProps {
	activeDropdown: string | null;
	onDropdownToggle: (dropdownName: string) => void;
	className?: string;
	currentPath: string;
}

export interface NavigationDropdownProps {
	items: NavigationSubItem[];
	onClose: () => void;
	title: string;
}

// Language and Currency Support
export interface LanguageOption {
	code: string;
	name: string;
	flag: string;
}

export interface CurrencyOption {
	code: string;
	symbol: string;
	name: string;
}

export interface InternationalSettings {
	language: LanguageOption;
	currency: CurrencyOption;
	region: string;
}

// Accessibility
export interface AccessibilitySettings {
	reducedMotion: boolean;
	highContrast: boolean;
	fontSize: "small" | "medium" | "large";
	screenReader: boolean;
}

// Analytics
export interface HeaderAnalytics {
	searchQueries: string[];
	navigationClicks: Record<string, number>;
	dropdownInteractions: Record<string, number>;
	mobileMenuUsage: number;
	cartInteractions: number;
	wishlistInteractions: number;
}
