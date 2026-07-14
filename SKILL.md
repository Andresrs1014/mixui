---
name: mixui
description: Use this skill only when building, redesigning, or polishing React/Next.js/Tailwind interfaces that already use, or can safely adopt, a component library such as shadcn/ui, Magic UI, Aceternity UI, shadcnblocks, or coss/ui. Use for choosing libraries, installing components, combining blocks, and auditing visual quality, accessibility, motion, layout, positioning, overlays, 3D components, product viewers, exploded views, and responsive behavior. Do not use for vanilla HTML/CSS/JS projects or generic CSS edits that do not involve component composition.
---

# MixUI

MixUI helps Codex compose production UI from multiple React component ecosystems without turning the result into a demo collage.

## Eligibility

Use MixUI only when the repository already has a component system or can safely adopt one: normally React/Next.js, Tailwind, and one accessible base library such as shadcn/ui or coss/ui.

Do not use MixUI for vanilla HTML/CSS/JS projects. If the requested work needs MixUI but the repository is vanilla, first propose or create the minimum React/Tailwind/component-library foundation; do not substitute handcrafted DOM and CSS for the component composition this skill evaluates.

## Core Rule

Build the interface workflow first, then choose components. Prefer one accessible base system and add decorative motion or blocks only when they support the user's goal.

## Pre-flight: Brief-Craft

When a user request is **basic, vague, or under-specified** — typically fewer than three sentences, no explicit success criteria, no stated constraints, no quality bars, and a template-shaped answer — surface the implicit requirements first instead of guessing.

A request is "too basic" if swapping in a different domain would produce the same answer.
- ❌ "Build me a landing page" → too basic.
- ❌ "Make a product page" → too basic.
- ✅ "Build a product page for a portable weather station called Northline Beacon, with a 3D exploded view of 7 parts, an accessible drawer for part inspection, a single-accent storm alert, and a CSS/SVG fallback for environments without WebGL" → not basic, has constraints.

When the request is too basic, run **Brief-Craft** before the Workflow below:

1. **Surface 8–12 critical requirements.** Produce a numbered list grouped by category: audience, scope, hard constraints, success criteria, quality bars, accessibility, failure modes, deliverables, reporting format. Read `references/brief-craft.md` for the full framework.
2. **Plan the work.** A short plan: components to build, libraries to use, files to create, checks to run, what to verify visually. No code yet.
3. **Agent writes its own prompt.** Write a single, complete, executable prompt to yourself that incorporates the requirements and the plan. Include an explicit **no-hallucination clause**: every library name, version, file path, prop, and behavior must be real; if uncertain, search the web, read the docs, or say "I do not know" instead of inventing. The self-prompt is the contract with yourself.
4. **Produce a spec deliverable.** Present the spec (requirements + plan + self-prompt) to the user **before** writing code. The user can correct, accept, or reject. This is the cheapest place to fix a misunderstanding.

After the user signs off, continue with the Workflow below. If the user request is already specific, skip Brief-Craft and go straight to step 0 of the Workflow.

A worked example using Brief-Craft on the Northline Beacon product page lives in `examples/northline-beacon-brief.md`.

## Template Decision

When a task starts from an existing HTML/CSS/JS template, CSS implementation, or visual mockup and the user has not already chosen an intent, ask before coding:

> ¿Buscas conservar el CSS actual o vas a reimplementar con componentes nuevos?

- **Conservar el CSS actual:** treat the work as a fidelity migration. Preserve the visual structure deliberately, adapt behavior safely, and do not present it as a component-native redesign.
- **Reimplementar con componentes nuevos:** treat the prior artifact only as a visual and functional brief. Do not port its DOM, classes, CSS structure, or layout literally. Start from a clean React/Tailwind route, compose accessible primitives first, then recreate the intended visual direction.

If the prompt already selects either mode, do not ask again. When a user asks for a MixUI quality test or a new product UI, default to reimplementation rather than a template port.

For full UI builds or visual tests, read `references/mixui-playbook.md` first. It consolidates the MixUI method: decision priority, component selection, sober emphasis, depth, environmental transitions, overlays, 3D component composition, and validation.

## Workflow

0. Resolve template intent before inspecting or migrating template code when it is ambiguous.
1. Inspect the project before installing anything.
   - Check framework, package manager, TypeScript, Tailwind, `components.json`, existing `components/ui`, and design conventions.
   - Run `node <skill>/scripts/inspect-project.mjs <project-root>` when a quick project summary is useful.
2. Choose the base system.
   - Use shadcn/ui for accessible primitives, app UI, forms, navigation, dashboards, dialogs, tables, and charts.
   - Use coss/ui when the project favors Base UI-style primitives or needs accessible low-level controls.
   - Use Magic UI for landing polish, backgrounds, animated text, hero effects, device mocks, and subtle motion.
   - Use Aceternity UI for expressive marketing sections, animated cards, unusual navigation, backgrounds, and hero interactions.
   - Use Motion for DOM/UI choreography, layout transitions, scroll storytelling, SVG animation, and state transitions.
   - Use React Three Fiber or Three.js for real 3D scenes, product viewers, primitive geometry, exploded views, cameras, lights, and model interaction.
   - Use Spline as a visual 3D asset or embed pipeline when art direction matters more than mesh-level code control.
   - Use shadcnblocks for full blocks or page sections only after checking licensing, install path, and fit with the existing design.
