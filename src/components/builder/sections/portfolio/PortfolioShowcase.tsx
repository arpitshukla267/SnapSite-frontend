"use client";
import { useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function PortfolioShowcase({
  title = "Our Portfolio",
  subtitle = "Showcasing our best work and creative solutions",
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const defaultProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      description: "Modern online shopping experience",
    },
    {
      title: "Brand Identity",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Complete branding package",
    },
    {
      title: "Mobile App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      description: "iOS and Android fitness tracker",
    },
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, ${titleColor} 25%, transparent 25%), linear-gradient(-45deg, ${titleColor} 25%, transparent 25%)`,
            backgroundSize: "60px 60px",
            animation: "patternMove 20s linear infinite",
          }}
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
          <motion.h2
            className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-4"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8">
          {items.map((project, index) => {
            const cardColor = cardColors[index] || {};
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -10 }}
                onClick={() => setSelectedProject(index)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.("image", index, "project");
                    }}
                  />

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                  >
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("title", index, "project")}>
                        {project.title}
                      </TextEditable>
                    </h3>
                    <p
                      className="text-sm mb-2"
                      style={{ color: cardSubheaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("category", index, "project")}>
                        {project.category}
                      </TextEditable>
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: cardParagraphColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("description", index, "project")}>
                        {project.description}
                      </TextEditable>
                    </p>
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-xs font-semibold text-white">
                      <TextEditable onClick={() => onEdit?.("category", index, "project")}>
                        {project.category}
                      </TextEditable>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
}
