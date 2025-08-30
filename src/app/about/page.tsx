'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AboutPage() {
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
    <main className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="fixed top-8 left-8 z-50 hidden">
        <Link href="/" className="text-white/60 hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <div className="pt-16 md:pt-16 pb-24 md:pb-32">
        {/* First Two Sections Container */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
          {/* Hero Section - Two Column Layout */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-12 mb-32">
            {/* Left Column - Text Content */}
            <div className="flex-1 max-w-2xl md:self-center">
              <motion.h1 
                className="text-[40px] sm:text-[50px] md:text-[120px] font-black leading-none mb-6 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                NICE TO<br />MEET&nbsp;YOU
              </motion.h1>
              
              <motion.p
                className="text-base sm:text-lg md:text-2xl text-white/80 max-w-4xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I&apos;m Asnari, and I believe your brand and website should be your biggest asset. That&apos;s why I&apos;m here.
                <br /><br />
                I help ambitious businesses and startups achieve their digital goals by creating modern, performant websites that convert visitors into customers.
                <br /><br />
                Let&apos;s chat about how I can help you.
              </motion.p>
            </div>

            {/* Right Column - Profile Image */}
            <motion.div 
              className="w-80 h-80 md:w-[700px] md:h-[800px] flex-shrink-0 md:self-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/assets/inverted_face.webp"
                alt="Asnari Pacalna"
                width={700}
                height={800}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Words Section */}
          <section className="min-h-screen bg-background pt-32 md:pt-48">
            <div className="max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.33, 1, 0.68, 1]
                }}
                className="mb-48 md:mb-64"
              >
                <motion.h2 
                  className="text-[32px] sm:text-[40px] md:text-[90px] font-black leading-none tracking-tight mb-16 md:mb-32 pl-0"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1,
                    delay: 0.1,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                >
                                     {/* Mobile Layout */}
                   <div className="block md:hidden">
                     <span className="text-white block">I KNOW WORDS</span>
                     <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }} className="block">I HAVE THE</span>
                     <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }} className="block">BEST WORDS</span>
                   </div>

                   {/* Desktop Layout */}
                   <div className="hidden md:block">
                     <span className="text-white">I KNOW WORDS</span><span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>&nbsp;I HAVE</span>
                     <br />
                     <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>THE&nbsp;BEST&nbsp;WORDS</span>
                   </div>
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
                >
                  {/* HARD WORK */}
                  <div className="space-y-4">
                                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Hard Work</h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      No shortcuts. Gotta put in the time, even when it sucks. That&apos;s why I&apos;m all-in, all the time. Unless I&apos;m burnt out. Then I take a break. Gotta be real, right?
                    </p>
                  </div>

                  {/* HEALTHY RELATIONSHIPS */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Healthy Relationships</h3>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      Clients aren&apos;t just paychecks. They&apos;re people. Gotta treat them with respect and be honest, even when it&apos;s tough. Unless they&apos;re being a jerk. Then... well, you know.
                    </p>
                  </div>

                  {/* ORIGINALITY */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Originality</h3>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      Don&apos;t be a copycat. Be you. Do your own thing. Unless someone else&apos;s thing is really good. Then... maybe take some inspiration. Just kidding (mostly).
                    </p>
                  </div>

                  {/* GOOD TIMES */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Good Times</h3>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      Work hard, play hard. Gotta have some fun, or what&apos;s the point? I try to keep things light and enjoyable. It&apos;s like I&apos;m trying to get a good recommendation in the end.
                    </p>
                  </div>

                  {/* AUTHENTICITY */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Authenticity</h3>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      Keep it real. Be yourself. Don&apos;t try to be someone you&apos;re not. Unless you&apos;re a jerk. Then... maybe try to be a little nicer.
                    </p>
                  </div>

                  {/* QUINTESSENTIAL"ISM" */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide mb-4">Quintessential&quot;ism&quot;</h3>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#999999] leading-relaxed">
                      Is this word overused? Maybe. But I&apos;m gonna use it anyway because I deliver quality and I&apos;m pretty good at what I do.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          </div>
        </div>

        {/* Stats Section */}
        <section className="h-screen bg-background flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.33, 1, 0.68, 1]
                }}
              >
                <motion.h2 
                  className="text-[32px] sm:text-[40px] md:text-[100px] font-black leading-none mb-3 md:mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1,
                    delay: 0.1,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                >
                  78% OF MY CLIENTS<br />
                  SAY I&apos;M A GENIUS
                </motion.h2>
                <motion.p 
                  className="text-base sm:text-lg md:text-2xl text-white/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                >
                  The other 22% say I&apos;m a sexy genius.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
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
    </main>
  );
}