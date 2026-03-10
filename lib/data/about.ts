export type SidebarLink = { label: string; href: string };

export const SIDEBAR_OVERVIEW: SidebarLink[] = [
  { label: "About the Academy", href: "/about/overview" },
  { label: "PFA History", href: "/about/history" },
  { label: "The Founder & Director", href: "/about/founder" },
  { label: "The Academic Director", href: "/about/academic-director" },
  { label: "Principal Officers", href: "/about/principal-officers" },
  { label: "Management Team", href: "/about/management-team" },
  { label: "Faculty & Instructors", href: "/about/faculty-instructors" },
  { label: "Academy Vision & Mission", href: "/about/vision-mission" },
  { label: "Awards & Recognition", href: "/about/awards-recognition" },
  { label: "Contact Us", href: "/about/contact-us" },
];

export const SIDEBAR_OPERATIONS: SidebarLink[] = [
  { label: "Design Library & Resources", href: "/about/design-library" },
  { label: "Fashion Bookshop", href: "/about/fashion-bookshop" },
  { label: "Business & Admin Centre", href: "/about/business-centre" },
  { label: "Student Fashion Hub", href: "/about/student-fashion-hub" },
  { label: "Student Wellness Centre", href: "/about/wellness-centre" },
  { label: "Financial Services", href: "/about/financial-services" },
  { label: "International Partnerships", href: "/about/international-office" },
  { label: "Brand & Media Affairs", href: "/about/brand-media-affairs" },
];

export type PersonCard = {
  id: string;
  name: string;
  title: string;
  department?: string;
  imageUrl: string;
  profileHref?: string;
  phone?: string;
  email?: string;
};

