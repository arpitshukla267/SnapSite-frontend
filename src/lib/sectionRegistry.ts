// hero
import HeroMinimal from "../components/builder/sections/hero/HeroMinimal";
import HeroGradient from "../components/builder/sections/hero/HeroGradient";
import HeroSplit from "../components/builder/sections/hero/HeroSplit";
import HeroVideo from "../components/builder/sections/hero/HeroVideo";
import HeroCentered from "../components/builder/sections/hero/HeroCentered";
import HeroAdvanced from "../components/builder/sections/hero/HeroAdvanced";
import HeroAnimated from "../components/builder/sections/hero/HeroAnimated";
import HeroModern from "../components/builder/sections/hero/HeroModern";

// about
import AboutSimple from "../components/builder/sections/about/AboutSimple";
import AboutCentered from "../components/builder/sections/about/AboutCentered";
import AboutImageLeft from "../components/builder/sections/about/AboutImageLeft";
import AboutAdvanced from "../components/builder/sections/about/AboutAdvanced";
import AboutModern from "../components/builder/sections/about/AboutModern";
import AboutShowcase from "../components/builder/sections/about/AboutShowcase";

// features
import FeaturesGrid from "../components/builder/sections/features/FeaturesGrid";
import FeaturesIcons from "../components/builder/sections/features/FeaturesIcons";
import FeaturesAdvanced from "../components/builder/sections/features/FeaturesAdvanced";
import FeaturesShowcase from "../components/builder/sections/features/FeaturesShowcase";
import FeaturesPremium from "../components/builder/sections/features/FeaturesPremium";

// cta
import CTASimple from "../components/builder/sections/cta/CTASimple";
import CTASplit from "../components/builder/sections/cta/CTASplit";
import CTABoxed from "../components/builder/sections/cta/CTABoxed";
import CTAAnimated from "../components/builder/sections/cta/CTAAnimated";
import CTAGlass from "../components/builder/sections/cta/CTAGlass";

// testimonials
import TestimonialCards from "../components/builder/sections/testimonials/TestimonialCards";
import TestimonialsAdvanced from "../components/builder/sections/testimonials/TestimonialsAdvanced";
import TestimonialsModern from "../components/builder/sections/testimonials/TestimonialsModern";
import TestimonialsShowcase from "../components/builder/sections/testimonials/TestimonialsShowcase";

// pricing
import PricingThreeColumn from "../components/builder/sections/pricing/PricingThreeColumn";
import PricingModern from "../components/builder/sections/pricing/PricingModern";
import PricingPremium from "../components/builder/sections/pricing/PricingPremium";

// contact
import ContactForm from "../components/builder/sections/contact/ContactForm";
import ContactModern from "../components/builder/sections/contact/ContactModern";
import ContactInteractive from "../components/builder/sections/contact/ContactInteractive";

// footer
import FooterSimple from "../components/builder/sections/footer/FooterSimple";
import FooterModern from "../components/builder/sections/footer/FooterModern";
import FooterGradient from "../components/builder/sections/footer/FooterGradient";

// team
import TeamGrid from "../components/builder/sections/team/TeamGrid";
import TeamModern from "../components/builder/sections/team/TeamModern";
import TeamShowcase from "../components/builder/sections/team/TeamShowcase";

// portfolio
import PortfolioGrid from "../components/builder/sections/portfolio/PortfolioGrid";
import PortfolioAdvanced from "../components/builder/sections/portfolio/PortfolioAdvanced";
import PortfolioShowcase from "../components/builder/sections/portfolio/PortfolioShowcase";
import PortfolioMasonry from "../components/builder/sections/portfolio/PortfolioMasonry";

