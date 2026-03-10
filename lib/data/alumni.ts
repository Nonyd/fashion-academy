/**
 * PFA Alumni section – mock data
 * Used across /alumni hub, give, events, news, directory, chapters, transcript.
 */

export type AlumniStat = { label: string; value: string; suffix?: string };

export const alumniStats: AlumniStat[] = [
  { label: "Alumni Worldwide", value: "2400", suffix: "+" },
  { label: "Active Chapters", value: "12" },
  { label: "Total Donated", value: "18500000", suffix: "" },
  { label: "Scholarships Funded", value: "28" },
];

export type ExploreCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: string;
};

export const exploreCards: ExploreCard[] = [
  {
    id: "chapters",
    title: "Chapters",
    description:
      "Find PFA alumni chapters by city, country, and graduation year.",
    href: "/alumni/chapters",
    linkLabel: "Chapters",
    icon: "MapPin",
  },
  {
    id: "directory",
    title: "Alumni Directory",
    description: "Search and connect with fellow PFA graduates worldwide.",
    href: "/alumni/directory",
    linkLabel: "Alumni Directory",
    icon: "Users",
  },
  {
    id: "give",
    title: "Give Back",
    description:
      "Fund scholarships and support the next generation of fashion leaders.",
    href: "/alumni/give",
    linkLabel: "Give",
    icon: "Heart",
  },
  {
    id: "events",
    title: "Events",
    description:
      "Fashion showcases, reunions, networking nights, and masterclasses.",
    href: "/alumni/events",
    linkLabel: "Events",
    icon: "Calendar",
  },
  {
    id: "news",
    title: "News & Stories",
    description:
      "Alumni spotlights, chapter news, impact reports, and career stories.",
    href: "/alumni/news",
    linkLabel: "News & Stories",
    icon: "Newspaper",
  },
  {
    id: "transcript",
    title: "Transcript",
    description: "Request your official PFA academic transcript or certificate copy.",
    href: "/alumni/transcript",
    linkLabel: "Transcript",
    icon: "FileText",
  },
];

export type SpotlightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  badge: string;
  image: string;
};

export const spotlightArticles: SpotlightArticle[] = [
  {
    slug: "adaeze-obi-burberry",
    title:
      "From Lagos to London Fashion Week: Adaeze Obi's Rise at Burberry",
    excerpt:
      "PFA graduate Adaeze shares how her training at Prudential Fashion Academy gave her the foundation to land a design role at one of the world's most iconic fashion houses.",
    source: "Alumni Office",
    date: "15 Jan 2026",
    badge: "Spotlight",
    image: "/images/placeholder-editorial.jpg",
  },
  {
    slug: "chukwuemeka-dike-studio",
    title:
      "Chukwuemeka Dike Launches His Own Label at 26 — PFA Made It Possible",
    excerpt:
      "Three years after graduating from PFA's Fashion Design programme, Chukwuemeka launched DIKE STUDIO to critical acclaim at Lagos Fashion Week.",
    source: "Alumni Office",
    date: "3 Jan 2026",
    badge: "Spotlight",
    image: "/images/placeholder-editorial.jpg",
  },
];

export type AlumniEvent = {
  slug: string;
  title: string;
  dateDay: string;
  dateMonth: string;
  time: string;
  venue: string;
  organiser: string;
  rsvpCurrent: number;
  rsvpCapacity: number;
  price: string;
  priceNumeric: number;
  description?: string;
  bannerImage?: string;
  audience?: string;
  registration?: string;
};

