'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    price: '',
    originalPrice: '',
    duration: '',
    category: '',
    description: '',
    features: '',
    benefits: '',
    soldCount: '0',
    featured: false,
    popular: false,
    badge: '',
    active: true,
  });

  useEffect(() => {
    const id = params.id as string;
    Promise.all([fetchProduct(id), fetchCategories()]);
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        image: data.image || '',
        price: data.price?.toString() || '',
        originalPrice: data.originalPrice?.toString() || '',
        duration: data.duration || '',
        category: data.category || '',
        description: data.description || '',
        features: Array.isArray(data.features) ? data.features.join('\n') : '',
        benefits: Array.isArray(data.benefits) ? data.benefits.join('\n') : '',
        soldCount: data.soldCount?.toString() || '0',
        featured: data.featured || false,
        popular: data.popular || false,
        badge: data.badge || '',
        active: data.active !== undefined ? data.active : true,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?includeInactive=true');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        soldCount: parseInt(formData.soldCount),
        features: formData.features.split('\n').filter(f => f.trim()),
        benefits: formData.benefits.split('\n').filter(b => b.trim()),
      };

      const id = params.id as string;
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="ChatGPT Plus"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="chatgpt-plus"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="3400"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Original Price
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="5700"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="1 Month"
              />
            </div>

            {/* Sold Count */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Sold Count
              </label>
              <input
                type="number"
                name="soldCount"
                value={formData.soldCount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="0"
              />
            </div>

            {/* Badge */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Badge
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="Best Seller"
              />
            </div>

            {/* Image */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all"
                placeholder="/chatgpt-plus.jpg"
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all resize-none"
                placeholder="Product description..."
              />
            </div>

            {/* Features */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Features (one per line)
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all resize-none"
                placeholder="GPT-4 Access&#10;Faster Response Times&#10;Priority Access"
              />
            </div>

            {/* Benefits */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Benefits (one per line)
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-lime/20 focus:border-lime/50 transition-all resize-none"
                placeholder="Advanced AI capabilities&#10;Faster responses&#10;Priority during peak hours"
              />
            </div>

            {/* Checkboxes */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-lime focus:ring-lime focus:ring-offset-0"
                />
                <span className="text-sm font-medium text-charcoal">Featured</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-lime focus:ring-lime focus:ring-offset-0"
                />
                <span className="text-sm font-medium text-charcoal">Popular</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-lime focus:ring-lime focus:ring-offset-0"
                />
                <span className="text-sm font-medium text-charcoal">Active</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-6 border-t border-gray-200">
            <Link
              href="/admin/products"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-charcoal text-white hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
            >
              {saving ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}