"use client";
import TextEditable from "../../TextEditable";

export default function TeamGrid({ members = [], onEdit }) {
  const defaultMembers = [
    {
      name: "Alex Thompson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/300?img=11",
      bio: "Visionary leader with 15+ years in tech"
    },
    {
      name: "Jamie Lee",
      role: "Head of Design",
      image: "https://i.pravatar.cc/300?img=5",
      bio: "Award-winning designer passionate about UX"
    },
    {
      name: "Morgan Davis",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/300?img=13",
      bio: "Full-stack expert building scalable solutions"
    },
    {
      name: "Casey Martinez",
      role: "Product Manager",
      image: "https://i.pravatar.cc/300?img=9",
      bio: "Strategic thinker driving product innovation"
    }
  ];

  const items = members.length > 0 ? members : defaultMembers;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-4 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
            👥 Our Team
          </span>
        </div>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-gray-900 mb-4">
          Meet The Team
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Talented individuals working together to build amazing products
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-8">
        {items.map((member, index) => (
          <div
            key={index}
            className="group relative animate-fadeInUp hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            
            {/* Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit("image", index, "member");
                  }}
                />
                
                {/* Gradient Overlay on Hover - Click to edit image */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit("image", index, "member");
                  }}
                >
                  <p className="text-white text-sm" onClick={(e) => e.stopPropagation()}>
                    <TextEditable onClick={() => onEdit("bio", index, "member")}>
                      {member.bio}
                    </TextEditable>
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  <TextEditable onClick={() => onEdit("name", index, "member")}>
                    {member.name}
                  </TextEditable>
                </h3>
                <p className="text-indigo-600 font-medium">
                  <TextEditable onClick={() => onEdit("role", index, "member")}>
                    {member.role}
                  </TextEditable>
                </p>

                {/* Social Links (Optional) */}
                <div className="mt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center transition-all text-sm">
                    in
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-indigo-600 hover:text-white rounded-full flex items-center justify-center transition-all text-sm">
                    𝕏
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
