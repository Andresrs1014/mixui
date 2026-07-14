# Install Recipes

Always inspect the target project before installing. Prefer its package manager and conventions.

## Project Inspection

Check:
- `package.json`
- `components.json`
- Tailwind config or CSS entry
- `src/components/ui` or `components/ui`
- import aliases such as `@/`
- existing component libraries

Optional helper:

```bash
node <skill>/scripts/inspect-project.mjs <project-root>
```

## shadcn/ui

Initialize only if the project is not already configured:

```bash
npm dlx shadcn@latest init
```

Add components:

```bash
npm dlx shadcn@latest add button card dialog form input select tabs
```

Use the project's package manager when it is clear: `pnpm dlx`, `yarn dlx`, `bunx`, or `npm dlx`.

## Magic UI

Magic UI follows the shadcn-compatible installation model.

Example:

```bash
npm dlx shadcn@latest add @magicui/globe
```

Use Magic UI for enhancement components after the base UI is working.

## Optional shadcn MCP

MCP is optional. Use it only when configured or when the user asks to set it up.

Codex config:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

With MCP available, prefer natural-language search/install through configured registries. Without MCP, use official docs and CLI commands.

## Aceternity UI

Use official component pages or supported CLI/registry prompts when available. Confirm dependencies before adding code, especially motion libraries and icon packages.

Install only the pieces needed for the requested interface.

## shadcnblocks

Treat blocks as page-section accelerators. Verify license and installation path before use. Convert copied blocks to local tokens and existing components.

## coss/ui

Use coss/ui when the project intentionally adopts its primitive model. Do not add it for a single component if shadcn/ui already covers the need.
