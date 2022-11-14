import "./components/sw-header/element.mjs";

import "./components/sw-main/sw-learn/element.mjs";
import "./components/sw-main/sw-practice/element.mjs";
import "./components/sw-main/sw-review/element.mjs";
import "./components/sw-main/sw-home/element.mjs";
import "./components/sw-main/element.mjs";

import "./components/sw-footer/element.mjs";

window.onload = async () => {
    const origin = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5531" : "https://frontend.siliconwat.com";
    await import(`${origin}/components/sw-progress/element.mjs`);
    await import(`${origin}/components/sw-music/element.mjs`);
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJB0YFM4F9');