'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 flex items-center justify-center">
          <span className="text-black font-bold text-3xl">AI</span>
        </div>
      </motion.div>
    </div>
  );
}
