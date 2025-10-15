'use client';

import { motion } from "framer-motion";
import { useState } from "react";

export default function KusiNotesPage() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white px-6 md:px-12 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
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
                ? "bg-black text-white scale-90"
                : "bg-white text-black hover:bg-black hover:text-white"
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

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-4xl space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              KUSINOTES
            </h1>
            <p className="text-sm md:text-base text-white/60">
              AI-Powered Meal Planning Assistant · 2024
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed text-justify">
              A modern web application that helps you create personalized meal plans using AI technology. Whether you&apos;re looking to maintain a healthy diet, manage specific dietary requirements, or explore new cuisines, KusiNotes generates customized meal plans tailored to your preferences and nutritional needs.
            </p>
            <div className="pt-2">
              <motion.button
                className="rounded-sm px-5 py-3 text-sm md:text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://kusinotes.vercel.app/', '_blank', 'noopener,noreferrer')}
              >
                Visit live site
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


