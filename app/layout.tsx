import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Geval - Eval-Driven Release Enforcement for AI",
  description:
    "Turn eval results into enforced release decisions. Geval is the open-source release enforcement engine that blocks unverified AI changes before production.",
  keywords: [
    "AI release enforcement",
    "eval-driven CI/CD",
    "LLM release gates",
    "AI quality gates",
    "eval contracts",
    "ML deployment automation",
    "AI release decisions",
    "prompt regression prevention",
    "AI CI/CD integration",
    "eval result enforcement"
  ].join(", "),
  authors: [{ name: "Geval Team" }],
  creator: "Geval",
  publisher: "Geval",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geval.dev",
    siteName: "Geval",
    title: "Geval - Eval-Driven Release Enforcement for AI",
    description: "Turn eval results into enforced release decisions. The open-source release enforcement engine for AI teams.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Geval - Release Enforcement for AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geval - Eval-Driven Release Enforcement for AI",
    description: "Turn eval results into enforced release decisions. The open-source release enforcement engine for AI teams.",
    images: ["/og-image.png"],
    creator: "@geval_labs",
  },
  icons: {
    icon: "/white_bg_greenlogo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
