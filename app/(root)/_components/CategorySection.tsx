"use client";
import categories from "@/constants/categories";
import React from "react";

interface CategorySectionProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategorySection({
  selectedCategory,
  onCategoryChange,
}: CategorySectionProps) {
  const handleCategoryClick = (categoryId: string) => {
    console.log("Clicked category id:", categoryId); // Log the category id
    onCategoryChange(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <section>
      <div className="wrapper flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-center mb-6">Categories</h2>
        <div className="w-full flex flex-wrap justify-center gap-4 md:gap-6 xl:gap-10">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryClick(category.value)}
              className={`flex flex-col items-center transition-all duration-300 ${
                selectedCategory === category.value
                  ? "text-blue-500 scale-110"
                  : "text-gray-600 hover:text-blue-400 hover:scale-105"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  selectedCategory === category.value
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                <category.icon className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
