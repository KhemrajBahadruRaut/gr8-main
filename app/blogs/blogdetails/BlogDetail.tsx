"use client";
import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
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
  slug: string;
  blog: Blog; 
}

export default function BlogDetailPage({ slug, blog }: BlogDetailPageProps) {
  if (!blog) return <p>Blog not found</p>;

  const tags = blog.tags.split(',').map(tag => tag.trim());

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

  return (
    <>
      <Head>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.image} />
      </Head>

      <div className="bg-[#0f1821] text-white pt-22">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Link href="/blogs/">
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
                {blog.title}
              </h1>

              <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                {blog.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
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
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </article>
        </div>
      </div>

      {/* Styles (unchanged from your code) */}
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
