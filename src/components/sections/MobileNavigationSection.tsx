'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function MobileNavigationSection() {
  const navigationItems = [
    {
      title: 'SKILLS',
      href: '/skills',
      number: '01'
    },
    {
      title: 'PROJECTS',
      href: '/projects',
      number: '02'
    },
    {
      title: 'CONTACT',
      href: '/contact',
      number: '03'
    }
  ];

  return (
    <section className="min-h-screen bg-background relative flex items-center justify-center px-6 py-12">
      <div className="w-full space-y-0">
        {/* Navigation Items */}
        <div className="space-y-0">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="border-t border-white/10 first:border-t-0"
            >
              <Link href={item.href}>
                <motion.div
                  className="py-8 px-4 flex items-center justify-between group"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-6">
                    {/* Number */}
                    <span className="text-white/40 text-sm font-medium w-8">
                      {item.number}
                    </span>

                    {/* Title */}
                    <div className="relative overflow-hidden">
                      <motion.h3
                        className="text-3xl font-black text-white tracking-tight"
                        style={{
                          fontFamily: 'Arial, Helvetica, sans-serif',
                          fontWeight: 900,
                          letterSpacing: '0.02em'
                        }}
                      >
                        {item.title}
                      </motion.h3>

                      {/* Underline on hover */}
                      <motion.div
                        className="h-0.5 bg-white mt-1"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="text-white/60 group-hover:text-white transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
