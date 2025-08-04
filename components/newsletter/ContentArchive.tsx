"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockFetchContentArchive } from "@/lib/api";
import { ContentArchiveItem } from "@/types/newsletter";
import { Archive, Calendar, Tag, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const ContentArchive: React.FC = () => {
	const [filterCategory, setFilterCategory] = useState<string | null>(null);

	const {
		data: archiveItems,
		isLoading,
		isError,
		error,
	} = useQuery<ContentArchiveItem[], Error>({
		queryKey: ["contentArchive", filterCategory],
		queryFn: () =>
			mockFetchContentArchive({ category: filterCategory || undefined }),
	});

	const categories = [
		{ id: "all", label: "All Categories" },
		{ id: "interior_paint", label: "Interior Paint" },
		{ id: "exterior_paint", label: "Exterior Paint" },
		{ id: "color_trends", label: "Color Trends" },
		{ id: "diy_tips", label: "DIY Tips & Guides" },
		{ id: "promotions", label: "Promotions" },
	];

	if (isLoading) {
		return (
			<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8 text-center">
				<Loader2 className="w-12 h-12 animate-spin text-ds-primary-sage mx-auto mb-4" />
				<p className="text-ds-neutral-mediumGray">Loading content archive...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg space-y-4 text-center">
				<AlertCircle className="w-16 h-16 text-red-600 mx-auto" />
				<h3 className="text-2xl font-bold text-ds-primary-charcoal">
					Error Loading Archive
				</h3>
				<p className="text-sm">
					{error?.message ||
						"Failed to load content archive. Please try again."}
				</p>
				<button
					onClick={() => window.location.reload()}
					className="px-8 py-2 bg-red-600 text-ds-neutral-white rounded-lg hover:bg-red-700 transition-colors duration-200"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm p-8">
			<h2 className="text-2xl font-bold text-ds-primary-charcoal mb-8 text-center">
				Newsletter Content Archive
			</h2>
			<p className="text-ds-neutral-mediumGray mb-8 text-center">
				Browse past newsletters and catch up on all our inspiring content.
			</p>

			<div className="mb-8 flex flex-wrap gap-2 justify-center">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() =>
							setFilterCategory(category.id === "all" ? null : category.id)
						}
						className={cn(
							"px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
							filterCategory === category.id ||
								(filterCategory === null && category.id === "all")
								? "bg-ds-primary-sage text-ds-neutral-white"
								: "bg-ds-neutral-lightGray text-ds-neutral-mediumGray hover:bg-ds-neutral-lightGray/50"
						)}
						aria-label={`Filter by ${category.label}`}
					>
						{category.label}
					</button>
				))}
			</div>

			{archiveItems && archiveItems.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{archiveItems.map((item) => (
						<a
							key={item.id}
							href={item.contentUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="block bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 group"
							aria-label={`Read ${item.title}`}
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={item.imageUrl}
									alt={item.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
							</div>
							<div className="p-4">
								<h3 className="font-bold text-ds-primary-charcoal mb-2 group-hover:text-ds-primary-sage transition-colors duration-200 line-clamp-2">
									{item.title}
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4 line-clamp-3">
									{item.description}
								</p>
								<div className="flex items-center justify-between text-xs text-ds-neutral-mediumGray">
									<div className="flex items-center space-x-2">
										<Calendar className="w-3 h-3" />
										<span>
											{format(new Date(item.publishDate), "MMM dd, yyyy")}
										</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{item.categories.map((cat, idx) => (
											<span
												key={idx}
												className="bg-ds-neutral-lightGray/50 text-ds-neutral-darkSlate px-2 py-2 rounded-full"
											>
												{cat.replace(/_/g, " ")}
											</span>
										))}
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			) : (
				<div className="text-center p-8 bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg">
					<Archive className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
					<p className="text-lg font-semibold text-ds-primary-charcoal">
						No archive items found for this category.
					</p>
					<p className="text-ds-neutral-mediumGray">
						Please try a different filter.
					</p>
				</div>
			)}
		</div>
	);
};
