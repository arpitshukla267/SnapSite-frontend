/**
 * Theme Customizer V2 - Dynamic Section-Specific Fields
 * Shows fields based on selected section and applies changes only to that section
 */

"use client";
import { useState, useEffect, useMemo } from "react";
import { X, Palette, RotateCcw, Settings, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSectionThemeFields, getDefaultGranularTheme, type GranularSectionTheme } from "../../lib/sectionThemeFields";

interface ThemeCustomizerV2Props {
  isOpen: boolean;
  onClose: () => void;
  layout?: any[];
  selectedSectionId?: string | null;
  onUpdateSectionTheme?: (sectionId: string, theme: GranularSectionTheme) => void;
}

export default function ThemeCustomizerV2({
  isOpen,
  onClose,
  layout = [],
  selectedSectionId,
  onUpdateSectionTheme,
}: ThemeCustomizerV2Props) {
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState<string | null>(selectedSectionId || null);
  const [hasSelectedOnce, setHasSelectedOnce] = useState(false);
  const [localTheme, setLocalTheme] = useState<GranularSectionTheme | null>(null);

  // Get selected section
  const selectedSection = targetSectionId 
    ? layout.find(block => block.id === targetSectionId)
    : null;

  // Get theme fields for the selected section
  const themeFields = useMemo(() => {
    if (!selectedSection) return [];
    return getSectionThemeFields(selectedSection.type);
  }, [selectedSection?.type]);

  // Read current theme from section - read from stored theme or use defaults
  const readSectionTheme = (section: any): GranularSectionTheme => {
    // If section has a stored theme, use it (deep clone to ensure isolation)
    if (section?.theme && typeof section.theme === 'object') {
      if (section.theme.background && typeof section.theme.background === 'object' && 'type' in section.theme.background) {
        // Deep clone to ensure theme isolation
        const clonedTheme = JSON.parse(JSON.stringify(section.theme)) as GranularSectionTheme;
        // Ensure cards array exists if section has items/features/testimonials
        if (!clonedTheme.cards && section.props) {
          const cardArrays = ["items", "features", "testimonials", "projects", "plans", "members"];
          for (const arrayName of cardArrays) {
            if (section.props[arrayName] && Array.isArray(section.props[arrayName]) && section.props[arrayName].length > 0) {
              clonedTheme.cards = section.props[arrayName].map(() => ({
                header: "#0f172a",
                subheader: "#64748b",
                paragraph: "#64748b",
                background: "#ffffff",
              }));
              break;
            }
          }
        }
        return clonedTheme;
      }
    }
    
    // Otherwise return default theme for this section type (which includes cards if needed)
    return getDefaultGranularTheme(section?.type || '', section?.props || {});
  };

  // Load section theme when section changes (only when section ID changes, not theme)
  useEffect(() => {
    if (isOpen && selectedSection) {
      // Read from stored theme or use defaults
      const theme = readSectionTheme(selectedSection);
      setLocalTheme(theme);
      setTargetSectionId(selectedSection.id); // Update target when section changes
      setHasSelectedOnce(true);
    } else if (isOpen && !selectedSection && !hasSelectedOnce) {
      // Show modal if no section selected
      setShowSectionModal(true);
    }
    // Watch selectedSection.id to reload when switching sections
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSection?.id, isOpen]);

  // Update target when selectedSectionId changes
  useEffect(() => {
    if (selectedSectionId) {
      setTargetSectionId(selectedSectionId);
    }
  }, [selectedSectionId]);

  const handleColorChange = (fieldType: string, value: string, isGradientColor?: boolean, gradientIndex?: number) => {
    if (!localTheme || !selectedSection) return;

    const newTheme = JSON.parse(JSON.stringify(localTheme)) as GranularSectionTheme;

    switch (fieldType) {
      case "background":
        if (isGradientColor && gradientIndex !== undefined && newTheme.background.type === "gradient") {
          // Update specific gradient color
          if (newTheme.background.gradient) {
            newTheme.background.gradient[gradientIndex] = value;
          }
        } else if (newTheme.background.type === "gradient" && !isGradientColor) {
          // Switch to solid
          newTheme.background = {
            type: "solid",
            solid: value,
          };
        } else if (newTheme.background.type === "solid") {
          newTheme.background.solid = value;
        }
        break;
      case "header":
        newTheme.header = value;
        break;
      case "subheader":
        newTheme.subheader = value;
        break;
      case "paragraph":
        newTheme.paragraph = value;
        break;
      case "button":
        if (!newTheme.button) {
          newTheme.button = { background: value, text: "#ffffff" };
        } else {
          newTheme.button.background = value;
        }
        break;
      case "button-text":
        if (!newTheme.button) {
          newTheme.button = { background: "#4f46e5", text: value };
        } else {
          newTheme.button.text = value;
        }
        break;
      case "button2":
        if (!newTheme.button2) {
          newTheme.button2 = { background: "transparent", text: value };
        } else {
          newTheme.button2.background = value;
        }
        break;
      case "button2-text":
        if (!newTheme.button2) {
          newTheme.button2 = { background: "transparent", text: value };
        } else {
          newTheme.button2.text = value;
        }
        break;
      case "accent":
        newTheme.accent = value;
        break;
      case "icon":
        newTheme.icon = value;
        break;
      default:
        // Handle card fields: "card-{index}-{field}"
        if (fieldType.startsWith("card-")) {
          const parts = fieldType.split("-");
          if (parts.length >= 3) {
            const cardIndex = parseInt(parts[1]);
            const cardField = parts.slice(2).join("-"); // e.g., "header", "paragraph", "background"
            
            if (!newTheme.cards) {
              newTheme.cards = [];
            }
            
            // Ensure card array is large enough
            while (newTheme.cards.length <= cardIndex) {
              newTheme.cards.push({
                header: "#0f172a",
                subheader: "#64748b",
                paragraph: "#64748b",
                background: "#ffffff",
              });
            }
            
            // Update the specific card field
            if (cardField === "header") {
              newTheme.cards[cardIndex].header = value;
            } else if (cardField === "subheader") {
              newTheme.cards[cardIndex].subheader = value;
            } else if (cardField === "paragraph") {
              newTheme.cards[cardIndex].paragraph = value;
            } else if (cardField === "background") {
              newTheme.cards[cardIndex].background = value;
            } else if (cardField === "border") {
              newTheme.cards[cardIndex].border = value;
            } else if (cardField === "icon") {
              newTheme.cards[cardIndex].icon = value;
            } else if (cardField === "button") {
              // Initialize button if it doesn't exist
              if (!newTheme.cards[cardIndex].button) {
                newTheme.cards[cardIndex].button = { background: value, text: "#ffffff" };
              } else {
                newTheme.cards[cardIndex].button.background = value;
              }
            } else if (cardField === "button-text") {
              // Initialize button if it doesn't exist
              if (!newTheme.cards[cardIndex].button) {
                newTheme.cards[cardIndex].button = { background: "#4f46e5", text: value };
              } else {
                newTheme.cards[cardIndex].button.text = value;
              }
            }
          }
        }
        break;
    }

    setLocalTheme(newTheme);
    
    // Update the stored theme immediately - this will trigger re-render with new props
    if (targetSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(targetSectionId, newTheme);
    }
  };

  const handleBackgroundTypeChange = (type: "solid" | "gradient") => {
    if (!localTheme || !selectedSection) return;

    const newTheme = JSON.parse(JSON.stringify(localTheme)) as GranularSectionTheme;
    const field = themeFields.find(f => f.type === "background");
    
    if (type === "gradient") {
      // If current theme has gradient, keep it, otherwise use default
      const currentGradient = localTheme.background.type === "gradient" && localTheme.background.gradient
        ? [...localTheme.background.gradient]
        : (field?.defaultGradient || ["#4f46e5", "#ec4899", "#f59e0b"]);
      
      newTheme.background = {
        type: "gradient",
        gradient: currentGradient,
      };
    } else {
      // If switching from gradient to solid, use first gradient color or default
      const solidColor = localTheme.background.type === "gradient" && localTheme.background.gradient?.[0]
        ? localTheme.background.gradient[0]
        : (field?.defaultColor || "#ffffff");
      
      newTheme.background = {
        type: "solid",
        solid: solidColor,
      };
    }

    setLocalTheme(newTheme);
    
    // Update the stored theme immediately - this will trigger re-render with new props
    if (targetSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(targetSectionId, newTheme);
    }
  };

  const handleApplyMode = (mode: "section", sectionId: string) => {
    setTargetSectionId(sectionId);
    setHasSelectedOnce(true);
    setShowSectionModal(false);
  };

  const handleReset = () => {
    if (!selectedSection) return;
    
    const defaultTheme = getDefaultGranularTheme(selectedSection.type, selectedSection.props || {});
    setLocalTheme(defaultTheme);
    
    if (targetSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(targetSectionId, defaultTheme);
    }
  };

  const getSectionDisplayName = (block: any) => {
    if (!block) return "No Section";
    const type = block.type || "";
    return type
      .replace(/([A-Z])/g, " $1")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getFieldValue = (fieldType: string): string => {
    if (!localTheme) return "#000000";

    switch (fieldType) {
      case "background":
        if (localTheme.background.type === "gradient") {
          return localTheme.background.gradient?.[0] || "#ffffff";
        }
        return localTheme.background.solid || "#ffffff";
      case "header":
        return localTheme.header || "#000000";
      case "subheader":
        return localTheme.subheader || "#64748b";
      case "paragraph":
        return localTheme.paragraph || "#64748b";
      case "button":
        return localTheme.button?.background || "#4f46e5";
      case "button-text":
        return localTheme.button?.text || "#ffffff";
      case "button2":
        return localTheme.button2?.background || "transparent";
      case "button2-text":
        return localTheme.button2?.text || "#64748b";
      case "accent":
        return localTheme.accent || "#4f46e5";
      case "icon":
        return localTheme.icon || "#4f46e5";
      default:
        // Handle card fields: "card-{index}-{field}"
        if (fieldType.startsWith("card-")) {
          const parts = fieldType.split("-");
          if (parts.length >= 3) {
            const cardIndex = parseInt(parts[1]);
            const cardField = parts.slice(2).join("-"); // e.g., "header", "paragraph", "button", "button-text"
            
            if (!localTheme.cards || !localTheme.cards[cardIndex]) {
              return "#000000";
            }
            
            const card = localTheme.cards[cardIndex];
            
            if (cardField === "header") {
              return card.header || "#0f172a";
            } else if (cardField === "subheader") {
              return card.subheader || "#64748b";
            } else if (cardField === "paragraph") {
              return card.paragraph || "#64748b";
            } else if (cardField === "background") {
              return card.background || "#ffffff";
            } else if (cardField === "border") {
              return card.border || "#e5e7eb";
            } else if (cardField === "icon") {
              return card.icon || "#4f46e5";
            } else if (cardField === "button") {
              return card.button?.background || "#4f46e5";
            } else if (cardField === "button-text") {
              return card.button?.text || "#ffffff";
            }
          }
        }
        return "#000000";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10002]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 bg-gray-900 border-l border-white/10 shadow-2xl z-[10003] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <Palette className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Theme Customizer</h3>
                    <p className="text-xs text-gray-400">
                      {selectedSection 
                        ? getSectionDisplayName(selectedSection)
                        : "Select a section"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {!selectedSection ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>Please select a section to customize</p>
                    <button
                      onClick={() => setShowSectionModal(true)}
                      className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                    >
                      Select Section
                    </button>
                  </div>
                ) : themeFields.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>No customizable fields for this section</p>
                  </div>
                ) : (
                  <>
                    {/* Section Info */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">
                          Editing
                        </span>
                        <button
                          onClick={() => setShowSectionModal(true)}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                          title="Change Section"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        {getSectionDisplayName(selectedSection)}
                      </div>
                    </div>

                    {/* Dynamic Fields */}
                    {themeFields.map((field) => {
                      if (field.type === "background") {
                        const isGradient = localTheme?.background?.type === "gradient";
                        const supportsGradient = field.supportsGradient;

                        return (
                          <div key={field.type}>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              {field.label}
                            </label>
                            
                            {supportsGradient && (
                              <div className="mb-3 flex gap-2">
                                <button
                                  onClick={() => handleBackgroundTypeChange("solid")}
                                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    !isGradient
                                      ? "bg-purple-600 text-white"
                                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                                  }`}
                                >
                                  Solid
                                </button>
                                <button
                                  onClick={() => handleBackgroundTypeChange("gradient")}
                                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isGradient
                                      ? "bg-purple-600 text-white"
                                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                                  }`}
                                >
                                  Gradient
                                </button>
                              </div>
                            )}

                            {isGradient && localTheme?.background.gradient ? (
                              <div className="space-y-3">
                                {localTheme.background.gradient.map((color, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <input
                                      type="color"
                                      value={color}
                                      onChange={(e) => handleColorChange("background", e.target.value, true, index)}
                                      className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={color}
                                      onChange={(e) => handleColorChange("background", e.target.value, true, index)}
                                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <input
                                  type="color"
                                  value={getFieldValue("background")}
                                  onChange={(e) => handleColorChange("background", e.target.value)}
                                  className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={getFieldValue("background")}
                                  onChange={(e) => handleColorChange("background", e.target.value)}
                                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono"
                                />
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (field.type === "button") {
                        return (
                          <div key={field.type} className="pt-4 border-t border-white/10">
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              {field.label}
                            </label>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-gray-400 mb-2">Background</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={getFieldValue("button")}
                                    onChange={(e) => handleColorChange("button", e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={getFieldValue("button")}
                                    onChange={(e) => handleColorChange("button", e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-2">Text</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={getFieldValue("button-text")}
                                    onChange={(e) => handleColorChange("button-text", e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={getFieldValue("button-text")}
                                    onChange={(e) => handleColorChange("button-text", e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (field.type === "button2") {
                        return (
                          <div key={field.type} className="pt-4 border-t border-white/10">
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                              {field.label}
                            </label>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-gray-400 mb-2">Background</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={getFieldValue("button2")}
                                    onChange={(e) => handleColorChange("button2", e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={getFieldValue("button2")}
                                    onChange={(e) => handleColorChange("button2", e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-2">Text</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={getFieldValue("button2-text")}
                                    onChange={(e) => handleColorChange("button2-text", e.target.value)}
                                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={getFieldValue("button2-text")}
                                    onChange={(e) => handleColorChange("button2-text", e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Simple color fields (header, subheader, paragraph, accent, icon)
                      return (
                        <div key={field.type}>
                          <label className="block text-sm font-semibold text-gray-300 mb-3">
                            {field.label}
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={getFieldValue(field.type)}
                              onChange={(e) => handleColorChange(field.type, e.target.value)}
                              className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={getFieldValue(field.type)}
                              onChange={(e) => handleColorChange(field.type, e.target.value)}
                              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Card Fields - Render if section has cards */}
                    {localTheme?.cards && localTheme.cards.length > 0 && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-gray-300 mb-4">Card Colors</h4>
                        <div className="space-y-6">
                          {localTheme.cards.map((card, cardIndex) => (
                            <div key={cardIndex} className="bg-white/5 border border-white/10 rounded-lg p-4">
                              <div className="text-xs font-semibold text-purple-300 mb-3">
                                Card {cardIndex + 1}
                              </div>
                              <div className="space-y-3">
                                {/* Card Header */}
                                <div>
                                  <label className="block text-xs text-gray-400 mb-2">Header</label>
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="color"
                                      value={card.header || "#0f172a"}
                                      onChange={(e) => handleColorChange(`card-${cardIndex}-header`, e.target.value)}
                                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={card.header || "#0f172a"}
                                      onChange={(e) => handleColorChange(`card-${cardIndex}-header`, e.target.value)}
                                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                    />
                                  </div>
                                </div>

                                {/* Card Subheader */}
                                {card.subheader && (
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-2">Subheader</label>
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="color"
                                        value={card.subheader || "#64748b"}
                                        onChange={(e) => handleColorChange(`card-${cardIndex}-subheader`, e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                      />
                                      <input
                                        type="text"
                                        value={card.subheader || "#64748b"}
                                        onChange={(e) => handleColorChange(`card-${cardIndex}-subheader`, e.target.value)}
                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Card Paragraph */}
                                <div>
                                  <label className="block text-xs text-gray-400 mb-2">Paragraph</label>
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="color"
                                      value={card.paragraph || "#64748b"}
                                      onChange={(e) => handleColorChange(`card-${cardIndex}-paragraph`, e.target.value)}
                                      className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={card.paragraph || "#64748b"}
                                      onChange={(e) => handleColorChange(`card-${cardIndex}-paragraph`, e.target.value)}
                                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                    />
                                  </div>
                                </div>

                                {/* Card Background */}
                                {card.background && (
                                  <div>
                                    <label className="block text-xs text-gray-400 mb-2">Background</label>
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="color"
                                        value={card.background || "#ffffff"}
                                        onChange={(e) => handleColorChange(`card-${cardIndex}-background`, e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                      />
                                      <input
                                        type="text"
                                        value={card.background || "#ffffff"}
                                        onChange={(e) => handleColorChange(`card-${cardIndex}-background`, e.target.value)}
                                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Card Button (if card has button) */}
                                {card.button && (
                                  <div className="pt-3 border-t border-white/5">
                                    <label className="block text-xs text-gray-400 mb-2">Button</label>
                                    <div className="space-y-2">
                                      <div>
                                        <label className="block text-xs text-gray-500 mb-1">Background</label>
                                        <div className="flex items-center gap-3">
                                          <input
                                            type="color"
                                            value={card.button.background || "#4f46e5"}
                                            onChange={(e) => handleColorChange(`card-${cardIndex}-button`, e.target.value)}
                                            className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                          />
                                          <input
                                            type="text"
                                            value={card.button.background || "#4f46e5"}
                                            onChange={(e) => handleColorChange(`card-${cardIndex}-button`, e.target.value)}
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-500 mb-1">Text</label>
                                        <div className="flex items-center gap-3">
                                          <input
                                            type="color"
                                            value={card.button.text || "#ffffff"}
                                            onChange={(e) => handleColorChange(`card-${cardIndex}-button-text`, e.target.value)}
                                            className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                          />
                                          <input
                                            type="text"
                                            value={card.button.text || "#ffffff"}
                                            onChange={(e) => handleColorChange(`card-${cardIndex}-button-text`, e.target.value)}
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={handleReset}
                  disabled={!selectedSection}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Section Selection Modal */}
      <AnimatePresence>
        {showSectionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSectionModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10004]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-[10005] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Select Section to Customize</h3>
                <button
                  onClick={() => setShowSectionModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                {layout.map((block) => {
                  const isSelected = targetSectionId === block.id;
                  return (
                    <button
                      key={block.id}
                      onClick={() => handleApplyMode("section", block.id)}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{getSectionDisplayName(block)}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSectionModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
