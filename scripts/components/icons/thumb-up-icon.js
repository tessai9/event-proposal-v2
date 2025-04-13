class ThumbUpIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: var(--icon-size, 24px);
          height: var(--icon-size, 24px);
        }
        svg {
          width: 100%;
          height: 100%;
          fill: var(--icon-color, white); /* デフォルト色、未指定時は黒 */

          transition: transform 0.3s;
          &:hover {
            transform: scale(1.2);
          }
        }
        path {
          /* SVG pathのスタイルは必要に応じて調整 */
        }
      </style>
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="48" 
          height="48" 
          stroke="black"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="thumb-icon"
      >
          <path d="M14 2L9 10V20H19L21 12V10H14Z"/>
          <path d="M9 10H5V20H9"/>
      </svg>
    `;
  }

  switchToVoted() {
    this.shadowRoot.querySelector('svg').style.setProperty('--icon-color', 'black');
  }
}

customElements.define('thumb-up-icon', ThumbUpIcon);
