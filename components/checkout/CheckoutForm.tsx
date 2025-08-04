"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { cn } from "@/lib/utils";
import { ShoppingCart, Truck, CreditCard, CheckCircle } from "lucide-react";
import { ShippingInformation } from "./ShippingInformation";
import { PaymentInformation } from "./PaymentInformation";
import { ReviewOrder } from "./ReviewOrder";
import { OrderConfirmation } from "./OrderConfirmation";
import {
	calculateDiscount,
	calculateShipping,
	calculateSubtotal,
	calculateTax,
	calculateTotal,
	formatCurrency,
	validatePromoCode,
} from "@/utils/cartUtils";
import { mockFetchPromoCodes, mockFetchShippingOptions } from "@/lib/api";
import { PromoCode, ShippingOption } from "@/types/checkout";
import { useRouter } from "next/navigation";

export const CheckoutForm: React.FC = () => {
	const router = useRouter();
	const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
	const {
		formData,
		currentStep,
		nextStep,
		prevStep,
		goToStep,
		clearCheckoutData,
		setShippingOption,
		setPromoCode,
	} = useCheckoutStore();

	const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
	const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
	const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
	const [loadingOptions, setLoadingOptions] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (items.length === 0 && currentStep < 4) {
			router.push("/cart");
		}
	}, [items, router, currentStep]);

	useEffect(() => {
		const fetchOptions = async () => {
			setLoadingOptions(true);
			try {
				const fetchedShippingOptions = await mockFetchShippingOptions();
				setShippingOptions(fetchedShippingOptions);
				if (!formData.shippingOption && fetchedShippingOptions.length > 0) {
					setShippingOption(fetchedShippingOptions[0]);
				}

				const fetchedPromoCodes = await mockFetchPromoCodes();
				setPromoCodes(fetchedPromoCodes);
			} catch (err) {
				setError("Failed to load shipping options or promo codes.");
				console.error(err);
			} finally {
				setLoadingOptions(false);
			}
		};
		fetchOptions();
	}, [formData.shippingOption, setShippingOption]);

	useEffect(() => {
		if (formData.promoCode) {
			const promo = validatePromoCode(formData.promoCode, subtotal, promoCodes);
			setAppliedPromo(promo);
		} else {
			setAppliedPromo(null);
		}
	}, [formData.promoCode, promoCodes]);

	const subtotal = getTotalPrice();
	const promoDiscount = calculateDiscount(subtotal, appliedPromo);
	const shippingCost = formData.shippingOption
		? calculateShipping(subtotal, formData.shippingOption, appliedPromo)
		: 0;
	const tax = calculateTax(subtotal - promoDiscount);
	const total = calculateTotal(subtotal, shippingCost, tax, promoDiscount);

	const steps = [
		{ id: 1, name: "Shipping", icon: Truck },
		{ id: 2, name: "Payment", icon: CreditCard },
		{ id: 3, name: "Review", icon: ShoppingCart },
		{ id: 4, name: "Confirmation", icon: CheckCircle },
	];

	const handlePromoCodeChange = (code: string) => {
		setPromoCode(code);
	};

	if (loadingOptions) {
		return (
			<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-ds-primary-sage border-t-transparent rounded-full animate-spin mx-auto mb-4" />
					<p className="text-lg text-ds-neutral-mediumGray">
						Loading checkout...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-ds-neutral-white flex items-center justify-center">
				<div className="text-center p-8 rounded-lg shadow-lg bg-red-50 border border-red-200">
					<h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
					<p className="text-red-600 mb-6">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<h1 className="text-4xl font-bold text-ds-primary-charcoal mb-8 text-center">
					Checkout
				</h1>

				{/* Progress Stepper */}
				<div className="flex justify-between items-center mb-20 max-w-3xl mx-auto">
					{steps.map((step, index) => (
						<div key={step.id} className="flex flex-col items-center relative">
							<div
								className={cn(
									"w-10 h-10 rounded-full flex items-center justify-center text-ds-neutral-white font-bold text-lg transition-all duration-300",
									currentStep >= step.id
										? "bg-ds-primary-sage"
										: "bg-ds-neutral-lightGray"
								)}
							>
								<step.icon className="w-5 h-5" />
							</div>
							<p
								className={cn(
									"text-sm mt-2 whitespace-nowrap transition-colors duration-300",
									currentStep >= step.id
										? "text-ds-primary-charcoal"
										: "text-ds-neutral-mediumGray"
								)}
							>
								{step.name}
							</p>
							{index < steps.length - 1 && (
								<div
									className={cn(
										"absolute left-[calc(50%+20px)] top-5 h-0.5 w-[calc(100vw/4-40px)] -translate-y-1/2 transition-all duration-300",
										currentStep > step.id
											? "bg-ds-primary-sage"
											: "bg-ds-neutral-lightGray"
									)}
								/>
							)}
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Area */}
					<div className="lg:col-span-2 bg-ds-neutral-white p-8 rounded-lg shadow-lg border border-ds-neutral-lightGray">
						{currentStep === 1 && (
							<ShippingInformation
								onNext={nextStep}
								initialData={formData.shippingAddress}
								initialSameAsShipping={formData.sameAsShipping}
								shippingOptions={shippingOptions}
								initialShippingOption={formData.shippingOption}
							/>
						)}
						{currentStep === 2 && (
							<PaymentInformation
								onNext={nextStep}
								onBack={prevStep}
								initialData={formData.paymentMethod}
								initialSameAsShipping={formData.sameAsShipping}
							/>
						)}
						{currentStep === 3 && (
							<ReviewOrder
								onNext={nextStep}
								onBack={prevStep}
								cartItems={items}
								orderSummary={{
									subtotal,
									shipping: shippingCost,
									tax,
									discount: promoDiscount,
									total,
									itemCount: getTotalItems(),
									estimatedDelivery:
										formData.shippingOption?.estimatedDays || "N/A",
								}}
								promoCode={formData.promoCode || ""}
								onPromoCodeChange={handlePromoCodeChange}
								shippingOptions={shippingOptions}
								promoCodes={promoCodes}
							/>
						)}
						{currentStep === 4 && <OrderConfirmation />}
					</div>

					{/* Order Summary Sidebar */}
					{currentStep < 4 && (
						<div className="lg:col-span-1 bg-ds-neutral-white p-8 rounded-lg shadow-lg border border-ds-neutral-lightGray h-fit sticky top-8">
							<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8">
								Order Summary
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between text-ds-neutral-darkSlate">
									<span>Subtotal ({getTotalItems()} items)</span>
									<span>{formatCurrency(subtotal)}</span>
								</div>
								<div className="flex justify-between text-ds-neutral-darkSlate">
									<span>Shipping</span>
									<span>
										{shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
									</span>
								</div>
								{appliedPromo && (
									<div className="flex justify-between text-ds-primary-sage">
										<span>Discount ({appliedPromo.code})</span>
										<span>-{formatCurrency(promoDiscount)}</span>
									</div>
								)}
								<div className="flex justify-between text-ds-neutral-darkSlate">
									<span>Tax</span>
									<span>{formatCurrency(tax)}</span>
								</div>
								<div className="border-t border-ds-neutral-lightGray pt-4 mt-4">
									<div className="flex justify-between text-xl font-bold text-ds-primary-charcoal">
										<span>Total</span>
										<span>{formatCurrency(total)}</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
