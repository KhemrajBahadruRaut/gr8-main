"use client"
import React from 'react';
import { Scale, Shield, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: "By accessing and using the services of GR8 Private Limited, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services."
    },
    {
      icon: Shield,
      title: "Services Description",
      content: "GR8 Private Limited provides digital solutions and property management services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice."
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: "You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
    },
    {
      icon: AlertCircle,
      title: "Intellectual Property",
      content: "All content, trademarks, service marks, and logos displayed on our platform are the property of GR8 Private Limited or their respective owners. You may not use, reproduce, or distribute any content without prior written permission."
    },
    {
      icon: CheckCircle,
      title: "Limitation of Liability",
      content: "GR8 Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services."
    }
  ];

  return (
    <div className=" bg-linear-to-b from-slate-900 to-slate-950 pt-25 px-6 relative overflow-hidden pb-10">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-slate-700/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Scale className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">
            LEGAL DOCUMENTS
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms & Conditions
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/30 mb-12">
          <p className="text-slate-300 leading-relaxed text-lg">
            Welcome to GR8 Private Limited. These Terms and Conditions govern your use of our website and services. Please read them carefully before accessing or using our services.
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

          {/* Additional Sections */}
          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Terms</h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                All fees for our services are due as specified in your service agreement. Late payments may result in suspension of services. We reserve the right to change our pricing with 30 days notice to existing clients.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Termination</h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Governing Law</h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where GR8 Private Limited is registered, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-6">Changes to Terms</h2>
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes through our website or via email. Continued use of our services after changes constitutes acceptance of the new Terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-linear-to-r from-orange-500/10 to-orange-600/10 rounded-xl p-8 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-slate-300 mb-6">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="space-y-3">
              <p className="text-slate-300">
                <span className="font-semibold text-white">Email:</span> management@gr8nepal.com
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-white">Address:</span> 283 Aadinath Marg, Lalitpur 44600
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link 
            href="/privacy" 
            className="text-orange-500 hover:text-orange-400 transition-colors duration-300 font-medium"
          >
            ← View Privacy Policy
          </Link>
          <Link 
            href="/" 
            className="text-slate-400 hover:text-white transition-colors duration-300 font-medium"
          >
            Back to Home →
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