export const SectionRegistry = {
  // Hero Sections
  heroMinimal: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroMinimal,
    defaultProps: {
      title: "Welcome to Our Website",
      subtitle: "Build and customize your landing page fast.",
      buttonText: "Get Started",
    },
    variant: "basic",

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "HeroMinimal",
        path: "@/components/HeroMinimal",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "HeroMinimal",
        path: "@/components/HeroMinimal",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-white text-center overflow-hidden min-h-screen flex flex-col justify-center items-center w-full">
  <!-- Grid Background -->
  <div class="absolute inset-0 opacity-5 grid-pattern"></div>
  
  <!-- Subtle Gradient Accent -->
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl rounded-full"></div>
  
  <!-- Content -->
  <div class="relative z-10 max-w-3xl mx-auto">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fadeInUp">
      ${props.title || "Welcome to Our Website"}
    </h1>

    <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full animate-scaleIn"></div>

    <p class="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fadeInUp" style="animation-delay: 0.1s;">
      ${props.subtitle || "Build and customize your landing page fast."}
    </p>

    <div class="mt-10 animate-fadeInUp" style="animation-delay: 0.2s;">
      <button class="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
        <span class="relative z-10">${props.buttonText || "Get Started"}</span>
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
        </div>
      </button>
    </div>

    <!-- Trust Indicators -->
    <div class="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm animate-fadeInUp" style="animation-delay: 0.3s;">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span>No credit card required</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span>Free forever plan</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span>Cancel anytime</span>
      </div>
    </div>
  </div>
</section>
      `,
    },
  },

  heroAdvanced: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroAdvanced,
    defaultProps: {
      title: "Build Something Amazing",
      subtitle: "Create stunning websites with our powerful builder. No coding required.",
      buttonText: "Get Started",
      buttonText2: "Learn More",
      enableParticles: true,
      enableGradientAnimation: true,
      enableTextReveal: true,
    },
    variant: "advanced",
    export: {
      react: {
        name: "HeroAdvanced",
        path: "@/components/HeroAdvanced",
      },
      next: {
        name: "HeroAdvanced",
        path: "@/components/HeroAdvanced",
      },
      html: (props) => `
<section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: linear-gradient(135deg, var(--theme-primary, #4f46e5) 0%, var(--theme-secondary, #ec4899) 50%, var(--theme-accent, #60a5fa) 100%);" data-section="hero-advanced">
  <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
    <div class="mb-6 inline-block">
      <span class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
        ✨ Premium Experience
      </span>
    </div>
    <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
      ${props.title || "Build Something Amazing"}
    </h1>
    <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
      ${props.subtitle || "Create stunning websites with our powerful builder. No coding required."}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button class="px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform">
        ${props.buttonText || "Get Started"}
      </button>
      ${props.buttonText2 ? `<button class="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl text-lg font-semibold backdrop-blur-md">${props.buttonText2}</button>` : ''}
    </div>
  </div>
</section>
      `,
    },
  },

  heroGradient: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroGradient,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "HeroGradient",
        path: "@/components/HeroGradient",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "HeroGradient",
        path: "@/components/HeroGradient",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="relative w-full py-32 overflow-hidden">
  <!-- Animated Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 animate-gradient-slow"></div>
  
  <!-- Floating Decorative Blobs -->
  <div class="blob1"></div>
  <div class="blob2"></div>
  
  <!-- Grid Pattern Overlay -->
  <div class="absolute inset-0 opacity-10 grid-pattern"></div>

  <!-- Content -->
  <div class="max-w-6xl mx-auto text-center px-6 relative z-10">
    <!-- Badge -->
    <div class="mb-6 inline-block animate-fadeInUp">
      <span class="px-4 py-2 rounded-full glass text-white text-sm font-semibold shadow-lg">
        🚀 Powerful & Fast
      </span>
    </div>

    <!-- TITLE -->
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl text-white animate-fadeInUp" style="animation-delay: 0.1s;">
      ${props.title || "Launch Faster Than Ever"}
    </h1>

    <!-- SUBTITLE -->
    <p class="text-xl md:text-2xl mt-6 opacity-95 max-w-2xl mx-auto leading-relaxed text-white/90 animate-fadeInUp" style="animation-delay: 0.2s;">
      ${props.subtitle || "Design, customize, and deploy stunning landing pages in minutes."}
    </p>

    <!-- BUTTON -->
    <div class="mt-10 animate-fadeInUp" style="animation-delay: 0.3s;">
      <button class="group relative px-10 py-4 bg-white text-black rounded-2xl text-lg md:text-xl font-semibold shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden hover:shadow-white/30">
        <span class="relative z-10">${props.buttonText || "Start Building"}</span>
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shimmer"></div>
      </button>
    </div>

    <!-- Customizable Decorative Elements -->
    <div class="mt-16 flex justify-center gap-4 animate-fadeInUp" style="animation-delay: 0.4s;">
      <!-- Block 1 -->
      <div class="w-16 h-16 rounded-2xl glass rotate-12 animate-float overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" style="animation-delay: 0s;">
        ${props.block1Image ? `<img src="${props.block1Image}" alt="Block 1" class="w-full h-full object-cover" />` : (props.block1Icon ? `<span class="text-2xl">${props.block1Icon}</span>` : '')}
      </div>

      <!-- Block 2 -->
      <div class="w-16 h-16 rounded-2xl glass -rotate-6 animate-float overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" style="animation-delay: 0.5s;">
        ${props.block2Image ? `<img src="${props.block2Image}" alt="Block 2" class="w-full h-full object-cover" />` : (props.block2Icon ? `<span class="text-2xl">${props.block2Icon}</span>` : '')}
      </div>

      <!-- Block 3 -->
      <div class="w-16 h-16 rounded-2xl glass rotate-45 animate-float overflow-hidden flex items-center justify-center hover:scale-110 transition-transform" style="animation-delay: 1s;">
        ${props.block3Image ? `<img src="${props.block3Image}" alt="Block 3" class="w-full h-full object-cover" />` : (props.block3Icon ? `<span class="text-2xl">${props.block3Icon}</span>` : '')}
      </div>
    </div>
  </div>
</section>
      `,
    },
  },

  heroSplit: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroSplit,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "HeroSplit",
        path: "@/components/HeroSplit",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "HeroSplit",
        path: "@/components/HeroSplit",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="w-full py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
  <!-- Decorative Background Elements -->
  <div class="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
  <div class="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-indigo-200/40 to-blue-200/40 rounded-full blur-3xl"></div>

  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
    <!-- LEFT SIDE - Text Content -->
    <div class="animate-slideInLeft">
      <!-- Badge -->
      <div class="mb-6 inline-block">
        <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold shadow-md">
          ⚡ Lightning Fast
        </span>
      </div>

      <!-- TITLE -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
        ${props.title || "Your Product, Simplified"}
      </h1>

      <!-- Gradient Accent -->
      <div class="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-6 mb-6"></div>

      <!-- SUBTITLE -->
      <p class="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
        ${props.subtitle || "A clean, modern layout that boosts conversions."}
      </p>

      <!-- BUTTON -->
      <div class="mt-10">
        <button class="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
          <span class="relative z-10">${props.buttonText || "Try Now"}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      <!-- Feature Highlights -->
      <div class="mt-10 flex flex-wrap gap-4">
        <div class="flex items-center gap-2 text-gray-700">
          <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-600 text-sm">✓</span>
          </div>
          <span class="text-sm font-medium">Easy Setup</span>
        </div>
        <div class="flex items-center gap-2 text-gray-700">
          <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-600 text-sm">✓</span>
          </div>
          <span class="text-sm font-medium">Secure & Reliable</span>
        </div>
        <div class="flex items-center gap-2 text-gray-700">
          <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span class="text-green-600 text-sm">✓</span>
          </div>
          <span class="text-sm font-medium">24/7 Support</span>
        </div>
      </div>
    </div>

    <!-- RIGHT IMAGE -->
    <div class="relative group animate-slideInRight">
      <!-- Glow Effect -->
      <div class="absolute -inset-6 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

      <!-- Image Container -->
      <div class="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-purple-500/30">
        <img src="${props.image || "/placeholder.png"}" alt="Hero" class="w-full h-auto rounded-2xl relative z-10 transition-transform duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- Floating Badge -->
      <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-6 py-4 animate-float">
        <div class="text-2xl font-bold gradient-text">99.9%</div>
        <div class="text-xs text-gray-600">Uptime</div>
      </div>
    </div>
  </div>
</section>
      `,
    },
  },
  heroVideo: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroVideo,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "HeroVideo",
        path: "@/components/HeroVideo",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "HeroVideo",
        path: "@/components/HeroVideo",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
  <!-- Background Video or Fallback -->
  ${props.videoUrl ? `
  <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0">
    <source src="${props.videoUrl}" type="video/mp4" />
  </video>
  ` : `
  <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"></div>
  `}
  
  <!-- Dark Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-4xl mx-auto px-6">
    <!-- Badge -->
    <div class="mb-6 inline-block animate-fadeInUp">
      <span class="px-5 py-2 rounded-full glass-dark text-white text-sm font-semibold shadow-2xl border border-white/30">
        🎥 Experience the Future
      </span>
    </div>

    <!-- TITLE -->
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-6 animate-fadeInUp" style="animation-delay: 0.1s;">
      ${props.title || "Create Stunning Experiences"}
    </h1>

    <!-- SUBTITLE -->
    <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style="animation-delay: 0.2s;">
      ${props.subtitle || "Build beautiful, engaging websites with immersive video backgrounds."}
    </p>

    <!-- DUAL BUTTONS -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style="animation-delay: 0.3s;">
      <button class="group relative px-8 py-4 bg-white text-black rounded-2xl text-lg font-semibold shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden">
        <span class="relative z-10">${props.buttonText || "Get Started"}</span>
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-100 to-purple-100 transition-opacity"></div>
      </button>

      <button class="px-8 py-4 glass-dark text-white rounded-2xl text-lg font-semibold border border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-105">
        ${props.buttonText2 || "Watch Demo"}
      </button>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-float">
    <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
      <div class="w-1 h-3 bg-white rounded-full animate-pulse-slow"></div>
    </div>
  </div>
</section>
      `,
    },
  },
  heroCentered: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroCentered,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "HeroCentered",
        path: "@/components/HeroCentered",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "HeroCentered",
        path: "@/components/HeroCentered",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => {
        const title = props.title || "Design That Inspires";
        const titleParts = title.split(" ");
        const lastWord = titleParts.length > 1 ? titleParts[titleParts.length - 1] : title;
        const restOfTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(" ") : "";
        
        return `
<section class="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900 w-full overflow-hidden">
  <!-- Background Effects -->
  <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
  
  <div class="relative z-10 max-w-5xl mx-auto">
    <!-- Badge -->
    <div class="mb-8 inline-block">
      <span class="px-6 py-3 rounded-full text-white text-base font-semibold shadow-2xl border border-white/30" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px);">
        ✨ Premium Design System
      </span>
    </div>

    <!-- Title -->
    <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
      ${restOfTitle ? `<span class="text-white">${restOfTitle} </span>` : ''}
      <span class="text-transparent bg-clip-text" style="background-image: linear-gradient(to right, #ec4899, #f472b6, #a855f7);">${lastWord}</span>
    </h1>

    <!-- Decorative Line -->
    <div class="w-32 h-1 mx-auto rounded-full mb-8" style="background: linear-gradient(to right, #ec4899, #a855f7);"></div>

    <!-- Subtitle -->
    <p class="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
      ${props.subtitle || "Showcasing creative excellence through stunning visual storytelling and innovative design solutions."}
    </p>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
      <button class="px-10 py-5 rounded-xl text-lg md:text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105" style="background: linear-gradient(to right, #ec4899, #a855f7);">
        ${props.buttonText || "View Portfolio"}
      </button>
      <button class="px-10 py-5 rounded-xl text-lg md:text-xl font-bold text-white transition-all duration-300 hover:scale-105" style="background-color: #6b21a8;">
        ${props.buttonText2 || "Contact Me"}
      </button>
    </div>

    <!-- Social Proof -->
    <div class="flex flex-wrap justify-center items-center gap-8 text-white text-sm">
      <div class="flex items-center gap-2">
        <span class="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
        <span>5,000+ reviews</span>
      </div>
      <div class="w-px h-4 bg-white/30"></div>
      <div>
        <span class="font-semibold">10,000+</span> happy customers
      </div>
      <div class="w-px h-4 bg-white/30"></div>
      <div>
        Trusted by <span class="font-semibold">500+</span> companies
      </div>
    </div>
  </div>
</section>
        `;
      },
    },
  },

  // About Sections
  aboutSimple: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: AboutSimple,
    defaultProps: {
      title: "About Us",
      description: "We are committed to delivering great experiences.",
      image: "/placeholder.png",
    },
    variant: "basic",

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "AboutSimple",
        path: "@/components/AboutSimple",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "AboutSimple",
        path: "@/components/AboutSimple",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-20 px-6 bg-gray-50 w-full">
  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
    <div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        ${props.title || "About Us"}
      </h2>

      <p class="mt-6 text-gray-700 text-lg leading-relaxed">
        ${props.description || "We are committed to delivering great experiences."}
      </p>
    </div>

    <div class="relative group">
      <div class="absolute -inset-3 rounded-xl bg-gray-300/20 blur-xl"></div>
      <img src="${props.image || "/placeholder.png"}" alt="about" class="w-full h-auto rounded-2xl shadow-lg relative z-10 object-cover" />
    </div>
  </div>
</section>
      `,
    },
  },
  aboutCentered: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: AboutCentered,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "AboutCentered",
        path: "@/components/AboutCentered",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "AboutCentered",
        path: "@/components/AboutCentered",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 text-center bg-gradient-to-b from-white to-gray-100 w-full">
  <div class="max-w-4xl mx-auto">

    <div class="relative w-44 h-44 mx-auto mb-8">
      <div class="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl"></div>
      <img src="${props.image || "/placeholder.png"}" class="w-44 h-44 mx-auto rounded-full shadow-xl relative z-10 object-cover" />
    </div>

    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
      ${props.title || "Who We Are"}
    </h2>

    <p class="mt-6 text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
      ${props.description || "We are creators, innovators, and problem solvers."}
    </p>
  </div>
</section>
      `,
    },
  },
  aboutImageLeft: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: AboutImageLeft,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "AboutImageLeft",
        path: "@/components/AboutImageLeft",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "AboutImageLeft",
        path: "@/components/AboutImageLeft",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-20 px-6 bg-white w-full">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

    <div class="relative group">
      <div class="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-xl"></div>
      <img src="${props.image || "/placeholder.png"}" class="w-full rounded-2xl shadow-xl relative z-10 object-cover" />
    </div>

    <div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
        ${props.title || "Our Story"}
      </h2>

      <p class="mt-6 text-gray-600 text-lg leading-relaxed">
        ${props.description || "We help people and businesses achieve their goals."}
      </p>
    </div>

  </div>
