'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    label: 'SPECIAL OFFER',
    heading: 'Buy Any 3 Products & Get 10% OFF',
    description: 'Limited time offer on premium AI tools',
    cta: 'Shop Now',
    link: '/products',
    gradient: 'from-blue-600 to-blue-800',
    image: '/Productivity.png',
  },
  {
    label: 'BUNDLE DEAL',
    heading: 'VPN + PROXY from Rs 800',
    description: 'Secure your browsing with premium bundles',
    cta: 'See Bundle',
    link: '/products',
    gradient: 'from-orange-600 to-orange-800',
    image: '/expressvpn.png',
  },
  {
    label: 'CANVA PRO 12M',
    heading: 'Only Rs 690 • Premium & Brand Kit',
    description: 'Complete design suite at unbeatable price',
    cta: 'Grab Deal',
    link: '/products',
    gradient: 'from-green-600 to-green-800',
    image: '/Canva.jpeg',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-slide
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  return (
    <section className="relative py-4 md:py-5 lg:py-6 px-4">
      <div className="container mx-auto max-w-[1400px]">
        <div
          className="relative rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] overflow-hidden h-[140px] sm:h-[150px] md:h-[170px] lg:h-[180px] xl:h-[200px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <AnimatePresence mode="wait">
            {slides
              .filter((_, index) => index === currentSlide)
              .map((slide, index) => (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`relative z-10 flex items-center h-full bg-gradient-to-r ${slide.gradient} overflow-hidden`}
                >
                  {/* Abstract shapes - Right side */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute top-0 right-1/3 w-32 h-32 bg-white/15 rounded-full blur-xl" />
                  </div>

                  {/* Content - Left side */}
                  <div className="relative z-10 w-[65%] sm:w-[65%] px-4 sm:px-6 md:px-8 lg:px-10 lg:px-12 flex flex-col justify-center">
                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center justify-center px-[10px] sm:px-[14px] h-[26px] sm:h-[30px] rounded-full bg-white/20 text-white font-semibold mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 tracking-wider uppercase whitespace-nowrap"
                      style={{ fontSize: '11px sm:14px', width: 'fit-content' }}
                    >
                      {slide.label}
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 line-clamp-2 leading-tight"
                    >
                      {slide.heading}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[10px] sm:text-xs md:text-sm text-white/90 mb-1.5 sm:mb-2 md:mb-3 line-clamp-1 hidden sm:block"
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full bg-white hover:bg-white/90 text-charcoal font-semibold text-[11px] sm:text-xs md:text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {slide.cta}
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Image - Right side */}
                  <div className="relative z-10 flex w-[35%] h-full items-center justify-end pr-6 sm:pr-8 md:pr-10 lg:pr-12 absolute right-0 top-0 sm:static">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      src={slide.image}
                      alt={slide.heading}
                      className="w-full max-w-[100px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] max-h-[90px] sm:max-h-[140px] md:max-h-[170px] lg:max-h-[190px] object-contain"
                    />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Navigation Arrows - Desktop */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-charcoal w-8' : 'bg-white/40 hover:bg-white/60 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
