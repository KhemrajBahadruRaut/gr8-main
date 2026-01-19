"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react"; // Optional: npm install lucide-react

// Image imports
import bank1 from "./banking/GR8-Nepal-bank1.png";
import bank2 from "./banking/GR8-Nepal-bank2.png";
import bank3 from "./banking/GR8-Nepal-bank3.png";
import bank4 from "./banking/GR8-Nepal-bank4.png";
import hotel1 from "./hotel&restro/GR8-Nepal-hotel1.png";
import hotel2 from "./hotel&restro/GR8-Nepal-hotel2.png";
import medical1 from "./medical/GR8-Nepal-medical1.png";
import medical2 from "./medical/GR8-Nepal-medical2.png";
import medical3 from "./medical/GR8-Nepal-medical3.png";
import medical4 from "./medical/GR8-Nepal-medical4.png";
import medical5 from "./medical/GR8-Nepal-medical5.png";
import real1 from "./real estate/GR8-Nepal-real1.png";
import real2 from "./real estate/GR8-Nepal-real2.png";
import travel1 from "./travel/GR8-Nepal-travel1.png";
import travel2 from "./travel/GR8-Nepal-travel2.png";
import travel3 from "./travel/GR8-Nepal-travel3.png";
import travel4 from "./travel/GR8-Nepal-travel4.png";
import travel5 from "./travel/GR8-Nepal-travel5.png";
import travel6 from "./travel/GR8-Nepal-travel6.png";
import PortfolioNav from "./PortfolioNav";

const allProjects = [
  { category: "Banking", image: bank1 },
  { category: "Banking", image: bank2 },
  { category: "Banking", image: bank3 },
  { category: "Banking", image: bank4 },
  { category: "Hotel & Restro", image: hotel1 },
  { category: "Hotel & Restro", image: hotel2 },
  { category: "Medical", image: medical1 },
  { category: "Medical", image: medical2 },
  { category: "Medical", image: medical3 },
  { category: "Medical", image: medical4 },
  { category: "Medical", image: medical5 },
  { category: "Real Estate", image: real1 },
  { category: "Real Estate", image: real2 },
  { category: "Travel", image: travel1 },
  { category: "Travel", image: travel2 },
  { category: "Travel", image: travel3 },
  { category: "Travel", image: travel4 },
  { category: "Travel", image: travel5 },
  { category: "Travel", image: travel6 },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === selectedCategory);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="min-h-screen bg-[#0B1118] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Our Creative <span className="text-blue-500">Portfolio</span>
          </h2> */}
          {/* <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-8" /> */}
          
          <PortfolioNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.category}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 aspect-4/3 cursor-pointer"
                onClick={() => setModalImage(project.image)}
              >
                {/* Image Component */}
                <Image
                  src={project.image}
                  alt={project.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur" // If using local imports, this adds a nice blur-up
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl font-semibold">View Case Study</h3>
                  </div>
                </div>
                
                {/* Centered Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                      <Maximize2 className="text-white w-6 h-6" />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Lightbox Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex justify-center items-center p-4 md:p-10"
            onClick={() => setModalImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setModalImage(null)}
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={modalImage}
                alt="Enlarged portfolio"
                className="w-auto h-auto max-w-full max-h-full rounded-xl shadow-2xl object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

