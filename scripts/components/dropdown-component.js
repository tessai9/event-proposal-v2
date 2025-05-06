class DropdownComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        .dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .dropdown a {
          color: black;
          padding: 0.5rem 1rem;
          text-decoration: none;
          display: block;
        }

        .dropdown a:hover {
          background-color: #ddd;
        }

        .d-none {
          display: none;
        }
      </style>
      <div class="dropdown d-none"></div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  toggleVisibility() {
    const dropdown = this.shadow.querySelector('.dropdown');
    dropdown.classList.toggle('d-none');
  }

  initializeDropdown(items) {
    const dropdown = this.shadow.querySelector('.dropdown');
    dropdown.innerHTML = '';

    items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.url;
      link.target = item.target || '_self';
      link.textContent = item.name;
      dropdown.appendChild(link);
    });
  }
}

customElements.define('dropdown-component', DropdownComponent);
