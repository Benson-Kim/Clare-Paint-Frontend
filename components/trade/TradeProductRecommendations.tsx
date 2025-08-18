"use client";

import React, { useState } from "react";
import {
	Star,
	Award,
	Shield,
	Truck,
	Clock,
	TrendingUp,
	Filter,
	Grid,
	List,
	ShoppingCart,
	Heart,
	Eye,
	CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TradeProduct {
	id: string;
	name: string;
	brand: string;
	category: string;
	description: string;
	unitPrice: number;
	tradePrice: number;
	discount: number;
	coverage: string;
	features: string[];
	rating: number;
	reviewCount: number;
	inStock: boolean;
	leadTime: string;
	image: string;
	professionalGrade: boolean;
	bulkAvailable: boolean;
	minOrderQty: number;
}

export const TradeProductRecommendations: React.FC = () => {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("recommended");

	const tradeProducts: TradeProduct[] = [
		{
			id: "trade-001",
			name: "Professional Interior Latex - Contractor Grade",
			brand: "Artisan Pro",
			category: "Interior Paint",
			description:
				"High-performance interior paint designed for professional contractors. Superior coverage and durability.",
			unitPrice: 89.99,
			tradePrice: 72.0,
			discount: 20,
			coverage: "400-450 sq ft per gallon",
			features: ["Zero-VOC", "Superior Hide", "Stain Resistant", "Quick Dry"],
			rating: 4.9,
			reviewCount: 245,
			inStock: true,
			leadTime: "1-2 days",
			image:
				"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: true,
			minOrderQty: 5,
		},
		{
			id: "trade-002",
			name: "Commercial Exterior Acrylic - Weather Shield",
			brand: "WeatherGuard Pro",
			category: "Exterior Paint",
			description:
				"Premium exterior coating for commercial applications. Maximum weather resistance and longevity.",
			unitPrice: 119.99,
			tradePrice: 95.99,
			discount: 20,
			coverage: "300-350 sq ft per gallon",
			features: [
				"Weather Resistant",
				"Fade Proof",
				"Mildew Resistant",
				"15-Year Warranty",
			],
			rating: 4.8,
			reviewCount: 189,
			inStock: true,
			leadTime: "2-3 days",
			image:
				"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: true,
			minOrderQty: 10,
		},
		{
			id: "trade-003",
			name: "High-Build Primer Sealer - Professional",
			brand: "PrimeShield",
			category: "Primer",
			description:
				"Professional-grade primer with superior adhesion and stain blocking properties.",
			unitPrice: 69.99,
			tradePrice: 55.99,
			discount: 20,
			coverage: "350-400 sq ft per gallon",
			features: [
				"Stain Blocking",
				"High Adhesion",
				"Fast Dry",
				"Multi-Surface",
			],
			rating: 4.7,
			reviewCount: 156,
			inStock: true,
			leadTime: "1-2 days",
			image:
				"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: true,
			minOrderQty: 5,
		},
		{
			id: "trade-004",
			name: "Elastomeric Roof Coating - Commercial Grade",
			brand: "FlexiShield",
			category: "Specialty Coating",
			description:
				"Heavy-duty elastomeric coating for flat roofs and masonry surfaces.",
			unitPrice: 159.99,
			tradePrice: 127.99,
			discount: 20,
			coverage: "80-120 sq ft per gallon",
			features: [
				"Waterproof",
				"Crack Bridging",
				"Energy Efficient",
				"10-Year Warranty",
			],
			rating: 4.6,
			reviewCount: 98,
			inStock: false,
			leadTime: "7-10 days",
			image:
				"https://images.pexels.com/photos/164014/pexels-photo-164014.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: true,
			minOrderQty: 20,
		},
		{
			id: "trade-005",
			name: "Anti-Graffiti Coating - Clear Protective",
			brand: "ProtectCoat",
			category: "Specialty Coating",
			description:
				"Invisible protective coating that makes graffiti removal easy and protects surfaces.",
			unitPrice: 89.99,
			tradePrice: 71.99,
			discount: 20,
			coverage: "200-250 sq ft per gallon",
			features: [
				"Invisible Protection",
				"Easy Cleanup",
				"UV Resistant",
				"Long Lasting",
			],
			rating: 4.5,
			reviewCount: 67,
			inStock: true,
			leadTime: "3-5 days",
			image:
				"https://images.pexels.com/photos/6782367/pexels-photo-6782367.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: false,
			minOrderQty: 1,
		},
		{
			id: "trade-006",
			name: "Industrial Epoxy Floor Coating",
			brand: "FloorTech",
			category: "Floor Coating",
			description:
				"Heavy-duty epoxy coating for industrial floors, garages, and high-traffic areas.",
			unitPrice: 199.99,
			tradePrice: 159.99,
			discount: 20,
			coverage: "150-200 sq ft per gallon",
			features: [
				"Chemical Resistant",
				"High Durability",
				"Non-Slip Option",
				"Fast Cure",
			],
			rating: 4.8,
			reviewCount: 134,
			inStock: true,
			leadTime: "5-7 days",
			image:
				"https://images.pexels.com/photos/6508390/pexels-photo-6508390.jpeg?auto=compress&cs=tinysrgb&w=800",
			professionalGrade: true,
			bulkAvailable: true,
			minOrderQty: 15,
		},
	];

	const categories = [
		"all",
		"Interior Paint",
		"Exterior Paint",
		"Primer",
		"Specialty Coating",
		"Floor Coating",
	];

	const filteredProducts = tradeProducts.filter(
		(product) =>
			selectedCategory === "all" || product.category === selectedCategory
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (sortBy) {
			case "price-low":
				return a.tradePrice - b.tradePrice;
			case "price-high":
				return b.tradePrice - a.tradePrice;
			case "discount":
				return b.discount - a.discount;
			case "rating":
				return b.rating - a.rating;
			default:
				return 0; // recommended order
		}
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Award className="w-6 h-6 text-ds-primary-sage" />
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						Trade Product Recommendations
					</h2>
				</div>
				<div className="flex items-center space-x-4">
					<div className="flex border border-ds-neutral-lightGray rounded-lg overflow-hidden">
						<button
							onClick={() => setViewMode("grid")}
							className={cn(
								"p-2 transition-colors duration-200",
								viewMode === "grid"
									? "bg-ds-primary-sage text-ds-neutral-white"
									: "bg-ds-neutral-white text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
							)}
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
						>
							<List className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Filters and Sort */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div className="flex items-center space-x-4">
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category === "all" ? "All Categories" : category}
							</option>
						))}
					</select>
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					>
						<option value="recommended">Recommended</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="discount">Highest Discount</option>
						<option value="rating">Highest Rated</option>
					</select>
				</div>
				<span className="text-sm text-ds-neutral-mediumGray">
					{sortedProducts.length} professional products
				</span>
			</div>

			{/* Products Grid/List */}
			<div
				className={cn(
					"grid gap-4",
					viewMode === "grid"
						? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
						: "grid-cols-1"
				)}
			>
				{sortedProducts.map((product) => (
					<div
						key={product.id}
						className={cn(
							"bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group",
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
								src={product.image}
								alt={product.name}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>

							{/* Badges */}
							<div className="absolute top-4 left-4 space-y-2">
								{product.professionalGrade && (
									<span className="bg-ds-primary-sage text-ds-neutral-white px-2 py-2 rounded-full text-xs font-bold">
										PRO
									</span>
								)}
								{product.discount > 15 && (
									<span className="bg-red-500 text-ds-neutral-white px-2 py-2 rounded-full text-xs font-bold">
										{product.discount}% OFF
									</span>
								)}
							</div>

							{!product.inStock && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
									<span className="bg-red-600 text-ds-neutral-white px-4 py-2 rounded-full text-sm font-medium">
										Special Order
									</span>
								</div>
							)}
						</div>

						{/* Product Info */}
						<div className="p-4 flex-1">
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<div className="flex items-center space-x-2 mb-2">
										<span className="text-xs text-ds-neutral-mediumGray bg-ds-neutral-lightGray/50 px-2 py-2 rounded-full">
											{product.brand}
										</span>
										<span className="text-xs text-ds-neutral-mediumGray">
											{product.category}
										</span>
									</div>
									<h3 className="font-semibold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200">
										{product.name}
									</h3>
									<div className="flex items-center space-x-2 mb-4">
										<div className="flex items-center space-x-2">
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
								</div>
							</div>

							<p className="text-sm text-ds-neutral-mediumGray mb-4 line-clamp-2">
								{product.description}
							</p>

							{/* Features */}
							<div className="flex flex-wrap gap-2 mb-4">
								{product.features.slice(0, 3).map((feature, index) => (
									<span
										key={index}
										className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-2 rounded"
									>
										{feature}
									</span>
								))}
								{product.features.length > 3 && (
									<span className="text-xs text-ds-neutral-mediumGray">
										+{product.features.length - 3} more
									</span>
								)}
							</div>

							{/* Pricing */}
							<div className="mb-4">
								<div className="flex items-baseline space-x-4">
									<span className="text-xl font-bold text-ds-primary-charcoal">
										${product.tradePrice.toFixed(2)}
									</span>
									<span className="text-sm text-ds-neutral-mediumGray line-through">
										${product.unitPrice.toFixed(2)}
									</span>
								</div>
								<p className="text-sm text-green-600 font-medium">
									Trade savings: $
									{(product.unitPrice - product.tradePrice).toFixed(2)} (
									{product.discount}%)
								</p>
								<p className="text-xs text-ds-neutral-mediumGray">
									{product.coverage} • Min order: {product.minOrderQty} units
								</p>
							</div>

							{/* Stock and Lead Time */}
							<div className="flex items-center space-x-4 mb-4 text-xs">
								<div className="flex items-center space-x-2">
									{product.inStock ? (
										<CheckCircle className="w-3 h-3 text-green-600" />
									) : (
										<Clock className="w-3 h-3 text-yellow-600" />
									)}
									<span
										className={cn(
											product.inStock ? "text-green-600" : "text-yellow-600"
										)}
									>
										{product.inStock ? "In Stock" : "Special Order"}
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Truck className="w-3 h-3 text-ds-neutral-mediumGray" />
									<span className="text-ds-neutral-mediumGray">
										{product.leadTime}
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex space-x-2">
								<button className="flex-1 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2">
									<ShoppingCart className="w-4 h-4" />
									<span>Add to Order</span>
								</button>
								<button className="p-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:border-ds-primary-sage hover:text-ds-primary-sage transition-colors duration-200">
									<Heart className="w-4 h-4" />
								</button>
								<button className="p-2 border border-ds-neutral-lightGray text-ds-neutral-mediumGray rounded-lg hover:border-ds-primary-sage hover:text-ds-primary-sage transition-colors duration-200">
									<Eye className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Professional Benefits */}
			<div className="bg-gradient-to-r from-ds-primary-sage to-ds-accent-warmBeige text-ds-neutral-white rounded-lg p-8">
				<div className="text-center mb-8">
					<h3 className="text-2xl font-bold mb-4">
						Why Choose Our Professional Products?
					</h3>
					<p className="text-ds-neutral-white/90">
						Designed specifically for contractors who demand the best
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="text-center">
						<div className="w-16 h-16 bg-ds-neutral-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Shield className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h4 className="font-semibold mb-2">Superior Quality</h4>
						<p className="text-sm text-ds-neutral-white/80">
							Professional-grade formulations for lasting results
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-neutral-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<TrendingUp className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h4 className="font-semibold mb-2">Better Coverage</h4>
						<p className="text-sm text-ds-neutral-white/80">
							Higher solids content means fewer coats needed
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-neutral-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Clock className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h4 className="font-semibold mb-2">Faster Application</h4>
						<p className="text-sm text-ds-neutral-white/80">
							Quick-dry formulas to keep projects on schedule
						</p>
					</div>

					<div className="text-center">
						<div className="w-16 h-16 bg-ds-neutral-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Award className="w-8 h-8 text-ds-neutral-white" />
						</div>
						<h4 className="font-semibold mb-2">Warranty Backed</h4>
						<p className="text-sm text-ds-neutral-white/80">
							Extended warranties for professional applications
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
