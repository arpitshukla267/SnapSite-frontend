"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Target, Zap, Heart, Award, Rocket } from "lucide-react";
import Starfield from "../../components/ui/Starfield";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering everyone to build beautiful websites without coding barriers.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Constantly pushing boundaries with cutting-edge technology and design.",
      color: "from-pink-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with our users' needs and feedback in mind.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Fast & Reliable",
      description: "Lightning-fast performance and 99.9% uptime guarantee for your projects.",
      color: "from-blue-500 to-purple-500",
    },
  ];

  const stats = [
    { number: "10k+", label: "Active Users", icon: Users },
    { number: "50+", label: "Templates", icon: Award },
    { number: "100+", label: "Components", icon: Sparkles },
    { number: "24/7", label: "Support", icon: Heart },
  ];

  return (
    <div className="min-h-screen relative">
      <Starfield />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Sparkles size={16} />
              About SnapSite
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Building the Future of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Web Creation
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              We're on a mission to democratize web development, making it accessible 
              to everyone regardless of technical background. With SnapSite, anyone can 
              create stunning, production-ready websites in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                SnapSite was born from a simple observation: building websites shouldn't 
                require years of coding experience or expensive developers. We believe 
                that great ideas deserve great websites, and everyone should have the 
                tools to bring their vision to life.
              </p>
              <p>
                Founded in 2024, we've grown from a small team of passionate developers 
                to a platform trusted by thousands of creators, entrepreneurs, and 
                businesses worldwide. Our commitment to simplicity, power, and user 
                experience drives everything we do.
              </p>
              <p>
                Today, SnapSite empowers users to create everything from personal portfolios 
                to complex business websites, all through an intuitive drag-and-drop 
                interface. We're constantly evolving, adding new features, templates, and 
                capabilities based on your feedback.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-purple-500/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already building beautiful websites with SnapSite.
            </p>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
            >
              <Rocket size={20} />
              Get Started Free
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

