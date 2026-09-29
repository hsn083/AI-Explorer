import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Explorer',
  description: 'Read AI Explorer\'s privacy policy to understand how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.aiexplorer.website/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | AI Explorer',
    description: 'Read AI Explorer\'s privacy policy to understand how we collect, use, and protect your personal information.',
    url: 'https://www.aiexplorer.website/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
