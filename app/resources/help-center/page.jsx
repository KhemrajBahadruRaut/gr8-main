"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronUp, MessageCircle, Mail, 
  Phone, FileText, Video, Book, Zap, Shield, CreditCard, 
  Settings, Users, HelpCircle, Check, ArrowRight, Send,
  Loader2, X
} from 'lucide-react';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqRef = useRef(null);
  const supportRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, threshold: 0.2 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.1 });
  const supportInView = useInView(supportRef, { once: true, threshold: 0.2 });

  const categories = [
    {
      id: 'all',
      name: 'All Topics',
      icon: Book,
      color: 'emerald',
      count: 24
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: Zap,
      color: 'blue',
      count: 8
    },
    {
      id: 'account',
      name: 'Account & Billing',
      icon: CreditCard,
      color: 'purple',
      count: 6
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      color: 'red',
      count: 5
    },
    {
      id: 'features',
      name: 'Features',
      icon: Settings,
      color: 'orange',
      count: 5
    }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with your platform?',
      answer: 'Getting started is easy! Simply sign up for an account, verify your email, and follow our interactive onboarding guide. You\'ll be up and running in less than 5 minutes. We also offer a free trial so you can explore all features before committing.'
    },
    {
      category: 'getting-started',
      question: 'What are the system requirements?',
      answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser. Mobile apps are available for iOS 13+ and Android 8+.'
    },
    {
      category: 'getting-started',
      question: 'Is there a mobile app available?',
      answer: 'Yes! We have mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store. All your data syncs seamlessly across devices.'
    },
    {
      category: 'account',
      question: 'How do I change my password?',
      answer: 'To change your password, go to Settings > Security > Change Password. You\'ll need to enter your current password and then your new password twice for confirmation. We recommend using a strong, unique password.'
    },
    {
      category: 'account',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers. For enterprise plans, we also support invoicing and purchase orders.'
    },
    {
      category: 'account',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you\'ll continue to have access until the end of your current billing period.'
    },
    {
      category: 'account',
      question: 'How do I upgrade or downgrade my plan?',
      answer: 'You can change your plan at any time from the Billing section in your account settings. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle.'
    },
    {
      category: 'security',
      question: 'How secure is my data?',
      answer: 'We take security very seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We perform regular security audits, maintain SOC 2 Type II compliance, and never share your data with third parties.'
    },
    {
      category: 'security',
      question: 'Do you offer two-factor authentication?',
      answer: 'Yes! We strongly recommend enabling two-factor authentication (2FA) for enhanced security. You can enable it in Settings > Security and choose between authenticator apps or SMS verification.'
    },
    {
      category: 'security',
      question: 'What happens if I forget my password?',
      answer: 'Click on "Forgot Password" on the login page, and we\'ll send you a password reset link via email. The link expires after 24 hours for security reasons. If you don\'t receive the email, check your spam folder.'
    },
    {
      category: 'features',
      question: 'Can I integrate with other tools?',
      answer: 'Absolutely! We offer integrations with popular tools like Slack, Google Workspace, Microsoft Office, Salesforce, and many more. Check our integrations page for the full list and setup instructions.'
    },
    {
      category: 'features',
      question: 'Is there an API available?',
      answer: 'Yes, we provide a comprehensive REST API with detailed documentation. API access is available on all paid plans. You can find the API documentation in your developer dashboard.'
    },
    {
      category: 'features',
      question: 'Can I export my data?',
      answer: 'Yes, you can export all your data at any time in multiple formats including CSV, JSON, and PDF. Go to Settings > Data Management > Export Data to get started.'
    },
    {
      category: 'features',
      question: 'Do you offer team collaboration features?',
      answer: 'Yes! All our plans include team collaboration features like shared workspaces, real-time editing, comments, mentions, and role-based permissions. Team plans offer enhanced collaboration tools.'
    },
    {
      category: 'features',
      question: 'What kind of customer support do you provide?',
      answer: 'We offer 24/7 email support for all plans, live chat support for Pro and Enterprise plans, and phone support for Enterprise customers. We also have extensive documentation, video tutorials, and an active community forum.'
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      color: 'emerald',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      availability: 'Response within 24h',
      color: 'blue',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Talk to our team directly',
      availability: 'Mon-Fri, 9AM-6PM',
      color: 'purple',
      action: 'Call Us'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      availability: '50+ videos',
      color: 'orange',
      action: 'Watch Now'
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Comprehensive guides and references',
      link: '/docs'
    },
    {
      icon: Video,
      title: 'Video Library',
      description: 'Video tutorials and webinars',
      link: '/videos'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '/community'
    },
    {
      icon: Book,
      title: 'Blog',
      description: 'Tips, tricks, and best practices',
      link: '/blogs'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFaqClick = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleContactSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setShowContactForm(false);
        setSubmitSuccess(false);
      }, 2000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-[#101820] text-white min-h-screen">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div className="text-center" variants={itemVariants}>
            <motion.p 
              className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4"
              variants={itemVariants}
            >
              HELP CENTER
            </motion.p>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              How can we help you?
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg mb-8"
              variants={itemVariants}
            >
              Search our knowledge base or browse categories below
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="relative max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={categoriesRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500/20 border-emerald-500/50'
                    : 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-12 h-12 rounded-xl ${
                  category.color === 'emerald' ? 'bg-emerald-500/20' :
                  category.color === 'blue' ? 'bg-blue-500/20' :
                  category.color === 'purple' ? 'bg-purple-500/20' :
                  category.color === 'red' ? 'bg-red-500/20' :
                  'bg-orange-500/20'
                } flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className={`w-6 h-6 ${
                    category.color === 'emerald' ? 'text-emerald-400' :
                    category.color === 'blue' ? 'text-blue-400' :
                    category.color === 'purple' ? 'text-purple-400' :
                    category.color === 'red' ? 'text-red-400' :
                    'text-orange-400'
                  }`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-400">{category.count} articles</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={faqRef}
            className="text-center mb-12"
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-gray-400"
              variants={itemVariants}
            >
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden"
                  variants={itemVariants}
                >
                  <button
                    onClick={() => handleFaqClick(index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                      <span className="font-semibold">{faq.question}</span>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 pl-16 text-gray-400">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-12"
                variants={itemVariants}
              >
                <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No results found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or browse different categories</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Support Options */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={supportRef}
            className="text-center mb-12"
            initial="hidden"
            animate={supportInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Need More Help?
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg"
              variants={itemVariants}
            >
              Choose the best way to reach us
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial="hidden"
            animate={supportInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-14 h-14 rounded-xl ${
                  option.color === 'emerald' ? 'bg-emerald-500/20' :
                  option.color === 'blue' ? 'bg-blue-500/20' :
                  option.color === 'purple' ? 'bg-purple-500/20' :
                  'bg-orange-500/20'
                } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <option.icon className={`w-7 h-7 ${
                    option.color === 'emerald' ? 'text-emerald-400' :
                    option.color === 'blue' ? 'text-blue-400' :
                    option.color === 'purple' ? 'text-purple-400' :
                    'text-orange-400'
                  }`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                <p className="text-emerald-400 text-xs mb-4">{option.availability}</p>
                <motion.button
                  onClick={() => index === 1 && setShowContactForm(true)}
                  className="w-full bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600 hover:border-emerald-500/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.action}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Resources */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={supportInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                className="bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <resource.icon className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-400 text-sm">{resource.description}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowContactForm(false)}
        >
          <motion.div
            className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Contact Support</h2>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {submitSuccess ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Check className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-center">
                    We've received your message and will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={contactData.subject}
                      onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={(e) => setContactData({...contactData, message: e.target.value})}
                      rows="6"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                      placeholder="Describe your issue or question..."
                    ></textarea>
                  </div>

                  <motion.button
                    onClick={handleContactSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}