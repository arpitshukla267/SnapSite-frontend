"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getTemplateBySlug } from "../../lib/getTemplateBySlug";
import { SectionRegistry } from "../../lib/sectionRegistry";
import Sidebar from "../../components/builder/Sidebar";
import BuilderHeader from "../../components/builder/BuilderHeader";
import { ImageIcon } from "lucide-react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import { Type } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// DnD Kit Imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function BuilderContent() {
  const params = useSearchParams();
  const templateSlug = params.get("template");
  const [mounted, setMounted] = useState(false);

  // Layout state
  const [layout, setLayout] = useState<any[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  // Editor state
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null
  );
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  // Load Template
  useEffect(() => {
    if (!templateSlug) return;
    const template = getTemplateBySlug(templateSlug);

    if (template && template.sections) {
      const sectionsWithIds = template.sections.map((sec, index) => ({
        ...sec,
        id: sec.id ?? `block-${index}-${Date.now()}`,
      }));

      setLayout(sectionsWithIds);
    }
  }, [templateSlug]);

  // Drag sensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    if (event.active.data.current?.isSidebar) {
      setActiveDragItem({ ...event.active.data.current, id: event.active.id });
    } else {
      const item = layout.find((i) => i.id === event.active.id);
      setActiveDragItem(item);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    // IF DROPPING FROM SIDEBAR
    if (active.data.current?.isSidebar) {
      const type = active.data.current.type;
      const defaultProps = active.data.current.props;
      const newSection = {
        id: `block-${Date.now()}`,
        type,
        props: defaultProps,
      };

      setLayout((prev) => {
        const overId = String(over.id);

        // Insert between sections when dropping on an insert zone (insert-<index>)
        if (overId.startsWith("insert-")) {
          const idx = Number(overId.split("-")[1]);
          const next = [...prev];
          next.splice(idx, 0, newSection);
          return next;
        }

        // Replace the hovered section when dropped directly onto it
        const overIndex = prev.findIndex((item) => item.id === overId);
        if (overIndex !== -1) {
          const newLayout = [...prev];
          newLayout[overIndex] = newSection;
          return newLayout;
        }

        // Fallback: append
        return [...prev, newSection];
      });
      return;
    }

    // IF REORDERING (moving an existing section)
    const overId = String(over.id);

    // Dropped on an insert zone -> move item to that index
    if (overId.startsWith("insert-")) {
      const toIndex = Number(overId.split("-")[1]);
      setLayout((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        if (oldIndex === -1) return prev;
        const item = prev[oldIndex];
        const without = prev.filter((i) => i.id !== active.id);
        const next = [...without];
        next.splice(toIndex, 0, item);
        return next;
      });
      return;
    }

    // Dropped directly on another section -> standard reorder/replace behavior
    if (active.id !== over.id) {
      const oldIndex = layout.findIndex((i) => i.id === active.id);
      const newIndex = layout.findIndex((i) => i.id === overId);

      setLayout((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleDeleteSection = (blockId) => {
    setLayout((prev) => prev.filter((item) => item.id !== blockId));
    if (
      selectedBlockIndex !== null &&
      layout[selectedBlockIndex]?.id === blockId
    ) {
      setSelectedBlockIndex(null);
      setSelectedField(null);
    }
  };

  const openDeleteModal = (blockId: string) => {
    setDeletingBlockId(blockId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingBlockId) {
      handleDeleteSection(deletingBlockId);
      setShowDeleteModal(false);
      setDeletingBlockId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingBlockId(null);
  };

  // CHECK IMAGE FIELD
  const isImageField = (field) => {
    const fieldLower = field.toLowerCase();
    return (
      fieldLower.includes("image") ||
      fieldLower.includes("media") ||
      fieldLower.includes("video") ||
      (fieldLower.includes("block") && /[123]/.test(fieldLower))
    );
  };

  // GET VALUE
  const getCurrentValue = () => {
    if (selectedBlockIndex === null || !selectedField) return "";

    const block = layout[selectedBlockIndex];
    if (!block) return "";
    const { props } = block;

    // CARD-BASED FIELDS
    if (selectedCardType && selectedCardIndex !== null) {
      const arrayName = `${selectedCardType}s`;
      const array = props[arrayName];
      if (!array || !Array.isArray(array)) return "";
      const filteredArray = array.filter((item) => item !== undefined);
      if (!filteredArray[selectedCardIndex]) return "";
      const card = filteredArray[selectedCardIndex];

      if (
        selectedCardType === "plan" &&
        selectedField.startsWith("features-")
      ) {
        const featureIndex = Number(selectedField.split("-")[1]);
        return card.features?.[featureIndex] ?? "";
      }
      return card[selectedField] ?? "";
    }

    // SIMPLE ARRAY FIELDS
    if (selectedField.startsWith("items-")) {
      const parts = selectedField.split("-");
      const index = Number(parts[1]);
      const items = (props.items || []).filter((item) => item !== undefined);
      if (parts.length > 2) {
        const subField = parts[2];
        return items[index]?.[subField] ?? "";
      }
      return items[index] ?? "";
    }

    if (selectedField.startsWith("links-")) {
      const index = Number(selectedField.split("-")[1]);
      const links = (props.links || []).filter((item) => item !== undefined);
      return links[index] ?? "";
    }

    if (selectedField.startsWith("features-")) {
      const parts = selectedField.split("-");
      const index = Number(parts[1]);
      const subField = parts[2];
      const features = (props.features || []).filter(
        (item) => item !== undefined
      );
      return features[index]?.[subField] ?? "";
    }

    return props[selectedField] ?? "";
  };

  // SET VALUE
  const handleValueChange = (newValue) => {
    if (selectedBlockIndex === null) return;
    const updated = [...layout];
    const block = updated[selectedBlockIndex];
    const { props } = block;

    if (selectedCardType && selectedCardIndex !== null) {
      const arrayName = `${selectedCardType}s`;
      if (!props[arrayName]) props[arrayName] = [];
      const array = [...props[arrayName]].filter((item) => item !== undefined);
      if (!array[selectedCardIndex]) {
        array[selectedCardIndex] = getDefaultCard(selectedCardType);
      }
      if (
        selectedCardType === "plan" &&
        selectedField!.startsWith("features-")
      ) {
        const featureIndex = Number(selectedField!.split("-")[1]);
        if (!array[selectedCardIndex].features)
          array[selectedCardIndex].features = [];
        const features = [...array[selectedCardIndex].features];
        features[featureIndex] = newValue;
        array[selectedCardIndex] = { ...array[selectedCardIndex], features };
      } else {
        array[selectedCardIndex] = {
          ...array[selectedCardIndex],
          [selectedField!]: newValue,
        };
      }
      props[arrayName] = array.filter((item) => item !== undefined);
    } else if (selectedField!.startsWith("items-")) {
      const parts = selectedField!.split("-");
      const index = Number(parts[1]);
      if (!props.items) props.items = [];
      const items = [...props.items].filter((item) => item !== undefined);

      if (parts.length > 2) {
        const subField = parts[2];
        if (typeof items[index] !== "object" || items[index] === null) {
          items[index] = { title: items[index] || "", desc: "" };
        }
        items[index] = { ...items[index], [subField]: newValue };
      } else {
        items[index] = newValue;
      }
      props.items = items.filter((item) => item !== undefined);
    } else if (selectedField!.startsWith("links-")) {
      const index = Number(selectedField!.split("-")[1]);
      if (!props.links) props.links = [];
      const links = [...props.links].filter((item) => item !== undefined);
      links[index] = newValue;
      props.links = links.filter((item) => item !== undefined);
    } else if (selectedField!.startsWith("features-")) {
      const parts = selectedField!.split("-");
      const index = Number(parts[1]);
      const subField = parts[2];
      if (!props.features) props.features = [];
      const features = [...props.features].filter((item) => item !== undefined);
      if (!features[index]) features[index] = { title: "", desc: "" };
      features[index] = { ...features[index], [subField]: newValue };
      props.features = features.filter((item) => item !== undefined);
    } else {
      props[selectedField!] = newValue;
    }
    setLayout(updated);
  };

  const getDefaultCard = (cardType) => {
    switch (cardType) {
      case "member":
        return { name: "", role: "", bio: "", image: "" };
      case "project":
        return { title: "", category: "", description: "", image: "" };
      case "testimonial":
        return { name: "", role: "", text: "", image: "", rating: 5 };
      case "plan":
        return {
          name: "",
          price: "",
          period: "/month",
          features: [],
          popular: false,
        };
      default:
        return {};
    }
  };

  const handleEdit = (
    fieldName,
    cardIndex: number | null = null,
    cardType: string | null = null
  ) => {
    setSelectedField(fieldName);
    setSelectedCardIndex(cardIndex);
    setSelectedCardType(cardType);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: "0.4" },
      },
    }),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a minimal placeholder on the server so the initial HTML
    // matches the client before any client-only effects run. This
    // prevents hydration mismatch warnings caused by dynamic content
    // that changes immediately on mount.
    return (
      <div className="h-screen w-full flex items-center justify-center p-8">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <BuilderHeader
          templateName={templateSlug || "Site"}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* BODY */}
        <div className="flex flex-1 pt-16 overflow-hidden relative">
          {/* SIDEBAR */}
          <div className="w-80 border-r border-white/10 bg-gray-900/95 backdrop-blur-xl shrink-0">
            <Sidebar layout={layout} />
          </div>

          {/* CANVAS */}
          <div className="flex-1 bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-y-auto scroll-minimal p-4 sm:p-6 lg:p-8 flex justify-center">
            
            <div
              className={`
                transition-all duration-300 ease-in-out bg-white shadow-xl rounded-xl overflow-hidden
                ${viewMode === "desktop" ? "w-full max-w-[1200px]" : ""}
                ${viewMode === "tablet" ? "w-[768px]" : ""}
                ${viewMode === "mobile" ? "w-[375px]" : ""}
                min-h-[800px] h-fit @container
              `}
            >
              <SortableContext
                items={layout.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col min-h-full pb-20">
                  {layout.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-20 border-2 border-dashed border-gray-200 m-8 rounded-xl bg-gray-50">
                      <p className="text-lg font-medium">
                        Drag sections here to start building
                      </p>
                    </div>
                  )}

                  {/* Insert zone before first item */}
                  <InsertZone index={0} />

                  {layout.map((block, index) => (
                    <div key={block.id} className="relative">
                      <SortableSection
                        block={block}
                        blockIndex={index}
                        isSelected={selectedBlockIndex === index}
                        setSelectedBlockIndex={setSelectedBlockIndex}
                        onEdit={handleEdit}
                        onDelete={() => openDeleteModal(block.id)}
                      />

                      {/* Insert zone after this item (index+1) */}
                      <InsertZone index={index + 1} />
                    </div>
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>

          {/* RIGHT EDITOR PANEL */}
          {selectedBlockIndex !== null && selectedField && (
            <div className="w-80 border-l border-white/10 bg-gray-900/80 backdrop-blur-xl flex flex-col shrink-0 animate-slideIn">
              {/* Panel Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    {isImageField(selectedField) ? (
                      <ImageIcon size={16} className="text-purple-400" />
                    ) : (
                      <Type size={16} className="text-purple-400" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">Edit Content</h3>
                </div>
                <button
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                  onClick={() => {
                    setSelectedBlockIndex(null);
                    setSelectedField(null);
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 overflow-y-auto scroll-minimal flex-1 custom-scrollbar space-y-6">
                {/* Field Info */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                    Field Name
                  </label>
                  <div className="text-sm font-medium text-white bg-white/5 px-3 py-2 rounded-lg border border-white/10 break-words">
                    {selectedField}
                  </div>
                </div>

                {/* Section Info */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-300">
                      SECTION TYPE
                    </span>
                    <span className="text-xs text-purple-400">
                      {layout[selectedBlockIndex].type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Editing: Block {selectedBlockIndex + 1} of {layout.length}
                  </div>
                </div>

                {/* Value Editor */}
                {isImageField(selectedField) ? (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">
                      Image / Media
                    </label>

                    {/* Current Image Preview */}
                    {getCurrentValue() && (
                      <div className="relative group">
                        <img
                          src={getCurrentValue()}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg border border-white/10"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded transition-transform hover:scale-105">
                            Remove
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Upload Button */}
                    <label
                      className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 hover:border-purple-500/50 hover:bg-white/5 transition-all group cursor-pointer block"
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add(
                          "border-purple-500",
                          "bg-white/5"
                        );
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(
                          "border-purple-500",
                          "bg-white/5"
                        );
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove(
                          "border-purple-500",
                          "bg-white/5"
                        );
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("File size must be less than 5MB");
                            return;
                          }
                          if (!file.type.startsWith("image/")) {
                            alert("Only image files are allowed");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            handleValueChange(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <Upload
                            size={20}
                            className="text-gray-400 group-hover:text-purple-400"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                          Click or Drag to upload
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              alert("File size must be less than 5MB");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              handleValueChange(reader.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    {/* URL Input */}
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-gray-500"
                        value={getCurrentValue()}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder="Or paste image URL..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">
                      Content
                    </label>
                    <textarea
                      className="w-full bg-white/5 border border-white/10 px-3 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all min-h-[200px] text-sm leading-relaxed placeholder-gray-500 custom-scrollbar"
                      value={getCurrentValue()}
                      onChange={(e) => handleValueChange(e.target.value)}
                      placeholder="Enter your content here..."
                    />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{getCurrentValue().length} characters</span>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        Clear
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Quick Actions
                  </div>
                  <button className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-sm text-white transition-all flex items-center justify-between group">
                    <span>Duplicate Field</span>
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-sm text-white transition-all flex items-center justify-between group">
                    <span>Reset to Default</span>
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-4 border-t border-white/10 bg-gray-950/50 shrink-0">
                <button
                  onClick={() => {
                    setSelectedBlockIndex(null);
                    setSelectedField(null);
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DELETE CONFIRMATION MODAL */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={cancelDelete}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Section?
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this section? This action cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-red-500/25"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItem ? (
            activeDragItem.isSidebar ? (
              <div className="bg-white p-2 rounded-xl shadow-2xl border-2 border-blue-500 w-80 opacity-95 cursor-grabbing overflow-hidden transform scale-105 z-[99999]">
                <div className="h-32 bg-gray-100 mb-2 rounded-lg flex items-center justify-center overflow-hidden relative">
                  {activeDragItem.props?.image ? (
                    <img
                      src={activeDragItem.props.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Preview</span>
                  )}
                </div>
                <div className="font-bold text-sm text-center py-1">
                  {activeDragItem.name}
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-xl border border-blue-200 w-full h-24 flex items-center justify-center opacity-80 cursor-grabbing bg-stripes-blue">
                <span className="font-medium text-blue-600">
                  Moving Section...
                </span>
              </div>
            )
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center p-8">
          <div className="text-gray-500">Loading builder...</div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}

// SORTABLE SECTION COMPONENT

// INSERT ZONE COMPONENT — a thin droppable area between sections
function InsertZone({ index }: { index: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: `insert-${index}` });

  return (
    <div
      ref={setNodeRef}
      className={`h-4 transition-all ${isOver ? 'bg-blue-100/60 my-2 rounded-lg border border-blue-200' : 'my-2'}`}
      aria-hidden
    />
  );
}
function SortableSection({
  block,
  blockIndex,
  isSelected,
  setSelectedBlockIndex,
  onEdit,
  onDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = SectionRegistry[block.type]?.component;

  if (!Component) {
    return (
      <div className="p-4 border-2 border-red-500 rounded text-red-500 m-4">
        Unknown section: {block.type}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-blue-500 z-10"
          : "hover:ring-1 hover:ring-blue-300"
      }`}
      onClick={() => setSelectedBlockIndex(blockIndex)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1/2 -top-3 -translate-x-1/2 w-16 h-6 bg-white border border-gray-200 shadow-md rounded-full cursor-grab flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-gray-50 hover:scale-105"
        title="Drag to Move"
      >
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-4 top-4 w-8 h-8 bg-white/90 backdrop-blur text-red-500 border border-red-100 shadow-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-50 hover:border-red-200 hover:shadow-md hover:scale-105"
        title="Delete Section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>

      {/* The actual content */}
      <div className="">
        <Component
          {...block.props}
          onEdit={(field, cardIndex, cardType) => {
            setSelectedBlockIndex(blockIndex);
            onEdit(field, cardIndex, cardType);
          }}
        />
      </div>
    </div>
  );
}
