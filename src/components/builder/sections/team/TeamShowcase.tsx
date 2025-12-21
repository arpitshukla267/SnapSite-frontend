"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function TeamShowcase({
  title = "Our Amazing Team",
  subtitle = "The people behind our success",
  members = [],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  members?: Array<{ name: string; role: string; image: string; bio: string }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultMembers = [
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "https://i.pravatar.cc/300?img=1",
      bio: "Bringing creative visions to life",
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      image: "https://i.pravatar.cc/300?img=2",
      bio: "Building scalable solutions",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "https://i.pravatar.cc/300?img=3",
      bio: "Crafting beautiful user experiences",
    },
    {
      name: "David Kim",
      role: "Marketing Head",
      image: "https://i.pravatar.cc/300?img=4",
      bio: "Driving growth and engagement",
    },
  ];

  const items = members.length > 0 ? members : defaultMembers;

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
            background: `radial-gradient(circle at 30% 50%, ${accentColor}30, transparent 50%)`,
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-8">
          {items.map((member, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "rgba(255, 255, 255, 0.05)";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || accentColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div
                  className="rounded-3xl overflow-hidden backdrop-blur-md border shadow-2xl transition-all duration-300"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.("image", index, "member");
                      }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    >
                      <p
                        className="text-sm"
                        style={{ color: cardParagraphColor }}
                      >
                        <TextEditable onClick={() => onEdit?.("bio", index, "member")}>
                          {member.bio}
                        </TextEditable>
                      </p>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("name", index, "member")}>
                        {member.name}
                      </TextEditable>
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: cardSubheaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("role", index, "member")}>
                        {member.role}
                      </TextEditable>
                    </p>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity blur-2xl -z-10"
                  style={{ background: accentColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
