import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HomeClient from './HomeClient';
import StructuredData from '@/components/StructuredData';

const ClientHome = dynamic(() => import('./HomeClient'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'AI Explorer | Premium AI Tools & Digital Resources',
  description: 'Explore premium AI tools, productivity software, digital subscriptions, and powerful resources designed to help you work smarter.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/',
  },
  openGraph: {
    title: 'AI Explorer | Premium AI Tools & Digital Resources',
    description: 'Explore premium AI tools, productivity software, digital subscriptions, and powerful resources designed to help you work smarter.',
    url: 'https://www.aiexplorer.website/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Explorer',
  url: 'https://www.aiexplorer.website/',
  description: 'Premium AI tools, productivity software, digital subscriptions, and powerful resources designed to help you work smarter.',
  logo: 'https://www.aiexplorer.website/og-image.png',
  sameAs: [],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Explorer',
  url: 'https://www.aiexplorer.website/',
  description: 'Premium AI tools, productivity software, digital subscriptions, and powerful resources designed to help you work smarter.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.aiexplorer.website/search?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  console.log('Home page rendered');
  return (
    <>
      <StructuredData data={jsonLd} />
      <StructuredData data={websiteJsonLd} />
      <ClientHome />
    </>
  );
}
