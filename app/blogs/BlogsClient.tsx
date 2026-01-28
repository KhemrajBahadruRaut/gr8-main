"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Calendar, Clock, ArrowLeft, Search, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Tag {
  label: string;
  color: string;
}

interface Blog {
  id: number;
  image: string;
  tags: string;
  title: string;
  slug?: string;
  description: string;
  content?: string;
  date: string;
  read_time: string;
  created_at?: string;
}

// Loading component for Suspense fallback
function BlogsLoading() {
  return (
    <div className="bg-[#0f1821] text-white min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

// Main component that uses useSearchParams
function BlogsContent() {
  const searchParams = useSearchParams();
  const blogSlug = searchParams.get("slug");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogSlug) {
      fetchSingleBlog(blogSlug);
    } else {
      fetchBlogs();
    }
  }, [blogSlug]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter(blog =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        // "http://localhost/gr8/api/blogs/get_blog.php"
        "https://gr8.com.np/gr8/api/blogs/get_blog.php"
      );
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBlog = async (slug: string) => {
    try {
      const res = await fetch(
        // `http://localhost/gr8/api/blogs/get_blog.php?slug=${slug}`
        `https://gr8.com.np/gr8/api/blogs/get_blog.php?slug=${slug}`
      );
      const data = await res.json();

      if (data.success && data.blog) {
        setSelectedBlog(data.blog);
      }
    } catch (err) {
      console.error("Error fetching blog", err);
    } finally {
      setLoading(false);
    }
  };

  const parseTags = (tagsString: string): Tag[] =>
    tagsString.split(",").map((tag, index) => ({
      label: tag.trim(),
      color: index % 2 === 0 ? "teal" : "purple",
    }));

  const handleShare = () => {
    if (navigator.share && selectedBlog) {
      navigator.share({
        title: selectedBlog.title,
        text: selectedBlog.description,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0f1821] text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Show single blog detail view
  if (blogSlug && selectedBlog) {
    const tags = selectedBlog.tags.split(',').map(tag => tag.trim());

    return (
      <>
        <div className="bg-[#0f1821] text-white pt-22">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <Link href="/blogs">
              <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Blogs
              </button>
            </Link>
          </div>

          <div className="max-w-5xl mx-auto px-6 border border-transparent">
            <article>
              <header className="text-center mb-12">
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                  {selectedBlog.title}
                </h1>

                <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                  {selectedBlog.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{selectedBlog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedBlog.read_time}</span>
                    </div>
                  </div>
                </div>
              </header>

              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-100 object-cover"
                />
              </div>

              <div className="flex gap-4 mb-12">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700/50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700/50 transition-colors">
                  <Bookmark className="w-5 h-5" />
                  Save
                </button>
              </div>

              {/* Blog Content with proper styling */}
              <div className="blog-content text-gray-300 leading-relaxed text-lg">
                <div dangerouslySetInnerHTML={{ __html: selectedBlog.content || '' }} />
              </div>
            </article>
          </div>
        </div>

        {/* Styles for blog content */}
        <style jsx global>{`
          .blog-content { word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; }
          .blog-content h1 { font-size: 2em; font-weight: bold; margin: 1em 0 0.67em 0; line-height: 1; color: #ffffff; }
          .blog-content h2 { font-size: 1.5em; font-weight: bold; margin: 1.3em 0 0.75em 0; line-height: 1; color: #ffffff; }
          .blog-content h3 { font-size: 1.17em; font-weight: bold; margin: 1.2em 0 0.83em 0; line-height: 1; color: #ffffff; }
          .blog-content p { margin: 1em 0; line-height: 1.2; color: #d1d5db; }
          .blog-content ul, .blog-content ol { margin: 1em 0; padding-left: 2em; }
          .blog-content ul { list-style-type: disc; }
          .blog-content ol { list-style-type: decimal; }
          .blog-content li { margin: 0.5em 0; line-height: 1.8; color: #d1d5db; }
          .blog-content a { color: #34d399; text-decoration: underline; transition: color 0.2s; }
          .blog-content a:hover { color: #10b981; }
          .blog-content strong { font-weight: bold; color: #ffffff; }
          .blog-content em { font-style: italic; }
          .blog-content u { text-decoration: underline; }
          .blog-content blockquote { border-left: 4px solid #34d399; padding-left: 1.5em; margin: 1.5em 0; font-style: italic; color: #9ca3af; }
          .blog-content code { background-color: #1e293b; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.9em; color: #34d399; }
          .blog-content pre { background-color: #1e293b; padding: 1em; border-radius: 0.5rem; overflow-x: auto; margin: 1.5em 0; }
          .blog-content pre code { background-color: transparent; padding: 0; }
          .blog-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5em 0; }
          .blog-content hr { border: none; border-top: 1px solid #374151; margin: 2em 0; }
          .blog-content * { max-width: 100%; }
          .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
          .blog-content th, .blog-content td { border: 1px solid #374151; padding: 0.75em; text-align: left; }
          .blog-content th { background-color: #1e293b; font-weight: bold; }
        `}</style>
      </>
    );
  }

  // Show blog not found if ID provided but no blog found
  if (blogSlug && !selectedBlog) {
    return (
      <div className="bg-[#0f1821] text-white min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Blog not found</p>
        <Link href="/blogs" className="text-emerald-400 hover:text-emerald-300">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  // Show blog list view
  return (
    <div className="bg-[#0f1821] text-white min-h-screen py-10 px-6 pt-30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mt-6">
            ALL BLOGS & ARTICLES
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Latest Insights
          </h1>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4"
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => {
            const tags = parseTags(blog.tags);

            return (
              <Link
                key={blog.id}
                href={`/blogs?slug=${blog.slug}`}
                className="group"
              >
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden h-full flex flex-col">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-3 flex-1">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500 border-t pt-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.read_time}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Default export wrapped in Suspense for SSR compatibility
export default function BlogsClient() {
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogsContent />
    </Suspense>
  );
}