export const upcomingEvents: AlumniEvent[] = [
  {
    slug: "pfa-gala-2026",
    title: "PFA Annual Showcase & Alumni Gala 2026",
    dateDay: "14",
    dateMonth: "Jun",
    time: "7:00 PM",
    venue: "Eko Hotel & Suites, Victoria Island, Lagos",
    organiser: "PFA Alumni Association HQ",
    rsvpCurrent: 112,
    rsvpCapacity: 200,
    price: "₦20,000",
    priceNumeric: 20000,
    description:
      "An evening of fashion, celebration, and reconnection. The annual showcase features graduate collections and honours distinguished alumni.",
    audience: "All PFA Alumni",
    registration: "₦20,000",
  },
  {
    slug: "abuja-networking-2026",
    title: "Abuja Chapter: Fashion Industry Networking Night",
    dateDay: "22",
    dateMonth: "Mar",
    time: "6:00 PM",
    venue: "Transcorp Hilton, Abuja",
    organiser: "Abuja Chapter",
    rsvpCurrent: 45,
    rsvpCapacity: 80,
    price: "Free",
    priceNumeric: 0,
    description:
      "Connect with fashion professionals in the capital. An informal evening of networking and industry insights.",
    audience: "PFA Alumni",
    registration: "Free",
  },
  {
    slug: "global-webinar-2026",
    title: "Global Alumni Webinar: Building a Fashion Brand in 2026",
    dateDay: "5",
    dateMonth: "Apr",
    time: "6:00 PM",
    venue: "Online (Zoom)",
    organiser: "PFA International Chapter",
    rsvpCurrent: 203,
    rsvpCapacity: 500,
    price: "Free",
    priceNumeric: 0,
    description:
      "A live webinar with successful PFA alumni founders sharing practical advice on launching and scaling a fashion brand.",
    audience: "All PFA Alumni",
    registration: "Free",
  },
  {
    slug: "pfa-homecoming-2026",
    title: "PFA Homecoming & Campus Open Day 2026",
    dateDay: "20",
    dateMonth: "Sep",
    time: "10:00 AM",
    venue: "PFA Campus, Lagos",
    organiser: "PFA Alumni Association HQ",
    rsvpCurrent: 89,
    rsvpCapacity: 300,
    price: "₦5,000",
    priceNumeric: 5000,
    description:
      "Return to campus for a day of tours, workshops, and reconnecting with faculty and fellow alumni.",
    audience: "All PFA Alumni & Guests",
    registration: "₦5,000",
  },
];

export type GivingFund = {
  slug: string;
  name: string;
  description: string;
  donors: number;
  raised: number;
  goal: number;
};

export const givingFunds: GivingFund[] = [
  {
    slug: "student-scholarship",
    name: "Student Scholarship Fund",
    description:
      "Sponsor a student's tuition, materials, and studio access at PFA.",
    donors: 89,
    raised: 4200000,
    goal: 8000000,
  },
  {
    slug: "studio-equipment",
    name: "Studio & Equipment Fund",
    description:
      "Help us upgrade our design studios, sewing labs, and digital fashion tools for future students.",
    donors: 54,
    raised: 7800000,
    goal: 25000000,
  },
  {
    slug: "emergency-support",
    name: "Emergency Student Support",
    description:
      "Provide urgent financial assistance for students facing unexpected hardship during their studies.",
    donors: 31,
    raised: 950000,
    goal: 3000000,
  },
  {
    slug: "general-fund",
    name: "General Alumni Fund",
    description:
      "Unrestricted giving — PFA directs your gift where it is needed most.",
    donors: 42,
    raised: 1600000,
    goal: 5000000,
  },
];

export type RecentDonor = {
  name: string;
  classYear?: string;
  amount: string;
  fundSlug?: string;
};

export const recentDonors: RecentDonor[] = [
  { name: "Ngozi A.", classYear: "2022", amount: "₦50,000" },
  { name: "Anonymous", amount: "₦150,000" },
  { name: "Tunde O.", classYear: "2020", amount: "₦25,000" },
  { name: "Blessing M.", classYear: "2023", amount: "₦10,000" },
  { name: "Emeka D.", classYear: "2021", amount: "₦75,000" },
];

export type ArticleCategory =
  | "Spotlight"
  | "Chapter News"
  | "Announcements"
  | "Impact Reports"
  | "Event Recaps";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  author: string;
  date: string;
  dateFormatted: string;
  image: string;
  body: string[];
  pullQuote?: string;
  tagged?: string[];
};

