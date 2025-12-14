"use client";

import TextEditable from "../../TextEditable";

export default function FeaturesIcons({ features = [], onEdit }) {
  const list =
    features.length
      ? features
      : [
          { title: "Speed", desc: "Optimized for fast load times" },
          { title: "Security", desc: "Top-notch data protection" },
          { title: "Design", desc: "Modern and clean layouts" },
        ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid @md:grid-cols-3 gap-12">

        {list.map((f, index) => (
          <div
            key={index}
            className="group p-8 border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
          >
            <h3 className="text-2xl font-bold text-gray-900 relative z-10 tracking-tight">
              <TextEditable onClick={() => onEdit(`title-${index}`)}>
                {f.title}
              </TextEditable>
            </h3>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed relative z-10">
              <TextEditable onClick={() => onEdit(`desc-${index}`)}>
                {f.desc}
              </TextEditable>
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
