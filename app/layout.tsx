import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { site } from "@/data"

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
  title: site.seo.title,
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.siteUrl,
    title: site.seo.title,
    description: site.seo.description,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    creator: "@shujaali",
    images: [site.seo.ogImage],
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
    canonical: site.siteUrl,
  },
  metadataBase: new URL(site.siteUrl),
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
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject body attributes */}
      <body className={poppins.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <Navbar />
            {children}
            <Toaster />
          </MotionProvider>
        </ThemeProvider>

        {/* Structured data for SEO */}
        <script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.siteUrl,
              jobTitle: site.role,
              worksFor: {
                "@type": "Organization",
                name: "Ropstam Solutions Inc.",
              },
              sameAs: [site.socials.github, site.socials.linkedin, site.socials.twitter],
              description: site.seo.description,
              knowsAbout: [
                "MERN Stack",
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "AI Integrations",
                "LangChain",
                "AWS",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}

