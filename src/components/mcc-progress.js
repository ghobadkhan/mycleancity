import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

export class MccProgress extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .progress { padding-top: 94px; padding-bottom: 100px; }
      .progress-content { display: grid; grid-template-columns: 1fr 0.8fr; gap: 10%; }
      h2 { margin-bottom: 0; font-size: clamp(38px, 4.4vw, 58px); }
      h2 span { color: var(--secondary); }
      .progress-details > p:first-child { max-width: 450px; color: var(--copy); }
      .progress-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; padding-top: 22px; border-top: 1px solid var(--line); }
      .progress-metrics div { display: flex; flex-direction: column; gap: 7px; }
      .progress-metrics strong { font-family: "Space Grotesk", sans-serif; font-size: 23px; }
      .progress-metrics span { max-width: 150px; color: var(--muted); font-size: 12px; }
      .small-note { margin: 18px 0 0; color: var(--muted); font-size: 12px; }

      @media (max-width: 720px) {
        .progress { padding-top: 68px; padding-bottom: 70px; }
        .progress-content { grid-template-columns: 1fr; gap: 28px; }
        h2 { font-size: 42px; }
      }
    `,
  ];

  render() {
    return html`
      <section class="progress section-wrap" aria-labelledby="progress-title">
        <div class="section-label"><span>03</span><span>Our progress</span></div>
        <div class="progress-content">
          <h2 id="progress-title">Show the work.<br><span>Count what changes.</span></h2>
          <div class="progress-details">
            <p>Community effort should be measured honestly. Add confirmed campaign results here when they’re ready to share.</p>
            <div class="progress-metrics">
              <div><strong>[Add total]</strong><span>Verified cleanups or actions</span></div>
              <div><strong>[Add total]</strong><span>Verified community participants</span></div>
            </div>
            <p class="small-note">Only publish figures with a clear source and date.</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('mcc-progress', MccProgress);
