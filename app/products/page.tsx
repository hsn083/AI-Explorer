import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Premium AI Tools & Digital Products | AI Explorer',
  description: 'Browse premium AI tools, software subscriptions, productivity resources, and digital products at AI Explorer.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/products',
  },
  openGraph: {
    title: 'Premium AI Tools & Digital Products | AI Explorer',
    description: 'Browse premium AI tools, software subscriptions, productivity resources, and digital products at AI Explorer.',
    url: 'https://www.aiexplorer.website/products',
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-20"><div className="container mx-auto px-4"><div className="text-center"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neon-blue border-r-transparent" /></div></div></div>}>
      <ProductsClient />
    </Suspense>
  );
}
