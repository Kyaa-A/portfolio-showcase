'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Technical Skills Data
const technicalSkills = {
  programmingLanguages: [
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'Java', level: 75, color: '#ED8B00' },
    { name: 'C++', level: 70, color: '#00599C' },
    { name: 'PHP', level: 65, color: '#777BB4' },
  ],
  frontend: [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'Next.js', level: 90, color: '#000000' },
    { name: 'Vue.js', level: 80, color: '#4FC08D' },
    { name: 'Angular', level: 70, color: '#DD0031' },
    { name: 'HTML5', level: 95, color: '#E34F26' },
    { name: 'CSS3', level: 90, color: '#1572B6' },
    { name: 'Tailwind CSS', level: 85, color: '#06B6D4' },
    { name: 'SASS/SCSS', level: 80, color: '#CC6699' },
  ],
  backend: [
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Express.js', level: 80, color: '#000000' },
    { name: 'Django', level: 75, color: '#092E20' },
    { name: 'Flask', level: 70, color: '#000000' },
    { name: 'Spring Boot', level: 65, color: '#6DB33F' },
    { name: 'Laravel', level: 70, color: '#FF2D20' },
  ],
  databases: [
    { name: 'PostgreSQL', level: 80, color: '#336791' },
    { name: 'MySQL', level: 75, color: '#4479A1' },
    { name: 'MongoDB', level: 70, color: '#47A248' },
    { name: 'Redis', level: 65, color: '#DC382D' },
    { name: 'SQLite', level: 70, color: '#003B57' },
  ],
  tools: [
    { name: 'Git', level: 85, color: '#F05032' },
    { name: 'Docker', level: 75, color: '#2496ED' },
    { name: 'AWS', level: 70, color: '#FF9900' },
    { name: 'Vercel', level: 80, color: '#000000' },
    { name: 'Figma', level: 75, color: '#F24E1E' },
    { name: 'VS Code', level: 90, color: '#007ACC' },
  ],
};

const skillCategories = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'programmingLanguages', name: 'Programming Languages', icon: '💻' },
  { id: 'frontend', name: 'Frontend', icon: '🎨' },
  { id: 'backend', name: 'Backend', icon: '⚙️' },
  { id: 'databases', name: 'Databases', icon: '🗄️' },
  { id: 'tools', name: 'Tools & Platforms', icon: '🛠️' },
];

