"use client";

import React, { useState } from "react";
import { CustomerReview } from "@/types/reviews";
import {
	Star,
	CheckCircle,
	ThumbsUp,
	ThumbsDown,
	MessageSquare,
	Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ReviewCardProps {
	review: CustomerReview;
	onVote: (reviewId: string, type: "helpful" | "unhelpful") => void;
	onToggleBusinessResponseForm: (reviewId: string) => void;
	showBusinessResponseForm: boolean;
	onBusinessResponseSubmit: (reviewId: string, responseText: string) => void;
	isSubmittingResponse: boolean;
	isVoting: boolean;
	isBusinessOwner: boolean; // Mock prop to simulate business owner login
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
	review,
	onVote,
	onToggleBusinessResponseForm,
	showBusinessResponseForm,
	onBusinessResponseSubmit,
	isSubmittingResponse,
	isVoting,
	isBusinessOwner,
}) => {
	const [responseText, setResponseText] = useState("");

	const renderStars = (rating: number) => {
		return (
			<div className="flex items-center space-x-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<Star
						key={star}
						className={cn(
							"w-4 h-4",
							star <= rating
								? "text-yellow-400 fill-current"
								: "text-ds-neutral-lightGray"
						)}
					/>
				))}
			</div>
		);
	};

	const handleResponseSubmit = () => {
		if (responseText.trim()) {
			onBusinessResponseSubmit(review.id, responseText);
			setResponseText("");
		}
	};

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 flex flex-col">
			{/* Review Header */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-ds-primary-sage/10 rounded-full flex items-center justify-center text-ds-primary-sage font-bold">
						{review.userName.charAt(0).toUpperCase()}
					</div>
					<div>
						<p className="font-semibold text-ds-primary-charcoal">
							{review.userName}
						</p>
						<p className="text-xs text-ds-neutral-mediumGray">
							{review.userLocation}
						</p>
					</div>
				</div>
				{review.verifiedPurchase && (
					<div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
						<CheckCircle className="w-4 h-4" />
						<span>Verified Purchase</span>
					</div>
				)}
			</div>

			{/* Rating and Date */}
			<div className="flex items-center justify-between mb-4">
				{renderStars(review.rating)}
				<span className="text-sm text-ds-neutral-mediumGray">
					{format(new Date(review.date), "MMM dd, yyyy")}
				</span>
			</div>

			{/* Review Comment */}
			<p className="text-ds-neutral-darkSlate mb-4 flex-1">{review.comment}</p>

			{/* Review Photos */}
			{review.photos && review.photos.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					{review.photos.map((photo, index) => (
						<img
							key={index}
							src={photo}
							alt={`Review photo ${index + 1}`}
							className="w-20 h-20 object-cover rounded-lg border border-ds-neutral-lightGray"
							loading="lazy"
						/>
					))}
				</div>
			)}

			{/* Helpfulness Voting */}
			<div className="flex items-center space-x-8 text-sm text-ds-neutral-mediumGray mb-4 pt-4 border-t border-ds-neutral-lightGray">
				<span>Was this review helpful?</span>
				<div className="flex items-center space-x-2">
					<button
						onClick={() => handleVote(review.id, "helpful")}
						disabled={isVoting}
						className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
						aria-label={`Vote helpful for this review. Current helpful votes: ${review.helpfulVotes}`}
					>
						<ThumbsUp className="w-4 h-4" />
						<span>{review.helpfulVotes}</span>
					</button>
					<button
						onClick={() => handleVote(review.id, "unhelpful")}
						disabled={isVoting}
						className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
						aria-label={`Vote unhelpful for this review. Current unhelpful votes: ${review.unhelpfulVotes}`}
					>
						<ThumbsDown className="w-4 h-4" />
						<span>{review.unhelpfulVotes}</span>
					</button>
				</div>
			</div>

			{/* Business Response */}
			{review.businessResponse && (
				<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4 mt-4">
					<p className="font-semibold text-ds-primary-charcoal mb-2">
						Response from {review.businessResponse.responderName}
					</p>
					<p className="text-sm text-ds-neutral-darkSlate italic">
						{review.businessResponse.responseText}
					</p>
					<p className="text-xs text-ds-neutral-mediumGray text-right mt-2">
						{format(
							new Date(review.businessResponse.responseDate),
							"MMM dd, yyyy"
						)}
					</p>
				</div>
			)}

			{/* Business Owner Response Form (Conditional) */}
			{isBusinessOwner && !review.businessResponse && (
				<div className="mt-4">
					<button
						onClick={() => onToggleBusinessResponseForm(review.id)}
						className="w-full py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 text-sm font-medium"
						aria-label="Add a business response to this review"
					>
						{showBusinessResponseForm
							? "Cancel Response"
							: "Add Business Response"}
					</button>
					{showBusinessResponseForm && (
						<div className="mt-4 space-y-2">
							<textarea
								value={responseText}
								onChange={(e) => setResponseText(e.target.value)}
								placeholder="Type your response here..."
								rows={3}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent text-sm"
								aria-label="Business response text area"
							/>
							<button
								onClick={handleResponseSubmit}
								disabled={isSubmittingResponse || !responseText.trim()}
								className="w-full py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 disabled:bg-ds-neutral-lightGray disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2"
								aria-label="Submit business response"
							>
								{isSubmittingResponse ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<MessageSquare className="w-4 h-4" />
								)}
								<span>
									{isSubmittingResponse ? "Submitting..." : "Submit Response"}
								</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
