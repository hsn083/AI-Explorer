'use client';

import { motion } from 'framer-motion';
import {
  Layers3,
  Users,
  Grid2X2,
  Star,
} 
from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, BadgeCheck, Zap, Award, DollarSign, Bot, Brain, Video, Play, Linkedin, Film, MessageSquare, BookOpen, Zap as Productivity, Radio } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import hero from '@/data/hero.json';
import settings from '@/data/settings.json';

export default function Home() {
  const featuredProducts = products.filter(p => p.popular).slice(0, 6);
const iconMap: { [key: string]: any } = {
  // Product Icons
  Bot,
  Brain,
  Video,
  Play,
  Linkedin,
  Film,

  // Trust Bar Icons
  ShieldCheck,
  BadgeCheck,
  Zap,
  Award,
  DollarSign,

  // Why Choose Us
  Users,
  Star,
  BookOpen,
  MessageSquare,
  Productivity,
  Radio,
};

  return (
    <main className="min-h-screen">
{/* Hero Section */}
<section className="relative min-h-[100svh] md:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-black">

  {/* Desktop Background Image */}
  <Image
    src="/Hero.jpg"
    alt="Hero Banner"
    fill
    priority
    sizes="100vw"
    className="hidden lg:block object-cover object-right"
  />

  {/* Mobile Background Image */}
  <Image
    src="/Hero-mobile.png"
    alt="Hero Banner Mobile"
    fill
    priority
    sizes="100vw"
    className="block lg:hidden object-cover object-center md:object-[center_0px]"
  />

  {/* Desktop Overlay */}
  <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#090909]/90 via-[#090909]/55 to-transparent" />

  {/* Mobile Overlay */}
  <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#090909]/75 via-[#090909]/45 to-[#090909]/80" />

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-8 pt-72 md:pt-20 lg:pt-24 pb-24">

    <div className="max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto md:mx-0 lg:mx-0">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/30 bg-lime-500/10 mb-6 relative -top-44 md:top-0"
      >
        <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
        <span className="text-lime-400 text-sm font-medium">
          Trusted AI Marketplace
        </span>
      </motion.div>

      {/* Hero Content Wrapper - Tablet Only Transform */}
      <div className="md:translate-y-40 lg:translate-y-0">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-black leading-none text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center md:text-left lg:text-left"
        >
          Explore
          <br />
          Compare
          <br />
          <span className="text-lime-400">
            Upgrade
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8 max-w-xl text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed text-center md:text-left lg:text-left"
        >
          Discover premium AI tools, streaming services and digital products
          at affordable prices with instant delivery.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 w-full sm:w-auto mx-auto sm:mx-0"
        >

          <Link
            href="/products"
            className="px-8 py-3 md:py-4 rounded-full bg-lime-400 hover:bg-lime-500 text-black font-semibold transition-all duration-300 text-center w-full sm:w-auto"
          >
            Explore AI Tools
          </Link>

          <Link
            href="/categories"
            className="px-8 py-3 md:py-4 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 text-center w-full sm:w-auto"
          >
            View Categories
          </Link>

        </motion.div>
      </div>

    </div>

  </div>

</section>
{/* Trust Bar */}
<section className="py-5 md:py-8">
  <div className="container mx-auto px-4">
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.05),transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {settings.trustBadges.map((badge, index) => {
          const Icon = iconMap[badge.icon];
          if (!Icon) {
            console.error("Unknown Trust Badge Icon:", badge.icon);
            return null;
          }

          return (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className={`
                flex items-center gap-4
                px-4 md:px-5 lg:px-6
                py-4 md:py-5 lg:py-6
                transition-all duration-300 hover:bg-white/[0.03]
                border-b border-white/10
                md:border-r md:border-b-0
                lg:border-r
                ${index === settings.trustBadges.length - 1 ? "lg:border-r-0" : ""}
              `}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/5">
                <Icon className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 text-lime-400" />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm md:text-[15px] font-semibold text-white leading-tight">
                  {badge.text}
                </h3>

                <p className="mt-1 text-xs md:text-[13px] text-gray-400 leading-5 line-clamp-2">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          );
        })}

      </div>

    </div>
  </div>
</section>
     {/* Featured Products */}
<section className="py-16 md:py-20 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 md:mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
        Featured Products
      </h2>

      <p className="text-sm md:text-base text-gray-400">
        Our most popular digital subscriptions
      </p>
    </motion.div>
    {/* Products Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
  {featuredProducts.slice(0, 6).map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      index={index}
    />
  ))}
</div>
    <div className="text-center mt-10 md:mt-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 rounded-full glass px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
      >
        View All Products
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
      </Link>
    </div>
  </div>
</section>  
{/* Statistics */}
<section className="py-2 md:py-4">
  <div className="container mx-auto px-4">

    <div className="grid grid-cols-2 lg:grid-cols-4">

      {[
        {
          icon: Layers3,
          value: "1000+",
          label: "AI Tools",
        },
        {
          icon: Users,
          value: "50K+",
          label: "Happy Users",
        },
        {
          icon: Grid2X2,
          value: "25+",
          label: "Categories",
        },
        {
          icon: Star,
          value: "99%",
          label: "Satisfaction",
        },
      ].map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={`
              flex flex-col items-center justify-center
              py-2 md:py-3
              ${
                index !== 3
                  ? "lg:border-r border-white/10"
                  : ""
              }
              ${
                index < 2
                  ? "border-b lg:border-b-0 border-white/10"
                  : ""
              }
            `}
          >
            {/* Icon */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-lime-400/20 bg-lime-400/5 flex items-center justify-center">

              <Icon className="w-4 h-4 md:w-5 md:h-5 text-lime-400" />

            </div>

            {/* Number */}
            <h3 className="mt-1 text-lg md:text-2xl font-bold text-white leading-none">
              {item.value}
            </h3>

            {/* Label */}
            <p className="mt-0.5 text-[10px] md:text-xs text-gray-400">
              {item.label}
            </p>

          </motion.div>
        );
      })}

    </div>

  </div>
</section>
      {/* Categories */}
<section className="py-16 md:py-20">
  <div className="container mx-auto px-4">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 md:mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
        Browse Categories
      </h2>

      <p className="text-sm md:text-base text-gray-400">
        Find the perfect tool for your needs
      </p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">

      {categories.map((category, index) => (

        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -6, scale: 1.03 }}
          className="group h-full"
        >
          <Link href="/categories">

            <div
              className={`glass rounded-2xl p-3 md:p-6 h-full hover:neon-glow transition-all duration-300 bg-gradient-to-br ${category.color} bg-opacity-10`}
            >

              {/* Icon */}
              <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3 md:mb-4 overflow-hidden group-hover:scale-110 transition-transform">

                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                ) : (
                  <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
                )}

              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-sm md:text-lg leading-tight line-clamp-2 mb-2 min-h-[40px] md:min-h-[56px]">
                {category.name}
              </h3>

              {/* Description */}
              <p className="hidden md:block text-gray-400 text-sm mb-3 line-clamp-2">
                {category.description}
              </p>

              {/* Product Count */}
              <span className="text-xs md:text-sm font-medium text-neon-blue">
                {category.productCount} Products
              </span>

            </div>

          </Link>
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
