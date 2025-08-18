"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export const useProductSearch = (products: Product[]) => {
	const [searchQuery, setSearchQuery] = useState("");

	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return products;

		const query = searchQuery.toLowerCase().trim();

		return products.filter((product) => {
			// Search in product name
			if (product.name.toLowerCase().includes(query)) return true;

			// Search in brand
			if (product.brand.toLowerCase().includes(query)) return true;

			// Search in description
			if (product.description.toLowerCase().includes(query)) return true;

			// Search in category
			if (product.category.toLowerCase().includes(query)) return true;

			// Search in color names
			if (
				product.colors.some((color) => color.name.toLowerCase().includes(query))
			)
				return true;

			// Search in finish names
			if (
				product.finishes.some((finish) =>
					finish.name.toLowerCase().includes(query)
				)
			)
				return true;

			// Search in features
			if (
				product.features.some((feature) =>
					feature.toLowerCase().includes(query)
				)
			)
				return true;

			return false;
		});
	}, [products, searchQuery]);

	const updateSearchQuery = (query: string) => {
		setSearchQuery(query);
	};

	return {
		searchQuery,
		searchResults,
		updateSearchQuery,
	};
};
