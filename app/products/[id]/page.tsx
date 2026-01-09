import { fetchProduct } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AiFillStar } from 'react-icons/ai';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-50 via-white to-success-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-12 px-4 py-2 bg-white/50 rounded-xl backdrop-blur-sm transition-all duration-200 hover:bg-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/*Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-sm p-6 border border-primary-200/50">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-96 lg:h-[500px] object-contain rounded-2xl shadow-lg"
              priority
            />
          </div>

          {/*Details */}
          <div className="space-y-8 lg:sticky lg:top-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-primary-700 mb-6 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-start gap-6 mb-8">
                <span className="text-5xl lg:text-6xl font-black text-primary-600">${product.price}</span>
                <div className="flex items-center gap-2 px-6 py-3 bg-success-100 text-primary-700 rounded-2xl font-semibold text-lg shadow-lg">
                  <span className="text-2xl"><AiFillStar className="text-yellow-400" /></span>
                  {product.rating.rate} ({product.rating.count} reviews)
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-primary-200/50 shadow-xl">
              <h3 className="text-2xl font-bold text-primary-700 mb-6">Description</h3>
              <p className="text-primary-600 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="flex gap-4 pt-8 border-t-2 border-primary-200">
              <Button size="lg" className="flex-1 justify-center text-lg font-semibold shadow-2xl hover:shadow-3xl">
                Add to Cart - ${product.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
