"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { mockSubscribeToNewsletter } from "@/lib/api";
import { NewsletterSubscriptionFormData } from "@/types/newsletter";
import { useNewsletterStore } from "@/store/newsletter-store";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const newsletterSignupSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	userName: z.string().optional(),
	preferences: z
		.array(z.string())
		.min(1, "Please select at least one preference"),
	frequency: z.enum(["daily", "weekly", "monthly", "as_needed"], {
		message: "Please select a frequency",
	}),
});

export const NewsletterSignupForm: React.FC = () => {
	const { setCurrentSubscription, setUserEmail } = useNewsletterStore();
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm<NewsletterSubscriptionFormData>({
		resolver: zodResolver(newsletterSignupSchema),
		defaultValues: {
			preferences: [],
			frequency: "monthly",
		},
	});

	const subscribeMutation = useMutation({
		mutationFn: mockSubscribeToNewsletter,
		onSuccess: (data) => {
			setCurrentSubscription(data);
			setUserEmail(data.email);
			setSubmissionSuccess(true);
			setSubmissionError(null);
			reset();
		},
		onError: (error: Error) => {
			setSubmissionError(
				error.message || "Failed to subscribe. Please try again."
			);
			setSubmissionSuccess(false);
		},
	});

	const onSubmit = async (data: NewsletterSubscriptionFormData) => {
		setSubmissionError(null);
		subscribeMutation.mutate(data);
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

	if (submissionSuccess) {
		return (
			<div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg space-y-4">
				<CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					Subscription Confirmed!
				</h3>
				<p className="text-ds-neutral-darkSlate">
					Thank you for subscribing to our newsletter. You'll receive updates
					based on your preferences.
				</p>
				<button
					onClick={() => setSubmissionSuccess(false)}
					className="px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200"
				>
					Manage My Subscription
				</button>
			</div>
		);
	}

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8 text-center">
				Subscribe to Our Newsletter
			</h2>
			<p className="text-ds-neutral-mediumGray mb-8 text-center">
				Stay up-to-date with the latest paint trends, DIY tips, and exclusive
				offers!
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
					>
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						{...register("email")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-invalid={errors.email ? "true" : "false"}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>
					{errors.email && (
						<p id="email-error" className="text-red-500 text-xs mt-2">
							{errors.email.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="userName"
						className="block text-sm font-medium text-ds-neutral-darkSlate mb-2"
					>
						Your Name (Optional)
					</label>
					<input
						type="text"
						id="userName"
						{...register("userName")}
						className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
						I'm interested in: *
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

				{submissionError && (
					<div
						className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center space-x-4"
						role="alert"
					>
						<AlertCircle className="w-5 h-5" />
						<p className="text-sm">{submissionError}</p>
					</div>
				)}

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-semibold flex items-center justify-center space-x-4"
					aria-label="Subscribe to newsletter"
				>
					{isSubmitting ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<Mail className="w-5 h-5" />
					)}
					<span>{isSubmitting ? "Subscribing..." : "Subscribe Now"}</span>
				</button>
			</form>
		</div>
	);
};
