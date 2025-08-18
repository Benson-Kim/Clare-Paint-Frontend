"use client";

import React from "react";
import { Palette, Award, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

interface CategoryData {
	slug: string;
	name: string;
	description: string;
	image: string;
	features: string[];
	benefits: string[];
}

interface ProductCategoryHeroProps {
	categoryData: CategoryData | null;
	totalProducts: number;
}

export const ProductCategoryHero: React.FC<ProductCategoryHeroProps> = ({
	categoryData,
	totalProducts,
}) => {
	if (!categoryData) {
		return (
			<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white">
				<div className="absolute inset-0 bg-black/30" />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-ds-neutral-white border-t-transparent rounded-full animate-spin mx-auto mb-6" />
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							Loading Category...
						</h1>
					</div>
				</div>
			</div>
		);
	}

	const getFeatureIcon = (index: number) => {
		const icons = [Palette, Award, Shield, Sparkles];
		const IconComponent = icons[index % icons.length];
		return <IconComponent className="w-6 h-6" />;
	};

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Content */}
					<div>
						<div className="flex items-center space-x-3 mb-4">
							<Palette className="w-8 h-8 text-ds-accent-warmBeige" />
							<span className="text-ds-accent-warmBeige font-semibold text-lg">
								{categoryData.name}
							</span>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
							{categoryData.name}
						</h1>
						<p className="text-xl text-ds-neutral-white/90 mb-8 leading-relaxed">
							{categoryData.description}
						</p>

						{/* Stats */}
						<div className="flex items-center space-x-6 mb-8">
							<div className="text-center">
								<div className="text-2xl font-bold text-ds-accent-warmBeige">
									{totalProducts}+
								</div>
								<div className="text-sm text-ds-neutral-white/80">Products</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-ds-accent-warmBeige">
									50+
								</div>
								<div className="text-sm text-ds-neutral-white/80">Colors</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-ds-accent-warmBeige">
									4.8★
								</div>
								<div className="text-sm text-ds-neutral-white/80">Rating</div>
							</div>
						</div>

						{/* Features */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{categoryData.features.map((feature, index) => (
								<div
									key={index}
									className="flex items-center space-x-3 text-ds-neutral-white/90"
								>
									<div className="text-ds-accent-warmBeige">
										{getFeatureIcon(index)}
									</div>
									<span>{feature}</span>
								</div>
							))}
						</div>
					</div>

					{/* Hero Image */}
					<div className="relative">
						<div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl">
							<Image
								src={categoryData.image}
								alt={`${categoryData.name} collection`}
								fill
								className="object-cover"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
