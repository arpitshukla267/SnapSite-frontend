// hero
import HeroMinimal from "../components/builder/sections/hero/HeroMinimal";
import HeroGradient from "../components/builder/sections/hero/HeroGradient";
import HeroSplit from "../components/builder/sections/hero/HeroSplit";
import HeroVideo from "../components/builder/sections/hero/HeroVideo";
import HeroCentered from "../components/builder/sections/hero/HeroCentered";

// about
import AboutSimple from "../components/builder/sections/about/AboutSimple";
import AboutCentered from "../components/builder/sections/about/AboutCentered";
import AboutImageLeft from "../components/builder/sections/about/AboutImageLeft";

// features
import FeaturesGrid from "../components/builder/sections/features/FeaturesGrid";
import FeaturesIcons from "../components/builder/sections/features/FeaturesIcons";

// cta
import CTASimple from "../components/builder/sections/cta/CTASimple";
import CTASplit from "../components/builder/sections/cta/CTASplit";
import CTABoxed from "../components/builder/sections/cta/CTABoxed";

// testimonials
import TestimonialCards from "../components/builder/sections/testimonials/TestimonialCards";

// pricing
import PricingThreeColumn from "../components/builder/sections/pricing/PricingThreeColumn";

// contact
import ContactForm from "../components/builder/sections/contact/ContactForm";

// footer
import FooterSimple from "../components/builder/sections/footer/FooterSimple";

// team
import TeamGrid from "../components/builder/sections/team/TeamGrid";

// portfolio
import PortfolioGrid from "../components/builder/sections/portfolio/PortfolioGrid";

export const SectionRegistry = {
  // Hero Sections
  heroMinimal: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: HeroMinimal,

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
<section class="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-white text-center overflow-hidden min-h-screen flex flex-col justify-center items-center">
  <!-- Grid Background -->
  <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#6366f1 1px, transparent 1px); background-size: 30px 30px;"></div>
  
  <!-- Content -->
  <div class="relative z-10 max-w-3xl mx-auto">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
      ${props.title || "Welcome to Our Website"}
    </h1>

    <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full"></div>

    <p class="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
      ${props.subtitle || "Build and customize your landing page fast."}
    </p>

    <div class="mt-10">
      <button class="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
        ${props.buttonText || "Get Started"}
      </button>
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
<section class="relative w-full py-32 overflow-hidden min-h-screen flex flex-col justify-center items-center">
  
  <!-- Animated Gradient Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 animate-gradient-slow"></div>
  
  <!-- Floating Decorative Blobs -->
  <div class="blob1" style="filter: blur(100px);"></div>
  <div class="blob2" style="filter: blur(100px);"></div>
  
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
<section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-20 px-6 max-w-7xl mx-auto">
  <div class="space-y-6">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
      ${props.title || "Build Stunning Pages"}
    </h1>

    <p class="text-lg text-gray-600">
      ${props.subtitle || "Create beautiful sections with ease."}
    </p>

    <button class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
      ${props.buttonText || "Explore"}
    </button>
  </div>

  <div class="relative">
    <img src="${props.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"}" alt="Hero" class="w-full rounded-xl shadow-lg" />
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
<section class="relative py-24 px-6 text-center overflow-hidden bg-gray-900 text-white">
  <div class="relative z-10 max-w-4xl mx-auto mb-12">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">
      ${props.title || "Watch Our Story"}
    </h1>

    <p class="text-lg text-gray-300">
      ${props.subtitle || "Experience the difference with our platform."}
    </p>
  </div>

  <div class="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
    <iframe src="${props.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}" class="w-full h-[450px]" frameborder="0" allowfullscreen></iframe>
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
      html: (props) => `
<section class="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-gray-50 to-white">
  <h1 class="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mb-6 tracking-tight">
    ${props.title || "Design without Limits"}
  </h1>

  <p class="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
    ${props.subtitle || "Everything you need to build great websites."}
  </p>

  <div class="flex gap-4">
    <button class="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg">
      ${props.buttonText || "Get Started"}
    </button>
    <button class="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition shadow-sm">
      Learn More
    </button>
  </div>
</section>
      `,
    },
  },

  // About Sections
  aboutSimple: {
    /* =========================
       1. BUILDER RENDERING
    ========================== */
    component: AboutSimple,

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
<section class="py-20 px-6 bg-gray-50">
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
<section class="py-24 px-6 text-center bg-gradient-to-b from-white to-gray-100">
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
<section class="py-20 px-6 bg-white">
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
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-100">
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
<section class="py-24 px-6 bg-white">
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
<section class="py-20 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white text-center relative overflow-hidden">
  
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
<section class="cta-boxed" style="padding: 4rem 1.5rem;">
  <div style="max-width: 800px; margin: 0 auto; padding: 3rem; background: linear-gradient(135deg, #4f46e5, #9333ea); border-radius: 1.5rem; text-align: center;">
    <h2 style="font-size: 2.5rem; font-weight: 700; color: white;">
      ${props.title || "Limited Time Offer"}
    </h2>

    <p style="margin-top: 1rem; font-size: 1.125rem; color: rgba(255,255,255,0.9);">
      ${props.subtitle || "Get 50% off your first month."}
    </p>

    <button style="margin-top: 2rem; padding: 0.875rem 2.5rem; font-size: 1rem; border-radius: 0.75rem; background: white; color: #4f46e5; border: none; font-weight: 600;">
      ${props.buttonText || "Claim Offer"}
    </button>
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
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
  <div class="max-w-7xl mx-auto text-center mb-16">
    <div class="mb-4 inline-block">
      <span class="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
        ⭐ Testimonials
      </span>
    </div>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
      What Our Customers Say
    </h2>
    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
      Join thousands of satisfied users who have transformed their businesses
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
        <div class="relative bg-white rounded-2xl p-1">
          <div class="flex gap-1 mb-4 text-yellow-400 text-lg">
            ${Array(t.rating || 5).fill('⭐').join('')}
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic">"${t.text}"</p>
          <div class="flex items-center gap-4">
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
<section class="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
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
<section class="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
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
            <div class="text-gray-600">support@example.com</div>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">📞</div>
          <div>
            <div class="font-semibold text-gray-900">Phone</div>
            <div class="text-gray-600">+1 (555) 123-4567</div>
          </div>
        </div>
         <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">📍</div>
          <div>
            <div class="font-semibold text-gray-900">Office</div>
            <div class="text-gray-600">123 Business St, City, ST 12345</div>
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
<footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-6">
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
<section class="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
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
<section class="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
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
};
