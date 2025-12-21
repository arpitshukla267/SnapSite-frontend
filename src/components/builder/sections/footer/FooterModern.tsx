"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function FooterModern({
  companyName = "YourBrand",
  description = "Building the future of web design, one website at a time.",
  links = {
    product: ["Features", "Pricing", "Updates", "Roadmap"],
    company: ["About", "Blog", "Careers", "Contact"],
    resources: ["Documentation", "Support", "API", "Community"],
  },
  socialLinks = ["Twitter", "LinkedIn", "GitHub"],
  onEdit,
  backgroundColor = "#0f172a",
  textColor = "#ffffff",
  linkColor = "#94a3b8",
  accentColor = "#4f46e5",
}: {
  companyName?: string;
  description?: string;
  links?: {
    product?: string[];
    company?: string[];
    resources?: string[];
  };
  socialLinks?: string[];
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  textColor?: string;
  linkColor?: string;
  accentColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${textColor} 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            className="@lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: textColor }}
            >
              <TextEditable onClick={() => onEdit?.("companyName")}>
                {companyName}
              </TextEditable>
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: linkColor }}
            >
              <TextEditable onClick={() => onEdit?.("description")}>
                {description}
              </TextEditable>
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: textColor,
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, linkList], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + colIndex * 0.1, duration: 0.6 }}
            >
              <h4
                className="text-sm font-semibold mb-4 uppercase tracking-wider"
                style={{ color: textColor }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {linkList?.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + colIndex * 0.1 + index * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-sm transition-colors hover:underline inline-block"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = textColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                      onClick={() => onEdit?.(`link-${category}-${index}`)}
                    >
                      <TextEditable onClick={() => onEdit?.(`link-${category}-${index}`)}>
                        {link}
                      </TextEditable>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-8"
          style={{
            background: `linear-gradient(to right, transparent, ${linkColor}40, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.div
          className="flex flex-col @md:flex-row justify-between items-center text-sm"
          style={{ color: linkColor }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 @md:mt-0">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