</section>
      `,
    },
  },

  aboutAdvanced: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: AboutAdvanced,
    defaultProps: {
      title: "Who We Are",
      description: "We are a team of passionate creators, innovators, and problem solvers dedicated to building amazing experiences.",
      image: "/placeholder.png",
      enableRevealAnimation: true,
      enableHoverEffects: true,
    },
    variant: "advanced",
    export: {
      react: {
        name: "AboutAdvanced",
        path: "@/components/AboutAdvanced",
      },
      next: {
        name: "AboutAdvanced",
        path: "@/components/AboutAdvanced",
      },
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" data-section="about-advanced">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
    <div class="relative group">
      <img src="${props.image || "/placeholder.png"}" alt="About" class="w-full h-auto rounded-2xl shadow-2xl object-cover" />
    </div>
    <div class="space-y-6">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
        ${props.title || "Who We Are"}
      </h2>
      <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      <p class="text-lg text-gray-600 leading-relaxed">
        ${props.description || "We are a team of passionate creators, innovators, and problem solvers dedicated to building amazing experiences."}
      </p>
      <div class="grid grid-cols-3 gap-6 pt-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-900">10K+</div>
          <div class="text-sm text-gray-500 mt-1">Users</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-900">500+</div>
          <div class="text-sm text-gray-500 mt-1">Projects</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-900">50+</div>
          <div class="text-sm text-gray-500 mt-1">Awards</div>
        </div>
      </div>
    </div>
  </div>
</section>
      `,
    },
  },

  // Features Sections
  featuresGrid: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: FeaturesGrid,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "FeaturesGrid",
        path: "@/components/FeaturesGrid",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "FeaturesGrid",
        path: "@/components/FeaturesGrid",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-100 w-full">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      ${props.title || "Our Features"}
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      ${props.subtitle || "Everything you need to succeed"}
    </p>
  </div>

  <div class="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
    ${(props.items || [
        { title: "Lightning Fast Performance", desc: "Optimized for speed" },
        { title: "Drag & Drop Builder", desc: "Easy to use interface" },
        { title: "Responsive Design", desc: "Look good on any device" },
        { title: "SEO Optimized", desc: "Rank higher on search engines" }
      ]).map(item => {
        const title = typeof item === 'object' ? item.title : item;
        const desc = typeof item === 'object' ? item.desc : "";
        return `
        <div class="group relative p-8 bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div class="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-50 transition duration-500"></div>
          
          <h3 class="text-2xl font-semibold relative z-10 text-gray-900 tracking-tight mb-2">
            ${title}
          </h3>
          
          ${desc ? `<p class="text-gray-500 relative z-10">${desc}</p>` : ''}

          <div class="mt-4 h-1 w-12 bg-blue-500/40 rounded-full relative z-10 group-hover:w-20 transition-all duration-300"></div>
        </div>
        `;
      }).join('')}
  </div>
</section>
      `,
    },
  },
  featuresIcons: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: FeaturesIcons,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "FeaturesIcons",
        path: "@/components/FeaturesIcons",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "FeaturesIcons",
        path: "@/components/FeaturesIcons",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-white w-full">
  <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
    ${(props.features || [
        { title: "Speed", desc: "Optimized for fast load times" },
        { title: "Security", desc: "Top-notch data protection" },
        { title: "Design", desc: "Modern and clean layouts" },
      ]).map(item => `
      <div class="group p-8 border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <h3 class="text-2xl font-bold text-gray-900 relative z-10 tracking-tight">
          ${item.title}
        </h3>

        <p class="mt-4 text-gray-600 text-lg leading-relaxed relative z-10">
          ${item.desc}
        </p>
      </div>
      `).join('')}
  </div>
</section>
      `,
    },
  },

  // CTA Sections
  ctaSimple: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: CTASimple,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "CTASimple",
        path: "@/components/CTASimple",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "CTASimple",
        path: "@/components/CTASimple",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center relative overflow-hidden w-full">
  
  <!-- Background Decorations -->
  <div class="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
  
  <!-- Grid Pattern -->
  <div class="absolute inset-0 opacity-10 grid-pattern"></div>

  <!-- Content -->
  <div class="max-w-4xl mx-auto relative z-10">
    
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
      ${props.title || "Ready to Get Started?"}
    </h2>

    <p class="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
      ${props.subtitle || "Join thousands of satisfied customers who have transformed their business."}
    </p>

    <div>
      <button class="group relative px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-2xl hover:scale-110 hover:shadow-white/40 transition-all duration-300 overflow-hidden">
        <span class="relative z-10">${props.buttonText || "Start Free Trial"}</span>
        <div class="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>

  </div>
</section>
      `,
    },
  },
  ctaSplit: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: CTASplit,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "CTASplit",
        path: "@/components/CTASplit",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "CTASplit",
        path: "@/components/CTASplit",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    <div>
      <div class="mb-4 inline-block">
        <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
          📢 Limited Time Offer
        </span>
      </div>

      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        ${props.title || "Take Your Business to the Next Level"}
      </h2>

      <p class="text-lg text-gray-600 mb-8 leading-relaxed">
        ${props.subtitle || "Don't miss out on this opportunity to revolutionize your workflow and achieve better results."}
      </p>

      <button class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
        ${props.buttonText || "Get Started Now"}
      </button>
    </div>

    <div class="relative group cursor-pointer">
      <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition rounded-3xl"></div>
      <img src="${props.image || "/placeholder.png"}" alt="CTA" class="relative z-10 w-full rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300" />
    </div>

  </div>
</section>
      `,
    },
  },
  ctaBoxed: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: CTABoxed,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "CTABoxed",
        path: "@/components/CTABoxed",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "CTABoxed",
        path: "@/components/CTABoxed",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
  <div class="max-w-5xl mx-auto">
    <!-- Card Container -->
    <div class="relative group">
      <!-- Glow Effect -->
      <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
      
      <!-- Main Card with Light Gradient Background -->
      <div class="relative rounded-3xl p-8 md:p-16 text-center shadow-2xl hover:shadow-purple-500/30 transition-all animate-scaleIn" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15);">
        <!-- Icon or Badge -->
        <div class="mb-6 inline-block">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-float">
            🚀
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
          ${props.title || "Start Building Today"}
        </h2>

        <!-- Subtitle -->
        <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          ${props.subtitle || "Everything you need to create stunning websites in one powerful platform."}
        </p>

        <!-- CTA Button -->
        <button class="px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300">
          ${props.buttonText || "Try It Free"}
        </button>

        <!-- Trust Indicator -->
        <p class="mt-6 text-white/60 text-sm">
          ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
        </p>
      </div>
    </div>
  </div>
