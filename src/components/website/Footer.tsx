"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Footer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Don't show footer on builder, login, or signup pages
  if (
    currentPath?.startsWith("/builder") ||
    currentPath === "/login" ||
    currentPath === "/signup"
  ) {
    return null;
  }

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/account" },
    ],
    company: [
      { label: "About Us", href: "/about" },
    //   { label: "Blog", href: "/blog" },
    //   { label: "Contact", href: "/contact" },
    ],
    // resources: [
    //   { label: "Documentation", href: "/docs" },
    //   { label: "Help Center", href: "/help" },
    //   { label: "API Reference", href: "/api" },
    //   { label: "Community", href: "/community" },
    // ],
    // legal: [
    //   { label: "Privacy Policy", href: "/privacy" },
    //   { label: "Terms of Service", href: "/terms" },
    //   { label: "Cookie Policy", href: "/cookies" },
    //   { label: "GDPR", href: "/gdpr" },
    // ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/arpitshukla267", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/arpit-shukla-9a8b54358/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:shuklaarpit440@gmail.com", label: "Email" },
  ];

  return (
    <>
      <footer className="relative bg-gradient-to-br overflow-hidden from-gray-950 via-gray-900 to-black border-t border-purple-500/20">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 opacity-50 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex items-center gap-3 mb-6 group">
                  <motion.div
                    className="relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SnapSite
                  </span>
                </Link>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                  Build production-ready websites without touching code. 
                  Drag, drop, and publish powerful websites with AI-assisted templates.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Arpit Shukla. All rights reserved.
            </p>
            
            {/* <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="hidden sm:inline">Made </span>
              <motion.span
                className="text-pink-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                ❤️
              </motion.span>
              <span className="hidden sm:inline">Made by the Arpit Shukla</span>
            </div> */}
          </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 border border-purple-400/30"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </>
  );
};

export default Footer;

