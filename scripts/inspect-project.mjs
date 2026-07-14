#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || process.cwd());
const warnings = [];

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    warnings.push(`Invalid JSON in ${path.relative(root, file)}: ${error.message}`);
    return null;
  }
}

function exists(...parts) {
  return fs.existsSync(path.join(root, ...parts));
}

function detectPackageManager() {
  if (exists("pnpm-lock.yaml")) return "pnpm";
  if (exists("yarn.lock")) return "yarn";
  if (exists("bun.lockb") || exists("bun.lock")) return "bun";
  if (exists("package-lock.json")) return "npm";
  return "unknown";
}

function hasDependency(pkg, name) {
  return Boolean(pkg?.dependencies?.[name] || pkg?.devDependencies?.[name]);
}

const pkg = readJson(path.join(root, "package.json"));
const components = readJson(path.join(root, "components.json"));
const summary = {
  root,
  packageManager: detectPackageManager(),
  framework: hasDependency(pkg, "next") ? "next" : hasDependency(pkg, "vite") ? "vite" : "unknown",
  typescript: exists("tsconfig.json"),
  tailwind: exists("tailwind.config.ts") || exists("tailwind.config.js") || exists("postcss.config.js"),
  shadcnConfigured: Boolean(components),
  componentsJson: components ? {
    style: components.style,
    tailwind: components.tailwind?.config || null,
    aliases: components.aliases || {},
    registries: components.registries ? Object.keys(components.registries) : [],
  } : null,
  uiDirs: [
    exists("components", "ui") ? "components/ui" : null,
    exists("src", "components", "ui") ? "src/components/ui" : null,
  ].filter(Boolean),
  warnings,
};

console.log(JSON.stringify(summary, null, 2));