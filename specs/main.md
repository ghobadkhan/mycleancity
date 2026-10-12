# My Clean City — Website

This living document describes the website's purpose, current implementation, and content that must be completed before publication.

## Purpose and audience

### Core intent

The website is about litter in cities: a community effort to promote citizen responsibility, challenge littering, and work toward streets with zero waste. The campaign is based in the Greater Toronto Area (GTA), where its work is focused first, with the wider ambition to bring that change to a national scale.

That purpose—not the website features—is the site's essence. The website should make the litter problem visible, explain how the community is addressing it, show what has been accomplished, state the goal of zero-waste streets, and invite people to take part.

### Audience and tone

Speak to residents who share public spaces, with a civic-minded and welcoming tone that emphasizes responsibility and action.

## Page structure and content

The website is currently a single page. Its sections, in order, are:

1. **Home:** GTA campaign introduction and a link to take action.
2. **The issue:** Why litter matters in local streets and public spaces.
3. **How we help:** Practical actions people can take to prevent litter.
4. **Our progress:** Campaign results and community participation.
5. **Our goal:** A vision of streets with zero litter, starting in the GTA.
6. **Get involved:** Volunteer, newsletter, or contact information.

The page also includes a campaign splash dialog, primary navigation, and a footer with the campaign name, location, and a back-to-top link.

### Content accuracy and launch readiness

- Use current, verifiable sources for litter statistics and identify each source and reporting date.
- Report campaign outcomes only when they have been confirmed; label the measure and provide its source and date.
- The issue statistics, progress metrics, and contact/signup destination are currently placeholders. Replace them with verified information before launch; do not publish placeholder text as factual content.
- Keep the stated goal focused on zero litter in streets and shared spaces.

## Current implementation

- The application is built with Angular as a standalone, single-page application. Keep the structure maintainable so additional pages can be introduced if the site grows.
- The header links to page sections and updates the active navigation item as visitors scroll. The navigation adapts to narrow screens.
- A campaign dialog presents a rotating set of litter images and an animated message. Visitors can close it and choose not to see it again.
- Visitors can choose system, light, or dark colour themes. Their theme choice is saved when browser storage is available.
- Respect reduced-motion preferences by suppressing the splash animation and disabling smooth scrolling.
- The page uses semantic landmarks, labelled sections, descriptive image alternatives, a skip link, and visible keyboard focus styles.
- Layouts adapt across desktop and mobile screen widths.

## Technical requirements

- Prioritize responsive behaviour, accessibility, and fast loading.
- Keep dependencies and implementation proportionate to this mostly static campaign site.
- Build assets for the Angular application from the `assets/` directory.
- Use the existing Angular CLI scripts:
  - `npm install` to install dependencies.
  - `npm start` to serve the application locally.
  - `npm run build` to create a production build in `dist/my-clean-city`.
- The production build currently has Angular bundle budgets configured: 500 kB warning and 1 MB error for initial bundles; 4 kB warning and 8 kB error for component styles.

## SEO and metadata

- Provide a descriptive page title and meta description that accurately describe the GTA campaign.
- Set the document language to Canadian English (`en-CA`) and keep metadata relevant to the page content.
- Use a clear heading hierarchy and meaningful section labels.
- Revisit page metadata whenever the campaign name, focus, or content changes. Do not add unsupported claims or unverified statistics for search visibility.
