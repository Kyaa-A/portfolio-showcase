'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function ContactSubsection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      if (isMobile) return;

      const el = ref.current;
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
      <motion.div
        ref={ref}
        className="absolute right-[10%] md:right-[30%] top-[75%] md:top-2/3 select-none z-40"
        style={isMobile ? {} : { x, y }}
      >
        <div className="relative w-32 md:w-48 h-32 md:h-48 flex items-center justify-center">
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
            // Desktop: Original purple color scheme with hover effect
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
              <span className="text-black text-[11px] font-bold tracking-[0.15em] whitespace-nowrap">
                CONTACT ME
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
                <span className="writing-mode-vertical whitespace-nowrap tracking-[0.4em] text-white/90 text-[13px] translate-x-[2px] font-bold">
                  CONTACT ME
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
                    fontSize: isInside ? '12px' : '13px',
                  }}
                  transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                  style={{ fontWeight: 600 }}
                >
                  CONTACT ME
                </motion.span>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden mt-20">
      {/* Main Content Area - 75% width */}
      <div className="w-full md:w-[75%] h-screen relative">
        {/* Content Container */}
        <div className="relative h-full">
          {/* Title Container */}
          <div className="relative w-full px-6 md:px-0" style={{ height: '180px' }}>
            {/* Animated Text */}
            <div className="absolute inset-x-0 bottom-0 z-20" style={{ top: isMobile ? '237%' : '45%', paddingLeft: isMobile ? '0' : '15%' }}>
              <motion.div
                className="relative"
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ margin: "-100px" }}
              >
                {/* Top half - solid white */}
                <div 
                  className="absolute text-[80px] md:text-[160px] font-black uppercase tracking-tight text-white flex"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    WebkitClipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
                  }}
                >
                  {'CONTACT'.split('').map((letter, index) => (
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
                  className="text-[80px] md:text-[160px] font-black uppercase tracking-tight flex"
                  style={{ 
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                    WebkitClipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                    WebkitTextStroke: '1px white',
                    color: 'transparent'
                  }}
                >
                  {'CONTACT'.split('').map((letter, index) => (
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
          <div className="absolute bottom-0 left-0 z-10 overflow-hidden w-full md:w-[1300px] h-[500px] md:h-[750px]" style={{ bottom: isMobile ? '-10%' : '0' }}>
            <motion.img
              src="/assets/Contact.webp"
              alt="Contact Background"
              className="object-cover w-full h-full origin-center"
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, margin: "-20%" }}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar Panel - Hidden on mobile */}
      <div className="absolute right-0 top-0 w-[25%] h-screen hidden md:block">
        {/* Background number */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-transparent text-[300px] font-bold select-none rotate-90" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
          03
        </div>
      </div>

      {/* Floating Circle */}
      <FloatingCircle />
    </div>
  );
}