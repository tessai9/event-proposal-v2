class ProposeDialog extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
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
    <dialog class='propose-dialog'>
      <div class='dialog-header'>
        新しくイベント案を追加します
      </div>
      <div class='dialog-body'>
        <form method='dialog'>
          <input type='text' name='title' placeholder='イベントタイトル' class='event-title'>
          <textarea name='overview' cols='30' rows='10' placeholder='イベント概要'></textarea>
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
  }
}

customElements.define('propose-dialog', ProposeDialog);
