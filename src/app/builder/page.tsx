"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { getTemplateBySlug } from "../../lib/getTemplateBySlug";
import { SectionRegistry } from "../../lib/sectionRegistry";
import Sidebar from "../../components/builder/Sidebar";
import BuilderHeader from "../../components/builder/BuilderHeader";
import ThemeCustomizer from "../../components/builder/ThemeCustomizer";
import ThemeCustomizerV2 from "../../components/builder/ThemeCustomizerV2";
import { ImageIcon, Upload, X, Type, Trash2, ChevronUp, ChevronDown, Lock, Globe, Copy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { exportHTMLZip, exportReactZip, exportNextJsZip } from "../../lib/exporter";
import { API_BASE_URL, validateApiUrl } from "../../config";
import toast from "react-hot-toast";
import { getDefaultSectionTheme, type SectionTheme, applySectionTheme, applyGranularTheme } from "../../lib/sectionThemes";
import { getDefaultGranularTheme, type GranularSectionTheme } from "../../lib/sectionThemeFields";
import { themeToProps } from "../../lib/themeToProps";

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
  TouchSensor,
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
  const savedTemplateId = params.get("saved");
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
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | string | null>(
    null
  );
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  // Save modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTemplateName, setSaveTemplateName] = useState("");
  const [saveTemplateVisibility, setSaveTemplateVisibility] = useState(false); // false = private, true = public
  const [saveTemplateThumbnail, setSaveTemplateThumbnail] = useState<string>(""); // Thumbnail URL or base64
  const [thumbnailInputMode, setThumbnailInputMode] = useState<"upload" | "link">("upload");
  const [thumbnailLink, setThumbnailLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Responsive State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);

  // Load Template or Saved Template
  useEffect(() => {
    // If no template or saved template, start with empty builder
    if (!templateSlug && !savedTemplateId) {
      setLayout([]);
      setMounted(true);
      return;
    }

    // Check if loading a saved template
    if (savedTemplateId) {
      const loadSavedTemplate = async () => {
        try {
          // Try to fetch from API (works for both public and owned templates)
          const token = localStorage.getItem("token");
          const headers: HeadersInit = {};
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
          
          const res = await fetch(`${API_BASE_URL}/api/templates/saved/${savedTemplateId}`, {
            headers,
          });
          
          if (res.ok) {
            const data = await res.json();
            const template = data.template;
            if (template.layout && Array.isArray(template.layout)) {
              const sectionsWithIds = template.layout.map((sec: any, index: number) => {
                if (sec.theme) {
                  return {
                    ...sec,
                    id: sec.id ?? `block-${index}-${Date.now()}`,
                    theme: sec.theme,
                  };
                }
                const defaultGranularTheme = getDefaultGranularTheme(sec.type, sec.props);
                return {
                  ...sec,
                  id: sec.id ?? `block-${index}-${Date.now()}`,
                  theme: defaultGranularTheme,
                };
              });
              setLayout(sectionsWithIds);
              // Store in localStorage for reference
              localStorage.setItem("savedTemplate", JSON.stringify(template));
            }
          } else {
            // Fallback to localStorage if API fails
            const savedTemplateData = localStorage.getItem("savedTemplate");
            if (savedTemplateData) {
              try {
                const template = JSON.parse(savedTemplateData);
                if (template.layout && Array.isArray(template.layout)) {
                  const sectionsWithIds = template.layout.map((sec: any, index: number) => {
                    if (sec.theme) {
                      return {
                        ...sec,
                        id: sec.id ?? `block-${index}-${Date.now()}`,
                        theme: sec.theme,
                      };
                    }
                    const defaultGranularTheme = getDefaultGranularTheme(sec.type, sec.props);
                    return {
                      ...sec,
                      id: sec.id ?? `block-${index}-${Date.now()}`,
                      theme: defaultGranularTheme,
                    };
                  });
                  setLayout(sectionsWithIds);
                }
              } catch (err) {
                console.error("Error loading saved template from localStorage:", err);
              }
            }
          }
        } catch (err) {
          console.error("Error loading saved template:", err);
          // Fallback to localStorage
          const savedTemplateData = localStorage.getItem("savedTemplate");
          if (savedTemplateData) {
            try {
              const template = JSON.parse(savedTemplateData);
              if (template.layout && Array.isArray(template.layout)) {
                const sectionsWithIds = template.layout.map((sec: any, index: number) => ({
                  ...sec,
                  id: sec.id ?? `block-${index}-${Date.now()}`,
                }));
                setLayout(sectionsWithIds);
              }
            } catch (err) {
              console.error("Error loading saved template from localStorage:", err);
            }
          }
        }
      };
      
      loadSavedTemplate();
      return;
    }

    // Load regular template
    if (!templateSlug) return;
    const template = getTemplateBySlug(templateSlug);

    if (template && template.sections) {
      const sectionsWithIds = template.sections.map((sec, index) => {
        // Try to use existing theme, or create default granular theme
        if (sec.theme) {
          return {
            ...sec,
            id: sec.id ?? `block-${index}-${Date.now()}`,
            theme: sec.theme,
          };
        }
        const defaultGranularTheme = getDefaultGranularTheme(sec.type, sec.props);
        return {
          ...sec,
          id: sec.id ?? `block-${index}-${Date.now()}`,
          theme: defaultGranularTheme,
        };
      });

      setLayout(sectionsWithIds);
    }
  }, [templateSlug, savedTemplateId]);

  // Drag sensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
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
      const defaultGranularTheme = getDefaultGranularTheme(type, defaultProps);
      const newSection = {
        id: `block-${Date.now()}`,
        type,
        props: defaultProps,
        theme: defaultGranularTheme,
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
      setIsEditorOpen(false);
    }
  };

  // Duplicate section
  const handleDuplicateSection = (blockId: string) => {
    const blockIndex = layout.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const blockToDuplicate = layout[blockIndex];
    const duplicatedBlock = {
      ...blockToDuplicate,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      props: {
        ...blockToDuplicate.props,
        // Add "(Copy)" suffix to text fields to indicate duplication
        ...(blockToDuplicate.props.title && {
          title: `${blockToDuplicate.props.title} (Copy)`,
        }),
      },
    };

    setLayout((prev) => {
      const newLayout = [...prev];
      newLayout.splice(blockIndex + 1, 0, duplicatedBlock);
      return newLayout;
    });

    toast.success("Section duplicated successfully");
  };

  // Reset section to default
  const handleResetSection = (blockId: string) => {
    const blockIndex = layout.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const sectionType = layout[blockIndex].type;
    const sectionEntry = SectionRegistry[sectionType];

    if (!sectionEntry?.defaultProps) {
      toast.error("No default values available for this section");
      return;
    }

    const defaultGranularTheme = getDefaultGranularTheme(sectionType, sectionEntry.defaultProps);

    setLayout((prev) => {
      const newLayout = [...prev];
      newLayout[blockIndex] = {
        ...newLayout[blockIndex],
        props: { ...sectionEntry.defaultProps },
        theme: defaultGranularTheme, // Reset theme to default granular theme
      };
      return newLayout;
    });

    toast.success("Section reset to default values");
  };

  // Reset field to default
  const handleResetField = (blockId: string, fieldName: string) => {
    const blockIndex = layout.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const sectionType = layout[blockIndex].type;
    const sectionEntry = SectionRegistry[sectionType];

    if (!sectionEntry?.defaultProps || !sectionEntry.defaultProps[fieldName]) {
      toast.error("No default value available for this field");
      return;
    }

    setLayout((prev) => {
      const newLayout = [...prev];
      newLayout[blockIndex] = {
        ...newLayout[blockIndex],
        props: {
          ...newLayout[blockIndex].props,
          [fieldName]: sectionEntry.defaultProps[fieldName],
        },
      };
      return newLayout;
    });

    toast.success(`Field "${fieldName}" reset to default`);
  };

  // Duplicate field
  const handleDuplicateField = (blockId: string, fieldName: string) => {
    const blockIndex = layout.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return;

    const currentValue = getCurrentValue();
    if (currentValue === undefined || currentValue === null) {
      toast.error("No value to duplicate");
      return;
    }

    // Handle array fields (items, testimonials, projects, etc.)
    if (fieldName.startsWith("items-") || fieldName.startsWith("testimonials-") || 
        fieldName.startsWith("projects-") || fieldName.startsWith("features-") ||
        fieldName.startsWith("plans-") || fieldName.startsWith("members-")) {
      const parts = fieldName.split("-");
      const arrayName = parts[0]; // items, testimonials, etc.
      const index = Number(parts[1]);
      
      setLayout((prev) => {
        const newLayout = [...prev];
        const block = { ...newLayout[blockIndex] };
        const props = { ...block.props };
        
        if (!props[arrayName]) props[arrayName] = [];
        const array = [...props[arrayName]];
        
        // Duplicate the item at the specified index
        const itemToDuplicate = array[index];
        if (itemToDuplicate) {
          const duplicatedItem = typeof itemToDuplicate === "object" 
            ? { ...itemToDuplicate } 
            : itemToDuplicate;
          array.splice(index + 1, 0, duplicatedItem);
        }
        
        props[arrayName] = array;
        block.props = props;
        newLayout[blockIndex] = block;
        return newLayout;
      });

      toast.success(`Duplicated ${arrayName} item`);
    } else {
      // For simple fields, create a new field with "(Copy)" suffix
      const newFieldName = `${fieldName}Copy`;
      setLayout((prev) => {
        const newLayout = [...prev];
        newLayout[blockIndex] = {
          ...newLayout[blockIndex],
          props: {
            ...newLayout[blockIndex].props,
            [newFieldName]: currentValue,
          },
        };
        return newLayout;
      });

      toast.success(`Field duplicated as "${newFieldName}"`);
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
      
      // Use index directly - don't filter (like PortfolioGrid)
      const cardIndex = typeof selectedCardIndex === 'number' ? selectedCardIndex : Number(selectedCardIndex) || 0;
      
      // If array doesn't exist or is empty, get default values based on card type and index
      if (!array || !Array.isArray(array) || array.length === 0) {
        // Return default value based on card type, index, and field
        let defaultCard;
        if (selectedCardType === "plan") {
          const defaultPlans = [
            { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
            { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
            { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
          ];
          defaultCard = defaultPlans[cardIndex] || defaultPlans[0];
        } else if (selectedCardType === "testimonial") {
          const defaultTestimonials = [
            { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
            { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
            { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
          ];
          defaultCard = defaultTestimonials[cardIndex] || defaultTestimonials[0];
        } else {
          defaultCard = getDefaultCard(selectedCardType);
        }
        
        if (selectedCardType === "plan" && selectedField.startsWith("features-")) {
          const featureIndex = Number(selectedField.split("-")[1]);
          return defaultCard.features?.[featureIndex] ?? "";
        }
        return defaultCard[selectedField] ?? "";
      }
      
      // If card doesn't exist at this index, get default value for that specific card
      if (!array[cardIndex] || typeof array[cardIndex] !== 'object') {
        let defaultCard;
        if (selectedCardType === "plan") {
          const defaultPlans = [
            { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
            { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
            { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
          ];
          defaultCard = defaultPlans[cardIndex] || defaultPlans[0];
        } else if (selectedCardType === "testimonial") {
          const defaultTestimonials = [
            { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
            { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
            { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
          ];
          defaultCard = defaultTestimonials[cardIndex] || defaultTestimonials[0];
        } else {
          defaultCard = getDefaultCard(selectedCardType);
        }
        
        if (selectedCardType === "plan" && selectedField.startsWith("features-")) {
          const featureIndex = Number(selectedField.split("-")[1]);
          return defaultCard.features?.[featureIndex] ?? "";
        }
        return defaultCard[selectedField] ?? "";
      }
      
      const card = array[cardIndex];

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
      
      // Create a deep copy of the array to avoid reference issues
      let array = props[arrayName].map(card => card ? { ...card } : getDefaultCard(selectedCardType));
      
      // Use index directly (like PortfolioGrid does)
      const cardIndex = typeof selectedCardIndex === 'number' ? selectedCardIndex : Number(selectedCardIndex) || 0;
      
      // For pricing and testimonials, ensure we have at least 3 cards with default data
      if ((selectedCardType === "plan" || selectedCardType === "testimonial") && array.length === 0) {
        // Initialize with default cards
        const defaultCards = [];
        if (selectedCardType === "plan") {
          defaultCards.push(
            { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
            { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
            { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
          );
        } else if (selectedCardType === "testimonial") {
          defaultCards.push(
            { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
            { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
            { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
          );
        }
        array = defaultCards.map(card => ({ ...card }));
      }
      
      // Ensure array is long enough for the selected index
      while (array.length <= cardIndex) {
        // For pricing and testimonials, use index-specific defaults
        let defaultCard;
        if (selectedCardType === "plan") {
          const defaultPlans = [
            { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
            { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
            { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
          ];
          defaultCard = defaultPlans[array.length] || defaultPlans[0];
        } else if (selectedCardType === "testimonial") {
          const defaultTestimonials = [
            { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
            { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
            { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
          ];
          defaultCard = defaultTestimonials[array.length] || defaultTestimonials[0];
        } else {
          defaultCard = getDefaultCard(selectedCardType);
        }
        array.push({ ...defaultCard });
      }
      
      // Ensure the card at this index exists and is a new object (not shared reference)
      if (!array[cardIndex] || typeof array[cardIndex] !== 'object') {
        // Use index-specific default for pricing and testimonials
        let defaultCard;
        if (selectedCardType === "plan") {
          const defaultPlans = [
            { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
            { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
            { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
          ];
          defaultCard = defaultPlans[cardIndex] || defaultPlans[0];
        } else if (selectedCardType === "testimonial") {
          const defaultTestimonials = [
            { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
            { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
            { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
          ];
          defaultCard = defaultTestimonials[cardIndex] || defaultTestimonials[0];
        } else {
          defaultCard = getDefaultCard(selectedCardType);
        }
        array[cardIndex] = { ...defaultCard };
      } else {
        // Create a new object to avoid reference sharing
        array[cardIndex] = { ...array[cardIndex] };
      }
      
      // Update ONLY the specific field - don't merge with defaults
      if (
        selectedCardType === "plan" &&
        selectedField!.startsWith("features-")
      ) {
        const featureIndex = Number(selectedField!.split("-")[1]);
        if (!array[cardIndex].features) {
          array[cardIndex].features = [];
        }
        const features = [...(array[cardIndex].features || [])];
        // Ensure feature array is long enough
        while (features.length <= featureIndex) {
          features.push("");
        }
        features[featureIndex] = newValue;
        array[cardIndex] = { ...array[cardIndex], features };
      } else {
        // Directly update only the selected field - preserve all other fields
        array[cardIndex] = {
          ...array[cardIndex],
          [selectedField!]: newValue,
        };
      }
      
      // Save the updated array (create new array reference)
      props[arrayName] = [...array];
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
    setIsEditorOpen(true);
    // Close sidebar on mobile when editing starts
    setIsSidebarOpen(false);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to save templates");
      return;
    }

    if (layout.length === 0) {
      toast.error("Cannot save empty template");
      return;
    }

    // Load existing name, visibility, and thumbnail if updating
    if (savedTemplateId) {
      const savedTemplateData = localStorage.getItem("savedTemplate");
      if (savedTemplateData) {
        try {
          const template = JSON.parse(savedTemplateData);
          setSaveTemplateName(template.name || "");
          setSaveTemplateVisibility(template.isPublic || false);
          setSaveTemplateThumbnail(template.thumbnail || "");
          if (template.thumbnail && !template.thumbnail.startsWith("data:")) {
            setThumbnailLink(template.thumbnail);
            setThumbnailInputMode("link");
          } else {
            setThumbnailLink("");
            setThumbnailInputMode("upload");
          }
        } catch (err) {
          console.error("Error parsing saved template:", err);
        }
      }
    } else {
      setSaveTemplateName("");
      setSaveTemplateVisibility(false); // Default to private for new templates
      setSaveTemplateThumbnail("");
      setThumbnailLink("");
      setThumbnailInputMode("upload");
    }

    setShowSaveModal(true);
  };

  const handleSaveSubmit = async () => {
    if (!saveTemplateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    if (!validateApiUrl()) {
      toast.error("API configuration error. Please check your environment variables.");
      return;
    }

    setIsSaving(true);

    try {
      // Check if this is a public template and user is not the owner
      let isOwner = true;
      let shouldCreateNew = false;
      
      if (savedTemplateId) {
        const savedTemplateData = localStorage.getItem("savedTemplate");
        if (savedTemplateData) {
          try {
            const template = JSON.parse(savedTemplateData);
            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
            // Check if template is public and user is not the owner
            if (template.isPublic && template.user?._id !== currentUser._id) {
              isOwner = false;
              shouldCreateNew = true; // Save as new template instead of updating
            }
          } catch (err) {
            console.error("Error parsing saved template:", err);
          }
        }
      }

      const url = (savedTemplateId && isOwner)
        ? `${API_BASE_URL}/api/templates/saved/${savedTemplateId}`
        : `${API_BASE_URL}/api/templates/saved`;
      
      // Prepare form data for thumbnail upload (if file) or JSON for URL/base64
      const thumbnailValue = thumbnailInputMode === "link" && thumbnailLink.trim() 
        ? thumbnailLink.trim() 
        : saveTemplateThumbnail;

      const res = await fetch(url, {
        method: (savedTemplateId && isOwner) ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: saveTemplateName.trim(),
          originalTemplateSlug: templateSlug || (savedTemplateId ? `saved-${savedTemplateId}` : null),
          layout: layout,
          thumbnail: thumbnailValue || "",
          isPublic: saveTemplateVisibility, // Use visibility from modal
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShowSaveModal(false);
        setSaveTemplateName("");
        setSaveTemplateVisibility(false);
        setSaveTemplateThumbnail("");
        setThumbnailLink("");
        
        if (shouldCreateNew) {
          toast.success("Template saved as a new copy (original template is public and cannot be modified)", {
            duration: 5000,
          });
        } else {
          const visibilityMsg = saveTemplateVisibility 
            ? "Template saved and published! It's now visible to all users." 
            : "Template saved successfully!";
          toast.success(visibilityMsg, {
            duration: saveTemplateVisibility ? 5000 : 3000,
          });
        }
        
        // Update URL if it's a new save
        if ((!savedTemplateId || shouldCreateNew) && data.template?._id) {
          window.history.replaceState({}, "", `/builder?saved=${data.template._id}`);
          // Update localStorage
          localStorage.setItem("savedTemplate", JSON.stringify(data.template));
        } else if (savedTemplateId && isOwner && data.template) {
          // Update localStorage for existing template
          localStorage.setItem("savedTemplate", JSON.stringify(data.template));
        }
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to save template");
      }
    } catch (err) {
      console.error("Error saving template:", err);
      toast.error("Failed to save template. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async (exportType: "html" | "react" | "nextjs" = "html") => {
    if (layout.length === 0) {
      toast.error("Cannot export empty template");
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading("Exporting template...");
      
      // Perform export
      if (exportType === "html") {
        await exportHTMLZip(layout);
      } else if (exportType === "react") {
        await exportReactZip(layout);
      } else if (exportType === "nextjs") {
        await exportNextJsZip(layout);
      }

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Record export in database (non-blocking - export already succeeded)
      const token = localStorage.getItem("token");
      if (token && validateApiUrl()) {
        try {
          // Estimate file size (rough approximation)
          const estimatedSize = JSON.stringify(layout).length;

          const response = await fetch(`${API_BASE_URL}/api/templates/exported`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: `${templateSlug || "Untitled"} - ${exportType.toUpperCase()}`,
              exportType: exportType,
              status: "completed",
              fileSize: estimatedSize,
              layout: layout, // Optional: store layout for reference
            }),
          });

          if (!response.ok) {
            console.warn("Failed to record export in database:", response.statusText);
          }
        } catch (err) {
          // Silently fail - export was successful, database recording is optional
          console.warn("Could not record export in database (non-critical):", err);
        }
      }

      // Show success toast
      toast.success(`Template exported as ${exportType.toUpperCase()}!`, {
        duration: 3000,
      });
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Export failed. Please try again.");
    }
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= layout.length) return;
    
    setLayout(prev => arrayMove(prev, index, newIndex));
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
          onSave={handleSave}
          onExport={() => handleExport("html")}
          onThemeCustomize={() => setIsThemeCustomizerOpen(true)}
        />

        {/* THEME CUSTOMIZER V2 - Dynamic Section Fields */}
        <ThemeCustomizerV2
          isOpen={isThemeCustomizerOpen}
          onClose={() => setIsThemeCustomizerOpen(false)}
          layout={layout}
          selectedSectionId={selectedBlockIndex !== null ? layout[selectedBlockIndex]?.id : null}
          onUpdateSectionTheme={(sectionId, theme) => {
            // Deep clone theme to ensure isolation
            const clonedTheme = JSON.parse(JSON.stringify(theme));
            setLayout(prev => prev.map(block => 
              block.id === sectionId 
                ? { ...block, theme: clonedTheme }
                : block // Keep other sections' themes unchanged
            ));
          }}
        />

        {/* BODY */}
        <div className="flex flex-1 pt-16 overflow-hidden relative">
          {/* SIDEBAR */}
          <div
            className={`
              fixed lg:static inset-x-0 bottom-0 z-[60] 
              w-full lg:w-80 lg:inset-auto lg:h-full lg:border-r border-white/10 bg-gray-900/95 backdrop-blur-xl shrink-0
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-y-0" : "translate-y-full"}
              lg:translate-y-0
              h-[35vh] lg:h-auto
              border-t lg:border-t-0
            `}
          >
            <div className="h-full flex flex-col">
               {/* Mobile Header for Sidebar (drag handle/close) */}
               <div className="lg:hidden flex justify-center p-2" onClick={() => setIsSidebarOpen(false)}>
                 <div className="w-12 h-1.5 bg-gray-600 rounded-full cursor-pointer hover:bg-gray-500 transition-colors" />
               </div>
               <div className="flex-1 overflow-hidden">
                  <Sidebar layout={layout} onExport={handleExport} />
               </div>
            </div>
          </div>
          
          {/* Mobile Overlay for Sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

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
                        onReset={() => handleResetSection(block.id)}
                        onMove={(direction) => handleMoveSection(index, direction)}
                        isFirst={index === 0}
                        isLast={index === layout.length - 1}
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
          <div
             className={`
               fixed lg:static inset-x-0 bottom-0 z-[60]
               w-full lg:w-80 lg:inset-auto lg:h-auto lg:border-l border-white/10 bg-gray-900/95 backdrop-blur-xl flex flex-col shrink-0
               transform transition-transform duration-300 ease-in-out
               ${selectedBlockIndex !== null && selectedField && isEditorOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0 lg:hidden"}
               lg:${selectedBlockIndex !== null && selectedField ? "flex" : "hidden"}
               max-h-[35vh] lg:max-h-none h-[35vh] lg:h-auto
               border-t lg:border-t-0
               animate-none
             `}
          >
           {selectedBlockIndex !== null && selectedField && (
             <>
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
                    setIsEditorOpen(false);
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
                  <div className="text-xs text-gray-400 mb-3">
                    Editing: Block {selectedBlockIndex + 1} of {layout.length}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (selectedField) {
                          handleResetField(layout[selectedBlockIndex].id, selectedField);
                        }
                      }}
                      className="w-full px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Field
                    </button>
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
                            toast.error("File size must be less than 5MB");
                            return;
                          }
                          if (!file.type.startsWith("image/")) {
                            toast.error("Only image files are allowed");
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
                              toast.error("File size must be less than 5MB");
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

                {/* Card Management - Show if editing a card field */}
                {selectedCardType && selectedCardIndex !== null && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      Card Management
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (selectedBlockIndex === null || !selectedField) return;
                          const block = layout[selectedBlockIndex];
                          const arrayName = `${selectedCardType}s`;
                          const array = block.props[arrayName] || [];
                          const cardIndex = typeof selectedCardIndex === 'number' ? selectedCardIndex : Number(selectedCardIndex) || 0;
                          
                          if (array[cardIndex]) {
                            const duplicatedCard = typeof array[cardIndex] === 'object' 
                              ? { ...array[cardIndex] } 
                              : array[cardIndex];
                            
                            setLayout((prev) => {
                              const newLayout = [...prev];
                              const newBlock = { ...newLayout[selectedBlockIndex] };
                              const newProps = { ...newBlock.props };
                              const newArray = [...(newProps[arrayName] || [])];
                              newArray.splice(cardIndex + 1, 0, duplicatedCard);
                              newProps[arrayName] = newArray;
                              newBlock.props = newProps;
                              newLayout[selectedBlockIndex] = newBlock;
                              return newLayout;
                            });
                            
                            toast.success(`Card duplicated`);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Copy className="w-3 h-3" />
                        Duplicate Card
                      </button>
                      <button 
                        onClick={() => {
                          if (selectedBlockIndex === null || !selectedField) return;
                          const block = layout[selectedBlockIndex];
                          const arrayName = `${selectedCardType}s`;
                          const array = block.props[arrayName] || [];
                          const cardIndex = typeof selectedCardIndex === 'number' ? selectedCardIndex : Number(selectedCardIndex) || 0;
                          
                          if (array.length <= 1) {
                            toast.error("Cannot delete the last card");
                            return;
                          }
                          
                          if (array[cardIndex]) {
                            setLayout((prev) => {
                              const newLayout = [...prev];
                              const newBlock = { ...newLayout[selectedBlockIndex] };
                              const newProps = { ...newBlock.props };
                              const newArray = [...(newProps[arrayName] || [])];
                              newArray.splice(cardIndex, 1);
                              newProps[arrayName] = newArray;
                              newBlock.props = newProps;
                              newLayout[selectedBlockIndex] = newBlock;
                              
                              // Reset selection if deleted card was selected
                              if (cardIndex === (typeof selectedCardIndex === 'number' ? selectedCardIndex : Number(selectedCardIndex))) {
                                setSelectedCardIndex(null);
                                setSelectedField(null);
                                setIsEditorOpen(false);
                              }
                              
                              return newLayout;
                            });
                            
                            toast.success(`Card deleted`);
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete Card
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Card {typeof selectedCardIndex === 'number' ? selectedCardIndex + 1 : Number(selectedCardIndex) + 1} of {(() => {
                        const block = layout[selectedBlockIndex];
                        const arrayName = `${selectedCardType}s`;
                        return (block?.props[arrayName] || []).length;
                      })()}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Quick Actions
                  </div>
                  <button 
                    onClick={() => {
                      if (selectedField) {
                        handleResetField(layout[selectedBlockIndex].id, selectedField);
                      }
                    }}
                    className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-sm text-white transition-all flex items-center justify-between group"
                  >
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
                    setIsEditorOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Apply Changes
                </button>
              </div>

             </>
           )}
          </div>
          
          {/* Mobile Overlay for Editor */}
          {selectedBlockIndex !== null && selectedField && isEditorOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
              onClick={() => setIsEditorOpen(false)}
            />
          )}

          {/* MOBILE ACTION BAR */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-4 bg-gray-900/90 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
             <button
               onClick={() => {
                 setIsSidebarOpen(!isSidebarOpen);
                 setIsEditorOpen(false);
               }}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                 isSidebarOpen 
                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" 
                   : "text-gray-400 hover:text-white hover:bg-white/10"
               }`}
             >
               Sections
             </button>
             <div className="w-px h-4 bg-white/20" />
             <button
               onClick={() => {
                 if (selectedBlockIndex !== null) {
                   setIsEditorOpen(!isEditorOpen);
                   setIsSidebarOpen(false);
                 }
               }}
               disabled={selectedBlockIndex === null}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                 isEditorOpen
                   ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                   : selectedBlockIndex !== null
                     ? "text-gray-400 hover:text-white hover:bg-white/10"
                     : "text-gray-600 cursor-not-allowed"
               }`}
             >
               Edit
             </button>
          </div>
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

      {/* Save Modal */}
      {showSaveModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10001] p-4 animate-fadeIn"
          onClick={() => {
            if (!isSaving) {
              setShowSaveModal(false);
              setSaveTemplateName("");
            }
          }}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {savedTemplateId ? "Update Template" : "Save Template"}
              </h3>
              <p className="text-gray-400 text-sm">
                {savedTemplateId 
                  ? "Update your template name and save changes"
                  : "Give your template a name to save it"}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={saveTemplateName}
                onChange={(e) => setSaveTemplateName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isSaving) {
                    handleSaveSubmit();
                  }
                }}
                placeholder="Enter template name..."
                disabled={isSaving}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                autoFocus
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Thumbnail Image
              </label>
              
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailInputMode("upload");
                    setThumbnailLink("");
                  }}
                  disabled={isSaving}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    thumbnailInputMode === "upload"
                      ? "bg-purple-500/20 border-2 border-purple-500/50 text-purple-400"
                      : "bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailInputMode("link");
                    setSaveTemplateThumbnail("");
                  }}
                  disabled={isSaving}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    thumbnailInputMode === "link"
                      ? "bg-purple-500/20 border-2 border-purple-500/50 text-purple-400"
                      : "bg-white/5 border-2 border-white/10 text-gray-400 hover:border-white/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Link
                </button>
              </div>

              {/* Upload Mode */}
              {thumbnailInputMode === "upload" && (
                <div>
                  {/* Preview */}
                  {saveTemplateThumbnail && (
                    <div className="relative mb-3 group">
                      <img
                        src={saveTemplateThumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSaveTemplateThumbnail("");
                        }}
                        disabled={isSaving}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* Drag & Drop Area */}
                  <label
                    className={`w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all outline-none focus:outline-none box-border overflow-hidden ${
                      saveTemplateThumbnail
                        ? "border-white/10 bg-white/5"
                        : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (!isSaving) {
                        e.currentTarget.classList.add("border-purple-500", "bg-white/5");
                      }
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("border-purple-500", "bg-white/5");
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("border-purple-500", "bg-white/5");
                      if (isSaving) return;
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("File size must be less than 5MB");
                          return;
                        }
                        if (!file.type.startsWith("image/")) {
                          toast.error("Only image files are allowed");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSaveTemplateThumbnail(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden outline-none focus:outline-none"
                      disabled={isSaving}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("File size must be less than 5MB");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setSaveTemplateThumbnail(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Upload size={20} className="text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {saveTemplateThumbnail ? "Change thumbnail" : "Drag & drop or click to upload"}
                      </span>
                      <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                    </div>
                  </label>
                </div>
              )}

              {/* Link Mode */}
              {thumbnailInputMode === "link" && (
                <div>
                  {/* Preview */}
                  {thumbnailLink && (
                    <div className="relative mb-3 group">
                      <img
                        src={thumbnailLink}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border border-white/10"
                        onError={() => {
                          toast.error("Invalid image URL");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailLink("");
                        }}
                        disabled={isSaving}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* URL Input */}
                  <input
                    type="url"
                    value={thumbnailLink}
                    onChange={(e) => setThumbnailLink(e.target.value)}
                    placeholder="Paste image URL here..."
                    disabled={isSaving}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Visibility Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Visibility
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => !isSaving && setSaveTemplateVisibility(false)}
                  disabled={isSaving}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                    !saveTemplateVisibility
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    <span>Private</span>
                  </div>
                  <p className="text-xs mt-1 opacity-75">Only you can see it</p>
                </button>
                <button
                  type="button"
                  onClick={() => !isSaving && setSaveTemplateVisibility(true)}
                  disabled={isSaving}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                    saveTemplateVisibility
                      ? "bg-green-500/20 border-green-500/50 text-green-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Globe size={18} />
                    <span>Public</span>
                  </div>
                  <p className="text-xs mt-1 opacity-75">Visible to everyone</p>
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSaveSubmit}
                disabled={isSaving || !saveTemplateName.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  if (!isSaving) {
                    setShowSaveModal(false);
                    setSaveTemplateName("");
                    setSaveTemplateVisibility(false);
                    setSaveTemplateThumbnail("");
                    setThumbnailLink("");
                  }
                }}
                disabled={isSaving}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DndContext>
  );
}

// Section Theme Wrapper Component - applies theme as CSS variables
function SectionThemeWrapper({ 
  theme, 
  children 
}: { 
  theme: GranularSectionTheme | SectionTheme; 
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && theme) {
      // Check if it's semantic theme tokens (has colors.background structure)
      if ((theme as any).colors && typeof (theme as any).colors === 'object') {
        // Semantic tokens - apply as scoped CSS variables
        const tokens = theme as any;
        const cssVars: Record<string, string> = {
          "--bg": tokens.colors.background,
          "--surface": tokens.colors.surface,
          "--text-heading": tokens.colors.text.heading,
          "--text-subheading": tokens.colors.text.subheading,
          "--text-body": tokens.colors.text.body,
          "--text-muted": tokens.colors.text.muted,
          "--action-primary": tokens.colors.action.primary,
          "--action-primary-text": tokens.colors.action.primaryText,
          "--action-secondary": tokens.colors.action.secondary,
          "--action-secondary-text": tokens.colors.action.secondaryText,
          "--border": tokens.colors.border,
        };
        Object.entries(cssVars).forEach(([key, value]) => {
          wrapperRef.current?.style.setProperty(key, value);
        });
      } else if ((theme as any).background && typeof (theme as any).background === 'object' && 'type' in (theme as any).background) {
        // Granular theme - apply immediately
        applyGranularTheme(wrapperRef.current, theme);
      } else {
        // Legacy theme
        applySectionTheme(wrapperRef.current, theme as SectionTheme);
      }
      
      // Force a reflow to ensure styles are applied
      void wrapperRef.current.offsetHeight;
    }
  }, [JSON.stringify(theme)]);

  // Apply inline styles for immediate effect
  const getInlineStyle = (): React.CSSProperties => {
    if (!theme) return {};
    
    // Check if semantic theme tokens
    if ((theme as any).colors && typeof (theme as any).colors === 'object') {
      const tokens = theme as any;
      return {
        "--bg": tokens.colors.background,
        "--surface": tokens.colors.surface,
        "--text-heading": tokens.colors.text.heading,
        "--text-subheading": tokens.colors.text.subheading,
        "--text-body": tokens.colors.text.body,
        "--text-muted": tokens.colors.text.muted,
        "--action-primary": tokens.colors.action.primary,
        "--action-primary-text": tokens.colors.action.primaryText,
        "--action-secondary": tokens.colors.action.secondary,
        "--action-secondary-text": tokens.colors.action.secondaryText,
        "--border": tokens.colors.border,
      } as React.CSSProperties;
    } else if ((theme as any).background && typeof (theme as any).background === 'object' && 'type' in (theme as any).background) {
      // Granular theme (old system)
      const granularTheme = theme as GranularSectionTheme;
      const style: React.CSSProperties = {};
      
      if (granularTheme.background) {
        if (granularTheme.background.type === "gradient" && granularTheme.background.gradient) {
          style['--section-background' as any] = `linear-gradient(135deg, ${granularTheme.background.gradient.join(', ')})`;
        } else {
          style['--section-background' as any] = granularTheme.background.solid || "#ffffff";
        }
      }
      if (granularTheme.header) style['--section-header' as any] = granularTheme.header;
      if (granularTheme.subheader) style['--section-subheader' as any] = granularTheme.subheader;
      if (granularTheme.paragraph) style['--section-paragraph' as any] = granularTheme.paragraph;
      if (granularTheme.button) {
        style['--section-button-bg' as any] = granularTheme.button.background;
        style['--section-button-text' as any] = granularTheme.button.text;
      }
      if (granularTheme.button2) {
        style['--section-button2-bg' as any] = granularTheme.button2.background;
        style['--section-button2-text' as any] = granularTheme.button2.text;
      }
      if (granularTheme.accent) style['--section-accent' as any] = granularTheme.accent;
      if (granularTheme.icon) style['--section-icon' as any] = granularTheme.icon;
      
      return style;
    } else {
      // Legacy theme
      const legacyTheme = theme as SectionTheme;
      return {
        '--section-primary': legacyTheme.primary,
        '--section-secondary': legacyTheme.secondary,
        '--section-accent': legacyTheme.accent,
        '--section-background': legacyTheme.background,
        '--section-text': legacyTheme.text,
        '--section-border-radius': legacyTheme.borderRadius,
      } as React.CSSProperties;
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className="section-theme-wrapper"
      style={getInlineStyle()}
      data-section-id={(theme as any)?.sectionId || undefined}
    >
      {children}
    </div>
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
  onReset,
  onMove,
  isFirst,
  isLast,
}: {
  block: any;
  blockIndex: number;
  isSelected: boolean;
  setSelectedBlockIndex: (index: number) => void;
  onEdit: (field: string, cardIndex: number | string | null, cardType: string | null) => void;
  onDelete: () => void;
  onReset: () => void;
  onMove: (direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });
  
  const [showMoveMenu, setShowMoveMenu] = useState(false);

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
      onClick={() => {
          setSelectedBlockIndex(blockIndex);
          setShowMoveMenu(false); // allow closing by clicking content
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        onDoubleClick={(e) => {
            e.stopPropagation(); // prevent opening editor
            setShowMoveMenu(!showMoveMenu);
        }}
        className="absolute left-1/2 -top-3 -translate-x-1/2 w-16 h-6 bg-white border border-gray-200 shadow-md rounded-full cursor-grab flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-20 hover:bg-gray-50 hover:scale-105"
        title="Double-click for Move Controls (Mobile)"
      >
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Move Menu (Mobile Helper) */}
      {showMoveMenu && (
        <div className="absolute left-1/2 -top-12 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-1 flex items-center gap-1 z-30 animate-scaleIn">
            <button
                disabled={isFirst}
                onClick={(e) => {
                    e.stopPropagation();
                    onMove('up');
                }}
                className={`p-1.5 rounded-md hover:bg-gray-100 ${isFirst ? 'text-gray-300' : 'text-gray-600'}`}
            >
                <ChevronUp className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <button
                disabled={isLast}
                onClick={(e) => {
                    e.stopPropagation();
                    onMove('down');
                }}
                className={`p-1.5 rounded-md hover:bg-gray-100 ${isLast ? 'text-gray-300' : 'text-gray-600'}`}
            >
                <ChevronDown className="w-4 h-4" />
            </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="w-8 h-8 bg-white/90 backdrop-blur text-orange-500 border border-orange-100 shadow-sm rounded-lg flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:shadow-md hover:scale-105 transition-all"
          title="Reset to Default"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-8 h-8 bg-white/90 backdrop-blur text-red-500 border border-red-100 shadow-sm rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:shadow-md hover:scale-105 transition-all"
          title="Delete Section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* The actual content - pass color props directly */}
      <Component
        key={block.id}
        {...block.props}
        {...themeToProps(block.theme || getDefaultGranularTheme(block.type, block.props))}
        onEdit={(field, cardIndex, cardType) => {
          setSelectedBlockIndex(blockIndex);
          onEdit(field, cardIndex, cardType);
        }}
      />
    </div>
  );
}
