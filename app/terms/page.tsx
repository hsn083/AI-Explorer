'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TermsPage() {
  const [lastUpdated, setLastUpdated] = useState('January 2026');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
          
          <div className="glass rounded-3xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400">
                Welcome to Z.N.K Tools & Services. By using our website and services, you agree to these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              <p className="text-gray-400 mb-4">We provide:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Digital subscription accounts and tools</li>
                <li>Instant delivery via WhatsApp</li>
                <li>Customer support services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Orders and Payment</h2>
              <p className="text-gray-400 mb-4">
                All orders are placed through WhatsApp. Payment is required before delivery. 
                We accept various payment methods including JazzCash, EasyPaisa, Bank Transfer, and USDT.
              </p>
              <p className="text-gray-400">
                Once payment is confirmed, account credentials are delivered instantly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Account Usage</h2>
              <p className="text-gray-400 mb-4">
                Customers are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Maintaining the confidentiality of account credentials</li>
                <li>Using accounts in accordance with the service provider&apos;s terms</li>
                <li>Not sharing accounts with unauthorized users</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Refund Policy</h2>
              <p className="text-gray-400 mb-4">
                Refunds are handled on a case-by-case basis. We may issue refunds if:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>The product is not as described</li>
                <li>The account does not work as intended</li>
                <li>There are technical issues that cannot be resolved</li>
              </ul>
              <p className="text-gray-400 mt-4">
                Please contact our support team for refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Warranty</h2>
              <p className="text-gray-400">
                We provide warranty on all products. The warranty period varies by product. 
                If issues arise during the warranty period, we will resolve them free of charge.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-400">
                We are not liable for any damages arising from the use of our services, 
                including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-400">
                We reserve the right to modify these terms at any time. 
                Continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                For questions about these terms, please contact us:
              </p>
              <p className="text-gray-400 mt-2">
                WhatsApp: +92 314 3111118<br />
                Email: support@znktools.com
              </p>
            </section>

            <section>
              <p className="text-gray-500 text-sm">
                Last updated: {lastUpdated}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
