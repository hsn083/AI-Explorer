'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Bot } from 'lucide-react';
import categories from '@/data/categories.json';
import products from '@/data/products.json';

export default function CategoriesPage() {
  const getCategoryProductCount = (categoryName: string) => {
    return products.filter(p => p.category === categoryName).length;
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Browse Categories</h1>
          <p className="text-gray-400">Find the perfect digital tool for your needs</p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const productCount = getCategoryProductCount(category.name);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={`/products?category=${category.name}`}>
                  <div className={`glass rounded-3xl p-8 h-full hover:neon-glow transition-all duration-300 bg-gradient-to-br ${category.color} bg-opacity-10`}>
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 overflow-hidden">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                          quality={75}
                        />
                      ) : (
                        <Bot className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-3">{category.name}</h3>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-neon-blue font-medium">{productCount} Products</span>
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
