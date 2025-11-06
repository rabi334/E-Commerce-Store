import React from "react";

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="flex gap-4 py-4 overflow-x-auto">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          className={`sm:px-1 text-[12px] md:px-2  py-0 sm:py-2 rounded ${
            selectedCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
