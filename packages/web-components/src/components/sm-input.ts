export class SmInput extends HTMLElement { connectedCallback(){ this.innerHTML = '<input class="sm-input" />'; } }
customElements.define('sm-input', SmInput);
