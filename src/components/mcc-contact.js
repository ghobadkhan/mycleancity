import { LitElement, html, css } from 'lit';
import { baseStyles, layoutStyles } from '../styles/shared.js';

const mailchimp = {
  host: 'https://mycleancity.us8.list-manage.com',
  u: 'd6b87c3a4146f8d718abba1d0',
  id: '9de6c15ea6',
  fId: '00d867e1f0',
};
const subscribeParams = `u=${mailchimp.u}&id=${mailchimp.id}&f_id=${mailchimp.fId}`;
const honeypotName = `b_${mailchimp.u}_${mailchimp.id}`;

export class MccContact extends LitElement {
  static properties = {
    _status: { state: true },
    _message: { state: true },
  };

  static styles = [
    baseStyles,
    layoutStyles,
    css`
      .contact { padding-top: 94px; padding-bottom: 98px; }
      .contact-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 10%; align-items: end; }
      h2 { margin-bottom: 0; font-size: clamp(38px, 4.4vw, 58px); }
      .contact-grid > div:first-child > p { max-width: 370px; margin: 20px 0 0; color: #414c45; }
      .signup { padding: 22px 0 5px; border-top: 1px solid var(--line); }
      .signup-title { margin: 0 0 6px; font-family: "Space Grotesk", sans-serif; font-size: 20px; font-weight: 600; }
      .signup-lead { margin: 0 0 18px; color: var(--copy); font-size: 14px; }
      .signup-row { display: flex; gap: 10px; }
      .signup-row input { flex: 1; min-width: 0; min-height: 52px; padding: 0 16px; border: 1px solid var(--line); border-radius: 0; background: var(--paper); color: var(--ink); font: inherit; font-size: 15px; }
      .signup-row input::placeholder { color: var(--muted); }

      .signup-row button {
        min-height: 52px;
        padding: 0 22px;
        border: 0;
        background: var(--lime);
        color: #17231f;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
      }

      .signup-row button:hover { background: #e4ff78; }
      .signup-row button:disabled { opacity: 0.6; cursor: progress; }
      .signup-consent { margin: 12px 0 0; color: var(--muted); font-size: 12px; }
      .signup-honeypot { position: absolute; left: -5000px; }
      .signup-feedback { min-height: 1.5em; margin: 12px 0 0; font-size: 14px; font-weight: 600; }
      .signup-feedback.is-error { color: var(--accent-ink); }

      @media (max-width: 720px) {
        .contact { padding-top: 68px; padding-bottom: 70px; }
        .contact-grid { grid-template-columns: 1fr; gap: 34px; }
        h2 { font-size: 42px; }
        .signup-row { flex-direction: column; }
      }
    `,
  ];

  constructor() {
    super();
    this._status = 'idle';
    this._message = '';
  }

  // Mailchimp's JSONP endpoint reports success or failure without exposing any key.
  _subscribe(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.EMAIL.value.trim();
    if (!form.reportValidity()) return;

    this._status = 'sending';
    this._message = '';
    const callback = `mccSubscribe${Date.now()}`;
    const script = document.createElement('script');
    const finish = (status, message) => {
      delete window[callback];
      script.remove();
      window.clearTimeout(timer);
      this._status = status;
      this._message = message;
      if (status === 'success') form.reset();
    };
    const timer = window.setTimeout(
      () => finish('error', 'Something went wrong. Please try again in a moment.'),
      15000,
    );
    window[callback] = (response) => {
      if (response.result === 'success') {
        finish('success', 'Almost done! Check your inbox and confirm your subscription.');
        return;
      }
      const text = String(response.msg || '').replace(/<[^>]*>/g, '').replace(/^\d+\s*-\s*/, '');
      finish('error', text || 'Something went wrong. Please try again in a moment.');
    };
    script.onerror = () => finish('error', 'Something went wrong. Please try again in a moment.');
    script.src = `${mailchimp.host}/subscribe/post-json?${subscribeParams}&EMAIL=${encodeURIComponent(email)}&c=${callback}`;
    document.head.append(script);
  }

  render() {
    return html`
      <section class="contact section-wrap" aria-labelledby="contact-title">
        <div class="section-label"><span>Get involved</span></div>
        <div class="contact-grid">
          <div>
            <h2 id="contact-title">Make room<br>for a cleaner city.</h2>
            <p>Want to help? Join our mailing list for updates on cleanups and ways to take part.</p>
          </div>
          <form
            class="signup"
            action="${mailchimp.host}/subscribe/post?${subscribeParams}"
            method="post"
            target="_blank"
            @submit=${this._subscribe}
          >
            <h3 class="signup-title">Join the cause</h3>
            <p class="signup-lead">Get occasional updates on cleanups and ways to help keep the GTA litter-free.</p>
            <div class="signup-row">
              <input type="email" name="EMAIL" autocomplete="email" placeholder="Email address" aria-label="Email address" required>
              <button type="submit" ?disabled=${this._status === 'sending'}>${this._status === 'sending' ? 'Subscribing…' : 'Subscribe'}</button>
            </div>
            <div class="signup-honeypot" aria-hidden="true">
              <input type="text" name="${honeypotName}" tabindex="-1" autocomplete="off" value="">
            </div>
            <p class="signup-consent">By subscribing, you agree to receive emails from My Clean City, Richmond Hill, Ontario. You can unsubscribe at any time.</p>
            <p class="signup-feedback ${this._status === 'error' ? 'is-error' : ''}" role="status" aria-live="polite">${this._message}</p>
          </form>
        </div>
      </section>
    `;
  }
}

customElements.define('mcc-contact', MccContact);
