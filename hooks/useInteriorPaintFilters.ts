'use client';

import { useState, useCallback } from 'react';
import { InteriorPaintFilterState } from '@/app/interior-paints/page';

export const useInteriorPaintFilters = () => {
  const [filters, setFilters] = useState<InteriorPaintFilterState>({
    roomTypes: [],
    sheenLevels: [],
    colorFamilies: [],
    priceRange: [0, 200],
    brands: [],
    coverage: [],
    dryTime: [],
    features: [],
    inStockOnly: false,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('featured');

  const updateFilter = useCallback((key: keyof InteriorPaintFilterState, value: any) => {
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
      roomTypes: [],
      sheenLevels: [],
      colorFamilies: [],
      priceRange: [0, 200],
      brands: [],
      coverage: [],
      dryTime: [],
      features: [],
      inStockOnly: false,
      searchQuery: ''
    });
    setSortBy('featured');
  }, []);

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.roomTypes.length > 0) count++;
    if (filters.sheenLevels.length > 0) count++;
    if (filters.colorFamilies.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.coverage.length > 0) count++;
    if (filters.features.length > 0) count++;
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