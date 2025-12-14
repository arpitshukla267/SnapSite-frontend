"use client";
import TextEditable from "../../TextEditable";

export default function ContactForm({ 
  title = "Get In Touch", 
  subtitle = "Have a question or want to work together? We'd love to hear from you.",
  onEdit 
}) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 @md:grid-cols-2 gap-12 items-center">

        {/* LEFT - Contact Info */}
        <div className="animate-slideInLeft">
          
          {/* Title */}
          <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-extrabold text-gray-900 mb-6">
            <TextEditable onClick={() => onEdit && onEdit("title")}>
              {title}
            </TextEditable>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            <TextEditable onClick={() => onEdit && onEdit("subtitle")}>
              {subtitle}
            </TextEditable>
          </p>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                📧
              </div>
              <div>
                <div className="font-semibold text-gray-900">Email</div>
                <div className="text-gray-600">support@example.com</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                📞
              </div>
              <div>
                <div className="font-semibold text-gray-900">Phone</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                📍
              </div>
              <div>
                <div className="font-semibold text-gray-900">Office</div>
                <div className="text-gray-600">123 Business St, City, ST 12345</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT - Contact Form */}
        <div className="animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            
            <form className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
