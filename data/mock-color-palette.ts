import { ColorPalette } from "@/types/colors";

export const mockColorPalettes: ColorPalette[] = [
	{
		id: "modern-neutrals",
		name: "Modern Neutrals",
		description: "Timeless sophistication for contemporary spaces",
		colors: [
			{ hex: "#F5F5DC", name: "Warm Cream" },
			{ hex: "#E5E5E5", name: "Soft Gray" },
			{ hex: "#D3D3D3", name: "Light Stone" },
			{ hex: "#C4A57B", name: "Warm Beige" },
		],
		category: "Neutral",
		popularity: 95,
	},
	{
		id: "sage-harmony",
		name: "Sage Harmony",
		description: "Calming greens inspired by nature",
		colors: [
			{ hex: "#5B7B7A", name: "Sage Whisper" },
			{ hex: "#7A9B8E", name: "Forest Mist" },
			{ hex: "#A8C09A", name: "Garden Fresh" },
			{ hex: "#E8F5E8", name: "Mint Breeze" },
		],
		category: "Green",
		popularity: 88,
	},
	{
		id: "warm-earth",
		name: "Warm Earth",
		description: "Rich, grounding tones for cozy spaces",
		colors: [
			{ hex: "#8B4513", name: "Warm Brown" },
			{ hex: "#D4A574", name: "Mustard Gold" },
			{ hex: "#DEB887", name: "Burlywood" },
			{ hex: "#F5DEB3", name: "Wheat" },
		],
		category: "Brown",
		popularity: 82,
	},
	{
		id: "coastal-blues",
		name: "Coastal Blues",
		description: "Serene blues reminiscent of ocean waves",
		colors: [
			{ hex: "#4682B4", name: "Steel Blue" },
			{ hex: "#87CEEB", name: "Sky Blue" },
			{ hex: "#B0E0E6", name: "Powder Blue" },
			{ hex: "#E0F6FF", name: "Ice Blue" },
		],
		category: "Blue",
		popularity: 76,
	},
	{
		id: "dramatic-darks",
		name: "Dramatic Darks",
		description: "Bold, sophisticated colors for statement walls",
		colors: [
			{ hex: "#2C2C2C", name: "Charcoal Depth" },
			{ hex: "#1C1C1C", name: "Midnight" },
			{ hex: "#36454F", name: "Charcoal Gray" },
			{ hex: "#2F4F4F", name: "Dark Slate" },
		],
		category: "Dark",
		popularity: 71,
	},
	{
		id: "sunset-warmth",
		name: "Sunset Warmth",
		description: "Energizing oranges and warm reds",
		colors: [
			{ hex: "#CD853F", name: "Peru" },
			{ hex: "#D2691E", name: "Chocolate" },
			{ hex: "#F4A460", name: "Sandy Brown" },
			{ hex: "#FFE4B5", name: "Moccasin" },
		],
		category: "Orange",
		popularity: 68,
	},
];
