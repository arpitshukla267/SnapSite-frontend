"use client";
import TextEditable from "../../TextEditable";

export default function HeroVideo({ title, subtitle, buttonText, buttonText2, videoUrl, onEdit }) {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
      
      {/* Background Video or Fallback Image */}
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900" />
      )}

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* Badge */}
        <div className="mb-6 inline-block animate-fadeInUp">
          <span className="px-5 py-2 rounded-full glass-dark text-white text-sm font-semibold shadow-2xl border border-white/30">
            🎥 Experience the Future
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TextEditable onClick={() => onEdit("title")}>
            {title || "Create Stunning Experiences"}
          </TextEditable>
        </h1>

        {/* SUBTITLE */}
        <p className="text-xl @md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <TextEditable onClick={() => onEdit("subtitle")}>
            {subtitle || "Build beautiful, engaging websites with immersive video backgrounds."}
          </TextEditable>
        </p>

        {/* DUAL BUTTONS */}
        <div className="flex flex-col @sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <button className="group relative px-8 py-4 bg-white text-black rounded-2xl text-lg font-semibold shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">
              <TextEditable onClick={() => onEdit("buttonText")}>
                {buttonText || "Get Started"}
              </TextEditable>
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-100 to-purple-100 transition-opacity" />
          </button>

          <button className="px-8 py-4 glass-dark text-white rounded-2xl text-lg font-semibold border border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-105">
            <TextEditable onClick={() => onEdit("buttonText2")}>
              {buttonText2 || "Watch Demo"}
            </TextEditable>
          </button>
        </div>

        {/* Video Control Toggle (Optional) */}
        <div 
          className="mt-8 text-white/70 text-sm cursor-pointer hover:text-white transition animate-fadeInUp" 
          style={{ animationDelay: '0.4s' }}
          onClick={() => onEdit("videoUrl")}
        >
          📹 Change Background Video
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
      
    </section>
  );
}
