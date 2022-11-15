import { FRONTEND } from '/global.mjs';
import template from './template.mjs';

class SwReview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async render(w, c) {
        this.style.display = 'block';
        const done = Number(localStorage.getItem(`review-week${w}-chapter${c}`));

        const { TRILOGY } = await import(`${FRONTEND}/global.mjs`);
        const { WEEKS, CHAPTERS } = await import(`${TRILOGY[2]}/data.mjs`);
        const week = WEEKS[w - 1];
        const chapter = CHAPTERS[c - 1];

        this.shadowRoot.querySelector('header h1').textContent = `Week ${w}: ${week.title}`;
        this.shadowRoot.querySelector('header h2').textContent = `${done ? "✅" : "👩🏼‍💻"} Review: Chapter ${c}`;
        this.shadowRoot.querySelector('header h3').textContent = `${done ? "☑️" : "📋"} ${chapter.title}`;
        
        this.#renderFlashcard(w, c, done);
        this.#renderSummary(c, done);
        this.#renderInterview(c, done);
    }

    #renderFlashcard(w, c, done) {
        const button = this.shadowRoot.querySelector('.flashcard button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Game ${c}`;
        button.onclick = () => window.open(`https://flashcard.siliconwat.com/#frontend-week${w}-chapter${c}`, '_blank');
    }

    #renderSummary(c, done) {
        const w = 0; // TODO:
        const button = this.shadowRoot.querySelector('.summary button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Summary ${c}`;
        button.onclick = () => window.open(`https://frontend.siliconwat.org/#review-week${w}-chapter${c}`, '_blank');
    }
    
    #renderInterview(c, done) {
        const w = 0; // TODO:
        const button = this.shadowRoot.querySelector('.interview button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Interview ${c}`;
        button.onclick = () => window.open(`https://frontend.siliconwat.org/#review-week${w}-chapter${c}`, '_blank');
    }
}

customElements.define("sw-review", SwReview);