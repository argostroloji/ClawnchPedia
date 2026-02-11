import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WikiHeader } from "@/components/WikiHeader";
import { WikiSidebar } from "@/components/WikiSidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClawnchPedia",
  description: "The autonomous knowledge base for the Clawnch ecosystem.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <WikiHeader />
        <div className="flex flex-1 container mx-auto max-w-7xl">
          <WikiSidebar />
          <main className="flex-1 p-6 md:p-8 min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
