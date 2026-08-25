import { useState, useMemo } from 'react';
import rawMenuData from '@/data/menu.json';
import { MenuItem, MenuCategoryId, DietaryType } from '@/types/menu';
import { useDebounce } from './useDebounce';

const typedMenuData = rawMenuData as MenuItem[];

export function useMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType | 'all'>('all');

  const debouncedSearch = useDebounce(searchQuery.trim().toLowerCase(), 200);

  // All featured products
  const featuredItems = useMemo(() => {
    return typedMenuData.filter((item) => item.featured);
  }, []);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: typedMenuData.length,
    };

    typedMenuData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return counts;
  }, []);

  // Filtered items based on Category, Search Query, and Dietary filter
  const filteredItems = useMemo(() => {
    return typedMenuData.filter((item) => {
      // 1. Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Dietary filter check
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }

      // 3. Search query check
      if (debouncedSearch) {
        const matchesName = item.name.toLowerCase().includes(debouncedSearch);
        const matchesDesc = item.description.toLowerCase().includes(debouncedSearch);
        const matchesCategory = item.category.toLowerCase().includes(debouncedSearch);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, debouncedSearch]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDietaryFilter('all');
  };

  return {
    allItems: typedMenuData,
    filteredItems,
    featuredItems,
    categoryCounts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    dietaryFilter,
    setDietaryFilter,
    resetFilters,
    isFiltered: searchQuery !== '' || selectedCategory !== 'all' || dietaryFilter !== 'all',
  };
}
