"use client"
import { useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const EmailMarketing = () => {
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
      title: 'List Building & Segmentation',
      description: 'We help you build a quality email list and segment your audience to ensure targeted, relevant messaging that resonates with each subscriber group.'
    },
    {
      number: '02',
      title: 'Campaign Strategy & Design',
      description: 'Our team develops comprehensive email campaigns with compelling copy and stunning designs that capture attention and drive engagement.'
    },
    {
      number: '03',
      title: 'Automation & Personalization',
      description: 'We implement sophisticated email automation workflows and personalization strategies to deliver the right message at the right time to each subscriber.'
    },
    {
      number: '04',
      title: 'Analytics & Optimization',
      description: 'We continuously monitor performance metrics, A/B test elements, and optimize campaigns to maximize open rates, click-through rates, and conversions.'
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'How often should we send emails to our subscribers?',
      answer: 'There\'s no one-size-fits-all answer, as it depends on your industry and audience. Generally, 1-3 emails per week works well for most businesses. We recommend testing different frequencies and monitoring engagement metrics like open rates and unsubscribes to find your optimal cadence.'
    },
    {
      question: 'What email platform do you recommend?',
      answer: 'We work with industry-leading platforms like Mailchimp, HubSpot, ConvertKit, and ActiveCampaign depending on your needs. We help you choose the right platform based on your business size, budget, and automation requirements.'
    },
    {
      question: 'How can we improve our email open rates?',
      answer: 'Improve open rates by crafting compelling subject lines, optimizing send times, segmenting your list for relevance, and personalizing content. We also test variations to identify what resonates with your audience and continuously refine your strategy.'
    },
    {
      question: 'What is email marketing ROI?',
      answer: 'Email marketing has one of the highest ROI of any marketing channel—for every $1 spent, you can expect an average return of $38-$45. Our optimized campaigns help maximize this return through strategic segmentation, personalization, and continuous testing.'
    }
  ], []);

  const overviewPoints = useMemo(() => [
    {
      number: '01',
      text: 'Strategic email campaigns that nurture leads, build customer relationships, and drive repeat sales.'
    },
    {
      number: '02',
      text: 'Personalized messaging based on subscriber behavior, preferences, and engagement history for higher conversion rates.'
    },
    {
      number: '03',
      text: 'Professional email design and copywriting that reflects your brand identity and motivates action.'
    },
    {
      number: '04',
      text: 'Data-driven insights and detailed reporting to measure success and continuously improve campaign performance.'
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
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF6EB] text-sm mb-6 text-[#0E8A4D]"
            variants={itemVariants}
          >
            <Mail size={16} />
            <span >Email Marketing</span>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Connect, Engage, and Convert with Email
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Email marketing remains one of the highest ROI channels. We create strategic, personalized email campaigns that nurture your audience, build customer loyalty, and drive measurable business results.
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
          subtitle="DISCOVER OUR APPROACH"
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
            Email marketing is not about sending mass messages—it's about creating meaningful connections with your audience. We develop targeted strategies that segment your subscribers, deliver personalized content, and guide them through their customer journey.
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

      {/* Services Section */}
      <motion.section 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate={overviewInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <SectionHeader 
          subtitle="OUR SERVICES"
          title="Email Marketing Solutions"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {[
            { 
              title: 'Welcome Series', 
              description: 'Automated onboarding sequences that introduce new subscribers to your brand and build immediate engagement.' 
            },
            { 
              title: 'Newsletter Campaigns', 
              description: 'Regular content updates that keep your audience informed, engaged, and connected to your brand.' 
            },
            { 
              title: 'Promotional Campaigns', 
              description: 'Strategic sales and promotion emails designed to drive conversions and revenue growth.' 
            },
            { 
              title: 'Lead Nurturing', 
              description: 'Automated sequences that guide prospects through the buyer journey and convert them into customers.' 
            },
            { 
              title: 'Re-engagement', 
              description: 'Targeted campaigns to win back inactive subscribers and reduce churn rates.' 
            },
            { 
              title: 'Transactional Emails', 
              description: 'Automated order confirmations, shipping notifications, and customer service communications.' 
            }
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
            Transform Your Email Strategy
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-6 text-sm"
            variants={itemVariants}
          >
            Ready to unlock the power of email marketing? Let's build a strategy that turns subscribers into loyal customers and drives sustainable growth.
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
              Get started today
            </motion.button>
            <motion.button 
              className="px-6 py-2.5 bg-transparent border border-gray-600 text-white text-sm font-medium rounded-2xl hover:bg-white hover:text-black transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a demo
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default EmailMarketing;