"use client";

import React from "react";
import { Palette, Droplets, Shield, Award } from "lucide-react";

export const CategoryHero: React.FC = () => {
	const features = [
		{
			icon: <Palette className="w-6 h-6" />,
			title: "Premium Colors",
			description: "Curated color palette for every style",
		},
		{
			icon: <Droplets className="w-6 h-6" />,
			title: "Zero-VOC Formula",
			description: "Safe for your family and environment",
		},
		{
			icon: <Shield className="w-6 h-6" />,
			title: "Lifetime Warranty",
			description: "Guaranteed quality and durability",
		},
		{
			icon: <Award className="w-6 h-6" />,
			title: "Expert Tested",
			description: "Recommended by professionals",
		},
	];

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to bg-ds-primary-charcoal  text-white">
			<div className="absolute inset-0 bg-black/20" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Premium Interior Paint Collection
					</h1>
					<p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
						Transform your space with our carefully curated selection of premium
						interior paints. From bold statement colors to subtle neutrals, find
						the perfect shade for every room.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div key={index} className="text-center group">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors duration-200">
								<div className="text-white">{feature.icon}</div>
							</div>
							<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
							<p className="text-white/80 text-sm">{feature.description}</p>
						</div>
					))}
				</div>

				{/* CTA Section */}
				<div className="text-center mt-12">
					<div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
						<span className="text-white/90">Need help choosing?</span>
						<button className="bg-white text-ds-primary-sage px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200">
							Get Color Consultation
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
