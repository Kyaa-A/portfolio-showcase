'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
}

// Sample projects data - you can replace this with your actual projects
const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Showcase',
    description: 'Modern portfolio website with smooth animations and responsive design',
    longDescription: 'A comprehensive portfolio website built with Next.js and Framer Motion, featuring smooth animations, responsive design, and modern UI components. This project showcases advanced frontend development skills with a focus on user experience and performance optimization.',
    image: '/projects/portfolio.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://yourportfolio.com',
    status: 'completed',
    category: 'Web Development',
    accentColor: 'from-blue-500 to-purple-600'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    longDescription: 'A complete e-commerce platform with user authentication, product management, shopping cart, and secure payment processing. Built with modern technologies and best practices for scalability and security.',
    image: '/projects/ecommerce.webp',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://yourecommerce.com',
    status: 'completed',
    category: 'Full Stack',
    accentColor: 'from-green-500 to-teal-600'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    longDescription: 'A collaborative task management application with real-time synchronization, team collaboration features, and intuitive drag-and-drop interface. Designed for modern teams who need efficient project management tools.',
    image: '/projects/taskmanager.webp',
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/yourusername/taskmanager',
    status: 'in-progress',
    category: 'Web Development',
    accentColor: 'from-orange-500 to-red-600'
  },
  {
    id: '4',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    longDescription: 'A secure mobile banking application featuring biometric authentication, transaction history, bill payments, and real-time notifications. Built with security as the top priority and user experience in mind.',
    image: '/projects/banking.webp',
    technologies: ['React Native', 'Node.js', 'MySQL', 'Firebase'],
    githubUrl: 'https://github.com/yourusername/banking-app',
    status: 'completed',
    category: 'Mobile Development',
    accentColor: 'from-indigo-500 to-blue-600'
  },
  {
    id: '5',
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot with natural language processing',
    longDescription: 'An AI-powered chat assistant with natural language processing capabilities, context awareness, and integration with multiple APIs. Designed to provide seamless customer support and engagement.',
    image: '/projects/chatbot.webp',
    technologies: ['Python', 'TensorFlow', 'Flask', 'OpenAI API'],
    status: 'coming-soon',
    category: 'AI/ML',
    accentColor: 'from-purple-500 to-pink-600'
  },
  {
    id: '6',
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for business analytics',
    longDescription: 'A comprehensive data visualization dashboard with interactive charts, real-time data updates, and customizable reporting features. Built to help businesses make data-driven decisions.',
    image: '/projects/dashboard.webp',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/dashboard',
    liveUrl: 'https://yourdashboard.com',
    status: 'completed',
    category: 'Data Visualization',
    accentColor: 'from-cyan-500 to-blue-600'
  }
];

export default function ProjectsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'coming-soon': return 'text-blue-400';
      default: return 'text-gray-400';
    }
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
        className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {/* Main heading with enhanced styling */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          <motion.div
            className="space-y-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
             <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white max-w-5xl mx-auto leading-tight uppercase">
               Showcasing my journey through code
             </p>
          </motion.div>

        </motion.div>

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

          {/* Projects Grid - Folder/Tablet Layout */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                data-cursor-target="true"
              >
                {/* Folder Icon */}
                <div className="relative mb-6">
                  <div className="w-32 h-20 md:w-40 md:h-24 bg-gray-800/50 rounded-lg border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden">
                    {/* Folder dots */}
                    <div className="absolute top-3 left-3 flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                    </div>
                    
                    {/* Tablet Icon */}
                    <div className="absolute -bottom-3 -right-3 w-16 h-20 md:w-20 md:h-24 bg-gray-700/50 rounded-lg border border-gray-600/50 group-hover:border-gray-500/50 transition-all duration-300">
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                    </div>

                    {/* Accent decoration */}
                    <div className={`absolute top-0 right-0 w-10 h-10 bg-gradient-to-br ${project.accentColor} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-sm md:text-base font-medium text-white text-center group-hover:text-gray-300 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Status indicator */}
                <div className="absolute top-0 right-0">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)} opacity-60`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-gray-900 rounded-2xl w-[80vw] h-[70vh] overflow-hidden flex"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Section - Thumbnail (70%) */}
            <div className="w-[70%] relative">
              <Image
                src="/project_thumbnails/Thumbnail.png"
                alt={selectedProject.title}
                fill
                className="object-contain bg-gray-800"
              />
            </div>

            {/* Right Section - Project Details (30%) */}
            <div className="w-[30%] p-8 flex flex-col justify-between" style={{ backgroundColor: '#181818' }}>
              {/* Project Title and Category */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-lg uppercase tracking-wide text-white/80 mb-6">
                  {selectedProject.category}
                </p>
              </div>

              {/* Project Description */}
              <div className="flex-1">
                <p className="text-white text-lg leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                {/* Action Button */}
                <div className="mt-8 flex justify-start">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[50%] bg-white text-black py-4 px-6 text-center font-medium hover:bg-gray-200 transition-all duration-300"
                      style={{
                        borderRadius: '6px 0px 6px 0px',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderRadius = '0px 6px 0px 6px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderRadius = '6px 0px 6px 0px';
                      }}
                    >
                      VIEW WEBSITE
                    </a>
                  )}
                </div>
      </div>
            </div>

            {/* Close Button - Bottom Right */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute bottom-0 right-0 w-16 h-10 bg-red-500 text-white rounded-tl flex items-center justify-center hover:bg-red-600 transition-colors z-10 text-xl"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

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
