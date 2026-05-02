import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";
import { Chatbot } from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EduHelp — Special Education Eligibility, Made Clear",
  description:
    "Upload evaluations, IEP / 504 reports, or test results and get a plain-English summary of what your child may be eligible for under Colorado, California, Texas, New York, Florida, Illinois, and Massachusetts special-education law.",
  metadataBase: new URL("https://eduhelp.app"),
  manifest: "/manifest.webmanifest",
  applicationName: "EduHelp",
  appleWebApp: {
    capable: true,
    title: "EduHelp",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    title: "EduHelp — Special Education Eligibility, Made Clear",
    description:
      "Plain-English IEP / 504 insights, timelines, accommodations, and letters for U.S. families.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <PWARegister />
      </body>
    </html>
  );
}
