import { Metadata } from 'next';
import CategoriesClient from './CategoriesClient';

export const metadata: Metadata = {
  title: 'Explore AI Tool Categories | AI Explorer',
  description: 'Discover AI tools and digital resources organized by category to help you find the right tools for productivity, creativity, development, and more.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/categories',
  },
  openGraph: {
    title: 'Explore AI Tool Categories | AI Explorer',
    description: 'Discover AI tools and digital resources organized by category to help you find the right tools for productivity, creativity, development, and more.',
    url: 'https://www.aiexplorer.website/categories',
  },
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
