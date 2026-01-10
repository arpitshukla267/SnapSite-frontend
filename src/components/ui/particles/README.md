# Particle Background Components

This folder contains reusable particle animation background components that can be used in any section.

## Available Components

1. **ParticleStars** - A starfield effect with twinkling stars that move slowly across the screen
2. **ParticleFloating** - Floating particles that move in smooth, organic patterns with connections between nearby particles
3. **ParticleBubbles** - Floating bubbles that rise from the bottom with varying sizes and speeds
4. **ParticleDots** - Small dots that move in a grid-like pattern with smooth motion
5. **ParticleWaves** - Particles that move in wave-like patterns creating flowing motion

## Usage

```tsx
import { ParticleStars } from "@/components/ui/particles";

export default function MySection() {
  return (
    <section className="relative min-h-screen">
      <ParticleStars 
        count={100}
        speed={0.2}
        color="255, 255, 255"
        opacity={0.8}
      />
      {/* Your content here */}
    </section>
  );
}
```

## Props

All particle components accept the following props:

- `count?: number` - Number of particles (default varies by component)
- `speed?: number` - Animation speed (default: 0.2-0.5)
- `color?: string` - RGB color as "r, g, b" (default: "255, 255, 255")
- `opacity?: number` - Opacity level 0-1 (default: 0.3-0.8)
- `className?: string` - Additional CSS classes

### Component-Specific Props

- **ParticleFloating**: `connectDistance?: number` - Distance threshold for connecting particles
- **ParticleBubbles**: `maxSize?: number` - Maximum bubble size
- **ParticleDots**: `size?: number` - Base dot size
- **ParticleWaves**: `waveAmplitude?: number`, `waveFrequency?: number` - Wave motion parameters

## Export

These components are automatically included in exported templates in the `components/ui/particles/` folder (Next.js) or `src/components/ui/particles/` folder (React).