</section>
      `,
    },
  },

  // Testimonial Sections
  testimonialCards: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: TestimonialCards,
    defaultProps: {
      title: "What Our Customers Say",
      subtitle: "Join thousands of satisfied users who have transformed their businesses",
      testimonials: [
        { name: "Sarah Johnson", role: "CEO, TechCorp", text: "This platform has completely transformed how we build websites. Absolutely incredible!", rating: 5 },
        { name: "Michael Chen", role: "Designer, CreativeStudio", text: "The easiest and most powerful website builder I've ever used. Highly recommended!", rating: 5 },
        { name: "Emily Rodriguez", role: "Founder, StartupHub", text: "Within minutes I had a beautiful, professional website up and running. Amazing!", rating: 5 }
      ],
    },
    variant: "basic",

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "TestimonialCards",
        path: "@/components/TestimonialCards",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "TestimonialCards",
        path: "@/components/TestimonialCards",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50 w-full">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <div class="mb-4 inline-block">
      <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
        ⭐ Testimonials
      </span>
    </div>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      ${props.title || "What Our Customers Say"}
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      ${props.subtitle || "Join thousands of satisfied users who have transformed their businesses"}
    </p>
  </div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    ${(props.testimonials || [
      { name: "Sarah Johnson", role: "CEO, TechCorp", image: "https://i.pravatar.cc/150?img=1", rating: 5, text: "This platform has completely transformed how we build websites. Absolutely incredible!" },
      { name: "Michael Chen", role: "Designer, CreativeStudio", image: "https://i.pravatar.cc/150?img=2", rating: 5, text: "The easiest and most powerful website builder I've ever used. Highly recommended!" },
      { name: "Emily Rodriguez", role: "Founder, StartupHub", image: "https://i.pravatar.cc/150?img=3", rating: 5, text: "Within minutes I had a beautiful, professional website up and running. Amazing!" }
    ]).map(t => `
      <div class="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition blur"></div>
        <div class="relative bg-white rounded-2xl p-6 h-full flex flex-col">
          <!-- Quote Icon -->
          <div class="mb-4 text-purple-200">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
             </svg>
          </div>

          <div class="flex gap-1 mb-4 text-yellow-400 text-lg">
            ${Array(t.rating || 5).fill('⭐').join('')}
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic flex-grow">"${t.text}"</p>
          <div class="flex items-center gap-4 mt-auto">
            <img src="${t.image || 'https://i.pravatar.cc/150'}" alt="${t.name}" class="w-14 h-14 rounded-full object-cover border-2 border-indigo-200" />
            <div>
              <div class="font-semibold text-gray-900">${t.name}</div>
              <div class="text-sm text-gray-600">${t.role}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</section>
      `,
    },
  },

  testimonialsAdvanced: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: TestimonialsAdvanced,
    defaultProps: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it",
      testimonials: [
        { name: "Sarah Johnson", role: "CEO, TechStart", content: "This platform has transformed how we build websites. Incredible experience!", rating: 5 },
        { name: "Michael Chen", role: "Designer, Creative Agency", content: "The best website builder I've ever used. Highly recommended!", rating: 5 },
        { name: "Emily Davis", role: "Founder, StartupCo", content: "Fast, intuitive, and powerful. Everything we needed and more.", rating: 5 },
      ],
      autoSlide: true,
      slideInterval: 5000,
      enableDepthTransitions: true,
    },
    variant: "advanced",
    export: {
      react: {
        name: "TestimonialsAdvanced",
        path: "@/components/TestimonialsAdvanced",
      },
      next: {
        name: "TestimonialsAdvanced",
        path: "@/components/TestimonialsAdvanced",
      },
      html: (props) => {
        const testimonials = props.testimonials || props.defaultProps?.testimonials || [
          { name: "Sarah Johnson", role: "CEO, TechStart", content: "This platform has transformed how we build websites. Incredible experience!", rating: 5 },
          { name: "Michael Chen", role: "Designer, Creative Agency", content: "The best website builder I've ever used. Highly recommended!", rating: 5 },
          { name: "Emily Davis", role: "Founder, StartupCo", content: "Fast, intuitive, and powerful. Everything we needed and more.", rating: 5 },
        ];
        const bgColor = props.backgroundColor || '#ffffff';
        const titleColor = props.titleColor || '#0f172a';
        const subtitleColor = props.subtitleColor || '#64748b';
        const accentColor = props.accentColor || '#4f46e5';
        const autoSlide = props.autoSlide !== false;
        const slideInterval = props.slideInterval || 5000;
        
        return `<section class="py-24 px-6 relative overflow-hidden" style="background: ${bgColor};" data-section="testimonials-advanced" data-auto-slide="${autoSlide}" data-slide-interval="${slideInterval}">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16 viewport-animate">
      <h2 class="text-4xl md:text-5xl font-extrabold mb-4" style="color: ${titleColor};">
        ${props.title || "What Our Clients Say"}
      </h2>
      <p class="text-lg max-w-2xl mx-auto" style="color: ${subtitleColor};">
        ${props.subtitle || "Don't just take our word for it"}
      </p>
    </div>
    
    <!-- Testimonials Carousel -->
    <div class="relative">
      <div class="testimonial-carousel-container relative">
        ${testimonials.map((testimonial: any, index: number) => {
          const cardBg = props.cardColors?.[index]?.backgroundColor || '#ffffff';
          const cardHeaderColor = props.cardColors?.[index]?.headerColor || titleColor;
          const cardSubheaderColor = props.cardColors?.[index]?.subheaderColor || subtitleColor;
          const cardParagraphColor = props.cardColors?.[index]?.paragraphColor || subtitleColor;
          return `
        <div class="testimonial-slide ${index === 0 ? 'active' : ''}" data-index="${index}" style="display: ${index === 0 ? 'block' : 'none'};">
          <div class="rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100" style="background: ${cardBg};">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style="background: ${accentColor};">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M14.017 21v-3c0-1.105-.895-2-2-2h-3v-7c0-1.105-.895-2-2-2H5.017v-4h8v4h-3c1.105 0 2 .895 2 2v7h3c1.105 0 2 .895 2 2v3h-2zm-10-12v-4h-2v4h2z"/></svg>
              </div>
              <div class="flex-1">
                <div class="flex gap-1 mb-4">
                  ${Array(testimonial.rating || 5).fill(0).map(() => '<span class="text-yellow-400">★</span>').join('')}
                </div>
                <p class="text-xl leading-relaxed mb-6" style="color: ${cardParagraphColor};">
                  "${testimonial.content || testimonial.text || "Amazing experience!"}"
                </p>
                <div class="flex items-center gap-4">
                  ${testimonial.image ? `<img src="${testimonial.image}" alt="${testimonial.name || 'User'}" class="w-12 h-12 rounded-full object-cover" />` : ''}
                  <div>
                    <div class="font-semibold" style="color: ${cardHeaderColor};">${testimonial.name || "John Doe"}</div>
                    <div class="text-sm" style="color: ${cardSubheaderColor};">${testimonial.role || "CEO, Company"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        }).join('')}
      </div>
      
      <!-- Navigation Buttons -->
      <button class="testimonial-nav testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all z-10" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="testimonial-nav testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all z-10" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      
      <!-- Dots Indicator -->
      <div class="flex justify-center gap-2 mt-8">
        ${testimonials.map((_: any, index: number) => `
        <button class="testimonial-dot w-2 h-2 rounded-full transition-all ${index === 0 ? 'active' : ''}" data-index="${index}" style="background: ${index === 0 ? accentColor : '#d1d5db'};" aria-label="Go to slide ${index + 1}"></button>
        `).join('')}
      </div>
    </div>
  </div>
</section>`;
      },
    },
  },

  // Pricing Sections
  pricingThreeColumn: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: PricingThreeColumn,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "PricingThreeColumn",
        path: "@/components/PricingThreeColumn",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "PricingThreeColumn",
        path: "@/components/PricingThreeColumn",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-br from-gray-50 to-white w-full">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <div class="mb-4 inline-block">
      <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
        💎 Pricing Plans
      </span>
    </div>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      Choose Your Perfect Plan
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      Flexible pricing options for teams of all sizes
    </p>
  </div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    ${(props.plans || [
      { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage", "Email Integration"], popular: false },
      { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics", "Custom Domain"], popular: true },
      { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label", "API Access", "SLA"], popular: false }
    ]).map(plan => `
      <div class="relative group ${plan.popular ? 'md:scale-110 z-10' : ''}">
        ${plan.popular ? `
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <span class="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
            ⭐ MOST POPULAR
          </span>
        </div>` : ''}

        <div class="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'border-2 border-indigo-500' : 'border border-gray-200'}">
          <div class="p-8 ${plan.popular ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gray-50'}">
            <h3 class="text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}">${plan.name}</h3>
            <div class="flex items-baseline ${plan.popular ? 'text-white' : 'text-gray-900'}">
              <span class="text-5xl font-extrabold">${plan.price}</span>
              <span class="ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-600'}">${plan.period}</span>
            </div>
          </div>
          
          <div class="p-8">
            <ul class="space-y-4 mb-8">
              ${(plan.features || []).map(f => `
                <li class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span class="text-green-600 text-sm">✓</span>
                  </div>
                  <span class="text-gray-700">${f}</span>
                </li>
              `).join('')}
            </ul>
            <button class="w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105' : 'bg-gray-900 text-white hover:bg-gray-800'}">
              Get Started
            </button>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</section>
      `,
    },
  },

  // Contact Sections
  contactForm: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: ContactForm,
    defaultProps: {
      title: "Get In Touch",
      subtitle: "Have a question or want to work together? We'd love to hear from you.",
      email: "support@example.com",
      phone: "+1 (555) 123-4567",
      office: "123 Business St, City, ST 12345",
    },
    variant: "basic",

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "ContactForm",
        path: "@/components/ContactForm",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "ContactForm",
        path: "@/components/ContactForm",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-br from-gray-50 to-white w-full">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    <div class="animate-slideInLeft">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        ${props.title || "Get In Touch"}
      </h2>
      <p class="text-lg text-gray-600 mb-10 leading-relaxed">
        ${props.subtitle || "Have a question or want to work together? We'd love to hear from you."}
      </p>

      <div class="space-y-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">📧</div>
          <div>
            <div class="font-semibold text-gray-900">Email</div>
            <div class="text-gray-600">${props.email || "support@example.com"}</div>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">📞</div>
          <div>
            <div class="font-semibold text-gray-900">Phone</div>
            <div class="text-gray-600">${props.phone || "+1 (555) 123-4567"}</div>
          </div>
        </div>
         <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">📍</div>
          <div>
            <div class="font-semibold text-gray-900">Office</div>
            <div class="text-gray-600">${props.office || "123 Business St, City, ST 12345"}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="animate-slideInRight">
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
            <input type="text" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea rows="5" placeholder="Tell us about your project..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"></textarea>
          </div>
          <button type="submit" class="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>

  </div>
</section>
      `,
    },
  },

  // Footer Sections
  footerSimple: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: FooterSimple,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "FooterSimple",
        path: "@/components/FooterSimple",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "FooterSimple",
        path: "@/components/FooterSimple",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-6 w-full">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
      <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ${props.companyName || "YourBrand"}
      </div>

      <nav class="flex flex-wrap justify-center gap-8">
        ${(props.links || ["About", "Features", "Pricing", "Contact"]).map(link => `
          <a href="#" class="text-gray-300 hover:text-white transition-colors hover:underline">
            ${link}
          </a>
        `).join('')}
      </nav>

      <div class="flex gap-4">
        <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">𝕏</a>
        <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">in</a>
        <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">f</a>
      </div>
    </div>

    <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

    <div class="text-center text-gray-400 text-sm">
      © ${new Date().getFullYear()} ${props.companyName || "YourBrand"}. All rights reserved.
    </div>
  </div>
</footer>
      `,
    },
  },

  // Team Sections
  teamGrid: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: TeamGrid,

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "TeamGrid",
        path: "@/components/TeamGrid",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "TeamGrid",
        path: "@/components/TeamGrid",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50 w-full">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <div class="mb-4 inline-block">
      <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
        👥 Our Team
      </span>
    </div>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      Meet The Team
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      Talented individuals working together to build amazing products
    </p>
  </div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    ${(props.members || [
      { name: "Alex Thompson", role: "CEO & Founder", image: "https://i.pravatar.cc/300?img=11", bio: "Visionary leader with 15+ years in tech" },
      { name: "Jamie Lee", role: "Head of Design", image: "https://i.pravatar.cc/300?img=5", bio: "Award-winning designer passionate about UX" },
      { name: "Morgan Davis", role: "Lead Developer", image: "https://i.pravatar.cc/300?img=13", bio: "Full-stack expert building scalable solutions" },
      { name: "Casey Martinez", role: "Product Manager", image: "https://i.pravatar.cc/300?img=9", bio: "Strategic thinker driving product innovation" }
    ]).map(member => `
      <div class="group relative hover:-translate-y-2 transition-transform duration-300">
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
          <div class="relative overflow-hidden aspect-square">
            <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p class="text-white text-sm">${member.bio || ""}</p>
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold text-gray-900 mb-1">${member.name}</h3>
            <p class="text-indigo-600 font-medium">${member.role}</p>
            <div class="mt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center transition-all text-sm">in</a>
              <a href="#" class="w-8 h-8 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center transition-all text-sm">𝕏</a>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</section>
      `,
    },
  },

  // Portfolio Sections
  portfolioGrid: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: PortfolioGrid,
    defaultProps: {
      title: "Our Portfolio",
      subtitle: "Showcasing our best work",
      projects: [
        { title: "E-Commerce Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Modern online shopping experience" },
        { title: "Brand Identity", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Complete branding package for startup" },
        { title: "Mobile App", category: "App Development", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "iOS and Android fitness tracker" },
      ],
    },
    variant: "basic",

    /* =========================
       2. EXPORT DEFINITIONS
    ========================== */
    export: {
      /* ---------- React ---------- */
      react: {
        name: "PortfolioGrid",
        path: "@/components/PortfolioGrid",
      },

      /* ---------- Next.js ---------- */
      next: {
        name: "PortfolioGrid",
        path: "@/components/PortfolioGrid",
      },

      /* ---------- Pure HTML ---------- */
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-gray-50 to-white w-full">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <div class="mb-4 inline-block">
      <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
        🎨 Portfolio
      </span>
    </div>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      Our Latest Work
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      Explore our collection of successful projects and creative solutions
    </p>
  </div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    ${(props.projects || [
      { title: "E-Commerce Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Modern online shopping experience" },
      { title: "Brand Identity", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Complete branding package for startup" },
      { title: "Mobile App", category: "App Development", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "iOS and Android fitness tracker" },
      { title: "SaaS Dashboard", category: "UI/UX Design", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", description: "Analytics platform interface" },
      { title: "Marketing Website", category: "Web Development", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop", description: "High-converting landing page" },
      { title: "Logo Design", category: "Branding", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop", description: "Minimalist corporate identity" }
    ]).map(project => `
      <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img src="${project.image || "/placeholder.png"}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30">
              ${project.category || "Project"}
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <h3 class="text-2xl font-bold text-white mb-2">${project.title}</h3>
            <p class="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ${project.description || ""}
            </p>
            <div class="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
             <button class="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</section>
      `,
    },
  },

  portfolioAdvanced: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: PortfolioAdvanced,
    defaultProps: {
      title: "Our Portfolio",
      subtitle: "Showcasing our best work",
      projects: [
        { title: "E-Commerce Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Modern online shopping experience", link: "#" },
        { title: "Brand Identity", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Complete branding package for startup", link: "#" },
        { title: "Mobile App", category: "App Development", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "iOS and Android fitness tracker", link: "#" },
      ],
      enableHoverOverlays: true,
      enableModalPreview: true,
      enableLazyLoading: true,
    },
    variant: "advanced",
    export: {
      react: {
        name: "PortfolioAdvanced",
        path: "@/components/PortfolioAdvanced",
      },
      next: {
        name: "PortfolioAdvanced",
        path: "@/components/PortfolioAdvanced",
      },
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" data-section="portfolio-advanced">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        ${props.title || "Our Portfolio"}
      </h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        ${props.subtitle || "Showcasing our best work"}
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${(props.projects || []).map((project: any) => `
        <div class="group relative overflow-hidden rounded-2xl cursor-pointer">
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-200">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-bold mb-2">${project.title}</h3>
              <p class="text-white/90 text-sm mb-2">${project.category}</p>
              <p class="text-white/80 text-sm">${project.description}</p>
            </div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-semibold rounded-full">${project.category}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>
      `,
    },
  },

  featuresAdvanced: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: FeaturesAdvanced,
    defaultProps: {
      title: "Our Features",
      subtitle: "Everything you need to succeed",
      items: [
        { title: "Lightning Fast Performance", desc: "Optimized for speed and efficiency" },
        { title: "Drag & Drop Builder", desc: "Easy to use interface for everyone" },
        { title: "Responsive Design", desc: "Look perfect on any device" },
        { title: "SEO Optimized", desc: "Rank higher on search engines" }
      ],
      enableHoverEffects: true,
      enableSequentialReveal: true,
    },
    variant: "advanced",
    export: {
      react: {
        name: "FeaturesAdvanced",
        path: "@/components/FeaturesAdvanced",
      },
      next: {
        name: "FeaturesAdvanced",
        path: "@/components/FeaturesAdvanced",
      },
      html: (props) => `
<section class="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" data-section="features-advanced">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        ${props.title || "Our Features"}
      </h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        ${props.subtitle || "Everything you need to succeed"}
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${(props.items || []).map((item: any, index: number) => `
        <div class="group relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">${item.title}</h3>
          <p class="text-gray-600 leading-relaxed">${item.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>
      `,
    },
  },

  // New Advanced Sections
  heroAnimated: {
    component: HeroAnimated,
    defaultProps: {
      title: "Build Amazing Websites",
      subtitle: "Create stunning, responsive websites in minutes",
      buttonText: "Get Started",
      buttonText2: "Learn More",
    },
    variant: "advanced",
    export: {
      react: { name: "HeroAnimated", path: "@/components/HeroAnimated" },
      next: { name: "HeroAnimated", path: "@/components/HeroAnimated" },
      html: (props) => {
        const bgStyle = props.gradientColors && props.gradientColors.length >= 2
          ? `background: linear-gradient(135deg, ${props.gradientColors.join(', ')}); background-size: 400% 400%; animation: gradientShift 15s ease infinite;`
          : `background: ${props.backgroundColor || '#0f172a'};`;
        const titleColor = props.titleColor || '#ffffff';
        const subtitleColor = props.subtitleColor || '#e2e8f0';
        const buttonBg = props.buttonBackground || '#4f46e5';
        const buttonText = props.buttonTextColor || '#ffffff';
        const button2Bg = props.button2Background || 'transparent';
        const button2Text = props.button2TextColor || '#ffffff';
        return `<section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="${bgStyle}" data-section="hero-animated">
  <!-- Particle Canvas -->
  <canvas data-particle class="absolute inset-0 w-full h-full opacity-30" style="pointer-events: none; z-index: 1;"></canvas>
  
  <!-- Animated Grid Background -->
  <div class="absolute inset-0 opacity-10 animate-grid" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px; z-index: 1;"></div>
  
  <!-- Floating Orbs -->
  <div class="absolute inset-0 overflow-hidden" style="z-index: 1;">
    <div class="absolute w-96 h-96 rounded-full blur-3xl opacity-20 float-orb-1" style="background: radial-gradient(circle, rgba(79, 70, 229, 0.4), transparent); left: 10%; top: 20%;"></div>
    <div class="absolute w-96 h-96 rounded-full blur-3xl opacity-20 float-orb-2" style="background: radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent); right: 10%; bottom: 20%;"></div>
  </div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
    <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Build Amazing Websites"}</h1>
    <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Create stunning, responsive websites in minutes"}</p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center viewport-animate-scale" style="animation-delay: 0.4s;">
      <button class="px-10 py-5 rounded-2xl text-lg md:text-xl font-bold shadow-2xl hover-scale transition-all" style="background: ${buttonBg}; color: ${buttonText};">${props.buttonText || "Get Started"}</button>
      ${props.buttonText2 ? `<button class="px-10 py-5 rounded-2xl text-lg md:text-xl font-bold border-2 hover-scale transition-all" style="background: ${button2Bg}; color: ${button2Text}; border-color: ${button2Text};">${props.buttonText2}</button>` : ''}
    </div>
  </div>
</section>`;
      },
    },
  },

  heroModern: {
    component: HeroModern,
    defaultProps: {
      title: "Transform Your Ideas Into Reality",
      subtitle: "The most powerful website builder for modern businesses",
      buttonText: "Start Building",
      buttonText2: "Watch Demo",
    },
    variant: "advanced",
    export: {
      react: { name: "HeroModern", path: "@/components/HeroModern" },
      next: { name: "HeroModern", path: "@/components/HeroModern" },
      html: (props) => {
        const bgStyle = props.gradientColors && props.gradientColors.length >= 2
          ? `background: linear-gradient(135deg, ${props.gradientColors.join(', ')});`
          : `background: ${props.backgroundColor || '#ffffff'};`;
        const titleColor = props.titleColor || '#0f172a';
        const subtitleColor = props.subtitleColor || '#64748b';
        const buttonBg = props.buttonBackground || '#4f46e5';
        const buttonText = props.buttonTextColor || '#ffffff';
        const button2Bg = props.button2Background || '#f1f5f9';
        const button2Text = props.button2TextColor || '#0f172a';
        const accentColor = props.accentColor || '#4f46e5';
        return `<section class="relative min-h-screen flex items-center justify-center overflow-hidden" style="${bgStyle}" data-section="hero-modern">
  <!-- Animated Wave Background -->
  <div class="absolute inset-0 overflow-hidden opacity-20" style="z-index: 1;">
    <svg class="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="currentColor" class="animate-wave" style="color: ${accentColor};" />
    </svg>
  </div>
  
  <!-- Glassmorphism Floating Cards -->
  <div class="absolute inset-0 overflow-hidden" style="z-index: 1;">
    ${[...Array(6)].map((_, i) => `
    <div class="absolute rounded-2xl float-card" style="width: ${80 + i * 20}px; height: ${80 + i * 20}px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); left: ${10 + i * 15}%; top: ${20 + i * 10}%; animation-delay: ${i * 0.5}s; animation-duration: ${4 + i}s;"></div>
    `).join('')}
  </div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
    <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Transform Your Ideas Into Reality"}</h1>
    <p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "The most powerful website builder"}</p>
    <div class="flex flex-col sm:flex-row gap-6 justify-center viewport-animate-scale" style="animation-delay: 0.4s;">
      <button class="px-10 py-5 rounded-2xl text-lg md:text-xl font-bold shadow-2xl hover-scale transition-all" style="background: ${buttonBg}; color: ${buttonText};">${props.buttonText || "Start Building"}</button>
      ${props.buttonText2 ? `<button class="px-10 py-5 rounded-2xl text-lg md:text-xl font-bold border-2 hover-scale transition-all" style="background: ${button2Bg}; color: ${button2Text}; border-color: ${buttonBg};">${props.buttonText2}</button>` : ''}
    </div>
  </div>
</section>`;
      },
    },
  },

  aboutModern: {
    component: AboutModern,
    defaultProps: {
      title: "About Our Company",
      subtitle: "We're passionate about creating amazing experiences",
      description: "Our team of experts is dedicated to delivering innovative solutions.",
    },
    variant: "advanced",
    export: {
      react: { name: "AboutModern", path: "@/components/AboutModern" },
      next: { name: "AboutModern", path: "@/components/AboutModern" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#ffffff';
        const titleColor = props.titleColor || '#0f172a';
        const subtitleColor = props.subtitleColor || '#64748b';
        const paragraphColor = props.paragraphColor || '#64748b';
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center" style="background: ${bgColor};" data-section="about-modern">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
    <div class="relative rounded-2xl overflow-hidden shadow-2xl hover-elevate transition-all viewport-animate-left">
      <img src="${props.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'}" alt="About" class="w-full h-auto object-cover" />
    </div>
    <div class="space-y-6 viewport-animate-right">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6" style="color: ${titleColor};">${props.title || "About Our Company"}</h2>
      <p class="text-xl md:text-2xl font-semibold mb-6" style="color: ${subtitleColor};">${props.subtitle || "We're passionate about creating amazing experiences"}</p>
      <p class="text-lg leading-relaxed" style="color: ${paragraphColor};">${props.description || "Our team of experts is dedicated to delivering innovative solutions."}</p>
    </div>
  </div>
</section>`;
      },
    },
  },

  aboutShowcase: {
    component: AboutShowcase,
    defaultProps: {
      title: "We Build The Future",
      subtitle: "Transforming ideas into digital excellence",
      description: "With a team of creative minds and technical experts.",
    },
    variant: "advanced",
    export: {
      react: { name: "AboutShowcase", path: "@/components/AboutShowcase" },
      next: { name: "AboutShowcase", path: "@/components/AboutShowcase" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#0f172a';
        const titleColor = props.titleColor || '#ffffff';
        const subtitleColor = props.subtitleColor || '#cbd5e1';
        const paragraphColor = props.paragraphColor || '#94a3b8';
        const accentColor = props.accentColor || '#4f46e5';
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center" style="background: ${bgColor};" data-section="about-showcase">
  <div class="max-w-7xl mx-auto text-center w-full">
    <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "We Build The Future"}</h2>
    <p class="text-xl md:text-2xl font-semibold mb-6 max-w-3xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Transforming ideas into digital excellence"}</p>
    <p class="text-lg leading-relaxed max-w-2xl mx-auto mb-16 viewport-animate" style="color: ${paragraphColor}; animation-delay: 0.4s;">${props.description || "With a team of creative minds and technical experts."}</p>
    <div class="grid md:grid-cols-4 gap-8">
      <div class="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover-elevate transition-all viewport-animate-scale" style="border-color: ${accentColor}40;">
        <div class="text-4xl md:text-5xl font-extrabold mb-3" style="color: ${accentColor};">500+</div>
        <div class="text-sm md:text-base" style="color: ${paragraphColor};">Projects Completed</div>
      </div>
      <div class="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover-elevate transition-all viewport-animate-scale" style="border-color: ${accentColor}40; animation-delay: 0.1s;">
        <div class="text-4xl md:text-5xl font-extrabold mb-3" style="color: ${accentColor};">50+</div>
        <div class="text-sm md:text-base" style="color: ${paragraphColor};">Team Members</div>
      </div>
      <div class="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover-elevate transition-all viewport-animate-scale" style="border-color: ${accentColor}40; animation-delay: 0.2s;">
        <div class="text-4xl md:text-5xl font-extrabold mb-3" style="color: ${accentColor};">10+</div>
        <div class="text-sm md:text-base" style="color: ${paragraphColor};">Years Experience</div>
      </div>
      <div class="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover-elevate transition-all viewport-animate-scale" style="border-color: ${accentColor}40; animation-delay: 0.3s;">
        <div class="text-4xl md:text-5xl font-extrabold mb-3" style="color: ${accentColor};">98%</div>
        <div class="text-sm md:text-base" style="color: ${paragraphColor};">Client Satisfaction</div>
      </div>
    </div>
  </div>
</section>`;
      },
    },
  },

  contactModern: {
    component: ContactModern,
    defaultProps: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you",
      email: "hello@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, ST 12345",
    },
    variant: "advanced",
    export: {
      react: { name: "ContactModern", path: "@/components/ContactModern" },
      next: { name: "ContactModern", path: "@/components/ContactModern" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-white" data-section="contact-modern">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">${props.title || "Get In Touch"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">${props.subtitle || "We'd love to hear from you"}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-12">
      <div class="space-y-6">
        <div class="p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-purple-500 transition-all">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl bg-purple-100">📧</div>
            <div>
              <div class="font-semibold text-lg mb-2 text-gray-900">Email</div>
              <div class="text-gray-600">${props.email || "hello@example.com"}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <form class="space-y-6">
          <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none" />
          <input type="email" placeholder="Email Address" class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none" />
          <textarea rows="5" placeholder="Message" class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none resize-none"></textarea>
          <button class="w-full py-4 rounded-xl font-semibold bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  contactInteractive: {
    component: ContactInteractive,
    defaultProps: {
      title: "Let's Start a Conversation",
      subtitle: "Reach out and we'll get back to you as soon as possible",
      email: "contact@example.com",
      phone: "+1 (555) 123-4567",
    },
    variant: "advanced",
    export: {
      react: { name: "ContactInteractive", path: "@/components/ContactInteractive" },
      next: { name: "ContactInteractive", path: "@/components/ContactInteractive" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="contact-interactive">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">${props.title || "Let's Start a Conversation"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">${props.subtitle || "Reach out and we'll get back to you"}</p>
    </div>
    <div class="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12">
      <form class="space-y-6">
        <input type="text" placeholder="Full Name" class="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 focus:border-purple-500 outline-none" />
        <input type="email" placeholder="Email" class="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 focus:border-purple-500 outline-none" />
        <textarea rows="5" placeholder="Message" class="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 focus:border-purple-500 outline-none resize-none"></textarea>
        <button class="w-full py-4 rounded-xl font-semibold bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all">Send Message</button>
      </form>
    </div>
  </div>
</section>`,
    },
  },

  ctaAnimated: {
    component: CTAAnimated,
    defaultProps: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers who have transformed their business.",
      buttonText: "Start Free Trial",
    },
    variant: "advanced",
    export: {
      react: { name: "CTAAnimated", path: "@/components/CTAAnimated" },
      next: { name: "CTAAnimated", path: "@/components/CTAAnimated" },
      html: (props) => {
        const bgStyle = props.gradientColors && props.gradientColors.length >= 2
          ? `background: linear-gradient(135deg, ${props.gradientColors.join(', ')}); background-size: 400% 400%; animation: gradientShift 15s ease infinite;`
          : `background: ${props.backgroundColor || '#4f46e5'};`;
        const titleColor = props.titleColor || '#ffffff';
        const subtitleColor = props.subtitleColor || '#e2e8f0';
        const buttonBg = props.buttonBackground || '#ffffff';
        const buttonText = props.buttonTextColor || '#4f46e5';
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center text-center relative overflow-hidden" style="${bgStyle}" data-section="cta-animated">
  <div class="max-w-4xl mx-auto relative z-10 w-full">
    <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Ready to Get Started?"}</h2>
    <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Join thousands of satisfied customers"}</p>
    <button class="px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold shadow-2xl hover-scale transition-all viewport-animate-scale" style="background: ${buttonBg}; color: ${buttonText}; animation-delay: 0.4s;">${props.buttonText || "Start Free Trial"}</button>
  </div>
</section>`;
      },
    },
  },

  ctaGlass: {
    component: CTAGlass,
    defaultProps: {
      title: "Transform Your Business Today",
      subtitle: "Experience the power of our platform and see why thousands of companies trust us.",
      buttonText: "Get Started Now",
    },
    variant: "advanced",
    export: {
      react: { name: "CTAGlass", path: "@/components/CTAGlass" },
      next: { name: "CTAGlass", path: "@/components/CTAGlass" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#0f172a';
        const titleColor = props.titleColor || '#ffffff';
        const subtitleColor = props.subtitleColor || '#cbd5e1';
        const buttonBg = props.buttonBackground || '#4f46e5';
        const buttonText = props.buttonTextColor || '#ffffff';
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center text-center relative overflow-hidden" style="background: ${bgColor};" data-section="cta-glass">
  <div class="max-w-5xl mx-auto w-full">
    <div class="p-12 md:p-16 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl bg-white/10 hover-glow-purple transition-all viewport-animate-scale">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Transform Your Business Today"}</h2>
      <p class="text-xl md:text-2xl mb-10 max-w-2xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Experience the power of our platform"}</p>
      <button class="px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold shadow-2xl hover-scale transition-all viewport-animate-scale" style="background: ${buttonBg}; color: ${buttonText}; animation-delay: 0.4s;">${props.buttonText || "Get Started Now"}</button>
    </div>
  </div>
</section>`;
      },
    },
  },

  featuresShowcase: {
    component: FeaturesShowcase,
    defaultProps: {
      title: "Powerful Features",
      subtitle: "Everything you need to succeed",
      items: [],
    },
    variant: "advanced",
    export: {
      react: { name: "FeaturesShowcase", path: "@/components/FeaturesShowcase" },
      next: { name: "FeaturesShowcase", path: "@/components/FeaturesShowcase" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#ffffff';
        const titleColor = props.titleColor || '#0f172a';
        const subtitleColor = props.subtitleColor || '#64748b';
        const accentColor = props.accentColor || '#4f46e5';
        const items = props.items || [];
        const cardColors = props.cardColors || [];
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center" style="background: ${bgColor};" data-section="features-showcase">
  <div class="max-w-7xl mx-auto w-full">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Powerful Features"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Everything you need to succeed"}</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${items.map((item: any, index: number) => {
        const card = cardColors[index] || {};
        const cardBg = card.backgroundColor || '#ffffff';
        const cardHeader = card.headerColor || titleColor;
        const cardPara = card.paragraphColor || subtitleColor;
        const cardIcon = card.iconColor || accentColor;
        return `<div class="p-8 rounded-2xl border-2 hover-elevate transition-all viewport-animate-scale" style="background: ${cardBg}; border-color: ${accentColor}40; animation-delay: ${0.1 * index}s;">
        <div class="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6" style="background: ${cardIcon}20;">${item.icon || '✨'}</div>
        <h3 class="text-2xl font-bold mb-3" style="color: ${cardHeader};">${item.title || "Feature"}</h3>
        <p style="color: ${cardPara};">${item.desc || "Description"}</p>
      </div>`;
      }).join('')}
    </div>
  </div>
</section>`;
      },
    },
  },

  featuresPremium: {
    component: FeaturesPremium,
    defaultProps: {
      title: "Why Choose Us",
      subtitle: "Discover the features that make us stand out from the competition",
      items: [
        { title: "Advanced Analytics", desc: "Track performance with detailed insights", icon: "📊" },
        { title: "Custom Integrations", desc: "Connect with your favorite tools", icon: "🔌" },
        { title: "Priority Support", desc: "Get help when you need it most", icon: "💬" },
        { title: "Regular Updates", desc: "Always improving with new features", icon: "🔄" },
      ],
    },
    variant: "advanced",
    export: {
      react: { name: "FeaturesPremium", path: "@/components/FeaturesPremium" },
      next: { name: "FeaturesPremium", path: "@/components/FeaturesPremium" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#0f172a';
        const titleColor = props.titleColor || '#ffffff';
        const subtitleColor = props.subtitleColor || '#cbd5e1';
        const accentColor = props.accentColor || '#4f46e5';
        const items = props.items || [];
        const cardColors = props.cardColors || [];
        return `<section class="py-24 md:py-32 px-6 min-h-screen flex items-center" style="background: ${bgColor};" data-section="features-premium">
  <div class="max-w-7xl mx-auto w-full">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 viewport-animate" style="color: ${titleColor};">${props.title || "Why Choose Us"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto viewport-animate" style="color: ${subtitleColor}; animation-delay: 0.2s;">${props.subtitle || "Discover what makes us different"}</p>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      ${items.map((item: any, index: number) => {
        const card = cardColors[index] || {};
        const cardBg = card.backgroundColor || 'rgba(255,255,255,0.05)';
        const cardHeader = card.headerColor || titleColor;
        const cardPara = card.paragraphColor || subtitleColor;
        const cardIcon = card.iconColor || accentColor;
        return `<div class="p-8 rounded-3xl backdrop-blur-md border border-white/10 hover-elevate transition-all viewport-animate-scale" style="background: ${cardBg}; border-color: ${accentColor}40; animation-delay: ${0.1 * index}s;">
        <div class="flex items-start gap-6">
          <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style="background: ${cardIcon}30;">${item.icon || "🚀"}</div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-3" style="color: ${cardHeader};">${item.title || "Feature"}</h3>
            <p style="color: ${cardPara};">${item.desc || "Description"}</p>
          </div>
        </div>
      </div>`;
      }).join('')}
    </div>
  </div>
</section>`;
      },
    },
  },

  footerModern: {
    component: FooterModern,
    defaultProps: {
      companyName: "YourBrand",
      links: [],
      socialLinks: [],
    },
    variant: "advanced",
    export: {
      react: { name: "FooterModern", path: "@/components/FooterModern" },
      next: { name: "FooterModern", path: "@/components/FooterModern" },
      html: (props) => {
        const bgColor = props.backgroundColor || '#0f172a';
        const textColor = props.textColor || '#ffffff';
        const linkColor = props.linkColor || '#94a3b8';
        const accentColor = props.accentColor || '#4f46e5';
        return `<footer class="py-16 px-6 min-h-[50vh] flex items-center" style="background: ${bgColor};" data-section="footer-modern">
  <div class="max-w-7xl mx-auto w-full">
    <div class="grid md:grid-cols-4 gap-12 mb-12">
      <div class="viewport-animate">
        <h3 class="text-2xl font-bold mb-4" style="color: ${textColor};">${props.companyName || "YourBrand"}</h3>
        <p class="text-sm" style="color: ${linkColor};">Building amazing digital experiences</p>
      </div>
      <div class="viewport-animate" style="animation-delay: 0.1s;">
        <h4 class="font-semibold mb-4" style="color: ${textColor};">Product</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:opacity-80 transition-colors" style="color: ${linkColor};">About</a></li>
          <li><a href="#" class="hover:opacity-80 transition-colors" style="color: ${linkColor};">Features</a></li>
        </ul>
      </div>
    </div>
    <div class="h-px bg-gradient-to-r from-transparent mb-8" style="background: linear-gradient(to right, transparent, ${accentColor}80, transparent);"></div>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style="color: ${linkColor};">
      <p>© ${new Date().getFullYear()} ${props.companyName || "YourBrand"}. All rights reserved.</p>
    </div>
  </div>
</footer>`;
      },
    },
  },

  footerGradient: {
    component: FooterGradient,
    defaultProps: {
      companyName: "YourBrand",
      links: [],
      socialLinks: [],
    },
    variant: "advanced",
    export: {
      react: { name: "FooterGradient", path: "@/components/FooterGradient" },
      next: { name: "FooterGradient", path: "@/components/FooterGradient" },
      html: (props) => {
        const bgStyle = props.gradientColors && props.gradientColors.length >= 2
          ? `background: linear-gradient(135deg, ${props.gradientColors.join(', ')}); background-size: 400% 400%; animation: gradientShift 15s ease infinite;`
          : `background: ${props.backgroundColor || 'linear-gradient(135deg, #4f46e5, #7c3aed)'};`;
        const textColor = props.textColor || '#ffffff';
        const linkColor = props.linkColor || '#cbd5e1';
        const accentColor = props.accentColor || '#4f46e5';
        return `<footer class="py-20 px-6 min-h-[50vh] flex items-center" style="${bgStyle}" data-section="footer-gradient">
  <div class="max-w-7xl mx-auto w-full">
    <div class="grid md:grid-cols-5 gap-12 mb-16">
      <div class="md:col-span-2 viewport-animate">
        <h3 class="text-3xl font-bold mb-4" style="color: ${textColor};">${props.companyName || "YourBrand"}</h3>
        <p class="text-sm mb-6" style="color: ${linkColor};">Creating beautiful digital experiences.</p>
      </div>
      <div class="viewport-animate" style="animation-delay: 0.1s;">
        <h4 class="font-bold mb-4" style="color: ${textColor};">Product</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="#" class="hover:opacity-80 transition-colors" style="color: ${linkColor};">About</a></li>
        </ul>
      </div>
    </div>
    <div class="h-px bg-gradient-to-r from-transparent mb-8" style="background: linear-gradient(to right, transparent, ${accentColor}80, transparent);"></div>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style="color: ${linkColor};">
      <p>© ${new Date().getFullYear()} ${props.companyName || "YourBrand"}. All rights reserved.</p>
    </div>
  </div>
</footer>`;
      },
    },
  },

  portfolioMasonry: {
    component: PortfolioMasonry,
    defaultProps: {
      title: "Our Portfolio",
      subtitle: "Showcasing our best work",
      projects: [],
    },
    variant: "advanced",
    export: {
      react: { name: "PortfolioMasonry", path: "@/components/PortfolioMasonry" },
      next: { name: "PortfolioMasonry", path: "@/components/PortfolioMasonry" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="portfolio-masonry">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">${props.title || "Our Portfolio"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">${props.subtitle || "Showcasing our best work"}</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${(props.projects || []).map((project: any) => `<div class="relative overflow-hidden rounded-2xl cursor-pointer group">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img src="${project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800'}" alt="${project.title || 'Project'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <h3 class="text-2xl font-bold mb-2 text-white">${project.title || "Project"}</h3>
            <p class="text-sm text-white/90">${project.category || "Category"}</p>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  portfolioShowcase: {
    component: PortfolioShowcase,
    defaultProps: {
      title: "Featured Projects",
      subtitle: "Our latest and greatest work",
      projects: [],
    },
    variant: "advanced",
    export: {
      react: { name: "PortfolioShowcase", path: "@/components/PortfolioShowcase" },
      next: { name: "PortfolioShowcase", path: "@/components/PortfolioShowcase" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="portfolio-showcase">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">${props.title || "Featured Projects"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">${props.subtitle || "Our latest and greatest work"}</p>
    </div>
    <div class="space-y-12">
      ${(props.projects || []).map((project: any, index: number) => `<div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="relative overflow-hidden rounded-2xl ${index % 2 === 0 ? 'order-1' : 'order-2'}">
          <img src="${project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800'}" alt="${project.title || 'Project'}" class="w-full h-auto object-cover" />
        </div>
        <div class="${index % 2 === 0 ? 'order-2' : 'order-1'} space-y-4">
          <div class="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-indigo-500/20 text-purple-300">${project.category || "Category"}</div>
          <h3 class="text-3xl md:text-4xl font-bold">${project.title || "Project"}</h3>
          <p class="text-lg text-gray-300">${project.description || "Description"}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  pricingModern: {
    component: PricingModern,
    defaultProps: {
      title: "Simple Pricing",
      subtitle: "Choose the perfect plan for your needs",
      plans: [],
    },
    variant: "advanced",
    export: {
      react: { name: "PricingModern", path: "@/components/PricingModern" },
      next: { name: "PricingModern", path: "@/components/PricingModern" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-white" data-section="pricing-modern">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">${props.title || "Simple Pricing"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">${props.subtitle || "Choose the perfect plan"}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${(props.plans || []).map((plan: any) => `<div class="relative rounded-3xl overflow-hidden shadow-xl p-8 border ${plan.popular ? 'border-2 border-indigo-500 md:scale-110' : 'border-gray-200'} bg-white">
        ${plan.popular ? '<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"><span class="px-4 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">⭐ MOST POPULAR</span></div>' : ''}
        <div class="mb-8">
          <h3 class="text-2xl font-bold mb-4 text-gray-900">${plan.name || "Plan"}</h3>
          <div class="flex items-baseline">
            <span class="text-5xl font-extrabold text-gray-900">${plan.price || "$9"}</span>
            <span class="ml-2 text-lg text-gray-600">${plan.period || "/month"}</span>
          </div>
        </div>
        <ul class="space-y-4 mb-8">
          ${(plan.features || []).map((feature: string) => `<li class="flex items-start gap-3"><span class="text-indigo-600">✓</span><span class="text-gray-700">${feature}</span></li>`).join('')}
        </ul>
        <button class="w-full py-4 rounded-xl font-semibold bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all">Get Started</button>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  pricingPremium: {
    component: PricingPremium,
    defaultProps: {
      title: "Choose Your Plan",
      subtitle: "Flexible pricing for teams of all sizes",
      plans: [],
    },
    variant: "advanced",
    export: {
      react: { name: "PricingPremium", path: "@/components/PricingPremium" },
      next: { name: "PricingPremium", path: "@/components/PricingPremium" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="pricing-premium">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">${props.title || "Choose Your Plan"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">${props.subtitle || "Flexible pricing for teams"}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${(props.plans || []).map((plan: any) => `<div class="relative rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 p-8 ${plan.popular ? 'border-2 border-indigo-500 md:scale-110' : ''} bg-white/5">
        ${plan.popular ? '<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"><span class="px-4 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">⭐ MOST POPULAR</span></div>' : ''}
        <div class="mb-8">
          <h3 class="text-2xl font-bold mb-4">${plan.name || "Plan"}</h3>
          <div class="flex items-baseline">
            <span class="text-5xl font-extrabold">${plan.price || "$9"}</span>
            <span class="ml-2 text-lg text-gray-300">${plan.period || "/month"}</span>
          </div>
        </div>
        <ul class="space-y-4 mb-8">
          ${(plan.features || []).map((feature: string) => `<li class="flex items-start gap-3"><span class="text-indigo-400">✓</span><span class="text-gray-300">${feature}</span></li>`).join('')}
        </ul>
        <button class="w-full py-4 rounded-xl font-semibold bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all">Get Started</button>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  teamModern: {
    component: TeamModern,
    defaultProps: {
      title: "Meet Our Team",
      subtitle: "The talented people behind our success",
      members: [],
    },
    variant: "advanced",
    export: {
      react: { name: "TeamModern", path: "@/components/TeamModern" },
      next: { name: "TeamModern", path: "@/components/TeamModern" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-white" data-section="team-modern">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">${props.title || "Meet Our Team"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">${props.subtitle || "The talented people behind our success"}</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${(props.members || []).map((member: any) => `<div class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
        <div class="relative aspect-square overflow-hidden">
          <img src="${member.image || 'https://i.pravatar.cc/300?img=11'}" alt="${member.name || 'Team Member'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-bold mb-1 text-gray-900">${member.name || "Name"}</h3>
          <p class="text-indigo-600 font-medium">${member.role || "Role"}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  teamShowcase: {
    component: TeamShowcase,
    defaultProps: {
      title: "Our Amazing Team",
      subtitle: "Passionate professionals dedicated to excellence",
      members: [],
    },
    variant: "advanced",
    export: {
      react: { name: "TeamShowcase", path: "@/components/TeamShowcase" },
      next: { name: "TeamShowcase", path: "@/components/TeamShowcase" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="team-showcase">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">${props.title || "Our Amazing Team"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">${props.subtitle || "Passionate professionals"}</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${(props.members || []).map((member: any) => `<div class="rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5">
        <div class="relative aspect-square overflow-hidden">
          <img src="${member.image || 'https://i.pravatar.cc/300?img=11'}" alt="${member.name || 'Team Member'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-bold mb-1">${member.name || "Name"}</h3>
          <p class="text-indigo-400 font-medium">${member.role || "Role"}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  testimonialsModern: {
    component: TestimonialsModern,
    defaultProps: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it",
      testimonials: [],
    },
    variant: "advanced",
    export: {
      react: { name: "TestimonialsModern", path: "@/components/TestimonialsModern" },
      next: { name: "TestimonialsModern", path: "@/components/TestimonialsModern" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-white" data-section="testimonials-modern">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">${props.title || "What Our Clients Say"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">${props.subtitle || "Don't just take our word for it"}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${(props.testimonials || []).map((testimonial: any) => `<div class="p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-purple-500 transition-all">
        <div class="flex gap-1 mb-4"><span style="color: #fbbf24">⭐⭐⭐⭐⭐</span></div>
        <p class="text-lg leading-relaxed italic mb-6 text-gray-700">"${testimonial.content || "Amazing experience!"}"</p>
        <div class="flex items-center gap-4">
          <img src="${testimonial.image || 'https://i.pravatar.cc/150?img=1'}" alt="${testimonial.name || 'Client'}" class="w-14 h-14 rounded-full object-cover border-2 border-indigo-200" />
          <div>
            <div class="font-semibold text-gray-900">${testimonial.name || "Name"}</div>
            <div class="text-sm text-gray-600">${testimonial.role || "Role"}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },

  testimonialsShowcase: {
    component: TestimonialsShowcase,
    defaultProps: {
      title: "Client Success Stories",
      subtitle: "Real results from real customers",
      testimonials: [],
    },
    variant: "advanced",
    export: {
      react: { name: "TestimonialsShowcase", path: "@/components/TestimonialsShowcase" },
      next: { name: "TestimonialsShowcase", path: "@/components/TestimonialsShowcase" },
      html: (props) => `<section class="py-24 md:py-32 px-6 bg-gray-900 text-white" data-section="testimonials-showcase">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">${props.title || "Client Success Stories"}</h2>
      <p class="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300">${props.subtitle || "Real results from real customers"}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      ${(props.testimonials || []).map((testimonial: any) => `<div class="p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5">
        <div class="flex gap-1 mb-4"><span style="color: #fbbf24">⭐⭐⭐⭐⭐</span></div>
        <p class="text-lg leading-relaxed italic mb-6 text-gray-300">"${testimonial.content || "Amazing experience!"}"</p>
        <div class="flex items-center gap-4">
          <img src="${testimonial.image || 'https://i.pravatar.cc/150?img=1'}" alt="${testimonial.name || 'Client'}" class="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
          <div>
            <div class="font-semibold">${testimonial.name || "Name"}</div>
            <div class="text-sm text-gray-400">${testimonial.role || "Role"}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
    },
  },
};
