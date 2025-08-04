'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Product } from '@/types/product';
import { FilterState } from '@/app/products/page';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  products: Product[];
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = true 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-4"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-[#2C2C2C]">{title}</h3>
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

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  products
}) => {
  // Extract unique values from products
  const colorFamilies = Array.from(
    new Set(
      products.flatMap(p => 
        p.colors.map(c => {
          const name = c.name.toLowerCase();
          if (name.includes('green') || name.includes('sage')) return 'green';
          if (name.includes('gray') || name.includes('grey') || name.includes('charcoal')) return 'gray';
          if (name.includes('cream') || name.includes('white') || name.includes('beige')) return 'neutral';
          if (name.includes('brown') || name.includes('mustard')) return 'brown';
          if (name.includes('blue')) return 'blue';
          if (name.includes('red')) return 'red';
          return 'other';
        })
      )
    )
  );

  const finishTypes = Array.from(
    new Set(products.flatMap(p => p.finishes.map(f => f.name.toLowerCase())))
  );

  const roomTypes = Array.from(
    new Set(products.map(p => p.category.toLowerCase()))
  );

  const brands = Array.from(
    new Set(products.map(p => p.brand.toLowerCase()))
  );

  const priceRange = products.reduce(
    (acc, product) => ({
      min: Math.min(acc.min, product.basePrice),
      max: Math.max(acc.max, product.basePrice)
    }),
    { min: Infinity, max: -Infinity }
  );

  const handleCheckboxChange = (
    filterKey: keyof FilterState,
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
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Filters</h2>
        <button
          onClick={() => {
            onFilterChange('colorFamilies', []);
            onFilterChange('finishTypes', []);
            onFilterChange('roomTypes', []);
            onFilterChange('brands', []);
            onFilterChange('priceRange', [priceRange.min, priceRange.max]);
            onFilterChange('inStockOnly', false);
          }}
          className="text-sm text-[#5B7B7A] hover:text-[#5B7B7A]/80 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Color Families */}
      <FilterSection title="Color Family">
        {colorFamilies.map((family) => (
          <label key={family} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.colorFamilies.includes(family)}
              onChange={(e) => handleCheckboxChange('colorFamilies', family, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 capitalize">{family}</span>
            <span className="text-xs text-gray-500">
              ({products.filter(p => 
                p.colors.some(c => {
                  const name = c.name.toLowerCase();
                  if (family === 'green') return name.includes('green') || name.includes('sage');
                  if (family === 'gray') return name.includes('gray') || name.includes('grey') || name.includes('charcoal');
                  if (family === 'neutral') return name.includes('cream') || name.includes('white') || name.includes('beige');
                  if (family === 'brown') return name.includes('brown') || name.includes('mustard');
                  return name.includes(family);
                })
              ).length})
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Finish Types */}
      <FilterSection title="Finish Type">
        {finishTypes.map((finish) => (
          <label key={finish} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.finishTypes.includes(finish)}
              onChange={(e) => handleCheckboxChange('finishTypes', finish, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 capitalize">{finish}</span>
            <span className="text-xs text-gray-500">
              ({products.filter(p => p.finishes.some(f => f.name.toLowerCase() === finish)).length})
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
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
          <div className="relative">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </FilterSection>

      {/* Room Types */}
      <FilterSection title="Room Type">
        {roomTypes.map((room) => (
          <label key={room} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(room)}
              onChange={(e) => handleCheckboxChange('roomTypes', room, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 capitalize">{room}</span>
            <span className="text-xs text-gray-500">
              ({products.filter(p => p.category.toLowerCase() === room).length})
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brand">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={(e) => handleCheckboxChange('brands', brand, e.target.checked)}
              className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
            />
            <span className="text-sm text-gray-700 capitalize">{brand}</span>
            <span className="text-xs text-gray-500">
              ({products.filter(p => p.brand.toLowerCase() === brand).length})
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            className="w-4 h-4 text-[#5B7B7A] border-gray-300 rounded focus:ring-[#5B7B7A] focus:ring-2"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
          <span className="text-xs text-gray-500">
            ({products.filter(p => p.inStock).length})
          </span>
        </label>
      </FilterSection>
    </div>
  );
};