import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

// Import custom fonts
import { Orbitron, Poppins, Fira_Code } from "next/font/google"

// Define fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Shuja Ali - Full Stack Developer | MERN & Next.js Expert",
  description:
    "Portfolio of Shuja Ali, a Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web solutions.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Shuja Ali",
  ],
  authors: [{ name: "Shuja Ali", url: "https://github.com/shuja990" }],
  creator: "Shuja Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shujaali.dev",
    title: "Shuja Ali - Full Stack Developer | MERN & Next.js Expert",
    description:
      "Portfolio of Shuja Ali, a Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web solutions.",
    siteName: "Shuja Ali Portfolio",
    images: [
      {
        url: "https://shujaali.dev/portfolio/profile.jpg",
        width: 800,
        height: 800,
        alt: "Shuja Ali - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuja Ali - Full Stack Developer | MERN & Next.js Expert",
    description:
      "Portfolio of Shuja Ali, a Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web solutions.",
    creator: "@shujaali",
    images: [
      "https://shujaali.dev/portfolio/profile.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://shujaali.dev",
  },
  metadataBase: new URL("https://shujaali.dev"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${poppins.variable} ${firaCode.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Structured data for SEO */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shuja Ali",
              url: "https://shujaali.dev",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Ropstam Solutions Inc.",
              },
              sameAs: [
                "https://github.com/shuja990",
                "https://linkedin.com/in/shuja-ali",
                "https://twitter.com/shujaali",
              ],
              description:
                "Full Stack Developer specializing in MERN stack and Next.js, creating innovative and scalable web solutions.",
              knowsAbout: ["MERN Stack", "Next.js", "React", "Node.js", "JavaScript", "TypeScript", "Web Development"],
            }),
          }}
        />
      </body>
    </html>
  )
}

