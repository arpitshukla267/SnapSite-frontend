"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

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
    { href: "/dashboard", label: "Dashboard" },
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
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-3 group relative z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                {/* <img
                  src="/logo.png"
                  alt="Logo"
                  className="relative w-9 h-9 sm:w-10 sm:h-10"
                /> */}
              </div>
              <span className="text-base sm:text-xl font-bold text-white hidden sm:block">
                SnapSite
              </span>
              <span className="text-base sm:text-xl font-bold text-white sm:hidden">
                SnapSite
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  )}
                </a>
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
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 sm:px-6 pb-6 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                style={{
                  animation: open
                    ? `slideIn 0.3s ease-out ${index * 0.05}s forwards`
                    : "none",
                  opacity: open ? 1 : 0,
                }}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {isActive(item.href) && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  )}
                </div>
              </a>
            ))}

            {loggedInUser ? (
               <button
                  onClick={handleLogout}
                  className="w-full mt-4 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 text-center"
                  style={{
                    animation: open
                      ? `slideIn 0.3s ease-out ${navItems.length * 0.05}s forwards`
                      : "none",
                    opacity: open ? 1 : 0,
                  }}
                >
                  Logout
                </button>
            ) : (
              <a
                href="/signup"
                onClick={() => setOpen(false)}
                className="block mt-4 px-4 py-3 text-center text-sm font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
                style={{
                  animation: open
                    ? `slideIn 0.3s ease-out ${
                        navItems.length * 0.05
                      }s forwards`
                    : "none",
                  opacity: open ? 1 : 0,
                }}
              >
                Get Started
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20" />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;