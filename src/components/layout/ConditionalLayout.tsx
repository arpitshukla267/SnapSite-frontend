"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../website/Header";
import Footer from "../website/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Paths where the header and footer should be hidden
  const hideLayoutPaths = ["/login", "/signup", "/builder"];
  
  // Check if current path starts with /builder (to handle sub-routes if any) or exactly matches others
  const shouldHideLayout = 
    hideLayoutPaths.includes(pathname) || 
    pathname?.startsWith("/builder");

  return (
    <>
      {!shouldHideLayout && <Header />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}
