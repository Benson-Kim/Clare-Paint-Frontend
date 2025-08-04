'use client';

import { useState, useCallback } from 'react';
import { FilterState } from '@/app/products/page';

export const useProductFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    colorFamilies: [],
    finishTypes: [],
    priceRange: [0, 200],
    roomTypes: [],
    brands: [],
    inStockOnly: false,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('featured');

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
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
      colorFamilies: [],
      finishTypes: [],
      priceRange: [0, 200],
      roomTypes: [],
      brands: [],
      inStockOnly: false,
      searchQuery: ''
    });
    setSortBy('featured');
  }, []);

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.colorFamilies.length > 0) count++;
    if (filters.finishTypes.length > 0) count++;
    if (filters.roomTypes.length > 0) count++;
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