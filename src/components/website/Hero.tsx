"use client";

import React from "react";
import Starfield from "../ui/Starfield";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">

      {/* Animated Background */}
      <Starfield />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Badge */}
          <motion.div 
            className="mb-6 inline-block"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="px-4 py-2 rounded-full glass text-white text-sm font-medium border border-white/20 shadow-lg backdrop-blur-xl bg-white/5">
              ✨ The Future of Web Building
            </span>
          </motion.div>

          {/* Gradient Heading with Animation */}
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
          >
            Build Production-Ready Websites{" "}
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 animate-gradient-slow"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Without Touching Code
            </motion.span>
          </motion.h1>

          {/* Subtext with Animation */}
          <motion.p 
            className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
          >
            Drag, drop, and publish powerful websites with AI-assisted templates,
            zero-cost deployment, and a dashboard fine-tuned for speed and simplicity.
          </motion.p>

          {/* CTA Buttons with Animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/login"
                className="group relative px-8 py-4 rounded-xl text-lg font-semibold 
                bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 
                hover:from-indigo-400 hover:via-purple-500 hover:to-pink-400 
                transition-all duration-300 text-white shadow-xl shadow-indigo-900/50
                hover:shadow-2xl hover:shadow-purple-800/60
                overflow-hidden inline-block"
              >
                <span className="relative z-10">Get Started Free</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/templates"
                className="px-8 py-4 rounded-xl text-lg font-semibold 
                glass-dark text-white
                hover:bg-white/20 transition-all duration-300
                border border-white/30 hover:border-white/50
                inline-block backdrop-blur-xl"
              >
                Browse Templates
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats or Features */}
          <motion.div 
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
          >
            {[
              { value: "50+", label: "Templates", gradient: "gradient-text-blue" },
              { value: "100+", label: "Components", gradient: "gradient-text" },
              { value: "10k+", label: "Users", gradient: "gradient-text-pink" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.gradient}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default Hero;
