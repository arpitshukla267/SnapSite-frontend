import { SectionRegistry } from "./sectionRegistry";

// Helper function to convert HTML to React JSX
function htmlToJsx(html: string): string {
  let jsx = html
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")
    // Convert template literals ${props.xxx || "default"} to JSX {xxx || "default"}
    // Handle complex expressions like ${props.title || "Welcome"}
    .replace(/\$\{props\.(\w+)(\s*\|\|\s*"[^"]*")?\}/g, (match, propName, defaultValue) => {
      if (defaultValue) {
        return `{${propName}${defaultValue}}`;
      }
      return `{${propName}}`;
    })
    // Convert other template expressions
    .replace(/\$\{([^}]+)\}/g, "{$1}")
    // Convert class to className (be careful with word boundaries)
    .replace(/\bclass=/g, "className=")
    // Convert for to htmlFor
    .replace(/\bfor=/g, "htmlFor=")
    // Handle inline styles - convert to JSX format
    .replace(/style="([^"]*)"/g, (match, style) => {
      if (!style.trim()) return 'style={{}}';
      const stylePairs = style
        .split(";")
        .filter((s: string) => s.trim())
        .map((s: string) => {
          const colonIndex = s.indexOf(":");
          if (colonIndex === -1) return null;
          const key = s.substring(0, colonIndex).trim();
          const value = s.substring(colonIndex + 1).trim();
          const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          return `${camelKey}: "${value}"`;
        })
        .filter((s: any) => s !== null);
      return `style={{ ${stylePairs.join(", ")} }}`;
    })
    // Preserve line breaks for better formatting
    .replace(/>\s+</g, ">\n      <")
    // Normalize excessive whitespace but keep structure
    .replace(/[ \t]+/g, " ")
    .trim();
  
  // Format the JSX with proper indentation
  const lines = jsx.split("\n");
  const formatted = lines.map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    // Add indentation
    return "      " + trimmed;
  }).filter(line => line.trim()).join("\n");
  
  return formatted;
}

// Generate React component code from HTML
function generateReactComponent(componentName: string, htmlCode: string, props: any): string {
  const jsx = htmlToJsx(htmlCode);
  
  // Extract props used in the component
  const propNames = Object.keys(props || {});
  const propTypes = propNames.length > 0 
    ? propNames.map(p => `${p}${props[p] === undefined ? "?" : ""}: ${getPropType(props[p])}`).join(", ")
    : "";
  
  const propsInterface = propTypes ? `: { ${propTypes} }` : "";
  const propsDestructure = propNames.length > 0 ? `{ ${propNames.join(", ")} }` : "";
  
  return `export default function ${componentName}(${propsDestructure}${propsInterface}) {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
}

function getPropType(value: any): string {
  if (Array.isArray(value)) return "any[]";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (value === null || value === undefined) return "any";
  if (typeof value === "object") return "any";
  return "any";
}

// Generate component code for export
export function generateComponentCode(block: any): { name: string; code: string } {
  const entry = SectionRegistry[block.type];
  if (!entry || !entry.export.html) {
    throw new Error(`Component ${block.type} not found or has no HTML export`);
  }

  const componentName = entry.export.react?.name || entry.export.next?.name || block.type;
  const htmlCode = typeof entry.export.html === "function" 
    ? entry.export.html(block.props || {})
    : entry.export.html;
  
  const componentCode = generateReactComponent(componentName, htmlCode, block.props || {});
  
  return { name: componentName, code: componentCode };
}

// Generate main page component
export function exportToReact(layout: any[], isNextJs: boolean = false): { pageCode: string; components: Map<string, string> } {
  const components = new Map<string, string>();
  const imports: string[] = [];
  let body = "";

  layout.forEach((block, index) => {
    try {
      const { name, code } = generateComponentCode(block);
      
      // Store component code
      components.set(name, code);
      
      // Generate import - Next.js uses ../components, React uses ./components
      const importPath = isNextJs 
        ? `../components/${name}`
        : `./components/${name}`;
      imports.push(`import ${name} from "${importPath}";`);
      
      // Generate props for component usage
      const props = Object.entries(block.props || {})
        .map(([key, value]) => {
          if (typeof value === "string") {
            return `${key}="${value.replace(/"/g, '\\"')}"`;
          } else if (typeof value === "number" || typeof value === "boolean") {
            return `${key}={${value}}`;
          } else {
            return `${key}={${JSON.stringify(value)}}`;
          }
        })
        .join(" ");
      
      body += `      <${name} ${props} />\n`;
    } catch (error) {
      console.error(`Error generating component for ${block.type}:`, error);
    }
  });

  const pageCode = `${imports.join("\n")}

export default function Page() {
  return (
    <>
${body}    </>
  );
}
`;

  return { pageCode, components };
}

