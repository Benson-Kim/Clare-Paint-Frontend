"use client";

import React from "react";
import { Beaker, Microscope, Award, Sparkles } from "lucide-react";
import Image from "next/image";

export const BrandMessagingSection: React.FC = () => {
	const features = [
		{
			icon: Beaker,
			title: "Advanced Formulation",
			description:
				"Our chemists perfect every formula for superior performance and longevity.",
		},
		{
			icon: Microscope,
			title: "Quality Testing",
			description:
				"Rigorous testing ensures consistent quality and color accuracy in every batch.",
		},
		{
			icon: Award,
			title: "Industry Recognition",
			description:
				"Award-winning paints trusted by professionals and homeowners alike.",
		},
		{
			icon: Sparkles,
			title: "Innovation Focus",
			description:
				"Continuously developing new technologies for better coverage and durability.",
		},
	];

	return (
		<section className="py-20 bg-ds-primary-charcoal text-ds-neutral-white overflow-hidden">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Content */}
					<div className="space-y-8">
						<div className="space-y-6">
							<h2
								className="font-semibold leading-tight"
								style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
							>
								We Obsess Over Paint,{" "}
								<span className="text-ds-accent-warmBeige">
									So You Don&apos;t Have To
								</span>
							</h2>

							<p
								className="text-ds-neutral-white/90 leading-relaxed"
								style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
							>
								Behind every perfect finish is an obsession with quality that
								goes beyond the surface. Our team of chemists, color experts,
								and craftspeople work tirelessly to ensure that when you choose
								our paint, you&apos;re choosing excellence.
							</p>
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{features.map((feature, index) => (
								<div
									key={index}
									className="group p-6 bg-ds-neutral-white/5 rounded-xl hover:bg-ds-neutral-white/10 transition-all duration-300 border border-ds-neutral-white/10"
								>
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-ds-accent-warmBeige/20 rounded-full flex items-center justify-center group-hover:bg-ds-accent-warmBeige/30 transition-colors duration-300">
											<feature.icon className="w-6 h-6 text-ds-accent-warmBeige" />
										</div>
										<div>
											<h3 className="font-semibold text-ds-neutral-white mb-2">
												{feature.title}
											</h3>
											<p className="text-sm text-ds-neutral-white/80 leading-relaxed">
												{feature.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Quality Promise */}
						<div className="bg-ds-accent-warmBeige/10 border border-ds-accent-warmBeige/20 rounded-xl p-6">
							<h3 className="font-semibold text-ds-neutral-white mb-3 flex items-center space-x-2">
								<Award className="w-5 h-5 text-ds-accent-warmBeige" />
								<span>Our Quality Promise</span>
							</h3>
							<p className="text-sm text-ds-neutral-white/90 leading-relaxed">
								Every gallon of paint undergoes 47 quality checks before it
								reaches your home. If you&apos;re not completely satisfied,
								we&apos;ll make it right—guaranteed.
							</p>
						</div>
					</div>

					{/* Visual Elements */}
					<div className="relative">
						<div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
							<Image
								src="https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=800"
								alt="Paint laboratory showing our commitment to quality and innovation"
								fill
								className="object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-ds-primary-charcoal/60 to-transparent" />
						</div>

						{/* Floating Stats */}
						<div className="absolute top-6 left-6 bg-ds-neutral-white text-ds-primary-charcoal px-6 py-4 rounded-xl shadow-xl">
							<div className="text-center">
								<div className="text-2xl font-bold text-ds-primary-sage">
									47
								</div>
								<div className="text-xs text-ds-neutral-mediumGray">
									Quality Checks
								</div>
							</div>
						</div>

						<div className="absolute bottom-6 right-6 bg-ds-neutral-white text-ds-primary-charcoal px-6 py-4 rounded-xl shadow-xl">
							<div className="text-center">
								<div className="text-2xl font-bold text-ds-primary-sage">
									25+
								</div>
								<div className="text-xs text-ds-neutral-mediumGray">
									Years Experience
								</div>
							</div>
						</div>

						{/* Decorative Elements */}
						<div className="absolute -top-8 -right-8 w-32 h-32 bg-ds-accent-warmBeige/20 rounded-full blur-xl" />
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-ds-primary-sage/20 rounded-full blur-xl" />
					</div>
				</div>
			</div>
		</section>
	);
};
