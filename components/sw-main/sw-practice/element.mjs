import { FRONTEND } from '/global.mjs';
import template from './template.mjs';

class SwPractice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async render(w, c) {
        this.style.display = 'block';
        const done = Number(localStorage.getItem(`practice-week${w}-chapter${c}`));

        const { TRILOGY } = await import(`${FRONTEND}/global.mjs`);
        const { WEEKS, CHAPTERS } = await import(`${TRILOGY[2]}/data.mjs`);
        const week = WEEKS[w - 1];
        const chapter = CHAPTERS[c - 1];

        this.shadowRoot.querySelector('header h1').textContent = `Week ${w}: ${week.title}`;
        this.shadowRoot.querySelector('header h2').textContent = `${done ? "✅" : "💻"} Practice: Chapter ${c}`;
        this.shadowRoot.querySelector('header h3').textContent = `${done ? "☑️" : "📋"} ${chapter.title}`;
        
        this.#renderCoding(w, c, done);
        this.#renderPair(c, done);
        this.#renderProject(c, done);
    }

    #renderCoding(w, c, done) {
        const button = this.shadowRoot.querySelector('.coding button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Exercise ${c}`;
        button.onclick = () => window.open(`https://code.siliconwat.com/#frontend-week${w}-chapter${c}`, '_blank');
    }

    #renderPair(c, done) {
        const w = 0; // TODO:
        const button = this.shadowRoot.querySelector('.pair button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Challenge ${c}`;
        button.onclick = () => window.open(`https://frontend.siliconwat.org/#practice-week${w}-chapter${chapter}`, '_blank');
    }
    
    #renderProject(c, done) {
        const w = 0; // TODO:
        const button = this.shadowRoot.querySelector('.project button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Suggestion ${c}`;
        button.onclick = () => window.open(`https://frontend.siliconwat.org/#practice-week${w}-chapter${c}`, '_blank');
    }
}

customElements.define("sw-practice", SwPractice);