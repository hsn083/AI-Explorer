'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#090909]/95 backdrop-blur-xl border-b border-white/[0.08] h-16 md:h-[72px] lg:h-20"
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 md:gap-4 group whitespace-nowrap flex-shrink-0">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-8 w-8 md:h-10 md:w-10 lg:h-11 lg:w-11 flex-shrink-0"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(163,230,53,.25))'
              }}
            >
              <Image
                src="/logo.png"
                alt="AI Explorer Logo"
                width={44}
                height={44}
                className="object-contain w-full h-full"
              />
            </motion.div>

            {/* Vertical Divider */}
            <div className="h-6 md:h-8 w-px bg-white/20 flex-shrink-0 hidden sm:block" />

            {/* AI EXPLORER Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center hidden sm:block"
            >
              <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-wide whitespace-nowrap">
                <span className="text-[#A3E635]">AI</span>
                <span className="text-white ml-1">EXPLORER</span>
              </span>
            </motion.div>
          </Link>

          {/* Mobile/Tablet Search Bar */}
          <div className="flex-1 mx-3 md:mx-4 lg:hidden">
            <div className="relative flex items-center h-[38px] px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search AI tools..."
                className="flex-1 ml-2 bg-transparent text-white text-sm placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#A3E635] transition-all duration-300 font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Right Side Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Desktop Search */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Search...</span>
            </button>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/923143111118"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition-all duration-300"
              style={{ backgroundColor: '#25D366' }}
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#090909]/95 backdrop-blur-xl border-t border-white/[0.08]"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-[#A3E635] transition-all duration-300 py-2 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="https://wa.me/923143111118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white font-medium transition-all duration-300"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
