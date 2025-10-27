'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
// import Link from 'next/link';

// Technical Skills Data
const technicalSkills = {
  languages: [
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Java', level: 75, color: '#ED8B00' },
    { name: 'PHP', level: 65, color: '#777BB4' },
    { name: 'Visual Basic', level: 60, color: '#5C2D91' },
  ],
  frontend: [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'Next.js', level: 90, color: '#000000' },
    { name: 'HTML', level: 95, color: '#E34F26' },
    { name: 'CSS', level: 90, color: '#1572B6' },
    { name: 'Tailwind CSS', level: 85, color: '#06B6D4' },
    { name: 'shadcn', level: 70, color: '#999999' },
    { name: 'Electron', level: 70, color: '#47848F' },
  ],
  backend: [
    { name: 'Node.js', level: 85, color: '#339933' },
  ],
  databases: [
    { name: 'PostgreSQL', level: 80, color: '#336791' },
    { name: 'MySQL', level: 75, color: '#4479A1' },
  ],
  tools: [
    { name: 'AWS', level: 70, color: '#FF9900' },
    { name: 'Bash', level: 70, color: '#4EAA25' },
    { name: 'Digital Ocean', level: 70, color: '#0080FF' },
    { name: 'Docker', level: 75, color: '#2496ED' },
    { name: 'Figma', level: 75, color: '#F24E1E' },
    { name: 'Git', level: 85, color: '#F05032' },
    { name: 'GitHub', level: 85, color: '#181717' },
    { name: 'Google Cloud', level: 70, color: '#4285F4' },
    { name: 'Ubuntu', level: 70, color: '#E95420' },
    { name: 'Vercel', level: 80, color: '#000000' },
    { name: 'VS Code', level: 90, color: '#007ACC' },
  ],
};

// Map skill names to logo assets in public/skills_logo
const skillLogoMap: Record<string, string> = {
  javascript: '/skills_logo/javascript.png',
  typescript: '/skills_logo/typescript.png',
  java: '/skills_logo/java.png',
  php: '/skills_logo/php.png',
  'visual basic': '/skills_logo/visual-basic.png',
  react: '/skills_logo/react.png',
  'nextjs': '/skills_logo/nextjs.png',
  'next.js': '/skills_logo/nextjs.png',
  html: '/skills_logo/html.png',
  css: '/skills_logo/css.png',
  'tailwindcss': '/skills_logo/tailwindcss.png',
  shadcn: '/skills_logo/shadcn.png',
  electron: '/skills_logo/electron.png',
  'node.js': '/skills_logo/nodeJs.png',
  nodejs: '/skills_logo/node.png',
  postgresql: '/skills_logo/postgresql.png',
  mysql: '/skills_logo/mysql.png',
  aws: '/skills_logo/aws.png',
  bash: '/skills_logo/bash.png',
  'digital ocean': '/skills_logo/digital-ocean.png',
  docker: '/skills_logo/docker.png',
  figma: '/skills_logo/figma.png',
  git: '/skills_logo/git.png',
  github: '/skills_logo/github.png',
  'google cloud': '/skills_logo/google-cloud.png',
  ubuntu: '/skills_logo/ubuntu.png',
  vercel: '/skills_logo/vercel.png',
  'vs code': '/skills_logo/visual-studio-code.png',
  vscode: '/skills_logo/visual-studio-code.png',
  'visual studio code': '/skills_logo/visual-studio-code.png',
};

function getLogoPath(skillName: string): string | null {
  const key = skillName
    .toLowerCase()
    .replace(/\+/g, '+')
    .replace(/\./g, '.')
    .trim();

  // Try exact key
  if (skillLogoMap[key]) return skillLogoMap[key];

  // Try simplified key without spaces and punctuation
  const simple = key.replace(/[^a-z0-9+]/g, '');
  if (skillLogoMap[simple]) return skillLogoMap[simple];

  // Known aliases
  const aliases: Record<string, string> = {
    'nextjs': 'next.js',
    'nodejs': 'node.js',
    'postgres': 'postgresql',
    'js': 'javascript',
    'ts': 'typescript',
    'tailwind': 'tailwindcss',
    'vue': 'vue.js',
    'css': 'css3',
    'html': 'html5',
  };
  if (aliases[key] && skillLogoMap[aliases[key]]) return skillLogoMap[aliases[key]];
  if (aliases[simple] && skillLogoMap[aliases[simple]]) return skillLogoMap[aliases[simple]];

  return null;
}

const skillCategories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'languages', name: 'Languages', icon: 'code' },
  { id: 'frontend', name: 'Frontend', icon: 'palette' },
  { id: 'backend', name: 'Backend', icon: 'server' },
  { id: 'databases', name: 'Databases', icon: 'database' },
  { id: 'tools', name: 'Tools & Platforms', icon: 'wrench' },
];

