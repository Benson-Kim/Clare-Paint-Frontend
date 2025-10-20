"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
	ArrowRight,
	ShoppingCart,
	Star,
	Heart,
	Eye,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { mockProducts } from "@/data/mock-products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatCurrency } from "@/utils/cartUtils";
import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlist-store";

export const ShopPaintSection: React.FC = () => {
	const { addItem } = useCartStore();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const carouselRef = useRef<HTMLDivElement>(null);

	const featuredProducts = mockProducts.slice(0, 6);
	const itemsPerSlide = 3;
	const totalSlides = Math.ceil(featuredProducts.length / itemsPerSlide);

	// Auto-play functionality
	React.useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % totalSlides);
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, totalSlides]);

	const handleQuickAdd = (product: Product) => {
		addItem({
			productId: product.id,
			colorId: product.colors[0].id,
			finishId: product.finishes[0].id,
			quantity: 1,
			price: product.basePrice + product.finishes[0].price,
		});
	};

	const { items, removeItem, addToWishlist } = useWishlistStore();

	const isInWishlist = (productId: string) =>
		items.some((item) => item.id === productId);

	const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (isInWishlist(product.id)) {
			removeItem(product.id);
		} else {
			addToWishlist({
				id: product.id,
				name: product.name,
				price: product.basePrice,
				image: product.colors?.[0]?.image ?? "",
				brand: product.brand,
				color: product.colors?.[0]?.name ?? "Default",
				inStock: product.inStock,
				rating: product.rating,
			});
		}
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % totalSlides);
		setIsAutoPlaying(false);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
		setIsAutoPlaying(false);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false);
	};

	return (
		<section className="py-20 bg-ds-primary-cream">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="text-center mb-16">
					<h2
						className="font-semibold text-ds-primary-charcoal mb-4"
						style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
					>
						Shop Premium Paints
					</h2>
					<p
						className="text-ds-neutral-mediumGray max-w-3xl mx-auto"
						style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
					>
						Discover our collection of premium paints, each formulated for
						superior coverage, durability, and color richness. Professional
						quality for every project.
					</p>
				</div>

				{/* Product Carousel */}
				<div className="relative">
					<div
						ref={carouselRef}
						className="overflow-hidden rounded-xl"
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentSlide * 100}%)` }}
						>
							{Array.from({ length: totalSlides }).map((_, slideIndex) => (
								<div key={slideIndex} className="w-full flex-shrink-0">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
										{featuredProducts
											.slice(
												slideIndex * itemsPerSlide,
												(slideIndex + 1) * itemsPerSlide
											)
											.map((product) => (
												<div
													key={product.id}
													className="group bg-ds-neutral-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
												>
													{/* Product Image */}
													<div className="relative aspect-square overflow-hidden">
														<Image
															src={product.colors[0].image}
															alt={product.name}
															fill
															className="object-cover group-hover:scale-110 transition-transform duration-700"
															loading="lazy"
														/>

														{/* Overlay Actions */}
														<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
															<div className="absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 transform translate-x-0">
																<button
																	onClick={(e) =>
																		handleWishlistToggle(product, e)
																	}
																	className={cn(
																		"p-2 bg-ds-neutral-white rounded-full shadow-lg cursor-pointer",
																		isInWishlist(product.id)
																			? "bg-red-100 text-red-500 transition-colors duration-200"
																			: "hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
																	)}
																	title={
																		isInWishlist(product.id)
																			? "Remove from wishlist"
																			: "Add to wishlist"
																	}
																>
																	<Heart
																		className={cn(
																			"w-4 h-4",
																			isInWishlist(product.id) && "fill-current"
																		)}
																	/>
																</button>

																<button className="p-2 bg-ds-neutral-white rounded-full shadow-lg cursor-pointer opacity-0 group-hover:opacity-100  hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-colors duration-200">
																	<Eye className="w-4 h-4" />
																</button>
															</div>

															<div className="absolute bottom-4 left-4 right-4 transition-all duration-300 transform translate-y-0">
																<button
																	onClick={() => handleQuickAdd(product)}
																	className="w-full py-3 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg hover:bg-ds-accent-warmBeige/90 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
																>
																	<ShoppingCart className="w-4 h-4" />
																	<span className="cursor-pointer">
																		Quick Add
																	</span>
																</button>
															</div>
														</div>

														{/* Badge */}
														<div className="absolute top-4 left-4 bg-ds-primary-sage text-ds-neutral-white px-3 py-1 rounded-full text-xs font-bold">
															Best Seller
														</div>
													</div>

													{/* Product Info */}
													<div className="p-6">
														<div className="flex items-center space-x-2 mb-2">
															<span className="text-xs text-ds-neutral-mediumGray bg-ds-neutral-lightGray/50 px-2 py-1 rounded-full">
																{product.brand}
															</span>
															<span className="text-xs text-ds-neutral-mediumGray">
																{product.category}
															</span>
														</div>

														<h3 className="font-semibold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-300">
															{product.name}
														</h3>

														{/* Rating */}
														<div className="flex items-center space-x-2 mb-3">
															<div className="flex items-center space-x-1">
																{[1, 2, 3, 4, 5].map((star) => (
																	<Star
																		key={star}
																		className={cn(
																			"w-4 h-4",
																			star <= product.rating
																				? "text-yellow-400 fill-current"
																				: "text-ds-neutral-lightGray"
																		)}
																	/>
																))}
															</div>
															<span className="text-sm text-ds-neutral-mediumGray">
																{product.rating} ({product.reviewCount})
															</span>
														</div>

														{/* Color Swatches */}
														<div className="flex items-center space-x-1 mb-4">
															{product.colors.slice(0, 4).map((color) => (
																<div
																	key={color.id}
																	className="w-6 h-6 rounded-full border-2 border-ds-neutral-lightGray hover:border-ds-primary-sage transition-colors duration-200"
																	style={{ backgroundColor: color.hex }}
																	title={color.name}
																/>
															))}
															{product.colors.length > 4 && (
																<div className="w-6 h-6 rounded-full border-2 border-ds-neutral-lightGray bg-ds-neutral-lightGray/50 flex items-center justify-center">
																	<span className="text-xs text-ds-neutral-mediumGray font-medium">
																		+{product.colors.length - 4}
																	</span>
																</div>
															)}
														</div>

														{/* Price and CTA */}
														<div className="flex items-center justify-between">
															<div>
																<span className="text-xl font-bold text-ds-primary-charcoal">
																	{formatCurrency(product.basePrice)}
																</span>
																<p className="text-xs text-ds-neutral-mediumGray">
																	Starting price
																</p>
															</div>
															<Link
																href={`/product/${product.id}`}
																className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-300 font-semibold text-sm flex items-center space-x-1 group"
															>
																<span>View Details</span>
																<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
															</Link>
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-between mt-8">
						<button
							onClick={prevSlide}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-full hover:border-ds-primary-sage hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-all duration-300 shadow-sm hover:shadow-md"
							aria-label="Previous products"
						>
							<ChevronLeft className="w-6 h-6" />
						</button>

						{/* Slide Indicators */}
						<div className="flex space-x-2">
							{Array.from({ length: totalSlides }).map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={cn(
										"w-3 h-3 rounded-full transition-all duration-300",
										currentSlide === index
											? "bg-ds-primary-sage scale-125"
											: "bg-ds-neutral-lightGray hover:bg-ds-primary-sage/50"
									)}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>

						<button
							onClick={nextSlide}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-full hover:border-ds-primary-sage hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-all duration-300 shadow-sm hover:shadow-md"
							aria-label="Next products"
						>
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* View All CTA */}
				<div className="text-center mt-16">
					<Link
						href="/products"
						className="inline-flex items-center space-x-3 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-all duration-300 font-semibold text-lg group hover:scale-105"
					>
						<span>Shop All Paints</span>
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</Link>
				</div>
			</div>
		</section>
	);
};
