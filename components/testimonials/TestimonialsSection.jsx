
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Create separate refs for each section
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const testimonialsRef = useRef(null);
  const dotsRef = useRef(null);
  const statsRef = useRef(null);
  
  // Use useInView for each section
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, threshold: 0.2 });
  const dotsInView = useInView(dotsRef, { once: true, threshold: 0.3 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.2 });

  const testimonials = [
    {
      id: 1,
      quote: "Working with this team transformed our digital presence. Their attention to detail and technical expertise delivered results beyond our expectations. The website they built has significantly increased our conversion rates.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      date: "15th January, 2024",
      rating: 5,
      avatar: null
    },
    {
      id: 2,
      quote: "Outstanding service from start to finish. They understood our vision and executed it perfectly. The mobile app they developed has received fantastic feedback from our users and has streamlined our operations.",
      author: "Michael Chen",
      role: "CEO, Innovate Solutions",
      date: "22nd March, 2024",
      rating: 5,
      avatar: null
    },
    {
      id: 3,
      quote: "The SEO strategy implemented by this team tripled our organic traffic in just 3 months. Their data-driven approach and regular reporting made us feel confident in our investment. Highly recommended!",
      author: "Emily Rodriguez",
      role: "E-commerce Manager, StyleHub",
      date: "8th May, 2024",
      rating: 5,
      avatar: null
    },
    {
      id: 4,
      quote: "Their brand design work captured our company's essence perfectly. The new visual identity has strengthened our market position and received praise from clients and stakeholders alike.",
      author: "David Thompson",
      role: "Founder, GreenFuture Inc",
      date: "12th July, 2024",
      rating: 5,
      avatar: null
    },
    {
      id: 5,
      quote: "The social media campaign they created generated a 200% increase in engagement and significantly boosted our brand awareness. Their creative approach and strategic planning were impressive.",
      author: "Lisa Wang",
      role: "Brand Manager, CosmoBeauty",
      date: "30th September, 2024",
      rating: 5,
      avatar: null
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  const statNumberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        duration: 0.6
      }
    }
  };

  // Render star rating
  const renderStars = (rating, cardIndex) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.div
        key={index}
        variants={starVariants}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        transition={{ delay: cardIndex * 0.1 + index * 0.1 }}
      >
        <Star
          className={`w-4 h-4 ${
            index < rating ? "text-[#D79442] fill-[#D79442]" : "text-gray-600"
          }`}
        />
      </motion.div>
    ));
  };

  return (
    <div ref={sectionRef} className="bg-[#0f1821] text-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          className="flex justify-between items-start mb-16 flex-wrap gap-6"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={headerVariants}>
            <p className="text-[#D79442] text-sm font-semibold tracking-widest uppercase mb-3">
              WHAT OUR CLIENTS SAY
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-white to-amber-200 bg-clip-text text-transparent">
              Client Testimonials
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about 
              their experience working with us and the results we've delivered together.
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            className="flex gap-3 mt-4"
            variants={headerVariants}
          >
            <motion.button
              onClick={handlePrev}
              className="bg-slate-800/50 hover:bg-slate-700/70 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl transition-all duration-300 group"
              aria-label="Previous testimonial"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="bg-slate-800/50 hover:bg-slate-700/70 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl transition-all duration-300 group"
              aria-label="Next testimonial"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          ref={testimonialsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-linear-to-br from-[#101820] to-[#26323D] backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-300 group relative overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Quote Icon and Date */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={testimonialsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <svg
                    className="w-12 h-12 text-[#D79442] opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </motion.div>
                <motion.span 
                  className="text-gray-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {testimonial.date}
                </motion.span>
              </div>

              {/* Star Rating */}
              <motion.div 
                className="flex gap-1 mb-4 relative z-10"
                initial="hidden"
                animate={testimonialsInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {renderStars(testimonial.rating, index)}
              </motion.div>

              {/* Quote Text */}
              <motion.p 
                className="text-gray-300 text-base leading-relaxed mb-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {testimonial.quote}
              </motion.p>

              {/* Author Info */}
              <motion.div 
                className="flex items-center gap-4 pt-6 border-t border-slate-700/50 relative z-10"
                initial={{ opacity: 0 }}
                animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                <div className="w-12 h-12 bg-linear-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#D79442] text-lg font-semibold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white group-hover:text-amber-100 transition-colors duration-300">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots Indicator */}
        <motion.div 
          ref={dotsRef}
          className="flex justify-center items-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          animate={dotsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          {testimonials.slice(0, testimonials.length - 2).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#D79442] scale-125' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-slate-700/50"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {[
            { number: "50+", label: "Happy Clients" },
            { number: "100+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={headerVariants}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-[#D79442] mb-2"
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                variants={statNumberVariants}
                transition={{ delay: index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}