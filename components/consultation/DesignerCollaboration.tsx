"use client";

import React from "react";
import { Users, Palette, Share2, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const DesignerCollaboration: React.FC = () => {
	const features = [
		{
			icon: <Palette className="w-6 h-6" />,
			title: "Extended Color Library Access",
			description:
				"Gain exclusive access to our full digital color library and advanced matching tools.",
		},
		{
			icon: <Share2 className="w-6 h-6" />,
			title: "Seamless Project Sharing",
			description:
				"Easily share project details, color selections, and client notes with our team.",
		},
		{
			icon: <Briefcase className="w-6 h-6" />,
			title: "Dedicated Designer Support",
			description:
				"Receive priority assistance from our design liaison team for all your project needs.",
		},
	];

	return (
		<section className="py-20 bg-ds-primary-cream">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
						Collaborate with Confidence
					</h2>
					<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
						We partner with interior designers and architects to bring their
						creative visions to life. Access exclusive tools and support
						designed for professionals.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-primary-sage/10 rounded-full mb-4">
								<div className="text-ds-primary-sage">{feature.icon}</div>
							</div>
							<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-2">
								{feature.title}
							</h3>
							<p className="text-ds-neutral-mediumGray text-sm">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<div className="text-center mt-20">
					<a
						href="#" // Placeholder for designer portal link
						className="inline-flex items-center space-x-4 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-primary-sage/90 transition-colors duration-200"
						aria-label="Learn more about designer collaboration"
					>
						<span>Join Our Designer Program</span>
						<ArrowRight className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
};
