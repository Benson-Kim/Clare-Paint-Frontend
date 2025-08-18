"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCategorySortProps {
	currentSort: string;
	onSortChange: (sort: string) => void;
}

interface SortOption {
	value: string;
	label: string;
	description?: string;
}

const sortOptions: SortOption[] = [
	{ value: "featured", label: "Featured", description: "Our top picks" },
	{ value: "newest", label: "Newest", description: "Latest additions" },
	{
		value: "popular",
		label: "Most Popular",
		description: "Customer favorites",
	},
	{
		value: "price-low",
		label: "Price: Low to High",
		description: "Budget friendly first",
	},
	{
		value: "price-high",
		label: "Price: High to Low",
		description: "Premium first",
	},
	{
		value: "rating",
		label: "Highest Rated",
		description: "Best reviews first",
	},
	{ value: "name", label: "Name A-Z", description: "Alphabetical order" },
	{
		value: "coverage",
		label: "Best Coverage",
		description: "Most coverage per gallon",
	},
];

export const ProductCategorySort: React.FC<ProductCategorySortProps> = ({
	currentSort,
	onSortChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const currentOption =
		sortOptions.find((option) => option.value === currentSort) ||
		sortOptions[0];

	const handleSortChange = (value: string) => {
		onSortChange(value);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-ds-neutral-white hover:bg-gray-50 transition-colors duration-200 min-w-[200px] justify-between"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label="Sort products"
			>
				<div className="text-left">
					<span className="text-sm font-medium text-gray-700">
						Sort: {currentOption.label}
					</span>
					{currentOption.description && (
						<p className="text-xs text-gray-500">{currentOption.description}</p>
					)}
				</div>
				<ChevronDown
					className={cn(
						"w-4 h-4 text-gray-500 transition-transform duration-200",
						isOpen && "rotate-180"
					)}
				/>
			</button>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>

					{/* Dropdown */}
					<div className="absolute top-full left-0 right-0 mt-2 bg-ds-neutral-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
						<div className="py-2" role="listbox">
							{sortOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => handleSortChange(option.value)}
									className={cn(
										"w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200",
										currentSort === option.value &&
											"bg-ds-primary-sage/10 text-ds-primary-sage"
									)}
									role="option"
									aria-selected={currentSort === option.value}
								>
									<div className="font-medium">{option.label}</div>
									{option.description && (
										<div className="text-xs text-gray-500 mt-1">
											{option.description}
										</div>
									)}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
