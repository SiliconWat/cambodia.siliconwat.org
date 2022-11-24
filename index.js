import "/components/sw-header/element.mjs";

//import "./components/sw-main/sw-learn/element.mjs";
//import "./components/sw-main/sw-practice/element.mjs";
//import "./components/sw-main/sw-review/element.mjs";
//import "./components/sw-main/element.mjs";

import "/components/sw-footer/element.mjs";
import { FRONTEND } from "/global.mjs";

window.onload = async () => {
    const { getGitHub } = await import(`${FRONTEND}/global.mjs`);
    await import(`${FRONTEND}/components/sw-auth/element.mjs`);

    await import(`${FRONTEND}/components/sw-main/sw-learn/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-practice/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-review/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/sw-home/element.mjs`);
    await import(`${FRONTEND}/components/sw-main/element.mjs`);

    await import(`${FRONTEND}/components/sw-progress/element.mjs`);
    await import(`${FRONTEND}/components/sw-music/element.mjs`);

    const github = await getGitHub();
    await document.querySelector('sw-header').render(github);
    await document.querySelector('sw-main').render(github);
    await document.querySelector('sw-progress').render(github);
    document.body.style.display = 'flex';
};

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJB0YFM4F9');