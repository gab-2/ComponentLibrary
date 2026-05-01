export class SmCardElement extends HTMLElement {
  connectedCallback() { this.classList.add("sm-card"); }
}
customElements.define("sm-card", SmCardElement);
