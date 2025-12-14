"use client";
import TextEditable from "../../TextEditable";

export default function HeroMinimal({ title, subtitle, buttonText, onEdit }) {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-white text-center overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5 grid-pattern" />
      
      {/* Subtle Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* Title with Stagger Animation */}
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold text-gray-900 mb-4 animate-fadeInUp">
          <TextEditable onClick={() => onEdit("title")}>
            {title}
          </TextEditable>
        </h1>

        {/* Animated Accent Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full animate-scaleIn" />

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 text-lg @md:text-xl leading-relaxed max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TextEditable onClick={() => onEdit("subtitle")}>
            {subtitle}
          </TextEditable>
        </p>

        {/* Button with Hover Effect */}
        <div className="mt-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText}
              </TextEditable>
            </span>
            
            {/* Shimmer Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
            </div>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Cancel anytime</span>
          </div>
        </div>

      </div>
    </section>
  );
}
