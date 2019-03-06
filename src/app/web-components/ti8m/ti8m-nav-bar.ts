import {LitElement, html, css } from 'lit-element';

// Extend the LitElement base class
// export the class, so it can be imported where it is needed
export class Ti8mNavBarCustomComponent extends LitElement {

  static styles = css`
    :host {
        display: block;
    }

    .tim-nav-bar{
        height: 55px;
        max-height: 55px;
        line-height: 53px;
        border-bottom: 1px solid #ccc;
    }
  `;

  render() {
    return html`
      <div class="tim-nav-bar">
           <slot></slot>
      </div>
    `;
  }
}
