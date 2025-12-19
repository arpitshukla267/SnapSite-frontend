"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Tag, Sparkles } from "lucide-react";
import Starfield from "../../components/ui/Starfield";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with SnapSite: A Complete Guide",
    excerpt: "Learn how to create your first website in minutes using SnapSite's intuitive drag-and-drop builder. Perfect for beginners!",
    author: "Arpit Shukla",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    slug: "getting-started-with-snapsite",
  },
  {
    id: 2,
    title: "10 Essential Web Design Tips for 2024",
    excerpt: "Discover the latest web design trends and best practices that will make your website stand out in 2024.",
    author: "Arpit Shukla",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    slug: "10-essential-web-design-tips-2024",
  },
  {
    id: 3,
    title: "Building Responsive Websites: Best Practices",
    excerpt: "Master the art of creating websites that look perfect on all devices. Learn responsive design techniques and tools.",
    author: "Arpit Shukla",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    slug: "building-responsive-websites",
  },
  {
    id: 4,
    title: "How to Optimize Your Website Performance",
    excerpt: "Speed up your website with these proven optimization techniques. Improve loading times and user experience.",
    author: "Arpit Shukla",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    slug: "optimize-website-performance",
  },
  {
    id: 5,
    title: "SEO Tips for Better Website Visibility",
    excerpt: "Boost your website's search engine rankings with these essential SEO strategies and best practices.",
    author: "Arpit Shukla",
    date: "2023-12-28",
    readTime: "9 min read",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2d82a?w=800&h=600&fit=crop",
    slug: "seo-tips-better-visibility",
  },
  {
    id: 6,
    title: "Creating Stunning Landing Pages with SnapSite",
    excerpt: "Learn how to design high-converting landing pages that turn visitors into customers using SnapSite templates.",
    author: "Arpit Shukla",
    date: "2023-12-25",
    readTime: "6 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    slug: "creating-stunning-landing-pages",
  },
];

const categories = ["All", "Tutorial", "Design", "Development", "Performance", "SEO"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen relative">
      <Starfield />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              <Sparkles size={16} />
              Blog & Resources
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Learn, Build, and{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Grow
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Discover tips, tutorials, and insights to help you create amazing websites 
              and grow your online presence.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50 hover:text-purple-300 backdrop-blur-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1">
                        <Tag size={12} />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-400">By {post.author}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors group"
                      >
                        Read More
                        <ArrowRight 
                          size={16} 
                          className="group-hover:translate-x-1 transition-transform" 
                        />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                <Search className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

