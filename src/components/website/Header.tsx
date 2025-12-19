"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    // Get logged in user from localStorage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    // Track current path
    setCurrentPath(window.location.pathname);

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstName = loggedInUser?.name?.split(" ")[0];

  if (currentPath?.startsWith("/builder")) return null;

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
    { href: "/account", label: "Dashboard" },
  ];

  const isActive = (href: string) => currentPath === href;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-black/50 backdrop-blur-xl shadow-2xl"
            : "bg-black/20 backdrop-blur-xl shadow-2xl py-2"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2 sm:gap-3 group relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="relative"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </motion.div>
              <motion.span 
                className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                SnapSite
              </motion.span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  <AnimatePresence>
                    {isActive(item.href) && (
                      <motion.span 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </nav>

            {/* CTA Section */}
            <div className="flex items-center gap-3 sm:gap-4">
              {loggedInUser ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Desktop User Info & Logout */}
                  <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-sm text-white/90">
                        Hi, {firstName}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Mobile User Info */}
                  <div className="lg:hidden flex items-center px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-sm text-white/90">
                      Hi, {firstName}
                    </span>
                  </div>
                </div>
              ) : (
                <a
                  href="/signup"
                  className="group relative px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-black rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-purple-800 to-pink-800 inline-flex items-center gap-2"
                >
                  <span className="relative z-10 hidden md:flex items-center gap-2">
                    <Sparkles size={16} className=" sm:block" />
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 md:opacity-100 group-hover:opacity-20 transition-opacity duration-300" />
                </a>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative z-10 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      open
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      open
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="container mx-auto px-4 sm:px-6 pb-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ x: 5 }}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      <AnimatePresence>
                        {isActive(item.href) && (
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.a>
                ))}

                {loggedInUser ? (
                  <motion.button
                    onClick={handleLogout}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: navItems.length * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 text-center"
                  >
                    Logout
                  </motion.button>
                ) : (
                  <motion.a
                    href="/signup"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: navItems.length * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block mt-4 px-4 py-3 text-center text-sm font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </motion.a>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Header;