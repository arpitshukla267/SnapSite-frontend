"use client";
import TextEditable from "../../TextEditable";

export default function AboutImageLeft({ 
  title, 
  description, 
  image, 
  onEdit,
  backgroundColor = "#ffffff",
  titleColor = "#0f172a",
  descriptionColor = "#64748b",
}) {
  return (
    <section 
      className="py-20 px-6"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto grid @md:grid-cols-2 gap-14 items-center">

        <div className="relative group cursor-pointer" onClick={() => onEdit("image")}>
          <div className="absolute -inset-4 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>
          <img
            src={image || "/placeholder.png"}
            className="w-full rounded-2xl shadow-xl relative z-10 object-cover"
          />
        </div>

        <div>
          <h2 
            className="text-3xl @sm:text-4xl @md:text-5xl font-semibold leading-tight"
            style={{ color: titleColor }}
          >
            <TextEditable onClick={() => onEdit("title")}>
              {title || "Our Story"}
            </TextEditable>
          </h2>

          <p 
            className="mt-6 text-lg leading-relaxed"
            style={{ color: descriptionColor }}
          >
            <TextEditable onClick={() => onEdit("description")}>
              {description || "We help people and businesses achieve their goals."}
            </TextEditable>
          </p>
        </div>

      </div>
    </section>
  );
}
