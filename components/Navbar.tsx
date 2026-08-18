'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SearchAutocomplete from '@/components/SearchAutocomplete';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-[40px] left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-md' : 'glass-strong'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-[70px] lg:h-[72px]">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group whitespace-nowrap flex-shrink-0">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(163,230,53,.25))'
              }}
            >
             
            </div>

            {/* AI EXPLORER Text */}
            <div className="flex items-center">
              <span className="font-bold text-xl lg:text-2xl tracking-wide whitespace-nowrap leading-none">
                <span className="text-green-500">AI</span>
                <span className="text-charcoal ml-1">EXPLORER</span>
              </span>
            </div>
          </Link>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-[550px] mx-6 lg:mx-8">
            <SearchAutocomplete placeholder="Search AI tools, subscriptions..." />
          </div>

          {/* Right Side - Reviews Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/reviews"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-charcoal">Reviews</span>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top Row: Logo and Reviews */}
          <div className="flex items-center justify-between h-[50px]">
            <Link href="/" className="flex items-center gap-2 group whitespace-nowrap flex-shrink-0">
              {/* AI EXPLORER Text - Mobile */}
              <div className="flex items-center">
                <span className="font-bold text-lg tracking-wide whitespace-nowrap leading-none">
                  <span className="text-green-500">AI</span>
                  <span className="text-charcoal ml-1">EXPLORER</span>
                </span>
              </div>
            </Link>

            {/* Mobile Reviews Button */}
            <Link
              href="/reviews"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm flex-shrink-0"
            >
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-charcoal">Reviews</span>
            </Link>
          </div>

          {/* Bottom Row: Search Bar */}
          <div className="pb-3">
            <SearchAutocomplete placeholder="Search AI tools, subscriptions..." isMobile />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
