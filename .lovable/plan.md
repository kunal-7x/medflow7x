

## Plan: Premium Landing Page Overhaul + Route Restructuring

### 1. Route `/` to Landing, `/dashboard` for Authenticated Users

**`src/App.tsx`** changes:
- `path="/"` renders `<Landing />` for unauthenticated users, redirects to `/dashboard` for authenticated/visitor
- `path="/dashboard"` replaces current `path="/"` with `<ProtectedRoute><Dashboard /></ProtectedRoute>`
- `path="/login"` redirects to `/dashboard` instead of `/`
- Remove `/landing` route
- Update all `<Navigate to="/" />` inside ProtectedRoute role-check to `/dashboard`

**`src/pages/Login.tsx`** — change redirect target from `/` to `/dashboard`

**`src/contexts/AuthContext.tsx`** — no changes needed (auth state is route-agnostic)

### 2. Animated Dashboard in ProductDemo

**`src/components/landing/ProductDemo.tsx`** — complete rewrite:
- Replace placeholder grid + play button with a **live animated mini-dashboard** inside the browser frame
- Rendered at `scale(0.65)` with `pointer-events-none` and `overflow-hidden`
- Components inside:
  - Mini sidebar with 6 nav icons (colored dots for active state)
  - 4 stat cards with animated counting numbers (patients, beds, appointments, staff) using Framer Motion `animate`
  - SVG bar chart that animates bars growing upward sequentially
  - SVG line chart with animated stroke-dashoffset path drawing
  - Mini patient table (5 rows) with shimmer-to-data reveal animation (shimmer for 1s, then crossfade to text)
  - A floating toast notification that slides in from bottom-right after 2s delay
  - Green pulsing "LIVE" dot indicator in top-right
- All pure React/CSS/SVG, no external dependencies
- Keep the conversion strip below with testimonial quote

### 3. Enhanced Hero Section

**`src/components/landing/LandingHero.tsx`** — significant enhancements:
- **Word-by-word headline animation**: Split "Streamline Patient Care & Hospital Operations" into individual words, each fading up with staggered delay (0.08s per word) using Framer Motion
- **Mouse-tracking 3D glass card**: Below CTAs, add a floating glass card showing a mini dashboard preview. Uses `useMotionValue` for mouse position, `useTransform` for `rotateX`/`rotateY` (max 8deg), creating a subtle 3D tilt effect on hover
- **Enhanced background**: Add a large animated gradient orb behind the headline that shifts between gold and blue over 12s
- **Scroll-down indicator**: Bouncing chevron at bottom of hero with `animate={{ y: [0, 8, 0] }}` loop
- **Shimmer sweep** on trust badge using CSS gradient animation
- **Floating particle dots**: 20-30 small dots positioned absolutely, each with slow random drift animation

### 4. Smooth Parallax Across All Sections

**`src/pages/Landing.tsx`** changes:
- Import `useScroll`, `useTransform` from Framer Motion
- Wrap sections in `motion.div` with parallax transforms:
  - Hero background orbs: `translateY` at 0.3x scroll speed (slower than content)
  - Section headings: slight upward parallax offset
  - Feature cards: staggered entrance tied to scroll position
  - Stats: scale from 0.95 to 1.0 as they enter viewport
- Add a **floating "Back to Top" button** that appears after scrolling 600px, glass-styled pill with arrow-up icon
- Add subtle **gradient divider lines** between sections (horizontal rule with radial gradient fade)
- CSS `scroll-behavior: smooth` on container

### 5. Premium Polish on Existing Sections

**`src/components/landing/FeatureGrid.tsx`**:
- Add animated gradient border sweep on hover (CSS `background` animation on a pseudo-element border)
- Icon container pulses with gold glow on card hover
- Stagger delay based on grid position (row-aware)

**`src/components/landing/PricingPlans.tsx`**:
- Enhanced hover: card lifts 6px, glow intensifies, border brightens
- "Most Popular" badge gets shimmer animation
- Price number animates on viewport entry

**`src/components/landing/LiveStats.tsx`**:
- Add subtle background gradient behind section
- Each stat card gets a glass-card container with hover glow
- Scale entrance animation tied to scroll

**`src/components/landing/TrustedBy.tsx`**:
- Convert to infinite horizontal scroll marquee animation (CSS translateX loop)
- Duplicate logo array for seamless loop

**`src/components/landing/SecurityCompliance.tsx`**:
- Add shield icon pulse animation
- Cards get hover border glow

**`src/components/landing/LandingFooter.tsx`**:
- Add gradient CTA background behind final conversion section
- Subtle animated gradient mesh behind "Ready to Transform"

### 6. New Section: "How It Works" Steps

**Create `src/components/landing/HowItWorks.tsx`**:
- 3-step horizontal flow: "Connect Your Hospital" → "Configure Workflows" → "Go Live"
- Each step: numbered circle + icon + title + description
- Animated connecting line between steps that draws on scroll
- Glass cards with hover lift

### 7. New Section: Testimonials

**Create `src/components/landing/Testimonials.tsx`**:
- 3 premium testimonial cards with:
  - Quote text, author name, role, hospital name
  - Star rating
  - Avatar placeholder (initials)
  - Glass card with subtle gold accent border
- Auto-rotating carousel (fade transition every 5s) with manual dot navigation

### Files Summary

| File | Action |
|------|--------|
| `src/App.tsx` | Restructure routes |
| `src/pages/Login.tsx` | Redirect to `/dashboard` |
| `src/pages/Landing.tsx` | Parallax, back-to-top, dividers, new sections |
| `src/components/landing/LandingHero.tsx` | Word animation, 3D card, particles, scroll indicator |
| `src/components/landing/ProductDemo.tsx` | Full animated dashboard simulation |
| `src/components/landing/FeatureGrid.tsx` | Gradient borders, icon glow |
| `src/components/landing/PricingPlans.tsx` | Enhanced hover, shimmer badge |
| `src/components/landing/LiveStats.tsx` | Glass cards, scale entrance |
| `src/components/landing/TrustedBy.tsx` | Marquee scroll animation |
| `src/components/landing/SecurityCompliance.tsx` | Hover glow enhancements |
| `src/components/landing/LandingFooter.tsx` | Gradient CTA background |
| `src/components/landing/HowItWorks.tsx` | New — 3-step flow section |
| `src/components/landing/Testimonials.tsx` | New — testimonial carousel |

