import { SectionRegistry } from "./sectionRegistry";

export function exportToReact(layout: any[]) {
  const imports = new Map<string, string>();
  let body = "";

  layout.forEach((block) => {
    const entry = SectionRegistry[block.type];
    if (!entry) return;

    const meta = entry.export.react;
    imports.set(meta.name, meta.path);

    const props = Object.entries(block.props || {})
      .map(([key, value]) =>
        typeof value === "string"
          ? `${key}="${value}"`
          : `${key}={${JSON.stringify(value)}}`
      )
      .join(" ");

    body += `      <${meta.name} ${props} />\n`;
  });

  const importLines = [...imports.entries()]
    .map(([name, path]) => `import ${name} from "${path}";`)
    .join("\n");

  return `${importLines}

export default function Page() {
  return (
    <>
${body}    </>
  );
}
`;
}

// Generate comprehensive CSS file
export function generateStylesCSS() {
  return `/* ===== RESET & BASE STYLES ===== */
html, body {
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
  color: #171717;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0a0a0a;
    color: #ededed;
  }
}

/* ===== ANIMATIONS ===== */
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

/* ===== GLASSMORPHISM ===== */
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

/* ===== GRADIENT TEXT ===== */
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

/* ===== GRID PATTERN ===== */
.grid-pattern {
  background-image: linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* ===== UTILITIES ===== */
.input-dark {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  color: white;
  outline: none;
}

.input-dark::placeholder {
  color: #cfcfcf;
}

.btn-dark {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  border-radius: 10px;
  color: white;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.btn-dark:hover {
  opacity: 0.85;
}

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
  background: linear-gradient(45deg, #8b5cf6, #ec4899, #60a5fa);
}

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

/* ===== RESPONSIVE UTILITIES ===== */
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

// Generate JavaScript file for interactions
export function generateScriptsJS() {
  return `// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add animation delays to elements with data-animation-delay
  document.querySelectorAll('[data-animation-delay]').forEach(function(el) {
    const delay = el.getAttribute('data-animation-delay');
    el.style.animationDelay = delay;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
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
});
`;
}

export function exportToHTML(layout: any[]) {
  let bodyContent = "";

  layout.forEach((block) => {
    const entry = SectionRegistry[block.type];
    if (!entry) return;

    const htmlExport = entry.export.html;
    if (typeof htmlExport === "function") {
      bodyContent += htmlExport(block.props || {}) + "\n";
    }
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="styles.css">
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
<script src="scripts.js"></script>
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

// ZIP Export Functions
// ZIP Export Functions
export async function exportNextJsZip(layout: any[]) {
  try {
    console.log("Starting Next.js export...");
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

    // Generate component code
    const componentCode = exportToReact(layout);

    // Add files to ZIP
    zip.file("app/page.tsx", componentCode);
  
    // Add package.json
    const packageJson = {
      name: "nextjs-export",
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        react: "^18",
        "react-dom": "^18",
        next: "^15",
      },
    };
    zip.file("package.json", JSON.stringify(packageJson, null, 2));

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
`
    );

    // Generate and download
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/zip" });
    console.log("Generated Node Blob Size:", blob.size);
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
    alert("Export failed. Check console for details.");
  }
}

export async function exportReactZip(layout: any[]) {
  try {
    console.log("Starting React export...");
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

  // Generate component code
  const componentCode = exportToReact(layout);

  // Add files to ZIP
  zip.file("src/App.jsx", componentCode);
  zip.file("src/index.jsx", `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`);
  
  zip.file("public/index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`);

  // Add package.json
  const packageJson = {
    name: "react-export",
    version: "0.1.0",
    private: true,
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

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
    alert("Export failed. Check console for details.");
  }
}

export async function exportHTMLZip(layout: any[]) {
  try {
    console.log("Starting HTML export...");
    const jsZipModule: any = await import("jszip");
    const JSZip = jsZipModule.default || jsZipModule;
    const zip = new JSZip();

  // Generate HTML
  const htmlCode = exportToHTML(layout);

  // Generate CSS and JS
  const cssCode = generateStylesCSS();
  const jsCode = generateScriptsJS();

  // Add files to ZIP
  zip.file("index.html", htmlCode);
  zip.file("styles.css", cssCode);
  zip.file("scripts.js", jsCode);

  // Add README
  zip.file(
    "README.md",
    `# HTML Export

## Getting Started

Simply open \`index.html\` in your browser to view your website.

All necessary files are included:
- \`index.html\` - Main HTML file
- \`styles.css\` - All CSS styles and animations
- \`scripts.js\` - JavaScript for interactions

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
    alert("Export failed. Check console for details.");
  }
}
