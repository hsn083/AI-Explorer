import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | AI Explorer',
  description: 'Find answers to frequently asked questions about AI Explorer, digital products, subscriptions, orders, and support.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | AI Explorer',
    description: 'Find answers to frequently asked questions about AI Explorer, digital products, subscriptions, orders, and support.',
    url: 'https://www.aiexplorer.website/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
