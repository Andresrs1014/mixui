# Library Roles

Use this file to decide which ecosystem should own each layer of the UI.

## shadcn/ui

Role: accessible app primitives and composable product UI.

Use for:
- Buttons, inputs, form fields, select, tabs, dialog, sheet, drawer, popover, tooltip.
- Sidebar, navigation menu, data table, cards, charts, skeletons, toast/sonner.
- Dashboards, admin panels, auth flows, CRUD screens, settings, repeatable app surfaces.

Risks:
- Can become generic if left unstyled.
- Needs design direction, spacing, typography, and content hierarchy.

## Magic UI

Role: tasteful motion, backgrounds, text effects, device mocks, and landing polish.

Use for:
- Hero visual interest, animated text, marquee, bento grids, grid/dot backgrounds, shimmer/rainbow buttons, subtle reveals.

Risks:
- Too many effects create visual noise.
- Audit `prefers-reduced-motion`, mobile performance, and contrast.

## Aceternity UI

Role: expressive marketing components, animated sections, unusual nav, cards, backgrounds, and hero interactions.

Use for:
- Floating Dock, Floating Navbar, hero highlights, background beams, animated cards, bento grids, testimonials, pricing, portfolio sections.

Risks:
- Some pieces are visually dominant. Use one strong effect per viewport.
- Verify dependencies and licensing before copying or installing.

## shadcnblocks

Role: full-page sections and block inspiration around the shadcn ecosystem.

Use for:
- Landing sections, auth layouts, pricing, FAQ, hero, dashboard blocks, quick page assembly.

Risks:
- Verify license and installation method.
- Adapt blocks to the project's tokens instead of pasting a disconnected section.

## coss/ui

Role: modern accessible primitives built around Base UI ideas.

Use for:
- Primitive controls, popovers, sheets, tabs, toolbars, OTP, pagination, select, sliders, tables, toggles, tooltips.

Risks:
- Do not mix with shadcn primitives unless the project benefits from that architecture.
- Check styling and token compatibility before broad adoption.
