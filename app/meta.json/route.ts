import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const metadata = {
    title: "Z.N.K Tools & Services - Premium Digital Subscriptions",
    description: "Get genuine AI tools, streaming subscriptions and learning platforms at affordable prices. Instant delivery via WhatsApp.",
    keywords: "AI tools, ChatGPT Plus, CapCut Pro, Google AI, digital subscriptions, streaming, learning platforms",
    authors: [{ name: "Z.N.K Tools & Services" }],
    openGraph: {
      title: "Z.N.K Tools & Services - Premium Digital Subscriptions",
      description: "Get genuine AI tools, streaming subscriptions and learning platforms at affordable prices.",
      url: "https://znktools.com",
      siteName: "Z.N.K Tools & Services",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Z.N.K Tools & Services - Premium Digital Subscriptions",
      description: "Get genuine AI tools, streaming subscriptions and learning platforms at affordable prices.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  return NextResponse.json(metadata);
}
