"use client";

import React from "react";
import { CloudRain, Sun, ShieldCheck, Home } from "lucide-react";

export const ExteriorPaintHero: React.FC = () => {
	const features = [
		{
			icon: <CloudRain className="w-6 h-6" />,
			title: "All-Weather Protection",
			description:
				"Engineered to withstand rain, snow, and extreme temperatures.",
		},
		{
			icon: <Sun className="w-6 h-6" />,
			title: "Fade & UV Resistant",
			description: "Long-lasting color that stands up to harsh sunlight.",
		},
		{
			icon: <ShieldCheck className="w-6 h-6" />,
			title: "Superior Durability",
			description: "Resists cracking, peeling, and blistering for years.",
		},
		{
			icon: <Home className="w-6 h-6" />,
			title: "For Every Surface",
			description: "Formulated for wood, masonry, stucco, and more.",
		},
	];

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-charcoal to-ds-neutral-darkSlate text-ds-neutral-white">
			<div className="absolute inset-0 bg-black/30" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Durable Exterior Paints
					</h1>
					<p className="text-lg text-ds-neutral-white/90 max-w-3xl mx-auto leading-relaxed">
						Protect and beautify your home with our premium selection of
						exterior paints. Engineered for maximum durability and weather
						resistance in any climate.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{features.map((feature, index) => (
						<div
							key={index}
							className="text-center group p-4 rounded-lg bg-ds-neutral-white/5 hover:bg-ds-neutral-white/10 transition-colors duration-200"
						>
							<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-neutral-white/10 rounded-full mb-4 group-hover:bg-ds-neutral-white/20 transition-colors duration-200">
								<div className="text-ds-neutral-white">{feature.icon}</div>
							</div>
							<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
							<p className="text-ds-neutral-white/80 text-sm">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="text-center mt-20">
					<div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-ds-neutral-white/10 backdrop-blur-sm rounded-lg px-8 py-4">
						<span className="text-ds-neutral-white/90">
							Unsure which paint is right for your climate?
						</span>
						<button className="bg-ds-primary-sage text-ds-neutral-white px-8 py-2 rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200">
							Get Climate Zone Recommendations
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
