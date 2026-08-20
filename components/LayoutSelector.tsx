'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: true,
  loading: () => <nav className="fixed top-[32px] left-0 right-0 z-[9998] h-[64px] md:h-[70px] lg:h-[72px] glass-strong border-b border-black/[0.08]" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"));

export default function LayoutSelector({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }
  
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen pt-[138px] md:pt-[142px] lg:pt-[146px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
