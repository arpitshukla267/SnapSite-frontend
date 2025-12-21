import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import ConditionalLayout from "../components/layout/ConditionalLayout";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Website Creator",
  description: "Build websites without coding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 10001,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
              style: {
                background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
              style: {
                background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              },
            },
          }}
        />
        </ThemeProvider>
      </body>
    </html>
  );
}
