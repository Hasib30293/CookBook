export interface RecipeDetail {
  ingredients: string[];
  instructions: string[];
  nutrition: { label: string; value: string }[];
  youtubeId: string;
  servings: number;
  calories: number;
}

export const recipeDetails: Record<string, RecipeDetail> = {
  "1": {
    ingredients: [
      "400g pork bones", "200g chashu pork belly", "4 portions fresh ramen noodles",
      "4 soft-boiled eggs", "2 sheets nori", "4 tbsp tare sauce",
      "Spring onions, sliced", "Sesame seeds", "Mayu (black garlic oil)",
      "1L chicken stock", "6 cloves garlic", "2 tbsp ginger, sliced"
    ],
    instructions: [
      "Blanch pork bones in boiling water for 10 min, then rinse thoroughly.",
      "Simmer bones with garlic and ginger in fresh water for 6-8 hours until milky white.",
      "Prepare chashu by rolling and tying pork belly, then braise in soy, mirin, and sake for 2 hours.",
      "Make soft-boiled eggs: boil 6.5 min, ice bath, peel, then marinate in tare overnight.",
      "Cook ramen noodles according to package — do not overcook, keep al dente.",
      "Assemble: ladle hot broth into bowls with tare, add noodles, top with chashu, egg, nori, and garnish."
    ],
    nutrition: [
      { label: "Calories", value: "680 kcal" },
      { label: "Protein", value: "42g" },
      { label: "Carbs", value: "58g" },
      { label: "Fat", value: "28g" },
      { label: "Fiber", value: "3g" },
      { label: "Sodium", value: "1200mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 680
  },
  "2": {
    ingredients: [
      "300g sushi-grade salmon", "2 cups sushi rice", "1 avocado, diced",
      "100g edamame, shelled", "2 tbsp soy sauce", "1 tbsp sesame oil",
      "1 tbsp rice vinegar", "Sesame seeds", "Pickled ginger", "Nori strips"
    ],
    instructions: [
      "Cook sushi rice and season with rice vinegar, let cool.",
      "Dice salmon into 1cm cubes and toss with soy sauce and sesame oil.",
      "Prepare toppings: dice avocado, shell edamame, slice spring onions.",
      "Assemble bowls with rice base, arrange salmon and toppings.",
      "Garnish with sesame seeds, pickled ginger, and nori strips."
    ],
    nutrition: [
      { label: "Calories", value: "520 kcal" },
      { label: "Protein", value: "35g" },
      { label: "Carbs", value: "48g" },
      { label: "Fat", value: "22g" },
      { label: "Fiber", value: "6g" },
      { label: "Sodium", value: "680mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 2,
    calories: 520
  },
  "3": {
    ingredients: [
      "4 chicken thighs", "200g panko breadcrumbs", "2 eggs, beaten",
      "100g plain flour", "Japanese curry roux blocks", "2 potatoes, cubed",
      "2 carrots, sliced", "1 onion, diced", "Steamed rice", "Vegetable oil"
    ],
    instructions: [
      "Flatten chicken thighs, season with salt and pepper.",
      "Dredge in flour, dip in egg, coat in panko breadcrumbs.",
      "Deep fry at 170°C for 6-8 minutes until golden and cooked through.",
      "Sauté onion, carrot, and potato in a pot, add water and simmer until soft.",
      "Add curry roux blocks, stir until dissolved and thickened.",
      "Slice katsu, serve over rice, ladle curry sauce on top."
    ],
    nutrition: [
      { label: "Calories", value: "750 kcal" },
      { label: "Protein", value: "38g" },
      { label: "Carbs", value: "72g" },
      { label: "Fat", value: "32g" },
      { label: "Fiber", value: "5g" },
      { label: "Sodium", value: "980mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 750
  },
  "4": {
    ingredients: [
      "1 sourdough baguette", "4 ripe tomatoes", "200g fresh mozzarella",
      "Fresh basil leaves", "2 tbsp extra virgin olive oil",
      "1 clove garlic", "Balsamic glaze", "Sea salt & pepper"
    ],
    instructions: [
      "Slice baguette diagonally, brush with olive oil, and toast until golden.",
      "Rub warm bread with a cut garlic clove.",
      "Dice tomatoes and season with salt, pepper, and olive oil.",
      "Tear mozzarella into pieces, place on toasted bread with tomatoes.",
      "Top with fresh basil and drizzle with balsamic glaze."
    ],
    nutrition: [
      { label: "Calories", value: "280 kcal" },
      { label: "Protein", value: "12g" },
      { label: "Carbs", value: "28g" },
      { label: "Fat", value: "14g" },
      { label: "Fiber", value: "2g" },
      { label: "Sodium", value: "420mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 280
  },
  "5": {
    ingredients: [
      "200g frozen açaí pulp", "1 banana", "100ml almond milk",
      "Granola", "Fresh berries", "Sliced banana",
      "Coconut flakes", "Chia seeds", "Honey or agave"
    ],
    instructions: [
      "Blend frozen açaí pulp with banana and almond milk until thick and smooth.",
      "Pour into a bowl — consistency should be thicker than a smoothie.",
      "Top with granola, fresh berries, sliced banana, and coconut flakes.",
      "Drizzle with honey and sprinkle chia seeds."
    ],
    nutrition: [
      { label: "Calories", value: "380 kcal" },
      { label: "Protein", value: "8g" },
      { label: "Carbs", value: "56g" },
      { label: "Fat", value: "14g" },
      { label: "Fiber", value: "9g" },
      { label: "Sodium", value: "45mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 1,
    calories: 380
  },
  "6": {
    ingredients: [
      "400g spaghetti", "200g guanciale", "4 egg yolks + 2 whole eggs",
      "100g pecorino romano, grated", "50g parmigiano reggiano, grated",
      "Freshly cracked black pepper"
    ],
    instructions: [
      "Cook spaghetti in heavily salted water until al dente.",
      "Cut guanciale into thick strips and render in a cold pan over medium heat until crispy.",
      "Whisk egg yolks, whole eggs, and grated cheeses together in a bowl.",
      "Toss hot pasta into guanciale pan (off heat), then quickly add egg mixture.",
      "Toss vigorously — the residual heat creates a creamy sauce. Add pasta water if needed.",
      "Finish with generous black pepper and extra pecorino."
    ],
    nutrition: [
      { label: "Calories", value: "620 kcal" },
      { label: "Protein", value: "28g" },
      { label: "Carbs", value: "65g" },
      { label: "Fat", value: "26g" },
      { label: "Fiber", value: "2g" },
      { label: "Sodium", value: "850mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 620
  },
  "7": {
    ingredients: [
      "2 cucumbers", "4 tomatoes", "1 red onion", "200g feta cheese",
      "100g Kalamata olives", "1 green bell pepper",
      "3 tbsp extra virgin olive oil", "1 tbsp red wine vinegar",
      "Dried oregano", "Sea salt"
    ],
    instructions: [
      "Chop cucumbers, tomatoes, and bell pepper into chunks.",
      "Slice red onion into thin rings.",
      "Combine vegetables in a large bowl with olives.",
      "Whisk olive oil, red wine vinegar, oregano, and salt for dressing.",
      "Pour dressing over salad, top with a block of feta cheese."
    ],
    nutrition: [
      { label: "Calories", value: "320 kcal" },
      { label: "Protein", value: "10g" },
      { label: "Carbs", value: "18g" },
      { label: "Fat", value: "24g" },
      { label: "Fiber", value: "4g" },
      { label: "Sodium", value: "680mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 320
  },
  "8": {
    ingredients: [
      "200g dark chocolate (70%)", "100g unsalted butter", "2 eggs + 2 egg yolks",
      "60g sugar", "30g plain flour", "Pinch of salt",
      "Vanilla bean ice cream", "Cocoa powder for dusting"
    ],
    instructions: [
      "Preheat oven to 220°C. Grease and flour 4 ramekins.",
      "Melt chocolate and butter together, stir until smooth.",
      "Whisk eggs, yolks, and sugar until pale and thick.",
      "Fold chocolate mixture into egg mixture, then fold in flour and salt.",
      "Divide batter among ramekins and bake for 12-14 minutes.",
      "Let rest 1 minute, invert onto plates, serve with ice cream immediately."
    ],
    nutrition: [
      { label: "Calories", value: "480 kcal" },
      { label: "Protein", value: "8g" },
      { label: "Carbs", value: "38g" },
      { label: "Fat", value: "34g" },
      { label: "Fiber", value: "3g" },
      { label: "Sodium", value: "120mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 480
  },
  "9": {
    ingredients: [
      "400ml coconut milk", "3 tbsp green curry paste", "300g chicken thigh",
      "1 Thai eggplant", "100g bamboo shoots", "Thai basil leaves",
      "2 kaffir lime leaves", "1 tbsp fish sauce", "1 tsp palm sugar",
      "Jasmine rice", "Red chili for garnish"
    ],
    instructions: [
      "Heat thick coconut cream in a wok until oil separates.",
      "Fry green curry paste in the cream for 2 minutes until fragrant.",
      "Add sliced chicken and cook for 3-4 minutes.",
      "Pour in remaining coconut milk, add eggplant and bamboo shoots.",
      "Season with fish sauce and palm sugar, simmer 10 minutes.",
      "Add kaffir lime leaves and Thai basil, serve over jasmine rice."
    ],
    nutrition: [
      { label: "Calories", value: "550 kcal" },
      { label: "Protein", value: "32g" },
      { label: "Carbs", value: "42g" },
      { label: "Fat", value: "28g" },
      { label: "Fiber", value: "4g" },
      { label: "Sodium", value: "920mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 3,
    calories: 550
  },
  "10": {
    ingredients: [
      "500g white fish fillets", "8 small flour tortillas", "1 mango, diced",
      "1 avocado", "Lime crema (sour cream + lime juice)",
      "Fresh cilantro", "Red cabbage, shredded", "1 jalapeño",
      "Lime wedges", "Cumin & chili powder"
    ],
    instructions: [
      "Season fish with cumin, chili powder, salt, and pepper.",
      "Grill or pan-fry fish for 3-4 minutes per side until flaky.",
      "Mix diced mango with cilantro, jalapeño, and lime juice for salsa.",
      "Warm tortillas on a dry pan.",
      "Assemble: shredded cabbage, fish, mango salsa, avocado slices.",
      "Drizzle with lime crema and serve with lime wedges."
    ],
    nutrition: [
      { label: "Calories", value: "420 kcal" },
      { label: "Protein", value: "28g" },
      { label: "Carbs", value: "38g" },
      { label: "Fat", value: "18g" },
      { label: "Fiber", value: "5g" },
      { label: "Sodium", value: "580mg" }
    ],
    youtubeId: "dH0k0PhFm5g",
    servings: 4,
    calories: 420
  }
};
