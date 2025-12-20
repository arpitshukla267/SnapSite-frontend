"use client";

import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { SectionsLibrary } from "../../lib/sectionsLibrary";
import { SectionRegistry } from "../../lib/sectionRegistry";
import { BiSearch, BiGridAlt, BiCategory, BiChevronDown, BiDownload } from "react-icons/bi";
import { exportNextJsZip, exportReactZip, exportHTMLZip } from "../../lib/exporter";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- DRAGGABLE SECTION ITEM -------------------- */
function SidebarItem({ section }: { section: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${section.type}`,
    data: {
      type: section.type,
      isSidebar: true,
      props: section.defaultProps,
    },
  });

const Component = SectionRegistry[section.type]?.component;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      suppressHydrationWarning
      className="group relative flex flex-col h-44 w-full
        bg-[#0f172a]
        shadow-sm hover:shadow-lg hover:border-indigo-500/40
        transition-all duration-300 hover:-translate-y-1
        select-none touch-none cursor-grab active:cursor-grabbing"
    >
      {/* Preview */}
      <div className="flex-1 relative overflow-hidden bg-black/20 group-hover:bg-indigo-500/5 transition-colors pointer-events-none">
        {Component ? (
          <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] bg-[#0b0f19] shadow-inner">
            <Component {...section.defaultProps} />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <BiGridAlt className="w-8 h-8 mb-2 opacity-40 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">
              Preview
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Meta */}
      <div className="p-3 border-t border-white/5 bg-[#0b0f19]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 truncate transition-colors">
            {section.name}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-indigo-500 transition-colors" />
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5 truncate uppercase tracking-wider">
          {section.category}
        </p>
      </div>
    </div>
  );
}

/* -------------------- SIDEBAR -------------------- */
export default function Sidebar({ layout, onExport }: { layout: any[]; onExport?: (type: "html" | "react" | "nextjs") => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Preload JSZip to avoid async delay during export
  useEffect(() => {
    import("jszip").then(() => console.log("JSZip preloaded"));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(SectionsLibrary.map((s) => s.category || "Other"))),
  ];

  const filteredSections = SectionsLibrary.filter((section) => {
    const matchesSearch = section.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || section.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full w-full
      bg-[#0b0f19]
      flex flex-col"
    >
      {/* HEADER */}
      <div className="hidden lg:block p-6 border-b border-white/10 bg-[#0b0f19] sticky top-0 z-20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-fuchsia-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">
              Builder
            </h2>
          </div>
          
          {/* Export Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="p-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 rounded-lg transition-all group relative"
              title="Export Project"
            >
              <BiDownload className="w-5 h-5 text-white" />
            </button>
            
            {/* Dropdown Menu */}
            {showExportDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-white/5 bg-black/20">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                    Export As
                  </p>
                </div>
                <div className="p-2">
                  <button
                    onClick={async () => {
                      setShowExportDropdown(false);
                      if (onExport) {
                        onExport("nextjs");
                      } else {
                        await exportNextJsZip(layout);
                      }
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-200 hover:bg-indigo-500/20 hover:text-white rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded group-hover:bg-indigo-500/30">▲</span>
                    <span className="font-medium">Next.js</span>
                  </button>
                  {/* <button
                    onClick={async () => {
                      setShowExportDropdown(false);
                      if (onExport) {
                        onExport("react");
                      } else {
                        await exportReactZip(layout);
                      }
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-white rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded group-hover:bg-blue-500/30">⚛</span>
                    <span className="font-medium">React</span>
                  </button> */}
                  <button
                    onClick={async () => {
                      setShowExportDropdown(false);
                      if (onExport) {
                        onExport("html");
                      } else {
                        await exportHTMLZip(layout);
                      }
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-200 hover:bg-orange-500/20 hover:text-white rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded group-hover:bg-orange-500/30">&lt;/&gt;</span>
                    <span className="font-medium">HTML</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-5 ml-4">
          Drag sections to your page
        </p>

        {/* Search */}
        <div className="hidden lg:block relative group">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm
              bg-[#0f172a] text-gray-200
              border border-white/10 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30
              focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* CATEGORY FILTER - Enhanced with Custom Dropdown */}
      <div className="px-6 py-4 border-b border-white/5 bg-black/20">
        <div className="relative group">
          {/* Custom Dropdown Trigger */}
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full flex items-center justify-between py-2.5 pl-4 pr-10
              bg-[#0f172a] text-sm font-semibold text-gray-200
              border border-white/10 rounded-xl
              hover:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30
              cursor-pointer transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              {activeCategory}
            </span>
            <BiChevronDown 
              className={`text-gray-500 transition-transform duration-200 ${
                isCategoryDropdownOpen ? "rotate-180 text-indigo-400" : ""
              }`}
            />
          </button>

          {/* Custom Dropdown Menu with Animations */}
          <AnimatePresence>
            {isCategoryDropdownOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCategoryDropdownOpen(false)}
                />
                
                {/* Dropdown List */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-full left-0 right-0 mt-2 z-50
                    bg-[#0f172a] border border-white/10 rounded-xl
                    shadow-2xl overflow-hidden backdrop-blur-xl"
                >
                  <div className="max-h-64 overflow-y-auto dropdown-scrollbar">
                    {categories.map((cat, index) => (
                      <motion.button
                        key={cat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: index * 0.03,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium
                          transition-all duration-200 flex items-center gap-3
                          ${
                            activeCategory === cat
                              ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-l-2 border-indigo-500"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                          activeCategory === cat 
                            ? "bg-indigo-400 scale-125" 
                            : "bg-gray-600 group-hover:bg-indigo-500/50"
                        }`} />
                        <span>{cat}</span>
                        {activeCategory === cat && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECTIONS LIST */}
      <div className="flex-1 overflow-y-auto scroll-minimal p-5">
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="flex flex-col space-y-5 pb-20"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {filteredSections.map((section, index) => (
              <motion.div
                key={section.type}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  },
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20, 
                  scale: 0.95,
                  filter: "blur(4px)",
                  transition: {
                    duration: 0.2,
                  }
                }}
                layout
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <SidebarItem section={section} />
              </motion.div>
            ))}

            {filteredSections.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 0.5, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="py-20 text-center"
              >
                <motion.div 
                  className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 mx-auto"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <BiCategory className="w-8 h-8 text-gray-500" />
                </motion.div>
                <p className="text-sm font-medium text-gray-400">
                  No components found
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Try a different search term
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 bg-black/20 text-center">
        <p className="text-[10px] text-gray-500 font-medium">
          Pro Tip: Drag & Drop to arrange
        </p>
      </div>
    </div>
  );
}
