'use client';

import { motion } from 'framer-motion';
// Button removed (no CTA in overlay)
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { CustomCursor } from '@/components/ui/CustomCursor';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <motion.div
      className="fixed inset-0 bg-background z-[100] overflow-visible"
      initial={{ opacity: 0, visibility: 'hidden' }}
      animate={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Face avatar (top-left) */}
      <div className="absolute top-12 left-12 z-40">
        <motion.a
          href="#hero"
          className="block cursor-interactive"
          data-cursor-target="true"
          data-cursor-blur="true"
          onClick={onClose}
          onMouseEnter={() => {
            document.body.setAttribute('data-hide-cursor', 'true');
          }}
          onMouseLeave={() => {
            document.body.removeAttribute('data-hide-cursor');
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2, ease: "easeInOut" }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          <motion.div 
            className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden"
          >
            <Image
              src="/assets/face.webp"
              alt="Avatar"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.a>
      </div>

      {/* Start a Project magnetic circle (center-left) */}
      {(() => {
        const MagneticCircle = () => {
          const ref = useRef<HTMLDivElement>(null);
          const { x: mouseX, y: mouseY } = useMousePosition();
          const mvX = useMotionValue(0);
          const mvY = useMotionValue(0);
          const x = useSpring(mvX, { stiffness: 260, damping: 18, mass: 0.5 });
          const y = useSpring(mvY, { stiffness: 260, damping: 18, mass: 0.5 });
          const [isInside, setIsInside] = useState(false);

          useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            // Magnetic (inverse) mapping: move opposite to cursor, more sensitive
            const vw = window.innerWidth || 1;
            const vh = window.innerHeight || 1;
            const normX = (mouseX - cx) / vw; // -1..1 roughly across screen
            const normY = (mouseY - cy) / vh;
            const maxOffsetX = 140; // px, limit so it doesn't hit other content
            const maxOffsetY = 60;  // smaller vertical drift
            const targetX = Math.max(Math.min(-normX * maxOffsetX * 2, maxOffsetX), -maxOffsetX);
            const targetY = Math.max(Math.min(-normY * maxOffsetY * 2, maxOffsetY), -maxOffsetY);
            mvX.set(targetX);
            mvY.set(targetY);

            // inside detection (cursor overlapping circle)
            const radius = rect.width / 2;
            const distToCenter = Math.hypot(mouseX - cx, mouseY - cy);
            setIsInside(distToCenter <= radius);
          }, [mouseX, mouseY, mvX, mvY]);

          // Toggle a body attribute to hide the custom cursor while inside
          useEffect(() => {
            if (isInside) {
              document.body.setAttribute('data-hide-cursor', 'true');
            } else {
              document.body.removeAttribute('data-hide-cursor');
            }
            return () => {
              document.body.removeAttribute('data-hide-cursor');
            };
          }, [isInside]);

          return (
            <motion.div
              ref={ref}
              className="absolute left-[28%] top-1/2 -translate-y-1/2 select-none"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ x, y }}
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Ring border fades when inside */}
                <motion.div
                  className="absolute inset-0 rounded-full border"
                  animate={{ opacity: isInside ? 0 : 1, borderColor: 'rgba(255,255,255,0.6)' }}
                  transition={{ duration: 0.12 }}
                />

                {/* Radial fill from center (scale up) */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  initial={false}
                  animate={{ scale: isInside ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                  style={{ transformOrigin: 'center center' }}
                />

                {/* Rotating vertical text (outside state) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360, opacity: isInside ? 0 : 1 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear', opacity: { duration: 0.05 } }}
                >
                  <span className="writing-mode-vertical whitespace-nowrap tracking-[0.6em] text-white/90 text-[13px] translate-x-[4px]">
                    START A PROJECT
                  </span>
                </motion.div>

                {/* Inside text when overlapped (black on white) */}
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
                >
                  <motion.span
                    className="text-black writing-mode-vertical whitespace-nowrap"
                    initial={false}
                    animate={{
                      letterSpacing: isInside ? '0.08em' : '0.36em',
                      fontSize: isInside ? '12px' : '14px',
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                    style={{ fontWeight: 600 }}
                  >
                    START A PROJECT
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          );
        };
        return <MagneticCircle />;
      })()}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-16 right-8 w-12 h-12 rounded-full border border-gray-300 bg-white text-black hover:bg-[#3f3f3f] hover:text-white hover:border-none transition-all duration-300 cursor-interactive flex items-center justify-center z-50"
        data-cursor-target="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Main navigation content (WORK / ABOUT only) */}
      <div className="flex flex-col justify-center items-end h-full px-8 md:px-16">
        <div className="space-y-16 w-full max-w-[900px] text-right pr-4 md:pr-12">
          <motion.a
            href="#work"
            className="inline-block cursor-interactive ml-auto"
            data-cursor-target="true"
            data-cursor-blur="true"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h2
              className="text-[12vw] md:text-[9vw] font-black leading-none inline-block bg-background relative z-30"
              style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}
              whileHover={{ color: '#ffffff' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              WORK
            </motion.h2>
            <motion.p
              className="mt-3 text-white/70 text-base md:text-lg block"
              whileHover={{ color: '#ffffff', letterSpacing: '0.06em' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              All good stuff. Sorta
            </motion.p>
          </motion.a>

          <motion.a
            href="#about"
            className="inline-block cursor-interactive ml-auto"
            data-cursor-target="true"
            data-cursor-blur="true"
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2
              className="text-[12vw] md:text-[9vw] font-black leading-none inline-block bg-background relative z-30"
              style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}
              whileHover={{ color: '#ffffff' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              ABOUT
            </motion.h2>
            <motion.p
              className="mt-3 text-white/70 text-base md:text-lg block"
              whileHover={{ color: '#ffffff', letterSpacing: '0.06em' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              The man behind the beard
            </motion.p>
          </motion.a>
        </div>
      </div>
      {/* Social links bottom-right */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-40">
        <a
          href="https://www.facebook.com/asnari.pacalna"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-white/40 text-white/80 hover:bg-black hover:text-white hover:border-transparent transition-colors flex items-center justify-center cursor-interactive"
          data-cursor-target="true"
          data-cursor-blur="true"
          aria-label="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/asnarsss_/"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-white/40 text-white/80 hover:bg-black hover:text-white hover:border-transparent transition-colors flex items-center justify-center cursor-interactive"
          data-cursor-target="true"
          data-cursor-blur="true"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/>
          </svg>
        </a>
      </div>
      {/* Email bottom-left */}
      <div className="absolute bottom-8 left-8 z-40">
        {(() => {
          const EmailLink = () => {
            const ref = useRef<HTMLAnchorElement>(null);
            const { x: mouseX, y: mouseY } = useMousePosition();
            const [isInside, setIsInside] = useState(false);

            useEffect(() => {
              const el = ref.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              
              // Check if cursor is inside the email link area
              const isCursorInside = mouseX >= rect.left && mouseX <= rect.right && 
                                    mouseY >= rect.top && mouseY <= rect.bottom;
              setIsInside(isCursorInside);
            }, [mouseX, mouseY]);

            // Toggle body attribute to hide the custom cursor while inside
            useEffect(() => {
              if (isInside) {
                document.body.setAttribute('data-hide-cursor', 'true');
              } else {
                document.body.removeAttribute('data-hide-cursor');
              }
              return () => {
                document.body.removeAttribute('data-hide-cursor');
              };
            }, [isInside]);

            return (
              <motion.a
                ref={ref}
                href="mailto:asnaripacalna@gmail.com"
                className="text-white underline decoration-white/90 underline-offset-4 transition-colors cursor-interactive"
                data-cursor-target="true"
                data-cursor-blur="true"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                asnaripacalna@gmail.com
              </motion.a>
            );
          };
          return <EmailLink />;
        })()}
      </div>
      {isOpen && <CustomCursor />}
    </motion.div>
  );
}
