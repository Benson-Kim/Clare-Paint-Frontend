"use client";

import React, { useState } from "react";
import {
	Shield,
	CheckCircle,
	AlertTriangle,
	Info,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/cartUtils";

interface PrimerInfo {
	id: string;
	name: string;
	type: string;
	description: string;
	bestFor: string[];
	coverage: string;
	dryTime: string;
	price: number;
	features: string[];
	compatibility: {
		surfaces: string[];
		paints: string[];
	};
}

export const PrimerCompatibility: React.FC = () => {
	const [selectedPrimer, setSelectedPrimer] = useState<string | null>(null);
	const [expandedSection, setExpandedSection] = useState<string | null>(
		"overview"
	);

	const primers: PrimerInfo[] = [
		{
			id: "high-hide-primer",
			name: "High-Hide Primer",
			type: "Latex-Based",
			description:
				"Superior coverage primer that blocks stains and provides excellent adhesion for interior surfaces.",
			bestFor: ["Dramatic color changes", "Stain blocking", "New drywall"],
			coverage: "350-400 sq ft per litre",
			dryTime: "2-4 hours",
			price: 34.99,
			features: [
				"Stain blocking",
				"High hide formula",
				"Low odor",
				"Quick dry",
			],
			compatibility: {
				surfaces: ["Drywall", "Wood", "Metal", "Previously painted surfaces"],
				paints: [
					"All interior latex paints",
					"Eggshell",
					"Satin",
					"Semi-gloss",
				],
			},
		},
		{
			id: "bonding-primer",
			name: "Bonding Primer",
			type: "Acrylic-Based",
			description:
				"Advanced adhesion primer for challenging surfaces that typically require sanding.",
			bestFor: ["Glossy surfaces", "Laminate", "Tile", "Glass"],
			coverage: "300-350 sq ft per litre",
			dryTime: "1-2 hours",
			price: 42.99,
			features: [
				"Superior adhesion",
				"No sanding required",
				"Multi-surface",
				"Fast dry",
			],
			compatibility: {
				surfaces: [
					"Glossy paint",
					"Laminate",
					"Ceramic tile",
					"Glass",
					"Metal",
				],
				paints: ["All interior paints", "Specialty finishes"],
			},
		},
		{
			id: "stain-blocking-primer",
			name: "Stain-Blocking Primer",
			type: "Oil-Based",
			description:
				"Maximum stain blocking power for the toughest stains including water damage, smoke, and crayon marks.",
			bestFor: [
				"Water stains",
				"Smoke damage",
				"Crayon marks",
				"Tannin bleeding",
			],
			coverage: "350-400 sq ft per litre",
			dryTime: "4-6 hours",
			price: 39.99,
			features: [
				"Maximum stain blocking",
				"Odor sealing",
				"Tannin blocking",
				"Durable",
			],
			compatibility: {
				surfaces: [
					"All interior surfaces",
					"Damaged drywall",
					"Wood with stains",
				],
				paints: ["All interior paints", "Works with any topcoat"],
			},
		},
		{
			id: "eco-primer",
			name: "Eco-Friendly Primer",
			type: "Zero-VOC",
			description:
				"Environmentally safe primer with zero harmful emissions, perfect for sensitive environments.",
			bestFor: ["Nurseries", "Bedrooms", "Eco-conscious projects"],
			coverage: "300-350 sq ft per litre",
			dryTime: "2-3 hours",
			price: 37.99,
			features: [
				"Zero-VOC",
				"Low odor",
				"Safe for children",
				"GREENGUARD certified",
			],
			compatibility: {
				surfaces: ["Drywall", "Wood", "Previously painted surfaces"],
				paints: ["Zero-VOC paints", "Low-VOC paints", "Standard latex paints"],
			},
		},
	];

	const compatibilityMatrix = [
		{
			surface: "New Drywall",
			recommended: "High-Hide Primer",
			reason: "Seals porous surface and provides uniform base",
			required: true,
		},
		{
			surface: "Previously Painted (Same Color)",
			recommended: "Light coat or skip primer",
			reason: "Good adhesion if surface is clean and not glossy",
			required: false,
		},
		{
			surface: "Previously Painted (Color Change)",
			recommended: "High-Hide Primer",
			reason: "Ensures true color and prevents bleed-through",
			required: true,
		},
		{
			surface: "Glossy Paint",
			recommended: "Bonding Primer",
			reason: "Creates adhesion without sanding",
			required: true,
		},
		{
			surface: "Wood (Bare)",
			recommended: "High-Hide Primer",
			reason: "Seals wood and prevents tannin bleeding",
			required: true,
		},
		{
			surface: "Wood (Stained)",
			recommended: "Stain-Blocking Primer",
			reason: "Blocks stains and tannins from bleeding through",
			required: true,
		},
		{
			surface: "Water Damage",
			recommended: "Stain-Blocking Primer",
			reason: "Seals stains and prevents future bleeding",
			required: true,
		},
		{
			surface: "Nursery/Children's Room",
			recommended: "Eco-Friendly Primer",
			reason: "Zero harmful emissions for safe environment",
			required: true,
		},
	];

	const toggleSection = (section: string) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	return (
		<div className="mt-16 bg-ds-primary-cream/20 border border-ds-accent-warmBeige/20 rounded-lg p-8">
			<div className="text-center mb-8">
				<div className="flex items-center justify-center space-x-3 mb-4">
					<Shield className="w-8 h-8 text-ds-primary-sage" />
					<h2 className="text-2xl md:text-3xl font-bold text-ds-primary-charcoal">
						Primer Compatibility Guide
					</h2>
				</div>
				<p className="text-gray-700 max-w-3xl mx-auto">
					Ensure perfect paint adhesion and color accuracy with our
					comprehensive primer selection guide. The right primer makes all the
					difference in your paint project&apos;s success.
				</p>
			</div>

			{/* Expandable Sections */}
			<div className="space-y-4">
				{/* Overview Section */}
				<div className="bg-white rounded-lg border border-gray-200">
					<button
						onClick={() => toggleSection("overview")}
						className="w-full flex items-center justify-between p-6 text-left"
					>
						<div className="flex items-center space-x-3">
							<Info className="w-5 h-5 text-ds-primary-sage" />
							<h3 className="text-lg font-semibold text-ds-primary-charcoal">
								When Do You Need Primer?
							</h3>
						</div>
						{expandedSection === "overview" ? (
							<ChevronUp className="w-5 h-5 text-gray-500" />
						) : (
							<ChevronDown className="w-5 h-5 text-gray-500" />
						)}
					</button>

					{expandedSection === "overview" && (
						<div className="px-6 pb-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-ds-primary-charcoal mb-3 flex items-center space-x-2">
										<CheckCircle className="w-4 h-4 text-green-600" />
										<span>Primer Required</span>
									</h4>
									<ul className="space-y-2 text-sm text-gray-700">
										<li>• New, unpainted drywall or wood</li>
										<li>• Dramatic color changes (dark to light)</li>
										<li>• Glossy or semi-gloss surfaces</li>
										<li>• Stained or damaged surfaces</li>
										<li>• Switching paint types (oil to latex)</li>
										<li>• Porous surfaces like bare wood</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold text-ds-primary-charcoal mb-3 flex items-center space-x-2">
										<AlertTriangle className="w-4 h-4 text-yellow-600" />
										<span>Primer Optional</span>
									</h4>
									<ul className="space-y-2 text-sm text-gray-700">
										<li>• Same or similar color over existing paint</li>
										<li>• Clean, matte surfaces in good condition</li>
										<li>• High-quality paint with built-in primer</li>
										<li>• Touch-up work on recently painted surfaces</li>
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Primer Types Section */}
				<div className="bg-white rounded-lg border border-gray-200">
					<button
						onClick={() => toggleSection("primers")}
						className="w-full flex items-center justify-between p-6 text-left"
					>
						<div className="flex items-center space-x-3">
							<Shield className="w-5 h-5 text-ds-primary-sage" />
							<h3 className="text-lg font-semibold text-ds-primary-charcoal">
								Recommended Primers
							</h3>
						</div>
						{expandedSection === "primers" ? (
							<ChevronUp className="w-5 h-5 text-gray-500" />
						) : (
							<ChevronDown className="w-5 h-5 text-gray-500" />
						)}
					</button>

					{expandedSection === "primers" && (
						<div className="px-6 pb-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{primers.map((primer) => (
									<div
										key={primer.id}
										className={cn(
											"border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
											selectedPrimer === primer.id
												? "border-ds-primary-sage bg-ds-primary-sage/5"
												: "border-gray-200 hover:border-gray-300"
										)}
										onClick={() =>
											setSelectedPrimer(
												selectedPrimer === primer.id ? null : primer.id
											)
										}
									>
										<div className="flex items-center justify-between mb-3">
											<h4 className="font-semibold text-ds-primary-charcoal">
												{primer.name}
											</h4>
											<span className="text-lg font-bold text-ds-primary-sage">
												{formatCurrency(primer.price)}
											</span>
										</div>

										<div className="mb-3">
											<span className="text-xs bg-ds-accent-warmBeige/20 text-ds-accent-warmBrown px-2 py-1 rounded-full">
												{primer.type}
											</span>
										</div>

										<p className="text-sm text-gray-600 mb-3">
											{primer.description}
										</p>

										<div className="space-y-2">
											<div>
												<span className="text-xs font-medium text-gray-700">
													Best for:
												</span>
												<div className="flex flex-wrap gap-1 mt-1">
													{primer.bestFor.slice(0, 2).map((use, index) => (
														<span
															key={index}
															className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
														>
															{use}
														</span>
													))}
													{primer.bestFor.length > 2 && (
														<span className="text-xs text-gray-500">
															+{primer.bestFor.length - 2} more
														</span>
													)}
												</div>
											</div>

											<div className="flex justify-between text-xs text-gray-600">
												<span>Coverage: {primer.coverage}</span>
												<span>Dry: {primer.dryTime}</span>
											</div>
										</div>

										{selectedPrimer === primer.id && (
											<div className="mt-4 pt-4 border-t border-gray-200">
												<div className="space-y-3">
													<div>
														<h5 className="text-sm font-medium text-ds-primary-charcoal mb-1">
															Features
														</h5>
														<div className="flex flex-wrap gap-1">
															{primer.features.map((feature, index) => (
																<span
																	key={index}
																	className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded"
																>
																	{feature}
																</span>
															))}
														</div>
													</div>

													<div>
														<h5 className="text-sm font-medium text-ds-primary-charcoal mb-1">
															Compatible Surfaces
														</h5>
														<p className="text-xs text-gray-600">
															{primer.compatibility.surfaces.join(", ")}
														</p>
													</div>

													<button className="w-full py-2 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 text-sm font-medium">
														Add to Cart
													</button>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Compatibility Matrix Section */}
				<div className="bg-white rounded-lg border border-gray-200">
					<button
						onClick={() => toggleSection("matrix")}
						className="w-full flex items-center justify-between p-6 text-left"
					>
						<div className="flex items-center space-x-3">
							<CheckCircle className="w-5 h-5 text-ds-primary-sage" />
							<h3 className="text-lg font-semibold text-ds-primary-charcoal">
								Surface Compatibility Matrix
							</h3>
						</div>
						{expandedSection === "matrix" ? (
							<ChevronUp className="w-5 h-5 text-gray-500" />
						) : (
							<ChevronDown className="w-5 h-5 text-gray-500" />
						)}
					</button>

					{expandedSection === "matrix" && (
						<div className="px-6 pb-6">
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-3 font-semibold text-ds-primary-charcoal">
												Surface Type
											</th>
											<th className="text-left py-3 font-semibold text-ds-primary-charcoal">
												Recommended Primer
											</th>
											<th className="text-left py-3 font-semibold text-ds-primary-charcoal">
												Required?
											</th>
											<th className="text-left py-3 font-semibold text-ds-primary-charcoal">
												Reason
											</th>
										</tr>
									</thead>
									<tbody>
										{compatibilityMatrix.map((item, index) => (
											<tr key={index} className="border-b border-gray-100">
												<td className="py-3 font-medium text-gray-700">
													{item.surface}
												</td>
												<td className="py-3 text-ds-primary-sage">
													{item.recommended}
												</td>
												<td className="py-3">
													{item.required ? (
														<span className="flex items-center space-x-1 text-red-600">
															<AlertTriangle className="w-4 h-4" />
															<span className="font-medium">Yes</span>
														</span>
													) : (
														<span className="flex items-center space-x-1 text-green-600">
															<CheckCircle className="w-4 h-4" />
															<span className="font-medium">Optional</span>
														</span>
													)}
												</td>
												<td className="py-3 text-gray-600">{item.reason}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* CTA Section */}
			<div className="mt-8 text-center">
				<div className="bg-ds-primary-sage/10 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
						Need Help Choosing the Right Primer?
					</h3>
					<p className="text-gray-600 mb-4">
						Our paint experts are here to help you select the perfect primer for
						your project.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<button className="px-6 py-3 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
							Get Expert Consultation
						</button>
						<button className="px-6 py-3 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium">
							Shop All Primers
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
