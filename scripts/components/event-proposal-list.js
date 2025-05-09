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
      gap: 16px 0px;
      width: 800px;
    }
    @media (max-width: 900px) {
      .event-proposal-list {
        width: 100%;
      }
    }
    </style>
    <div class='event-proposal-list'></div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    this.listElm = this.shadowRoot.querySelector('.event-proposal-list'); // Store list element reference

    this.renderProposals(); // Initial render

    // Listen for the custom event dispatched by propose-dialog
    document.addEventListener('proposal-submitted', () => {
      this.renderProposals(); // Re-render the list
    });
  }

  async renderProposals() {
    document.dispatchEvent(new CustomEvent('show-loading')); // Dispatch show event
    try {
      // Clear existing proposals before rendering new ones
      this.listElm.innerHTML = '';

      // Get proposalId from URL hash (e.g., #123 -> 123)
      const proposalIdFromHash = location.hash.substring(1);

      const proposals = await this.fetchEventProposals();
      proposals.forEach((proposal) => {
        const elm = document.createElement('event-proposal');
        proposal.overview = proposal.overview.replace(/\n/g, '<br>');

        elm.setAttribute('proposal-id', proposal.id);
        elm.setAttribute('title', proposal.title);
        // Set show-overview attribute only if the proposal ID matches the hash
        if (proposal.id.toString() === proposalIdFromHash) {
          elm.setAttribute('show-overview', 'true');
        }
        elm.setAttribute('overview', proposal.overview);
        elm.setAttribute('votes', proposal.votes);
        this.listElm.appendChild(elm);
      });
    } finally {
      document.dispatchEvent(new CustomEvent('hide-loading')); // Dispatch hide event
    }
  }

  async fetchEventProposals() {
    const proposals = await getProposals();

    return proposals;
  }
}

customElements.define('event-proposal-list', EventProposalList);
