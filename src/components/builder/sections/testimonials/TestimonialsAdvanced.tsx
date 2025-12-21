"use client";
import { useState, useEffect, useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function TestimonialsAdvanced({
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it",
  testimonials = [],
  autoSlide = true,
  slideInterval = 5000,
  enableDepthTransitions = true,
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{ name: string; role: string; content: string; image?: string; rating?: number }>;
  autoSlide?: boolean;
  slideInterval?: number;
  enableDepthTransitions?: boolean;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string }>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const defaultTestimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "This platform has transformed how we build websites. Incredible experience!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Designer, Creative Agency",
      content: "The best website builder I've ever used. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Founder, StartupCo",
      content: "Fast, intuitive, and powerful. Everything we needed and more.",
      rating: 5,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  useEffect(() => {
    if (!autoSlide || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, isPaused, slideInterval, items.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100"
              style={{ backgroundColor: cardColors[currentIndex]?.backgroundColor || "#ffffff" }}
            >
              <div className="flex items-start gap-6">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: accentColor
                    }}
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(items[currentIndex]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  {(() => {
                    const currentCard = items[currentIndex];
                    const cardColor = cardColors[currentIndex] || {};
                    const cardBg = cardColor.backgroundColor || "#ffffff";
                    const cardHeaderColor = cardColor.headerColor || titleColor;
                    const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
                    const cardParagraphColor = cardColor.paragraphColor || subtitleColor;

                    return (
                      <>
                        <p
                          className="text-xl leading-relaxed mb-6 cursor-pointer"
                          style={{ color: cardParagraphColor }}
                          onClick={() => onEdit?.("testimonials", currentIndex)}
                        >
                          <TextEditable onClick={() => onEdit?.("testimonials", currentIndex)}>
                            "{currentCard?.content || "Amazing experience!"}"
                          </TextEditable>
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          {currentCard?.image && (
                            <img
                              src={currentCard.image}
                              alt={currentCard?.name}
                              className="w-12 h-12 rounded-full object-cover border-2"
                              style={{ borderColor: accentColor }}
                            />
                          )}
                          <div>
                            <div
                              className="font-semibold cursor-pointer"
                              style={{ color: cardHeaderColor }}
                              onClick={() => onEdit?.("testimonials", currentIndex)}
                            >
                              <TextEditable onClick={() => onEdit?.("testimonials", currentIndex)}>
                                {currentCard?.name || "John Doe"}
                              </TextEditable>
                            </div>
                            <div
                              className="text-sm cursor-pointer"
                              style={{ color: cardSubheaderColor }}
                              onClick={() => onEdit?.("testimonials", currentIndex)}
                            >
                              <TextEditable onClick={() => onEdit?.("testimonials", currentIndex)}>
                                {currentCard?.role || "CEO, Company"}
                              </TextEditable>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-purple-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

