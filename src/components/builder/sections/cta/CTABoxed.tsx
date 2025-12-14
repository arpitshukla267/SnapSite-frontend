"use client";
import TextEditable from "../../TextEditable";

export default function CTABoxed({ title, subtitle, buttonText, onEdit }) {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Card Container */}
        <div className="relative group">
          
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-500" />
          
          {/* Main Card */}
          <div className="relative glass-card rounded-3xl p-8 @md:p-16 text-center shadow-2xl hover:shadow-purple-500/30 transition-all animate-scaleIn">
            
            {/* Icon or Badge */}
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-float">
                🚀
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-white mb-6">
              <TextEditable onClick={() => onEdit("title")}>
                {title || "Start Building Today"}
              </TextEditable>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              <TextEditable onClick={() => onEdit("subtitle")}>
                {subtitle || "Everything you need to create stunning websites in one powerful platform."}
              </TextEditable>
            </p>

            {/* CTA Button */}
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText || "Try It Free"}
              </TextEditable>
            </button>

            {/* Trust Indicator */}
            <p className="mt-6 text-white/60 text-sm">
              ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
