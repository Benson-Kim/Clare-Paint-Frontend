"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCategoryPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalResults: number;
}

export const ProductCategoryPagination: React.FC<
	ProductCategoryPaginationProps
> = ({ currentPage, totalPages, onPageChange, totalResults }) => {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="space-y-6">
			{/* Results Summary */}
			<div className="text-center text-sm text-gray-600">
				Showing {(currentPage - 1) * 12 + 1}-
				{Math.min(currentPage * 12, totalResults)} of {totalResults} products
			</div>

			{/* Pagination Controls */}
			<nav
				className="flex items-center justify-center space-x-2"
				aria-label="Pagination"
			>
				{/* Previous Button */}
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={cn(
						"flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200",
						currentPage === 1
							? "border-gray-200 text-gray-400 cursor-not-allowed"
							: "border-gray-300 text-gray-700 hover:border-ds-primary-sage hover:text-ds-primary-sage hover:bg-ds-primary-sage/5"
					)}
					aria-label="Go to previous page"
				>
					<ChevronLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Previous</span>
				</button>

				{/* Page Numbers */}
				<div className="flex items-center space-x-1">
					{visiblePages.map((page, index) => {
						if (page === "...") {
							return (
								<span
									key={`dots-${index}`}
									className="px-3 py-2 text-gray-500"
									aria-hidden="true"
								>
									...
								</span>
							);
						}

						const pageNumber = page as number;
						const isCurrentPage = pageNumber === currentPage;

						return (
							<button
								key={pageNumber}
								onClick={() => onPageChange(pageNumber)}
								className={cn(
									"px-4 py-2 rounded-lg border transition-all duration-200 min-w-[44px] font-medium",
									isCurrentPage
										? "border-ds-primary-sage bg-ds-primary-sage text-ds-neutral-white shadow-sm"
										: "border-gray-300 text-gray-700 hover:border-ds-primary-sage hover:text-ds-primary-sage hover:bg-ds-primary-sage/5"
								)}
								aria-label={`Go to page ${pageNumber}`}
								aria-current={isCurrentPage ? "page" : undefined}
							>
								{pageNumber}
							</button>
						);
					})}
				</div>

				{/* Next Button */}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={cn(
						"flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200",
						currentPage === totalPages
							? "border-gray-200 text-gray-400 cursor-not-allowed"
							: "border-gray-300 text-gray-700 hover:border-ds-primary-sage hover:text-ds-primary-sage hover:bg-ds-primary-sage/5"
					)}
					aria-label="Go to next page"
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="w-4 h-4" />
				</button>
			</nav>

			{/* Jump to Page */}
			{totalPages > 10 && (
				<div className="flex items-center justify-center space-x-2 text-sm">
					<span className="text-gray-600">Jump to page:</span>
					<input
						type="number"
						min={1}
						max={totalPages}
						value={currentPage}
						onChange={(e) => {
							const page = Number(e.target.value);
							if (page >= 1 && page <= totalPages) {
								onPageChange(page);
							}
						}}
						className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
						aria-label="Jump to specific page"
					/>
					<span className="text-gray-600">of {totalPages}</span>
				</div>
			)}
		</div>
	);
};
