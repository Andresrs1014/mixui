# Selection Matrix

Choose the smallest component set that supports the workflow.

## App Shell

Primary:
- shadcn/ui: Sidebar, Navigation Menu, Breadcrumb, Sheet, Tabs.

Enhance:
- Magic UI Dock for a creative app launcher.
- Aceternity Floating Dock or Floating Navbar for showcase/navigation-heavy landing pages.

Avoid:
- Animated navigation for dense admin workflows unless it improves speed.

## Forms And Auth

Primary:
- shadcn/ui: Field, Input, Button, Select, Checkbox, Radio Group, Dialog, Alert, Sonner.
- coss/ui: form primitives when the project is already aligned with Base UI.

Enhance:
- Magic UI only for surrounding polish, not core input behavior.

Avoid:
- Decorative effects that obscure labels, errors, focus, or disabled states.

## Landing Hero

Primary:
- shadcn/ui: Button, Badge, Card, Separator.

Enhance:
- Magic UI: Blur Fade, Animated Gradient Text, Grid Pattern, Dot Pattern, Shimmer Button, Safari/iPhone mock.
- Aceternity: Hero Highlight, Background Beams, Lamp Effect, Floating Navbar.

Avoid:
- Multiple animated backgrounds at once.
- Hero text inside a decorative card unless the product design explicitly uses cards.

## Dashboard

Primary:
- shadcn/ui: Sidebar, Card, Table, Data Table, Tabs, Chart, Skeleton, Tooltip.

Enhance:
- Minimal Magic UI number/text motion for KPI reveals.

Avoid:
- Heavy animated backgrounds and novelty hover effects.

## Marketing Sections

Primary:
- shadcnblocks or Aceternity blocks for hero, features, pricing, FAQ, testimonials.
- shadcn/ui primitives for buttons, cards, tabs, accordion, dialogs.

Enhance:
- Magic UI marquee, bento grid, border beam, shine border, device mocks.

Avoid:
- A section copied without matching tokens, typography, spacing, and responsive behavior.

## Empty, Loading, And Feedback

Primary:
- shadcn/ui: Empty, Skeleton, Spinner, Progress, Toast/Sonner, Alert.

Enhance:
- Magic UI animated list or subtle reveal if it does not delay task completion.

Avoid:
- Motion that hides the current state or blocks keyboard/screen reader users.
