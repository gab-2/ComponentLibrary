export class SmButtonElement extends HTMLElement {
  connectedCallback() {
    this.classList.add("sm-button");
    if (!this.getAttribute("role")) this.setAttribute("role", "button");
  }
}
customElements.define("sm-button", SmButtonElement);
