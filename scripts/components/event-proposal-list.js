import { getProposals } from "../repos/spreadsheet/proposals.js";

class EventProposalList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
    .event-proposal-list {
      display: flex;
      flex-direction: column;
      gap: 10px 0px;
    }
    </style>
    <div class='event-proposal-list'></div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true))

    const listElm = this.shadowRoot.querySelector('.event-proposal-list');

    this.fetchEventProposals().then((proposals) => {
      proposals.forEach((proposal) => {
        const elm = document.createElement('event-proposal');
        elm.setAttribute('proposal-id', proposal.id);
        elm.setAttribute('title', proposal.title);
        elm.setAttribute('overview', proposal.overview);
        elm.setAttribute('votes', proposal.votes);
        listElm.appendChild(elm);
      });
    });
  }

  async fetchEventProposals() {
    const proposals = await getProposals();

    return proposals;
  }
}

customElements.define('event-proposal-list', EventProposalList);
