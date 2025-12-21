"use client";
import TextEditable from "../../TextEditable";

export default function HeroSplit({ title, subtitle, buttonText, image, onEdit, editable = true }) {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-indigo-200/40 to-blue-200/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 @md:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT SIDE - Text Content */}
        <div className="animate-slideInLeft">

          {/* Badge */}
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold shadow-md">
              ⚡ Lightning Fast
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            <TextEditable onClick={() => onEdit && onEdit("title")} editable={editable}>
              {title || "Your Product, Simplified"}
            </TextEditable>
          </h1>

          {/* Gradient Accent */}
          <div 
            className="w-20 h-1.5 rounded-full mt-6 mb-6"
            style={{
              background: `linear-gradient(to right, var(--section-primary, #4f46e5), var(--section-secondary, #7c3aed))`
            }}
          />

          {/* SUBTITLE */}
          <p className="text-lg @md:text-xl text-gray-600 leading-relaxed max-w-lg">
            <TextEditable onClick={() => onEdit && onEdit("subtitle")} editable={editable}>
              {subtitle || "A clean, modern layout that boosts conversions."}
            </TextEditable>
          </p>

          {/* BUTTON */}
          <div className="mt-10">
            <button 
              className="group relative px-8 py-4 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: `linear-gradient(to right, var(--section-primary, #4f46e5), var(--section-secondary, #7c3aed))`
              }}
            >
              <span className="relative z-10">
                <TextEditable onClick={() => onEdit && onEdit("buttonText")} editable={editable}>
                  {buttonText || "Try Now"}
                </TextEditable>
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(to right, var(--section-secondary, #7c3aed), var(--section-accent, #60a5fa))`
                }}
              />
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm font-medium">Easy Setup</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm font-medium">Secure & Reliable</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE - Enhanced with Effects */}
        <div 
          className={`relative group animate-slideInRight ${editable ? 'cursor-pointer' : ''}`} 
          onClick={() => editable && onEdit && onEdit("image")}
        >
          
          {/* Glow Effect */}
          <div className={`absolute -inset-6 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-3xl transition-opacity duration-500 ${editable ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />

          {/* Image Container with Gradient Border */}
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${editable ? 'group-hover:shadow-purple-500/30' : ''}`}>
            <img
              src={image || "/placeholder.png"}
              alt="Hero"
              className={`w-full h-auto rounded-2xl relative z-10 transition-transform duration-500 ${editable ? 'group-hover:scale-105' : ''}`}
            />
            
            {/* Overlay on Hover */}
            {editable && (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-6 py-4 animate-float">
            <div className="text-2xl font-bold gradient-text">99.9%</div>
            <div className="text-xs text-gray-600">Uptime</div>
          </div>

        </div>

      </div>
    </section>
  );
}
