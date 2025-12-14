"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../website/Header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Paths where the header should be hidden
  const hideHeaderPaths = ["/login", "/signup", "/builder"];
  
  // Check if current path starts with /builder (to handle sub-routes if any) or exactly matches others
  const shouldHideHeader = 
    hideHeaderPaths.includes(pathname) || 
    pathname?.startsWith("/builder");

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
