# Diwali Proposal - Asset Implementation Guide

## Overview
This document maps the required assets for the Diwali proposal experience and provides implementation details.

## Asset Mapping

### HTML Element IDs
- `#letter-card` - Initial folded letter card
- `#letter-content` - Unfolded letter with text content
- `#proposal-cta` - Marriage proposal question
- `#yes-btn` - Primary acceptance button
- `#think-btn` - Secondary playful button
- `#yay-inline` - Celebration text reveal
- `#confetti-container` - Confetti particle container
- `#hand-cover` - Hand covering animation overlay
- `#fireworks-container` - Final fireworks scene
- `#silhouettes` - Couple silhouettes
- `#final-message` - Final overlay message

### CSS Classes
- `.font-script` - Dancing Script font for romantic text
- `.font-body` - Merriweather font for body text
- `.animate-letter-unfold` - Letter opening animation
- `.animate-text-reveal` - Text fade-in animation
- `.animate-pulse-glow` - Pulsing glow effect
- `.animate-confetti-fall` - Confetti particle animation
- `.animate-hand-cover` - Hand slide-in animation
- `.animate-hand-uncover` - Hand slide-out animation
- `.animate-firework-burst` - Firework explosion animation
- `.animate-gentle-sway` - Subtle swaying motion
- `.animate-kiss-tilt` - Kiss animation head tilt

## Asset Files Created

### Images (Generated via AI)
1. **fireworks-bg.jpg** (1920x1080)
   - Location: `src/assets/fireworks-bg.jpg`
   - Usage: Background for final fireworks scene
   - Colors: Magenta, cyan, saffron, emerald, purple, hot pink

2. **couple-silhouette.png** (800x1200)
   - Location: `src/assets/couple-silhouette.png`
   - Usage: Silhouettes of Hiba (red saree) and Sharvesh (suit)
   - Style: Black silhouettes against transparent background

3. **parchment-texture.jpg** (1024x1024)
   - Location: `src/assets/parchment-texture.jpg`
   - Usage: Background texture for letter sections
   - Colors: Warm cream and beige tones

## Animations Implemented (CSS-based)

All animations are implemented using CSS keyframes and Framer Motion for complex interactions. These replace the need for external Lottie files while providing smooth, performant animations.

### 1. Letter Unfold Animation
- **Duration**: 700ms
- **Easing**: ease-out
- **Implementation**: CSS keyframes + Framer Motion
- **Triggers**: Click/Enter on letter card

### 2. Text Reveal Animation
- **Duration**: 400ms per line
- **Delay**: 250ms between lines
- **Implementation**: Staggered Framer Motion animations
- **Features**: Per-paragraph reveal with fade + slide

### 3. Proposal CTA Animation
- **Duration**: 1200ms (infinite loop)
- **Easing**: ease-in-out
- **Implementation**: CSS keyframes pulse-glow
- **Features**: Scale + glow effect

### 4. Button Interactions
- **Yes Button**: Hover scale (1.1x), tap scale (0.95x), radial pulse
- **Think Button**: Random position escape on hover (300ms ease-out)
- **Implementation**: Framer Motion gestures

### 5. Inline Celebration
- **Duration**: 1200ms total
- **Features**: Scale burst, confetti particles (50 pieces)
- **Colors**: All firework colors from design system
- **Implementation**: CSS animation + dynamic particle generation

### 6. Hand Cover/Uncover
- **Cover Duration**: 400ms
- **Hold Duration**: 3000ms (exact)
- **Uncover Duration**: 700ms
- **Implementation**: Framer Motion with SVG hand graphic
- **Features**: Breathing micro-animation during hold

### 7. Fireworks Scene
- **Features**: 
  - Animated burst overlays (8 particles)
  - Looping 2s bursts with stagger
  - Gentle sway animation (4s)
  - Kiss tilt animation (600ms, every 15s)
  - 20 sparkle particles
- **Implementation**: Framer Motion + CSS keyframes

## Timing Specifications

### Letter Text Reveal (Part 1)
- Start: 700ms after unfold completes
- Per-line reveal: 220ms character cadence (~12-15 chars/sec)
- Line delay: 250ms
- Total approximate: 3 seconds

