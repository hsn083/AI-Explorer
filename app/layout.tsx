import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import LayoutSelector from "@/components/LayoutSelector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Explorer | Premium AI Tools & Digital Resources",
  description: "Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.",
  keywords: "AI Explorer, AI Tools, ChatGPT Plus, CapCut Pro, Google AI Pro, AI Software, Premium Tools, Digital Products",
  authors: [{ name: "AI Explorer" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "AI Explorer | Premium AI Tools & Digital Resources",
    description: "Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.",
    url: "https://aiexplorer.com",
    siteName: "AI Explorer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Explorer | Premium AI Tools & Digital Resources",
    description: "Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.",
  },
  robots: {
    index: true,
    follow: true,
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
