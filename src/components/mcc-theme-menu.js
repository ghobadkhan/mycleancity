import { LitElement, html, css, svg } from 'lit';
import { baseStyles } from '../styles/shared.js';

const storageKey = 'my-clean-city-theme';
const themes = ['system', 'light', 'dark'];

const icons = {
  system: svg`<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>`,
  light: svg`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,
  dark: svg`<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>`,
};

const labels = { system: 'System', light: 'Light', dark: 'Dark' };

const icon = (name) => html`<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;

export class MccThemeMenu extends LitElement {
  static properties = {
    _preference: { state: true },
  };

  static styles = [
    baseStyles,
    css`
      :host { position: relative; }

      button {
        display: grid;
        width: 38px;
        height: 38px;
        place-items: center;
        padding: 0;
        border: 1px solid var(--line);
        border-radius: 50%;
        background: var(--paper);
        color: var(--ink);
        cursor: pointer;
      }

      button:hover { background: var(--line); }

      .theme-icon { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

      .theme-options {
        position: absolute;
        top: 100%;
        right: 0;
        display: none;
        flex-direction: column;
        gap: 6px;
        padding-top: 8px;
      }

      .theme-menu:hover .theme-options, .theme-menu:focus-within .theme-options { display: flex; }
      .theme-options button[aria-pressed="true"] { background: var(--lime); border-color: var(--lime); color: #17231f; }
    `,
  ];

  constructor() {
    super();
    this._preference = 'system';
  }

  firstUpdated() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (themes.includes(saved)) this._preference = saved;
    } catch {
      // Keep the system preference when browser storage is unavailable.
    }
  }

  updated(changed) {
    if (!changed.has('_preference')) return;
    const root = document.documentElement;
    if (this._preference === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = this._preference;
  }

  _select(theme) {
    this._preference = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The selected theme still applies for this page view.
    }
  }

  render() {
    return html`
      <div class="theme-menu" role="group" aria-label="Colour theme">
        <button type="button" aria-haspopup="true" aria-label="Colour theme">${icon(this._preference)}</button>
        <div class="theme-options">
          ${themes.map(
            (theme) => html`
              <button
                type="button"
                aria-label="${labels[theme]} theme"
                title="${labels[theme]}"
                aria-pressed=${String(this._preference === theme)}
                @click=${() => this._select(theme)}
              >${icon(theme)}</button>
            `,
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('mcc-theme-menu', MccThemeMenu);
