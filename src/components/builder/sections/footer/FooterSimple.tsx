"use client";
import TextEditable from "../../TextEditable";

export default function FooterSimple({ companyName, links = [], socialLinks = [], onEdit }) {
  const defaultLinks = links.length > 0 ? links : ["About", "Features", "Pricing", "Contact"];
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="flex flex-col @md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Logo/Brand */}
          <div className="text-2xl font-bold gradient-text-blue">
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
                className="text-gray-300 hover:text-white transition-colors hover:underline"
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
            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <span>𝕏</span>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <span>in</span>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
              <span>f</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} {companyName || "YourBrand"}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
