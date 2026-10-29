import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

export class MccHero extends LitElement {
  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .hero {
        position: relative;
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 76px 10%;
        background-color: #26332e;
        background-image: url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2200&q=85");
        background-position: center 53%;
        background-size: cover;
        color: var(--white);
      }

      .hero::before {
        position: absolute;
        inset: 0;
        background: rgba(13, 24, 20, 0.61);
        content: "";
      }

      .hero-content { position: relative; z-index: 1; max-width: 720px; }
      .eyebrow { display: flex; align-items: center; gap: 10px; color: var(--lime); }
      .eyebrow-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); }
      h1 { margin: 0 0 24px; font-size: clamp(52px, 6.3vw, 86px); }
      .hero-copy { max-width: 520px; margin-bottom: 30px; color: rgba(255, 254, 249, 0.88); font-size: 17px; }

      .button {
        display: inline-flex;
        min-height: 52px;
        align-items: center;
        gap: 28px;
        padding: 0 20px;
        background: var(--lime);
        color: #17231f;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
      }

      .button:hover { background: #e4ff78; }
      .button span { font-size: 18px; }
      .hero-note { position: absolute; right: 6.2%; bottom: 22px; z-index: 1; margin: 0; font-size: 11px; }

      @media (max-width: 720px) {
        .hero { padding: 68px 24px 80px; background-position: 58% center; }
        h1 { font-size: clamp(49px, 12vw, 68px); }
        .hero-copy { font-size: 15px; }
        .hero-note { right: 24px; bottom: 18px; }
      }

      @media (max-width: 390px) {
        h1 { font-size: 47px; }
      }
    `,
  ];

  render() {
    return html`
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-content">
          <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"></span> Greater Toronto Area</p>
          <h1 id="hero-title">GTA Is Seriously Littered</h1>
          <p class="hero-copy">Litter doesn't belong on our sidewalks, in our parks, or in the places we share. Every small choice keeps it moving toward a bin, not the street.</p>
          <a class="button" href="#actions">Make a difference <span aria-hidden="true">↓</span></a>
        </div>
        <p class="hero-note">Our streets. Our shared responsibility.</p>
      </section>
    `;
  }
}

customElements.define('mcc-hero', MccHero);
