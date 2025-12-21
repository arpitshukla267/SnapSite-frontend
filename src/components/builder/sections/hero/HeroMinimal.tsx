/**
 * Hero Minimal Section - Layout Only
 * Uses semantic design tokens via primitives
 * No hardcoded colors
 */

"use client";
import TextEditable from "../../TextEditable";
import Heading from "../../../primitives/Heading";
import SubHeading from "../../../primitives/SubHeading";
import Button from "../../../primitives/Button";

export default function HeroMinimal({ 
  title, 
  subtitle, 
  buttonText, 
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  buttonBackground = "#1f2937",
  buttonTextColor = "#ffffff",
  accentColor = "#4f46e5",
}) {
  return (
    <section 
      className="relative py-32 px-6 text-center overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Subtle Grid Background - Layout only */}
      <div className="absolute inset-0 opacity-5 grid-pattern" />
      
      {/* Subtle Gradient Accent - Layout only */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* Title with Stagger Animation */}
        <div className="mb-4 animate-fadeInUp">
          <h1 
            className="text-4xl @sm:text-5xl @md:text-6xl font-extrabold leading-tight"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit("title")}>
              {title}
            </TextEditable>
          </h1>
        </div>

        {/* Animated Accent Line */}
        <div 
          className="w-24 h-1 mx-auto mb-6 rounded-full animate-scaleIn"
          style={{
            background: accentColor
          }}
        />

        {/* Subtitle */}
        <div className="mt-6 mb-10 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <p 
            className="text-lg @md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit("subtitle")}>
              {subtitle}
            </TextEditable>
          </p>
        </div>

        {/* Button with Hover Effect */}
        <div className="mt-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <button 
            className="group relative px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden rounded-lg"
            style={{
              background: buttonBackground,
              color: buttonTextColor,
            }}
          >
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText}
              </TextEditable>
            </span>
            
            {/* Shimmer Effect on Hover - Layout only */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
            </div>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm animate-fadeInUp" style={{ animationDelay: '0.3s', color: subtitleColor }}>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-white text-xs">✓</span>
            </div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Cancel anytime</span>
          </div>
        </div>

      </div>
    </section>
  );
}
