'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SkillsSubsection } from './SkillsSubsection';
import { ProjectsSubsection } from './ProjectsSubsection';
import { ContactSubsection } from './ContactSubsection';

export function ProjectsSection() {
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [currentSection, setCurrentSection] = useState('TECHNICAL EXPERTISE');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only track sections within the ProjectsSection
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;
      
      const sectionTop = projectsSection.offsetTop;
      const sectionHeight = projectsSection.offsetHeight;
      
      // Check if ProjectsSection is in view
      const isInView = scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
      setIsSectionInView(isInView);
      
      if (!isInView) return;
      
      // Calculate relative position within the ProjectsSection
      const relativeScroll = scrollPosition - sectionTop;
      
      // Three subsections, each one screen height:
      // First screen height (0 to windowHeight): TECHNICAL EXPERTISE
      // Second screen height (windowHeight to 2*windowHeight): FEATURED PROJECTS
      // Third screen height (2*windowHeight to 3*windowHeight): GET IN TOUCH
      if (relativeScroll >= 0 && relativeScroll < windowHeight) {
        setCurrentSection('TECHNICAL EXPERTISE');
      } else if (relativeScroll >= windowHeight && relativeScroll < windowHeight * 2) {
        setCurrentSection('FEATURED PROJECTS');
      } else if (relativeScroll >= windowHeight * 2 && relativeScroll < windowHeight * 3) {
        setCurrentSection('GET IN TOUCH');
      } else {
        setCurrentSection('TECHNICAL EXPERTISE');
      }
    };

    // Call once on mount to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-background relative">
      {/* Skills Subsection */}
      <SkillsSubsection />

      {/* Projects Subsection */}
      <ProjectsSubsection />

      {/* Contact Subsection */}
      <ContactSubsection />

      {/* Bottom-Left Text - Only visible when ProjectsSection is in view */}
      {isSectionInView && (
        <div className="fixed bottom-0 left-0 z-50">
          <motion.div
            className="bg-white px-16 py-12"
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-black text-base uppercase tracking-[0.2em] leading-tight">
              {currentSection}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
