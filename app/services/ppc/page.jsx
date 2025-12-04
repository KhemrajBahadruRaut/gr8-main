"use client"
import React, { useState, useRef } from 'react';
import { ChevronDown, MousePointerClick } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const PPCAdvertising = () => {
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
      title: 'Strategy & Research',
      description: 'We analyze your business goals, target audience, and competition to develop a comprehensive PPC strategy with optimal keyword selection and budget allocation.'
    },
    {
      number: '02',
      title: 'Campaign Setup & Launch',
      description: 'Our team creates compelling ad copy, designs landing pages, configures targeting parameters, and launches campaigns across Google Ads, Bing, and social platforms.'
    },
    {
      number: '03',
      title: 'Optimization & Testing',
      description: 'We continuously monitor performance, conduct A/B testing on ads and landing pages, adjust bids, and refine targeting to maximize ROI and reduce cost per acquisition.'
    },
    {
      number: '04',
      title: 'Reporting & Scaling',
      description: 'We provide detailed performance reports with actionable insights and scale successful campaigns while eliminating underperformers to grow your results efficiently.'
    }
  ];

  const faqs = [
    'How much should I budget for PPC advertising?',
    'What platforms do you run PPC campaigns on?',
    'How quickly will I see results from PPC?',
    'What is a good ROI for PPC advertising?'
  ];

  const overviewPoints = [
    {
      number: '01',
      text: 'Strategic campaign management across Google Ads, Microsoft Ads, and social platforms to drive qualified traffic and conversions.'
    },
    {
      number: '02',
      text: 'Advanced targeting and audience segmentation to reach the right customers at the right time with precision and efficiency.'
    },
    {
      number: '03',
      text: 'Data-driven optimization using A/B testing, bid management, and conversion tracking to maximize your advertising ROI.'
    },
    {
      number: '04',
      text: 'Transparent reporting with detailed metrics on spend, conversions, cost per acquisition, and overall campaign performance.'
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
            <span className="text-[#0E8A4D] flex gap-2"><MousePointerClick/> Pay-Per-Click Advertising</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Drive Immediate Results with Targeted PPC
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Pay-per-click advertising delivers instant visibility and measurable results. We create and manage high-performing campaigns that put your brand in front of customers actively searching for your products or services.
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
            PPC advertising offers unmatched control and immediate results in digital marketing. Unlike organic strategies that take time to build momentum, paid search and display ads put your business at the top of search results instantly. We specialize in creating campaigns that not only drive clicks but convert visitors into customers, ensuring every dollar of your ad spend works harder for your business.
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            From Google Search and Shopping campaigns to display advertising and remarketing strategies, we manage every aspect of your PPC presence. Our approach combines strategic keyword research, compelling ad creative, precise audience targeting, and continuous optimization to deliver consistent growth. With transparent reporting and regular performance reviews, you'll always know exactly how your campaigns are performing and where your budget is going.
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
                    {index === 0 && 'PPC budgets vary widely based on industry, competition, and goals. We recommend starting with at least $1,000-$3,000 per month to gather meaningful data and see results. We help you set realistic budgets based on your objectives and can scale up or down based on performance.'}
                    {index === 1 && 'We manage campaigns across Google Ads (Search, Display, Shopping, YouTube), Microsoft Advertising (Bing), Facebook Ads, Instagram Ads, LinkedIn Ads, and other platforms based on where your target audience is most active. We recommend the best mix for your specific business goals.'}
                    {index === 2 && 'PPC delivers immediate visibility—your ads can appear within hours of launch. However, optimal performance typically develops over 30-90 days as we gather data, test variations, and optimize campaigns. You\'ll see traffic immediately, with improving conversion rates over time.'}
                    {index === 3 && 'A good PPC ROI varies by industry, but generally we aim for 3:1 to 5:1 return on ad spend, meaning $3-$5 in revenue for every $1 spent. Some industries see higher returns. We focus on maximizing your specific ROI through continuous testing and optimization.'}
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
            Start Driving Qualified Traffic Today
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Ready to see immediate results from your advertising investment? Let's create PPC campaigns that deliver measurable ROI and sustainable growth for your business.
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
              Free PPC audit
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PPCAdvertising;