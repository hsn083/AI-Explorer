'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, ShieldCheck, Zap, Award, DollarSign, Lock, Bot, Brain, Video, Play, Linkedin, Film } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import hero from '@/data/hero.json';
import settings from '@/data/settings.json';

export default function Home() {
  const featuredProducts = products.filter(p => p.popular).slice(0, 4);

  const iconMap: { [key: string]: any } = {
    Bot,
    Brain,
    Video,
    Play,
    Linkedin,
    Film,
  };

  return (
    <main className="min-h-screen">
  {/* Hero Section */}
<section
  className="
    relative
    min-h-[100svh]
    flex
    items-center
    justify-center
    overflow-hidden
  "
>

  {/* Responsive Hero Banner */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="absolute inset-0 -z-20"
  >

    <picture>

      {/* Mobile */}
      <source
        media="(max-width: 640px)"
        srcSet="/Hero-mobile.png"
      />

      {/* Tablet */}
      <source
        media="(max-width: 1024px)"
        srcSet="/Hero-tablet.png"
      />

      {/* Desktop */}
      <img
        src="/Hero.png"
        alt="Z.N.K Tools & Services"
        className="
          w-full
          h-full
          object-cover
          object-center
        "
      />

    </picture>

  </motion.div>


  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20 -z-10" />


  {/* Content */}
<div
  className="
    absolute
 bottom-[12vh]
sm:bottom-[14vh]
md:bottom-[16vh]
lg:bottom-32

    left-0
    w-full

    z-20
    px-4
    sm:px-6
    lg:px-8

    text-center
  "
>

    <motion.div
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.8}}
      className="w-full max-w-4xl mx-auto"
    >

      {/* Buttons */}
      <div
  className="
  flex
  flex-col
  sm:flex-row
  items-center
  justify-center
  gap-3
  sm:gap-5
  "
>

        <a
          href={hero.primaryButton.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full
            max-w-[320px]
            sm:w-auto
            px-8
            py-3.5
            rounded-full
            text-white
            font-semibold
            flex
            justify-center
            items-center
            gap-2
          "
          style={{backgroundColor:"#25D366"}}
        >
          <FaWhatsapp className="w-5 h-5"/>
          {hero.primaryButton.text}
        </a>


        <Link
          href={hero.secondaryButton.link}
          className="
            w-full
            max-w-[320px]
            sm:w-auto
            px-8
            py-3.5
            rounded-full
            glass
            text-white
            font-semibold
            flex
            justify-center
            items-center
            gap-2
          "
        >
          {hero.secondaryButton.text}
          <ArrowRight className="w-5 h-5"/>
        </Link>

      </div>

    </motion.div>

  </div>

</section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {settings.trustBadges.map((badge, index) => {
              const Icon = iconMap[badge.icon] || ShieldCheck;
              return (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon className="w-8 h-8 text-neon-blue" />
                  <span className="text-white font-medium">{badge.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Browse Categories</h2>
            <p className="text-gray-400">Find the perfect tool for your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link href="/categories">
                  <div className={`glass rounded-2xl p-6 h-full hover:neon-glow transition-all duration-300 bg-gradient-to-br ${category.color} bg-opacity-10`}>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                          quality={75}
                        />
                      ) : (
                        <Bot className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                    <span className="text-neon-blue text-sm">{category.productCount} Products</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-gray-400">Our most popular digital subscriptions</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {settings.statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass rounded-2xl p-8"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl font-bold text-white mb-2 neon-text"
                >
                  {stat.value}+
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-400">What makes us different from others</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and get instant access to premium digital tools at affordable prices.
              </p>
              <a
                href="https://wa.me/923143111118"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#25D366' }}
              >
                <FaWhatsapp className="w-5 h-5" />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
