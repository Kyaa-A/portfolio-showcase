'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function NewSiteSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  return (
    <section className="min-h-screen bg-background relative flex items-center overflow-hidden">
              {/* Video on the right side */}
                  <motion.div
            className="absolute right-60 top-3/5 -translate-y-1/2 z-10 w-[36rem] h-[40rem]"
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
      <div className="pl-10 md:pl-16 lg:pl-24 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Main heading */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '-0.02em' }}
          >
            <span className="ml-8 md:ml-12 lg:ml-16 text-white">HEY!</span>
            <br />
            <span className="ml-8 md:ml-12 lg:ml-16 text-white">
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
                NEW SIT
              </motion.span>
              <span className="text-white">E</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed ml-8 md:ml-12 lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            And just like every sequel, it's not as good as the first one.{' '}
            <span 
              className="underline decoration-white/60 underline-offset-4 hover:decoration-white transition-colors cursor-interactive"
              data-cursor-target="true"
              data-cursor-blur="true"
              onMouseEnter={() => setIsVideoVisible(true)}
              onMouseLeave={() => setIsVideoVisible(false)}
            >
              Check it out!
            </span>
          </motion.p>
                  </motion.div>
        </div>
      </section>
    );
  }
