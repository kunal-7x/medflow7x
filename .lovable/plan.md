

## Plan: Google Sign-In, Theme-Aware Branding & Final Polish

### 1. Add Google Sign-In to Login Page

**Configure Social Auth** using the Lovable Cloud tool to generate `src/integrations/lovable/` module, then add a professional Google button to `src/pages/Login.tsx`:
- Official Google "G" SVG logo with white background circle
- "Continue with Google" button styled per Google brand guidelines (white bg, dark text, subtle border)
- Placed between "Continue as Visitor" and the email sign-in divider
- Calls `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`

### 2. Theme-Aware Logo Color

**`src/components/landing/LandingHero.tsx`** and **`src/components/Sidebar.tsx`**:
- Import `getPresetColor` from `useThemeColor` hook
- Read current `accentIndex` from localStorage and apply the matching hex color to the MedFlow logo icon background (gradient) so it dynamically matches the selected accent

### 3. Login/Signup Page Polish

**`src/pages/Login.tsx`**:
- Add Google sign-in button with proper SVG logo
- Improve social button layout: Google button → Visitor button → divider → email form
- Add subtle hover animations on social buttons
- Ensure glass-card styling is consistent

### 4. Final CSS & Color Fixes

**`src/index.css`**:
- Audit remaining hardcoded border colors
- Ensure light mode variables are complete and consistent

**`src/components/ui/tabs.tsx`**:
- Update TabsList and TabsTrigger to use glass styling (`bg-muted/40`, `border-border/30`) instead of default borders

### Files

| File | Action |
|------|--------|
| `src/pages/Login.tsx` | Add Google sign-in, reorder social buttons, polish |
| `src/components/landing/LandingHero.tsx` | Theme-aware logo color |
| `src/components/Sidebar.tsx` | Theme-aware logo color |
| `src/components/ui/tabs.tsx` | Glass styling fix |

