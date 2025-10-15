'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import Link from 'next/link';

export function SkillsSubsection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDpr125, setIsDpr125] = useState(false);
  const [titleOffset, setTitleOffset] = useState(25);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect 125% scaling and nudge titles upward to match 100% layout
  useEffect(() => {
    const update = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      setIsDpr125(dpr >= 1.24 && dpr < 1.35);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Responsive offset per screen size so it also looks right at different widths
  useEffect(() => {
    const compute = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth || 0 : 0;
      if (width < 640) setTitleOffset(10); // mobile
      else if (width < 1024) setTitleOffset(18); // tablet
      else if (width < 1440) setTitleOffset(25); // laptop
      else setTitleOffset(30); // large desktop
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const FloatingCircle = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { x: mouseX, y: mouseY } = useMousePosition();
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const x = useSpring(mvX, { stiffness: 260, damping: 18, mass: 0.5 });
    const y = useSpring(mvY, { stiffness: 260, damping: 18, mass: 0.5 });
    const [isInside, setIsInside] = useState(false);

    useEffect(() => {
      if (isMobile) return; // Skip effect on mobile

      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const normX = (mouseX - cx) / vw;
      const normY = (mouseY - cy) / vh;
      const maxOffsetX = 120;
      const maxOffsetY = 60;
      const targetX = Math.max(Math.min(-normX * maxOffsetX * 2, maxOffsetX), -maxOffsetX);
      const targetY = Math.max(Math.min(-normY * maxOffsetY * 2, maxOffsetY), -maxOffsetY);
      mvX.set(targetX);
      mvY.set(targetY);

      const radius = rect.width / 2;
      const distToCenter = Math.hypot(mouseX - cx, mouseY - cy);
      setIsInside(distToCenter <= radius);
    }, [mouseX, mouseY, mvX, mvY]);

    return (
      <Link href="/skills">
        <motion.div
          ref={ref}
          className="absolute right-[3%] sm:right-[4%] md:right-[10%] top-[75%] sm:top-[80%] md:top-[70%] select-none z-40 cursor-pointer"
          style={isMobile ? {} : { x, y }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          data-cursor-target="true"
        >
          <motion.div 
            className="relative w-[100px] sm:w-[130px] md:w-[160px] h-[100px] sm:h-[130px] md:h-[160px] flex items-center justify-center overflow-hidden rounded-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          {/* Circle background */}
          {isMobile ? (
            // Mobile: White background with continuous rotation
            <motion.div
              className="absolute inset-0 rounded-full bg-white"
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
            // Desktop: Original blue color scheme with hover effect
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                animate={{ 
                  opacity: isInside ? 0 : 1,
                  borderColor: 'rgba(168, 85, 247, 0.8)'
                }}
                transition={{ duration: 0.12 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500"
                initial={false}
                animate={{ scale: isInside ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                style={{ transformOrigin: 'center center' }}
              />
            </>
          )}

          {/* Text */}
           {isMobile ? (
             // Mobile: Centered text
             <motion.div
               className="absolute inset-0 flex items-center justify-center"
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             >
               <span className="text-black text-[9px] sm:text-[11px] font-bold tracking-[0.15em] whitespace-nowrap">
                 VIEW SKILLS
               </span>
             </motion.div>
           ) : (
             // Desktop: Original vertical text with hover state
             <>
               <motion.div
                 className="absolute inset-0 flex items-center justify-center"
                 animate={{ rotate: 360, opacity: isInside ? 0 : 1 }}
                 transition={{ duration: 12, repeat: Infinity, ease: 'linear', opacity: { duration: 0.05 } }}
               >
               <span className="writing-mode-vertical whitespace-nowrap tracking-[0.4em] text-white/90 text-[10px] sm:text-[12px] translate-x-[2px] font-bold">
                   VIEW SKILLS
                 </span>
               </motion.div>

               <motion.div
                 className="absolute inset-0 flex items-center justify-center"
                 animate={{
                   rotate: 360,
                   opacity: isInside ? 1 : 0,
                   scale: isInside ? 1 : 0.84,
                   y: isInside ? 0 : 10,
                 }}
                 transition={{
                   duration: 12,
                   repeat: Infinity,
                   ease: 'linear',
                   opacity: { duration: 0.06 },
                   y: { type: 'spring', stiffness: 160, damping: 24 },
                   scale: { type: 'spring', stiffness: 160, damping: 24 },
                 }}
               >
                 <motion.span
                   className="text-white writing-mode-vertical whitespace-nowrap"
                   initial={false}
                   animate={{
                     letterSpacing: isInside ? '0.06em' : '0.28em',
                     fontSize: isInside ? '11px' : '12px',
                   }}
                   transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                   style={{ fontWeight: 600 }}
                 >
                   VIEW SKILLS
                 </motion.span>
               </motion.div>
             </>
           )}
        </motion.div>
      </motion.div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden mt-8 sm:mt-10 md:mt-20">
      {/* Main Content Area */}
      <div className="w-full md:w-[75%] h-screen relative">
        {/* Content Container */}
        <div className="relative h-full">
          {/* Title Container */}
          <div className="relative w-full px-4 sm:px-6 md:px-0" style={{ height: isMobile ? '140px' : '180px' }}>
            {/* Animated Text */}
            <div
              className="absolute inset-x-0 z-20 skills-title-position"
              style={{
                paddingLeft: isMobile ? '0' : '15%',
                marginTop: isDpr125 ? `-${titleOffset}px` : '0'
              }}
            >
              <motion.div
                className="relative"
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ margin: "-100px" }}
              >
                {/* Top half - solid white */}
                <div
                  className="absolute text-[60px] sm:text-[80px] md:text-[160px] font-black uppercase tracking-normal text-white flex"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    WebkitClipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: '"liga" 1, "kern" 1',
                    textShadow: 'none'
                  }}
                >
                  {'SKILLS'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { y: 100, opacity: 0 },
                        visible: { y: 0, opacity: 1 }
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.06
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Bottom half - outlined */}
                <div
                  className="text-[60px] sm:text-[80px] md:text-[160px] font-black uppercase tracking-normal flex"
                  style={{
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                    WebkitClipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                    WebkitTextStroke: '2px white',
                    color: 'transparent',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: '"liga" 1, "kern" 1',
                    textShadow: 'none'
                  }}
                >
                  {'SKILLS'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { y: 100, opacity: 0 },
                        visible: { y: 0, opacity: 1 }
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.06
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Image */}
          <div className="absolute bottom-0 left-0 z-10 overflow-hidden w-full h-[65vh] sm:h-[70vh] max-h-[750px]" style={{ bottom: isMobile ? '-5%' : '0' }}>
            <motion.img
              src="/assets/Skills.png"
              alt="Skills Background"
              className="object-cover w-full h-full origin-center"
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, margin: "-20%" }}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="absolute right-0 top-0 w-[25%] h-screen hidden md:block">
        {/* Background number */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 text-transparent text-[300px] font-bold select-none rotate-90" 
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 900,
            letterSpacing: '0.02em',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: '"liga" 1, "kern" 1',
            textShadow: 'none'
          }}
        >
          01
        </div>
      </div>

      {/* Floating Circle */}
      <FloatingCircle />
    </div>
  );
}