3. Install through official sources.
   - Prefer the project's package manager and existing CLI setup.
   - Prefer shadcn-compatible registries and CLI commands over copy-pasting large snippets.
   - Treat shadcn MCP as optional: use it when configured, but never require it to finish the task.
4. Compose in layers.
   - Layer 1: structure, layout, semantics, routing, and data states.
   - Layer 2: accessible primitives and controls.
   - Layer 3: blocks, sections, content hierarchy, and responsive behavior.
   - Layer 4: motion, backgrounds, decorative effects, overlays, and empty/loading states.
5. Apply the MixUI composition contract.
   - Put the user's next decision first.
   - Use one sober visual protagonist per viewport.
   - Connect depth, transitions, and overlays to the same spatial and layout model.
   - Keep strong 3D or decorative motion away from primary hit targets unless browser-tested.
6. Keep libraries from fighting each other.
   - Do not mix multiple animated hero systems in the same viewport.
   - Do not add a second primitive system for one component unless it clearly reduces work.
   - Preserve existing tokens, radius, spacing, and import aliases.
7. Validate before final response.
   - Run the narrowest relevant checks available in the project.
   - For UI work, verify responsive layout and obvious accessibility states.
   - For visual changes, use browser or screenshot verification when feasible.

## Reference Routing

Read only the reference needed for the current task:

- `references/libraries.md` for library roles, fit, and risks.
- `references/mixui-playbook.md` for full UI builds, redesigns, visual evaluations, or tasks combining component selection with layout, emphasis, depth, motion, and overlays.
- `references/selection-matrix.md` for choosing components by UI pattern.
- `references/install-recipes.md` for official install paths and optional MCP notes.
- `references/composition-patterns.md` for combining libraries without visual noise.
- `references/quality-gates.md` before finalizing UI changes.
- `references/brief-craft.md` when the user request is too basic — full framework for surfacing requirements, planning, the agent self-prompt, and producing a spec the user reviews before code is written.
- `examples/northline-beacon-brief.md` worked example of Brief-Craft applied to a 3D product page.
- `references/research/motion-depth-ui.md` when the task asks for transitions, scrollytelling, page motion, depth, parallax, 3D layering, or a UI that should not feel flat.
- `references/research/spatial-depth-environmental-transitions.md` when feedback asks for road-like depth, long perspective, stronger scene depth, environmental transitions, or surrounding UI that reacts to a component transition.
- `references/research/layout-overlay-positioning.md` when the task involves modals, dialogs, drawers, sheets, popovers, tooltips, overlays, positioning, layout composition, visual hierarchy, grid/flex systems, spacing, density, stacking context, z-index, box model, or responsive breakpoints.
- `references/research/priority-layout-time-dashboards.md` when the task involves sidebars, top bars, primary actions, critical KPIs, timer controls, important data placement, dashboard scan order, or time-tracking dashboards.
- `references/research/3d-component-composition.md` when the task asks for 3D components, exploded views, product viewers, primitive geometry, model loading, React Three Fiber, Three.js examples, Spline scenes, or Motion choreography around 3D.

## Decision Bias

- App, dashboard, admin, CRM, auth, forms: start with shadcn/ui.
- Landing page, launch page, portfolio, product hero: start with shadcn/ui plus one Magic UI or Aceternity enhancement layer.
- Animated navigation or showcase UI: consider Aceternity or Magic UI after the base navigation is clear.
- Accessible primitive refresh: consider coss/ui only if it fits the existing stack.
- Existing codebase with a clear design system: adapt to it first, then add components.
- Transitions or depth-focused UI: define motion purpose, depth layers, reduced-motion behavior, and the smallest animation technology before coding.
- Depth must include a spatial model: horizon or vanishing point, repeated scale cues, occlusion, foreground/mid/background layers, and contrast differences. Shadows or rotated cards alone are not enough.
- Depth and overlays must share one scene. A modal, drawer, card, or popover placed above a deep background needs a contact cue, matched perspective, local shadow/footprint, and environmental response so it does not feel projected onto a flat wall.
- A major transition should have an environmental response: sibling elements, progress rails, background light, depth planes, or the top-level scene should react around the active component.
- Overlays must be chosen by intent: modal dialog for blocking decisions, drawer/sheet for temporary task panels, popover for anchored compact controls, tooltip for non-interactive hints, and inline disclosure when interruption is unnecessary.
- Positioning must start with layout flow, Grid/Flex, and semantic layer tokens before using absolute positioning or arbitrary z-index values.
- Critical dashboard data must be placed by decision priority: active timer and primary action first, context in the top bar, navigation in the sidebar, evidence charts below, and secondary actions near but not above the main decision.
- Sober emphasis beats noise: reserve one accent for the critical value or action; if every component is highlighted, no component is highlighted.
- 3D must earn its weight: use SVG/CSS for light isometric diagrams, React Three Fiber or Three.js for real mesh interaction, and Spline only when a visually authored scene or exported asset is the better source.

## Output Expectations

When using MixUI, report:

1. The selected base system and enhancement libraries.
2. Components or blocks installed or reused.
3. Checks run.
4. Any MCP, registry, license, layout, overlay, or accessibility caveats.

When Brief-Craft was used, also report:

5. The 8–12 critical requirements that drove the build (so the user can see what was understood).
6. The no-hallucination checks you ran: libraries verified against `package.json`, props verified against installed types, file paths verified against the project tree.
7. Remaining limitations and unverified assumptions (call out anything you could not confirm).

