"use client";
import { useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function PortfolioModern({
  title = "Our Portfolio",
  subtitle = "Showcasing our best work",
  projects = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  projects?: Array<{ title: string; category: string; image: string; description: string }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      description: "Modern online shopping experience"
    },
    {
      title: "Brand Identity",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Complete branding package"
    },
    {
      title: "Mobile App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      description: "iOS and Android fitness tracker"
    },
    {
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Analytics platform interface"
    },
    {
      title: "Marketing Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description: "High-converting landing page"
    },
    {
      title: "Logo Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      description: "Minimalist corporate identity"
    }
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section
      ref={ref}
      className="py-24 @md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #4f46e5, transparent)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl @sm:text-5xl @md:text-6xl font-extrabold mb-6"
            style={{ color: titleColor }}
            whileHover={{ scale: 1.02 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-xl @md:text-2xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-8">
          {items.map((project, index) => {
            const cardColor = cardColors[index] || {};
            const cardHeaderColor = cardColor.headerColor || "#ffffff";
            const cardSubheaderColor = cardColor.subheaderColor || "rgba(255,255,255,0.9)";
            const cardParagraphColor = cardColor.paragraphColor || "rgba(255,255,255,0.8)";

            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onEdit?.("projects", index)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Overlay */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.h3
                          className="text-2xl font-bold mb-2"
                          style={{ color: cardHeaderColor }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <TextEditable onClick={() => onEdit?.("projects", index)}>
                            {project.title}
                          </TextEditable>
                        </motion.h3>
                        <motion.p
                          className="text-sm mb-2"
                          style={{ color: cardSubheaderColor }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <TextEditable onClick={() => onEdit?.("projects", index)}>
                            {project.category}
                          </TextEditable>
                        </motion.p>
                        <motion.p
                          className="text-sm"
                          style={{ color: cardParagraphColor }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <TextEditable onClick={() => onEdit?.("projects", index)}>
                            {project.description}
                          </TextEditable>
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

