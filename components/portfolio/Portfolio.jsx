"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // ✅ IMPORTANT FIX

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

export default function Portfolio  ()  {
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
    <div className="bg-[#101820] pt-25">
      <div className="max-w-6xl mx-auto px-4">
        <PortfolioNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setModalImage(project.image)}
            >
              {/* 🔥 FIX: Next.js Image with caching disabled */}
              <Image
                src={project.image}
                alt={project.category}
                unoptimized
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
          onClick={() => setModalImage(null)}
        >
          <div
            className="max-w-3xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImage}
              alt="Enlarged portfolio"
              unoptimized
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      <footer className="py-6 mt-12">
        <p className="text-gray-500 mb-2 md:mb-0 text-center">
          © {new Date().getFullYear()} All Rights Reserved. G R Eight Private
          Limited
        </p>
      </footer>
    </div>
  );
};

