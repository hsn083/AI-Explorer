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

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
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

    window.open(
      `https://wa.me/923143111118?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -8 }}
        className="group h-full"
      >
        <div className="glass rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300 h-full flex flex-col">

          {/* Image */}
          <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden p-3 md:p-4">

            {product.badge && (
              <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white text-[10px] md:text-xs font-semibold z-10">
                {product.badge}
              </div>
            )}

            {discount > 0 && (
              <div className="absolute top-2 right-2 md:top-3 md:right-3 px-2 py-1 rounded-full bg-red-500 text-white text-[10px] md:text-xs font-semibold z-10">
                -{discount}%
              </div>
            )}

            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                quality={80}
              />
            ) : (
              <div className="text-4xl md:text-6xl opacity-50">🚀</div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 md:p-5 flex flex-col flex-1">

            {/* Category */}
            <span className="text-[10px] md:text-xs text-neon-blue mb-1 uppercase tracking-wide">
              {product.category}
            </span>

            {/* Name */}
            <h3 className="text-white font-semibold text-sm md:text-lg leading-tight line-clamp-2 min-h-[40px] md:min-h-[56px] group-hover:text-neon-purple transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 md:gap-2 mt-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3 h-3 md:w-4 md:h-4',
                      i < product.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    )}
                  />
                ))}
              </div>

              <span className="text-[10px] md:text-sm text-gray-400">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="mb-3">
              <div className="text-xl md:text-2xl font-bold text-white">
                Rs. {product.price}
              </div>

              {product.oldPrice && (
                <div className="text-xs md:text-sm text-gray-500 line-through">
                  Rs. {product.oldPrice}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="hidden md:block text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* WhatsApp Button */}
        <button
  onClick={handleWhatsAppOrder}
  className="mt-auto w-full h-10 sm:h-11 md:h-12 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] transition-all duration-300 flex items-center justify-center"
>
  <span className="flex items-center justify-center gap-1.5 sm:gap-2">
    <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />

    {/* Mobile */}
    <span className="block sm:hidden text-[11px] font-semibold leading-none whitespace-nowrap">
      WhatsApp
    </span>

    {/* Tablet & Desktop */}
    <span className="hidden sm:block text-xs md:text-sm font-semibold leading-none whitespace-nowrap">
      Order on WhatsApp
    </span>
  </span>
</button>

          </div>
        </div>
      </motion.div>
    </Link>
  );
}