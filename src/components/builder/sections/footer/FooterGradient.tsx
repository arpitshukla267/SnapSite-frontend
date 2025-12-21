"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function FooterGradient({
  companyName = "YourBrand",
  tagline = "Building amazing digital experiences",
  links = ["About", "Features", "Pricing", "Contact"],
  socialLinks = ["Twitter", "LinkedIn", "GitHub", "Instagram"],
  onEdit,
  backgroundColor = "#0f172a",
  gradientColors,
  textColor = "#ffffff",
  linkColor = "#cbd5e1",
  accentColor = "#4f46e5",
}: {
  companyName?: string;
  tagline?: string;
  links?: string[];
  socialLinks?: string[];
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  gradientColors?: string[];
  textColor?: string;
  linkColor?: string;
  accentColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundStyle = gradientColors && gradientColors.length >= 2
    ? {
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
      }
    : { backgroundColor };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-3xl font-bold mb-3"
              style={{ color: textColor }}
            >
              <TextEditable onClick={() => onEdit?.("companyName")}>
                {companyName}
              </TextEditable>
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: linkColor }}
            >
              <TextEditable onClick={() => onEdit?.("tagline")}>
                {tagline}
              </TextEditable>
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: textColor }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href="#"
                    className="text-sm transition-colors inline-block"
                    style={{ color: linkColor }}
                    onMouseEnter={(e) => e.currentTarget.style.color = textColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                    onClick={() => onEdit?.(`link-${index}`)}
                  >
                    <TextEditable onClick={() => onEdit?.(`link-${index}`)}>
                      {link}
                    </TextEditable>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: textColor }}
            >
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="px-4 py-2 rounded-full backdrop-blur-md border text-sm transition-all"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: textColor,
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm pt-8 border-t"
          style={{
            color: linkColor,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

