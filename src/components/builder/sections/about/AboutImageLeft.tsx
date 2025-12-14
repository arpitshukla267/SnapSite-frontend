"use client";
import TextEditable from "../../TextEditable";

export default function AboutImageLeft({ title, description, image, onEdit }) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid @md:grid-cols-2 gap-14 items-center">

        <div className="relative group cursor-pointer" onClick={() => onEdit("image")}>
          <div className="absolute -inset-4 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl"></div>
          <img
            src={image || "/placeholder.png"}
            className="w-full rounded-2xl shadow-xl relative z-10 object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-semibold text-gray-900 leading-tight">
            <TextEditable onClick={() => onEdit("title")}>
              {title || "Our Story"}
            </TextEditable>
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            <TextEditable onClick={() => onEdit("description")}>
              {description || "We help people and businesses achieve their goals."}
            </TextEditable>
          </p>
        </div>

      </div>
    </section>
  );
}
