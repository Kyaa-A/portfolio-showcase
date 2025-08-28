'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ClosingSection() {
  return (
    <section id="about" className="min-h-screen bg-background relative flex items-center justify-center">
      {/* Main "AS WHO?" text */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Link href="/about">
            <motion.h1
              className="text-[12vw] md:text-[9vw] font-black leading-none cursor-interactive"
              data-cursor-target="true"
              data-cursor-blur="true"
              style={{ 
                color: 'transparent', 
                WebkitTextStroke: '2px #ffffff'
              }}
              whileHover={{ 
                color: '#ffffff',
                transition: { duration: 0.25, ease: 'easeInOut' }
              }}
            >
              AS WHO?
            </motion.h1>
            {/* Underline */}
            <motion.div
              className="w-full h-0.5 bg-white mx-auto mt-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </Link>
        </motion.div>
      </div>

      {/* Copyright text bottom-left */}
      <div className="absolute bottom-8 left-8 text-white/30 text-sm">
        ©2025 Asnari Pacalna - All Rights Reserved
      </div>
    </section>
  );
}
