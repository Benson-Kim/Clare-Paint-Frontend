"use client";

import React from "react";
import { FAQCategory } from "@/types/faq";
import { cn } from "@/lib/utils";

interface FAQCategoryFilterProps {
	selectedCategory: FAQCategory;
	onSelectCategory: (category: FAQCategory) => void;
}

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
	selectedCategory,
	onSelectCategory,
}) => {
	const categories: { id: FAQCategory; label: string }[] = [
		{ id: "all", label: "All Questions" },
		{ id: "product_questions", label: "Product Questions" },
		{ id: "shipping_returns", label: "Shipping & Returns" },
		{ id: "color_matching", label: "Color Matching Help" },
		{ id: "technical_support", label: "Technical Support" },
	];

	return (
		<div className="flex flex-wrap justify-center gap-2 mb-20">
			{categories.map((category) => (
				<button
					key={category.id}
					onClick={() => onSelectCategory(category.id)}
					className={cn(
						"px-8 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
						selectedCategory === category.id
							? "bg-ds-primary-sage text-ds-neutral-white"
							: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
					)}
					aria-pressed={selectedCategory === category.id}
					aria-label={`Filter by ${category.label} category`}
				>
					{category.label}
				</button>
			))}
		</div>
	);
};
