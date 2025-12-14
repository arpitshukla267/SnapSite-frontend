export const SectionsLibrary = [
  // HERO
  {
    name: "Hero Minimal",
    type: "heroMinimal",
    category: "Hero",
    image: "/placeholders/hero-minimal.png", // We'll need to create/mock these or just use generic
    defaultProps: {
      title: "Welcome to Our Website",
      subtitle: "Build and customize your landing page fast.",
      buttonText: "Get Started",
    },
  },
  {
    name: "Hero Gradient",
    type: "heroGradient",
    category: "Hero",
    image: "/placeholders/hero-gradient.png",
    defaultProps: {
      title: "Launch Faster",
      subtitle: "Beautiful landing pages in minutes.",
      buttonText: "Start Now",
    },
  },
  {
    name: "Hero Split",
    type: "heroSplit",
    category: "Hero",
    image: "/placeholders/hero-split.png",
    defaultProps: {
      title: "Build Stunning Pages",
      subtitle: "Create beautiful sections with ease.",
      buttonText: "Explore",
      image: "/placeholder.png",
    },
  },
  {
    name: "Hero Video",
    type: "heroVideo",
    category: "Hero",
    image: "/placeholders/hero-video.png",
    defaultProps: {
      title: "Watch Our Story",
      subtitle: "Experience the difference with our platform.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  },
  {
    name: "Hero Centered",
    type: "heroCentered",
    category: "Hero",
    image: "/placeholders/hero-centered.png",
    defaultProps: {
      title: "Central Hub",
      subtitle: "All your needs in one place.",
      buttonText: "Join Us",
    },
  },

  // ABOUT
  {
    name: "About Simple",
    type: "aboutSimple",
    category: "About",
    image: "/placeholders/about-simple.png",
    defaultProps: {
      title: "About Us",
      description: "We are building the future of website creation.",
      image: "/placeholder.png",
    },
  },
  {
    name: "About Centered",
    type: "aboutCentered",
    category: "About",
    image: "/placeholders/about-centered.png",
    defaultProps: {
      title: "Who We Are",
      description: "A passionate team creating great experiences.",
      image: "/placeholder.png",
    },
  },
  {
    name: "About Image Left",
    type: "aboutImageLeft",
    category: "About",
    image: "/placeholders/about-image-left.png",
    defaultProps: {
      title: "Our Story",
      description: "From humble beginnings to where we are now.",
      image: "/placeholder.png",
    },
  },

  // FEATURES
  {
    name: "Features Grid",
    type: "featuresGrid",
    category: "Features",
    image: "/placeholders/features-grid.png",
    defaultProps: {
      items: [
        { title: "Fast", desc: "Super quick websites" },
        { title: "Secure", desc: "Top notch security" },
        { title: "Beautiful", desc: "Modern UI components" },
      ],
    },
  },
  {
    name: "Features Icons",
    type: "featuresIcons",
    category: "Features",
    image: "/placeholders/features-icons.png",
    defaultProps: {
      items: [
        { title: "Speed", desc: "Fast load performance" },
        { title: "Design", desc: "Beautiful layouts" },
        { title: "SEO", desc: "Rank higher easily" },
      ],
    },
  },

  // CTA
  {
    name: "CTA Simple",
    type: "ctaSimple",
    category: "CTA",
    image: "/placeholders/cta-simple.png",
    defaultProps: {
      title: "Ready to Start?",
      subtitle: "Join thousands of happy users.",
      buttonText: "Sign Up Now",
    },
  },
  {
    name: "CTA Split",
    type: "ctaSplit",
    category: "CTA",
    image: "/placeholders/cta-split.png",
    defaultProps: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you.",
      buttonText: "Contact Support",
    },
  },
  {
    name: "CTA Boxed",
    type: "ctaBoxed",
    category: "CTA",
    image: "/placeholders/cta-boxed.png",
    defaultProps: {
      title: "Limited Time Offer",
      subtitle: "Get 50% off your first month.",
      buttonText: "Claim Offer",
    },
  },

  // TESTIMONIALS
  {
    name: "Testimonial Cards",
    type: "testimonialCards",
    category: "Testimonials",
    image: "/placeholders/testimonial-cards.png",
    defaultProps: {
      testimonials: [], // Use internal defaults
    },
  },

  // PRICING
  {
    name: "Pricing 3-Col",
    type: "pricingThreeColumn",
    category: "Pricing",
    image: "/placeholders/pricing-3col.png",
    defaultProps: {
      plans: [
        { name: "Basic", price: "$10", features: ["Feature 1", "Feature 2"] },
        { name: "Pro", price: "$30", features: ["Everything in Basic", "Feature 3"] },
        { name: "Enterprise", price: "$99", features: ["Unlimited Access"] },
      ],
    },
  },

  // CONTACT
  {
    name: "Contact Form",
    type: "contactForm",
    category: "Contact",
    image: "/placeholders/contact-form.png",
    defaultProps: {
      title: "Contact Us",
      subtitle: "Send us a message and we'll reply soon.",
      email: "support@example.com",
    },
  },

  // TEAM
  {
    name: "Team Grid",
    type: "teamGrid",
    category: "Team",
    image: "/placeholders/team-grid.png",
    defaultProps: {
      members: [], // Use internal defaults
    },
  },

  // PORTFOLIO
  {
    name: "Portfolio Grid",
    type: "portfolioGrid",
    category: "Portfolio",
    image: "/placeholders/portfolio-grid.png",
    defaultProps: {
      projects: [], // Use internal defaults
    },
  },

  // FOOTER
  {
    name: "Footer Simple",
    type: "footerSimple",
    category: "Footer",
    image: "/placeholders/footer-simple.png",
    defaultProps: {
      copyright: "© 2024 My Company. All rights reserved.",
      links: ["Privacy", "Terms", "Contact"],
    },
  },
];
