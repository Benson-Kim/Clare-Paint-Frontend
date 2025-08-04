'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Home, Droplets, Palette, Clock, Shield, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { InteriorPaintFilterState } from '@/app/interior-paints/page';
import { cn } from '@/lib/utils';

interface InteriorPaintFiltersProps {
  filters: InteriorPaintFilterState;
  onFilterChange: (key: keyof InteriorPaintFilterState, value: any) => void;
  products: Product[];
}

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  icon,
  children, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-4 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          {icon && <div className="text-[#5B7B7A]">{icon}</div>}
          <h3 className="font-semibold text-[#2C2C2C] group-hover:text-[#5B7B7A] transition-colors duration-200">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );
};

export const InteriorPaintFilters: React.FC<InteriorPaintFiltersProps> = ({
  filters,
  onFilterChange,
  products
}) => {
  const roomTypes = [
    { id: 'living-room', name: 'Living Room', count: 0 },
    { id: 'bedroom', name: 'Bedroom', count: 0 },
    { id: 'kitchen', name: 'Kitchen', count: 0 },
    { id: 'bathroom', name: 'Bathroom', count: 0 },
    { id: 'nursery', name: 'Nursery', count: 0 },
    { id: 'home-office', name: 'Home Office', count: 0 },
    { id: 'dining-room', name: 'Dining Room', count: 0 },
    { id: 'hallway', name: 'Hallway', count: 0 }
  ];

  const sheenLevels = [
    { id: 'flat', name: 'Flat (0-5%)', description: 'Hides imperfections, low maintenance' },
    { id: 'matte', name: 'Matte (5-10%)', description: 'Sophisticated look, easy touch-ups' },
    { id: 'eggshell', name: 'Eggshell (10-25%)', description: 'Subtle sheen, washable' },
    { id: 'satin', name: 'Satin (25-35%)', description: 'Durable, easy to clean' },
    { id: 'semi-gloss', name: 'Semi-Gloss (35-70%)', description: 'High durability, moisture resistant' },
    { id: 'gloss', name: 'Gloss (70%+)', description: 'Maximum durability and shine' }
  ];

  const colorFamilies = [
    { id: 'whites', name: 'Whites & Creams', hex: '#FFFFFF' },
    { id: 'grays', name: 'Grays & Charcoals', hex: '#808080' },
    { id: 'beiges', name: 'Beiges & Tans', hex: '#F5F5DC' },
    { id: 'blues', name: 'Blues', hex: '#4169E1' },
    { id: 'greens', name: 'Greens', hex: '#228B22' },
    { id: 'browns', name: 'Browns', hex: '#8B4513' },
    { id: 'reds', name: 'Reds', hex: '#DC143C' },
    { id: 'yellows', name: 'Yellows', hex: '#FFD700' }
  ];

  const coverageOptions = [
    { id: 'standard', name: 'Standard (300-400 sq ft)', description: 'Most interior paints' },
    { id: 'premium', name: 'Premium (400+ sq ft)', description: 'High-coverage formulas' }
  ];

  const features = [
    { id: 'zero-voc', name: 'Zero-VOC', description: 'Healthier indoor air quality' },
    { id: 'mold-resistant', name: 'Mold & Mildew Resistant', description: 'Perfect for humid areas' },
    { id: 'stain-resistant', name: 'Stain Resistant', description: 'Easy cleanup and maintenance' },
    { id: 'antimicrobial', name: 'Antimicrobial', description: 'Inhibits bacteria growth' },
    { id: 'scrubbable', name: 'Scrubbable', description: 'Withstands frequent cleaning' },
    { id: 'fade-resistant', name: 'Fade Resistant', description: 'Long-lasting color' },
    { id: 'quick-dry', name: 'Quick Dry', description: 'Faster project completion' },
    { id: 'low-odor', name: 'Low Odor', description: 'Minimal paint smell' }
  ];

  const brands = Array.from(new Set(products.map(p => p.brand.toLowerCase())));
  const priceRange = products.reduce(
    (acc, product) => ({
      min: Math.min(acc.min, product.basePrice),
      max: Math.max(acc.max, product.basePrice)
    }),
    { min: Infinity, max: -Infinity }
  );

  const handleCheckboxChange = (
    filterKey: keyof InteriorPaintFilterState,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[filterKey] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    onFilterChange(filterKey, newValues);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange('priceRange', [min, max]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Interior Paint Filters</h2>
        <button
          onClick={() => {
            onFilterChange('roomTypes', []);
            onFilterChange('sheenLevels', []);
            onFilterChange('colorFamilies', []);
            onFilterChange('coverage', []);
            onFilterChange('features', []);
            onFilterChange('brands', []);
            onFilterChange('priceRange', [priceRange.min, priceRange.max]);
            onFilterChange('inStockOnly', false);
          }}
          className="text-sm text-[#5B7B7A] hover:text-[#5B7B7A]/80 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Room Types */}
      <FilterSection title="Room Type" icon={<Home className="w-4 h-4" />}>
        {roomTypes.map((room) => (
          <label key={room.id} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(room.id)}
              onChange={(e) => handleCheckboxChange('roomTypes', room.id, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200 capitalize">
              {room.name}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Sheen Levels */}
      <FilterSection title="Sheen Level" icon={<Sparkles className="w-4 h-4" />}>
        {sheenLevels.map((sheen) => (
          <label key={sheen.id} className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.sheenLevels.includes(sheen.id)}
              onChange={(e) => handleCheckboxChange('sheenLevels', sheen.id, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200">
                {sheen.name}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">{sheen.description}</p>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Color Families */}
      <FilterSection title="Color Family" icon={<Palette className="w-4 h-4" />}>
        {colorFamilies.map((family) => (
          <label key={family.id} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.colorFamilies.includes(family.id)}
              onChange={(e) => handleCheckboxChange('colorFamilies', family.id, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <div
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: family.hex }}
            />
            <span className="text-sm text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200">
              {family.name}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" icon={<span className="text-sm font-bold">$</span>}>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Min</label>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Max</label>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </FilterSection>

      {/* Coverage */}
      <FilterSection title="Coverage" icon={<Droplets className="w-4 h-4" />}>
        {coverageOptions.map((coverage) => (
          <label key={coverage.id} className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.coverage.includes(coverage.id)}
              onChange={(e) => handleCheckboxChange('coverage', coverage.id, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200">
                {coverage.name}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">{coverage.description}</p>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Features */}
      <FilterSection title="Special Features" icon={<Shield className="w-4 h-4" />}>
        {features.map((feature) => (
          <label key={feature.id} className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.features.includes(feature.id)}
              onChange={(e) => handleCheckboxChange('features', feature.id, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200">
                {feature.name}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brand">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={(e) => handleCheckboxChange('brands', brand, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200 capitalize">
              {brand}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
          />
          <span className="text-sm text-gray-700 group-hover:text-[#2C2C2C] transition-colors duration-200">
            In Stock Only
          </span>
        </label>
      </FilterSection>
    </div>
  );
};