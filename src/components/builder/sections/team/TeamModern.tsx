"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function TeamModern({
  title = "Meet Our Team",
  subtitle = "Talented individuals working together to build amazing products",
  members = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
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
      name: "Alex Thompson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/300?img=11",
      bio: "Visionary leader with 15+ years in tech",
    },
    {
      name: "Jamie Lee",
      role: "Head of Design",
      image: "https://i.pravatar.cc/300?img=5",
      bio: "Award-winning designer passionate about UX",
    },
    {
      name: "Morgan Davis",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/300?img=13",
      bio: "Full-stack expert building scalable solutions",
    },
    {
      name: "Casey Martinez",
      role: "Product Manager",
      image: "https://i.pravatar.cc/300?img=9",
      bio: "Strategic thinker driving product innovation",
    },
  ];

  const items = members.length > 0 ? members : defaultMembers;

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
            backgroundImage: `radial-gradient(circle at 2px 2px, ${accentColor} 1px, transparent 0)`,
            backgroundSize: "50px 50px",
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-8">
          {items.map((member, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || accentColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div
                  className="rounded-3xl overflow-hidden shadow-xl border transition-all duration-300"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.("image", index, "member");
                      }}
                    />

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                    >
                      <p
                        className="text-sm"
                        style={{ color: cardParagraphColor }}
                      >
                        <TextEditable onClick={() => onEdit?.("bio", index)}>
                          {member.bio}
                        </TextEditable>
                      </p>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("name", index, "member")}>
                        {member.name}
                      </TextEditable>
                    </h3>
                    <p
                      className="font-medium"
                      style={{ color: cardSubheaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("role", index, "member")}>
                        {member.role}
                      </TextEditable>
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: accentColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  );
}
