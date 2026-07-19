'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="glass rounded-3xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400">
                AI Explorer is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="text-gray-400 mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Contact information (name, email, phone number) provided voluntarily</li>
                <li>WhatsApp communication history</li>
                <li>Payment information (processed securely through third-party services)</li>
                <li>Usage data and website analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-400 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-400">
                We use third-party services for payment processing and communication. 
                These services have their own privacy policies which we encourage you to review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-400 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of your information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-400 mt-2">
                WhatsApp: +92 314 3111118<br />
                Email: work31323@gmail.com
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
