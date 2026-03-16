import heroRamen from "@/assets/hero-ramen.jpg";
import recipePoke from "@/assets/recipe-poke.jpg";
import recipeKatsu from "@/assets/recipe-katsu.jpg";
import recipeBruschetta from "@/assets/recipe-bruschetta.jpg";
import recipeAcai from "@/assets/recipe-acai.jpg";
import recipeCarbonara from "@/assets/recipe-carbonara.jpg";
import recipeGreekSalad from "@/assets/recipe-greek-salad.jpg";
import recipeLavaCake from "@/assets/recipe-lava-cake.jpg";
import recipeThaiCurry from "@/assets/recipe-thai-curry.jpg";
import recipeTacos from "@/assets/recipe-tacos.jpg";

export const images = {
  heroRamen,
  recipePoke,
  recipeKatsu,
  recipeBruschetta,
  recipeAcai,
  recipeCarbonara,
  recipeGreekSalad,
  recipeLavaCake,
  recipeThaiCurry,
  recipeTacos,
};

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorAvatar: string;
  prepTime: string;
  rating: number;
  reviews: number;
  likes: number;
  difficulty: string;
  category: string;
  popular?: boolean;
  tags?: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Tonkotsu Ramen",
    description: "Rich, creamy pork bone broth with handmade noodles and chashu",
    image: heroRamen,
    author: "Chef Tanaka",
    authorAvatar: "CT",
    prepTime: "45 min",
    rating: 4.9,
    reviews: 2847,
    likes: 12400,
    difficulty: "Medium",
    category: "Dinner",
    popular: true,
    tags: ["Japanese", "Soup"],
  },
  {
    id: "2",
    title: "Salmon Poke Bowl",
    description: "Fresh salmon with avocado, edamame and sesame rice",
    image: recipePoke,
    author: "Mia Chen",
    authorAvatar: "MC",
    prepTime: "15 min",
    rating: 4.8,
    reviews: 1243,
    likes: 8900,
    difficulty: "Easy",
    category: "Lunch",
    popular: true,
    tags: ["Healthy", "Quick & Easy"],
  },
  {
    id: "3",
    title: "Chicken Katsu Curry",
    description: "Crispy panko chicken with rich Japanese curry sauce",
    image: recipeKatsu,
    author: "Kenji Yamada",
    authorAvatar: "KY",
    prepTime: "35 min",
    rating: 4.7,
    reviews: 986,
    likes: 6700,
    difficulty: "Medium",
    category: "Dinner",
    popular: true,
  },
  {
    id: "4",
    title: "Caprese Bruschetta",
    description: "Toasted sourdough with fresh tomatoes, mozzarella and basil",
    image: recipeBruschetta,
    author: "Sofia Romano",
    authorAvatar: "SR",
    prepTime: "10 min",
    rating: 4.6,
    reviews: 754,
    likes: 5200,
    difficulty: "Easy",
    category: "Appetizers",
    tags: ["Italian", "Quick & Easy"],
  },
  {
    id: "5",
    title: "Açaí Power Bowl",
    description: "Antioxidant-rich açaí blended with banana and topped with granola",
    image: recipeAcai,
    author: "Luna Verde",
    authorAvatar: "LV",
    prepTime: "10 min",
    rating: 4.8,
    reviews: 1567,
    likes: 9300,
    difficulty: "Easy",
    category: "Breakfast",
    popular: true,
    tags: ["Healthy", "Vegan"],
  },
  {
    id: "6",
    title: "Spaghetti Carbonara",
    description: "Authentic Roman carbonara with guanciale and pecorino",
    image: recipeCarbonara,
    author: "Marco Bianchi",
    authorAvatar: "MB",
    prepTime: "20 min",
    rating: 4.9,
    reviews: 3102,
    likes: 15600,
    difficulty: "Medium",
    category: "Dinner",
    popular: true,
  },
  {
    id: "7",
    title: "Mediterranean Salad",
    description: "Crisp vegetables with feta, olives and herb vinaigrette",
    image: recipeGreekSalad,
    author: "Elena Papadopoulos",
    authorAvatar: "EP",
    prepTime: "10 min",
    rating: 4.5,
    reviews: 612,
    likes: 4100,
    difficulty: "Easy",
    category: "Salads",
    tags: ["Healthy", "Gluten-Free"],
  },
  {
    id: "8",
    title: "Molten Chocolate Cake",
    description: "Decadent chocolate lava cake with vanilla bean ice cream",
    image: recipeLavaCake,
    author: "Amélie Dupont",
    authorAvatar: "AD",
    prepTime: "25 min",
    rating: 4.8,
    reviews: 1890,
    likes: 11200,
    difficulty: "Medium",
    category: "Desserts",
    popular: true,
  },
  {
    id: "9",
    title: "Thai Green Curry",
    description: "Fragrant coconut curry with Thai basil and jasmine rice",
    image: recipeThaiCurry,
    author: "Siri Phan",
    authorAvatar: "SP",
    prepTime: "30 min",
    rating: 4.7,
    reviews: 1045,
    likes: 7800,
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    id: "10",
    title: "Baja Fish Tacos",
    description: "Grilled fish with mango salsa, lime crema and fresh cilantro",
    image: recipeTacos,
    author: "Carlos Mendez",
    authorAvatar: "CM",
    prepTime: "20 min",
    rating: 4.6,
    reviews: 823,
    likes: 5900,
    difficulty: "Easy",
    category: "Lunch",
    tags: ["Quick & Easy"],
  },
];

export const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Appetizers",
  "Salads",
  "Soups",
  "Quick & Easy",
  "Healthy",
  "Vegan",
  "Gluten-Free",
];

export const categoryCards = [
  { name: "Breakfast", count: 86, color: "hsl(40, 90%, 65%)" },
  { name: "Lunch", count: 124, color: "hsl(24, 90%, 60%)" },
  { name: "Dinner", count: 203, color: "hsl(0, 70%, 55%)" },
  { name: "Desserts", count: 97, color: "hsl(330, 60%, 55%)" },
  { name: "Healthy", count: 156, color: "hsl(142, 70%, 35%)" },
  { name: "Quick & Easy", count: 178, color: "hsl(24, 80%, 50%)" },
];

export const creators = [
  {
    name: "Chef Tanaka",
    avatar: "CT",
    followers: "24.5k",
    topRecipe: "Classic Tonkotsu Ramen",
    topRecipeImage: heroRamen,
  },
  {
    name: "Amélie Dupont",
    avatar: "AD",
    followers: "18.2k",
    topRecipe: "Molten Chocolate Cake",
    topRecipeImage: recipeLavaCake,
  },
  {
    name: "Marco Bianchi",
    avatar: "MB",
    followers: "31.7k",
    topRecipe: "Spaghetti Carbonara",
    topRecipeImage: recipeCarbonara,
  },
  {
    name: "Luna Verde",
    avatar: "LV",
    followers: "15.9k",
    topRecipe: "Açaí Power Bowl",
    topRecipeImage: recipeAcai,
  },
];
