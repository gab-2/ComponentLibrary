export class SmInputElement extends HTMLElement {
  connectedCallback() { this.classList.add("sm-input"); }
}
customElements.define("sm-input", SmInputElement);
