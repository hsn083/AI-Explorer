'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { cn } from '@/utils/cn';
import WhatsAppIcon from './WhatsAppIcon';
import { getProductRating } from '@/utils/reviews';

interface ProductCardProps {
  product: Product;
  index?: number;
  layout?: 'horizontal' | 'vertical';
}

export default function ProductCard({
  product,
  index = 0,
  layout = 'horizontal',
}: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const { rating, count } = getProductRating(product.id);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const message = `Assalamualaikum! I'm interested in buying "${product.name}" from AI Explorer. Please provide details.`;

    window.open(
      `https://wa.me/923143111118?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (layout === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -4 }}
        className="group h-full"
      >
        <Link href={`/products/${product.slug}`} className="block h-full">
          <div className="bg-white rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200 group-hover:border-[#25D366]/50 group-hover:shadow-[0_4px_20px_rgba(37,211,102,0.15)] cursor-pointer">

            {/* Image - Top */}
            <div className="relative h-32 sm:h-40 md:h-48 bg-gray-50 flex items-center justify-center overflow-hidden p-2 sm:p-3 md:p-4 flex-shrink-0">
              {discount > 0 && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-charcoal text-lime text-[10px] font-semibold z-10">
                  -{discount}%
                </div>
              )}
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                  quality={80}
                  loading="lazy"
                />
              ) : (
                <div className="text-4xl md:text-6xl opacity-50">🚀</div>
              )}
            </div>

            {/* Content - Bottom */}
            <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">

              {/* Sold Badge */}
              {product.sold && (
                <div className="text-[10px] sm:text-[11px] md:text-xs text-gray-600 mb-0.5">
                  <span className="font-semibold">{product.sold.toLocaleString()}</span> Sold
                </div>
              )}

              {/* Product Title */}
              <h3 className="text-charcoal font-bold text-[11px] sm:text-[12px] md:text-sm leading-tight line-clamp-2 min-h-[26px] sm:min-h-[28px] md:min-h-[32px] group-hover:text-[#25D366] transition-colors duration-300 mb-0.5">
                {product.name}
              </h3>

              {/* Duration */}
              {product.duration && (
                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] md:text-xs text-gray-600 mb-1 sm:mb-2">
                  <span>◷</span>
                  <span>{product.duration}</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-1 sm:mb-2 md:mb-3">
                <div className="text-sm sm:text-base md:text-lg font-bold text-charcoal">
                  Rs. {product.price}
                </div>

                {product.oldPrice && (
                  <div className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 line-through">
                    Rs. {product.oldPrice}
                  </div>
                )}
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-1 mb-1 sm:mb-2 md:mb-3">
                  <span className="text-yellow-400 text-[10px] sm:text-[11px] md:text-sm">{'★'.repeat(Math.floor(rating))}</span>
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">{rating} ({count})</span>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-auto flex gap-1.5 sm:gap-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-8 sm:h-9 md:h-10 rounded-full border-2 border-charcoal hover:bg-charcoal hover:text-white text-charcoal text-[10px] sm:text-[11px] md:text-xs font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  Details
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 h-8 sm:h-9 md:h-10 rounded-full transition-all duration-300 flex items-center justify-center text-white text-[10px] sm:text-[11px] md:text-xs font-semibold gap-0.5 sm:gap-1"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <WhatsAppIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                  <span className="hidden sm:inline">Order</span>
                </button>
              </div>

            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link href={`/products/${product.slug}`} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden premium-shadow hover:premium-shadow-lg transition-all duration-300 h-full flex flex-row border border-gray-200 min-h-[100px] sm:min-h-[120px] md:min-h-[130px] group-hover:border-[#25D366]/50 group-hover:shadow-[0_4px_20px_rgba(37,211,102,0.15)] cursor-pointer">

          {/* Image - Left Side */}
          <div className="relative h-[100px] w-[82px] sm:h-auto sm:w-[140px] md:w-[160px] flex-shrink-0 flex items-center justify-center overflow-hidden p-0 sm:p-3">
            {product.image ? (
              <div className="relative w-[80px] h-[80px] sm:w-full sm:h-full flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 mobile-image-down"
                  sizes="(max-width:640px) 80px, (max-width:768px) 140px, 160px"
                  quality={80}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="text-3xl sm:text-4xl md:text-5xl opacity-50">🚀</div>
            )}
          </div>
          <style jsx>{`
            @media (max-width: 640px) {
              .mobile-image-down {
                top: 55% !important;
                transform: translate(-50%, -50%) !important;
              }
            }
          `}</style>

          {/* Content - Right Side */}
          <div className="p-2 sm:p-3 flex flex-col flex-1 justify-between">

            {/* Top Section */}
            <div className="flex-1">
              {/* Sold Badge */}
              {product.sold && (
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-0.5">
                  <span className="font-semibold">{product.sold.toLocaleString()}</span> Sold
                </div>
              )}

              {/* Product Title */}
              <h3 className="text-charcoal font-bold text-[12px] sm:text-sm md:text-base leading-tight line-clamp-2 min-h-[24px] sm:min-h-[28px] md:min-h-[36px] group-hover:text-[#25D366] transition-colors duration-300 mb-0.5">
                {product.name}
              </h3>

              {/* Duration */}
              {product.duration && (
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1">
                  <span>◷</span>
                  <span>{product.duration}</span>
                </div>
              )}

              {/* Price */}
              <div className="mb-1 sm:mb-2">
                <div className="text-[15px] sm:text-base md:text-lg font-bold text-charcoal">
                  Rs. {product.price}
                </div>

                {product.oldPrice && (
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 line-through">
                    Rs. {product.oldPrice}
                  </div>
                )}
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  <span className="text-yellow-400 text-[10px] sm:text-xs md:text-sm">{'★'.repeat(Math.floor(rating))}</span>
                  <span className="text-[8px] sm:text-[9px] md:text-xs text-gray-600">{rating} ({count})</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-1.5 sm:gap-2 mt-1 sm:mt-2">
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 h-[25px] sm:h-9 md:h-10 rounded-full border-2 border-charcoal hover:bg-charcoal hover:text-white text-charcoal text-[9px] sm:text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center px-2 sm:px-0"
              >
                Details
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 h-[25px] sm:h-9 md:h-10 rounded-full transition-all duration-300 flex items-center justify-center text-white text-[9px] sm:text-xs md:text-sm font-semibold gap-0.5 sm:gap-1 px-2 sm:px-0"
                style={{ backgroundColor: '#25D366' }}
              >
                <WhatsAppIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Order</span>
              </button>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}