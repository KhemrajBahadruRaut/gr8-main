"use client"
import React, { useState, useRef } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const PrintingPublishing = () => {
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
      title: 'Consultation & Design',
      description: 'We understand your vision and requirements, then create stunning print-ready designs that capture your brand identity and message with precision and creativity.'
    },
    {
      number: '02',
      title: 'Material Selection & Proofing',
      description: 'We help you choose the perfect paper stock, finishes, and printing techniques. Digital proofs ensure your approval before production begins.'
    },
    {
      number: '03',
      title: 'Production & Quality Control',
      description: 'Using state-of-the-art printing technology, we produce your materials with meticulous attention to detail, ensuring consistent quality across every piece.'
    },
    {
      number: '04',
      title: 'Finishing & Delivery',
      description: 'From cutting and binding to special finishes, we complete your project to perfection and deliver on time, ready to make an impact.'
    }
  ];

  const faqs = [
    'What printing services do you offer?',
    'What is the turnaround time for print projects?',
    'Do you offer design services or just printing?',
    'What file formats do you accept for printing?'
  ];

  const overviewPoints = [
    {
      number: '01',
      text: 'Comprehensive printing solutions from business cards and brochures to large-format banners and specialty products with premium quality.'
    },
    {
      number: '02',
      text: 'Professional design services that transform your ideas into compelling print materials that communicate your message effectively.'
    },
    {
      number: '03',
      text: 'Advanced printing technologies including offset, digital, and large-format printing with a wide range of finishing options.'
    },
    {
      number: '04',
      text: 'End-to-end publishing services from manuscript development and layout design to printing and distribution management.'
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
            <span className="text-[#0E8A4D] flex gap-2"><BookOpen/> Printing & Publishing</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Bring Your Vision to Life in Print
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            From business cards to books, banners to brochures—we deliver exceptional print quality and publishing services that make lasting impressions. Experience the perfect blend of traditional craftsmanship and modern technology.
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
            In a digital world, quality print materials still command attention and convey professionalism in ways screens cannot. We combine cutting-edge printing technology with expert craftsmanship to produce everything from corporate stationery and marketing collateral to magazines, books, and custom packaging. Every project receives the same meticulous attention to color accuracy, paper quality, and finishing details.
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Our publishing services extend beyond printing to encompass the entire creative process. Whether you're an author bringing a book to market, a business creating branded materials, or an organization producing publications, we provide comprehensive support from concept and design through production, binding, and distribution. We make the complex simple, delivering professional results on time and within budget.
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
                    {index === 0 && 'We offer a comprehensive range of printing services including business cards, letterheads, brochures, flyers, posters, banners, books, magazines, catalogs, packaging, labels, and custom specialty items. We handle both small runs and large volume orders with offset and digital printing options.'}
                    {index === 1 && 'Turnaround time varies by project complexity and quantity. Standard business cards and flyers typically take 3-5 business days, while custom books and large-format projects may require 2-3 weeks. Rush services are available for urgent deadlines. We provide accurate timelines during consultation.'}
                    {index === 2 && 'We offer full-service solutions including both design and printing. Our experienced design team can create custom layouts, or we can work with your existing files. Whether you need a complete design from scratch or just production services, we accommodate all needs.'}
                    {index === 3 && 'We accept PDF, AI, EPS, PSD, and InDesign files. PDFs should be press-ready with embedded fonts and proper bleed settings. We also accept high-resolution JPG and PNG files for certain projects. Our prepress team reviews all files and will contact you if adjustments are needed before printing.'}
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
            Create Stunning Print Materials
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Ready to make a lasting impression with professional print and publishing services? Let's bring your project to life with exceptional quality and craftsmanship.
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
              Request a quote
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrintingPublishing;