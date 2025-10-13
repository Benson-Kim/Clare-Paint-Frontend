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
	Shield,
	Sparkles,
} from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductFilters {
	colorFamilies?: string[];
	finishTypes?: string[];
	roomTypes?: string[];
	priceRange?: [number, number];
	minRating?: number;
	brands?: string[];
	features?: string[];
	inStockOnly?: boolean;
	weatherResistance?: string[];
	applicationType?: string[];
}

interface ProductCategoryFiltersProps {
	filters: ProductFilters;
	onFilterChange: (
		key: keyof ProductFilters,
		value: string[] | [number, number] | number | boolean
	) => void;
	products: Product[];
	categorySlug: string;
	activeFilterCount: number;
	onClearFilters: () => void;
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
		<div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
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
					<ChevronUp className="w-4 h-4 text-gray-500" />
				) : (
					<ChevronDown className="w-4 h-4 text-gray-500" />
				)}
			</button>
			{isOpen && <div className="space-y-3">{children}</div>}
		</div>
	);
};

export const ProductCategoryFilters: React.FC<ProductCategoryFiltersProps> = ({
	filters,
	onFilterChange,
	products,
	categorySlug,
	activeFilterCount,
	onClearFilters,
}) => {
	const colorFamilies = [
		{ id: "whites", name: "Whites & Creams", hex: "#FFFFFF", count: 0 },
		{ id: "grays", name: "Grays & Charcoals", hex: "#808080", count: 0 },
		{ id: "beiges", name: "Beiges & Tans", hex: "#F5F5DC", count: 0 },
		{ id: "blues", name: "Blues", hex: "#4169E1", count: 0 },
		{ id: "greens", name: "Greens", hex: "#228B22", count: 0 },
		{ id: "browns", name: "Browns", hex: "#8B4513", count: 0 },
		{ id: "reds", name: "Reds", hex: "#DC143C", count: 0 },
		{ id: "yellows", name: "Yellows", hex: "#FFD700", count: 0 },
	];

	const finishTypes = [
		{ id: "flat", name: "Flat", description: "0-5% sheen", count: 0 },
		{ id: "matte", name: "Matte", description: "5-10% sheen", count: 0 },
		{ id: "eggshell", name: "Eggshell", description: "10-25% sheen", count: 0 },
		{ id: "satin", name: "Satin", description: "25-35% sheen", count: 0 },
		{
			id: "semi-gloss",
			name: "Semi-Gloss",
			description: "35-70% sheen",
			count: 0,
		},
		{ id: "gloss", name: "Gloss", description: "70%+ sheen", count: 0 },
	];

	const roomTypes = [
		{ id: "living-room", name: "Living Room", count: 0 },
		{ id: "bedroom", name: "Bedroom", count: 0 },
		{ id: "kitchen", name: "Kitchen", count: 0 },
		{ id: "bathroom", name: "Bathroom", count: 0 },
		{ id: "dining-room", name: "Dining Room", count: 0 },
		{ id: "home-office", name: "Home Office", count: 0 },
		{ id: "nursery", name: "Nursery", count: 0 },
		{ id: "hallway", name: "Hallway", count: 0 },
	];

	const brands = Array.from(new Set(products.map((p) => p.brand)));
	const priceRange = products.reduce(
		(acc, product) => ({
			min: Math.min(acc.min, product.basePrice),
			max: Math.max(acc.max, product.basePrice),
		}),
		{ min: Infinity, max: -Infinity }
	);

	const features = [
		{ id: "zero-voc", name: "Zero-VOC", count: 0 },
		{ id: "mold-resistant", name: "Mold & Mildew Resistant", count: 0 },
		{ id: "stain-resistant", name: "Stain Resistant", count: 0 },
		{ id: "antimicrobial", name: "Antimicrobial", count: 0 },
		{ id: "scrubbable", name: "Scrubbable", count: 0 },
		{ id: "fade-resistant", name: "Fade Resistant", count: 0 },
		{ id: "quick-dry", name: "Quick Dry", count: 0 },
		{ id: "low-odor", name: "Low Odor", count: 0 },
	];

	const handleCheckboxChange = (
		filterKey: keyof Pick<
			ProductFilters,
			| "colorFamilies"
			| "finishTypes"
			| "roomTypes"
			| "brands"
			| "features"
			| "weatherResistance"
			| "applicationType"
		>,
		value: string,
		checked: boolean
	) => {
		const currentValues = (filters[filterKey] as string[]) || [];
		const newValues = checked
			? [...currentValues, value]
			: currentValues.filter((v: string) => v !== value);

		onFilterChange(filterKey, newValues);
	};

	const handlePriceRangeChange = (min: number, max: number) => {
		onFilterChange("priceRange", [min, max]);
	};

	const handleRatingChange = (rating: number) => {
		onFilterChange("minRating", filters.minRating === rating ? 0 : rating);
	};

	// Calculate counts for each filter option
	const calculateFilterCounts = () => {
		// In a real app, this would be calculated from the products data
		colorFamilies.forEach((family) => {
			family.count = products.filter((product) =>
				product.colors.some((color) => {
					const colorName = color.name.toLowerCase();
					switch (family.id) {
						case "whites":
							return colorName.includes("white") || colorName.includes("cream");
						case "grays":
							return (
								colorName.includes("gray") || colorName.includes("charcoal")
							);
						case "beiges":
							return colorName.includes("beige") || colorName.includes("tan");
						default:
							return colorName.includes(family.id.slice(0, -1));
					}
				})
			).length;
		});

		finishTypes.forEach((finish) => {
			finish.count = products.filter((product) =>
				product.finishes.some((f) => f.name.toLowerCase().includes(finish.id))
			).length;
		});

		roomTypes.forEach((room) => {
			room.count = products.filter(
				(product) =>
					product.features.some((feature) =>
						feature.toLowerCase().includes(room.name.toLowerCase())
					) ||
					product.description.toLowerCase().includes(room.name.toLowerCase())
			).length;
		});

		features.forEach((feature) => {
			feature.count = products.filter((product) =>
				product.features.some((f) =>
					f.toLowerCase().includes(feature.name.toLowerCase())
				)
			).length;
		});
	};

	calculateFilterCounts();

	return (
		<div className="bg-ds-neutral-white border border-gray-200 rounded-lg p-6">
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

			{/* Color Families */}
			<FilterSection
				title="Color Family"
				icon={<Palette className="w-4 h-4" />}
			>
				{colorFamilies.map((family) => (
					<label
						key={family.id}
						className="flex items-center justify-between cursor-pointer group"
					>
						<div className="flex items-center space-x-3">
							<input
								type="checkbox"
								checked={filters.colorFamilies?.includes(family.id) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"colorFamilies",
										family.id,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<div
								className="w-4 h-4 rounded-full border border-gray-300"
								style={{ backgroundColor: family.hex }}
							/>
							<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{family.name}
							</span>
						</div>
						<span className="text-xs text-gray-500">{family.count}</span>
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
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<div>
								<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
									{finish.name}
								</span>
								<p className="text-xs text-gray-500">{finish.description}</p>
							</div>
						</div>
						<span className="text-xs text-gray-500">{finish.count}</span>
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
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{room.name}
							</span>
						</div>
						<span className="text-xs text-gray-500">{room.count}</span>
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
							<label className="block text-xs text-gray-600 mb-1">Min</label>
							<input
								type="number"
								min={priceRange.min}
								max={priceRange.max}
								value={filters.priceRange?.[0] || priceRange.min}
								onChange={(e) =>
									handlePriceRangeChange(
										Number(e.target.value),
										filters.priceRange?.[1] || priceRange.max
									)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-label="Minimum price"
							/>
						</div>
						<div className="flex-1">
							<label className="block text-xs text-gray-600 mb-1">Max</label>
							<input
								type="number"
								min={priceRange.min}
								max={priceRange.max}
								value={filters.priceRange?.[1] || priceRange.max}
								onChange={(e) =>
									handlePriceRangeChange(
										filters.priceRange?.[0] || priceRange.min,
										Number(e.target.value)
									)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
								aria-label="Maximum price"
							/>
						</div>
					</div>

					{/* Price Range Slider */}
					<div className="relative">
						<input
							type="range"
							min={priceRange.min}
							max={priceRange.max}
							value={filters.priceRange?.[0] || priceRange.min}
							onChange={(e) =>
								handlePriceRangeChange(
									Number(e.target.value),
									filters.priceRange?.[1] || priceRange.max
								)
							}
							className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							style={{ zIndex: 1 }}
						/>
						<input
							type="range"
							min={priceRange.min}
							max={priceRange.max}
							value={filters.priceRange?.[1] || priceRange.max}
							onChange={(e) =>
								handlePriceRangeChange(
									filters.priceRange?.[0] || priceRange.min,
									Number(e.target.value)
								)
							}
							className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							style={{ zIndex: 2 }}
						/>
					</div>

					<div className="flex justify-between text-xs text-gray-600">
						<span>${priceRange.min}</span>
						<span>${priceRange.max}</span>
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
								: "hover:bg-gray-50"
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
											: "text-gray-300"
									)}
								/>
							))}
						</div>
						<span className="text-sm text-gray-700">& Up</span>
					</button>
				))}
			</FilterSection>

			{/* Brands */}
			<FilterSection title="Brand" icon={<Package className="w-4 h-4" />}>
				{brands.map((brand) => {
					const count = products.filter((p) => p.brand === brand).length;
					return (
						<label
							key={brand}
							className="flex items-center justify-between cursor-pointer group"
						>
							<div className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={
										filters.brands?.includes(brand.toLowerCase()) || false
									}
									onChange={(e) =>
										handleCheckboxChange(
											"brands",
											brand.toLowerCase(),
											e.target.checked
										)
									}
									className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
								/>
								<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
									{brand}
								</span>
							</div>
							<span className="text-xs text-gray-500">{count}</span>
						</label>
					);
				})}
			</FilterSection>

			{/* Special Features */}
			<FilterSection
				title="Special Features"
				icon={<Shield className="w-4 h-4" />}
			>
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
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
								{feature.name}
							</span>
						</div>
						<span className="text-xs text-gray-500">{feature.count}</span>
					</label>
				))}
			</FilterSection>

			{/* Availability */}
			<FilterSection
				title="Availability"
				icon={<Package className="w-4 h-4" />}
			>
				<label className="flex items-center space-x-3 cursor-pointer group">
					<input
						type="checkbox"
						checked={filters.inStockOnly || false}
						onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
						className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
					/>
					<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200">
						In Stock Only
					</span>
				</label>
			</FilterSection>

			{/* Category-Specific Filters */}
			{categorySlug === "exterior-paints" && (
				<FilterSection
					title="Weather Resistance"
					icon={<Shield className="w-4 h-4" />}
				>
					{["excellent", "superior", "very-good", "good"].map((level) => (
						<label
							key={level}
							className="flex items-center space-x-3 cursor-pointer group"
						>
							<input
								type="checkbox"
								checked={filters.weatherResistance?.includes(level) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"weatherResistance",
										level,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
								{level.replace("-", " ")}
							</span>
						</label>
					))}
				</FilterSection>
			)}

			{categorySlug === "specialty-coatings" && (
				<FilterSection
					title="Application Type"
					icon={<Sparkles className="w-4 h-4" />}
				>
					{["textured", "metallic", "protective", "decorative"].map((type) => (
						<label
							key={type}
							className="flex items-center space-x-3 cursor-pointer group"
						>
							<input
								type="checkbox"
								checked={filters.applicationType?.includes(type) || false}
								onChange={(e) =>
									handleCheckboxChange(
										"applicationType",
										type,
										e.target.checked
									)
								}
								className="w-4 h-4 text-ds-primary-sage border-gray-300 rounded focus:ring-ds-primary-sage focus:ring-2"
							/>
							<span className="text-sm text-gray-700 group-hover:text-ds-primary-charcoal transition-colors duration-200 capitalize">
								{type}
							</span>
						</label>
					))}
				</FilterSection>
			)}
		</div>
	);
};
