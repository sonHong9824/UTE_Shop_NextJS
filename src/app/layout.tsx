"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { StatsProvider } from "@/contexts/StatsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StatsProvider>
          <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main content - Adjusts based on sidebar state */}
            <div
              className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${collapsed ? 'lg:ml-20' : 'lg:ml-72'
                }`}
            >
              <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">{children}</div>
              </main>
            </div>
          </div>
        </StatsProvider>
      </body>
    </html>
  );
}