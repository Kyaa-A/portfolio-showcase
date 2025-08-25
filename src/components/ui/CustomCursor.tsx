'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

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
    const handleMouseEnter = (event: any) => {
      console.log('Cursor hover start on:', event.target);
      setIsHovering(true);
    };
    const handleMouseLeave = (event: any) => {
      console.log('Cursor hover end on:', event.target);
      setIsHovering(false);
    };

    const addEventListeners = () => {
      // Add event listeners to all interactive elements including motion.div
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [class*="cursor-pointer"], [data-cursor-target="true"], .cursor-interactive, [class*="motion-"]');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial setup
    addEventListeners();

    // Set up a mutation observer to watch for new elements
    const observer = new MutationObserver(() => {
      addEventListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      // Clean up all event listeners
      const allElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [class*="cursor-pointer"], [data-cursor-target="true"], .cursor-interactive, [class*="motion-"]');
      allElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
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
          }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: 1,
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
        className="w-full h-full rounded-full border-2 border-white bg-white/50"
        animate={{
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
