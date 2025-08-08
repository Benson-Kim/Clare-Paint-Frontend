"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";

interface SearchFilters {
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

interface SearchSuggestion {
	id: string;
	text: string;
	type: "product" | "color" | "brand" | "category" | "recent";
	count?: number;
	image?: string;
}

interface SavedSearch {
	id: string;
	name: string;
	query: string;
	filters: SearchFilters;
	createdAt: string;
	lastUsed?: string;
	resultCount: number;
}

const ITEMS_PER_PAGE = 12;

export const useAdvancedSearch = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState<SearchFilters>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState("relevance");
	const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);

	// Load saved data from localStorage
	useEffect(() => {
		const saved = localStorage.getItem("savedSearches");
		if (saved) {
			setSavedSearches(JSON.parse(saved));
		}

		const history = localStorage.getItem("searchHistory");
		if (history) {
			setSearchHistory(JSON.parse(history));
		}
	}, []);

	// Save to localStorage when data changes
	useEffect(() => {
		localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
	}, [savedSearches]);

	useEffect(() => {
		localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
	}, [searchHistory]);

	// Mock API call for search
	const {
		data: allProducts = [],
		isLoading,
		isError,
		error,
	} = useQuery<Product[], Error>({
		queryKey: ["searchProducts"],
		queryFn: async () => {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 500));
			return mockProducts;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	// Generate search suggestions
	const suggestions = useMemo((): SearchSuggestion[] => {
		if (!searchQuery) return [];

		const query = searchQuery.toLowerCase();
		const suggestions: SearchSuggestion[] = [];

		// Add recent searches
		searchHistory
			.filter((term) => term.toLowerCase().includes(query))
			.slice(0, 3)
			.forEach((term) => {
				suggestions.push({
					id: `recent-${term}`,
					text: term,
					type: "recent",
				});
			});

		// Add product suggestions
		allProducts
			.filter(
				(product) =>
					product.name.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query)
			)
			.slice(0, 5)
			.forEach((product) => {
				suggestions.push({
					id: `product-${product.id}`,
					text: product.name,
					type: "product",
					image: product.colors[0]?.image,
				});
			});

		// Add color suggestions
		const colorSuggestions = new Set<string>();
		allProducts.forEach((product) => {
			product.colors.forEach((color) => {
				if (color.name.toLowerCase().includes(query)) {
					colorSuggestions.add(color.name);
				}
			});
		});

		Array.from(colorSuggestions)
			.slice(0, 3)
			.forEach((colorName) => {
				suggestions.push({
					id: `color-${colorName}`,
					text: colorName,
					type: "color",
				});
			});

		// Add brand suggestions
		const brands = new Set(allProducts.map((p) => p.brand));
		Array.from(brands)
			.filter((brand) => brand.toLowerCase().includes(query))
			.slice(0, 3)
			.forEach((brand) => {
				suggestions.push({
					id: `brand-${brand}`,
					text: brand,
					type: "brand",
				});
			});

		return suggestions.slice(0, 10);
	}, [searchQuery, allProducts, searchHistory]);

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		let results = allProducts;

		// Apply text search
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			results = results.filter(
				(product) =>
					product.name.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query) ||
					product.brand.toLowerCase().includes(query) ||
					product.category.toLowerCase().includes(query) ||
					product.colors.some((color) =>
						color.name.toLowerCase().includes(query)
					) ||
					product.features.some((feature) =>
						feature.toLowerCase().includes(query)
					)
			);
		}

		// Apply filters
		if (filters.categories?.length) {
			results = results.filter((product) =>
				filters.categories!.some((cat) =>
					product.category.toLowerCase().includes(cat)
				)
			);
		}

		if (filters.colorFamilies?.length) {
			results = results.filter((product) =>
				product.colors.some((color) =>
					filters.colorFamilies!.some((family) => {
						const colorName = color.name.toLowerCase();
						if (family === "whites")
							return colorName.includes("white") || colorName.includes("cream");
						if (family === "grays")
							return (
								colorName.includes("gray") ||
								colorName.includes("grey") ||
								colorName.includes("charcoal")
							);
						if (family === "beiges")
							return colorName.includes("beige") || colorName.includes("tan");
						return colorName.includes(family);
					})
				)
			);
		}

		if (filters.roomTypes?.length) {
			results = results.filter((product) =>
				filters.roomTypes!.some(
					(room) =>
						product.features.some((feature) =>
							feature.toLowerCase().includes(room.replace("-", " "))
						) ||
						product.description.toLowerCase().includes(room.replace("-", " "))
				)
			);
		}

		if (filters.finishTypes?.length) {
			results = results.filter((product) =>
				product.finishes.some((finish) =>
					filters.finishTypes!.includes(finish.name.toLowerCase())
				)
			);
		}

		if (filters.brands?.length) {
			results = results.filter((product) =>
				filters.brands!.some((brand) =>
					product.brand.toLowerCase().includes(brand.replace("-", " "))
				)
			);
		}

		if (filters.features?.length) {
			results = results.filter((product) =>
				filters.features!.some((feature) =>
					product.features.some((productFeature) =>
						productFeature.toLowerCase().includes(feature.replace("-", " "))
					)
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

		if (filters.minRating) {
			results = results.filter(
				(product) => product.rating >= filters.minRating!
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
				case "newest":
					return new Date(b.id).getTime() - new Date(a.id).getTime();
				case "popular":
					return b.reviewCount - a.reviewCount;
				case "name":
					return a.name.localeCompare(b.name);
				case "relevance":
				default:
					// For relevance, prioritize exact matches in name, then description
					const aNameMatch = a.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
						? 1
						: 0;
					const bNameMatch = b.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
						? 1
						: 0;
					if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;
					return b.rating - a.rating; // Secondary sort by rating
			}
		});

		return results;
	}, [allProducts, searchQuery, filters, sortBy]);

	// Pagination
	const totalResults = filteredProducts.length;
	const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
	const paginatedResults = filteredProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	// Reset page when search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, filters, sortBy]);

	const updateSearchQuery = useCallback(
		(query: string) => {
			setSearchQuery(query);

			// Add to search history
			if (query && !searchHistory.includes(query)) {
				setSearchHistory((prev) => [query, ...prev.slice(0, 9)]); // Keep last 10 searches
			}
		},
		[searchHistory]
	);

	const updateFilters = useCallback((newFilters: SearchFilters) => {
		setFilters(newFilters);
	}, []);

	const clearFilters = useCallback(() => {
		setFilters({});
	}, []);

	const saveSearch = useCallback(
		(name: string, query: string, searchFilters: SearchFilters) => {
			const newSearch: SavedSearch = {
				id: Date.now().toString(),
				name,
				query,
				filters: searchFilters,
				createdAt: new Date().toISOString(),
				resultCount: totalResults,
			};

			setSavedSearches((prev) => [newSearch, ...prev.slice(0, 19)]); // Keep last 20 searches
		},
		[totalResults]
	);

	const deleteSavedSearch = useCallback((searchId: string) => {
		setSavedSearches((prev) => prev.filter((search) => search.id !== searchId));
	}, []);

	const loadSavedSearch = useCallback((search: SavedSearch) => {
		setSearchQuery(search.query);
		setFilters(search.filters);

		// Update last used
		setSavedSearches((prev) =>
			prev.map((s) =>
				s.id === search.id ? { ...s, lastUsed: new Date().toISOString() } : s
			)
		);
	}, []);

	const clearSearchHistory = useCallback(() => {
		setSearchHistory([]);
	}, []);

	return {
		searchQuery,
		filters,
		results: paginatedResults,
		suggestions,
		isLoading,
		isError,
		error,
		totalResults,
		currentPage,
		totalPages,
		sortBy,
		savedSearches,
		searchHistory,
		updateSearchQuery,
		updateFilters,
		clearFilters,
		setPage: setCurrentPage,
		setSortBy,
		saveSearch,
		deleteSavedSearch,
		loadSavedSearch,
		clearSearchHistory,
	};
};
