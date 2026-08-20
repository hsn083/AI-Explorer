import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions | AI Explorer',
  description: 'Read AI Explorer\'s terms and conditions to understand your rights and responsibilities when using our services.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | AI Explorer',
    description: 'Read AI Explorer\'s terms and conditions to understand your rights and responsibilities when using our services.',
    url: 'https://www.aiexplorer.website/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
