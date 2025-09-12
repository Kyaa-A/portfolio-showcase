'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Only top-left circle */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border border-white/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-start z-10 pl-8 sm:pl-12 md:pl-16 lg:pl-20">
          <motion.div
            className="space-y-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Row 1 - solid white */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-[0.8] tracking-tight mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              TELL ME WHAT
            </motion.h1>
            {/* Row 2 - mixed: solid and outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className="text-white">YOU WANT </span>
              <span 
                style={{
                  WebkitTextStroke: '3px white',
                  color: 'transparent'
                }}
              >
                WHAT
              </span>
            </motion.h1>
            
            {/* Row 3 - white outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight mb-12"
              style={{
                WebkitTextStroke: '3px white',
                color: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              YOU REALLY
            </motion.h1>
            {/* Row 4 - white outline */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tight"
              style={{
                WebkitTextStroke: '3px white',
                color: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              REALLY WANT
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        className="min-h-screen bg-background flex items-center justify-start pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-4xl">
          <form className="space-y-8">
            {/* Greeting */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hey there,
            </motion.h2>

            {/* Name Field */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-white text-xl sm:text-2xl">My name is</span>
              <input
                type="text"
                placeholder="First & Last Name"
                className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
            </motion.div>

            {/* Company Field */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-white text-xl sm:text-2xl">I work for</span>
              <input
                type="text"
                placeholder="Company Name"
                className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
              <span className="text-white text-xl sm:text-2xl">and</span>
            </motion.div>

            {/* Project Type */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-white text-xl sm:text-2xl">we could use your services for</span>
              <select className="bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl focus:border-white focus:outline-none py-2">
                <option value="" className="bg-background">Type of Project</option>
                <option value="web-design" className="bg-background">Web Design</option>
                <option value="development" className="bg-background">Development</option>
                <option value="branding" className="bg-background">Branding</option>
                <option value="consulting" className="bg-background">Consulting</option>
              </select>
            </motion.div>

            {/* Other Companies */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-white text-xl sm:text-2xl">We already contacted</span>
              <input
                type="number"
                defaultValue="0"
                className="w-20 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl text-center focus:border-white focus:outline-none py-2"
              />
              <span className="text-white text-xl sm:text-2xl">other companies,</span>
            </motion.div>

            {/* Reason */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="text-white text-xl sm:text-2xl block">but I'd like to work with Asnari because</span>
              <input
                type="text"
                placeholder="Reason"
                className="w-full bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
              />
            </motion.div>

            {/* Budget */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="text-white text-xl sm:text-2xl">We'll invest between</span>
              <select className="bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl focus:border-white focus:outline-none py-2">
                <option value="₱250,000 - ₱500,000" className="bg-background">₱250,000 - ₱500,000</option>
                <option value="₱500,000 - ₱750,000" className="bg-background">₱500,000 - ₱750,000</option>
                <option value="₱750,000 - ₱1,250,000" className="bg-background" selected>₱750,000 - ₱1,250,000</option>
                <option value="₱1,250,000 - ₱2,500,000" className="bg-background">₱1,250,000 - ₱2,500,000</option>
                <option value="₱2,500,000+" className="bg-background">₱2,500,000+</option>
              </select>
              <span className="text-white text-xl sm:text-2xl">in this project.</span>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-white text-xl sm:text-2xl">You can reach me at</span>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-xl sm:text-2xl">or get in touch by email at</span>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2"
                />
              </div>
            </motion.div>

            {/* Additional Details */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <span className="text-white text-xl sm:text-2xl block">Details and/or clarifications</span>
              <textarea
                placeholder="Additional information..."
                rows={4}
                className="w-full bg-transparent border-b-2 border-white/30 text-white text-xl sm:text-2xl placeholder-white/50 focus:border-white focus:outline-none py-2 resize-none"
              />
            </motion.div>

            {/* Closing */}
            <motion.div
              className="flex items-center justify-between pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Thanks
              </h2>
              
              {/* Send Button */}
              <motion.button
                type="submit"
                className="w-32 h-32 rounded-full border-2 border-orange-400 flex items-center justify-center text-white font-semibold text-sm hover:bg-orange-400/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div>SEND</div>
                  <div>MESSAGE</div>
                </div>
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
