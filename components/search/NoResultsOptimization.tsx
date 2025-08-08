"use client";

import React, { useState } from "react";
import {
	Search,
	Lightbulb,
	TrendingUp,
	Mail,
	MessageCircle,
	ArrowRight,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NoResultsOptimizationProps {
	searchQuery: string;
	appliedFilters: any;
	onSuggestionClick: (query: string) => void;
	onClearFilters: () => void;
	onContactSupport: () => void;
}

export const NoResultsOptimization: React.FC<NoResultsOptimizationProps> = ({
	searchQuery,
	appliedFilters,
	onSuggestionClick,
	onClearFilters,
	onContactSupport,
}) => {
	const [emailSubmitted, setEmailSubmitted] = useState(false);
	const [email, setEmail] = useState("");

	const hasFilters = Object.values(appliedFilters).some((filter: any) =>
		Array.isArray(filter) ? filter.length > 0 : filter
	);

	const suggestions = [
		{
			type: "spelling",
			title: "Check Your Spelling",
			suggestions: [
				'Try "sage green" instead of "sage grean"',
				'Try "exterior" instead of "exterier"',
				'Try "primer" instead of "primmer"',
			],
		},
		{
			type: "broader",
			title: "Try Broader Terms",
			suggestions: [
				searchQuery.includes("sage green") ? "green paint" : "paint",
				searchQuery.includes("bathroom") ? "interior paint" : "paint",
				searchQuery.includes("exterior") ? "outdoor paint" : "paint",
			],
		},
		{
			type: "alternatives",
			title: "Similar Products",
			suggestions: [
				"interior latex paint",
				"exterior acrylic paint",
				"primer and sealer",
				"specialty coatings",
			],
		},
	];

	const popularAlternatives = [
		{ query: "sage green paint", category: "Color", count: "1,250 results" },
		{ query: "bathroom paint", category: "Room", count: "890 results" },
		{
			query: "exterior white paint",
			category: "Color",
			count: "2,100 results",
		},
		{ query: "zero VOC paint", category: "Feature", count: "650 results" },
		{
			query: "kitchen cabinet paint",
			category: "Application",
			count: "1,450 results",
		},
		{ query: "primer for walls", category: "Product", count: "780 results" },
	];

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			// In production, this would send to your API
			console.log("Notify when available:", { email, searchQuery });
			setEmailSubmitted(true);
			setTimeout(() => setEmailSubmitted(false), 3000);
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Main No Results Message */}
			<div className="text-center py-12">
				<Search className="w-24 h-24 text-ds-neutral-lightGray mx-auto mb-6" />
				<h2 className="text-3xl font-bold text-ds-primary-charcoal mb-4">
					No Results Found
				</h2>

				<p className="text-lg text-ds-neutral-mediumGray mb-6">
					{`We couldn't find any products matching "${searchQuery}"${
						hasFilters ? " with your current filters" : ""
					}`}
				</p>

				{hasFilters && (
					<button
						onClick={onClearFilters}
						className="inline-flex items-center space-x-2 px-6 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
						aria-label="Clear all filters to see more results"
					>
						<X className="w-5 h-5" />
						<span>Clear All Filters</span>
					</button>
				)}
			</div>

			{/* Search Suggestions */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{suggestions.map((section, index) => (
					<div
						key={index}
						className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6"
					>
						<div className="flex items-center space-x-2 mb-4">
							<Lightbulb className="w-5 h-5 text-ds-primary-sage" />
							<h3 className="font-semibold text-ds-primary-charcoal">
								{section.title}
							</h3>
						</div>
						<ul className="space-y-2">
							{section.suggestions.map((suggestion, suggestionIndex) => (
								<li key={suggestionIndex}>
									<button
										onClick={() => onSuggestionClick(suggestion)}
										className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-left"
										aria-label={`Search for ${suggestion}`}
									>
										• {suggestion}
									</button>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Popular Alternatives */}
			<div>
				<div className="flex items-center space-x-2 mb-6">
					<TrendingUp className="w-6 h-6 text-ds-primary-sage" />
					<h3 className="text-xl font-bold text-ds-primary-charcoal">
						Popular Searches
					</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{popularAlternatives.map((alternative, index) => (
						<button
							key={index}
							onClick={() => onSuggestionClick(alternative.query)}
							className="flex items-center justify-between p-4 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
							aria-label={`Search for ${alternative.query}`}
						>
							<div>
								<span className="font-medium text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
									{alternative.query}
								</span>
								<div className="flex items-center space-x-2 mt-1">
									<span className="text-xs bg-ds-neutral-lightGray/50 text-ds-neutral-mediumGray px-2 py-1 rounded-full">
										{alternative.category}
									</span>
									<span className="text-xs text-ds-neutral-mediumGray">
										{alternative.count}
									</span>
								</div>
							</div>
							<ArrowRight className="w-5 h-5 text-ds-neutral-mediumGray group-hover:text-ds-primary-sage transition-colors duration-200" />
						</button>
					))}
				</div>
			</div>

			{/* Notify When Available */}
			<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-6">
				<div className="flex items-center space-x-2 mb-4">
					<Mail className="w-5 h-5 text-ds-accent-warmBrown" />
					<h3 className="font-semibold text-ds-primary-charcoal">
						Notify Me When Available
					</h3>
				</div>
				<p className="text-sm text-ds-neutral-mediumGray mb-4">
					Can&apos;t find what you&apos;re looking for? We&apos;ll let you know
					when we have products that match your search.
				</p>

				{emailSubmitted ? (
					<div className="flex items-center space-x-2 text-green-600">
						<span className="text-sm font-medium">
							✓ We&apos;ll notify you when we have matching products!
						</span>
					</div>
				) : (
					<form onSubmit={handleEmailSubmit} className="flex space-x-3">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="flex-1 px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							required
							aria-label="Email for product notifications"
						/>
						<button
							type="submit"
							className="px-6 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
							aria-label="Subscribe to notifications"
						>
							Notify Me
						</button>
					</form>
				)}
			</div>

			{/* Contact Support */}
			<div className="text-center">
				<p className="text-ds-neutral-mediumGray mb-4">
					Still can&apos;t find what you need?
				</p>
				<button
					onClick={onContactSupport}
					className="inline-flex items-center space-x-2 px-6 py-3 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium"
					aria-label="Contact customer support"
				>
					<MessageCircle className="w-5 h-5" />
					<span>Contact Our Paint Experts</span>
				</button>
			</div>
		</div>
	);
};
