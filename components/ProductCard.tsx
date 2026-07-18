'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hello! 

I'm interested in purchasing:

 ${product.name} Premium
 Price: PKR ${product.price}

Please share the payment details. Thank you!`;
    const whatsappUrl = `https://wa.me/923143111118?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="group"
      >
        <div className="glass rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300 cursor-pointer">
          {/* Image */}
          <div className="relative h-56 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden p-4">
            {product.badge && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-semibold z-10">
                {product.badge}
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold z-10">
                -{discount}%
              </div>
            )}
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                priority
              />
            ) : (
              <div className="text-6xl opacity-50">
                🚀
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="text-xs text-neon-blue mb-2">{product.category}</div>
            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-neon-purple transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">Rs. {product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">Rs. {product.oldPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#25D366' }}
            >
              <FaWhatsapp className="w-5 h-5" />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
