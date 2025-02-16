class NewProposeButton extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
    .propose-button {
      background-color: white;
      border: 1px solid;
      border-radius: calc(infinity * 1px);
      padding: 1rem;
      cursor: pointer;
    }
    </style>
    <button class='propose-button'>
      イベントを提案する
    </button>
    <propose-dialog></propose-dialog>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    const proposeDialog = this.shadowRoot.querySelector('propose-dialog');
    const dialog = proposeDialog.shadowRoot.querySelector('dialog');
    this.shadowRoot.querySelector('.propose-button').addEventListener('click', () => {
      dialog.showModal();
    });
  }
}

customElements.define('new-propose-button', NewProposeButton)
