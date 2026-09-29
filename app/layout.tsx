import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import LayoutSelector from "@/components/LayoutSelector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aiexplorer.website'),

  title: {
    default: 'AI Explorer | Premium AI Tools & Digital Resources',
    template: '%s | AI Explorer',
  },

  description: 'Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.',
  
  keywords: "AI Explorer, AI Tools, ChatGPT Plus, CapCut Pro, Google AI Pro, AI Software, Premium Tools, Digital Products",
  
  authors: [{ name: "AI Explorer" }],
  
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'AI Explorer | Premium AI Tools & Digital Resources',
    description: 'Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.',
    url: 'https://www.aiexplorer.website/',
    siteName: 'AI Explorer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.aiexplorer.website/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Explorer - Premium AI Tools & Digital Resources',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Explorer | Premium AI Tools & Digital Resources',
    description: 'Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.',
    images: [
      {
        url: 'https://www.aiexplorer.website/og-image.png',
        alt: 'AI Explorer - Premium AI Tools & Digital Resources',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: 'pLfIpaodUjBVFCMy8fZuUGcc0RgvjmealyrbOXxqqV0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          <LayoutSelector>{children}</LayoutSelector>
        </ClientProviders>
      </body>
    </html>
  );
}
