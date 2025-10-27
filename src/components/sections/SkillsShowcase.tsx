'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function SkillsShowcase() {
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Two-column layout */}
      <div className="flex h-full">
        {/* Left Column - Image (partial height) */}
        <div className="w-[60%] relative">
          {/* Top part of left column - dark background */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-background"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 mb-8">
            <Image
              src="/assets/Skills.png"
              alt="Skills Background"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>
        </div>

        {/* Right Column - Dark Background */}
        <div className="w-[40%] bg-background relative">
          {/* Subtle background details - Developer symbols */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-16 text-8xl text-white font-mono">
              &lt;/&gt;
            </div>
            <div className="absolute bottom-32 right-20 text-6xl text-white font-mono">
              { }
            </div>
            <div className="absolute top-1/2 right-8 text-4xl text-white font-mono">
              &lt;div&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Main Title - SKILLS (split effect) */}
      <div className="absolute top-8 left-8 z-20">
        <motion.h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-black text-white leading-none"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="relative">
            {/* Split effect - top half white, bottom half teal/blue */}
            <span 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, white 50%, #0ea5e9 50%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              SKILLS
            </span>
          </span>
        </motion.h1>
      </div>

      {/* Vertical Text - FRONTEND + BACKEND */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="text-white text-2xl font-bold writing-mode-vertical"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          FRONTEND + BACKEND
        </motion.div>
      </div>

      {/* Bottom-Left Box - TECHNICAL EXPERTISE */}
      <div className="absolute bottom-8 left-8 z-20">
        <motion.div
          className="bg-white px-6 py-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-black font-bold text-sm uppercase tracking-wider">
            TECHNICAL EXPERTISE
          </p>
        </motion.div>
      </div>

      {/* Call-to-Action - VIEW ALL SKILLS */}
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 z-20">
        <Link href="/skills">
          <motion.div
            className="w-48 h-48 rounded-full border-2 border-white flex items-center justify-center cursor-interactive"
            data-cursor-target="true"
            data-cursor-blur="true"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-white text-center">
              <p className="text-sm font-semibold uppercase tracking-wider leading-tight">
                VIEW ALL<br />SKILLS
              </p>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
