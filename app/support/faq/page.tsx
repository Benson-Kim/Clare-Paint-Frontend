"use client";

import React, { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchFAQs } from "@/lib/api";
import { FAQItem, FAQCategory } from "@/types/faq";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { FAQCategoryFilter } from "@/components/faq/FAQCategoryFilter";
import { FAQList } from "@/components/faq/FAQList";
import { ContactEscalation } from "@/components/faq/ContactEscalation";
import { Loader2, AlertCircle } from "lucide-react";

export default function FAQPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<FAQCategory>("all");

	// Ref to scroll to when a related question is clicked
	const faqListRef = useRef<HTMLDivElement>(null);

	const {
		data: faqs,
		isLoading,
		isError,
		error,
	} = useQuery<FAQItem[], Error>({
		queryKey: ["faqs", searchQuery, selectedCategory],
		queryFn: () => mockFetchFAQs(searchQuery, selectedCategory),
	});

	const handleRelatedQuestionClick = useCallback(
		(faqId: string) => {
			// Set search query to the question of the clicked FAQ
			const clickedFaq = faqs?.find((faq) => faq.id === faqId);
			if (clickedFaq) {
				setSearchQuery(clickedFaq.question);
				setSelectedCategory("all"); // Clear category filter
				// Scroll to the top of the FAQ list
				faqListRef.current?.scrollIntoView({ behavior: "smooth" });
			}
		},
		[faqs]
	);

	return (
		<div className="min-h-screen bg-ds-primary-cream">
			<FAQHero />
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<FAQSearch onSearch={setSearchQuery} initialQuery={searchQuery} />
				<FAQCategoryFilter
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>

				<div ref={faqListRef}>
					{isLoading ? (
						<div className="text-center p-8 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm">
							<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
							<p className="text-ds-neutral-mediumGray">Loading FAQs...</p>
						</div>
					) : isError ? (
						<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg space-y-4 text-center">
							<AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
							<h3 className="text-2xl font-bold text-ds-primary-charcoal">
								Error Loading FAQs
							</h3>
							<p className="text-sm">
								{error?.message ||
									"Failed to load frequently asked questions. Please try again."}
							</p>
							<button
								onClick={() => window.location.reload()}
								className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
							>
								Try Again
							</button>
						</div>
					) : (
						<FAQList
							faqs={faqs || []}
							onRelatedQuestionClick={handleRelatedQuestionClick}
						/>
					)}
				</div>

				<ContactEscalation />
			</div>
		</div>
	);
}
