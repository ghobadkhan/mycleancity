import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

export class MccIssue extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .issue { padding-top: 96px; padding-bottom: 90px; }
      .issue-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 9%; align-items: start; }
      h2 { margin-bottom: 0; font-size: clamp(38px, 4.4vw, 58px); }
      h2 span { color: var(--secondary); }
      .issue-copy { max-width: 480px; color: var(--copy); }
      .issue-copy p + p { margin-top: 18px; }

      .fact-strip {
        display: grid;
        grid-template-columns: 1fr 1fr 1.4fr;
        gap: 20px;
        align-items: end;
        margin-top: 55px;
        padding-top: 22px;
        border-top: 1px solid var(--line);
      }

      .fact-item { display: flex; flex-direction: column; gap: 4px; }
      .fact-value { font-family: "Space Grotesk", sans-serif; font-size: 24px; font-weight: 600; }
      .fact-caption, .fact-note { color: var(--muted); font-size: 12px; }
      .fact-note { max-width: 250px; margin: 0 0 2px auto; text-align: right; }

      @media (max-width: 720px) {
        .issue { padding-top: 68px; padding-bottom: 70px; }
        .issue-grid { grid-template-columns: 1fr; gap: 28px; }
        h2 { font-size: 42px; }
        .fact-strip { grid-template-columns: 1fr 1fr; margin-top: 38px; }
        .fact-note { grid-column: 1 / -1; max-width: none; margin: 5px 0 0; text-align: left; }
      }
    `,
  ];

  render() {
    return html`
      <section class="issue section-wrap" aria-labelledby="issue-title">
        <div class="section-label"><span>01</span><span>The issue</span></div>
        <div class="issue-grid">
          <h2 id="issue-title">Litter is a small act.<br><span>So is stopping it.</span></h2>
          <div class="issue-copy">
            <p>One wrapper left behind changes a shared place. Across the Greater Toronto Area, our streets and public spaces deserve better than litter becoming part of the scenery.</p>
            <p>Real local numbers make the problem easier to see. We’ll share verified figures here as they’re gathered.</p>
          </div>
        </div>
        <div class="fact-strip" aria-label="Local litter data placeholders">
          <div class="fact-item">
            <span class="fact-value">[Add figure]</span>
            <span class="fact-caption">Verified local litter statistic</span>
          </div>
          <div class="fact-item">
            <span class="fact-value">[Add source]</span>
            <span class="fact-caption">Source and reporting date</span>
          </div>
          <p class="fact-note">Replace placeholders with sourced, current GTA data before publishing.</p>
        </div>
      </section>
    `;
  }
}

customElements.define('mcc-issue', MccIssue);