// Certificates Data
const certificates = [
  {
    id: 1,
    title: 'Google UX Design',
    issuer: 'Google',
    date: '2024',
    credentialId: 'GOOGLE-UX-2024-001',
    description: 'Design user-centered experiences through research, wireframing, prototyping, and testing.',
    skills: ['UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Figma'],
    image: '/certificates/ux/UX.webp',
    badge: '/certificates/badges/ux.webp',
  },
  {
    id: 5,
    title: 'n8n Workflow Automation',
    issuer: 'n8n',
    date: '2024',
    credentialId: 'N8N-AUTOMATION-2024',
    description: 'Practical automation with n8n: building workflows, APIs, webhooks, and integrations.',
    skills: ['Automation', 'APIs', 'Webhooks', 'Integrations', 'n8n'],
    image: '/certificates/automation/n8n.webp',
  },
  {
    id: 2,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2023',
    credentialId: 'CISCO-GCP-2023-002',
    description: 'Certificate of Course Completion for Google Cloud Professional Developer through Cisco Networking Academy.',
    skills: ['Cybersecurity Fundamentals', 'Threats & Vulnerabilities', 'Network Security'],
    image: '/certificates/cyber/IntroductionToCybersecurity.webp',
    badge: '/certificates/badges/introduction-to-cybersecurity.webp',
  },
  {
    id: 3,
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: '2023',
    credentialId: 'CISCO-NET-2023-003',
    description: 'This certificate is awarded to students who complete the Cisco Networking Academy program.',
    skills: ['Threat Analysis', 'Incident Response', 'Security Monitoring', 'Risk Mitigation'],
    image: '/certificates/cyber/CyberThreat.webp',
    badge: '/certificates/badges/cyber-threat-management.webp',
  },
  {
    id: 4,
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    date: '2023',
    credentialId: 'CISCO-ND-2023-004',
    description: 'Advanced network defense and security protocols certification through Cisco Networking Academy.',
    skills: ['Firewall Configuration', 'IDS/IPS', 'Network Hardening', 'Access Control'],
    image: '/certificates/cyber/NetworkDefense.webp',
    badge: '/certificates/badges/network-defense.webp',
  },
  
];


