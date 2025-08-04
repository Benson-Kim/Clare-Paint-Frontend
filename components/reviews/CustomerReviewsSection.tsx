"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	mockFetchReviews,
	mockVoteReviewHelpfulness,
	mockSubmitBusinessResponse,
} from "@/lib/api";
import { CustomerReview } from "@/types/reviews";
import {
	Star,
	MessageSquare,
	Filter,
	SortAsc,
	SortDesc,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { cn } from "@/lib/utils";

export const CustomerReviewsSection: React.FC = () => {
	const queryClient = useQueryClient();
	const [filterRating, setFilterRating] = useState<number | null>(null);
	const [sortBy, setSortBy] = useState<
		"newest" | "highest" | "lowest" | "most-helpful"
	>("newest");
	const [showBusinessResponseForm, setShowBusinessResponseForm] = useState<
		string | null
	>(null); // Stores reviewId

	const {
		data: reviews,
		isLoading,
		isError,
		error,
	} = useQuery<CustomerReview[], Error>({
		queryKey: ["customerReviews"],
		queryFn: mockFetchReviews,
	});

	const voteMutation = useMutation({
		mutationFn: ({
			reviewId,
			type,
		}: {
			reviewId: string;
			type: "helpful" | "unhelpful";
		}) => mockVoteReviewHelpfulness(reviewId, type),
		onMutate: async ({ reviewId, type }) => {
			await queryClient.cancelQueries({ queryKey: ["customerReviews"] });
			const previousReviews = queryClient.getQueryData<CustomerReview[]>([
				"customerReviews",
			]);
			queryClient.setQueryData<CustomerReview[]>(["customerReviews"], (old) =>
				old
					? old.map((review) =>
							review.id === reviewId
								? {
										...review,
										helpfulVotes:
											type === "helpful"
												? review.helpfulVotes + 1
												: review.helpfulVotes,
										unhelpfulVotes:
											type === "unhelpful"
												? review.unhelpfulVotes + 1
												: review.unhelpfulVotes,
								  }
								: review
					  )
					: []
			);
			return { previousReviews };
		},
		onError: (err, { reviewId }, context) => {
			queryClient.setQueryData(["customerReviews"], context?.previousReviews);
			console.error("Failed to vote:", err);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["customerReviews"] });
		},
	});

	const businessResponseMutation = useMutation({
		mutationFn: ({
			reviewId,
			responseText,
		}: {
			reviewId: string;
			responseText: string;
		}) => mockSubmitBusinessResponse(reviewId, responseText),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customerReviews"] });
			setShowBusinessResponseForm(null);
		},
		onError: (err) => {
			console.error("Failed to submit business response:", err);
		},
	});

	const filteredAndSortedReviews = React.useMemo(() => {
		if (!reviews) return [];

		let filtered = reviews;

		if (filterRating !== null) {
			filtered = filtered.filter((review) => review.rating === filterRating);
		}

		filtered.sort((a, b) => {
			if (sortBy === "newest") {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			} else if (sortBy === "highest") {
				return b.rating - a.rating;
			} else if (sortBy === "lowest") {
				return a.rating - b.rating;
			} else if (sortBy === "most-helpful") {
				return b.helpfulVotes - a.helpfulVotes;
			}
			return 0;
		});

		return filtered;
	}, [reviews, filterRating, sortBy]);

	const handleVote = (reviewId: string, type: "helpful" | "unhelpful") => {
		voteMutation.mutate({ reviewId, type });
	};

	const handleBusinessResponseSubmit = (
		reviewId: string,
		responseText: string
	) => {
		businessResponseMutation.mutate({ reviewId, responseText });
	};

	if (isLoading) {
		return (
			<section className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
						Customer Reviews
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="bg-ds-neutral-lightGray/20 rounded-lg p-8 space-y-4"
							>
								<div className="h-6 bg-ds-neutral-lightGray rounded w-3/4" />
								<div className="h-4 bg-ds-neutral-lightGray rounded w-1/2" />
								<div className="h-24 bg-ds-neutral-lightGray rounded w-full" />
								<div className="h-8 bg-ds-neutral-lightGray rounded w-full" />
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="py-20 bg-ds-neutral-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-8">
						Customer Reviews
					</h2>
					<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg">
						<p className="mb-4">Failed to load reviews: {error?.message}</p>
						<button
							onClick={() =>
								queryClient.invalidateQueries({ queryKey: ["customerReviews"] })
							}
							className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal text-center mb-8">
					Customer Reviews
				</h2>
				<p className="text-lg text-ds-neutral-mediumGray text-center max-w-3xl mx-auto mb-20">
					Read what our customers have to say about their experience with our
					paints and services.
				</p>

				{/* Filters and Sort */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
					<div className="flex items-center space-x-4">
						<span className="text-ds-neutral-darkSlate font-medium">
							Filter by Rating:
						</span>
						{[5, 4, 3, 2, 1].map((rating) => (
							<button
								key={rating}
								onClick={() =>
									setFilterRating(filterRating === rating ? null : rating)
								}
								className={cn(
									"flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
									filterRating === rating
										? "bg-ds-primary-sage text-ds-neutral-white"
										: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
								)}
								aria-label={`Filter by ${rating} stars`}
							>
								<span>{rating}</span>
								<Star className="w-4 h-4" />
							</button>
						))}
					</div>

					<div className="flex items-center space-x-4">
						<span className="text-ds-neutral-darkSlate font-medium">
							Sort by:
						</span>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
							className="px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							aria-label="Sort reviews by"
						>
							<option value="newest">Newest</option>
							<option value="highest">Highest Rated</option>
							<option value="lowest">Lowest Rated</option>
							<option value="most-helpful">Most Helpful</option>
						</select>
					</div>
				</div>

				{/* Reviews Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredAndSortedReviews.length === 0 ? (
						<div className="lg:col-span-3 text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
							<MessageSquare className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
							<p className="text-lg font-semibold text-ds-primary-charcoal">
								No reviews match your criteria.
							</p>
							<p className="text-ds-neutral-mediumGray">
								Try adjusting your filters or be the first to leave a review!
							</p>
						</div>
					) : (
						filteredAndSortedReviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								onVote={handleVote}
								onToggleBusinessResponseForm={() =>
									setShowBusinessResponseForm(
										showBusinessResponseForm === review.id ? null : review.id
									)
								}
								showBusinessResponseForm={
									showBusinessResponseForm === review.id
								}
								onBusinessResponseSubmit={handleBusinessResponseSubmit}
								isSubmittingResponse={businessResponseMutation.isPending}
								isVoting={voteMutation.isPending}
								// Mocking business owner status for demonstration
								isBusinessOwner={true}
							/>
						))
					)}
				</div>
			</div>
		</section>
	);
};
