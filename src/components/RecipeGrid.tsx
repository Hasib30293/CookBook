import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/data/recipes";

interface RecipeGridProps {
  recipes: Recipe[];
  category: string;
}

const RecipeGrid = ({ recipes, category }: RecipeGridProps) => {
  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {category === "All" ? "All Recipes" : category}
          </h2>
          <Link
            to={category === "All" ? "/recipes" : `/recipes?category=${encodeURIComponent(category)}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {recipes.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeGrid;
