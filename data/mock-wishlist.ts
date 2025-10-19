import { WishlistItem } from "@/types/product";

// Mock wishlist items - in production, this would come from wishlist store
export const mockWishlistItems: WishlistItem[] = [
	{
		id: "1",
		name: "Premium Interior Paint",
		brand: "Artisan Pro",
		color: "Sage Whisper",
		price: 89.99,
		originalPrice: 99.99,
		image:
			"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=400",
		inStock: true,
		rating: 4.8,
		onSale: true,
	},
	{
		id: "2",
		name: "Exterior Acrylic Paint",
		brand: "WeatherGuard Pro",
		color: "Classic White",
		price: 99.99,
		image:
			"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=400",
		inStock: true,
		rating: 4.9,
	},
	{
		id: "3",
		name: "Specialty Primer",
		brand: "PrimeShield",
		color: "Universal Gray",
		price: 34.99,
		image:
			"https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg?auto=compress&cs=tinysrgb&w=400",
		inStock: false,
		rating: 4.7,
	},
];
