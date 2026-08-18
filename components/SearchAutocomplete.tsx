'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts, Product } from '@/utils/search';

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  isMobile?: boolean;
}

export default function SearchAutocomplete({ 
  placeholder = 'Search AI tools, subscriptions...', 
  className = '',
  isMobile = false
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search products with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 1) {
        const searchResults = searchProducts(query.trim(), 8);
        setResults(searchResults);
        setIsOpen(true);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleProductClick(results[selectedIndex]);
        } else if (query.trim()) {
          handleViewAllResults();
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, results, selectedIndex, query]);

  // Handle product click
  const handleProductClick = (product: Product) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    router.push(`/products/${product.slug}`);
  };

  // Handle view all results
  const handleViewAllResults = () => {
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleViewAllResults();
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center ${
          isMobile 
            ? 'w-full h-[40px] px-4 rounded-full bg-white border border-gray-200 shadow-sm' 
            : 'w-full h-[46px] lg:h-[48px] px-5 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm'
        }`}>
          <Search className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 flex-shrink-0`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim().length >= 1) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder}
            className={`flex-1 ml-3 bg-transparent text-charcoal ${
              isMobile ? 'text-sm' : 'text-base'
            } placeholder-gray-400 outline-none`}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          {!isMobile && (
            <button 
              type="submit" 
              className="ml-2 px-4 py-1.5 rounded-full bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90 transition-all duration-300"
            >
              Search
            </button>
          )}
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 ${
          isMobile ? 'max-h-[60vh]' : 'max-h-[500px]'
        }`}>
          {results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 font-medium">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="overflow-y-auto max-h-[400px]">
                {results.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                      index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Product Image */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          sizes="56px"
                        />
                      ) : (
                        <span className="text-2xl">🚀</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-charcoal font-semibold text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {product.duration && (
                          <span className="text-xs text-gray-500">
                            {product.duration}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs font-semibold text-charcoal">
                          Rs. {product.price}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* View All Results */}
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={handleViewAllResults}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-charcoal"
                >
                  View all results
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : query.trim().length >= 1 ? (
            <div className="p-6 text-center">
              <p className="text-charcoal font-medium mb-1">No products found</p>
              <p className="text-sm text-gray-500">
                Try searching for another AI tool or subscription.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
