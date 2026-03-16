import { motion } from "framer-motion";
import { Star, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recipes } from "@/data/recipes";

const popularRecipes = recipes.filter((r) => r.popular);

const PopularRecipes = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Trending Now
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Most popular recipes this week
            </p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.slice(0, 6).map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex gap-4 p-4 rounded-card shadow-card hover:shadow-card-hover bg-background transition-all cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-20 h-20 rounded-card-inner object-cover img-outline flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
                  🔥 Popular
                </span>
                <h3 className="font-display font-semibold text-sm text-foreground truncate">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                    <Clock className="w-3 h-3" /> {recipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                    <Star className="w-3 h-3 fill-primary text-primary" /> {recipe.rating}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                  <Heart className="w-3 h-3 fill-primary text-primary" /> {(recipe.likes / 1000).toFixed(1)}k likes
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;
