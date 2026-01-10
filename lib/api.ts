import { Product } from '@/types';
import { notFound } from 'next/navigation';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 }, // ISR for product list
    });

    if (!response.ok) {
      console.error(
        'Fetch Products Failed:',
        response.status,
        response.statusText
      );
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error in fetchProducts:', error);
    throw error;
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store', // Ensures fresh data on Vercel
    });

    if (!response.ok) {
      console.error(`Fetch Failed for ID: ${id}`);
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error(`API Error for ID: ${id}`, error);
    return null;
  }
}
