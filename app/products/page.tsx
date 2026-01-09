import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';
import Link from 'next/link';
import { HomeIcon } from '@radix-ui/react-icons';
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-50 via-primary-50 to-success-100 py-12 px-4">
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-semibold">
        <HomeIcon className="w-5 h-5 mr-2" /> Home
      </Link>
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent mb-6">
          Product Explorer
        </h1>
        <p className="text-xl md:text-2xl text-primary-700 max-w-3xl mx-auto leading-relaxed">
          Discover amazing products of different range
        </p>
      </div>
      
      <Suspense fallback={<div className="text-center py-20 text-primary-600">Loading products...</div>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
