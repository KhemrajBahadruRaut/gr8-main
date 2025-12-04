import React from "react";

const categories = ["All", "Banking", "Hotel & Restro", "Medical", "Real Estate", "Travel"];

const PortfolioNav = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            selectedCategory === category
              ? "bg-linear-to-r from-[#B64546] to-[#F2D08A] hover:from-[#F2D08A] hover:to-[#B64546]  text-white"
              : "bg-white text-gray-700  hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default PortfolioNav;
