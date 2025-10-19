"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ShippingAddress,
	shippingAddressSchema,
	ShippingOption,
} from "@/types/checkout";
import { useCheckoutStore } from "@/store/checkout-store";
import { cn } from "@/lib/utils";
import { mockValidateAddress } from "@/lib/api";
import {
	Truck,
	MapPin,
	User,
	Building,
	Phone,
	CheckCircle,
	AlertCircle,
	Info,
} from "lucide-react";
import { formatCurrency } from "@/utils/cartUtils";

interface ShippingInformationProps {
	onNext: () => void;
	initialData?: ShippingAddress;
	initialSameAsShipping?: boolean;
	shippingOptions: ShippingOption[];
	initialShippingOption?: ShippingOption;
}

export const ShippingInformation: React.FC<ShippingInformationProps> = ({
	onNext,
	initialData,
	initialSameAsShipping = true,
	shippingOptions,
	initialShippingOption,
}) => {
	const { setShippingAddress, setShippingOption } = useCheckoutStore();
	const [sameAsShipping, setLocalSameAsShipping] = useState(
		initialSameAsShipping
	);
	const [isGuest, setIsGuest] = useState(true);
	const [validatingAddress, setValidatingAddress] = useState(false);
	const [addressError, setAddressError] = useState<string | null>(null);
	const [selectedShippingId, setSelectedShippingId] = useState(
		initialShippingOption?.id || shippingOptions[0]?.id
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm<ShippingAddress>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: initialData || { country: "USA" },
	});

	useEffect(() => {
		if (initialData) {
			Object.entries(initialData).forEach(([key, value]) => {
				setValue(key as keyof ShippingAddress, value);
			});
		}
		if (initialShippingOption) {
			setSelectedShippingId(initialShippingOption.id);
		} else if (shippingOptions.length > 0) {
			setSelectedShippingId(shippingOptions[0].id);
			setShippingOption(shippingOptions[0]);
		}
	}, [
		initialData,
		initialShippingOption,
		shippingOptions,
		setValue,
		setShippingOption,
	]);

	const onSubmit = async (data: ShippingAddress) => {
		setValidatingAddress(true);
		setAddressError(null);
		try {
			const isValid = await mockValidateAddress(data);
			if (isValid) {
				setShippingAddress(data, sameAsShipping);
				onNext();
			} else {
				setAddressError(
					"Address validation failed. Please check your address details."
				);
			}
		} catch (err) {
			setAddressError(
				"An error occurred during address validation. Please try again."
			);
		} finally {
			setValidatingAddress(false);
		}
	};

	const handleShippingOptionChange = (optionId: string) => {
		const option = shippingOptions.find((opt) => opt.id === optionId);
		if (option) {
			setSelectedShippingId(optionId);
			setShippingOption(option);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Guest/Account Option */}
			<div className="bg-ds-primary-cream p-4 rounded-lg flex items-center space-x-4 text-ds-primary-charcoal text-sm">
				<Info className="w-5 h-5" />
				<p>Proceeding as a guest. You can create an account after checkout.</p>
			</div>

			{/* Shipping Address */}
			<h2 className="text-2xl font-bold text-ds-primary-charcoal flex items-center space-x-4">
				<MapPin className="w-6 h-6 text-ds-primary-sage" />
				<span>Shipping Address</span>
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						{...register("firstName")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.firstName ? "true" : "false"}
						aria-describedby={errors.firstName ? "firstName-error" : undefined}
					/>
					{errors.firstName && (
						<p id="firstName-error" className="text-red-500 text-xs mt-1">
							{errors.firstName.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						{...register("lastName")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.lastName ? "true" : "false"}
						aria-describedby={errors.lastName ? "lastName-error" : undefined}
					/>
					{errors.lastName && (
						<p id="lastName-error" className="text-red-500 text-xs mt-1">
							{errors.lastName.message}
						</p>
					)}
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="company"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Company (Optional)
					</label>
					<input
						type="text"
						id="company"
						{...register("company")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					/>
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="address1"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Address Line 1
					</label>
					<input
						type="text"
						id="address1"
						{...register("address1")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.address1 ? "true" : "false"}
						aria-describedby={errors.address1 ? "address1-error" : undefined}
					/>
					{errors.address1 && (
						<p id="address1-error" className="text-red-500 text-xs mt-1">
							{errors.address1.message}
						</p>
					)}
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="address2"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Address Line 2 (Optional)
					</label>
					<input
						type="text"
						id="address2"
						{...register("address2")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					/>
				</div>
				<div>
					<label
						htmlFor="city"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						City
					</label>
					<input
						type="text"
						id="city"
						{...register("city")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.city ? "true" : "false"}
						aria-describedby={errors.city ? "city-error" : undefined}
					/>
					{errors.city && (
						<p id="city-error" className="text-red-500 text-xs mt-1">
							{errors.city.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="state"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						State / Province
					</label>
					<input
						type="text"
						id="state"
						{...register("state")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.state ? "true" : "false"}
						aria-describedby={errors.state ? "state-error" : undefined}
					/>
					{errors.state && (
						<p id="state-error" className="text-red-500 text-xs mt-1">
							{errors.state.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="zipCode"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Zip / Postal Code
					</label>
					<input
						type="text"
						id="zipCode"
						{...register("zipCode")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.zipCode ? "true" : "false"}
						aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
					/>
					{errors.zipCode && (
						<p id="zipCode-error" className="text-red-500 text-xs mt-1">
							{errors.zipCode.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="country"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Country
					</label>
					<input
						type="text"
						id="country"
						{...register("country")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.country ? "true" : "false"}
						aria-describedby={errors.country ? "country-error" : undefined}
					/>
					{errors.country && (
						<p id="country-error" className="text-red-500 text-xs mt-1">
							{errors.country.message}
						</p>
					)}
				</div>
				<div className="md:col-span-2">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
					>
						Phone (Optional)
					</label>
					<input
						type="tel"
						id="phone"
						{...register("phone")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					/>
				</div>
			</div>

			{/* Shipping Method */}
			<h2 className="text-2xl font-bold text-ds-primary-charcoal flex items-center space-x-4 mt-8">
				<Truck className="w-6 h-6 text-ds-primary-sage" />
				<span>Shipping Method</span>
			</h2>
			<div className="space-y-4">
				{shippingOptions.map((option) => (
					<label
						key={option.id}
						htmlFor={`shipping-${option.id}`}
						className={cn(
							"flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200",
							selectedShippingId === option.id
								? "border-ds-primary-sage bg-ds-primary-sage/5"
								: "border-ds-neutral-lightGray hover:border-ds-primary-sage/50"
						)}
					>
						<div className="flex items-center space-x-4">
							<input
								type="radio"
								id={`shipping-${option.id}`}
								name="shippingOption"
								value={option.id}
								checked={selectedShippingId === option.id}
								onChange={() => handleShippingOptionChange(option.id)}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-ds-primary-sage"
								aria-label={`Select ${option.name} shipping option`}
							/>
							<div>
								<p className="font-medium text-ds-primary-charcoal">
									{option.name}
								</p>
								<p className="text-sm text-ds-neutral-darkSlate">
									{option.description}
								</p>
							</div>
						</div>
						<span className="font-semibold text-ds-primary-charcoal">
							{option.price === 0 ? "Free" : `${formatCurrency(option.price)}`}
						</span>
					</label>
				))}
			</div>

			{addressError && (
				<div
					className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
					role="alert"
				>
					<AlertCircle className="w-5 h-5" />
					<p className="text-sm">{addressError}</p>
				</div>
			)}

			<div className="flex justify-end mt-8">
				<button
					type="submit"
					className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
					disabled={isSubmitting || validatingAddress}
					aria-label="Continue to payment"
				>
					{isSubmitting || validatingAddress ? (
						<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
					) : (
						<CheckCircle className="w-5 h-5" />
					)}
					<span>
						{validatingAddress
							? "Validating Address..."
							: "Continue to Payment"}
					</span>
				</button>
			</div>
		</form>
	);
};
