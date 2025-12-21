"use client";
import { useRef } from "react";
import TextEditable from "../../TextEditable";
import { motion, useInView } from "framer-motion";

export default function PricingModern({
  title = "Choose Your Plan",
  subtitle = "Flexible pricing options for teams of all sizes",
  plans = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
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
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label"],
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
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${accentColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            animation: "patternMove 20s linear infinite",
          }}
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
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardButtonBg = cardColor.buttonBackground || accentColor;
            const cardButtonText = cardColor.buttonTextColor || "#ffffff";

            return (
              <motion.div
                key={index}
                className={`relative group ${plan.popular ? '@md:scale-110 z-10' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      className="px-4 py-1 rounded-full text-xs font-semibold shadow-lg"
                      style={{
                        background: accentColor,
                        color: "#ffffff",
                      }}
                    >
                      ⭐ MOST POPULAR
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-xl border transition-all duration-300 h-full flex flex-col"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: plan.popular ? accentColor : "rgba(0, 0, 0, 0.1)",
                  }}
                  whileHover={{ shadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                >
                  {/* Header */}
                  <div
                    className="p-8"
                    style={{
                      backgroundColor: plan.popular ? accentColor : `${accentColor}10`,
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        color: plan.popular ? "#ffffff" : cardHeaderColor,
                      }}
                    >
                      <TextEditable onClick={() => onEdit?.("name", index)}>
                        {plan.name}
                      </TextEditable>
                    </h3>
                    <div
                      style={{
                        color: plan.popular ? "#ffffff" : cardHeaderColor,
                      }}
                    >
                      <span className="text-5xl font-extrabold">
                        <TextEditable onClick={() => onEdit?.("price", index)}>
                          {plan.price}
                        </TextEditable>
                      </span>
                      <span className="ml-2 text-lg">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8 flex-1">
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
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${accentColor}20` }}
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

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </section>
  );
}
