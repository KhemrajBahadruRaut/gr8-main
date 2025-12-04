"use client"
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Smartphone } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const ApplicationDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Individual refs for each section
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const techRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Use useInView for each section
  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const overviewInView = useInView(overviewRef, { once: true, threshold: 0.1 });
  const processInView = useInView(processRef, { once: true, threshold: 0.1 });
  const techInView = useInView(techRef, { once: true, threshold: 0.1 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.1 });

  // Memoized data
  const technologies = useMemo(() => [
    { name: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'iOS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    { name: 'Android', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  ], []);

  const processSteps = useMemo(() => [
    {
      number: '01',
      title: 'Strategy & Planning',
      description: 'We analyze your business needs and define the perfect mobile strategy to achieve your goals and engage your target audience.'
    },
    {
      number: '02',
      title: 'UI/UX Design',
      description: 'Our designers create intuitive, user-friendly interfaces that provide exceptional experiences across all mobile devices.'
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'We build robust native and cross-platform applications with rigorous testing to ensure flawless performance.'
    },
    {
      number: '04',
      title: 'Deployment & Support',
      description: 'We handle app store submissions and provide ongoing maintenance to keep your application running smoothly.'
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'What is the difference between native and cross-platform app development?',
      answer: 'Native apps are built specifically for one platform (iOS or Android) using platform-specific languages, while cross-platform apps use frameworks like React Native or Flutter to work on multiple platforms with a single codebase.'
    },
    {
      question: 'How long does it typically take to develop a mobile application?',
      answer: 'Development timelines vary based on complexity, but most mobile apps take 3-6 months from concept to launch. Simple apps may take 2-3 months, while complex enterprise solutions can take 6+ months.'
    },
    {
      question: 'Do you provide maintenance and updates after launch?',
      answer: 'Yes, we offer comprehensive maintenance packages that include bug fixes, performance updates, security patches, and feature enhancements to ensure your app stays current and functional.'
    },
    {
      question: 'Can you help with app store submission and approval?',
      answer: 'Absolutely! We have extensive experience with both Apple App Store and Google Play Store submission processes and can guide you through the entire approval process.'
    }
  ], []);

  const overviewPoints = useMemo(() => [
    {
      number: '01',
      text: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      number: '02',
      text: 'User-centered design focused on intuitive navigation and engagement'
    },
    {
      number: '03',
      text: 'Seamless integration with backend systems and third-party APIs'
    },
    {
      number: '04',
      text: 'Ongoing maintenance and updates to ensure optimal performance'
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
      <p className="text-[#B32723] text-sm font-medium mb-2 tracking-wider">
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
            className="bg-[#FDEDED] text-[#B32723] inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm mb-6"
            variants={itemVariants}
          >
            <Smartphone size={16} />
            <span >App Development</span>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Build Powerful Mobile Experiences That Drive Engagement
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We create innovative mobile applications that connect with your audience, streamline operations, and deliver exceptional user experiences across all devices.
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
          subtitle="MOBILE SOLUTIONS"
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
            We specialize in creating custom mobile applications that combine cutting-edge technology with intuitive design. Our solutions help businesses engage customers, improve efficiency, and drive growth through powerful mobile experiences.
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
              <div className="bg-linear-to-br from-[#B32723] to-[#E06666] text-white font-bold px-3 py-2 rounded-lg shrink-0 text-sm">
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
          subtitle="DEVELOPMENT PROCESS"
          title="Our Approach"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {processSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="p-6 rounded-lg bg-[#0f1d2e] border border-gray-800 hover:border-[#B32723] transition-colors"
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
          className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8"
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
            Ready to Build Your Mobile App?
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6 text-sm"
            variants={itemVariants}
          >
            Let's discuss your mobile app requirements and create a solution that engages your audience and drives business growth.
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

export default ApplicationDevelopment;