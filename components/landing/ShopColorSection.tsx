"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Heart } from "lucide-react";

export const ShopColorSection: React.FC = () => {
	const [hoveredPalette, setHoveredPalette] = useState<string | null>(null);

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="text-center mb-16">
					<h2
						className="font-semibold text-ds-primary-charcoal mb-4"
						style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
					>
						Shop Color Palettes
					</h2>
					<p
						className="text-ds-neutral-mediumGray max-w-3xl mx-auto"
						style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
					>
						Discover expertly curated color combinations that work beautifully
						together. Each palette is designed to create harmony and flow
						throughout your space.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{colorPalettes.map((palette) => (
						<div
							key={palette.id}
							className="group cursor-pointer"
							onMouseEnter={() => setHoveredPalette(palette.id)}
							onMouseLeave={() => setHoveredPalette(null)}
						>
							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
								{/* Color Swatches */}
								<div className="grid grid-cols-4 h-32">
									{palette.colors.map((color, index) => (
										<div
											key={index}
											className="relative overflow-hidden transition-all duration-500 group-hover:scale-110"
											style={{
												backgroundColor: color.hex,
												transitionDelay: `${index * 100}ms`,
											}}
										>
											{hoveredPalette === palette.id && (
												<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
													<span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
														{color.name}
													</span>
												</div>
											)}
										</div>
									))}
								</div>

								{/* Content */}
								<div className="p-6">
									<div className="flex items-start justify-between mb-3">
										<div>
											<h3 className="font-semibold text-ds-primary-charcoal text-lg mb-1">
												{palette.name}
											</h3>
											<span className="text-xs text-ds-primary-sage bg-ds-primary-sage/10 px-2 py-1 rounded-full">
												{palette.category}
											</span>
										</div>
										<div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<button className="p-2 bg-ds-neutral-lightGray/50 rounded-full hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-colors duration-200">
												<Heart className="w-4 h-4" />
											</button>
											<button className="p-2 bg-ds-neutral-lightGray/50 rounded-full hover:bg-ds-primary-sage hover:text-ds-neutral-white transition-colors duration-200">
												<Eye className="w-4 h-4" />
											</button>
										</div>
									</div>

									<p className="text-sm text-ds-neutral-mediumGray mb-4 leading-relaxed">
										{palette.description}
									</p>

									{/* Popularity Bar */}
									<div className="mb-4">
										<div className="flex items-center justify-between text-xs text-ds-neutral-mediumGray mb-1">
											<span>Popularity</span>
											<span>{palette.popularity}%</span>
										</div>
										<div className="w-full bg-ds-neutral-lightGray rounded-full h-2">
											<div
												className="bg-ds-primary-sage h-2 rounded-full transition-all duration-1000 ease-out"
												style={{
													width:
														hoveredPalette === palette.id
															? `${palette.popularity}%`
															: "0%",
												}}
											/>
										</div>
									</div>

									{/* Action Button */}
									<Link
										href={`/colors/${palette.id}`}
										className="inline-flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-300 font-semibold text-sm group"
									>
										<span>Explore Palette</span>
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* View All CTA */}
				<div className="text-center mt-16">
					<Link
						href="/colors"
						className="inline-flex items-center space-x-3 px-8 py-4 bg-ds-accent-warmBeige text-ds-neutral-white rounded-lg hover:bg-ds-accent-warmBeige/90 transition-all duration-300 font-semibold text-lg group hover:scale-105"
					>
						<span>View All Color Palettes</span>
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</Link>
				</div>
			</div>
		</section>
	);
};
