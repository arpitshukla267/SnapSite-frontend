"use client";
import TextEditable from "../../TextEditable";

export default function CTASimple({ title, subtitle, buttonText, onEdit }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center relative overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 grid-pattern" />

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title */}
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold mb-6 animate-fadeInUp">
          <TextEditable onClick={() => onEdit("title")}>
            {title || "Ready to Get Started?"}
          </TextEditable>
        </h2>

        {/* Subtitle */}
        <p className="text-xl @md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TextEditable onClick={() => onEdit("subtitle")}>
            {subtitle || "Join thousands of satisfied customers who have transformed their business."}
          </TextEditable>
        </p>

        {/* CTA Button */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <button className="group relative px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-2xl hover:scale-110 hover:shadow-white/40 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText || "Start Free Trial"}
              </TextEditable>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

      </div>
    </section>
  );
}
