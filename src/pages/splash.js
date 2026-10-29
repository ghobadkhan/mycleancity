import { html } from 'lit';

// <base> lets this nested page reuse the site-root relative asset paths.
export const page = html`<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <base href="../">
    <title>My Clean City | This is your city right now</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="client.js"></script>
  </head>
  <body>
    <mcc-splash></mcc-splash>
  </body>
</html>`;
