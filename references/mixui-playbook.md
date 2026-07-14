# MixUI Playbook

Use this playbook for full UI builds, redesigns, or visual evaluations where component choice, layout, emphasis, depth, motion, and overlays must work as one system.

## Operating Model

1. Define the user's next decision.
2. Choose one base primitive system before adding visual libraries.
3. Place critical data and actions by priority.
4. Compose structure before decoration.
5. Add one visual protagonist per viewport.
6. Add depth and motion only when they clarify state, hierarchy, or product feeling.
7. Add overlays only when they preserve or clarify context.
8. Verify with browser interactions, responsive checks, and screenshots when feasible.

## Four-Layer Composition Contract

Layer 1: workflow and data.
- Decide what the user must understand or do first.
- Put the primary action, active state, or critical metric in the strongest position.

Layer 2: layout and positioning.
- Use Grid for two-dimensional page regions and Flexbox for one-dimensional alignment.
- Establish top bar, sidebar, content, and overlay layer roles before absolute positioning.
- Prefer semantic spacing, alignment, density, and responsive breakpoints over decorative placement.

Layer 3: component system.
- Use shadcn/ui for accessible application primitives, forms, dialogs, tables, and dashboards.
- Add Magic UI, Aceternity UI, shadcnblocks, or coss/ui only when they solve a specific visual or interaction job.
- Keep tokens, radius, typography, focus states, and density consistent across borrowed components.

Layer 4: expression, motion, and 3D.
- Add backgrounds, depth, animated transitions, 3D objects, or hero effects after the primary layout works.
- Tie expressive effects and 3D scenes to the same spatial model as the foreground UI.
- Keep strong 3D or decorative motion away from critical hit targets unless verified.
- Choose SVG/CSS, React Three Fiber, Three.js, or Spline by interaction depth and runtime control, not novelty.

## Decision Priority

Design from the most important user decision outward:

- Auth: identity, trust signal, and sign-in action first; storytelling and brand atmosphere second.
- Task management: active task, creation path, due risk, and next action first; summaries and history second.
- Time dashboards: active timer, primary control, and time risk first; average, median, charts, and evidence second.
- Commerce: product decision, price, availability, and checkout path first; editorial story second.

Use top bars for context and global actions, sidebars for navigation and scope, main panels for the active decision, and lower or secondary regions for evidence.

## Sober Emphasis

Apply the red dress rule: one important thing may stand out because the rest is restrained.

- Reserve one accent color for the critical value, risk, or primary action.
- Pair color with position, scale, label, or shape so meaning is not color-only.
- Avoid making every KPI, button, and card bright.
- Let neutral UI carry most of the page; use the accent as a deliberate signal.

## Depth And Environmental Transitions

Depth must feel like a shared environment, not a background projected behind flat components.

Build a spatial model:
- Horizon or vanishing point.
- Foreground, midground, and background layers.
- Repeated scale cues such as rails, tiles, lanes, grid lines, or object size changes.
- Occlusion, contact shadows, and local light where foreground components meet the scene.
- Atmospheric contrast changes for far layers.

Connect foreground UI to the depth:
- Use contact planes, soft footprints, shadows, reflections, or subtle masks under cards.
- Match perspective direction between decorative layers and component motion.
- Let the scene respond when important components transition: rails glow, depth planes shift subtly, siblings compress, or ambient light changes.
- Keep response subtle; avoid moving the whole interface enough to hurt readability or click precision.

## Overlays And Superposition

Choose the overlay by intent:

- Modal dialog: blocking decision that must be resolved before continuing.
- Drawer or sheet: temporary task panel that keeps page context visible.
- Popover: small anchored control or menu.
- Tooltip: non-interactive hint.
- Inline disclosure: first choice when interruption is unnecessary.

Overlay rules:
- Use accessible primitives with focus trap, escape key, close button, and focus restore.
- Use semantic z-index tokens instead of arbitrary escalation.
- Add a backdrop only when outside interaction must be blocked.
- In deep scenes, give overlays a contact cue: backdrop perspective, local shadow, footprint, or environmental dimming.
- Avoid stacking multiple modal layers unless the product flow truly requires it.

## Motion Restraint

Prefer transform and opacity. Avoid animating layout, width, height, top, left, or expensive filters on large surfaces.

Timing:
- Micro feedback: 120-180ms.
- Component enter/exit: 180-320ms.
- Page or scrollytelling beats: 320-520ms.

Always provide a reduced-motion path for meaningful animation.

## Practical Build Procedure

Before coding:
- Identify audience, task, tone, and the single most important decision.
- Choose base system and one enhancement layer.
- Sketch top bar, sidebar, main decision area, secondary evidence, and overlay zones.

While coding:
- Build semantic layout first.
- Add components with consistent tokens.
- Add protagonist emphasis.
- Add depth or motion only after layout and accessibility work.
- Add overlays with focus behavior and explicit close paths.

Before final response:
- Run available build, type, lint, or static checks.
- Inspect mobile and desktop layouts.
- Verify hover, active, opened, closed, loading, and reduced-motion states when applicable.
- Report any skipped checks or missing project scripts.

## Scoring Rubric

Layout and positioning:
- 5: elements are visible but feel placed independently.
- 7: hierarchy is clear, with minor density or alignment issues.
- 8: top bar, sidebar, actions, data, and evidence have clear roles.
- 9-10: placement makes the next user decision feel effortless.

Sober emphasis:
- 5: many elements compete.
- 7: one area stands out, but signals are still noisy.
- 8: one protagonist is clear and restrained.
- 9-10: emphasis feels inevitable, elegant, and useful.

Depth:
- 5: decorative perspective behind flat UI.
- 7: visible depth cues, but foreground and background still feel separate.
- 8: shared planes, shadows, and occlusion connect UI to scene.
- 9-10: the interface feels inside one coherent spatial environment.

Transitions:
- 5: component animates alone.
- 7: animation is smooth but surroundings barely react.
- 8: surrounding UI responds subtly without harming usability.
- 9-10: transition, environment, state, and hierarchy reinforce each other.

Overlays:
- 5: overlay appears but layer logic is fragile.
- 7: overlay works, with minor context or focus issues.
- 8: overlay intent, position, focus, and backdrop are correct.
- 9-10: overlay feels spatially integrated and effortless to dismiss.

## Reference Routing

- Use `selection-matrix.md` to choose component libraries and patterns.
- Use `composition-patterns.md` to combine libraries without visual noise.
- Use `research/priority-layout-time-dashboards.md` for data priority, top bars, sidebars, primary buttons, and sober emphasis.
- Use `research/spatial-depth-environmental-transitions.md` for road-like depth, shared spatial planes, and environment-reactive transitions.
- Use `research/layout-overlay-positioning.md` for modal, drawer, sheet, popover, positioning, stacking, grid, flex, spacing, and responsive behavior.
- Use `research/3d-component-composition.md` for 3D components, exploded views, product viewers, model loading, primitive geometry, R3F, Three.js, Spline, and Motion choreography around 3D.
- Use `quality-gates.md` before finalizing UI work.
