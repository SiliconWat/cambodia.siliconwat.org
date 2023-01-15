import { FRONTEND_COHORT as ORIGIN, THONLY } from "https://thonly.org/global.mjs";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THONLY}/components/tl-footer/shadow.css">
    <link rel="stylesheet" href="${ORIGIN}/components/sw-footer/shadow.css">
    <nav>
        <main>
            <section>
                <sw-sponsors></sw-sponsors>
            </section>
            <section>
                <div>
                    <h5>Thank</h5>
                    <ul>
                        <li><a href="https://dear.kiitos.earth/#SiliconWat">Kiitos</a></li>
                    </ul> 
                </div>
                <div>
                    <h5>Sponsor</h5>
                    <ul>
                        <li><a href="https://heartbank.fund/#SiliconWat">HeartBank</a></li>
                        <li><a href="https://github.com/sponsors/SiliconWat">GitHub</a></li>
                        <li><a href="https://medium.com/@thonly/membership">Medium</a></li>
                    </ul>
                </div>
            </section>
            <section>
                <div>
                    <h5>Showcase</h5>
                    <ul>
                        <li><a id="startup">Best Startup</a></li>
                        <li><a id="idea">Best Idea</a></li>
                        <li><a id="code">Best Code</a></li>
                    </ul> 
                </div>
            </section>
        </main>
        <footer>
            <select onchange="this.getRootNode().host.changeLanguage(event)">
                <option value="en">English</option>
                <option value="km" disabled>Khmer</option>
                <option value="ru" disabled>Russian</option>
                <!--<option value="es" disabled>Spanish</option>
                <option value="zh" disabled>Chinese</option>-->
            </select>
            <small><a href="https://siliconwat.org">Silicon Wat Campus</a> &copy; 2023</small>
        </footer>
    </nav>
`;

export default template;