import { isVoted, vote, cancelVote } from '../repos/indexedDB/vote.js';
import { createVote, deleteVote } from '../repos/spreadsheet/votes.js';
import './icons/share-icon.js'; // Import the share icon

class EventProposal extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
    .proposal {
      width: 100%;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

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
          <share-icon style="margin-left: 0.5rem;"></share-icon>
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
    const showOverview = this.hasAttribute('show-overview'); // Check if the attribute exists

    if(proposalId === null || proposalTitle === null || proposalOverview === null) throw new Error('required parameter is missing');

    const proposalElm = this.shadowRoot.querySelector('.proposal');
    const overviewElm = proposalElm.querySelector('.proposal-overview'); // Get overview element
    proposalElm.setAttribute('proposal-id', proposalId);
    proposalElm.querySelector('.proposal-header').addEventListener('click', () => {
      overviewElm.classList.toggle('d-none');
    });
    proposalElm.querySelector('.proposal-title').innerHTML = proposalTitle;
    overviewElm.innerHTML = proposalOverview;

    // Show overview if the attribute is present
    if (showOverview) overviewElm.classList.remove('d-none');

    proposalElm.querySelector('thumb-up-icon').addEventListener('click', this.onVoteClickHandler);
    proposalElm.querySelector('share-icon').addEventListener('click', this.onShareClickHandler);
    (async() => {
      const voted = await isVoted(proposalId);
      if(voted) proposalElm.querySelector('thumb-up-icon').switchToVoted();
    })();
    proposalElm.querySelector('.vote-count').innerHTML = proposalVotes;
  }

  async onVoteClickHandler(event) {
    event.stopPropagation();
    const proposalElm = this.closest('.proposal');
    const proposalId = proposalElm.getAttribute('proposal-id');
    document.dispatchEvent(new CustomEvent('show-loading')); // Dispatch show event
    try {
      const voted = await isVoted(proposalId);
      if(voted) {
        await cancelVote(proposalId);
        await deleteVote(proposalId);
      } else {
        await vote(proposalId);
        await createVote(proposalId);
      }
    } finally {
      document.dispatchEvent(new CustomEvent('hide-loading')); // Dispatch hide event
    }
    this.dispatchEvent(new CustomEvent('proposal-submitted', { bubbles: true, composed: true }));
  }

  async onShareClickHandler(event) {
    event.stopPropagation();
    const proposalElm = this.closest('.proposal');
    const proposalId = proposalElm.getAttribute('proposal-id');
    const proposalTitle = proposalElm.querySelector('.proposal-title').innerHTML;
    const proposalUrl = new URL(`#${proposalId}`, location.origin).href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: proposalTitle,
          url: proposalUrl,
        });
      } catch (error) {
        console.error('Error sharing proposal:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${proposalTitle}\n${proposalUrl}`);
        alert('クリップボードにコピーしました');
      } catch (err) {
        alert('シェア機能が利用できませんでした');
      }
    }
  }
}

customElements.define('event-proposal', EventProposal);
