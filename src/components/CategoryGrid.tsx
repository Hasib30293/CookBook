import { motion } from "framer-motion";
import { categoryCards } from "@/data/recipes";

const CategoryGrid = () => {
  return (
    <section className="py-12 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Explore by Category
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Find exactly what you're craving
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCards.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative rounded-card overflow-hidden cursor-pointer aspect-square shadow-card hover:shadow-card-hover transition-all"
              style={{ backgroundColor: cat.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display font-semibold text-sm text-primary-foreground">
                  {cat.name}
                </h3>
                <p className="text-xs text-primary-foreground/80 tabular-nums">
                  {cat.count} recipes
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
