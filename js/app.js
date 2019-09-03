import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module';
import './card.js';

class WhosGonnaReview extends LitElement {

    static get properties() {
        return {
            cards: { type: Array }
        }
    }

    constructor() {
        super();
        this.cards = [];
    }

    getRandomInt(max) {
        const rand = Math.floor(Math.random() * Math.floor(max));
        console.log(rand);

        return rand + 1;
    }

    getWinnerDeg(length, winner) {
        console.log('length', length, 'winner', winner)
        return {
            "1": {
                "1": 0
            }[winner.toString()],
            "2": {
                "1": 0,
                "2": 180,
            }[winner.toString()],
            "3": {
                "1": 0,
                "2": 120,
                "3": 240,
            }[winner.toString()],
            "4": {
                "1": 0,
                "2": 90,
                "3": 180,
                "4": 270,
            }[winner.toString()],
            "5": {
                "1": 0,
                "2": 72,
                "3": 144,
                "4": 216,
                "5": 288,
            }[winner.toString()],
        }[length.toString()]
    }

    firstUpdated() {
        this.$input = this.shadowRoot.querySelector('input');
    }

    _removeCard(e) {
        this.resetWheel();
        this.cards = this.cards.filter((card, index) => {
            return index !== e.detail;
        });
    }

    _addCard(e) {
        e.preventDefault();
        this.resetWheel();
        if (this.$input.value.length > 0 && this.cards.length < 5) {
            this.cards = [...this.cards, { namee: this.$input.value, className: `card-wgr card-wgr--${this.getRandomInt(7)}` }];
            this.$input.value = '';
        }
        // document.querySelector('my-component').shadowRoot.querySelector('button')
    }
    async resetWheel() {
        const containerCards = this.shadowRoot.querySelector('#containerCards');
        this.cards = this.cards.map((card, index) => ({ ...card, className: `${card.className.substring(0, 20)}` }))
        this.shadowRoot.querySelector('#containerCards').style.setProperty('--marginContainer', '5rem 2rem');

        containerCards.style.setProperty('--showDelete', 'block');
        containerCards.style.setProperty('--animation', '');
        containerCards.style.setProperty('--cardPosition', 'relative');
        containerCards.style.setProperty('--rotationDeg', 0);
        return new Promise((res, rej) => {
            setTimeout(() => {
                return res();
            }, 0)
        })
    }

    async _launchWheel(e) {
        console.log('before reseting');

        await this.resetWheel();
        const containerCards = this.shadowRoot.querySelector('#containerCards');

        const winner = this.getRandomInt(this.cards.length);
        const rotationDeg = `${360 * 15 + this.getWinnerDeg(this.cards.length, winner)}deg`;
        
        this.cards = this.cards.map((card, index) => ({ ...card, className: `${card.className} card-wgr--${this.cards.length}-${index + 1}` }))
        
        containerCards.style.setProperty('--showDelete', 'none');
        containerCards.style.setProperty('--marginContainer', '5rem auto');
        containerCards.style.setProperty('--animation', 'rotation 3s ease-in-out');
        containerCards.style.setProperty('--cardPosition', 'absolute');
        containerCards.style.setProperty('--rotationDeg', rotationDeg);
        setTimeout(() => {
            containerCards.style.setProperty('--animation', 'rotation 4s ease-in-out forwards');
            containerCards.style.setProperty('--rotationDeg', `${360+this.getWinnerDeg(this.cards.length, winner)}deg`);
        }, 2500)
    }

