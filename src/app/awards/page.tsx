'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Awards data
const awards = [
  {
    id: 1,
    title: "Ideation Bootcamp",
    location: "UM Digos Gymnasium",
    date: "May 23, 2025",
    achievement: "CHAMPION",
    team: "SalinKaalaman Company",
    description: "In a dynamic and fast-paced event I had the honor to attend, there are many things I could say for this experience. With just basic knowledge and passion for improving, there is nothing you cannot tackle. This is where innovation meets determination, and some of the most valuable learnings are made. Our team ideate SalinKaalaman – an innovative solution designed to bridge language barriers in the Philippine education system. This achievement taught me that it's not what you achieve, but what you overcome that defines your career. The way to use innovation to solve problems is understanding what kind of value you can give to others and to yourself.",
    members: "Edsel Suralta Payan, Asnari Pacalna, Mariano III Ongkas, Cris John Labiaga",
    image: "/awards/ideation_bootcamp/img.webp",
    layout: "right" // image on left, content on right
  },
  {
    id: 2,
    title: "IDEAS Plugin",
    location: "Davao del Sur State College",
    date: "March 27-28, 2025",
    achievement: "Best Pitch",
    team: "UMDC-BSIT Team",
    description: "In one hack of an event as what they say, this is one way I have shown my potential in technical innovation and presentation skills. This regional competition brought together the brightest minds from across the region, and I had the privilege to be part of this remarkable experience. Through this journey, I learned that it's not just about having the technical knowledge, but about how you communicate your ideas and the value you bring to the table. Our team wowed the judges with our exceptional presentation skills, taking home the prestigious Best Pitch award. This experience taught me that success comes from taking challenges with innovation and determination.",
    members: "Asnari Pacalna, Vincent Ace Rivera, Sophia Pagal",
    image: "/awards/hack4gov/img.webp",
    layout: "left" // content on left, image on right
  },
  {
    id: 3,
    title: "Hack4Gov Competition",
    location: "DICT Regional Event",
    date: "2025",
    achievement: "Top 5 Finish",
    team: "DotEXE Team",
    description: "This is where this and that happen and some learnings are made there, with all that said what do you gain? The answer will be given by the innovation that you have. In a remarkable display of skill and determination, I had the honor to be part of the DotEXE team that achieved an impressive Top 5 finish at the Hack4Gov event. Competing against some of the brightest minds in the region, I learned that success is not just about individual talent, but about how you collaborate and bring value to your team. This experience taught me that it's not what you achieve, but what you overcome that defines your career. It's about your brand and your personality, and the impact you make on people who want to see what is up with who is YOU.",
    members: "John Ghlen Dealdo, Gene Ryan Depalubos, Asnari Pacalna, Vincent Ace Rivera",
    image: "/awards/hack4gov/img.webp",
    layout: "right" // image on left, content on right
  }
];

export default function AwardsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress for custom scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Ensure we have valid dimensions
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
    };

    // Initial call to set correct position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle window resize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <div className="min-h-screen bg-background text-white">
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
        {/* Main heading */}
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
              My Competition Journey
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
              className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.2em] font-light text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore My Achievements
            </motion.span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden"
              whileHover={{ borderColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
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

      {/* Awards Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto relative">
          {/* Journey Road Background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1200 2000" preserveAspectRatio="none">
              {/* Winding Road Path */}
              <path
                d="M 100 1800 Q 300 1600 500 1400 Q 700 1200 400 1000 Q 200 800 600 600 Q 800 400 500 200"
                stroke="#374151"
                strokeWidth="8"
                fill="none"
                strokeDasharray="20 10"
                opacity="0.6"
              />
              
            </svg>
          </div>

          <div className="space-y-48 relative z-10">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                className={`flex flex-col ${award.layout === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-32`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  className="relative rounded-2xl overflow-hidden bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, x: award.layout === 'left' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {award.title}
                  </motion.h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      📍 {award.location}
                    </span>
                    <span className="flex items-center gap-2">
                      📅 {award.date}
                    </span>
                  </div>

                  <div className="inline-block">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                      🏆 {award.achievement}
                    </span>
                  </div>
                </div>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed text-justify"
                  initial={{ opacity: 0, x: award.layout === 'left' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {award.description}
                </motion.p>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, x: award.layout === 'left' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                   <div>
                     <h4 className="text-white font-semibold mb-2">Team Members:</h4>
                     <p className="text-gray-300 text-justify">
                       {award.members.split(', ').map((member, index) => (
                         <span key={index}>
                           {member === 'Asnari Pacalna' ? (
                             <span className="font-bold text-white">
                               {member}
                             </span>
                           ) : (
                             member
                           )}
                           {index < award.members.split(', ').length - 1 && ', '}
                         </span>
                       ))}
                     </p>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
