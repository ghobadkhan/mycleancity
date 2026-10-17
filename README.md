# My Clean City

A lightweight campaign website about litter prevention and shared responsibility in the Greater Toronto Area. It is built with [Lit](https://lit.dev) web components and pre-rendered to static HTML with [Lit SSR](https://lit.dev/docs/ssr/overview/) (`@lit-labs/ssr`). The browser hydrates the server-rendered components with `@lit-labs/ssr-client`.

## How it works

1. `npm run build` loads the components in Node, renders the page template with Lit SSR, and writes static HTML to `dist/`. Components render into Declarative Shadow DOM.
2. [Rollup](https://rollupjs.org) bundles `src/client.js` into `dist/client.js` (following the [Lit production guidance](https://lit.dev/docs/tools/production/)). It loads `@lit-labs/ssr-client/lit-element-hydrate-support.js` before any module that imports `lit`.
3. In the browser, the components hydrate and enable the interactive behaviour (theme menu, active navigation link, and campaign splash).

Lit SSR is a Lit Labs package; see [Lit Labs](https://lit.dev/docs/libraries/labs/) for the stability notes. Lit SSR only supports components that use shadow DOM.

## Project structure

```text
.
├── assets/                  # Campaign photography
├── rollup.config.js         # Client bundle configuration
├── scripts/
│   └── build.mjs            # Cleans dist/, bundles the client, renders pages with Lit SSR
├── specs/
│   └── main.md              # Content and design notes
└── src/
    ├── client.js            # Browser entry: hydrate support + component imports
    ├── components/          # Lit components (mcc-*); index.js imports them all
    ├── pages/
    │   └── index.js         # Page template (document shell, metadata, component order)
    └── styles/
        ├── global.css       # Design tokens, themes, body and skip-link (served as styles.css)
        └── shared.js        # Styles shared by components
```

## Requirements

- Node.js and npm.
- Optional, for the local server: the project-local Python virtual environment with `livereload`.

## Build and run locally

```sh
npm install
npm run build
```

Serve the generated `dist/` directory:

```sh
source .venv/bin/activate
livereload -p 8000 dist
```

Open [http://localhost:8000](http://localhost:8000). Press `Ctrl+C` to stop the server. Run `npm run build` again after any change to `src/` or `assets/`.

## Editing workflow

- **Content and layout of a section**: edit its component in `src/components/`.
- **Component order, page metadata**: edit `src/pages/index.js`. Section links in the header (`src/components/mcc-header.js`) point to the `id` on each component element in that file.
- **Colours and theme tokens**: edit `src/styles/global.css`. Custom properties are inherited by every component.
- **Styles used by several components**: edit `src/styles/shared.js`.
- **New component**: create `src/components/mcc-name.js`, register it with `customElements.define`, and add it to `src/components/index.js`.
- **New page**: create a template in `src/pages/` and add it to the `pages` map in `scripts/build.mjs`.

Put campaign images in `assets/` and reference them relative to the site root. `dist/` is generated; do not edit it.

Before publishing, replace the clearly marked statistics and contact placeholders with verified information and destinations.

## Deploying to cPanel

The build output is a static site, so no Node.js application support is needed on the server. Build locally, then upload the contents of `dist/`.

### 1. Build the site

```sh
npm install
npm run build
```

`dist/` should now contain `index.html`, `client.js`, `styles.css`, and `assets/`.

### 2. Create a zip of the output

Compress the **contents** of `dist/` (not the `dist` folder itself) so that `index.html` is at the top level of the archive.

```sh
cd dist && zip -r ../site.zip . && cd ..
```

### 3. Choose the document root

Log in to cPanel and open **Domains**. Click **Manage** next to your domain to see its document root. For the primary domain this is normally `public_html`. If you want the site on a subdomain or addon domain, create it with **Create A New Domain** and note its document root.

### 4. Upload and extract

1. Open **File Manager** and go to the document root.
2. Remove any placeholder files that your host put there (for example a default `index.html`).
3. Click **Upload** and upload `site.zip`.
4. Back in **File Manager**, select `site.zip` and click **Extract**.
5. Delete `site.zip`.

Alternatively, upload the contents of `dist/` to the document root with an FTP client, using the FTP account details from cPanel's **FTP Accounts** page.

### 5. Verify

Open your domain in a browser. Confirm that:

- `index.html`, `client.js`, `styles.css`, and `assets/` sit directly in the document root, not inside a `dist/` subfolder.
- The splash photos load and the page is styled.
- The theme menu works.

### 6. HTTPS

In **Domains**, enable **Force HTTPS Redirect** for the domain once a valid SSL certificate is installed. Check **SSL/TLS Status** to confirm the certificate for the domain is active. Some hosts issue it automatically.

### Deploying over SSH with the script

If your cPanel account has SSH access, [scripts/deploy.py](scripts/deploy.py) does steps 2 and 4 for you. It zips the contents of `dist/`, copies the archive with `scp`, extracts it into the remote directory with `unzip`, and deletes the archive. It needs Python 3 locally, and `scp`, `ssh`, and `unzip` available locally and on the server.

```sh
npm run build
python3 scripts/deploy.py user@example.com public_html
# non-default SSH port:
python3 scripts/deploy.py -p 2222 user@example.com public_html
# deploy a different source folder (default: dist/):
python3 scripts/deploy.py -s path/to/folder user@example.com public_html
```

Existing files with the same names are overwritten. Files that no longer exist in `dist/` are not removed from the server.

### Updating the site

Rebuild, delete the old files in the document root (or overwrite them), and upload again. Because `client.js` is not fingerprinted, do a hard refresh (or clear the browser cache) if you still see the old version.

### Troubleshooting

- **Blank or unstyled page**: `styles.css`/`client.js` were uploaded to the wrong folder. They must sit next to `index.html`.
- **A directory listing or 403 instead of the page**: `index.html` is not in the document root, or the file permissions are not the cPanel default (`0644` for files).
- **Nothing happens on interaction**: open the browser developer tools and check the console and network tabs for a failed `client.js` request.