// ===== NEW REFACTORED CSS GENERATORS =====

// Generate core.css - reset, typography, variables, layout utilities
function generateCoreCSS() {
  return `/* ===== CORE STYLES - Reset, Typography, Variables, Layout ===== */

/* CSS Variables */
:root {
  --color-primary: #8b5cf6;
  --color-secondary: #ec4899;
  --color-accent: #60a5fa;
  --color-background: #ffffff;
  --color-foreground: #171717;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-foreground: #ededed;
  }
}

/* Reset & Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.8;
}

/* Layout Utilities */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section {
  width: 100%;
  position: relative;
}

/* Responsive Utilities */
@media (min-width: 640px) {
  .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
  .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .sm\\:flex-row { flex-direction: row; }
}

@media (min-width: 768px) {
  .md\\:text-7xl { font-size: 4.5rem; line-height: 1; }
  .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
  .md\\:text-5xl { font-size: 3rem; line-height: 1; }
  .md\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:text-8xl { font-size: 6rem; line-height: 1; }
  .lg\\:text-7xl { font-size: 5rem; line-height: 1; }
  .lg\\:text-6xl { font-size: 4rem; line-height: 1; }
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
`;
}

// Generate components.css - buttons, cards, forms, modals
function generateComponentsCSS() {
  return `/* ===== COMPONENT STYLES - Buttons, Cards, Forms, Modals ===== */

/* Buttons */
.btn-dark {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-lg);
  color: white;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-dark:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.btn-gradient-pink {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  transition: all 0.3s ease;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-gradient-pink:hover {
  background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(245, 87, 108, 0.4);
}

/* Cards */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
}

/* Forms */
.input-dark {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-lg);
  color: white;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-dark:focus {
  border-color: var(--color-primary);
}

.input-dark::placeholder {
  color: #cfcfcf;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-blue {
  background: linear-gradient(to right, var(--color-accent), var(--color-primary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-pink {
  background: linear-gradient(to right, var(--color-secondary), #f43f5e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
}

.gradient-border {
  position: relative;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  margin: -2px;
  border-radius: inherit;
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-accent));
}
`;
}

// Generate sections.css - all section layouts with scoped class names
function generateSectionsCSS(layout: any[]) {
  const sectionTypes = new Set<string>();
  layout.forEach((block) => {
    if (block.type) {
      sectionTypes.add(block.type);
    }
  });

  let sectionsCSS = `/* ===== SECTION STYLES - Scoped by data-section attribute ===== */\n\n`;

  // Add common section animations
  sectionsCSS += `/* Common Animations */
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-slow {
  background-size: 200% 200%;
  animation: gradientMove 12s ease infinite;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes slideInLeft {
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(50px); }
  100% { opacity: 1; transform: translateX(0); }
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out;
}

@keyframes scaleIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.animate-scaleIn {
  animation: scaleIn 0.6s ease-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes blobMove {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(80px, -60px) scale(1.2); }
}

.blob1, .blob2 {
  position: absolute;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255,0,200,0.4) 0%, rgba(0,0,0,0) 70%);
  filter: blur(80px);
  border-radius: 50%;
  animation: blobMove 20s infinite ease-in-out;
}

.blob1 {
  top: -50px;
  left: -50px;
}

.blob2 {
  bottom: -80px;
  right: -40px;
  animation-delay: -5s;
}

/* Grid Pattern */
.grid-pattern {
  background-image: linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Section Scoping - All sections are scoped by data-section attribute */
[data-section] {
  position: relative;
  width: 100%;
}

`;

  return sectionsCSS;
}

