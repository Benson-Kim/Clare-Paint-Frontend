import { Product, PRODUCT_CATEGORIES } from "@/types/product";

export const mockProducts: Product[] = [
	{
		id: "eco-friendly-paint-002",
		name: "Eco-Friendly Interior Paint",
		brand: "Green Living",
		description:
			"Environmentally conscious paint made with natural ingredients and zero harmful chemicals. Perfect for families with children and pets.",
		basePrice: 79.99,
		colors: [
			{
				id: "forest-green",
				name: "Forest Green",
				hex: "#228B22",
				image:
					"https://images.pexels.com/photos/6782373/pexels-photo-6782373.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 34, g: 139, b: 34 },
			},
			{
				id: "ocean-blue",
				name: "Ocean Blue",
				hex: "#006994",
				image:
					"https://images.pexels.com/photos/6782374/pexels-photo-6782374.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 0, g: 105, b: 148 },
			},
		],
		finishes: [
			{
				id: "matte",
				name: "Matte",
				description: "Natural matte finish",
				sheen: "5-10%",
				price: 0,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
			{
				id: "satin",
				name: "Satin",
				description: "Eco-friendly satin finish",
				sheen: "25-35%",
				price: 6,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Made with natural ingredients",
			"Zero harmful chemicals",
			"Safe for children and pets",
			"Low odor formula",
			"Biodegradable",
			"Sustainable packaging",
		],
		coverage: "300-350 sq ft per gallon",
		dryTime: "Touchdr: 3 hours,Recoa: 6 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-2",
				userName: "Mike R.",
				rating: 4,
				comment:
					"Great eco-friendly option. No strong odors and safe for the kids.",
				date: "2024-01-12",
				verified: true,
			},
		],
		rating: 4.5,
		reviewCount: 89,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "GRN-ECO-INT-002",
	},
	{
		id: "luxury-paint-003",
		name: "Luxury Designer Paint",
		brand: "Elite Colors",
		description:
			"Premium designer paint with rich pigments and superior coverage. Used by professional interior designers worldwide.",
		basePrice: 129.99,
		colors: [
			{
				id: "deep-burgundy",
				name: "Deep Burgundy",
				hex: "#800020",
				image:
					"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 128, g: 0, b: 32 },
			},
			{
				id: "royal-navy",
				name: "Royal Navy",
				hex: "#002147",
				image:
					"https://images.pexels.com/photos/6782376/pexels-photo-6782376.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: false,
				rgb: { r: 0, g: 33, b: 71 },
			},
		],
		finishes: [
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Luxury eggshell finish",
				sheen: "10-25%",
				price: 10,
				coverage: "400-450 sq ft per gallon",
				inStock: true,
			},
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				description: "Premium semi-gloss finish",
				sheen: "35-70%",
				price: 15,
				coverage: "400-450 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Designer-grade pigments",
			"Superior coverage and hide",
			"Exceptional durability",
			"Fade-resistant formula",
			"Professional quality",
			"Color-matched guarantee",
		],
		coverage: "400-450 sq ft per gallon",
		dryTime: "Touchdr: 1 hour,Recoa: 3 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "review-3",
				userName: "Jennifer L.",
				rating: 5,
				comment: "Absolutely stunning colors and finish. Worth every penny!",
				date: "2024-01-10",
				verified: true,
			},
		],
		rating: 4.9,
		reviewCount: 156,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "ELT-LUX-INT-003",
	},
	{
		id: "budget-paint-004",
		name: "Value Interior Paint",
		brand: "Home Essentials",
		description:
			"Quality paint at an affordable price. Perfect for budget-conscious homeowners who don't want to compromise on quality.",
		basePrice: 39.99,
		colors: [
			{
				id: "classic-white",
				name: "Classic White",
				hex: "#FFFFFF",
				image:
					"https://images.pexels.com/photos/6782377/pexels-photo-6782377.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: false,
				rgb: { r: 255, g: 255, b: 255 },
			},
			{
				id: "soft-gray",
				name: "Soft Gray",
				hex: "#D3D3D3",
				image:
					"https://images.pexels.com/photos/6782378/pexels-photo-6782378.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 211, g: 211, b: 211 },
			},
		],
		finishes: [
			{
				id: "flat",
				name: "Flat",
				description: "Basic flat finish",
				sheen: "0-5%",
				price: 0,
				coverage: "300-350 sq ft per gallon",
				inStock: false,
			},
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Standard eggshell finish",
				sheen: "10-25%",
				price: 3,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Good coverage and hide",
			"Easy application",
			"Quick drying",
			"Washable finish",
			"Great value",
			"Multiple color options",
		],
		coverage: "300-350 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-4",
				userName: "Tom K.",
				rating: 4,
				comment: "Great value for the price. Does the job well.",
				date: "2024-01-08",
				verified: true,
			},
		],
		rating: 4.2,
		reviewCount: 203,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "HOM-VAL-INT-004",
	},
	{
		id: "specialty-paint-005",
		name: "Magnetic Chalkboard Paint",
		brand: "Creative Spaces",
		description:
			"Innovative paint that creates a magnetic chalkboard surface. Perfect for kids' rooms, offices, and creative spaces.",
		basePrice: 159.99,
		colors: [
			{
				id: "chalkboard-black",
				name: "Chalkboard Black",
				hex: "#1C1C1C",
				image:
					"https://images.pexels.com/photos/6782379/pexels-photo-6782379.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 28, g: 28, b: 28 },
			},
			{
				id: "chalkboard-green",
				name: "Chalkboard Green",
				hex: "#355E3B",
				image:
					"https://images.pexels.com/photos/6782380/pexels-photo-6782380.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 53, g: 94, b: 59 },
			},
		],
		finishes: [
			{
				id: "chalkboard",
				name: "Chalkboard",
				description: "Magnetic chalkboard finish",
				sheen: "0%",
				price: 0,
				coverage: "200-250 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Magnetic surface",
			"Chalkboard functionality",
			"Easy to clean",
			"Durable finish",
			"Kid-safe formula",
			"Creative possibilities",
		],
		coverage: "200-250 sq ft per gallon",
		dryTime: "Touchdr: 4 hours,Recoa: 8 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-5",
				userName: "Lisa P.",
				rating: 5,
				comment: "Amazing product! The kids love their new chalkboard wall.",
				date: "2024-01-05",
				verified: true,
			},
		],
		rating: 4.7,
		reviewCount: 78,
		inStock: true,
		category: PRODUCT_CATEGORIES.SPECIALTY_PAINT,
		sku: "CRE-MAG-CHK-005",
	},
	{
		id: "bathroom-paint-006",
		name: "Bathroom & Kitchen Paint",
		brand: "Moisture Shield",
		description:
			"Specially formulated for high-moisture areas. Resists mold, mildew, and humidity while maintaining beautiful color.",
		basePrice: 94.99,
		colors: [
			{
				id: "spa-blue",
				name: "Spa Blue",
				hex: "#87CEEB",
				image:
					"https://images.pexels.com/photos/6782381/pexels-photo-6782381.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 135, g: 206, b: 235 },
			},
			{
				id: "mint-fresh",
				name: "Mint Fresh",
				hex: "#98FB98",
				image:
					"https://images.pexels.com/photos/6782382/pexels-photo-6782382.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 152, g: 251, b: 152 },
			},
		],
		finishes: [
			{
				id: "satin",
				name: "Satin",
				description: "Moisture-resistant satin",
				sheen: "25-35%",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: false,
			},
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				description: "High-moisture semi-gloss",
				sheen: "35-70%",
				price: 8,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Mold and mildew resistant",
			"Humidity resistant",
			"Easy to clean",
			"Stain resistant",
			"Antimicrobial protection",
			"Long-lasting color",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-6",
				userName: "David S.",
				rating: 4,
				comment: "Perfect for our bathroom renovation. No mold issues so far!",
				date: "2024-01-03",
				verified: true,
			},
		],
		rating: 4.6,
		reviewCount: 134,
		inStock: true,
		category: PRODUCT_CATEGORIES.SPECIALTY_PAINT,
		sku: "MOI-BAT-KIT-006",
	},

	{
		id: "premium-interior-001",
		name: "Premium Interior Latex Paint",
		brand: "Artisan Pro",
		description:
			"Our flagship premium interior paint delivers exceptional coverage, durability, and color richness. Perfect for living rooms, bedrooms, and dining areas with superior hide and fade resistance.",
		basePrice: 89.99,
		colors: [
			{
				id: "sage-whisper",
				name: "Sage Whisper",
				hex: "#5B7B7A",
				image:
					"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 91, g: 123, b: 122 },
			},
			{
				id: "charcoal-depth",
				name: "Charcoal Depth",
				hex: "#2C2C2C",
				image:
					"https://images.pexels.com/photos/6782370/pexels-photo-6782370.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 44, g: 44, b: 44 },
			},
			{
				id: "warm-cream",
				name: "Warm Cream",
				hex: "#F5F5DC",
				image:
					"https://images.pexels.com/photos/6782372/pexels-photo-6782372.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 245, g: 245, b: 220 },
			},
		],
		finishes: [
			{
				id: "matte",
				name: "Matte",
				description: "Low sheen for sophisticated, modern look",
				sheen: "5-10%",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Subtle sheen with easy cleaning",
				sheen: "10-25%",
				price: 5,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "satin",
				name: "Satin",
				description: "Smooth finish with durability",
				sheen: "25-35%",
				price: 8,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Zero-VOC formula for healthier indoor air",
			"Superior hide and coverage",
			"Stain-resistant technology",
			"Perfect for living rooms and bedrooms",
			"Fade-resistant pigments",
			"Mildew-resistant",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "review-1",
				userName: "Sarah M.",
				rating: 5,
				comment:
					"Perfect for our living room renovation. The Sage Whisper color is exactly what we wanted.",
				date: "2024-01-15",
				verified: true,
			},
		],
		rating: 4.8,
		reviewCount: 127,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "ART-PREM-INT-001",
	},
	{
		id: "kitchen-bath-002",
		name: "Kitchen & Bath Interior Paint",
		brand: "Moisture Shield",
		description:
			"Specially formulated for high-moisture areas like kitchens and bathrooms. Features superior mold and mildew resistance with easy-clean technology.",
		basePrice: 94.99,
		colors: [
			{
				id: "spa-blue",
				name: "Spa Blue",
				hex: "#87CEEB",
				image:
					"https://images.pexels.com/photos/6782381/pexels-photo-6782381.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 135, g: 206, b: 235 },
			},
			{
				id: "mint-fresh",
				name: "Mint Fresh",
				hex: "#98FB98",
				image:
					"https://images.pexels.com/photos/6782382/pexels-photo-6782382.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 152, g: 251, b: 152 },
			},
			{
				id: "pure-white",
				name: "Pure White",
				hex: "#FFFFFF",
				image:
					"https://images.pexels.com/photos/6782383/pexels-photo-6782383.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{
				id: "satin",
				name: "Satin",
				description: "Moisture-resistant satin finish",
				sheen: "25-35%",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				description: "High-moisture semi-gloss finish",
				sheen: "35-70%",
				price: 8,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Mold and mildew resistant",
			"Perfect for kitchens and bathrooms",
			"Easy to clean and scrub",
			"Humidity resistant",
			"Antimicrobial protection",
			"Stain resistant",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-2",
				userName: "David S.",
				rating: 4,
				comment:
					"Perfect for our bathroom renovation. No mold issues after 6 months!",
				date: "2024-01-03",
				verified: true,
			},
		],
		rating: 4.6,
		reviewCount: 134,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "MOI-KIT-BAT-002",
	},
	{
		id: "bedroom-sanctuary-003",
		name: "Bedroom Sanctuary Paint",
		brand: "Tranquil Spaces",
		description:
			"Specially formulated for bedrooms with calming properties and ultra-low odor. Features advanced air-purifying technology for better sleep quality.",
		basePrice: 79.99,
		colors: [
			{
				id: "lavender-mist",
				name: "Lavender Mist",
				hex: "#E6E6FA",
				image:
					"https://images.pexels.com/photos/6782384/pexels-photo-6782384.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 230, g: 230, b: 250 },
			},
			{
				id: "soft-gray",
				name: "Soft Gray",
				hex: "#D3D3D3",
				image:
					"https://images.pexels.com/photos/6782385/pexels-photo-6782385.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 211, g: 211, b: 211 },
			},
			{
				id: "warm-beige",
				name: "Warm Beige",
				hex: "#C4A57B",
				image:
					"https://images.pexels.com/photos/6782386/pexels-photo-6782386.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 196, g: 165, b: 123 },
			},
		],
		finishes: [
			{
				id: "flat",
				name: "Flat",
				description: "Ultra-smooth flat finish",
				sheen: "0-5%",
				price: 0,
				coverage: "400-450 sq ft per gallon",
				inStock: false,
			},
			{
				id: "matte",
				name: "Matte",
				description: "Low-sheen matte finish",
				sheen: "5-10%",
				price: 3,
				coverage: "400-450 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Ultra-low odor formula",
			"Perfect for bedrooms and nurseries",
			"Air-purifying technology",
			"Promotes better sleep quality",
			"Zero-VOC certified",
			"Hypoallergenic",
		],
		coverage: "400-450 sq ft per gallon",
		dryTime: "Touchdr: 1 hour,Recoa: 3 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-3",
				userName: "Jennifer L.",
				rating: 5,
				comment:
					"Amazing for our nursery. No smell at all and the color is perfect.",
				date: "2024-01-08",
				verified: true,
			},
		],
		rating: 4.9,
		reviewCount: 89,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "TRQ-BED-SAN-003",
	},
	{
		id: "living-room-luxury-004",
		name: "Living Room Luxury Paint",
		brand: "Elite Interiors",
		description:
			"Premium paint designed for high-traffic living areas. Features superior durability, rich color depth, and elegant finish options perfect for entertaining spaces.",
		basePrice: 109.99,
		colors: [
			{
				id: "deep-burgundy",
				name: "Deep Burgundy",
				hex: "#800020",
				image:
					"https://images.pexels.com/photos/6782387/pexels-photo-6782387.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 128, g: 0, b: 32 },
			},
			{
				id: "royal-navy",
				name: "Royal Navy",
				hex: "#002147",
				image:
					"https://images.pexels.com/photos/6782388/pexels-photo-6782388.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 0, g: 33, b: 71 },
			},
			{
				id: "golden-wheat",
				name: "Golden Wheat",
				hex: "#F5DEB3",
				image:
					"https://images.pexels.com/photos/6782389/pexels-photo-6782389.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 245, g: 222, b: 179 },
			},
		],
		finishes: [
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Elegant eggshell finish",
				sheen: "10-25%",
				price: 5,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "satin",
				name: "Satin",
				description: "Luxurious satin finish",
				sheen: "25-35%",
				price: 10,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				description: "Premium semi-gloss finish",
				sheen: "35-70%",
				price: 15,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Superior durability for high-traffic areas",
			"Perfect for living rooms and dining rooms",
			"Rich color depth and clarity",
			"Scuff and mark resistant",
			"Easy to clean and maintain",
			"Professional-grade quality",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "review-4",
				userName: "Michael R.",
				rating: 5,
				comment:
					"Transformed our living room completely. The Deep Burgundy is stunning!",
				date: "2024-01-12",
				verified: true,
			},
		],
		rating: 4.7,
		reviewCount: 156,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "ELT-LIV-LUX-004",
	},
	{
		id: "eco-friendly-005",
		name: "Eco-Friendly Interior Paint",
		brand: "Green Living",
		description:
			"Environmentally conscious paint made with natural ingredients and zero harmful chemicals. Perfect for eco-conscious families and sustainable home projects.",
		basePrice: 74.99,
		colors: [
			{
				id: "forest-green",
				name: "Forest Green",
				hex: "#228B22",
				image:
					"https://images.pexels.com/photos/6782390/pexels-photo-6782390.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 34, g: 139, b: 34 },
			},
			{
				id: "earth-brown",
				name: "Earth Brown",
				hex: "#8B4513",
				image:
					"https://images.pexels.com/photos/6782391/pexels-photo-6782391.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 139, g: 69, b: 19 },
			},
			{
				id: "natural-white",
				name: "Natural White",
				hex: "#FFFEF7",
				image:
					"https://images.pexels.com/photos/6782392/pexels-photo-6782392.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 255, g: 254, b: 247 },
			},
		],
		finishes: [
			{
				id: "matte",
				name: "Matte",
				description: "Natural matte finish",
				sheen: "5-10%",
				price: 0,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Eco-friendly eggshell finish",
				sheen: "10-25%",
				price: 4,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Made with natural ingredients",
			"Zero harmful chemicals",
			"Safe for all rooms including nurseries",
			"Biodegradable formula",
			"Sustainable packaging",
			"GREENGUARD Gold certified",
		],
		coverage: "300-350 sq ft per gallon",
		dryTime: "Touchdr: 3 hours,Recoa: 6 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "review-5",
				userName: "Lisa P.",
				rating: 4,
				comment:
					"Great eco-friendly option. Perfect for our sustainable home project.",
				date: "2024-01-05",
				verified: true,
			},
		],
		rating: 4.5,
		reviewCount: 78,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "GRN-ECO-INT-005",
	},
	{
		id: "ceiling-specialist-006",
		name: "Ceiling Specialist Paint",
		brand: "Overhead Pro",
		description:
			"Specially formulated for ceilings with superior hide, minimal splatter, and easy application. Features flat finish that minimizes imperfections and provides uniform coverage.",
		basePrice: 69.99,
		colors: [
			{
				id: "ceiling-white",
				name: "Ceiling White",
				hex: "#FEFEFE",
				image:
					"https://images.pexels.com/photos/6782393/pexels-photo-6782393.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 254, g: 254, b: 254 },
			},
			{
				id: "antique-white",
				name: "Antique White",
				hex: "#FAEBD7",
				image:
					"https://images.pexels.com/photos/6782394/pexels-photo-6782394.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 250, g: 235, b: 215 },
			},
		],
		finishes: [
			{
				id: "flat",
				name: "Flat",
				description: "Ultra-flat ceiling finish",
				sheen: "0-5%",
				price: 0,
				coverage: "400-450 sq ft per gallon",
				inStock: false,
			},
		],
		features: [
			"Specially formulated for ceilings",
			"Superior hide and coverage",
			"Minimal splatter application",
			"Hides surface imperfections",
			"Easy roller application",
			"Quick drying formula",
		],
		coverage: "400-450 sq ft per gallon",
		dryTime: "Touchdr: 1 hour,Recoa: 2 hours",
		application: ["Roller"],
		reviews: [
			{
				id: "review-6",
				userName: "Tom K.",
				rating: 4,
				comment:
					"Made ceiling painting so much easier. Great coverage and no drips.",
				date: "2024-01-01",
				verified: true,
			},
		],
		rating: 4.3,
		reviewCount: 92,
		inStock: true,
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "OVR-CEIL-SPE-006",
	},

	{
		id: "exterior-acrylic-001",
		name: "Premium Exterior Acrylic Latex",
		brand: "WeatherGuard Pro",
		description:
			"Our top-tier exterior paint offers exceptional durability and weather resistance. Formulated with 100% acrylic resins for superior adhesion, flexibility, and color retention, even in harsh climates.",
		basePrice: 99.99,
		colors: [
			{
				id: "classic-white-ext",
				name: "Classic White",
				hex: "#F8F8F8",
				image:
					"https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 248, g: 248, b: 248 },
			},
			{
				id: "stone-gray-ext",
				name: "Stone Gray",
				hex: "#8C8C8C",
				image:
					"https://images.pexels.com/photos/164006/pexels-photo-164006.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 140, g: 140, b: 140 },
			},
			{
				id: "forest-green-ext",
				name: "Forest Green",
				hex: "#228B22",
				image:
					"https://images.pexels.com/photos/164007/pexels-photo-164007.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 34, g: 139, b: 34 },
			},
		],
		finishes: [
			{
				id: "satin-ext",
				name: "Satin",
				description:
					"Smooth, low-sheen finish with excellent durability and easy cleaning.",
				sheen: "25-35%",
				price: 0,
				coverage: "300-350 sq ft per gallon",
				inStock: true,
			},
			{
				id: "semi-gloss-ext",
				name: "Semi-Gloss",
				description:
					"Durable, higher-sheen finish ideal for trim, doors, and high-traffic areas.",
				sheen: "35-70%",
				price: 8,
				coverage: "300-350 sq ft per gallon",
				inStock: false,
			},
		],
		features: [
			"100% Acrylic for superior adhesion",
			"Excellent color retention and fade resistance",
			"Mildew and algae resistant coating",
			"Low temperature application (down to 35°F)",
			"Fast drying for quick recoat",
			"Resists cracking, peeling, and blistering",
		],
		coverage: "300-350 sq ft per gallon",
		dryTime: "Touchdr: 1 hour,Recoa: 4 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "ext-review-1",
				userName: "Homeowner H.",
				rating: 5,
				comment:
					"Painted my entire house with this. Looks fantastic and has held up perfectly through a harsh winter and hot summer.",
				date: "2024-05-20",
				verified: true,
			},
		],
		rating: 4.9,
		reviewCount: 210,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PAINT,
		sku: "WGP-EXT-ACR-001",
		reorderable: true,
		weatherResistance: "Excellent",
		durabilityRating: 5,
		surfaceTypes: ["Wood", "Siding", "Masonry", "Stucco", "Fiber Cement"],
		climateZones: ["All Climates", "Hot & Humid", "Cold & Dry"],
		maintenanceSchedule: {
			interval: "Every 2-3 years",
			tasks: [
				"Inspect for cracks/peeling",
				"Clean surface with mild detergent",
				"Touch up minor areas",
			],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-1a",
				before:
					"https://images.pexels.com/photos/164008/pexels-photo-164008.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164009/pexels-photo-164009.jpeg?auto=compress&cs=tinysrgb&w=800",
				description:
					"Transformed a faded siding with a fresh coat of Classic White.",
			},
		],
	},
	{
		id: "exterior-oil-002",
		name: "Oil-Based Exterior Enamel",
		brand: "DuraCoat",
		description:
			"A traditional oil-based enamel offering exceptional hardness, gloss, and resistance to abrasion. Ideal for high-wear exterior surfaces like doors and trim.",
		basePrice: 85.99,
		colors: [
			{
				id: "jet-black-ext",
				name: "Jet Black",
				hex: "#000000",
				image:
					"https://images.pexels.com/photos/164010/pexels-photo-164010.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 0, g: 0, b: 0 },
			},
			{
				id: "colonial-red-ext",
				name: "Colonial Red",
				hex: "#800000",
				image:
					"https://images.pexels.com/photos/164011/pexels-photo-164011.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 128, g: 0, b: 0 },
			},
		],
		finishes: [
			{
				id: "gloss-ext",
				name: "Gloss",
				description:
					"High-sheen, durable finish for maximum protection and easy cleaning.",
				sheen: "70%+",
				price: 0,
				coverage: "250-300 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Exceptional hardness and abrasion resistance",
			"High gloss finish",
			"Excellent adhesion to properly prepared surfaces",
			"Resists chipping and cracking",
			"Ideal for doors, windows, and trim",
		],
		coverage: "250-300 sq ft per gallon",
		dryTime: "Touchdr: 6 hours,Recoa: 24 hours",
		application: ["Brush", "Roller"],
		reviews: [
			{
				id: "ext-review-2",
				userName: "Pro Painter",
				rating: 4,
				comment:
					"Great for trim work. Dries to a very hard, durable finish. Takes a while to dry but worth it.",
				date: "2024-04-10",
				verified: true,
			},
		],
		rating: 4.2,
		reviewCount: 95,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PAINT,
		sku: "DUR-EXT-OIL-002",
		reorderable: true,
		weatherResistance: "Very Good",
		durabilityRating: 4,
		surfaceTypes: ["Wood", "Metal", "Trim", "Doors"],
		climateZones: ["Moderate", "Cold & Dry"],
		maintenanceSchedule: {
			interval: "Annually",
			tasks: [
				"Clean with mild soap and water",
				"Inspect for chips/scratches",
				"Touch up as needed",
			],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-2a",
				before:
					"https://images.pexels.com/photos/164012/pexels-photo-164012.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164013/pexels-photo-164013.jpeg?auto=compress&cs=tinysrgb&w=800",
				description: "Front door revitalized with a rich Jet Black gloss.",
			},
		],
	},
	{
		id: "exterior-masonry-003",
		name: "Elastomeric Masonry Coating",
		brand: "FlexiShield",
		description:
			"A high-build, elastomeric coating designed to bridge hairline cracks and provide superior waterproofing for masonry surfaces. Excellent for stucco, concrete, and brick.",
		basePrice: 119.99,
		colors: [
			{
				id: "desert-sand-ext",
				name: "Desert Sand",
				hex: "#E0C9A6",
				image:
					"https://images.pexels.com/photos/164014/pexels-photo-164014.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: false,
				rgb: { r: 224, g: 201, b: 166 },
			},
			{
				id: "terracotta-ext",
				name: "Terracotta",
				hex: "#CB6D51",
				image:
					"https://images.pexels.com/photos/164015/pexels-photo-164015.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 203, g: 109, b: 81 },
			},
		],
		finishes: [
			{
				id: "flat-ext",
				name: "Flat",
				description:
					"Matte finish that helps hide surface imperfections and provides a natural look.",
				sheen: "0-5%",
				price: 0,
				coverage: "80-120 sq ft per gallon (high build)",
				inStock: false,
			},
		],
		features: [
			"Bridges hairline cracks",
			"Superior waterproofing and breathability",
			"Excellent adhesion to masonry surfaces",
			"Resists wind-driven rain",
			"Mildew resistant",
			"Flexible and durable",
		],
		coverage: "80-120 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 24 hours",
		application: ["Roller (heavy nap)", "Spray"],
		reviews: [
			{
				id: "ext-review-3",
				userName: "Stucco Repair Co.",
				rating: 5,
				comment:
					"This is our go-to for stucco. It covers well and provides excellent protection against moisture.",
				date: "2024-06-01",
				verified: true,
			},
		],
		rating: 4.7,
		reviewCount: 150,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PAINT,
		sku: "FLX-MAS-COAT-003",
		reorderable: true,
		weatherResistance: "Superior",
		durabilityRating: 5,
		surfaceTypes: ["Stucco", "Concrete", "Brick", "Cinder Block"],
		climateZones: ["Hot & Humid", "Coastal", "Desert"],
		maintenanceSchedule: {
			interval: "Every 3-5 years",
			tasks: [
				"Inspect for cracks/damage",
				"Pressure wash gently",
				"Reapply if necessary",
			],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-3a",
				before:
					"https://images.pexels.com/photos/164016/pexels-photo-164016.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164017/pexels-photo-164017.jpeg?auto=compress&cs=tinysrgb&w=800",
				description:
					"Cracked stucco wall repaired and coated with Desert Sand for a fresh look.",
			},
		],
	},
	{
		id: "exterior-deck-004",
		name: "Deck & Siding Solid Stain",
		brand: "WoodShield",
		description:
			"A premium solid color stain designed for decks, fences, and siding. Provides excellent protection against UV damage, mildew, and water, while allowing wood grain to subtly show through.",
		basePrice: 75.99,
		colors: [
			{
				id: "cedar-brown-ext",
				name: "Cedar Brown",
				hex: "#6F4E37",
				image:
					"https://images.pexels.com/photos/164018/pexels-photo-164018.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 111, g: 78, b: 55 },
			},
			{
				id: "slate-gray-ext",
				name: "Slate Gray",
				hex: "#708090",
				image:
					"https://images.pexels.com/photos/164019/pexels-photo-164019.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 112, g: 128, b: 144 },
			},
		],
		finishes: [
			{
				id: "solid-stain-ext",
				name: "Solid Stain",
				description:
					"Opaque finish that provides maximum color and protection while allowing some wood texture to show.",
				sheen: "Low Sheen",
				price: 0,
				coverage: "150-200 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"UV resistant to prevent fading",
			"Water repellent and mildew resistant",
			"Excellent adhesion to wood surfaces",
			"Resists scuffing and foot traffic",
			"Easy to apply and clean up",
		],
		coverage: "150-200 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller", "Pad Applicator"],
		reviews: [
			{
				id: "ext-review-4",
				userName: "DIY Enthusiast",
				rating: 4,
				comment:
					"Used this on my deck and it looks great. Water beads right off. Easy to apply too.",
				date: "2024-05-15",
				verified: true,
			},
		],
		rating: 4.5,
		reviewCount: 120,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PRIMER,
		sku: "WDS-DECK-STAIN-004",
		reorderable: true,
		weatherResistance: "Excellent",
		durabilityRating: 4,
		surfaceTypes: ["Wood Decks", "Fences", "Siding", "Outdoor Furniture"],
		climateZones: ["All Climates"],
		maintenanceSchedule: {
			interval: "Every 2-4 years",
			tasks: [
				"Clean surface thoroughly",
				"Inspect for wear",
				"Reapply as needed",
			],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-4a",
				before:
					"https://images.pexels.com/photos/164020/pexels-photo-164020.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164021/pexels-photo-164021.jpeg?auto=compress&cs=tinysrgb&w=800",
				description:
					"Old, weathered deck stained with Cedar Brown for renewed protection and beauty.",
			},
		],
	},
	{
		id: "exterior-metal-005",
		name: "Direct-to-Metal Exterior Paint",
		brand: "MetalGuard",
		description:
			"Specially formulated for metal surfaces, this paint provides excellent rust protection and adhesion without the need for a separate primer on most clean metal surfaces.",
		basePrice: 89.99,
		colors: [
			{
				id: "charcoal-black-ext",
				name: "Charcoal Black",
				hex: "#36454F",
				image:
					"https://images.pexels.com/photos/164022/pexels-photo-164022.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 54, g: 69, b: 79 },
			},
			{
				id: "barn-red-ext",
				name: "Barn Red",
				hex: "#7C0A02",
				image:
					"https://images.pexels.com/photos/164023/pexels-photo-164023.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 124, g: 10, b: 2 },
			},
		],
		finishes: [
			{
				id: "satin-metal-ext",
				name: "Satin",
				description: "Durable satin finish with excellent rust protection.",
				sheen: "25-35%",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Direct-to-metal application (no primer needed)",
			"Superior rust protection",
			"Excellent adhesion to metal surfaces",
			"Resists chipping and flaking",
			"Fast drying formula",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "ext-review-5",
				userName: "Metal Worker",
				rating: 5,
				comment:
					"Perfect for metal railings and gates. No primer needed and great rust protection.",
				date: "2024-03-25",
				verified: true,
			},
		],
		rating: 4.6,
		reviewCount: 85,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PAINT,
		sku: "MTG-DTM-EXT-005",
		reorderable: true,
		weatherResistance: "Excellent",
		durabilityRating: 4,
		surfaceTypes: ["Metal", "Steel", "Iron", "Aluminum"],
		climateZones: ["All Climates", "Coastal"],
		maintenanceSchedule: {
			interval: "Every 3-4 years",
			tasks: [
				"Inspect for rust spots",
				"Clean with degreaser",
				"Touch up any chips immediately",
			],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-5a",
				before:
					"https://images.pexels.com/photos/164024/pexels-photo-164024.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164025/pexels-photo-164025.jpeg?auto=compress&cs=tinysrgb&w=800",
				description:
					"Rusty metal fence restored with Charcoal Black for lasting protection.",
			},
		],
	},
	{
		id: "exterior-primer-006",
		name: "High-Performance Exterior Primer",
		brand: "PrimeShield",
		description:
			"A premium exterior primer that provides excellent adhesion and stain blocking for all exterior surfaces. Essential for bare wood, metal, and previously painted surfaces.",
		basePrice: 69.99,
		colors: [
			{
				id: "primer-white-ext",
				name: "Primer White",
				hex: "#FFFFFF",
				image:
					"https://images.pexels.com/photos/164026/pexels-photo-164026.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
			{
				id: "primer-gray-ext",
				name: "Primer Gray",
				hex: "#808080",
				image:
					"https://images.pexels.com/photos/164027/pexels-photo-164027.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 128, g: 128, b: 128 },
			},
		],
		finishes: [
			{
				id: "primer-ext",
				name: "Primer",
				description:
					"High-build primer for maximum adhesion and stain blocking.",
				sheen: "Flat",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Excellent adhesion to all surfaces",
			"Superior stain blocking",
			"Rust inhibitive properties",
			"Fast drying for quick topcoat application",
			"Compatible with all topcoats",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 1 hour,Recoa: 2 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "ext-review-6",
				userName: "Contractor Pro",
				rating: 5,
				comment:
					"Best primer I've used. Sticks to everything and blocks stains perfectly.",
				date: "2024-02-14",
				verified: true,
			},
		],
		rating: 4.8,
		reviewCount: 175,
		inStock: true,
		category: PRODUCT_CATEGORIES.EXTERIOR_PRIMER,
		sku: "PRS-EXT-PRM-006",
		reorderable: true,
		weatherResistance: "Excellent",
		durabilityRating: 5,
		surfaceTypes: ["All Surfaces", "Wood", "Metal", "Masonry"],
		climateZones: ["All Climates"],
		maintenanceSchedule: {
			interval: "As needed",
			tasks: ["Apply before topcoat", "Ensure proper surface preparation"],
		},
		beforeAfterImages: [
			{
				id: "ext-proj-6a",
				before:
					"https://images.pexels.com/photos/164028/pexels-photo-164028.jpeg?auto=compress&cs=tinysrgb&w=800",
				after:
					"https://images.pexels.com/photos/164029/pexels-photo-164029.jpeg?auto=compress&cs=tinysrgb&w=800",
				description: "Properly primed surface ready for topcoat application.",
			},
		],
	},

	{
		id: "premium-interior-paint-001",
		name: "Premium Interior Paint",
		brand: "Artisan Pro",
		category: PRODUCT_CATEGORIES.INTERIOR_PAINT,
		sku: "ART-PREM-INT-001",
		basePrice: 89.99,
		description:
			"Our flagship premium interior paint delivers exceptional coverage, durability, and color richness. Formulated with advanced pigments and binders for a smooth, long-lasting finish that resists fading and staining.",
		colors: [
			{
				id: "sage-green",
				name: "Sage Whisper",
				hex: "#5B7B7A",
				image:
					"https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 91, g: 123, b: 122 },
			},
			{
				id: "charcoal-gray",
				name: "Charcoal Depth",
				hex: "#2C2C2C",
				image:
					"https://images.pexels.com/photos/6782370/pexels-photo-6782370.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 44, g: 44, b: 44 },
			},
			{
				id: "warm-cream",
				name: "Warm Cream",
				hex: "#F5F5DC",
				image:
					"https://images.pexels.com/photos/6782372/pexels-photo-6782372.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 245, g: 245, b: 220 },
			},
			{
				id: "warm-beige",
				name: "Warm Beige",
				hex: "#C4A57B",
				image:
					"https://images.pexels.com/photos/6782373/pexels-photo-6782373.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 196, g: 165, b: 123 },
			},
			{
				id: "mustard-gold",
				name: "Mustard Gold",
				hex: "#D4A574",
				image:
					"https://images.pexels.com/photos/6782374/pexels-photo-6782374.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: false,
				rgb: { r: 212, g: 165, b: 116 },
			},
			{
				id: "warm-brown",
				name: "Warm Brown",
				hex: "#8B4513",
				image:
					"https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800",
				inStock: true,
				rgb: { r: 139, g: 69, b: 19 },
			},
		],
		finishes: [
			{
				id: "matte",
				name: "Matte",
				description: "Low sheen for sophisticated, modern look",
				sheen: "5-10%",
				price: 0,
				coverage: "350-400 sq ft per gallon",
				inStock: false,
			},
			{
				id: "eggshell",
				name: "Eggshell",
				description: "Subtle sheen with easy cleaning",
				sheen: "10-25%",
				price: 5,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
			{
				id: "satin",
				name: "Satin",
				description: "Smooth finish with durability",
				sheen: "25-35%",
				price: 8,
				coverage: "350-400 sq ft per gallon",
				inStock: false,
			},
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				description: "High durability for high-traffic areas",
				sheen: "35-70%",
				price: 12,
				coverage: "350-400 sq ft per gallon",
				inStock: true,
			},
		],
		features: [
			"Zero-VOC formula for healthier indoor air",
			"Superior hide and coverage",
			"Stain-resistant technology",
			"Easy application and cleanup",
			"Fade-resistant pigments",
			"Mildew-resistant",
		],
		coverage: "350-400 sq ft per gallon",
		dryTime: "Touchdr: 2 hours,Recoa: 4 hours",
		application: ["Brush", "Roller", "Spray"],
		reviews: [
			{
				id: "review-1",
				userName: "Sarah M.",
				rating: 5,
				comment:
					"Exceptional quality paint! The coverage is fantastic and the color stayed true to the sample. Easy to apply and looks professional.",
				date: "2024-01-15",
				verified: true,
			},
			{
				id: "review-2",
				userName: "Michael K.",
				rating: 5,
				comment:
					"Used this for our living room renovation. The Sage Whisper color is exactly what we wanted - sophisticated and calming.",
				date: "2024-01-10",
				verified: true,
			},
			{
				id: "review-3",
				userName: "Jennifer L.",
				rating: 4,
				comment:
					"Great paint quality, though it took two coats for full coverage on darker walls. Color is beautiful and finish is smooth.",
				date: "2024-01-08",
				verified: true,
			},
		],
		rating: 4.8,
		reviewCount: 127,
		inStock: true,
	},
];
