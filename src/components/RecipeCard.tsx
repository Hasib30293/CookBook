import { motion } from "framer-motion";
import { Star, Clock, Bookmark, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 bg-background overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover img-outline transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {recipe.popular && (
          <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
            🔥 Popular
          </span>
        )}
        {recipe.tags?.includes("Healthy") && (
          <span className="absolute top-3 right-3 bg-accent/90 text-accent-foreground text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
            Healthy
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Bookmark className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-base text-foreground leading-tight">
          {recipe.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {recipe.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 pt-1">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-[10px] font-semibold text-secondary-foreground">
              {recipe.authorAvatar}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{recipe.author}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
            <Clock className="w-3.5 h-3.5" />
            {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            {recipe.rating}
            <span className="text-muted-foreground">({recipe.reviews.toLocaleString()})</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
