"use client";

export default function AboutCentered({ title, description, image, onEdit }) {
  return (
    <section className="py-24 px-6 text-center bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-4xl mx-auto">

        <div className="relative w-44 h-44 mx-auto mb-8 cursor-pointer" onClick={() => onEdit("image")}>
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl"></div>
          <img
            src={image || "/placeholder.png"}
            className="w-44 h-44 mx-auto rounded-full shadow-xl relative z-10 object-cover"
          />
        </div>

        <h2
          className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight text-gray-900 cursor-pointer"
          onClick={() => onEdit("title")}
        >
          {title || "Who We Are"}
        </h2>

        <p
          className="mt-6 text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto cursor-pointer"
          onClick={() => onEdit("description")}
        >
          {description || "We are creators, innovators, and problem solvers."}
        </p>
      </div>
    </section>
  );
}
