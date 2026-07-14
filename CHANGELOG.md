# Changelog

## 2026-07-14 — Brief-Craft pre-flight added

### Added
- `SKILL.md` — new "Pre-flight: Brief-Craft" section before the Workflow.
  Triggers when a user request is too basic or under-specified. Forces
  the agent to surface 8–12 requirements, plan, write a self-prompt with
  a no-hallucination clause, and produce a spec for the user to review
  before any code is written.
- `references/brief-craft.md` — full framework: 12 requirement
  categories, the four phases, anti-patterns, and the link to the
  worked example.
- `examples/northline-beacon-brief.md` — worked example of
  Brief-Craft applied to a 3D product page, including the real
  bugs the planning step pre-empted.
- `Output Expectations` extended: when Brief-Craft is used, the
  final report must include the requirements that drove the build,
  the no-hallucination checks performed, and remaining limitations.
- `README.md` — install instructions, file map, and Brief-Craft in
  one paragraph.

### Changed
- `SKILL.md` — Reference Routing now lists `brief-craft.md` and
  `examples/northline-beacon-brief.md` as routable references.

### Motivation
The original skill was great at composing a UI once a clear request
arrived, but it assumed the request was already specific. Most real
requests are not. Brief-Craft makes the agent force clarity before
committing, which is much cheaper than discovering the gap mid-build.
