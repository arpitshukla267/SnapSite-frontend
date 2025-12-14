"use client";
import TextEditable from "../../TextEditable";

export default function HeroCentered({ title, subtitle, buttonText, buttonText2, onEdit }) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20 grid-pattern" />
      
      {/* Orbiting Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Animated Badge */}
        <div className="mb-8 inline-block animate-scaleIn">
          <span className="px-6 py-3 rounded-full glass text-white text-base font-semibold shadow-2xl border border-white/30">
            ✨ Premium Design System
          </span>
        </div>

        {/* TITLE with Gradient */}
        <h1 className="text-4xl @sm:text-5xl @md:text-7xl @lg:text-8xl font-black text-white mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TextEditable onClick={() => onEdit("title")}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
              {title || "Design That Inspires"}
            </span>
          </TextEditable>
        </h1>

        {/* Decorative Line */}
        <div className="w-32 h-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 animate-scaleIn" style={{ animationDelay: '0.2s' }} />

        {/* SUBTITLE */}
        <p className="text-xl @md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <TextEditable onClick={() => onEdit("subtitle")}>
            {subtitle || "Transform your vision into reality with powerful tools designed for modern creators."}
          </TextEditable>
        </p>

        {/* DUAL BUTTONS */}
        <div className="flex flex-col @sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <button className="group relative px-10 py-5 rounded-2xl text-lg @md:text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText || "Get Started Free"}
              </TextEditable>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="px-10 py-5 rounded-2xl text-lg @md:text-xl font-bold glass-dark text-white border-2 border-white/40 hover:bg-white/20 hover:border-white/70 transition-all duration-300 hover:scale-105">
            <TextEditable onClick={() => onEdit("buttonText2")}>
              {buttonText2 || "View Examples"}
            </TextEditable>
          </button>
        </div>

        {/* Trust Badges / Social Proof */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
            <span>5,000+ reviews</span>
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div>
            <span className="font-semibold text-white">10,000+</span> happy customers
          </div>
          <div className="w-px h-4 bg-white/30" />
          <div>
            Trusted by <span className="font-semibold text-white">500+</span> companies
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-7 h-12 border-2 border-white/40 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-4 bg-white/80 rounded-full animate-pulse" />
        </div>
      </div>

    </section>
  );
}
