"use client";
import { useState, useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function PortfolioAdvanced({
  title = "Our Portfolio",
  subtitle = "Showcasing our best work",
  projects = [],
  enableHoverOverlays = true,
  enableModalPreview = false,
  enableLazyLoading = true,
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  projects?: Array<{ title: string; category: string; image: string; description: string; link?: string }>;
  enableHoverOverlays?: boolean;
  enableModalPreview?: boolean;
  enableLazyLoading?: boolean;
  onEdit?: (field: string, cardIndex?: number, cardType?: string) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      description: "Modern online shopping experience",
      link: "#"
    },
    {
      title: "Brand Identity",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Complete branding package for startup",
      link: "#"
    },
    {
      title: "Mobile App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      description: "iOS and Android fitness tracker",
      link: "#"
    },
    {
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Analytics platform interface",
      link: "#"
    },
    {
      title: "Marketing Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description: "High-converting landing page",
      link: "#"
    },
    {
      title: "Logo Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      description: "Minimalist corporate identity",
      link: "#"
    }
  ];

  // Ensure items is always an array
  const items = Array.isArray(projects) && projects.length > 0 ? projects : defaultProjects;

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section
        ref={ref}
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "visible"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{ color: titleColor }}
            >
              <TextEditable onClick={() => onEdit?.("title")}>
                {title}
              </TextEditable>
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: subtitleColor }}
            >
              <TextEditable onClick={() => onEdit?.("subtitle")}>
                {subtitle}
              </TextEditable>
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, index) => {
              // Get card colors for this index
              const cardColor = cardColors[index] || {};
              const cardHeaderColor = cardColor.headerColor || "#ffffff";
              const cardSubheaderColor = cardColor.subheaderColor || "rgba(255,255,255,0.9)";
              const cardParagraphColor = cardColor.paragraphColor || "rgba(255,255,255,0.8)";

              return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                variants={itemVariants}
                whileHover={enableHoverOverlays ? { scale: 1.02 } : {}}
              >
                {/* Image */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-gray-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.("image", index, "project");
                  }}
                >
                  {enableLazyLoading ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Hover Overlay */}
                  {enableHoverOverlays && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <h3
                        className="text-xl font-bold mb-2 cursor-pointer"
                        style={{ color: cardHeaderColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}
                      >
                        <TextEditable onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}>
                          {project.title}
                        </TextEditable>
                      </h3>
                      <p
                        className="text-sm mb-2 cursor-pointer"
                        style={{ color: cardSubheaderColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}
                      >
                        <TextEditable onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}>
                          {project.category}
                        </TextEditable>
                      </p>
                      <p
                        className="text-sm cursor-pointer"
                        style={{ color: cardParagraphColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}
                      >
                        <TextEditable onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.("projects", index, "project");
                        }}>
                          {project.description}
                        </TextEditable>
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-white transition-colors"
                      style={{
                        color: "white",
                        "--hover-color": "var(--theme-secondary, #ec4899)"
                      } as React.CSSProperties & { "--hover-color": string }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--theme-secondary, #ec4899)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "white"}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-sm font-semibold">View Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </motion.div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

    </>
  );
}

