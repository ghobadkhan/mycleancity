import { html } from 'lit';

export const page = html`<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="My Clean City is a Greater Toronto Area community campaign for cleaner streets and responsible litter disposal.">
    <meta name="theme-color" content="#17231f">
    <title>My Clean City | Clear streets start with us</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="landing/styles.css">
    <script>
      try {
        if (localStorage.getItem('my-clean-city-splash-dismissed') !== 'true' && sessionStorage.getItem('my-clean-city-splash-seen') !== 'true') {
          location.replace('landing/splash/');
        }
      } catch {
        // Skip the splash when browser storage is unavailable.
      }
    </script>
    <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/d6b87c3a4146f8d718abba1d0/41445fcf7571a61783de58575.js");</script>
    <script type="module" src="landing/client.js"></script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <mcc-header></mcc-header>
    <main id="main">
      <mcc-hero id="top"></mcc-hero>
      <mcc-issue id="why"></mcc-issue>
      <mcc-actions id="actions"></mcc-actions>
      <mcc-progress id="progress"></mcc-progress>
      <mcc-goal id="goal"></mcc-goal>
      <mcc-contact id="contact"></mcc-contact>
    </main>
    <mcc-footer></mcc-footer>
  </body>
</html>`;
