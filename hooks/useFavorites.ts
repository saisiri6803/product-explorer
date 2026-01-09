'use client';

import { useState, useEffect, useCallback } from 'react';
import { FavoriteProduct } from '@/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      if (saved) setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = useCallback((product: FavoriteProduct) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id);
    const newFavorites = isFavorite 
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];

    setFavorites(newFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  }, [favorites]);

  const isFavorite = useCallback((productId: number) => {
    return favorites.some((fav) => fav.id === productId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
