import React, { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function BlogsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const blogsRef = useRef(null);
  const buttonRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const blogsInView = useInView(blogsRef, { once: true, threshold: 0.2 });
  const buttonInView = useInView(buttonRef, { once: true, threshold: 0.3 });

  const blogs = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
      tags: [
        { label: "Digital Growth", color: "teal" },
        { label: "Featured", color: "purple" },
      ],
      title: "Why Every Business Needs a Strong Digital Presence in 2025",
      description:
        "Discover how digital transformation is reshaping business landscapes and why establishing a robust online presence is crucial for success in the coming years.",
      date: "21st May, 2025",
      readTime: "5 min read",
      slug: "digital-presence-2025" // Add slug for the URL
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      tags: [{ label: "Online Presence", color: "teal" }],
      title:
        "Discover why a strong online presence is essential for business growth",
      description:
        "Learn the key strategies and benefits of building a comprehensive digital footprint that drives customer engagement and business expansion.",
      date: "25th Sept, 2025",
      readTime: "8 min read",
      slug: "online-presence-growth" // Add slug for the URL
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: [
        { label: "Digital Marketing", color: "teal" },
        { label: "Trends", color: "purple" },
      ],
      title: "The Future of Digital Marketing: Trends to Watch in 2025",
      description:
        "Explore the emerging technologies and strategies that will define digital marketing success in the near future.",
      date: "15th Oct, 2025",
      readTime: "6 min read",
      slug: "future-digital-marketing" // Add slug for the URL
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0.8 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div
      ref={sectionRef}
      className="bg-[#0f1821] text-white sm:py-10 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p
            className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3"
            variants={headerVariants}
          >
            OUR LATEST BLOGS
          </motion.p>
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={headerVariants}
          >
            Blogs & Articles
          </motion.h1>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          ref={blogsRef}
          className="relative"
          initial="hidden"
          animate={blogsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 group cursor-pointer shadow-[0px_-2px_13px] shadow-white/15"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Update the Link href to use the slug instead of id */}
                <Link href={`/blogs/${blog.slug}`} className="block h-full">
                  {" "}
                  <div className="relative h-48 overflow-hidden p-6">
                    <motion.div
                      variants={imageVariants}
                      initial="hidden"
                      animate={blogsInView ? "visible" : "hidden"}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 rounded-xl transition-transform duration-500"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
                  </div>
                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-4"
                      initial="hidden"
                      animate={blogsInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      {blog.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tag.color === "teal"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          }`}
                          variants={tagVariants}
                          transition={{ delay: index * 0.1 + tagIndex * 0.1 }}
                        >
                          {tag.label}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        blogsInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {blog.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3"
                      initial={{ opacity: 0 }}
                      animate={blogsInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      {blog.description}
                    </motion.p>

                    {/* Meta Info */}
                    <motion.div
                      className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-slate-700/50"
                      initial={{ opacity: 0 }}
                      animate={blogsInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* See All Blogs Button */}
        <motion.div
          ref={buttonRef}
          className="flex justify-center mt-12"
          initial="hidden"
          animate={buttonInView ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href="/blogs">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                See all blogs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}