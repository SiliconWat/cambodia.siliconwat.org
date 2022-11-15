import { UNIVERSITY } from '/global.mjs';
import template from './template.mjs';

class SwFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        await import(`${UNIVERSITY}/components/sw-footer/sw-sponsors/element.mjs`);
    }
}

customElements.define("sw-footer", SwFooter);