'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-background z-40"
      initial={{ opacity: 0, visibility: 'hidden' }}
      animate={{
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-interactive"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Main navigation content */}
      <div className="flex flex-col justify-center h-full px-8 md:px-16">
        <nav className="space-y-8">
          <motion.a
            href="#projects"
            className="block text-6xl md:text-8xl font-bold text-white hover:text-gray-300 transition-colors cursor-pointer relative overflow-hidden cursor-interactive"
            initial={{ opacity: 0, x: -50 }}
            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ x: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10">Projects</span>
          </motion.a>
          <motion.a
            href="#about"
            className="block text-6xl md:text-8xl font-bold text-white hover:text-gray-300 transition-colors cursor-pointer relative overflow-hidden cursor-interactive"
            initial={{ opacity: 0, x: -50 }}
            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10">About</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="block text-6xl md:text-8xl font-bold text-white hover:text-gray-300 transition-colors cursor-pointer relative overflow-hidden cursor-interactive"
            initial={{ opacity: 0, x: -50 }}
            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ x: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10">Contact</span>
          </motion.a>
        </nav>

        {/* CTA Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors relative overflow-hidden cursor-interactive"
            >
              <motion.span
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                START A PROJECT
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
