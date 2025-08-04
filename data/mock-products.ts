import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 'premium-interior-paint-001',
    name: 'Premium Interior Paint',
    brand: 'Artisan Pro',
    description: 'Our flagship premium interior paint delivers exceptional coverage, durability, and color richness. Formulated with advanced pigments and binders for a smooth, long-lasting finish that resists fading and staining.',
    basePrice: 89.99,
    colors: [
      {
        id: 'sage-green',
        name: 'Sage Whisper',
        hex: '#5B7B7A',
        image: 'https://images.pexels.com/photos/6782371/pexels-photo-6782371.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 91, g: 123, b: 122 }
      },
      {
        id: 'charcoal-gray',
        name: 'Charcoal Depth',
        hex: '#2C2C2C',
        image: 'https://images.pexels.com/photos/6782370/pexels-photo-6782370.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 44, g: 44, b: 44 }
      },
      {
        id: 'warm-cream',
        name: 'Warm Cream',
        hex: '#F5F5DC',
        image: 'https://images.pexels.com/photos/6782372/pexels-photo-6782372.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 245, g: 245, b: 220 }
      }
    ],
    finishes: [
      {
        id: 'matte',
        name: 'Matte',
        description: 'Low sheen for sophisticated, modern look',
        sheen: '5-10%',
        price: 0,
        coverage: '350-400 sq ft per gallon'
      },
      {
        id: 'eggshell',
        name: 'Eggshell',
        description: 'Subtle sheen with easy cleaning',
        sheen: '10-25%',
        price: 5,
        coverage: '350-400 sq ft per gallon'
      },
      {
        id: 'satin',
        name: 'Satin',
        description: 'Smooth finish with durability',
        sheen: '25-35%',
        price: 8,
        coverage: '350-400 sq ft per gallon'
      }
    ],
    features: [
      'Zero-VOC formula for healthier indoor air',
      'Superior hide and coverage',
      'Stain-resistant technology',
      'Easy application and cleanup',
      'Fade-resistant pigments',
      'Mildew-resistant'
    ],
    coverage: '350-400 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 4 hours',
    application: ['Brush', 'Roller', 'Spray'],
    reviews: [
      {
        id: 'review-1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Exceptional quality paint! The coverage is fantastic and the color stayed true to the sample.',
        date: '2024-01-15',
        verified: true
      }
    ],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    category: 'Interior Paint',
    sku: 'ART-PREM-INT-001'
  },
  {
    id: 'eco-friendly-paint-002',
    name: 'Eco-Friendly Interior Paint',
    brand: 'Green Living',
    description: 'Environmentally conscious paint made with natural ingredients and zero harmful chemicals. Perfect for families with children and pets.',
    basePrice: 79.99,
    colors: [
      {
        id: 'forest-green',
        name: 'Forest Green',
        hex: '#228B22',
        image: 'https://images.pexels.com/photos/6782373/pexels-photo-6782373.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 34, g: 139, b: 34 }
      },
      {
        id: 'ocean-blue',
        name: 'Ocean Blue',
        hex: '#006994',
        image: 'https://images.pexels.com/photos/6782374/pexels-photo-6782374.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 0, g: 105, b: 148 }
      }
    ],
    finishes: [
      {
        id: 'matte',
        name: 'Matte',
        description: 'Natural matte finish',
        sheen: '5-10%',
        price: 0,
        coverage: '300-350 sq ft per gallon'
      },
      {
        id: 'satin',
        name: 'Satin',
        description: 'Eco-friendly satin finish',
        sheen: '25-35%',
        price: 6,
        coverage: '300-350 sq ft per gallon'
      }
    ],
    features: [
      'Made with natural ingredients',
      'Zero harmful chemicals',
      'Safe for children and pets',
      'Low odor formula',
      'Biodegradable',
      'Sustainable packaging'
    ],
    coverage: '300-350 sq ft per gallon',
    dryTime: 'Touch dry: 3 hours, Recoat: 6 hours',
    application: ['Brush', 'Roller'],
    reviews: [
      {
        id: 'review-2',
        userName: 'Mike R.',
        rating: 4,
        comment: 'Great eco-friendly option. No strong odors and safe for the kids.',
        date: '2024-01-12',
        verified: true
      }
    ],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    category: 'Interior Paint',
    sku: 'GRN-ECO-INT-002'
  },
  {
    id: 'luxury-paint-003',
    name: 'Luxury Designer Paint',
    brand: 'Elite Colors',
    description: 'Premium designer paint with rich pigments and superior coverage. Used by professional interior designers worldwide.',
    basePrice: 129.99,
    colors: [
      {
        id: 'deep-burgundy',
        name: 'Deep Burgundy',
        hex: '#800020',
        image: 'https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 128, g: 0, b: 32 }
      },
      {
        id: 'royal-navy',
        name: 'Royal Navy',
        hex: '#002147',
        image: 'https://images.pexels.com/photos/6782376/pexels-photo-6782376.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: false,
        rgb: { r: 0, g: 33, b: 71 }
      }
    ],
    finishes: [
      {
        id: 'eggshell',
        name: 'Eggshell',
        description: 'Luxury eggshell finish',
        sheen: '10-25%',
        price: 10,
        coverage: '400-450 sq ft per gallon'
      },
      {
        id: 'semi-gloss',
        name: 'Semi-Gloss',
        description: 'Premium semi-gloss finish',
        sheen: '35-70%',
        price: 15,
        coverage: '400-450 sq ft per gallon'
      }
    ],
    features: [
      'Designer-grade pigments',
      'Superior coverage and hide',
      'Exceptional durability',
      'Fade-resistant formula',
      'Professional quality',
      'Color-matched guarantee'
    ],
    coverage: '400-450 sq ft per gallon',
    dryTime: 'Touch dry: 1 hour, Recoat: 3 hours',
    application: ['Brush', 'Roller', 'Spray'],
    reviews: [
      {
        id: 'review-3',
        userName: 'Jennifer L.',
        rating: 5,
        comment: 'Absolutely stunning colors and finish. Worth every penny!',
        date: '2024-01-10',
        verified: true
      }
    ],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    category: 'Interior Paint',
    sku: 'ELT-LUX-INT-003'
  },
  {
    id: 'budget-paint-004',
    name: 'Value Interior Paint',
    brand: 'Home Essentials',
    description: 'Quality paint at an affordable price. Perfect for budget-conscious homeowners who don\'t want to compromise on quality.',
    basePrice: 39.99,
    colors: [
      {
        id: 'classic-white',
        name: 'Classic White',
        hex: '#FFFFFF',
        image: 'https://images.pexels.com/photos/6782377/pexels-photo-6782377.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 255, g: 255, b: 255 }
      },
      {
        id: 'soft-gray',
        name: 'Soft Gray',
        hex: '#D3D3D3',
        image: 'https://images.pexels.com/photos/6782378/pexels-photo-6782378.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 211, g: 211, b: 211 }
      }
    ],
    finishes: [
      {
        id: 'flat',
        name: 'Flat',
        description: 'Basic flat finish',
        sheen: '0-5%',
        price: 0,
        coverage: '300-350 sq ft per gallon'
      },
      {
        id: 'eggshell',
        name: 'Eggshell',
        description: 'Standard eggshell finish',
        sheen: '10-25%',
        price: 3,
        coverage: '300-350 sq ft per gallon'
      }
    ],
    features: [
      'Good coverage and hide',
      'Easy application',
      'Quick drying',
      'Washable finish',
      'Great value',
      'Multiple color options'
    ],
    coverage: '300-350 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 4 hours',
    application: ['Brush', 'Roller'],
    reviews: [
      {
        id: 'review-4',
        userName: 'Tom K.',
        rating: 4,
        comment: 'Great value for the price. Does the job well.',
        date: '2024-01-08',
        verified: true
      }
    ],
    rating: 4.2,
    reviewCount: 203,
    inStock: true,
    category: 'Interior Paint',
    sku: 'HOM-VAL-INT-004'
  },
  {
    id: 'specialty-paint-005',
    name: 'Magnetic Chalkboard Paint',
    brand: 'Creative Spaces',
    description: 'Innovative paint that creates a magnetic chalkboard surface. Perfect for kids\' rooms, offices, and creative spaces.',
    basePrice: 159.99,
    colors: [
      {
        id: 'chalkboard-black',
        name: 'Chalkboard Black',
        hex: '#1C1C1C',
        image: 'https://images.pexels.com/photos/6782379/pexels-photo-6782379.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 28, g: 28, b: 28 }
      },
      {
        id: 'chalkboard-green',
        name: 'Chalkboard Green',
        hex: '#355E3B',
        image: 'https://images.pexels.com/photos/6782380/pexels-photo-6782380.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 53, g: 94, b: 59 }
      }
    ],
    finishes: [
      {
        id: 'chalkboard',
        name: 'Chalkboard',
        description: 'Magnetic chalkboard finish',
        sheen: '0%',
        price: 0,
        coverage: '200-250 sq ft per gallon'
      }
    ],
    features: [
      'Magnetic surface',
      'Chalkboard functionality',
      'Easy to clean',
      'Durable finish',
      'Kid-safe formula',
      'Creative possibilities'
    ],
    coverage: '200-250 sq ft per gallon',
    dryTime: 'Touch dry: 4 hours, Recoat: 8 hours',
    application: ['Brush', 'Roller'],
    reviews: [
      {
        id: 'review-5',
        userName: 'Lisa P.',
        rating: 5,
        comment: 'Amazing product! The kids love their new chalkboard wall.',
        date: '2024-01-05',
        verified: true
      }
    ],
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
    category: 'Specialty Paint',
    sku: 'CRE-MAG-CHK-005'
  },
  {
    id: 'bathroom-paint-006',
    name: 'Bathroom & Kitchen Paint',
    brand: 'Moisture Shield',
    description: 'Specially formulated for high-moisture areas. Resists mold, mildew, and humidity while maintaining beautiful color.',
    basePrice: 94.99,
    colors: [
      {
        id: 'spa-blue',
        name: 'Spa Blue',
        hex: '#87CEEB',
        image: 'https://images.pexels.com/photos/6782381/pexels-photo-6782381.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 135, g: 206, b: 235 }
      },
      {
        id: 'mint-fresh',
        name: 'Mint Fresh',
        hex: '#98FB98',
        image: 'https://images.pexels.com/photos/6782382/pexels-photo-6782382.jpeg?auto=compress&cs=tinysrgb&w=800',
        inStock: true,
        rgb: { r: 152, g: 251, b: 152 }
      }
    ],
    finishes: [
      {
        id: 'satin',
        name: 'Satin',
        description: 'Moisture-resistant satin',
        sheen: '25-35%',
        price: 0,
        coverage: '350-400 sq ft per gallon'
      },
      {
        id: 'semi-gloss',
        name: 'Semi-Gloss',
        description: 'High-moisture semi-gloss',
        sheen: '35-70%',
        price: 8,
        coverage: '350-400 sq ft per gallon'
      }
    ],
    features: [
      'Mold and mildew resistant',
      'Humidity resistant',
      'Easy to clean',
      'Stain resistant',
      'Antimicrobial protection',
      'Long-lasting color'
    ],
    coverage: '350-400 sq ft per gallon',
    dryTime: 'Touch dry: 2 hours, Recoat: 4 hours',
    application: ['Brush', 'Roller'],
    reviews: [
      {
        id: 'review-6',
        userName: 'David S.',
        rating: 4,
        comment: 'Perfect for our bathroom renovation. No mold issues so far!',
        date: '2024-01-03',
        verified: true
      }
    ],
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    category: 'Specialty Paint',
    sku: 'MOI-BAT-KIT-006'
  }
];