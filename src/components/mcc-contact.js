import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

export class MccContact extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .contact { padding-top: 94px; padding-bottom: 98px; }
      .contact-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 10%; align-items: end; }
      h2 { margin-bottom: 0; font-size: clamp(38px, 4.4vw, 58px); }
      .contact-grid > div:first-child > p { max-width: 370px; margin: 20px 0 0; color: #414c45; }
      .contact-placeholder { padding: 22px 0 5px; border-top: 1px solid var(--line); }
      .contact-status { color: var(--accent-ink); font-size: 11px; font-weight: 700; text-transform: uppercase; }
      .contact-placeholder p { margin: 14px 0 5px; font-family: "Space Grotesk", sans-serif; font-size: 20px; font-weight: 600; }
      .contact-hint { color: var(--muted); font-size: 12px; }

      @media (max-width: 720px) {
        .contact { padding-top: 68px; padding-bottom: 70px; }
        .contact-grid { grid-template-columns: 1fr; gap: 34px; }
        h2 { font-size: 42px; }
      }
    `,
  ];

  render() {
    return html`
      <section class="contact section-wrap" aria-labelledby="contact-title">
        <div class="section-label"><span>04</span><span>Get involved</span></div>
        <div class="contact-grid">
          <div>
            <h2 id="contact-title">Make room<br>for a cleaner city.</h2>
            <p>Want to help? Add your confirmed volunteer, newsletter, or contact destination here.</p>
          </div>
          <div class="contact-placeholder">
            <span class="contact-status">Organization details needed</span>
            <p>[Add a verified contact or signup link]</p>
            <span class="contact-hint">Replace this placeholder before publishing.</span>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('mcc-contact', MccContact);