### Letter Text Reveal (Part 2)
- Trigger: IntersectionObserver (30% threshold)
- Per-paragraph reveal: 400ms + stagger
- Total approximate: 8 seconds

### Proposal Flow
- Pre-proposal reveal: 500ms after mount
- Proposal question: 4000ms after mount
- Buttons appear: 5000ms after mount

### Celebration Flow
- Yay text: 0-1200ms
- Subtext: 1200-2000ms
- Surprise message: 2000-3200ms
- Hand cover trigger: 3200ms

### Hand Cover
- Slide in: 400ms
- Hold: 3000ms
- Slide out: 700ms
- Total: 4100ms

### Fireworks Reveal
- Silhouettes fade: 400ms after transition
- Message reveal: 2000ms after transition
- Kiss animation: Every 15000ms

## Audio Files (To Be Added)

The following audio files should be added to the project in a future update:

1. **audio_intro.ogg** - Soft sitar/veena background loop
2. **sfx_open.ogg** - Letter opening sound
3. **sfx_type.ogg** - Typing/soft chime for paragraphs
4. **sfx_proposal.ogg** - Soft trumpet hint
5. **sfx_yay.ogg** - Joyful chime + confetti jingle
6. **sfx_hand.ogg** - Soft whoosh on cover/uncover
7. **fireworks_mix.ogg** - Fireworks audio mix

**Implementation Note**: All audio should be triggered with user interaction to comply with browser autoplay policies. Add a small "Enable Sound" toggle in the UI if needed.

## Performance Optimizations

1. **Image Loading**:
   - Preload critical assets (parchment texture)
   - Lazy load fireworks background until reveal

2. **Animation Performance**:
   - Use CSS transforms (GPU-accelerated)
   - Framer Motion automatically optimizes
   - Reduced motion fallback implemented

3. **File Sizes**:
   - Fireworks background: ~300KB (optimized JPEG)
   - Couple silhouette: ~50KB (PNG with transparency)
   - Parchment texture: ~150KB (JPEG)

## Accessibility Features

1. **Keyboard Navigation**:
   - All interactive elements are keyboard accessible
   - Tab order follows logical flow
   - Enter/Space triggers actions

2. **ARIA Labels**:
   - `aria-label="Open the letter"`
   - `aria-label="Say yes"`
   - `aria-label="Let me think"`

3. **Reduced Motion**:
   - CSS `prefers-reduced-motion` media query
   - Fallback to minimal animations
   - Maintains full functionality

4. **Screen Readers**:
   - Hidden transcript div (`#transcript`)
   - Semantic HTML structure
   - Alt text on all images

## Browser Compatibility

- **Modern browsers**: Full support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Framer Motion**: Requires JavaScript enabled
- **Fallback**: Static images with basic CSS transitions

## Deployment (GitHub Pages)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages on push to main branch.

**Setup Steps**:
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch
4. Site will be live at `https://[username].github.io/[repo-name]/`

## Future Enhancements

If you want to add actual Lottie files or video content later:

1. **Lottie Integration**:
   ```bash
   npm install lottie-react
   ```

2. **Video Support**:
   - Add WebM video with alpha channel
   - Use `<video>` element with autoplay/loop
   - Provide fallback poster image

3. **Audio Integration**:
   - Add Howler.js for better audio control
   - Implement volume controls
   - Add audio sprite for efficiency

## Color Palette Reference

```css
--parchment: 30 35% 92%
--gold: 42 65% 55%
--ink: 25 20% 17%
--romantic-red: 350 80% 55%
--firework-magenta: 325 100% 60%
--firework-cyan: 190 100% 50%
--firework-saffron: 42 100% 50%
--firework-emerald: 160 100% 35%
--firework-purple: 270 70% 55%
--firework-hot-pink: 330 100% 64%
```

## Typography

- **Script Font**: Dancing Script (Google Fonts)
  - Usage: Romantic text, proposals, celebrations
  - Weights: 400, 700

- **Body Font**: Merriweather (Google Fonts)
  - Usage: Letter text, body content
  - Weights: 300, 400, 700
  - Styles: Regular, italic

## Contact & Credits

Created with love for Hiba ❤️
Built with React, TypeScript, Tailwind CSS, and Framer Motion
