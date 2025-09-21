'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface NavButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function NavButton({ onClick, isOpen }: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Force style update via DOM manipulation
  useEffect(() => {
    if (buttonRef.current) {
      if (isHovered) {
        buttonRef.current.style.setProperty('background-color', '#181818', 'important');
        buttonRef.current.style.setProperty('border', 'none', 'important');
        buttonRef.current.style.setProperty('mix-blend-mode', 'normal', 'important');
        buttonRef.current.style.setProperty('opacity', '1', 'important');
        buttonRef.current.style.setProperty('filter', 'none', 'important');
      } else {
        buttonRef.current.style.setProperty('background-color', '#ffffff', 'important');
        buttonRef.current.style.setProperty('border', '1px solid #d1d5db', 'important');
        buttonRef.current.style.setProperty('mix-blend-mode', 'normal', 'important');
        buttonRef.current.style.setProperty('opacity', '1', 'important');
        buttonRef.current.style.setProperty('filter', 'none', 'important');
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={buttonRef}
      className={`w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-interactive z-[10001] ${isHovered ? 'hovered' : ''}`}
      data-cursor-target="true"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-6 h-6 flex flex-col justify-center items-center relative"
        animate={isOpen ? 'open' : 'closed'}
      >
        {/* Top line */}
        <motion.span
          className="w-full h-0.5 absolute bg-black group-hover:bg-white"
          style={{
            backgroundColor: isHovered || isOpen ? '#ffffff' : '#000000'
          }}
          variants={{
            closed: { rotate: 0, y: -6 },
            open: { rotate: 45, y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        {/* Middle line */}
        <motion.span
          className="w-full h-0.5 absolute bg-black group-hover:bg-white"
          style={{
            backgroundColor: isHovered || isOpen ? '#ffffff' : '#000000'
          }}
          variants={{
            closed: { opacity: 1, scale: 1 },
            open: { opacity: 0, scale: 0 }
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        
        {/* Bottom line */}
        <motion.span
          className="w-full h-0.5 absolute bg-black group-hover:bg-white"
          style={{
            backgroundColor: isHovered || isOpen ? '#ffffff' : '#000000'
          }}
          variants={{
            closed: { rotate: 0, y: 6 },
            open: { rotate: -45, y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
