"use client";
import TextEditable from "../../TextEditable";

export default function CTASplit({ title, subtitle, buttonText, image, onEdit }) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 @md:grid-cols-2 gap-12 items-center">

        {/* LEFT - Text Content */}
        <div className="animate-slideInLeft">
          
          {/* Badge */}
          <div className="mb-4 inline-block">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
              📢 Limited Time Offer
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold text-gray-900 mb-6">
            <TextEditable onClick={() => onEdit("title")}>
              {title || "Take Your Business to the Next Level"}
            </TextEditable>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            <TextEditable onClick={() => onEdit("subtitle")}>
              {subtitle || "Don't miss out on this opportunity to revolutionize your workflow and achieve better results."}
            </TextEditable>
          </p>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            <TextEditable onClick={() => onEdit("buttonText")}>
              {buttonText || "Get Started Now"}
            </TextEditable>
          </button>

        </div>

        {/* RIGHT - Image/Visual */}
        <div className="relative group animate-slideInRight cursor-pointer" onClick={() => onEdit("image")}>
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition rounded-3xl" />
          <img
            src={image || "/placeholder.png"}
            alt="CTA"
            className="relative z-10 w-full rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>
    </section>
  );
}
