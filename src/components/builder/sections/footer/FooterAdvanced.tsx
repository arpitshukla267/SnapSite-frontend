"use client";
import { motion } from "framer-motion";
import TextEditable from "../../TextEditable";

export default function FooterAdvanced({
  companyName = "YourBrand",
  links = [],
  socialLinks = [],
  onEdit,
  backgroundColor = "#ffffff",
  textColor = "#0f172a",
  linkColor = "#64748b",
  accentColor = "#4f46e5",
}: {
  companyName?: string;
  links?: string[];
  socialLinks?: string[];
  onEdit?: (field: string) => void;
  backgroundColor?: string;
  textColor?: string;
  linkColor?: string;
  accentColor?: string;
}) {
  const defaultLinks = links.length > 0 ? links : ["About", "Features", "Pricing", "Contact"];
  const defaultSocial = ["Twitter", "LinkedIn", "GitHub", "Instagram"];

  return (
    <footer
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid @md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            className="@md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: textColor }}
            >
              <TextEditable onClick={() => onEdit?.("companyName")}>
                {companyName}
              </TextEditable>
            </h3>
            <p className="text-sm mb-6" style={{ color: linkColor }}>
              Creating beautiful digital experiences for modern businesses.
            </p>
            <div className="flex gap-4">
              {defaultSocial.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all"
                  style={{
                    borderColor: linkColor,
                    color: linkColor,
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    borderColor: accentColor,
                    backgroundColor: `${accentColor}10`,
                    color: accentColor,
                  }}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {["Product", "Company", "Legal"].map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h4 className="font-bold mb-4" style={{ color: textColor }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {defaultLinks.slice(catIndex, catIndex + 3).map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                      onClick={() => onEdit?.(`link-${catIndex}-${index}`)}
                    >
                      <TextEditable onClick={() => onEdit?.(`link-${catIndex}-${index}`)}>
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
          style={{ background: `linear-gradient(to right, transparent, ${linkColor}30, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col @md:flex-row justify-between items-center gap-4 text-sm"
          style={{ color: linkColor }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

