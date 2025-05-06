class HeaderComponent extends HTMLElement {
    constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'closed'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
      .header-wrapper {
        display: flex;
        gap: 1rem;
        align-items: center;
        background-color: #EEE;
        padding: 1rem 2rem;

        .header-brand {
          height: 30px;
        }
        .header-title {
          font-weight: 700;
          font-size: 1rem;
        }
        .header-menu {
          margin-left: auto;
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #333;
          a {
            text-decoration: none;
          }
        }
        .header-humberger {
          display: none;
        }
      }

      @media (max-width: 900px) {
        :host .header-title {
          font-size: 0.8rem;
        }
        :host .header-menu {
          display: none;
        }
        :host .header-humberger {
          display: block;
          cursor: pointer;
        }
      }
      </style>
      <div class='header-wrapper'>
        <img class='header-brand' src='/assets/logo.svg' height='30px' />
        <span class='header-title'>三宮.dev イベント提案サイト</span>
        <div class='header-menu'>
          <a href='https://sannomiya.dev' target="_blank">三宮.devについて</a>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('header-component', HeaderComponent);
