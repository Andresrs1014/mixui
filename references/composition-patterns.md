# Composition Patterns

Use these patterns to combine libraries intentionally.

## Product App Pattern

Base:
- shadcn/ui app shell, forms, data display, dialogs, feedback.

Enhancement:
- One Magic UI reveal or micro-animation for onboarding, empty states, or KPI changes.

Rule:
- Dense workflows must stay calm, scannable, and keyboard-friendly.

## Landing Page Pattern

Base:
- shadcn/ui buttons, badges, cards, accordion, dialogs.

Sections:
- shadcnblocks or Aceternity for hero, features, pricing, testimonials, FAQ.

Enhancement:
- Magic UI backgrounds, text animation, device mocks, bento grid, marquee.

Rule:
- One dominant visual idea per viewport.

## Showcase Navigation Pattern

Base:
- shadcn/ui Navigation Menu or Tabs for structure.

Enhancement:
- Aceternity Floating Dock/Floating Navbar or Magic UI Dock when the design benefits from expressive navigation.

Rule:
- Keep keyboard navigation and visible focus intact.

## Hybrid Primitive Pattern

Base:
- Choose either shadcn/ui or coss/ui as the primitive family.

Enhancement:
- Use the other only when it clearly solves a missing accessible behavior.

Rule:
- Do not maintain two equivalent primitive systems without a reason.

## Motion Restraint Pattern

Use motion for:
- Page entry, state transition, feedback, scroll reveal, hero emphasis.

Avoid motion for:
- Required reading, form completion, dense tables, critical error messages.

Always consider:
- Reduced motion.
- Mobile performance.
- Contrast while elements animate.
