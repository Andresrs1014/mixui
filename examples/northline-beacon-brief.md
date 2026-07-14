# Brief-Craft — Worked Example: Northline Beacon

This is a real example of Brief-Craft applied to a UI build. The original
user request was already more specific than "build me a landing page" but
still under-specified. Running Brief-Craft surfaced 12 requirements that
the user had not stated and would have caused rebuilds if missed.

## The original request (paraphrased)

> "In this same repo create a folder called `mixui-3d-weather-station`.
> Mandatory mode: native reimplementation. No porting of existing
> HTML/CSS/JS. Build from scratch with React, Tailwind, and accessible
> components. I want a product/app for a fictional portable weather
> station called 'Northline Beacon'. Should be a professional product
> interface, not a generic SaaS landing.
>
> Stack: React + Tailwind. Use real shadcn/ui or Radix components for
> buttons, drawer/dialog, and controls. Motion for UI choreography. React
> Three Fiber / Three.js for the 3D model.
>
> Build a central exploded-view viewer of the station with: main shell,
> e-ink screen, antenna, sensor module, battery, internal board, back
> cover, readable labels/callouts outside the canvas.
>
> Critical requirements: 1. The 3D model must actually be visible on
> desktop and mobile. Not just a Canvas existing. 2. Model must have
> camera, lights, contact shadow and ground/grid; must belong to the
> visual space. 3. Include Explode / Assemble and selectable parts. 4.
> When state changes, the environment must respond: horizon, grid, light,
> nearby panels. 5. If WebGL or R3F fails, show a CSS/SVG pseudo-3D
> fallback, never an empty canvas. 6. Verify visually at 1440×900 and
> 390×844 before finishing. 7. Use a single visual accent for the
> critical data, e.g. storm alert. 8. Topbar, main info, CTA, and
> specifications must follow product hierarchy. 9. Accessible drawer to
> inspect a part: focus, Escape, close button, focus restoration. 10.
> Reduced motion for important animations. 11. Do not use 3D just as
> floating decoration. 12. Do not implement fake components with divs:
> use real reusable primitives.
>
> Mandatory checks: build, lint/typecheck if they exist, desktop and
> mobile test, Explode/Assemble test, drawer and Escape test, confirm 3D
> or visible fallback really shows, not just that the DOM contains
> Canvas.
>
> At the end report: components and libraries used, 3D technique chosen,
> tests performed, remaining limitations, local URL if you started a
> server."

This looks specific, but it is still missing: file shape, exact
dependencies, naming, palette, motion language, success reporting format,
and which checks are mandatory when.

## Phase 1 — Surface 12 critical requirements

1. **Audience.** The viewer is a person evaluating a serious product
   (field researcher, expedition guide). Not a developer, not a generic
   consumer. Tone: technical, restrained, trustworthy.
2. **Scope.** One product page in a new folder. The page has a hero
   (3D viewer + live conditions), a specs section, a field-logs
   testimonial section, a pre-order CTA, and a footer. E-commerce,
   auth, and account areas are out.
3. **Hard constraints.** Vite + React + TypeScript (the folder is
   `mixui-3d-weather-station`, sibling to an existing Next.js project
   but explicitly a separate build). Tailwind. Real Radix primitives for
   dialog/sheet. No porting of code from the adjacent project.
4. **Success criteria.** The 3D model renders on desktop and mobile, the
   exploded view animates, the part selection opens a real accessible
   drawer, the WebGL fallback is also a visible representation (not an
   empty box), and all checks pass.
5. **Quality bars.** Single visual accent (one orange tone, used only
   for the critical signal). Sober motion (explode tween, no
   decoration). A11y floor: focus trap, Escape, focus restoration on
   the drawer. Real primitives, not div soup.
6. **Accessibility.** Drawer: focus trap, Escape, close button, focus
   restoration. Reduced motion: collapse explode tween, kill the
   pulse-alert animation. Keyboard: `E` toggles explode, `Escape`
   closes the drawer. Color contrast on the alert accent against dark
   background must read.
