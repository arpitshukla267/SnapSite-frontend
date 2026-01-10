"use client";
import TextEditable from "../../TextEditable";
import { ParticleStars, ParticleFloating, ParticleBubbles, ParticleDots, ParticleWaves } from "../../../ui/particles";

export default function HeroGradient({ 
  title, 
  subtitle, 
  buttonText, 
  block1Image, 
  block2Image, 
  block3Image,
  block1Icon,
  block2Icon,
  block3Icon,
  onEdit,
  particleType = "bubbles",
  particleColor = "255, 255, 255",
  particleOpacity = 0.2,
}) {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 animate-gradient-slow"
        style={{
          background: `linear-gradient(135deg, var(--section-primary, #4f46e5) 0%, var(--section-secondary, #ec4899) 50%, var(--section-accent, #f59e0b) 100%)`
        }}
      />
      
      {/* Floating Decorative Blobs */}
      <div className="blob1" style={{ filter: 'blur(100px)' }} />
      <div className="blob2" style={{ filter: 'blur(100px)' }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 grid-pattern" />

      {/* Particle Background Animation */}
      {particleType !== "none" && (
        <>
          {particleType === "stars" && <ParticleStars count={100} speed={0.2} color={particleColor} opacity={particleOpacity} />}
          {particleType === "floating" && <ParticleFloating count={50} speed={0.3} color={particleColor} opacity={particleOpacity} />}
          {particleType === "bubbles" && <ParticleBubbles count={30} speed={0.5} color={particleColor} opacity={particleOpacity} />}
          {particleType === "dots" && <ParticleDots count={200} speed={0.2} color={particleColor} opacity={particleOpacity} />}
          {particleType === "waves" && <ParticleWaves count={80} speed={0.3} color={particleColor} opacity={particleOpacity} />}
        </>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">

        {/* Badge */}
        <div className="mb-6 inline-block animate-fadeInUp">
          <span className="px-4 py-2 rounded-full glass text-white text-sm font-semibold shadow-lg">
            🚀 Powerful & Fast
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl text-white animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TextEditable onClick={() => onEdit("title")}>
            {title || "Launch Faster Than Ever"}
          </TextEditable>
        </h1>

        {/* SUBTITLE */}
        <p className="text-xl @md:text-2xl mt-6 opacity-95 max-w-2xl mx-auto leading-relaxed text-white/90 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <TextEditable onClick={() => onEdit("subtitle")}>
            {subtitle || "Design, customize, and deploy stunning landing pages in minutes."}
          </TextEditable>
        </p>

        {/* BUTTON */}
        <div className="mt-10 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <button className="group relative px-10 py-4 bg-white text-black rounded-2xl text-lg @md:text-xl font-semibold shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden hover:shadow-white/30">
            <TextEditable onClick={() => onEdit("buttonText")}>
              {buttonText || "Start Building"}
            </TextEditable>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
          </button>
        </div>

        {/* Customizable Decorative Elements */}
        <div className="mt-16 flex justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {/* Block 1 */}
          <div 
            className="w-16 h-16 rounded-2xl glass rotate-12 animate-float cursor-pointer overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" 
            style={{ animationDelay: '0s' }}
            onClick={() => onEdit("block1Image")}
          >
            {block1Image ? (
              <img src={block1Image} alt="Block 1" className="w-full h-full object-cover" />
            ) : block1Icon ? (
              <span className="text-2xl">{block1Icon}</span>
            ) : null}
          </div>

          {/* Block 2 */}
          <div 
            className="w-16 h-16 rounded-2xl glass -rotate-6 animate-float cursor-pointer overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" 
            style={{ animationDelay: '0.5s' }}
            onClick={() => onEdit("block2Image")}
          >
            {block2Image ? (
              <img src={block2Image} alt="Block 2" className="w-full h-full object-cover" />
            ) : block2Icon ? (
              <span className="text-2xl">{block2Icon}</span>
            ) : null}
          </div>

          {/* Block 3 */}
          <div 
            className="w-16 h-16 rounded-2xl glass rotate-45 animate-float cursor-pointer overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" 
            style={{ animationDelay: '1s' }}
            onClick={() => onEdit("block3Image")}
          >
            {block3Image ? (
              <img src={block3Image} alt="Block 3" className="w-full h-full object-cover" />
            ) : block3Icon ? (
              <span className="text-2xl">{block3Icon}</span>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
}
