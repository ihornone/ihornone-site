import type { Metadata } from "next"
import "./globals.css"
import "highlight.js/styles/atom-one-dark.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BrandProvider from "@/components/BrandProvider"
import ScrollProgress from "@/components/ScrollProgress"
import PageTransition from "@/components/PageTransition"

export const metadata: Metadata = {
  metadataBase: new URL("https://ihornone.com"),
  title: "ihornone — Full-Stack Developer",
  description: "ihornone — independent full-stack developer building mobile, web, and desktop apps with React, TypeScript, React Native, and Rust.",
  keywords: ["full-stack developer", "React", "TypeScript", "React Native", "Rust", "Tauri", "mobile apps", "web development"],
  authors: [{ name: "ihornone" }],
  openGraph: {
    type: "website",
    siteName: "ihornone",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: "/og-image.png" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: "document.documentElement.setAttribute('data-theme','dark')",
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <BrandProvider>
          <ScrollProgress />
          <Navbar />
          <main className="pt-28 flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </BrandProvider>
      </body>
    </html>
  )
}
