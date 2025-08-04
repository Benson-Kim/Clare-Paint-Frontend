"use client";

import React from "react";
import { FAQItem } from "@/types/faq";
import { FAQItem as SingleFAQItem } from "./FAQItem"; // Renamed to avoid conflict
import { Frown } from "lucide-react";

interface FAQListProps {
	faqs: FAQItem[];
	onRelatedQuestionClick: (faqId: string) => void;
}

export const FAQList: React.FC<FAQListProps> = ({
	faqs,
	onRelatedQuestionClick,
}) => {
	if (faqs.length === 0) {
		return (
			<div className="text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
				<Frown className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
				<p className="text-lg font-semibold text-ds-primary-charcoal">
					No FAQs found.
				</p>
				<p className="text-ds-neutral-mediumGray">
					Try a different search term or category.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{faqs.map((faq) => (
				<SingleFAQItem
					key={faq.id}
					faq={faq}
					onRelatedQuestionClick={onRelatedQuestionClick}
				/>
			))}
		</div>
	);
};
