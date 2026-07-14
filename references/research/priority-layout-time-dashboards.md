# Priority Layout And Time Dashboards

Use this reference when the user asks how to position sidebars, top bars, primary buttons, critical KPIs, timer controls, or dashboard data that must be understood quickly.

## Source Map

Primary sources reviewed:

- Nielsen Norman Group, F-shaped scanning pattern: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Nielsen Norman Group, visual hierarchy principles: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- MDN CSS `position`: https://developer.mozilla.org/en-US/docs/Web/CSS/position
- MDN CSS Grid layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- W3C WCAG timing adjustable: https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
- WAI-ARIA live regions: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions
- Material Design navigation drawer: https://m3.material.io/components/navigation-drawer/overview
- Dashboard design patterns literature: https://arxiv.org/abs/2205.00757
- W3C WCAG use of color: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

## Core Idea

Important UI should live where the user makes the next decision. Do not place critical data in a decorative card just because it looks balanced.

For operational dashboards, time is usually the primary scarce resource. If the page tracks work time, put the active timer, current session, and primary action in the highest-priority zone.
## Sober Emphasis: The Red Dress Rule

Important data needs contrast, not noise. A useful metaphor: one elegant red dress in a room of black suits. The important element is unmistakable because the rest of the scene is restrained.

Apply this to UI:

- Pick one primary protagonist per viewport: active timer, bottleneck, failed SLA, urgent approval, or key financial value.
- Make the surrounding interface calmer: neutral surfaces, lower saturation, repeated structure, consistent typography.
- Use one reserved accent color only for the critical element and the action directly related to it.
- Add isolation: more whitespace, a slightly stronger border, a narrow accent rail, or a different value scale.
- Use shape, label, position, or text in addition to color. WCAG requires that color is not the only way information is conveyed.
- Avoid making every KPI colorful. If everything is highlighted, nothing is highlighted.

Good sober emphasis tools:

- A single red rail on the left edge of a critical KPI.
- One red number with surrounding neutral labels.
- A single chart bar in red, with "mayor", "critico", or "riesgo" in text.
- Slightly larger type for the critical value, not a giant decorative card.
- Muted neighboring cards so the highlighted card becomes obvious by contrast.

Bad emphasis tools:

- Multiple bright colors competing in the same KPI row.
- Red used for branding, primary buttons, charts, badges, and warnings all at once.
- Pulsing or blinking important data in operational dashboards.
- Highlighting decorative containers instead of the value the user must act on.

## Screen Priority Zones

1. Primary work zone:
   - Top-left or top-center of the main content on desktop.
   - First visible block on mobile.
   - Holds the active timer, current work item, and start/pause/stop action.
2. Context zone:
   - Top bar.
   - Holds date range, team/supplier context, global filters, and export/search.
   - Should not compete with the timer.
3. Navigation zone:
   - Sidebar on desktop, compact top/bottom nav on small screens.
   - Helps orientation but should not steal visual weight from the current decision.
4. Evidence zone:
   - Main grid below the primary work zone.
   - Holds mean, median, distribution, recent sessions, and bottlenecks.
5. Secondary action zone:
   - Right rail or card footer.
   - Holds lower-risk actions like adding a note, changing category, or reviewing history.

## Sidebar Rules

- Use a sidebar for stable sections, modules, procurement stages, or reports.
- Keep it persistent on desktop when users switch areas often.
- Make it visually quieter than the dashboard body.
- Do not put the primary time-tracking action only in the sidebar.
- Sidebars are for "where am I?" and "where can I go?", not for "what must I do now?"

## Top Bar Rules

- Use top bars for current scope, date range, account/team, export, and global search.
- Sticky top bars are useful when the dashboard scrolls, but keep them slim.
- Avoid huge top bars in operational tools; they push critical data down.
- If there is a timer, the top bar may show a compact live value, but the full controls belong in the primary work zone.

## Primary Button Rules

- A primary button should sit near the data it changes.
- Timer actions should be grouped as one control cluster:
  - Start / pause: strongest visual weight.
  - Stop / save: adjacent but not more dominant than start while running.
  - Reset/delete: secondary or destructive, away from accidental clicks.
- Export/report buttons are important but not primary while time is running.
- On mobile, keep the timer action cluster visible before analytics.

## Critical Data Rules

Show these above detailed charts:

- Active elapsed time.
- Today's total hours.
- Mean session length.
- Median session length.
- Longest bottleneck stage.
- Unlogged time or missing category count.

Mean and median should be shown together:

- Mean answers: "How much time do we spend on average?"
- Median answers: "What is typical when outliers do not dominate?"
- If mean is much higher than median, highlight outliers or bottlenecks.

Highlight only the data that changes the next decision. In a procurement time dashboard, the bottleneck stage is often the best protagonist because it tells the user where time is leaking.

## Procurement Time Dashboard Recipe

Recommended layout:

```text
Sidebar | Top bar: period, supplier/team, export
        | Primary work zone: active timer + selected purchase stage + action buttons
        | KPI row: today, mean, median, bottleneck
        | Main evidence: stage distribution chart + recent sessions table
        | Right rail: quick categories, notes, data quality
```

Responsive behavior:

- Desktop: sidebar + sticky top bar + two-column evidence grid.
- Tablet: sidebar becomes horizontal module rail; right rail drops below KPIs.
- Mobile: no permanent sidebar; timer first, then KPIs, then history.

## Agent Procedure

When applying this reference:

1. Name the critical user decision in one sentence.
2. Assign each UI element to a priority zone before styling.
3. Put the primary action next to the data it changes.
4. Use Grid for dashboard regions and Flexbox for control clusters.
5. Make sidebar/top bar persistent only if they reduce navigation cost.
6. Calculate mean and median from the same source data.
7. Add accessible timer text and avoid relying only on color.
8. Verify at desktop and mobile widths that the timer and top KPIs appear before secondary data.

## Anti-Patterns

Avoid:

- Centering every card with equal visual weight.
- Making the sidebar more visually dominant than active work.
- Hiding timer controls under charts.
- Putting start/stop buttons far from elapsed time.
- Showing mean without median in time data.
- Highlighting every KPI with a different accent color.
- Using color alone to identify the critical value.
- Letting a sticky top bar consume too much vertical space.
- Using decorative dashboards where the next decision is unclear.
