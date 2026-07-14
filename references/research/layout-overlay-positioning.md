# Layout Overlay And Positioning Research

Use this reference when a task involves modal dialogs, drawers, sheets, popovers, floating panels, overlapping sections, z-index bugs, responsive layout, visual hierarchy, grid/flex composition, spacing, density, or elements that must sit above or beside other UI without breaking accessibility.

## Source Map

Primary sources reviewed:

- MDN CSS position: https://developer.mozilla.org/en-US/docs/Web/CSS/position
- MDN stacking context: https://developer.mozilla.org/en-US/docs/Understanding_CSS_z-index/The_stacking_context
- MDN box model: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model
- MDN CSS grid layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- MDN flexbox: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox
- MDN dialog element: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- MDN Popover API: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- MDN CSS anchor positioning: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- WAI-ARIA Authoring Practices modal dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- shadcn/ui Dialog: https://ui.shadcn.com/docs/components/dialog
- shadcn/ui Sheet: https://ui.shadcn.com/docs/components/sheet
- shadcn/ui Drawer: https://ui.shadcn.com/docs/components/drawer
- shadcn/ui Popover: https://ui.shadcn.com/docs/components/popover

## Vocabulary

Overlay is the broad family: a UI layer rendered above the main page.

Modal or modal dialog:
- Blocking overlay with backdrop.
- User must complete, cancel, or close before interacting with the rest of the page.
- Good for login, destructive confirmation, critical short forms, required decisions.
- Bad for long workflows, optional details, or content users need to compare with the page.

Dialog:
- The semantic/accessibility concept: HTML `dialog`, `role="dialog"`, or an accessible primitive such as Radix/shadcn Dialog.
- A dialog can be modal or non-modal, but in product UI people often use "dialog" and "modal" interchangeably.
- If it blocks page interaction, treat it as modal and follow modal accessibility rules.

Drawer:
- Panel that slides from a viewport edge, usually left or right.
- Good for settings, filters, cart, inspector panels, side details, or navigation on compact screens.
- Keep page context visible when useful, but block or trap focus if the drawer is modal.

Sheet:
- shadcn/iOS-style panel. A sheet can enter from any side; bottom sheet is common on mobile.
- Use when the interaction feels like a temporary task surface rather than a centered interruption.
- Bottom sheet works well for mobile actions, quick forms, filters, and compact previews.

Popover:
- Small overlay anchored to a trigger element.
- Usually no full-page backdrop.
- Good for menus, pickers, quick metadata, tool settings, help, command options, small forms.
- Should close on outside click, Escape, selection, or blur depending on the pattern.
- Do not use for critical blocking decisions.

Tooltip:
- Non-interactive hover/focus hint.
- Do not put buttons, links, or form fields inside a tooltip. Use popover instead.

## Pattern Selection

Choose by user intent before choosing visual style:

| Need | Pattern | Notes |
| --- | --- | --- |
| Require a decision before continuing | Modal dialog | Add backdrop, focus trap, Escape close unless dangerous flow needs explicit cancel. |
| Edit settings without leaving context | Drawer or sheet | Side on desktop, bottom on mobile. |
| Show details from a table/card while keeping context | Drawer, side panel, or non-modal panel | Prefer drawer if details are secondary. Prefer route/detail page if details are primary. |
| Offer small anchored controls | Popover | Anchor to trigger, avoid backdrop, keep content compact. |
| Mobile quick action surface | Bottom sheet | Make drag/close affordance clear when supported. |
| Global navigation on mobile | Drawer/sheet | Use clear close button and focus management. |
| Tiny explanatory text | Tooltip | Non-interactive only. |

Ponytail rule: do not build a modal if inline disclosure, accordion, tabs, or a route can solve the flow with less interruption.

## Accessibility Rules For Overlays

Modal dialog requirements:

- Use native `dialog` correctly or an accessible primitive like shadcn/Radix Dialog.
- Give the dialog an accessible name via title, `aria-labelledby`, or equivalent primitive.
- Move focus into the dialog on open.
- Trap keyboard focus while modal is open.
- Restore focus to the trigger on close.
- Close with Escape unless the product risk requires an explicit action.
- Prevent pointer interaction with inert background content.
- Keep a visible close/cancel path.
- Do not hide required context behind the backdrop if the user needs it to complete the task.

Popover requirements:

- Anchor visually and semantically to the trigger.
- Support keyboard open/close.
- Close with Escape and usually outside click.
- Use menu/listbox/combobox patterns when the content is actually one of those widgets.
- Do not trap focus unless the popover behaves like a modal, which usually means it should be a dialog instead.

Drawer/sheet requirements:

- If modal, follow modal dialog focus rules.
- If non-modal, make keyboard order and close behavior predictable.
- Side drawers need a close button near the leading edge or header.
- Bottom sheets need enough top affordance and should not hide primary mobile navigation unpredictably.

