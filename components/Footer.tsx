'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import { cn } from '@/utils/cn';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Reviews', href: '/reviews' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#aiexplorer' },
    { name: 'Instagram', icon: Instagram, href: '#aiexplorer' },
    { name: 'TikTok', icon: FaTiktok, href: '#aiexplorer' },
    { name: 'YouTube', icon: Youtube, href: '#aiexplorer' },
  ];

  return (
    <footer className="bg-black/50 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="AI Explorer"
                width={40}
                height={40}
                className="rounded-full neon-glow"
              />
              <span className="font-bold text-2xl tracking-wide">
                <span className="text-[#A3E635]">AI</span>
                <span className="text-white ml-1">EXPLORER</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium digital subscriptions at affordable prices. Instant delivery via WhatsApp.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-neon-blue" />
                <span>+92 314 3111118</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-neon-purple" />
                <span>work31323@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-pink" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} AI Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
