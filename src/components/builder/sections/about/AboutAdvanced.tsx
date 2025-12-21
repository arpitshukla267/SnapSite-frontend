"use client";
import { useEffect, useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function AboutAdvanced({ 
  title, 
  description, 
  image,
  enableRevealAnimation = true,
  enableHoverEffects = true,
  onEdit 
}: {
  title?: string;
  description?: string;
  image?: string;
  enableRevealAnimation?: boolean;
  enableHoverEffects?: boolean;
  onEdit?: (field: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        variants={enableRevealAnimation ? containerVariants : undefined}
        initial={enableRevealAnimation ? "hidden" : "visible"}
        animate={enableRevealAnimation && isInView ? "visible" : "visible"}
      >
        {/* Image with Hover Effects */}
        <motion.div
          className="relative group"
          variants={enableRevealAnimation ? itemVariants : undefined}
          onClick={() => onEdit?.("image")}
        >
          {enableHoverEffects && (
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ scale: 1.05 }}
            />
          )}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            whileHover={enableHoverEffects ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image || "/placeholder.png"}
              alt="About"
              className="w-full h-auto object-cover"
            />
            {enableHoverEffects && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-6"
          variants={enableRevealAnimation ? itemVariants : undefined}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900"
            whileHover={enableHoverEffects ? { scale: 1.02 } : {}}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title || "Who We Are"}
            </TextEditable>
          </motion.h2>

          <motion.div
            className="h-1 rounded-full"
            style={{
              background: `linear-gradient(to right, var(--section-primary, #4f46e5), var(--section-secondary, #ec4899))`
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-lg text-gray-600 leading-relaxed"
            variants={enableRevealAnimation ? {
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.4 } }
            } : undefined}
          >
            <TextEditable onClick={() => onEdit?.("description")}>
              {description || "We are a team of passionate creators, innovators, and problem solvers dedicated to building amazing experiences."}
            </TextEditable>
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 pt-6"
            variants={enableRevealAnimation ? {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.6, staggerChildren: 0.1 }
              }
            } : undefined}
          >
            {[
              { value: "10K+", label: "Users" },
              { value: "500+", label: "Projects" },
              { value: "50+", label: "Awards" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={enableRevealAnimation ? {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                } : undefined}
                whileHover={enableHoverEffects ? { scale: 1.1 } : {}}
              >
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

