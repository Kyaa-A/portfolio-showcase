'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'coming-soon';
  category: string;
  accentColor: string;
  slug: string;
  collaboration?: {
    name: string;
    role?: string;
  };
}

// Sample projects data - you can replace this with your actual projects
const projects: Project[] = [
  {
    id: '1',
    title: 'Whispr',
    description: '',
    longDescription: '',
    image: '',
    technologies: ['Electron', 'React', 'Tailwind CSS'],
    status: 'completed',
    category: 'Desktop Application',
    accentColor: 'from-blue-500 to-purple-600',
    slug: 'whispr'
  },
  {
    id: '2',
    title: 'Color-Extractor',
    description: '',
    longDescription: '',
    image: '',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    status: 'completed',
    category: 'Web Application',
    accentColor: 'from-green-500 to-teal-600',
    slug: 'color-extractor'
  },
  {
    id: '3',
    title: 'KusiNotes',
    description: '',
    longDescription: '',
    image: '',
    technologies: ['Next.js', 'TypeScript', 'Prisma'],
    status: 'completed',
    category: 'Full Stack',
    accentColor: 'from-orange-500 to-red-600',
    slug: 'kusinotes'
  },
  {
    id: '4',
    title: 'DTPgo',
    description: '',
    longDescription: '',
    image: '',
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    status: 'completed',
    category: 'Full Stack',
    accentColor: 'from-purple-500 to-pink-600',
    slug: 'dtpgo',
    collaboration: {
      name: 'Gene',
      role: 'Development Team'
    }
  }
];

export default function ProjectsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);


  // Handle scroll progress for custom scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };



  return (
    <div className="min-h-screen bg-background text-white">
      {/* Return Button */}
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
                ? 'bg-black text-white scale-90' 
                : 'bg-white text-black hover:bg-black hover:text-white'
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

       {/* Custom Scrollbar */}
       <div className="hidden md:block fixed bottom-8 right-8 z-40">
         <div className="flex flex-col items-center">
           {/* Scroll Track */}
           <div className="w-1 h-24 bg-gray-700 rounded-full relative overflow-hidden">
             {/* Scroll Thumb */}
             <motion.div
               className="absolute w-3 h-8 bg-gray-400 rounded-full -left-1"
               style={{ 
                 y: `${scrollProgress * (96 - 32)}px` // 96px track height - 32px thumb height
               }}
             />
           </div>
         </div>
       </div>

      {/* Header Section */}
      <motion.div
        className="relative h-screen flex items-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Content */}
            <motion.div
              className="space-y-12"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black text-white leading-[0.8]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                portfolio.
              </motion.h1>
              
              <motion.div
                className="space-y-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 leading-relaxed">
                  Check out some of my latest product<br />
                  design case studies.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full h-[1400px] lg:h-[1700px] xl:h-[2000px] 2xl:h-[2200px]">
                <Image
                  src="/assets/ProjectIntroductory.png"
                  alt="Project Introduction"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="flex flex-col items-center space-y-3">
            <motion.span 
              className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.2em] font-light"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore My Work
            </motion.span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden"
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <motion.div
                className="w-1 h-2 bg-white rounded-full mt-2"
                animate={{ 
                  y: [2, 20, 2],
                  opacity: [1, 0.3, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>


      {/* Projects Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Projects Grid - Modern Card Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block" data-cursor-target="true">
                <motion.div
                  key={project.id}
                  className="group relative cursor-pointer bg-[#111214] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                {/* Project Image */}
                {project.slug === 'whispr' ? (
                  <div className="relative h-64 bg-[#1a1b1f] overflow-hidden">
                    <Image
                      src="/mockups/whispr.png"
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : project.slug === 'kusinotes' ? (
                  <div className="relative h-64 bg-[#1a1b1f] overflow-hidden">
                    <Image
                      src="/mockups/kusinotes.png"
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : project.slug === 'color-extractor' ? (
                  <div className="relative h-64 bg-[#1a1b1f] overflow-hidden">
                    <Image
                      src="/mockups/extractor.webp"
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : project.slug === 'dtpgo' ? (
                  <div className="relative h-64 bg-[#1a1b1f] overflow-hidden">
                    <Image
                      src="/mockups/dtpgo.webp"
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative h-64 bg-[#1a1b1f] overflow-hidden flex items-center justify-center">
                    <span className="text-white/50 text-lg tracking-widest uppercase">Temp</span>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      {project.collaboration && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-white/40">collab with</span>
                          <span className="text-xs text-white/80 font-medium">
                            {project.collaboration.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-wide">
                      {project.category}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded">
                        +1 more
                      </span>
                    )}
                  </div>
                </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s collaborate and bring your ideas to life with cutting-edge technology and creative solutions.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              data-cursor-target="true"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
