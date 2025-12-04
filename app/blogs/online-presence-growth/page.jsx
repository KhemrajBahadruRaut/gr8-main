import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Search, Smartphone, MessageCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function OnlinePresenceGrowth() {
  return (
    <div className="bg-[#0f1821] text-white pt-18">
      <nav className="border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/blogs">
            <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article>
          <header className="text-center mb-12">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Online Presence
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Why a Strong Online Presence is Essential for Business Growth
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn the key strategies and benefits of building a comprehensive digital footprint that drives customer engagement and business expansion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="Mike Chen"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">Mike Chen</p>
                  <p className="text-sm">Growth Marketing Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>25th Sept, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </header>

          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80"
              alt="Online Presence Growth"
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="flex gap-4 mb-12">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700/50 transition-colors">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700/50 transition-colors">
              <Bookmark className="w-5 h-5" />
              Save
            </button>
          </div>

          <div className="text-gray-300 leading-relaxed text-lg space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">The Power of Online Visibility</h2>
              <p className="mb-4">
                In the digital age, your online presence serves as your business's virtual storefront. It's often the first impression potential customers have of your brand, making it crucial for establishing trust and credibility.
              </p>
              <p>
                A comprehensive online presence goes beyond just having a website. It encompasses your social media profiles, online reviews, search engine visibility, and the overall digital experience you provide to your customers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Essential Components of Online Presence</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <Search className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Search Engine Visibility</h3>
                    <p className="text-sm">Appear when customers search for your products or services</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <Smartphone className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Mobile Optimization</h3>
                    <p className="text-sm">Ensure seamless experience across all devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Social Media Engagement</h3>
                    <p className="text-sm">Build community and interact with your audience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Content Strategy</h3>
                    <p className="text-sm">Provide value through blogs, videos, and resources</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Growth Strategies That Work</h2>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Proven Online Growth Tactics</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <strong className="text-white">Content Marketing:</strong> Create valuable, shareable content that addresses customer pain points and establishes your authority
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <strong className="text-white">SEO Optimization:</strong> Implement technical and on-page SEO to improve search rankings and organic traffic
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <strong className="text-white">Social Media Strategy:</strong> Develop platform-specific content that engages your target audience
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <strong className="text-white">Email Marketing:</strong> Nurture leads and maintain customer relationships through targeted campaigns
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Measuring Success</h2>
              <p className="mb-6">
                Tracking the right metrics is crucial for understanding the impact of your online presence. Focus on these key performance indicators:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-400 mb-2">Website Analytics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Traffic sources and volume</li>
                    <li>• Bounce rate and time on site</li>
                    <li>• Conversion rates</li>
                  </ul>
                </div>
                <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">Social Metrics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Engagement rate</li>
                    <li>• Follower growth</li>
                    <li>• Share of voice</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">The Future is Digital</h2>
              <p className="mb-4">
                As consumer behavior continues to shift online, businesses without a strong digital presence risk becoming irrelevant. The companies that thrive in the coming years will be those that embrace digital transformation and continuously adapt to new technologies and customer expectations.
              </p>
              <p>
                Investing in your online presence today is not just about staying competitive—it's about future-proofing your business and creating sustainable growth channels that will serve you for years to come.
              </p>
            </section>
          </div>

          <section className="mt-16 p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                alt="Mike Chen"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">About Mike Chen</h3>
                <p className="text-gray-400 mb-3">Growth Marketing Expert</p>
                <p className="text-gray-300">
                  Mike specializes in helping businesses scale their online presence through data-driven marketing strategies. 
                  With 8 years of experience in digital marketing, he has helped over 50 companies achieve significant growth 
                  through comprehensive online presence optimization.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}