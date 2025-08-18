"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SortOption } from "@/app/products/page";
import { cn } from "@/lib/utils";

interface ProductSortProps {
	currentSort: string;
	onSortChange: (sort: string) => void;
}

const sortOptions: SortOption[] = [
	{ value: "featured", label: "Featured" },
	{ value: "newest", label: "Newest" },
	{ value: "popular", label: "Most Popular" },
	{ value: "price-low", label: "Price: Low to High" },
	{ value: "price-high", label: "Price: High to Low" },
	{ value: "rating", label: "Highest Rated" },
	{ value: "durability", label: "Durability" },
	{ value: "name", label: "Name A-Z" },
];

export const ProductSort: React.FC<ProductSortProps> = ({
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
				className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 min-w-[180px] justify-between"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label="Sort products"
			>
				<span className="text-sm font-medium text-gray-700">
					Sort: {currentOption.label}
				</span>
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
					<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
						<div className="py-2" role="listbox">
							{sortOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => handleSortChange(option.value)}
									className={cn(
										"w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200",
										currentSort === option.value &&
											"bg-ds-primary-sage/10 text-ds-primary-sage font-medium"
									)}
									role="option"
									aria-selected={currentSort === option.value}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
