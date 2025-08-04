'use client';

import { useState, useCallback } from 'react';

export interface ExteriorPaintFilterState {
  surfaceTypes: string[];
  climateZones: string[];
  durabilityRatings: number[];
  weatherResistance: string[];
  priceRange: [number, number];
  brands: string[];
  inStockOnly: boolean;
  searchQuery: string;
}

export const useExteriorPaintFilters = () => {
  const [filters, setFilters] = useState<ExteriorPaintFilterState>({
    surfaceTypes: [],
    climateZones: [],
    durabilityRatings: [],
    weatherResistance: [],
    priceRange: [0, 200],
    brands: [],
    inStockOnly: false,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('featured');

  const updateFilter = useCallback((key: keyof ExteriorPaintFilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateSort = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      surfaceTypes: [],
      climateZones: [],
      durabilityRatings: [],
      weatherResistance: [],
      priceRange: [0, 200],
      brands: [],
      inStockOnly: false,
      searchQuery: ''
    });
    setSortBy('featured');
  }, []);

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.surfaceTypes.length > 0) count++;
    if (filters.climateZones.length > 0) count++;
    if (filters.durabilityRatings.length > 0) count++;
    if (filters.weatherResistance.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.inStockOnly) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
    return count;
  }, [filters]);

  return {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    clearFilters,
    getActiveFilterCount
  };
};