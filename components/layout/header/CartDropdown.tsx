"use client";

import React from "react";
import Link from "next/link";
import {
	ShoppingCart,
	Plus,
	Minus,
	X,
	ArrowRight,
	Truck,
	Shield,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { mockProducts } from "@/data/mock-products";
import { formatCurrency } from "@/utils/cartUtils";
import Image from "next/image";

interface CartDropdownProps {
	onClose: () => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
	const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } =
		useCartStore();

	const cartItemsWithDetails = items
		.map((item) => {
			const product = mockProducts.find((p) => p.id === item.productId);
			const color = product?.colors.find((c) => c.id === item.colorId);
			const finish = product?.finishes.find((f) => f.id === item.finishId);

			return {
				...item,
				product,
				color,
				finish,
				totalPrice: item.price * item.quantity,
			};
		})
		.filter((item) => item.product && item.color && item.finish);

	if (cartItemsWithDetails.length === 0) {
		return (
			<div className="absolute top-full right-0 mt-2 w-80 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
				<div className="p-6 text-center">
					<ShoppingCart className="w-12 h-12 text-ds-neutral-lightGray mx-auto mb-4" />
					<h3 className="font-semibold text-ds-primary-charcoal mb-2">
						Your cart is empty
					</h3>
					<p className="text-sm text-ds-neutral-mediumGray mb-4">
						Discover our premium paint collection
					</p>
					<Link
						href="/products"
						onClick={onClose}
						className="inline-flex items-center space-x-2 px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
					>
						<span>Shop Now</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		);
	}

	const subtotal = getTotalPrice();
	const freeShippingThreshold = 100;
	const remainingForFreeShipping = Math.max(
		0,
		freeShippingThreshold - subtotal
	);

	return (
		<div className="absolute top-full right-0 mt-2 w-96 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-xl z-50 overflow-hidden">
			{/* Header */}
			<div className="p-4 border-b border-ds-neutral-lightGray bg-ds-primary-cream/20">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-ds-primary-charcoal flex items-center space-x-2">
						<ShoppingCart className="w-5 h-5 text-ds-primary-sage" />
						<span>Shopping Cart ({getTotalItems()})</span>
					</h3>
					<button
						onClick={onClose}
						className="p-1 text-ds-neutral-mediumGray hover:text-ds-primary-charcoal transition-colors duration-200"
						aria-label="Close cart"
					>
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* Free Shipping Progress */}
				{remainingForFreeShipping > 0 && (
					<div className="mt-3">
						<div className="flex items-center justify-between text-sm mb-2">
							<span className="text-ds-neutral-mediumGray">
								Free shipping at $100
							</span>
							<span className="text-ds-primary-sage font-medium">
								{formatCurrency(remainingForFreeShipping)} to go
							</span>
						</div>
						<div className="w-full bg-ds-neutral-lightGray rounded-full h-2">
							<div
								className="bg-ds-primary-sage h-2 rounded-full transition-all duration-300"
								style={{
									width: `${Math.min(
										100,
										(subtotal / freeShippingThreshold) * 100
									)}%`,
								}}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Cart Items */}
			<div className="max-h-80 overflow-y-auto">
				<div className="p-4 space-y-4">
					{cartItemsWithDetails.map((item) => (
						<div
							key={`${item.productId}-${item.colorId}-${item.finishId}`}
							className="flex items-start space-x-3 group"
						>
							<Link
								href={`/product/${item.productId}`}
								onClick={onClose}
								className="flex-shrink-0"
							>
								<Image
									src={item.color?.image || "/placeholder.png"}
									alt={`${item.product?.name} in ${item.color?.name}`}
									width={64}
									height={64}
									className="object-cover rounded-lg border border-ds-neutral-lightGray hover:border-ds-primary-sage transition-colors duration-200"
									loading="lazy"
								/>
							</Link>

							<div className="flex-1 min-w-0">
								<Link
									href={`/product/${item.productId}`}
									onClick={onClose}
									className="block"
								>
									<h4 className="font-medium text-ds-primary-charcoal text-sm line-clamp-2 hover:text-ds-primary-sage transition-colors duration-200">
										{item.product?.name}
									</h4>
								</Link>

								<div className="flex items-center space-x-2 mt-1">
									<div
										className="w-3 h-3 rounded-full border border-ds-neutral-lightGray"
										style={{ backgroundColor: item.color?.hex }}
									/>
									<span className="text-xs text-ds-neutral-mediumGray">
										{item.color?.name} • {item.finish?.name}
									</span>
								</div>

								{/* Quantity Controls */}
								<div className="flex items-center justify-between mt-2">
									<div className="flex items-center space-x-2">
										<button
											onClick={() =>
												updateQuantity(
													item.productId,
													item.colorId,
													item.finishId,
													item.quantity - 1
												)
											}
											className="p-1 rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 min-w-[24px] min-h-[24px] flex items-center justify-center"
											aria-label="Decrease quantity"
										>
											<Minus className="w-3 h-3" />
										</button>
										<span className="text-sm font-medium text-ds-primary-charcoal min-w-[1.5rem] text-center">
											{item.quantity}
										</span>
										<button
											onClick={() =>
												updateQuantity(
													item.productId,
													item.colorId,
													item.finishId,
													item.quantity + 1
												)
											}
											className="p-1 rounded hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 min-w-[24px] min-h-[24px] flex items-center justify-center"
											aria-label="Increase quantity"
										>
											<Plus className="w-3 h-3" />
										</button>
									</div>

									<div className="flex items-center space-x-2">
										<span className="font-medium text-ds-primary-charcoal text-sm">
											{formatCurrency(item.totalPrice)}
										</span>
										<button
											onClick={() =>
												removeItem(item.productId, item.colorId, item.finishId)
											}
											className="p-1 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 min-w-[24px] min-h-[24px] flex items-center justify-center"
											aria-label="Remove item"
										>
											<X className="w-3 h-3" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className="p-4 border-t border-ds-neutral-lightGray bg-ds-neutral-lightGray/10">
				<div className="flex items-center justify-between mb-4">
					<span className="font-semibold text-ds-primary-charcoal">
						Subtotal:
					</span>
					<span className="font-bold text-ds-primary-charcoal text-lg">
						{formatCurrency(subtotal)}
					</span>
				</div>

				<div className="space-y-2">
					<Link
						href="/shopping/cart"
						onClick={onClose}
						className="block w-full py-3 bg-ds-primary-sage text-ds-neutral-white text-center rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
					>
						View Cart
					</Link>

					<Link
						href="/shopping/checkout"
						onClick={onClose}
						className="w-full py-3 border border-ds-primary-sage text-ds-primary-sage text-center rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
					>
						<Shield className="w-4 h-4" />
						<span>Secure Checkout</span>
					</Link>
				</div>

				{/* Trust Signals */}
				<div className="mt-4 flex items-center justify-center space-x-4 text-xs text-ds-neutral-mediumGray">
					<div className="flex items-center space-x-1">
						<Shield className="w-3 h-3" />
						<span>SSL Secure</span>
					</div>
					<div className="flex items-center space-x-1">
						<Truck className="w-3 h-3" />
						<span>Free shipping $100+</span>
					</div>
				</div>
			</div>
		</div>
	);
};
