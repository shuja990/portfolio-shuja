"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Project data from the provided JSON
const projectsData = [
  {
    "title": "FinanceFlow",
    "description": "This mobile app (FinX) empowers users with secure access and management of their finances, featuring Plaid & Dwolla integratio",
    "features": "Connect bank accounts, dwolla and plaid api integration, transfer money using plaid, view transactions and dashboard uses nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Bank Website Project 1.png",
    "link": "https://securebank.devmations.com/",
    "category": "Finance & Accounting"
  },
  {
    "title": "Documents Editor",
    "description": "DocuFlex is a powerful document editor with secure authentication, enabling users to upload, edit, and download any document type. Effortlessly share edited files online, providing a seamless experience for businesses to manage documentation with ease",
    "features": "real time collaborative document editor. Can edit docs, invite users and also auth setup uses nextjs, liveblocks",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/documents-editor",
    "image": "/portfolio/project 3 editing.png",
    "link": "https://documentseditor.devmations.com/",
    "category": "Business Tools & Productivity"
  },
  {
    "title": "Devmations AI",
    "description": "Devmation AI is an intelligent assistant that answers questions and queries in real time, offering businesses an efficient, automated way to handle customer interactions. Perfect for startups and enterprises looking to enhance customer service and engagement.",
    "features": "using gemini apis like chatgpt uses nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/project 4 ai chat boot.png",
    "link": "https://ai.devmations.com/",
    "category": "AI & Machine Learning"
  },
  {
    "title": "Events App",
    "description": "EventFlow  is your all-in-one event management app, designed to streamline scheduling, reminders, and real-time updates. Effortlessly organize, manage, and share events, empowering businesses and startups to elevate productivity, boost collaboration, and create memorable experiences with ease.",
    "features": "book events, pay with stripe, create event, auth, built with mern",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/poject 5 evently.png",
    "link": "https://events.devmations.com/",
    "category": "Entertainment & Media"
  },
  {
    "title": "Podcast AI",
    "description": "Unleash your podcast's potential with our AI-powered platform. Upload, stream, and discover trending content effortlessly. Secure authentication protects your audio. Ideal for creators and listeners, bringing cutting-edge tech to podcasting",
    "features": "text to podcast, thumbnail generator, open AI, auth, view podcasts, create podcasts profile management uses nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/podcast-ai",
    "image": "/portfolio/project 6 podcaster ai.png",
    "link": "https://podcast-ai.devmations.com/",
    "category": "AI & Machine Learning"
  },
  {
    "title": "IntelliSummarizer",
    "description": "AI-powered brilliance at your fingertips. Transform lengthy documents and books into concise, insightful summaries. Save time, boost productivity, and unlock knowledge effortlessly. Perfect for professionals, students, and avid readers seeking quick comprehension.",
    "features": "openAI, summarise articles online  uses nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/intellsummarizerproject 7.png",
    "link": "https://summarize-ai.devmations.com/",
    "category": "Miscellaneous"
  },
  {
    "title": "Backdrop AI",
    "description": "Revolutionize your photos with AI magic. Restore, fill, remove, and recolor objects effortlessly. Secure authentication protects your creations. Perfect for photographers, designers, and businesses seeking professional-grade image editing without the complexity.",
    "features": "Backdrop AI is an image editing tool powered by AI that lets users unleash their creativity with ease. Featuring Generative Fill, Image Restore, Object Remove, and Object Recolor functionalities, it allows precise and intuitive modifications. Built with Next.js, MongoDB, and Clerk Auth, it provides seamless authentication, data management, and AI-powered image manipulation using Cloudinary AI. Backdrop AI is perfect for designers, photographers, and anyone needing a powerful yet user-friendly visual editing experience. uses nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/backdrop ai project 8.png",
    "link": "https://backdrop-ai.devmations.com/",
    "category": "Miscellaneous"
  },
  {
    "title": "Healthcare App",
    "description": "Empowering wellness through technology. Secure patient data, appointment scheduling, and telemedicine integration. Real-time health tracking and personalized insights. Ideal for healthcare providers and patients seeking a seamless, user-friendly digital health experience. Transform care delivery with our innovative solution",
    "features": "book appointment, admin auth, create user profile, add doctors, manage appointments, twillio integration uses nextjs appwrite",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/project 9 care plus.png",
    "link": "https://healthcare.devmations.com/",
    "category": "Miscellaneous"
  },
  {
    "title": "Brain Wave",
    "description": "Revolutionize conversations with AI-powered chatting. Engage in intelligent dialogues, access instant information, and boost productivity. Secure, customizable, and infinitely scalable. Perfect for businesses seeking to enhance customer service, streamline operations, or pioneer innovative AI applications.",
    "features": "landing page for AI startup, react next js",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/brain-wave",
    "image": "/portfolio/Brain Wave project 10.png",
    "link": "https://brainwave.devmations.com/",
    "category": "Miscellaneous"
  },
  {
    "title": "PriceWatch",
    "description": " Unlock business growth with intelligent analytics. Track product performance, boost conversions, and maximize customer retention. Self-serve platform delivers powerful insights for data-driven decisions. Perfect for startups and businesses aiming to optimize their market strategy and accelerate success",
    "features": "tracks price of amazon products when links are provided, has email integration to send price updates, using scrapping and reactjs with mongodb nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/price watch project 11.png",
    "link": "https://pricewatch.devmations.com/",
    "category": "Miscellaneous"
  },
  {
    "title": "Kelly's Watersports",
    "description": "Kelly's Water Sports Jamaica: Your ultimate aquatic adventure hub. Dive into crystal waters with PADI-certified scuba, glide in clear kayaks, or sail on Hobie cats. From thrilling parasailing to serene glass-bottom boats, we offer unforgettable experiences for all. Your Caribbean water wonderland awaits!",
    "features": "built using reactjs, can book different types of water sports has scheduling system, has other marketing pages",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/kellyswatersports project 13.png",
    "link": "Kelly's \u2013 Water Sports",
    "category": "Miscellaneous"
  },
  {
    "title": "Swiss Swipe",
    "description": "Revolutionize your travel planning. Effortlessly organize activities and dream trips with lightning speed. Intuitive interface meets powerful algorithms for seamless itinerary creation. Perfect for busy professionals, travel enthusiasts, and businesses aiming to streamline vacation experiences. Adventure awaits\u2014just swipe! ",
    "features": "built with reactjs, like a tinder for travel you can swipe location suggesstions, then it will suggested dream destination",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/swiss-swipe",
    "image": "/portfolio/swiss swip project 14.png",
    "link": "https://dancing-tartufo-58eccc.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Caribbean Research Institute",
    "description": "Caribbean Research Center: Uncover insights into Caribbean-American experiences in New York. Multidisciplinary analysis of social, cultural, and economic dynamics. Compare immigrant journeys across American and European diasporas. Empower businesses and policymakers with deep understanding of diverse Caribbean communities.",
    "features": "marketing pages for carribean research institute and information",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Carribean Research Center 2 project 16.png",
    "link": "https://sensational-treacle-a612bb.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": " WebCraft",
    "description": "Build stunning, high-performance marketing pages effortlessly with NextGen WebCraft. Powered by Next.js and Builder.io's no-code platform, we create responsive, customizable websites that drive engagement and conversions\u2014perfect for agencies looking to scale quickly and efficiently",
    "features": "marketing pages for an agency built with next js no codetool builder.io",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/project salmaiki project 16.png",
    "link": "https://precious-salmiakki-1517da.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "MINISTER OF AGRICULTURE AND FISHERIES",
    "description": "Minister Pearnel Charles, Jr., MP: Leading Agriculture and Fisheries, with prior roles in Housing and Environment.",
    "features": "marketing pages for an politician built with next js ",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/MINISTER OF AGRICULTURE AND FISHERIES project 17.png",
    "link": "https://stunning-gumption-a3f080.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Midalta Innovation",
    "description": "Midalta Innovation is a leading strategy and innovation firm. For nearly 10 years, they have helped create new businesses and reinvent existing ones.",
    "features": "marketing pages for an agency built with next js",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Midalta Innovation project 18.png",
    "link": "https://xenodochial-saha-b77c1d.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "RoomRendezvous",
    "description": "RoomRendezvous: Simplifying room reservations with seamless booking and tailored accommodations for every occasion",
    "features": "Built for a university, where you can book conference rooms. Built with react and firebase",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/RoomRendezvous project 19.png",
    "link": "https://delightful-strudel-21da81.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "TechHireHub",
    "description": "TechHireHub: Connecting businesses with top-tier technicians for expert solutions and reliable service",
    "features": "Built for a technicians where users can book them, admin can then assign technician, technician can start work, upload work samples pictures using react js firebase auth firestore",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/TechHireHub project 20.png",
    "link": "https://idyllic-kitsune-b05596.netlify.app/login",
    "category": "Miscellaneous"
  },
  {
    "title": "Poker Game",
    "description": "Sharpen Your Bluff Online Poker for All Levels.",
    "features": "built with reactjs a poker game online uses firebase realtime",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/poker game project 22 .png",
    "link": "https://cerulean-boba-8706a2.netlify.app/login",
    "category": "Miscellaneous"
  },
  {
    "title": "I-CONTA",
    "description": "I-CONTA offers expert tax consulting and accounting services, transforming the accountant-entrepreneur relationship. Access your financial data anytime, anywhere, upload documents, and easily calculate taxes.",
    "features": "built for financial institute, involes calculations for investment, loans etc built with react js firebase",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/I-CONTA project 23.png",
    "link": "https://reliable-douhua-a0cd31.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Carribbean Restaurant Association",
    "description": "The Caribbean American Restaurant Association is focused and dedicated to the enhancement and successes of the Caribbean culture in the food service industry in New York City.",
    "features": "marketing pages for carribean restaurant institution, dashboard to manage their settings trainings, certifications, information etc built with nextjs firebase db and auth",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Carrabin Restaurant Association  24.png",
    "link": "https://magnificent-fudge-f1bb30.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Jaya(Jamaican American Youth Alliance)",
    "description": "Uniting influential Jamaican-Americans to empower their homeland. Our diverse network of leaders in politics, academia, business, and culture fosters diaspora connections and preserves Jamaican heritage. Through lobbying, education, and mentorship, we advocate for our community, raise awareness, and nurture the next generation of Jamaican talent. Join JAYA to celebrate, support, and shape Jamaica's future.\"",
    "features": "marketing pages built with nexts for jamaica diaspora in USA",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Jaya project 25.png",
    "link": "https://dazzling-almeida-b28d62.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "InsightHub",
    "description": "Visualize success with our custom Dashboard solutions. Seamlessly integrating authentication and data visualization, our dashboards empower decision-makers with real-time insights. Transform complex data into actionable strategies, driving your business forward with clarity and confidence",
    "features": "dashboard for ecommerce website using reactjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Dashboard project 28.png",
    "link": "https://peaceful-fermi-170007.netlify.app/#/dashboard",
    "category": "Miscellaneous"
  },
  {
    "title": "Religious Website",
    "description": "Elevate spiritual experiences with our Religious Content solutions. From interactive scripture apps to community engagement platforms, we blend technology with tradition. Reach broader audiences, deepen connections, and modernize outreach while preserving sacred values. Empower your ministry in the digital age",
    "features": "built with react js with cms for religious websie can add pages, change content",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Religious Website project 29.png",
    "link": "https://ivabraham.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Fashion flix",
    "description": "Offers a seamless shopping experience with mention features, easy navigation, detailed descriptions, secure checkout",
    "features": "ecommerce website built with reactjs built using firebase reactjs has categories products and payments",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Fashion  project 31 .png",
    "link": "https://objective-jennings-a2a6d7.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Invoice Generator",
    "description": "Transform billing into a breeze with our dynamic Invoice Generator. Designed for versatility, it adapts to any business model. Automate calculations, customize templates, and generate professional invoices in seconds. Boost accuracy, save time, and maintain a healthy cash flow. Elevate your financial management effortlessly.",
    "features": "built using reactjs ",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/I-CONTA project 23.png",
    "link": "https://invoice-generator-shuja.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "React Resort Hotel Reservation",
    "description": "Elevate guest experiences with our React-powered Resort Hotel Reservation system. Sleek, responsive, and user-friendly, it streamlines bookings and maximizes occupancy. From real-time availability to secure payments, enhance your resort's digital presence. Delight guests and boost revenue with seamless, modern reservation management.",
    "features": "hotel room reservation using react js mern",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/hotel reservation project  35.png",
    "link": "https://react-resort-hotel-reservation.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "FlashCart",
    "description": "Your lightning-fast e-commerce solution powered by React.js and Firebase. Browse intuitive product categories, enjoy seamless payments, and experience real-time updates. With FlashCart's responsive design and robust backend, shop confidently on any device. Elevate your online retail experience with cutting-edge technology and user-friendly interface.",
    "features": "ecommerce website built with reactjs built using firebase reactjs has categories products and payments",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Dhaka  E commerce app project 36.png",
    "link": "https://hardcore-villani-9d21cb.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "AccessMatic",
    "description": "Streamline organizational efficiency with our robust User Management Tool. Seamlessly handle user roles, permissions, and access controls. Automate onboarding, simplify audits, and enhance security. Customizable and scalable, it adapts to your evolving needs. Empower your HR and IT teams with intuitive user administration.",
    "features": "built using reactjs firebase",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/Upbeat Galileo App 38.png",
    "link": "https://upbeat-galileo-cfa75c.netlify.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Black Forest Artz",
    "description": "Art gallery",
    "features": "marketing pages for art gallery using nextjs",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/art galley 40.png",
    "link": "https://black-forest-artz.web.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "EAN Search",
    "description": "Streamline inventory management with our powerful barcode-based product finder. Instantly locate items across multiple price points, optimizing procurement and pricing strategies. This internal tool enhances efficiency, reduces errors, and provides valuable insights for cost-effective decision-making. Empower your team with real-time product and pricing intelligence",
    "features": "built using reactjs, scanning barcodes for items and adding them to db  after searching it over the net, uses firebase ",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": null,
    "link": "https://eansearch-21c92.web.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "VQ Points",
    "description": "Revolutionize reward management with our React.js and Firebase-powered platform. Effortlessly view balances, transfer points between users, and redeem rewards. Featuring an intuitive dashboard and comprehensive transaction history. Experience real-time updates and seamless interactions in this user-friendly, secure rewards ecosystem.",
    "features": "built with reactjs, firebase, view your balance of reward points, transfer to users redeem the points, dashboard, view transaction history",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": null,
    "image": "/portfolio/VQ Points 43.png",
    "link": "https://vqpoints.web.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Moc Interview",
    "description": "Elevate your interview skills with Liftoff: A cutting-edge mock interview platform powered by Next.js and AI. Featuring real-time video processing with FFmpeg, OpenAI's Whisper for accurate transcription, and GPT-3.5-turbo for instant, insightful feedback. Experience seamless, browser-compatible sessions with personalized AI coaching to boost your career prospects.",
    "features": "built with next js and ai integration has moc interview sessions Liftoff uses FFmpeg to transcode the raw video into MP3. Chrome, Safari, and Firefox all record with different codecs, and FFmpeg is great for standardizing them.\n\nWe then send the audio directly to be transcribed by OpenAI's Whisper endpoint, and then stream feedback from the edge using OpenAI's gpt-3.5-turbo.",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/moc-interview",
    "image": "/portfolio/project 44.png",
    "link": "https://moc-interview.vercel.app/",
    "category": "Miscellaneous"
  },
  {
    "title": "Glam Shack",
    "description": "Discover GlamShack: A cutting-edge e-commerce platform built with Next.js and MERN stack. Featuring intuitive product categories, seamless payments, and engaging marketing pages. Experience lightning-fast performance, responsive design, and secure transactions. Elevate your online shopping with GlamShack's sleek, user-friendly interface and robust functionality",
    "features": "ecommerce website built with nextjs built using mern has categories products and payments and other marketing pages",
    "techStack": [
      "MERN",
      "Next.js"
    ],
    "github": "https://github.com/shuja990/glam-shack",
    "image": "/portfolio/shoplify project 45.png",
    "link": "https://glam-shackk.vercel.app/",
    "category": "Miscellaneous"
  }
]

// Get unique categories
const categories = ["All", ...new Set(projectsData.map((project) => project.category))]

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [visibleProjects, setVisibleProjects] = useState(6) // Initially show 6 projects

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter((project) => project.category === selectedCategory))
    }
    // Reset visible projects when category changes
    setVisibleProjects(6)
  }, [selectedCategory])

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 3) // Load 3 more projects
  }

  const hasMoreProjects = visibleProjects < filteredProjects.length

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            A selection of my recent work showcasing my skills and expertise.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filter by Category: {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary/10" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg?height=300&width=500"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <div className="mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-foreground/80 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="bg-primary/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button asChild variant="default" size="sm">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  </Button>
                  {project.github && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMoreProjects}
              variant="outline"
              size="lg"
              className="px-8 py-6 h-auto rounded-xl text-base font-medium hover:bg-primary/10"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

