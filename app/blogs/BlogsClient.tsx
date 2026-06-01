"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Search } from "lucide-react";
import Link from "next/link";

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
  date: string;
  read_time: string;
}

const BLOG_API_URL = "https://api.gr8.com.np/gr8/api/blogs/get_blog.php";
// const BLOG_API_URL = "http://localhost/gr8/api/blogs/get_blog.php";

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchBlogs();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    const lowered = searchTerm.toLowerCase();
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowered) ||
          blog.description.toLowerCase().includes(lowered) ||
          (blog.tags || "").toLowerCase().includes(lowered)
      )
    );
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(BLOG_API_URL, { cache: "no-store" });
      const data = await response.json();

      if (data?.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const parseTags = (tagsString: string | null | undefined): Tag[] =>
    (tagsString || "")
      .split(",")
      .filter(Boolean)
      .map((tag, index) => ({
        label: tag.trim(),
        color: index % 2 === 0 ? "teal" : "purple",
      }));

  if (loading) {
    return (
      <div className="bg-[#0f1821] text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0f1821] text-white min-h-screen py-10 px-6 pt-30">
      <div className="max-w-7xl mx-auto">
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

        <div className="max-w-2xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const tags = parseTags(blog.tags);
            const slug = blog.slug?.trim();
            const blogUrl = slug
              ? `/blogs/${encodeURIComponent(slug)}/`
              : "/blogs/";

            return (
              <Link key={blog.id} href={blogUrl} className="group">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden h-full flex flex-col">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
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
