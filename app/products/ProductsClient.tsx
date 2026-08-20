'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProductCard = dynamic(() => import('@/components/ProductCard'), {
  loading: () => <div className="bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row border border-gray-200 shadow-sm min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"><div className="relative w-full sm:w-[150px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] bg-white flex items-center justify-center p-3 flex-shrink-0 border-r border-gray-200"><div className="w-full h-full bg-gray-100 rounded animate-pulse" /></div><div className="flex-1 p-3 sm:p-4 flex flex-col justify-between"><div><div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" /><div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3" /><div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" /></div><div className="flex items-end justify-between gap-2"><div><div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-1" /><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></div><div className="flex gap-2"><div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" /><div className="h-9 sm:h-10 w-16 bg-gray-200 rounded-lg animate-pulse" /></div></div></div></div>
});

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Set search query from URL parameter on mount
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);
      
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      
      // Handle error responses
      if (productsData.error) {
        console.error('Products API Error:', productsData.error);
        setProducts([]);
      } else if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else {
        console.error('Unexpected products data format:', productsData);
        setProducts([]);
      }
      
      if (categoriesData.error) {
        console.error('Categories API Error:', categoriesData.error);
        setCategories([]);
      } else if (Array.isArray(categoriesData)) {
        setCategories(categoriesData);
      } else {
        console.error('Unexpected categories data format:', categoriesData);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const allCategories = ['All', ...categories.map(c => c.name)];

  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const oldPrice = product.originalPrice || product.oldPrice;
    const soldCount = product.soldCount || product.sold;
    
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      (product.features && product.features.some((f: string) => f.toLowerCase().includes(searchLower))) ||
      (product.benefits && product.benefits.some((b: string) => b.toLowerCase().includes(searchLower))) ||
      (product.duration && product.duration.toLowerCase().includes(searchLower));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const oldPriceA = a.originalPrice || a.oldPrice;
    const oldPriceB = b.originalPrice || b.oldPrice;
    const soldCountA = a.soldCount || a.sold || 0;
    const soldCountB = b.soldCount || b.sold || 0;
    
    switch (sortBy) {
      case 'popular':
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      case 'best-selling':
        return soldCountB - soldCountA;
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        const discountA = oldPriceA ? ((oldPriceA - a.price) / oldPriceA) * 100 : 0;
        const discountB = oldPriceB ? ((oldPriceB - b.price) / oldPriceB) * 100 : 0;
        return discountB - discountA;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) {
    return (
      <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-2 md:mb-4">All Products</h1>
          <p className="text-gray-600 text-sm md:text-base">Browse our complete collection of premium digital tools</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-gray-200 text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white border border-gray-200 text-charcoal hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filters</span>
              <span className="sm:hidden">Filter</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-gray-200 premium-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="text-charcoal font-medium mb-2 block text-sm md:text-base">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 text-charcoal focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-transparent text-sm md:text-base"
                  >
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-charcoal font-medium mb-2 block text-sm md:text-base">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 text-charcoal focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="popular">Popular</option>
                    <option value="best-selling">Best Selling</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Discount</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 md:mb-6">
          <p className="text-gray-600 text-sm md:text-base">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid - 1 Column Mobile, 2 Column Desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-500 text-base md:text-xl">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
