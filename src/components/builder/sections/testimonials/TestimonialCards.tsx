"use client";
import TextEditable from "../../TextEditable";

export default function TestimonialCards({ 
  testimonials = [], 
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  cardColors = [],
}) {
  const defaultTestimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "This platform has completely transformed how we build websites. Absolutely incredible!"
    },
    {
      name: "Michael Chen",
      role: "Designer, CreativeStudio",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      text: "The easiest and most powerful website builder I've ever used. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartupHub",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Within minutes I had a beautiful, professional website up and running. Amazing!"
    }
  ];

  // Use provided testimonials if available, otherwise use defaults
  // Ensure we always have exactly 3 testimonials with complete data
  let items = testimonials.length > 0 ? [...testimonials] : [...defaultTestimonials];
  
  // Fill missing slots with defaults if needed (create new objects, don't reuse references)
  while (items.length < 3) {
    const defaultIndex = items.length;
    items.push({ ...defaultTestimonials[defaultIndex] || defaultTestimonials[0] });
  }
  
  // Ensure each card has all required properties with defaults
  items = items.map((testimonial, index) => {
    const defaultTestimonial = defaultTestimonials[index] || defaultTestimonials[0];
    return {
      ...defaultTestimonial,
      ...testimonial,
      // Ensure rating exists
      rating: testimonial.rating || defaultTestimonial.rating || 5,
      // Ensure image exists
      image: testimonial.image || defaultTestimonial.image || `https://i.pravatar.cc/150?img=${index + 1}`,
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
            ⭐ Testimonials
          </span>
        </div>
        <h2 
          className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold mb-4"
          style={{ color: titleColor }}
        >
          What Our Customers Say
        </h2>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: subtitleColor }}
        >
          Join thousands of satisfied users who have transformed their businesses
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @md:grid-cols-3 gap-8">
        {items.map((testimonial, index) => {
          // Get card colors for this index
          const cardColor = cardColors[index] || {};
          const cardBg = cardColor.backgroundColor || "#ffffff";
          const cardHeaderColor = cardColor.headerColor || titleColor;
          const cardSubheaderColor = cardColor.subheaderColor || subtitleColor;
          const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
          const cardAccent = cardColor.iconColor || "#4f46e5";

          return (
          <div
            key={index}
            className="group relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              backgroundColor: cardBg,
            }}
          >
            {/* Gradient Border Effect */}
            <div 
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition blur" 
              style={{ background: cardAccent }}
            />
            
            {/* Card Content */}
            <div 
              className="relative rounded-2xl p-1"
              style={{ backgroundColor: cardBg }}
            >
              
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-lg">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24" }}>⭐</span>
                ))}
              </div>

              {/* Quote Text */}
              <p 
                className="mb-6 leading-relaxed italic"
                style={{ color: cardParagraphColor }}
              >
                <TextEditable onClick={() => onEdit("text", index, "testimonial")}>
                  "{testimonial.text}"
                </TextEditable>
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 cursor-pointer"
                  style={{ borderColor: cardAccent }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit("image", index, "testimonial");
                  }}
                />
                <div>
                  <div 
                    className="font-semibold"
                    style={{ color: cardHeaderColor }}
                  >
                    <TextEditable onClick={() => onEdit("name", index, "testimonial")}>
                      {testimonial.name}
                    </TextEditable>
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: cardSubheaderColor }}
                  >
                    <TextEditable onClick={() => onEdit("role", index, "testimonial")}>
                      {testimonial.role}
                    </TextEditable>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )})}
      </div>

    </section>
  );
}
