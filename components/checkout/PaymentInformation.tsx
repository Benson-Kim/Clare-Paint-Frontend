"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethod, paymentMethodSchema } from "@/types/checkout";
import { useCheckoutStore } from "@/store/checkout-store";
import { cn } from "@/lib/utils";
import { CreditCard, ArrowLeft, Lock, Info } from "lucide-react";

interface PaymentInformationProps {
	onNext: () => void;
	onBack: () => void;
	initialData?: PaymentMethod;
	initialSameAsShipping?: boolean;
}

export const PaymentInformation: React.FC<PaymentInformationProps> = ({
	onNext,
	onBack,
	initialData,
	initialSameAsShipping = true,
}) => {
	const { setPaymentMethod, setShippingAddress, formData } = useCheckoutStore();
	const [selectedPaymentType, setSelectedPaymentType] = useState<
		PaymentMethod["type"]
	>(initialData?.type || "credit");
	const [sameAsShipping, setLocalSameAsShipping] = useState(
		initialSameAsShipping
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
		trigger,
	} = useForm<PaymentMethod>({
		resolver: zodResolver(paymentMethodSchema),
		defaultValues: initialData || { type: "credit" },
		mode: "onBlur",
	});

	const currentYear = new Date().getFullYear() % 100;
	const years = Array.from({ length: 10 }, (_, i) =>
		(currentYear + i).toString().padStart(2, "0")
	);

	useEffect(() => {
		setValue("type", selectedPaymentType);
		trigger();
	}, [selectedPaymentType, setValue, trigger]);

	useEffect(() => {
		if (initialData) {
			Object.entries(initialData).forEach(([key, value]) => {
				setValue(key as keyof PaymentMethod, value);
			});
		}
	}, [initialData, setValue]);

	const onSubmit = async (data: PaymentMethod) => {
		setPaymentMethod(data);
		if (sameAsShipping && formData.shippingAddress) {
			setShippingAddress(formData.shippingAddress, true);
		}
		onNext();
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(" ");
		} else {
			return v;
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Payment Method Selection */}
			<h2 className="text-2xl font-bold text-ds-primary-charcoal flex items-center space-x-4">
				<CreditCard className="w-6 h-6 text-ds-primary-sage" />
				<span>Payment Method</span>
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<label
					htmlFor="payment-credit"
					className={cn(
						"flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200",
						selectedPaymentType === "credit"
							? "border-ds-primary-sage bg-ds-primary-sage/5"
							: "border-ds-neutral-lightGray hover:border-ds-primary-sage/50"
					)}
				>
					<div className="flex items-center space-x-4">
						<input
							type="radio"
							id="payment-credit"
							name="paymentType"
							value="credit"
							checked={selectedPaymentType === "credit"}
							onChange={() => setSelectedPaymentType("credit")}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage"
							aria-label="Select credit card payment"
						/>
						<CreditCard className="w-6 h-6 text-ds-primary-charcoal" />
						<span className="font-medium text-ds-primary-charcoal">
							Credit Card
						</span>
					</div>
				</label>
				<label
					htmlFor="payment-paypal"
					className={cn(
						"flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200",
						selectedPaymentType === "paypal"
							? "border-ds-primary-sage bg-ds-primary-sage/5"
							: "border-ds-neutral-lightGray hover:border-ds-primary-sage/50"
					)}
				>
					<div className="flex items-center space-x-4">
						<input
							type="radio"
							id="payment-paypal"
							name="paymentType"
							value="paypal"
							checked={selectedPaymentType === "paypal"}
							onChange={() => setSelectedPaymentType("paypal")}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage"
							aria-label="Select PayPal payment"
						/>
						<div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
							PP
						</div>
						<span className="font-medium text-ds-primary-charcoal">PayPal</span>
					</div>
				</label>
			</div>

			{selectedPaymentType === "credit" && (
				<div className="space-y-4 mt-8">
					<div>
						<label
							htmlFor="cardholderName"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
						>
							Cardholder Name
						</label>
						<input
							type="text"
							id="cardholderName"
							{...register("cardholderName")}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-invalid={errors.cardholderName ? "true" : "false"}
							aria-describedby={
								errors.cardholderName ? "cardholderName-error" : undefined
							}
						/>
						{errors.cardholderName && (
							<p
								id="cardholderName-error"
								className="text-red-500 text-xs mt-1"
							>
								{errors.cardholderName.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="cardNumber"
							className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
						>
							Card Number
						</label>
						<input
							type="text"
							id="cardNumber"
							{...register("cardNumber")}
							className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							placeholder="1234 5678 9012 3456"
							maxLength={19}
							onChange={(e) => {
								const formatted = formatCardNumber(e.target.value);
								setValue("cardNumber", formatted, { shouldValidate: true });
							}}
							aria-invalid={errors.cardNumber ? "true" : "false"}
							aria-describedby={
								errors.cardNumber ? "cardNumber-error" : undefined
							}
						/>
						{errors.cardNumber && (
							<p id="cardNumber-error" className="text-red-500 text-xs mt-1">
								{errors.cardNumber.message}
							</p>
						)}
					</div>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label
								htmlFor="expiryMonth"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
							>
								Expiry Month
							</label>
							<select
								id="expiryMonth"
								{...register("expiryMonth")}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-invalid={errors.expiryMonth ? "true" : "false"}
								aria-describedby={
									errors.expiryMonth ? "expiryMonth-error" : undefined
								}
							>
								<option value="">MM</option>
								{Array.from({ length: 12 }, (_, i) =>
									(i + 1).toString().padStart(2, "0")
								).map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
							{errors.expiryMonth && (
								<p id="expiryMonth-error" className="text-red-500 text-xs mt-1">
									{errors.expiryMonth.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="expiryYear"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
							>
								Expiry Year
							</label>
							<select
								id="expiryYear"
								{...register("expiryYear")}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-invalid={errors.expiryYear ? "true" : "false"}
								aria-describedby={
									errors.expiryYear ? "expiryYear-error" : undefined
								}
							>
								<option value="">YY</option>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
							{errors.expiryYear && (
								<p id="expiryYear-error" className="text-red-500 text-xs mt-1">
									{errors.expiryYear.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="cvv"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
							>
								CVV
							</label>
							<input
								type="text"
								id="cvv"
								{...register("cvv")}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								placeholder="123"
								maxLength={4}
								aria-invalid={errors.cvv ? "true" : "false"}
								aria-describedby={errors.cvv ? "cvv-error" : undefined}
							/>
							{errors.cvv && (
								<p id="cvv-error" className="text-red-500 text-xs mt-1">
									{errors.cvv.message}
								</p>
							)}
						</div>
					</div>
				</div>
			)}

			{selectedPaymentType === "paypal" && (
				<div className="bg-ds-primary-cream p-4 rounded-lg flex items-center space-x-4 text-ds-primary-charcoal text-sm mt-8">
					<Info className="w-5 h-5" />
					<p>You will be redirected to PayPal to complete your purchase.</p>
				</div>
			)}

			{/* Billing Address */}
			<h2 className="text-2xl font-bold text-ds-primary-charcoal flex items-center space-x-4 mt-8">
				<CreditCard className="w-6 h-6 text-ds-primary-sage" />
				<span>Billing Address</span>
			</h2>
			<label
				htmlFor="sameAsShipping"
				className="flex items-center space-x-4 cursor-pointer"
			>
				<input
					type="checkbox"
					id="sameAsShipping"
					checked={sameAsShipping}
					onChange={(e) => setLocalSameAsShipping(e.target.checked)}
					className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage"
					aria-label="Billing address same as shipping"
				/>
				<span className="text-ds-neutral-darkSlate text-sm">
					Same as shipping address
				</span>
			</label>

			{!sameAsShipping && (
				<div className="bg-ds-primary-cream p-4 rounded-lg text-ds-neutral-darkSlate text-sm">
					<p>
						For this demo, billing address will automatically use the shipping
						address when unchecked.
					</p>
					<p>In production, this would show a full billing address form.</p>
				</div>
			)}

			<div className="flex justify-between mt-8">
				<button
					type="button"
					onClick={onBack}
					className="px-8 py-2 border border-ds-neutral-lightGray text-ds-primary-charcoal rounded-lg font-semibold hover:bg-ds-neutral-lightGray/50 transition-colors duration-200 flex items-center justify-center space-x-4"
					aria-label="Back to shipping information"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Back</span>
				</button>
				<button
					type="submit"
					className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
					disabled={isSubmitting}
					aria-label="Continue to review order"
				>
					{isSubmitting ? (
						<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
					) : (
						<Lock className="w-5 h-5" />
					)}
					<span>Review Order</span>
				</button>
			</div>
		</form>
	);
};
