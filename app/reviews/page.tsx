'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import reviews from '@/data/reviews.json';
import products from '@/data/products.json';

const ReviewCard = dynamic(() => import('@/components/ReviewCard'), {
  loading: () => <div className="glass rounded-2xl p-6"><div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" /><div><div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" /><div className="flex items-center gap-2"><div className="flex gap-1">{[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-white/10 rounded animate-pulse" />)}</div></div></div></div><div className="h-4 w-16 bg-white/10 rounded animate-pulse" /></div><div className="space-y-2 mb-4"><div className="h-3 w-full bg-white/10 rounded animate-pulse" /><div className="h-3 w-full bg-white/10 rounded animate-pulse" /><div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" /></div><div className="h-4 w-24 bg-white/10 rounded animate-pulse" /></div>
});

export default function ReviewsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-4">Customer Reviews</h1>
          <p className="text-gray-400">See what our customers are saying about us</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-black mb-2">5.0</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-black mb-2">{reviews.length}+</div>
            <div className="text-gray-400">Reviews</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-black mb-2">100%</div>
            <div className="text-gray-400">Verified Buyers</div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

      
      </div>
    </main>
  );
}
