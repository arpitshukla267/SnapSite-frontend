"use client";
import TextEditable from "../../TextEditable";

export default function FooterSimple({ 
  companyName, 
  links = [], 
  socialLinks = [], 
  onEdit,
  backgroundColor = "#0f172a",
  textColor = "#ffffff",
  linkColor = "#94a3b8",
  accentColor = "#4f46e5",
}) {
  const defaultLinks = links.length > 0 ? links : ["About", "Features", "Pricing", "Contact"];
  
  return (
    <footer 
      className="py-12 px-6"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="flex flex-col @md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Logo/Brand */}
          <div 
            className="text-2xl font-bold"
            style={{ color: textColor }}
          >
            <TextEditable onClick={() => onEdit("companyName")}>
              {companyName || "YourBrand"}
            </TextEditable>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            {defaultLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="transition-colors hover:underline"
                style={{ 
                  color: linkColor,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = textColor}
                onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                onClick={() => onEdit(`link-${index}`)}
              >
                <TextEditable onClick={() => onEdit(`link-${index}`)}>
                  {link}
                </TextEditable>
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                background: `rgba(255, 255, 255, 0.1)`,
                color: textColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.2)`}
              onMouseLeave={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.1)`}
            >
              <span>𝕏</span>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                background: `rgba(255, 255, 255, 0.1)`,
                color: textColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.2)`}
              onMouseLeave={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.1)`}
            >
              <span>in</span>
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                background: `rgba(255, 255, 255, 0.1)`,
                color: textColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.2)`}
              onMouseLeave={(e) => e.currentTarget.style.background = `rgba(255, 255, 255, 0.1)`}
            >
              <span>f</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8" />

        {/* Copyright */}
        <div 
          className="text-center text-sm"
          style={{ color: linkColor }}
        >
          © {new Date().getFullYear()} {companyName || "YourBrand"}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
