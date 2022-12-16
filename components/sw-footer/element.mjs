import { FRONTEND, UNIVERSITY } from '/global.mjs';
import template from './template.mjs';

class SwFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        await import(`${UNIVERSITY}/components/sw-footer/sw-sponsors/element.mjs`);
        const { TRILOGY } = await import(`${FRONTEND}/global.mjs`);
        this.shadowRoot.getElementById('startup').setAttribute('href', `https://showcase.siliconwat.org/#${TRILOGY[0].toLowerCase()}-startup`);
        this.shadowRoot.getElementById('idea').setAttribute('href', `https://showcase.siliconwat.org/#${TRILOGY[0].toLowerCase()}-idea`);
        this.shadowRoot.getElementById('code').setAttribute('href', `https://showcase.siliconwat.org/#${TRILOGY[0].toLowerCase()}-code`);
        this.style.display = 'block';
    }
}

customElements.define("sw-footer", SwFooter);