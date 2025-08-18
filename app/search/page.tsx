"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
	Search,
	Filter,
	Grid,
	List,
	SlidersHorizontal,
	X,
	Bookmark,
	TrendingUp,
	Clock,
	Eye,
} from "lucide-react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { SavedSearches } from "@/components/search/SavedSearches";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { VisualSearch } from "@/components/search/VisualSearch";
import { SearchAnalytics } from "@/components/search/SearchAnalytics";
import { useAdvancedSearch } from "@/hooks/useAdvancedSearch";
import { useSearchAnalytics } from "@/hooks/useSearchAnalytics";
import { cn } from "@/lib/utils";

function SearchPageContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const [showSavedSearches, setShowSavedSearches] = useState(false);
	const [showVisualSearch, setShowVisualSearch] = useState(false);
	const [showAnalytics, setShowAnalytics] = useState(false);

	const {
		searchQuery,
		filters,
		results,
		suggestions,
		isLoading,
		isError,
		error,
		totalResults,
		currentPage,
		totalPages,
		updateSearchQuery,
		updateFilters,
		clearFilters,
		setPage,
		setSortBy,
		sortBy,
		saveSearch,
		savedSearches,
		deleteSavedSearch,
		loadSavedSearch,
		searchHistory,
		clearSearchHistory,
	} = useAdvancedSearch();

	const {
		trackSearch,
		trackFilterUsage,
		trackResultClick,
		getSearchAnalytics,
		getPopularSearches,
		getTrendingColors,
	} = useSearchAnalytics();

	// Initialize search from URL parameters
	useEffect(() => {
		const query = searchParams.get("q");
		const category = searchParams.get("category");
		const color = searchParams.get("color");
		const minPrice = searchParams.get("minPrice");
		const maxPrice = searchParams.get("maxPrice");
		const room = searchParams.get("room");
		const finish = searchParams.get("finish");
		const brand = searchParams.get("brand");
		const inStock = searchParams.get("inStock");
		const sort = searchParams.get("sort");

		if (query) {
			updateSearchQuery(query);
		}

		const urlFilters: any = {};
		if (category) urlFilters.categories = [category];
		if (color) urlFilters.colorFamilies = [color];
		if (room) urlFilters.roomTypes = [room];
		if (finish) urlFilters.finishTypes = [finish];
		if (brand) urlFilters.brands = [brand];
		if (minPrice && maxPrice)
			urlFilters.priceRange = [Number(minPrice), Number(maxPrice)];
		if (inStock === "true") urlFilters.inStockOnly = true;

		if (Object.keys(urlFilters).length > 0) {
			updateFilters(urlFilters);
		}

		if (sort) {
			setSortBy(sort);
		}
	}, [searchParams]);

	// Update URL when search changes
	useEffect(() => {
		const params = new URLSearchParams();

		if (searchQuery) params.set("q", searchQuery);
		if (filters.categories?.length)
			params.set("category", filters.categories[0]);
		if (filters.colorFamilies?.length)
			params.set("color", filters.colorFamilies[0]);
		if (filters.roomTypes?.length) params.set("room", filters.roomTypes[0]);
		if (filters.finishTypes?.length)
			params.set("finish", filters.finishTypes[0]);
		if (filters.brands?.length) params.set("brand", filters.brands[0]);
		if (filters.priceRange) {
			params.set("minPrice", filters.priceRange[0].toString());
			params.set("maxPrice", filters.priceRange[1].toString());
		}
		if (filters.inStockOnly) params.set("inStock", "true");
		if (sortBy !== "relevance") params.set("sort", sortBy);

		const newUrl = params.toString()
			? `/search?${params.toString()}`
			: "/search";
		router.replace(newUrl, { scroll: false });
	}, [searchQuery, filters, sortBy, router]);

	const activeFilterCount = useMemo(() => {
		let count = 0;
		if (filters.categories?.length) count++;
		if (filters.colorFamilies?.length) count++;
		if (filters.roomTypes?.length) count++;
		if (filters.finishTypes?.length) count++;
		if (filters.brands?.length) count++;
		if (
			filters.priceRange &&
			(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000)
		)
			count++;
		if (filters.inStockOnly) count++;
		return count;
	}, [filters]);

	const handleSearchSubmit = (query: string) => {
		updateSearchQuery(query);
		trackSearch(query, filters, totalResults);
	};

	const handleFilterChange = (newFilters: any) => {
		updateFilters(newFilters);
		trackFilterUsage(newFilters);
	};

	const handleResultClick = (productId: string, position: number) => {
		trackResultClick(productId, searchQuery, position);
	};

	const handleSaveSearch = () => {
		if (searchQuery || activeFilterCount > 0) {
			const searchName = searchQuery || "Custom Search";
			saveSearch(searchName, searchQuery, filters);
		}
	};

	return (
		<div className="min-h-screen bg-ds-neutral-white">
			{/* Header */}
			<div className="bg-ds-neutral-white border-b border-ds-neutral-lightGray sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-6">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						{/* Search Input */}
						<div className="flex-1 max-w-2xl">
							<SearchInput
								value={searchQuery}
								onSubmit={handleSearchSubmit}
								suggestions={suggestions}
								isLoading={isLoading}
								placeholder="Search paints, colors, brands, or room types..."
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex items-center space-x-3">
							<button
								onClick={() => setShowVisualSearch(true)}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200"
								aria-label="Open visual search"
							>
								<Eye className="w-4 h-4" />
								<span className="hidden sm:inline">Visual Search</span>
							</button>

							<button
								onClick={() => setShowSavedSearches(true)}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
								aria-label="View saved searches"
							>
								<Bookmark className="w-4 h-4" />
								<span className="hidden sm:inline">Saved</span>
								{savedSearches.length > 0 && (
									<span className="bg-ds-primary-sage text-ds-neutral-white text-xs px-2 py-1 rounded-full">
										{savedSearches.length}
									</span>
								)}
							</button>

							<button
								onClick={() => setShowAnalytics(true)}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-neutral-lightGray text-ds-neutral-darkSlate rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
								aria-label="View search analytics"
							>
								<TrendingUp className="w-4 h-4" />
								<span className="hidden sm:inline">Trends</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
				{/* Search Results Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<div className="flex items-center space-x-4">
						{/* Mobile Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-ds-neutral-lightGray rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
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
							{isLoading ? "Searching..." : `${totalResults} results found`}
							{searchQuery && (
								<span className="ml-1">for {`"${searchQuery}"`}</span>
							)}
						</span>
					</div>

					<div className="flex items-center space-x-4">
						{/* Save Search */}
						{(searchQuery || activeFilterCount > 0) && (
							<button
								onClick={handleSaveSearch}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200"
								aria-label="Save current search"
							>
								<Bookmark className="w-4 h-4" />
								<span>Save Search</span>
							</button>
						)}

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
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Sort search results"
						>
							<option value="relevance">Most Relevant</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="rating">Highest Rated</option>
							<option value="newest">Newest</option>
							<option value="popular">Most Popular</option>
							<option value="name">Name A-Z</option>
						</select>
					</div>
				</div>

				{/* Search Suggestions */}
				{!searchQuery && !isLoading && (
					<SearchSuggestions
						onSuggestionClick={handleSearchSubmit}
						searchHistory={searchHistory}
						onClearHistory={clearSearchHistory}
					/>
				)}

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Filters Sidebar */}
					<div className={cn("lg:block", showFilters ? "block" : "hidden")}>
						<div className="sticky top-32">
							<SearchFilters
								filters={filters}
								onFilterChange={handleFilterChange}
								onClearFilters={clearFilters}
								activeFilterCount={activeFilterCount}
							/>
						</div>
					</div>

					{/* Search Results */}
					<div className="lg:col-span-3">
						<SearchResults
							results={results}
							viewMode={viewMode}
							isLoading={isLoading}
							isError={isError}
							error={error}
							searchQuery={searchQuery}
							appliedFilters={filters}
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setPage}
							onResultClick={handleResultClick}
							onClearFilters={clearFilters}
							onRefinementClick={updateSearchQuery}
						/>
					</div>
				</div>
			</div>

			{/* Modals */}
			{showSavedSearches && (
				<SavedSearches
					savedSearches={savedSearches}
					onClose={() => setShowSavedSearches(false)}
					onLoadSearch={loadSavedSearch}
					onDeleteSearch={deleteSavedSearch}
				/>
			)}

			{showVisualSearch && (
				<VisualSearch
					onClose={() => setShowVisualSearch(false)}
					onSearchByImage={(imageUrl: string) => {
						// Handle visual search
						setShowVisualSearch(false);
					}}
				/>
			)}

			{showAnalytics && (
				<SearchAnalytics
					onClose={() => setShowAnalytics(false)}
					analytics={getSearchAnalytics()}
					popularSearches={getPopularSearches()}
					trendingColors={getTrendingColors()}
				/>
			)}
		</div>
	);
}

export default function SearchPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-ds-primary-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
						<p className="text-lg text-ds-neutral-mediumGray">
							Loading search...
						</p>
					</div>
				</div>
			}
		>
			<SearchPageContent />
		</Suspense>
	);
}
