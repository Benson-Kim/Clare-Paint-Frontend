"use client";

import React from "react";
import { TrendingUp, Clock, Palette, Home } from "lucide-react";

interface SearchSuggestionsProps {
	onSuggestionClick: (query: string) => void;
	searchHistory: string[];
	onClearHistory: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
	onSuggestionClick,
	searchHistory,
	onClearHistory,
}) => {
	const trendingSearches = [
		"sage green paint",
		"bathroom paint",
		"zero VOC paint",
		"exterior white paint",
		"kitchen cabinet paint",
		"bedroom colors",
		"living room paint",
		"primer for walls",
	];

	const popularColors = [
		{ name: "Sage Whisper", hex: "#5B7B7A" },
		{ name: "Warm Cream", hex: "#F5F5DC" },
		{ name: "Charcoal Depth", hex: "#2C2C2C" },
		{ name: "Classic White", hex: "#FFFFFF" },
		{ name: "Soft Gray", hex: "#D3D3D3" },
		{ name: "Warm Beige", hex: "#C4A57B" },
	];

	const roomSuggestions = [
		{ name: "Living Room", icon: <Home className="w-4 h-4" /> },
		{ name: "Bedroom", icon: <Home className="w-4 h-4" /> },
		{ name: "Kitchen", icon: <Home className="w-4 h-4" /> },
		{ name: "Bathroom", icon: <Home className="w-4 h-4" /> },
	];

	return (
		<div className="space-y-8">
			{/* Recent Searches */}
			{searchHistory.length > 0 && (
				<div>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal flex items-center space-x-2">
							<Clock className="w-5 h-5 text-ds-neutral-mediumGray" />
							<span>Recent Searches</span>
						</h3>
						<button
							onClick={onClearHistory}
							className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
							aria-label="Clear search history"
						>
							Clear All
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{searchHistory.slice(0, 8).map((query, index) => (
							<button
								key={index}
								onClick={() => onSuggestionClick(query)}
								className="px-4 py-2 bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate rounded-lg hover:bg-ds-primary-sage/10 hover:text-ds-primary-sage transition-colors duration-200 text-sm"
								aria-label={`Search for ${query}`}
							>
								{query}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Trending Searches */}
			<div>
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
					<TrendingUp className="w-5 h-5 text-ds-primary-sage" />
					<span>Trending Searches</span>
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{trendingSearches.map((query, index) => (
						<button
							key={index}
							onClick={() => onSuggestionClick(query)}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
							aria-label={`Search for ${query}`}
						>
							<div className="flex items-center space-x-2">
								<TrendingUp className="w-4 h-4 text-ds-primary-sage" />
								<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal">
									{query}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Popular Colors */}
			<div>
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
					<Palette className="w-5 h-5 text-ds-primary-sage" />
					<span>Popular Colors</span>
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
					{popularColors.map((color, index) => (
						<button
							key={index}
							onClick={() => onSuggestionClick(color.name)}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
							aria-label={`Search for ${color.name}`}
						>
							<div className="flex items-center space-x-3">
								<div
									className="w-6 h-6 rounded-full border border-ds-neutral-lightGray"
									style={{ backgroundColor: color.hex }}
								/>
								<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal">
									{color.name}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Room Suggestions */}
			<div>
				<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
					<Home className="w-5 h-5 text-ds-primary-sage" />
					<span>Shop by Room</span>
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{roomSuggestions.map((room, index) => (
						<button
							key={index}
							onClick={() =>
								onSuggestionClick(`${room.name.toLowerCase()} paint`)
							}
							className="p-3 bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg hover:border-ds-primary-sage hover:bg-ds-primary-sage/5 transition-colors duration-200 text-left group"
							aria-label={`Search for ${room.name} paint`}
						>
							<div className="flex items-center space-x-2">
								<div className="text-ds-primary-sage">{room.icon}</div>
								<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal">
									{room.name}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
