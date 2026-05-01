export class SmCard extends HTMLElement { connectedCallback(){ this.innerHTML = `<div class=\"sm-card\">${this.innerHTML}</div>`; } }
customElements.define('sm-card', SmCard);
