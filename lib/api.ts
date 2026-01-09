import { Product } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  } catch (error) {
    console.error('Product fetch error:', error);
    throw error;
  }
}
