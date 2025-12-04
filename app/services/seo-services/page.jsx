"use client"
import React, { useState, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const SEOServices = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Create refs for each section
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Use useInView for each section
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const overviewInView = useInView(overviewRef, { once: true, threshold: 0.2 });
  const processInView = useInView(processRef, { once: true, threshold: 0.2 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

  const processSteps = [
    {
      number: '01',
      title: 'SEO Audit & Analysis',
      description: 'We conduct comprehensive audits of your website to identify technical issues, content gaps, and opportunities for optimization that will improve your search rankings.'
    },
    {
      number: '02',
      title: 'Keyword Research & Strategy',
      description: 'Our team performs in-depth keyword research to identify high-value search terms and develop a targeted SEO strategy aligned with your business goals.'
    },
    {
      number: '03',
      title: 'On-Page & Technical SEO',
      description: 'We optimize your website structure, content, meta tags, page speed, and technical elements to ensure search engines can crawl and index your site effectively.'
    },
    {
      number: '04',
      title: 'Content & Link Building',
      description: 'We create SEO-optimized content and build high-quality backlinks to establish your authority and improve your domain strength in search results.'
    }
  ];

  const faqs = [
    'How long does it take to see SEO results?',
    'What is the difference between on-page and off-page SEO?',
    'Do you guarantee first-page rankings?',
    'How do you measure SEO success?'
  ];

  const overviewPoints = [
    {
      number: '01',
      text: 'Comprehensive SEO strategies that improve visibility, drive organic traffic, and increase conversions from search engines.'
    },
    {
      number: '02',
      text: 'Technical optimization ensuring your website is fast, mobile-friendly, and easily crawlable by search engines.'
    },
    {
      number: '03',
      text: 'Content optimization and creation that targets valuable keywords while providing genuine value to your audience.'
    },
    {
      number: '04',
      text: 'Transparent reporting and analytics to track rankings, traffic, and ROI from your SEO investment.'
    }
  ];

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

  const itemVariants = {
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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="pt-10 bg-[#0a1520] text-white">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="inline-block px-4 py-1 rounded-full bg-[#FFF6EB] text-sm mb-6"
            variants={itemVariants}
          >
            <span className="text-[#0E8A4D] flex gap-2"><Search/> SEO Services</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Dominate Search Results, Drive Organic Growth
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            SEO is the foundation of sustainable online visibility. We implement proven strategies to improve your search rankings, attract qualified traffic, and convert visitors into customers through organic search.
          </motion.p>
        </div>
      </motion.div>

      {/* Overview Section */}
      <motion.div 
        ref={overviewRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate={overviewInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <p className="text-[#0E8A4D] text-sm font-medium mb-2 tracking-wider">
            DISCOVER OUR APPROACH
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Overview</h2>
        </motion.div>

        <motion.div 
          className="space-y-8 mb-12"
          variants={containerVariants}
        >
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Search Engine Optimization is about more than just keywords—it's about creating a comprehensive digital presence that search engines trust and users love. We combine technical expertise, content strategy, and link building to improve your visibility across search engines and drive sustainable organic growth.
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            From local SEO for brick-and-mortar businesses to enterprise-level optimization for global brands, we tailor our approach to your specific needs and goals. Our white-hat techniques ensure long-term results that withstand algorithm updates and keep you ahead of competitors.
          </motion.p>
        </motion.div>

        {/* Overview Points */}
        <motion.div 
          className="flex flex-col gap-6 max-w-xl mx-auto"
          variants={containerVariants}
        >
          {overviewPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="flex gap-4 items-start"
              variants={itemVariants}
            >
              <div className="bg-linear-to-br from-[#0E8A4D] to-[#4FBF87] text-black font-bold px-4 py-2 rounded-lg shrink-0">
                {point.number}
              </div>
              <p className="text-gray-300 pt-1">{point.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Process Section */}
      <motion.div 
        ref={processRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <p className="text-[#0E8A4D] text-sm font-medium mb-2 tracking-wider">
            PLANNING & FRAMEWORK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Process</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="space-y-4"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-5xl font-bold text-gray-700">{step.number}</div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* FAQs Section */}
      <motion.div 
        ref={faqRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <p className="text-[#0E8A4D] text-sm font-medium mb-2 tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">FAQs</h2>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#0f1d2e] rounded-lg overflow-hidden border border-gray-800"
              variants={faqItemVariants}
            >
              <motion.button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#132435] transition-colors"
                whileHover={{ backgroundColor: 'rgba(19, 36, 53, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-300">{faq}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>
              {openFaq === index && (
                <motion.div 
                  className="px-5 pb-5 text-gray-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>
                    {index === 0 && 'SEO is a long-term strategy. Most businesses start seeing meaningful results within 3-6 months, with continued improvements over time. Factors like competition, current website status, and industry affect the timeline. We focus on sustainable growth rather than quick fixes.'}
                    {index === 1 && 'On-page SEO involves optimizing elements on your website like content, meta tags, headers, and site structure. Off-page SEO focuses on external factors like backlinks, social signals, and brand mentions that build your site\'s authority and reputation.'}
                    {index === 2 && 'No reputable SEO agency can guarantee specific rankings as search algorithms constantly evolve. We focus on proven strategies that improve visibility, drive qualified traffic, and deliver measurable ROI. Our track record speaks for itself.'}
                    {index === 3 && 'We track key metrics including organic traffic growth, keyword rankings, conversion rates, bounce rates, and ROI. You\'ll receive detailed monthly reports showing progress and insights. We focus on metrics that directly impact your business goals, not just vanity numbers.'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        ref={ctaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="bg-linear-to-br from-[#0f1d2e] to-[#132435] rounded-2xl p-12 text-center border border-gray-800"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Rank Higher?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let's boost your visibility and drive qualified organic traffic to your website. Start your SEO journey with proven strategies that deliver lasting results.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={containerVariants}
          >
            <motion.button 
              className="px-8 py-3 bg-white text-black font-medium rounded-3xl hover:bg-gray-100 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Get started today
            </motion.button>
            <motion.button 
              className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-3xl hover:bg-white hover:text-black transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Request SEO audit
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SEOServices;