import type { Project } from "./types"

/**
 * Portfolio projects. Tech tags are derived from each project's own
 * description/features text and must be valid TechIds so the tech galaxy's
 * click-to-filter stays in sync with the grid.
 */
export const projects: Project[] = [
  {
    slug: "financeflow",
    title: "FinanceFlow",
    description:
      "Multi-account personal finance platform with secure bank account linking and fund transfers, powered by Plaid and Dwolla.",
    features:
      "Connect bank accounts, Plaid & Dwolla API integration, transfer money, view transactions and dashboard.",
    tech: ["nextjs", "plaid", "dwolla", "mongodb"],
    category: "Finance & Accounting",
    featured: true,
    github: null,
    image: "/portfolio/Bank Website Project 1.png",
    link: "https://securebank.devmations.com/",
  },
  {
    slug: "documents-editor",
    title: "Documents Editor",
    description:
      "DocuFlex is a real-time collaborative document editor with secure authentication — upload, edit, share, and download documents seamlessly.",
    features:
      "Real-time collaborative editing with inline GPT writing suggestions, user invitations, and full auth setup built on Liveblocks.",
    tech: ["ai", "openai", "nextjs", "liveblocks", "typescript"],
    category: "Business Tools & Productivity",
    featured: true,
    github: "https://github.com/shuja990/documents-editor",
    image: "/portfolio/project 3 editing.png",
    link: "https://documentseditor.devmations.com/",
  },
  {
    slug: "devmations-ai",
    title: "Devmations AI",
    description:
      "Intelligent assistant that answers questions and queries in real time — an automated way for businesses to handle customer interactions.",
    features: "ChatGPT-style conversational AI built on the Gemini API.",
    tech: ["ai", "gemini", "nextjs", "nodejs"],
    category: "AI & Machine Learning",
    github: null,
    image: "/portfolio/project 4 ai chat boot.png",
    link: "https://ai.devmations.com/",
  },
  {
    slug: "events-app",
    title: "Events App",
    description:
      "EventFlow is an all-in-one event management app for scheduling, reminders, and real-time updates — organize, manage, and share events effortlessly.",
    features: "Book events, pay with Stripe, create events, full authentication.",
    tech: ["react", "nodejs", "express", "mongodb", "stripe"],
    category: "Booking & Events",
    github: null,
    image: "/portfolio/poject 5 evently.png",
    link: "https://events.devmations.com/",
  },
  {
    slug: "podcast-ai",
    title: "Podcast AI",
    description:
      "AI-powered podcasting platform — convert text to podcast-style audio, generate thumbnails, and stream trending content with secure authentication.",
    features: "Text-to-podcast with OpenAI TTS, thumbnail generation, profile management, and streaming playback.",
    tech: ["ai", "openai", "nextjs", "mongodb"],
    category: "AI & Machine Learning",
    featured: true,
    github: "https://github.com/shuja990/podcast-ai",
    image: "/portfolio/project 6 podcaster ai.png",
    link: "https://podcast-ai.devmations.com/",
  },
  {
    slug: "intellisummarizer",
    title: "IntelliSummarizer",
    description:
      "Transform lengthy documents and articles into concise, insightful summaries — quick comprehension for professionals, students, and readers.",
    features: "OpenAI-powered online article and document summarization.",
    tech: ["ai", "openai", "nextjs"],
    category: "AI & Machine Learning",
    github: null,
    image: "/portfolio/intellsummarizerproject 7.png",
    link: "https://summarize-ai.devmations.com/",
  },
  {
    slug: "backdrop-ai",
    title: "Backdrop AI",
    description:
      "AI image editing tool — generative fill, image restore, object remove, and object recolor with precise, intuitive controls.",
    features:
      "Cloudinary AI transformation pipeline with Clerk authentication and MongoDB data management; client-side compression for large uploads.",
    tech: ["ai", "nextjs", "mongodb", "cloudinary"],
    category: "AI & Machine Learning",
    featured: true,
    github: null,
    image: "/portfolio/backdrop ai project 8.png",
    link: "https://backdrop-ai.devmations.com/",
  },
  {
    slug: "healthcare-app",
    title: "Healthcare App",
    description:
      "Digital health platform with secure patient data, appointment scheduling, doctor management, and SMS notifications.",
    features: "Appointment booking, admin dashboard, doctor management, and Twilio SMS integration on Appwrite.",
    tech: ["nextjs", "appwrite", "twilio"],
    category: "Booking & Events",
    github: null,
    image: "/portfolio/project 9 care plus.png",
    link: "https://healthcare.devmations.com/",
  },
  {
    slug: "brain-wave",
    title: "Brain Wave",
    description:
      "Polished landing experience for an AI chat startup — engaging visuals, smooth animations, and a modern component architecture.",
    features: "Marketing site for an AI product built with React and Next.js.",
    tech: ["react", "nextjs"],
    category: "Websites & Marketing",
    github: "https://github.com/shuja990/brain-wave",
    image: "/portfolio/Brain Wave project 10.png",
    link: "https://brainwave.devmations.com/",
  },
  {
    slug: "pricewatch",
    title: "PriceWatch",
    description:
      "Amazon price tracker — submit a product link and get automatic email alerts when the price drops, powered by scheduled web scraping.",
    features: "Web scraping with email notification integration and price history stored in MongoDB.",
    tech: ["nextjs", "nodejs", "mongodb", "puppeteer"],
    category: "Business Tools & Productivity",
    github: null,
    image: "/portfolio/price watch project 11.png",
    link: "https://pricewatch.devmations.com/",
  },
  {
    slug: "kellys-watersports",
    title: "Kelly's Watersports",
    description:
      "Booking platform for a Jamaican water sports operator — scuba, kayaking, parasailing, and glass-bottom boat tours with a scheduling system.",
    features: "Activity booking with scheduling system plus marketing pages.",
    tech: ["react", "nodejs", "mongodb"],
    category: "Booking & Events",
    github: null,
    image: "/portfolio/kellyswatersports project 13.png",
    link: null,
  },
  {
    slug: "swiss-swipe",
    title: "Swiss Swipe",
    description:
      "Tinder-style travel planner — swipe on destination suggestions and get your dream trip itinerary assembled in seconds.",
    features: "Swipe-based destination matching with itinerary suggestions.",
    tech: ["react"],
    category: "Entertainment & Media",
    github: "https://github.com/shuja990/swiss-swipe",
    image: "/portfolio/swiss swip project 14.png",
    link: "https://dancing-tartufo-58eccc.netlify.app/",
  },
  {
    slug: "caribbean-research-institute",
    title: "Caribbean Research Institute",
    description:
      "Research center site covering Caribbean-American experiences in New York — multidisciplinary analysis of social, cultural, and economic dynamics.",
    features: "Marketing and information pages for the research institute.",
    tech: ["react"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/Carribean Research Center 2 project 16.png",
    link: "https://sensational-treacle-a612bb.netlify.app/",
  },
  {
    slug: "webcraft",
    title: "WebCraft",
    description:
      "High-performance agency marketing pages built with Next.js and Builder.io's no-code platform — responsive, customizable, and fast.",
    features: "Marketing site composed with the Builder.io visual editor on Next.js.",
    tech: ["nextjs"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/project salmaiki project 16.png",
    link: "https://precious-salmiakki-1517da.netlify.app/",
  },
  {
    slug: "minister-agriculture-fisheries",
    title: "Ministry of Agriculture & Fisheries",
    description:
      "Official web presence for Minister Pearnel Charles Jr., MP — leadership profile, initiatives, and public communications.",
    features: "Marketing pages for a public figure built with Next.js.",
    tech: ["nextjs"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/MINISTER OF AGRICULTURE AND FISHERIES project 17.png",
    link: "https://stunning-gumption-a3f080.netlify.app/",
  },
  {
    slug: "midalta-innovation",
    title: "Midalta Innovation",
    description:
      "Corporate site for a strategy and innovation firm that has helped create and reinvent businesses for nearly a decade.",
    features: "Agency marketing pages built with Next.js.",
    tech: ["nextjs"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/Midalta Innovation project 18.png",
    link: "https://xenodochial-saha-b77c1d.netlify.app/",
  },
  {
    slug: "roomrendezvous",
    title: "RoomRendezvous",
    description: "University conference-room reservation system with seamless booking and tailored accommodations.",
    features: "Room booking flows built with React and Firebase.",
    tech: ["react", "firebase"],
    category: "Booking & Events",
    github: null,
    image: "/portfolio/RoomRendezvous project 19.png",
    link: "https://delightful-strudel-21da81.netlify.app/",
  },
  {
    slug: "techhirehub",
    title: "TechHireHub",
    description:
      "Marketplace connecting businesses with technicians — booking, admin assignment, job tracking, and work-sample uploads.",
    features: "Technician booking with admin assignment workflow, Firebase auth, and Firestore data.",
    tech: ["react", "firebase"],
    category: "Business Tools & Productivity",
    github: null,
    image: "/portfolio/TechHireHub project 20.png",
    link: "https://idyllic-kitsune-b05596.netlify.app/login",
  },
  {
    slug: "poker-game",
    title: "Poker Game",
    description: "Online poker for all levels — sharpen your bluff in real-time multiplayer games.",
    features: "Real-time gameplay backed by Firebase Realtime Database.",
    tech: ["react", "firebase"],
    category: "Entertainment & Media",
    github: null,
    image: "/portfolio/poker game project 22 .png",
    link: "https://cerulean-boba-8706a2.netlify.app/login",
  },
  {
    slug: "i-conta",
    title: "I-CONTA",
    description:
      "Tax consulting and accounting platform — access financial data anywhere, upload documents, and calculate taxes, investments, and loans.",
    features: "Financial calculators for investments and loans built with React and Firebase.",
    tech: ["react", "firebase"],
    category: "Finance & Accounting",
    github: null,
    image: "/portfolio/I-CONTA project 23.png",
    link: "https://reliable-douhua-a0cd31.netlify.app/",
  },
  {
    slug: "caribbean-restaurant-association",
    title: "Caribbean Restaurant Association",
    description:
      "Platform for the Caribbean American Restaurant Association — promoting Caribbean culture in New York's food service industry.",
    features:
      "Marketing pages plus a dashboard for managing trainings, certifications, and organization settings on Firebase.",
    tech: ["nextjs", "firebase"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/Carrabin Restaurant Association  24.png",
    link: "https://magnificent-fudge-f1bb30.netlify.app/",
  },
  {
    slug: "jaya",
    title: "JAYA — Jamaican American Youth Alliance",
    description:
      "Community platform uniting influential Jamaican-Americans — advocacy, education, mentorship, and diaspora connections.",
    features: "Marketing pages for the Jamaican diaspora community built with Next.js.",
    tech: ["nextjs"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/Jaya project 25.png",
    link: "https://dazzling-almeida-b28d62.netlify.app/",
  },
  {
    slug: "insighthub",
    title: "InsightHub",
    description:
      "Custom analytics dashboard with authentication and data visualization — real-time insights that turn complex data into actionable strategy.",
    features: "E-commerce analytics dashboard built with React.",
    tech: ["react"],
    category: "Business Tools & Productivity",
    github: null,
    image: "/portfolio/Dashboard project 28.png",
    link: "https://peaceful-fermi-170007.netlify.app/#/dashboard",
  },
  {
    slug: "religious-website",
    title: "Religious Website",
    description:
      "Ministry platform blending technology with tradition — scripture content, community engagement, and modern outreach.",
    features: "React site with a CMS for adding pages and changing content.",
    tech: ["react"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/Religious Website project 29.png",
    link: "https://ivabraham.netlify.app/",
  },
  {
    slug: "fashion-flix",
    title: "Fashion Flix",
    description:
      "E-commerce store with easy navigation, detailed product pages, and secure checkout for a seamless shopping experience.",
    features: "Categories, products, and payments built with React and Firebase.",
    tech: ["react", "firebase"],
    category: "E-commerce",
    github: null,
    image: "/portfolio/Fashion  project 31 .png",
    link: "https://objective-jennings-a2a6d7.netlify.app/",
  },
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    description:
      "Dynamic invoice generator that adapts to any business model — automated calculations, customizable templates, professional output in seconds.",
    features: "Client-side invoice builder built with React.",
    tech: ["react"],
    category: "Finance & Accounting",
    github: null,
    image: "/portfolio/Invoice Generator project 31.png",
    link: "https://invoice-generator-shuja.netlify.app/",
  },
  {
    slug: "react-resort-hotel",
    title: "Resort Hotel Reservation",
    description:
      "Resort reservation system with real-time availability and streamlined bookings — sleek, responsive, and guest-friendly.",
    features: "Hotel room reservation flows built on the MERN stack.",
    tech: ["react", "nodejs", "express", "mongodb"],
    category: "Booking & Events",
    github: null,
    image: "/portfolio/hotel reservation project  35.png",
    link: "https://react-resort-hotel-reservation.netlify.app/",
  },
  {
    slug: "flashcart",
    title: "FlashCart",
    description:
      "Lightning-fast e-commerce storefront — intuitive categories, seamless payments, and real-time updates on any device.",
    features: "Categories, products, and payments built with React and Firebase.",
    tech: ["react", "firebase"],
    category: "E-commerce",
    github: null,
    image: "/portfolio/Dhaka  E commerce app project 36.png",
    link: "https://hardcore-villani-9d21cb.netlify.app/",
  },
  {
    slug: "accessmatic",
    title: "AccessMatic",
    description:
      "User management tool for handling roles, permissions, and access controls — automated onboarding and simplified audits.",
    features: "Role and permission administration built with React and Firebase.",
    tech: ["react", "firebase"],
    category: "Business Tools & Productivity",
    github: null,
    image: "/portfolio/Upbeat Galileo App 38.png",
    link: "https://upbeat-galileo-cfa75c.netlify.app/",
  },
  {
    slug: "black-forest-artz",
    title: "Black Forest Artz",
    description: "Elegant online gallery showcasing artwork with a clean, image-forward presentation.",
    features: "Art gallery marketing pages built with Next.js.",
    tech: ["nextjs", "firebase"],
    category: "Websites & Marketing",
    github: null,
    image: "/portfolio/art galley 40.png",
    link: "https://black-forest-artz.web.app/",
  },
  {
    slug: "ean-search",
    title: "EAN Search",
    description:
      "Barcode-based product finder for inventory management — locate items across price points and optimize procurement decisions.",
    features: "Barcode scanning with automatic product lookup and Firebase storage.",
    tech: ["react", "firebase"],
    category: "Business Tools & Productivity",
    github: null,
    image: null,
    link: "https://eansearch-21c92.web.app/",
  },
  {
    slug: "vq-points",
    title: "VQ Points",
    description:
      "Rewards management platform — view balances, transfer points between users, redeem rewards, and track full transaction history in real time.",
    features: "Points dashboard with transfers, redemption, and live updates on Firebase.",
    tech: ["react", "firebase"],
    category: "Finance & Accounting",
    github: null,
    image: "/portfolio/VQ Points 43.png",
    link: "https://vqpoints.web.app/",
  },
  {
    slug: "mock-interview-ai",
    title: "Mock Interview AI",
    description:
      "AI mock-interview coach — records your answers, transcribes them with Whisper, and streams personalized GPT feedback in real time.",
    features:
      "FFmpeg standardizes browser recordings to MP3, OpenAI Whisper transcribes, and GPT streams instant feedback from the edge.",
    tech: ["ai", "openai", "nextjs"],
    category: "AI & Machine Learning",
    featured: true,
    github: "https://github.com/shuja990/moc-interview",
    image: "/portfolio/project 44.png",
    link: "https://moc-interview.vercel.app/",
  },
  {
    slug: "glam-shack",
    title: "Glam Shack",
    description:
      "Modern e-commerce platform with intuitive categories, seamless payments, and engaging marketing pages — fast, responsive, secure.",
    features: "Full MERN + Next.js storefront with categories, products, and payments.",
    tech: ["nextjs", "nodejs", "express", "mongodb"],
    category: "E-commerce",
    github: "https://github.com/shuja990/glam-shack",
    image: "/portfolio/shoplify project 45.png",
    link: "https://glam-shackk.vercel.app/",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const projectCategories = [...new Set(projects.map((p) => p.category))]

/** Number of projects per tech — drives galaxy node sizing */
export function projectCountByTech(): Map<string, number> {
  const counts = new Map<string, number>()
  for (const project of projects) {
    for (const t of project.tech) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return counts
}
