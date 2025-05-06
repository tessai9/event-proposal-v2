class HamburgerIcon extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        .hamburger {
          cursor: pointer;
        }

        .bar {
          width: 35px;
          height: 2px;
          background-color: #333;
          margin: 0.5rem 0;
        }
      </style>
      <div class="hamburger">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('hamburger-icon', HamburgerIcon);
