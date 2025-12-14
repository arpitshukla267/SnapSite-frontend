"use client";

import {
  Layout,
  Wand2,
  Database,
  Settings,
  ShieldCheck,
  Sparkles,
  Zap,
  Palette,
} from "lucide-react";
import React from "react";

export default function Features() {
  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Builder",
      description: "Generate complete website layouts instantly with our intelligent AI builder that understands your vision.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Layout,
      title: "Drag & Drop Editor",
      description: "Customize everything through an intuitive, pixel-perfect drag-and-drop interface.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Template Library",
      description: "Choose from hundreds of stunning, responsive templates tailored for every industry and use case.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Settings,
      title: "Advanced Customization",
      description: "Fine-tune layouts, typography, colors, spacing and animations with granular control.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime keeps your projects safe and accessible.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your websites load instantly and run smoothly everywhere.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="relative min-h-screen w-full py-20 px-6 bg-black text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div> */}
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-sm text-gray-300">Powerful Features</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Everything You Need To Build{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 animate-pulse">
              Amazing Websites
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Design, customize, and launch stunning websites without writing a single line of code. 
            Everything you need, all in one place.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Gradient Glow on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {feature.title}
                  </h2>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <button className="group relative px-12 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 overflow-hidden">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              
              {/* Button Content */}
              <span className="relative flex items-center gap-3">
                Start Building Now
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            
            <p className="text-sm text-gray-500">
              No credit card required • Free forever plan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}