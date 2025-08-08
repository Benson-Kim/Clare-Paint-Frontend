"use client";

import React from "react";
import { X, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchRefinementsProps {
	searchQuery: string;
	totalResults: number;
	onRefinementClick: (query: string) => void;
	onClearSearch: () => void;
}

export const SearchRefinements: React.FC<SearchRefinementsProps> = ({
	searchQuery,
	totalResults,
	onRefinementClick,
	onClearSearch,
}) => {
	// Generate smart refinement suggestions based on search query
	const generateRefinements = (query: string) => {
		const refinements = [];

		// Color-based refinements
		if (query.toLowerCase().includes("green")) {
			refinements.push(
				{ text: "sage green paint", type: "color", icon: "🎨" },
				{ text: "forest green exterior", type: "color", icon: "🎨" },
				{ text: "mint green bathroom", type: "room", icon: "🏠" }
			);
		} else if (query.toLowerCase().includes("blue")) {
			refinements.push(
				{ text: "navy blue accent wall", type: "color", icon: "🎨" },
				{ text: "light blue bedroom", type: "room", icon: "🏠" },
				{ text: "coastal blue exterior", type: "color", icon: "🎨" }
			);
		} else if (query.toLowerCase().includes("white")) {
			refinements.push(
				{ text: "pure white trim", type: "application", icon: "🖌️" },
				{ text: "warm white interior", type: "room", icon: "🏠" },
				{ text: "antique white cabinets", type: "application", icon: "🖌️" }
			);
		}

		// Room-based refinements
		if (query.toLowerCase().includes("kitchen")) {
			refinements.push(
				{ text: "kitchen cabinet paint", type: "application", icon: "🖌️" },
				{ text: "kitchen wall colors", type: "color", icon: "🎨" },
				{ text: "kitchen backsplash paint", type: "application", icon: "🖌️" }
			);
		} else if (query.toLowerCase().includes("bathroom")) {
			refinements.push(
				{ text: "bathroom moisture resistant", type: "feature", icon: "💧" },
				{ text: "bathroom ceiling paint", type: "application", icon: "🖌️" },
				{ text: "bathroom vanity paint", type: "application", icon: "🖌️" }
			);
		}

		// Generic refinements if no specific matches
		if (refinements.length === 0) {
			refinements.push(
				{ text: `${query} interior`, type: "category", icon: "🏠" },
				{ text: `${query} exterior`, type: "category", icon: "🏠" },
				{ text: `${query} primer`, type: "category", icon: "🖌️" },
				{ text: `${query} semi-gloss`, type: "finish", icon: "✨" }
			);
		}

		return refinements.slice(0, 6);
	};

	const refinements = searchQuery ? generateRefinements(searchQuery) : [];

	const relatedSearches = [
		"best interior paint brands",
		"paint color trends 2024",
		"zero VOC paint options",
		"exterior paint for wood siding",
		"bathroom paint moisture resistant",
		"kitchen cabinet paint colors",
	];

	if (!searchQuery && totalResults === 0) {
		return null;
	}

	return (
		<div className="space-y-6">
			{/* Current Search */}
			{searchQuery && (
				<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<span className="text-sm text-ds-neutral-mediumGray">
								Searching for:
							</span>
							<span className="font-semibold text-ds-primary-charcoal">
								{`"${searchQuery}"`}
							</span>
							<span className="text-sm text-ds-neutral-mediumGray">
								({totalResults} results)
							</span>
						</div>
						<button
							onClick={onClearSearch}
							className="p-1 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
							aria-label="Clear search"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				</div>
			)}

			{/* Search Refinements */}
			{refinements.length > 0 && (
				<div>
					<div className="flex items-center space-x-2 mb-4">
						<Lightbulb className="w-5 h-5 text-ds-primary-sage" />
						<h3 className="font-semibold text-ds-primary-charcoal">
							Refine Your Search
						</h3>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{refinements.map((refinement, index) => (
							<button
								key={index}
								onClick={() => onRefinementClick(refinement.text)}
								className="flex items-center space-x-3 p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
								aria-label={`Search for ${refinement.text}`}
							>
								<span className="text-lg">{refinement.icon}</span>
								<div className="flex-1">
									<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal">
										{refinement.text}
									</span>
									<p className="text-xs text-ds-neutral-mediumGray capitalize">
										{refinement.type}
									</p>
								</div>
								<ArrowRight className="w-4 h-4 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
							</button>
						))}
					</div>
				</div>
			)}

			{/* Related Searches */}
			{!searchQuery && (
				<div>
					<div className="flex items-center space-x-2 mb-4">
						<TrendingUp className="w-5 h-5 text-ds-primary-sage" />
						<h3 className="font-semibold text-ds-primary-charcoal">
							Popular Searches
						</h3>
					</div>
					<div className="flex flex-wrap gap-2">
						{relatedSearches.map((search, index) => (
							<button
								key={index}
								onClick={() => onRefinementClick(search)}
								className="px-4 py-2 bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate rounded-lg hover:bg-ds-primary-sage/10 hover:text-ds-primary-sage transition-colors duration-200 text-sm"
								aria-label={`Search for ${search}`}
							>
								{search}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
