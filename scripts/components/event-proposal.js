class EventProposal extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});

    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
    .proposal {
      .proposal-header {
        display: flex;
        align-items: center;
        padding: 0.1rem 1.5rem;
        background-color: #f5f5f5;
        cursor: pointer;
        font-size: 16px;
        max-height: 60px;
      }
      .vote {
        margin-left: auto;
        display: flex;
        .vote-count {
          margin-left: 0.5rem;
        }
      }
      .proposal-content {
        padding: 1rem;
        border: 1px solid #dcdcdc;
      }
      .d-none {
        display: none;
      }
    }
    </style>
    <div class='proposal'>
      <div class='proposal-header'>
        <p class='proposal-title'></p>
        <p class='vote'>
          <thumb-up-icon></thumb-up-icon>
          <span class='vote-count'></span>
        </p>
      </div>
      <div class='proposal-content d-none'></div>
    </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    const proposalId = this.getAttribute('proposal-id');
    const proposalTitle = this.getAttribute('title');
    const proposalContent = this.getAttribute('content');
    const proposalVotes = this.getAttribute('votes');

    if(proposalId === null || proposalTitle === null || proposalContent === null) throw new Error('required parameter is missing');

    const proposalElm = this.shadowRoot.querySelector('.proposal');
    proposalElm.setAttribute('proposal-id', proposalId);
    proposalElm.querySelector('.proposal-header').addEventListener('click', () => {
      proposalElm.querySelector('.proposal-content').classList.toggle('d-none');
    });
    proposalElm.querySelector('.proposal-title').innerHTML = proposalTitle;
    proposalElm.querySelector('.proposal-content').innerHTML = proposalContent;
    proposalElm.querySelector('.vote-count').innerHTML = proposalVotes;
  }
}

customElements.define('event-proposal', EventProposal);
