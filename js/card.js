import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module';

class CardWgr extends LitElement {
    createRenderRoot() {
        return this;
      } 
    static get properties() {
        return {
            namee: {
                type: String,
                reflect: true
            },
            className: {
                type: String,
                reflect: true
            },
            index: { type: Number }
        }
    }
    constructor() {
        super();
        this.namee = 'test';
        this.className = 'card-wgr';
    }

    _fire(eventType) {
        this.dispatchEvent(new CustomEvent(eventType, { detail: this.index }));
    }

    static get styles() {
        return css`
        :host {
          display: block;
          font-family: sans-serif;
        }

        .button {
          cursor: pointer;
          border: none;
        }
        `;
    }

    render() {
        return html`
        <div class=${this.className}>
            <label>${this.namee}</label>
            <button class="button" @click=${() => this._fire('onRemove')}>❌</button>
        </div>
        `;
    }
}
window.customElements.define('card-wgr', CardWgr);