// Certificates Data
const certificates = [
  {
    id: 1,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-CCP-2024-001',
    description: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
    skills: ['Cloud Computing', 'AWS Services', 'Cloud Architecture'],
  },
  {
    id: 2,
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2023',
    credentialId: 'GCP-PD-2023-002',
    description: 'Professional certification for developing and deploying applications on Google Cloud Platform.',
    skills: ['Google Cloud', 'Application Development', 'Cloud Deployment'],
  },
  {
    id: 3,
    title: 'Meta Front-End Developer Certificate',
    issuer: 'Meta',
    date: '2023',
    credentialId: 'META-FE-2023-003',
    description: 'Comprehensive front-end development skills including React, JavaScript, and responsive design.',
    skills: ['React', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
  {
    id: 4,
    title: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    date: '2023',
    credentialId: 'AZ-900-2023-004',
    description: 'Fundamental knowledge of cloud services and how those services are provided with Microsoft Azure.',
    skills: ['Azure', 'Cloud Services', 'Microsoft Technologies'],
  },
];

// Soft Skills Data
const softSkills = [
  { name: 'Problem Solving', level: 95, description: 'Analytical thinking and creative solutions' },
  { name: 'Communication', level: 90, description: 'Clear and effective verbal and written communication' },
  { name: 'Team Collaboration', level: 88, description: 'Working effectively in diverse teams' },
  { name: 'Leadership', level: 85, description: 'Leading projects and mentoring team members' },
  { name: 'Time Management', level: 92, description: 'Efficient project planning and deadline management' },
  { name: 'Adaptability', level: 90, description: 'Quickly adapting to new technologies and environments' },
  { name: 'Critical Thinking', level: 88, description: 'Analyzing problems and making informed decisions' },
  { name: 'Creativity', level: 85, description: 'Innovative approaches to design and development' },
];

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('technical');
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const SkillBar = ({ skill }: { skill: { name: string; level: number; color: string } }) => (
    <motion.div
      className="mb-6"
      variants={itemVariants}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-white/70 text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );

  const SkillCard = ({ skill }: { skill: { name: string; level: number; color: string } }) => (
    <motion.div
      className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
           style={{ backgroundColor: skill.color + '20' }}>
        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: skill.color }} />
      </div>
      <span className="text-white text-sm font-medium text-center mb-1">{skill.name}</span>
      <span className="text-white/60 text-xs">{skill.level}%</span>
    </motion.div>
  );

  const SoftSkillCard = ({ skill }: { skill: { name: string; level: number; description: string } }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
          <span className="text-white/70 text-sm">{skill.level}%</span>
        </div>
        <p className="text-white/70 text-sm mb-4">{skill.description}</p>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Background Pattern with Parallax */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-20 left-20 text-8xl text-white font-mono"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            &lt;/&gt;
          </motion.div>
          <motion.div 
            className="absolute bottom-32 right-20 text-6xl text-white font-mono"
            animate={{ 
              rotate: [0, -3, 3, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            { }
          </motion.div>
          <motion.div 
            className="absolute top-1/2 right-8 text-4xl text-white font-mono"
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            &lt;div&gt;
          </motion.div>
          <motion.div 
            className="absolute top-1/3 left-1/4 text-3xl text-white font-mono"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            &lt;span&gt;
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/3 text-2xl text-white font-mono"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.08, 1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            &lt;code&gt;
          </motion.div>
        </div>



        {/* Main Title */}
        <div className="text-center z-10">
          <motion.h1
            className="text-6xl sm:text-8xl md:text-9xl font-black text-white leading-none mb-8"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative">
              <span 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, white 50%, #0ea5e9 50%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                SKILLS
              </span>
            </span>
          </motion.h1>
          
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ scale: 1.05 }}
                data-cursor-target="true"
              >
                <p className="text-3xl sm:text-4xl md:text-5xl text-white/90 leading-relaxed font-bold cursor-pointer flex items-center justify-center">
                  <span>P</span>
                  <img 
                    src="/assets/eyes.png" 
                    alt="e"
                    className="inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -mx-0.5"
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <img 
                    src="/assets/eyes.png" 
                    alt="e"
                    className="inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -mx-0.5"
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <span>king Behind the Code</span>
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.button
                  className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('technical')}
                  data-cursor-target="true"
                >
                  Technical Skills
                </motion.button>
                
                <span className="text-white/40 hidden sm:block">•</span>
                
                <motion.button
                  className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('certificates')}
                  data-cursor-target="true"
                >
                  Certifications
                </motion.button>
                
                <span className="text-white/40 hidden sm:block">•</span>
                
                <motion.button
                  className="text-green-400 hover:text-green-300 font-medium cursor-pointer transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab('soft')}
                  data-cursor-target="true"
                >
                  Soft Skills
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="text-white/60 text-sm font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.div>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center relative group cursor-pointer"
               data-cursor-target="true">
            <motion.div
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 border-2 border-white/60 rounded-full opacity-0 group-hover:opacity-100"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'technical', label: 'Technical Skills' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'soft', label: 'Soft Skills' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-white bg-transparent'
                    : 'border-transparent text-white/60 hover:text-black bg-transparent'
                }`}
                data-cursor-target="false"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         {/* Technical Skills */}
         {activeTab === 'technical' && (
           <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
           >
             <motion.h2
               className="text-4xl font-bold text-white mb-12 text-center"
               variants={itemVariants}
             >
               Technical Expertise
             </motion.h2>

             {/* Category Navigation */}
             <nav className="mb-12" role="navigation" aria-label="Skills categories">
               <div className="flex flex-wrap justify-center gap-4">
                 {skillCategories.map((category) => (
                   <motion.button
                     key={category.id}
                     onClick={() => setSelectedSkillCategory(
                       selectedSkillCategory === category.id ? 'all' : category.id
                     )}
                     className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                       selectedSkillCategory === category.id || (category.id === 'all' && !selectedSkillCategory)
                         ? 'bg-white text-black'
                         : 'bg-white/5 text-white/80 hover:bg-white/10'
                     }`}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     data-cursor-target="false"
                     aria-pressed={selectedSkillCategory === category.id || (category.id === 'all' && !selectedSkillCategory)}
                   >
                     <span className="text-lg" aria-hidden="true">{category.icon}</span>
                     <span>{category.name}</span>
                   </motion.button>
                 ))}
               </div>
             </nav>

             {/* Skills Content Area */}
             <div 
               className="relative min-h-[400px]"
               role="region"
               aria-live="polite"
             >
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
               >
                 {(selectedSkillCategory === 'all' 
                   ? Object.values(technicalSkills).flat()
                   : technicalSkills[selectedSkillCategory as keyof typeof technicalSkills]
                 )?.map((skill, index) => (
                   <motion.div
                     key={skill.name}
                     className="group relative"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.05 }}
                   >
                     <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                       <div className="flex items-center justify-between mb-4">
                         <h4 className="text-white font-semibold text-lg">{skill.name}</h4>
                         <div 
                           className="w-4 h-4 rounded-full"
                           style={{ backgroundColor: skill.color }}
                         />
                       </div>
                       
                       <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                           <span className="text-white/60">Proficiency</span>
                           <span className="text-white/80">{skill.level}%</span>
                         </div>
                         <div className="w-full bg-white/10 rounded-full h-2">
                           <motion.div
                             className="h-2 rounded-full"
                             style={{ backgroundColor: skill.color }}
                             initial={{ width: 0 }}
                             animate={{ width: `${skill.level}%` }}
                             transition={{ duration: 1 }}
                           />
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </motion.div>
             </div>
           </motion.div>
         )}

        {/* Certificates */}
        {activeTab === 'certificates' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-12 text-center"
              variants={itemVariants}
            >
              Professional Certificates
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setSelectedCertificate(selectedCertificate === cert.id ? null : cert.id)}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-2">{cert.title}</h3>
                        <p className="text-white/70 text-sm">{cert.issuer}</p>
                      </div>
                      <span className="text-white/50 text-sm">{cert.date}</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4">{cert.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {selectedCertificate === cert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-4"
                      >
                        <p className="text-white/60 text-sm">
                          <strong>Credential ID:</strong> {cert.credentialId}
                        </p>
                        <Button
                          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          View Certificate
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Soft Skills */}
        {activeTab === 'soft' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-12 text-center"
              variants={itemVariants}
            >
              Soft Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <SoftSkillCard key={index} skill={skill} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/">
            <Button
              className="bg-white text-black hover:bg-white/90 px-8 py-3 text-lg font-semibold"
              data-cursor-target="true"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
