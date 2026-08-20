'use client';

import { useState, use, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import reviews from '@/data/reviews.json';
import faq from '@/data/faq.json';
import { getProductRating } from '@/utils/reviews';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(10);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      
      if (!data || data.error) {
        setLoading(false);
        return;
      }

      setProduct(data);

      // Fetch related products
      const relatedResponse = await fetch(`/api/products?category=${encodeURIComponent(data.category)}`);
      const relatedData = await relatedResponse.json();
      setRelatedProducts(relatedData.filter((p: any) => (p._id || p.id) !== (data._id || data.id)).slice(0, 4));
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  // Handle both MongoDB and JSON data structures
  const productId = product._id || product.id;
  const oldPrice = product.originalPrice || product.oldPrice;
  const soldCount = product.soldCount || product.sold;

  const productReviews = reviews
    .filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, visibleReviews);
  
  const totalReviews = reviews.filter(r => r.productId === productId).length;
  
  const discount = oldPrice
    ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
    : 0;
  const { rating, count } = getProductRating(productId);

  const handleWhatsAppOrder = () => {
    const message = `Assalamualaikum! I'm interested in buying "${product.name}" from AI Explorer. Please provide details.`;
    const whatsappUrl = `https://wa.me/923143111118?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const hasMoreReviews = visibleReviews < totalReviews;

  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 10, totalReviews));
  };

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16"
        >
          {/* Image */}
          <div className="relative h-64 md:h-96 lg:h-[500px] bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4 md:p-8 border border-gray-200">
            {discount > 0 && (
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full bg-red-500 text-white font-semibold z-10">
                -{discount}% OFF
              </div>
            )}

            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 md:p-8"
                sizes="(max-width:768px) 100vw, 50vw"
                quality={90}
                priority
              />
            ) : (
              <div className="text-6xl md:text-8xl opacity-50">🚀</div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-lime-600 text-sm font-medium mb-2">{product.category}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Sold Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">
                {soldCount.toLocaleString()} Sold
              </span>
            </div>

            {/* Duration */}
            {product.duration && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span className="text-gray-400">◷</span>
                <span className="text-sm">{product.duration}</span>
              </div>
            )}

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-700">{rating} ({count} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
              {oldPrice && (
                <span className="text-2xl text-gray-400 line-through">Rs. {oldPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-8">{product.description}</p>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-lime hover:bg-lime/90 text-charcoal font-semibold text-lg transition-colors mb-4"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Order on WhatsApp
            </button>

            <p className="text-gray-700 text-sm text-center">
              Instant delivery after payment confirmation
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 mb-16 border border-gray-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-charcoal mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features?.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-lime-600 flex-shrink-0" />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 mb-16 border border-gray-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-charcoal mb-6">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-6 h-6 text-lime-600 flex-shrink-0" />
                <span className="text-gray-800">{benefit}</span>
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
            <h2 className="text-3xl font-bold text-charcoal mb-6">Customer Reviews</h2>
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">{rating}</span>
                <span className="text-gray-600">{count} reviews</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
            {hasMoreReviews && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-xl bg-charcoal text-white font-semibold hover:bg-charcoal/90 transition-colors"
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
          className="bg-white rounded-3xl p-8 mb-16 border border-gray-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.slice(0, 4).map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-charcoal font-medium">{item.question}</span>
                  <span className="text-lime-600">{openFaq === item.id ? '−' : '+'}</span>
                </button>
                {openFaq === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-gray-700"
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
            <h2 className="text-3xl font-bold text-charcoal mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product._id || product.id} product={product} index={index} layout="vertical" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
