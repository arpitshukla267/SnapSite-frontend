"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function AboutShowcase({
  title = "We Build Digital Experiences",
  subtitle = "Crafting beautiful, functional websites that drive results",
  description = "Our team combines creativity with technical expertise to deliver solutions that not only look great but perform exceptionally. We believe in the power of design to transform businesses.",
  image = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  features = [
    { icon: "🎨", title: "Creative Design", desc: "Unique and modern designs" },
    { icon: "⚡", title: "Fast Performance", desc: "Lightning-fast load times" },
    { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security" },
  ],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  descriptionColor = "#94a3b8",
  accentColor = "#4f46e5",
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  features?: Array<{ icon: string; title: string; desc: string }>;
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  accentColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${accentColor}, transparent)`,
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, #ec4899, transparent)`,
            bottom: "-10%",
            right: "-10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            About Us
          </motion.span>

          <motion.h2
            className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-4"
            style={{ color: titleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>

          <motion.p
            className="text-xl @md:text-2xl mb-6"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>

          <motion.p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: descriptionColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <TextEditable onClick={() => onEdit?.("description")}>
              {description}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Image and Features Grid */}
        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <motion.img
                src={image}
                alt="About"
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onClick={() => onEdit?.("image")}
              />
              
              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8"
              >
                <p className="text-white text-lg">
                  <TextEditable onClick={() => onEdit?.("description")}>
                    {description}
                  </TextEditable>
                </p>
              </motion.div>
            </div>

            {/* Decorative Border */}
            <div
              className="absolute -inset-4 rounded-3xl border-2 opacity-50"
              style={{ borderColor: accentColor }}
            />
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            {features?.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-md border group cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="text-4xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: titleColor }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: descriptionColor }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                  <motion.div
                    className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accentColor }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
