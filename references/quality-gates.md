# Quality Gates

Run these checks before finalizing UI work.

## Build And Type Safety

Use existing project commands when available:
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `tsc --noEmit`

Do not invent scripts. If a command does not exist, report that clearly.

## Component Integrity

Check:
- No unused imports.
- No broken aliases.
- No duplicate primitive systems without a reason.
- No copied demo data left in production UI.
- No `console.log` or debug artifacts.

## Accessibility

Check:
- Keyboard focus is visible.
- Dialogs, popovers, menus, sheets, and tooltips use accessible primitives.
- Form labels, errors, disabled states, and loading states are clear.
- Contrast remains readable on animated or image backgrounds.
- Motion has a reduced-motion path when animation is significant.

## Responsive Behavior

Check:
- Mobile, tablet, and desktop layouts.
- Long labels and translated strings.
- Navigation collapse behavior.
- Cards and grids do not overflow.
- Hero media does not hide primary text.

## Visual Composition

Check:
- One dominant visual idea per viewport.
- One sober protagonist for the critical value or action.
- Effects support the product's tone.
- shadcn blocks or third-party sections match local tokens.
- The result feels like one system, not pasted examples.
- Depth is connected to foreground UI through shared planes, contact cues, or environmental response when depth is used.
- Overlays preserve context, focus behavior, close paths, and layer order.
- 3D scenes have stable canvas dimensions, nonblank render, camera framing, fallback/loading states, and reduced-motion behavior.
- 3D labels, part selection, and critical controls remain readable and accessible outside the canvas when needed.
