# My Clean City

A lightweight, single-page campaign website about litter prevention and shared responsibility in the Greater Toronto Area. The site is plain HTML, CSS, and JavaScript; a small Node.js build script assembles its HTML partials into a static page.

## Project structure

```text
.
├── assets/                 # Campaign photography
├── index.html              # Generated page served by the local server
├── package.json            # Build command
├── scripts/
│   └── build.mjs            # Expands HTML partial includes
├── src/
│   ├── index.html           # Page shell, metadata, and partial order
│   └── partials/            # Header, footer, splash, and page sections
├── specs/
│   └── main.md              # Content and design notes
├── styles.css               # Site layout, responsive rules, and themes
└── theme.js                 # Theme, navigation, and campaign-splash behavior
```

## Requirements

- Node.js and npm, to build the page.
- The project-local Python virtual environment with `livereload`, to use the development server.

The build script uses only Node.js built-in modules; there are no npm packages to install.

## Build and run locally

From the project root, build the static page:

```sh
npm run build
```

Then start the local live-reload server on port 8000:

```sh
source .venv/bin/activate
livereload -p 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. To stop the server, press `Ctrl+C`.

Run the build again after changing the source HTML or partials. The server serves the generated root `index.html`; changes to the source partials do not appear in that page until it is rebuilt.

## Editing workflow

1. Edit the page shell in `src/index.html`, or edit the relevant file under `src/partials/`.
2. Partials are included in the order of their include markers in `src/index.html`. Use the existing `<!-- include: partials/name.html -->` form when adding one.
3. Run `npm run build` to regenerate root `index.html`.
4. Refresh the local page to check the result.

Keep shared presentation and behavior in `styles.css` and `theme.js`, respectively. Put campaign images in `assets/` and reference them with paths relative to the site root. Do not edit root `index.html` directly: it is generated and will be overwritten on the next build.

## Publishing

Run `npm run build`, then publish the root `index.html`, `styles.css`, `theme.js`, and `assets/` directory to any static web host. The `src/` files and build script are source materials and are not required by the deployed page.

Before publishing, replace the clearly marked statistics and contact placeholders with verified information and destinations.
