'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col">
      {/* Header with Logo */}
      <header className="absolute top-8 md:top-16 left-0 z-10">
        <div className="bg-white flex flex-col p-2 md:p-3 items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <Image
              src="/assets/logo.webp"
              alt="Logo"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </div>
          <div className="text-black font-bold text-[14px] md:text-[16px] writing-mode-vertical pt-2 md:pt-3 pb-3 md:pb-4">
            Site of the Day
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center md:items-start px-6 md:pl-10 pt-20 md:pt-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:pl-32 max-w-full md:max-w-[90%]"
        >
          <h1 className="text-4xl sm:text-5xl md:text-[130px] font-black mb-4 md:mb-6 text-white leading-[1.1] md:leading-[0.9] tracking-[-1px] md:tracking-[-3px]" style={{fontFamily: 'var(--font-inter)'}}>
            I BUILD<br className="hidden md:block" /> DIGITAL<br />
            EXPERI<span className="hidden md:inline">ENCES</span><span className="md:hidden">ENCE</span>
          </h1>
          <p className="text-base md:text-xl text-white max-w-2xl font-light tracking-wide">
            By crafting beautiful <span className="underline decoration-gray-400/40 underline-offset-4 md:underline-offset-8">web applications</span> from concept to deployment.
          </p>
        </motion.div>
      </div>

      {/* Custom Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex flex-col items-center">
          {/* Scroll Track */}
          <div className="w-1 h-24 bg-gray-700 rounded-full relative overflow-hidden">
            {/* Scroll Thumb */}
            <motion.div
              className="absolute w-3 h-8 bg-gray-400 rounded-full -left-1"
              style={{ 
                y: `${scrollProgress * (96 - 32)}px` // 96px track height - 32px thumb height
              }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Message - Hidden on Mobile */}
      <div className="hidden md:block absolute bottom-8 left-32 max-w-md pl-10">
        <p className="text-sm text-white/60 leading-relaxed">
          This flashy headline? It&apos;s just for <span className="text-white font-medium">show</span>.<br />
          The proof of my work is waiting <span className="text-white font-medium">below</span>.<br />
          So if you&apos;re the type to just stop and <span className="text-white font-medium">stare</span>,<br />
          You&apos;ll miss all the magic I&apos;ve built down <span className="text-white font-medium">there</span>.
        </p>
      </div>
    </section>
  );
}