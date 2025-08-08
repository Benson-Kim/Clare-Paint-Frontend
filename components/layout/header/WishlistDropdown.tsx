"use client";

import React from "react";
import Link from "next/link";
import { Heart, X, ArrowRight, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WishlistDropdownProps {
	itemCount: number;
	onClose: () => void;
}

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	color: string;
	price: number;
	originalPrice?: number;
	image: string;
	inStock: boolean;
	rating: number;
	onSale?: boolean;
}

export const WishlistDropdown: React.FC<WishlistDropdownProps> = ({
	itemCount,
	onClose,
}) => {
	// Mock wishlist items - in production, this would come from wishlist store
	const wishlistItems: WishlistItem[] = [
		{
			id: "1",
			name: "Premium Interior Paint",
			brand: "Artisan Pro",
			color: "Sage Whisper",
			price: 89.99,
			originalPrice: 99.99,
			image:
				"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=400",
			inStock: true,
			rating: 4.8,
			onSale: true,
		},
		{
			id: "2",
			name: "Exterior Acrylic Paint",
			brand: "WeatherGuard Pro",
			color: "Classic White",
			price: 99.99,
			image:
				"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=400",
			inStock: true,
			rating: 4.9,
		},
		{
			id: "3",
			name: "Specialty Primer",
			brand: "PrimeShield",
			color: "Universal Gray",
			price: 34.99,
			image:
				"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=400",
			inStock: false,
			rating: 4.7,
		},
	];

	if (itemCount === 0) {
		return (
			<div className="absolute top-full right-0 mt-2 w-80 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
				<div className="p-6 text-center">
					<Heart className="w-12 h-12 text-ds-neutral-lightGray mx-auto mb-4" />
					<h3 className="font-semibold text-ds-primary-charcoal mb-2">
						Your wishlist is empty
					</h3>
					<p className="text-sm text-ds-neutral-mediumGray mb-4">
						Save your favorite colors and products for later
					</p>
					<Link
						href="/products"
						onClick={onClose}
						className="inline-flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
					>
						<span>Explore Products</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="absolute top-full right-0 mt-2 w-96 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
			{/* Header */}
			<div className="p-4 border-b border-ds-neutral-lightGray bg-ds-primary-cream/20">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-ds-primary-charcoal flex items-center space-x-2">
						<Heart className="w-5 h-5 text-red-500" />
						<span>Wishlist ({itemCount})</span>
					</h3>
					<button
						onClick={onClose}
						className="p-1 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200"
						aria-label="Close wishlist"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Wishlist Items */}
			<div className="max-h-80 overflow-y-auto">
				<div className="p-4 space-y-4">
					{wishlistItems.map((item) => (
						<div key={item.id} className="flex items-start space-x-3 group">
							<Link
								href={`/product/${item.id}`}
								onClick={onClose}
								className="flex-shrink-0 relative"
							>
								<Image
									src={item.image}
									alt={`${item.name} in ${item.color}`}
									width={64}
									height={64}
									className="object-cover rounded-lg border border-ds-neutral-lightGray hover:border-ds-primary-sage transition-colors duration-200"
									loading="lazy"
								/>
								{item.onSale && (
									<span className="absolute -top-1 -right-1 bg-red-500 text-ds-neutral-white text-xs font-bold px-1 py-0.5 rounded">
										Sale
									</span>
								)}
							</Link>

							<div className="flex-1 min-w-0">
								<Link
									href={`/product/${item.id}`}
									onClick={onClose}
									className="block"
								>
									<h4 className="font-medium text-ds-primary-charcoal text-sm line-clamp-2 hover:text-ds-primary-sage transition-colors duration-200">
										{item.name}
									</h4>
								</Link>

								<p className="text-xs text-ds-neutral-mediumGray mt-1">
									{item.brand} • {item.color}
								</p>

								{/* Rating */}
								<div className="flex items-center space-x-1 mt-1">
									<div className="flex items-center">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className={cn(
													"w-3 h-3",
													star <= item.rating
														? "text-yellow-400 fill-current"
														: "text-ds-neutral-lightGray"
												)}
											/>
										))}
									</div>
									<span className="text-xs text-ds-neutral-mediumGray">
										{item.rating}
									</span>
								</div>

								<div className="flex items-center justify-between mt-2">
									<div className="flex items-center space-x-2">
										<span className="font-medium text-ds-primary-charcoal text-sm">
											${item.price.toFixed(2)}
										</span>
										{item.originalPrice && (
											<span className="text-xs text-ds-neutral-mediumGray line-through">
												${item.originalPrice.toFixed(2)}
											</span>
										)}
									</div>

									<div className="flex items-center space-x-2">
										<button
											className={cn(
												"p-1.5 rounded text-xs font-medium transition-colors duration-200 min-w-[32px] min-h-[32px] flex items-center justify-center",
												item.inStock
													? "bg-ds-primary-sage text-ds-neutral-white hover:bg-ds-primary-sage/90"
													: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray cursor-not-allowed"
											)}
											disabled={!item.inStock}
											aria-label={`Add ${item.name} to cart`}
											title={item.inStock ? "Add to cart" : "Out of stock"}
										>
											<ShoppingCart className="w-3 h-3" />
										</button>

										<button
											className="p-1.5 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 min-w-[32px] min-h-[32px] flex items-center justify-center"
											aria-label={`Remove ${item.name} from wishlist`}
										>
											<X className="w-3 h-3" />
										</button>
									</div>
								</div>

								{!item.inStock && (
									<p className="text-xs text-red-600 mt-1">
										Out of stock - We&apos;ll notify you when available
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className="p-4 border-t border-ds-neutral-lightGray bg-ds-neutral-lightGray/10">
				<Link
					href="/wishlist"
					onClick={onClose}
					className="block w-full py-3 bg-ds-primary-sage text-ds-neutral-white text-center rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
				>
					View All Wishlist Items
				</Link>

				<p className="text-xs text-ds-neutral-mediumGray text-center mt-3">
					Items in your wishlist are saved for 90 days
				</p>
			</div>
		</div>
	);
};
