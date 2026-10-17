import { LitElement, html, css, nothing } from 'lit';
import { baseStyles, wordmarkStyles } from '../styles/shared.js';
import './mcc-theme-menu.js';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#why', label: 'The issue' },
  { href: '#actions', label: 'Take action' },
  { href: '#progress', label: 'Progress' },
  { href: '#goal', label: 'Our goal' },
  { href: '#contact', label: 'Get involved' },
];

export class MccHeader extends LitElement {
  static properties = {
    _current: { state: true },
  };

  static styles = [
    baseStyles,
    wordmarkStyles,
    css`
      :host { position: sticky; top: 0; z-index: 5; }

      .site-header {
        min-height: 78px;
        padding: 0 6.2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        background: var(--paper);
        border-bottom: 1px solid var(--line);
      }

      nav { display: flex; align-items: center; gap: 4px; margin-left: auto; position: relative; }

      nav a {
        padding: 9px 12px;
        border-radius: 999px;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
      }

      nav a:hover { background: var(--line); }
      nav a.is-active { background: var(--lime); color: #17231f; }

      @media (max-width: 960px) {
        nav { min-width: 0; overflow-x: auto; scrollbar-width: none; }
      }

      @media (max-width: 720px) {
        .site-header { min-height: 68px; padding: 0 20px; gap: 12px; }
        nav a { padding: 8px 10px; font-size: 12px; }
      }
    `,
  ];

  constructor() {
    super();
    this._current = 0;
    this._onScroll = () => this._updateActive();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onScroll);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onScroll);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._updateActive();
  }

  _updateActive() {
    const line = window.innerHeight * 0.35;
    let current = 0;
    links.forEach((link, index) => {
      const section = document.querySelector(link.href);
      if (section && section.getBoundingClientRect().top <= line) current = index;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = links.length - 1;
    }
    this._current = current;
  }

  updated(changed) {
    if (!changed.has('_current')) return;
    const nav = this.renderRoot.querySelector('nav');
    if (nav.scrollWidth > nav.clientWidth) {
      const link = nav.children[this._current];
      nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    }
  }

  render() {
    return html`
      <header class="site-header">
        <a class="wordmark" href="#top" aria-label="My Clean City, home">
          <span class="wordmark-icon" aria-hidden="true">MC</span>
          <span>MY CLEAN CITY</span>
        </a>
        <nav aria-label="Main navigation">
          ${links.map(
            (link, index) => html`<a
              href=${link.href}
              class=${index === this._current ? 'is-active' : ''}
              aria-current=${index === this._current ? 'true' : nothing}
            >${link.label}</a>`,
          )}
        </nav>
        <mcc-theme-menu></mcc-theme-menu>
      </header>
    `;
  }
}

customElements.define('mcc-header', MccHeader);
