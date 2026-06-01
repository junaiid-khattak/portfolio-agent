import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.junaidkhattak.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Junaid Khattak · I build production AI products, fast",
  description:
    "Ex-agency founder & CTO who rebuilt software development around AI. I ship production AI (voice agents, autonomous agents, full-stack products) in weeks, not months. 3 live AI products, 100% Job Success on Upwork.",
  keywords: [
    "AI engineer", "agentic AI", "AI voice agents", "RAG", "full-stack AI",
    "AI product developer", "Next.js", "OpenAI Realtime", "Junaid Khattak",
  ],
  authors: [{ name: "Junaid Khattak", url: SITE_URL }],
  openGraph: {
    title: "Junaid Khattak · I build production AI products, fast",
    description:
      "I shipped Nayld solo in 6 weeks, a build my old agency would've needed 8-10 months and a full team for. Let me bring that to you.",
    url: SITE_URL,
    siteName: "Junaid Khattak",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junaid Khattak · I build production AI products, fast",
    description:
      "Ex-agency founder/CTO, now shipping production AI solo in weeks. 3 live products. Talk to my digital twin.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
