'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Layers, CheckCircle, AlertCircle } from 'lucide-react';

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  activeCategories: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts || 0,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Total Categories',
      value: stats?.totalCategories || 0,
      icon: Layers,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Active Categories',
      value: stats?.activeCategories || 0,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">Overview of your AI Explorer store</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
                    <p className="text-3xl font-bold text-charcoal">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {!loading && stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-charcoal mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/admin/products/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-lime hover:bg-lime/5 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-lime/20 transition-colors">
                <Package className="w-5 h-5 text-charcoal" />
              </div>
              <span className="font-medium text-charcoal">Add New Product</span>
            </a>
            <a
              href="/admin/categories/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-lime hover:bg-lime/5 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-lime/20 transition-colors">
                <Layers className="w-5 h-5 text-charcoal" />
              </div>
              <span className="font-medium text-charcoal">Add New Category</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}