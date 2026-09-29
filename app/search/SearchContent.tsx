'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/utils/search';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      searchProducts(query.trim()).then(searchResults => {
        setResults(searchResults);
        setLoading(false);
      });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2">
            {query.trim() ? `Search results for "${query}"` : 'Search'}
          </h1>
          <p className="text-gray-600">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
          </div>
        ) : results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5"
          >
            {results.map((product, index) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        ) : query.trim() ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-charcoal mb-2">
              No products found
            </h2>
            <p className="text-gray-600 mb-6">
              Try searching for another AI tool or subscription.
            </p>
            <p className="text-sm text-gray-500">
              Popular searches: capcut, canva, chatgpt, vpn, ai, video, design
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-charcoal mb-2">
              Search for AI tools and subscriptions
            </h2>
            <p className="text-gray-600">
              Use the search bar above to find products.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
