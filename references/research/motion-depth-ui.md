# Motion And Depth Research

Use this research when a UI request explicitly asks for transitions, scrollytelling, high-end interaction, spatial depth, or a result that should not feel flat. This document turns current platform and design-system guidance into rules MixUI can apply.

## Source Map

Primary sources reviewed:

- Motion for React docs: https://motion.dev/docs/react
- Motion scroll animation docs: https://motion.dev/docs/react-scroll-animations
- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- MDN View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Chrome View Transitions guide: https://developer.chrome.com/docs/web-platform/view-transitions
- web.dev high-performance CSS animations: https://web.dev/articles/animations-guide
- IBM Carbon Motion: https://carbondesignsystem.com/elements/motion/overview/
- W3C WCAG 2.2 SC 2.3.3 Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- MDN CSS transforms: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transforms/Using
- MDN CSS perspective: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective

## What Strong Developers Do

Strong frontend developers do not add motion as garnish. They build a motion system around product intent.

1. Define the journey first.
   - Identify what the user should notice first, second, and third.
   - Motion should move attention through that hierarchy.
   - If motion does not clarify priority, state, or continuity, remove it.

2. Separate productive motion from expressive motion.
   - Productive motion: fast, subtle, task-supporting. Use for hover, focus, toggles, dropdowns, forms, modal entry, table changes, and feedback.
   - Expressive motion: larger, more visible, occasional. Use for hero reveals, scrollytelling beats, product drops, route transitions, celebrations, and visual storytelling.
   - IBM Carbon explicitly frames motion this way and warns that expressive motion should be reserved for important moments.

3. Use continuity, not spectacle.
   - The best transitions preserve object identity across states: card expands into detail, thumbnail becomes hero, selected item stays spatially related.
   - Use shared-element transitions when a user would otherwise feel teleported.
   - Use View Transitions API or Motion layout/layoutId for continuity across view/state changes.

4. Animate cheap properties first.
   - Prefer `transform` and `opacity`.
   - Avoid animating layout/paint-heavy properties (`top`, `left`, `width`, `height`, expensive blur/shadow) unless there is a strong reason.
   - Use `will-change` sparingly and only around known performance issues.

5. Respect motion sensitivity.
   - Always support `prefers-reduced-motion`.
   - Avoid uncontrolled parallax, large zoom, spinning, and scroll-jacking.
   - WCAG notes that interaction-triggered non-essential animation must be disableable unless essential.

## Technology Decision Matrix

### CSS transitions/keyframes

Use when:
- Hover/focus/tap state changes.
- Simple enter/reveal effects.
- Button shimmer, border beam, subtle background drift.
- No component state orchestration is needed.

Avoid when:
- Exit animation must wait before unmount.
- Layout changes need continuity.
- Scroll values need to drive transforms.

Default rule: CSS first for self-contained effects.

### Motion for React

Use when:
- React state drives animation.
- Components enter/exit conditionally.
- Layout changes need smooth transitions.
- Shared element transitions are needed with `layoutId`.
- Scroll-triggered or scroll-linked React effects need maintainable code.

Patterns:
- `whileInView` / `useInView` for scroll-triggered reveal.
- `useScroll` + `useTransform` for parallax, progress, sticky horizontal sections, and scroll-linked depth.
- `AnimatePresence` for modal/drawer/toast exit.
- `layout` / `layoutId` for cards, tabs, thumbnails, route-like state changes.

### View Transitions API

Use when:
- Same-document SPA state changes should visually transition without a heavy animation library.
- Route/page changes need continuity.
- Browser support is acceptable or fallback is easy.

Required fallback:

```js
if (!document.startViewTransition) {
  updateDOM();
  return;
}

document.startViewTransition(() => updateDOM());
```

Best fit:
- Gallery card to detail.
- Catalog item to product view.
- Theme/layout switch.
- Dashboard tab or route transition.

### GSAP ScrollTrigger

Use when:
- The request explicitly needs advanced scrollytelling choreography.
- Pinning, timeline scrubbing, multi-stage scenes, or complex sequencing exceed simple CSS/Motion patterns.

Avoid when:
- A simple `position: sticky` + CSS or Motion `useScroll` solves it.
- The project does not already carry GSAP and the feature is not central.

Ponytail rule: do not add GSAP for one fade-in.

## Transition Patterns To Teach Agents

### 1. Page Load Choreography

Goal: establish hierarchy in the first viewport.

Recipe:
- Top bar appears first or is already stable.
- Eyebrow/title appears next.
- Primary visual enters last with a smaller delay.
- CTA becomes active once the narrative is visible.

Timing:
- Top bar: 120-180ms.
- Title: 420-700ms expressive reveal.
- Supporting cards: stagger 60-100ms.

Use CSS or Motion. Do not animate every word unless typography is the point.

### 2. Modal / Login Transition

Goal: professional access flow.

