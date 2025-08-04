"use client";

import React, { useState } from "react";
import { FAQItem as FAQItemType } from "@/types/faq";
import {
	ChevronDown,
	ChevronUp,
	ThumbsUp,
	ThumbsDown,
	Lightbulb,
} from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { mockVoteFAQ, mockFetchFAQs } from "@/lib/api"; // Import mockFetchFAQs to get related questions

interface FAQItemProps {
	faq: FAQItemType;
	onRelatedQuestionClick: (faqId: string) => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
	faq,
	onRelatedQuestionClick,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const queryClient = useQueryClient();

	const voteMutation = useMutation({
		mutationFn: ({
			faqId,
			type,
		}: {
			faqId: string;
			type: "helpful" | "unhelpful";
		}) => mockVoteFAQ(faqId, type),
		onMutate: async ({ faqId, type }) => {
			// Optimistically update the cache
			await queryClient.cancelQueries({ queryKey: ["faqs"] });
			const previousFAQs = queryClient.getQueryData<FAQItemType[]>(["faqs"]);
			queryClient.setQueryData<FAQItemType[]>(["faqs"], (old) =>
				old
					? old.map((f) =>
							f.id === faqId
								? {
										...f,
										helpfulVotes:
											type === "helpful" ? f.helpfulVotes + 1 : f.helpfulVotes,
										unhelpfulVotes:
											type === "unhelpful"
												? f.unhelpfulVotes + 1
												: f.unhelpfulVotes,
								  }
								: f
					  )
					: []
			);
			return { previousFAQs };
		},
		onError: (err, { faqId }, context) => {
			// Rollback on error
			queryClient.setQueryData(["faqs"], context?.previousFAQs);
			console.error("Failed to vote:", err);
		},
		onSettled: () => {
			// Invalidate to refetch and ensure consistency
			queryClient.invalidateQueries({ queryKey: ["faqs"] });
		},
	});

	const handleVote = (type: "helpful" | "unhelpful") => {
		voteMutation.mutate({ faqId: faq.id, type });
	};

	// Fetch all FAQs to find related questions
	const { data: allFAQs } = useQuery<FAQItemType[], Error>({
		queryKey: ["allFAQs"], // Use a separate query key for all FAQs
		queryFn: () => mockFetchFAQs(),
		staleTime: Infinity, // This data doesn't change often
	});

	const relatedQuestions =
		allFAQs?.filter((item) => faq.relatedQuestions.includes(item.id)) || [];

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden">
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="w-full flex items-center justify-between p-8 text-left font-semibold text-ds-primary-charcoal hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
				aria-expanded={isExpanded}
				aria-controls={`faq-answer-${faq.id}`}
				id={`faq-question-${faq.id}`}
			>
				<span>{faq.question}</span>
				{isExpanded ? (
					<ChevronUp className="w-5 h-5 text-ds-neutral-mediumGray" />
				) : (
					<ChevronDown className="w-5 h-5 text-ds-neutral-mediumGray" />
				)}
			</button>

			{isExpanded && (
				<div
					id={`faq-answer-${faq.id}`}
					role="region"
					aria-labelledby={`faq-question-${faq.id}`}
					className="p-8 border-t border-ds-neutral-lightGray"
				>
					<p className="text-ds-neutral-darkSlate mb-8">{faq.answer}</p>

					{/* Helpfulness Voting */}
					<div className="flex items-center justify-between border-t border-ds-neutral-lightGray pt-4">
						<span className="text-sm text-ds-neutral-mediumGray">
							Was this helpful?
						</span>
						<div className="flex items-center space-x-2">
							<button
								onClick={() => handleVote("helpful")}
								disabled={voteMutation.isPending}
								className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
								aria-label={`Vote helpful for this answer. Current helpful votes: ${faq.helpfulVotes}`}
							>
								<ThumbsUp className="w-4 h-4" />
								<span>{faq.helpfulVotes}</span>
							</button>
							<button
								onClick={() => handleVote("unhelpful")}
								disabled={voteMutation.isPending}
								className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-ds-neutral-lightGray/50 transition-colors duration-200"
								aria-label={`Vote unhelpful for this answer. Current unhelpful votes: ${faq.unhelpfulVotes}`}
							>
								<ThumbsDown className="w-4 h-4" />
								<span>{faq.unhelpfulVotes}</span>
							</button>
						</div>
					</div>

					{/* Related Questions */}
					{relatedQuestions.length > 0 && (
						<div className="mt-8 pt-8 border-t border-ds-neutral-lightGray">
							<h4 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
								<Lightbulb className="w-4 h-4 text-ds-primary-sage" />
								<span>Related Questions</span>
							</h4>
							<ul className="space-y-2">
								{relatedQuestions.map((relatedFaq) => (
									<li key={relatedFaq.id}>
										<button
											onClick={() => onRelatedQuestionClick(relatedFaq.id)}
											className="text-ds-primary-sage hover:underline text-sm text-left"
											aria-label={`Go to related question: ${relatedFaq.question}`}
										>
											{relatedFaq.question}
										</button>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
