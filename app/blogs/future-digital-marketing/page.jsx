import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Mic, Video, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function FutureDigitalMarketing() {
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
                Digital Marketing
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Trends
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Future of Digital Marketing: Trends to Watch in 2025
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore the emerging technologies and strategies that will define digital marketing success in the near future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                  alt="Emily Rodriguez"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">Emily Rodriguez</p>
                  <p className="text-sm">Marketing Technology Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>15th Oct, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>6 min read</span>
                </div>
              </div>
            </div>
          </header>

          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="Future Digital Marketing"
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
              <h2 className="text-3xl font-bold text-white mb-6">Emerging Trends in Digital Marketing</h2>
              <p className="mb-4">
                As technology continues to evolve, so do the opportunities for innovative marketing strategies. The digital marketing landscape in 2025 will be shaped by artificial intelligence, voice search, interactive content, and a growing emphasis on sustainability.
              </p>
              <p>
                Marketers who stay ahead of these trends will be better positioned to capture audience attention and drive meaningful results in an increasingly competitive digital space.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">AI-Powered Personalization</h2>
              <div className="flex items-start gap-4 mb-6">
                <Zap className="w-8 h-8 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="mb-4">
                    Artificial intelligence is revolutionizing how businesses understand and interact with customers. From personalized product recommendations to dynamic content, AI enables unprecedented levels of customization at scale.
                  </p>
                  <p>
                    Machine learning algorithms can analyze customer behavior, predict preferences, and deliver hyper-personalized experiences that significantly improve conversion rates and customer loyalty.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Voice Search Optimization</h2>
              <div className="flex items-start gap-4 mb-6">
                <Mic className="w-8 h-8 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="mb-4">
                    With the rise of smart speakers and voice assistants, optimizing for voice search is becoming increasingly important. This requires a shift from traditional keyword strategies to more conversational, long-tail queries.
                  </p>
                  <p>
                    Voice search optimization focuses on natural language patterns, local search intent, and providing direct, concise answers to user questions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Interactive Content</h2>
              <div className="flex items-start gap-4 mb-6">
                <Video className="w-8 h-8 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="mb-4">
                    Engagement is the new currency in digital marketing. Interactive content like quizzes, polls, calculators, and augmented reality experiences are proving to be highly effective in capturing audience attention.
                  </p>
                  <p>
                    These interactive elements not only increase time spent on site but also provide valuable data about user preferences and behavior.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Sustainability and Ethical Marketing</h2>
              <div className="flex items-start gap-4 mb-6">
                <Users className="w-8 h-8 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="mb-4">
                    Modern consumers are increasingly conscious of brand values. Companies that prioritize sustainability and ethical practices in their marketing are building stronger, more loyal customer bases.
                  </p>
                  <p>
                    Transparency in sourcing, environmental responsibility, and social impact are becoming key differentiators in crowded markets.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Getting Ready for 2025</h2>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Actionable Steps for Future-Proofing Your Marketing</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">1</span>
                    <div>
                      <strong className="text-white">Audit your current marketing stack</strong> and identify gaps in AI and automation capabilities
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">2</span>
                    <div>
                      <strong className="text-white">Develop voice search strategies</strong> by optimizing for conversational queries and local intent
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">3</span>
                    <div>
                      <strong className="text-white">Invest in interactive content</strong> that engages users and provides valuable insights
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-semibold">4</span>
                    <div>
                      <strong className="text-white">Embrace ethical marketing practices</strong> and communicate your brand values clearly
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
              <p className="mb-4">
                The future of digital marketing is exciting and full of opportunities for brands that are willing to adapt and innovate. By embracing AI, optimizing for new search behaviors, creating engaging content, and prioritizing ethical practices, businesses can stay ahead of the curve in 2025 and beyond.
              </p>
              <p>
                The key to success will be maintaining a customer-centric approach while leveraging new technologies to create more meaningful and personalized experiences.
              </p>
            </section>
          </div>

          <section className="mt-16 p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                alt="Emily Rodriguez"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">About Emily Rodriguez</h3>
                <p className="text-gray-400 mb-3">Marketing Technology Specialist</p>
                <p className="text-gray-300">
                  Emily is at the forefront of marketing technology innovation, with a focus on emerging trends and 
                  their practical applications. She has helped numerous brands implement cutting-edge marketing strategies 
                  and stays passionate about the intersection of technology and human connection.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}