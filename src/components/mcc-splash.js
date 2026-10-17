import { LitElement, html, css, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../styles/shared.js';

const seenKey = 'my-clean-city-splash-dismissed';
const typedText = 'right now!';

const slides = [
  { src: 'assets/splash1.webp', alt: 'A littered sidewalk around a public waste bin.', priority: true },
  { src: 'assets/splash2.jpg', alt: 'Bags, packaging, and cups scattered in grass beside a roadside fence.' },
  { src: 'assets/splash3.jpg', alt: 'Discarded packaging and cups scattered beneath trees around a shopping cart.' },
];

export class MccSplash extends LitElement {
  static properties = {
    _slide: { state: true },
    _transformed: { state: true },
  };

  static styles = [
    baseStyles,
    css`
      dialog {
        position: fixed;
        width: 100vw;
        max-width: none;
        height: 100vh;
        max-height: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
        background: #17231f;
        color: #fffef9;
      }

      dialog::backdrop { background: rgba(8, 13, 10, 0.88); }
      .splash-photo { position: absolute; inset: 0; margin: 0; }
      .splash-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 55%; opacity: 0; transition: opacity 2s ease; }
      .splash-photo img.is-active { opacity: 1; }
      .splash-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9, 17, 13, 0.88), rgba(9, 17, 13, 0.48) 55%, rgba(9, 17, 13, 0.16)), linear-gradient(0deg, rgba(9, 17, 13, 0.65), transparent 35%); }
      .splash-close { position: absolute; z-index: 2; top: 26px; right: 6.2%; display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid rgba(255, 254, 249, 0.65); border-radius: 50%; background: transparent; color: #fffef9; font: inherit; font-size: 28px; line-height: 1; cursor: pointer; }
      .splash-content { position: relative; z-index: 1; display: flex; width: min(720px, 78vw); height: 100%; flex-direction: column; align-items: flex-start; justify-content: center; padding: 76px 0 68px 10%; }

      h2 {
        display: grid;
        grid-template-rows: repeat(3, 1.04em);
        margin: 0 0 20px;
        font-size: clamp(56px, 7.4vw, 96px);
        line-height: 1.04;
      }

      .splash-headline-line { grid-column: 1; white-space: nowrap; }
      .splash-future-line { grid-row: 2; transition: opacity 5.5s ease, transform 5.5s ease; }
      .splash-future-line > span { color: var(--lime); font-style: normal; }
      .splash-city-line { z-index: 1; grid-row: 3; transition: transform 5.5s cubic-bezier(0.2, 0.7, 0.2, 1); }
      .splash-of, .splash-exclamation { transition: opacity 5.5s ease; }
      .splash-now-line { grid-row: 3; }
      .splash-now-character { display: inline-block; opacity: 0; transition: opacity 180ms ease; }
      h2.is-transformed .splash-future-line { opacity: 0; transform: translateY(-0.14em); }
      h2.is-transformed .splash-city-line { transform: translateY(-1.04em); }
      h2.is-transformed .splash-of, h2.is-transformed .splash-exclamation { opacity: 0; }
      h2.is-transformed .splash-now-character { opacity: 1; }
      .splash-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 20px 26px; margin-top: 16px; }
      .splash-optout { display: flex; align-items: center; gap: 9px; color: #fffef9; font-size: 13px; cursor: pointer; }
      .splash-optout input { width: 18px; height: 18px; accent-color: var(--lime); }

      @media (max-width: 720px) {
        dialog { height: 100dvh; }
        .splash-photo img { object-position: 57% center; }
        .splash-shade { background: linear-gradient(0deg, rgba(9, 17, 13, 0.9), rgba(9, 17, 13, 0.58) 54%, rgba(9, 17, 13, 0.22)); }
        .splash-close { top: 16px; right: 20px; }
        .splash-content { width: 100%; justify-content: center; padding: 70px 24px 105px; }
        h2 { font-size: clamp(52px, 13vw, 72px); }
        .splash-actions { align-items: flex-start; flex-direction: column; gap: 16px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .splash-now-character { transition-delay: 0ms !important; }
      }
    `,
  ];

  constructor() {
    super();
    this._slide = 0;
    this._transformed = false;
  }

  disconnectedCallback() {
    this._stopTimers();
    super.disconnectedCallback();
  }

  firstUpdated() {
    let seen = false;
    try {
      seen = localStorage.getItem(seenKey) === 'true';
    } catch {
      // Show the splash when browser storage is unavailable.
    }
    if (seen) return;

    const dialog = this.renderRoot.querySelector('dialog');
    dialog.showModal();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._transformed = true;
      return;
    }
    this._headlineTimer = window.setTimeout(() => {
      this._transformed = true;
    }, 2000);
    this._slideTimer = window.setInterval(() => {
      this._slide = (this._slide + 1) % slides.length;
    }, 3000);
  }

  _stopTimers() {
    window.clearTimeout(this._headlineTimer);
    window.clearInterval(this._slideTimer);
  }

  _close() {
    this.renderRoot.querySelector('dialog').close();
  }

  _onClose() {
    this._stopTimers();
    if (!this.renderRoot.querySelector('#splash-optout').checked) return;
    try {
      localStorage.setItem(seenKey, 'true');
    } catch {
      // The splash can still be dismissed for this page view.
    }
  }

  render() {
    return html`
      <dialog aria-labelledby="splash-title" @close=${this._onClose}>
        <figure class="splash-photo">
          ${slides.map(
            (slide, index) => html`<img
              class=${classMap({ 'is-active': index === this._slide })}
              src=${slide.src}
              alt=${slide.alt}
              aria-hidden=${index === this._slide ? nothing : 'true'}
              fetchpriority=${slide.priority ? 'high' : nothing}
            >`,
          )}
        </figure>
        <div class="splash-shade" aria-hidden="true"></div>
        <button class="splash-close" type="button" aria-label="Close campaign message" @click=${this._close}>×</button>
        <div class="splash-content">
          <h2 id="splash-title" class=${classMap({ 'is-transformed': this._transformed })} aria-label="This is your city right now!">
            <span class="splash-headline-line">This is</span>
            <span class="splash-headline-line splash-future-line"><span>the future</span></span>
            <span class="splash-headline-line splash-city-line"><span class="splash-of">of </span>your city<span class="splash-exclamation">!</span></span>
            <span class="splash-headline-line splash-now-line" aria-hidden="true">${[...typedText].map(
              (character, index) => html`<span class="splash-now-character" style="transition-delay: ${index * 480}ms">${character === ' ' ? '\u00a0' : character}</span>`,
            )}</span>
          </h2>
          <div class="splash-actions">
            <label class="splash-optout"><input id="splash-optout" type="checkbox"> Don't show this again</label>
          </div>
        </div>
      </dialog>
    `;
  }
}

customElements.define('mcc-splash', MccSplash);
