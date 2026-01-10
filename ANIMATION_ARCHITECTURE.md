# Animation Architecture - Complete Refactor

## Problem Statement

The builder preview showed advanced animations (gradients, waves, particles, motion), but exported output (HTML/React/Next.js) did not match. Animations were:
- Missing or simplified
- Static instead of animated
- Different speeds/directions
- Some effects completely absent

## Root Causes Identified

1. **Builder-Only Runtime Logic**: Animations depended on `useEffect`, editor state, or builder-only flags
2. **Non-exported Animation Config**: Config existed only in local React state, not serialized
3. **CSS/JS Split Issue**: Builder used inline styles and dynamic classes, export missed keyframes
4. **Canvas/SVG Loss**: Background effects using `<canvas>` or `<svg>` were not recreated in export

## Solution Architecture

### 1. Single Source of Truth: Animation Config System

**Location**: `frontend/src/lib/animations/config.ts`

All animations are now driven from a pure, serializable config object:

```typescript
interface BackgroundAnimationConfig {
  type: "animated-gradient" | "waves" | "particles" | "grid" | "orbs" | "mesh" | "none";
  gradient?: {
    colors: string[];
    angle?: number;
    stops?: number[];
  };
  animation?: {
    speed: number;
    direction: "horizontal" | "vertical" | "diagonal" | "radial";
    easing: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
    loop: boolean;
  };
  overlay?: {
    waves?: { enabled: boolean; amplitude: number; frequency: number; ... };
    particles?: { enabled: boolean; count: number; size: {...}; speed: {...}; ... };
    grid?: { enabled: boolean; size: number; color?: string; ... };
    orbs?: { enabled: boolean; count: number; colors: string[]; ... };
  };
}
```

**Key Features**:
- Fully serializable (JSON-compatible)
- Used by builder preview
- Persisted in section JSON (`block.props.animationConfig`)
- Reused unchanged by export
- Default configs for each section type

### 2. Shared Animation Renderer

**Location**: `frontend/src/lib/animations/renderer.ts`

Extracted all animation logic into shared utilities that work identically in builder and export:

- `generateAnimationCSS(config)` - Generates CSS keyframes
- `generateGradientStyle(config)` - Generates inline gradient styles
- `generateParticleJS(config, canvasId)` - Generates JavaScript for canvas particles
- `generateParticleCanvas(config, canvasId)` - Generates canvas HTML
- `generateGridHTML(config)` - Generates grid overlay HTML
- `generateOrbsHTML(config)` - Generates floating orbs HTML

**No builder-only code** - these functions work in:
- Static HTML
- React CSR
- Next.js SSR + hydration

### 3. React Hooks for Builder

**Location**: `frontend/src/lib/animations/hooks.tsx`

Builder-specific hooks that use the shared config:

- `useParticleCanvas(config, canvasRef)` - Canvas particle animation
- `useMousePosition(enabled)` - Optional mouse tracking
- `<AnimatedGradientBackground config={...} />` - Gradient component
- `<FloatingOrbs config={...} />` - Framer Motion orbs
- `<AnimatedGrid config={...} />` - Grid overlay

These hooks use the **same config** as the export, ensuring parity.

### 4. Export Pipeline Integration

**Location**: `frontend/src/lib/exporter.ts`

The export pipeline now:

1. **Extracts animation config** from `block.props.animationConfig` or uses defaults
2. **Generates CSS** via `generateAnimationCSS()` and includes in `sections.css`
3. **Generates JavaScript** via `generateParticleJS()` and includes in HTML `<script>`
4. **Injects HTML** for canvas, grid, and orbs via renderer functions
5. **Ensures animations start on load**, not on editor events

**Key Changes**:
- `generateSectionsCSS()` now calls `generateAnimationCSS()` for each section
- `exportToHTML()` extracts config, generates JS, and injects HTML
- Particle JS is generated per-section and included in the export

