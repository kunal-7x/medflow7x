

## Plan: Premium Landing Page Overhaul

This is a **MedFlow hospital management app**, not a prompt library platform. The request contains a large prompt-library blueprint that doesn't apply here. I'll focus on the three actionable landing page improvements requested, plus making the overall page more premium.

### 1. Route `/` to Landing for Unauthenticated Users

**Changes in `src/App.tsx`:**
- Change `path="/"` to show `<Landing />` when user is not authenticated and not a visitor
- Change `path="/landing"` to redirect to `/` 
- After login, redirect to `/dashboard` instead of `/`
- Add `/dashboard` route pointing to `<ProtectedRoute><Dashboard /></ProtectedRoute>`
- Update `Login.tsx` redirect target from `/` to `/dashboard`

### 2. Animated Dashboard Screenshot in ProductDemo

**Changes in `src/components/landing/ProductDemo.tsx`:**
- Replace the placeholder grid + play button with a **richly animated simulated dashboard** built from actual UI elements:
  - A miniature sidebar with nav icons
  - Stat cards (Total Patients, Beds Available, etc.) with animated counting numbers
  - A simulated chart area using simple SVG wave/bar animations
  - A mini patient table with shimmer loading → data reveal animation
  - Floating notification toast animation
- All rendered as scaled-down React components inside the browser frame, using `transform: scale(0.7)` with `pointer-events-none`
- Entrance animation: sections fade/slide in sequentially when scrolled into view
- Add a subtle continuous pulse animation on the "live" indicator dot

### 3. Enhanced Hero Section

**Changes in `src/components/landing/LandingHero.tsx`:**
- Add animated particle/dot field behind the hero using a canvas or CSS dot grid with parallax via `useScroll`/`useTransform`
- Add a large glowing orb animation behind the headline with color-shifting gradient
- Stagger headline words with per-word animation (each word fades up with slight delay)
- Add a floating 3D-perspective glass card beneath CTAs showing a mini dashboard preview that rotates subtly on mouse move (using `useMotionValue` for mouse tracking)
- Animate the trust badge with a subtle shimmer sweep effect
- Add scroll-down indicator arrow at bottom with bounce animation

### 4. Smooth Scroll & Parallax

**Changes in `src/pages/Landing.tsx`:**
- Wrap page in smooth scroll behavior using CSS `scroll-behavior: smooth` on the container (Lenis requires a non-React package; we'll use Framer Motion's `useScroll` for parallax instead)
- Add `useScroll` + `useTransform` parallax to:
  - Hero background orbs (move slower than scroll)
  - Section headings (slight upward parallax)
  - Feature cards (staggered reveal with scroll progress)
  - Stats section (scale up slightly as it enters view)

### 5. Overall Premium Polish

**Across all landing components:**
- Add section dividers with subtle gradient lines between sections
- Enhance FeatureGrid cards with animated icon glow on hover and a subtle gradient border sweep
- Add a floating "Back to top" button that appears after scrolling past the hero
- Enhance PricingPlans with hover card lift + glow intensification
- Add smooth `whileInView` transitions with varied delays for visual depth

### Files to Create/Edit

| File | Action |
|------|--------|
| `src/App.tsx` | Restructure routes: `/` = Landing (unauth) or redirect to `/dashboard` (auth) |
| `src/pages/Login.tsx` | Update redirect target to `/dashboard` |
| `src/components/landing/LandingHero.tsx` | Word-by-word animation, mouse-tracking card, scroll indicator, enhanced orbs |
| `src/components/landing/ProductDemo.tsx` | Full animated dashboard simulation replacing placeholder |
| `src/components/landing/FeatureGrid.tsx` | Enhanced hover effects, gradient border sweep |
| `src/components/landing/LiveStats.tsx` | Parallax scale effect |
| `src/components/landing/PricingPlans.tsx` | Enhanced hover states |
| `src/pages/Landing.tsx` | Add parallax hooks, scroll-to-top button, section dividers |
| `src/contexts/AuthContext.tsx` | Minor: update any `/` redirects to `/dashboard` |

