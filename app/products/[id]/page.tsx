'use client';

import { useState, use } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import products from '@/data/products.json';
import reviews from '@/data/reviews.json';
import faq from '@/data/faq.json';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.slug === id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(10);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  const productReviews = reviews
    .filter(r => r.productId === product.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, visibleReviews);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleWhatsAppOrder = () => {
    const message = `Hello! 

I'm interested in purchasing:

 ${product.name} Premium
 Price: PKR ${product.price}

Please share the payment details. Thank you!`;
    const whatsappUrl = `https://wa.me/923143111118?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const totalReviews = reviews.filter(r => r.productId === product.id).length;
  const hasMoreReviews = visibleReviews < totalReviews;

  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 10, totalReviews));
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="text-neon-blue hover:underline">
            ← Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Image */}
          <div className="relative">
            <div className="glass rounded-3xl p-8 h-96 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  priority
                />
              ) : (
                <div className="text-9xl">🚀</div>
              )}
            </div>
            {product.badge && (
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold z-10">
                {product.badge}
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-red-500 text-white font-semibold z-10">
                -{discount}% OFF
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-neon-blue text-sm font-medium mb-2">{product.category}</div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
              {productReviews.length > 0 && (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Seller</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-white">Rs. {product.price}</span>
              {product.oldPrice && (
                <span className="text-2xl text-gray-500 line-through">Rs. {product.oldPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-8">{product.description}</p>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover:opacity-90 transition-opacity mb-4"
              style={{ backgroundColor: '#25D366' }}
            >
              <FaWhatsapp className="w-6 h-6" />
              Order on WhatsApp
            </button>

            <p className="text-gray-400 text-sm text-center">
              Instant delivery after payment confirmation
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-neon-blue flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Customer Reviews</h2>
            <div className="text-gray-400 mb-8">
              {totalReviews} Customer Reviews
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
            {hasMoreReviews && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Load More Reviews ({totalReviews - visibleReviews} remaining)
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.slice(0, 4).map((item) => (
              <div key={item.id} className="border-b border-white/10 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium">{item.question}</span>
                  <span className="text-neon-blue">{openFaq === item.id ? '−' : '+'}</span>
                </button>
                {openFaq === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-gray-400"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
