"use client";

import {
  Globe,
  Layout,
  Wand2,
  Database,
  Settings,
  ShieldCheck,
} from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section className="min-h-screen w-full py-14 px-6 bg-gradient-to-b from-black via-[#0a0a0f] to-black text-white">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Everything You Need To Build {" "} 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400">
            Amazing Websites Effortlessly
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl">
          SaaS Website Creator gives you every essential tool to design, customize, 
          and launch stunning websites without touching a single line of code.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Feature */}
        <div className="feature-card">
          <Wand2 size={40} className="feature-icon" />
          <h2 className="feature-title">AI-Powered Builder</h2>
          <p className="feature-text">
            Generate complete website layouts instantly with our intelligent AI builder.
          </p>
        </div>

        <div className="feature-card">
          <Layout size={40} className="feature-icon" />
          <h2 className="feature-title">Drag & Drop Editor</h2>
          <p className="feature-text">
            Customize everything through a smooth, responsive drag-and-drop interface.
          </p>
        </div>

        <div className="feature-card">
          <Globe size={40} className="feature-icon" />
          <h2 className="feature-title">Free Hosting Options</h2>
          <p className="feature-text">
            Deploy anywhere with zero hosting cost. Total freedom.
          </p>
        </div>

        <div className="feature-card">
          <Database size={40} className="feature-icon" />
          <h2 className="feature-title">Template Library</h2>
          <p className="feature-text">
            Choose from beautiful, responsive templates tailored for every industry.
          </p>
        </div>

        <div className="feature-card">
          <Settings size={40} className="feature-icon" />
          <h2 className="feature-title">Advanced Customization</h2>
          <p className="feature-text">
            Change layouts, typography, colors, spacing and more with full control.
          </p>
        </div>

        <div className="feature-card">
          <ShieldCheck size={40} className="feature-icon" />
          <h2 className="feature-title">Secure & Reliable</h2>
          <p className="feature-text">
            Your projects stay safe with enterprise-grade security layers.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <a
          href="/login"
          className="px-10 py-4 rounded-lg text-lg font-semibold transition 
          bg-gradient-to-r from-indigo-500 to-purple-600 
          hover:from-indigo-400 hover:to-purple-500 
          shadow-lg shadow-indigo-900/40"
        >
          Start Building
        </a>
      </div>
    </section>
  );
}

/* Tailwind Component Styles */
const cardStyles = `
  p-8 rounded-xl backdrop-blur-md
  bg-white/5 border border-white/10
  hover:bg-white/10 hover:border-white/20
  transition shadow-[0_0_20px_rgba(99,102,241,0.15)]
`;

