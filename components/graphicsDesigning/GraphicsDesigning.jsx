"use client"
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Palette } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const GraphicsDesigning = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Individual refs for each section
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Use useInView for each section
  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const overviewInView = useInView(overviewRef, { once: true, threshold: 0.1 });
  const processInView = useInView(processRef, { once: true, threshold: 0.1 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Memoized data
  const processSteps = useMemo(() => [
    {
      number: '01',
      title: 'Discovery & Briefing',
      description: 'We start by understanding your brand, target audience, and design requirements to create a strategic design direction.'
    },
    {
      number: '02',
      title: 'Concept & Ideation',
      description: 'Our designers brainstorm and create multiple design concepts that align with your brand identity and business goals.'
    },
    {
      number: '03',
      title: 'Design & Refinement',
      description: 'We develop the selected concept into polished designs, incorporating your feedback through multiple revision rounds.'
    },
    {
      number: '04',
      title: 'Delivery & Support',
      description: 'We deliver final design files in all required formats and provide ongoing design support for future needs.'
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'What file formats do you deliver for graphic design projects?',
      answer: 'We deliver all final designs in multiple formats including AI, PSD, PDF, PNG, JPG, and SVG. We also provide source files and style guides for consistent brand usage.'
    },
    {
      question: 'How many revisions are included in your design packages?',
      answer: 'Our standard packages include 3 rounds of revisions. We work closely with you to ensure the final design exceeds your expectations before final delivery.'
    },
    {
      question: 'Do you work with existing brand guidelines?',
      answer: 'Absolutely! We can work within your existing brand guidelines or help you develop new ones to ensure consistency across all your design assets.'
    },
    {
      question: 'What is your typical turnaround time for design projects?',
      answer: 'Turnaround times vary by project complexity: Logo design (3-5 days), Brand identity (1-2 weeks), Marketing materials (5-7 days). We provide specific timelines for each project.'
    }
  ], []);

  const overviewPoints = useMemo(() => [
    {
      number: '01',
      text: 'Creative branding and logo design that captures your unique identity'
    },
    {
      number: '02',
      text: 'Marketing materials including brochures, flyers, and social media graphics'
    },
    {
      number: '03',
      text: 'UI/UX design for websites and applications with focus on user experience'
    },
    {
      number: '04',
      text: 'Print-ready designs for business cards, banners, and promotional materials'
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
      <p className="text-[#0E8A4D] text-sm font-medium mb-2 tracking-wider">
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
            className="inline-flex text-[#0E8A4D] items-center gap-2 px-4 py-1 rounded-full bg-[#FFF6EB] text-sm mb-6"
            variants={itemVariants}
          >
            <Palette size={16} />
            <span>Graphics Designing</span>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Transform Your Brand with Stunning Visual Design
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We create compelling visual designs that capture attention, communicate your message, and elevate your brand identity across all platforms.
          </motion.p>
        </div>
      </motion.section>

      {/* Overview Section */}
      <motion.section 
        ref={overviewRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={overviewInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="CREATIVE SOLUTIONS"
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
            We specialize in creating visually stunning designs that tell your brand story and connect with your audience. From logos and branding to marketing materials and digital graphics, we bring creative ideas to life.
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
              <div className="bg-linear-to-br from-[#0E8A4D] to-[#4FBF87] text-white font-bold px-3 py-2 rounded-lg shrink-0 text-sm">
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
          subtitle="DESIGN PROCESS"
          title="Our Creative Workflow"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="p-6 rounded-lg bg-[#0f1d2e] border border-gray-800 hover:border-[#0E8A4D] transition-colors"
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

      {/* Design Services Section */}
      <motion.section 
        ref={faqRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="OUR SERVICES"
          title="Design Expertise"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {[
            { title: 'Brand Identity', description: 'Logo design, brand guidelines, and visual identity systems' },
            { title: 'Print Design', description: 'Business cards, brochures, banners, and promotional materials' },
            { title: 'Digital Graphics', description: 'Social media graphics, web banners, and email templates' },
            { title: 'UI/UX Design', description: 'User interface design for websites and mobile applications' },
            { title: 'Packaging Design', description: 'Product packaging that stands out on shelves' },
            { title: 'Illustration', description: 'Custom illustrations and icon sets for your brand' }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-[#0f1d2e] border border-gray-800 hover:border-[#0E8A4D] transition-colors"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-lg font-bold mb-3 text-[#0E8A4D]">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
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
            Ready to Elevate Your Visual Identity?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6 text-sm"
            variants={itemVariants}
          >
            Let's discuss your design needs and create stunning visuals that make your brand stand out.
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
              See portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default GraphicsDesigning;