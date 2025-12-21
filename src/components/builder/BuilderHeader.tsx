"use client";

import { BiDesktop, BiMobile, BiTable, BiSave, BiShow, BiArrowBack, BiDownload } from "react-icons/bi";
import { Palette } from "lucide-react";
import Link from "next/link";
import { exportNextJsZip, exportReactZip, exportHTMLZip } from "../../lib/exporter";

export default function BuilderHeader({ 
  templateName, 
  viewMode, 
  setViewMode,
  onSave,
  onPreview,
  onExport,
  onThemeCustomize
}: {
  templateName: string;
  viewMode: "desktop" | "tablet" | "mobile";
  setViewMode: (mode: "desktop" | "tablet" | "mobile") => void;
  onSave?: () => void;
  onPreview?: () => void;
  onExport?: () => void;
  onThemeCustomize?: () => void;
}) {
  return (
    <div className="h-16 fixed top-0 left-0 right-0 z-[10000]
      flex items-center justify-between px-4
      bg-[#0b0f19] border-b border-white/10
      shadow-lg shadow-black/40"
    >

      {/* Left: Back & Title */}
      <div className="flex items-center space-x-4 w-64">
        <Link
          href="/templates"
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
        >
          <BiArrowBack className="w-5 h-5" />
        </Link>

        <div>
          <h1 className="font-semibold text-sm text-white">
            {templateName || "Create Your Own Template"}
          </h1>
          <span className="text-xs text-gray-400">
            {templateName ? "Draft • Autosaved" : "Start from scratch"}
          </span>
        </div>
      </div>

      {/* Center: Device Toggles */}
      <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
        <button
          onClick={() => setViewMode("desktop")}
          className={`p-2 rounded-md transition-all
            ${
              viewMode === "desktop"
                ? "bg-white/10 text-blue-400 shadow-inner"
                : "text-gray-400 hover:text-white"
            }`}
          title="Desktop View"
        >
          <BiDesktop className="w-5 h-5" />
        </button>

        <button
          onClick={() => setViewMode("mobile")}
          className={`p-2 rounded-md transition-all
            ${
              viewMode === "mobile"
                ? "bg-white/10 text-blue-400 shadow-inner"
                : "text-gray-400 hover:text-white"
            }`}
          title="Mobile View"
        >
          <BiMobile className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3 w-64 justify-end">
        {/* Theme Customizer Button */}
        <button
          onClick={onThemeCustomize}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition"
          title="Customize Theme"
        >
          <Palette className="w-5 h-5" />
        </button>

        {/* Mobile Download/Export */}
        <button
           onClick={onExport}
           className="lg:hidden p-2 text-gray-400 hover:text-white transition"
           title="Download Project"
        >
          <BiDownload className="w-5 h-5" />
        </button>

        <button
          onClick={onPreview}
          className="hidden lg:flex items-center space-x-2 px-3 py-2
            text-sm font-medium text-gray-400
            hover:text-white hover:bg-white/5
            rounded-md transition"
        >
          <BiShow className="w-4 h-4" />
          <span>Preview</span>
        </button>

        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-4 py-2
            bg-blue-600 text-white text-sm text-nowrap font-medium
            rounded-lg hover:bg-blue-500
            shadow-md shadow-blue-600/30 transition"
        >
          <BiSave className="w-4 h-4" />
          <span>Create Your Own Template</span>
        </button>
      </div>
    </div>
  );
}
