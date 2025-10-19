"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
	ShoppingCart,
	ArrowLeft,
	Plus,
	Minus,
	X,
	Heart,
	Calculator,
	Truck,
	Shield,
	Tag,
	CheckCircle,
	Info,
	Package,
	Clock,
	MapPin,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartError, useCartStore } from "@/store/cart-store";
import { mockProducts } from "@/data/mock-products";
import { CartItem } from "@/types/product";
import Image from "next/image";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useToast } from "@/components/ui/ToastContainer";
import { formatCurrency } from "@/utils/cartUtils";
import { analytics, useInteractionTracking } from "@/lib/analytics";

// interface CartPageProps {}

interface ShippingOption {
	id: string;
	name: string;
	description: string;
	price: number;
	estimatedDays: string;
	icon: React.ReactNode;
}

interface PromoCode {
	code: string;
	discount: number;
	type: "percentage" | "fixed";
	description: string;
}

// const CartPage: React.FC<CartPageProps> = () => {
const CartPage: React.FC = () => {
	const {
		items,
		updateQuantity,
		removeItem,
		clearCart,
		getTotalItems,
		getTotalPrice,
	} = useCartStore();

	const toast = useToast();
	const { trackClick } = useInteractionTracking();

	const [promoCode, setPromoCode] = useState("");
	const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
	const [selectedShipping, setSelectedShipping] = useState<string>("standard");
	const [zipCode, setZipCode] = useState("");
	const [showCoverageCalc, setShowCoverageCalc] = useState(false);
	const [savedItems, setSavedItems] = useState<CartItem[]>([]);
	// const [loading, setLoading] = useState(false);

	// Mock promo codes
	const promoCodes: PromoCode[] = useMemo(
		() => [
			{
				code: "SAVE10",
				discount: 10,
				type: "percentage",
				description: "10% off your order",
			},
			{
				code: "FREESHIP",
				discount: 0,
				type: "fixed",
				description: "Free standard shipping",
			},
			{
				code: "PAINT25",
				discount: 25,
				type: "fixed",
				description: "$25 off orders over $200",
			},
		],
		[]
	);

	const shippingOptions: ShippingOption[] = useMemo(
		() => [
			{
				id: "standard",
				name: "Standard Shipping",
				description: "5-7 business days",
				price: 0,
				estimatedDays: "5-7 days",
				icon: <Package className="w-4 h-4" />,
			},
			{
				id: "expedited",
				name: "Expedited Shipping",
				description: "2-3 business days",
				price: 15.99,
				estimatedDays: "2-3 days",
				icon: <Clock className="w-4 h-4" />,
			},
			{
				id: "overnight",
				name: "Overnight Shipping",
				description: "Next business day",
				price: 29.99,
				estimatedDays: "1 day",
				icon: <Truck className="w-4 h-4" />,
			},
		],
		[]
	);

	useEffect(() => {
		analytics.track("cart_viewed", {
			item_count: getTotalItems(),
			cart_value: getTotalPrice(),
		});
	}, [getTotalItems, getTotalPrice]);

	const [cartItemCount, setCartItemCount] = useState(0);

	useEffect(() => {
		setCartItemCount(getTotalItems());
	}, [getTotalItems]);

	// Get product details for cart items
	const cartItemsWithDetails = useMemo(() => {
		return items
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
	}, [items]);

	// Group items by project (for now, simulate projects)
	const groupedItems = useMemo(() => {
		const groups = cartItemsWithDetails.reduce((acc, item) => {
			const projectName = item.product?.category || "General Project";
			if (!acc[projectName]) {
				acc[projectName] = [];
			}
			acc[projectName].push(item);
			return acc;
		}, {} as Record<string, typeof cartItemsWithDetails>);

		return Object.entries(groups);
	}, [cartItemsWithDetails]);

	// Calculate totals
	const subtotal = getTotalPrice();
	const selectedShippingOption = shippingOptions.find(
		(opt) => opt.id === selectedShipping
	);
	const shippingCost =
		appliedPromo?.code === "FREESHIP" ? 0 : selectedShippingOption?.price || 0;
	const promoDiscount = appliedPromo
		? appliedPromo.type === "percentage"
			? subtotal * (appliedPromo.discount / 100)
			: appliedPromo.discount
		: 0;
	const tax = (subtotal - promoDiscount) * 0.16; // 16% VAT
	const total = subtotal + shippingCost + tax - promoDiscount;

	// Calculate total coverage
	const totalCoverage = useMemo(() => {
		return cartItemsWithDetails.reduce((acc, item) => {
			const coverage = parseInt(
				item.product?.coverage?.match(/(\d+)/)?.[1] || "350"
			);
			return acc + coverage * item.quantity;
		}, 0);
	}, [cartItemsWithDetails]);

	const handleQuantityChange = useCallback(
		(
			productId: string,
			colorId: string,
			finishId: string,
			newQuantity: number
		) => {
			try {
				const oldItem = items.find(
					(i) =>
						i.productId === productId &&
						i.colorId === colorId &&
						i.finishId === finishId
				);

				trackClick("cart_quantity_change", {
					productId,
					oldQuantity: oldItem?.quantity,
					newQuantity,
				});

				if (newQuantity <= 0) {
					removeItem(productId, colorId, finishId);
					toast.success("Item removed from cart");
				} else {
					updateQuantity(productId, colorId, finishId, newQuantity);
					toast.success("Quantity updated");
				}
			} catch (error) {
				if (error instanceof CartError) {
					toast.error(error.message);
				} else {
					toast.error("Failed to update quantity");
				}
			}
		},
		[items, removeItem, updateQuantity, trackClick, toast]
	);

	const handleApplyPromo = useCallback(() => {
		const promo = promoCodes.find(
			(p) => p.code.toLowerCase() === promoCode.toLowerCase()
		);
		if (promo) {
			trackClick("promo_code_applied", {
				code: promo.code,
				dicount: promo.discount,
			});
			setAppliedPromo(promo);
			setPromoCode("");
			toast.success(`Promo code ${promo?.code} applied!`);
		} else {
			trackClick("promo_code_failed", { code: promoCode });
			toast.error("Invalid promo code");
		}
	}, [promoCode, promoCodes, trackClick, toast]);

	const handleSaveForLater = useCallback(
		(item: CartItem) => {
			trackClick("save_for_later", { productId: item.productId });
			setSavedItems([...savedItems, item]);
			removeItem(item.productId, item.colorId, item.finishId);
			toast.success("Item saved for later");
		},
		[savedItems, removeItem, trackClick, toast]
	);

	const handleMoveToCart = useCallback(
		(item: CartItem) => {
			try {
				trackClick("move_to_cart", { productId: item.productId });
				useCartStore.getState().addItem(item);
				setSavedItems(
					savedItems.filter(
						(saved) =>
							!(
								saved.productId === item.productId &&
								saved.colorId === item.colorId &&
								saved.finishId === item.finishId
							)
					)
				);
				toast.success("Item moved to cart");
			} catch (error) {
				if (error instanceof CartError) {
					toast.error(error.message);
				} else {
					toast.error("Failed to move item to cart");
				}
			}
		},
		[savedItems, trackClick, toast]
	);

	const handleClearCart = useCallback(() => {
		if (
			window.confirm(
				"Are you sure you want to remove all items from your cart?"
			)
		) {
			trackClick("cart_cleared", { itemCount: items.length });
			clearCart();
			toast.success("cart cleared");
		}
	}, [items.length, clearCart, trackClick, toast]);

	if (items.length === 0 && savedItems.length === 0) {
		return (
			<PageLayout>
				<div className="py-16">
					<div className="text-center">
						<ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
						<h1 className="text-3xl font-bold text-ds-primary-charcoal mb-4">
							Your Cart is Empty
						</h1>
						<p className="text-gray-600 mb-8 max-w-md mx-auto">
							Looks like you haven&apos;t added any paint to your cart yet.
							Browse our collection to find the perfect colors for your project.
						</p>
						<div className="space-y-4">
							<Link
								href="/products"
								className="inline-flex items-center space-x-2 bg-ds-primary-sage text-white px-8 py-3 rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
							>
								<span>Shop Interior Paints</span>
							</Link>
							<div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
								<div className="flex items-center space-x-2">
									<Shield className="w-4 h-4" />
									<span>Secure Checkout</span>
								</div>
								<div className="flex items-center space-x-2">
									<Truck className="w-4 h-4" />
									<span>Free Shipping $100+</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout className="bg-gray-50">
			<ErrorBoundary isolate>
				<div className="py-8">
					{/* Cart Header */}
					<div className="bg-white border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 mb-8">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<Link
									href="/products"
									className="flex items-center space-x-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200"
								>
									<ArrowLeft className="w-4 h-4" />
									<span>Continue Shopping</span>
								</Link>
								<div className="h-6 w-px bg-gray-300" />
								<h1 className="text-2xl font-bold text-ds-primary-charcoal">
									Shopping Cart
								</h1>
								<span className="bg-ds-primary-sage text-white px-3 py-1 rounded-full text-sm font-medium">
									{cartItemCount} items
								</span>
							</div>

							{items.length > 0 && (
								<button
									onClick={handleClearCart}
									className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
								>
									Clear Cart
								</button>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 space-y-6">
							{/* Coverage Calculator */}
							<div className="bg-ds-primary-sage/5 border border-ds-primary-sage/20 rounded-lg p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<Calculator className="w-5 h-5 text-ds-primary-sage" />
										<div>
											<h3 className="font-semibold text-ds-primary-charcoal">
												Total Coverage
											</h3>
											<p className="text-sm text-gray-600">
												Approximately {totalCoverage.toLocaleString()} sq ft
											</p>
										</div>
									</div>
									<button
										onClick={() => setShowCoverageCalc(!showCoverageCalc)}
										className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium"
									>
										Calculate Rooms
									</button>
								</div>
							</div>

							{/* Cart Items by Project */}
							{groupedItems.map(([projectName, projectItems]) => (
								<div
									key={projectName}
									className="bg-white rounded-lg shadow-sm border border-gray-200"
								>
									<div className="p-4 border-b border-gray-200">
										<h3 className="font-semibold text-ds-primary-charcoal flex items-center space-x-2">
											<Package className="w-4 h-4 text-ds-primary-sage" />
											<span>{projectName}</span>
											<span className="text-sm text-gray-500">
												({projectItems.length} items)
											</span>
										</h3>
									</div>

									<div className="divide-y divide-gray-200">
										{projectItems.map((item) => (
											<div
												key={`${item.productId}-${item.colorId}-${item.finishId}`}
												className="p-6"
											>
												<div className="flex items-start space-x-4">
													{/* Product Image */}
													<div className="flex-shrink-0">
														<Image
															src={item.color?.image || "/placeholder.png"}
															alt={`${item.product?.name} in ${item.color?.name}`}
															width={80}
															height={80}
															className="object-cover rounded-lg border border-gray-200"
															loading="lazy"
														/>
													</div>

													{/* Product Details */}
													<div className="flex-1 min-w-0">
														<div className="flex items-start justify-between">
															<div>
																<h4 className="font-semibold text-ds-primary-charcoal mb-1">
																	{item.product?.name}
																</h4>
																<p className="text-sm text-gray-600 mb-2">
																	{item.product?.brand}
																</p>

																<div className="flex items-center space-x-4 text-sm">
																	<div className="flex items-center space-x-2">
																		<div
																			className="w-4 h-4 rounded-full border border-gray-300"
																			style={{
																				backgroundColor: item.color?.hex,
																			}}
																		/>
																		<span className="text-gray-700">
																			{item.color?.name}
																		</span>
																	</div>
																	<span className="text-gray-500">•</span>
																	<span className="text-gray-700">
																		{item.finish?.name}
																	</span>
																</div>

																<div className="mt-2 text-sm text-gray-600">
																	Coverage: ~
																	{parseInt(
																		item.product?.coverage?.match(
																			/(\d+)/
																		)?.[1] || "350"
																	) * item.quantity}{" "}
																	sq ft
																</div>
															</div>

															<div className="text-right">
																<p className="text-lg font-bold text-ds-primary-charcoal">
																	{formatCurrency(item.totalPrice || 0)}
																</p>
																<p className="text-sm text-gray-500">
																	{formatCurrency(item.price)} each
																</p>
															</div>
														</div>

														{/* Quantity Controls */}
														<div className="flex items-center justify-between mt-4">
															<div className="flex items-center space-x-3">
																<div className="flex items-center border border-gray-300 rounded-lg">
																	<button
																		onClick={() =>
																			handleQuantityChange(
																				item.productId,
																				item.colorId,
																				item.finishId,
																				item.quantity - 1
																			)
																		}
																		className="p-2 hover:bg-gray-50 transition-colors duration-200"
																		aria-label="Decrease quantity"
																	>
																		<Minus className="w-4 h-4" />
																	</button>
																	<span className="px-4 py-2 font-medium text-ds-primary-charcoal min-w-[3rem] text-center">
																		{item.quantity}
																	</span>
																	<button
																		onClick={() =>
																			handleQuantityChange(
																				item.productId,
																				item.colorId,
																				item.finishId,
																				item.quantity + 1
																			)
																		}
																		className="p-2 hover:bg-gray-50 transition-colors duration-200"
																		aria-label="Increase quantity"
																	>
																		<Plus className="w-4 h-4" />
																	</button>
																</div>

																<span className="text-sm text-gray-500">
																	{item.quantity} gallon
																	{item.quantity !== 1 ? "s" : ""}
																</span>
															</div>

															<div className="flex items-center space-x-3">
																<button
																	onClick={() => handleSaveForLater(item)}
																	className="flex items-center space-x-1 text-sm text-gray-600 hover:text-ds-primary-sage transition-colors duration-200"
																>
																	<Heart className="w-4 h-4" />
																	<span>Save for Later</span>
																</button>
																<button
																	onClick={() =>
																		removeItem(
																			item.productId,
																			item.colorId,
																			item.finishId
																		)
																	}
																	className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
																>
																	<X className="w-4 h-4" />
																	<span>Remove</span>
																</button>
															</div>
														</div>

														{/* Color Substitution Suggestions */}
														{item.product && item.product.colors.length > 1 && (
															<div className="mt-4 p-3 bg-gray-50 rounded-lg">
																<p className="text-sm font-medium text-ds-primary-charcoal mb-2">
																	Also available in:
																</p>
																<div className="flex space-x-2">
																	{item.product.colors
																		.filter(
																			(color) => color.id !== item.colorId
																		)
																		.slice(0, 4)
																		.map((color) => (
																			<button
																				key={color.id}
																				className="group relative"
																				title={color.name}
																			>
																				<div
																					className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-ds-primary-sage transition-colors duration-200"
																					style={{ backgroundColor: color.hex }}
																				/>
																			</button>
																		))}
																</div>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))}

							{/* Saved for Later */}
							{savedItems.length > 0 && (
								<div className="bg-white rounded-lg shadow-sm border border-gray-200">
									<div className="p-4 border-b border-gray-200">
										<h3 className="font-semibold text-ds-primary-charcoal flex items-center space-x-2">
											<Heart className="w-4 h-4 text-ds-primary-sage" />
											<span>Saved for Later ({savedItems.length})</span>
										</h3>
									</div>

									<div className="p-4 space-y-4">
										{savedItems.map((item) => {
											const product = mockProducts.find(
												(p) => p.id === item.productId
											);
											const color = product?.colors.find(
												(c) => c.id === item.colorId
											);

											return (
												<div
													key={`saved-${item.productId}-${item.colorId}-${item.finishId}`}
													className="flex items-center space-x-4"
												>
													<Image
														src={color?.image || "/placeholder.png"}
														alt={product?.name || "Product Image"}
														width={48}
														height={48}
														className="object-cover rounded-lg border border-gray-200"
														loading="lazy"
													/>

													<div className="flex-1">
														<h4 className="font-medium text-ds-primary-charcoal">
															{product?.name}
														</h4>
														<p className="text-sm text-gray-600">
															{color?.name}
														</p>
													</div>
													<div className="flex items-center space-x-2">
														<button
															onClick={() => handleMoveToCart(item)}
															className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
														>
															Move to Cart
														</button>
														<button
															onClick={() =>
																setSavedItems(
																	savedItems.filter(
																		(saved) =>
																			!(
																				saved.productId === item.productId &&
																				saved.colorId === item.colorId &&
																				saved.finishId === item.finishId
																			)
																	)
																)
															}
															className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
														>
															Remove
														</button>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>

						{/* Order Summary */}
						<div className="space-y-6">
							{/* Shipping Calculator */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
									<MapPin className="w-4 h-4 text-ds-primary-sage" />
									<span>Shipping</span>
								</h3>

								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-ds-primary-charcoal mb-2">
											ZIP Code
										</label>
										<input
											type="text"
											value={zipCode}
											onChange={(e) => setZipCode(e.target.value)}
											placeholder="Enter ZIP code"
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										/>
									</div>

									<div className="space-y-3">
										{shippingOptions.map((option) => (
											<label
												key={option.id}
												className="flex items-center space-x-3 cursor-pointer"
											>
												<input
													type="radio"
													name="shipping"
													value={option.id}
													checked={selectedShipping === option.id}
													onChange={(e) => setSelectedShipping(e.target.value)}
													className="w-4 h-4 text-ds-primary-sage border-gray-300 focus:ring-ds-primary-sage"
												/>
												<div className="flex-1 flex items-center justify-between">
													<div className="flex items-center space-x-2">
														{option.icon}
														<div>
															<p className="font-medium text-ds-primary-charcoal">
																{option.name}
															</p>
															<p className="text-sm text-gray-600">
																{option.description}
															</p>
														</div>
													</div>
													<span className="font-medium text-ds-primary-charcoal">
														{option.price === 0
															? "Free"
															: `${formatCurrency(option.price)}`}
													</span>
												</div>
											</label>
										))}
									</div>
								</div>
							</div>

							{/* Promo Code */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
									<Tag className="w-4 h-4 text-ds-primary-sage" />
									<span>Promo Code</span>
								</h3>

								{appliedPromo ? (
									<div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
										<div className="flex items-center space-x-2">
											<CheckCircle className="w-4 h-4 text-green-600" />
											<span className="text-sm font-medium text-green-800">
												{appliedPromo.code} applied
											</span>
										</div>
										<button
											onClick={() => setAppliedPromo(null)}
											className="text-green-600 hover:text-green-800 transition-colors duration-200"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								) : (
									<div className="flex space-x-2">
										<input
											type="text"
											value={promoCode}
											onChange={(e) =>
												setPromoCode(e.target.value.toUpperCase())
											}
											placeholder="Enter promo code"
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										/>
										<button
											onClick={handleApplyPromo}
											disabled={!promoCode.trim()}
											className="px-4 py-2 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
										>
											Apply
										</button>
									</div>
								)}

								<div className="mt-3 text-xs text-gray-500">
									Try: SAVE10, FREESHIP, or PAINT25
								</div>
							</div>

							{/* Order Summary */}
							<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-4">
									Order Summary
								</h3>

								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">
											Subtotal ({cartItemCount} items)
										</span>
										<span className="font-medium text-ds-primary-charcoal">
											{formatCurrency(subtotal)}
										</span>
									</div>

									<div className="flex justify-between">
										<span className="text-gray-600">Shipping</span>
										<span className="font-medium text-ds-primary-charcoal">
											{shippingCost === 0
												? "Free"
												: `${formatCurrency(shippingCost)}`}
										</span>
									</div>

									{appliedPromo && (
										<div className="flex justify-between text-green-600">
											<span>Discount ({appliedPromo.code})</span>
											<span>-{formatCurrency(promoDiscount)}</span>
										</div>
									)}

									<div className="flex justify-between">
										<span className="text-gray-600">Tax</span>
										<span className="font-medium text-ds-primary-charcoal">
											{formatCurrency(tax)}
										</span>
									</div>

									<div className="border-t border-gray-200 pt-3">
										<div className="flex justify-between">
											<span className="text-lg font-semibold text-ds-primary-charcoal">
												Total
											</span>
											<span className="text-lg font-bold text-ds-primary-charcoal">
												{formatCurrency(total)}
											</span>
										</div>
									</div>
								</div>

								{/* Checkout Button */}
								<Link
									href="/shopping/checkout"
									className="w-full mt-6 py-4 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
									aria-label="Proceed to secure checkout"
								>
									<Shield className="w-5 h-5" />
									<span>Secure Checkout</span>
								</Link>

								{/* Security Badges */}
								<div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
									<div className="flex items-center space-x-1">
										<Shield className="w-3 h-3" />
										<span>SSL Secure</span>
									</div>
									<div className="flex items-center space-x-1">
										<CheckCircle className="w-3 h-3" />
										<span>Money Back Guarantee</span>
									</div>
								</div>

								{/* Estimated Delivery */}
								<div className="mt-4 p-3 bg-ds-primary-sage/5 rounded-lg">
									<div className="flex items-center space-x-2 text-sm">
										<Truck className="w-4 h-4 text-ds-primary-sage" />
										<span className="text-ds-primary-charcoal">
											Estimated delivery:{" "}
											{selectedShippingOption?.estimatedDays}
										</span>
									</div>
								</div>
							</div>

							{/* Help Section */}
							<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
								<h3 className="font-semibold text-ds-primary-charcoal mb-3 flex items-center space-x-2">
									<Info className="w-4 h-4 text-ds-primary-sage" />
									<span>Need Help?</span>
								</h3>
								<div className="space-y-2 text-sm text-gray-700">
									<p>• Free color consultation available</p>
									<p>• Paint calculator for accurate estimates</p>
									<p>• 30-day return policy</p>
									<p>• Expert application tips included</p>
								</div>
								<button className="mt-3 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium">
									Contact Support
								</button>
							</div>
						</div>
					</div>
				</div>
			</ErrorBoundary>
		</PageLayout>
	);
};

export default CartPage;
