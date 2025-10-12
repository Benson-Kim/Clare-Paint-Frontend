import { SocialMediaPost } from "@/types/gallery";

export const mockSocialMediaPosts: SocialMediaPost[] = [
	{
		id: "sm-001",
		platform: "instagram",
		username: "paint_inspiration",
		profileUrl: "https://instagram.com/paint_inspiration",
		imageUrl:
			"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Loving this sage green in a cozy reading nook! #paintideas #homedecor",
		likes: 1230,
		comments: 45,
		postUrl: "https://instagram.com/p/12345",
		timestamp: "2024-07-30T10:00:00Z",
		hashtags: ["paintideas", "homedecor", "sagewhisper"],
	},
	{
		id: "sm-002",
		platform: "facebook",
		username: "DreamHomesOfficial",
		profileUrl: "https://facebook.com/dreamhomesofficial",
		imageUrl:
			"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Our latest project: a modern living room with a stunning accent wall! What do you think?",
		likes: 890,
		comments: 70,
		postUrl: "https://facebook.com/post/67890",
		timestamp: "2024-07-29T14:30:00Z",
		hashtags: ["livingroom", "accentwall", "interiordesign"],
	},
	{
		id: "sm-003",
		platform: "pinterest",
		username: "ColorTrendsDaily",
		profileUrl: "https://pinterest.com/colortrendsdaily",
		imageUrl:
			"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
		caption:
			"Deep burgundy is making a comeback! Perfect for a dramatic dining room.",
		likes: 2100,
		comments: 120,
		postUrl: "https://pinterest.com/pin/112233",
		timestamp: "2024-07-28T09:15:00Z",
		hashtags: ["burgundy", "diningroom", "colortrends"],
	},
];
