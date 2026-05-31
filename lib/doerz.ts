// Doerz agency projects (Junaid as founder & CTO). Images extracted from the
// Doerz Portfolio PDF into /public/work/doerz/<slug>/.

export type DoerzProject = {
  slug: string;
  name: string;
  tagline: string;
  sector: string;
  client: string;
  year: string;
  summary: string;
  features: string[];
  images: string[];
};

const img = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/work/doerz/${slug}/${String(i + 1).padStart(2, "0")}.webp`);

export const SECTORS = [
  "Fitness", "Healthcare", "Management", "Online Communities", "Bookings", "E-commerce", "Safety", "Jobsearch & EdTech", "Non-Profit",
] as const;

export const doerzProjects: DoerzProject[] = [
  { slug: "mindbody-climb", name: "MindBody Climb", tagline: "Rock-climbing coaching app", sector: "Fitness", client: "Zach Fletcher (USA)", year: "2023–2024",
    summary: "A coaching app for intermediate climbers with a structured training system, mental exercises, tutorials and events.",
    features: ["Training system", "Mental exercises", "Tutorials & events", "Tracking & analytics", "Real-time feedback", "Subscription model"], images: img("mindbody-climb", 1) },
  { slug: "natyfit", name: "Natyfit", tagline: "Connecting gym-goers", sector: "Fitness", client: "Micah Cunningham (USA)", year: "2022",
    summary: "Connects users to find workout partners, share activities, and chat live.",
    features: ["Workout-partner matching", "Fitness event calendar", "Personalised plans", "Achievement badges", "Activity sharing"], images: img("natyfit", 1) },
  { slug: "fit-flow", name: "Fit Flow", tagline: "All-in-one fitness companion", sector: "Fitness", client: "Zach Fletcher (USA)", year: "2023–2024",
    summary: "Workout tracking, progress monitoring, and meal planning in one intuitive app.",
    features: ["Workout tracking", "Wearable integration", "Meal planning", "Personalised plans", "Community forums", "Calorie counter"], images: img("fit-flow", 1) },
  { slug: "schedy", name: "Schedy", tagline: "Gym management + social", sector: "Management", client: "Sokol Petro (Italy)", year: "2022",
    summary: "Combines a gym-management system with a fitness-industry social platform.",
    features: ["Business management", "Member management", "Staff management", "Reporting & analytics", "Billing & invoicing"], images: img("schedy", 4) },
  { slug: "offszn", name: "OffSzn", tagline: "Athletes · coaches · sponsors", sector: "Online Communities", client: "Dorian Flowers (USA)", year: "2021",
    summary: "Social network connecting athletes and collegiate coaches with sponsors and businesses.",
    features: ["Sports event calendar", "Sponsorship opportunities", "Achievement sharing", "Team collaboration"], images: img("offszn", 1) },
  { slug: "gym-community", name: "Gym Community", tagline: "Fitness social platform", sector: "Online Communities", client: "Matt Fisher (USA)", year: "2022–2023",
    summary: "Community for gym-goers via group discussions, achievement sharing, and messaging.",
    features: ["Workout-partner finding", "Event calendar", "Routine sharing", "Live chat", "Activity sharing"], images: img("gym-community", 1) },
  { slug: "achev", name: "Achēv", tagline: "Non-profit employment agency app", sector: "Non-Profit", client: "Achēv (Canada)", year: "2024",
    summary: "App for one of the largest providers of employment, settlement, and technology services across the GTA, Canada.",
    features: ["Application process", "Events & workshops", "News & articles", "App-wide search", "Location-based filters", "Personalised feed"], images: img("achev", 1) },
  { slug: "bookcyp", name: "BookCyp", tagline: "Appointment scheduling", sector: "Bookings", client: "Stylios (Cyprus)", year: "2023",
    summary: "Appointment scheduling & management for health-and-beauty businesses.",
    features: ["Booking & management", "Provider profiles", "In-app messaging", "Reviews & ratings", "Payment integration"], images: img("bookcyp", 1) },
  { slug: "fertility-connects", name: "Fertility Connects", tagline: "Healthcare community", sector: "Healthcare", client: "Racheal", year: "2024",
    summary: "Community-centric platform for navigating the fertility journey.",
    features: ["Profile management", "Chat & forums", "Admin CMS", "Reports & suspensions", "Feedback & analytics", "Information hub"], images: img("fertility-connects", 1) },
  { slug: "patient-doctor", name: "Patient & Doctor Connection", tagline: "Telehealth platform", sector: "Healthcare", client: "Muhammad Naeem", year: "2020",
    summary: "Connects health workers and patients via video calls, online booking, and payments.",
    features: ["Video calling", "Appointment booking", "Doctor search", "Health records", "Prescription requests", "Payments"], images: img("patient-doctor", 2) },
  { slug: "circlegeo", name: "CircleGeo", tagline: "Family safety & location", sector: "Safety", client: "Gabriel Obassi (UK)", year: "2023–2024",
    summary: "Family-safety and location-tracking app for parents and caregivers.",
    features: ["Real-time location", "Geofencing", "Bluetooth car detection", "In-app family chat", "Live driving tracking", "Emergency SOS"], images: img("circlegeo", 1) },
  { slug: "mvm", name: "Man v Media", tagline: "Influencer social network", sector: "Online Communities", client: "Spenser Benson (USA)", year: "2022",
    summary: "Connects media influencers with like-minded people by interest.",
    features: ["Find influencers by interest", "Recommendations", "Trending topics", "Interest-based feeds", "Live chat"], images: img("mvm", 1) },
  { slug: "whinny", name: "Whinny", tagline: "Horse-riding community", sector: "Online Communities", client: "Raul Blanco (Sweden)", year: "2023",
    summary: "Connects the horse community and manages horse-care tasks.",
    features: ["Messaging with owners", "Horse health records", "Community forums", "Care task management", "Event calendar"], images: img("whinny", 4) },
  { slug: "fitty", name: "Fitty", tagline: "Clothing design feedback", sector: "E-commerce", client: "Pierce Maloney (USA)", year: "2021",
    summary: "E-commerce app letting clothing designers validate designs with consumers before manufacturing.",
    features: ["Design preview/prototyping", "Pre-order & crowdfunding", "Designer profiles", "Sales analytics", "Feedback/commenting"], images: img("fitty", 1) },
  { slug: "food-truckin", name: "Food Truckin", tagline: "Food-truck discovery", sector: "E-commerce", client: "Dorian Flowers (USA)", year: "2021",
    summary: "Connects foodies with food trucks — discovery, ordering, and reviews.",
    features: ["Discovery & menus", "Recommendations", "Event participation", "Ordering & payment", "Ratings/reviews", "Operator dashboard"], images: img("food-truckin", 1) },
  { slug: "vistatech", name: "VistaTech", tagline: "Workforce management", sector: "Management", client: "Tony Johnson (USA)", year: "2024",
    summary: "All-in-one workforce app for businesses, especially security companies.",
    features: ["Employee directory", "Job scheduling", "Shift management", "Time clock", "Real-time reporting", "Document management"], images: img("vistatech", 1) },
  { slug: "wespr", name: "WESPR", tagline: "Events + restaurant management", sector: "Bookings", client: "Andrea Charles (Switzerland)", year: "2022–2023",
    summary: "Event and restaurant management, bookings, and ticketing.",
    features: ["Booking & ticketing", "Organizer/attendee dashboards", "Promotion tools", "Event discovery", "Restaurant reviews"], images: img("wespr", 1) },
  { slug: "recsy", name: "Recsy", tagline: "Property management", sector: "Management", client: "Dorian Flowers (USA)", year: "2021",
    summary: "Streamlines coordination of property-related tasks.",
    features: ["Property listings", "Maintenance requests", "Tenant communication", "Financial tracking", "Supplier management", "Document management"], images: img("recsy", 2) },
  { slug: "legalme", name: "LegalMe", tagline: "Lawyer-client connection", sector: "Management", client: "Dorian Flowers (USA)", year: "2021",
    summary: "Platform where lawyers bid to connect with clients, showcasing expertise and availability.",
    features: ["Bidding system", "Lawyer & client profiles", "Case listings", "Bid submissions", "Appointment scheduling", "Document management"], images: img("legalme", 2) },
  { slug: "leaping-hurdles", name: "Leaping Hurdles", tagline: "Candidates → agencies", sector: "Jobsearch & EdTech", client: "Dorian Flowers (USA)", year: "2021",
    summary: "Connects candidates with agencies to find, apply, and get hired.",
    features: ["Application tracking", "Job-matching algorithms", "Interview scheduling", "Job listings/filters", "Candidate profiles"], images: img("leaping-hurdles", 2) },
  { slug: "education-application", name: "Education Application Platform", tagline: "EdTech application flow", sector: "Jobsearch & EdTech", client: "Asghar Khan (AK Consultants)", year: "2023",
    summary: "EdTech platform streamlining the education-application process for students, agents, and administrators.",
    features: ["Application tracking", "Document submission", "Acceptance/enrollment", "Course listings", "Connecting stakeholders"], images: img("education-application", 1) },
];

export const getDoerzProject = (slug: string) => doerzProjects.find((p) => p.slug === slug);
