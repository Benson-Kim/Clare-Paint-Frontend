"use client";

import React from "react";
import Link from "next/link";
import {
	Star,
	ShoppingCart,
	Heart,
	Eye,
	AlertCircle,
	Search,
} from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { NoResultsOptimization } from "./NoResultsOptimization";
import { SearchRefinements } from "./SearchRefinements";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RelatedProducts } from "./RelatedProducts";

interface SearchResultsProps {
	results: Product[];
	viewMode: "grid" | "list";
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	searchQuery: string;
	appliedFilters: any;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onResultClick: (productId: string, position: number) => void;
	onClearFilters: () => void;
	onRefinementClick: (query: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
	results,
	viewMode,
	isLoading,
	isError,
	error,
	searchQuery,
	appliedFilters,
	currentPage,
	totalPages,
	onPageChange,
	onResultClick,
	onClearFilters,
	onRefinementClick,
}) => {
	const addItem = useCartStore((state) => state.addItem);

	const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		addItem({
			productId: product.id,
			colorId: product.colors[0].id,
			finishId: product.finishes[0].id,
			quantity: 1,
			price: product.basePrice + product.finishes[0].price,
		});
	};

	const handleProductClick = (productId: string, position: number) => {
		onResultClick(productId, position);
	};

	const handleContactSupport = () => {
		// In production, this would open a support modal or redirect to contact page
		window.open("/contact", "_blank");
	};
	if (isLoading) {
		return (
			<div className="space-y-6">
				{/* Search Refinements for Loading State */}
				<SearchRefinements
					searchQuery={searchQuery}
					totalResults={0}
					onRefinementClick={onRefinementClick}
					onClearSearch={() => onRefinementClick("")}
				/>

				<div className="animate-pulse">
					<div
						className={cn(
							"grid gap-6",
							viewMode === "grid"
								? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
								: "grid-cols-1"
						)}
					>
						{[...Array(9)].map((_, i) => (
							<div
								key={i}
								className="bg-ds-neutral-lightGray/20 rounded-lg h-80"
							/>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-16">
				<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
					Search Error
				</h3>
				<p className="text-ds-neutral-mediumGray mb-6">
					{error?.message ||
						"An error occurred while searching. Please try again."}
				</p>
				<button
					onClick={() => window.location.reload()}
					className="px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (results.length === 0 && searchQuery) {
		return (
			<div className="space-y-8">
				<NoResultsOptimization
					searchQuery={searchQuery}
					appliedFilters={appliedFilters}
					onSuggestionClick={onRefinementClick}
					onClearFilters={onClearFilters}
					onContactSupport={handleContactSupport}
				/>

				<RelatedProducts
					searchQuery={searchQuery}
					currentResults={results}
					onProductClick={(productId) => onResultClick(productId, 0)}
				/>
			</div>
		);
	}

	if (results.length === 0) {
		return (
			<SearchRefinements
				searchQuery=""
				totalResults={0}
				onRefinementClick={onRefinementClick}
				onClearSearch={() => onRefinementClick("")}
			/>
		);
	}

	return (
		<div className="space-y-6">
			{/* Search Refinements */}
			<SearchRefinements
				searchQuery={searchQuery}
				totalResults={results.length}
				onRefinementClick={onRefinementClick}
				onClearSearch={() => onRefinementClick("")}
			/>

			{/* Results Grid/List */}
			<div
				className={cn(
					"grid gap-6",
					viewMode === "grid"
						? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
						: "grid-cols-1"
				)}
			>
				{results.map((product, index) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						onClick={() => handleProductClick(product.id, index)}
						className={cn(
							"group bg-ds-neutral-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 border border-ds-neutral-lightGray",
							viewMode === "list" && "flex"
						)}
					>
						{/* Product Image */}
						<div
							className={cn(
								"relative overflow-hidden bg-ds-neutral-lightGray/20",
								viewMode === "grid"
									? "aspect-square"
									: "w-48 h-48 flex-shrink-0"
							)}
						>
							<Image
								src={product.colors[0].image}
								alt={product.name}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>

							{/* Overlay Actions */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200">
								<div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										className="p-2 bg-ds-neutral-white text-ds-neutral-mediumGray rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-200"
										aria-label="Add to wishlist"
									>
										<Heart className="w-4 h-4" />
									</button>
								</div>

								<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<button
										onClick={(e) => handleQuickAdd(product, e)}
										disabled={!product.inStock}
										className={cn(
											"w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
											product.inStock
												? "bg-ds-neutral-white text-ds-primary-sage hover:bg-ds-primary-sage hover:text-ds-neutral-white"
												: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
										)}
										aria-label="Quick add to cart"
									>
										<ShoppingCart className="w-4 h-4" />
										<span className="cursor-pointer">Quick Add</span>
									</button>
								</div>
							</div>

							{!product.inStock && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
									<span className="bg-red-600 text-ds-neutral-white px-3 py-1 rounded-full text-sm font-medium">
										Out of Stock
									</span>
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className="p-4 flex-1">
							<div className="flex items-center space-x-2 mb-2">
								<span className="text-xs text-ds-neutral-mediumGray bg-ds-neutral-lightGray/50 px-2 py-1 rounded-full">
									{product.brand}
								</span>
								<span className="text-xs text-ds-neutral-mediumGray">
									{product.category}
								</span>
							</div>

							<h3 className="font-semibold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200 line-clamp-2">
								{product.name}
							</h3>

							<div className="flex items-center space-x-2 mb-3">
								<div className="flex items-center space-x-1">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={cn(
												"w-3 h-3",
												star <= product.rating
													? "text-yellow-400 fill-current"
													: "text-ds-neutral-lightGray"
											)}
										/>
									))}
								</div>
								<span className="text-xs text-ds-neutral-mediumGray">
									{product.rating} ({product.reviewCount})
								</span>
							</div>

							{/* Color Swatches */}
							<div className="flex items-center space-x-1 mb-3">
								{product.colors.slice(0, 4).map((color) => (
									<div
										key={color.id}
										className="w-5 h-5 rounded-full border border-ds-neutral-lightGray"
										style={{ backgroundColor: color.hex }}
										title={color.name}
									/>
								))}
								{product.colors.length > 4 && (
									<div className="w-5 h-5 rounded-full border border-ds-neutral-lightGray bg-ds-neutral-lightGray/50 flex items-center justify-center">
										<span className="text-xs text-ds-neutral-mediumGray">
											+{product.colors.length - 4}
										</span>
									</div>
								)}
							</div>

							<div className="flex items-center justify-between">
								<div>
									<p className="text-lg font-bold text-ds-primary-charcoal">
										{formatCurrency(product.basePrice)}
									</p>
									<p className="text-xs text-ds-neutral-mediumGray">
										Starting price
									</p>
								</div>
								<div className="text-right">
									<p className="text-xs text-ds-neutral-mediumGray">
										{product.coverage}
									</p>
								</div>
							</div>

							{/* List View Additional Info */}
							{viewMode === "list" && (
								<div className="mt-4 pt-4 border-t border-ds-neutral-lightGray">
									<p className="text-sm text-ds-neutral-darkSlate line-clamp-2 mb-3">
										{product.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{product.features.slice(0, 3).map((feature, index) => (
											<span
												key={index}
												className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded"
											>
												{feature}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</Link>
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center space-x-2 mt-12">
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={cn(
							"px-4 py-2 rounded-lg border transition-colors duration-200",
							currentPage === 1
								? "border-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
								: "border-ds-neutral-lightGray text-ds-neutral-darkSlate hover:border-ds-primary-sage hover:text-ds-primary-sage"
						)}
						aria-label="Previous page"
					>
						Previous
					</button>

					{[...Array(Math.min(5, totalPages))].map((_, index) => {
						const pageNumber = Math.max(1, currentPage - 2) + index;
						if (pageNumber > totalPages) return null;

						return (
							<button
								key={pageNumber}
								onClick={() => onPageChange(pageNumber)}
								className={cn(
									"px-4 py-2 rounded-lg border transition-colors duration-200",
									currentPage === pageNumber
										? "border-ds-primary-sage bg-ds-primary-sage text-ds-neutral-white"
										: "border-ds-neutral-lightGray text-ds-neutral-darkSlate hover:border-ds-primary-sage hover:text-ds-primary-sage"
								)}
								aria-label={`Go to page ${pageNumber}`}
								aria-current={currentPage === pageNumber ? "page" : undefined}
							>
								{pageNumber}
							</button>
						);
					})}

					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={cn(
							"px-4 py-2 rounded-lg border transition-colors duration-200",
							currentPage === totalPages
								? "border-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
								: "border-ds-neutral-lightGray text-ds-neutral-darkSlate hover:border-ds-primary-sage hover:text-ds-primary-sage"
						)}
						aria-label="Next page"
					>
						Next
					</button>
				</div>
			)}

			{/* Related Products for Successful Searches */}
			{results.length > 0 && (
				<div className="mt-16 pt-8 border-t border-ds-neutral-lightGray">
					<RelatedProducts
						searchQuery={searchQuery}
						currentResults={results}
						onProductClick={(productId) =>
							onResultClick(productId, results.length)
						}
					/>
				</div>
			)}
		</div>
	);
};
