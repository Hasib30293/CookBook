import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilter from "@/components/SearchFilter";
import RecipeGrid from "@/components/RecipeGrid";
import { recipes } from "@/data/recipes";

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("category") ?? "All";
  const [activeCategory, setActiveCategory] = useState(initial);

  useEffect(() => {
    document.title = "All Recipes · FlavorShare";
  }, []);

  useEffect(() => {
    if (activeCategory === "All") setSearchParams({});
    else setSearchParams({ category: activeCategory });
  }, [activeCategory, setSearchParams]);

  const filtered =
    activeCategory === "All"
      ? recipes
      : recipes.filter(
          (r) => r.category === activeCategory || r.tags?.includes(activeCategory),
        );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            All Recipes
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse our full collection of community recipes.
          </p>
        </div>
        <SearchFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <RecipeGrid recipes={filtered} category={activeCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;