Recipe:
- Dim background with opacity only.
- Modal enters with opacity + small translateY or scale.
- Focus remains trapped or at least visibly moves to the dialog in real production work.
- Escape closes.
- Exit should be animated if using Motion; otherwise keep close instant and clean.

Avoid:
- Huge zooms.
- Background parallax while login is open.
- Decorative motion around password fields.

### 3. Catalog Card To Detail

Goal: continuity.

Recipe:
- Use View Transitions API or Motion `layoutId`.
- Keep product image, title, and price as continuous elements.
- Transition supporting metadata with fade/slide.
- Keep background stable.

Depth layer:
- Background product image moves slower than foreground cards.
- Selected card rises with shadow and border contrast.

### 4. Scrollytelling Scene

Goal: story and spatial memory.

Recipe:
- Use a long narrative rail plus a sticky visual stage.
- Each section changes one major variable: product, copy, catalog state, metric, or CTA.
- Background layers move slower than foreground layers for depth.
- Keep native scroll; avoid trapping users.

Good simple implementation:
- CSS `position: sticky` visual stage.
- Story cards stacked vertically.
- `transform`/`opacity` reveals.
- Optional Motion `useScroll` for image parallax or progress.

Advanced implementation:
- GSAP ScrollTrigger timeline if multiple pinned scenes need precise choreography.

### 5. Background Depth System

Goal: avoid flat screens.

Use at least three visual layers:

1. Far layer:
   - grid, subtle texture, large product silhouette, low-contrast image, or repeated pattern.
   - Moves slowest or stays fixed.

2. Mid layer:
   - product image, abstract stage, blurred panels, large typography, sticky visual area.
   - Uses scale, translate, and opacity.

3. Near layer:
   - cards, forms, nav, CTA, catalog items.
   - Highest contrast, sharper shadow, crisp borders.

CSS tools:
- `perspective` for true 3D composition when needed.
- `transform: translate3d(...)`, `scale`, `rotate` for layered positioning.
- `box-shadow`, borders, overlays, and contrast for z-depth.
- `clip-path` or masks for reveals.

Avoid:
- Decorative blobs as a substitute for depth.
- Backgrounds that reduce text contrast.
- Large blur animations during scroll; they are paint-heavy.

## Frontend Organization For Motion-Heavy UI

Use a small local motion system instead of scattered keyframes.

Recommended structure:

```text
src/
  components/
    ui/                 # primitives: Button, Field, Modal, Card
    motion/             # BlurFade, Reveal, ParallaxLayer, ViewTransitionLink
    layout/             # TopBar, Shell, Section
    catalog/            # domain components
  styles/
    tokens.css          # color, spacing, radius, typography, motion tokens
    motion.css          # keyframes and reusable motion classes
    app.css             # page composition
  data/
    catalog.js          # static catalog/content
```

For a small prototype, fewer files are fine. For a serious app, extract primitives once repeated twice.

## Motion Tokens

Define these tokens before building complex motion:

```css
:root {
  --ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9);
  --ease-entrance: cubic-bezier(0, 0, 0.38, 0.9);
  --ease-exit: cubic-bezier(0.2, 0, 1, 0.9);
  --duration-fast: 120ms;
  --duration-medium: 240ms;
  --duration-slow: 420ms;
  --depth-shadow-near: 0 18px 48px rgba(0, 0, 0, 0.16);
  --depth-shadow-far: 0 40px 120px rgba(0, 0, 0, 0.18);
}
```

Use productive durations for controls and expressive durations for hero/scrollytelling.

## UI/UX Depth Checklist

Before shipping a visual UI, verify:

- Is there a clear first visual signal in the first viewport?
- Is the background doing domain work, not just decoration?
- Are there at least three depth layers: far, mid, near?
- Does the near layer remain readable at all viewport sizes?
- Does motion guide attention through the journey?
- Are scroll effects native-feeling, not scroll-jacked?
- Does the design work with `prefers-reduced-motion`?
- Are animated properties mostly `transform` and `opacity`?
- Did the page avoid one-note color, flat cards, and generic SaaS layout?
- Did browser testing include desktop and mobile widths?

## Anti-Patterns

Do not:
- Add animation because the user said "premium" without defining what it explains.
- Mix multiple hero effects in one viewport.
- Animate layout properties in infinite loops.
- Put a login form on top of heavy visual motion.
- Hide focus states behind aesthetic effects.
- Use parallax with no reduced-motion fallback.
- Add a large animation library when CSS or platform APIs solve the task.

## How MixUI Should Apply This

When a request asks for transitions or depth, MixUI should:

1. Classify the motion need:
   - microinteraction, modal, page transition, shared element, scrollytelling, depth background, data/state feedback.
2. Pick the smallest tech:
   - CSS -> View Transitions API -> Motion -> GSAP, in that order unless project context says otherwise.
3. Define motion tokens before coding.
4. Build depth as layered layout, not decoration.
5. Add reduced-motion handling.
6. Verify in browser with screenshot or interaction test.
7. Report which transition/depth patterns were used.
