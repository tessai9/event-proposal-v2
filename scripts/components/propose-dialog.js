import { createProposal } from "../repos/spreadsheet/proposals.js";

class ProposeDialog extends HTMLElement {
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
      font-size: 15px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    }
    .propose-dialog {
      padding: 1rem;
      border: 1px solid gray;
      .dialog-header {
        font-weight: 500;
        margin-bottom: 1rem;
      }
      .dialog-body {
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          input, textarea {
            padding: 0.5rem;
          }
          .form-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            .cancel-btn, .submit-btn {
              padding: 0.5rem 1rem;
              cursor: pointer;
              border-radius: 1rem;
            }
            .cancel-btn {
              background-color: white;
              border: 1px solid gray;
            }
            .submit-btn {
              background-color: black;
              color: white;
            }
          }
        }
      }
    }
    </style>
    <button class='propose-button'>
      イベントを提案する
    </button>
    <dialog class='propose-dialog'>
      <div class='dialog-header'>
        新しくイベント案を追加します
      </div>
      <div class='dialog-body'>
        <form method='dialog'>
          <input type='text' name='title' placeholder='イベントタイトル' class='event-title'>
          <textarea name='overview' cols='30' rows='10' placeholder='イベント概要' class='event-overview'></textarea>
          <div class='form-buttons'>
            <button class='cancel-btn' value='cancel'>キャンセル</button>
            <button class='submit-btn' value='default'>提案する</button>
          </div>
        </form>
      </div>
    </dialog>
    `;
  }

  connectedCallback() {
    this.shadow.appendChild(this.template.content.cloneNode(true));
    const proposeBtn = this.shadowRoot.querySelector('.propose-button');
    const dialog = this.shadowRoot.querySelector('.propose-dialog');
    const submitBtn = dialog.querySelector('.submit-btn');

    proposeBtn.addEventListener('click', () => {
      dialog.showModal();
    });
    submitBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      const titleElm = dialog.querySelector('.event-title');
      const overviewElm = dialog.querySelector('.event-overview');
      const title = titleElm.value;
      const overview = overviewElm.value;
      if(!title || !overview) {
        alert('タイトルと概要は必須です');
        return;
      }
      const result = await createProposal({title, overview});
      if(result) {
        alert('提案しました');
        titleElm.value = null;
        overviewElm.value = null;
        this.shadowRoot.querySelector('dialog').close();
      }else{
        alert('提案に失敗しました');
      }
    });
  }
}

customElements.define('propose-dialog', ProposeDialog);
