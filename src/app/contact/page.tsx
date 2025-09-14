'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { x: mouseX, y: mouseY } = useMousePosition();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(mvY, { stiffness: 260, damping: 18, mass: 0.5 });
  const [isInside, setIsInside] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scroll progress for custom scrollbar
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

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Cursor attraction effect
  useEffect(() => {
    if (isMobile) return;

    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const vw = window.innerWidth || 1;
    const vh = window.innerHeight || 1;
    const normX = (mouseX - cx) / vw;
    const normY = (mouseY - cy) / vh;
    const maxOffsetX = 80;
    const maxOffsetY = 40;
    const targetX = Math.max(Math.min(-normX * maxOffsetX * 2, maxOffsetX), -maxOffsetX);
    const targetY = Math.max(Math.min(-normY * maxOffsetY * 2, maxOffsetY), -maxOffsetY);
    
    
    mvX.set(targetX);
    mvY.set(targetY);

    const radius = rect.width / 2;
    const distToCenter = Math.hypot(mouseX - cx, mouseY - cy);
    setIsInside(distToCenter <= radius);
  }, [mouseX, mouseY, mvX, mvY, isMobile]);

  return (
    <div className="min-h-screen bg-background">
      {/* Return Button */}
      <motion.div
        className="fixed top-8 left-8 z-[9999]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => window.history.back()}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
              isButtonPressed 
                ? 'bg-black text-white scale-90' 
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            onMouseDown={() => setIsButtonPressed(true)}
            onMouseUp={() => setIsButtonPressed(false)}
            onMouseLeave={() => setIsButtonPressed(false)}
            data-cursor-target="true"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </motion.button>
      </motion.div>

      {/* Header */}
      <motion.div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-start z-10 pl-8 sm:pl-12 md:pl-16 lg:pl-20">
          <motion.div
            className="space-y-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Row 1 - solid white */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-[0.8] tracking-tight mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              TELL ME WHAT
            </motion.h1>
            {/* Row 2 - mixed: solid and outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className="text-white">YOU WANT </span>
              <span 
                style={{
                  WebkitTextStroke: '3px white',
                  color: 'transparent'
                }}
              >
                WHAT
              </span>
            </motion.h1>
            
            {/* Row 3 - white outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight mb-12"
              style={{
                WebkitTextStroke: '3px white',
                color: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              YOU REALLY
            </motion.h1>
            {/* Row 4 - white outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight"
              style={{
                WebkitTextStroke: '3px white',
                color: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              REALLY WANT
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>

          {/* Contact Form Section */}
          <motion.div
            className="min-h-screen bg-background flex items-center justify-start pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 pb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
        <div className="w-full max-w-4xl">
          <form className="space-y-4">
            {/* Greeting */}
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hey there,
            </motion.h2>

            {/* Name Field */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-white text-xl sm:text-2xl">My name is</span>
              <input
                type="text"
                placeholder="First & Last Name"
                className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
            </motion.div>

            {/* Company Field */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-white text-xl sm:text-2xl">I work for</span>
              <input
                type="text"
                placeholder="Company Name"
                className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
              <span className="text-white text-xl sm:text-2xl">and</span>
            </motion.div>

            {/* Project Type */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-white text-xl sm:text-2xl">we could use your services for</span>
              <select className="bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl focus:border-white focus:outline-none py-2">
                <option value="" className="bg-background">Type of Project</option>
                <option value="web-design" className="bg-background">Web Design</option>
                <option value="development" className="bg-background">Development</option>
                <option value="branding" className="bg-background">Branding</option>
                <option value="consulting" className="bg-background">Consulting</option>
              </select>
            </motion.div>

            {/* Other Companies */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-white text-xl sm:text-2xl">We already contacted</span>
              <input
                type="number"
                defaultValue="0"
                className="w-20 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl text-center focus:border-white focus:outline-none py-2"
              />
              <span className="text-white text-xl sm:text-2xl">other companies,</span>
            </motion.div>

            {/* Reason */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="text-white text-xl sm:text-2xl block">but I&apos;d like to work with Asnari because</span>
              <input
                type="text"
                placeholder="Reason"
                className="w-full bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
            </motion.div>

            {/* Budget */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="text-white text-xl sm:text-2xl">We&apos;ll invest between</span>
              <select className="bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl focus:border-white focus:outline-none py-2">
                <option value="₱5,000 - ₱10,000" className="bg-background">₱5,000 - ₱10,000</option>
                <option value="₱10,000 - ₱20,000" className="bg-background">₱10,000 - ₱20,000</option>
                <option value="₱20,000 - ₱50,000" className="bg-background" selected>₱20,000 - ₱50,000</option>
                <option value="₱50,000 - ₱100,000" className="bg-background">₱50,000 - ₱100,000</option>
              </select>
              <span className="text-white text-xl sm:text-2xl">in this project.</span>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-white text-xl sm:text-2xl">You can reach me at</span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-xl sm:text-2xl">or get in touch by email at</span>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
                />
              </div>
            </motion.div>

            {/* Additional Details */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <span className="text-white text-xl sm:text-2xl block">Details and/or clarifications</span>
              <textarea
                placeholder="Additional information..."
                rows={4}
                className="w-full bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2 resize-none"
              />
            </motion.div>

            {/* Closing */}
            <motion.div
              className="flex items-center justify-between pt-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Thanks
              </h2>
              
              {/* Send Button Container */}
              <div className="relative w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40">
                <motion.button
                  ref={buttonRef}
                  type="submit"
                  className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center select-none z-40 cursor-pointer"
                  style={isMobile ? {} : { x, y }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  data-cursor-target="true"
                >
                  <motion.div 
                    className="relative w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Circle background */}
                    {isMobile ? (
                      // Mobile: Orange background with continuous rotation
                      <motion.div
                        className="absolute inset-0 rounded-full bg-orange-400"
                        animate={{ 
                          rotate: 360
                        }}
                        transition={{ 
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ transformOrigin: 'center center' }}
                      />
                    ) : (
                      // Desktop: Orange color scheme with hover effect
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          animate={{ 
                            opacity: isInside ? 0 : 1,
                            borderColor: 'rgba(251, 146, 60, 0.8)'
                          }}
                          transition={{ duration: 0.12 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-orange-400"
                          initial={false}
                          animate={{ scale: isInside ? 1 : 0 }}
                          transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                          style={{ transformOrigin: 'center center' }}
                        />
                      </>
                    )}

                    {/* Text */}
                    {isMobile ? (
                      // Mobile: Simple centered rotating text
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: 'center center' }}
                      >
                        <span className="text-white text-[9px] sm:text-[11px] md:text-[13px] font-bold tracking-[0.15em] whitespace-nowrap">
                          SEND MESSAGE
                        </span>
                      </motion.div>
                    ) : (
                      // Desktop: Complex text animation matching navigation
                      <>
                        {/* Rotating vertical text (outside state) */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{ rotate: 360, opacity: isInside ? 0 : 1 }}
                          transition={{ 
                            duration: 18, 
                            repeat: Infinity, 
                            ease: 'linear', 
                            opacity: { duration: 0.05 } 
                          }}
                          style={{ transformOrigin: 'center center' }}
                        >
                          <span className="writing-mode-vertical whitespace-nowrap tracking-[0.6em] text-white/90 text-[11px] sm:text-[13px] md:text-[15px] translate-x-[4px]">
                            SEND MESSAGE
                          </span>
                        </motion.div>

                        {/* Inside text when overlapped */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{
                            rotate: 360,
                            opacity: isInside ? 1 : 0,
                            scale: isInside ? 1 : 0.84,
                            y: isInside ? 0 : 14,
                          }}
                          transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: 'linear',
                            opacity: { duration: 0.06 },
                            y: { type: 'spring', stiffness: 160, damping: 24 },
                            scale: { type: 'spring', stiffness: 160, damping: 24 },
                          }}
                          style={{ transformOrigin: 'center center' }}
                        >
                          <motion.span
                            className="text-white writing-mode-vertical whitespace-nowrap"
                            initial={false}
                            animate={{
                              letterSpacing: isInside ? '0.08em' : '0.36em',
                              fontSize: isInside ? '10px' : '12px',
                            }}
                            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                            style={{ fontWeight: 600 }}
                          >
                            SEND MESSAGE
                          </motion.span>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </form>
      </div>
      </motion.div>

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
    </div>
  );
}




