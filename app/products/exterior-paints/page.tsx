"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Filter,
	Grid,
	List,
	SlidersHorizontal,
	X,
	Search,
	Calculator,
	Image,
	CalendarCheck,
} from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSort } from "@/components/products/ProductSort";
import { ProductPagination } from "@/components/products/ProductPagination";
import { ExteriorPaintHero } from "@/components/exterior-paints/ExteriorPaintHero";
import { ExteriorPaintFilters } from "@/components/exterior-paints/ExteriorPaintFilters";
import { ExteriorCoverageCalculator } from "@/components/exterior-paints/ExteriorCoverageCalculator";
import { ProjectGallery } from "@/components/exterior-paints/ProjectGallery";
import { MaintenanceScheduleModal } from "@/components/exterior-paints/MaintenanceSchedule";
import { useExteriorPaintFilters } from "@/hooks/useExteriorPaintFilters";
import { useProductSearch } from "@/hooks/useProductSearch";
import {
	Product,
	BeforeAfterImage,
	MaintenanceSchedule,
} from "@/types/product";
import { mockFetchExteriorPaints } from "@/lib/api";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

export default function ExteriorPaintsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [showCalculator, setShowCalculator] = useState(false);
	const [showProjectGallery, setShowProjectGallery] = useState(false);
	const [galleryImages, setGalleryImages] = useState<BeforeAfterImage[]>([]);
	const [showMaintenanceSchedule, setShowMaintenanceSchedule] = useState(false);
	const [selectedMaintenanceSchedule, setSelectedMaintenanceSchedule] =
		useState<MaintenanceSchedule | null>(null);

	const {
		filters,
		sortBy,
		updateFilter,
		updateSort,
		clearFilters,
		getActiveFilterCount,
	} = useExteriorPaintFilters();

	const { searchQuery, updateSearchQuery, searchResults } =
		useProductSearch(products);

	// Fetch exterior paints using React Query
	const { data, isLoading, isError, error } = useQuery<Product[], Error>({
		queryKey: ["exteriorPaints"],
		queryFn: mockFetchExteriorPaints,
	});

	useEffect(() => {
		if (data) {
			setProducts(data);
		}
	}, [data]);

	// Filter and sort products
	const filteredProducts = useMemo(() => {
		let result = searchQuery ? searchResults : products;

		// Apply filters
		if (filters.surfaceTypes.length > 0) {
			result = result.filter((product) =>
				product.surfaceTypes?.some((type) =>
					filters.surfaceTypes.includes(type.toLowerCase())
				)
			);
		}

		if (filters.climateZones.length > 0) {
			result = result.filter((product) =>
				product.climateZones?.some((zone) =>
					filters.climateZones.includes(zone.toLowerCase())
				)
			);
		}

		if (filters.durabilityRatings.length > 0) {
			result = result.filter(
				(product) =>
					product.durabilityRating &&
					filters.durabilityRatings.includes(product.durabilityRating)
			);
		}

		if (filters.weatherResistance.length > 0) {
			result = result.filter(
				(product) =>
					product.weatherResistance &&
					filters.weatherResistance.includes(
						product.weatherResistance.toLowerCase()
					)
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
			case "durability":
				result.sort(
					(a, b) => (b.durabilityRating || 0) - (a.durabilityRating || 0)
				);
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

	const handleViewProjectGallery = (images: BeforeAfterImage[]) => {
		setGalleryImages(images);
		setShowProjectGallery(true);
	};

	const handleViewMaintenanceSchedule = (schedule: MaintenanceSchedule) => {
		setSelectedMaintenanceSchedule(schedule);
		setShowMaintenanceSchedule(true);
	};

	const activeFilterCount = getActiveFilterCount();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-ds-neutral-white">
				<ExteriorPaintHero />
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
					<div className="animate-pulse">
						<div className="h-10 bg-ds-neutral-lightGray rounded w-full mb-8" />
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							<div className="space-y-4">
								<div className="h-6 bg-ds-neutral-lightGray rounded w-3/4" />
								<div className="h-40 bg-ds-neutral-lightGray rounded" />
							</div>
							<div className="md:col-span-3">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{[...Array(9)].map((_, i) => (
										<div
											key={i}
											className="h-80 bg-ds-neutral-lightGray rounded-lg"
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen bg-ds-neutral-white">
				<ExteriorPaintHero />
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8 text-center">
					<h2 className="text-2xl font-bold text-red-600 mb-4">
						Error loading exterior paints
					</h2>
					<p className="text-ds-neutral-darkSlate mb-8">
						{error?.message || "An unexpected error occurred."}
					</p>
					<button
						onClick={() => window.location.reload()}
						className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-ds-neutral-white">
			{/* Hero Section */}
			<ExteriorPaintHero />

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
				{/* Search and Tools Bar */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						{/* Search Bar */}
						<div className="relative max-w-md flex-1">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ds-neutral-mediumGray" />
							<input
								type="text"
								placeholder="Search exterior paints..."
								value={searchQuery}
								onChange={(e) => updateSearchQuery(e.target.value)}
								className="w-full pl-10 pr-8 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent transition-all duration-200"
								aria-label="Search exterior paints"
							/>
						</div>

						{/* Tool Buttons */}
						<div className="flex flex-wrap gap-2">
							<button
								onClick={() => setShowCalculator(true)}
								className="flex items-center space-x-2 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
								aria-label="Open coverage calculator"
							>
								<Calculator className="w-4 h-4" />
								<span className="hidden sm:inline">Coverage Calculator</span>
							</button>
							<button
								onClick={() =>
									handleViewProjectGallery(
										products.flatMap((p) => p.beforeAfterImages || [])
									)
								}
								className="flex items-center space-x-2 px-8 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200"
								aria-label="View project gallery"
							>
								<Image className="w-4 h-4" />
								<span className="hidden sm:inline">Project Gallery</span>
							</button>
							<button
								onClick={() =>
									handleViewMaintenanceSchedule(
										products[0]?.maintenanceSchedule || {
											interval: "N/A",
											tasks: ["No schedule available"],
										}
									)
								}
								className="flex items-center space-x-2 px-8 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200"
								aria-label="View maintenance schedule"
							>
								<CalendarCheck className="w-4 h-4" />
								<span className="hidden sm:inline">Maintenance Guide</span>
							</button>
						</div>
					</div>
				</div>

				{/* Filters and Sort Bar */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<div className="flex items-center space-x-4">
						{/* Mobile Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="lg:hidden flex items-center space-x-2 px-8 py-2 border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
							aria-label="Toggle filters"
						>
							<SlidersHorizontal className="w-4 h-4" />
							<span>Filters</span>
							{activeFilterCount > 0 && (
								<span className="bg-ds-primary-sage text-ds-neutral-white text-xs px-2 py-2 rounded-full">
									{activeFilterCount}
								</span>
							)}
						</button>

						{/* View Mode Toggle */}
						<div className="flex border border-ds-neutral-lightGray rounded-lg overflow-hidden">
							<button
								onClick={() => setViewMode("grid")}
								className={cn(
									"p-2 transition-colors duration-200",
									viewMode === "grid"
										? "bg-ds-primary-sage text-ds-neutral-white"
										: "bg-ds-neutral-white text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
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
										: "bg-ds-neutral-white text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
								)}
								aria-label="List view"
							>
								<List className="w-4 h-4" />
							</button>
						</div>

						{/* Results Count */}
						<span className="text-sm text-ds-neutral-mediumGray">
							{filteredProducts.length} exterior paints found
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
							<ExteriorPaintFilters
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
							onAddToCompare={() => {}}
							compareProducts={[]}
							loading={isLoading}
						/>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="mt-8">
								<ProductPagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Coverage Calculator Modal */}
			{showCalculator && (
				<ExteriorCoverageCalculator onClose={() => setShowCalculator(false)} />
			)}

			{/* Project Gallery Modal */}
			{showProjectGallery && (
				<ProjectGallery
					images={galleryImages}
					onClose={() => setShowProjectGallery(false)}
				/>
			)}

			{/* Maintenance Schedule Modal */}
			{showMaintenanceSchedule && selectedMaintenanceSchedule && (
				<MaintenanceScheduleModal
					schedule={selectedMaintenanceSchedule}
					onClose={() => setShowMaintenanceSchedule(false)}
				/>
			)}
		</div>
	);
}