## Positioning Terms

Layout:
- The overall arrangement of elements on the screen.
- Decide layout before styling individual components.

Composition:
- The visual relationship among elements: balance, tension, rhythm, negative space, asymmetry, and focal points.
- In UI, composition should support scan order and task priority.

Visual hierarchy:
- The order in which the eye notices UI.
- Created by size, contrast, position, spacing, weight, color, motion, and isolation.

Grid system:
- Invisible column/row structure that keeps content aligned.
- Use CSS Grid for two-dimensional layout and page-level structures.
- A 12-column grid is common, but not mandatory. Fit the grid to the content.

Alignment:
- Shared edges and baselines make UI feel intentional.
- Align labels, values, card edges, controls, and section starts.
- Break alignment only for a clear focal point.

Spacing / whitespace:
- Space separates groups and gives hierarchy.
- Use larger gaps between groups than within groups.
- Dense UI still needs grouping space.

Density:
- How compressed the information feels.
- Dashboards, admin apps, and matrices can be dense, but need strict alignment, consistent row height, and strong grouping.
- Marketing and auth screens usually need lower density and clearer focal space.

## CSS Positioning

`position: static`:
- Default document flow.
- Use for most elements.

`position: relative`:
- Keeps the element in flow and enables offset or absolute child anchoring.
- Common for local decorative layers and badges.

`position: absolute`:
- Removed from normal flow and positioned relative to the nearest positioned ancestor.
- Use for local overlays, badges, decorative planes, image labels, and anchored internal layers.
- Avoid for primary page layout.

`position: fixed`:
- Positioned relative to the viewport.
- Use for modal portals, full-screen overlays, toasts, and global fixed nav.
- Check mobile viewport behavior and safe areas.

`position: sticky`:
- Acts relative until a threshold, then sticks.
- Use for headers, side filters, scrollytelling visuals, table headers, and progress rails.
- Sticky requires a scroll container that allows it to stick; overflow parents can break it.

Default choice:
- Use normal flow with Grid/Flex first.
- Use `relative` for a local positioning context.
- Use `absolute` for local decorative or anchored pieces.
- Use `fixed` for viewport overlays.
- Use `sticky` for scroll-linked layout, not for modal behavior.

## Layout Systems

Flexbox:
- One-dimensional layout: row or column.
- Best for nav bars, button groups, form rows, card internals, toolbars, and centering.
- Use `gap`, not margin hacks, for component spacing.

CSS Grid:
- Two-dimensional layout: columns and rows together.
- Best for page shells, dashboards, bento grids, galleries, catalog grids, pricing sections, and complex forms.
- Use named areas or explicit tracks when structure matters.

Do not choose Flexbox or Grid by habit. Choose by dimensionality:

- One axis: Flexbox.
- Two axes: Grid.
- Content flow with text: normal document flow, not a positioning system.

## Stacking Context And Z-Index

Stacking context decides what renders above what. `z-index` only competes inside the same stacking context.

Common stacking context creators:

- Positioned elements with `z-index`.
- `position: fixed` or `sticky`.
- `opacity` less than 1.
- `transform`, `filter`, `backdrop-filter`, `perspective`, `clip-path`, `mask`.
- `isolation: isolate`.
- Some containment and container query properties.

Practical rules:

- Portal global overlays near the app root when possible.
- Keep a small z-index scale as tokens.
- Avoid random values like `z-index: 999999`.
- If z-index "does not work", inspect parent stacking contexts first.
- Transforms on ancestors can trap descendants under other layers.
- Backdrop and panel should be siblings in the same overlay root.

Recommended layer tokens:

```css
:root {
  --z-base: 0;
  --z-raised: 10;
  --z-sticky: 100;
  --z-dropdown: 300;
  --z-popover: 400;
  --z-overlay: 700;
  --z-modal: 800;
  --z-toast: 900;
}
```

Use tokens semantically. A popover inside a modal should usually live inside the modal layer or an overlay manager, not fight the modal with a bigger number.

## Box Model

Every element size is content + padding + border + margin unless `box-sizing: border-box` changes sizing.

Rules:

- Use `box-sizing: border-box` globally.
- Use padding for internal breathing room.
- Use margin or parent `gap` for external spacing.
- Use borders for visible boundaries, not layout compensation.
- Do not depend on negative margins unless a deliberate overlap is part of the composition.

## Responsive Layout And Breakpoints

Start with the content and interaction mode, not fixed device names.

Common pattern:

- Mobile: one column, bottom sheet, compact top bar, fewer persistent panels.
- Tablet: two columns when content supports it, side sheet may become a drawer.
- Desktop: grid shell, side panels, sticky filters, popovers for local tools.
- Wide desktop: increase layout capacity, not just card width. Add columns, side metadata, or stronger composition.

