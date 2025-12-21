/**
 * Global Theme Context
 * Provides semantic design tokens and CSS variable mapping
 */

"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeTokens, defaultThemeTokens, mapTokensToCSSVariables } from "../lib/theme/tokens";

interface ThemeContextType {
  tokens: ThemeTokens;
  updateToken: (path: string, value: string) => void;
  updateTokens: (updates: Partial<ThemeTokens>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children,
  initialTokens 
}: { 
  children: ReactNode;
  initialTokens?: ThemeTokens;
}) {
  const [tokens, setTokens] = useState<ThemeTokens>(
    initialTokens || defaultThemeTokens
  );

  // Apply CSS variables to document root
  useEffect(() => {
    const cssVars = mapTokensToCSSVariables(tokens);
    const root = document.documentElement;
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Also store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("themeTokens", JSON.stringify(tokens));
    }
  }, [tokens]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("themeTokens");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTokens(parsed);
        } catch (e) {
          console.warn("Failed to load theme from localStorage", e);
        }
      }
    }
  }, []);

  const updateToken = (path: string, value: string) => {
    setTokens((prev) => {
      const newTokens = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let current: any = newTokens;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newTokens;
    });
  };

  const updateTokens = (updates: Partial<ThemeTokens>) => {
    setTokens((prev) => ({
      ...prev,
      ...updates,
      colors: {
        ...prev.colors,
        ...updates.colors,
        text: {
          ...prev.colors.text,
          ...updates.colors?.text,
        },
        action: {
          ...prev.colors.action,
          ...updates.colors?.action,
        },
      },
    }));
  };

  const resetTheme = () => {
    setTokens(defaultThemeTokens);
  };

  return (
    <ThemeContext.Provider value={{ tokens, updateToken, updateTokens, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
