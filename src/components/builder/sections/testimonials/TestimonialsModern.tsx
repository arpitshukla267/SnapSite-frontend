"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function TestimonialsModern({
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it - hear from our satisfied customers",
  testimonials = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{ name: string; role: string; text: string; image: string; rating?: number }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultTestimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      text: "This platform has completely transformed how we build websites. Absolutely incredible!",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Designer, CreativeStudio",
      text: "The easiest and most powerful website builder I've ever used. Highly recommended!",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartupHub",
      text: "Within minutes I had a beautiful, professional website up and running. Amazing!",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

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
            backgroundImage: `radial-gradient(circle at 2px 2px, ${titleColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
          {items.map((testimonial, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl border shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute top-6 right-6 text-6xl opacity-10"
                  style={{ color: cardHeaderColor }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  "
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-base leading-relaxed mb-6 relative z-10"
                  style={{ color: cardParagraphColor }}
                >
                  <TextEditable onClick={() => onEdit?.("text", index, "testimonial")}>
                    "{testimonial.text}"
                  </TextEditable>
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2"
                    style={{ borderColor: cardHeaderColor }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.("image", index, "testimonial");
                    }}
                  />
                  <div>
                    <div
                      className="font-semibold"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("name", index, "testimonial")}>
                        {testimonial.name}
                      </TextEditable>
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: cardSubheaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("role", index, "testimonial")}>
                        {testimonial.role}
                      </TextEditable>
                    </div>
                  </div>
                </div>

                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${cardHeaderColor}10, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
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
