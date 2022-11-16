import { FRONTEND } from "/global.mjs";
import template from './template.mjs';

class SwHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        await import(`${FRONTEND}/components/sw-header/sw-bar/element.mjs`);
        const { TRILOGY } = await import(`${FRONTEND}/global.mjs`);
        const { WEEKS, CHAPTERS } = await import(`${TRILOGY[2]}/data.mjs`);
        this.#render(WEEKS, CHAPTERS);
    }

    #render(weeks, chapters) {
        const fragment = document.createDocumentFragment();

        weeks.forEach((week, w) => {
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const nav = document.createElement('nav');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const bar = document.createElement('sw-bar');

            h3.textContent = `Week ${w + 1}`;
            h2.textContent = week.title;
            p.innerHTML = week.description;
            bar.setAttribute("id", w + 1);
            // bar.week = w + 1;

            fragment.append(li);
            li.append(h3, nav);
            nav.append(h2, p, document.createElement('br'), bar, document.createElement('br'));

            if (week.from && week.to) {
                for (let c = week.from - 1; c < week.to; c++) {
                    const chapter = chapters[c];
                    const h4 = document.createElement('h4');
                    const menu = document.createElement('menu');

                    h4.textContent = `Chapter ${c + 1}: ${chapter.title}`;

                    li.append(nav);
                    nav.append(h4, menu);

                    ['Learn', 'Practice', 'Review'].forEach(task => {
                        const taskLowerCase = task.toLowerCase();
                        const li = document.createElement('li');
                        const input = document.createElement('input');
                        const a = document.createElement('a');

                        li.classList.add(taskLowerCase);
                        input.id = `${taskLowerCase}-week${w + 1}-chapter${c + 1}`;
                        input.type = 'checkbox';
                        input.checked = Boolean(Number(localStorage.getItem(input.id)));
                        input.oninput = this.#checkMark.bind(this);
                        a.href = `#${input.id}`;
                        a.textContent = task;

                        menu.append(li);
                        li.append(input, " ", a);
                    });
                }
            }
        });

        this.shadowRoot.querySelector('ul').replaceChildren(fragment);
    }

    #checkMark(event) {
        localStorage.setItem(event.target.id, Number(event.target.checked));
        const week = event.target.id.split('-')[1].replace('week', "");
        this.shadowRoot.getElementById(week).render();
        document.querySelector('sw-main').render();
        document.querySelector('sw-progress').render();
    }

    changeLanguage(event) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("lang", event.target.value);
        window.location.search = searchParams.toString();
        //TODO: change base url to include language
    }
}

customElements.define("sw-header", SwHeader);