import { Product } from '@/types/product';

export const mockProduct: Product = {
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
    },
    {
      id: 'warm-beige',
      name: 'Warm Beige',
      hex: '#C4A57B',
      image: 'https://images.pexels.com/photos/6782373/pexels-photo-6782373.jpeg?auto=compress&cs=tinysrgb&w=800',
      inStock: true,
      rgb: { r: 196, g: 165, b: 123 }
    },
    {
      id: 'mustard-gold',
      name: 'Mustard Gold',
      hex: '#D4A574',
      image: 'https://images.pexels.com/photos/6782374/pexels-photo-6782374.jpeg?auto=compress&cs=tinysrgb&w=800',
      inStock: false,
      rgb: { r: 212, g: 165, b: 116 }
    },
    {
      id: 'warm-brown',
      name: 'Warm Brown',
      hex: '#8B4513',
      image: 'https://images.pexels.com/photos/6782375/pexels-photo-6782375.jpeg?auto=compress&cs=tinysrgb&w=800',
      inStock: true,
      rgb: { r: 139, g: 69, b: 19 }
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
    },
    {
      id: 'semi-gloss',
      name: 'Semi-Gloss',
      description: 'High durability for high-traffic areas',
      sheen: '35-70%',
      price: 12,
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
      comment: 'Exceptional quality paint! The coverage is fantastic and the color stayed true to the sample. Easy to apply and looks professional.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 'review-2',
      userName: 'Michael K.',
      rating: 5,
      comment: 'Used this for our living room renovation. The Sage Whisper color is exactly what we wanted - sophisticated and calming.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 'review-3',
      userName: 'Jennifer L.',
      rating: 4,
      comment: 'Great paint quality, though it took two coats for full coverage on darker walls. Color is beautiful and finish is smooth.',
      date: '2024-01-08',
      verified: true
    }
  ],
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  category: 'Interior Paint',
  sku: 'ART-PREM-INT-001'
};