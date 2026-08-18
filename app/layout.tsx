import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import ClientProviders from "@/components/ClientProviders";
import AnnouncementBar from "@/components/AnnouncementBar";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
  loading: () => <nav className="fixed top-[32px] left-0 right-0 z-[9998] h-[64px] md:h-[70px] lg:h-[72px] glass-strong border-b border-black/[0.08]" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"));

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
    <html lang="en">
      <body className={inter.className}>
        <AnnouncementBar />
        <Navbar />
        <ClientProviders>
          <main className="min-h-screen pt-[138px] md:pt-[142px] lg:pt-[146px]">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ClientProviders>
      </body>
    </html>
  );
}
