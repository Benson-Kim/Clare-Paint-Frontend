"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Eye, Heart, Plus, X } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductCategoryGridProps {
	products: Product[];
	viewMode: "grid" | "list";
	onQuickAdd: (product: Product) => void;
	onAddToCompare: (product: Product) => void;
	compareProducts: Product[];
	loading?: boolean;
	searchQuery: string;
	appliedFilters: any;
	onClearFilters: () => void;
}

export const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({
	products,
	viewMode,
	onQuickAdd,
	onAddToCompare,
	compareProducts,
	loading = false,
	searchQuery,
	appliedFilters,
	onClearFilters,
}) => {
	const isInComparison = (productId: string) => {
		return compareProducts.some((p) => p.id === productId);
	};

	const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onQuickAdd(product);
	};

	const handleAddToCompare = (product: Product, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onAddToCompare(product);
	};

	if (loading) {
		return (
			<div
				className={cn(
					"grid gap-6",
					viewMode === "grid"
						? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
						: "grid-cols-1"
				)}
			>
				{[...Array(9)].map((_, i) => (
					<div key={i} className="animate-pulse">
						<div className="bg-gray-200 rounded-lg h-64 mb-4" />
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 rounded w-3/4" />
							<div className="h-4 bg-gray-200 rounded w-1/2" />
							<div className="h-6 bg-gray-200 rounded w-1/4" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (products.length === 0) {
		const hasFilters = Object.values(appliedFilters).some((filter: any) =>
			Array.isArray(filter) ? filter.length > 0 : filter
		);

		return (
			<div className="text-center py-16">
				<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
					<Eye className="w-8 h-8 text-gray-400" />
				</div>
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
					No products found
				</h3>
				<p className="text-gray-600 mb-6">
					{searchQuery
						? `No products match "${searchQuery}"`
						: "No products match your current filters"}
				</p>
				{hasFilters && (
					<button
						onClick={onClearFilters}
						className="inline-flex items-center space-x-2 px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
					>
						<X className="w-4 h-4" />
						<span>Clear All Filters</span>
					</button>
				)}
			</div>
		);
	}

	if (viewMode === "list") {
		return (
			<div className="space-y-6">
				{products.map((product) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						className="block bg-ds-neutral-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group"
					>
						<div className="flex flex-col md:flex-row">
							{/* Product Image */}
							<div className="md:w-64 h-48 md:h-auto relative overflow-hidden bg-gray-100">
								<Image
									src={product.colors[0].image}
									alt={product.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
								{!product.inStock && (
									<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
										<span className="bg-red-600 text-ds-neutral-white px-3 py-1 rounded-full text-sm font-medium">
											Out of Stock
										</span>
									</div>
								)}
							</div>

							{/* Product Info */}
							<div className="flex-1 p-6">
								<div className="flex justify-between items-start mb-4">
									<div>
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
												{product.brand}
											</span>
											<span className="text-sm text-gray-500">
												{product.category}
											</span>
										</div>
										<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200">
											{product.name}
										</h3>
										<div className="flex items-center space-x-2 mb-3">
											<div className="flex items-center space-x-1">
												{[1, 2, 3, 4, 5].map((star) => (
													<Star
														key={star}
														className={cn(
															"w-4 h-4",
															star <= product.rating
																? "text-yellow-400 fill-current"
																: "text-gray-300"
														)}
													/>
												))}
											</div>
											<span className="text-sm text-gray-600">
												{product.rating} ({product.reviewCount} reviews)
											</span>
										</div>
									</div>
									<div className="text-right">
										<p className="text-2xl font-bold text-ds-primary-charcoal">
											${product.basePrice.toFixed(2)}
										</p>
										<p className="text-sm text-gray-600">Starting price</p>
									</div>
								</div>

								<p className="text-gray-700 mb-4 line-clamp-2">
									{product.description}
								</p>

								{/* Color Swatches */}
								<div className="flex items-center space-x-2 mb-4">
									<span className="text-sm text-gray-600">Colors:</span>
									<div className="flex space-x-1">
										{product.colors.slice(0, 5).map((color) => (
											<div
												key={color.id}
												className="w-6 h-6 rounded-full border-2 border-gray-200"
												style={{ backgroundColor: color.hex }}
												title={color.name}
											/>
										))}
										{product.colors.length > 5 && (
											<div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
												<span className="text-xs text-gray-600">
													+{product.colors.length - 5}
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex items-center space-x-3">
									<button
										onClick={(e) => handleQuickAdd(product, e)}
										disabled={!product.inStock}
										className={cn(
											"flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
											product.inStock
												? "bg-ds-primary-sage text-ds-neutral-white hover:bg-ds-primary-sage/90"
												: "bg-gray-300 text-gray-500 cursor-not-allowed"
										)}
									>
										<ShoppingCart className="w-4 h-4" />
										<span>Quick Add</span>
									</button>
									<button
										onClick={(e) => handleAddToCompare(product, e)}
										disabled={
											isInComparison(product.id) || compareProducts.length >= 3
										}
										className={cn(
											"p-2 rounded-lg border-2 transition-all duration-200",
											isInComparison(product.id)
												? "border-ds-primary-sage bg-ds-primary-sage/10 text-ds-primary-sage"
												: "border-gray-300 text-gray-600 hover:border-ds-primary-sage hover:text-ds-primary-sage"
										)}
										title={
											isInComparison(product.id)
												? "Added to comparison"
												: "Add to comparison"
										}
									>
										<Plus className="w-4 h-4" />
									</button>
									<button className="p-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-200">
										<Heart className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.map((product) => (
				<Link
					key={product.id}
					href={`/product/${product.id}`}
					className="group bg-ds-neutral-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100"
				>
					{/* Product Image */}
					<div className="relative aspect-square overflow-hidden bg-gray-100">
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
									onClick={(e) => handleAddToCompare(product, e)}
									disabled={
										isInComparison(product.id) || compareProducts.length >= 3
									}
									className={cn(
										"p-2 rounded-full shadow-lg transition-all duration-200",
										isInComparison(product.id)
											? "bg-ds-primary-sage text-ds-neutral-white"
											: "bg-ds-neutral-white text-gray-600 hover:bg-ds-primary-sage hover:text-ds-neutral-white"
									)}
									title={
										isInComparison(product.id)
											? "Added to comparison"
											: "Add to comparison"
									}
								>
									<Plus className="w-4 h-4" />
								</button>
								<button className="p-2 bg-ds-neutral-white text-gray-600 rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-200">
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
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									)}
								>
									<ShoppingCart className="w-4 h-4" />
									<span>Quick Add</span>
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
					<div className="p-4">
						<div className="flex items-center space-x-2 mb-2">
							<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
								{product.brand}
							</span>
							<span className="text-xs text-gray-500">{product.category}</span>
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
												: "text-gray-300"
										)}
									/>
								))}
							</div>
							<span className="text-xs text-gray-600">
								{product.rating} ({product.reviewCount})
							</span>
						</div>

						{/* Color Swatches */}
						<div className="flex items-center space-x-1 mb-3">
							{product.colors.slice(0, 4).map((color) => (
								<div
									key={color.id}
									className="w-5 h-5 rounded-full border border-gray-200"
									style={{ backgroundColor: color.hex }}
									title={color.name}
								/>
							))}
							{product.colors.length > 4 && (
								<div className="w-5 h-5 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
									<span className="text-xs text-gray-600">
										+{product.colors.length - 4}
									</span>
								</div>
							)}
						</div>

						{/* Features */}
						<div className="flex flex-wrap gap-1 mb-3">
							{product.features.slice(0, 2).map((feature, index) => (
								<span
									key={index}
									className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded"
								>
									{feature}
								</span>
							))}
							{product.features.length > 2 && (
								<span className="text-xs text-gray-500">
									+{product.features.length - 2} more
								</span>
							)}
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-lg font-bold text-ds-primary-charcoal">
									${product.basePrice.toFixed(2)}
								</p>
								<p className="text-xs text-gray-600">Starting price</p>
							</div>
							<div className="text-right">
								<p className="text-xs text-gray-600">{product.coverage}</p>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};
