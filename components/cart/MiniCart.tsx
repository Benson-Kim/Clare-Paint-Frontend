"use client";

import React from "react";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { mockProducts } from "@/data/mock-products";
import Image from "next/image";
import { formatCurrency } from "@/utils/cartUtils";

interface MiniCartProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
	const { removeItem } = useCartStore();
	const { items, totalQuantity, uniqueItems, totalPrice, isEmpty } =
		useCartSummary();

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

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

			{/* Mini Cart */}
			<div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-ds-primary-charcoal flex items-center space-x-2">
						<ShoppingCart className="w-5 h-5" />
						<span>
							Cart ({uniqueItems} {uniqueItems === 1 ? "item" : "items"})
						</span>
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
						aria-label="Close cart"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto p-4">
					{isEmpty ? (
						<div className="text-center py-8">
							<ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
							<p className="text-gray-500 mb-4">Your cart is empty</p>
							<Link
								href="/products"
								onClick={onClose}
								className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 font-medium"
							>
								Start Shopping
							</Link>
						</div>
					) : (
						<>
							<div className="mb-4 text-sm text-gray-600">
								{totalQuantity} {totalQuantity === 1 ? "unit" : "units"} total
							</div>
							<div className="space-y-4">
								{cartItemsWithDetails.map((item) => (
									<div
										key={`${item.productId}-${item.colorId}-${item.finishId}`}
										className="flex items-start space-x-3"
									>
										<Image
											src={item.color?.image || "/placeholder.png"}
											alt={`${item.product?.name ?? "Product"} in ${
												item.color?.name ?? "Color"
											}`}
											width={64}
											height={64}
											className="object-cover rounded-lg border border-gray-200"
											loading="lazy"
										/>
										<div className="flex-1 min-w-0">
											<h4 className="font-medium text-ds-primary-charcoal text-sm line-clamp-2">
												{item.product?.name}
											</h4>
											<div className="flex items-center space-x-2 mt-1">
												<div
													className="w-3 h-3 rounded-full border border-gray-300"
													style={{ backgroundColor: item.color?.hex }}
												/>
												<span className="text-xs text-gray-600">
													{item.color?.name}
												</span>
											</div>
											<div className="flex items-center justify-between mt-2">
												<span className="text-xs text-gray-600">
													Qty: {item.quantity}
												</span>
												<span className="font-medium text-ds-primary-charcoal text-sm">
													{formatCurrency(item.totalPrice) || 0}
												</span>
											</div>
										</div>
										<button
											onClick={() =>
												removeItem(item.productId, item.colorId, item.finishId)
											}
											className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
											aria-label="Remove item"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
						</>
					)}
				</div>

				{/* Footer */}
				{!isEmpty && (
					<div className="border-t border-gray-200 p-4 space-y-4">
						<div className="flex items-center justify-between">
							<span className="font-semibold text-ds-primary-charcoal">
								Subtotal:
							</span>
							<span className="font-bold text-ds-primary-charcoal">
								{formatCurrency(totalPrice || 0)}
							</span>
						</div>

						<div className="space-y-2">
							<Link
								href="/cart"
								onClick={onClose}
								className="w-full py-3 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
							>
								<span>View Cart</span>
								<ArrowRight className="w-4 h-4" />
							</Link>

							<button
								onClick={onClose}
								className="w-full py-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 font-medium"
							>
								Continue Shopping
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
