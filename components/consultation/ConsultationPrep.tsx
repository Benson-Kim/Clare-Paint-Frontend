"use client";

import React from "react";
import {
	FileText,
	Lightbulb,
	Image as IconImage,
	Download,
	ArrowRight,
} from "lucide-react";

export const ConsultationPrep: React.FC = () => {
	const prepMaterials = [
		{
			icon: <FileText className="w-6 h-6" />,
			title: "Consultation Checklist",
			description:
				"A comprehensive list of things to prepare before your session.",
			link: "#", // Placeholder for download link
			type: "PDF",
		},
		{
			icon: <Lightbulb className="w-6 h-6" />,
			title: "Understanding Color Psychology",
			description:
				"Learn how colors influence mood and perception in different spaces.",
			link: "#", // Placeholder for article link
			type: "Article",
		},
		{
			icon: <IconImage className="w-6 h-6" />,
			title: "How to Gather Inspiration",
			description:
				"Tips on collecting images and ideas to share with your consultant.",
			link: "#", // Placeholder for guide link
			type: "Guide",
		},
	];

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
						Prepare for Your Consultation
					</h2>
					<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
						Get the most out of your color consultation with our helpful
						preparation materials and guides.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{prepMaterials.map((material, index) => (
						<div
							key={index}
							className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="inline-flex items-center justify-center w-16 h-16 bg-ds-accent-warmBeige/10 rounded-full mb-4">
								<div className="text-ds-accent-warmBrown">{material.icon}</div>
							</div>
							<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-2">
								{material.title}
							</h3>
							<p className="text-ds-neutral-mediumGray text-sm mb-4">
								{material.description}
							</p>
							<a
								href={material.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center space-x-2 px-8 py-2 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg font-semibold hover:bg-ds-accent-warmBeige/90 transition-colors duration-200 text-sm"
								aria-label={`Download ${material.title}`}
							>
								{material.type === "PDF" ? (
									<Download className="w-4 h-4" />
								) : (
									<ArrowRight className="w-4 h-4" />
								)}
								<span>
									{material.type === "PDF" ? "Download" : "Read More"}
								</span>
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
