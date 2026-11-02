import coffee from "@/assets/work-coffee.jpg";
import fashion from "@/assets/work-fashion.jpg";
import skincare from "@/assets/work-skincare.jpg";
import food from "@/assets/work-food.jpg";

// All projects below are fictional CONCEPT projects for demonstration.
// Replace with real portfolio entries when available — add an object to this array.
export type Category = "Social Media" | "Content Creation" | "Branding" | "Advertising";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  categories: Category[];
  services: string[];
  short: string;
  overview: string;
  objectives: string[];
  direction: string;
  image: string;
  width: number;
  height: number;
  gallery: string[];
  results?: string; // only fill with verified data
  concept: boolean;
};

export const CATEGORIES: ("All Projects" | Category)[] = [
  "All Projects",
  "Social Media",
  "Content Creation",
  "Branding",
  "Advertising",
];

export const PROJECTS: Project[] = [
  {
    slug: "pilot-coffee",
    name: "Pilot Coffee Roasters",
    industry: "Café & Coffee",
    categories: ["Social Media", "Content Creation"],
    services: ["Social Media Management", "Content Creation"],
    short: "A sunny, sippable Instagram feed for a neighbourhood roaster.",
    overview: "A concept social presence for a fictional specialty coffee brand, built around warm light, bold orange and daily rituals.",
    objectives: ["Give the feed a recognisable look", "Turn regulars into a community", "Plan a consistent monthly rhythm"],
    direction: "Hard daylight shadows, flat-lays and a strict orange-and-cream palette so every post feels like the same morning.",
    image: coffee, width: 1200, height: 912,
    gallery: [coffee, food],
    concept: true,
  },
  {
    slug: "kick-streetwear",
    name: "KICK Streetwear",
    industry: "Fashion",
    categories: ["Content Creation", "Advertising"],
    services: ["Content Creation", "Paid Advertising"],
    short: "Loud colour, louder attitude — a launch shoot for a youth label.",
    overview: "A concept content shoot and launch campaign for a fictional streetwear label speaking to a young, playful audience.",
    objectives: ["Launch a new collection", "Create scroll-stopping reels", "Build ad creatives for Meta"],
    direction: "Primary-colour walls, movement and personality-first poses. Less catalogue, more character.",
    image: fashion, width: 912, height: 1200,
    gallery: [fashion, coffee],
    concept: true,
  },
  {
    slug: "aurelia-skin",
    name: "Aurelia Skin",
    industry: "Beauty & Skincare",
    categories: ["Branding"],
    services: ["Brand Development", "Content Creation"],
    short: "A calm, confident identity for a small-batch skincare line.",
    overview: "A concept brand direction for a fictional skincare company: packaging, product photography and social templates.",
    objectives: ["Define a premium visual identity", "Keep packaging and social consistent", "Create reusable templates"],
    direction: "Minimal type, one signature orange and moody studio light against black.",
    image: skincare, width: 1200, height: 912,
    gallery: [skincare, fashion],
    concept: true,
  },
  {
    slug: "street-food-co",
    name: "Street Food Co.",
    industry: "Restaurant",
    categories: ["Advertising", "Social Media"],
    services: ["Paid Advertising", "Social Media Strategy"],
    short: "Big flavour, bolder bites — reel-first ads for a burger joint.",
    overview: "A concept paid campaign for a fictional fast-casual restaurant, designed for vertical video first.",
    objectives: ["Drive local awareness", "Test reel-first ad formats", "Plan an always-on content strategy"],
    direction: "Punchy colour, close-up food and short hooks that work with the sound off.",
    image: food, width: 912, height: 1200,
    gallery: [food, skincare],
    concept: true,
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
