"use client"

import { useState } from "react";
import { Search, Grid, List, X, Eye, Sparkles, ArrowRight, Check } from "lucide-react";
import { SectionRegistry } from "../../lib/sectionRegistry";

// Mock data for demonstration
const mockTemplates = [
  {
    slug: "template-1",
    name: "Modern Business Pro",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    category: "business",
    sections: [
      { type: "heroSplit", props: { title: "Transform Your Business Today", subtitle: "Enterprise-grade solutions designed to scale." } },
      { type: "featuresIcons", props: { title: "Why Choose Us" } },
      { type: "testimonialCards", props: { title: "What Clients Say" } },
      { type: "pricingThreeColumn", props: { title: "Simple Pricing" } },
      { type: "ctaSimple", props: { title: "Ready to Scale?", buttonText: "Get Started" } },
      { type: "footerSimple", props: {} },
    ],
    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
  },
  {
    slug: "template-2",
    name: "Creative Portfolio",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "portfolio",
    sections: [
      { type: "heroCentered", props: { title: "Design That Inspires", subtitle: "Showcasing creative excellence." } },
      { type: "portfolioGrid", props: { title: "Selected Projects" } },
      { type: "aboutImageLeft", props: { title: "About Me" } },
      { type: "teamGrid", props: { title: "The Team" } },
      { type: "contactForm", props: { title: "Let's Work Together" } },
      { type: "footerSimple", props: {} },
    ],
    features: ["Gallery Layout", "Animation Ready", "Mobile First"],
  },
  {
    slug: "template-3",
    name: "SaaS Product",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "agency",
    sections: [
      { type: "heroGradient", props: { title: "The Future of Productivity", subtitle: "AI-powered platform." } },
      { type: "featuresGrid", props: { title: "Powerful Features" } },
      { type: "pricingThreeColumn", props: { title: "Pricing Plans" } },
      { type: "testimonialCards", props: { title: "Trust" } },
      { type: "ctaBoxed", props: { title: "Start Building Today" } },
      { type: "footerSimple", props: {} },
    ],
    features: ["Modern Design", "Interactive", "Premium Quality"],
  },
  {
    slug: "template-4",
    name: "Startup Launch",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    category: "business",
    sections: [
        { type: "heroSplit", props: { title: "Transform Your Business Today", subtitle: "Enterprise-grade solutions designed to scale." } },
        { type: "featuresIcons", props: { title: "Why Choose Us" } },
        { type: "aboutSimple", props: { title: "Why Choose Us?", description: "We combine industry expertise with cutting-edge technology." } },
        { type: "testimonialCards", props: { title: "Testimonials" } },
        { type: "pricingThreeColumn", props: { title: "Simple Pricing" } },
        { type: "teamGrid", props: { title: "Our Team" } },
        { type: "ctaSimple", props: { title: "Ready to Scale Your Business?", buttonText: "Get Started" } },
        { type: "footerSimple", props: { companyName: "BusinessPro" } },
    ],
    features: ["Clean Layout", "Fast Setup", "Conversion Focused"],
  },
  {
    slug: "template-5",
    name: "Personal Brand",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "portfolio",
    sections: [
        { type: "heroCentered", props: { title: "Design That Inspires", subtitle: "Showcasing creative excellence." } },
        { type: "portfolioGrid", props: { title: "Selected Projects" } },
        { type: "featuresGrid", props: { title: "My Expertise" } },
        { type: "aboutImageLeft", props: { title: "Creative Director & Designer" } },
        { type: "teamGrid", props: { title: "The Team" } },
        { type: "testimonialCards", props: { title: "Client Stories" } },
        { type: "contactForm", props: { title: "Let's Work Together" } },
        { type: "footerSimple", props: { companyName: "Creative Studio" } },
    ],
    features: ["Minimal Design", "Typography Focus", "Clean Code"],
  },
  {
    slug: "template-6",
    name: "Marketing Agency",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "agency",
    sections: [
        { type: "heroGradient", props: { title: "The Future of Productivity", subtitle: "Streamline your workflow." } },
        { type: "featuresIcons", props: { title: "Key Benefits" } },
        { type: "featuresGrid", props: { title: "Seamless Integration" } },
        { type: "pricingThreeColumn", props: { title: "Flexible Plans" } },
        { type: "testimonialCards", props: { title: "What Users Say" } },
        { type: "ctaBoxed", props: { title: "Start Building Today" } },
        { type: "footerSimple", props: { companyName: "SaaS Platform" } },
    ],
    features: ["Bold Design", "CTA Optimized", "Lead Generation"],
  },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const templates = mockTemplates;

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = filter === "all" || t.category === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (selectedTemplate) {
      window.location.href = `/builder?template=${selectedTemplate.slug}`;
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm animate-fadeIn">
            <Sparkles size={16} />
            Premium Templates
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Choose Your Perfect{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Template
            </span>
          </h1>
          
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Professionally designed, fully customizable templates to kickstart your project in minutes.
          </p>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="mb-8 space-y-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
            />
          </div>

          {/* Filter and View Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {["all", "business", "agency", "portfolio"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    filter === cat
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50 hover:text-purple-300 backdrop-blur-sm"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid" 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list" 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400 text-sm">
          Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
        </div>

        {/* TEMPLATE CARDS GRID */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredTemplates.map((t, index) => (
            <div
              key={t.slug}
              onClick={() => setSelectedTemplate(t)}
              className="group relative cursor-pointer animate-fadeIn hover-lift"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              {/* Card Container - Dark Theme */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-white/10">
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs font-semibold">
                    {t.category}
                  </span>
                </div>

                {/* Thumbnail with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={t.thumbnail}
                    alt={t.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Quick Action Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-xl hover:scale-110 transition-transform flex items-center gap-2">
                      <Eye size={18} />
                      Preview Template
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {t.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      {t.sections.length} Sections
                    </span>
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 w-0 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
              <Search className="text-gray-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* ENHANCED MODAL PREVIEW */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[9999] p-4 animate-fadeIn"
          onClick={() => setSelectedTemplate(null)}
        >
          {/* Modal Container */}
          <div
            className="flex flex-col w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Enhanced */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 md:py-5 border-b border-white/10 bg-gradient-to-r from-gray-900/50 to-gray-950/50 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                  {selectedTemplate.category.toUpperCase()}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {selectedTemplate.name}
                </h2>
              </div>
              
              <button
                onClick={() => setSelectedTemplate(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:rotate-90 group"
              >
                <X size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Modal Body - Two Column Layout */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Left Side - Preview with Browser Frame */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 to-black custom-scrollbar p-2">
                <div className="h-[60vh] md:min-h-full">
                  {/* Browser Frame */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    {/* Browser Header */}
                    <div className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2 border border-white/10">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          yourwebsite.com/{selectedTemplate.slug}
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="bg-white min-h-[500px] relative">
                      {/* LIVE TEMPLATE PREVIEW */}
                      {selectedTemplate.sections && selectedTemplate.sections.length > 0 ? (
                        <div>
                         {/* Render sections dynamically */}
                          {selectedTemplate.sections.map((section: any, idx: number) => {
                            const SectionComponent = SectionRegistry[section.type]?.component;
                            // If component exists, render it
                            if (SectionComponent) {
                               return <SectionComponent key={idx} {...section.props} editable={false} onEdit={undefined} />;
                            }
                            // Fallback for missing component
                            return (
                               <div key={idx} className="p-8 text-center bg-gray-50 border-b border-gray-100">
                                  <p className="text-gray-400 text-sm font-mono">
                                    [Component '{section.type}' not found]
                                  </p>
                               </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
                           <p>No preview available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Full Preview Link */}
                  <div className="mt-6 text-center">
                    <a
                      href={`/templates/${selectedTemplate.slug}/preview`}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      <Eye size={16} />
                      Open full preview in new tab
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="w-full lg:w-80 xl:w-96 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 p-6 overflow-y-auto custom-scrollbar">
                
                {/* Template Info */}
                <div className="mb-6 hidden lg:block">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Template Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400 text-sm">Sections</span>
                      <span className="text-white font-semibold">{selectedTemplate.sections.length}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400 text-sm">Category</span>
                      <span className="text-white font-semibold capitalize">{selectedTemplate.category}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 hidden lg:block">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Features</h3>
                  <div className="space-y-2">
                    {selectedTemplate.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="flex items-center justify-center w-5 h-5 bg-green-500/20 rounded-full">
                          <Check size={12} className="text-green-400" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sections List */}
                <div className="mb-6 hidden lg:block">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Included Sections</h3>
                  <div className="space-y-2">
                    {selectedTemplate.sections.map((section: any, idx: number) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <span className="text-gray-300 text-sm font-medium">{section.type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={handleUseTemplate}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group mb-3"
                  >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    Use This Template
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="text-center text-xs text-gray-500">
                    Instant setup • No credit card required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN REQUIRED MODAL */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center items-center z-[10000] p-4 animate-fadeIn"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                <Sparkles className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Login Required</h3>
              <p className="text-gray-400">Please log in to use this template and start building your website.</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginRedirect}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all hover:scale-[1.02]"
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all border border-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
        
        .glass-dark {
          background: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
}