'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import { Filter, Grid, List, SlidersHorizontal, X, ChevronDown, Search, Calculator, Palette, Home, Lightbulb } from 'lucide-react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { InteriorPaintFilters } from '@/components/interior-paints/InteriorPaintFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductPagination } from '@/components/products/ProductPagination';
import { InteriorPaintHero } from '@/components/interior-paints/InteriorPaintHero';
import { RoomRecommendations } from '@/components/interior-paints/RoomRecommendations';
import { CoverageCalculator } from '@/components/interior-paints/CoverageCalculator';
import { ColorCoordinates } from '@/components/interior-paints/ColorCoordinates';
import { PrimerCompatibility } from '@/components/interior-paints/PrimerCompatibility';
import { useInteriorPaintFilters } from '@/hooks/useInteriorPaintFilters';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';
import { mockInteriorPaints } from '@/data/mock-interior-paints';
import { cn } from '@/lib/utils';

export interface InteriorPaintFilterState {
  roomTypes: string[];
  sheenLevels: string[];
  colorFamilies: string[];
  priceRange: [number, number];
  brands: string[];
  coverage: string[];
  dryTime: string[];
  features: string[];
  inStockOnly: boolean;
  searchQuery: string;
}

const ITEMS_PER_PAGE = 12;

export default function InteriorPaintsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showColorCoordinates, setShowColorCoordinates] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    clearFilters,
    getActiveFilterCount
  } = useInteriorPaintFilters();

  const {
    searchQuery,
    updateSearchQuery,
    searchResults
  } = useProductSearch(products);

  // Simulate API call for interior paints
  useEffect(() => {
    const fetchInteriorPaints = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockInteriorPaints);
      setLoading(false);
    };

    fetchInteriorPaints();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchResults : products;

    // Room type filter
    if (filters.roomTypes.length > 0) {
      result = result.filter(product =>
        filters.roomTypes.some(room =>
          product.features.some(feature =>
            feature.toLowerCase().includes(room.toLowerCase())
          ) ||
          product.description.toLowerCase().includes(room.toLowerCase())
        )
      );
    }

    // Sheen level filter
    if (filters.sheenLevels.length > 0) {
      result = result.filter(product =>
        product.finishes.some(finish =>
          filters.sheenLevels.some(sheen => {
            const finishSheen = finish.sheen.toLowerCase();
            if (sheen === 'flat') return finishSheen.includes('0-5%') || finishSheen.includes('flat');
            if (sheen === 'matte') return finishSheen.includes('5-10%') || finishSheen.includes('matte');
            if (sheen === 'eggshell') return finishSheen.includes('10-25%') || finishSheen.includes('eggshell');
            if (sheen === 'satin') return finishSheen.includes('25-35%') || finishSheen.includes('satin');
            if (sheen === 'semi-gloss') return finishSheen.includes('35-70%') || finishSheen.includes('semi-gloss');
            if (sheen === 'gloss') return finishSheen.includes('70%+') || finishSheen.includes('gloss');
            return false;
          })
        )
      );
    }

    // Color family filter
    if (filters.colorFamilies.length > 0) {
      result = result.filter(product =>
        product.colors.some(color =>
          filters.colorFamilies.some(family => {
            const colorName = color.name.toLowerCase();
            if (family === 'whites') return colorName.includes('white') || colorName.includes('cream');
            if (family === 'grays') return colorName.includes('gray') || colorName.includes('grey') || colorName.includes('charcoal');
            if (family === 'beiges') return colorName.includes('beige') || colorName.includes('tan') || colorName.includes('sand');
            if (family === 'blues') return colorName.includes('blue') || colorName.includes('navy');
            if (family === 'greens') return colorName.includes('green') || colorName.includes('sage');
            if (family === 'browns') return colorName.includes('brown') || colorName.includes('espresso');
            return colorName.includes(family);
          })
        )
      );
    }

    // Coverage filter
    if (filters.coverage.length > 0) {
      result = result.filter(product =>
        filters.coverage.some(coverage => {
          const productCoverage = product.coverage.toLowerCase();
          if (coverage === 'standard') return productCoverage.includes('300-350') || productCoverage.includes('350-400');
          if (coverage === 'premium') return productCoverage.includes('400-450') || productCoverage.includes('450+');
          return productCoverage.includes(coverage);
        })
      );
    }

    // Features filter
    if (filters.features.length > 0) {
      result = result.filter(product =>
        filters.features.some(feature =>
          product.features.some(productFeature =>
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }

    // Other filters (price, brand, stock, dry time)
    if (filters.brands.length > 0) {
      result = result.filter(product =>
        filters.brands.includes(product.brand.toLowerCase())
      );
    }

    if (filters.inStockOnly) {
      result = result.filter(product => product.inStock);
    }

    result = result.filter(product =>
      product.basePrice >= filters.priceRange[0] &&
      product.basePrice <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'coverage':
        result.sort((a, b) => {
          const getCoverageValue = (coverage: string) => {
            const match = coverage.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getCoverageValue(b.coverage) - getCoverageValue(a.coverage);
        });
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchResults, searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  const activeFilterCount = getActiveFilterCount();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-40 bg-gray-200 rounded" />
              </div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <InteriorPaintHero onRoomSelect={setSelectedRoom} />

      {/* Room Recommendations */}
      {selectedRoom && (
        <RoomRecommendations
          roomType={selectedRoom}
          products={products}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Tools Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search interior paints..."
                value={searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent transition-all duration-200"
                aria-label="Search interior paints"
              />
            </div>

            {/* Tool Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCalculator(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#5B7B7A] text-white rounded-lg hover:bg-[#5B7B7A]/90 transition-colors duration-200"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Coverage Calculator</span>
              </button>
              <button
                onClick={() => setShowColorCoordinates(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-[#5B7B7A] text-[#5B7B7A] rounded-lg hover:bg-[#5B7B7A]/5 transition-colors duration-200"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Color Coordinates</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#5B7B7A] text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 transition-colors duration-200",
                  viewMode === 'grid'
                    ? "bg-[#5B7B7A] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 transition-colors duration-200",
                  viewMode === 'list'
                    ? "bg-[#5B7B7A] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                )}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Results Count */}
            <span className="text-sm text-gray-600">
              {filteredProducts.length} interior paints found
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#5B7B7A] hover:text-[#5B7B7A]/80 transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}

            {/* Sort Dropdown */}
            <ProductSort currentSort={sortBy} onSortChange={updateSort} />
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:block",
            showFilters ? "block" : "hidden"
          )}>
            <div className="sticky top-8">
              <InteriorPaintFilters
                filters={filters}
                onFilterChange={updateFilter}
                products={products}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={paginatedProducts}
              viewMode={viewMode}
              onAddToCompare={() => {}}
              compareProducts={[]}
              loading={loading}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>

        {/* Primer Compatibility Section */}
        <PrimerCompatibility />
      </div>

      {/* Coverage Calculator Modal */}
      {showCalculator && (
        <CoverageCalculator onClose={() => setShowCalculator(false)} />
      )}

      {/* Color Coordinates Modal */}
      {showColorCoordinates && (
        <ColorCoordinates
          products={products}
          onClose={() => setShowColorCoordinates(false)}
        />
      )}
    </div>
  );
}