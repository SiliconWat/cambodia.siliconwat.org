import { FRONTEND } from '/global.mjs';
import template from './template.mjs';

class SwLearn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async render(w, c) {
        this.style.display = 'block';
        const done = Number(localStorage.getItem(`learn-week${w}-chapter${c}`));

        const { TRILOGY } = await import(`${FRONTEND}/global.mjs`);
        const { WEEKS, CHAPTERS } = await import(`${TRILOGY[2]}/data.mjs`);
        const week = WEEKS[w - 1];
        const chapter = CHAPTERS[c - 1];

        this.shadowRoot.querySelector('header h1').textContent = `Week ${w}: ${week.title}`;
        this.shadowRoot.querySelector('header h2').textContent = `${done ? "✅" : "📖"} Learn: Chapter ${c}`;
        this.shadowRoot.querySelector('header h3').textContent = `${done ? "☑️" : "📋"} ${chapter.title}`;
        
        this.#renderVideo(chapter, c, done);
        this.#renderTextbook(chapter, c, done);
        this.#renderQuiz(w, c, done);
        this.#renderGroup(c, done);
    }

    #renderVideo(chapter, c, done) {
        const button = this.shadowRoot.querySelector('.video button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Lecture ${c}`;
        if (chapter.udemy) button.onclick = () => window.open(chapter.udemy, '_blank');
    }

    #renderTextbook(chapter, c, done) {
        const button = this.shadowRoot.querySelector('.textbook button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Chapter ${c}`;
        button.onclick = () => window.open(chapter.medium, '_blank');
    }
    
    #renderQuiz(w, c, done) {
        const button = this.shadowRoot.querySelector('.quiz button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Quiz ${c}`;
        button.onclick = () => window.open(`https://quiz.siliconwat.com/#frontend-week${w}-chapter${c}`, '_blank');
    }

    #renderGroup(c, done) {
        const w = 0; // TODO:
        const button = this.shadowRoot.querySelector('.group button');
        button.style.textDecorationLine = done ? "line-through" : "none";
        button.firstElementChild.textContent = `Discussion ${c}`;
        button.onclick = () => window.open(`https://frontend.siliconwat.org/#learn-week${w}-chapter${c}`, '_blank');
    }
}

customElements.define("sw-learn", SwLearn);