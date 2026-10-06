import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = resolve(projectRoot, "src");
const templatePath = resolve(sourceDirectory, "index.html");
const outputPath = resolve(projectRoot, "index.html");
const includePattern = /^([ \t]*)<!-- include: (partials\/[a-z0-9-]+\.html) -->$/gm;

let html = await readFile(templatePath, "utf8");
const includes = [...html.matchAll(includePattern)];

for (const [directive, , partialPath] of includes) {
  const content = await readFile(resolve(sourceDirectory, partialPath), "utf8");
  html = html.replace(directive, content.trimEnd());
}

if (includePattern.test(html)) {
  throw new Error(`Unresolved HTML partial include in ${templatePath}`);
}

await writeFile(outputPath, html);
console.log(`Built ${outputPath}`);
