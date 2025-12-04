"use client"
import React from 'react';
import { Lock, Eye, Shield, Database, Users, Mail, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include name, email address, phone number, and other contact information."
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations. We do not sell your personal information to third parties."
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: "We may share your information with trusted service providers who assist us in operating our services, but only to the extent necessary to perform these functions and subject to confidentiality obligations."
    },
    {
      icon: Eye,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us to exercise these rights."
    }
  ];

  const cookies = [
    { name: "Essential Cookies", purpose: "Required for the website to function properly" },
    { name: "Analytics Cookies", purpose: "Help us understand how visitors interact with our website" },
    { name: "Preference Cookies", purpose: "Remember your preferences and settings" },
    { name: "Security Cookies", purpose: "Used for security purposes and fraud prevention" }
  ];

  return (
    <div className=" bg-linear-to-b from-slate-900 to-slate-950 pt-25 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 pb-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            YOUR PRIVACY MATTERS
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/30 mb-12">
          <p className="text-slate-300 leading-relaxed text-lg">
            At GR8 Private Limited, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <section.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-slate-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Cookies Section */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">Cookies and Tracking Technologies</h2>
            </div>
            <p className="text-slate-300 mb-6">
              We use cookies and similar tracking technologies to track activity on our services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {cookies.map((cookie, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30"
                >
                  <h3 className="font-semibold text-white mb-2">{cookie.name}</h3>
                  <p className="text-slate-300 text-sm">{cookie.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </div>

          {/* International Transfers */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">International Data Transfers</h2>
            <p className="text-slate-300 leading-relaxed">
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
            </p>
          </div>

          {/* Updates Section */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Updates to This Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-linear-to-r from-orange-500/10 to-orange-600/10 rounded-xl p-8 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            <p className="text-slate-300 mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-slate-300">management@gr8.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Mail</h3>
                <p className="text-slate-300">
                  Data Protection Officer<br />
                  GR8 Private Limited<br />
                  283 Aadinath Marg, Lalitpur 44600
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Response Time</h3>
                <p className="text-slate-300">We strive to respond to all privacy-related inquiries within 5-7 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link 
            href="/" 
            className="text-slate-400 hover:text-white transition-colors duration-300 font-medium"
          >
            ← Back to Home
          </Link>
          <Link 
            href="/terms-and-condition" 
            className="text-orange-500 hover:text-orange-400 transition-colors duration-300 font-medium"
          >
            View Terms & Conditions →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-15px) scale(1.03);
            opacity: 0.08;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}