export const allArticles: NewsArticle[] = [
  {
    slug: "adaeze-obi-burberry",
    title:
      "From Lagos to London Fashion Week: Adaeze Obi's Rise at Burberry",
    excerpt:
      "PFA graduate Adaeze shares how her training at Prudential Fashion Academy gave her the foundation to land a design role at one of the world's most iconic fashion houses.",
    category: "Spotlight",
    author: "Alumni Office",
    date: "2026-01-15",
    dateFormatted: "15/01/2026",
    image: "/images/placeholder-editorial.jpg",
    body: [
      "Adaeze Obi never imagined that her journey from Lagos would lead her to the ateliers of Burberry. She credits Prudential Fashion Academy with giving her not only technical skills but the confidence to compete on a global stage.",
      "At PFA, Adaeze specialised in Fashion Design and was consistently top of her cohort. Her final-year collection caught the eye of visiting industry judges, which led to an internship and, eventually, a full-time design role at Burberry.",
      "Today, Adaeze works on seasonal collections and has participated in London Fashion Week. She remains in touch with PFA and has mentored several current students remotely.",
    ],
    pullQuote:
      "PFA taught me that Nigerian design can stand shoulder to shoulder with the best in the world.",
    tagged: ["Adaeze Obi"],
  },
  {
    slug: "chukwuemeka-dike-studio",
    title:
      "Chukwuemeka Dike Launches DIKE STUDIO at Lagos Fashion Week",
    excerpt:
      "Three years after graduating from PFA's Fashion Design programme, Chukwuemeka launched DIKE STUDIO to critical acclaim at Lagos Fashion Week.",
    category: "Spotlight",
    author: "Alumni Office",
    date: "2026-01-03",
    dateFormatted: "03/01/2026",
    image: "/images/placeholder-editorial.jpg",
    body: [
      "Chukwuemeka Dike graduated from PFA in 2023 and wasted no time building his brand. DIKE STUDIO debuted at Lagos Fashion Week with a collection that fused traditional Nigerian textiles with contemporary silhouettes.",
      "The label has since been picked up by select retailers and has been featured in Vogue and other international publications. Chukwuemeka says the business and production modules at PFA were as important as the design training.",
      "He continues to collaborate with PFA on mentorship and has offered internship placements to current students.",
    ],
    pullQuote:
      "PFA gave me the toolkit — design, business, and the confidence to launch.",
    tagged: ["Chukwuemeka Dike"],
  },
  {
    slug: "abuja-mentorship-launch",
    title: "Abuja Chapter Launches Mentorship Programme for Current Students",
    excerpt:
      "The Abuja alumni chapter has officially launched a structured mentorship programme linking graduates with current PFA students in the capital.",
    category: "Chapter News",
    author: "Abuja Chapter",
    date: "2025-12-20",
    dateFormatted: "20/12/2025",
    image: "/images/placeholder-editorial.jpg",
    body: [
      "The Abuja Chapter has rolled out a formal mentorship programme that pairs experienced alumni with current PFA students based on industry and career goals.",
      "Mentors commit to at least four sessions per year, covering portfolio review, industry insights, and career planning. The programme has already attracted over 30 mentors and 50 mentees.",
    ],
    tagged: ["Abuja Chapter"],
  },
  {
    slug: "scholarship-impact-2025",
    title: "2025 Scholarship Impact: 8 Students Funded This Year",
    excerpt:
      "Thanks to alumni and donor support, eight students received full or partial scholarships in 2025, enabling them to complete their programmes at PFA.",
    category: "Impact Reports",
    author: "Alumni Office",
    date: "2025-12-01",
    dateFormatted: "01/12/2025",
    image: "/images/placeholder-editorial.jpg",
    body: [
      "The Student Scholarship Fund supported eight students in 2025 across Fashion Design, Fashion Business, and Styling programmes. Recipients were selected on the basis of need and merit.",
      "Donations from 274+ alumni and friends made this possible. The Academy is committed to expanding scholarship places in 2026.",
    ],
    tagged: [],
  },
];

export const eventDetails: Record<string, AlumniEvent> = Object.fromEntries(
  upcomingEvents.map((e) => [e.slug, e])
);

export type AlumniDirectoryEntry = {
  id: string;
  name: string;
  programme: string;
  classYear: string;
  role: string;
  company: string;
  city: string;
  country: string;
  linkedIn?: string;
  image?: string;
};

