"use client";
import TextEditable from "../../TextEditable";

export default function TestimonialCards({ testimonials = [], onEdit }) {
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

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-4 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
            ⭐ Testimonials
          </span>
        </div>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their businesses
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @md:grid-cols-3 gap-8">
        {items.map((testimonial, index) => (
          <div
            key={index}
            className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition blur" />
            
            {/* Card Content */}
            <div className="relative bg-white rounded-2xl p-1">
              
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-400 text-lg">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                <TextEditable onClick={() => onEdit("text", index, "testimonial")}>
                  "{testimonial.text}"
                </TextEditable>
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit("image", index, "testimonial");
                  }}
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    <TextEditable onClick={() => onEdit("name", index, "testimonial")}>
                      {testimonial.name}
                    </TextEditable>
                  </div>
                  <div className="text-sm text-gray-600">
                    <TextEditable onClick={() => onEdit("role", index, "testimonial")}>
                      {testimonial.role}
                    </TextEditable>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
