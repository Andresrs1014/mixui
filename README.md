# mixui

Compose production UI from multiple React component ecosystems without turning
the result into a demo collage. Includes **Brief-Craft** — a pre-flight step
that turns basic or under-specified requests into a real spec before any
code is written.

## What this skill is for

- Building, redesigning, or polishing React / Next.js / Tailwind interfaces
  that use or can adopt a component library (shadcn/ui, coss/ui, Magic UI,
  Aceternity UI, shadcnblocks).
- Choosing libraries, installing components, combining blocks, and auditing
  visual quality, accessibility, motion, layout, positioning, overlays, 3D
  components, product viewers, exploded views, and responsive behavior.
- **Brief-Craft:** when the user request is basic or under-specified, the
  skill first surfaces 8–12 critical requirements, plans the work, writes
  an executable self-prompt with a no-hallucination clause, and presents a
  spec to the user for sign-off before any code is written.

## Install

The skill ships as a directory whose root is `SKILL.md`. To install in
Mavis:

```bash
git clone https://github.com/YOUR-USER/mixui.git ~/.mavis/skills/mixui
```

The next Mavis session will see `mixui` in the available skills. No
runtime restart required.

To update later:

```bash
cd ~/.mavis/skills/mixui && git pull
```

## What is in the box

```
SKILL.md                                # the entry point
agents/openai.yaml                      # Cursor / OpenAI-style agent config
references/
  mixui-playbook.md                     # full UI build method
  selection-matrix.md                   # pick components by UI pattern
  composition-patterns.md               # combine libraries without noise
  libraries.md                          # role, fit, and risks of each lib
  install-recipes.md                    # official install paths
  quality-gates.md                      # validation before final
  brief-craft.md                        # pre-flight spec framework  ← new
  research/
    motion-depth-ui.md
    spatial-depth-environmental-transitions.md
    layout-overlay-positioning.md
    priority-layout-time-dashboards.md
    3d-component-composition.md
scripts/inspect-project.mjs             # quick project-tree summary
examples/
  northline-beacon-brief.md             # worked example of Brief-Craft  ← new
```

## Brief-Craft in one paragraph

When a user request is too basic (template-shaped, no constraints, no
success criteria), the agent does not start coding. It surfaces 8–12
critical requirements across 12 categories (audience, scope,
constraints, success criteria, quality bars, accessibility, failure
modes, visual verification, checks, deliverables, reporting format,
no-hallucination clause), writes a short plan, then writes a complete
executable self-prompt to itself with a binding no-hallucination clause.
That spec is shown to the user before any code. After sign-off, the
agent proceeds. See `references/brief-craft.md` for the full framework
and `examples/northline-beacon-brief.md` for a real example.

## When to use

- ✅ Building or redesigning a React/Next.js/Tailwind interface.
- ✅ Choosing between component libraries, blocks, or animation systems.
- ✅ Auditing an existing UI for accessibility, motion, depth, or 3D.
- ✅ The user request is vague — Brief-Craft first.
- ❌ Vanilla HTML/CSS/JS projects without React — use a different skill.
- ❌ Backend, infra, or pure-data tasks — not in scope.

## License

MIT.
