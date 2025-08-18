"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Grid, List, SlidersHorizontal, Search, Palette } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductCategoryHero } from "@/components/category/ProductCategoryHero";
import { ProductCategoryFilters } from "@/components/category/ProductCategoryFilters";
import { ProductCategoryGrid } from "@/components/category/ProductCategoryGrid";
import { ProductCategorySort } from "@/components/category/ProductCategorySort";
import { ProductCategoryPagination } from "@/components/category/ProductCategoryPagination";
import { ColorComparisonModal } from "@/components/category/ColorComparisonModal";
import { QuickAddModal } from "@/components/category/QuickAddModal";
import { CategoryBreadcrumbs } from "@/components/category/CategoryBreadcrumbs";
import { CategorySEOContent } from "@/components/category/CategorySEOContent";
import { useProductCategoryFilters } from "@/hooks/useProductCategoryFilters";
import { useProductCategoryData } from "@/hooks/useProductCategoryData";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

// interface CategoryPageProps {}

const ITEMS_PER_PAGE = 12;

function CategoryPageContent() {
	const params = useParams();
	const searchParams = useSearchParams();
	const router = useRouter();
	const { addItem } = useCartStore();

	const categorySlug = params.slug as string;
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [compareProducts, setCompareProducts] = useState<Product[]>([]);
	const [showComparison, setShowComparison] = useState(false);
	const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const {
		filters,
		sortBy,
		updateFilter,
		updateSort,
		clearFilters,
		getActiveFilterCount,
		initializeFromURL,
		updateURL,
	} = useProductCategoryFilters();

	const { products, categoryData, isLoading, isError, error, totalProducts } =
		useProductCategoryData(categorySlug);

	// Initialize filters from URL parameters
	useEffect(() => {
		initializeFromURL(searchParams);
	}, [searchParams, initializeFromURL]);

	// Update URL when filters change
	useEffect(() => {
		updateURL(router, categorySlug, filters, sortBy, searchQuery);
	}, [filters, sortBy, searchQuery, router, categorySlug, updateURL]);

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		if (!products) return [];

		let result = [...products];

		// Apply search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(product) =>
					product.name.toLowerCase().includes(query) ||
					product.description.toLowerCase().includes(query) ||
					product.brand.toLowerCase().includes(query) ||
					product.colors.some((color) =>
						color.name.toLowerCase().includes(query)
					) ||
					product.features.some((feature) =>
						feature.toLowerCase().includes(query)
					)
			);
		}

		// Apply color family filters
		if (filters.colorFamilies.length > 0) {
			result = result.filter((product) =>
				product.colors.some((color) =>
					filters.colorFamilies.some((family) => {
						const colorName = color.name.toLowerCase();
						switch (family) {
							case "whites":
								return (
									colorName.includes("white") ||
									colorName.includes("cream") ||
									colorName.includes("ivory")
								);
							case "grays":
								return (
									colorName.includes("gray") ||
									colorName.includes("grey") ||
									colorName.includes("charcoal") ||
									colorName.includes("slate")
								);
							case "beiges":
								return (
									colorName.includes("beige") ||
									colorName.includes("tan") ||
									colorName.includes("sand") ||
									colorName.includes("taupe")
								);
							case "blues":
								return (
									colorName.includes("blue") ||
									colorName.includes("navy") ||
									colorName.includes("azure") ||
									colorName.includes("teal")
								);
							case "greens":
								return (
									colorName.includes("green") ||
									colorName.includes("sage") ||
									colorName.includes("mint") ||
									colorName.includes("forest")
								);
							case "browns":
								return (
									colorName.includes("brown") ||
									colorName.includes("espresso") ||
									colorName.includes("chocolate") ||
									colorName.includes("mahogany")
								);
							case "reds":
								return (
									colorName.includes("red") ||
									colorName.includes("burgundy") ||
									colorName.includes("crimson") ||
									colorName.includes("cherry")
								);
							case "yellows":
								return (
									colorName.includes("yellow") ||
									colorName.includes("gold") ||
									colorName.includes("mustard") ||
									colorName.includes("amber")
								);
							default:
								return colorName.includes(family);
						}
					})
				)
			);
		}

		// Apply finish type filters
		if (filters.finishTypes.length > 0) {
			result = result.filter((product) =>
				product.finishes.some((finish) =>
					filters.finishTypes.includes(finish.name.toLowerCase())
				)
			);
		}

		// Apply room type filters
		if (filters.roomTypes.length > 0) {
			result = result.filter((product) =>
				filters.roomTypes.some(
					(room) =>
						product.features.some((feature) =>
							feature.toLowerCase().includes(room.replace("-", " "))
						) ||
						product.description
							.toLowerCase()
							.includes(room.replace("-", " ")) ||
						product.category.toLowerCase().includes(room.replace("-", " "))
				)
			);
		}

		// Apply brand filters
		if (filters.brands.length > 0) {
			result = result.filter((product) =>
				filters.brands.includes(product.brand.toLowerCase())
			);
		}

		// Apply feature filters
		if (filters.features.length > 0) {
			result = result.filter((product) =>
				filters.features.some((feature) =>
					product.features.some((productFeature) =>
						productFeature.toLowerCase().includes(feature.replace("-", " "))
					)
				)
			);
		}

		// Apply price range filter
		result = result.filter(
			(product) =>
				product.basePrice >= filters.priceRange[0] &&
				product.basePrice <= filters.priceRange[1]
		);

		// Apply stock filter
		if (filters.inStockOnly) {
			result = result.filter((product) => product.inStock);
		}

		// Apply sorting
		result.sort((a, b) => {
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
				case "coverage":
					const getCoverageValue = (coverage: string) => {
						const match = coverage.match(/(\d+)/);
						return match ? parseInt(match[1]) : 0;
					};
					return getCoverageValue(b.coverage) - getCoverageValue(a.coverage);
				default:
					return b.rating - a.rating; // Default to rating
			}
		});

		return result;
	}, [products, filters, sortBy, searchQuery]);

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

	const handleQuickAdd = (product: Product) => {
		setQuickAddProduct(product);
	};

	const handleAddToCart = (
		productId: string,
		colorId: string,
		finishId: string,
		quantity: number,
		price: number
	) => {
		addItem({
			productId,
			colorId,
			finishId,
			quantity,
			price,
		});
		setQuickAddProduct(null);
	};

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

	if (isLoading) {
		return (
			<PageLayout>
				<div className="animate-pulse space-y-8 py-8">
					<div className="h-64 bg-gray-200 rounded-lg" />
					<div className="h-8 bg-gray-200 rounded w-64" />
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
			</PageLayout>
		);
	}

	if (isError) {
		return (
			<PageLayout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center p-8">
						<h1 className="text-2xl font-bold text-red-600 mb-4">
							Error Loading Category
						</h1>
						<p className="text-gray-600 mb-6">
							{error?.message || "Failed to load category data"}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			{/* Category Hero */}
			<ProductCategoryHero
				categoryData={categoryData}
				totalProducts={totalProducts}
			/>

			{/* Breadcrumbs */}
			<CategoryBreadcrumbs categoryData={categoryData} />

			{/* SEO Content */}
			<CategorySEOContent categoryData={categoryData} />

			{/* Main Content */}
			<div className="py-8">
				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							type="text"
							placeholder={`Search ${categoryData?.name || "products"}...`}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent transition-all duration-200"
							aria-label="Search products in category"
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
								<span className="bg-ds-primary-sage text-ds-neutral-white text-xs px-2 py-1 rounded-full">
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
										? "bg-ds-primary-sage text-ds-neutral-white"
										: "bg-ds-neutral-white text-gray-600 hover:bg-gray-50"
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
										? "bg-ds-primary-sage text-ds-neutral-white"
										: "bg-ds-neutral-white text-gray-600 hover:bg-gray-50"
								)}
								aria-label="List view"
							>
								<List className="w-4 h-4" />
							</button>
						</div>

						{/* Results Count */}
						<span className="text-sm text-gray-600">
							{filteredProducts.length} products found
							{searchQuery && (
								<span className="ml-1">for {`"${searchQuery}"`}</span>
							)}
						</span>
					</div>

					<div className="flex items-center space-x-4">
						{/* Clear Filters */}
						{activeFilterCount > 0 && (
							<button
								onClick={clearFilters}
								className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
								aria-label="Clear all filters"
							>
								Clear all filters ({activeFilterCount})
							</button>
						)}

						{/* Sort Dropdown */}
						<ProductCategorySort
							currentSort={sortBy}
							onSortChange={updateSort}
						/>
					</div>
				</div>

				{/* Main Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Filters Sidebar */}
					<div className={cn("lg:block", showFilters ? "block" : "hidden")}>
						<div className="sticky top-8">
							<ProductCategoryFilters
								filters={filters}
								onFilterChange={updateFilter}
								products={products || []}
								categorySlug={categorySlug}
								activeFilterCount={activeFilterCount}
								onClearFilters={clearFilters}
							/>
						</div>
					</div>

					{/* Products Grid */}
					<div className="lg:col-span-3">
						<ProductCategoryGrid
							products={paginatedProducts}
							viewMode={viewMode}
							onQuickAdd={handleQuickAdd}
							onAddToCompare={handleAddToCompare}
							compareProducts={compareProducts}
							loading={isLoading}
							searchQuery={searchQuery}
							appliedFilters={filters}
							onClearFilters={clearFilters}
						/>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-12">
								<ProductCategoryPagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
									totalResults={filteredProducts.length}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Color Comparison Modal */}
			{showComparison && (
				<ColorComparisonModal
					products={compareProducts}
					onClose={() => setShowComparison(false)}
					onRemoveProduct={handleRemoveFromCompare}
				/>
			)}

			{/* Quick Add Modal */}
			{quickAddProduct && (
				<QuickAddModal
					product={quickAddProduct}
					onClose={() => setQuickAddProduct(null)}
					onAddToCart={handleAddToCart}
				/>
			)}

			{/* Floating Compare Button */}
			{compareProducts.length > 0 && (
				<div className="fixed bottom-6 right-6 z-40">
					<button
						onClick={() => setShowComparison(true)}
						className="bg-ds-primary-sage text-ds-neutral-white px-6 py-3 rounded-lg shadow-lg hover:bg-ds-primary-sage/90 transition-all duration-200 flex items-center space-x-2"
						aria-label={`Compare ${compareProducts.length} products`}
					>
						<Palette className="w-5 h-5" />
						<span>Compare ({compareProducts.length})</span>
					</button>
				</div>
			)}
		</PageLayout>
	);
}

export default function CategoryPage() {
	return (
		<Suspense
			fallback={
				<PageLayout>
					<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center">
						<div className="text-center">
							<div className="w-16 h-16 border-4 border-ds-primary-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
							<p className="text-lg text-ds-neutral-mediumGray">
								Loading category...
							</p>
						</div>
					</div>
				</PageLayout>
			}
		>
			<CategoryPageContent />
		</Suspense>
	);
}
