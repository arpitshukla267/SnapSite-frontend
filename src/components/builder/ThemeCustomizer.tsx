"use client";
import { useState, useEffect, useMemo } from "react";
import { X, Palette, RotateCcw, Check, Settings, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getDefaultGranularTheme, 
  getSectionThemeFields,
  type GranularSectionTheme,
  type ThemeField,
  type BackgroundType
} from "../../lib/sectionThemeFields";

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  layout?: any[];
  selectedSectionId?: string | null;
  onUpdateSectionTheme?: (sectionId: string, theme: GranularSectionTheme) => void;
}

export default function ThemeCustomizer({ 
  isOpen, 
  onClose, 
  layout = [],
  selectedSectionId,
  onUpdateSectionTheme
}: ThemeCustomizerProps) {
  // Get the selected section
  const selectedSection = selectedSectionId 
    ? layout.find(block => block.id === selectedSectionId)
    : null;

  // Get section's theme or default
  const getSectionTheme = (): GranularSectionTheme => {
    if (selectedSection?.theme) {
      const theme = JSON.parse(JSON.stringify(selectedSection.theme)); // Deep copy
      // Ensure cards are initialized if section has card arrays
      if (!theme.cards && selectedSection.props) {
        const cardArrays = ["items", "features", "testimonials", "projects", "plans", "members"];
        for (const arrayName of cardArrays) {
          if (selectedSection.props[arrayName] && Array.isArray(selectedSection.props[arrayName]) && selectedSection.props[arrayName].length > 0) {
            theme.cards = selectedSection.props[arrayName].map(() => ({
              header: "#0f172a",
              subheader: "#64748b",
              paragraph: "#64748b",
              background: "#ffffff",
            }));
            break;
          }
        }
      }
      return theme;
    }
    if (selectedSection?.type) {
      return getDefaultGranularTheme(selectedSection.type, selectedSection.props);
    }
    // Fallback
    return getDefaultGranularTheme("heroMinimal");
  };

  // Initialize theme
  const initialTheme = getSectionTheme();
  const [currentTheme, setCurrentTheme] = useState<GranularSectionTheme>(initialTheme);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [selectedSectionIds, setSelectedSectionIds] = useState<Set<string>>(new Set());
  const [applyToEntireTemplate, setApplyToEntireTemplate] = useState(false);
  const [hasSelectedOnce, setHasSelectedOnce] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  // Get theme fields for selected section, or use first section in layout as fallback
  const themeFields = useMemo(() => {
    if (selectedSection?.type) {
      return getSectionThemeFields(selectedSection.type);
    }
    // If no section selected but layout has sections, use first section's fields
    if (layout.length > 0 && layout[0]?.type) {
      return getSectionThemeFields(layout[0].type);
    }
    // Fallback to heroMinimal
    return getSectionThemeFields("heroMinimal");
  }, [selectedSection?.type, layout.length, layout[0]?.type]);

  // Update theme when selected section changes
  useEffect(() => {
    if (selectedSection) {
      const theme = getSectionTheme();
      setCurrentTheme(theme);
      setPendingChanges(false);
    } else if (layout.length > 0 && !selectedSectionId) {
      // If no section selected, use first section's default theme
      const firstSection = layout[0];
      if (firstSection?.type) {
        const defaultTheme = getDefaultGranularTheme(firstSection.type, firstSection.props);
        setCurrentTheme(defaultTheme);
        setPendingChanges(false);
      }
    }
  }, [selectedSectionId, selectedSection?.props, layout.length]);

  // Show modal when panel opens for the first time (if no section selected)
  useEffect(() => {
    if (isOpen && !selectedSectionId && !hasSelectedOnce && layout.length > 0) {
      setShowSectionModal(true);
    }
  }, [isOpen, selectedSectionId, hasSelectedOnce, layout.length]);

  const handleBackgroundTypeChange = (type: BackgroundType) => {
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme)); // Deep copy
    if (type === "gradient") {
      updatedTheme.background = {
        type: "gradient",
        gradient: currentTheme.background.gradient || ["#4f46e5", "#ec4899", "#f59e0b"],
      };
    } else {
      updatedTheme.background = {
        type: "solid",
        solid: currentTheme.background.solid || "#ffffff",
      };
    }
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
    
    // Apply immediately if section is selected
    if (selectedSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(selectedSectionId, updatedTheme);
      setPendingChanges(false);
    }
  };

  const handleBackgroundColorChange = (value: string) => {
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme)); // Deep copy
    if (updatedTheme.background.type === "solid") {
      updatedTheme.background.solid = value;
    }
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
    
    // Apply immediately if section is selected
    if (selectedSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(selectedSectionId, updatedTheme);
      setPendingChanges(false);
    }
  };

  const handleGradientColorChange = (index: number, value: string) => {
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme)); // Deep copy
    if (updatedTheme.background.type === "gradient" && updatedTheme.background.gradient) {
      updatedTheme.background.gradient[index] = value;
    }
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
    
    // Apply immediately if section is selected
    if (selectedSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(selectedSectionId, updatedTheme);
      setPendingChanges(false);
    }
  };

  const addGradientColor = () => {
    const updatedTheme = { ...currentTheme };
    if (updatedTheme.background.type === "gradient" && updatedTheme.background.gradient) {
      updatedTheme.background.gradient.push("#60a5fa");
    }
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
  };

  const removeGradientColor = (index: number) => {
    const updatedTheme = { ...currentTheme };
    if (updatedTheme.background.type === "gradient" && updatedTheme.background.gradient && updatedTheme.background.gradient.length > 2) {
      updatedTheme.background.gradient.splice(index, 1);
    }
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
  };

  const handleFieldChange = (fieldType: string, value: string, subField?: string) => {
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme)); // Deep copy
    
    if (fieldType === "button" || fieldType === "button2") {
      if (!updatedTheme[fieldType]) {
        updatedTheme[fieldType] = { background: "#4f46e5", text: "#ffffff" };
      }
      if (subField) {
        (updatedTheme[fieldType] as any)[subField] = value;
      }
    } else {
      (updatedTheme as any)[fieldType] = value;
    }
    
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
    
    // Apply immediately if section is selected
    if (selectedSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(selectedSectionId, updatedTheme);
      setPendingChanges(false);
    }
  };

  const handleCardFieldChange = (cardIndex: number, field: string, value: string) => {
    const updatedTheme = JSON.parse(JSON.stringify(currentTheme)); // Deep copy
    if (!updatedTheme.cards) {
      updatedTheme.cards = [];
    }
    if (!updatedTheme.cards[cardIndex]) {
      updatedTheme.cards[cardIndex] = {
        header: "#0f172a",
        subheader: "#64748b",
        paragraph: "#64748b",
      };
    }
    (updatedTheme.cards[cardIndex] as any)[field] = value;
    setCurrentTheme(updatedTheme);
    setPendingChanges(true);
    
    // Apply immediately if section is selected
    if (selectedSectionId && onUpdateSectionTheme) {
      onUpdateSectionTheme(selectedSectionId, updatedTheme);
      setPendingChanges(false);
    }
  };

  const handleApply = () => {
    if (!onUpdateSectionTheme) return;

    if (selectedSectionId) {
      // Apply to selected section
      onUpdateSectionTheme(selectedSectionId, { ...currentTheme });
      setPendingChanges(false);
    } else if (applyToEntireTemplate) {
      // Apply to all sections
      layout.forEach(block => {
        if (block.id) {
          onUpdateSectionTheme(block.id, { ...currentTheme });
        }
      });
      setPendingChanges(false);
      setHasSelectedOnce(true);
      setShowSectionModal(false);
    } else if (selectedSectionIds.size > 0) {
      // Apply to selected sections
      selectedSectionIds.forEach(sectionId => {
        onUpdateSectionTheme(sectionId, { ...currentTheme });
      });
      setPendingChanges(false);
      setHasSelectedOnce(true);
      setShowSectionModal(false);
    }
  };

  const handleReset = () => {
    if (!selectedSection?.type) return;
    const defaultTheme = getDefaultGranularTheme(selectedSection.type, selectedSection.props);
    setCurrentTheme(defaultTheme);
    setPendingChanges(true);
  };

  const handleCancelModal = () => {
    setApplyToEntireTemplate(false);
    setSelectedSectionIds(new Set());
    setHasSelectedOnce(true);
    setShowSectionModal(false);
  };

  const toggleSection = (sectionId: string) => {
    const newSet = new Set(selectedSectionIds);
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId);
    } else {
      newSet.add(sectionId);
    }
    setSelectedSectionIds(newSet);
    setApplyToEntireTemplate(false);
  };

  const openSectionSelector = () => {
    setShowSectionModal(true);
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

  const backgroundField = themeFields.find(f => f.type === "background");
  const hasCards = currentTheme.cards && currentTheme.cards.length > 0;

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
                      {selectedSectionId 
                        ? getSectionDisplayName(selectedSection)
                        : "Select a section to customize"}
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
                {!selectedSectionId && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-300">
                      Select a section in the builder to customize its theme, or use the section selector below.
                    </p>
                  </div>
                )}

                {/* Section Selection Indicator */}
                {!selectedSectionId && (
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">
                        Apply To
                      </span>
                      <button
                        onClick={openSectionSelector}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="Change Selection"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-white">
                      {applyToEntireTemplate ? (
                        <span className="text-purple-300 font-semibold">Entire Template</span>
                      ) : selectedSectionIds.size > 0 ? (
                        <span className="text-purple-300 font-semibold">
                          {selectedSectionIds.size} Section{selectedSectionIds.size > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-gray-400">No selection</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Debug: Show if fields are available */}
                {themeFields.length === 0 && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-sm text-red-300">
                      No theme fields found for section type: {selectedSection?.type || "unknown"}
                    </p>
                  </div>
                )}

                {themeFields.length > 0 && (
                  <>
                    {/* Background */}
                    {backgroundField && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          {backgroundField.label}
                        </label>
                        {backgroundField.supportsGradient && (
                          <div className="mb-3 flex gap-2">
                            <button
                              onClick={() => handleBackgroundTypeChange("solid")}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                currentTheme.background.type === "solid"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                              }`}
                            >
                              Solid
                            </button>
                            <button
                              onClick={() => handleBackgroundTypeChange("gradient")}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                currentTheme.background.type === "gradient"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                              }`}
                            >
                              Gradient
                            </button>
                          </div>
                        )}
                        {currentTheme.background.type === "solid" ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={currentTheme.background.solid || "#ffffff"}
                              onChange={(e) => handleBackgroundColorChange(e.target.value)}
                              className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={currentTheme.background.solid || "#ffffff"}
                              onChange={(e) => handleBackgroundColorChange(e.target.value)}
                              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {currentTheme.background.gradient?.map((color, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={color}
                                  onChange={(e) => handleGradientColorChange(index, e.target.value)}
                                  className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={color}
                                  onChange={(e) => handleGradientColorChange(index, e.target.value)}
                                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                                {currentTheme.background.gradient && currentTheme.background.gradient.length > 2 && (
                                  <button
                                    onClick={() => removeGradientColor(index)}
                                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={addGradientColor}
                              className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Color
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Other Fields */}
                    {themeFields.filter(f => f.type !== "background").map((field) => (
                      <div key={field.type}>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          {field.label}
                        </label>
                        {field.type === "button" || field.type === "button2" ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 w-20">Background</span>
                              <input
                                type="color"
                                value={currentTheme[field.type]?.background || "#4f46e5"}
                                onChange={(e) => handleFieldChange(field.type, e.target.value, "background")}
                                className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={currentTheme[field.type]?.background || "#4f46e5"}
                                onChange={(e) => handleFieldChange(field.type, e.target.value, "background")}
                                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 w-20">Text</span>
                              <input
                                type="color"
                                value={currentTheme[field.type]?.text || "#ffffff"}
                                onChange={(e) => handleFieldChange(field.type, e.target.value, "text")}
                                className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={currentTheme[field.type]?.text || "#ffffff"}
                                onChange={(e) => handleFieldChange(field.type, e.target.value, "text")}
                                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={(currentTheme as any)[field.type] || field.defaultColor}
                              onChange={(e) => handleFieldChange(field.type, e.target.value)}
                              className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={(currentTheme as any)[field.type] || field.defaultColor}
                              onChange={(e) => handleFieldChange(field.type, e.target.value)}
                              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Cards */}
                    {hasCards && (
                      <div className="pt-4 border-t border-white/10">
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Cards ({currentTheme.cards?.length})
                        </label>
                        <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                          {currentTheme.cards?.map((card, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-3 space-y-2">
                              <div className="text-xs font-medium text-gray-400 mb-2">Card {index + 1}</div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-16">Header</span>
                                  <input
                                    type="color"
                                    value={card.header}
                                    onChange={(e) => handleCardFieldChange(index, "header", e.target.value)}
                                    className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={card.header}
                                    onChange={(e) => handleCardFieldChange(index, "header", e.target.value)}
                                    className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs font-mono"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-16">Subheader</span>
                                  <input
                                    type="color"
                                    value={card.subheader}
                                    onChange={(e) => handleCardFieldChange(index, "subheader", e.target.value)}
                                    className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={card.subheader}
                                    onChange={(e) => handleCardFieldChange(index, "subheader", e.target.value)}
                                    className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs font-mono"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-16">Paragraph</span>
                                  <input
                                    type="color"
                                    value={card.paragraph}
                                    onChange={(e) => handleCardFieldChange(index, "paragraph", e.target.value)}
                                    className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={card.paragraph}
                                    onChange={(e) => handleCardFieldChange(index, "paragraph", e.target.value)}
                                    className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs font-mono"
                                  />
                                </div>
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
                {selectedSectionId && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                )}
                {pendingChanges && (
                  <button
                    onClick={handleApply}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
                  >
                    Apply Changes
                  </button>
                )}
                {!pendingChanges && (
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
                  >
                    Done
                  </button>
                )}
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
              onClick={handleCancelModal}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10004]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-[10005] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Apply Theme To</h3>
                <button
                  onClick={handleCancelModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                <button
                  onClick={() => {
                    setApplyToEntireTemplate(true);
                    setSelectedSectionIds(new Set());
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    applyToEntireTemplate
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white mb-1">Entire Template</div>
                      <div className="text-xs text-gray-400">Apply theme to all sections</div>
                    </div>
                    {applyToEntireTemplate && <Check className="w-5 h-5 text-purple-400" />}
                  </div>
                </button>

                {layout.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                      Select Sections
                    </div>
                    {layout.map((block) => {
                      const isSelected = selectedSectionIds.has(block.id);
                      return (
                        <button
                          key={block.id}
                          onClick={() => toggleSection(block.id)}
                          className={`w-full p-3 rounded-lg border transition-all text-left mb-2 ${
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
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelModal}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
