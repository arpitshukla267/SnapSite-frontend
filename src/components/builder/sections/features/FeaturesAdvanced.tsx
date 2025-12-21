"use client";
import { useEffect, useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Shield, Rocket } from "lucide-react";
import React from "react";

const defaultIcons = [Sparkles, Zap, Shield, Rocket];

export default function FeaturesAdvanced({
  title = "Our Features",
  subtitle = "Everything you need to succeed",
  items = [],
  enableHoverEffects = true,
  enableSequentialReveal = true,
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  iconColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  items?: Array<{ title: string; desc: string; icon?: string }>;
  enableHoverEffects?: boolean;
  enableSequentialReveal?: boolean;
  onEdit?: (field: string, cardIndex?: number, cardType?: string) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  iconColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; paragraphColor?: string; iconColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultItems = [
    { title: "Lightning Fast Performance", desc: "Optimized for speed and efficiency", icon: "sparkles" },
    { title: "Drag & Drop Builder", desc: "Easy to use interface for everyone", icon: "zap" },
    { title: "Responsive Design", desc: "Look perfect on any device", icon: "shield" },
    { title: "SEO Optimized", desc: "Rank higher on search engines", icon: "rocket" }
  ];

  const features = items.length > 0 ? items : defaultItems;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section 
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
      ref={ref}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={enableSequentialReveal && isInView ? "visible" : "visible"}
        variants={enableSequentialReveal ? containerVariants : undefined}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={enableSequentialReveal ? itemVariants : undefined}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: titleColor }}
            whileHover={enableHoverEffects ? { scale: 1.02 } : {}}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            variants={enableSequentialReveal ? {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
            } : undefined}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // Get icon component based on feature.icon or default
            const iconName = feature.icon || ["sparkles", "zap", "shield", "rocket"][index % 4];
            const iconMap: Record<string, React.ComponentType<any>> = {
              sparkles: Sparkles,
              zap: Zap,
              shield: Shield,
              rocket: Rocket,
            };
            const IconComponent = iconMap[iconName] || defaultIcons[index % defaultIcons.length];
            
            // Get card colors for this index
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardIconColor = cardColor.iconColor || iconColor;

            return (
              <motion.div
                key={index}
                className="group relative"
                variants={enableSequentialReveal ? itemVariants : undefined}
                whileHover={enableHoverEffects ? { y: -8, scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div 
                  className="relative p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 h-full cursor-pointer"
                  style={{ backgroundColor: cardBg }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.("title", index, "item");
                  }}
                >
                  {/* Edit Indicator on Hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-md shadow-lg">
                      Click to Edit
                    </div>
                  </div>

                  {/* Icon with Animation */}
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 cursor-pointer relative z-10"
                    style={{
                      background: cardIconColor
                    }}
                    whileHover={enableHoverEffects ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.("icon", index, "item");
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                    <h3
                      className="text-xl font-bold mb-3 cursor-pointer hover:text-purple-600 transition-colors"
                      style={{ color: cardHeaderColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.("title", index, "item");
                      }}
                    >
                      <TextEditable onClick={() => {
                        onEdit?.("title", index, "item");
                      }}>
                        {feature.title}
                      </TextEditable>
                    </h3>
                    <p
                      className="leading-relaxed cursor-pointer hover:text-purple-600 transition-colors"
                      style={{ color: cardParagraphColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.("desc", index, "item");
                      }}
                    >
                      <TextEditable onClick={() => {
                        onEdit?.("desc", index, "item");
                      }}>
                        {feature.desc}
                      </TextEditable>
                    </p>
                  </div>

                  {/* Hover Gradient Overlay */}
                  {enableHoverEffects && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