export const alumniDirectory: AlumniDirectoryEntry[] = [
  {
    id: "1",
    name: "Adaeze Obi",
    programme: "Fashion Design",
    classYear: "2021",
    role: "Senior Designer",
    company: "Zara Africa",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "2",
    name: "Tunde Adeyemi",
    programme: "Fashion Styling",
    classYear: "2019",
    role: "Stylist",
    company: "MTV Base",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "3",
    name: "Chukwuemeka Dike",
    programme: "Fashion Design",
    classYear: "2023",
    role: "Creative Director",
    company: "DIKE STUDIO",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "4",
    name: "Ngozi Okonkwo",
    programme: "Fashion Business",
    classYear: "2020",
    role: "Fashion Buyer",
    company: "Shoprite",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "5",
    name: "Blessing Eze",
    programme: "Fashion Design",
    classYear: "2022",
    role: "Lecturer",
    company: "Lagos Fashion Institute",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "6",
    name: "Amara Nwosu",
    programme: "Luxury Brand Management",
    classYear: "2021",
    role: "Brand Manager",
    company: "Louis Vuitton",
    city: "London",
    country: "United Kingdom",
    linkedIn: "#",
  },
  {
    id: "7",
    name: "Emeka Okafor",
    programme: "Fashion Design",
    classYear: "2018",
    role: "Design Director",
    company: "Maki Oh",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "8",
    name: "Chioma Okoli",
    programme: "Fashion Styling",
    classYear: "2023",
    role: "Editorial Stylist",
    company: "Freelance",
    city: "Abuja",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "9",
    name: "Ibrahim Musa",
    programme: "Fashion Business",
    classYear: "2020",
    role: "Retail Manager",
    company: "Sabo Fashion Hub",
    city: "Kano",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "10",
    name: "Funke Akindele",
    programme: "Fashion Design",
    classYear: "2019",
    role: "Costume Designer",
    company: "Nollywood",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "11",
    name: "Oluwaseun Adebayo",
    programme: "Fashion Design",
    classYear: "2022",
    role: "Junior Designer",
    company: "Deola Sagoe",
    city: "Lagos",
    country: "Nigeria",
    linkedIn: "#",
  },
  {
    id: "12",
    name: "Zainab Bello",
    programme: "Fashion Styling",
    classYear: "2021",
    role: "Personal Stylist",
    company: "Style by Zee",
    city: "Abuja",
    country: "Nigeria",
    linkedIn: "#",
  },
];

export type Chapter = {
  slug: string;
  name: string;
  location: string;
  members: number;
  president: string;
};

export const chapters: Chapter[] = [
  { slug: "lagos-hq", name: "Lagos Chapter (HQ)", location: "Lagos, Nigeria", members: 680, president: "Adebayo Johnson" },
  { slug: "abuja", name: "Abuja Chapter", location: "Abuja, Nigeria", members: 210, president: "Fatima Bello" },
  { slug: "ph", name: "Port Harcourt Chapter", location: "Port Harcourt, Nigeria", members: 145, president: "Chidi Nwosu" },
  { slug: "enugu", name: "Enugu Chapter", location: "Enugu, Nigeria", members: 98, president: "Nneka Okeke" },
  { slug: "kano", name: "Kano Chapter", location: "Kano, Nigeria", members: 76, president: "Ibrahim Sani" },
  { slug: "uk", name: "UK Chapter (London)", location: "London, UK", members: 134, president: "Amara Nwosu" },
  { slug: "usa", name: "USA Chapter (New York)", location: "New York, USA", members: 89, president: "David Okonkwo" },
  { slug: "canada", name: "Canada Chapter (Toronto)", location: "Toronto, Canada", members: 45, president: "Ngozi Eze" },
  { slug: "ghana", name: "Ghana Chapter (Accra)", location: "Accra, Ghana", members: 62, president: "Kofi Mensah" },
  { slug: "sa", name: "South Africa Chapter (Johannesburg)", location: "Johannesburg, South Africa", members: 71, president: "Thandiwe Dlamini" },
  { slug: "uae", name: "UAE Chapter (Dubai)", location: "Dubai, UAE", members: 53, president: "Omar Hassan" },
  { slug: "virtual", name: "Virtual/International Chapter", location: "Online", members: 688, president: "Alumni Office" },
];

