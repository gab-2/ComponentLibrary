export class SmButton extends HTMLElement { connectedCallback(){ this.innerHTML = `<button class=\"sm-button\">${this.innerHTML||'Button'}</button>`; } }
customElements.define('sm-button', SmButton);
