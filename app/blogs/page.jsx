import React from 'react';
import { Calendar, Clock, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function BlogsPage() {
  const allBlogs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
      tags: [
        { label: "Digital Growth", color: "teal" },
        { label: "Featured", color: "purple" }
      ],
      title: "Why Every Business Needs a Strong Digital Presence in 2025",
      description: "Discover how digital transformation is reshaping business landscapes and why establishing a robust online presence is crucial for success in the coming years.",
      date: "21st May, 2025",
      readTime: "5 min read",
      slug: "digital-presence-2025"


    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      tags: [
        { label: "Online Presence", color: "teal" }
      ],
      title: "Discover why a strong online presence is essential for business growth",
      description: "Learn the key strategies and benefits of building a comprehensive digital footprint that drives customer engagement and business expansion.",
      date: "25th Sept, 2025",
      readTime: "8 min read",
      slug: "online-presence-growth" 
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: [
        { label: "Digital Marketing", color: "teal" },
        { label: "Trends", color: "purple" }
      ],
      title: "The Future of Digital Marketing: Trends to Watch in 2025",
      description: "Explore the emerging technologies and strategies that will define digital marketing success in the near future.",
      date: "15th Oct, 2025",
      readTime: "6 min read",
      slug: "future-digital-marketing" 

    }
  ];

  return (
    <>
      <Head>
        <title>Blogs & Articles | Our Latest Insights</title>
        <meta name="description" content="Explore our latest blogs and articles on digital growth, online presence, and marketing strategies." />
      </Head>
      
      <div className="bg-[#0f1821] text-white min-h-screen py-10 px-6 pt-30">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link href="/">
                <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </button>
              </Link>
            </div>
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              ALL BLOGS & ARTICLES
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Insights
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our collection of articles on digital transformation, marketing strategies, and business growth.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog) => (
              <div key={blog.id} className="group">
                <Link href={`/blogs/${blog.slug}`}>
                  <div className="bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              tag.color === 'teal'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            }`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 flex-1">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-slate-700/50 mt-auto">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}