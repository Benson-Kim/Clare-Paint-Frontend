"use client";

import React from "react";
import {
	Clock,
	Paintbrush,
	Shield,
	Droplets,
	Thermometer,
	Ruler,
	Palette,
	CheckCircle,
} from "lucide-react";
import { Product } from "@/types/product";

interface ProductSpecsProps {
	product: Product;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
	const primarySpecs = [
		{
			icon: <Paintbrush className="w-5 h-5" />,
			label: "Coverage",
			value: product.coverage,
			detail: "Per gallon on smooth surfaces",
		},
		{
			icon: <Clock className="w-5 h-5" />,
			label: "Dry Time",
			value: product.dryTime,
			detail: "At 70°F and 50% humidity",
		},
		{
			icon: <Droplets className="w-5 h-5" />,
			label: "Application",
			value: product.application.join(", "),
			detail: "Recommended tools",
		},
		{
			icon: <Shield className="w-5 h-5" />,
			label: "Category",
			value: product.category,
			detail: "Product classification",
		},
	];

	const detailedSpecs = [
		{
			category: "Performance",
			specs: [
				{ label: "Sheen Level", value: "Varies by finish (5-70%)" },
				{ label: "Washability", value: "Excellent - scrub resistant" },
				{ label: "Fade Resistance", value: "Superior UV protection" },
				{ label: "Stain Resistance", value: "Class 1 - highest rating" },
				{ label: "Mildew Resistance", value: "EPA registered" },
			],
		},
		{
			category: "Technical",
			specs: [
				{ label: "VOC Content", value: "< 50 g/L (Low VOC)" },
				{ label: "Solids by Weight", value: "45-50%" },
				{ label: "Viscosity", value: "95-105 KU" },
				{ label: "pH Level", value: "8.5-9.5" },
				{ label: "Flash Point", value: "None (water-based)" },
			],
		},
		{
			category: "Application Conditions",
			specs: [
				{ label: "Temperature Range", value: "50-85°F (10-29°C)" },
				{ label: "Humidity Range", value: "< 85% relative humidity" },
				{ label: "Surface Temperature", value: "Max 100°F (38°C)" },
				{ label: "Thinning", value: "Not recommended" },
				{ label: "Clean Up", value: "Soap and water" },
			],
		},
		{
			category: "Coverage & Consumption",
			specs: [
				{ label: "Theoretical Coverage", value: "400 sq ft/gallon" },
				{ label: "Practical Coverage", value: "350-375 sq ft/gallon" },
				{ label: "Recommended Coats", value: "2 coats for optimal results" },
				{ label: "Primer Required", value: "On bare surfaces" },
				{ label: "Touch-up Time", value: "After 30 days for best match" },
			],
		},
	];

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold text-ds-primary-charcoal">
				Specifications
			</h3>

			{/* Key Specs Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{primarySpecs.map((spec, index) => (
					<div
						key={index}
						className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
					>
						<div className="text-ds-primary-sage flex-shrink-0">
							{spec.icon}
						</div>
						<div>
							<p className="font-medium text-ds-primary-charcoal text-sm">
								{spec.label}
							</p>
							<p className="text-gray-600 text-sm">{spec.value}</p>
							<p className="text-gray-500 text-xs mt-1">{spec.detail}</p>
						</div>
					</div>
				))}
			</div>

			{/* Detailed Specifications */}
			<div className="space-y-6">
				{detailedSpecs.map((section, sectionIndex) => (
					<div
						key={sectionIndex}
						className="border border-gray-200 rounded-lg p-6"
					>
						<h4 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
							{section.category === "Performance" && (
								<CheckCircle className="w-5 h-5 text-ds-primary-sage" />
							)}
							{section.category === "Technical" && (
								<Ruler className="w-5 h-5 text-ds-primary-sage" />
							)}
							{section.category === "Application Conditions" && (
								<Thermometer className="w-5 h-5 text-ds-primary-sage" />
							)}
							{section.category === "Coverage & Consumption" && (
								<Palette className="w-5 h-5 text-ds-primary-sage" />
							)}
							<span>{section.category}</span>
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{section.specs.map((spec, specIndex) => (
								<div
									key={specIndex}
									className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
								>
									<span className="text-sm text-gray-600">{spec.label}</span>
									<span className="text-sm font-medium text-ds-primary-charcoal">
										{spec.value}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Features List */}
			<div>
				<h4 className="font-semibold text-ds-primary-charcoal mb-3">
					Key Features
				</h4>
				<ul className="space-y-2">
					{product.features.map((feature, index) => (
						<li key={index} className="flex items-start space-x-2">
							<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
							<span className="text-gray-700 text-sm">{feature}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Product Info */}
			<div className="bg-ds-primary-cream/30 p-4 rounded-lg">
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<p className="font-medium text-ds-primary-charcoal">Brand</p>
						<p className="text-gray-600">{product.brand}</p>
					</div>
					<div>
						<p className="font-medium text-ds-primary-charcoal">SKU</p>
						<p className="text-gray-600">{product.sku}</p>
					</div>
				</div>
			</div>

			{/* Coverage Calculator */}
			<div className="bg-ds-primary-sage/5 border border-ds-primary-sage/20 rounded-lg p-6">
				<h4 className="font-semibold text-ds-primary-charcoal mb-4 flex items-center space-x-2">
					<Ruler className="w-5 h-5 text-ds-primary-sage" />
					<span>Coverage Calculator</span>
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
					<div className="text-center p-4 bg-white rounded-lg">
						<p className="font-medium text-ds-primary-charcoal">1 Quart</p>
						<p className="text-gray-600">90-100 sq ft</p>
						<p className="text-xs text-gray-500 mt-1">Small rooms, touch-ups</p>
					</div>
					<div className="text-center p-4 bg-white rounded-lg">
						<p className="font-medium text-ds-primary-charcoal">1 Gallon</p>
						<p className="text-gray-600">350-400 sq ft</p>
						<p className="text-xs text-gray-500 mt-1">Average room</p>
					</div>
					<div className="text-center p-4 bg-white rounded-lg">
						<p className="font-medium text-ds-primary-charcoal">5 Gallons</p>
						<p className="text-gray-600">1,750-2,000 sq ft</p>
						<p className="text-xs text-gray-500 mt-1">Whole house projects</p>
					</div>
				</div>
			</div>
		</div>
	);
};
