import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary-500 to-surface-dark flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-primary-600 via-primary-400 to-primary-900 bg-clip-text text-transparent mb-8 leading-tight">
            Product Explorer
          </h1>
          <p className="text-xl md:text-2xl text-primary-700 max-w-2xl mx-auto mb-12 leading-relaxed">
            Discover amazing products of different range 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto shadow-2xl hover:shadow-3xl text-lg px-12">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