export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('technical');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  // Smooth scroll progress without triggering React re-renders
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to control navigation text shadow for readability
  const navTextShadow = useTransform(scrollYProgress, [0.05, 0.15], ['none', '0 0 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)']);
  const thumbY = useTransform(scrollYProgress, v => `${v * (96 - 32)}px`);

  const visibleSkills = useMemo(() => {
    const base = selectedSkillCategory === 'all'
      ? (Object.values(technicalSkills).flat())
      : (technicalSkills[selectedSkillCategory as keyof typeof technicalSkills] ?? []);
    // Show only those with mapped logos
    return base.filter((s) => Boolean(getLogoPath(s.name)));
  }, [selectedSkillCategory]);

  // Close preview on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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


  const SkillCard = ({ skill }: { skill: { name: string; level: number; color: string } }) => (
    <motion.div
      className="flex flex-col items-center p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 flex items-center justify-center">
        {getLogoPath(skill.name) ? (
          (() => {
            const logo = getLogoPath(skill.name) as string;
            const lower = skill.name.toLowerCase();
            const needsWhiteBg = lower === 'vercel' || lower === 'shadcn';
            return (
              <div className={needsWhiteBg ? 'w-full h-full flex items-center justify-center bg-white rounded-sm p-1' : 'w-full h-full flex items-center justify-center'}>
                <Image
                  src={logo}
                  alt={skill.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })()
        ) : (
          <div className="w-full h-full rounded-md flex items-center justify-center" style={{ backgroundColor: skill.color + '22' }}>
            <span className="text-white/80 text-sm font-semibold">
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="text-white/90 text-sm md:text-base font-medium text-center">{skill.name}</span>
    </motion.div>
  );


  return (
    <div className="min-h-screen bg-background">
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
                  <Image 
                    src="/assets/eyes.png" 
                    alt="e"
                    width={24}
                    height={24}
                    className="inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 -mx-0.5"
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <Image 
                    src="/assets/eyes.png" 
                    alt="e"
                    width={24}
                    height={24}
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
        <div className="relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'technical', label: 'Technical Skills' },
              { id: 'certificates', label: 'Certificates' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-white bg-transparent'
                    : 'border-transparent text-white/60 hover:text-black bg-transparent'
                }`}
                style={{ textShadow: navTextShadow }}
                data-cursor-target="false"
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
         {/* Technical Skills */}
         {activeTab === 'technical' && (
           <motion.div
             variants={containerVariants}
             initial="hidden"
             animate="visible"
           >
             <motion.h2
               className="text-4xl font-bold text-white mb-12 text-center tracking-[0.2em] uppercase"
               variants={itemVariants}
             >
               T E C H N I C A L &nbsp; E X P E R T I S E
             </motion.h2>

             {/* Category Navigation */}
             <nav className="mb-12" role="navigation" aria-label="Skills categories">
               <div className="flex flex-wrap justify-center gap-3">
                 {skillCategories.map((category) => {
                   const getIcon = (iconName: string) => {
                     const iconClass = "w-4 h-4";
                     switch (iconName) {
                       case 'grid':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                           </svg>
                         );
                       case 'code':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                           </svg>
                         );
                       case 'palette':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                           </svg>
                         );
                       case 'server':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                           </svg>
                         );
                       case 'database':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                           </svg>
                         );
                       case 'wrench':
                         return (
                           <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                         );
                       default:
                         return null;
                     }
                   };

  return (
                     <motion.button
                       key={category.id}
                       onClick={() => setSelectedSkillCategory(
                         selectedSkillCategory === category.id ? 'all' : category.id
                       )}
                       className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
                         selectedSkillCategory === category.id
                           ? 'bg-white text-black border-white shadow-lg shadow-white/25'
                           : 'bg-white/5 text-white/80 hover:bg-white/10 border-white/10 hover:border-white/20'
                       }`}
                       whileHover={{ scale: 1.02, y: -1 }}
                       whileTap={{ scale: 0.98 }}
                       data-cursor-target="false"
                       aria-pressed={selectedSkillCategory === category.id}
                     >
                       <div className={`transition-colors duration-300 ${
                         selectedSkillCategory === category.id ? 'text-black' : 'text-white/60 group-hover:text-white/80'
                       }`}>
                         {getIcon(category.icon)}
                       </div>
                       <span className="text-sm font-semibold">{category.name}</span>
                       {selectedSkillCategory === category.id && (
                         <motion.div
                           className="absolute inset-0 rounded-xl bg-white/10"
                           layoutId="activeCategory"
                           transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                         />
                       )}
                     </motion.button>
                   );
                 })}
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
                 transition={{ duration: 0.5 }}
                 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8"
               >
                {visibleSkills.map((skill) => (
                  <div key={`skill-${skill.name}`} className="group relative">
                    <SkillCard skill={skill} />
                  </div>
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
              className="text-4xl font-bold text-white mb-12 text-center tracking-[0.2em] uppercase"
              variants={itemVariants}
            >
              P R O F E S S I O N A L &nbsp; C E R T I F I C A T E S
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Card
                    className="w-full bg-white/5 border-white/10 p-5 md:p-6 hover:bg-white/10 transition-colors cursor-default"
                   >
                    {cert.image && (
                      <div className="mb-1 -mt-2 -mx-2">
                        <button
                          type="button"
                          onClick={() => setPreviewImage(cert.image!)}
                          className="block w-full cursor-zoom-in group"
                          aria-label={`View ${cert.title} image full size`}
                        >
                          <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-md border border-white/10 group-hover:border-white/20 transition-colors">
                            <Image
                              src={cert.image}
                              alt={`${cert.title} cover`}
                              fill
                              className="absolute inset-0 w-full h-full object-cover object-left-top origin-top-left scale-125 md:scale-150"
                            />
                            {cert.badge && (
                              <Image
                                src={cert.badge}
                                alt={`${cert.title} badge`}
                                width={48}
                                height={48}
                                className="absolute top-2 right-2 w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                              />
                            )}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-black/30" />
                          </div>
                        </button>
                      </div>
                    )}
                    <div className="mt-0.5 mb-2">
                      <h3 className="text-white/95 font-semibold text-lg md:text-xl leading-tight tracking-tight">{cert.title}</h3>
                    </div>
 
                    <div className="flex flex-wrap gap-2 mt-2">
                       {cert.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/15">
                           {skill}
                         </span>
                       ))}
                     </div>
                   </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Custom Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex flex-col items-center">
          <div className="w-1 h-24 bg-gray-700 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute w-3 h-8 bg-gray-400 rounded-full -left-1"
              style={{ y: thumbY }}
            />
          </div>
      </div>
      </div>

      {/* Image Lightbox */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreviewImage(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer"
              onClick={() => setPreviewImage(null)}
              aria-label="Close preview"
            >
              ×
            </button>
            <Image
              src={previewImage}
              alt="Certificate preview"
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
