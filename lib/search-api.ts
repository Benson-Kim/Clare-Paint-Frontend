import { Product } from "@/types/product";
import {
	SearchFilters,
	SearchSuggestion,
	VisualSearchResult,
} from "@/types/search";
import { mockProducts } from "@/data/mock-products";

/**
 * Mock API functions for search functionality
 */

export const mockSearchProducts = async (
	query: string,
	filters: SearchFilters,
	page: number = 1,
	limit: number = 12,
	sortBy: string = "relevance"
): Promise<{
	products: Product[];
	total: number;
	page: number;
	totalPages: number;
}> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let results = [...mockProducts];

			// Apply text search
			if (query) {
				const searchTerm = query.toLowerCase();
				results = results.filter(
					(product) =>
						product.name.toLowerCase().includes(searchTerm) ||
						product.description.toLowerCase().includes(searchTerm) ||
						product.brand.toLowerCase().includes(searchTerm) ||
						product.category.toLowerCase().includes(searchTerm) ||
						product.colors.some((color) =>
							color.name.toLowerCase().includes(searchTerm)
						) ||
						product.features.some((feature) =>
							feature.toLowerCase().includes(searchTerm)
						)
				);
			}

			// Apply filters (implementation would be more comprehensive in real app)
			if (filters.categories?.length) {
				results = results.filter((product) =>
					filters.categories!.some((cat) =>
						product.category.toLowerCase().includes(cat)
					)
				);
			}

			if (filters.priceRange) {
				results = results.filter(
					(product) =>
						product.basePrice >= filters.priceRange![0] &&
						product.basePrice <= filters.priceRange![1]
				);
			}

			if (filters.inStockOnly) {
				results = results.filter((product) => product.inStock);
			}

			// Apply sorting
			results.sort((a, b) => {
				switch (sortBy) {
					case "price-low":
						return a.basePrice - b.basePrice;
					case "price-high":
						return b.basePrice - a.basePrice;
					case "rating":
						return b.rating - a.rating;
					case "name":
						return a.name.localeCompare(b.name);
					default:
						return b.rating - a.rating;
				}
			});

			const total = results.length;
			const totalPages = Math.ceil(total / limit);
			const startIndex = (page - 1) * limit;
			const paginatedResults = results.slice(startIndex, startIndex + limit);

			resolve({
				products: paginatedResults,
				total,
				page,
				totalPages,
			});
		}, 300);
	});
};

export const mockGetSearchSuggestions = async (
	query: string
): Promise<SearchSuggestion[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const suggestions: SearchSuggestion[] = [];

			if (query.length > 0) {
				const searchTerm = query.toLowerCase();

				// Product suggestions
				mockProducts
					.filter((product) => product.name.toLowerCase().includes(searchTerm))
					.slice(0, 3)
					.forEach((product) => {
						suggestions.push({
							id: `product-${product.id}`,
							text: product.name,
							type: "product",
							image: product.colors[0]?.image,
						});
					});

				// Color suggestions
				const colors = new Set<string>();
				mockProducts.forEach((product) => {
					product.colors.forEach((color) => {
						if (color.name.toLowerCase().includes(searchTerm)) {
							colors.add(color.name);
						}
					});
				});

				Array.from(colors)
					.slice(0, 3)
					.forEach((colorName) => {
						suggestions.push({
							id: `color-${colorName}`,
							text: colorName,
							type: "color",
						});
					});

				// Brand suggestions
				const brands = new Set(mockProducts.map((p) => p.brand));
				Array.from(brands)
					.filter((brand) => brand.toLowerCase().includes(searchTerm))
					.slice(0, 2)
					.forEach((brand) => {
						suggestions.push({
							id: `brand-${brand}`,
							text: brand,
							type: "brand",
						});
					});
			}

			resolve(suggestions);
		}, 200);
	});
};

export const mockAnalyzeImage = async (
	imageFile: File
): Promise<VisualSearchResult> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Mock image analysis results
			resolve({
				dominantColors: [
					{ hex: "#5B7B7A", name: "Sage Green", confidence: 95 },
					{ hex: "#F5F5DC", name: "Cream", confidence: 87 },
					{ hex: "#2C2C2C", name: "Charcoal", confidence: 78 },
				],
				suggestedProducts: [
					{
						id: "premium-interior-paint-001",
						name: "Premium Interior Paint - Sage Whisper",
						match: 95,
					},
					{
						id: "eco-friendly-paint-002",
						name: "Eco-Friendly Paint - Natural Cream",
						match: 87,
					},
					{
						id: "luxury-paint-003",
						name: "Luxury Designer Paint - Deep Charcoal",
						match: 78,
					},
				],
				roomType: "Living Room",
				style: "Modern Farmhouse",
			});
		}, 2000);
	});
};

export const mockGetPopularSearches = async (): Promise<string[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				"sage green paint",
				"bathroom paint",
				"zero VOC paint",
				"exterior white paint",
				"kitchen cabinet paint",
				"bedroom colors",
				"living room paint",
				"primer for walls",
				"matte finish paint",
				"stain resistant paint",
			]);
		}, 100);
	});
};

export const mockGetTrendingColors = async (): Promise<any[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ name: "Sage Whisper", hex: "#5B7B7A", searches: 1250, trend: "up" },
				{ name: "Warm Cream", hex: "#F5F5DC", searches: 980, trend: "up" },
				{
					name: "Charcoal Depth",
					hex: "#2C2C2C",
					searches: 875,
					trend: "stable",
				},
				{
					name: "Classic White",
					hex: "#FFFFFF",
					searches: 1420,
					trend: "down",
				},
				{ name: "Soft Gray", hex: "#D3D3D3", searches: 760, trend: "up" },
				{ name: "Warm Beige", hex: "#C4A57B", searches: 650, trend: "stable" },
			]);
		}, 100);
	});
};