export type TranscriptDeliveryOption = {
  method: string;
  timeframe: string;
  fee: string;
};

export const transcriptDelivery: TranscriptDeliveryOption[] = [
  { method: "Email (PDF, certified)", timeframe: "3–5 working days", fee: "—" },
  { method: "Physical Pickup (Lagos)", timeframe: "5–7 working days", fee: "—" },
  { method: "Courier (Nigeria)", timeframe: "7–10 working days", fee: "₦4,000" },
  { method: "Courier (International)", timeframe: "14–21 working days", fee: "₦20,000" },
];

export const transcriptProcessingFee = 10000;

export const impactStories: Record<string, { title: string; body: string }[]> = {
  "student-scholarship": [
    {
      title: "Aisha's Story",
      body: "Aisha Bello from Kaduna was the first person in her family to pursue fashion professionally. A PFA scholarship covered her full tuition. She graduated with distinction and now designs for a Lagos fashion house.",
    },
    {
      title: "The Okafor Sisters",
      body: "Twins Chisom and Adaora received partial scholarships that allowed them to complete the Fashion Business programme. Both now run their own online fashion brand.",
    },
  ],
  "studio-equipment": [
    {
      title: "New Industrial Machines",
      body: "Donations to the Studio & Equipment Fund allowed us to install 12 new industrial sewing machines in the Lagos campus studio, reducing wait times and improving output quality.",
    },
    {
      title: "Digital Design Lab",
      body: "The digital design lab was upgraded with CLO 3D and Adobe licences, giving students access to the same tools used in global fashion houses.",
    },
  ],
  "emergency-support": [
    {
      title: "Medical Emergency Support",
      body: "When a final-year student faced unexpected medical bills, the Emergency Student Support fund covered her treatment so she could complete her degree on time.",
    },
    {
      title: "Family Crisis Grant",
      body: "A grant from the fund helped a student whose family lost their home to continue studying without interruption.",
    },
  ],
  "general-fund": [
    {
      title: "Where It's Needed Most",
      body: "General Fund gifts have been used for everything from emergency bursaries to guest speaker travel and campus improvements, at the Academy's discretion.",
    },
    {
      title: "Flexibility for the Future",
      body: "Unrestricted giving allows PFA to respond quickly to new opportunities and urgent needs as they arise.",
    },
  ],
};

export const fundDonorsBySlug: Record<string, RecentDonor[]> = {
  "student-scholarship": [
    { name: "Ngozi A.", classYear: "2022", amount: "₦50,000", fundSlug: "student-scholarship" },
    { name: "Blessing M.", classYear: "2023", amount: "₦10,000", fundSlug: "student-scholarship" },
    { name: "Anonymous", amount: "₦25,000", fundSlug: "student-scholarship" },
  ],
  "studio-equipment": [
    { name: "Tunde O.", classYear: "2020", amount: "₦25,000", fundSlug: "studio-equipment" },
    { name: "Emeka D.", classYear: "2021", amount: "₦75,000", fundSlug: "studio-equipment" },
    { name: "Anonymous", amount: "₦150,000", fundSlug: "studio-equipment" },
  ],
  "emergency-support": [
    { name: "Anonymous", amount: "₦50,000", fundSlug: "emergency-support" },
    { name: "Ngozi A.", classYear: "2022", amount: "₦20,000", fundSlug: "emergency-support" },
    { name: "Blessing M.", classYear: "2023", amount: "₦15,000", fundSlug: "emergency-support" },
  ],
  "general-fund": [
    { name: "Emeka D.", classYear: "2021", amount: "₦30,000", fundSlug: "general-fund" },
    { name: "Tunde O.", classYear: "2020", amount: "₦40,000", fundSlug: "general-fund" },
    { name: "Anonymous", amount: "₦100,000", fundSlug: "general-fund" },
  ],
};

export const programmeOptions = [
  "Fashion Design",
  "Fashion Business",
  "Fashion Styling",
  "Luxury Brand Management",
  "Textile Design",
  "Other",
];

export const purposeOptions = [
  "Employment",
  "Further Studies",
  "Professional Licence",
  "Personal Record",
  "Other",
];
