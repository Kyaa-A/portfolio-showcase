"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ColorExtractorPage() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  return (
    <div className="min-h-screen bg-background text-white px-6 md:px-12 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-28">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div className="space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Color Extractor
            </h1>
            <p className="text-sm md:text-base text-white/60">
              Website · May 2024
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl text-justify">
              As a developer who often interacts with design, I was constantly
              frustrated by the tedious process of manually picking colors from
              an image. I built Color-Extractor as a full-stack solution to
              automate this task, challenging myself to create a fast,
              beautiful, and reliable tool that I would personally use every
              day.
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/colorExtractor/landing.webp"
              alt="Colorful photograph"
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>

        <div className="my-12 md:my-16 h-px bg-white/15" />

        

        {/* 3) Designing the Application */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Design System & UI Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Icons */}
            <div className="rounded-xl ring-1 ring-white/10 p-6 grid grid-cols-3 gap-4 bg-white/5">
              {["Upload Image", "Copy Color", "Generate Palette"].map((label) => (
                <div
                  key={label}
                  className="aspect-square rounded-lg bg-white/10 flex items-center justify-center text-sm md:text-base text-white/80"
                >
                  <span className="font-medium">{label}</span>
                </div>
              ))}
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
          {/* Palette */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {[
              "#121212",
              "#1E1E1E",
              "#2B2B2B",
              "#E6E6E6",
              "#3E6AE9",
              "#D1D5DB",
            ].map((hex) => (
              <div
                key={hex}
                className="rounded-md p-4 ring-1 ring-white/10 flex items-end justify-between h-24"
                style={{ background: hex }}
              >
                <span className="text-[10px] md:text-xs font-mono bg-black/40 px-1.5 py-0.5 rounded">
                  {hex}
                </span>
              </div>
            ))}
          </div>
          {/* App mockup */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/colorExtractor/cover.webp"
              alt="Color-Extractor interface mockup"
              fill
              className="object-contain bg-white"
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-6xl">
            A focused, single‑page tool that turns any image into an accurate 6‑color palette. Built with React, Vite,
            Tailwind, and a Roboto Slab + Mulish type system. Multiple algorithms (Vibrant, K‑Means, Median‑Cut,
            Octree, Weighted K‑Means) and LAB‑based filtering deliver perceptually accurate, distinct colors with one
            upload.
          </p>
        </section>

        <div className="my-12 md:my-16 h-px bg-white/15" />

        {/* 4) The User Story */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From Tedious to Instant
          </h2>
          <div className="relative mx-auto w-full max-w-6xl aspect-[3/3] rounded-sm overflow-hidden ring-1 ring-white/10">
            <Image
              src="/assets/colorExtractor/caseStudy.webp"
              alt="Color-Extractor case study overview"
              fill
              priority
              className="object-contain bg-white"
            />
          </div>
          <p className="text-sm md:text-base text-white/60 text-center">
            A quick story walkthrough showing how Color‑Extractor streamlines the process from image to palette.
          </p>
        </section>

        <div className="my-12 md:my-16 h-px bg-white/15" />

        {/* 5) Ongoing Optimisation */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Ongoing Optimisation
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-6xl">
            The next logical steps for Color-Extractor are to develop a browser extension for extracting colors from
            any webpage on the fly. I also plan to add a feature allowing users to create accounts, save their
            favorite palettes, and discover palettes created by other users.
          </p>
        </section>
      </div>
    </div>
  );
}