### 5. Component Refactoring Pattern

**Before** (HeroAnimated.tsx):
```typescript
// Hardcoded values
const particles = [];
for (let i = 0; i < 50; i++) { ... } // ❌ Not configurable

// Builder-only logic
const isInView = useInView(ref, { once: true }); // ❌ Builder-only

// Inline styles
const backgroundStyle = gradientColors && gradientColors.length >= 2
  ? { background: `linear-gradient(...)`, animation: "gradientShift 15s ease infinite" }
  : { backgroundColor }; // ❌ Not serialized
```

**After** (Refactored):
```typescript
// Get config from props (with defaults)
const defaultConfig = getDefaultAnimationConfig("heroAnimated");
const animationConfig = mergeAnimationConfig(
  props.animationConfig || {},
  defaultConfig
);

// Use shared hooks
useParticleCanvas(animationConfig, canvasRef);

// Use shared renderer
const backgroundStyle = generateGradientStyle(animationConfig);

// Use shared components
<AnimatedGrid config={animationConfig} />
<FloatingOrbs config={animationConfig} />
```

## Implementation Status

✅ **Completed**:
1. Animation config system (`config.ts`)
2. Shared renderer utilities (`renderer.ts`)
3. React hooks for builder (`hooks.tsx`)
4. Export pipeline integration (`exporter.ts`)
5. CSS generation for all animation types
6. JavaScript generation for particles
7. HTML generation for canvas/grid/orbs

🔄 **Next Steps** (To Complete):
1. Refactor `HeroAnimated.tsx` to use new system
2. Refactor `HeroAdvanced.tsx` to use new system
3. Update `sectionRegistry.ts` to include animation config in HTML exports
4. Add animation config to theme customizer UI
5. Test visual parity between builder and export

## Usage Example

### In Builder Component

```typescript
import { getDefaultAnimationConfig, mergeAnimationConfig } from "@/lib/animations/config";
import { useParticleCanvas, AnimatedGrid, FloatingOrbs } from "@/lib/animations/hooks";
import { generateGradientStyle } from "@/lib/animations/renderer";

export default function HeroAnimated({ animationConfig, ...props }) {
  const defaultConfig = getDefaultAnimationConfig("heroAnimated");
  const config = mergeAnimationConfig(animationConfig || {}, defaultConfig);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(config, canvasRef);
  
  const backgroundStyle = generateGradientStyle(config);
  
  return (
    <section style={backgroundStyle}>
      <canvas ref={canvasRef} data-particle />
      <AnimatedGrid config={config} />
      <FloatingOrbs config={config} />
      {/* Content */}
    </section>
  );
}
```

### In Export (Automatic)

The export pipeline automatically:
1. Extracts `animationConfig` from `block.props`
2. Generates CSS keyframes
3. Generates JavaScript for particles
4. Injects canvas/grid/orbs HTML
5. Includes everything in the exported file

**No manual work needed** - the system handles it all.

## Benefits

1. **Single Source of Truth**: Config drives everything
2. **Visual Parity**: Builder and export use identical code paths
3. **Serializable**: Config is JSON, works everywhere
4. **Scalable**: Add new sections by defining default config
5. **Maintainable**: Animation logic in one place
6. **No Hacks**: No builder-only conditions or workarounds

## Migration Guide

To migrate an existing section:

1. **Add default config** to `config.ts`:
```typescript
export const defaultAnimationConfigs = {
  yourSection: {
    type: "animated-gradient",
    gradient: { colors: ["#...", "#..."], angle: 135 },
    animation: { speed: 1.0, direction: "diagonal", easing: "ease", loop: true },
    overlay: { /* ... */ }
  }
};
```

2. **Refactor component** to use hooks and renderer
3. **Update HTML export** in `sectionRegistry.ts` to use renderer functions
4. **Test** builder preview and exported file match

That's it! The system handles the rest.

