"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getAddresses,
	addAddress,
	updateAddress,
	deleteAddress,
} from "@/lib/account-api";
import { UserAddress, AddressFormData } from "@/types/account";
import { useAuthStore } from "@/store/account-store";
import { toast } from "@/lib/toast";
import { Edit, Trash, Plus, MapPin, CheckCircle } from "lucide-react";

const addressSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	company: z.string().optional(),
	address1: z.string().min(1, "Address is required"),
	address2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State/Province is required"),
	zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
	country: z.string().min(1, "Country is required"),
	phone: z.string().optional(),
	type: z.enum(["shipping", "billing", "both"]),
	isDefault: z.boolean().optional(),
});

export default function AddressBook() {
	const { user } = useAuthStore();
	const userId = user?.id;
	const queryClient = useQueryClient();
	const [editingId, setEditingId] = useState<number | null>(null);
	const [showForm, setShowForm] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddressFormData>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			company: "",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zipCode: "",
			country: "Kenya", // Default country as per your code
			phone: "",
			type: "shipping",
			isDefault: false,
		},
	});

	const addMutation = useMutation({
		mutationFn: (data: AddressFormData) => addAddress(data, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			reset();
			setShowForm(false);
			toast.success("Address added successfully");
		},
		onError: (error: Error) => toast.error(error.message),
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: AddressFormData }) =>
			updateAddress(id, data, userId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			reset();
			setEditingId(null);
			setShowForm(false);
			toast.success("Address updated successfully");
		},
		onError: (error: Error) => toast.error(error.message),
	});

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteAddress(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			toast.success("Address deleted successfully");
		},
		onError: (error: Error) => toast.error(error.message),
	});

	const onSubmit = (data: AddressFormData) => {
		if (editingId) {
			updateMutation.mutate({ id: editingId, data });
		} else {
			addMutation.mutate(data);
		}
	};

	const handleEdit = (address: UserAddress) => {
		reset(address);
		setEditingId(address.id);
		setShowForm(true);
	};

	const { data: addresses, isLoading } = useQuery<UserAddress[], Error>({
		queryKey: ["addresses", userId],
		queryFn: () => getAddresses(userId!),
		enabled: !!userId,
	});

	if (!userId) {
		return <div>Please log in to view your address book.</div>;
	}

	if (isLoading) {
		return <div>Loading addresses...</div>;
	}

	return (
		<div className="p-8 space-y-8">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal">
					Address Book
				</h2>
				<button
					onClick={() => {
						setShowForm(!showForm);
						if (!showForm) setEditingId(null);
					}}
					className="px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center space-x-2"
				>
					<Plus className="h-4 w-4" /> {showForm ? "Cancel" : "Add Address"}
				</button>
			</div>

			{showForm && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-8 bg-ds-neutral-white p-6 rounded-lg border border-ds-neutral-lightGray"
				>
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
								aria-describedby={
									errors.firstName ? "firstName-error" : undefined
								}
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
								aria-describedby={
									errors.lastName ? "lastName-error" : undefined
								}
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
								aria-describedby={
									errors.address1 ? "address1-error" : undefined
								}
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
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
							>
								Phone
							</label>
							<input
								type="tel"
								id="phone"
								{...register("phone")}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-invalid={errors.phone ? "true" : "false"}
								aria-describedby={errors.phone ? "phone-error" : undefined}
							/>
							{errors.phone && (
								<p id="phone-error" className="text-red-500 text-xs mt-1">
									{errors.phone.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="type"
								className="block text-sm font-medium text-ds-neutral-darkSlate mb-1"
							>
								Type
							</label>
							<select
								id="type"
								{...register("type")}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-md focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							>
								<option value="shipping">Shipping</option>
								<option value="billing">Billing</option>
								<option value="both">Both</option>
							</select>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="isDefault"
								{...register("isDefault")}
								className="w-4 h-4 text-ds-primary-sage focus:ring-ds-primary-sage"
							/>
							<label
								htmlFor="isDefault"
								className="text-sm font-medium text-ds-neutral-darkSlate"
							>
								Set as default
							</label>
						</div>
					</div>
					<button
						type="submit"
						className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200 flex items-center justify-center space-x-4"
						disabled={addMutation.isPending || updateMutation.isPending}
						aria-label={editingId ? "Update address" : "Add address"}
					>
						{addMutation.isPending || updateMutation.isPending ? (
							<div className="w-5 h-5 border-2 border-ds-neutral-white/30 border-t-ds-neutral-white rounded-full animate-spin" />
						) : (
							<CheckCircle className="w-5 h-5" />
						)}
						<span>{editingId ? "Update" : "Add"} Address</span>
					</button>
				</form>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{addresses?.length === 0 && (
					<p className="text-ds-neutral-mediumGray">
						No addresses found. Add one above.
					</p>
				)}
				{addresses?.map((addr) => (
					<div
						key={addr.id}
						className="border p-4 rounded-lg bg-ds-neutral-white"
					>
						<div className="flex justify-between items-center">
							<h3 className="font-semibold text-ds-primary-charcoal">
								{addr.firstName} {addr.lastName}
							</h3>
							{addr.isDefault && (
								<span className="text-green-600 text-sm">Default</span>
							)}
						</div>
						{addr.company && <p>{addr.company}</p>}
						<p>{addr.address1}</p>
						{addr.address2 && <p>{addr.address2}</p>}
						<p>
							{addr.city}, {addr.state} {addr.zipCode}
						</p>
						<p>{addr.country}</p>
						{addr.phone && <p>Phone: {addr.phone}</p>}
						<p>
							Type: {addr.type.charAt(0).toUpperCase() + addr.type.slice(1)}
						</p>
						<div className="flex space-x-2 mt-2">
							<button
								onClick={() => handleEdit(addr)}
								className="px-3 py-1 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
							>
								<Edit className="h-4 w-4" />
							</button>
							<button
								onClick={() => deleteMutation.mutate(addr.id)}
								disabled={deleteMutation.isPending}
								className="px-3 py-1 bg-red-500 text-ds-neutral-white rounded-lg hover:bg-red-600 transition-colors duration-200"
							>
								<Trash className="h-4 w-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
