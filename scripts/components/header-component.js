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
      }
      </style>
      <div class='header-wrapper'>
        <img class='header-brand' src='/assets/logo.svg' height='30px' />
        <span class='header-title'>三宮.dev イベント提案サイト</span>
      </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('header-component', HeaderComponent);
