"use client";

import React, { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	X,
	Sun,
	Shield,
	Home,
	Thermometer,
	Star,
} from "lucide-react";
import { Product } from "@/types/product";
import { ExteriorPaintFilterState } from "@/hooks/useExteriorPaintFilters";
import { cn } from "@/lib/utils";

interface ExteriorPaintFiltersProps {
	filters: ExteriorPaintFilterState;
	onFilterChange: (key: keyof ExteriorPaintFilterState, value: any) => void;
	products: Product[];
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
		<div className="border-b border-ds-neutral-lightGray pb-4 mb-8 last:border-b-0 last:pb-0 last:mb-0">
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
			{isOpen && <div className="space-y-2">{children}</div>}
		</div>
	);
};

export const ExteriorPaintFilters: React.FC<ExteriorPaintFiltersProps> = ({
	filters,
	onFilterChange,
	products,
}) => {
	const surfaceTypes = [
		{ id: "wood", name: "Wood", count: 0 },
		{ id: "siding", name: "Siding", count: 0 },
		{ id: "masonry", name: "Masonry", count: 0 },
		{ id: "stucco", name: "Stucco", count: 0 },
		{ id: "fiber-cement", name: "Fiber Cement", count: 0 },
		{ id: "metal", name: "Metal", count: 0 },
		{ id: "trim", name: "Trim & Doors", count: 0 },
		{ id: "deck", name: "Deck & Fence", count: 0 },
	];

	const climateZones = [
		{ id: "all-climates", name: "All Climates", count: 0 },
		{ id: "hot-humid", name: "Hot & Humid", count: 0 },
		{ id: "cold-dry", name: "Cold & Dry", count: 0 },
		{ id: "coastal", name: "Coastal", count: 0 },
		{ id: "moderate", name: "Moderate", count: 0 },
		{ id: "desert", name: "Desert", count: 0 },
	];

	const durabilityRatings = [
		{ id: 5, name: "5 Stars (Superior)", count: 0 },
		{ id: 4, name: "4 Stars (Excellent)", count: 0 },
		{ id: 3, name: "3 Stars (Good)", count: 0 },
	];

	const weatherResistanceOptions = [
		{ id: "excellent", name: "Excellent", count: 0 },
		{ id: "superior", name: "Superior", count: 0 },
		{ id: "very-good", name: "Very Good", count: 0 },
	];

	const brands = Array.from(
		new Set(products.map((p) => p.brand.toLowerCase()))
	);
	const priceRange = products.reduce(
		(acc, product) => ({
			min: Math.min(acc.min, product.basePrice),
			max: Math.max(acc.max, product.basePrice),
		}),
		{ min: Infinity, max: -Infinity }
	);

	const handleCheckboxChange = (
		filterKey: keyof ExteriorPaintFilterState,
		value: string | number,
		checked: boolean
	) => {
		const currentValues = filters[filterKey] as (string | number)[];
		const newValues = checked
			? [...currentValues, value]
			: currentValues.filter((v) => v !== value);
		onFilterChange(filterKey, newValues);
	};

	const handlePriceRangeChange = (min: number, max: number) => {
		onFilterChange("priceRange", [min, max]);
	};

	return (
		<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-lg font-semibold text-ds-primary-charcoal">
					Exterior Paint Filters
				</h2>
				<button
					onClick={() => {
						onFilterChange("surfaceTypes", []);
						onFilterChange("climateZones", []);
						onFilterChange("durabilityRatings", []);
						onFilterChange("weatherResistance", []);
						onFilterChange("brands", []);
						onFilterChange("priceRange", [priceRange.min, priceRange.max]);
						onFilterChange("inStockOnly", false);
					}}
					className="text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
				>
					Clear All
				</button>
			</div>

			{/* Surface Types */}
			<FilterSection title="Surface Type" icon={<Home className="w-4 h-4" />}>
				{surfaceTypes.map((type) => (
					<label
						key={type.id}
						className="flex items-center space-x-2 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={filters.surfaceTypes.includes(type.id)}
							onChange={(e) =>
								handleCheckboxChange("surfaceTypes", type.id, e.target.checked)
							}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
						/>
						<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
							{type.name}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Climate Zones */}
			<FilterSection
				title="Climate Zone"
				icon={<Thermometer className="w-4 h-4" />}
			>
				{climateZones.map((zone) => (
					<label
						key={zone.id}
						className="flex items-center space-x-2 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={filters.climateZones.includes(zone.id)}
							onChange={(e) =>
								handleCheckboxChange("climateZones", zone.id, e.target.checked)
							}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
						/>
						<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
							{zone.name}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Durability Rating */}
			<FilterSection
				title="Durability Rating"
				icon={<Star className="w-4 h-4" />}
			>
				{durabilityRatings.map((rating) => (
					<label
						key={rating.id}
						className="flex items-center space-x-2 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={filters.durabilityRatings.includes(rating.id)}
							onChange={(e) =>
								handleCheckboxChange(
									"durabilityRatings",
									rating.id,
									e.target.checked
								)
							}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
						/>
						<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200">
							{rating.name}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Weather Resistance */}
			<FilterSection
				title="Weather Resistance"
				icon={<Shield className="w-4 h-4" />}
			>
				{weatherResistanceOptions.map((resistance) => (
					<label
						key={resistance.id}
						className="flex items-center space-x-2 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={filters.weatherResistance.includes(resistance.id)}
							onChange={(e) =>
								handleCheckboxChange(
									"weatherResistance",
									resistance.id,
									e.target.checked
								)
							}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
						/>
						<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
							{resistance.name}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Price Range */}
			<FilterSection
				title="Price Range"
				icon={<span className="text-sm font-bold text-ds-primary-sage">$</span>}
			>
				<div className="space-y-4">
					<div className="flex items-center space-x-4">
						<div className="flex-1">
							<label className="block text-xs text-ds-neutral-mediumGray mb-2">
								Min
							</label>
							<input
								type="number"
								min={priceRange.min}
								max={priceRange.max}
								value={filters.priceRange[0]}
								onChange={(e) =>
									handlePriceRangeChange(
										Number(e.target.value),
										filters.priceRange[1]
									)
								}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							/>
						</div>
						<div className="flex-1">
							<label className="block text-xs text-ds-neutral-mediumGray mb-2">
								Max
							</label>
							<input
								type="number"
								min={priceRange.min}
								max={priceRange.max}
								value={filters.priceRange[1]}
								onChange={(e) =>
									handlePriceRangeChange(
										filters.priceRange[0],
										Number(e.target.value)
									)
								}
								className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
							/>
						</div>
					</div>
					<div className="flex justify-between text-xs text-ds-neutral-mediumGray">
						<span>${priceRange.min}</span>
						<span>${priceRange.max}</span>
					</div>
				</div>
			</FilterSection>

			{/* Brands */}
			<FilterSection title="Brand" icon={<Sun className="w-4 h-4" />}>
				{brands.map((brand) => (
					<label
						key={brand}
						className="flex items-center space-x-2 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={filters.brands.includes(brand)}
							onChange={(e) =>
								handleCheckboxChange("brands", brand, e.target.checked)
							}
							className="w-4 h-4 text-ds-primary-sage border-ds-neutral-mediumGray rounded focus:ring-ds-primary-sage focus:ring-2"
						/>
						<span className="text-sm text-ds-neutral-darkSlate group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
							{brand}
						</span>
					</label>
				))}
			</FilterSection>

			{/* Availability */}
			<FilterSection title="Availability">
				<label className="flex items-center space-x-2 cursor-pointer group">
					<input
						type="checkbox"
						checked={filters.inStockOnly}
						onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
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
