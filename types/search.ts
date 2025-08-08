export interface SearchFilters {
	categories?: string[];
	colorFamilies?: string[];
	roomTypes?: string[];
	finishTypes?: string[];
	brands?: string[];
	features?: string[];
	priceRange?: [number, number];
	minRating?: number;
	inStockOnly?: boolean;
}

export interface SearchSuggestion {
	id: string;
	text: string;
	type: "product" | "color" | "brand" | "category" | "recent";
	count?: number;
	image?: string;
}

export interface SavedSearch {
	id: string;
	name: string;
	query: string;
	filters: SearchFilters;
	createdAt: string;
	lastUsed?: string;
	resultCount: number;
}

export interface SearchAnalytics {
	totalSearches: number;
	uniqueUsers: number;
	avgResultsPerSearch: number;
	topQueries: [string, number][];
	topFilters: [string, number][];
	conversionRate: number;
	bounceRate: number;
}

export interface VisualSearchResult {
	dominantColors: {
		hex: string;
		name: string;
		confidence: number;
	}[];
	suggestedProducts: {
		id: string;
		name: string;
		match: number;
	}[];
	roomType?: string;
	style?: string;
}

export interface SearchEvent {
	query: string;
	filters: SearchFilters;
	timestamp: number;
	resultCount: number;
	userId?: string;
	sessionId?: string;
}

export interface FilterUsageEvent {
	filterType: string;
	filterValue: string;
	timestamp: number;
	userId?: string;
	sessionId?: string;
}

export interface ResultClickEvent {
	productId: string;
	query: string;
	position: number;
	timestamp: number;
	userId?: string;
	sessionId?: string;
}
