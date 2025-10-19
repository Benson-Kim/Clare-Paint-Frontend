import { Product } from "@/types/product"; // Assuming a Product type is defined

// --- COMPLETE PRODUCT CATEGORIES (Specialized for Kenyan Market) ---
export const PRODUCT_CATEGORIESObject = {
	// 1. PRIMARY ARCHITECTURAL PAINTS
	INTERIOR_EMULSION: "interior emulsion paint", // Standard wall paint (Vinyl Matt, Silk)
	EXTERIOR_WEATHERGUARD: "exterior weatherguard paint", // Durable exterior paint (UV, Rain, Anti-Fungal)

	// 2. HIGH-PERFORMANCE / CLIMATE SPECIALTY COATINGS
	SILICONE_EXTERIOR: "silicone extreme weather paint", // High-end, self-cleaning, breathable exterior
	ROOF_COATING: "roof & tile coating", // For metal/tiled roofs, patios
	HEAT_REFLECTIVE_COATING: "heat reflective paint", // Energy-saving coatings
	ANTI_FUNGAL_FORMULATION: "anti-fungal & anti-mould paint", // Dedicated solutions for humid areas

	// 3. INDUSTRIAL & PROTECTIVE COATINGS
	EPOXY_COATING: "epoxy floor & concrete paint", // For garage, industrial, and heavy-duty floors
	ANTI_CORROSIVE_PAINT: "anti-corrosion metal paint", // Protective coatings for steel/metalwork
	HIGH_TEMP_PAINT: "high-temperature paint", // Stove, grille, and engine enamel
	FIRE_RETARDANT_PAINT: "fire retardant & intumescent paint", // Safety-compliant coatings
	MARINE_COATINGS: "marine & boat paint", // Specialized coatings for coastal/marine use
	ROAD_MARKING_PAINT: "traffic & road marking paint",

	// 4. PRIMERS, UNDERCOATS & SEALERS
	ALKALI_RESISTANT_PRIMER: "alkali resistant primer", // Crucial for new cement/plaster surfaces
	GENERAL_UNDERCOAT: "general purpose undercoat", // Oil-based base for glossy topcoats
	STAIN_BLOCKING_PRIMER: "stain & damp blocking primer",
	ADHESION_PROMOTER: "multi-surface adhesion primer", // For difficult surfaces (tiles, glass, plastics)
	WATERPROOFING_SOLUTION: "transparent waterproofing solution", // Clear sealers for masonry

	// 5. WOOD & TRIM FINISHES
	GLOSS_ENAMEL: "high gloss & enamel paint", // For doors, windows, trims
	WOOD_STAIN_AND_FINISH: "wood stain & exterior finish",
	WOOD_VARNISH: "wood varnishes & lacquer",

	// 6. TEXTURE & DECORATIVE / DIY
	TEXTURE_PAINT: "textured & stone-effect paint", // TuffCoat, Supertex style finishes
	CHALK_DECORATIVE: "chalk & decorative furniture paint",
	AEROSOL_SPRAY_PAINT: "aerosol spray paint",
	TILE_PAINT: "tile & ceramic paint",

	// 7. SURFACE PREP & FILLERS
	PATCHING_COMPOUND: "spackle & skim coat filler", // Cement putty for surface leveling
	CAULK_AND_SEALANTS: "caulks, fillers & sealants",
	FUNGICIDAL_WASH: "fungicidal & anti-mould wash", // Surface prep chemical

	// 8. TOOLS, KITS & ACCESSORIES
	BRUSH: "brush",
	ROLLER: "roller",
	APPLICATOR_PAD: "applicator pad",
	PAINT_TRAY: "tray, grid & bucket",
	TAPE_AND_SHEETING: "painter's tape & drop cloth",
	SPRAY_EQUIPMENT: "airless sprayers & systems",
	SPRAY_EQUIPMENT_MAINT: "sprayer parts & maintenance",
	SOLVENTS_AND_THINNERS: "thinners, spirits & removers",
	SAFETY_GEAR: "respirators & safety gear",
	COLOR_SAMPLER: "color samples & tester pots",
	PAINT_KIT: "complete painting kit", // Bundles
} as const;

