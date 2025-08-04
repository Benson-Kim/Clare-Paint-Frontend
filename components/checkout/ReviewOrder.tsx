"use client";

import React, { useState, useEffect } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import {
	ArrowLeft,
	CheckCircle,
	Lock,
	Tag,
	AlertCircle,
	Info,
	X,
} from "lucide-react";
import {
	OrderConfirmationData,
	PromoCode,
	ShippingOption,
} from "@/types/checkout";
import { mockProcessOrder } from "@/lib/api";
import { CartItem } from "@/types/product";
import { formatCurrency, validatePromoCode } from "@/utils/cartUtils";
import { mockProducts } from "@/data/mock-products";
import Link from "next/link";

interface ReviewOrderProps {
	onNext: () => void;
	onBack: () => void;
	cartItems: CartItem[];
	orderSummary: {
		subtotal: number;
		shipping: number;
		tax: number;
		discount: number;
		total: number;
		itemCount: number;
		estimatedDelivery: string;
	};
	promoCode: string;
	onPromoCodeChange: (code: string) => void;
	shippingOptions: ShippingOption[];
	promoCodes: PromoCode[];
}

export const ReviewOrder: React.FC<ReviewOrderProps> = ({
	onNext,
	onBack,
	cartItems,
	orderSummary,
	promoCode,
	onPromoCodeChange,
	shippingOptions,
	promoCodes,
}) => {
	const { formData, setOrderData } = useCheckoutStore();
	const { getTotalPrice } = useCartStore();
	const [isProcessing, setIsProcessing] = useState(false);
	const [orderError, setOrderError] = useState<string | null>(null);
	const [localPromoCode, setLocalPromoCode] = useState(promoCode);
	const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

	useEffect(() => {
		setLocalPromoCode(promoCode);
	}, [promoCode]);

	useEffect(() => {
		if (localPromoCode) {
			const promo = validatePromoCode(
				localPromoCode,
				getTotalPrice(),
				promoCodes
			);
			setAppliedPromo(promo);
		} else {
			setAppliedPromo(null);
		}
	}, [localPromoCode, promoCodes, getTotalPrice]);

	const handleApplyPromo = () => {
		onPromoCodeChange(localPromoCode);
	};

	const handleRemovePromo = () => {
		setLocalPromoCode("");
		onPromoCodeChange("");
	};

	const handleSubmitOrder = async () => {
		setIsProcessing(true);
		setOrderError(null);
		try {
			if (
				!formData.shippingAddress ||
				!formData.paymentMethod ||
				!formData.shippingOption
			) {
				throw new Error(
					"Missing essential checkout information. Please go back and complete all steps."
				);
			}

			const orderData = await mockProcessOrder(
				formData as Required<typeof formData>,
				cartItems,
				orderSummary.subtotal,
				orderSummary.total
			);
			setOrderData(orderData);
			onNext();
		} catch (err: any) {
			setOrderError(err.message || "Failed to place order. Please try again.");
			console.error("Order placement error:", err);
		} finally {
			setIsProcessing(false);
		}
	};

	const selectedShippingOption = shippingOptions.find(
		(opt) => opt.id === formData.shippingOption?.id
	);

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal">
				Review Your Order
			</h2>

			{/* Shipping Information */}
			<div className="bg-ds-primary-cream p-4 rounded-lg border border-ds-neutral-lightGray">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					Shipping Details
				</h3>
				{formData.shippingAddress ? (
					<div className="text-sm text-ds-neutral-darkSlate space-y-1">
						<p>
							{formData.shippingAddress.firstName}{" "}
							{formData.shippingAddress.lastName}
						</p>
						{formData.shippingAddress.company && (
							<p>{formData.shippingAddress.company}</p>
						)}
						<p>{formData.shippingAddress.address1}</p>
						{formData.shippingAddress.address2 && (
							<p>{formData.shippingAddress.address2}</p>
						)}
						<p>
							{formData.shippingAddress.city}, {formData.shippingAddress.state}{" "}
							{formData.shippingAddress.zipCode}
						</p>
						<p>{formData.shippingAddress.country}</p>
						{formData.shippingAddress.phone && (
							<p>Phone: {formData.shippingAddress.phone}</p>
						)}
						<p className="font-medium mt-2">
							Shipping Method: {selectedShippingOption?.name} (
							{selectedShippingOption?.estimatedDays})
						</p>
					</div>
				) : (
					<p className="text-sm text-red-500">
						Shipping address not provided. Please go back to step 1.
					</p>
				)}
			</div>

			{/* Payment Information */}
			<div className="bg-ds-primary-cream p-4 rounded-lg border border-ds-neutral-lightGray">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					Payment Details
				</h3>
				{formData.paymentMethod ? (
					<div className="text-sm text-ds-neutral-darkSlate space-y-1">
						<p>
							Method:{" "}
							{formData.paymentMethod.type === "credit"
								? "Credit Card"
								: "PayPal"}
						</p>
						{formData.paymentMethod.type === "credit" && (
							<>
								<p>Cardholder: {formData.paymentMethod.cardholderName}</p>
								<p>
									Card Number: **** **** ****{" "}
									{formData.paymentMethod.cardNumber?.slice(-4)}
								</p>
								<p>
									Expires: {formData.paymentMethod.expiryMonth}/
									{formData.paymentMethod.expiryYear}
								</p>
							</>
						)}
						<p className="font-medium mt-2">
							Billing Address:{" "}
							{formData.sameAsShipping ? "Same as Shipping" : "Different"}
						</p>
					</div>
				) : (
					<p className="text-sm text-red-500">
						Payment method not provided. Please go back to step 2.
					</p>
				)}
			</div>

			{/* Promo Code */}
			<div className="bg-ds-primary-cream p-4 rounded-lg border border-ds-neutral-lightGray">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-4">
					<Tag className="w-5 h-5 text-ds-primary-sage" />
					<span>Promo Code</span>
				</h3>
				{appliedPromo ? (
					<div className="flex items-center justify-between p-2 bg-ds-primary-sage/10 border border-ds-primary-sage/20 rounded-lg text-ds-primary-sage text-sm">
						<div className="flex items-center space-x-4">
							<CheckCircle className="w-4 h-4" />
							<span>
								{appliedPromo.code} applied ({appliedPromo.description})
							</span>
						</div>
						<button
							onClick={handleRemovePromo}
							className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
							aria-label="Remove promo code"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				) : (
					<div className="flex space-x-4">
						<input
							type="text"
							value={localPromoCode}
							onChange={(e) => setLocalPromoCode(e.target.value.toUpperCase())}
							placeholder="Enter promo code"
							className="flex-1 px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Promo code input"
						/>
						<button
							type="button"
							onClick={handleApplyPromo}
							disabled={!localPromoCode.trim()}
							className="px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200"
							aria-label="Apply promo code"
						>
							Apply
						</button>
					</div>
				)}
				<div className="mt-2 text-xs text-ds-neutral-mediumGray">
					Try: SAVE10, FREESHIP, or PAINT25
				</div>
			</div>

			{/* Cart Items */}
			<div className="bg-ds-primary-cream p-4 rounded-lg border border-ds-neutral-lightGray">
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					Items in Order
				</h3>
				<div className="space-y-4">
					{cartItems.length === 0 ? (
						<p className="text-sm text-red-500">
							No items in cart. Please add items to proceed.
						</p>
					) : (
						cartItems.map((item) => {
							const product = mockProducts.find((p) => p.id === item.productId);
							const color = product?.colors.find((c) => c.id === item.colorId);
							const finish = product?.finishes.find(
								(f) => f.id === item.finishId
							);
							return (
								<div
									key={`${item.productId}-${item.colorId}-${item.finishId}`}
									className="flex items-center space-x-4"
								>
									<img
										src={
											color?.image ||
											"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800"
										}
										alt={product?.name}
										className="w-16 h-16 object-cover rounded-md border border-ds-neutral-lightGray"
										loading="lazy"
									/>
									<div className="flex-1">
										<p className="font-medium text-ds-primary-charcoal text-sm">
											{product?.name}
										</p>
										<p className="text-xs text-ds-neutral-darkSlate">
											{color?.name} / {finish?.name}
										</p>
										<p className="text-xs text-ds-neutral-mediumGray">
											Qty: {item.quantity}
										</p>
									</div>
									<span className="font-semibold text-ds-primary-charcoal">
										{formatCurrency(item.price * item.quantity)}
									</span>
								</div>
							);
						})
					)}
				</div>
				<Link
					href="/cart"
					className="text-sm text-ds-primary-sage hover:underline mt-4 block text-right"
				>
					Edit Cart
				</Link>
			</div>

			{orderError && (
				<div
					className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
					role="alert"
				>
					<AlertCircle className="w-5 h-5" />
					<p className="text-sm">{orderError}</p>
				</div>
			)}

			<div className="flex justify-between mt-8">
				<button
					type="button"
					onClick={onBack}
					className="px-8 py-2 border border-ds-neutral-lightGray text-ds-primary-charcoal rounded-lg font-semibold hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 flex items-center justify-center space-x-4"
					aria-label="Back to payment information"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back</span>
				</button>
				<button
					type="button"
					onClick={handleSubmitOrder}
					className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
					disabled={
						isProcessing ||
						cartItems.length === 0 ||
						!formData.shippingAddress ||
						!formData.paymentMethod ||
						!formData.shippingOption
					}
					aria-label="Place order"
				>
					{isProcessing ? (
						<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
					) : (
						<Lock className="w-5 h-5" />
					)}
					<span>{isProcessing ? "Processing Order..." : "Place Order"}</span>
				</button>
			</div>
		</div>
	);
};
