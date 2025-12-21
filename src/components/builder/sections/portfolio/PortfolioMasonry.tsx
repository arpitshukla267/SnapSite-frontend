"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function PortfolioMasonry({
  title = "Our Work",
  subtitle = "A collection of our finest projects",
  projects = [],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
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

  const defaultProjects = [
    { title: "Project 1", category: "Web", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Description 1" },
    { title: "Project 2", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Description 2" },
    { title: "Project 3", category: "App", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "Description 3" },
    { title: "Project 4", category: "Brand", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", description: "Description 4" },
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(79, 70, 229, 0.2), transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
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

        {/* Masonry Grid */}
        <div className="columns-1 @md:columns-2 @lg:columns-3 gap-8">
          {items.map((project, index) => {
            const cardColor = cardColors[index] || {};
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="mb-8 break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.("image", index, "project");
                    }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                  >
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("title", index, "project")}>
                        {project.title}
                      </TextEditable>
                    </h3>
                    <p
                      className="text-xs mb-2"
                      style={{ color: cardSubheaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("category", index, "project")}>
                        {project.category}
                      </TextEditable>
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: cardParagraphColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("description", index, "project")}>
                        {project.description}
                      </TextEditable>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

