'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Button } from './ui/Button';
import { HeartIcon } from '@radix-ui/react-icons';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-primary-200/50">
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 p-4 w-23 h-23">
          <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500 m-2"
          />
        </Link>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border-transparent"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            });
          }}
        >
          {isFavorite(product.id) ? (
            <HeartFilledIcon className="h-5 w-5 text-highlight" />
          ) : (
            <HeartIcon className="h-5 w-5 text-primary-700" />
          )}
        </Button>
      </div>
      
      <div className="p-6">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-700">${product.price}</span>
          <span className="px-3 py-1 bg-success-200 text-primary-700 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
