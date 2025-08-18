"use client";

import React, { useState } from "react";
import { X, ShoppingCart, Plus, Minus, Check, Star } from "lucide-react";
import { Product, ProductColor, ProductFinish } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface QuickAddModalProps {
	product: Product;
	onClose: () => void;
	onAddToCart: (
		productId: string,
		colorId: string,
		finishId: string,
		quantity: number,
		price: number
	) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
	product,
	onClose,
	onAddToCart,
}) => {
	const [selectedColor, setSelectedColor] = useState<ProductColor>(
		product.colors[0]
	);
	const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(
		product.finishes[0]
	);
	const [quantity, setQuantity] = useState(1);
	const [isAdded, setIsAdded] = useState(false);

	const totalPrice = (product.basePrice + selectedFinish.price) * quantity;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleAddToCart = () => {
		onAddToCart(
			product.id,
			selectedColor.id,
			selectedFinish.id,
			quantity,
			product.basePrice + selectedFinish.price
		);
		setIsAdded(true);
		setTimeout(() => {
			onClose();
		}, 1500);
	};

	const increaseQuantity = () => {
		setQuantity((prev) => Math.min(prev + 1, 10));
	};

	const decreaseQuantity = () => {
		setQuantity((prev) => Math.max(prev - 1, 1));
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="quick-add-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center space-x-3">
						<ShoppingCart className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="quick-add-title"
							className="text-xl font-bold text-ds-primary-charcoal"
						>
							Quick Add to Cart
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
						aria-label="Close quick add modal"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Product Image */}
						<div className="space-y-4">
							<div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
								<Image
									src={selectedColor.image}
									alt={`${product.name} in ${selectedColor.name}`}
									width={400}
									height={400}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>

							{/* Color Preview */}
							<div className="bg-gray-50 p-4 rounded-lg">
								<h4 className="font-medium text-ds-primary-charcoal mb-2">
									Selected Color
								</h4>
								<div className="flex items-center space-x-3">
									<div
										className="w-8 h-8 rounded-full border-2 border-gray-200"
										style={{ backgroundColor: selectedColor.hex }}
									/>
									<div>
										<p className="font-medium text-ds-primary-charcoal">
											{selectedColor.name}
										</p>
										<p className="text-sm text-gray-600">{selectedColor.hex}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Product Details */}
						<div className="space-y-6">
							{/* Product Info */}
							<div>
								<div className="flex items-center space-x-2 mb-2">
									<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
										{product.brand}
									</span>
									<span className="text-xs text-gray-500">
										{product.category}
									</span>
								</div>
								<h3 className="text-xl font-bold text-ds-primary-charcoal mb-2">
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

							{/* Color Selection */}
							<div>
								<h4 className="font-medium text-ds-primary-charcoal mb-3">
									Choose Color
								</h4>
								<div className="grid grid-cols-4 gap-2">
									{product.colors.map((color) => (
										<button
											key={color.id}
											onClick={() => setSelectedColor(color)}
											disabled={!color.inStock}
											className={cn(
												"aspect-square rounded-lg border-2 transition-all duration-200 relative",
												selectedColor.id === color.id
													? "border-ds-primary-sage ring-2 ring-ds-primary-sage/20"
													: "border-gray-200 hover:border-gray-300",
												!color.inStock && "opacity-50 cursor-not-allowed"
											)}
											style={{ backgroundColor: color.hex }}
											title={color.name}
											aria-label={`Select ${color.name} color`}
										>
											{selectedColor.id === color.id && (
												<div className="absolute inset-0 flex items-center justify-center">
													<Check className="w-4 h-4 text-ds-neutral-white drop-shadow-lg" />
												</div>
											)}
											{!color.inStock && (
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="w-6 h-0.5 bg-red-500 rotate-45 rounded-full" />
												</div>
											)}
										</button>
									))}
								</div>
							</div>

							{/* Finish Selection */}
							<div>
								<h4 className="font-medium text-ds-primary-charcoal mb-3">
									Choose Finish
								</h4>
								<div className="space-y-2">
									{product.finishes.map((finish) => (
										<label
											key={finish.id}
											className={cn(
												"flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200",
												selectedFinish.id === finish.id
													? "border-ds-primary-sage bg-ds-primary-sage/5"
													: "border-gray-200 hover:border-gray-300"
											)}
										>
											<div className="flex items-center space-x-3">
												<input
													type="radio"
													name="finish"
													value={finish.id}
													checked={selectedFinish.id === finish.id}
													onChange={() => setSelectedFinish(finish)}
													className="w-4 h-4 text-ds-primary-sage border-gray-300 focus:ring-ds-primary-sage"
												/>
												<div>
													<span className="font-medium text-ds-primary-charcoal">
														{finish.name}
													</span>
													<p className="text-sm text-gray-600">
														{finish.description}
													</p>
												</div>
											</div>
											<span className="font-medium text-ds-primary-charcoal">
												{finish.price > 0 ? `+$${finish.price}` : "Base"}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Quantity Selection */}
							<div>
								<h4 className="font-medium text-ds-primary-charcoal mb-3">
									Quantity
								</h4>
								<div className="flex items-center space-x-4">
									<button
										onClick={decreaseQuantity}
										disabled={quantity <= 1}
										className={cn(
											"w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
											quantity <= 1
												? "border-gray-200 text-gray-400 cursor-not-allowed"
												: "border-gray-300 text-ds-primary-charcoal hover:border-ds-primary-sage hover:bg-ds-primary-sage/5"
										)}
										aria-label="Decrease quantity"
									>
										<Minus className="w-4 h-4" />
									</button>

									<span className="text-xl font-bold text-ds-primary-charcoal min-w-[3rem] text-center">
										{quantity}
									</span>

									<button
										onClick={increaseQuantity}
										disabled={quantity >= 10}
										className={cn(
											"w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
											quantity >= 10
												? "border-gray-200 text-gray-400 cursor-not-allowed"
												: "border-gray-300 text-ds-primary-charcoal hover:border-ds-primary-sage hover:bg-ds-primary-sage/5"
										)}
										aria-label="Increase quantity"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
								<p className="text-sm text-gray-600 mt-2">
									Coverage: ~{350 * quantity}-{400 * quantity} sq ft
								</p>
							</div>

							{/* Price Summary */}
							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between items-center">
									<span className="font-medium text-ds-primary-charcoal">
										Total:
									</span>
									<span className="text-2xl font-bold text-ds-primary-sage">
										${totalPrice.toFixed(2)}
									</span>
								</div>
								{quantity > 1 && (
									<p className="text-sm text-gray-600 text-right">
										${(product.basePrice + selectedFinish.price).toFixed(2)}{" "}
										each
									</p>
								)}
							</div>

							{/* Add to Cart Button */}
							<button
								onClick={handleAddToCart}
								disabled={!product.inStock || isAdded}
								className={cn(
									"w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2",
									isAdded
										? "bg-green-500 text-ds-neutral-white"
										: product.inStock
										? "bg-ds-primary-sage text-ds-neutral-white hover:bg-ds-primary-sage/90 hover:scale-[1.02] active:scale-[0.98]"
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
