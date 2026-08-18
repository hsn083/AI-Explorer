'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';

const productIcons = [
  { name: 'ChatGPT', image: '/ChatGPT.png' },
  { name: 'CapCut', image: '/capcut.png' },
  { name: 'HeyGen', image: '/heygen.png' },
  { name: 'Cursor', image: '/cursor.png' },
  { name: 'Leonardo', image: '/leonardo.jfif' },
  { name: 'OpenArt', image: '/openart.png' },
  { name: 'VocoGen', image: '/vocogen.png' },
  { name: 'n8n', image: '/n8n.png' },
  { name: 'Lovable', image: '/lovable.png' },
  { name: 'Notion', image: '/notion.png' },
  { name: 'Adobe', image: '/adobe.jpeg' },
  { name: 'Canva', image: '/Canva.jpeg' },
  { name: 'ElevenLabs', image: '/ElevenLab.png' },
  { name: 'YouTube', image: '/youtube.jpeg' },
  { name: 'Super Grok', image: '/super-grok.jpeg' },
  { name: 'Jio Gemini', image: '/jio-gemini.jpeg' },
  { name: 'Gemini', image: '/Gemini.png' },
  { name: 'Groq', image: '/Groq.png' },
  { name: 'Veo', image: '/Veo3.png' },
  { name: 'Coursera', image: '/Coursera.png' },
];

export default function CategoryStrip() {
  const duplicatedIcons = [...productIcons, ...productIcons];
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      if (window.innerWidth < 641) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      positionRef.current += speed;

      const halfWidth = track.scrollWidth / 2;

      if (positionRef.current >= halfWidth) {
        positionRef.current = 0;
      }

      track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="py-3 md:py-4 lg:py-5 px-4 overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden scrollbar-hide touch-pan-x">
          <div
            ref={trackRef}
            className="flex gap-3 sm:gap-4 md:gap-5 whitespace-nowrap pb-2 sm:pb-0 scroll-smooth animate-marquee-mobile sm:animate-none"
          >
            {duplicatedIcons.map((icon, index) => (
              <div
                key={`${icon.name}-${index}`}
                className="flex-shrink-0 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 md:p-3 w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] lg:w-[72px] lg:h-[72px] hover:shadow-lg transition-all duration-300 border border-gray-200 shadow-sm flex items-center justify-center"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 overflow-hidden">
                  <Image
                    src={icon.image}
                    alt={icon.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              </div>
            ))}
          </div>
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }

            @keyframes mobileIconLoop {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(calc(-50% - 6px));
              }
            }

            .animate-marquee-mobile {
              animation: mobileIconLoop 15s linear infinite;
            }

            .animate-marquee-mobile:hover,
            .animate-marquee-mobile:active {
              animation-play-state: paused;
            }

            @media (min-width: 640px) {
              .animate-marquee-mobile {
                animation: none;
              }
          }
          `}</style>
        </div>
      </div>
    </section>
  );
}
