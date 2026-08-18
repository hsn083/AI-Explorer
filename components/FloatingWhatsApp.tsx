'use client';

import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/923143111118"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[14px] right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg transition-colors text-white"
      style={{
        backgroundColor: '#25D366',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
      }}
    >
      <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
    </motion.a>
  );
}
