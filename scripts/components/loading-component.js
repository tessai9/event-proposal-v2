// scripts/components/loading-component.js
class LoadingComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none; /* Initially hidden */
          position: fixed; /* Or absolute, depending on desired behavior */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          z-index: 1000;
          text-align: center;
        }
        :host([visible]) {
          display: block; /* Show when 'visible' attribute is present */
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s ease infinite;
          margin: 0 auto 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner"></div>
      <div>Loading...</div>
    `;
    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
  }

  connectedCallback() {
    document.addEventListener('show-loading', this._show);
    document.addEventListener('hide-loading', this._hide);
  }

  disconnectedCallback() {
    document.removeEventListener('show-loading', this._show);
    document.removeEventListener('hide-loading', this._hide);
  }

  show() {
    this.setAttribute('visible', '');
  }

  hide() {
    this.removeAttribute('visible');
  }
}

customElements.define('loading-component', LoadingComponent);
