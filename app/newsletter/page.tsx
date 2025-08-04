"use client";

import React, { useEffect } from "react";
import { useNewsletterStore } from "@/store/newsletter-store";
import { NewsletterSignupForm } from "@/components/newsletter/NewsletterSignupForm";
import { SubscriptionManagementCenter } from "@/components/newsletter/SubscriptionManagementCenter";
import { ContentArchive } from "@/components/newsletter/ContentArchive";
import { PersonalizedRecommendations } from "@/components/newsletter/PersonalizedRecommendations";
import { useQuery } from "@tanstack/react-query";
import { mockFetchSubscription } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";

export default function NewsletterPage() {
	const {
		userEmail,
		subscriptionStatus,
		setCurrentSubscription,
		setUserEmail,
		clearSubscription,
	} = useNewsletterStore();

	// Attempt to fetch subscription if email is known but status is not yet set
	const {
		data: fetchedSubscription,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["userSubscription", userEmail],
		queryFn: () => mockFetchSubscription(userEmail!),
		enabled: !!userEmail && subscriptionStatus === null, // Only fetch if email is known but status is not set
		onSuccess: (data) => {
			if (data) {
				setCurrentSubscription(data);
			} else {
				clearSubscription(); // If no subscription found for email, clear it from store
			}
		},
		onError: (err) => {
			console.error("Failed to fetch subscription on page load:", err);
			// Optionally, clear email if fetch fails, forcing user to re-enter
			// clearSubscription();
		},
	});

	// If userEmail is null (first visit or cleared), show signup form
	if (!userEmail) {
		return (
			<div className="min-h-screen bg-ds-primary-cream py-20">
				<div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-20">
					<NewsletterSignupForm />
				</div>
			</div>
		);
	}

	// If email is known, but still loading subscription details
	if (isLoading) {
		return (
			<div className="min-h-screen bg-ds-primary-cream py-20 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
					<p className="text-ds-neutral-mediumGray">
						Verifying your subscription status...
					</p>
				</div>
			</div>
		);
	}

	// If there was an error fetching subscription, or no subscription found for the email
	if (isError || !fetchedSubscription) {
		return (
			<div className="min-h-screen bg-ds-primary-cream py-20">
				<div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-20">
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg space-y-4 text-center mb-20">
						<AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
						<h3 className="text-2xl font-bold text-ds-primary-charcoal">
							Subscription Not Found
						</h3>
						<p className="text-sm">
							We couldn't find an active subscription for {userEmail}. Please
							try subscribing again.
						</p>
						<button
							onClick={() => clearSubscription()} // Clear email to show signup form
							className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
						>
							Start New Subscription
						</button>
					</div>
					<ContentArchive />
				</div>
			</div>
		);
	}

	// If subscription is found and status is 'subscribed' or 'unsubscribed'
	return (
		<div className="min-h-screen bg-ds-primary-cream py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 space-y-20">
				<div className="max-w-3xl mx-auto">
					<SubscriptionManagementCenter />
				</div>
				<PersonalizedRecommendations />
				<ContentArchive />
			</div>
		</div>
	);
}