7. **Failure modes.** No WebGL → CSS/SVG fallback must show a
   recognisable representation of the device with the same interaction
   model. Slow GPU → the scene should still load and respond.
8. **Visual verification.** Screenshots at 1440×900 (desktop) and
   390×844 (mobile). Both assembled and exploded. Drawer open. Fallback
   forced (`?fallback=1`) tested.
9. **Checks.** `tsc -b`, `npm run build`, `npm run lint`, manual
   click-through of Explode, part selection, drawer open + Escape close,
   mobile draw.
10. **Deliverables.** Folder `mixui-3d-weather-station` with `src/`,
    `package.json`, build passes, dev server runs, screenshots in
    `_qa/`, README with stack and how to run.
11. **Reporting format.** Final message lists: components and
    libraries, 3D technique, tests, remaining limitations, local URL.
12. **No-hallucination clause.** Every library, prop, and file path
    referenced must be real. Verify against the installed
    `package.json` and the project tree. R3F's `useFrame` parameters,
    drei component names, and three.js APIs must be confirmed by docs
    or by what is actually exported from the installed packages — not
    invented.

## Phase 2 — Plan

- **Stack.** Vite + React 19 + TypeScript, Tailwind 3, shadcn-style
  primitives built on Radix UI, React Three Fiber 8 + drei + three,
  framer-motion, lucide-react, class-variance-authority + tailwind-merge
  + clsx.
- **Files.**
  - `src/data/` — `parts.ts` (7 part definitions), `conditions.ts`
    (live data), `specs.ts` (spec table).
  - `src/hooks/` — `useReducedMotion.ts`, `useWebGLSupport.ts`
    (with `?fallback=1` QA override).
  - `src/components/ui/` — `button.tsx`, `badge.tsx`, `kbd.tsx`,
    `separator.tsx`, `tooltip.tsx`, `tabs.tsx`, `sheet.tsx` (real
    Radix Dialog).
  - `src/components/three/` — `SceneCanvas.tsx` (R3F Canvas, lights,
    contact shadow, grid, camera `lookAt(0,0,0)`),
    `BeaconModel.tsx` (7 part groups, `useFrame` lerp between
    assembled and exploded), `BeaconFallback.tsx` (SVG 2.5D isometric
    view).
  - `src/components/product/` — `Topbar`, `ProductHero`,
    `ProductViewer`, `ExplodeControls`, `LiveConditions`,
    `SpecsSection`, `FieldReports`, `PreOrderCTA`,
    `PartInspector`, `Footer`.
  - `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`.
- **Checks.** `tsc -b --force`, `npm run build`, `npm run lint`.
- **Visual verification.** `agent-browser` at 1440×900 and 390×844,
  force the fallback with `?fallback=1`.
- **Known risks.**
  - R3F's `PerspectiveCamera` does not auto-look-at origin when given
    a non-zero position. Plan: add a `CameraAim` component that
    calls `camera.lookAt(0,0,0)` in a `useEffect`.
  - Auto-rotating the model breaks the screen-projected callout
    (the leader line jumps each frame). Plan: no auto-rotation;
    allow a tiny tilt on hover.
  - drei's `Environment preset` requires a CDN. Plan: skip it, rely
    on three directional lights only.
  - `getContext('webgl2')` calls during QA can detach the context.
    Plan: do the readPixels check only after a clean page load.

## Phase 3 — Self-prompt

