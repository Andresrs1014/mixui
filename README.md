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

The skill format is the same regardless of agent: a directory with
`SKILL.md` (and optional `references/`, `examples/`, `scripts/`,
`agents/`) at the root. The agent reads `SKILL.md` on demand.

## Supported agents

| Agent | Install path | Format |
| --- | --- | --- |
| **Mavis / MiniMax** | `~/.mavis/skills/<name>/` | `SKILL.md` with frontmatter |
| **Claude Code** | `~/.claude/skills/<name>/` | `SKILL.md` with frontmatter |
| **Codex CLI** | `~/.codex/skills/<name>/` | `SKILL.md` with frontmatter |
| **OpenCode** | `~/.config/opencode/skills/<name>/` | `SKILL.md` with frontmatter |
| **Cursor** | `~/.cursor/skills/<name>/` (global) or `.cursor/skills/<name>/` (per-project) | `SKILL.md` + `agents/openai.yaml` |
| **Gemini CLI** | `~/.gemini/extensions/<name>/` | see [Gemini CLI extensions docs](https://github.com/google-gemini/gemini-cli) — note this is an "extension", not a "skill" verbatim; the SKILL.md body still works as the system prompt. |
| **Aider** | not a skill system; point Aider's `--read` flag at `SKILL.md` per session |

If your agent is not listed, the format is the same: a directory whose
root is `SKILL.md` with a YAML frontmatter (`name`, `description`). Most
modern coding agents recognize that pattern. If your agent uses a
different convention, copy `SKILL.md` into the location your agent
expects.

## Install

Pick your agent. Each command installs the skill so the next session of
that agent sees `mixui` in its available skills.

### Mavis / MiniMax

```bash
git clone https://github.com/Andresrs1014/mixui.git ~/.mavis/skills/mixui
```

(If `~/.mavis` is a reparse point to `~/.minimax`, the same directory is
also at `~/.minimax/skills/mixui/`.)

### Claude Code

```bash
git clone https://github.com/Andresrs1014/mixui.git ~/.claude/skills/mixui
```

### Codex CLI

```bash
git clone https://github.com/Andresrs1014/mixui.git ~/.codex/skills/mixui
```

### OpenCode

```bash
git clone https://github.com/Andresrs1014/mixui.git ~/.config/opencode/skills/mixui
```

### Cursor (global)

```bash
git clone https://github.com/Andresrs1014/mixui.git ~/.cursor/skills/mixui
```

Cursor additionally reads `agents/openai.yaml` from this repo, which sets
the display name and default prompt for the skill in the Cursor UI.

### Aider (per session)

```bash
aider --read https://raw.githubusercontent.com/Andresrs1014/mixui/main/SKILL.md
```

Aider has no persistent skill system; pass the SKILL.md as context per
session.

## Update

```bash
cd <install-path>/mixui && git pull
```

The next session of your agent picks up the new version — no restart
required for any of the agents above.

## What is in the box

```
SKILL.md                                # entry point, read by all agents
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
