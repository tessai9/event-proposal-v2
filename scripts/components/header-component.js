import './icons/hamburger-icon.js';
import './dropdown-component.js';

class HeaderComponent extends HTMLElement {
  HeaderItems = [
    { name: '三宮.devについて', url: 'https://sannomiya.dev', target: '_blank' },
    { name: 'Github', url: 'https://github.com/tessai9/event-proposal-v2', target: '_blank' },
  ];

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
        .header-dropdown {
          display: none;
        }
      }

      @media (max-width: 900px) {
        :host .header-wrapper {
          padding: 0.5rem 1rem;

          .header-title {
            font-size: 0.8rem;
          }
          .header-menu {
            display: none;
          }
          .header-dropdown {
            display: flex;
            margin-left: auto;
          }
        }
      }
      </style>
      <div class='header-wrapper'>
        <img class='header-brand' src='/assets/logo.svg' height='30px' />
        <span class='header-title'>三宮.dev イベント提案サイト</span>
        <div class='header-menu'></div>
        <div class="header-dropdown">
          <hamburger-icon class='header-humberger'></hamburger-icon>
          <dropdown-component></dropdown-component>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    const hamburgerIcoElm = this.shadow.querySelector('hamburger-icon');
    const dropdownMenu = this.shadow.querySelector('dropdown-component');

    this.initializeMenuItems();
    dropdownMenu.initializeDropdown(this.HeaderItems);

    hamburgerIcoElm.addEventListener('click', () => {
      dropdownMenu.toggleVisibility();
    });
  }

  initializeMenuItems() {
    const menuContainer = this.shadow.querySelector('.header-menu');
    this.HeaderItems.forEach(item => {
      const link = document.createElement('a');
      link.href = item.url;
      link.target = item.target;
      link.textContent = item.name;
      menuContainer.appendChild(link);
    });
  }
}

customElements.define('header-component', HeaderComponent);
