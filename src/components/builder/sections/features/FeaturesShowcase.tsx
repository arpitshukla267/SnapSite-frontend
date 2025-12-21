"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function FeaturesShowcase({
  title = "Powerful Features",
  subtitle = "Everything you need to build and grow your online presence",
  items = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  items?: Array<{ title: string; desc: string; icon?: string }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; paragraphColor?: string; iconColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultItems = [
    { title: "Drag & Drop Builder", desc: "Intuitive interface for easy customization", icon: "🎨" },
    { title: "Responsive Design", desc: "Perfect on all devices and screen sizes", icon: "📱" },
    { title: "SEO Optimized", desc: "Built-in SEO tools for better rankings", icon: "🔍" },
    { title: "Fast Performance", desc: "Lightning-fast load times and optimization", icon: "⚡" },
  ];

  const features = items.length > 0 ? items : defaultItems;

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
            backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor} 1px, transparent 0)`,
            backgroundSize: "30px 30px",
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardIconColor = cardColor.iconColor || accentColor;

            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl border shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${cardIconColor}20, transparent)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 relative z-10"
                  style={{
                    backgroundColor: `${cardIconColor}20`,
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon || "✨"}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: cardHeaderColor }}
                  >
                    <TextEditable onClick={() => onEdit?.(`items-${index}-title`, index)}>
                      {feature.title}
                    </TextEditable>
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: cardParagraphColor }}
                  >
                    <TextEditable onClick={() => onEdit?.(`items-${index}-desc`, index)}>
                      {feature.desc}
                    </TextEditable>
                  </p>
                </div>

                {/* Decorative Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ backgroundColor: cardIconColor }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
      `}</style>
    </section>
  );
}
