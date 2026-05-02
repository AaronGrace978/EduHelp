import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EduHelp — Special Education Eligibility, Made Clear",
  description:
    "Upload evaluations, IEP/504 reports, or test results and get a plain-English summary of what your child may be eligible for under Colorado and California special education law.",
  metadataBase: new URL("https://eduhelp.app"),
  openGraph: {
    title: "EduHelp — Special Education Eligibility, Made Clear",
    description:
      "Plain-English IEP / 504 eligibility insights for families in Colorado and California.",
    type: "website",
  },
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
      </body>
    </html>
  );
}
