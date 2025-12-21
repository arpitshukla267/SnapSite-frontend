"use client";
import TextEditable from "../../TextEditable";

export default function FeaturesGrid({
  title = "Our Features",
  subtitle = "Everything you need to succeed",
  items = [],
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  subtitleColor = "#64748b",
  accentColor = "#3b82f6",
  cardColors = [],
}) {
  const defaultItems = [
    { title: "Lightning Fast Performance", desc: "Optimized for speed" },
    { title: "Drag & Drop Builder", desc: "Easy to use interface" },
    { title: "Responsive Design", desc: "Look good on any device" },
    { title: "SEO Optimized", desc: "Rank higher on search engines" }
  ];

  const features = items.length > 0 ? items : defaultItems;

  return (
    <section 
      className="py-24 px-6"
      style={{ backgroundColor }}
    >
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 
          className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold mb-4"
          style={{ color: titleColor }}
        >
          <TextEditable onClick={() => onEdit && onEdit("title")}>
            {title}
          </TextEditable>
        </h2>
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: subtitleColor }}
        >
          <TextEditable onClick={() => onEdit && onEdit("subtitle")}>
            {subtitle}
          </TextEditable>
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid @sm:grid-cols-2 @lg:grid-cols-4 gap-10">

        {features.map((f, index) => {
            // Handle both string and object formats
            const isObject = typeof f === 'object' && f !== null;
            const itemTitle = isObject ? f.title : f;
            const itemDesc = isObject ? f.desc : "";

            // Get card colors for this index, fallback to defaults
            const cardColor = cardColors[index] || {};
            const cardBg = cardColor.backgroundColor || "#ffffff";
            const cardHeaderColor = cardColor.headerColor || titleColor;
            const cardParagraphColor = cardColor.paragraphColor || subtitleColor;
            const cardAccent = cardColor.iconColor || accentColor;

            return (
          <div
            key={index}
            className="group relative p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{ backgroundColor: cardBg }}
          >
            <div 
              className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition duration-500"
              style={{
                background: cardAccent
              }}
            ></div>

            <h3 
              className="text-2xl font-semibold relative z-10 tracking-tight mb-2"
              style={{ color: cardHeaderColor }}
            >
              <TextEditable onClick={() => onEdit(isObject ? `items-${index}-title` : `items-${index}`)}>
                {itemTitle}
              </TextEditable>
            </h3>
            
            {itemDesc && (
                <p 
                  className="relative z-10"
                  style={{ color: cardParagraphColor }}
                >
                    <TextEditable onClick={() => onEdit(`items-${index}-desc`)}>
                        {itemDesc}
                    </TextEditable>
                </p>
            )}

            <div 
              className="mt-4 h-1 w-12 rounded-full relative z-10 group-hover:w-20 transition-all duration-300"
              style={{
                background: cardAccent,
                opacity: 0.4
              }}
            ></div>
          </div>
        )})}

      </div>
    </section>
  );
}
