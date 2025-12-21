"use client";
import TextEditable from "../../TextEditable";
import { useState } from "react";

export default function PricingThreeColumn({ 
  plans = [], 
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  accentColor = "#4f46e5",
  cardColors = [],
}) {
  const defaultPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"],
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"],
      popular: false
    }
  ];

  // Use provided plans if available, otherwise use defaults
  // Ensure we always have exactly 3 plans with complete data
  let items = plans.length > 0 ? [...plans] : [...defaultPlans];
  
  // Fill missing slots with defaults if needed (create new objects, don't reuse references)
  while (items.length < 3) {
    const defaultIndex = items.length;
    items.push({ ...defaultPlans[defaultIndex] || defaultPlans[0] });
  }
  
  // Ensure each card has all required properties with defaults
  items = items.map((plan, index) => {
    const defaultPlan = defaultPlans[index] || defaultPlans[0];
    return {
      ...defaultPlan,
      ...plan,
      // Ensure features array exists
      features: plan.features && Array.isArray(plan.features) ? plan.features : (defaultPlan.features || []),
      // Ensure popular is boolean
      popular: typeof plan.popular === 'boolean' ? plan.popular : (defaultPlan.popular || false),
      // Ensure period exists
      period: plan.period || defaultPlan.period || "/month",
    };
  });
  
  // Ensure we only show 3 cards
  items = items.slice(0, 3);

  return (
    <section 
      className="py-24 px-6"
      style={{ backgroundColor }}
    >
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-4 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
            💎 Pricing Plans
          </span>
        </div>
        <h2 
          className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold mb-4"
          style={{ color: titleColor }}
        >
          Choose Your Perfect Plan
        </h2>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: subtitleColor }}
        >
          Flexible pricing options for teams of all sizes
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @md:grid-cols-3 gap-8">
        {items.map((plan, index) => {
          // Get card colors for this index
          const cardColor = cardColors[index] || {};
          const cardBg = cardColor.backgroundColor || "#ffffff";
          const cardHeaderColor = cardColor.headerColor || (plan.popular ? "#ffffff" : titleColor);
          const cardSubheaderColor = cardColor.subheaderColor || (plan.popular ? "rgba(255,255,255,0.8)" : subtitleColor);
          const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
          const cardAccent = cardColor.iconColor || accentColor;
          const headerBg = plan.popular ? accentColor : "#f9fafb";

          return (
          <div
            key={index}
            className={`relative group ${plan.popular ? '@md:scale-110 z-10' : ''}`}
          >
            
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <span 
                  className="px-4 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
                  style={{ background: accentColor }}
                >
                  ⭐ MOST POPULAR
                </span>
              </div>
            )}

            {/* Card */}
            <div 
              className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-2' : 'border'}`}
              style={{ 
                backgroundColor: cardBg,
                borderColor: plan.popular ? accentColor : "#e5e7eb"
              }}
            >
              
              {/* Gradient Header */}
              <div 
                className="p-8"
                style={{ backgroundColor: headerBg }}
              >
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: cardHeaderColor }}
                >
                  <TextEditable onClick={() => onEdit("name", index, "plan")}>
                    {plan.name}
                  </TextEditable>
                </h3>
                <div style={{ color: cardHeaderColor }}>
                  <span className="text-5xl font-extrabold">
                    <TextEditable onClick={() => onEdit("price", index, "plan")}>
                      {plan.price}
                    </TextEditable>
                  </span>
                  <span 
                    className="ml-2"
                    style={{ 
                      color: cardSubheaderColor,
                      opacity: plan.popular ? 0.8 : 1
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {(plan.features || []).map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${cardAccent}20` }}
                      >
                        <span style={{ color: cardAccent }} className="text-sm">✓</span>
                      </div>
                      <span style={{ color: cardParagraphColor }}>
                        <TextEditable onClick={() => onEdit(`features-${fIndex}`, index, "plan")}>
                          {feature}
                        </TextEditable>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  style={{
                    background: cardColor.buttonBackground || (plan.popular ? accentColor : "#1f2937"),
                    color: cardColor.buttonTextColor || "#ffffff",
                  }}
                >
                  Get Started
                </button>
              </div>

            </div>
          </div>
        )})}
      </div>

    </section>
  );
}
