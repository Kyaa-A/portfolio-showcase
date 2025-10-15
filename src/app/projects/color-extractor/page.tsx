"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ColorExtractorPage() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tintaUrl = process.env.NEXT_PUBLIC_TINTA_URL ?? "https://tinta-extractor.vercel.app/";
  
  // Handle scroll progress for custom scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) : 0;
      setScrollProgress(percent);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-background text-white px-6 md:px-12 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        {/* Back button (match projects route style) */}
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

        {/* 1) Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-4xl space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              TINTA
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-3xl">
              Tools for Inspiring New Tones & Art · May 2024
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl text-justify">
              As a developer who often interacts with design, I was constantly
              frustrated by the tedious process of manually picking colors from
              an image. I built TINTA as a full-stack solution to automate this
              task, challenging myself to create a fast, beautiful, and
              reliable tool that I would personally use every day.
            </p>
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-sm px-5 py-3 text-sm md:text-base font-medium bg-white text-black border border-gray-300 hover:bg-black hover:text-white transition-colors"
              >
                <a href={tintaUrl} target="_blank" rel="noopener noreferrer" aria-label="Open TINTA live demo in a new tab">
                  Visit live site
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* alternating backgrounds handled per-section below */}

        {/* 2) Creating the brand with Before/After */}
        <section id="case-study" className="space-y-8 rounded-xl p-4 md:p-6 bg-white/5">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Creating the brand</h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-justify">
            I built TINTA — Tools for Inspiring New Tones & Art — to be fast and clear. The identity needed to be
            precise, modern, and unobtrusive so the experience stays focused on producing accurate color palettes from
            any image.
          </p>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-justify">
            I began with structured sketch explorations—eyedroppers, sampling grids, and fluid forms—evaluating balance,
            rhythm, and legibility. I finalized the mark in Adobe Illustrator, refining vectors, calibrating curves and
            spacing, and preparing clean, scalable SVG and PNG assets.
          </p>
          
          {/* Before/After Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
              <Image
                src="/assets/colorExtractor/before.png"
                alt="Before redesign"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
              <Image
                src="/assets/colorExtractor/after.webp"
                alt="After redesign"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        

        {/* 4) Designing the Application */}
        <section className="space-y-8 rounded-xl p-4 md:p-6 bg-white/10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Design System & UI Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Upload Dropzone (styled like provided reference) */}
            <div className="rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:border-white/30 transition-colors duration-200 p-8 flex items-center justify-center">
              <div className="text-center space-y-3">
                {/* Palette icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mx-auto w-10 h-10 text-white/80"
                  fill="currentColor"
                >
                  <path d="M12 3C7.03 3 3 6.58 3 11c0 2.53 1.53 4.43 3.53 5.7.51.33.8.92.65 1.52-.19.77.44 1.49 1.23 1.34C9.65 19.36 10.8 19 12 19h2c3.87 0 7-2.69 7-6 0-4.42-4.03-8-9-8Zm-4 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
                <p className="text-base md:text-lg text-white/90">Drop your image here or click to browse</p>
                <p className="text-sm md:text-base text-white/60">Supports JPG, PNG, SVG</p>
              </div>
            </div>
            {/* Typography */}
            <div className="rounded-xl ring-1 ring-white/10 p-6 bg-white/5 flex items-center justify-center">
              <div className="text-center space-y-1">
                <p
                  className="text-base md:text-lg"
                  style={{ fontFamily: "Mulish, ui-sans-serif, system-ui" }}
                >
                  Mulish Regular
                </p>
                <p
                  className="text-xl md:text-2xl font-semibold"
                  style={{ fontFamily: "'Roboto Slab', ui-serif, Georgia, serif" }}
                >
                  Roboto Slab Bold
                </p>
              </div>
            </div>
          </div>
          {/* Palette removed on request */}
          {/* App mockup */}
          <div className="relative w-full rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <Image
              src="/assets/colorExtractor/cover.png"
              alt="TINTA interface mockup"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-justify">
            A focused, single‑page tool that turns any image into an accurate 6‑color palette. Built with React, Vite,
            Tailwind, and a Roboto Slab + Mulish type system. Multiple algorithms (Vibrant, K‑Means, Median‑Cut,
            Octree, Weighted K‑Means) and LAB‑based filtering deliver perceptually accurate, distinct colors with one
            upload.
          </p>
        </section>

        

        {/* 4) The User Story */}
        <section className="space-y-6 rounded-xl p-4 md:p-6 bg-white/5">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From Tedious to Instant
          </h2>
          <div className="relative mx-auto w-full rounded-sm overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/colorExtractor/caseStudy.webp"
              alt="TINTA case study overview"
              width={1920}
              height={1280}
              priority
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm md:text-base text-white/60 text-center max-w-3xl mx-auto">
            A quick story walkthrough showing how TINTA streamlines the process from image to palette.
          </p>
        </section>

        

        {/* 5) Ongoing Optimisation */}
        <section className="space-y-6 rounded-xl p-4 md:p-6 bg-white/10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Ongoing Optimisation
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed text-justify">
            The next logical steps for TINTA are to develop a browser extension for extracting colors from any webpage
            on the fly. I also plan to add a feature allowing users to create accounts, save their favorite palettes,
            and discover palettes created by other users.
          </p>
        </section>
      </div>
      {/* Custom Scrollbar - bottom right */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex flex-col items-center">
          <div className="w-1 h-24 bg-gray-700 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute w-3 h-8 bg-gray-400 rounded-full -left-1"
              style={{ y: `${scrollProgress * (96 - 32)}px` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
