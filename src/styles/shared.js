import { css } from 'lit';

export const baseStyles = css`
  :host { display: block; }

  * {
    box-sizing: border-box;
    transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease;
  }

  a { color: inherit; }
  h1, h2, h3, p { margin-top: 0; }

  h1, h2, h3 {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    line-height: 1.04;
  }

  :focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export const layoutStyles = css`
  .section-wrap { padding-right: 10%; padding-left: 10%; }

  .section-label {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 36px;
    color: var(--muted);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .section-label span:first-child { color: var(--accent-ink); }

  .eyebrow {
    margin: 0 0 22px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  @media (max-width: 720px) {
    .section-wrap { padding-right: 24px; padding-left: 24px; }
    .section-label { margin-bottom: 27px; }
  }
`;

export const wordmarkStyles = css`
  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0;
  }

  .wordmark-icon {
    display: grid;
    width: 34px;
    aspect-ratio: 1;
    place-items: center;
    border-radius: 50%;
    background: var(--orange);
    color: #17231f;
    font-family: "Space Grotesk", sans-serif;
    font-size: 12px;
  }

  @media (max-width: 960px) {
    .wordmark span:last-child { display: none; }
  }
`;
