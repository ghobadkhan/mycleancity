# My Clean City - Website

**This is a living document about the website design**


## content and focus

The content's focus is solely about littering in the cities. 
Basically we are a group who's promoting citizen responsibility about littering and fighting litter bugs. Our ultimate goal is cities with zero waste in streets.
We are based in Greater Toronto Area and naturally our focus is primary GTA. But ultimately we want to change things in national scale.

### sections
1. Primary concern (including some numbers and stats about the problem)
2. How we are addressing concern
3. some numbers of what we've done
4. statement about our ultimate goal
5. call to action/subscription/contact us

## technical details

- The website is single page for now. But the framework that's used should have enough flexibility to extent to multiple pages.

- Fast loading time and responsive design should be paramount.
- The site is built with Lit web components, server-rendered to static HTML with Lit SSR (`@lit-labs/ssr`) and hydrated in the browser with `@lit-labs/ssr-client`. Components and the page template in `src/` are the source of truth. `dist/` is generated; run `npm run build` after source changes and before serving or publishing.

## SEO

Try to suggest/implement elements that make the website as SEO friendly as possible.

## Serving

Run `npm run build`, then use `livereload -p 8000 dist` from the local virtual environment to serve the generated webpage. Deployment to cPanel is described in `README.md`.