// Generate main.js - single JS file with data-attribute initialization
function generateMainJS(layout: any[]) {
  const sectionTypes = new Set<string>();
  layout.forEach((block) => {
    if (block.type) {
      sectionTypes.add(block.type);
    }
  });

  let mainJS = `// ===== MAIN.JS - Data-attribute based initialization =====
(function() {
  'use strict';

  // Section initialization registry
  const sectionInitializers = {};

  // Register section initializer
  function registerSection(type, initFn) {
    sectionInitializers[type] = initFn;
  }

  // Initialize all sections
  function initAllSections() {
    document.querySelectorAll('[data-section]').forEach(function(section) {
      const sectionType = section.getAttribute('data-section');
      if (sectionType && sectionInitializers[sectionType]) {
        try {
          sectionInitializers[sectionType](section);
        } catch (error) {
          console.warn('Failed to initialize section:', sectionType, error);
        }
      }
    });
  }

  // Common utilities
  function initAnimations() {
    // Add animation delays to elements with data-animation-delay
    document.querySelectorAll('[data-animation-delay]').forEach(function(el) {
      const delay = el.getAttribute('data-animation-delay');
      if (delay) {
        el.style.animationDelay = delay;
      }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-fadeInUp, .animate-slideInLeft, .animate-slideInRight').forEach(function(el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Initialize sections based on data-section attribute
`;

  // Add section-specific initializers for each section type
  sectionTypes.forEach((type) => {
    const sectionName = type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    mainJS += `
  // Initialize ${type} sections
  registerSection('${sectionName}', function(section) {
    // ${type} section initialization
    // Add any section-specific logic here
  });
`;
  });

  mainJS += `
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initAnimations();
      initSmoothScroll();
      initAllSections();
    });
  } else {
    initAnimations();
    initSmoothScroll();
    initAllSections();
  }
})();
`;

  return mainJS;
}

// Legacy function for backward compatibility
export function generateStylesCSS() {
  return generateCoreCSS() + '\n\n' + generateComponentsCSS() + '\n\n' + generateSectionsCSS([]);
}

// Legacy function for backward compatibility - now uses main.js
export function generateScriptsJS() {
  return generateMainJS([]);
}

// Helper to convert section type to data-section value
function getSectionName(type: string): string {
  return type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

// Helper to add data-section attribute to HTML
function addDataSectionAttribute(html: string, sectionType: string): string {
  const sectionName = getSectionName(sectionType);
  // Find the first <section> tag and add data-section attribute
  return html.replace(/<section\s+class="([^"]*)"/, `<section class="$1" data-section="${sectionName}"`);
}

