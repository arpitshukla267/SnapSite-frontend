"use client";

import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { SectionsLibrary } from "../../lib/sectionsLibrary";
import { SectionRegistry } from "../../lib/sectionRegistry";
import { BiSearch, BiGridAlt, BiCategory, BiChevronDown, BiDownload } from "react-icons/bi";
import { exportNextJsZip, exportReactZip, exportHTMLZip } from "../../lib/exporter";

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
export default function Sidebar({ layout }: { layout: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

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
      <div className="p-6 border-b border-white/10 bg-[#0b0f19] sticky top-0 z-20">
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
                  {/* <button
                    onClick={async () => {
                      console.log("Export Next.js clicked", layout);
                      await exportNextJsZip(layout);
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-200 hover:bg-indigo-500/20 hover:text-white rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded group-hover:bg-indigo-500/30">▲</span>
                    <span className="font-medium">Next.js</span>
                  </button>
                  <button
                    onClick={async () => {
                      console.log("Export React clicked", layout);
                      await exportReactZip(layout);
                      setShowExportDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-white rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded group-hover:bg-blue-500/30">⚛</span>
                    <span className="font-medium">React</span>
                  </button> */}
                  <button
                    onClick={async () => {
                      console.log("Export HTML clicked", layout);
                      await exportHTMLZip(layout);
                      setShowExportDropdown(false);
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

      {/* CATEGORY FILTER */}
      <div className="px-6 py-4 border-b border-white/5 bg-black/20">
        <div className="relative group">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full appearance-none py-2.5 pl-4 pr-10
              bg-[#0f172a] text-sm font-semibold text-gray-200
              border border-white/10 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30
              cursor-pointer transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0b0f19]">
                {cat}
              </option>
            ))}
          </select>
          <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-indigo-400 transition-colors" />
        </div>
      </div>

      {/* SECTIONS LIST */}
      <div className="flex-1 overflow-y-auto scroll-minimal p-5">
        <div className="flex flex-col space-y-5 pb-20">
          {filteredSections.map((section) => (
            <SidebarItem key={section.type} section={section} />
          ))}

          {filteredSections.length === 0 && (
            <div className="py-20 text-center opacity-50">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BiCategory className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-400">
                No components found
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
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
