import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import rollupConfig from '../rollup.config.js';
import '../src/components/index.js';
import { page as indexPage } from '../src/pages/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

// Output file name -> Lit template. Add an entry to add a page.
const pages = { 'index.html': indexPage };

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const bundle = await rollup(rollupConfig);
await bundle.write(rollupConfig.output);
await bundle.close();

for (const [fileName, template] of Object.entries(pages)) {
  const html = await collectResult(render(template));
  await writeFile(resolve(dist, fileName), html);
}

await cp(resolve(root, 'src/styles/global.css'), resolve(dist, 'styles.css'));
await cp(resolve(root, 'assets'), resolve(dist, 'assets'), { recursive: true });

console.log(`Built ${dist}`);
