'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types';
import { Skeleton } from './ui/Skeleton';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from './ui/Button';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = useCallback(({ search, category, favoritesOnly }: {
    search: string;
    category: string;
    favoritesOnly: boolean;
  }) => {
    let filtered = [...products];

    if (favoritesOnly && favorites.length > 0) {
      const favoriteIds = new Set(favorites.map(f => f.id));
      filtered = filtered.filter(p => favoriteIds.has(p.id));
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    setFilteredProducts(filtered);
  }, [products, favorites]);

  const skeletons = useMemo(() => Array(12).fill(0), []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-200/50">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skeletons.map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-6 text-primary-500">😞</div>
        <h2 className="text-3xl font-bold text-primary-700 mb-4">Something went wrong</h2>
        <p className="text-primary-600 mb-8 max-w-md mx-auto">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          size="lg"
          className="px-12"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductFilters products={products} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-20">
          <div className="text-6xl mb-6 text-primary-500">🔍</div>
          <h2 className="text-3xl font-bold text-primary-700 mb-4">No products found</h2>
          <p className="text-primary-600 text-lg">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
