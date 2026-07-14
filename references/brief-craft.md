# Brief-Craft

When a user request is basic, vague, or under-specified, do not guess. Run
Brief-Craft before any code is written. This is the cheapest place to fix a
misunderstanding and the most expensive place to invent one.

## What "too basic" means

A request is too basic if any of these hold:

- It is fewer than three sentences.
- It does not name a specific product, audience, or context.
- It does not list hard constraints (stack, dependencies, file shape).
- It does not define success criteria (what "done" looks like).
- A template-shaped answer would fit — swapping in a different domain would produce essentially the same output.

Examples:

| Request | Verdict |
| --- | --- |
| "Build me a landing page" | Too basic |
| "Make a product page" | Too basic |
| "Add a 3D model to my app" | Too basic |
| "Build a product page for a portable weather station called Northline Beacon, with a 3D exploded view of 7 parts, an accessible drawer for part inspection, a single-accent storm alert, and a CSS/SVG fallback for environments without WebGL" | Not basic — has stack, scope, behavior, and a fallback contract |

## The four phases

### Phase 1 — Surface 8–12 critical requirements

Use the following category framework. Pick the categories that apply; aim
for 8–12 total items. If a category is not relevant to the task, omit it
rather than padding.

1. **Audience** — who uses this and where (web/mobile, role, environment).
2. **Scope** — what is in, what is explicitly out.
3. **Hard constraints** — stack, libraries, file shape, browser support, network access, offline behavior.
4. **Success criteria** — what must be true for the build to be accepted.
5. **Quality bars** — visual fidelity, motion restraint, accessibility floor, performance budget.
6. **Accessibility** — focus management, keyboard, reduced motion, color contrast, screen reader behavior.
7. **Failure modes** — what must keep working when something breaks (no WebGL, no JS, slow network).
8. **Visual verification** — at which viewports, on which devices, with which interactions must the build be checked visually before declaring done.
9. **Checks** — typecheck, lint, build, accessibility audit, manual tests that must pass.
10. **Deliverables** — what files, what runs, what URL, what artifacts.
11. **Reporting format** — what the final message must include (libraries, techniques, tests, limitations, URL).
12. **Non-hallucination clause** — every library, prop, and file path referenced must be real; if uncertain, search the web, read the docs, or say "I do not know".

The category list is a checklist of *kinds* of questions, not a script. The
goal is to surface what the user did not think to say.

### Phase 2 — Plan the work

A short, scannable plan. No code yet. Sections:

- **Components / primitives** to build or reuse.
- **Libraries and why** for each.
- **Files to create** (a tree, not a long prose list).
- **Checks to run** (typecheck, lint, build, browser verification).
- **What to verify visually** (which viewports, which interactions).
- **Known risks** (e.g. "R3F has been observed to require an explicit `lookAt` on the camera" — write down what you suspect will go wrong so you catch it faster).

A plan that fits on one screen is the goal. If it does not, the scope is
too big for one shot — split it.

### Phase 3 — Agent writes its own prompt

This is the most important phase. Before any code, write a single, complete,
executable prompt to yourself. It should:

- Be addressed to "you" (the agent that will execute the work in the next
  turn, including the same agent later in this session).
- State the goal in one sentence.
- Enumerate the 8–12 requirements, each binding.
- Describe the plan as a sequence of concrete steps.
- Specify the no-hallucination clause explicitly. Example:
  > "You must not invent libraries, props, file paths, or behaviors. Every
  > reference must be verifiable against the installed `package.json`, the
  > project's file tree, or the official documentation. If you are
  > uncertain, search the web, read the docs, or write `TODO: verify`
  > instead of guessing."
- Specify the final deliverable and the reporting format.
- Be copy-pasteable. The agent in the next turn should be able to read this
  prompt and execute it without re-deriving intent.

Writing the self-prompt forces you to commit. If you cannot write it, you
do not yet understand the task.

### Phase 4 — Spec deliverable for the user

Present the spec to the user before writing code. The spec contains:

1. The 8–12 critical requirements (numbered, with category).
2. The plan (compact).
3. The self-prompt (full text).
4. An explicit invitation to correct, accept, or reject.

The user can:

- **Accept** — agent proceeds.
- **Correct** — agent edits the spec, then re-presents.
- **Reject** — agent asks what is missing.

The cost of a correction at this stage is minutes. The cost of a correction
after the build is hours.

## When to skip Brief-Craft

Skip when the request is already specific (has explicit stack, scope,
success criteria, deliverables, and reporting format). Skipping is also
fine when the user explicitly says "just do it" or "no spec, build it".

## Anti-patterns

- **"I'll figure it out as I go"** — the most expensive form of guessing.
  Each missing requirement becomes a rebuild.
- **"10 requirements feels like a lot"** — that feeling is the signal the
  task was under-specified. The requirements exist whether you write them
  down or not.
- **"The user will tell me if I'm wrong"** — true, but the cost of being
  wrong is a full rewrite, not a sentence.
- **"I'll invent the stack to fit the design"** — never. The user owns the
  stack. If they did not specify it, ask, or pick the most boring
  reasonable default and call it out.
- **"Self-prompt is overhead"** — the self-prompt is the cheapest unit of
  commitment the agent has. It is the smallest possible contract. If the
  agent cannot write it, the task is not yet a task.

## Worked example

See `examples/northline-beacon-brief.md` for the full Brief-Craft applied
to a 3D product page. Notice:

- The user prompt looked specific, but the agent still surfaced 12
  requirements by interrogating the categories.
- The plan called out the "camera might need explicit lookAt" risk before
  the build started. The bug appeared during QA and was fixed in minutes
  instead of hours.
- The self-prompt included the no-hallucination clause about R3F props
  and library names.
- The spec was shown to the user and accepted. No mid-build corrections
  were needed.
