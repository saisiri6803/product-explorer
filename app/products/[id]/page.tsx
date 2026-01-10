'use client'; // Required to use useEffect and useState

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { fetchProduct } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Product } from '@/types';

export default function ProductPage() {
  // 1. Grab the ID dynamically from the URL
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 2. Fetch data dynamically whenever the ID changes
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct(id);
        if (!data) {
          setError(true);
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // 3. SKELETON STATE (Shows while Vercel is fetching data)
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-32 mb-8 rounded-xl" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-14 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-32" />
              </div>
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. ERROR/NOT FOUND STATE
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-black text-primary-700 mb-4">Product Not Found</h2>
        <p className="mb-8 text-primary-600">The product you are looking for doesn&apos;t exist or was moved.</p>
        <Link href="/products">
          <Button size="lg">Return to Explorer</Button>
        </Link>
      </div>
    );
  }

  // 5. FINAL DYNAMIC UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-50 via-white to-success-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/products" className="inline-flex items-center gap-2 text-primary-600 mb-8 font-semibold hover:text-primary-700 transition-colors">
          ← Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-6 border border-primary-200/50">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[500px] object-contain"
              priority
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-black text-primary-700 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-6">
              <span className="text-5xl font-black text-primary-600">${product.price}</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-success-100 text-primary-700 rounded-2xl font-semibold shadow-sm">
                <AiFillStar className="text-yellow-400 text-xl" />
                {product.rating.rate} ({product.rating.count} reviews)
              </div>
            </div>

            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-primary-200/50 shadow-xl">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Product Description</h3>
              <p className="text-primary-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <Button size="lg" className="w-full text-xl py-8 shadow-2xl hover:shadow-primary-200/50 transition-all duration-300">
              Add to Cart - ${product.price}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}