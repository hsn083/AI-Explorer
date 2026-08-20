'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroBanner from '@/components/HeroBanner';
import CategoryStrip from '@/components/CategoryStrip';
import WatchingNow from '@/components/WatchingNow';
import ReviewCarousel from '@/components/ReviewCarousel';

const ProductCard = dynamic(() => import('@/components/ProductCard'), {
  loading: () => <div className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row border border-gray-200 shadow-sm min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"><div className="relative w-full sm:w-[150px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] bg-white flex items-center justify-center p-3 flex-shrink-0 border-r border-gray-200"><div className="w-full h-full bg-gray-100 rounded animate-pulse" /></div><div className="flex-1 p-3 sm:p-4 flex flex-col justify-between"><div><div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" /><div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" /><div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" /></div><div className="flex items-end justify-between gap-2"><div><div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-1" /><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></div><div className="flex gap-2"><div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" /><div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" /></div></div></div></div>
});

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      // Handle error response from API
      if (data.error) {
        console.error('API Error:', data.error);
        setProducts([]);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Unexpected data format:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <HeroBanner />
      <CategoryStrip />

      {/* Products Section */}
      <section className="py-4 md:py-6 lg:py-8 px-4">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-6 lg:mb-8"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal mb-2">
              Explore All Products
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
              Premium AI tools, subscriptions and digital products at affordable prices.
            </p>
          </motion.div>

          {/* Products Grid - 1 Column Mobile, 2 Columns Tablet/Desktop */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row border border-gray-200 shadow-sm min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="relative w-full sm:w-[150px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] bg-white flex items-center justify-center p-3 flex-shrink-0 border-r border-gray-200">
                    <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                    <div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {products.map((product: any) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What Customers Say Section - Placeholder for review carousel */}
      <section className="py-4 md:py-6 lg:py-8 px-4 bg-white">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-6 lg:mb-8"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal mb-2">
              What Customers Say
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">
              Real feedback from our customers across different products
            </p>
          </motion.div>

          {/* Review Carousel */}
          <ReviewCarousel />
        </div>
      </section>

      <WatchingNow />
    </main>
  );
}
