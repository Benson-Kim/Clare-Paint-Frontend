"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	mockFetchSubscription,
	mockUpdateSubscription,
	mockUnsubscribe,
} from "@/lib/api";
import { NewsletterSubscription } from "@/types/newsletter";
import { useNewsletterStore } from "@/store/newsletter-store";
import {
	Mail,
	Settings,
	CheckCircle,
	AlertCircle,
	Loader2,
	Trash2,
	Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const subscriptionManagementSchema = z.object({
	preferences: z
		.array(z.string())
		.min(1, "Please select at least one preference"),
	frequency: z.enum(["daily", "weekly", "monthly", "as_needed"], {
		message: "Please select a frequency",
	}),
});

export const SubscriptionManagementCenter: React.FC = () => {
	const queryClient = useQueryClient();
	const {
		userEmail,
		currentSubscription,
		setCurrentSubscription,
		clearSubscription,
	} = useNewsletterStore();
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [updateError, setUpdateError] = useState<string | null>(null);
	const [unsubscribeSuccess, setUnsubscribeSuccess] = useState(false);
	const [unsubscribeError, setUnsubscribeError] = useState<string | null>(null);

	const {
		data: subscription,
		isLoading,
		isError,
		error,
	} = useQuery<NewsletterSubscription | null, Error>({
		queryKey: ["userSubscription", userEmail],
		queryFn: () => mockFetchSubscription(userEmail!),
		enabled: !!userEmail, // Only run if userEmail is available
		onSuccess: (data) => {
			if (data) {
				setCurrentSubscription(data);
				reset({
					preferences: data.preferences,
					frequency: data.frequency,
				});
			} else {
				clearSubscription(); // Clear store if subscription not found
			}
		},
		onError: (err) => {
			console.error("Failed to fetch subscription:", err);
			setUpdateError(
				"Failed to load your subscription details. Please try again."
			);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm<Pick<NewsletterSubscription, "preferences" | "frequency">>({
		resolver: zodResolver(subscriptionManagementSchema),
		defaultValues: {
			preferences: currentSubscription?.preferences || [],
			frequency: currentSubscription?.frequency || "monthly",
		},
	});

	const updateMutation = useMutation({
		mutationFn: (
			data: Pick<NewsletterSubscription, "preferences" | "frequency">
		) => mockUpdateSubscription({ ...currentSubscription!, ...data }),
		onSuccess: (data) => {
			setCurrentSubscription(data);
			setUpdateSuccess(true);
			setUpdateError(null);
			queryClient.invalidateQueries({ queryKey: ["userSubscription"] });
			queryClient.invalidateQueries({
				queryKey: ["personalizedRecommendations"],
			}); // Invalidate recommendations
			setTimeout(() => setUpdateSuccess(false), 3000);
		},
		onError: (error: Error) => {
			setUpdateError(
				error.message || "Failed to update subscription. Please try again."
			);
			setUpdateSuccess(false);
		},
	});

	const unsubscribeMutation = useMutation({
		mutationFn: (email: string) => mockUnsubscribe(email),
		onSuccess: () => {
			clearSubscription();
			setUnsubscribeSuccess(true);
			setUnsubscribeError(null);
			queryClient.invalidateQueries({ queryKey: ["userSubscription"] });
			queryClient.invalidateQueries({
				queryKey: ["personalizedRecommendations"],
			}); // Invalidate recommendations
		},
		onError: (error: Error) => {
			setUnsubscribeError(
				error.message || "Failed to unsubscribe. Please try again."
			);
			setUnsubscribeSuccess(false);
		},
	});

	const onSubmit = async (
		data: Pick<NewsletterSubscription, "preferences" | "frequency">
	) => {
		setUpdateError(null);
		updateMutation.mutate(data);
	};

	const handleUnsubscribe = () => {
		if (
			userEmail &&
			confirm("Are you sure you want to unsubscribe from our newsletter?")
		) {
			setUnsubscribeError(null);
			unsubscribeMutation.mutate(userEmail);
		}
	};

	const selectedPreferences = watch("preferences");

	const togglePreference = (pref: string) => {
		const newPreferences = selectedPreferences.includes(pref)
			? selectedPreferences.filter((p) => p !== pref)
			: [...selectedPreferences, pref];
		setValue("preferences", newPreferences, { shouldValidate: true });
	};

	const preferenceOptions = [
		{ id: "interior_paint", label: "Interior Paint" },
		{ id: "exterior_paint", label: "Exterior Paint" },
		{ id: "color_trends", label: "Color Trends" },
		{ id: "diy_tips", label: "DIY Tips & Guides" },
		{ id: "promotions", label: "Exclusive Promotions" },
	];

	const frequencyOptions = [
		{ id: "daily", label: "Daily" },
		{ id: "weekly", label: "Weekly" },
		{ id: "monthly", label: "Monthly" },
		{ id: "as_needed", label: "As Needed (Occasional)" },
	];

	if (unsubscribeSuccess) {
		return (
			<div className="text-center p-8 bg-ds-primary-cream border border-ds-accent-warmBeige rounded-lg space-y-4">
				<Trash2 className="w-16 h-16 text-ds-accent-warmBrown mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					You have unsubscribed.
				</h3>
				<p className="text-ds-neutral-darkSlate">
					We&apos;re sorry to see you go! You will no longer receive our
					newsletter.
				</p>
				<button
					onClick={() => setUnsubscribeSuccess(false)}
					className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
				>
					Resubscribe
				</button>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 text-center">
				<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
				<p className="text-ds-neutral-mediumGray">
					Loading your subscription details...
				</p>
			</div>
		);
	}

	if (isError || !currentSubscription) {
		return (
			<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg space-y-4 text-center">
				<AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					Error Loading Subscription
				</h3>
				<p className="text-sm">
					{updateError ||
						error?.message ||
						"Could not find your subscription details."}
				</p>
				<button
					onClick={() =>
						queryClient.invalidateQueries({ queryKey: ["userSubscription"] })
					}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8 text-center">
				Manage Your Newsletter Subscription
			</h2>
			<p className="text-ds-neutral-mediumGray mb-8 text-center">
				Update your preferences, change frequency, or unsubscribe at any time.
			</p>

			<div className="mb-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4 text-sm text-ds-neutral-darkSlate">
				<p className="font-semibold">Current Subscription Status:</p>
				<p>Email: {currentSubscription.email}</p>
				<p>
					Status:{" "}
					<span
						className={cn(
							currentSubscription.status === "subscribed" &&
								"text-green-600 font-medium",
							currentSubscription.status === "unsubscribed" &&
								"text-red-600 font-medium",
							currentSubscription.status === "pending" &&
								"text-yellow-600 font-medium"
						)}
					>
						{currentSubscription.status.charAt(0).toUpperCase() +
							currentSubscription.status.slice(1)}
					</span>
				</p>
				<p>
					Subscribed Since:{" "}
					{format(new Date(currentSubscription.subscribedAt), "MMM dd, yyyy")}
				</p>
				{currentSubscription.lastUpdated && (
					<p>
						Last Updated:{" "}
						{format(
							new Date(currentSubscription.lastUpdated),
							"MMM dd, yyyy HH:mm"
						)}
					</p>
				)}
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{updateSuccess && (
					<div
						className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center space-x-4"
						role="alert"
					>
						<CheckCircle className="w-5 h-5" />
						<p className="text-sm">Subscription updated successfully!</p>
					</div>
				)}
				{updateError && (
					<div
						className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
						role="alert"
					>
						<AlertCircle className="w-5 h-5" />
						<p className="text-sm">{updateError}</p>
					</div>
				)}

				<div>
					<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
						I&apos;m interested in: *
					</label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{preferenceOptions.map((option) => (
							<label
								key={option.id}
								className="flex items-center space-x-2 cursor-pointer"
							>
								<input
									type="checkbox"
									checked={selectedPreferences.includes(option.id)}
									onChange={() => togglePreference(option.id)}
									className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-2 focus:ring-ds-primary-sage"
								/>
								<span className="text-sm text-ds-neutral-darkSlate">
									{option.label}
								</span>
							</label>
						))}
					</div>
					{errors.preferences && (
						<p className="text-red-500 text-xs mt-2">
							{errors.preferences.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
						How often would you like to hear from us? *
					</label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{frequencyOptions.map((option) => (
							<label
								key={option.id}
								className="flex items-center space-x-2 cursor-pointer"
							>
								<input
									type="radio"
									{...register("frequency")}
									value={option.id}
									className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray focus:ring-2 focus:ring-ds-primary-sage"
								/>
								<span className="text-sm text-ds-neutral-darkSlate">
									{option.label}
								</span>
							</label>
						))}
					</div>
					{errors.frequency && (
						<p className="text-red-500 text-xs mt-2">
							{errors.frequency.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isSubmitting || updateMutation.isPending}
					className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold flex items-center justify-center space-x-4"
					aria-label="Update subscription preferences"
				>
					{isSubmitting || updateMutation.isPending ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<Settings className="w-5 h-5" />
					)}
					<span>
						{isSubmitting || updateMutation.isPending
							? "Updating..."
							: "Update Preferences"}
					</span>
				</button>
			</form>

			<div className="mt-8 pt-8 border-t border-ds-neutral-lightGray text-center">
				{unsubscribeError && (
					<div
						className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4 mb-4"
						role="alert"
					>
						<AlertCircle className="w-5 h-5" />
						<p className="text-sm">{unsubscribeError}</p>
					</div>
				)}
				<button
					onClick={handleUnsubscribe}
					disabled={unsubscribeMutation.isPending}
					className="px-8 py-2 border border-ds-accent-warmBrown text-ds-accent-warmBrown rounded-lg hover:bg-ds-accent-warmBrown/5 transition-colors duration-200 font-semibold flex items-center justify-center space-x-4"
					aria-label="Unsubscribe from newsletter"
				>
					{unsubscribeMutation.isPending ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<Trash2 className="w-5 h-5" />
					)}
					<span>
						{unsubscribeMutation.isPending ? "Unsubscribing..." : "Unsubscribe"}
					</span>
				</button>
			</div>
		</div>
	);
};
