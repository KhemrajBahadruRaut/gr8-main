"use client"
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Code } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const WebDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Individual refs for each section
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const techRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Use useInView for each section with individual refs
  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const overviewInView = useInView(overviewRef, { once: true, threshold: 0.1 });
  const processInView = useInView(processRef, { once: true, threshold: 0.1 });
  const techInView = useInView(techRef, { once: true, threshold: 0.1 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Memoized data
  const technologies = useMemo(() => [
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  ], []);

  const processSteps = useMemo(() => [
    {
      number: '01',
      title: 'Discovery & Analysis',
      description: 'We begin by understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap.'
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Our design team creates intuitive user interfaces and interactive prototypes that align with your brand identity and user needs.'
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'We build robust, scalable applications using modern technologies while maintaining rigorous quality assurance and testing standards.'
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'We deploy your solution and provide ongoing maintenance, updates, and technical support to ensure optimal performance.'
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'What is your typical project timeline for web development?',
      answer: 'Project timelines vary based on complexity, but most websites take 4-8 weeks from concept to launch. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you provide ongoing maintenance and support after launch?',
      answer: 'Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, and technical support to keep your website running smoothly.'
    },
    {
      question: 'Can you work with our existing design or branding guidelines?',
      answer: 'Absolutely! We can work with your existing brand assets and design guidelines, or help you create new ones that better represent your business.'
    },
    {
      question: 'What technologies do you recommend for e-commerce websites?',
      answer: 'For e-commerce, we recommend robust platforms like Shopify, WooCommerce, or custom solutions using React/Next.js with secure payment integrations.'
    }
  ], []);

  const overviewPoints = useMemo(() => [
    {
      number: '01',
      text: 'Custom web applications built with modern frameworks and scalable architecture'
    },
    {
      number: '02',
      text: 'Responsive design that works perfectly across all devices and screen sizes'
    },
    {
      number: '03',
      text: 'SEO-optimized structure and performance for better search engine visibility'
    },
    {
      number: '04',
      text: 'Secure coding practices and regular updates to protect against vulnerabilities'
    }
  ], []);

  // Optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
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

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }), []);

  const techLogoVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized event handlers
  const handleFaqToggle = useCallback((index) => {
    setOpenFaq(openFaq === index ? null : index);
  }, [openFaq]);

  // Section Header Component
  const SectionHeader = useCallback(({ subtitle, title, className = "" }) => (
    <motion.div 
      className={`text-center mb-12 ${className}`}
      variants={itemVariants}
    >
      <p className="text-[#D79442] text-sm font-medium mb-2 tracking-wider">
        {subtitle}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    </motion.div>
  ), [itemVariants]);

  return (
    <div className="pt-10 bg-[#0a1520] text-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative py-16 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF6EB] text-sm mb-6 text-[#D79442]"
            variants={itemVariants}
          >
            <Code size={16} />
            <span className="text-[#D79442]">Web Development</span>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Transform Your Digital Vision Into Reality
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We create stunning, high-performance websites and applications that drive business growth and deliver exceptional user experiences.
          </motion.p>
        </div>
      </motion.section>

      {/* Overview Section */}
      <motion.section 
        ref={overviewRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 "
        initial="hidden"
        animate={overviewInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="EXPLORE FOR THE WEEK"
          title="Overview"
        />

        <motion.div 
          className="space-y-6 mb-12"
          variants={containerVariants}
        >
          <motion.p 
            className="text-gray-400 leading-relaxed text-center"
            variants={itemVariants}
          >
            We specialize in creating custom web solutions that combine cutting-edge technology with user-centered design for measurable business results.
          </motion.p>
        </motion.div>

        {/* Overview Points */}
        <motion.div 
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {overviewPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="flex gap-4 items-start p-4 rounded-lg hover:bg-[#0f1d2e] transition-colors"
              variants={itemVariants}
            >
              <div className="bg-linear-to-br from-[#D79442] to-[#EFC27E] text-black font-bold px-3 py-2 rounded-lg shrink-0 text-sm">
                {point.number}
              </div>
              <p className="text-gray-300 text-sm">{point.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        ref={processRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="PLANNING & FRAMEWORK"
          title="Our Process"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="p-6 rounded-lg bg-[#0f1d2e] border border-gray-800 hover:border-[#D79442] transition-colors"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-3xl font-bold text-gray-600 mb-3">{step.number}</div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Technologies Section */}
      <motion.section 
        ref={techRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={techInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="OUR TECH STACK"
          title="Technologies We Use"
        />

        <motion.div 
          className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[#0f1d2e] transition-colors"
              variants={techLogoVariants}
              whileHover="hover"
              title={tech.name}
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <span className="text-xs text-gray-400 text-center">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQs Section */}
      <motion.section 
        ref={faqRef}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="FREQUENTLY ASKED QUESTIONS"
          title="FAQs"
          className="text-left"
        />

        <motion.div 
          className="space-y-3"
          variants={containerVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#0f1d2e] rounded-lg border border-gray-800"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => handleFaqToggle(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#132435] transition-colors"
                whileHover={{ backgroundColor: 'rgba(19, 36, 53, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-300 text-sm font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>
              {openFaq === index && (
                <motion.div 
                  className="px-4 pb-4 text-gray-400 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="bg-linear-to-br from-[#0f1d2e] to-[#132435] rounded-xl p-8 text-center border border-gray-800"
          variants={cardVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Build Your Digital Solution?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6 text-sm"
            variants={itemVariants}
          >
            Let's discuss your project requirements and create a custom web solution.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center"
            variants={containerVariants}
          >
            <motion.button 
              className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-2xl hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a consultation
            </motion.button>
            <motion.button 
              className="px-6 py-2.5 bg-transparent border border-gray-600 text-white text-sm font-medium rounded-2xl hover:bg-white hover:text-black transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See our works
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default WebDevelopment;