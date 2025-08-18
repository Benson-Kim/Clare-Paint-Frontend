"use client";

import { useState, useCallback } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ProductCategoryFilters {
	colorFamilies: string[];
	finishTypes: string[];
	roomTypes: string[];
	brands: string[];
	features: string[];
	priceRange: [number, number];
	minRating: number;
	inStockOnly: boolean;
	weatherResistance?: string[];
	applicationType?: string[];
}

export const useProductCategoryFilters = () => {
	const [filters, setFilters] = useState<ProductCategoryFilters>({
		colorFamilies: [],
		finishTypes: [],
		roomTypes: [],
		brands: [],
		features: [],
		priceRange: [0, 500],
		minRating: 0,
		inStockOnly: false,
		weatherResistance: [],
		applicationType: [],
	});

	const [sortBy, setSortBy] = useState("featured");

	const updateFilter = useCallback(
		(key: keyof ProductCategoryFilters, value: any) => {
			setFilters((prev) => ({
				...prev,
				[key]: value,
			}));
		},
		[]
	);

	const updateSort = useCallback((sort: string) => {
		setSortBy(sort);
	}, []);

	const clearFilters = useCallback(() => {
		setFilters({
			colorFamilies: [],
			finishTypes: [],
			roomTypes: [],
			brands: [],
			features: [],
			priceRange: [0, 500],
			minRating: 0,
			inStockOnly: false,
			weatherResistance: [],
			applicationType: [],
		});
		setSortBy("featured");
	}, []);

	const getActiveFilterCount = useCallback(() => {
		let count = 0;
		if (filters.colorFamilies.length > 0) count++;
		if (filters.finishTypes.length > 0) count++;
		if (filters.roomTypes.length > 0) count++;
		if (filters.brands.length > 0) count++;
		if (filters.features.length > 0) count++;
		if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
		if (filters.minRating > 0) count++;
		if (filters.inStockOnly) count++;
		if (filters.weatherResistance && filters.weatherResistance.length > 0)
			count++;
		if (filters.applicationType && filters.applicationType.length > 0) count++;
		return count;
	}, [filters]);

	const initializeFromURL = useCallback(
		(searchParams: ReadonlyURLSearchParams) => {
			const urlFilters: Partial<ProductCategoryFilters> = {};

			// Parse URL parameters
			const colorFamilies = searchParams.get("colors");
			if (colorFamilies) urlFilters.colorFamilies = colorFamilies.split(",");

			const finishTypes = searchParams.get("finishes");
			if (finishTypes) urlFilters.finishTypes = finishTypes.split(",");

			const roomTypes = searchParams.get("rooms");
			if (roomTypes) urlFilters.roomTypes = roomTypes.split(",");

			const brands = searchParams.get("brands");
			if (brands) urlFilters.brands = brands.split(",");

			const features = searchParams.get("features");
			if (features) urlFilters.features = features.split(",");

			const minPrice = searchParams.get("minPrice");
			const maxPrice = searchParams.get("maxPrice");
			if (minPrice && maxPrice) {
				urlFilters.priceRange = [Number(minPrice), Number(maxPrice)];
			}

			const minRating = searchParams.get("rating");
			if (minRating) urlFilters.minRating = Number(minRating);

			const inStock = searchParams.get("inStock");
			if (inStock === "true") urlFilters.inStockOnly = true;

			const weatherResistance = searchParams.get("weather");
			if (weatherResistance)
				urlFilters.weatherResistance = weatherResistance.split(",");

			const applicationType = searchParams.get("application");
			if (applicationType)
				urlFilters.applicationType = applicationType.split(",");

			if (Object.keys(urlFilters).length > 0) {
				setFilters((prev) => ({ ...prev, ...urlFilters }));
			}

			const sort = searchParams.get("sort");
			if (sort) setSortBy(sort);
		},
		[]
	);

	const updateURL = useCallback(
		(
			router: AppRouterInstance,
			categorySlug: string,
			currentFilters: ProductCategoryFilters,
			currentSort: string,
			searchQuery: string
		) => {
			const params = new URLSearchParams();

			if (searchQuery) params.set("q", searchQuery);
			if (currentFilters.colorFamilies.length)
				params.set("colors", currentFilters.colorFamilies.join(","));
			if (currentFilters.finishTypes.length)
				params.set("finishes", currentFilters.finishTypes.join(","));
			if (currentFilters.roomTypes.length)
				params.set("rooms", currentFilters.roomTypes.join(","));
			if (currentFilters.brands.length)
				params.set("brands", currentFilters.brands.join(","));
			if (currentFilters.features.length)
				params.set("features", currentFilters.features.join(","));
			if (
				currentFilters.priceRange[0] > 0 ||
				currentFilters.priceRange[1] < 500
			) {
				params.set("minPrice", currentFilters.priceRange[0].toString());
				params.set("maxPrice", currentFilters.priceRange[1].toString());
			}
			if (currentFilters.minRating > 0)
				params.set("rating", currentFilters.minRating.toString());
			if (currentFilters.inStockOnly) params.set("inStock", "true");
			if (currentFilters.weatherResistance?.length)
				params.set("weather", currentFilters.weatherResistance.join(","));
			if (currentFilters.applicationType?.length)
				params.set("application", currentFilters.applicationType.join(","));
			if (currentSort !== "featured") params.set("sort", currentSort);

			const newUrl = params.toString()
				? `/category/${categorySlug}?${params.toString()}`
				: `/category/${categorySlug}`;

			router.replace(newUrl, { scroll: false });
		},
		[]
	);

	return {
		filters,
		sortBy,
		updateFilter,
		updateSort,
		clearFilters,
		getActiveFilterCount,
		initializeFromURL,
		updateURL,
	};
};
