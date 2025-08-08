"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RelatedProductsProps {
	searchQuery: string;
	currentResults: Product[];
	onProductClick: (productId: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
	searchQuery,
	currentResults,
	onProductClick,
}) => {
	const addItem = useCartStore((state) => state.addItem);

	// Mock related products - in production, this would come from an API
	const relatedProducts: Product[] = [
		{
			id: "related-1",
			name: "Color-Matched Primer",
			brand: "PrimeShield",
			description:
				"High-adhesion primer that matches your paint color for optimal coverage.",
			basePrice: 34.99,
			colors: [
				{
					id: "primer-white",
					name: "Primer White",
					hex: "#FFFFFF",
					image:
						"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=800",
					inStock: true,
					rgb: { r: 255, g: 255, b: 255 },
				},
			],
			finishes: [
				{
					id: "primer-finish",
					name: "Primer",
					description: "High-build primer finish",
					sheen: "Flat",
					price: 0,
					coverage: "350-400 sq ft per gallon",
				},
			],
			features: ["High adhesion", "Stain blocking", "Fast dry"],
			coverage: "350-400 sq ft per gallon",
			dryTime: "Touch dry: 1 hour",
			application: ["Brush", "Roller"],
			reviews: [],
			rating: 4.7,
			reviewCount: 89,
			inStock: true,
			category: "Primer",
			sku: "PRM-001",
		},
		{
			id: "related-2",
			name: "Professional Brush Set",
			brand: "ProTools",
			description: "Premium brush set for professional paint application.",
			basePrice: 79.99,
			colors: [
				{
					id: "brush-natural",
					name: "Natural Bristle",
					hex: "#D2B48C",
					image:
						"https://images.pexels.com/photos/1838564/pexels-photo-1838564.jpeg?auto=compress&cs=tinysrgb&w=800",
					inStock: true,
					rgb: { r: 210, g: 180, b: 140 },
				},
			],
			finishes: [
				{
					id: "brush-finish",
					name: "Professional",
					description: "Professional grade tools",
					sheen: "N/A",
					price: 0,
					coverage: "N/A",
				},
			],
			features: ["Professional grade", "Multiple sizes", "Easy cleanup"],
			coverage: "N/A",
			dryTime: "N/A",
			application: ["Manual"],
			reviews: [],
			rating: 4.9,
			reviewCount: 156,
			inStock: true,
			category: "Tools",
			sku: "TOOL-001",
		},
		{
			id: "related-3",
			name: "Paint Sample Kit",
			brand: "ColorMatch",
			description:
				"Test multiple colors before committing to your final choice.",
			basePrice: 12.99,
			colors: [
				{
					id: "sample-multi",
					name: "Multi-Color",
					hex: "#RAINBOW",
					image:
						"https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=800",
					inStock: true,
					rgb: { r: 128, g: 128, b: 128 },
				},
			],
			finishes: [
				{
					id: "sample-finish",
					name: "Sample",
					description: "2oz sample size",
					sheen: "Various",
					price: 0,
					coverage: "4-6 sq ft per sample",
				},
			],
			features: ["Multiple colors", "Small commitment", "Test before buying"],
			coverage: "4-6 sq ft per sample",
			dryTime: "Same as full paint",
			application: ["Brush"],
			reviews: [],
			rating: 4.5,
			reviewCount: 234,
			inStock: true,
			category: "Samples",
			sku: "SAMP-001",
		},
	];

	const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		addItem({
			productId: product.id,
			colorId: product.colors[0].id,
			finishId: product.finishes[0].id,
			quantity: 1,
			price: product.basePrice,
		});
	};

	const getRecommendationReason = (product: Product) => {
		if (product.category === "Primer") return "Essential for paint adhesion";
		if (product.category === "Tools") return "Professional application tools";
		if (product.category === "Samples") return "Test colors before buying";
		return "Frequently bought together";
	};

	return (
		<div className="space-y-8">
			<div className="text-center">
				<div className="flex items-center justify-center space-x-2 mb-4">
					<Sparkles className="w-6 h-6 text-ds-primary-sage" />
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						You Might Also Need
					</h2>
				</div>
				<p className="text-ds-neutral-mediumGray">
					Complete your paint project with these essential products
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{relatedProducts.map((product) => (
					<div
						key={product.id}
						className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 group"
					>
						{/* Product Image */}
						<div className="relative aspect-square overflow-hidden bg-ds-neutral-lightGray/20">
							<Image
								src={product.colors[0].image}
								alt={product.name}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>

							{/* Quick Add Overlay */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200">
								<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									<button
										onClick={(e) => handleQuickAdd(product, e)}
										className="w-full py-2 px-4 bg-ds-neutral-white text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-all duration-200 font-medium flex items-center justify-center space-x-2"
										aria-label={`Quick add ${product.name} to cart`}
									>
										<ShoppingCart className="w-4 h-4" />
										<span className="cursor-pointer">Quick Add</span>
									</button>
								</div>
							</div>

							{/* Recommendation Badge */}
							<div className="absolute top-3 left-3 bg-ds-primary-sage text-ds-neutral-white text-xs font-bold px-2 py-1 rounded-full">
								Recommended
							</div>
						</div>

						{/* Product Info */}
						<div className="p-4">
							<div className="flex items-center space-x-2 mb-2">
								<span className="text-xs text-ds-neutral-mediumGray bg-ds-neutral-lightGray/50 px-2 py-1 rounded-full">
									{product.brand}
								</span>
								<span className="text-xs text-ds-neutral-mediumGray">
									{product.category}
								</span>
							</div>

							<h3 className="font-semibold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200">
								{product.name}
							</h3>

							<p className="text-sm text-ds-neutral-mediumGray mb-3 line-clamp-2">
								{product.description}
							</p>

							{/* Rating */}
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

							{/* Recommendation Reason */}
							<div className="bg-ds-primary-sage/10 text-ds-primary-sage text-xs px-3 py-2 rounded-lg mb-3">
								{getRecommendationReason(product)}
							</div>

							{/* Price and Action */}
							<div className="flex items-center justify-between">
								<span className="text-lg font-bold text-ds-primary-charcoal">
									${product.basePrice.toFixed(2)}
								</span>
								<Link
									href={`/product/${product.id}`}
									onClick={() => onProductClick(product.id)}
									className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
									aria-label={`View details for ${product.name}`}
								>
									<span>View Details</span>
									<ArrowRight className="w-3 h-3" />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Browse Categories CTA */}
			<div className="text-center bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					Explore Our Paint Categories
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{ name: "Interior Paint", href: "/interior-paints" },
						{ name: "Exterior Paint", href: "/exterior-paints" },
						{ name: "Primers", href: "/products?category=primer" },
						{
							name: "Specialty Coatings",
							href: "/products?category=specialty",
						},
					].map((category, index) => (
						<Link
							key={index}
							href={category.href}
							className="p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-center group"
							aria-label={`Browse ${category.name}`}
						>
							<span className="text-sm font-medium text-ds-neutral-darkSlate group-hover:text-ds-primary-sage transition-colors duration-200">
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
