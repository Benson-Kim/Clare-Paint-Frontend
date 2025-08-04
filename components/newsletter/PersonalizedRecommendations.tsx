"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchRecommendations } from "@/lib/api";
import { ContentArchiveItem } from "@/types/newsletter";
import {
	Lightbulb,
	Sparkles,
	Calendar,
	Tag,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNewsletterStore } from "@/store/newsletter-store";
import { format } from "date-fns";

export const PersonalizedRecommendations: React.FC = () => {
	const { userEmail, subscriptionStatus } = useNewsletterStore();

	const {
		data: recommendations,
		isLoading,
		isError,
		error,
	} = useQuery<ContentArchiveItem[], Error>({
		queryKey: ["personalizedRecommendations", userEmail],
		queryFn: () => mockFetchRecommendations(userEmail!),
		enabled: !!userEmail && subscriptionStatus === "subscribed", // Only fetch if subscribed
	});

	if (!userEmail || subscriptionStatus !== "subscribed") {
		return (
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-center space-y-4">
				<Lightbulb className="w-16 h-16 text-ds-accent-warmBrown mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					Unlock Personalized Recommendations
				</h3>
				<p className="text-ds-neutral-darkSlate">
					Subscribe to our newsletter and tell us your preferences to receive
					content tailored just for you!
				</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 text-center">
				<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
				<p className="text-ds-neutral-mediumGray">
					Generating personalized recommendations...
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg space-y-4 text-center">
				<AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					Error Loading Recommendations
				</h3>
				<p className="text-sm">
					{error?.message ||
						"Failed to load personalized content. Please try again."}
				</p>
			</div>
		);
	}

	if (!recommendations || recommendations.length === 0) {
		return (
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-center space-y-4">
				<Sparkles className="w-16 h-16 text-ds-accent-warmBrown mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					No Recommendations Yet
				</h3>
				<p className="text-ds-neutral-darkSlate">
					We're still learning your preferences! Check back later or update your
					subscription preferences for more tailored content.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8 text-center">
				Personalized Recommendations
			</h2>
			<p className="text-ds-neutral-mediumGray mb-8 text-center">
				Content tailored just for you, based on your interests.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{recommendations.map((item) => (
					<a
						key={item.id}
						href={item.contentUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="block bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 group"
						aria-label={`Read recommended article: ${item.title}`}
					>
						<div className="relative h-48 overflow-hidden">
							<img
								src={item.imageUrl}
								alt={item.title}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								loading="lazy"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-bold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200 line-clamp-2">
								{item.title}
							</h3>
							<p className="text-sm text-ds-neutral-mediumGray mb-4 line-clamp-3">
								{item.description}
							</p>
							<div className="flex items-center justify-between text-xs text-ds-neutral-mediumGray">
								<div className="flex items-center space-x-2">
									<Calendar className="w-3 h-3" />
									<span>
										{format(new Date(item.publishDate), "MMM dd, yyyy")}
									</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{item.categories.map((cat, idx) => (
										<span
											key={idx}
											className="bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate px-2 py-2 rounded-full"
										>
											{cat.replace(/_/g, " ")}
										</span>
									))}
								</div>
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};
