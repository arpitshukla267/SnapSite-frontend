"use client";
import TextEditable from "../../TextEditable";
import { useState } from "react";

export default function PricingThreeColumn({ plans = [], onEdit }) {
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
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-4 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
            💎 Pricing Plans
          </span>
        </div>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Flexible pricing options for teams of all sizes
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @md:grid-cols-3 gap-8">
        {items.map((plan, index) => (
          <div
            key={index}
            className={`relative group ${plan.popular ? '@md:scale-110 z-10' : ''}`}
          >
            
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <span className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  ⭐ MOST POPULAR
                </span>
              </div>
            )}

            {/* Card */}
            <div 
              className={`relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-2 border-indigo-500' : 'border border-gray-200'}`}
            >
              
              {/* Gradient Header */}
              <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  <TextEditable onClick={() => onEdit("name", index, "plan")}>
                    {plan.name}
                  </TextEditable>
                </h3>
                <div className={`flex items-baseline ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-5xl font-extrabold">
                    <TextEditable onClick={() => onEdit("price", index, "plan")}>
                      {plan.price}
                    </TextEditable>
                  </span>
                  <span className={`ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {(plan.features || []).map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">
                        <TextEditable onClick={() => onEdit(`features-${fIndex}`, index, "plan")}>
                          {feature}
                        </TextEditable>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                  Get Started
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
