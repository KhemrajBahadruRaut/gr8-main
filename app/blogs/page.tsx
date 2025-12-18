"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

interface Tag {
  label: string;
  color: string;
}

interface Blog {
  id: number;
  image: string;
  tags: string;
  title: string;
  description: string;
  date: string;
  read_time: string;
  slug: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost/gr8/api/blogs/get_blog.php');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseTags = (tagsString: string): Tag[] => {
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    return tagsArray.map((tag, index) => ({
      label: tag,
      color: index % 2 === 0 ? 'teal' : 'purple'
    }));
  };

  if (loading) {
    return (
      <div className="bg-[#0f1821] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {searchTerm ? 'No blogs found matching your search.' : 'No blogs available yet.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => {
                const tags = parseTags(blog.tags);
                
                return (
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
                            {tags.map((tag, tagIndex) => (
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
                              <span>{blog.read_time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}