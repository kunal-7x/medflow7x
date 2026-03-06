

## Plan: Complete UI/UX Premium Overhaul + Landing Page Controls

This plan addresses all requests: theme toggle/color picker on landing, responsive fixes, page transitions, color consistency across the entire app, removing ugly white borders, and polishing every component to premium luxury level.

### Issues Identified

1. **Sidebar Dashboard link points to `/`** instead of `/dashboard` — causes redirect loop for authenticated users
2. **Dialog, Sheet, Select, Input, Tooltip, Progress** — all have default shadcn styling with visible white/light borders (`border`, `border-input`, `border-b`, `border-l`) that look cheap on the dark theme
3. **No page transitions** between routes
4. **No theme toggle or color picker** on landing page
5. **Landing page not fully responsive** — hero 3D card, product demo, and feature grid need mobile fixes
6. **Inconsistent border styles** — some components use `border-border/30`, others use raw `border` which renders as full white-ish borders

### Changes

#### 1. Fix Sidebar Link (`src/components/Sidebar.tsx`)
- Change Dashboard `url: "/"` → `url: "/dashboard"`

#### 2. Premium UI Component Overhaul (8 files)

**`src/components/ui/input.tsx`** — Replace `border-input` with `border-border/40`, add `rounded-xl`, match glass theme, add focus glow

**`src/components/ui/select.tsx`** — Update `SelectTrigger` border to `border-border/40 rounded-xl`, update `SelectContent` to glass-card style with `backdrop-blur-xl bg-popover/95 border-border/30 rounded-xl`

**`src/components/ui/dialog.tsx`** — Replace `border bg-background` with `glass-card border-border/30 rounded-2xl`, backdrop to `bg-background/60 backdrop-blur-sm`

**`src/components/ui/sheet.tsx`** — Replace `bg-background border-*` with glass styling, `border-border/20`, add `backdrop-blur-xl`

**`src/components/ui/tooltip.tsx`** — Replace `border bg-popover` with `border-border/30 bg-popover/95 backdrop-blur-xl rounded-xl`

**`src/components/ui/progress.tsx`** — Replace `bg-secondary` with `bg-secondary/40`, add gradient to indicator

**`src/components/ui/dropdown-menu.tsx`** — Update content to glass styling with `bg-popover/95 backdrop-blur-xl border-border/30 rounded-xl`

**`src/components/ui/popover.tsx`** — Same glass treatment

#### 3. Theme Toggle + Color Picker on Landing (`src/components/landing/LandingHero.tsx`)
- Add floating glass controls at bottom-left of the page
- **Theme toggle**: Switches between dark (default) and a "light" mode by toggling CSS variables on `document.documentElement`
- **Color picker**: A small panel with 6 preset accent colors (gold, blue, emerald, rose, violet, orange) that updates `--primary`, `--ring`, `--chart-1`, `--sidebar-primary` CSS variables live
- Persist both to `localStorage` and restore on page load
- Floating buttons: glass pill style, `backdrop-blur-2xl`, `rounded-full`, positioned `fixed bottom-6 left-6`

#### 4. Page Transitions (`src/App.tsx`)
- Wrap route content in `framer-motion` `AnimatePresence` with `motion.div` fade transition (opacity 0→1, slight y shift)
- Apply to both `Layout` wrapper children and standalone pages (Landing, Login)

#### 5. Responsive Fixes (`src/components/landing/LandingHero.tsx`, `ProductDemo.tsx`, `FeatureGrid.tsx`, `Landing.tsx`)
- Hero: Scale down 3D glass card and metric cards on mobile, stack CTAs vertically, reduce headline sizes
- ProductDemo: Hide the scaled dashboard simulation on `<640px`, show a static screenshot-style fallback
- FeatureGrid: `grid-cols-1` on mobile with reduced padding
- Testimonials: Reduce padding, font sizes on mobile
- PricingPlans: Stack vertically on mobile
- All sections: Ensure `px-4` on mobile instead of `px-6`

#### 6. Color Consistency + CSS Persistence (`src/index.css`)
- Add a `useThemeColor` hook in a new file that reads/writes theme preferences from `localStorage` and applies CSS variables on mount
- Ensure the hook is loaded in `App.tsx` so colors persist across all pages (landing, login, dashboard)
- Remove any hardcoded HSL values that should use CSS variables (audit and replace)

#### 7. Landing Page Polish
- **`LandingHero.tsx`**: Add mobile nav hamburger menu (hidden on desktop, slide-in on mobile)
- **`TrustedBy.tsx`**: Fix marquee on mobile (reduce gap)
- **`LandingFooter.tsx`**: Stack footer columns 2-wide on mobile

### Files Summary

| File | Action |
|------|--------|
| `src/components/Sidebar.tsx` | Fix Dashboard URL |
| `src/components/ui/input.tsx` | Premium glass styling |
| `src/components/ui/select.tsx` | Premium glass styling |
| `src/components/ui/dialog.tsx` | Premium glass styling |
| `src/components/ui/sheet.tsx` | Premium glass styling |
| `src/components/ui/tooltip.tsx` | Premium glass styling |
| `src/components/ui/progress.tsx` | Premium glass styling |
| `src/components/ui/dropdown-menu.tsx` | Premium glass styling |
| `src/components/ui/popover.tsx` | Premium glass styling |
| `src/hooks/useThemeColor.ts` | New — theme persistence hook |
| `src/App.tsx` | Page transitions + load theme hook |
| `src/components/landing/LandingHero.tsx` | Theme controls, mobile nav, responsive |
| `src/components/landing/ProductDemo.tsx` | Mobile responsive |
| `src/components/landing/FeatureGrid.tsx` | Mobile responsive |
| `src/pages/Landing.tsx` | Load theme, responsive padding |
| `src/index.css` | Light theme variables, color picker presets |