    static get styles() {
        return css`
          :host {
            --normal-width: 200px;
            --normal-height: 120px;
            --nunito: 'Nunito', sans-serif;
          }
          .container-cards {
              display: flex;
          }
          input {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: white;
            padding: 0.5rem;
            display: inline-block;
          }

          form {
              display: flex;
              justify-content: center;
          }
          button {
              cursor: pointer;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: #077A37;
            color: white;
            width: 2.5rem;
          }
        
          button, input {
            margin: 0;
            outline: none;
            border: none;
            height: 2.5rem;
          }

          .launcher {
              border-radius: 5px;
            color: #7a0710;
            background: white;
            width: fit-content;
            font-size: 18px;
            font-weight: 900;
            margin: 0 auto
          }


          
.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    -webkit-perspective: 800;
            perspective: 800;
    -webkit-perspective-origin: 50% 75px;
            perspective-origin: 50% 75px;
  }
  
  .container-cards {
    --marginContainer: 5rem 2rem;
    margin: var(--marginContainer);
    position: relative;
    width: 200px;
    height: 150px;
    animation: var(--animation);
    transform-style: preserve-3d;
    transform: rotateY(0);
  }
  .card-wgr button {
    position: absolute;
    background: transparent;
    height: auto;
    top:.5rem;
    right:.5rem;
      display: var(--showDelete)
  }

    card-wgr + card-wgr {
        margin-left: 1rem;
    }

  
  .card-wgr {
      text-align: center;
    position: var(--cardPosition);
    width: var(--normal-width);
    height: var(--normal-height);
    background: dodgerblue;
    border-radius: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    font-size: 24px;
    font-family: var(--nunito);
    text-transform: uppercase;
    font-weight: 900;
    color: white;
    z-index: 11;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  .card-wgr::after {
    content: '';
    right: 0px;
    bottom: 0px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: rotateY(180deg);
    transform-style: preserve-3d;
    border-radius: 5px;
    backface-visibility: hidden;
    background:inherit;
  }
  
  .card-wgr--1 {
    background: linear-gradient(336deg, rgba(121, 121, 121, 0.06) 0%, rgba(121, 121, 121, 0.06) 82%, rgba(125, 125, 125, 0.06) 82%, rgba(125, 125, 125, 0.06) 100%), linear-gradient(54deg, rgba(15, 15, 15, 0.01) 0%, rgba(15, 15, 15, 0.01) 57%, rgba(204, 204, 204, 0.01) 57%, rgba(204, 204, 204, 0.01) 100%), linear-gradient(174deg, rgba(151, 151, 151, 0.02) 0%, rgba(151, 151, 151, 0.02) 87%, rgba(226, 226, 226, 0.02) 87%, rgba(226, 226, 226, 0.02) 100%), linear-gradient(224deg, rgba(4, 4, 4, 0.02) 0%, rgba(4, 4, 4, 0.02) 15%, rgba(232, 232, 232, 0.02) 15%, rgba(232, 232, 232, 0.02) 100%), linear-gradient(215deg, rgba(5, 5, 5, 0.05) 0%, rgba(5, 5, 5, 0.05) 32%, rgba(97, 97, 97, 0.05) 32%, rgba(97, 97, 97, 0.05) 100%), linear-gradient(317deg, rgba(22, 22, 22, 0.06) 0%, rgba(22, 22, 22, 0.06) 56%, rgba(170, 170, 170, 0.06) 56%, rgba(170, 170, 170, 0.06) 100%), linear-gradient(15deg, rgba(172, 172, 172, 0.1) 0%, rgba(172, 172, 172, 0.1) 55%, rgba(157, 157, 157, 0.1) 55%, rgba(157, 157, 157, 0.1) 100%), linear-gradient(241deg, rgba(54, 54, 54, 0.06) 0%, rgba(54, 54, 54, 0.06) 34%, rgba(232, 232, 232, 0.06) 34%, rgba(232, 232, 232, 0.06) 100%), linear-gradient(222deg, rgba(129, 129, 129, 0.08) 0%, rgba(129, 129, 129, 0.08) 91%, rgba(169, 169, 169, 0.08) 91%, rgba(169, 169, 169, 0.08) 100%), linear-gradient(90deg, #af14e0, #e40e43);
  }
  
  .card-wgr--2 {
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), -webkit-gradient(linear, left top, right top, from(#ef3573), to(#4f025d));
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, #ef3573, #4f025d);
  }
  
  .card-wgr--3 {
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), -webkit-gradient(linear, left top, right top, from(#13E978), to(#E9E313));
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, #13E978, #E9E313);
  }
  
  .card-wgr--4 {
    background: linear-gradient(215deg, rgba(156, 156, 156, 0.03) 0%, rgba(156, 156, 156, 0.03) 50%, rgba(20, 20, 20, 0.03) 50%, rgba(20, 20, 20, 0.03) 100%), linear-gradient(107deg, rgba(179, 179, 179, 0.03) 0%, rgba(179, 179, 179, 0.03) 50%, rgba(7, 7, 7, 0.03) 50%, rgba(7, 7, 7, 0.03) 100%), linear-gradient(25deg, rgba(30, 30, 30, 0.01) 0%, rgba(30, 30, 30, 0.01) 50%, rgba(165, 165, 165, 0.01) 50%, rgba(165, 165, 165, 0.01) 100%), linear-gradient(146deg, rgba(54, 54, 54, 0.03) 0%, rgba(54, 54, 54, 0.03) 50%, rgba(246, 246, 246, 0.03) 50%, rgba(246, 246, 246, 0.03) 100%), linear-gradient(225deg, rgba(8, 8, 8, 0.01) 0%, rgba(8, 8, 8, 0.01) 50%, rgba(133, 133, 133, 0.01) 50%, rgba(133, 133, 133, 0.01) 100%), linear-gradient(38deg, rgba(57, 57, 57, 0.02) 0%, rgba(57, 57, 57, 0.02) 50%, rgba(196, 196, 196, 0.02) 50%, rgba(196, 196, 196, 0.02) 100%), linear-gradient(122deg, rgba(115, 115, 115, 0.02) 0%, rgba(115, 115, 115, 0.02) 50%, rgba(101, 101, 101, 0.02) 50%, rgba(101, 101, 101, 0.02) 100%), linear-gradient(154deg, rgba(217, 217, 217, 0.01) 0%, rgba(217, 217, 217, 0.01) 50%, rgba(126, 126, 126, 0.01) 50%, rgba(126, 126, 126, 0.01) 100%), linear-gradient(144deg, rgba(204, 204, 204, 0.01) 0%, rgba(204, 204, 204, 0.01) 50%, rgba(139, 139, 139, 0.01) 50%, rgba(139, 139, 139, 0.01) 100%), linear-gradient(90deg, #00021d, #049659);
  }
  
  .card-wgr--5 {
    background: linear-gradient(213deg, rgba(191, 191, 191, 0.02) 0%, rgba(191, 191, 191, 0.02) 16.667%, rgba(64, 64, 64, 0.02) 16.667%, rgba(64, 64, 64, 0.02) 33.334%, rgba(162, 162, 162, 0.02) 33.334%, rgba(162, 162, 162, 0.02) 50.001%, rgba(6, 6, 6, 0.02) 50.001%, rgba(6, 6, 6, 0.02) 66.668%, rgba(53, 53, 53, 0.02) 66.668%, rgba(53, 53, 53, 0.02) 83.335%, rgba(30, 30, 30, 0.02) 83.335%, rgba(30, 30, 30, 0.02) 100.002%), linear-gradient(245deg, rgba(187, 187, 187, 0.02) 0%, rgba(187, 187, 187, 0.02) 12.5%, rgba(231, 231, 231, 0.02) 12.5%, rgba(231, 231, 231, 0.02) 25%, rgba(123, 123, 123, 0.02) 25%, rgba(123, 123, 123, 0.02) 37.5%, rgba(229, 229, 229, 0.02) 37.5%, rgba(229, 229, 229, 0.02) 50%, rgba(205, 205, 205, 0.02) 50%, rgba(205, 205, 205, 0.02) 62.5%, rgba(21, 21, 21, 0.02) 62.5%, rgba(21, 21, 21, 0.02) 75%, rgba(222, 222, 222, 0.02) 75%, rgba(222, 222, 222, 0.02) 87.5%, rgba(19, 19, 19, 0.02) 87.5%, rgba(19, 19, 19, 0.02) 100%), linear-gradient(333deg, rgba(128, 128, 128, 0.02) 0%, rgba(128, 128, 128, 0.02) 25%, rgba(235, 235, 235, 0.02) 25%, rgba(235, 235, 235, 0.02) 50%, rgba(129, 129, 129, 0.02) 50%, rgba(129, 129, 129, 0.02) 75%, rgba(4, 4, 4, 0.02) 75%, rgba(4, 4, 4, 0.02) 100%), linear-gradient(154deg, rgba(241, 241, 241, 0.03) 0%, rgba(241, 241, 241, 0.03) 16.667%, rgba(248, 248, 248, 0.03) 16.667%, rgba(248, 248, 248, 0.03) 33.334%, rgba(21, 21, 21, 0.03) 33.334%, rgba(21, 21, 21, 0.03) 50.001%, rgba(94, 94, 94, 0.03) 50.001%, rgba(94, 94, 94, 0.03) 66.668%, rgba(250, 250, 250, 0.03) 66.668%, rgba(250, 250, 250, 0.03) 83.335%, rgba(5, 5, 5, 0.03) 83.335%, rgba(5, 5, 5, 0.03) 100.002%), linear-gradient(166deg, rgba(104, 104, 104, 0.01) 0%, rgba(104, 104, 104, 0.01) 12.5%, rgba(77, 77, 77, 0.01) 12.5%, rgba(77, 77, 77, 0.01) 25%, rgba(13, 13, 13, 0.01) 25%, rgba(13, 13, 13, 0.01) 37.5%, rgba(194, 194, 194, 0.01) 37.5%, rgba(194, 194, 194, 0.01) 50%, rgba(71, 71, 71, 0.01) 50%, rgba(71, 71, 71, 0.01) 62.5%, rgba(234, 234, 234, 0.01) 62.5%, rgba(234, 234, 234, 0.01) 75%, rgba(38, 38, 38, 0.01) 75%, rgba(38, 38, 38, 0.01) 87.5%, rgba(95, 95, 95, 0.01) 87.5%, rgba(95, 95, 95, 0.01) 100%), linear-gradient(98deg, rgba(253, 253, 253, 0.03) 0%, rgba(253, 253, 253, 0.03) 12.5%, rgba(126, 126, 126, 0.03) 12.5%, rgba(126, 126, 126, 0.03) 25%, rgba(145, 145, 145, 0.03) 25%, rgba(145, 145, 145, 0.03) 37.5%, rgba(70, 70, 70, 0.03) 37.5%, rgba(70, 70, 70, 0.03) 50%, rgba(174, 174, 174, 0.03) 50%, rgba(174, 174, 174, 0.03) 62.5%, rgba(77, 77, 77, 0.03) 62.5%, rgba(77, 77, 77, 0.03) 75%, rgba(123, 123, 123, 0.03) 75%, rgba(123, 123, 123, 0.03) 87.5%, rgba(36, 36, 36, 0.03) 87.5%, rgba(36, 36, 36, 0.03) 100%), linear-gradient(293deg, rgba(55, 55, 55, 0.03) 0%, rgba(55, 55, 55, 0.03) 20%, rgba(142, 142, 142, 0.03) 20%, rgba(142, 142, 142, 0.03) 40%, rgba(159, 159, 159, 0.03) 40%, rgba(159, 159, 159, 0.03) 60%, rgba(139, 139, 139, 0.03) 60%, rgba(139, 139, 139, 0.03) 80%, rgba(9, 9, 9, 0.03) 80%, rgba(9, 9, 9, 0.03) 100%), linear-gradient(26deg, rgba(116, 116, 116, 0.01) 0%, rgba(116, 116, 116, 0.01) 20%, rgba(179, 179, 179, 0.01) 20%, rgba(179, 179, 179, 0.01) 40%, rgba(5, 5, 5, 0.01) 40%, rgba(5, 5, 5, 0.01) 60%, rgba(212, 212, 212, 0.01) 60%, rgba(212, 212, 212, 0.01) 80%, rgba(246, 246, 246, 0.01) 80%, rgba(246, 246, 246, 0.01) 100%), linear-gradient(90deg, #57b223, #152510);
  }
  
  .card-wgr--6 {
    background: linear-gradient(45deg, #ef0781 0%, #ef0781 6%, #d00a70 6%, #d00a70 25%, #b10d60 25%, #b10d60 40%, #93104f 40%, #93104f 45%, #74133e 45%, #74133e 53%, #55162e 53%, #55162e 66%, #36191d 66%, #36191d 100%);
  }
  
  .card-wgr--7 {
    background: linear-gradient(0, rgba(234, 234, 234, 0.13) 0%, rgba(234, 234, 234, 0.13) 25%, rgba(190, 190, 190, 0.13) 25%, rgba(190, 190, 190, 0.13) 50%, rgba(147, 147, 147, 0.13) 50%, rgba(147, 147, 147, 0.13) 75%, rgba(103, 103, 103, 0.13) 75%, rgba(103, 103, 103, 0.13) 100%), linear-gradient(135deg, #0d04b2 0%, #0d04b2 12.5%, #1119b6 12.5%, #1119b6 25%, #142eb9 25%, #142eb9 37.5%, #1843bd 37.5%, #1843bd 50%, #1c57c0 50%, #1c57c0 62.5%, #206cc4 62.5%, #206cc4 75%, #2381c7 75%, #2381c7 87.5%, #2796cb 87.5%, #2796cb 100%);
  }
  
  .card-wgr--8 {
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), -webkit-gradient(linear, left top, right top, from(#ef3573), to(#E9E313));
    background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px), repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px), repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px), linear-gradient(90deg, #ef3573, #E9E313);
  }
  
  .card-wgr--5-1, .card-wgr--4-1, .card-wgr--3-1, .card-wgr--2-1, .card-wgr--1-1 {
    -webkit-transform: translateX(0px) translateZ(150px) rotateY(0deg);
            transform: translateX(0px) translateZ(150px) rotateY(0deg);
    z-index: 1;
  }
  
  .card-wgr--5-5 {
    -webkit-transform: translateX(-143px) translateZ(47px) rotateY(-72deg);
            transform: translateX(-143px) translateZ(47px) rotateY(-72deg);
  }
  
  .card-wgr--5-4 {
    -webkit-transform: translateX(-89px) translateZ(-122px) rotateY(-144deg);
            transform: translateX(-89px) translateZ(-122px) rotateY(-144deg);
  }
  
  .card-wgr--5-3 {
    -webkit-transform: translateX(89px) translateZ(-122px) rotateY(144deg);
            transform: translateX(89px) translateZ(-122px) rotateY(144deg);
  }
  
  .card-wgr--5-2 {
    -webkit-transform: translateX(143px) translateZ(47px) rotateY(72deg);
            transform: translateX(143px) translateZ(47px) rotateY(72deg);
  }
  
  .card-wgr--4-4 {
    -webkit-transform: translateX(-150px) translateZ(0) rotateY(-90deg);
            transform: translateX(-150px) translateZ(0) rotateY(-90deg);
  }
  
  .card-wgr--4-3 {
    -webkit-transform: translateX(0) translateZ(-150px) rotateY(180deg);
            transform: translateX(0) translateZ(-150px) rotateY(180deg);
  }
  
  .card-wgr--4-2 {
    -webkit-transform: translateX(150px) translateZ(0) rotateY(90deg);
            transform: translateX(150px) translateZ(0) rotateY(90deg);
  }
  
  .card-wgr--3-3 {
    -webkit-transform: translateX(-131px) translateZ(-75px) rotateY(-120deg);
            transform: translateX(-131px) translateZ(-75px) rotateY(-120deg);
  }
  
  .card-wgr--3-2 {
    -webkit-transform: translateX(131px) translateZ(-75px) rotateY(120deg);
            transform: translateX(131px) translateZ(-75px) rotateY(120deg);
  }
  
  .card-wgr--2-2 {
    -webkit-transform: translateX(0) translateZ(-150px) rotateY(180deg);
            transform: translateX(0) translateZ(-150px) rotateY(180deg);
  }
  
  @-webkit-keyframes rotation {
    0% {
      -webkit-transform: rotateY(0);
              transform: rotateY(0);
    }
    100% {
      -webkit-transform: rotateY(-360deg);
              transform: rotateY(-360deg);
    }
  }
  
  @keyframes rotation {
    0% {
      -webkit-transform: rotateY(0);
              transform: rotateY(0);
    }
    100% {
      -webkit-transform: rotateY(var(--rotationDeg));
              transform: rotateY(var(--rotationDeg));
    }
  }
        `;
    }

    render() {
        return html`
        <div class="container">
            <form ">
                <input type="text" placeholder="Add a new participant"></input>
                <button @click=${this._addCard}>OK</button>
            </form>
            <div class="wrap">
            <div class="container-cards" id="containerCards">
                ${this.cards.map((card, index) => html`
                    <card-wgr
                        .index=${index}
                        namee=${card.namee}
                        className=${card.className}
                        @onRemove=${this._removeCard}
                        >
                    </card-wgr>
                  `
        )}
        </div>
        <button type="button" class="launcher" @click=${this._launchWheel}>Lancer la roue !</button>
        </div>
        `;
    }
}

window.customElements.define('whos-gonna-review', WhosGonnaReview);
