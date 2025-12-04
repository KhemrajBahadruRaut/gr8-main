import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Globe, Users, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';

export default function DigitalPresence2025() {
  return (
    <div className="bg-[#0f1821] text-white pt-18">
      {/* Navigation */}
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
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Digital Growth
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Featured
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why Every Business Needs a Strong Digital Presence in 2025
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how digital transformation is reshaping business landscapes and why establishing a robust online presence is crucial for success in the coming years.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                  <p className="text-sm">Digital Strategy Director</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>21st May, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80"
              alt="Digital Presence"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Action Buttons */}
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

          {/* Content */}
          <div className="text-gray-300 leading-relaxed text-lg space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">The Digital Imperative</h2>
              <p className="mb-4">
                In today's rapidly evolving business landscape, a strong digital presence is no longer optional—it's essential for survival and growth. As we approach 2025, the digital transformation that began years ago has accelerated at an unprecedented pace.
              </p>
              <p>
                The COVID-19 pandemic served as a catalyst, forcing businesses of all sizes to embrace digital technologies. What was once considered a competitive advantage has now become a basic requirement for staying relevant in the market.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Key Benefits of Digital Presence</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <Globe className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Global Reach</h3>
                    <p className="text-sm">Break geographical barriers and reach customers worldwide 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <Users className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Customer Engagement</h3>
                    <p className="text-sm">Build meaningful relationships through continuous digital interaction</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Data Insights</h3>
                    <p className="text-sm">Leverage analytics to understand customer behavior and preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                  <Target className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Cost Efficiency</h3>
                    <p className="text-sm">Digital channels provide better ROI than traditional marketing</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Statistics That Matter</h2>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Businesses with strong digital presence experience:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span><strong>45% higher revenue growth</strong> compared to competitors with weak digital presence</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span><strong>60% better customer retention</strong> rates through digital engagement</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span><strong>35% lower operational costs</strong> through automation and digital processes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span><strong>78% of consumers</strong> research products online before making purchases</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Getting Started with Digital Transformation</h2>
              <p className="mb-6">
                Building a digital presence starts with understanding your audience and creating valuable content that resonates with them. From social media to search engine optimization, every touchpoint matters.
              </p>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">4-Step Digital Transformation Plan</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">1</span>
                    <div>
                      <strong className="text-white">Conduct a digital audit</strong> of your current online presence and identify gaps
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">2</span>
                    <div>
                      <strong className="text-white">Define your target audience</strong> and understand their digital behavior patterns
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">3</span>
                    <div>
                      <strong className="text-white">Develop a comprehensive strategy</strong> covering website, social media, and content
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">4</span>
                    <div>
                      <strong className="text-white">Implement and continuously optimize</strong> based on data and customer feedback
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
              <p className="mb-4">
                The journey to establishing a strong digital presence requires commitment and strategic planning, but the rewards are substantial. Businesses that embrace digital transformation position themselves for sustainable growth and long-term success in an increasingly digital world.
              </p>
              <p>
                As we move toward 2025, the gap between digitally-native businesses and those slow to adapt will only widen. Now is the time to invest in your digital presence and secure your place in the future marketplace.
              </p>
            </section>
          </div>

          {/* Author Bio */}
          <section className="mt-16 p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
                alt="Sarah Johnson"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">About Sarah Johnson</h3>
                <p className="text-gray-400 mb-3">Digital Strategy Director</p>
                <p className="text-gray-300">
                  Sarah is an expert in digital transformation with over 12 years of experience helping businesses 
                  establish robust online presences. She has worked with Fortune 500 companies and startups alike, 
                  specializing in digital strategy, customer engagement, and growth marketing.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}