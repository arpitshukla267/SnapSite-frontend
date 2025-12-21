"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function PricingShowcase({
  title = "Choose Your Plan",
  subtitle = "Flexible pricing for teams of all sizes",
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
      name: "Starter",
      price: "$9",
      period: "/month",
      features: ["5 Projects", "Basic Support", "1GB Storage"],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage"],
      popular: false
    }
  ];

  const items = plans.length > 0 ? plans : defaultPlans;

  return (
    <section
      ref={ref}
      className="py-24 @md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl @sm:text-5xl @md:text-6xl font-extrabold mb-6"
            style={{ color: titleColor }}
            whileHover={{ scale: 1.02 }}
          >
            <TextEditable onClick={() => onEdit?.("title")}>
              {title}
            </TextEditable>
          </motion.h2>
          <motion.p
            className="text-xl @md:text-2xl max-w-2xl mx-auto"
            style={{ color: subtitleColor }}
          >
            <TextEditable onClick={() => onEdit?.("subtitle")}>
              {subtitle}
            </TextEditable>
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid @md:grid-cols-3 gap-8">
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
                className={`relative group ${plan.popular ? "@md:scale-110 z-10" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    <span
                      className="px-4 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
                      style={{ background: accentColor }}
                    >
                      ⭐ MOST POPULAR
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className={`relative rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 p-8 ${
                    plan.popular ? "border-2" : ""
                  }`}
                  style={{
                    backgroundColor: cardBg,
                    borderColor: plan.popular ? accentColor : "rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="mb-8">
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ color: cardHeaderColor }}
                    >
                      <TextEditable onClick={() => onEdit?.("plans", index)}>
                        {plan.name}
                      </TextEditable>
                    </h3>
                    <div className="flex items-baseline">
                      <span
                        className="text-5xl font-extrabold"
                        style={{ color: cardHeaderColor }}
                      >
                        <TextEditable onClick={() => onEdit?.("plans", index)}>
                          {plan.price}
                        </TextEditable>
                      </span>
                      <span
                        className="ml-2 text-lg"
                        style={{ color: cardSubheaderColor }}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {(plan.features || []).map((feature, fIndex) => (
                      <motion.li
                        key={fIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.4 + index * 0.1 + fIndex * 0.05 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${accentColor}30` }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span style={{ color: accentColor }} className="text-sm">✓</span>
                        </motion.div>
                        <span style={{ color: cardParagraphColor }}>
                          <TextEditable onClick={() => onEdit?.(`features-${fIndex}`, index)}>
                            {feature}
                          </TextEditable>
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Button */}
                  <motion.button
                    className="w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg relative overflow-hidden group"
                    style={{
                      background: cardButtonBg,
                      color: cardButtonText,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

