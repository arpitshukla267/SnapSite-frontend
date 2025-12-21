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
  {
    name: "Hero Advanced",
    type: "heroAdvanced",
    category: "Hero",
    image: "/placeholders/hero-advanced.png",
    defaultProps: {
      title: "Build Something Amazing",
      subtitle: "Create stunning websites with our powerful builder. No coding required.",
      buttonText: "Get Started",
      buttonText2: "Learn More",
      enableParticles: true,
      enableGradientAnimation: true,
      enableTextReveal: true,
    },
  },
  {
    name: "Hero Animated",
    type: "heroAnimated",
    category: "Hero",
    image: "/placeholders/hero-animated.png",
    defaultProps: {
      title: "Build Amazing Websites",
      subtitle: "Create stunning, responsive websites in minutes with our powerful drag-and-drop builder.",
      buttonText: "Get Started",
      buttonText2: "Learn More",
    },
  },
  {
    name: "Hero Modern",
    type: "heroModern",
    category: "Hero",
    image: "/placeholders/hero-modern.png",
    defaultProps: {
      title: "Transform Your Ideas Into Reality",
      subtitle: "The most powerful website builder that lets you create professional websites without coding.",
      buttonText: "Start Building",
      buttonText2: "Watch Demo",
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
  {
    name: "About Advanced",
    type: "aboutAdvanced",
    category: "About",
    image: "/placeholders/about-advanced.png",
    defaultProps: {
      title: "Who We Are",
      description: "We are a team of passionate creators, innovators, and problem solvers dedicated to building amazing experiences.",
      image: "/placeholder.png",
      enableRevealAnimation: true,
      enableHoverEffects: true,
    },
  },
  {
    name: "About Modern",
    type: "aboutModern",
    category: "About",
    image: "/placeholders/about-modern.png",
    defaultProps: {
      title: "About Our Company",
      description: "We are a team of passionate designers and developers dedicated to creating exceptional digital experiences. With years of experience and a commitment to innovation, we help businesses transform their ideas into reality.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      stats: [
        { number: "500+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "10+", label: "Years Experience" },
      ],
    },
  },
  {
    name: "About Showcase",
    type: "aboutShowcase",
    category: "About",
    image: "/placeholders/about-showcase.png",
    defaultProps: {
      title: "We Build Digital Experiences",
      subtitle: "Crafting beautiful, functional websites that drive results",
      description: "Our team combines creativity with technical expertise to deliver solutions that not only look great but perform exceptionally. We believe in the power of design to transform businesses.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      features: [
        { icon: "🎨", title: "Creative Design", desc: "Unique and modern designs" },
        { icon: "⚡", title: "Fast Performance", desc: "Lightning-fast load times" },
        { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security" },
      ],
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
  {
    name: "Features Advanced",
    type: "featuresAdvanced",
    category: "Features",
    image: "/placeholders/features-advanced.png",
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
  },
  {
    name: "Features Showcase",
    type: "featuresShowcase",
    category: "Features",
    image: "/placeholders/features-showcase.png",
    defaultProps: {
      title: "Powerful Features",
      subtitle: "Everything you need to build and grow your online presence",
      items: [
        { title: "Drag & Drop Builder", desc: "Intuitive interface for easy customization", icon: "🎨" },
        { title: "Responsive Design", desc: "Perfect on all devices and screen sizes", icon: "📱" },
        { title: "SEO Optimized", desc: "Built-in SEO tools for better rankings", icon: "🔍" },
        { title: "Fast Performance", desc: "Lightning-fast load times and optimization", icon: "⚡" },
      ],
    },
  },
  {
    name: "Features Premium",
    type: "featuresPremium",
    category: "Features",
    image: "/placeholders/features-premium.png",
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
  {
    name: "CTA Animated",
    type: "ctaAnimated",
    category: "CTA",
    image: "/placeholders/cta-animated.png",
    defaultProps: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers who have transformed their business with our platform.",
      buttonText: "Start Free Trial",
    },
  },
  {
    name: "CTA Glass",
    type: "ctaGlass",
    category: "CTA",
    image: "/placeholders/cta-glass.png",
    defaultProps: {
      title: "Transform Your Business Today",
      subtitle: "Experience the power of our platform and see why thousands of companies trust us.",
      buttonText: "Get Started Now",
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
  {
    name: "Testimonials Advanced",
    type: "testimonialsAdvanced",
    category: "Testimonials",
    image: "/placeholders/testimonials-advanced.png",
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
  },
  {
    name: "Testimonials Modern",
    type: "testimonialsModern",
    category: "Testimonials",
    image: "/placeholders/testimonials-modern.png",
    defaultProps: {
      title: "What Our Clients Say",
      subtitle: "Don't just take our word for it - hear from our satisfied customers",
      testimonials: [
        { name: "Sarah Johnson", role: "CEO, TechCorp", text: "This platform has completely transformed how we build websites. Absolutely incredible!", image: "https://i.pravatar.cc/150?img=1", rating: 5 },
        { name: "Michael Chen", role: "Designer, CreativeStudio", text: "The easiest and most powerful website builder I've ever used. Highly recommended!", image: "https://i.pravatar.cc/150?img=2", rating: 5 },
        { name: "Emily Rodriguez", role: "Founder, StartupHub", text: "Within minutes I had a beautiful, professional website up and running. Amazing!", image: "https://i.pravatar.cc/150?img=3", rating: 5 },
      ],
    },
  },
  {
    name: "Testimonials Showcase",
    type: "testimonialsShowcase",
    category: "Testimonials",
    image: "/placeholders/testimonials-showcase.png",
    defaultProps: {
      title: "Trusted by Thousands",
      subtitle: "See what our customers have to say about their experience",
      testimonials: [
        { name: "John Smith", role: "Founder, StartupCo", text: "The best investment we've made. Our website looks professional and converts visitors into customers.", image: "https://i.pravatar.cc/150?img=12", rating: 5 },
        { name: "Lisa Anderson", role: "Marketing Director", text: "Incredibly easy to use and the results speak for themselves. Our traffic has increased by 300%!", image: "https://i.pravatar.cc/150?img=47", rating: 5 },
        { name: "Robert Taylor", role: "E-commerce Owner", text: "Fast, reliable, and beautiful. Everything we needed in one platform. Highly recommend!", image: "https://i.pravatar.cc/150?img=33", rating: 5 },
      ],
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
  {
    name: "Pricing Modern",
    type: "pricingModern",
    category: "Pricing",
    image: "/placeholders/pricing-modern.png",
    defaultProps: {
      title: "Choose Your Plan",
      subtitle: "Flexible pricing options for teams of all sizes",
      plans: [
        { name: "Starter", price: "$9", period: "/month", features: ["5 Projects", "Basic Support", "1GB Storage"], popular: false },
        { name: "Professional", price: "$29", period: "/month", features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Advanced Analytics"], popular: true },
        { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Dedicated Support", "Unlimited Storage", "White Label"], popular: false },
      ],
    },
  },
  {
    name: "Pricing Premium",
    type: "pricingPremium",
    category: "Pricing",
    image: "/placeholders/pricing-premium.png",
    defaultProps: {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the perfect plan for your needs",
      plans: [
        { name: "Basic", price: "$19", period: "/month", features: ["10 Projects", "Email Support", "5GB Storage"], popular: false },
        { name: "Pro", price: "$49", period: "/month", features: ["Unlimited Projects", "Priority Support", "50GB Storage", "Advanced Features"], popular: true },
        { name: "Enterprise", price: "$199", period: "/month", features: ["Everything in Pro", "24/7 Support", "Unlimited Storage", "Custom Solutions"], popular: false },
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
  {
    name: "Contact Modern",
    type: "contactModern",
    category: "Contact",
    image: "/placeholders/contact-modern.png",
    defaultProps: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      email: "hello@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, ST 12345",
    },
  },
  {
    name: "Contact Interactive",
    type: "contactInteractive",
    category: "Contact",
    image: "/placeholders/contact-interactive.png",
    defaultProps: {
      title: "Let's Start a Conversation",
      subtitle: "Have a project in mind? We're here to help bring your vision to life.",
      email: "contact@example.com",
      phone: "+1 (555) 123-4567",
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
  {
    name: "Team Modern",
    type: "teamModern",
    category: "Team",
    image: "/placeholders/team-modern.png",
    defaultProps: {
      title: "Meet Our Team",
      subtitle: "Talented individuals working together to build amazing products",
      members: [
        { name: "Alex Thompson", role: "CEO & Founder", image: "https://i.pravatar.cc/300?img=11", bio: "Visionary leader with 15+ years in tech" },
        { name: "Jamie Lee", role: "Head of Design", image: "https://i.pravatar.cc/300?img=5", bio: "Award-winning designer passionate about UX" },
        { name: "Morgan Davis", role: "Lead Developer", image: "https://i.pravatar.cc/300?img=13", bio: "Full-stack expert building scalable solutions" },
        { name: "Casey Martinez", role: "Product Manager", image: "https://i.pravatar.cc/300?img=9", bio: "Strategic thinker driving product innovation" },
      ],
    },
  },
  {
    name: "Team Showcase",
    type: "teamShowcase",
    category: "Team",
    image: "/placeholders/team-showcase.png",
    defaultProps: {
      title: "Our Amazing Team",
      subtitle: "The people behind our success",
      members: [
        { name: "Sarah Johnson", role: "Creative Director", image: "https://i.pravatar.cc/300?img=1", bio: "Bringing creative visions to life" },
        { name: "Michael Chen", role: "Tech Lead", image: "https://i.pravatar.cc/300?img=2", bio: "Building scalable solutions" },
        { name: "Emily Rodriguez", role: "UX Designer", image: "https://i.pravatar.cc/300?img=3", bio: "Crafting beautiful user experiences" },
        { name: "David Kim", role: "Marketing Head", image: "https://i.pravatar.cc/300?img=4", bio: "Driving growth and engagement" },
      ],
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
  {
    name: "Portfolio Advanced",
    type: "portfolioAdvanced",
    category: "Portfolio",
    image: "/placeholders/portfolio-advanced.png",
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
  },
  {
    name: "Portfolio Showcase",
    type: "portfolioShowcase",
    category: "Portfolio",
    image: "/placeholders/portfolio-showcase.png",
    defaultProps: {
      title: "Our Portfolio",
      subtitle: "Showcasing our best work and creative solutions",
      projects: [
        { title: "E-Commerce Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Modern online shopping experience" },
        { title: "Brand Identity", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Complete branding package" },
        { title: "Mobile App", category: "App Development", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "iOS and Android fitness tracker" },
      ],
    },
  },
  {
    name: "Portfolio Masonry",
    type: "portfolioMasonry",
    category: "Portfolio",
    image: "/placeholders/portfolio-masonry.png",
    defaultProps: {
      title: "Our Work",
      subtitle: "A collection of our finest projects",
      projects: [
        { title: "Project 1", category: "Web", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", description: "Description 1" },
        { title: "Project 2", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", description: "Description 2" },
        { title: "Project 3", category: "App", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", description: "Description 3" },
        { title: "Project 4", category: "Brand", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", description: "Description 4" },
      ],
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
  {
    name: "Footer Modern",
    type: "footerModern",
    category: "Footer",
    image: "/placeholders/footer-modern.png",
    defaultProps: {
      companyName: "YourBrand",
      description: "Building the future of web design, one website at a time.",
      links: {
        product: ["Features", "Pricing", "Updates", "Roadmap"],
        company: ["About", "Blog", "Careers", "Contact"],
        resources: ["Documentation", "Support", "API", "Community"],
      },
      socialLinks: ["Twitter", "LinkedIn", "GitHub"],
    },
  },
  {
    name: "Footer Gradient",
    type: "footerGradient",
    category: "Footer",
    image: "/placeholders/footer-gradient.png",
    defaultProps: {
      companyName: "YourBrand",
      tagline: "Building amazing digital experiences",
      links: ["About", "Features", "Pricing", "Contact"],
      socialLinks: ["Twitter", "LinkedIn", "GitHub", "Instagram"],
    },
  },
];
