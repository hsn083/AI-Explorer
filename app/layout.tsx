import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Explorer | Premium AI Tools & Digital Resources",
  description: "Discover the best AI tools, premium subscriptions, productivity software, and digital resources all in one place.",
  keywords: "AI Explorer, AI Tools, ChatGPT Plus, CapCut Pro, Google AI Pro, AI Software, Premium Tools, Digital Products",
  authors: [{ name: "AI Explorer" }],
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
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
