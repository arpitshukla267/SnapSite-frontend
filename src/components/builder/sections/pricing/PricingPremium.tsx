"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function PricingPremium({
  title = "Simple, Transparent Pricing",
  subtitle = "Choose the perfect plan for your needs",
  plans = [],
  onEdit,
  backgroundColor = "#0f172a",
  titleColor = "#ffffff",
  subtitleColor = "#cbd5e1",
  accentColor = "#4f46e5",
  cardColors = [],
}: {
  title?: string;
  subtitle?: string;
  plans?: Array<{ name: string; price: string; period: string; features: string[]; popular?: boolean }>;
  onEdit?: (field: string, cardIndex?: number) => void;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  cardColors?: Array<{ backgroundColor?: string; headerColor?: string; subheaderColor?: string; paragraphColor?: string; buttonBackground?: string; buttonTextColor?: string }>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultPlans = [
    {
      name: "Basic",
      price: "$19",
      period: "/month",
      features: ["10 Projects", "Email Support", "5GB Storage"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      features: ["Unlimited Projects", "Priority Support", "50GB Storage", "Advanced Features"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: ["Everything in Pro", "24/7 Support", "Unlimited Storage", "Custom Solutions"],
      popular: false,
    },
  ];

  const items = plans.length > 0 ? plans : defaultPlans;

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}20, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl @md:text-5xl @lg:text-6xl font-extrabold mb-4"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
          {items.map((plan, index) => {
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "rgba(255, 255, 255, 0.05)";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardButtonBg = cardColor.buttonBackground || accentColor;
            const cardButtonText = cardColor.buttonTextColor || "#ffffff";

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span
                      className="px-6 py-2 rounded-full text-sm font-semibold shadow-2xl backdrop-blur-md border"
                      style={{
                        background: accentColor,
                        color: "#ffffff",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      ⭐ POPULAR
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden backdrop-blur-md border shadow-2xl h-full flex flex-col"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: plan.popular ? accentColor : "rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Glow Effect */}
                  {plan.popular && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                      style={{ background: accentColor }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  {/* Header */}
                  <div className="p-8 relative z-10">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("name", index)}>
                        {plan.name}
                      </TextEditable>
                    </h3>
                    <div style={{ color: cardHeaderColor }}>
                      <span className="text-5xl font-extrabold">
                        <TextEditable onClick={() => onEdit?.("price", index)}>
                          {plan.price}
                        </TextEditable>
                      </span>
                      <span className="ml-2 text-lg" style={{ color: cardSubheaderColor }}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8 flex-1 relative z-10">
                    <ul className="space-y-4 mb-8">
                      {plan.features?.map((feature, fIndex) => (
                        <motion.li
                          key={fIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 + fIndex * 0.05 }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${accentColor}30` }}
                          >
                            <span style={{ color: accentColor }} className="text-sm">✓</span>
                          </div>
                          <span style={{ color: cardParagraphColor }} className="text-sm">
                            <TextEditable onClick={() => onEdit?.(`features-${fIndex}`, index)}>
                              {feature}
                            </TextEditable>
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Button */}
                    <motion.button
                      className="w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                      style={{
                        background: cardButtonBg,
                        color: cardButtonText,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

