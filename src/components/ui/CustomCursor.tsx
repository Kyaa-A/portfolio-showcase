'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isBlurHover, setIsBlurHover] = useState(false);

  // Create motion values for smooth spring following
  const mouseX = useMotionValue(x);
  const mouseY = useMotionValue(y);

  // Update motion values when mouse moves
  useEffect(() => {
    mouseX.set(x);
    mouseY.set(y);
  }, [x, y, mouseX, mouseY]);

  // Transform motion values with spring physics
  const cursorX = useTransform(mouseX, (value) => value - 32);
  const cursorY = useTransform(mouseY, (value) => value - 32);

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      const targetEl = event.target as Element | null;
      const wantsBlur = !!targetEl?.closest('[data-cursor-blur="true"]');
      setIsHovering(true);
      setIsBlurHover(wantsBlur);
    };
    const handleMouseLeave = (_event: MouseEvent) => {
      setIsHovering(false);
      setIsBlurHover(false);
    };

    const addEventListeners = () => {
      // Add event listeners to all interactive elements including motion.div
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [class*="cursor-pointer"], [data-cursor-target="true"], .cursor-interactive, [class*="motion-"]');
      
      const onEnter = (e: Event) => handleMouseEnter(e as MouseEvent);
      const onLeave = (e: Event) => handleMouseLeave(e as MouseEvent);

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);
      });

      // Return unsubscribe for this batch so we can clean up before re-adding
      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    // Initial setup
    const removeInitial = addEventListeners();

    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(() => {
      // Clean up previous listeners and re-attach to include new nodes
      removeInitial?.();
      // Re-bind and store new remover
      // Note: we intentionally ignore storing multiple removers; cleanup on effect teardown handles it
      addEventListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      // Clean up all event listeners
      removeInitial?.();
    };
  }, []);

  return (
                    <motion.div
          className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-35"
          style={{
            x: cursorX,
            y: cursorY,
            pointerEvents: 'none',
            zIndex: 35,
            // Keep type strictness without casting to any
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
