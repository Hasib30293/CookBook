import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft, Clock, Star, ChefHat, Users, Share2, Flame,
  Play, CheckCircle2, UtensilsCrossed
} from "lucide-react";
import { recipes } from "@/data/recipes";
import { recipeDetails } from "@/data/recipeDetails";
import { Button } from "@/components/ui/button";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  const recipe = recipes.find((r) => r.id === id);
  const details = id ? recipeDetails[id] : undefined;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  if (!recipe || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Recipe not found</h1>
          <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: recipe.title, text: recipe.description, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Parallax Hero */}
      <div ref={heroRef} className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: imgY }}
        />
        <motion.div
          className="absolute inset-0 bg-foreground"
          style={{ opacity: overlayOpacity }}
        />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="rounded-full bg-background/80 backdrop-blur-sm border-none"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {recipe.popular && (
              <span className="inline-block bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-3">
                🔥 Popular
              </span>
            )}
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight mb-3">
              {recipe.title}
            </h1>
            <p className="text-primary-foreground/80 text-base lg:text-lg max-w-xl">
              {recipe.description}
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { icon: Clock, label: recipe.prepTime },
                { icon: Star, label: `${recipe.rating} (${recipe.reviews.toLocaleString()})` },
                { icon: ChefHat, label: recipe.difficulty },
                { icon: Users, label: `${details.servings} servings` },
                { icon: Flame, label: `${details.calories} kcal` },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-1.5 bg-background/20 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <item.icon className="w-3.5 h-3.5" /> {item.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Ingredients + Nutrition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Ingredients */}
            <div className="bg-card rounded-card shadow-card p-6">
              <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" /> Ingredients
              </h2>
              <ul className="space-y-2.5">
                {details.ingredients.map((ing, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </span>
                    {ing}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Nutrition */}
            <div className="bg-card rounded-card shadow-card p-6">
              <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" /> Nutrition
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {details.nutrition.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="bg-secondary/50 rounded-card-inner p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">{n.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{n.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Instructions + Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Instructions */}
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Instructions
              </h2>
              <div className="space-y-4">
                {details.instructions.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm text-foreground leading-relaxed">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* YouTube Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" /> Video Tutorial
              </h2>
              <div className="relative aspect-video rounded-card overflow-hidden shadow-card bg-secondary">
                <iframe
                  src={`https://www.youtube.com/embed/${details.youtubeId}`}
                  title={`${recipe.title} video tutorial`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Author & Share */}
            <div className="flex items-center justify-between bg-card rounded-card shadow-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{recipe.authorAvatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{recipe.author}</p>
                  <p className="text-xs text-muted-foreground">Recipe Creator</p>
                </div>
              </div>
              <Button onClick={handleShare} className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" /> Share Recipe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
