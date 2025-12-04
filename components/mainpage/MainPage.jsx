"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-[#101820] relative overflow-hidden pb-20">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        {/* Hero Text */}
        <div
          className={`text-center mb-12 max-w-5xl lg:mt-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight ">
            <div>
              Building a{" "}
              <div className="inline-block h-[1.2em] overflow-hidden align-middle -mt-2 md:-mt-2 lg:-mt-6 ">
                <div className="flex flex-col animate-word-rotate">
                  <span className="bg-linear-to-r from-[#841617] to-[#E06666] bg-clip-text text-transparent text-3xl md:text-4xl lg:text-7xl">
                    Smarter
                  </span>
                  <span className="bg-linear-to-r from-[#D79442] to-[#EFC27E] bg-clip-text text-transparent text-3xl md:text-4xl lg:text-7xl">
                    Stronger
                  </span>
                  <span className="bg-linear-to-r from-[#0E8A4D] to-[#4FBF87] bg-clip-text text-transparent text-3xl md:text-4xl lg:text-7xl">
                    Powerful
                  </span>
                  <span className="bg-linear-to-r from-[#841617] to-[#E06666] bg-clip-text text-transparent text-3xl md:text-4xl lg:text-7xl">
                    Smarter
                  </span>
                </div>
              </div>
            </div>
            Digital Presence for Your Business.
          </h1>
          <p
            className="text-slate-400 text-lg md:text-xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Driving growth through creativity and innovation.
          </p>

          <div className="flex flex-wrap gap-8 justify-center">
            <Link
              className="bg-linear-to-r from-[#B64546] to-[#F2D08A] hover:from-[#F2D08A] hover:to-[#B64546] hover:scale-105 hover:shadow-sm transition-all duration-300 ease-in-out text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-orange-600/50 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
              href="#"
            >
              See our Works
            </Link>

            <Link
              className="relative inline-flex items-center justify-center px-10 py-3 font-medium rounded-full bg-transparent group transition-all duration-300 ease-out hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
              href="/contact"
            >
              {/* Gradient border */}
              <span className="absolute inset-0 rounded-full p-px bg-linear-to-r from-[#F2D08A] to-[#B64546] transition-all duration-300 ease-out">
                <span className="block h-full w-full rounded-full bg-black transition-all duration-300 ease-out group-hover:bg-linear-to-r group-hover:from-[#F2D08A]/10 group-hover:to-[#B64546]/10"></span>
              </span>
              {/* Text */}
              <span className="relative z-10 flex items-center gap-2 bg-linear-to-r from-[#F2D08A] to-[#B64546] bg-clip-text text-transparent transition-all duration-300 ease-out group-hover:text-white">
                Get started →
              </span>
            </Link>
          </div>
        </div>

        {/* Code Window */}
        <div
          className={`relative w-full max-w-2xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Lighter Floating Icons */}
          <div className="absolute hidden z-10 -left-8 -top-6 w-14 h-14 bg-linear-to-r from-[#D79442]/80 to-[#EFC27E]/80 rounded-xl sm:flex items-center justify-center shadow-lg -rotate-12 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>

          <div className="absolute hidden z-10 -right-8 -top-6 w-14 h-14 bg-linear-to-r from-[#B32723]/80 to-[#E06666]/80 rounded-xl sm:flex items-center justify-center shadow-lg rotate-12 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div className="absolute hidden z-10 -right-8 -bottom-6 w-14 h-14 bg-linear-to-r from-[#0E8A4D]/80 to-[#4FBF87]/80 rounded-xl sm:flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          </div>

          {/* Code Window */}
          <div className="backdrop-blur-[3px] p-6 sm:px-8 sm:py-6 flex-row items-center gap-3 border border-slate-700/50 rounded-3xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-[1.02] group bg-slate-900/50">
            <div className="flex items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-slate-400 text-sm ml-4 group-hover:text-slate-300 transition-colors duration-300">
                Dashboard.jsx
              </span>
            </div>

            {/* Code Content - Fixed to show all text */}
            <div className="p-6 font-mono text-sm rounded-xl bg-[#26323D] group-hover:bg-[#2a3845] transition-all duration-500">
              <div className="space-y-2">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-yellow-300">digitalSolution</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-slate-300">{"{"}</span>
                </div>
                <div className="pl-6">
                  <span className="text-cyan-400">innovation</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-emerald-400">&quot;true&quot;</span>
                  <span className="text-slate-300">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-cyan-400">design</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-emerald-400">
                    &quot;exceptional&quot;
                  </span>
                  <span className="text-slate-300">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-cyan-400">results</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-emerald-400">
                    &quot;guaranteed&quot;
                  </span>
                </div>
                <div>
                  <span className="text-slate-300">{"}"}</span>
                </div>
                <div className="pt-2">
                  <span className="text-purple-400">export</span>{" "}
                  <span className="text-purple-400">default</span>{" "}
                  <span className="text-yellow-300">digitalSolution</span>
                  <span className="text-slate-300">;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(71, 85, 105, 1) 1px,
              transparent 2px
            ),
            linear-gradient(90deg, rgba(71, 85, 105, 1) 1px, transparent 1px);
          background-size: 90px 90px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-15px) scale(1.03);
            opacity: 0.08;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        @keyframes word-rotate {
          0% {
            transform: translateY(0);
          }
          16.66% {
            transform: translateY(0);
          }
          33.33% {
            transform: translateY(-25%);
          }
          50% {
            transform: translateY(-25%);
          }
          66.66% {
            transform: translateY(-50%);
          }
          83.33% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(-75%);
          }
        }

        .animate-word-rotate {
          animation: word-rotate 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
