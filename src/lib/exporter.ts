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
  <style>
    /* Custom Global Styles */
    /* Animations */
    @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .animate-gradient-slow { background-size: 200% 200%; animation: gradientMove 12s ease infinite; }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
    @keyframes blobMove { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px, -60px) scale(1.2); } }
    .blob1, .blob2 { position: absolute; width: 350px; height: 350px; background: radial-gradient(circle, rgba(255,0,200,0.4) 0%, rgba(0,0,0,0) 70%); filter: blur(80px); border-radius: 50%; animation: blobMove 20s infinite ease-in-out; }
    .blob1 { top: -50px; left: -50px; }
    .blob2 { bottom: -80px; right: -40px; animation-delay: -5s; }
    @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    .shimmer { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); background-size: 1000px 100%; animation: shimmer 2s infinite; }
    
    /* Glassmorphism */
    .glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
    .glass-dark { background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
    
    /* Utilities */
    .grid-pattern { background-image: linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px); background-size: 50px 50px; }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
    }
  </style>
</head>
<body>
${bodyContent}
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

  // Add files to ZIP
  zip.file("index.html", htmlCode);

  // Add README
  zip.file(
    "README.md",
    `# HTML Export

## Getting Started

Simply open \`index.html\` in your browser to view your website.

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
