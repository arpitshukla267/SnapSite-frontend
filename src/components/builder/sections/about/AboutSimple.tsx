"use client";
import TextEditable from "../../TextEditable";

export default function AboutSimple({ title, description, image, onEdit }) {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid @md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold text-gray-900 tracking-tight">
            <TextEditable onClick={() => onEdit("title")}>
              {title || "About Us"}
            </TextEditable>
          </h2>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            <TextEditable onClick={() => onEdit("description")}>
              {description || "We are committed to delivering great experiences."}
            </TextEditable>
          </p>
        </div>

        <div className="relative group cursor-pointer" onClick={() => onEdit("image")}>
          <div className="absolute -inset-3 rounded-xl bg-gray-300/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <img
            src={image || "/placeholder.png"}
            alt="about"
            className="w-full h-auto rounded-2xl shadow-lg relative z-10 object-cover"
          />
        </div>

      </div>
    </section>
  );
}
