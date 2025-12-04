"use client"
import  { useState, useRef } from 'react';
import { ChevronDown, PenTool } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const ContentWriting = () => {
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
      title: 'Research & Strategy',
      description: 'We dive deep into your industry, audience, and competitors to develop a comprehensive content strategy tailored to your goals.'
    },
    {
      number: '02',
      title: 'Content Creation',
      description: 'Our expert writers craft engaging, SEO-optimized content that resonates with your target audience and drives conversions.'
    },
    {
      number: '03',
      title: 'Editing & Refinement',
      description: 'Every piece undergoes rigorous editing to ensure clarity, consistency, and alignment with your brand voice and messaging.'
    },
    {
      number: '04',
      title: 'Delivery & Optimization',
      description: 'We deliver polished content and continuously optimize based on performance metrics and audience feedback for maximum impact.'
    }
  ];

  const faqs = [
    'What types of content do you create?',
    'How long does the content creation process take?',
    'Can you optimize content for SEO?',
    'Do you offer content strategy consultation?'
  ];

  const overviewPoints = [
    {
      number: '01',
      text: 'High-quality, original content tailored to your brand voice and audience preferences.'
    },
    {
      number: '02',
      text: 'SEO-optimized content that improves search rankings and drives organic traffic to your website.'
    },
    {
      number: '03',
      text: 'Multi-format content including blogs, articles, web copy, social media posts, and more.'
    },
    {
      number: '04',
      text: 'Data-driven approach with regular performance analysis and continuous improvement strategies.'
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
            <span className="text-[#0E8A4D] flex gap-2"><PenTool/> Content Writing</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Compelling Stories That Drive Results
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We create engaging, SEO-optimized content that captivates your audience, establishes your brand authority, and converts readers into loyal customers.
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
            Content writing is more than just putting words on a page. It's about telling your brand's story in a way that connects with your audience, builds trust, and inspires action. We combine creativity with strategy to produce content that stands out in today's crowded digital landscape.
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Whether you need blog posts, website copy, email campaigns, or social media content, our team of experienced writers delivers exceptional material that reflects your brand voice and achieves your business objectives. Every piece is researched, crafted, and optimized for maximum impact.
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
                    {index === 0 && 'We create blog posts, website copy, email campaigns, social media content, whitepapers, case studies, product descriptions, and more. Our content is tailored to your industry and audience needs.'}
                    {index === 1 && 'The timeline depends on the project scope and complexity. Typically, blog posts take 5-7 business days, while larger projects may take 2-4 weeks. We provide custom timelines based on your requirements.'}
                    {index === 2 && 'Absolutely! All our content is SEO-optimized with relevant keywords, proper heading structure, meta descriptions, and internal linking strategies to improve your search engine rankings.'}
                    {index === 3 && 'Yes! We offer comprehensive content strategy consultation to help you identify your target audience, define your messaging, and create a roadmap for your content marketing efforts.'}
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
            Ready to elevate your content?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let's work together to create content that tells your story, engages your audience, and drives measurable results for your business.
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
              Start your project
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

export default ContentWriting;