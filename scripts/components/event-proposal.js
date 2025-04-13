import { isVoted, vote, cancelVote } from '../repos/indexedDB/vote.js';
import { createVote, deleteVote } from '../repos/spreadsheet/votes.js';

class EventProposal extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
    .proposal {
      width: 100%;

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
      .proposal-overview {
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
      <div class='proposal-overview d-none'></div>
    </div>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    const proposalId = this.getAttribute('proposal-id');
    const proposalTitle = this.getAttribute('title');
    const proposalOverview = this.getAttribute('overview');
    const proposalVotes = this.getAttribute('votes');

    if(proposalId === null || proposalTitle === null || proposalOverview === null) throw new Error('required parameter is missing');

    const proposalElm = this.shadowRoot.querySelector('.proposal');
    proposalElm.setAttribute('proposal-id', proposalId);
    proposalElm.querySelector('.proposal-header').addEventListener('click', () => {
      proposalElm.querySelector('.proposal-overview').classList.toggle('d-none');
    });
    proposalElm.querySelector('.proposal-title').innerHTML = proposalTitle;
    proposalElm.querySelector('.proposal-overview').innerHTML = proposalOverview;
    proposalElm.querySelector('thumb-up-icon').addEventListener('click', this.onIconClickHandler);
    (async() => {
      const voted = await isVoted(proposalId);
      if(voted) proposalElm.querySelector('thumb-up-icon').switchToVoted();
    })();
    proposalElm.querySelector('.vote-count').innerHTML = proposalVotes;
  }

  async onIconClickHandler() {
    const proposalId = this.closest('.proposal').getAttribute('proposal-id');
    const voted = await isVoted(proposalId);
    if(voted) {
      console.log('cancel')
      await cancelVote(proposalId);
      await deleteVote(proposalId);
    } else {
      console.log('vote')
      await vote(proposalId);
      await createVote(proposalId);
    }
    location.reload();
  }
}

customElements.define('event-proposal', EventProposal);