export function exportToHTML(layout: any[]) {
  let bodyContent = "";

  layout.forEach((block) => {
    const entry = SectionRegistry[block.type];
    if (!entry) return;

    const htmlExport = entry.export.html;
    if (typeof htmlExport === "function") {
      let sectionHTML = htmlExport(block.props || {});
      // Add data-section attribute
      sectionHTML = addDataSectionAttribute(sectionHTML, block.type);
      bodyContent += sectionHTML + "\n";
    }
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="assets/css/core.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/sections.css">
  <style>
    /* Reset & Base Styles */
    html, body { min-height: 100%; width: 100%; margin: 0; padding: 0; overflow-x: hidden; scroll-behavior: smooth; }
    body { background: var(--background); color: var(--foreground); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    
    /* Variables */
    :root {
      --background: #ffffff;
      --foreground: #171717;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --background: #0a0a0a;
        --foreground: #ededed;
      }
    }

    /* Custom Global Styles from globals.css */
    /* Smooth animated gradient */
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .animate-gradient-slow {
      background-size: 200% 200%;
      animation: gradientMove 12s ease infinite;
    }

    /* Floating blobs */
    .blob1, .blob2 {
      position: absolute;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(255,0,200,0.4) 0%, rgba(0,0,0,0) 70%);
      filter: blur(80px);
      border-radius: 50%;
      animation: blobMove 20s infinite ease-in-out;
    }

    .blob1 { top: -50px; left: -50px; }
    .blob2 { bottom: -80px; right: -40px; animation-delay: -5s; }

    @keyframes blobMove {
      0%, 100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(80px, -60px) scale(1.2); }
    }

    /* Input styling */
    .input-dark {
      width: 100%;
      padding: 12px 15px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 10px;
      color: white;
      outline: none;
    }

    .input-dark::placeholder { color: #cfcfcf; }

    /* Button styling */
    .btn-dark {
      width: 100%;
      padding: 12px;
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      border-radius: 10px;
      color: white;
      font-weight: 600;
      transition: 0.2s ease-in-out;
    }
    .btn-dark:hover { opacity: 0.85; }

    /* ===== ENHANCED ANIMATIONS ===== */
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }

    @keyframes slideInLeft {
      0% { opacity: 0; transform: translateX(-50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }

    @keyframes slideInRight {
      0% { opacity: 0; transform: translateX(50px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slideInRight { animation: slideInRight 0.8s ease-out; }

    @keyframes scaleIn {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }
    .animate-scaleIn { animation: scaleIn 0.6s ease-out; }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }

    /* ===== GLASSMORPHISM UTILITIES ===== */
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .glass-dark {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }

    /* ===== GRADIENT TEXT UTILITIES ===== */
    .gradient-text {
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gradient-text-blue {
      background: linear-gradient(to right, #60a5fa, #a855f7);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gradient-text-pink {
      background: linear-gradient(to right, #ec4899, #f43f5e);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* ===== HOVER EFFECTS ===== */
    .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); }

    .hover-glow { transition: box-shadow 0.3s ease; }
    .hover-glow:hover { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(236, 72, 153, 0.4); }

    /* ===== GRID PATTERN ===== */
    .grid-pattern {
      background-image: linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
    }

    /* ===== GRADIENT BORDER ===== */
    .gradient-border {
      position: relative;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    .gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      margin: -2px;
      border-radius: inherit;
      background: linear-gradient(45deg, #8b5cf6, #ec4899, #60a5fa);
    }

    /* ===== BUTTON ENHANCEMENTS ===== */
    .btn-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
    }
    .btn-gradient:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-gradient-pink {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      transition: all 0.3s ease;
    }
    .btn-gradient-pink:hover {
      background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(245, 87, 108, 0.4);
    }
  </style>
</head>
<body>
${bodyContent}
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Validation function
function validateExport(layout: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!layout || layout.length === 0) {
    errors.push("Layout is empty");
    return { valid: false, errors };
  }
  
  layout.forEach((block, index) => {
    if (!block.type) {
      errors.push(`Block ${index + 1} is missing type`);
    } else if (!SectionRegistry[block.type]) {
      errors.push(`Block ${index + 1} has unknown type: ${block.type}`);
    } else if (!SectionRegistry[block.type].export?.html) {
      errors.push(`Block ${index + 1} (${block.type}) has no export definition`);
    }
  });
  
  return { valid: errors.length === 0, errors };
}

// ZIP Export Functions
export async function exportNextJsZip(layout: any[]) {
  try {
    console.log("Starting Next.js export...");
    
    // Validate export
    const validation = validateExport(layout);
    if (!validation.valid) {
      throw new Error(`Export validation failed: ${validation.errors.join(", ")}`);
    }
    
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

    // Generate component code (pass true for Next.js to use correct import paths)
    const { pageCode, components } = exportToReact(layout, true);

    // Create components directory and add component files
    components.forEach((code, name) => {
      // Ensure component code is not empty
      if (!code || code.trim().length === 0) {
        console.warn(`Component ${name} has empty code, skipping...`);
        return;
      }
      zip.file(`components/${name}.tsx`, code);
      console.log(`Created component: components/${name}.tsx`);
    });
    
    // Verify all components were created
    if (components.size === 0) {
      throw new Error("No components were generated. Please check your layout.");
    }

    // Add main page
    zip.file("app/page.tsx", pageCode);
    
    // Add layout file
    zip.file("app/layout.tsx", `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Website",
  description: "Generated with SnapSite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`);

    // Add globals.css
    zip.file("app/globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

${generateStylesCSS()}
`);

    // Add Tailwind config
    zip.file("tailwind.config.ts", `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
`);

    // Add postcss config
    zip.file("postcss.config.mjs", `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
`);

    // Add next.config.mjs
    zip.file("next.config.mjs", `/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`);

    // Add tsconfig.json
    zip.file("tsconfig.json", `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

    // Add package.json with all dependencies
    const packageJson = {
      name: "nextjs-export",
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        next: "^14.0.0",
      },
      devDependencies: {
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        typescript: "^5",
        tailwindcss: "^3.3.0",
        postcss: "^8",
        autoprefixer: "^10.0.1",
      },
    };
    zip.file("package.json", JSON.stringify(packageJson, null, 2));

    // Add .gitignore
    zip.file(".gitignore", `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`);

    // Add README
    zip.file(
      "README.md",
      `# Next.js Export

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- \`app/page.tsx\` - Main page component
- \`app/layout.tsx\` - Root layout
- \`app/globals.css\` - Global styles
- \`components/\` - Reusable components

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`
`
    );

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/zip" });
    console.log("Generated Next.js Blob Size:", blob.size);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nextjs-export.zip";
    link.style.display = "none";
    document.body.appendChild(link);
    
    // Dispatch click event
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(clickEvent);
    
    // Delay revocation and removal
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 2000);
    
    console.log("Next.js export completed.");
  } catch (error) {
    console.error("Export failed:", error);
    throw error; // Let the caller handle the error with toast
  }
}

export async function exportReactZip(layout: any[]) {
  try {
    console.log("Starting React export...");
    
    // Validate export
    const validation = validateExport(layout);
    if (!validation.valid) {
      throw new Error(`Export validation failed: ${validation.errors.join(", ")}`);
    }
    
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

    // Generate component code
    const { pageCode, components } = exportToReact(layout);

    // Create components directory and add component files
    components.forEach((code, name) => {
      zip.file(`src/components/${name}.tsx`, code);
    });

    // Add main App component
    zip.file("src/App.tsx", pageCode);
    
    // Add index file
    zip.file("src/index.tsx", `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

    // Add index.css
    zip.file("src/index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

${generateStylesCSS()}
`);

    // Add public/index.html
    zip.file("public/index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Generated with SnapSite"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`);

    // Add Tailwind config
    zip.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`);

    // Add postcss config
    zip.file("postcss.config.js", `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);

    // Add tsconfig.json
    zip.file("tsconfig.json", `{
  "compilerOptions": {
    "target": "ES2015",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
`);

    // Add package.json with all dependencies
    const packageJson = {
      name: "react-export",
      version: "0.1.0",
      private: true,
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
      devDependencies: {
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@types/node": "^20",
        typescript: "^4.9.5",
        "react-scripts": "5.0.1",
        tailwindcss: "^3.3.0",
        postcss: "^8.4.0",
        autoprefixer: "^10.4.0",
      },
      scripts: {
        start: "react-scripts start",
        build: "react-scripts build",
        test: "react-scripts test",
        eject: "react-scripts eject",
      },
      browserslist: {
        production: [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        development: [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      }
    };
    zip.file("package.json", JSON.stringify(packageJson, null, 2));

    // Add .gitignore
    zip.file(".gitignore", `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`);

    // Add README
    zip.file(
      "README.md",
      `# React Export

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm start
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- \`src/App.tsx\` - Main App component
- \`src/index.tsx\` - Entry point
- \`src/index.css\` - Global styles
- \`src/components/\` - Reusable components

## Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`build\` folder.
`
    );

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/zip" });
    console.log("Generated React Blob Size:", blob.size);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "react-export.zip";
    link.style.display = "none";
    document.body.appendChild(link);
    
    // Dispatch click event
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(clickEvent);
    
    // Delay revocation and removal
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 2000);
    
    console.log("React export completed.");
  } catch (error) {
    console.error("React Export failed:", error);
    throw error; // Let the caller handle the error with toast
  }
}

export async function exportHTMLZip(layout: any[]) {
  try {
    console.log("Starting HTML export...");
    
    // Validate export
    const validation = validateExport(layout);
    if (!validation.valid) {
      throw new Error(`Export validation failed: ${validation.errors.join(", ")}`);
    }
    
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

    // Generate HTML with data-section attributes
    const htmlCode = exportToHTML(layout);

    // Generate shared CSS files
    const coreCSS = generateCoreCSS();
    const componentsCSS = generateComponentsCSS();
    const sectionsCSS = generateSectionsCSS(layout);

    // Generate single main.js
    const mainJS = generateMainJS(layout);

    // Add files to ZIP with new structure
    zip.file("index.html", htmlCode);
    zip.file("assets/css/core.css", coreCSS);
    zip.file("assets/css/components.css", componentsCSS);
    zip.file("assets/css/sections.css", sectionsCSS);
    zip.file("assets/js/main.js", mainJS);

    // Add README
    zip.file(
      "README.md",
      `# HTML Export

## Getting Started

Simply open \`index.html\` in your browser to view your website.

All necessary files are included:
- \`index.html\` - Main HTML file
- \`assets/css/core.css\` - Core styles (reset, typography, variables)
- \`assets/css/components.css\` - Component styles (buttons, cards, forms)
- \`assets/css/sections.css\` - Section-specific styles
- \`assets/js/main.js\` - Main JavaScript with data-attribute initialization

You can also use a local server:
\`\`\`bash
npx serve .
\`\`\`
`
    );

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/zip" });
    console.log("Generated HTML Blob Size:", blob.size);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "html-export.zip";
    link.style.display = "none";
    document.body.appendChild(link);
    
    // Dispatch click event
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(clickEvent);
    
    // Delay revocation and removal
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 2000);

    console.log("HTML export completed.");
  } catch (error) {
    console.error("HTML Export failed:", error);
    throw error; // Let the caller handle the error with toast
  }
}