// --- MOCK PRODUCTS ARRAY (38 Distinct Products) ---
export const mockProductsArray: Product[] = [
	// 1. PRIMARY ARCHITECTURAL PAINTS
	{
		id: "crown-vinyl-silk-001",
		name: "Crown Vinyl Silk Interior Emulsion",
		brand: "Crown Paints",
		description:
			"A high-quality, washable vinyl silk emulsion with a smooth, luxurious sheen. Ideal for high-traffic interior spaces like kitchens and living rooms.",
		basePrice: 65.0,
		colors: [
			{
				id: "soft-cream",
				name: "Soft Cream",
				hex: "#F3EFE9",
				inStock: true,
				rgb: { r: 243, g: 239, b: 233 },
			},
		],
		finishes: [
			{ id: "silk", name: "Silk", sheen: "20-30%", coverage: "14-16 m²/L" },
		],
		features: [
			"Highly Washable",
			"Stain Resistant",
			"Low Odor",
			"Quick Drying",
		],
		category: PRODUCT_CATEGORIES.INTERIOR_EMULSION,
		rating: 4.6,
		reviewCount: 520,
		inStock: true,
	},
	{
		id: "duracoat-weatherguard-002",
		name: "Duracoat WeatherGuard Exterior Emulsion",
		brand: "Duracoat",
		description:
			"Premium 100% acrylic exterior paint formulated to withstand harsh UV rays, torrential rain, and prevent fading. Excellent resistance to algae and fungal growth.",
		basePrice: 85.0,
		colors: [
			{
				id: "terracotta",
				name: "Terracotta",
				hex: "#E2725B",
				inStock: true,
				rgb: { r: 226, g: 114, b: 91 },
			},
		],
		finishes: [
			{
				id: "sheen",
				name: "Soft Sheen",
				sheen: "10-20%",
				coverage: "12-14 m²/L",
			},
		],
		features: [
			"UV Resistant",
			"Fungal/Algae Protection",
			"Flexible, Crack Resistant",
		],
		category: PRODUCT_CATEGORIES.EXTERIOR_WEATHERGUARD,
		rating: 4.8,
		reviewCount: 910,
		inStock: true,
	},

	// 2. HIGH-PERFORMANCE / CLIMATE SPECIALTY COATINGS
	{
		id: "crown-silicone-extreme-003",
		name: "Ultraguard Protect Silicone Extreme (15 Yr)",
		brand: "Crown Paints",
		description:
			"Super premium exterior paint utilizing German Silicone Technology for exceptional water repellency and a 'self-cleaning' effect. Fully breathable to prevent peeling.",
		basePrice: 125.0,
		colors: [
			{
				id: "white",
				name: "Cool White",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{ id: "matt", name: "Matt", sheen: "0-5%", coverage: "10-12 m²/L" },
		],
		features: [
			"Visible Water Repellency",
			"Dirt Repellent",
			"15-Year Life Expectancy",
		],
		category: PRODUCT_CATEGORIES.SILICONE_EXTERIOR,
		rating: 4.9,
		reviewCount: 155,
		inStock: true,
	},
	{
		id: "plascon-roof-paint-004",
		name: "Plascon All-Weather Roof & Tile Coating",
		brand: "Plascon",
		description:
			"A durable, flexible coating designed for galvanised iron and concrete roof tiles. Provides a tough, fade-resistant finish that resists peeling and cracking.",
		basePrice: 75.0,
		colors: [
			{
				id: "charcoal",
				name: "Charcoal Grey",
				hex: "#36454F",
				inStock: true,
				rgb: { r: 54, g: 69, b: 79 },
			},
		],
		finishes: [
			{
				id: "low-sheen",
				name: "Low Sheen",
				sheen: "15%",
				coverage: "8-10 m²/L",
			},
		],
		features: [
			"Flexible & Anti-Cracking",
			"Excellent Colour Retention",
			"Water Resistant",
		],
		category: PRODUCT_CATEGORIES.ROOF_COATING,
		rating: 4.7,
		reviewCount: 380,
		inStock: true,
	},
	{
		id: "thermo-heat-block-005",
		name: "CoolRoof Heat-Block Thermal Coating",
		brand: "ThermoGuard",
		description:
			"An elastomeric coating that reflects solar heat, drastically reducing internal temperatures and energy costs. Ideal for metal and flat roofs in hot regions.",
		basePrice: 140.0,
		colors: [
			{
				id: "reflective-white",
				name: "Reflective White",
				hex: "#F8F8FF",
				inStock: true,
				rgb: { r: 248, g: 248, b: 255 },
			},
		],
		finishes: [
			{ id: "matt", name: "Thermal Matt", sheen: "Low", coverage: "5-7 m²/L" },
		],
		features: [
			"90% Solar Reflectivity",
			"Elastomeric (Crack Bridging)",
			"Energy Star Rated",
		],
		category: PRODUCT_CATEGORIES.HEAT_REFLECTIVE_COATING,
		rating: 4.5,
		reviewCount: 110,
		inStock: true,
	},
	{
		id: "maroo-masterguard-006",
		name: "MasterGuard Anti-Fungal Interior Emulsion",
		brand: "Maroo Paints",
		description:
			"Interior wall paint containing powerful biocides to actively fight and prevent mold, mildew, and fungi growth, especially in humid or poorly ventilated areas.",
		basePrice: 68.0,
		colors: [
			{
				id: "soft-taupe",
				name: "Soft Taupe",
				hex: "#B7A99F",
				inStock: true,
				rgb: { r: 183, g: 169, b: 159 },
			},
		],
		finishes: [{ id: "matt", name: "Matt", sheen: "Low", coverage: "14 m²/L" }],
		features: [
			"High Biocide Concentration",
			"Moisture Tolerant",
			"Smooth Finish",
		],
		category: PRODUCT_CATEGORIES.ANTI_FUNGAL_FORMULATION,
		rating: 4.4,
		reviewCount: 95,
		inStock: true,
	},

	// 3. INDUSTRIAL & PROTECTIVE COATINGS
	{
		id: "toughcoat-epoxy-007",
		name: "2-Part Industrial Garage Floor Epoxy Kit",
		brand: "ToughCoat",
		description:
			"Heavy-duty, high-build epoxy for concrete floors. Resistant to hot tires, oil, grease, and abrasion. Provides a seamless, durable surface.",
		basePrice: 199.0,
		colors: [
			{
				id: "slate-grey",
				name: "Slate Grey",
				hex: "#65737E",
				inStock: true,
				rgb: { r: 101, g: 115, b: 126 },
			},
		],
		finishes: [
			{
				id: "gloss",
				name: "High Gloss",
				sheen: "90%",
				coverage: "20 m² per kit",
			},
		],
		features: [
			"Chemical & Oil Resistant",
			"High Abrasion Resistance",
			"Zero VOC when cured",
		],
		category: PRODUCT_CATEGORIES.EPOXY_COATING,
		rating: 4.9,
		reviewCount: 210,
		inStock: true,
	},
	{
		id: "basco-red-oxide-008",
		name: "Basco Red Oxide Anti-Rust Primer",
		brand: "Basco Paints",
		description:
			"An economical, oil-based anti-corrosion primer for use on steel, iron, and other metal surfaces. Essential undercoat for metal gates and railings.",
		basePrice: 35.0,
		colors: [
			{
				id: "red-oxide",
				name: "Red Oxide",
				hex: "#7E3517",
				inStock: true,
				rgb: { r: 126, g: 53, b: 23 },
			},
		],
		finishes: [
			{ id: "matt", name: "Matt", sheen: "Low", coverage: "10-12 m²/L" },
		],
		features: [
			"Excellent Corrosion Inhibition",
			"High Adhesion to Metal",
			"Oil-Based Durability",
		],
		category: PRODUCT_CATEGORIES.ANTI_CORROSIVE_PAINT,
		rating: 4.5,
		reviewCount: 450,
		inStock: true,
	},
	{
		id: "rustguard-hitemp-009",
		name: "1200°F Extreme High-Temp Black",
		brand: "RustGuard",
		description:
			"Silicone ceramic formula designed to protect and colour surfaces exposed to extreme heat, such as BBQs, stove pipes, and engine parts.",
		basePrice: 28.0,
		colors: [
			{
				id: "black",
				name: "Flat Black",
				hex: "#000000",
				inStock: true,
				rgb: { r: 0, g: 0, b: 0 },
			},
		],
		finishes: [
			{ id: "matt", name: "Flat", sheen: "0%", coverage: "10 m²/can" },
		],
		features: [
			"Withstands up to 650°C",
			"Rust Preventative",
			"Single-Coat Coverage",
		],
		category: PRODUCT_CATEGORIES.HIGH_TEMP_PAINT,
		rating: 4.6,
		reviewCount: 85,
		inStock: true,
	},
	{
		id: "firesafe-intumescent-010",
		name: "FireSafe Intumescent Steel Coating",
		brand: "FireSafe",
		description:
			"Thick, water-based coating that expands (intumesces) when exposed to heat, providing up to 90 minutes of fire protection for structural steel.",
		basePrice: 299.0,
		colors: [
			{
				id: "white",
				name: "Base White",
				hex: "#F9F9F9",
				inStock: true,
				rgb: { r: 249, g: 249, b: 249 },
			},
		],
		finishes: [
			{
				id: "thick",
				name: "Thick Layer",
				sheen: "Matt",
				coverage: "0.8 m²/L (per coat)",
			},
		],
		features: [
			"90 Min Fire Rating",
			"Water-Based & Low VOC",
			"Acoustic Insulation",
		],
		category: PRODUCT_CATEGORIES.FIRE_RETARDANT_PAINT,
		rating: 4.7,
		reviewCount: 55,
		inStock: true,
	},
	{
		id: "seacoat-antifoul-011",
		name: "SeaCoat Hard Anti-Fouling Marine Paint",
		brand: "SeaCoat",
		description:
			"Hard-ablative bottom paint for boats and marine structures. Prevents barnacle and marine growth in salty and fresh water.",
		basePrice: 175.0,
		colors: [
			{
				id: "red",
				name: "Barrier Red",
				hex: "#9C2727",
				inStock: true,
				rgb: { r: 156, g: 39, b: 39 },
			},
		],
		finishes: [
			{ id: "matt", name: "Hard Matt", sheen: "0%", coverage: "10 m²/L" },
		],
		features: [
			"Copper-Free Formula",
			"High-Biocide Content",
			"Durable in Coastal Regions",
		],
		category: PRODUCT_CATEGORIES.MARINE_COATINGS,
		rating: 4.3,
		reviewCount: 30,
		inStock: true,
	},
	{
		id: "linemark-traffic-012",
		name: "High-Visibility Yellow Line Marking Paint",
		brand: "LineMark",
		description:
			"Fast-drying, high-solids chlorinated rubber paint for marking roads, parking lots, and factory floors. Extremely durable and weather resistant.",
		basePrice: 95.0,
		colors: [
			{
				id: "yellow",
				name: "Traffic Yellow",
				hex: "#FFD700",
				inStock: true,
				rgb: { r: 255, g: 215, b: 0 },
			},
		],
		finishes: [
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				sheen: "35%",
				coverage: "4-6 m²/L (thick coat)",
			},
		],
		features: [
			"Chlorinated Rubber Base",
			"Rapid Dry Time (15 mins)",
			"Abrasion Resistant",
		],
		category: PRODUCT_CATEGORIES.ROAD_MARKING_PAINT,
		rating: 4.5,
		reviewCount: 150,
		inStock: true,
	},

	// 4. PRIMERS, UNDERCOATS & SEALERS
	{
		id: "primebond-alkali-013",
		name: "High-Opacity Alkali Resistant Primer (ARP)",
		brand: "PrimeBond",
		description:
			"Essential primer for new or highly alkaline masonry and plaster surfaces. Blocks alkalinity to prevent paint degradation and patches from appearing on the final coat.",
		basePrice: 48.0,
		colors: [
			{
				id: "white",
				name: "White",
				hex: "#F0F0F0",
				inStock: true,
				rgb: { r: 240, g: 240, b: 240 },
			},
		],
		finishes: [
			{ id: "matt", name: "Flat Matt", sheen: "0%", coverage: "10-14 m²/L" },
		],
		features: [
			"Neutralizes Alkali",
			"Excellent Hiding Power",
			"Fast-Drying Water-Based",
		],
		category: PRODUCT_CATEGORIES.ALKALI_RESISTANT_PRIMER,
		rating: 4.8,
		reviewCount: 650,
		inStock: true,
	},
	{
		id: "generalprep-undercoat-014",
		name: "Traditional Oil-Based Undercoat",
		brand: "GeneralPrep",
		description:
			"A thick, high-build oil-based undercoat that provides a smooth, uniform base for subsequent coats of Gloss Enamel on wood and metal.",
		basePrice: 42.0,
		colors: [
			{
				id: "grey",
				name: "Universal Grey",
				hex: "#A9A9A9",
				inStock: true,
				rgb: { r: 169, g: 169, b: 169 },
			},
		],
		finishes: [
			{ id: "semi-matt", name: "Semi-Matt", sheen: "10%", coverage: "12 m²/L" },
		],
		features: [
			"High Filling Properties",
			"Excellent Opacity",
			"Optimized for Gloss Finishes",
		],
		category: PRODUCT_CATEGORIES.GENERAL_UNDERCOAT,
		rating: 4.4,
		reviewCount: 290,
		inStock: true,
	},
	{
		id: "blockall-shellac-015",
		name: "Shellac-Based Extreme Stain Blocker",
		brand: "BlockAll",
		description:
			"Dries fast and seals off the toughest stains, including smoke, water damage, tannin bleed (from wood), and persistent odors. Ideal for major renovations.",
		basePrice: 60.0,
		colors: [
			{
				id: "white",
				name: "Bright White",
				hex: "#FEFEFE",
				inStock: true,
				rgb: { r: 254, g: 254, b: 254 },
			},
		],
		finishes: [
			{ id: "flat", name: "Flat", sheen: "0%", coverage: "8-10 m²/L" },
		],
		features: [
			"Stops Smoke Odor",
			"Blocks Water Stains",
			"Alcohol/Shellac Based",
		],
		category: PRODUCT_CATEGORIES.STAIN_BLOCKING_PRIMER,
		rating: 4.9,
		reviewCount: 410,
		inStock: true,
	},
	{
		id: "grip-adhesion-016",
		name: "GripMaster Glass & Ceramic Bonding Primer",
		brand: "GripMaster",
		description:
			"Specialized primer creating a molecular bond for ultra-slick surfaces where standard paint would fail, like porcelain, tiles, and laminate.",
		basePrice: 55.0,
		colors: [
			{
				id: "clear",
				name: "Clear",
				hex: "#F5F5F5",
				inStock: true,
				rgb: { r: 245, g: 245, b: 245 },
			},
		],
		finishes: [
			{
				id: "ultra-flat",
				name: "Ultra Flat",
				sheen: "0%",
				coverage: "15 m²/L",
			},
		],
		features: ["Chemical Bonding Agent", "Water Resistant", "Fast Curing"],
		category: PRODUCT_CATEGORIES.ADHESION_PROMOTER,
		rating: 4.7,
		reviewCount: 190,
		inStock: true,
	},
	{
		id: "hydroseal-clear-017",
		name: "HydroSeal Clear Masonry Water Repellent",
		brand: "HydroSeal",
		description:
			"Transparent, solvent-based silicone solution that penetrates masonry to create a long-lasting, invisible waterproof barrier without changing the surface appearance.",
		basePrice: 70.0,
		colors: [
			{
				id: "clear",
				name: "Clear",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{
				id: "invisible",
				name: "Invisible",
				sheen: "None",
				coverage: "2-5 m²/L (porous)",
			},
		],
		features: [
			"Invisible Finish",
			"Allows Substrate to Breathe",
			"5-10 Year Effectiveness",
		],
		category: PRODUCT_CATEGORIES.WATERPROOFING_SOLUTION,
		rating: 4.5,
		reviewCount: 220,
		inStock: true,
	},

	// 5. WOOD & TRIM FINISHES
	{
		id: "duracoat-gloss-018",
		name: "Duracoat High Gloss Enamel",
		brand: "Duracoat",
		description:
			"A brilliant, hard-wearing, high-gloss finish for interior and exterior wood and metal trim. Provides a highly washable and durable surface.",
		basePrice: 58.0,
		colors: [
			{
				id: "brilliant-white",
				name: "Brilliant White",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{ id: "gloss", name: "High Gloss", sheen: "90%", coverage: "14-16 m²/L" },
		],
		features: [
			"Mirror-Like Finish",
			"Extremely Durable",
			"Washable/Scrubbable",
		],
		category: PRODUCT_CATEGORIES.GLOSS_ENAMEL,
		rating: 4.6,
		reviewCount: 750,
		inStock: true,
	},
	{
		id: "woodshield-stain-019",
		name: "WoodShield Exterior Deck Stain (Semi-Transparent)",
		brand: "WoodShield",
		description:
			"Oil-based, deep penetrating stain that nourishes and protects exterior decking from rot, sun damage, and moisture while highlighting natural wood grain.",
		basePrice: 65.0,
		colors: [
			{
				id: "cedar",
				name: "Natural Cedar",
				hex: "#A87C5E",
				inStock: true,
				rgb: { r: 168, g: 124, b: 94 },
			},
		],
		finishes: [
			{ id: "satin", name: "Satin", sheen: "10-20%", coverage: "10-12 m²/L" },
		],
		features: ["Deep Penetrating Oil", "UV Protection", "Water Repellent"],
		category: PRODUCT_CATEGORIES.WOOD_STAIN_AND_FINISH,
		rating: 4.7,
		reviewCount: 330,
		inStock: true,
	},
	{
		id: "clearcoat-varnish-020",
		name: "Quick-Dry Clear Polyurethane Varnish",
		brand: "ClearCoat",
		description:
			"A fast-drying, water-based polyurethane varnish for interior wood furniture, floors, and cabinets. Provides a hard, non-yellowing, protective shield.",
		basePrice: 45.0,
		colors: [
			{
				id: "clear",
				name: "Clear",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{ id: "satin", name: "Satin", sheen: "30%", coverage: "16-18 m²/L" },
		],
		features: ["Non-Yellowing", "Water-Based & Low Odor", "Abrasion Resistant"],
		category: PRODUCT_CATEGORIES.WOOD_VARNISH,
		rating: 4.8,
		reviewCount: 510,
		inStock: true,
	},

	// 6. TEXTURE & DECORATIVE / DIY
	{
		id: "ruffntuff-texture-021",
		name: "Ruff-N-Tuff Fine Grain Texture Coating (20L)",
		brand: "RuffNTuff",
		description:
			"Heavy-bodied, textured emulsion designed to conceal wall imperfections and create a distinctive, decorative fine-sand grain finish on both interior and exterior walls.",
		basePrice: 110.0,
		colors: [
			{
				id: "sand",
				name: "Desert Sand",
				hex: "#F0E68C",
				inStock: true,
				rgb: { r: 240, g: 230, b: 140 },
			},
		],
		finishes: [
			{
				id: "textured",
				name: "Fine Grain",
				sheen: "Matt",
				coverage: "2-4 m²/L",
			},
		],
		features: ["Hides Imperfections", "Weather Resistant", "High Build Volume"],
		category: PRODUCT_CATEGORIES.TEXTURE_PAINT,
		rating: 4.5,
		reviewCount: 180,
		inStock: true,
	},
	{
		id: "chalkstyle-furniture-022",
		name: "ChalkStyle Vintage Furniture Paint",
		brand: "ChalkStyle",
		description:
			"Ultra-matte chalk finish paint that requires minimal prep (no sanding required). Perfect for upcycling old furniture and creating distressed or vintage looks.",
		basePrice: 22.0,
		colors: [
			{
				id: "dusty-rose",
				name: "Dusty Rose",
				hex: "#A0525A",
				inStock: true,
				rgb: { r: 160, g: 82, b: 90 },
			},
		],
		finishes: [
			{
				id: "ultra-matt",
				name: "Ultra Matt",
				sheen: "0%",
				coverage: "14 m²/L",
			},
		],
		features: ["No Priming/Sanding", "Distressable Finish", "High Pigment"],
		category: PRODUCT_CATEGORIES.CHALK_DECORATIVE,
		rating: 4.9,
		reviewCount: 120,
		inStock: true,
	},
	{
		id: "fastfinish-metallic-023",
		name: "Metallic Gold Spray Paint (Aerosol)",
		brand: "FastFinish",
		description:
			"High-quality aerosol spray with a metallic finish. Dries quickly for crafts, stencils, and touch-ups on metal and wood.",
		basePrice: 12.0,
		colors: [
			{
				id: "gold",
				name: "Metallic Gold",
				hex: "#FFD700",
				inStock: true,
				rgb: { r: 255, g: 215, b: 0 },
			},
		],
		finishes: [
			{
				id: "metallic",
				name: "Metallic",
				sheen: "70%",
				coverage: "1.5 m²/can",
			},
		],
		features: ["Fast Dry", "Smooth Spray Pattern", "Vibrant Metallic Shine"],
		category: PRODUCT_CATEGORIES.AEROSOL_SPRAY_PAINT,
		rating: 4.7,
		reviewCount: 305,
		inStock: true,
	},
	{
		id: "tilerenew-white-024",
		name: "1K White Tile Renovation Paint",
		brand: "TileRenew",
		description:
			"One-component, durable paint specifically designed for use on bathroom and kitchen tiles and ceramics without the need for a separate hardener.",
		basePrice: 59.0,
		colors: [
			{
				id: "pure-white",
				name: "Pure White",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{
				id: "semi-gloss",
				name: "Semi-Gloss",
				sheen: "40%",
				coverage: "12 m²/L",
			},
		],
		features: [
			"Excellent Adhesion to Porcelain",
			"Water & Humidity Resistant",
			"Non-Yellowing",
		],
		category: PRODUCT_CATEGORIES.TILE_PAINT,
		rating: 4.5,
		reviewCount: 90,
		inStock: true,
	},

	// 7. SURFACE PREP & FILLERS
	{
		id: "wallcare-skimcoat-025",
		name: "WallCare Skim Coat Filler (20kg Bag)",
		brand: "WallCare",
		description:
			"High-quality powder compound used to level and smooth out concrete and masonry surfaces before painting. Can be used internally or externally.",
		basePrice: 25.0,
		colors: [
			{
				id: "grey",
				name: "Off-White Powder",
				hex: "#F5F5F5",
				inStock: true,
				rgb: { r: 245, g: 245, b: 245 },
			},
		],
		finishes: [
			{
				id: "smooth",
				name: "Ultra Smooth",
				sheen: "Flat",
				coverage: "1 m²/kg (variable)",
			},
		],
		features: [
			"Excellent Workability",
			"Fills Cracks & Pores",
			"High Compressive Strength",
		],
		category: PRODUCT_CATEGORIES.PATCHING_COMPOUND,
		rating: 4.6,
		reviewCount: 410,
		inStock: true,
	},
	{
		id: "sealpro-caulk-026",
		name: "SealPro Flexible Acrylic Gap Filler",
		brand: "SealPro",
		description:
			"General purpose acrylic sealant for filling gaps between walls, ceilings, door frames, and skirtings. Paintable after curing.",
		basePrice: 8.0,
		colors: [
			{
				id: "white",
				name: "White",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{
				id: "bead",
				name: "Smooth Bead",
				sheen: "Matt",
				coverage: "15 linear meters",
			},
		],
		features: ["Paintable", "High Flexibility", "Water-Based Cleanup"],
		category: PRODUCT_CATEGORIES.CAULK_AND_SEALANTS,
		rating: 4.7,
		reviewCount: 550,
		inStock: true,
	},
	{
		id: "cleanprep-fungicidal-027",
		name: "CleanPrep Concentrated Fungicidal Wash (1L)",
		brand: "CleanPrep",
		description:
			"Powerful concentrate for pre-treating surfaces affected by heavy mould, moss, or algae before priming and painting, ensuring long-term paint adhesion.",
		basePrice: 18.0,
		colors: [
			{
				id: "clear",
				name: "Clear Liquid",
				hex: "#FFFFFF",
				inStock: true,
				rgb: { r: 255, g: 255, b: 255 },
			},
		],
		finishes: [
			{
				id: "liquid",
				name: "Liquid Concentrate",
				sheen: "None",
				coverage: "50 m²/L (diluted)",
			},
		],
		features: [
			"Kills Spores & Growth",
			"Prevents Recurrence",
			"Highly Concentrated",
		],
		category: PRODUCT_CATEGORIES.FUNGICIDAL_WASH,
		rating: 4.8,
		reviewCount: 170,
		inStock: true,
	},

	// 8. TOOLS, KITS & ACCESSORIES (38 Total Products)
	{
		id: "proedge-brush-028",
		name: "3-Inch Pro Angled Sash Brush",
		brand: "ProEdge",
		description:
			"Premium synthetic filament brush with an angled tip for superior cutting-in and detail work on trims and corners.",
		basePrice: 15.0,
		features: ["Angled for Precision", "Synthetic Filament", "Comfort Grip"],
		category: PRODUCT_CATEGORIES.BRUSH,
		rating: 4.9,
		reviewCount: 620,
		inStock: true,
	},
	{
		id: "rollermax-sleeve-029",
		name: '9" Microfiber Roller Sleeve (3/8" Nap)',
		brand: "RollerMax",
		description:
			"High-density microfiber roller cover for a smooth, lint-free finish on interior walls. Ideal for emulsion paints.",
		basePrice: 8.0,
		features: ["Lint-Free Finish", "High Paint Pickup", "Shed Resistant"],
		category: PRODUCT_CATEGORIES.ROLLER,
		rating: 4.7,
		reviewCount: 490,
		inStock: true,
	},
	{
		id: "ezpad-applicator-030",
		name: "Corner & Trim Paint Pad Applicator",
		brand: "EZPad",
		description:
			"Handheld applicator pad with a pointed tip designed for painting clean edges around trims, windows, and ceiling lines faster than a brush.",
		basePrice: 10.0,
		features: ["Clean Edges", "Reduces Taping Need", "Pivoting Handle"],
		category: PRODUCT_CATEGORIES.APPLICATOR_PAD,
		rating: 4.2,
		reviewCount: 150,
		inStock: true,
	},
	{
		id: "toolmaster-tray-031",
		name: "Heavy-Duty Metal 10-Inch Paint Tray",
		brand: "ToolMaster",
		description:
			"Robust metal tray for commercial use. Features deep reservoir and textured ramp for even roller loading.",
		basePrice: 12.0,
		features: ["Durable Metal Construction", "Deep Well", "Easy-Pour Spout"],
		category: PRODUCT_CATEGORIES.PAINT_TRAY,
		rating: 4.6,
		reviewCount: 230,
		inStock: true,
	},
	{
		id: "maskpro-tape-032",
		name: "14-Day Precision Painter's Tape (50m)",
		brand: "MaskPro",
		description:
			"Medium adhesion painter's tape designed for clean, sharp paint lines without damaging newly cured paint or leaving residue for up to 14 days.",
		basePrice: 9.0,
		features: ["UV Resistant", "Sharp Line Technology", "14-Day Clean Removal"],
		category: PRODUCT_CATEGORIES.TAPE_AND_SHEETING,
		rating: 4.9,
		reviewCount: 780,
		inStock: true,
	},
	{
		id: "powerspray-airless-033",
		name: "Airless Paint Sprayer Pro-X5 System",
		brand: "PowerSpray",
		description:
			"Professional-grade airless sprayer for large residential and commercial projects. Handles unthinned paints and textured coatings.",
		basePrice: 499.0,
		features: [
			'Supports up to 0.017" Tip',
			"Adjustable Pressure Control",
			"Direct Suction from Bucket",
		],
		category: PRODUCT_CATEGORIES.SPRAY_EQUIPMENT,
		rating: 4.5,
		reviewCount: 80,
		inStock: true,
	},
	{
		id: "powerspray-filter-034",
		name: "Airless Sprayer Filter & Tip Set (5-Pack)",
		brand: "PowerSpray",
		description:
			"Replacement set of mesh filters and reverse-a-clean tips for professional airless spray equipment. Essential for maintenance.",
		basePrice: 45.0,
		features: [
			"Includes 5 Tips (various sizes)",
			"Prevents Clogging",
			"Genuine OEM Parts",
		],
		category: PRODUCT_CATEGORIES.SPRAY_EQUIPMENT_MAINT,
		rating: 4.8,
		reviewCount: 110,
		inStock: true,
	},
	{
		id: "solventpro-spirits-035",
		name: "Mineral Spirits/Paint Thinner (4 Litres)",
		brand: "SolventPro",
		description:
			"Standard paint thinner and clean-up solvent for oil-based paints, varnishes, and equipment. Essential for thinning and degreasing.",
		basePrice: 18.0,
		features: [
			"Oil-Based Paint Thinner",
			"Heavy-Duty Cleaner",
			"Low-Odor Formula",
		],
		category: PRODUCT_CATEGORIES.SOLVENTS_AND_THINNERS,
		rating: 4.6,
		reviewCount: 390,
		inStock: true,
	},
	{
		id: "safebreath-respirator-036",
		name: "P95 Organic Vapor Respirator Kit",
		brand: "SafeBreath",
		description:
			"Half-mask respirator with P95 cartridges, offering protection against organic vapors, paint fumes, and fine dust particles from sanding.",
		basePrice: 38.0,
		features: [
			"P95/Organic Vapor Cartridges",
			"Comfortable Silicone Seal",
			"Adjustable Head Harness",
		],
		category: PRODUCT_CATEGORIES.SAFETY_GEAR,
		rating: 4.9,
		reviewCount: 215,
		inStock: true,
	},
	{
		id: "rangitest-sampler-037",
		name: "100ml Color Tester Pot (Matt)",
		brand: "RangiTest",
		description:
			"Small 100ml sample pot of paint base, perfect for testing color on a small wall section before committing to a large bucket.",
		basePrice: 5.0,
		features: [
			"Accurate Color Representation",
			"Quick Dry Time",
			"Easy to Apply",
		],
		category: PRODUCT_CATEGORIES.COLOR_SAMPLER,
		rating: 4.7,
		reviewCount: 950,
		inStock: true,
	},
	{
		id: "homekit-5piece-038",
		name: "5-Piece Interior Home Painting Kit",
		brand: "HomeKit",
		description:
			'A convenient starter kit including a 9" roller frame, microfiber sleeve, plastic tray, 2.5" brush, and stir stick. Everything for one room.',
		basePrice: 25.0,
		features: ["All-in-One Solution", "Beginner Friendly", "Good Value"],
		category: PRODUCT_CATEGORIES.PAINT_KIT,
		rating: 4.6,
		reviewCount: 340,
		inStock: true,
	},
];
