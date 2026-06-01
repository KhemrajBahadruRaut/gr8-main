import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import styles from "./blog-content.module.css";

// const BLOG_API_URL = "http://localhost/gr8/api/blogs/get_blog.php";
const BLOG_API_URL = "https://api.gr8.com.np/gr8/api/blogs/get_blog.php";
const DEFAULT_OG_IMAGE =
  "https://gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp";

type Blog = {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  tags?: string;
  date?: string;
  read_time?: string;
  created_at?: string;
};

const getBlogBySlug = cache(async (slug: string): Promise<Blog | null> => {
  try {
    const response = await fetch(
      `${BLOG_API_URL}?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data?.success && data.blog) {
      return data.blog as Blog;
    }
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
  }

  return null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  const canonicalUrl = `https://gr8.com.np/blogs/${encodeURIComponent(slug)}/`;
  // const canonicalUrl = `http://localhost/${encodeURIComponent(slug)}/`;

  if (!blog) {
    return {
      title: "Blog Not Found | GR8 Nepal",
      description: "The requested blog post could not be found.",
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = blog.title || "Blog | GR8 Nepal";
  const description =
    blog.description ||
    "Read this GR8 Nepal blog post for practical digital growth insights.";
  const image = blog.image || DEFAULT_OG_IMAGE;
  const publishedTime =
    blog.date || blog.created_at || new Date().toISOString();

  return {
    title: `${title} | GR8 Nepal`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
      publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const title = blog.title || "Blog";
  const description = blog.description || "";
  const image = blog.image || DEFAULT_OG_IMAGE;
  const tags = (blog.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <>
      <div className="bg-[#0f1821] text-white pt-22">
        <div className="max-w-7xl mx-auto px-6 py-2 pt-10">
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
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                {title}
              </h1>

              <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-6">
                  {blog.date ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{blog.date}</span>
                    </div>
                  ) : null}
                  {blog.read_time ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{blog.read_time}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </header>

            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-100 object-cover"
              />
            </div>

            <div
              className={`${styles.content} text-gray-300 leading-relaxed text-lg mb-12`}
            >
              <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
