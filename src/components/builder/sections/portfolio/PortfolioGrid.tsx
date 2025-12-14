"use client";
import TextEditable from "../../TextEditable";

export default function PortfolioGrid({ projects = [], onEdit }) {
  const defaultProjects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      description: "Modern online shopping experience"
    },
    {
      title: "Brand Identity",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Complete branding package for startup"
    },
    {
      title: "Mobile App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      description: "iOS and Android fitness tracker"
    },
    {
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Analytics platform interface"
    },
    {
      title: "Marketing Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description: "High-converting landing page"
    },
    {
      title: "Logo Design",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
      description: "Minimalist corporate identity"
    }
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-4 inline-block">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold">
            🎨 Portfolio
          </span>
        </div>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-gray-900 mb-4">
          Our Latest Work
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our collection of successful projects and creative solutions
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-8">
        {items.filter(project => project && project.image).map((project, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fadeInUp hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image || "/placeholder.png"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit("image", index, "project");
                }}
              />
              
              {/* Gradient Overlay - Click to edit image */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity cursor-pointer" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit("image", index, "project");
                }}
              />
             
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30">
                  <TextEditable onClick={() => onEdit("category", index, "project")}>
                    {project.category}
                  </TextEditable>
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold text-white mb-2">
                  <TextEditable onClick={() => onEdit("title", index, "project")}>
                    {project.title}
                  </TextEditable>
                </h3>
                <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TextEditable onClick={() => onEdit("description", index, "project")}>
                    {project.description}
                  </TextEditable>
                </p>

                {/* View Project Button */}
                <button className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                  View Project →
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
