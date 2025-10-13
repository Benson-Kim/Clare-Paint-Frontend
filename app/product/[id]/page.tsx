"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Truck, RotateCcw, Shield, Eye } from "lucide-react";
import Link from "next/link";
import { Product, ProductColor, ProductFinish } from "@/types/product";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ColorSelector } from "@/components/product/ColorSelector";
import { FinishSelector } from "@/components/product/FinishSelector";
import { AddToCartSection } from "@/components/product/AddToCartSection";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ColorMatchingTools } from "@/components/product/ColorMatchingTools";
import { ApplicationGuide } from "@/components/product/ApplicationGuide";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api-service";
import { ErrorState } from "@/components/ui/RetryButton";

export default function ProductDetailPage() {
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState<
		"specs" | "reviews" | "tools" | "guide"
	>("specs");

	const {
		data: product,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery<Product>({
		queryKey: ["product", id],
		queryFn: () => fetchProductById(id as string),
		retry: 2,
		staleTime: 1000 * 60 * 10, // 10 minutes
	});

	// Fallbacks for selected color/finish
	const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
	const [selectedFinish, setSelectedFinish] = useState<ProductFinish | null>(
		null
	);

	// Initialize defaults once product loads
	useEffect(() => {
		if (product) {
			setSelectedColor(product.colors[0]);
			setSelectedFinish(product.finishes[0]);
		}
	}, [product]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="animate-pulse">
						<div className="h-6 bg-gray-200 rounded w-32 mb-8" />
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							<div className="space-y-4">
								<div className="h-96 md:h-[500px] bg-gray-200 rounded-lg" />
								<div className="flex space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div key={i} className="w-16 h-16 bg-gray-200 rounded-lg" />
									))}
								</div>
							</div>
							<div className="space-y-6">
								<div className="h-8 bg-gray-200 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-full" />
								<div className="h-4 bg-gray-200 rounded w-5/6" />
								<div className="h-20 bg-gray-200 rounded" />
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
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
					<ErrorState
						title="Error loading exterior paints"
						message={error?.message || "An unexpected error occurred."}
						onRetry={async () => {
							await refetch();
						}}
					/>
				</div>
			</div>
		);
	}

	if (!product || !selectedColor || !selectedFinish) {
	
			return (
				<div className="text-center py-16">
					<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
						<Eye className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
						No products found
					</h3>
					<p className="text-gray-600 mb-6">
						Try adjusting your filters or search terms
					</p>
					<button className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200">
						Clear all filters
					</button>
				</div>
			);
		}

	return (
		<div className="min-h-screen bg-white">
			{/* Breadcrumb */}
			<div className="bg-gray-50 border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<nav className="flex items-center space-x-2 text-sm">
						<Link
							href="/"
							className="text-gray-500 hover:text-ds-primary-sage transition-colors duration-200"
						>
							Home
						</Link>
						<span className="text-gray-400">/</span>
						<Link
							href="/products"
							className="text-gray-500 hover:text-ds-primary-sage transition-colors duration-200"
						>
							Products
						</Link>
						<span className="text-gray-400">/</span>
						<span className="text-ds-primary-charcoal font-medium">
							{product.category}
						</span>
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back Button */}
				<Link
					href="/products"
					className="inline-flex items-center space-x-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200 mb-8 group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
					<span>Back to Products</span>
				</Link>

				{/* Product Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Left Column - Images */}
					<div>
						<ProductImageGallery
							selectedColor={selectedColor}
							colors={product.colors}
							productName={product.name}
						/>
					</div>

					{/* Right Column - Product Info */}
					<div className="space-y-8">
						{/* Header */}
						<div>
							<div className="flex items-center space-x-2 mb-2">
								<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
									{product.brand}
								</span>
								<span className="text-sm text-gray-500">
									SKU: {product.sku}
								</span>
							</div>

							<h1 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
								{product.name}
							</h1>

							<div className="flex items-center space-x-4 mb-4">
								<div className="flex items-center space-x-1">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-5 h-5 ${
												star <= product.rating
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-600">
									{product.rating} ({product.reviewCount} reviews)
								</span>
							</div>

							<p className="text-gray-700 leading-relaxed mb-6">
								{product.description}
							</p>
						</div>

						{/* Color Selection */}
						<ColorSelector
							colors={product.colors}
							selectedColor={selectedColor}
							onColorSelect={setSelectedColor}
						/>

						{/* Finish Selection */}
						<FinishSelector
							finishes={product.finishes}
							selectedFinish={selectedFinish}
							onFinishSelect={setSelectedFinish}
							basePrice={product.basePrice}
						/>

						{/* Add to Cart Section */}
						<AddToCartSection
							product={product}
							selectedColor={selectedColor}
							selectedFinish={selectedFinish}
						/>

						{/* Trust Badges */}
						<div className="grid grid-cols-3 gap-4 pt-6 border-t">
							<div className="flex flex-col items-center text-center">
								<Truck className="w-6 h-6 text-ds-primary-sage mb-2" />
								<span className="text-xs text-gray-600">Free Shipping</span>
							</div>
							<div className="flex flex-col items-center text-center">
								<RotateCcw className="w-6 h-6 text-ds-primary-sage mb-2" />
								<span className="text-xs text-gray-600">30-Day Returns</span>
							</div>
							<div className="flex flex-col items-center text-center">
								<Shield className="w-6 h-6 text-ds-primary-sage mb-2" />
								<span className="text-xs text-gray-600">Quality Guarantee</span>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs Section */}
				<div className="border-t">
					<div className="flex space-x-4 md:space-x-8 mb-8 overflow-x-auto">
						<button
							onClick={() => setActiveTab("specs")}
							className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 ${
								activeTab === "specs"
									? "border-ds-primary-sage text-ds-primary-sage"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Specifications
						</button>
						<button
							onClick={() => setActiveTab("reviews")}
							className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 ${
								activeTab === "reviews"
									? "border-ds-primary-sage text-ds-primary-sage"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Reviews ({product.reviewCount})
						</button>
						<button
							onClick={() => setActiveTab("tools")}
							className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${
								activeTab === "tools"
									? "border-ds-primary-sage text-ds-primary-sage"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Color Tools
						</button>
						<button
							onClick={() => setActiveTab("guide")}
							className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${
								activeTab === "guide"
									? "border-ds-primary-sage text-ds-primary-sage"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							How-To Guide
						</button>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							{activeTab === "specs" ? (
								<ProductSpecs product={product} />
							) : activeTab === "reviews" ? (
								<ProductReviews
									reviews={product.reviews}
									rating={product.rating}
									reviewCount={product.reviewCount}
								/>
							) : activeTab === "tools" ? (
								<ColorMatchingTools
									selectedColor={selectedColor}
									colors={product.colors}
									onColorSelect={setSelectedColor}
								/>
							) : (
								<ApplicationGuide productName={product.name} />
							)}
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Color Visualization */}
							<div className="bg-white border border-gray-200 rounded-lg p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-4">
									Color Preview
								</h3>
								<div className="relative">
									<div
										className="w-full h-32 rounded-lg border"
										style={{ backgroundColor: selectedColor.hex }}
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg" />
								</div>
								<p className="text-sm text-gray-600 mt-2 text-center">
									{selectedColor.name} ({selectedColor.hex})
								</p>
							</div>

							{/* Quick Info */}
							<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-4">
									Need Help?
								</h3>
								<ul className="space-y-3 text-sm">
									<li className="flex items-start space-x-2">
										<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2" />
										<span className="text-gray-700">
											Color matching available in-store
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2" />
										<span className="text-gray-700">Free sample available</span>
									</li>
									<li className="flex items-start space-x-2">
										<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2" />
										<span className="text-gray-700">
											Professional consultation
										</span>
									</li>
								</ul>
								<button className="w-full mt-4 py-2 text-ds-primary-sage border border-ds-primary-sage rounded-lg hover:bg-ds-primary-sage hover:text-white transition-all duration-200">
									Contact Us
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Related Products */}
			<RelatedProducts currentProductId={product.id} />
		</div>
	);
}
