"use client";

import React from "react";
import { X, Bookmark, Trash2, Clock, Filter, Search } from "lucide-react";

interface SavedSearch {
	id: string;
	name: string;
	query: string;
	filters: any;
	createdAt: string;
	lastUsed?: string;
	resultCount: number;
}

interface SavedSearchesProps {
	savedSearches: SavedSearch[];
	onClose: () => void;
	onLoadSearch: (search: SavedSearch) => void;
	onDeleteSearch: (searchId: string) => void;
}

export const SavedSearches: React.FC<SavedSearchesProps> = ({
	savedSearches,
	onClose,
	onLoadSearch,
	onDeleteSearch,
}) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const getFilterSummary = (filters: any) => {
		const parts = [];
		if (filters.categories?.length)
			parts.push(`${filters.categories.length} categories`);
		if (filters.colorFamilies?.length)
			parts.push(`${filters.colorFamilies.length} colors`);
		if (filters.roomTypes?.length)
			parts.push(`${filters.roomTypes.length} rooms`);
		if (filters.priceRange)
			parts.push(`$${filters.priceRange[0]}-$${filters.priceRange[1]}`);
		if (filters.inStockOnly) parts.push("in stock only");
		return parts.join(", ") || "No filters";
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="saved-searches-title"
		>
			<div className="bg-ds-neutral-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-ds-neutral-lightGray">
					<div className="flex items-center space-x-3">
						<Bookmark className="w-6 h-6 text-ds-primary-sage" />
						<h2
							id="saved-searches-title"
							className="text-2xl font-bold text-ds-primary-charcoal"
						>
							Saved Searches
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
						aria-label="Close saved searches"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6">
					{savedSearches.length === 0 ? (
						<div className="text-center py-12">
							<Bookmark className="w-16 h-16 text-ds-neutral-lightGray mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
								No Saved Searches
							</h3>
							<p className="text-ds-neutral-mediumGray">
								Save your searches to quickly access them later.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{savedSearches.map((search) => (
								<div
									key={search.id}
									className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-2 mb-2">
												<h3 className="font-semibold text-ds-primary-charcoal">
													{search.name}
												</h3>
												<span className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded-full">
													{search.resultCount} results
												</span>
											</div>

											{search.query && (
												<div className="flex items-center space-x-2 mb-2">
													<Search className="w-4 h-4 text-ds-neutral-mediumGray" />
													<span className="text-sm text-ds-neutral-darkSlate">
														{`"${search.query}"`}
													</span>
												</div>
											)}

											<div className="flex items-center space-x-2 mb-3">
												<Filter className="w-4 h-4 text-ds-neutral-mediumGray" />
												<span className="text-sm text-ds-neutral-mediumGray">
													{getFilterSummary(search.filters)}
												</span>
											</div>

											<div className="flex items-center space-x-4 text-xs text-ds-neutral-mediumGray">
												<div className="flex items-center space-x-1">
													<Clock className="w-3 h-3" />
													<span>
														Created{" "}
														{new Date(search.createdAt).toLocaleDateString()}
													</span>
												</div>
												{search.lastUsed && (
													<div className="flex items-center space-x-1">
														<Clock className="w-3 h-3" />
														<span>
															Last used{" "}
															{new Date(search.lastUsed).toLocaleDateString()}
														</span>
													</div>
												)}
											</div>
										</div>

										<div className="flex items-center space-x-2">
											<button
												onClick={() => onLoadSearch(search)}
												className="px-4 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium"
												aria-label={`Load search: ${search.name}`}
											>
												Load Search
											</button>
											<button
												onClick={() => onDeleteSearch(search.id)}
												className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
												aria-label={`Delete search: ${search.name}`}
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