export const PRINCIPAL_OFFICERS: PersonCard[] = [
  {
    id: "founder",
    name: "Prudent Gabriel Peterson",
    title: "Founder & Director",
    department: "Leadership",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    profileHref: "/about/founder",
  },
  {
    id: "academic-dir",
    name: "Dr. Amara Okonkwo",
    title: "Academic Director",
    department: "Academic Affairs",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    profileHref: "/about/academic-director",
  },
  {
    id: "head-admissions",
    name: "Chidi Nwosu",
    title: "Head of Admissions",
    department: "Admissions",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "registrar",
    name: "Folake Adeyemi",
    title: "Registrar",
    department: "Registry",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "head-finance",
    name: "Ibrahim Musa",
    title: "Head of Finance",
    department: "Finance",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "head-student-affairs",
    name: "Ngozi Eze",
    title: "Head of Student Affairs",
    department: "Student Affairs",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export const MANAGEMENT_TEAM: PersonCard[] = [
  {
    id: "mgmt-1",
    name: "Tunde Bakare",
    title: "Operations Manager",
    department: "Operations",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mgmt-2",
    name: "Amina Bello",
    title: "Programme Coordinator",
    department: "Programmes",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mgmt-3",
    name: "Emeka Okafor",
    title: "Studio & Facilities Manager",
    department: "Facilities",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "mgmt-4",
    name: "Chioma Ibe",
    title: "HR & Admin Lead",
    department: "Human Resources",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
];

export type FacultyMember = PersonCard & { specialization?: string; tag?: string };

export const FACULTY_INSTRUCTORS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Prudent Gabriel Peterson",
    title: "Lead Instructor, Fashion Design",
    tag: "Fashion Design",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    profileHref: "/about/founder",
  },
  {
    id: "fac-2",
    name: "Dr. Amara Okonkwo",
    title: "Academic Director & Theory",
    tag: "Business",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    profileHref: "/about/academic-director",
  },
  {
    id: "fac-3",
    name: "Kemi Adetiba",
    title: "Senior Instructor, Styling",
    tag: "Styling",
    imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fac-4",
    name: "David Osei",
    title: "Fashion Photography Lead",
    tag: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fac-5",
    name: "Blessing Eze",
    title: "Textile & Craft Instructor",
    tag: "Fashion Design",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fac-6",
    name: "Tobi Adeyemi",
    title: "Digital & Tech Instructor",
    tag: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fac-7",
    name: "Zainab Yusuf",
    title: "Fashion Business Lecturer",
    tag: "Business",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fac-8",
    name: "Chukwuemeka Nwankwo",
    title: "Pattern & Construction",
    tag: "Fashion Design",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

export type CoreValue = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: "creativity",
    name: "Creativity",
    description: "We nurture original thinking and bold expression in every student.",
    icon: "Palette",
  },
  {
    id: "excellence",
    name: "Excellence",
    description: "We set high standards in craft, pedagogy, and industry practice.",
    icon: "Award",
  },
  {
    id: "integrity",
    name: "Integrity",
    description: "We act with honesty and accountability in all we do.",
    icon: "Shield",
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "We embrace new tools and ideas to shape the future of fashion.",
    icon: "Lightbulb",
  },
  {
    id: "global-mindset",
    name: "Global Mindset",
    description: "We prepare students to lead in a connected, international industry.",
    icon: "Globe",
  },
  {
    id: "community",
    name: "Community",
    description: "We build a supportive network of creatives and industry partners.",
    icon: "Users",
  },
];

export type AwardItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const AWARDS_MILESTONES: AwardItem[] = [
  { id: "a1", year: "2024", title: "Best Fashion Education Provider", description: "Lagos Fashion Week Education Award." },
  { id: "a2", year: "2023", title: "Accreditation", description: "Recognised by the National Board for Technical Education." },
  { id: "a3", year: "2022", title: "Industry Partnership Award", description: "For collaboration with leading fashion houses." },
  { id: "a4", year: "2021", title: "Graduate Employability", description: "Top 3 in graduate placement in Nigerian fashion schools." },
  { id: "a5", year: "2020", title: "Academy Founded", description: "Prudential Fashion Academy established in Lagos." },
];

export type DepartmentContact = {
  name: string;
  email: string;
};

export const DEPARTMENT_CONTACTS: DepartmentContact[] = [
  { name: "Admissions", email: "admissions@prudentialfashionacademy.com" },
  { name: "Academic Affairs", email: "academic@prudentialfashionacademy.com" },
  { name: "Finance", email: "finance@prudentialfashionacademy.com" },
  { name: "Student Affairs", email: "studentaffairs@prudentialfashionacademy.com" },
  { name: "ICT Support", email: "ict@prudentialfashionacademy.com" },
  { name: "Registrar", email: "registrar@prudentialfashionacademy.com" },
];

export type OperationsUnit = {
  id: string;
  slug: string;
  name: string;
  aboutParagraph: string;
  imageUrl: string;
  services: { title: string; description: string }[];
  hours: { days: string; hours: string }[];
  location: string;
  head: PersonCard;
};

export const OPERATIONS_UNITS: OperationsUnit[] = [
  {
    id: "design-library",
    slug: "design-library",
    name: "Design Library & Resources",
    aboutParagraph: "Our Design Library houses an extensive collection of fashion publications, pattern archives, and digital resources to support research and creativity.",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Reference & lending", description: "Borrow books, lookbooks, and magazines for coursework and inspiration." },
      { title: "Digital archives", description: "Access online databases and trend reports." },
      { title: "Quiet study & research", description: "Dedicated spaces for individual and group research." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Ground floor, Main building, Egbeda campus.",
    head: {
      id: "lib-head",
      name: "Mrs. Funke Adebayo",
      title: "Head, Design Library",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0001",
      email: "library@prudentialfashionacademy.com",
    },
  },
  {
    id: "fashion-bookshop",
    slug: "fashion-bookshop",
    name: "Fashion Bookshop",
    aboutParagraph: "The on-campus Fashion Bookshop stocks textbooks, pattern papers, fabrics, and design supplies at student-friendly rates.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Textbooks & materials", description: "Core and recommended reading plus sewing and drafting supplies." },
      { title: "Fabric & haberdashery", description: "Curated fabrics and notions for projects." },
      { title: "Orders & reservations", description: "Place orders for items not in stock." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "9:00 AM – 5:00 PM" },
      { days: "Saturday", hours: "10:00 AM – 1:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Adjacent to Design Library, Egbeda campus.",
    head: {
      id: "bookshop-head",
      name: "Mr. Adewale Johnson",
      title: "Bookshop Manager",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0002",
      email: "bookshop@prudentialfashionacademy.com",
    },
  },
  {
    id: "business-centre",
    slug: "business-centre",
    name: "Business & Admin Centre",
    aboutParagraph: "The Business & Admin Centre handles general administration, enquiries, and front-desk services for students and visitors.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "General enquiries", description: "First point of contact for all academy-related questions." },
      { title: "Document collection", description: "Submit and collect official documents and letters." },
      { title: "Appointments", description: "Book appointments with departments and officers." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "8:00 AM – 5:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 12:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Reception, Main building, all campuses.",
    head: {
      id: "admin-head",
      name: "Ms. Tope Oluwaseun",
      title: "Admin Manager",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0003",
      email: "admin@prudentialfashionacademy.com",
    },
  },
  {
    id: "student-fashion-hub",
    slug: "student-fashion-hub",
    name: "Student Fashion Hub",
    aboutParagraph: "The Student Fashion Hub is a collaborative space for design work, critiques, and peer support, with workstations and display areas.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Workstations", description: "Dedicated desks and power for laptops and small-scale work." },
      { title: "Critique & display", description: "Space for pin-ups and group critiques." },
      { title: "Events & workshops", description: "Host student-led events and guest workshops." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "7:00 AM – 8:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "First floor, Main building, all campuses.",
    head: {
      id: "hub-head",
      name: "Mr. Emeka Okafor",
      title: "Hub Coordinator",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0004",
      email: "studenthub@prudentialfashionacademy.com",
    },
  },
  {
    id: "wellness-centre",
    slug: "wellness-centre",
    name: "Student Wellness Centre",
    aboutParagraph: "The Wellness Centre provides counselling, health information, and a quiet space for students to prioritise mental and physical wellbeing.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Counselling", description: "Confidential one-on-one and group sessions." },
      { title: "Health information", description: "Resources and signposting for health and wellbeing." },
      { title: "Quiet room", description: "A calm space for rest and reflection." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "9:00 AM – 4:00 PM" },
      { days: "Saturday", hours: "By appointment" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Second floor, Main building, Egbeda campus.",
    head: {
      id: "wellness-head",
      name: "Dr. Nneka Okoli",
      title: "Wellness Coordinator",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0005",
      email: "wellness@prudentialfashionacademy.com",
    },
  },
  {
    id: "financial-services",
    slug: "financial-services",
    name: "Financial Services",
    aboutParagraph: "Financial Services handles fees, payments, scholarships, and payment plans for students and applicants.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Fees & payments", description: "Tuition, materials, and other fee payments." },
      { title: "Payment plans", description: "Structured instalment options." },
      { title: "Scholarships & bursaries", description: "Information and application support." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "8:00 AM – 4:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 12:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Ground floor, Admin block, all campuses.",
    head: {
      id: "finance-head",
      name: "Ibrahim Musa",
      title: "Head of Finance",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0006",
      email: "finance@prudentialfashionacademy.com",
    },
  },
  {
    id: "international-office",
    slug: "international-office",
    name: "International Partnerships",
    aboutParagraph: "The International Office manages partnerships, exchange programmes, and support for international students and collaborations.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Partnership enquiries", description: "Information on partner institutions and MOUs." },
      { title: "Exchange programmes", description: "Outbound and inbound exchange applications." },
      { title: "International student support", description: "Visa, accommodation, and orientation support." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "9:00 AM – 4:00 PM" },
      { days: "Saturday", hours: "Closed" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "First floor, Admin block, Egbeda campus.",
    head: {
      id: "intl-head",
      name: "Ms. Adaeze Nwosu",
      title: "International Officer",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0007",
      email: "international@prudentialfashionacademy.com",
    },
  },
  {
    id: "brand-media-affairs",
    slug: "brand-media-affairs",
    name: "Brand & Media Affairs",
    aboutParagraph: "Brand & Media Affairs oversees the academy's public image, press, social media, and events that promote PFA to the wider world.",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    services: [
      { title: "Press & media", description: "Press releases, interviews, and media requests." },
      { title: "Social media", description: "Official channels and content coordination." },
      { title: "Events & visibility", description: "Fashion shows, open days, and brand events." },
    ],
    hours: [
      { days: "Mon – Fri", hours: "9:00 AM – 5:00 PM" },
      { days: "Saturday", hours: "By appointment" },
      { days: "Sunday", hours: "Closed" },
    ],
    location: "Admin block, Egbeda campus.",
    head: {
      id: "brand-head",
      name: "Mr. Segun Adeyinka",
      title: "Head of Brand & Media",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      phone: "+234 800 000 0008",
      email: "media@prudentialfashionacademy.com",
    },
  },
];

export const FOUNDER_BIO = {
  name: "Prudent Gabriel Peterson",
  title: "Founder & Director",
  imageUrl: "/faculty-prudent-gabriel-peterson.png",
  bio: [
    "Prudent Gabriel Peterson founded Prudential Fashion Academy in 2020 with a vision to create a world-class institution that bridges African creativity and global fashion standards. With over two decades of experience in design, education, and brand leadership, he has shaped PFA into a leading name in fashion education across Nigeria and the region.",
    "His career spans fashion design, retail, and education. Before establishing PFA, he led design teams and consulted for international and local brands, and taught at several fashion and design schools. This combination of industry practice and pedagogy informs the academy's curriculum and culture.",
    "Under his direction, PFA has built partnerships with institutions and industry players globally, launched programmes in Fashion Design, Styling, Business, and Technology, and established campuses in Lagos and Abuja. He remains actively involved in teaching and mentoring the next generation of fashion creatives.",
  ],
  quote: "Fashion is not just about clothes — it is about identity, culture, and the courage to create. At PFA we don't just train designers; we nurture leaders who will shape the industry.",
};

export const ACADEMIC_DIRECTOR_BIO = {
  name: "Dr. Amara Okonkwo",
  title: "Academic Director",
  imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  bio: [
    "Dr. Amara Okonkwo joined Prudential Fashion Academy as Academic Director to lead curriculum development, quality assurance, and faculty development. She holds a PhD in Design Education and has extensive experience in higher education and fashion research.",
    "Her work focuses on integrating theory and practice, sustainability in fashion education, and building inclusive learning environments. She has published and presented on fashion pedagogy, African fashion systems, and the future of design education.",
    "At PFA she oversees all academic programmes, ensures alignment with national and international standards, and supports both students and faculty in achieving excellence. She is committed to making PFA a reference point for fashion education in Africa.",
  ],
  quote: "Education in fashion must be rigorous, relevant, and rooted in the realities of the industry. We prepare our students not only to create but to lead and transform.",
};

export const PRESS_LOGOS = [
  { id: "p1", name: "Vogue", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=120&q=80" },
  { id: "p2", name: "Lagos Fashion Week", imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea3c2d7e?auto=format&fit=crop&w=120&q=80" },
  { id: "p3", name: "Business of Fashion", imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=120&q=80" },
];
