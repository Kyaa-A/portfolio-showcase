'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

export function NewSiteSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isDpr125, setIsDpr125] = useState(false);

  useEffect(() => {
    const update = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      setIsDpr125(dpr >= 1.24 && dpr < 1.35);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  
  return (
    <section className="min-h-screen bg-background relative flex items-center overflow-hidden">
      {/* Video - Hidden on small screens */}
      <motion.div
        className="absolute top-[55%] -translate-y-1/2 z-10 w-[42rem] h-[46rem] hidden md:block"
        style={{ left: isDpr125 ? '47%' : '38%' }}
        initial={{ opacity: 0, scale: 0.8, x: 50, rotate: -5 }}
        animate={{ 
          opacity: isVideoVisible ? 1 : 0,
          scale: isVideoVisible ? 1 : 0.8,
          x: isVideoVisible ? 0 : 50,
          rotate: isVideoVisible ? -5 : -5
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {isVideoVisible && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain rounded-lg"
          >
            <source src="/assets/excited.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </motion.div>

      {/* Main content */}
      <div className="px-6 md:pl-16 lg:pl-24 relative z-20 w-full md:w-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Main heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '-0.02em' }}
          >
            <span className="block text-white text-center md:text-left md:ml-12 lg:ml-16">HEY!</span>
            <span className="block text-white text-center md:text-left mt-2 md:mt-0 md:ml-12 lg:ml-16">
              I GOT A{' '}
              <motion.span
                style={{ 
                  color: isVideoVisible ? 'transparent' : '#ffffff', 
                  WebkitTextStroke: '2px #ffffff',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  fontFeatureSettings: '"liga" 1, "kern" 1'
                }}
                animate={{
                  scale: isVideoVisible ? 1.05 : 1,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                NEW SITE
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-xl text-white/80 max-w-2xl leading-relaxed text-center md:text-left md:ml-12 lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            And just like every sequel, it&apos;s not as good as the first one.{' '}
            <span 
              className="underline decoration-white/60 underline-offset-4 hover:decoration-white transition-colors cursor-interactive"
              data-cursor-target="true"
              data-cursor-blur="true"
              onMouseEnter={() => setIsVideoVisible(true)}
              onMouseLeave={() => setIsVideoVisible(false)}
              onClick={() => setIsVideoVisible(!isVideoVisible)} // Toggle on tap for mobile
            >
              Check it out!
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}