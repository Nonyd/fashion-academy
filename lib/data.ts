export type Program = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  mode: string;
  imageUrl: string;
};

export type Faculty = {
  id: string;
  name: string;
  title: string;
  formerBrand: string;
  imageUrl: string;
};

export type PortfolioItem = {
  id: string;
  imageUrl: string;
  title: string;
  studentName: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  country: string;
  program: string;
  year: string;
  imageUrl: string;
};

export type PressLogo = {
  id: string;
  name: string;
  imageUrl: string;
};

export type Event = {
  id: string;
  dateLabel: string;
  title: string;
  location: string;
  type: "Workshop" | "Runway" | "Masterclass";
};

export const programs: Program[] = [
  {
    id: "fashion-design",
    name: "Fashion Design",
    category: "Design",
    description: "From sketch to runway, craft collections with narrative depth.",
    duration: "24 months",
    mode: "Milan · On-campus",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "styling-art-direction",
    name: "Styling & Art Direction",
    category: "Creative Direction",
    description: "Build visual worlds for editorials, campaigns, and red carpets.",
    duration: "12 months",
    mode: "New York · Hybrid",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "fashion-business",
    name: "Fashion Business & Luxury Management",
    category: "Business",
    description: "Lead global maisons with a balance of intuition and analytics.",
    duration: "18 months",
    mode: "Online Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "textile-design",
    name: "Textile Design",
    category: "Craft",
    description: "Experiment with fibers, surfaces, and sustainable material futures.",
    duration: "12 months",
    mode: "Lagos · On-campus",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "fashion-photography",
    name: "Fashion Photography",
    category: "Image Making",
    description: "Capture movement, texture, and attitude for modern fashion stories.",
    duration: "12 months",
    mode: "New York · On-campus",
    imageUrl:
      "https://images.unsplash.com/photo-1498550744921-75f79806b8a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "fashion-technology-ai",
    name: "Fashion Technology & AI",
    category: "Innovation",
    description: "Prototype the future with digital ateliers, 3D, and generative tools.",
    duration: "9 months",
    mode: "Online · Live",
    imageUrl:
      "https://images.unsplash.com/photo-1515721189418-81dbcf10d466?auto=format&fit=crop&w=900&q=80",
  },
];

export const faculty: Faculty[] = [
  {
    id: "elena-rossi",
    name: "Elena Rossi",
    title: "Chair of Fashion Design",
    formerBrand: "Former Creative Director, Valentino",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "marcus-adeoye",
    name: "Marcus Adeoye",
    title: "Professor of Textile Futures",
    formerBrand: "Textile Innovation Lead, Stella McCartney",
    imageUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "isabelle-chen",
    name: "Isabelle Chen",
    title: "Director of Fashion Imaging",
    formerBrand: "Global Campaigns, Dior Parfums",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rafael-moretti",
    name: "Rafael Moretti",
    title: "Head of Luxury Strategy",
    formerBrand: "Strategy Director, Gucci",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "look-1",
    title: "Midnight Architecture",
    studentName: "Chiara B.",
    imageUrl:
      "https://images.unsplash.com/photo-1521572289352-7da4a51d6000?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-2",
    title: "Liquid Gold Tailoring",
    studentName: "Noah K.",
    imageUrl:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-3",
    title: "Soft Armor Collection",
    studentName: "Amaka O.",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-4",
    title: "Chromatic Studio",
    studentName: "Leo V.",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-5",
    title: "Urban Rituals",
    studentName: "Aya M.",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786150-5baf2a2b2b36?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-6",
    title: "New Volume",
    studentName: "Jonas P.",
    imageUrl:
      "https://images.unsplash.com/photo-1496309732348-3627f3f040ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-7",
    title: "Ivory Noise",
    studentName: "Lina S.",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-8",
    title: "Runway Reverie",
    studentName: "Mateo R.",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "The academy turned my sketches into a collection that walked at Milan Fashion Week. The mentorship felt like being in a real atelier every single day.",
    name: "Sofia Martinez",
    country: "🇪🇸 Spain",
    program: "Fashion Design, Class of 2024",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "testimonial-2",
    quote:
      "I now lead digital innovation for a global maison. The Fashion Technology & AI program gave me the language to speak both couture and code.",
    name: "Daniel Obasi",
    country: "🇳🇬 Nigeria",
    program: "Fashion Technology & AI, Class of 2023",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "testimonial-3",
    quote:
      "The business curriculum is deeply rooted in the realities of luxury today—global, digital, and conscious. Every case study felt ripped from tomorrow&apos;s headlines.",
    name: "Amélie Laurent",
    country: "🇫🇷 France",
    program: "Luxury Management, Class of 2022",
    year: "2022",
    imageUrl:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?auto=format&fit=crop&w=600&q=80",
  },
];

export const pressLogos: PressLogo[] = [
  {
    id: "vogue",
    name: "Vogue",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Vogue_logo.svg",
  },
  {
    id: "wwd",
    name: "WWD",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/WWD_logo.svg",
  },
  {
    id: "bof",
    name: "Business of Fashion",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Business_of_Fashion_logo.png",
  },
  {
    id: "elle",
    name: "Elle",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/ELLE_logo.svg",
  },
  {
    id: "harpers",
    name: "Harper's Bazaar",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2d/Harper%27s_BAZAAR_logo.svg",
  },
];

export const events: Event[] = [
  {
    id: "open-day",
    dateLabel: "APR 12",
    title: "Virtual Open Day: Inside the Atelier",
    location: "Online · Live Studio",
    type: "Workshop",
  },
  {
    id: "runway-show",
    dateLabel: "MAY 28",
    title: "Annual Graduate Runway Show",
    location: "Milan · Teatro Nuovo",
    type: "Runway",
  },
  {
    id: "guest-lecture",
    dateLabel: "JUN 15",
    title: "Masterclass: Storytelling for Luxury Brands",
    location: "New York · SoHo Campus",
    type: "Masterclass",
  },
];

