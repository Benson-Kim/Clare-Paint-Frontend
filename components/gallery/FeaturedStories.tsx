"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchCustomerStories } from "@/lib/api";
import { CustomerStory } from "@/types/gallery";
import { Star, Quote, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export const FeaturedStories: React.FC = () => {
	const {
		data: stories,
		isLoading,
		isError,
		error,
	} = useQuery<CustomerStory[], Error>({
		queryKey: ["customerStories"],
		queryFn: mockFetchCustomerStories,
	});

	if (isLoading) {
		return (
			<div className="space-y-8">
				<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
					Featured Customer Stories
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
					{[...Array(2)].map((_, i) => (
						<div
							key={i}
							className="bg-ds-neutral-lightGray/20 rounded-lg h-64"
						/>
					))}
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg">
				<p className="mb-4">Error loading customer stories: {error?.message}</p>
				<button
					onClick={() => window.location.reload()}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (!stories || stories.length === 0) {
		return (
			<div className="text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
				<p className="text-lg font-semibold text-ds-primary-charcoal mb-4">
					No featured stories yet.
				</p>
				<p className="text-ds-neutral-mediumGray">
					Be the first to share your paint journey!
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal text-center">
				Featured Customer Stories
			</h2>
			<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto">
				Read inspiring testimonials and see the amazing transformations our
				customers have achieved with our paints.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{stories.map((story) => (
					<div
						key={story.id}
						className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
					>
						<div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
							<Image
								src={story.imageUrl}
								alt={story.title}
								className="w-full h-full object-cover"
								loading="lazy"
							/>
						</div>
						<div className="p-4 md:w-1/2 flex flex-col">
							<h3 className="font-bold text-ds-primary-charcoal mb-2 line-clamp-2">
								{story.title}
							</h3>
							<p className="text-sm text-ds-neutral-mediumGray mb-4">
								by {story.customerName} from {story.location}
							</p>
							<p className="text-ds-neutral-darkSlate text-sm italic mb-4 flex-1 line-clamp-4">
								<Quote className="w-4 h-4 inline-block mr-2 text-ds-primary-sage" />
								{story.story}
							</p>
							<div className="flex items-center justify-between text-xs text-ds-neutral-mediumGray mt-4">
								<span>Project Type: {story.projectType}</span>
								<span>Date: {story.date}</span>
							</div>
							<button
								className="mt-4 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
								aria-label={`Read full story of ${story.title}`}
							>
								<span>Read Full Story</span>
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
