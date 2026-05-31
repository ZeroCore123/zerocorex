# CoreX — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^18.3.0` | UI framework |
| `react-dom` | `^18.3.0` | DOM renderer |
| `gsap` | `^3.12.0` | Core animation engine, ScrollTrigger plugin |
| `lenis` | `^1.1.0` | Smooth scroll with inertia |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | `^6.0.0` | Build tool |
| `@vitejs/plugin-react` | `^4.3.0` | React fast-refresh + JSX transform |
| `typescript` | `^5.6.0` | Type checking |
| `@types/react` | `^18.3.0` | React type definitions |
| `@types/react-dom` | `^18.3.0` | ReactDOM type definitions |
| `tailwindcss` | `^4.0.0` | Utility-first CSS |
| `@tailwindcss/vite` | `^4.0.0` | Tailwind Vite integration |

### External Resources (CDN / `<link>`)

- **Bebas Neue** — Google Fonts (`https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`)
- **Geist + Geist Mono** — Self-hosted or `@vercel/font` package (recommend `geist` npm package for self-hosting)

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| **Navigation** | Custom | Single instance, fixed global |
| **Footer** | Custom | Single instance |
| **MobileMenu** | Custom | Used by Navigation |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **HeroSection** | Custom | Contains ParticleNetwork canvas |
| **MarqueeSection** | Custom | CSS keyframe-based, ScrollTrigger speed modulation |
| **PhilosophySection** | Custom | Two subsections + clip-path manifesto |
| **EngineCloudSection** | Custom | Background image + 2 engine cards |
| **StorageSection** | Custom | Centered big-number + highlight card |
| **CapabilitiesSection** | Custom | Bento grid with stagger entrance |
| **PreLaunchSection** | Custom | Email capture form |

### Reusable

| Component | Source | Used By |
|-----------|--------|---------|
| **ParticleNetwork** | Custom (Canvas 2D) | HeroSection |
| **ClipPathReveal** | Custom | PhilosophySection manifesto |
| **SectionHeader** | Custom | Philosophy, EngineCloud, Capabilities, PreLaunch — eyebrow + heading pattern |
| **EngineCard** | Custom | EngineCloudSection (×2) |
| **BentoCell** | Custom | CapabilitiesSection (×5) |
| **AnimatedCounter** | Custom | StorageSection |

### Hooks

| Hook | Purpose |
|------|---------|
| **useLenis** | Initialize Lenis, connect to GSAP ticker, expose instance |
| **useScrollTriggerEntrance** | Standardized scroll-triggered entrance animation (translateY + opacity) |
| **useParticleCanvas** | Canvas lifecycle: init, resize, mouse tracking, raf loop, pause/resume via IntersectionObserver |
| **useReducedMotion** | Detect `prefers-reduced-motion: reduce` |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero headline staggered reveal | GSAP | Timeline: `translateY(120%)→0` per line via overflow-hidden masks, `expo.out`, `0.12s` stagger | **High** 🔒 |
| Hero sub-headline + CTA fade-in | GSAP | Chained to headline timeline, `0.6s` delay after headline completes | Medium |
| Hero counter badge scale-in | GSAP | `scale(0.9→1)` + `opacity(0→1)`, `0.6s` delay | Low |
| Hero Particle Network | Canvas 2D (hand-written) | Custom raf loop, Particle class, mouse repulsion, O(n²) distance-based line drawing | **High** 🔒 |
| Marquee infinite scroll | CSS `@keyframes` | Duplicated track, `translateX(0→-50%)`, `25s linear infinite` | Low |
| Marquee speed boost on scroll | GSAP ScrollTrigger | Scrub-based modulation of `animation-duration` property | Medium |
| Section entrance (global pattern) | GSAP ScrollTrigger | `useScrollTriggerEntrance` hook: `translateY(40-80px)→0`, `opacity→1`, `power3.out` | Low |
| Philosophy subsection entrances | GSAP ScrollTrigger | `translateX(-60px)→0` + opacity for labels/headings, fade for body text | Medium |
| **Clip-path text reveal** | GSAP ScrollTrigger | Scrubbed `clip-path: inset()` + synchronized underline `scaleX`, `scrub: 1` | **High** 🔒 |
| Engine card entrance | GSAP ScrollTrigger | `translateY(60px)→0`, `opacity→1`, `rotateX(8deg)→0`, `0.15s` stagger, perspective parent | Medium |
| **1TB counter count-up** | GSAP ScrollTrigger | Scrubbed GSAP tween on a ref value, `0→1` over `300px` scroll, display formatted as "1TB" | **High** 🔒 |
| **Bentobox stagger entrance** | GSAP ScrollTrigger | Dynamic `transformOrigin` per-cell based on grid position, `scale(0.6→1)`, `stagger: 0.08` | **High** 🔒 |
| Pre-launch form entrance | GSAP ScrollTrigger | Badge `scale(0.9→1)`, standard slide-up for rest, `0.2s` stagger | Medium |
| Navigation scroll-spy | GSAP ScrollTrigger | `onEnter`/`onLeaveBack` callbacks toggling `active` class on nav links | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP Ticker Bridge (`useLenis`)

