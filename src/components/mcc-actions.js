import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

const actions = [
  { title: 'Hold on to it', text: 'Keep wrappers, cups, and other waste with you until you reach a bin.' },
  { title: 'Leave shared spaces clear', text: 'Take your things with you from sidewalks, parks, and transit stops.' },
  { title: 'Bring people in', text: 'Invite a neighbour or friend to care for the block you share.' },
];

export class MccActions extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .action-band { background: var(--band-bg); color: var(--band-text); }
      .action-inner { padding-top: 82px; padding-bottom: 92px; }
      .section-label { color: #c0c9c0; }
      .section-label span:first-child { color: var(--lime); }
      .action-heading { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 40px; }
      h2 { margin: 0; font-size: clamp(48px, 5.4vw, 72px); }
      .action-heading p { max-width: 310px; margin: 0 0 7px; color: #c7d0c8; }

      .action-list { border-top: 1px solid rgba(255, 255, 255, 0.25); }
      .action-item {
        display: grid;
        grid-template-columns: 70px 1fr 30px;
        gap: 20px;
        align-items: center;
        min-height: 117px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      }

      .action-number { align-self: start; padding-top: 31px; color: var(--lime); font-size: 12px; font-weight: 700; }
      h3 { margin: 0 0 7px; font-size: 21px; }
      .action-item p { margin: 0; color: #c7d0c8; font-size: 14px; }
      .action-arrow { color: var(--lime); font-size: 21px; }

      @media (max-width: 720px) {
        .action-inner { padding-top: 66px; padding-bottom: 70px; }
        .action-heading { display: block; margin-bottom: 30px; }
        h2 { margin-bottom: 18px; font-size: 53px; }
        .action-heading p { max-width: 340px; }
        .action-item { grid-template-columns: 37px 1fr 22px; gap: 12px; min-height: 125px; }
        h3 { font-size: 18px; }
        .action-item p { max-width: 380px; font-size: 13px; }
      }
    `,
  ];

  render() {
    return html`
      <section class="action-band" aria-labelledby="actions-title">
        <div class="section-wrap action-inner">
          <div class="section-label"><span>How we help</span></div>
          <div class="action-heading">
            <h2 id="actions-title">Keep it off<br>the street.</h2>
            <p>Cleaner blocks are built from ordinary choices, made by all of us.</p>
          </div>
          <div class="action-list">
            ${actions.map(
              (action, index) => html`
                <article class="action-item">
                  <span class="action-number">${String(index + 1).padStart(2, '0')}</span>
                  <div><h3>${action.title}</h3><p>${action.text}</p></div>
                  <span class="action-arrow" aria-hidden="true">↗</span>
                </article>
              `,
            )}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('mcc-actions', MccActions);
