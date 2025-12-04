"use client"
import React, { useState, useRef } from 'react';
import { ChevronDown, Share2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const SocialMediaMarketing = () => {
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
      title: 'Strategy & Planning',
      description: 'We develop comprehensive social media strategies aligned with your brand voice, business goals, and target audience behavior across all relevant platforms.'
    },
    {
      number: '02',
      title: 'Content Creation & Curation',
      description: 'Our creative team produces engaging, platform-optimized content including graphics, videos, reels, and copy that resonates with your audience and drives engagement.'
    },
    {
      number: '03',
      title: 'Community Management',
      description: 'We actively manage your social presence, responding to comments, messages, and mentions while fostering authentic relationships with your community.'
    },
    {
      number: '04',
      title: 'Analytics & Growth',
      description: 'We track performance metrics, analyze audience insights, and continuously optimize your social strategy to maximize reach, engagement, and conversions.'
    }
  ];

  const faqs = [
    'Which social media platforms should my business be on?',
    'How often should we post on social media?',
    'What is the ROI of social media marketing?',
    'Do you run paid social media ads?'
  ];

  const overviewPoints = [
    {
      number: '01',
      text: 'Strategic social media campaigns that build brand awareness, foster community, and drive meaningful engagement with your target audience.'
    },
    {
      number: '02',
      text: 'Creative content production tailored to each platform\'s unique format and audience preferences for maximum impact.'
    },
    {
      number: '03',
      text: 'Active community management that turns followers into loyal brand advocates through authentic interactions and timely responses.'
    },
    {
      number: '04',
      text: 'Data-driven optimization using analytics and insights to refine strategy and deliver measurable business results.'
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
            <span className="text-[#0E8A4D] flex gap-2"><Share2/> Social Media Marketing</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Build Community, Amplify Your Brand
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Social media is where conversations happen and brands come to life. We create compelling content and strategic campaigns that engage your audience, build lasting relationships, and drive real business growth across all major platforms.
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
            Social media marketing is about more than just posting content—it's about creating meaningful connections with your audience where they spend their time. We develop platform-specific strategies that leverage the unique strengths of each channel, from Instagram's visual storytelling to LinkedIn's professional networking and TikTok's viral potential.
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            From organic content strategies and influencer partnerships to paid social campaigns and community management, we handle every aspect of your social media presence. Our approach combines creative excellence with data-driven insights to ensure your brand stands out, drives engagement, and achieves measurable results.
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
                    {index === 0 && 'The right platforms depend on your target audience and business goals. B2B companies often thrive on LinkedIn, while visual brands succeed on Instagram and Pinterest. We conduct audience research to identify where your customers spend time and focus efforts on platforms that deliver the best ROI.'}
                    {index === 1 && 'Posting frequency varies by platform and audience. Generally, 3-7 times per week on Instagram, 1-2 times daily on Twitter, and 3-5 times weekly on LinkedIn works well. Quality always trumps quantity. We create a custom content calendar based on your industry and engagement patterns.'}
                    {index === 2 && 'Social media ROI includes increased brand awareness, website traffic, lead generation, and customer loyalty. While direct sales attribution can be challenging, social media builds relationships that influence purchasing decisions. We track metrics like engagement rate, reach, conversions, and customer lifetime value.'}
                    {index === 3 && 'Yes! We create and manage paid social campaigns across Facebook, Instagram, LinkedIn, TikTok, and Twitter. Our targeted ad strategies complement organic efforts to expand reach, drive conversions, and accelerate growth. We handle everything from creative production to audience targeting and budget optimization.'}
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
            Elevate Your Social Presence
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Ready to build a thriving social community and turn followers into customers? Let's create a social media strategy that drives engagement and delivers measurable results.
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
              View our portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SocialMediaMarketing;