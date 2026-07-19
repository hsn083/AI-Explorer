import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const metadata = {
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

  return NextResponse.json(metadata);
}
