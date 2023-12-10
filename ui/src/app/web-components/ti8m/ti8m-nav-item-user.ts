import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class Ti8mNavItemUserCustomComponent extends LitElement {

  static styles = css`
    :host {
        font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid #ccc;
        line-height: 53px;
      }

      span{
        font-size: 11px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        color: #292929;
        opacity: .5;
        transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -moz-transition: all .3s ease;
        max-width: 100%;
        white-space: normal;
        text-decoration: none;
        outline: 0;
      }

      img{
        width: calc(40px/2);
        height: calc(40px/2);
        background-color: #ccc;
        display: inline-block;
        margin-right: .2rem;
        vertical-align: middle;
        border-radius: calc(40px/2);
      }
  `;

  @property({ type: String }) url: string;
  @property({ type: String }) avatar: string;
  // @property( { type : String }  ) user;

  constructor() {
    super();
    this.url = this.url ? this.url : this.getUrl(this.avatar);
  }

  getUrl(avatar: string) {
    return `https://avatars.dicebear.com/api/human/${avatar}.svg`;
  }

  render() {
    return html`
      <li>
      <img src="${this.url}" >
      <span><slot></slot></span>
    </li>
    `;
  }
}