> You are building a product page for the fictional "Northline Beacon"
> portable weather station. The folder is
> `C:/herramientas/inventario/mixui-3d-weather-station/`. Build it from
> scratch with Vite + React + TypeScript + Tailwind. Use real Radix UI
> primitives (Dialog, Tabs, Tooltip, Separator, Slot) for the Sheet,
> tabs, and buttons — no div soup.
>
> 1. **Stack.** React Three Fiber 8, drei, three for the 3D model.
>    framer-motion for callout choreography. lucide-react for icons.
>    Tailwind 3 with a custom palette: `ink` (graphite), `bone`
>    (off-white), `beacon` (single orange accent).
> 2. **3D scene.** Seven part groups (`shell`, `eink`, `antenna`,
>    `sensors`, `battery`, `board`, `back`), each with
>    `assembledPos` and `explodedOffset`. A single `explodeProgress`
>    value 0..1 lerps the parts in `useFrame`. Lights: ambient + 3
>    directional (key, cool fill, warm rim that brightens when
>    `alertActive`). Contact shadow under the device, infinite grid
>    on the floor, perspective camera with `lookAt(0,0,0)`. Do NOT
>    auto-rotate the root group; allow a tiny tilt on hover.
> 3. **Callouts.** A `useFrame` projects the selected part's world
>    position to screen, writes it to a `callout` state. A
>    `CalloutOverlay` draws an SVG leader line and a DOM card
>    positioned relative to the viewer surface, not the window.
> 4. **Fallback.** `useWebGLSupport` tries `webgl2` then `webgl`. If
>    neither, render `BeaconFallback`: an SVG 2.5D isometric view of
>    the same 7 parts, with numbered callouts and the same
>    selection / explode interaction. `?fallback=1` forces it for QA.
> 5. **Drawer.** `Sheet` (Radix Dialog) opens on "Inspect part" or
>    on the callout's "Open details". Shows the part's material,
>    spec, mass, story, and jump-to chips for the other parts.
>    Escape closes; second Escape clears the selection.
> 6. **Accessibility.** `prefers-reduced-motion` collapses the
>    explode tween and the pulse-alert animation. Focus styles are
>    visible. The chip row and the part legend are keyboard
>    reachable. The drawer traps focus and restores it on close.
> 7. **No-hallucination clause.** Every library, prop, file path,
>    and behaviour referenced must be real. Before writing a
>    drei component, confirm it is exported from the installed
>    version. Before using an R3F hook, confirm its signature
>    against the installed `@react-three/fiber` package. If
>    uncertain, write `TODO: verify` and resolve before declaring
>    done. Do not invent CSS class names, import paths, or API
>    shapes. If you suspect a bug (e.g. R3F camera lookAt), call
>    it out in the plan so the QA step catches it fast.
> 8. **Visual verification.** Before declaring done, take
>    screenshots in `agent-browser` at 1440×900 and 390×844 of:
>    assembled, exploded, part selected (callout visible), drawer
>    open, fallback view, fallback exploded. Verify that the
>    pixels are non-empty (readPixels on the canvas if needed).
> 9. **Reporting.** End with: libraries used, 3D technique,
>    tests performed, remaining limitations, local URL.

## Phase 4 — Spec deliverable to the user

The spec was presented to the user (the one that asked for the build)
before any code was written. The user accepted. No mid-build corrections
were needed.

## What Brief-Craft caught

- **R3F `lookAt(0,0,0)` bug.** Called out in the plan as a known
  risk. The bug appeared during QA (camera rendered the scene but
  missed the model) and was fixed in one line. Without Brief-Craft,
  the agent would have spent an extra round of guessing.
- **`Environment preset` CDN dependency.** Caught in the plan; the
  agent decided to skip it before starting, not after the build broke
  offline.
- **Auto-rotation breaking the callout.** Caught in the plan; the
  agent built without auto-rotation from the start.
- **Reporting format.** Surfaced by the user, but the agent's self-
  prompt included the report structure so the final message could not
  drift from what the user wanted.

## What would have gone wrong without Brief-Craft

- The agent might have used a 3D model loader (GLB) and gotten stuck
  finding a free CC0 model of a fictional weather station. The
  primitive-composition approach (RoundedBox + Cylinder + Plane)
  avoids the problem entirely.
- The agent might have used the existing Next.js project as a base
  ("reimplement" interpreted as "rebuild in place") and broken
  unrelated code. The folder-separation constraint caught this.
- The agent might have skipped the WebGL fallback because WebGL
  always works in their sandbox. The requirement was explicit in
  the user's prompt, but Brief-Craft pulled it into the agent's
  self-prompt as a binding item, not a "nice to have".
