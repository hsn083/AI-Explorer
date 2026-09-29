'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Review } from '@/types';
import { cn } from '@/utils/cn';

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-charcoal flex items-center justify-center overflow-hidden">
            <span className="text-lime font-bold">{review.customerName.charAt(0)}</span>
          </div>
          <div>
            <h4 className="text-charcoal font-semibold">{review.customerName}</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3 h-3',
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              {review.verifiedPurchase && (
                <div className="flex items-center gap-1 text-lime-600 text-xs">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{review.date}</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700">{review.reviewText}</p>
    </motion.div>
  );
}
