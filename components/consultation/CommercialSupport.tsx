"use client";

import React from "react";
import {
	Building,
	HardHat,
	DollarSign,
	Clock,
	Shield,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CommercialSupport: React.FC = () => {
	const services = [
		{
			icon: <Building className="w-6 h-6" />,
			title: "Large-Scale Project Planning",
			description:
				"Expert assistance with color specification and material estimation for commercial buildings.",
		},
		{
			icon: <HardHat className="w-6 h-6" />,
			title: "Durable & Specialty Coatings",
			description:
				"Recommendations for high-performance paints and coatings suitable for commercial environments.",
		},
		{
			icon: <DollarSign className="w-6 h-6" />,
			title: "Budget & Timeline Optimization",
			description:
				"Strategic advice to ensure your project stays on budget and meets deadlines.",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Flexible Scheduling",
			description:
				"Work around your business operations with flexible consultation and project scheduling.",
		},
	];

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
						Commercial Project Support
					</h2>
					<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
						From retail spaces to corporate offices, our commercial color
						consultation services are designed to meet the unique demands of
						your business.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-accent-warmBeige/10 rounded-full mb-4">
								<div className="text-ds-accent-warmBrown">{service.icon}</div>
							</div>
							<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-2">
								{service.title}
							</h3>
							<p className="text-ds-neutral-mediumGray text-sm">
								{service.description}
							</p>
						</div>
					))}
				</div>

				<div className="text-center mt-20">
					<a
						href="#" // Placeholder for commercial inquiry form
						className="inline-flex items-center space-x-4 px-8 py-4 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-accent-warmBeige/90 transition-colors duration-200"
						aria-label="Request commercial project consultation"
					>
						<span>Request Commercial Quote</span>
						<ArrowRight className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
};
