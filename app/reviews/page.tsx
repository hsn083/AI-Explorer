import { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Customer Reviews | AI Explorer',
  description: 'Read genuine customer reviews and testimonials for AI Explorer\'s premium AI tools and digital products.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/reviews',
  },
  openGraph: {
    title: 'Customer Reviews | AI Explorer',
    description: 'Read genuine customer reviews and testimonials for AI Explorer\'s premium AI tools and digital products.',
    url: 'https://www.aiexplorer.website/reviews',
  },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
