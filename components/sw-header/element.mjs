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
        await this.render();
    }

    async render() {
        const { TRILOGY, getGitHub, getWeek } = await import(`${FRONTEND}/global.mjs`);
        const { YEAR, COHORT, WEEKS, CHAPTERS } = await import(`${TRILOGY[2]}/data.mjs`);
        const fragment = document.createDocumentFragment();

        for (let w = 0; w < WEEKS.length; w++) {
            const week = WEEKS[w];
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const nav = document.createElement('nav');
            const h2 = document.createElement('h2');
            const em = document.createElement('em');
            const bar = document.createElement('sw-bar');

            h3.textContent = `Week ${w + 1}`;
            h2.textContent = getWeek(COHORT, w + 1);
            await this.#getGroup(TRILOGY, getGitHub, YEAR, em, week, w + 1);
            bar.setAttribute("id", w + 1);
            // bar.week = w + 1;

            fragment.append(li);
            li.append(h3, nav);
            nav.append(h2, em, document.createElement('br'), bar, document.createElement('br'));

            if (week.from && week.to) {
                for (let c = week.from - 1; c < week.to; c++) {
                    const chapter = CHAPTERS[c];
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
        }

        this.shadowRoot.querySelector('ul').replaceChildren(fragment);
    }

    async #getGroup(trilogy, getGitHub, year, element, week, w) {
        if (week.active) {
            try {
                const term = localStorage.getItem('term').split('-');
                const data = await fetch(`https://raw.githubusercontent.com/SiliconWat/${trilogy[0].toLowerCase()}-cohort/main/${year}/Cohort/${term[0] === 'semester' ? "Semesters" : "Quarters"}/${term[1].charAt(0).toUpperCase() + term[1].slice(1)}/Groups/Weeks/${w}/Groups.json`, { cache: "no-store" });
                const groups = await data.json();
                const github = await getGitHub();

                if (github && github.login) {
                    const group = groups.find(group => group.members.includes(github.login));
                    const partners = group.pairs.find(pair => pair.includes(github.login));

                    group.members.forEach(member => {
                        const a = document.createElement('a');
                        a.style.fontWeight = partners.includes(member) ? "bold" : "normal";
                        a.title = partners.includes(member) ? "Your Programming Partner" : "Your Study Group Member";
                        a.target = "_blank";
                        a.href = `https://github.com/${member}`;
                        a.textContent = `@${member}`;
                        element.append(a, " ");
                    });
                } else {
                    element.innerHTML = "Please enroll to be assigned a <strong>Study Group</strong> and <strong>Programming Partner</strong>";
                }
            } catch(error) {
                console.error(error);
                element.textContent = "TBA";
            }
        } else {
            element.textContent = "TBA";
        }
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