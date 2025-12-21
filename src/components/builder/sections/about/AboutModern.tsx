"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function AboutModern({
  title = "About Our Company",
  description = "We are a team of passionate designers and developers dedicated to creating exceptional digital experiences. With years of experience and a commitment to innovation, we help businesses transform their ideas into reality.",
  image = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
  ],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  descriptionColor = "#64748b",
  accentColor = "#4f46e5",
}: {
  title?: string;
  description?: string;
  image?: string;
  stats?: Array<{ number: string; label: string }>;
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  titleColor?: string;
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
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${titleColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: "patternMove 20s linear infinite",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with hover effect */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {/* Gradient Overlay on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              />
              
              <motion.img
                src={image}
                alt="About"
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                onClick={() => onEdit?.("image")}
              />

              {/* Floating Badge */}
              <motion.div
                className="absolute top-8 right-8 px-6 py-3 rounded-full backdrop-blur-md border z-20"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: accentColor,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm font-bold" style={{ color: accentColor }}>
                  Since 2014
                </span>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: accentColor }}
            />
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
              style={{ backgroundColor: accentColor }}
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                Our Story
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-6"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title}
              </TextEditable>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed mb-8"
              style={{ color: descriptionColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <TextEditable onClick={() => onEdit?.("description")}>
                {description}
              </TextEditable>
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {stats?.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl backdrop-blur-md border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div
                    className="text-3xl @md:text-4xl font-bold mb-2"
                    style={{ color: accentColor }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: descriptionColor }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </section>
  );
}
