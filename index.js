//import "./components/sw-main/sw-learn/element.mjs";
//import "./components/sw-main/sw-practice/element.mjs";
//import "./components/sw-main/sw-review/element.mjs";
//import "./components/sw-main/element.mjs";

import "/components/sw-header/element.mjs";
import "/components/sw-footer/element.mjs";
import { FRONTEND_COURSE as FRONTEND } from "https://thonly.org/global.mjs";

window.onload = async () => {
    await import(`${FRONTEND}/components/sw-main/sw-learn/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-practice/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-review/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-home/element.mjs`);

    await import(`${FRONTEND}/components/sw-progress/element.mjs`);
    await import(`${FRONTEND}/components/sw-music/element.mjs`);

    await import(`${FRONTEND}/components/sw-auth/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/element.mjs`);
}

document.querySelector('sw-main').addEventListener("sw-main", async event => {
    const { BACKGROUND, getGitHub } = await import(`${FRONTEND}/global.mjs`);
    if (!window.TESTING) window.clearCache();
    const github = await getGitHub();
    
    await event.detail.component.render(github);
    document.documentElement.style.backgroundImage = BACKGROUND;
    document.body.style.display = 'flex';
    await document.querySelector('sw-header').render(github);
    await document.querySelector('sw-progress').render(github);
});

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJB0YFM4F9');