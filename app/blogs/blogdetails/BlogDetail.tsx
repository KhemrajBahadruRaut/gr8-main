"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  tags: string;
  date: string;
  read_time: string;
  created_at: string;
}

interface BlogDetailPageProps {
  slug: string; // ✅ fix TS error
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) fetchBlog(slug);
  }, [slug]);

  const fetchBlog = async (blogSlug: string) => {
    try {
      const response = await fetch(`http://localhost/gr8/api/blogs/get_blog.php?slug=${blogSlug}`);
      const data = await response.json();

      if (data.success && data.blog) setBlog(data.blog);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.description,
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-[#0f1821] text-white min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-8">
            Sorry, we couldn't find the blog you're looking for.
          </p>
          <Link href="/blogs">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Back to Blogs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const tags = blog.tags.split(',').map(tag => tag.trim());

  return (
    <>
      <Head>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.image} />
      </Head>

      <div className="bg-[#0f1821] text-white pt-30">
        <div className="relative h-[60vh] border justify-center flex">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-1/2  h-full object-contain"
          />
          {/* <div className="absolute inset-0 bg-linear-to-t from-[#0f1821] via-[#0f1821]/60 to-transparent"></div> */}

          <div className="absolute top-8 left-8">
            <Link href="/blogs">
              <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
                Back to Blogs
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 pb-20">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-700">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>{blog.read_time}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          <div className="bg-slate-800/30 border-l-4 border-emerald-500 p-6 rounded-r-lg mb-12">
            <p className="text-lg text-gray-300 leading-relaxed italic">
              {blog.description}
            </p>
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          <div className="mt-16 pt-8 border-t border-slate-700">
            <Link href="/blogs">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-colors mx-auto">
                <ArrowLeft className="w-5 h-5" />
                Back to All Blogs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
