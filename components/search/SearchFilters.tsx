"use client";

import React, { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	X,
	Palette,
	Home,
	Droplets,
	DollarSign,
	Star,
	Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
	filters: any;
	onFilterChange: (filters: any) => void;
	onClearFilters: () => void;
	activeFilterCount: number;
}

interface FilterSectionProps {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
	title,
	icon,
	children,
	defaultOpen = true,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="border-b border-ds-neutral-lightGray pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full text-left mb-4 group"
				aria-expanded={isOpen}
			>
				<div className="flex items-center space-x-2">
					{icon && <div className="text-ds-primary-sage">{icon}</div>}
					<h3 className="font-semibold text-ds-primary-charcoal group-hover:text-ds-primary-sage transition-colors duration-200">
						{title}
					</h3>
				</div>
				{isOpen ? (
					<ChevronUp className="w-4 h-4 text-ds-neutral-mediumGray" />
				) : (
					<ChevronDown className="w-4 h-4 text-ds-neutral-mediumGray" />
				)}
			</button>
			{isOpen && <div className="space-y-3">{children}</div>}
		</div>
	);
};

export const SearchFilters: React.FC<SearchFiltersProps> = ({
	filters,
	onFilterChange,
	onClearFilters,
	activeFilterCount,
}) => {
	const categories = [
		{ id: "interior", name: "Interior Paint", count: 45 },
		{ id: "exterior", name: "Exterior Paint", count: 32 },
		{ id: "primer", name: "Primers", count: 18 },
		{ id: "specialty", name: "Specialty Coatings", count: 12 },
		{ id: "stain", name: "Wood Stains", count: 8 },
	];

	const colorFamilies = [
		{ id: "whites", name: "Whites & Creams", hex: "#FFFFFF", count: 25 },
		{ id: "grays", name: "Grays & Charcoals", hex: "#808080", count: 22 },
		{ id: "beiges", name: "Beiges & Tans", hex: "#F5F5DC", count: 18 },
		{ id: "blues", name: "Blues", hex: "#4169E1", count: 15 },
		{ id: "greens", name: "Greens", hex: "#228B22", count: 12 },
		{ id: "browns", name: "Browns", hex: "#8B4513", count: 10 },
		{ id: "reds", name: "Reds", hex: "#DC143C", count: 8 },
		{ id: "yellows", name: "Yellows", hex: "#FFD700", count: 6 },
	];

	const roomTypes = [
		{ id: "living-room", name: "Living Room", count: 35 },
		{ id: "bedroom", name: "Bedroom", count: 28 },
		{ id: "kitchen", name: "Kitchen", count: 25 },
		{ id: "bathroom", name: "Bathroom", count: 22 },
		{ id: "dining-room", name: "Dining Room", count: 18 },
		{ id: "home-office", name: "Home Office", count: 15 },
		{ id: "nursery", name: "Nursery", count: 12 },
		{ id: "hallway", name: "Hallway", count: 10 },
	];

	const finishTypes = [
		{ id: "flat", name: "Flat", description: "0-5% sheen", count: 28 },
		{ id: "matte", name: "Matte", description: "5-10% sheen", count: 25 },
		{
			id: "eggshell",
			name: "Eggshell",
			description: "10-25% sheen",
			count: 32,
		},
		{ id: "satin", name: "Satin", description: "25-35% sheen", count: 30 },
		{
			id: "semi-gloss",
			name: "Semi-Gloss",
			description: "35-70% sheen",
			count: 20,
		},
		{ id: "gloss", name: "Gloss", description: "70%+ sheen", count: 8 },
	];

	const brands = [
		{ id: "artisan-pro", name: "Artisan Pro", count: 45 },
		{ id: "weatherguard", name: "WeatherGuard Pro", count: 32 },
		{ id: "green-living", name: "Green Living", count: 28 },
		{ id: "elite-colors", name: "Elite Colors", count: 25 },
		{ id: "home-essentials", name: "Home Essentials", count: 22 },
	];

	const features = [
		{ id: "zero-voc", name: "Zero-VOC", count: 35 },
		{ id: "mold-resistant", name: "Mold & Mildew Resistant", count: 28 },
		{ id: "stain-resistant", name: "Stain Resistant", count: 42 },
		{ id: "antimicrobial", name: "Antimicrobial", count: 18 },
		{ id: "scrubbable", name: "Scrubbable", count: 38 },
		{ id: "fade-resistant", name: "Fade Resistant", count: 45 },
		{ id: "quick-dry", name: "Quick Dry", count: 25 },
		{ id: "low-odor", name: "Low Odor", count: 32 },
	];

	const handleCheckboxChange = (
		filterKey: string,
		value: string,
		checked: boolean
	) => {
		const currentValues = filters[filterKey] || [];
		const newValues = checked
			? [...currentValues, value]
			: currentValues.filter((v: string) => v !== value);

		onFilterChange({
			...filters,
			[filterKey]: newValues,
		});
	};

	const handlePriceRangeChange = (min: number, max: number) => {
		onFilterChange({
			...filters,
			priceRange: [min, max],
		});
	};

	const handleRatingChange = (rating: number) => {
		onFilterChange({
			...filters,
			minRating: filters.minRating === rating ? 0 : rating,
		});
	};

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-semibold text-ds-primary-charcoal">
					Filters
				</h2>
				{activeFilterCount > 0 && (
					<button
						onClick={onClearFilters}
						className="flex items-center space-x-1 text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
						aria-label="Clear all filters"
					>
						<X className="w-4 h-4" />
						<span>Clear All ({activeFilterCount})</span>
					</button>
				)}
			</div>

			{/* Categories */}
			<FilterSection title="Category" icon={<Package className="w-4 h-4" />}>
				{categories.map((category) => (
					<label
						key={category.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.categories?.includes(category.id) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"categories",
										category.id,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{category.name}
							</span>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{category.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Color Families */}
			<FilterSection
				title="Color Family"
				icon={<Palette className="w-4 h-4" />}
			>
				{colorFamilies.map((color) => (
					<label
						key={color.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.colorFamilies?.includes(color.id) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"colorFamilies",
										color.id,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<div
								className="w-4 h-4 rounded-full border border-ds-neutral-lightGray"
								style={{ backgroundColor: color.hex }}
							/>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{color.name}
							</span>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{color.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Room Types */}
			<FilterSection title="Room Type" icon={<Home className="w-4 h-4" />}>
				{roomTypes.map((room) => (
					<label
						key={room.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.roomTypes?.includes(room.id) || false}
								onChange={(e) =>
									handleCheckboxChange("roomTypes", room.id, e.target.checked)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{room.name}
							</span>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{room.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Finish Types */}
			<FilterSection
				title="Finish Type"
				icon={<Droplets className="w-4 h-4" />}
			>
				{finishTypes.map((finish) => (
					<label
						key={finish.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.finishTypes?.includes(finish.id) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"finishTypes",
										finish.id,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<div>
								<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
									{finish.name}
								</span>
								<p className="text-xs text-ds-neutral-mediumGray">
									{finish.description}
								</p>
							</div>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{finish.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Price Range */}
			<FilterSection
				title="Price Range"
				icon={<DollarSign className="w-4 h-4" />}
			>
				<div className="space-y-4">
					<div className="flex items-center space-x-4">
						<div className="flex-1">
							<label className="block text-xs text-ds-neutral-mediumGray mb-1">
								Min
							</label>
							<input
								type="number"
								min={0}
								max={500}
								value={filters.priceRange?.[0] || 0}
								onChange={(e) =>
									handlePriceRangeChange(
										Number(e.target.value),
										filters.priceRange?.[1] || 500
									)
								}
								className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-label="Minimum price"
							/>
						</div>
						<div className="flex-1">
							<label className="block text-xs text-ds-neutral-mediumGray mb-1">
								Max
							</label>
							<input
								type="number"
								min={0}
								max={500}
								value={filters.priceRange?.[1] || 500}
								onChange={(e) =>
									handlePriceRangeChange(
										filters.priceRange?.[0] || 0,
										Number(e.target.value)
									)
								}
								className="w-full px-3 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-label="Maximum price"
							/>
						</div>
					</div>

					{/* Price Range Slider */}
					<div className="relative">
						<input
							type="range"
							min={0}
							max={500}
							value={filters.priceRange?.[0] || 0}
							onChange={(e) =>
								handlePriceRangeChange(
									Number(e.target.value),
									filters.priceRange?.[1] || 500
								)
							}
							className="absolute w-full h-2 bg-ds-neutral-lightGray rounded-lg appearance-none cursor-pointer"
							style={{ zIndex: 1 }}
						/>
						<input
							type="range"
							min={0}
							max={500}
							value={filters.priceRange?.[1] || 500}
							onChange={(e) =>
								handlePriceRangeChange(
									filters.priceRange?.[0] || 0,
									Number(e.target.value)
								)
							}
							className="absolute w-full h-2 bg-ds-neutral-lightGray rounded-lg appearance-none cursor-pointer"
							style={{ zIndex: 2 }}
						/>
					</div>

					<div className="flex justify-between text-xs text-ds-neutral-mediumGray">
						<span>$0</span>
						<span>$500</span>
					</div>
				</div>
			</FilterSection>

			{/* Customer Rating */}
			<FilterSection
				title="Customer Rating"
				icon={<Star className="w-4 h-4" />}
			>
				{[5, 4, 3, 2, 1].map((rating) => (
					<button
						key={rating}
						onClick={() => handleRatingChange(rating)}
						className={cn(
							"flex items-center space-x-2 w-full text-left p-2 rounded-lg transition-colors duration-200",
							filters.minRating === rating
								? "bg-ds-primary-sage/10 text-ds-primary-sage"
								: "hover:bg-ds-neutral-lightGray/50"
						)}
						aria-label={`Filter by ${rating} stars and above`}
					>
						<div className="flex items-center space-x-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={cn(
										"w-4 h-4",
										star <= rating
											? "text-yellow-400 fill-current"
											: "text-ds-neutral-lightGray"
									)}
								/>
							))}
						</div>
						<span className="text-sm text-ds-neutral-darkSlate">& Up</span>
					</button>
				))}
			</FilterSection>

			{/* Brands */}
			<FilterSection title="Brand">
				{brands.map((brand) => (
					<label
						key={brand.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.brands?.includes(brand.id) || false}
								onChange={(e) =>
									handleCheckboxChange("brands", brand.id, e.target.checked)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{brand.name}
							</span>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{brand.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Features */}
			<FilterSection title="Special Features">
				{features.map((feature) => (
					<label
						key={feature.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.features?.includes(feature.id) || false}
								onChange={(e) =>
									handleCheckboxChange("features", feature.id, e.target.checked)
								}
								className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{feature.name}
							</span>
						</div>
						<span className="text-xs text-ds-neutral-mediumGray">
							{feature.count}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Availability */}
			<FilterSection title="Availability">
				<label className="flex items-center space-x-3 cursor-pointer group">
					<input
						type="checkbox"
						checked={filters.inStockOnly || false}
						onChange={(e) =>
							onFilterChange({ ...filters, inStockOnly: e.target.checked })
						}
						className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
					/>
					<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
						In Stock Only
					</span>
				</label>
			</FilterSection>
		</div>
	);
};
