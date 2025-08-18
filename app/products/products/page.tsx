"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Grid, List, SlidersHorizontal, Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { ProductPagination } from "@/components/products/ProductPagination";
import { CategoryHero } from "@/components/products/CategoryHero";
import { ColorComparison } from "@/components/products/ColorComparison";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";
import { cn } from "@/lib/utils";

export interface FilterState {
	colorFamilies: string[];
	finishTypes: string[];
	priceRange: [number, number];
	roomTypes: string[];
	brands: string[];
	inStockOnly: boolean;
	searchQuery: string;
}

export interface SortOption {
	value: string;
	label: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [compareProducts, setCompareProducts] = useState<Product[]>([]);
	const [showComparison, setShowComparison] = useState(false);

	const {
		filters,
		sortBy,
		updateFilter,
		updateSort,
		clearFilters,
		getActiveFilterCount,
	} = useProductFilters();

	const { searchQuery, updateSearchQuery, searchResults } =
		useProductSearch(products);

	// Simulate API call
	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setProducts(mockProducts);
			setLoading(false);
		};

		fetchProducts();
	}, []);

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		let result = searchQuery ? searchResults : products;

		// Apply filters
		if (filters.colorFamilies.length > 0) {
			result = result.filter((product) =>
				product.colors.some((color) =>
					filters.colorFamilies.some((family) =>
						color.name.toLowerCase().includes(family.toLowerCase())
					)
				)
			);
		}

		if (filters.finishTypes.length > 0) {
			result = result.filter((product) =>
				product.finishes.some((finish) =>
					filters.finishTypes.includes(finish.name.toLowerCase())
				)
			);
		}

		if (filters.roomTypes.length > 0) {
			result = result.filter((product) =>
				filters.roomTypes.includes(product.category.toLowerCase())
			);
		}

		if (filters.brands.length > 0) {
			result = result.filter((product) =>
				filters.brands.includes(product.brand.toLowerCase())
			);
		}

		if (filters.inStockOnly) {
			result = result.filter((product) => product.inStock);
		}

		// Price range filter
		result = result.filter(
			(product) =>
				product.basePrice >= filters.priceRange[0] &&
				product.basePrice <= filters.priceRange[1]
		);

		// Apply sorting
		switch (sortBy) {
			case "price-low":
				result.sort((a, b) => a.basePrice - b.basePrice);
				break;
			case "price-high":
				result.sort((a, b) => b.basePrice - a.basePrice);
				break;
			case "rating":
				result.sort((a, b) => b.rating - a.rating);
				break;
			case "newest":
				result.sort(
					(a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()
				);
				break;
			case "popular":
				result.sort((a, b) => b.reviewCount - a.reviewCount);
				break;
			default:
				break;
		}

		return result;
	}, [products, searchResults, searchQuery, filters, sortBy]);

	// Pagination
	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	// Reset page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [filters, sortBy, searchQuery]);

	const handleAddToCompare = (product: Product) => {
		if (
			compareProducts.length < 3 &&
			!compareProducts.find((p) => p.id === product.id)
		) {
			setCompareProducts([...compareProducts, product]);
		}
	};

	const handleRemoveFromCompare = (productId: string) => {
		setCompareProducts(compareProducts.filter((p) => p.id !== productId));
	};

	const activeFilterCount = getActiveFilterCount();

	return (
		<PageLayout>
			{loading ? (
				<div className="animate-pulse space-y-8 py-8">
					<div className="h-8 bg-gray-200 rounded w-64" />
					<div className="h-32 bg-gray-200 rounded" />
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="space-y-4">
							<div className="h-6 bg-gray-200 rounded" />
							<div className="h-40 bg-gray-200 rounded" />
						</div>
						<div className="md:col-span-3">
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{[...Array(9)].map((_, i) => (
									<div key={i} className="h-80 bg-gray-200 rounded-lg" />
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{/* Category Hero */}
					<CategoryHero />

					{/* Main Content */}
					<div className="py-8">
						{/* Search Bar */}
						<div className="mb-8">
							<div className="relative max-w-md">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									placeholder="Search products..."
									value={searchQuery}
									onChange={(e) => updateSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent transition-all duration-200"
									aria-label="Search products"
								/>
							</div>
						</div>

						{/* Filters and Sort Bar */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
							<div className="flex items-center space-x-4">
								{/* Mobile Filter Toggle */}
								<button
									onClick={() => setShowFilters(!showFilters)}
									className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
									aria-label="Toggle filters"
								>
									<SlidersHorizontal className="w-4 h-4" />
									<span>Filters</span>
									{activeFilterCount > 0 && (
										<span className="bg-ds-primary-sage text-white text-xs px-2 py-1 rounded-full">
											{activeFilterCount}
										</span>
									)}
								</button>

								{/* View Mode Toggle */}
								<div className="flex border border-gray-300 rounded-lg overflow-hidden">
									<button
										onClick={() => setViewMode("grid")}
										className={cn(
											"p-2 transition-colors duration-200",
											viewMode === "grid"
												? "bg-ds-primary-sage text-white"
												: "bg-white text-gray-600 hover:bg-gray-50"
										)}
										aria-label="Grid view"
									>
										<Grid className="w-4 h-4" />
									</button>
									<button
										onClick={() => setViewMode("list")}
										className={cn(
											"p-2 transition-colors duration-200",
											viewMode === "list"
												? "bg-ds-primary-sage text-white"
												: "bg-white text-gray-600 hover:bg-gray-50"
										)}
										aria-label="List view"
									>
										<List className="w-4 h-4" />
									</button>
								</div>

								{/* Results Count */}
								<span className="text-sm text-gray-600">
									{filteredProducts.length} products found
								</span>
							</div>

							<div className="flex items-center space-x-4">
								{/* Clear Filters */}
								{activeFilterCount > 0 && (
									<button
										onClick={clearFilters}
										className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
									>
										Clear all filters
									</button>
								)}

								{/* Sort Dropdown */}
								<ProductSort currentSort={sortBy} onSortChange={updateSort} />
							</div>
						</div>

						{/* Main Layout */}
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
							{/* Filters Sidebar */}
							<div className={cn("lg:block", showFilters ? "block" : "hidden")}>
								<div className="sticky top-8">
									<ProductFilters
										filters={filters}
										onFilterChange={updateFilter}
										products={products}
									/>
								</div>
							</div>

							{/* Products Grid */}
							<div className="lg:col-span-3">
								<ProductGrid
									products={paginatedProducts}
									viewMode={viewMode}
									onAddToCompare={handleAddToCompare}
									compareProducts={compareProducts}
									loading={loading}
								/>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="mt-12">
										<ProductPagination
											currentPage={currentPage}
											totalPages={totalPages}
											onPageChange={setCurrentPage}
										/>
									</div>
								)}
							</div>
						</div>

						{/* Color Comparison */}
						{compareProducts.length > 0 && (
							<div className="fixed bottom-6 right-6 z-50">
								<button
									onClick={() => setShowComparison(true)}
									className="bg-ds-primary-sage text-white px-6 py-3 rounded-lg shadow-lg hover:bg-ds-primary-sage/90 transition-all duration-200 flex items-center space-x-2"
								>
									<span>Compare ({compareProducts.length})</span>
								</button>
							</div>
						)}

						{/* Comparison Modal */}
						{showComparison && (
							<ColorComparison
								products={compareProducts}
								onClose={() => setShowComparison(false)}
								onRemoveProduct={handleRemoveFromCompare}
							/>
						)}
					</div>
				</>
			)}
		</PageLayout>
	);
}
