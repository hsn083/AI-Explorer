'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WatchingNow() {
  const [viewers, setViewers] = useState(19);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newValue = prev + change;
        return Math.max(10, Math.min(30, newValue));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-2 md:bottom-5 md:left-3 z-40 bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
        <span className="text-xs md:text-sm font-medium text-charcoal">
          🟢 {viewers} watching
        </span>
      </div>
    </motion.div>
  );
}
