"use client";

import React from "react";
import { X, Star, ArrowRight, Palette, Shield, Droplets } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RoomRecommendationsProps {
	roomType: string;
	products: Product[];
	onClose: () => void;
}

export const RoomRecommendations: React.FC<RoomRecommendationsProps> = ({
	roomType,
	products,
	onClose,
}) => {
	const roomData = {
		"living-room": {
			name: "Living Room",
			description:
				"High-traffic areas need durable paints that can withstand daily wear while maintaining their beauty.",
			image:
				"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Choose satin or eggshell finishes for easy cleaning",
				"Consider stain-resistant formulas for high-traffic areas",
				"Neutral colors create timeless appeal",
				"Test colors in different lighting conditions",
			],
			idealFeatures: ["Stain Resistant", "Scrubbable", "Fade Resistant"],
			sheenLevels: ["Eggshell", "Satin"],
			colorSuggestions: ["Warm neutrals", "Soft grays", "Earthy tones"],
		},
		bedroom: {
			name: "Bedroom",
			description:
				"Create a peaceful retreat with calming colors and low-odor formulas for better sleep quality.",
			image:
				"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Use flat or matte finishes to minimize light reflection",
				"Choose calming, muted colors for relaxation",
				"Opt for zero-VOC paints for healthier air quality",
				"Consider darker colors for better sleep",
			],
			idealFeatures: ["Zero-VOC", "Low Odor", "Antimicrobial"],
			sheenLevels: ["Flat", "Matte"],
			colorSuggestions: ["Soft blues", "Warm grays", "Muted greens"],
		},
		kitchen: {
			name: "Kitchen",
			description:
				"Cooking areas require easy-to-clean finishes that resist grease, moisture, and frequent scrubbing.",
			image:
				"https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Use semi-gloss or satin finishes for easy cleanup",
				"Choose grease and stain-resistant formulas",
				"Light colors make spaces feel larger and brighter",
				"Consider moisture-resistant options near sinks",
			],
			idealFeatures: ["Stain Resistant", "Scrubbable", "Mold Resistant"],
			sheenLevels: ["Satin", "Semi-Gloss"],
			colorSuggestions: ["Crisp whites", "Warm yellows", "Fresh greens"],
		},
		bathroom: {
			name: "Bathroom",
			description:
				"High-humidity environments need specialized paints that resist mold, mildew, and moisture damage.",
			image:
				"https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Always use mold and mildew-resistant formulas",
				"Choose semi-gloss or satin finishes for moisture protection",
				"Ensure proper ventilation during and after painting",
				"Light colors reflect light and make spaces feel larger",
			],
			idealFeatures: ["Mold Resistant", "Antimicrobial", "Scrubbable"],
			sheenLevels: ["Satin", "Semi-Gloss"],
			colorSuggestions: ["Spa blues", "Clean whites", "Soft greens"],
		},
		nursery: {
			name: "Nursery",
			description:
				"Baby-safe paints with zero harmful chemicals and calming colors for peaceful sleep.",
			image:
				"https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Always choose zero-VOC, non-toxic formulas",
				"Use flat or matte finishes to reduce glare",
				"Opt for calming, gender-neutral colors",
				"Allow extra drying time before baby arrives",
			],
			idealFeatures: ["Zero-VOC", "Low Odor", "Antimicrobial"],
			sheenLevels: ["Flat", "Matte"],
			colorSuggestions: ["Soft pastels", "Warm neutrals", "Gentle yellows"],
		},
		"home-office": {
			name: "Home Office",
			description:
				"Productive workspaces benefit from colors that enhance focus and finishes that are easy to maintain.",
			image:
				"https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800",
			recommendations: [
				"Choose colors that promote focus and creativity",
				"Use eggshell or satin finishes for easy cleaning",
				"Consider accent walls for visual interest",
				"Ensure good lighting when selecting colors",
			],
			idealFeatures: ["Stain Resistant", "Fade Resistant", "Low Odor"],
			sheenLevels: ["Eggshell", "Satin"],
			colorSuggestions: ["Inspiring blues", "Energizing greens", "Warm grays"],
		},
	};

	const currentRoom = roomData[roomType as keyof typeof roomData];
	if (!currentRoom) return null;

	// Filter products that are suitable for this room
	const suitableProducts = products
		.filter(
			(product) =>
				product.features.some((feature) =>
					currentRoom.idealFeatures.some((idealFeature) =>
						feature
							.toLowerCase()
							.includes(idealFeature.toLowerCase().replace(" ", "-"))
					)
				) ||
				product.finishes.some((finish) =>
					currentRoom.sheenLevels.some((sheen) =>
						finish.name.toLowerCase().includes(sheen.toLowerCase())
					)
				)
		)
		.slice(0, 3);

	return (
		<div className="bg-ds-primary-cream/30 border-t border-ds-accent-warmBeige/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						{currentRoom.name} Paint Recommendations
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-500 hover:text-ds-primary-charcoal transition-colors duration-200"
						aria-label="Close recommendations"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Room Info */}
					<div className="lg:col-span-2 space-y-6">
						<div className="flex flex-col md:flex-row gap-6">
							<div className="md:w-1/3">
								<Image
									src={currentRoom.image}
									alt={currentRoom.name}
									className="w-full h-48 object-cover rounded-lg"
									loading="lazy"
								/>
							</div>
							<div className="md:w-2/3">
								<p className="text-gray-700 mb-4 leading-relaxed">
									{currentRoom.description}
								</p>

								{/* Key Recommendations */}
								<div className="space-y-2">
									<h3 className="font-semibold text-ds-primary-charcoal mb-3">
										Expert Tips:
									</h3>
									{currentRoom.recommendations.map((tip, index) => (
										<div key={index} className="flex items-start space-x-2">
											<div className="w-1.5 h-1.5 rounded-full bg-ds-primary-sage mt-2 flex-shrink-0" />
											<span className="text-sm text-gray-700">{tip}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Specifications Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white p-4 rounded-lg border border-gray-200">
								<div className="flex items-center space-x-2 mb-3">
									<Shield className="w-5 h-5 text-ds-primary-sage" />
									<h4 className="font-semibold text-ds-primary-charcoal">
										Ideal Features
									</h4>
								</div>
								<ul className="space-y-1">
									{currentRoom.idealFeatures.map((feature, index) => (
										<li key={index} className="text-sm text-gray-600">
											• {feature}
										</li>
									))}
								</ul>
							</div>

							<div className="bg-white p-4 rounded-lg border border-gray-200">
								<div className="flex items-center space-x-2 mb-3">
									<Droplets className="w-5 h-5 text-ds-primary-sage" />
									<h4 className="font-semibold text-ds-primary-charcoal">
										Recommended Sheen
									</h4>
								</div>
								<ul className="space-y-1">
									{currentRoom.sheenLevels.map((sheen, index) => (
										<li key={index} className="text-sm text-gray-600">
											• {sheen}
										</li>
									))}
								</ul>
							</div>

							<div className="bg-white p-4 rounded-lg border border-gray-200">
								<div className="flex items-center space-x-2 mb-3">
									<Palette className="w-5 h-5 text-ds-primary-sage" />
									<h4 className="font-semibold text-ds-primary-charcoal">
										Color Suggestions
									</h4>
								</div>
								<ul className="space-y-1">
									{currentRoom.colorSuggestions.map((color, index) => (
										<li key={index} className="text-sm text-gray-600">
											• {color}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Recommended Products */}
					<div>
						<h3 className="font-semibold text-ds-primary-charcoal mb-4">
							Recommended Products
						</h3>
						<div className="space-y-4">
							{suitableProducts.map((product) => (
								<div
									key={product.id}
									className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
								>
									<div className="flex items-start space-x-3">
										<Image
											src={product.colors[0].image}
											alt={product.name}
											className="w-16 h-16 object-cover rounded-lg"
											loading="lazy"
										/>
										<div className="flex-1">
											<h4 className="font-semibold text-ds-primary-charcoal mb-1">
												{product.name}
											</h4>
											<p className="text-sm text-gray-600 mb-2">
												{product.brand}
											</p>

											<div className="flex items-center space-x-2 mb-2">
												<div className="flex items-center space-x-1">
													{[1, 2, 3, 4, 5].map((star) => (
														<Star
															key={star}
															className={cn(
																"w-3 h-3",
																star <= product.rating
																	? "text-yellow-400 fill-current"
																	: "text-gray-300"
															)}
														/>
													))}
												</div>
												<span className="text-xs text-gray-600">
													{product.rating}
												</span>
											</div>

											<div className="flex items-center justify-between">
												<span className="font-bold text-ds-primary-charcoal">
													${product.basePrice.toFixed(2)}
												</span>
												<button className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200">
													<ArrowRight className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<button className="w-full mt-4 py-3 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
							View All {currentRoom.name} Paints
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
