import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact AI Explorer | Customer Support',
  description: 'Contact AI Explorer for questions, support, product information, and assistance with premium AI tools and digital resources.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/contact',
  },
  openGraph: {
    title: 'Contact AI Explorer | Customer Support',
    description: 'Contact AI Explorer for questions, support, product information, and assistance with premium AI tools and digital resources.',
    url: 'https://www.aiexplorer.website/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}