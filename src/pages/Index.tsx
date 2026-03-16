import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SearchFilter from "@/components/SearchFilter";
import RecipeGrid from "@/components/RecipeGrid";
import PopularRecipes from "@/components/PopularRecipes";
import ShareRecipeSection from "@/components/ShareRecipeSection";
import CreatorsSection from "@/components/CreatorsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { recipes } from "@/data/recipes";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const filteredRecipes =
    activeCategory === "All"
      ? recipes
      : recipes.filter(
          (r) =>
            r.category === activeCategory ||
            r.tags?.includes(activeCategory)
        );

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SearchFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <RecipeGrid recipes={filteredRecipes} category={activeCategory} />
      <PopularRecipes />
      <ShareRecipeSection />
      <CreatorsSection />
      <Newsletter />
      <Footer />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-card hover:opacity-90 transition-opacity z-40"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Index;
