"use client";

import React, { useState } from "react";
import { X, Palette, Eye, Download, Share2, RefreshCw } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ColorCoordinatesProps {
	products: Product[];
	onClose: () => void;
}

interface ColorScheme {
	id: string;
	name: string;
	description: string;
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		neutral: string;
	};
	mood: string;
	rooms: string[];
}

export const ColorCoordinates: React.FC<ColorCoordinatesProps> = ({
	products,
	onClose,
}) => {
	const [selectedScheme, setSelectedScheme] = useState<ColorScheme | null>(
		null
	);
	const [activeTab, setActiveTab] = useState<"schemes" | "custom" | "trends">(
		"schemes"
	);

	const colorSchemes: ColorScheme[] = [
		{
			id: "modern-neutral",
			name: "Modern Neutral",
			description: "Sophisticated grays and whites with warm undertones",
			colors: {
				primary: "#F5F5F5",
				secondary: "#E0E0E0",
				accent: "#5B7B7A",
				neutral: "#2C2C2C",
			},
			mood: "Calm & Sophisticated",
			rooms: ["Living Room", "Bedroom", "Home Office"],
		},
		{
			id: "warm-earth",
			name: "Warm Earth",
			description: "Rich browns and creams inspired by natural elements",
			colors: {
				primary: "#F5F5DC",
				secondary: "#C4A57B",
				accent: "#8B4513",
				neutral: "#FFFFFF",
			},
			mood: "Cozy & Inviting",
			rooms: ["Living Room", "Dining Room", "Kitchen"],
		},
		{
			id: "coastal-calm",
			name: "Coastal Calm",
			description: "Soft blues and whites reminiscent of ocean breezes",
			colors: {
				primary: "#FFFFFF",
				secondary: "#E6F3FF",
				accent: "#87CEEB",
				neutral: "#F0F8FF",
			},
			mood: "Serene & Fresh",
			rooms: ["Bedroom", "Bathroom", "Nursery"],
		},
		{
			id: "sage-serenity",
			name: "Sage Serenity",
			description: "Muted greens with natural undertones for tranquil spaces",
			colors: {
				primary: "#5B7B7A",
				secondary: "#A8C090",
				accent: "#F5F5DC",
				neutral: "#FFFFFF",
			},
			mood: "Peaceful & Natural",
			rooms: ["Bedroom", "Bathroom", "Home Office"],
		},
		{
			id: "bold-contrast",
			name: "Bold Contrast",
			description: "Dramatic darks balanced with crisp whites",
			colors: {
				primary: "#2C2C2C",
				secondary: "#FFFFFF",
				accent: "#C4A57B",
				neutral: "#F5F5F5",
			},
			mood: "Dramatic & Modern",
			rooms: ["Living Room", "Dining Room", "Home Office"],
		},
		{
			id: "soft-pastels",
			name: "Soft Pastels",
			description: "Gentle colors perfect for nurseries and peaceful spaces",
			colors: {
				primary: "#FFF8E7",
				secondary: "#E6E6FA",
				accent: "#FFE4E1",
				neutral: "#FFFFFF",
			},
			mood: "Gentle & Nurturing",
			rooms: ["Nursery", "Bedroom", "Bathroom"],
		},
	];

	const trendingColors = [
		{ name: "Digital Lime", hex: "#9AFF9A", trend: "Tech-Inspired" },
		{ name: "Warm Terracotta", hex: "#E2725B", trend: "Earth Tones" },
		{ name: "Classic Blue", hex: "#0F4C75", trend: "Timeless" },
		{ name: "Living Coral", hex: "#FF6B6B", trend: "Vibrant" },
		{ name: "Ultra Violet", hex: "#6B5B95", trend: "Bold" },
		{ name: "Greenery", hex: "#88B04B", trend: "Natural" },
	];

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const generateRandomScheme = () => {
		const randomScheme =
			colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
		setSelectedScheme(randomScheme);
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
		>
			<div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<div className="flex items-center space-x-3">
						<Palette className="w-6 h-6 text-ds-primary-sage" />
						<div>
							<h2 className="text-2xl font-bold text-ds-primary-charcoal">
								Color Coordinates
							</h2>
							<p className="text-gray-600">
								Discover perfect color combinations for your space
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<button
							onClick={generateRandomScheme}
							className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200"
							title="Generate random scheme"
						>
							<RefreshCw className="w-5 h-5" />
						</button>
						<button className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200">
							<Download className="w-5 h-5" />
						</button>
						<button className="p-2 text-gray-600 hover:text-ds-primary-sage transition-colors duration-200">
							<Share2 className="w-5 h-5" />
						</button>
						<button
							onClick={onClose}
							className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
				</div>

				<div className="p-6">
					{/* Tab Navigation */}
					<div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
						<button
							onClick={() => setActiveTab("schemes")}
							className={cn(
								"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === "schemes"
									? "bg-white text-ds-primary-sage shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							)}
						>
							Color Schemes
						</button>
						<button
							onClick={() => setActiveTab("custom")}
							className={cn(
								"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === "custom"
									? "bg-white text-ds-primary-sage shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							)}
						>
							Custom Palette
						</button>
						<button
							onClick={() => setActiveTab("trends")}
							className={cn(
								"flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === "trends"
									? "bg-white text-ds-primary-sage shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							)}
						>
							Color Trends
						</button>
					</div>

					{activeTab === "schemes" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Scheme Selection */}
							<div className="lg:col-span-2">
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Curated Color Schemes
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{colorSchemes.map((scheme) => (
										<button
											key={scheme.id}
											onClick={() => setSelectedScheme(scheme)}
											className={cn(
												"p-4 rounded-lg border-2 text-left transition-all duration-200 group",
												selectedScheme?.id === scheme.id
													? "border-ds-primary-sage bg-ds-primary-sage/5"
													: "border-gray-200 hover:border-gray-300"
											)}
										>
											{/* Color Swatches */}
											<div className="flex space-x-2 mb-3">
												<div
													className="w-8 h-8 rounded-full border border-gray-200"
													style={{ backgroundColor: scheme.colors.primary }}
												/>
												<div
													className="w-8 h-8 rounded-full border border-gray-200"
													style={{ backgroundColor: scheme.colors.secondary }}
												/>
												<div
													className="w-8 h-8 rounded-full border border-gray-200"
													style={{ backgroundColor: scheme.colors.accent }}
												/>
												<div
													className="w-8 h-8 rounded-full border border-gray-200"
													style={{ backgroundColor: scheme.colors.neutral }}
												/>
											</div>

											<h4 className="font-semibold text-ds-primary-charcoal mb-1">
												{scheme.name}
											</h4>
											<p className="text-sm text-gray-600 mb-2">
												{scheme.description}
											</p>
											<div className="flex items-center justify-between text-xs">
												<span className="text-ds-primary-sage font-medium">
													{scheme.mood}
												</span>
												<span className="text-gray-500">
													{scheme.rooms.length} rooms
												</span>
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Selected Scheme Details */}
							<div>
								{selectedScheme ? (
									<div className="bg-gray-50 rounded-lg p-6">
										<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
											{selectedScheme.name}
										</h3>

										{/* Large Color Preview */}
										<div className="grid grid-cols-2 gap-2 mb-4">
											<div
												className="h-20 rounded-lg border border-gray-200 flex items-end p-2"
												style={{
													backgroundColor: selectedScheme.colors.primary,
												}}
											>
												<span className="text-xs font-medium bg-white/90 px-2 py-1 rounded">
													Primary
												</span>
											</div>
											<div
												className="h-20 rounded-lg border border-gray-200 flex items-end p-2"
												style={{
													backgroundColor: selectedScheme.colors.secondary,
												}}
											>
												<span className="text-xs font-medium bg-white/90 px-2 py-1 rounded">
													Secondary
												</span>
											</div>
											<div
												className="h-20 rounded-lg border border-gray-200 flex items-end p-2"
												style={{
													backgroundColor: selectedScheme.colors.accent,
												}}
											>
												<span className="text-xs font-medium bg-white/90 px-2 py-1 rounded">
													Accent
												</span>
											</div>
											<div
												className="h-20 rounded-lg border border-gray-200 flex items-end p-2"
												style={{
													backgroundColor: selectedScheme.colors.neutral,
												}}
											>
												<span className="text-xs font-medium bg-black/70 text-white px-2 py-1 rounded">
													Neutral
												</span>
											</div>
										</div>

										{/* Color Codes */}
										<div className="space-y-2 mb-4">
											<div className="flex justify-between text-sm">
												<span>Primary:</span>
												<span className="font-mono">
													{selectedScheme.colors.primary}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span>Secondary:</span>
												<span className="font-mono">
													{selectedScheme.colors.secondary}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span>Accent:</span>
												<span className="font-mono">
													{selectedScheme.colors.accent}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span>Neutral:</span>
												<span className="font-mono">
													{selectedScheme.colors.neutral}
												</span>
											</div>
										</div>

										{/* Scheme Info */}
										<div className="space-y-3">
											<div>
												<h5 className="font-medium text-ds-primary-charcoal mb-1">
													Mood
												</h5>
												<p className="text-sm text-gray-600">
													{selectedScheme.mood}
												</p>
											</div>
											<div>
												<h5 className="font-medium text-ds-primary-charcoal mb-1">
													Best for
												</h5>
												<div className="flex flex-wrap gap-1">
													{selectedScheme.rooms.map((room, index) => (
														<span
															key={index}
															className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded-full"
														>
															{room}
														</span>
													))}
												</div>
											</div>
										</div>

										<button className="w-full mt-4 py-2 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200">
											Find Matching Paints
										</button>
									</div>
								) : (
									<div className="bg-gray-50 rounded-lg p-6 text-center">
										<Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
										<h3 className="font-medium text-ds-primary-charcoal mb-2">
											Select a Color Scheme
										</h3>
										<p className="text-sm text-gray-600">
											Choose a scheme to see detailed color information and
											matching paint options.
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === "trends" && (
						<div>
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								2024 Color Trends
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{trendingColors.map((color, index) => (
									<div
										key={index}
										className="bg-white border border-gray-200 rounded-lg p-4"
									>
										<div
											className="w-full h-24 rounded-lg mb-3 border border-gray-200"
											style={{ backgroundColor: color.hex }}
										/>
										<h4 className="font-semibold text-ds-primary-charcoal mb-1">
											{color.name}
										</h4>
										<p className="text-sm text-gray-600 mb-2">{color.hex}</p>
										<span className="text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-1 rounded-full">
											{color.trend}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "custom" && (
						<div className="text-center py-12">
							<Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-2">
								Custom Palette Builder
							</h3>
							<p className="text-gray-600 mb-6">
								Create your own custom color palette with our advanced color
								picker tools.
							</p>
							<button className="px-6 py-3 bg-ds-primary-sage text-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200">
								Launch Color Picker
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
