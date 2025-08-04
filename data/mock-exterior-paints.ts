import { Product } from '@/types/product';

export const mockExteriorPaints: Product[] = [
  {
    id: 'exterior-acrylic-001',
    name: 'Premium Exterior Acrylic Latex',
    brand: 'WeatherGuard Pro',
    description: 'Our top-tier exterior paint offers exceptional durability and weather resistance. Formulated with 100% acrylic resins for superior adhesion, flexibility, and color retention, even in harsh climates.',
    basePrice: 99.99,
    colors: [
      {
        id: 'classic-white-ext',
        name: 'Classic White',
        hex: '#F8F8F8',
        image: 'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 248, g: 248, b: 248 }
      },
      {
        id: 'stone-gray-ext',
        name: 'Stone Gray',
        hex: '#8C8C8C',
        image: 'https://images.pexels.com/photos/164006/pexels-photo-164006.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 140, g: 140, b: 140 }
      },
      {
        id: 'forest-green-ext',
        name: 'Forest Green',
        hex: '#228B22',
        image: 'https://images.pexels.com/photos/164007/pexels-photo-164007.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 34, g: 139, b: 34 }
      }
    ],
    finishes: [
      {
        id: 'satin-ext',
        name: 'Satin',
        description: 'Smooth, low-sheen finish with excellent durability and easy cleaning.',
        sheen: '25-35%',
        price: 0,
        coverage: '300-350 sq ft per gallon'
      },
      {
        id: 'semi-gloss-ext',
        name: 'Semi-Gloss',
        description: 'Durable, higher-sheen finish ideal for trim, doors, and high-traffic areas.',
        sheen: '35-70%',
        price: 8,
        coverage: '300-350 sq ft per gallon'
      }
    ],
    features: [
      '100% Acrylic for superior adhesion',
      'Excellent color retention and fade resistance',
      'Mildew and algae resistant coating',
      'Low temperature application (down to 35°F)',
      'Fast drying for quick recoat',
      'Resists cracking, peeling, and blistering'
    ],
    coverage: '300-350 sq ft per gallon',
    dryTime: 'Touch dry: 1 hour, Recoat: 4 hours',
    application: ['Brush', 'Roller', 'Spray'],
    reviews: [
      {
        id: 'ext-review-1',
        userName: 'Homeowner H.',
        rating: 5,
        comment: 'Painted my entire house with this. Looks fantastic and has held up perfectly through a harsh winter and hot summer.',
        date: '2024-05-20',
        verified: true
      }
    ],
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    category: 'Exterior Paint',
    sku: 'WGP-EXT-ACR-001',
    weatherResistance: 'Excellent',
    durabilityRating: 5,
    surfaceTypes: ['Wood', 'Siding', 'Masonry', 'Stucco', 'Fiber Cement'],
    climateZones: ['All Climates', 'Hot & Humid', 'Cold & Dry'],
    maintenanceSchedule: {
      interval: 'Every 2-3 years',
      tasks: ['Inspect for cracks/peeling', 'Clean surface with mild detergent', 'Touch up minor areas']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-1a',
        before: 'https://images.pexels.com/photos/164008/pexels-photo-164008.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164009/pexels-photo-164009.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Transformed a faded siding with a fresh coat of Classic White.'
      }
    ]
  },
  {
    id: 'exterior-oil-002',
    name: 'Oil-Based Exterior Enamel',
    brand: 'DuraCoat',
    description: 'A traditional oil-based enamel offering exceptional hardness, gloss, and resistance to abrasion. Ideal for high-wear exterior surfaces like doors and trim.',
    basePrice: 85.99,
    colors: [
      {
        id: 'jet-black-ext',
        name: 'Jet Black',
        hex: '#000000',
        image: 'https://images.pexels.com/photos/164010/pexels-photo-164010.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 0, g: 0, b: 0 }
      },
      {
        id: 'colonial-red-ext',
        name: 'Colonial Red',
        hex: '#800000',
        image: 'https://images.pexels.com/photos/164011/pexels-photo-164011.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 128, g: 0, b: 0 }
      }
    ],
    finishes: [
      {
        id: 'gloss-ext',
        name: 'Gloss',
        description: 'High-sheen, durable finish for maximum protection and easy cleaning.',
        sheen: '70%+',
        price: 0,
        coverage: '250-300 sq ft per gallon'
      }
    ],
    features: [
      'Exceptional hardness and abrasion resistance',
      'High gloss finish',
      'Excellent adhesion to properly prepared surfaces',
      'Resists chipping and cracking',
      'Ideal for doors, windows, and trim'
    ],
    coverage: '250-300 sq ft per gallon',
    dryTime: 'Touch dry: 6 hours, Recoat: 24 hours',
    application: ['Brush', 'Roller'],
    reviews: [
      {
        id: 'ext-review-2',
        userName: 'Pro Painter',
        rating: 4,
        comment: 'Great for trim work. Dries to a very hard, durable finish. Takes a while to dry but worth it.',
        date: '2024-04-10',
        verified: true
      }
    ],
    rating: 4.2,
    reviewCount: 95,
    inStock: true,
    category: 'Exterior Paint',
    sku: 'DUR-EXT-OIL-002',
    weatherResistance: 'Very Good',
    durabilityRating: 4,
    surfaceTypes: ['Wood', 'Metal', 'Trim', 'Doors'],
    climateZones: ['Moderate', 'Cold & Dry'],
    maintenanceSchedule: {
      interval: 'Annually',
      tasks: ['Clean with mild soap and water', 'Inspect for chips/scratches', 'Touch up as needed']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-2a',
        before: 'https://images.pexels.com/photos/164012/pexels-photo-164012.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164013/pexels-photo-164013.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Front door revitalized with a rich Jet Black gloss.'
      }
    ]
  },
  {
    id: 'exterior-masonry-003',
    name: 'Elastomeric Masonry Coating',
    brand: 'FlexiShield',
    description: 'A high-build, elastomeric coating designed to bridge hairline cracks and provide superior waterproofing for masonry surfaces. Excellent for stucco, concrete, and brick.',
    basePrice: 119.99,
    colors: [
      {
        id: 'desert-sand-ext',
        name: 'Desert Sand',
        hex: '#E0C9A6',
        image: 'https://images.pexels.com/photos/164014/pexels-photo-164014.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 224, g: 201, b: 166 }
      },
      {
        id: 'terracotta-ext',
        name: 'Terracotta',
        hex: '#CB6D51',
        image: 'https://images.pexels.com/photos/164015/pexels-photo-164015.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 203, g: 109, b: 81 }
      }
    ],
    finishes: [
      {
        id: 'flat-ext',
        name: 'Flat',
        description: 'Matte finish that helps hide surface imperfections and provides a natural look.',
        sheen: '0-5%',
        price: 0,
        coverage: '80-120 sq ft per gallon (high build)'
      }
    ],
    features: [
      'Bridges hairline cracks',
      'Superior waterproofing and breathability',
      'Excellent adhesion to masonry surfaces',
      'Resists wind-driven rain',
      'Mildew resistant',
      'Flexible and durable'
    ],
    coverage: '80-120 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 24 hours',
    application: ['Roller (heavy nap)', 'Spray'],
    reviews: [
      {
        id: 'ext-review-3',
        userName: 'Stucco Repair Co.',
        rating: 5,
        comment: 'This is our go-to for stucco. It covers well and provides excellent protection against moisture.',
        date: '2024-06-01',
        verified: true
      }
    ],
    rating: 4.7,
    reviewCount: 150,
    inStock: true,
    category: 'Exterior Paint',
    sku: 'FLX-MAS-COAT-003',
    weatherResistance: 'Superior',
    durabilityRating: 5,
    surfaceTypes: ['Stucco', 'Concrete', 'Brick', 'Cinder Block'],
    climateZones: ['Hot & Humid', 'Coastal', 'Desert'],
    maintenanceSchedule: {
      interval: 'Every 3-5 years',
      tasks: ['Inspect for cracks/damage', 'Pressure wash gently', 'Reapply if necessary']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-3a',
        before: 'https://images.pexels.com/photos/164016/pexels-photo-164016.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164017/pexels-photo-164017.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Cracked stucco wall repaired and coated with Desert Sand for a fresh look.'
      }
    ]
  },
  {
    id: 'exterior-deck-004',
    name: 'Deck & Siding Solid Stain',
    brand: 'WoodShield',
    description: 'A premium solid color stain designed for decks, fences, and siding. Provides excellent protection against UV damage, mildew, and water, while allowing wood grain to subtly show through.',
    basePrice: 75.99,
    colors: [
      {
        id: 'cedar-brown-ext',
        name: 'Cedar Brown',
        hex: '#6F4E37',
        image: 'https://images.pexels.com/photos/164018/pexels-photo-164018.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 111, g: 78, b: 55 }
      },
      {
        id: 'slate-gray-ext',
        name: 'Slate Gray',
        hex: '#708090',
        image: 'https://images.pexels.com/photos/164019/pexels-photo-164019.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 112, g: 128, b: 144 }
      }
    ],
    finishes: [
      {
        id: 'solid-stain-ext',
        name: 'Solid Stain',
        description: 'Opaque finish that provides maximum color and protection while allowing some wood texture to show.',
        sheen: 'Low Sheen',
        price: 0,
        coverage: '150-200 sq ft per gallon'
      }
    ],
    features: [
      'UV resistant to prevent fading',
      'Water repellent and mildew resistant',
      'Excellent adhesion to wood surfaces',
      'Resists scuffing and foot traffic',
      'Easy to apply and clean up'
    ],
    coverage: '150-200 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 4 hours',
    application: ['Brush', 'Roller', 'Pad Applicator'],
    reviews: [
      {
        id: 'ext-review-4',
        userName: 'DIY Enthusiast',
        rating: 4,
        comment: 'Used this on my deck and it looks great. Water beads right off. Easy to apply too.',
        date: '2024-05-15',
        verified: true
      }
    ],
    rating: 4.5,
    reviewCount: 120,
    inStock: true,
    category: 'Exterior Stain',
    sku: 'WDS-DECK-STAIN-004',
    weatherResistance: 'Excellent',
    durabilityRating: 4,
    surfaceTypes: ['Wood Decks', 'Fences', 'Siding', 'Outdoor Furniture'],
    climateZones: ['All Climates'],
    maintenanceSchedule: {
      interval: 'Every 2-4 years',
      tasks: ['Clean surface thoroughly', 'Inspect for wear', 'Reapply as needed']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-4a',
        before: 'https://images.pexels.com/photos/164020/pexels-photo-164020.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164021/pexels-photo-164021.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Old, weathered deck stained with Cedar Brown for renewed protection and beauty.'
      }
    ]
  },
  {
    id: 'exterior-metal-005',
    name: 'Direct-to-Metal Exterior Paint',
    brand: 'MetalGuard',
    description: 'Specially formulated for metal surfaces, this paint provides excellent rust protection and adhesion without the need for a separate primer on most clean metal surfaces.',
    basePrice: 89.99,
    colors: [
      {
        id: 'charcoal-black-ext',
        name: 'Charcoal Black',
        hex: '#36454F',
        image: 'https://images.pexels.com/photos/164022/pexels-photo-164022.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 54, g: 69, b: 79 }
      },
      {
        id: 'barn-red-ext',
        name: 'Barn Red',
        hex: '#7C0A02',
        image: 'https://images.pexels.com/photos/164023/pexels-photo-164023.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 124, g: 10, b: 2 }
      }
    ],
    finishes: [
      {
        id: 'satin-metal-ext',
        name: 'Satin',
        description: 'Durable satin finish with excellent rust protection.',
        sheen: '25-35%',
        price: 0,
        coverage: '350-400 sq ft per gallon'
      }
    ],
    features: [
      'Direct-to-metal application (no primer needed)',
      'Superior rust protection',
      'Excellent adhesion to metal surfaces',
      'Resists chipping and flaking',
      'Fast drying formula'
    ],
    coverage: '350-400 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 4 hours',
    application: ['Brush', 'Roller', 'Spray'],
    reviews: [
      {
        id: 'ext-review-5',
        userName: 'Metal Worker',
        rating: 5,
        comment: 'Perfect for metal railings and gates. No primer needed and great rust protection.',
        date: '2024-03-25',
        verified: true
      }
    ],
    rating: 4.6,
    reviewCount: 85,
    inStock: true,
    category: 'Exterior Paint',
    sku: 'MTG-DTM-EXT-005',
    weatherResistance: 'Excellent',
    durabilityRating: 4,
    surfaceTypes: ['Metal', 'Steel', 'Iron', 'Aluminum'],
    climateZones: ['All Climates', 'Coastal'],
    maintenanceSchedule: {
      interval: 'Every 3-4 years',
      tasks: ['Inspect for rust spots', 'Clean with degreaser', 'Touch up any chips immediately']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-5a',
        before: 'https://images.pexels.com/photos/164024/pexels-photo-164024.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164025/pexels-photo-164025.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Rusty metal fence restored with Charcoal Black for lasting protection.'
      }
    ]
  },
  {
    id: 'exterior-primer-006',
    name: 'High-Performance Exterior Primer',
    brand: 'PrimeShield',
    description: 'A premium exterior primer that provides excellent adhesion and stain blocking for all exterior surfaces. Essential for bare wood, metal, and previously painted surfaces.',
    basePrice: 69.99,
    colors: [
      {
        id: 'primer-white-ext',
        name: 'Primer White',
        hex: '#FFFFFF',
        image: 'https://images.pexels.com/photos/164026/pexels-photo-164026.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 255, g: 255, b: 255 }
      },
      {
        id: 'primer-gray-ext',
        name: 'Primer Gray',
        hex: '#808080',
        image: 'https://images.pexels.com/photos/164027/pexels-photo-164027.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 128, g: 128, b: 128 }
      }
    ],
    finishes: [
      {
        id: 'primer-ext',
        name: 'Primer',
        description: 'High-build primer for maximum adhesion and stain blocking.',
        sheen: 'Flat',
        price: 0,
        coverage: '350-400 sq ft per gallon'
      }
    ],
    features: [
      'Excellent adhesion to all surfaces',
      'Superior stain blocking',
      'Rust inhibitive properties',
      'Fast drying for quick topcoat application',
      'Compatible with all topcoats'
    ],
    coverage: '350-400 sq ft per gallon',
    dryTime: 'Touch dry: 1 hour, Recoat: 2 hours',
    application: ['Brush', 'Roller', 'Spray'],
    reviews: [
      {
        id: 'ext-review-6',
        userName: 'Contractor Pro',
        rating: 5,
        comment: 'Best primer I\'ve used. Sticks to everything and blocks stains perfectly.',
        date: '2024-02-14',
        verified: true
      }
    ],
    rating: 4.8,
    reviewCount: 175,
    inStock: true,
    category: 'Exterior Primer',
    sku: 'PRS-EXT-PRM-006',
    weatherResistance: 'Excellent',
    durabilityRating: 5,
    surfaceTypes: ['All Surfaces', 'Wood', 'Metal', 'Masonry'],
    climateZones: ['All Climates'],
    maintenanceSchedule: {
      interval: 'As needed',
      tasks: ['Apply before topcoat', 'Ensure proper surface preparation']
    },
    beforeAfterImages: [
      {
        id: 'ext-proj-6a',
        before: 'https://images.pexels.com/photos/164028/pexels-photo-164028.jpeg?auto=compress&cs=tinysrgb&w=800',
        after: 'https://images.pexels.com/photos/164029/pexels-photo-164029.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Properly primed surface ready for topcoat application.'
      }
    ]
  }
];