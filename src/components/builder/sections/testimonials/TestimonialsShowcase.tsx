"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function TestimonialsShowcase({
  title = "Trusted by Thousands",
  subtitle = "See what our customers have to say about their experience",
  testimonials = [],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{ name: string; role: string; text: string; image: string; rating?: number }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultTestimonials = [
    {
      name: "John Smith",
      role: "Founder, StartupCo",
      text: "The best investment we've made. Our website looks professional and converts visitors into customers.",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
    },
    {
      name: "Lisa Anderson",
      role: "Marketing Director",
      text: "Incredibly easy to use and the results speak for themselves. Our traffic has increased by 300%!",
      image: "https://i.pravatar.cc/150?img=47",
      rating: 5,
    },
    {
      name: "Robert Taylor",
      role: "E-commerce Owner",
      text: "Fast, reliable, and beautiful. Everything we needed in one platform. Highly recommend!",
      image: "https://i.pravatar.cc/150?img=33",
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
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}30, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
            const cardBg = cardColor.backgroundColor || "rgba(255, 255, 255, 0.05)";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl backdrop-blur-md border shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity blur-xl -z-10"
                  style={{ background: accentColor }}
                />

                {/* Quote Icon */}
                <motion.div
                  className="absolute top-6 right-6 text-7xl opacity-10"
                  style={{ color: cardHeaderColor }}
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  "
                </motion.div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-xl"
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
                  className="text-lg leading-relaxed mb-8 relative z-10 italic"
                  style={{ color: cardParagraphColor }}
                >
                  <TextEditable onClick={() => onEdit?.("text", index, "testimonial")}>
                    "{testimonial.text}"
                  </TextEditable>
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2"
                    style={{ borderColor: accentColor }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.("image", index, "testimonial");
                    }}
                  />
                  <div>
                    <div
                      className="font-bold text-lg"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
