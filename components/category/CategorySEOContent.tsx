"use client";

import React from "react";
import { CheckCircle, Award, Shield, Palette } from "lucide-react";

interface CategoryData {
	slug: string;
	name: string;
	description: string;
	image: string;
	features: string[];
	benefits: string[];
}

interface CategorySEOContentProps {
	categoryData: CategoryData | null;
}

export const CategorySEOContent: React.FC<CategorySEOContentProps> = ({
	categoryData,
}) => {
	if (!categoryData) return null;

	const getBenefitIcon = (index: number) => {
		const icons = [CheckCircle, Award, Shield, Palette];
		const IconComponent = icons[index % icons.length];
		return <IconComponent className="w-5 h-5" />;
	};

	return (
		<div className="bg-ds-primary-cream/20 border-b border-ds-accent-warmBeige/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-ds-primary-charcoal mb-4">
						Why Choose Our {categoryData.name}?
					</h2>
					<p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
						Discover the superior quality and performance that sets our{" "}
						{categoryData.name.toLowerCase()} apart from the competition.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{categoryData.benefits.map((benefit, index) => (
						<div
							key={index}
							className="text-center p-6 bg-ds-neutral-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="inline-flex items-center justify-center w-12 h-12 bg-ds-primary-sage/10 rounded-full mb-4">
								<div className="text-ds-primary-sage">
									{getBenefitIcon(index)}
								</div>
							</div>
							<h3 className="font-semibold text-ds-primary-charcoal mb-2">
								{benefit}
							</h3>
						</div>
					))}
				</div>

				{/* SEO-Rich Content */}
				<div className="mt-12 prose prose-lg max-w-none">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-bold text-ds-primary-charcoal mb-4">
								Expert-Curated {categoryData.name}
							</h3>
							<p className="text-gray-700 leading-relaxed">
								Our {categoryData.name.toLowerCase()} collection represents the
								pinnacle of paint technology and design. Each product is
								carefully selected for its superior performance, durability, and
								aesthetic appeal. Whether you&apos;re a professional contractor
								or a DIY enthusiast, you&apos;ll find the perfect solution for
								your project.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-bold text-ds-primary-charcoal mb-4">
								Quality You Can Trust
							</h3>
							<p className="text-gray-700 leading-relaxed">
								Every paint in our {categoryData.name.toLowerCase()} category
								undergoes rigorous testing to ensure it meets our high standards
								for coverage, durability, and color accuracy. With options
								ranging from budget-friendly to premium formulations, we have
								the right paint for every project and budget.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