Rules:

- Use fluid constraints: `minmax`, `clamp`, `max-width`, `aspect-ratio`, container queries when available.
- Avoid text scaling directly with viewport width.
- Avoid absolute positioning that assumes one viewport.
- Test overlays at small heights, not only small widths.
- Account for safe areas on mobile sheets and fixed controls.

## Overlay Composition Patterns

### Centered Modal

Use for focused, blocking tasks.

```css
.overlay-root {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 48px);
}

.overlay-backdrop {
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / .56);
}

.modal-panel {
  position: relative;
  width: min(100%, 440px);
  max-height: min(720px, calc(100dvh - 32px));
  overflow: auto;
}
```

### Side Drawer

Use for filters, settings, carts, inspectors, and details.

```css
.drawer-root {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
}

.drawer-panel {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  width: min(420px, 100%);
  max-width: 100%;
  overflow: auto;
}
```

### Bottom Sheet

Use for mobile-first temporary surfaces.

```css
.sheet-panel {
  position: fixed;
  inset-inline: 0;
  inset-block-end: 0;
  z-index: var(--z-overlay);
  max-height: min(80dvh, 720px);
  overflow: auto;
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

### Anchored Popover

Use platform anchors when available, or a library such as Radix/shadcn Popover for collision handling.

```css
.popover-panel {
  z-index: var(--z-popover);
  max-width: min(320px, calc(100vw - 24px));
}
```

Rules:

- Align the popover edge to the trigger when possible.
- Add collision padding so it does not touch viewport edges.
- Keep content small enough that it does not become a hidden modal.

## Visual Hierarchy In Overlays

Overlays should have a clear information order:

1. Title or label that explains why the layer opened.
2. Primary content or task.
3. Supporting details.
4. Primary action.
5. Secondary action or close.

Modal action alignment:

- Destructive confirmation: make cancel easy and destructive action visually distinct.
- Form modal: primary action after fields, not hidden only in header.
- Drawer: header close, sticky footer actions if the content scrolls.
- Popover: avoid heavy footers; keep actions close to the control that opened it.

## Superposition As Design

Superposition is not only z-index. It is a composition choice.

Use overlap when it adds meaning:

- Product image breaking out of a card to create depth.
- A floating control anchored to a selected object.
- A tooltip or popover explaining a precise region.
- A drawer preserving the page behind it for context.

Avoid overlap when it hides structure:

- Text over busy images without contrast control.
- Floating cards with no alignment or hierarchy.
- Panels stacked on panels with no clear close path.
- Multiple modal layers unless absolutely necessary.
## Overlays In Deep Scenes

When overlays live in a page with strong depth, do not treat them as a separate poster over the scene. Connect them to the environment:

- Modal: keep the accessible fixed root and backdrop, but give the panel a contact shadow or floor footprint aligned with the scene perspective.
- Drawer/sheet: let the page plane compress, dim, or slide in the same direction as the drawer so the panel feels like it entered the same room.
- Popover: anchor it tightly to its trigger and add a small local shadow/bridge, not a full-scene shadow.
- Z-index: keep semantic layer tokens, but remember that transforms and perspective create stacking contexts. Decorative 3D planes should usually use `pointer-events: none`.
- Hit testing: preserve normal 2D click targets where possible; apply heavy perspective to pseudo-elements, backgrounds, and contact planes.

Connection test: if removing the background image or road leaves the overlay floating without a visible reason for its position, the composition is not integrated yet.

## Agent Procedure

When applying this reference:

1. Classify the overlay: modal dialog, drawer, sheet, popover, tooltip, or inline disclosure.
2. Decide if it is blocking or non-blocking.
3. Pick the positioning model: normal flow, relative/absolute local layer, fixed viewport layer, or sticky scroll layer.
4. Define the layout system: Flexbox for one axis, Grid for two axes, normal flow for text-first content.
5. Define z-index tokens and avoid arbitrary z-index escalation.
6. Check stacking context parents before debugging z-index.
7. Add accessibility behavior: name, focus, Escape, outside click, focus restoration, inert background when modal.
8. Test responsive states, especially mobile height and bottom/side panel behavior.
9. Verify hierarchy: the user should know what opened, why it opened, what is primary, and how to close it.

## Anti-Patterns

Avoid:

- Using a modal for optional content that could be inline.
- Putting complex long workflows inside a small modal.
- Popovers that contain full forms, nested navigation, or critical blocking decisions.
- Multiple random z-index values instead of a layer scale.
- Fixing z-index by raising numbers without inspecting stacking context.
- Absolute positioning for full page layout.
- Centering everything when hierarchy needs alignment and grouping.
- Dense dashboards with weak grid alignment.
- Mobile drawers that exceed viewport height without scroll handling.
- Overlays without Escape, close button, or focus restoration.