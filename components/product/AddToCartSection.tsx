"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Product, ProductColor, ProductFinish } from "@/types/product";
import { QuantitySelector } from "./QuantitySelector";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/cartUtils";

interface AddToCartSectionProps {
	product: Product;
	selectedColor: ProductColor;
	selectedFinish: ProductFinish;
}

export const AddToCartSection: React.FC<AddToCartSectionProps> = ({
	product,
	selectedColor,
	selectedFinish,
}) => {
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const addItem = useCartStore((state) => state.addItem);

	const totalPrice = (product.basePrice + selectedFinish.price) * quantity;
	const canAddToCart = selectedColor.inStock && product.inStock;

	const handleAddToCart = () => {
		if (!canAddToCart) return;

		addItem({
			productId: product.id,
			colorId: selectedColor.id,
			finishId: selectedFinish.id,
			quantity,
			price: product.basePrice + selectedFinish.price,
		});

		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 2000);
	};

	const handleWishlist = () => {
		setIsWishlisted(!isWishlisted);
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: product.name,
					text: product.description,
					url: window.location.href,
				});
			} catch (error) {
				console.log("Sharing cancelled");
			}
		} else {
			// Fallback to clipboard
			navigator.clipboard.writeText(window.location.href);
		}
	};

	return (
		<div className="space-y-6">
			{/* Price Display */}
			<div className="border-b border-gray-200 pb-6">
				<div className="flex items-baseline space-x-2 mb-2">
					<span className="text-3xl font-bold text-ds-primary-charcoal">
						{formatCurrency(totalPrice)}
					</span>
					{quantity > 1 && (
						<span className="text-lg text-gray-500">
							{formatCurrency(product.basePrice + selectedFinish.price)}
						</span>
					)}
				</div>

				{selectedFinish.price > 0 && (
					<p className="text-sm text-gray-600">
						Base price: {formatCurrency(product.basePrice)} +
						{formatCurrency(selectedFinish.price)} {selectedFinish.name} finish
					</p>
				)}

				<div className="flex items-center space-x-2 mt-2">
					<div
						className={cn(
							"w-3 h-3 rounded-full",
							canAddToCart ? "bg-green-500" : "bg-red-500"
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium",
							canAddToCart ? "text-green-600" : "text-red-600"
						)}
					>
						{canAddToCart ? "In Stock" : "Out of Stock"}
					</span>
				</div>
			</div>

			{/* Quantity Selector */}
			<QuantitySelector
				quantity={quantity}
				onQuantityChange={setQuantity}
				disabled={!canAddToCart}
			/>

			{/* Action Buttons */}
			<div className="space-y-3">
				<button
					onClick={handleAddToCart}
					disabled={!canAddToCart}
					className={cn(
						"w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2",
						canAddToCart
							? isAdded
								? "bg-green-500 text-white"
								: "bg-ds-primary-sage text-white hover:bg-ds-primary-sage/90 hover:scale-[1.02] active:scale-[0.98]"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					)}
					aria-label="Add product to cart"
				>
					{isAdded ? (
						<>
							<Check className="w-5 h-5" />
							<span>Added to Cart!</span>
						</>
					) : (
						<>
							<ShoppingCart className="w-5 h-5" />
							<span>Add to Cart</span>
						</>
					)}
				</button>

				<div className="flex space-x-3">
					<button
						onClick={handleWishlist}
						className={cn(
							"flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all duration-200 flex items-center justify-center space-x-2",
							isWishlisted
								? "border-red-500 text-red-500 bg-red-50"
								: "border-gray-300 text-gray-700 hover:border-ds-primary-sage hover:text-ds-primary-sage"
						)}
						aria-label="Add to wishlist"
					>
						<Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
						<span>Wishlist</span>
					</button>

					<button
						onClick={handleShare}
						className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:border-ds-primary-sage hover:text-ds-primary-sage transition-all duration-200 flex items-center justify-center space-x-2"
						aria-label="Share product"
					>
						<Share2 className="w-4 h-4" />
						<span>Share</span>
					</button>
				</div>
			</div>

			{/* Shipping Info */}
			<div className="bg-ds-primary-cream/30 p-4 rounded-lg">
				<h4 className="font-semibold text-ds-primary-charcoal mb-2">
					Shipping Information
				</h4>
				<ul className="space-y-1 text-sm text-gray-600">
					<li>• Free shipping on orders over $100</li>
					<li>• Standard delivery: 3-5 business days</li>
					<li>• Express delivery: 1-2 business days (+$15)</li>
					<li>• Color matching guarantee</li>
				</ul>
			</div>
		</div>
	);
};
