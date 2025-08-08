"use client";

import React, { useState } from "react";
import { Palette, Copy, Download, Share2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ColorSwatch {
	hex: string;
	name: string;
	rgb: { r: number; g: number; b: number };
	description: string;
}

export const ColorPaletteDisplay: React.FC = () => {
	const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);
	const [copiedColor, setCopiedColor] = useState<string | null>(null);

	const colorSwatches: ColorSwatch[] = [
		{
			hex: "#5B7B7A",
			name: "Sage Whisper",
			rgb: { r: 91, g: 123, b: 122 },
			description:
				"A sophisticated sage green that brings tranquility and natural elegance to any space.",
		},
		{
			hex: "#2C2C2C",
			name: "Charcoal Depth",
			rgb: { r: 44, g: 44, b: 44 },
			description:
				"Rich, dramatic charcoal that adds depth and modern sophistication.",
		},
		{
			hex: "#F5F5DC",
			name: "Warm Cream",
			rgb: { r: 245, g: 245, b: 220 },
			description:
				"A soft, inviting cream that creates warmth and timeless appeal.",
		},
		{
			hex: "#C4A57B",
			name: "Warm Beige",
			rgb: { r: 196, g: 165, b: 123 },
			description:
				"Earthy beige with golden undertones for cozy, welcoming spaces.",
		},
		{
			hex: "#D4A574",
			name: "Mustard Gold",
			rgb: { r: 212, g: 165, b: 116 },
			description:
				"Vibrant mustard with warm golden notes that energizes any room.",
		},
		{
			hex: "#8B4513",
			name: "Warm Brown",
			rgb: { r: 139, g: 69, b: 19 },
			description:
				"Rich, chocolatey brown that grounds a space with natural warmth.",
		},
	];

	const handleColorSelect = (color: ColorSwatch) => {
		setSelectedColor(color);
	};

	const handleCopyColor = async (hex: string) => {
		try {
			await navigator.clipboard.writeText(hex);
			setCopiedColor(hex);
			setTimeout(() => setCopiedColor(null), 2000);
		} catch (err) {
			console.error("Failed to copy color:", err);
		}
	};

	const handleDownloadPalette = () => {
		// In production, this would generate and download a palette file
		console.log("Download palette functionality would be implemented here");
	};

	const handleSharePalette = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Clare Paint Color Palette",
					text: "Check out this beautiful color palette from Clare Paint",
					url: window.location.href,
				});
			} catch (err) {
				console.log("Sharing cancelled");
			}
		}
	};

	return (
		<section className="py-20 bg-ds-neutral-white">
			<div className="max-w-[1200px] mx-auto px-8">
				<div className="text-center mb-16">
					<h2
						className="font-semibold text-ds-primary-charcoal mb-4"
						style={{ fontSize: "36px", fontFamily: "Inter, sans-serif" }}
					>
						Interactive Color Palette
					</h2>
					<p
						className="text-ds-neutral-mediumGray max-w-3xl mx-auto"
						style={{ fontSize: "16px", fontFamily: "Inter, sans-serif" }}
					>
						Explore our signature colors with our interactive palette. Click any
						color to see detailed information and discover perfect combinations
						for your space.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Color Swatches */}
					<div className="space-y-8">
						<div className="grid grid-cols-3 gap-6">
							{colorSwatches.map((color, index) => (
								<button
									key={color.hex}
									onClick={() => handleColorSelect(color)}
									className={cn(
										"group relative w-full aspect-square rounded-full border-4 transition-all duration-500 hover:scale-110 focus:scale-110 focus:outline-none",
										selectedColor?.hex === color.hex
											? "border-ds-primary-charcoal shadow-2xl scale-110"
											: "border-ds-neutral-white shadow-lg hover:border-ds-primary-sage"
									)}
									style={{ backgroundColor: color.hex }}
									aria-label={`Select ${color.name} color`}
								>
									{/* Color Name Tooltip */}
									<div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ds-primary-charcoal text-ds-neutral-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
										{color.name}
									</div>

									{/* Selection Indicator */}
									{selectedColor?.hex === color.hex && (
										<div className="absolute inset-0 rounded-full border-4 border-ds-primary-charcoal animate-pulse" />
									)}

									{/* Ripple Effect */}
									<div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-ds-neutral-white transition-opacity duration-300" />
								</button>
							))}
						</div>

						{/* Palette Actions */}
						<div className="flex items-center justify-center space-x-4">
							<button
								onClick={handleDownloadPalette}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-300"
							>
								<Download className="w-4 h-4" />
								<span>Download Palette</span>
							</button>
							<button
								onClick={handleSharePalette}
								className="flex items-center space-x-2 px-4 py-2 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-300"
							>
								<Share2 className="w-4 h-4" />
								<span>Share</span>
							</button>
						</div>
					</div>

					{/* Color Details */}
					<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-2xl p-8">
						{selectedColor ? (
							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<div
										className="w-16 h-16 rounded-full border-4 border-ds-neutral-white shadow-lg"
										style={{ backgroundColor: selectedColor.hex }}
									/>
									<div>
										<h3 className="text-2xl font-bold text-ds-primary-charcoal">
											{selectedColor.name}
										</h3>
										<p className="text-ds-neutral-mediumGray">
											Premium Interior Paint
										</p>
									</div>
								</div>

								<p className="text-ds-neutral-darkSlate leading-relaxed">
									{selectedColor.description}
								</p>

								{/* Color Values */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="bg-ds-neutral-white rounded-lg p-4">
										<h4 className="font-semibold text-ds-primary-charcoal mb-2">
											Hex Code
										</h4>
										<div className="flex items-center justify-between">
											<code className="text-ds-neutral-darkSlate font-mono">
												{selectedColor.hex}
											</code>
											<button
												onClick={() => handleCopyColor(selectedColor.hex)}
												className="p-2 hover:bg-ds-neutral-lightGray/50 rounded transition-colors duration-200"
												aria-label="Copy hex code"
											>
												{copiedColor === selectedColor.hex ? (
													<CheckCircle className="w-4 h-4 text-green-600" />
												) : (
													<Copy className="w-4 h-4 text-ds-neutral-mediumGray" />
												)}
											</button>
										</div>
									</div>

									<div className="bg-ds-neutral-white rounded-lg p-4">
										<h4 className="font-semibold text-ds-primary-charcoal mb-2">
											RGB Values
										</h4>
										<code className="text-ds-neutral-darkSlate font-mono text-sm">
											rgb({selectedColor.rgb.r}, {selectedColor.rgb.g},{" "}
											{selectedColor.rgb.b})
										</code>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex space-x-4">
									<Link
										href={`/products?color=${selectedColor.name
											.toLowerCase()
											.replace(" ", "-")}`}
										className="flex-1 py-3 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-300 font-semibold text-center"
									>
										Shop This Color
									</Link>
									<Link
										href="/samples"
										className="flex-1 py-3 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-300 font-semibold text-center"
									>
										Order Sample
									</Link>
								</div>
							</div>
						) : (
							<div className="text-center py-12">
								<Palette className="w-16 h-16 text-ds-neutral-mediumGray mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-ds-primary-charcoal mb-2">
									Select a Color
								</h3>
								<p className="text-ds-neutral-mediumGray">
									Click on any color swatch to see detailed information and
									explore options.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
