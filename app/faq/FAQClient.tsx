'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import faq from '@/data/faq.json';

export default function FAQClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400">Find answers to common questions about our services</p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-grey font-semibold text-lg">{item.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === item.id ? 180 : 0 }}
                    className="text-neon-blue text-2xl"
                  >
                    +
                  </motion.span>
                </button>
                {openFaq === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-400">{item.answer}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-grey font-bold text-2xl mb-4">Still have questions?</h3>
            <p className="text-gray-400 mb-6">
              Our support team is available 24/7 to help you with any questions.
            </p>
            <a
              href="https://wa.me/923143111118"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Contact on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}