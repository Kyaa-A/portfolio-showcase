'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  // All hooks must be called before any conditional returns
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isBlurHover, setIsBlurHover] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Create motion values for smooth spring following
  const mouseX = useMotionValue(x);
  const mouseY = useMotionValue(y);

  // Transform motion values with spring physics
  const cursorX = useTransform(mouseX, (value) => value - 32);
  const cursorY = useTransform(mouseY, (value) => value - 32);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Update motion values when mouse moves
  useEffect(() => {
    mouseX.set(x);
    mouseY.set(y);
  }, [x, y, mouseX, mouseY]);

  // Event listeners effect
  useEffect(() => {
    if (isMobile) return; // Skip event listeners on mobile

    const handleMouseEnter = (event: MouseEvent) => {
      const targetEl = event.target as Element | null;
      const wantsBlur = !!targetEl?.closest('[data-cursor-blur="true"]');
      setIsHovering(true);
      setIsBlurHover(wantsBlur);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsBlurHover(false);
    };

    const addEventListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [class*="cursor-pointer"], [data-cursor-target="true"], .cursor-interactive, [class*="motion-"]');
      
      const onEnter = (e: Event) => handleMouseEnter(e as MouseEvent);
      const onLeave = () => handleMouseLeave();

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);
      });

      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    const removeInitial = addEventListeners();

    const observer = new MutationObserver(() => {
      removeInitial?.();
      addEventListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      removeInitial?.();
    };
  }, [isMobile]); // Add isMobile to dependencies

  // Don't render the cursor element on mobile
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-35"
      style={{
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 35,
        mixBlendMode: 'difference' as React.CSSProperties['mixBlendMode'],
      }}
      animate={{
        scale: isBlurHover ? 1.4 : isHovering ? 1.4 : 1,
        opacity: (typeof document !== 'undefined' && document.body.getAttribute('data-hide-cursor') === 'true') ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 0.8,
        scale: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full border-2"
        initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        animate={{
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(255,255,255,1)',
          filter: isBlurHover ? 'blur(2px)' : 'none',
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}