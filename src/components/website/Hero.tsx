"use client";

import React from "react";
import Starfield from "../ui/Starfield";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">

      {/* Animated Background */}
      <Starfield />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">

        {/* Badge */}
        <div className="mb-6 inline-block animate-fadeInUp">
          <span className="px-4 py-2 rounded-full glass text-white text-sm font-medium border border-white/20 shadow-lg">
            ✨ The Future of Web Building
          </span>
        </div>

        {/* Gradient Heading with Animation */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Build Production-Ready Websites{" "}
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 animate-gradient-slow">
            Without Touching Code
          </span>
        </h1>

        {/* Subtext with Animation */}
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Drag, drop, and publish powerful websites with AI-assisted templates,
          zero-cost deployment, and a dashboard fine-tuned for speed and simplicity.
        </p>

        {/* CTA Buttons with Animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/login"
            className="group relative px-8 py-4 rounded-xl text-lg font-semibold 
            bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 
            hover:from-indigo-400 hover:via-purple-500 hover:to-pink-400 
            transition-all duration-300 text-white shadow-xl shadow-indigo-900/50
            hover:shadow-2xl hover:shadow-purple-800/60 hover:scale-105
            overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
          </Link>

          <Link
            href="/templates"
            className="px-8 py-4 rounded-xl text-lg font-semibold 
            glass-dark text-white
            hover:bg-white/20 transition-all duration-300
            border border-white/30 hover:border-white/50
            hover:scale-105"
          >
            Browse Templates
          </Link>
        </div>

        {/* Stats or Features */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-blue">50+</div>
            <div className="text-gray-400 text-sm mt-1">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text">100+</div>
            <div className="text-gray-400 text-sm mt-1">Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-pink">10k+</div>
            <div className="text-gray-400 text-sm mt-1">Users</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default Hero;
