'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { Button } from './ui/Button';
import { HeartFilledIcon } from '@radix-ui/react-icons';

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filters: { search: string; category: string; favoritesOnly: boolean }) => void;
}

export function ProductFilters({ products, onFilterChange }: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    onFilterChange({ search, category, favoritesOnly });
  }, [search, category, favoritesOnly, onFilterChange]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-200/50">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 bg-white/90 backdrop-blur-sm border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-all duration-200 text-lg hover:ring-primary-800 hover:border-primary-800"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant={favoritesOnly ? 'primary' : 'outline'}
          size="xl"
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className="whitespace-nowrap p-4 hover:ring-primary-800 hover:border-primary-800"
        >
          <HeartFilledIcon className="h-8 w-8 text-highlight" />
        </Button>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-300 text-base font-medium hover:ring-primary-800 hover:border-primary-800"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
