'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  const { isNavigating, setIsNavigating } = useNavigation();
  const pathname = usePathname();

  // Reset navigation state when pathname changes
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 300); // Longer delay to ensure complete transition
      return () => clearTimeout(timer);
    }
  }, [pathname, isNavigating, setIsNavigating]);

  return (
    <>
      {/* Loading overlay that covers everything immediately */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-background z-[9999] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with immediate hide when navigating */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isNavigating ? 0 : 1 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        style={{ 
          visibility: isNavigating ? 'hidden' : 'visible',
          pointerEvents: isNavigating ? 'none' : 'auto'
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
