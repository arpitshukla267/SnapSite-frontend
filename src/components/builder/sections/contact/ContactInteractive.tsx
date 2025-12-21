"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function ContactInteractive({
  title = "Let's Start a Conversation",
  subtitle = "Have a project in mind? We're here to help bring your vision to life.",
  email = "contact@example.com",
  phone = "+1 (555) 123-4567",
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  accentColor = "#4f46e5",
  buttonBackground = "#4f46e5",
  buttonTextColor = "#ffffff",
}: {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            background: `radial-gradient(circle at 30% 50%, ${accentColor}40, transparent 50%), radial-gradient(circle at 70% 50%, #ec489940, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 @lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          {[
            { icon: "📧", label: "Email", value: email, field: "email", color: accentColor },
            { icon: "📞", label: "Phone", value: phone, field: "phone", color: "#ec4899" },
            { icon: "💬", label: "Chat", value: "Available 24/7", field: "chat", color: "#10b981" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group relative p-8 rounded-3xl backdrop-blur-md border overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => onEdit?.(item.field)}
            >
              {/* Hover Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${item.color}40, transparent)`,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: titleColor }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: subtitleColor }}
                >
                  <TextEditable onClick={() => onEdit?.(item.field)}>
                    {item.value}
                  </TextEditable>
                </p>
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: `2px solid ${item.color}`,
                  opacity: 0,
                }}
                whileHover={{ opacity: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2
            className="text-4xl @md:text-5xl font-extrabold mb-4"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </p>
          <motion.button
            className="px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300"
            style={{
              background: buttonBackground,
              color: buttonTextColor,
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
