"use client";
import { useRef, useState } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function ContactModern({
  title = "Get In Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  email = "hello@example.com",
  phone = "+1 (555) 123-4567",
  address = "123 Business St, City, ST 12345",
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  accentColor = "#4f46e5",
  buttonBackground = "#4f46e5",
  buttonTextColor = "#ffffff",
}: {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
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
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
            backgroundImage: `linear-gradient(45deg, ${accentColor} 25%, transparent 25%), linear-gradient(-45deg, ${accentColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${accentColor} 75%), linear-gradient(-45deg, transparent 75%, ${accentColor} 75%)`,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
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

        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { icon: "📧", label: "Email", value: email, field: "email" },
              { icon: "📞", label: "Phone", value: phone, field: "phone" },
              { icon: "📍", label: "Address", value: address, field: "address" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl backdrop-blur-md border group cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                }}
                whileHover={{ scale: 1.05, x: 10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => onEdit?.(item.field)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${accentColor}20` }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div
                      className="font-semibold mb-1"
                      style={{ color: titleColor }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: subtitleColor }}
                    >
                      <TextEditable onClick={() => onEdit?.(item.field)}>
                        {item.value}
                      </TextEditable>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="p-8 rounded-3xl shadow-2xl border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <form className="space-y-6">
              {[
                { name: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
                { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
                { name: "message", label: "Message", placeholder: "Your message...", type: "textarea" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: titleColor }}
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={5}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all"
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        focusRingColor: accentColor,
                      }}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all"
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        focusRingColor: accentColor,
                      }}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300"
                style={{
                  background: buttonBackground,
                  color: buttonTextColor,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
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
