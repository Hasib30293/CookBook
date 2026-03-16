import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/data/recipes";

interface SearchFilterProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const SearchFilter = ({ activeCategory, onCategoryChange }: SearchFilterProps) => {
  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8 space-y-6">
        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for recipes, ingredients, or cuisines..."
            className="w-full h-14 pl-12 pr-14 rounded-full bg-background shadow-card border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors"
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
