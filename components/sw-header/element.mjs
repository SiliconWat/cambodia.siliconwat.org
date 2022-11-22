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
        const { TRILOGY, getGitHub, getYear, getTerm, getWeeks } = await import(`${FRONTEND}/global.mjs`);
        const syllabus = await fetch(`https://raw.githubusercontent.com/SiliconWat/${TRILOGY[0].toLowerCase()}-cohort/main/${await getYear()}/Syllabus.json`, { cache: "no-store" });
        const { cohort, weeks, chapters } = await syllabus.json();
        const fragment = document.createDocumentFragment();

        for (let w = 0; w < weeks.length; w++) {
            const week = weeks[w];
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const nav = document.createElement('nav');
            const h2 = document.createElement('h2');
            const em = document.createElement('em');
            const bar = document.createElement('sw-bar');

            const github = await getGitHub();
            await this.#getGroup(TRILOGY, github, await getYear(), getTerm(github), em, week, w + 1);
            h3.textContent = `Week ${w + 1}`;
            h2.textContent = await getWeeks(cohort, w + 1);
            bar.setAttribute("id", w + 1);
            // bar.week = w + 1;

            fragment.append(li);
            li.append(h3, nav);
            nav.append(h2, em, document.createElement('br'), bar, document.createElement('br'));

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
                        input.id = `${taskLowerCase}-chapter${c + 1}`;
                        input.setAttribute('data-week', w + 1);
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

    async #getGroup(trilogy, github, y, term, element, week, w) {
        if (week.active) {
            try {
                const data = await fetch(`https://raw.githubusercontent.com/SiliconWat/${trilogy[0].toLowerCase()}-cohort/main/${y}/${term[1] === 'semester' ? "Semesters" : "Quarters"}/${term[2].charAt(0).toUpperCase() + term[2].slice(1)}/Weeks/${w}/Groups.json`, { cache: "no-store" });
                const groups = await data.json();

                if (github.student) {
                    const group = groups.find(group => group.members.includes(github.login));
                    const partners = group.pairs.find(pair => pair.includes(github.login));

                    group.members.forEach(member => {
                        const a = document.createElement('a');
                        a.target = "_blank";
                        a.href = `https://github.com/${member}`;
                        a.textContent = `@${member}`;

                        if (partners.includes(member)) {
                            a.style.fontWeight = "bold";
                            if (member === github.login) {
                                a.title = "You in your Study Group";
                            } else {
                                a.title = "Your Programming Partner";
                                a.style.textDecorationLine = "underline";
                            }
                        } else {
                            a.title = "Your Study Group Member";
                        }

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
        this.shadowRoot.getElementById(event.target.dataset.week).render();
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