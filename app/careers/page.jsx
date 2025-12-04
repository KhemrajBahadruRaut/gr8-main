"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, DollarSign, Users, 
  TrendingUp, Award, Coffee, Zap, 
  ChevronRight, X, Upload, Send, Check
} from 'lucide-react';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const jobsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, threshold: 0.2 });
  const jobsInView = useInView(jobsRef, { once: true, threshold: 0.1 });

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      salary: 'NRP 50k - NRP 70k',
      description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will work on cutting-edge projects and help build scalable web applications.',
      requirements: [
        '5+ years of experience in full-stack development',
        'Proficiency in React, Node.js, and modern JavaScript',
        'Experience with database design and optimization',
        'Strong problem-solving skills'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Collaborate with cross-functional teams',
        'Write clean, maintainable code',
        'Participate in code reviews'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      salary: 'NRP 40k - NRP 60k',
      description: 'Join our design team to create beautiful, user-friendly interfaces. You will work closely with developers and product managers to bring designs to life.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Adobe XD, or Sketch',
        'Strong portfolio showcasing your work',
        'Understanding of user-centered design principles'
      ],
      responsibilities: [
        'Create wireframes and prototypes',
        'Design intuitive user interfaces',
        'Conduct user research and testing',
        'Collaborate with development team'
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: 'NRP 35k - NRP 50k',
      description: 'We need a creative digital marketing specialist to drive our online presence and help us reach new customers through various digital channels.',
      requirements: [
        '2+ years in digital marketing',
        'Experience with SEO, SEM, and social media',
        'Strong analytical and communication skills',
        'Familiarity with marketing tools'
      ],
      responsibilities: [
        'Develop marketing strategies',
        'Manage social media campaigns',
        'Analyze campaign performance',
        'Create engaging content'
      ]
    },
    {
      id: 4,
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Kathmandu, Nepal',
      type: 'Full-time',
      salary: 'NRP 45k - NRP 65k',
      description: 'Looking for a skilled Backend Engineer to build robust APIs and services that power our applications.',
      requirements: [
        '4+ years backend development experience',
        'Strong knowledge of Node.js or Python',
        'Experience with REST APIs and microservices',
        'Database expertise (SQL and NoSQL)'
      ],
      responsibilities: [
        'Design and implement APIs',
        'Optimize database queries',
        'Ensure system scalability',
        'Write unit and integration tests'
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'We offer market-leading compensation packages',
      color: 'emerald'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear paths for advancement and skill development',
      color: 'blue'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Regular bonuses and performance rewards',
      color: 'purple'
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options',
      color: 'orange'
    },
    // {
    //   icon: Heart,
    //   title: 'Health Benefits',
    //   description: 'Comprehensive health insurance coverage',
    //   color: 'red'
    // },
    {
      icon: Zap,
      title: 'Learning Budget',
      description: 'Annual budget for courses and conferences',
      color: 'yellow'
    }
  ];

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApplyClick = () => {
    setShowApplicationForm(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowApplicationForm(false);
    setSubmitSuccess(false);
  };

  const handleInputChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setApplicationData({
      ...applicationData,
      resume: e.target.files[0]
    });
  };

  const handleSubmitApplication = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        coverLetter: '',
        resume: null
      });

      setTimeout(() => {
        handleCloseModal();
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
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center" variants={itemVariants}>
            <motion.p 
              className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4"
              variants={itemVariants}
            >
              JOIN OUR TEAM
            </motion.p>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              variants={itemVariants}
            >
              Build Your Career <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-400">
                With Us
              </span>
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8"
              variants={itemVariants}
            >
              We're always looking for talented individuals to join our team. 
              Explore opportunities and grow with us.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-8 text-center"
              variants={itemVariants}
            >
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">{jobs.length}+</div>
                <div className="text-gray-400">Open Positions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
                <div className="text-gray-400">Team Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">4.8</div>
                <div className="text-gray-400">Employee Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={benefitsRef}
            className="text-center mb-16"
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.p 
              className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3"
              variants={itemVariants}
            >
              WHY JOIN US
            </motion.p>
            <motion.h2 
              className="text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Benefits & Perks
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              We believe in taking care of our team with great benefits and a supportive work environment
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-14 h-14 rounded-xl NRP {
                  benefit.color === 'emerald' ? 'bg-emerald-500/20' :
                  benefit.color === 'blue' ? 'bg-blue-500/20' :
                  benefit.color === 'purple' ? 'bg-purple-500/20' :
                  benefit.color === 'orange' ? 'bg-orange-500/20' :
                  benefit.color === 'red' ? 'bg-red-500/20' :
                  'bg-yellow-500/20'
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`w-7 h-7 NRP {
                    benefit.color === 'emerald' ? 'text-emerald-400' :
                    benefit.color === 'blue' ? 'text-blue-400' :
                    benefit.color === 'purple' ? 'text-purple-400' :
                    benefit.color === 'orange' ? 'text-orange-400' :
                    benefit.color === 'red' ? 'text-red-400' :
                    'text-yellow-400'
                  }`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={jobsRef}
            className="text-center mb-16"
            initial="hidden"
            animate={jobsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.p 
              className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3"
              variants={itemVariants}
            >
              CURRENT OPENINGS
            </motion.p>
            <motion.h2 
              className="text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Open Positions
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={jobsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleJobClick(job)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 line-clamp-2">{job.description}</p>
                  </div>
                  <motion.button
                    className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 self-start md:self-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-slate-800 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!showApplicationForm ? (
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedJob.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {selectedJob.salary}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Description</h3>
                    <p className="text-gray-400">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-400">
                          <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-400">
                          <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <motion.button
                  onClick={handleApplyClick}
                  className="w-full mt-8 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply for this position
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Apply for {selectedJob.title}</h2>
                  <button
                    onClick={handleCloseModal}
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
                    <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                    <p className="text-gray-400 text-center">
                      Thank you for applying. We'll review your application and get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={applicationData.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Portfolio/LinkedIn
                        </label>
                        <input
                          type="url"
                          name="portfolio"
                          value={applicationData.portfolio}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Cover Letter *
                      </label>
                      <textarea
                        name="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        rows="6"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                        placeholder="Tell us why you're a great fit for this role..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Resume/CV *
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-gray-400 flex items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 transition-all"
                        >
                          <Upload className="w-5 h-5" />
                          {applicationData.resume ? applicationData.resume.name : 'Upload Resume (PDF, DOC, DOCX)'}
                        </label>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleSubmitApplication}
                      disabled={isSubmitting}
                      className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}