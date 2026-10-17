import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

export class MccGoal extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .goal-band { position: relative; overflow: hidden; background: var(--lime); color: #17231f; }
      .goal-inner { padding-top: 81px; padding-bottom: 87px; }
      .eyebrow { margin-bottom: 15px; }
      h2 { position: relative; z-index: 1; margin: 0 0 22px; font-size: clamp(58px, 7vw, 96px); }
      h2 span { color: #5b681d; }
      .goal-inner > p:last-child { position: relative; z-index: 1; max-width: 450px; margin: 0; color: #36401e; }
      .goal-stamp { position: absolute; right: 11%; bottom: -26px; color: rgba(23, 35, 31, 0.08); font-family: "Space Grotesk", sans-serif; font-size: 100px; font-weight: 700; line-height: 0.82; transform: rotate(-8deg); }

      @media (max-width: 720px) {
        .goal-inner { padding-top: 68px; padding-bottom: 72px; }
        h2 { font-size: 61px; }
        .goal-stamp { right: -10px; bottom: -12px; font-size: 65px; }
      }

      @media (max-width: 390px) {
        h2 { font-size: 54px; }
      }
    `,
  ];

  render() {
    return html`
      <section class="goal-band" aria-labelledby="goal-title">
        <div class="section-wrap goal-inner">
          <p class="eyebrow">The goal</p>
          <h2 id="goal-title">Streets with<br><span>zero litter.</span></h2>
          <p>It begins on our block, in our neighbourhoods, and across the GTA. A city we’re proud to share is a city we all help care for.</p>
        </div>
        <span class="goal-stamp" aria-hidden="true">ZERO<br>LITTER<br>STARTS HERE</span>
      </section>
    `;
  }
}

customElements.define('mcc-goal', MccGoal);
