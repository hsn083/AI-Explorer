'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getRandomReviews } from '@/utils/reviews';
import { Review } from '@/types';

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Get random reviews from different products
    const randomReviews = getRandomReviews(8);
    setReviews(randomReviews);
  }, []);

  useEffect(() => {
    if (!isPaused && reviews.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <div
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 lg:p-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows - Desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl text-charcoal items-center justify-center transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl text-charcoal items-center justify-center transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Review Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Stars */}
          <div className="flex items-center gap-1 mb-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  i < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Review Text */}
          <p className="text-charcoal text-lg md:text-xl lg:text-2xl font-medium text-center mb-6 leading-relaxed">
            "{currentReview.reviewText}"
          </p>

          {/* Customer Info */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-charcoal flex items-center justify-center">
              <span className="text-lime font-bold text-lg md:text-xl">
                {currentReview.customerName.charAt(0)}
              </span>
            </div>
            <div className="text-left">
              <p className="text-charcoal font-semibold text-sm md:text-base">
                {currentReview.customerName}
              </p>
              {currentReview.verifiedPurchase && (
                <p className="text-lime-600 text-xs md:text-sm">Verified Purchase</p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-charcoal w-8' : 'bg-gray-300 hover:bg-gray-400 w-2'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint - Mobile */}
      <p className="md:hidden text-center text-gray-500 text-xs mt-4">
        Swipe to see more reviews
      </p>
    </div>
  );
}