Lenis must drive ScrollTrigger updates and be driven by GSAP's ticker. This is a singleton pattern — only one Lenis instance exists globally.

**Integration order (strict)**:
1. `gsap.registerPlugin(ScrollTrigger)`
2. `new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1.0 })`
3. `lenisInstance.on('scroll', ScrollTrigger.update)`
4. `gsap.ticker.add((time) => lenisInstance.raf(time * 1000))`
5. `gsap.ticker.lagSmoothing(0)`

Expose the Lenis instance via React context so child components (e.g., nav anchor links) can call `lenis.scrollTo()`.

### Particle Canvas Lifecycle (`useParticleCanvas`)

Canvas 2D imperative code wrapped in a React-friendly lifecycle:

- **Init**: Create canvas context, calculate `particleCount = min(floor(w×h/9000), 150)`, initialize Particle array with random positions/velocities/radii.
- **Resize**: `ResizeObserver` on parent element (not `window.resize`). Debounced 200ms. Recalculate dimensions, adjust particle count, reposition out-of-bounds particles.
- **Mouse tracking**: `mousemove`/`mouseleave` listeners on canvas element. Coordinates converted to canvas space accounting for DPR.
- **Visibility**: `IntersectionObserver` on canvas parent. Pause raf loop when not visible (cancel stored raf ID); resume on re-entry.
- **Cleanup**: Cancel raf, remove all listeners, destroy IntersectionObserver on unmount.

### Reduced Motion Coordination (`useReducedMotion`)

Single hook reads `window.matchMedia('(prefers-reduced-motion: reduce)')`. Returns boolean. Consumed by:
- `ParticleNetwork`: stops animation loop, renders static frame
- `useScrollTriggerEntrance`: skips animation, sets elements to final state immediately
- `MarqueeSection`: replaces animated track with static wrapped list
- `ClipPathReveal`: shows full text immediately
- `AnimatedCounter`: displays final value immediately

Implement as a React context to avoid multiple `matchMedia` listeners.

### 1TB Counter Scrub Logic (`AnimatedCounter`)

The counter is NOT a timed animation — it is **scroll-scrubbed**:
- Store numeric value in a ref (not React state, to avoid re-render thrashing)
- Use GSAP's `.to()` with `scrollTrigger: { scrub: true }` tweening a proxy object `{ value: 0 } → { value: 1 }`
- In `onUpdate` callback, read `proxy.value` and write to a DOM element via `textContent`
- Display format: `${Math.round(proxy.value)}TB` — only the number changes, "TB" suffix is static HTML
- ScrollTrigger range: `start: "top 70%"`, scroll distance `300px`

### Bento Grid Transform-Origin Calculation

The "expansion from center" illusion requires per-cell `transformOrigin` based on grid position:
- Read cell's `getBoundingClientRect()` and parent's `getBoundingClientRect()`
- Compute `xPercent = (cell.left - parent.left) / parent.width`
- Compute `yPercent = (cell.top - parent.top) / parent.height`
- Map to CSS `transformOrigin`: `xPercent < 0.33 ? "0%" : xPercent > 0.66 ? "100%" : "50%"` (same for Y)
- Must recalculate on resize (bento grid reflows on breakpoint changes)
- Use a `useLayoutEffect` that runs once after mount and on window resize

---

## Other Key Decisions

### No shadcn/ui Components

This is a fully custom landing page with zero standard UI patterns (no forms beyond a single email input, no dialogs, no tables). All components are bespoke. The standard webapp-building init includes shadcn/ui, which is acceptable as infrastructure, but no shadcn components will be used.

### Font Loading: Self-Hosted Geist

Use the `geist` npm package (`geist`) which provides self-hosted Geist Sans and Geist Mono woff2 files. Import font CSS in the entry point. This eliminates external font CDN dependencies and prevents layout shift. Bebas Neue remains Google Fonts CDN due to licensing simplicity.

### Image Assets

Two images required: `engine-cloud-bg.jpg` (section background) and `og-image.jpg` (social sharing). Both are opaque and placed in `public/images/`. The engine cloud background is loaded via standard `<img>` with `object-fit: cover` and a CSS gradient overlay — no blur hash or skeleton needed since it is below the fold.

### Mobile Menu

Full-screen overlay (z-index 600) triggered by hamburger. Links stacked vertically at headline size, staggered fade-in on open. Uses GSAP timeline for open/close animations. Body scroll locked when menu is open (`lenis.stop()` / `lenis.start()`).
