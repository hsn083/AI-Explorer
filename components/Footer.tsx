'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import { cn } from '@/utils/cn';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/products' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const categoryLinks = [
    { name: 'AI Tools', href: '/products' },
    { name: 'Video', href: '/products' },
    { name: 'Design', href: '/products' },
    { name: 'Productivity', href: '/products' },
    { name: 'Developer', href: '/products' },
  ];

  const supportLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/923143111118', external: true },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#aiexplorer' },
    { name: 'Instagram', icon: Instagram, href: '#aiexplorer' },
    { name: 'TikTok', icon: FaTiktok, href: '#aiexplorer' },
    { name: 'YouTube', icon: Youtube, href: '#aiexplorer' },
  ];

  return (
    <footer className="bg-charcoal border-t border-gray-200 pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image
                src="/logo.png"
                alt="AI Explorer"
                width={40}
                height={40}
                className="rounded-full neon-glow h-auto w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="font-bold text-xl sm:text-2xl tracking-wide">
                <span className="text-lime">AI</span>
                <span className="text-white ml-1">EXPLORER</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
              Premium AI tools, digital products and subscriptions at affordable prices.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-lime hover:bg-white/20 transition-all"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lime transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Categories</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-lime transition-colors text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-lime transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lime transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6 md:pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear || 2026} AI Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
