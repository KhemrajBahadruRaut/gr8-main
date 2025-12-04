import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  Smartphone,
  Code,
  TrendingUp,
  ArrowRight,
  ArrowRightCircle,
  Palette,
  PenBoxIcon,
  PrinterIcon,
} from "lucide-react";
import { TbSocial } from "react-icons/tb";
import { TfiEmail } from "react-icons/tfi";
import { BsCursor } from "react-icons/bs";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const digitalRef = useRef(null);
  const designRef = useRef(null);
  const marketingRef = useRef(null);
  const ctaRef = useRef(null);

  // Use useInView for each section
  const headerInView = useInView(headerRef, { once: true, threshold: 0.1 });
  const digitalInView = useInView(digitalRef, { once: true, threshold: 0.1 });
  const designInView = useInView(designRef, { once: true, threshold: 0.1 });
  const marketingInView = useInView(marketingRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Memoized services data
  const services = useMemo(() => [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "App Development",
      description: "Custom mobile applications built with cutting-edge technology for iOS and Android platforms.",
      Link: "/services/mobile-app-development"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Website Development",
      description: "Responsive, high-performance websites and web applications tailored to your business needs.",
      Link: "/services/web-development"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Search Engine Optimization (SEO)",
      description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
      Link: "/services/seo-services"
    },
  ], []);

  const designservices = useMemo(() => [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Graphics Designing",
      description: "Visually stunning designs that communicate your brand's story and values effectively.",
      Link: "/services/graphics-designing"
    },
    {
      icon: <PenBoxIcon className="w-5 h-5" />,
      title: "Content Writing",
      description: "Compelling content that engages your audience and strengthens your brand voice.",
      Link: "/services/content-writing"
    },
    {
      icon: <PrinterIcon className="w-5 h-5" />,
      title: "Printing and Publishing",
      description: "High-quality print materials that make your brand stand out in physical spaces.",
      Link: "/services/printing-publishing"
    },
  ], []);

  const digitalmarketingfeaturesservices = useMemo(() => [
    {
      icon: <TbSocial className="w-5 h-5" />,
      title: "Social Media Marketing",
      description: "Strategic social media campaigns that build community and drive meaningful engagement.",
      Link: "/services/social-media-marketing"
    },
    {
      icon: <TfiEmail className="w-5 h-5" />,
      title: "Email Marketing",
      description: "Personalized email campaigns that nurture leads and convert subscribers into customers.",
      Link: "/services/email-marketing"
    },
    {
      icon: <BsCursor className="w-5 h-5" />,
      title: "Pay Per Click (PPC)",
      description: "Data-driven PPC campaigns that maximize ROI and accelerate business growth.",
      Link: "/services/ppc-advertising"
    },
  ], []);

  // Memoized features data
  const features = useMemo(() => [
    "Responsive design that works on all devices",
    "Optimized performance and fast loading times",
    "Secure and scalable architecture",
    "Ongoing maintenance and support"
  ], []);

  const designFeatures = useMemo(() => [
    "Strategic brand identity development",
    "Consistent visual language across platforms",
    "User-centered design approach",
    "Professional print and digital assets"
  ], []);

  const digitalMarketingFeatures = useMemo(() => [
    "Comprehensive digital marketing strategy",
    "Data analytics and performance tracking",
    "Targeted audience segmentation",
    "Continuous optimization for maximum ROI"
  ], []);

  // Mouse position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  // Optimized mouse handlers
  const handleMouseMove = useCallback((e, index, section) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
    setHoveredSection(section);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setHoveredSection(null);
  }, []);

  // Memoized animation variants
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), []);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  }), []);

  const cardAnimation = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }), []);

  const featureListAnimation = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }), []);

  const featureItemAnimation = useMemo(() => ({
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  // Reusable Service Card Component
  const ServiceCard = useCallback(({ service, index, section }) => (
    <motion.div variants={cardAnimation}>
      <Link href={service.Link}>
        <div
          className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between group hover:bg-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, index, section)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mouse-following Glow Effect */}
          {hoveredIndex === index && hoveredSection === section && (
            <div
              className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.15) 30%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          )}

          {/* Static Glow Effect Layers */}
          <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative flex items-center gap-4 flex-1">
            <div className="text-cyan-400 bg-slate-700/50 p-2 rounded-lg group-hover:bg-cyan-400/10 transition-colors duration-300">
              {service.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">
                {service.title}
              </h4>
              <p className="text-sm text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
          <div className="relative ml-4">
            <div className="bg-slate-700/50 p-2 rounded-full group-hover:bg-cyan-400/20 transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  ), [hoveredIndex, hoveredSection, mousePosition, handleMouseMove, handleMouseLeave]);

  // Reusable Feature List Component
  const FeatureList = useCallback(({ features }) => (
    <motion.div 
      className="space-y-5"
      variants={featureListAnimation}
    >
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          className="flex items-start gap-4 group"
          variants={featureItemAnimation}
        >
          <div className="mt-1 shrink-0">
            <ArrowRightCircle className="w-6 h-6 text-cyan-400 group-hover:text-emerald-400 transition-colors duration-300" />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {feature}
          </p>
        </motion.div>
      ))}
    </motion.div>
  ), []);

  // Reusable Services Container Component
  const ServicesContainer = useCallback(({ 
    title, 
    services, 
    features, 
    section, 
    ref, 
    inView, 
    reverse = false 
  }) => (
    <motion.div 
      ref={ref}
      className="grid lg:grid-cols-2 gap-12 items-start"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {reverse ? (
        <>
          {/* Left Side - Main Feature */}
          <motion.div 
            className="space-y-8 lg:pt-12"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed text-justify">
                {section === "design" 
                  ? "We craft visual identities that resonate with your target audience and create lasting impressions across all touchpoints."
                  : "We implement data-driven marketing strategies that deliver measurable results and sustainable business growth."
                }
              </p>
            </motion.div>
            <FeatureList features={features} />
          </motion.div>

          {/* Right Side - Services Cards */}
          <ServicesCards title={section === "design" ? "Creative & Brand Design" : "Digital Marketing & Growth"} services={services} section={section} />
        </>
      ) : (
        <>
          {/* Left Side - Services Cards */}
          <ServicesCards title={title} services={services} section={section} />

          {/* Right Side - Main Feature */}
          <motion.div 
            className="space-y-8 lg:pt-12"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                Custom Websites and Web Applications
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 text-justify">
                We create digital experiences that captivate your audience and drive business growth through innovative web solutions.
              </p>
            </motion.div>
            <FeatureList features={features} />
          </motion.div>
        </>
      )}
    </motion.div>
  ), []);

  // Services Cards Container Component
  const ServicesCards = useCallback(({ title, services, section }) => (
    <motion.div 
      className="space-y-6 rounded-3xl sm:p-8 bg-linear-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 shadow-[0px_-2px_12px] shadow-cyan-200/14"
      variants={cardAnimation}
    >
      <div className="bg-linear-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm sm:border border-slate-700/50 rounded-3xl sm:p-8 p-4 shadow-2xl sm:m-4">
        <motion.h3 
          className="text-2xl font-bold mb-6 text-center sm:text-start"
          variants={fadeInUp}
        >
          {title}
        </motion.h3>

        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              service={service}
              index={index}
              section={section}
            />
          ))}
        </div>
      </div>
    </motion.div>
  ), []);

  return (
    <div className="bg-[#101820] text-white sm:py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p 
            className="text-[#0E8A4D] text-sm font-semibold tracking-widest uppercase mb-3"
            variants={fadeInUp}
          >
            OUR SERVICES
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white to-cyan-200 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            What we do
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            We deliver comprehensive digital solutions that drive growth, enhance brand presence, 
            and create meaningful connections with your audience.
          </motion.p>
        </motion.div>

        {/* Digital Development Section */}
        <ServicesContainer
          title="Digital Development"
          services={services}
          features={features}
          section="digital"
          ref={digitalRef}
          inView={digitalInView}
        />

        {/* Creative & Brand Design Section */}
        <ServicesContainer
          title="Designs that define your brand"
          services={designservices}
          features={designFeatures}
          section="design"
          ref={designRef}
          inView={designInView}
          reverse={true}
        />

        {/* Digital Marketing & Growth Section */}
        <ServicesContainer
          title="Digital Marketing & Growth"
          services={digitalmarketingfeaturesservices}
          features={digitalMarketingFeatures}
          section="marketing"
          ref={marketingRef}
          inView={marketingInView}
        />

        {/* CTA Section */}
        <motion.div 
          ref={ctaRef}
          className="text-center pt-8"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}