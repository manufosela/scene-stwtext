import { LitElement, html, css } from 'lit-element';

/**
 * `scene-stwtext`
 * SceneStwtext
 *
 * @customElement scene-stwtext
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class SceneStwtext extends LitElement {
  static get is() { 
    return 'scene-stwtext'; 
  }

  static get properties() {
    return {
      delay: { type: Number },
      speed: { type: Number },
      color: { type: String },
      width: { type: String },
      height: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .main {
        position:relative;
        margin:0;
        padding:0;
        overflow: hidden;
      }
      .titles  {  
        position: absolute;  
        bottom: 0;
        width: 100%;  
        
        font-size: 350%;  
        font-weight: bold;  
        text-align: justify;  
        overflow: hidden;  
        transform-origin: 50% 100%;  
        z-index: 1;
        border:0;
        text-align:center;
      }
      .titlecontent {
        position: absolute;
        top: 100%;
        width: 100%;
      }
        
      @keyframes scrollstw {  
        0%   { top: 100%; }  
        100% { top: -10%; }  
      }
      .titles:after {  
        position: absolute;  
        content: ' ';  
        left: 0;  
        right: 0;  
        top: 0;  
        bottom: 60%;  
        background-image: linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);  
        pointer-events: none;  
      }
      .content{    
        margin: 0 auto;
        text-align: center;
        width:100%;
      }
    `;
  }
  
  constructor() {
    super();
    this.delay = 0;
    this.speed = 100;
    this.width = '800px';
    this.height = '50vh';
    this.color = '#FF0';

    this._rotateX = 27.5;
    this._rotateY = 0;
    this.backgroundStars = 'data:image/png;base64,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';
  }

  firstUpdated(){
    this._perspective = this._calcPercent(this.height, 0.6);
    let me = this.shadowRoot.querySelector('.titles');
    let delay = ( this.delay ) ? `${this.delay}s ` : '';
    let animationCSS = `scrollstw ${this.speed}s linear ${delay}infinite`;

    me.style.transform = `perspective(${this._perspective}) rotateX(${this._rotateX}deg) rotateY(${this._rotateY}deg)`;
    me.style.height = this._calcPercent(this.height, 10);
    me.childNodes[1].style.animation = animationCSS;
  }

  _calcPercent(val, percent){
    let valNum = parseInt(val);
    let units = val.slice(('' + valNum).length);
    return (valNum * percent) + units;
  }

  render() {
    return html`
      <style>
        .main {
          background-image: url(${this.backgroundStars});
          color: ${this.color};
          height: ${this.height};
        }
        .main, .titles { 
          width: ${this.width};
        }
      </style>
      <div class="main">
        <div class="titles">
          <div class="titlecontent">
            <div class="content"><slot></slot></div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define(SceneStwtext.is, SceneStwtext);