import { LitElement, html, css } from 'lit';
import { baseStyles, wordmarkStyles } from '../styles/shared.js';

export class MccFooter extends LitElement {
  static styles = [
    baseStyles,
    wordmarkStyles,
    css`
      .site-footer {
        display: flex;
        min-height: 80px;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 16px 6.2%;
        border-top: 1px solid var(--line);
      }

      .site-footer > span { color: var(--muted); font-size: 12px; }
      .site-footer > a:last-child { font-size: 12px; font-weight: 600; text-decoration: none; }
      .site-footer > a:last-child:hover { text-decoration: underline; text-underline-offset: 4px; }
      .wordmark-icon { width: 29px; }

      @media (max-width: 720px) {
        .site-footer { flex-wrap: wrap; padding: 17px 20px; }
        .site-footer > span { order: 1; width: 100%; }
      }
    `,
  ];

  render() {
    return html`
      <footer class="site-footer">
        <a class="wordmark" href="#top">
          <span class="wordmark-icon" aria-hidden="true">MC</span>
          <span>MY CLEAN CITY</span>
        </a>
        <span>Greater Toronto Area</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    `;
  }
}

customElements.define('mcc-footer', MccFooter);
