/* ================= Finale: Fips' große Abschluss-Animation =================
   Je nach Ergebnis eine von 5 Stufen. Fips wird dafür als echtes SVG eingebettet,
   damit sich Kopf, Arme, Flügel und Schwanz einzeln bewegen können. */
const FINALE = [   // ab welchem Anteil richtiger Antworten
  {min:0,  key:"cheer", title:"Gut geübt!",          text:"Fips winkt dir zu – weiter üben, du schaffst das! 💪"},
  {min:.4, key:"clap",  title:"Schon richtig gut!",  text:"Fips klatscht für dich! 👏"},
  {min:.6, key:"jump",  title:"Toll gemacht!",       text:"Fips hüpft vor Freude!"},
  {min:.8, key:"flip",  title:"Super stark!",        text:"Fips macht einen Salto für dich!"},
  {min:1,  key:"story", title:"Alles richtig!",      text:"Fips zündet für dich G und D an – du bist ein Hör-Profi! 👑"}
];

let finaleSvg = null;
async function loadFinaleSvg(){
  if (finaleSvg !== null) return finaleSvg;
  try {
    const r = await fetch(`img/fips-tanz.svg?v=${APP_VERSION}`);
    if (!r.ok) throw new Error(r.status);
    // eigenes <style> und <title> entfernen: die Animationen kommen aus style.css (sonst gälten sie seitenweit)
    finaleSvg = (await r.text()).replace(/<\?xml[^>]*>/, "").replace(/<style>[\s\S]*?<\/style>/, "").replace(/<title[\s\S]*?<\/title>/, "");
  } catch(e){ finaleSvg = ""; }          // z. B. lokal über file:// – dann als Bild (bewegt sich nur als Ganzes)
  return finaleSvg;
}

const FIN_CROWN = `<g class="fin-crown">
  <path d="M156 78 L148 30 L177 52 L200 16 L223 52 L252 30 L244 78 Z" fill="url(#pg-gold)" stroke="#A87500" stroke-width="5" stroke-linejoin="round"/>
  <rect x="152" y="70" width="96" height="16" rx="6" fill="url(#pg-gold)" stroke="#A87500" stroke-width="5"/>
  <circle cx="200" cy="50" r="7" fill="#FF7A8E" stroke="#A8243C" stroke-width="3"/>
  <circle cx="172" cy="60" r="5" fill="#8FD6F5" stroke="#2A7AA8" stroke-width="2.5"/>
  <circle cx="228" cy="60" r="5" fill="#96D965" stroke="#3E7D22" stroke-width="2.5"/>
  <ellipse cx="170" cy="40" rx="5" ry="10" fill="#fff" opacity=".6" transform="rotate(-30 170 40)"/>
</g>`;

/* ---------- 10 von 10: kleine Geschichte ----------
   Fips läuft durch die Landschaft, zündet mit seinem Feueratem erst das G, dann das D an
   und jubelt am Ende mit Krone. Zeiten in Sekunden – passend zu den Animationen in style.css */
const STORY_END = 7.8;
const FIN_TREE = c => `<svg viewBox="0 0 60 90"><rect x="25" y="50" width="10" height="38" rx="3" fill="url(#pg-brown)" stroke="#6E4429" stroke-width="3"/>
  <circle cx="30" cy="34" r="24" fill="url(#pg-${c})" stroke="${PIC_PAL[c][3]}" stroke-width="3"/><ellipse cx="22" cy="24" rx="8" ry="4" fill="#fff" opacity=".5"/></svg>`;
const FIN_FLOWER = c => `<svg viewBox="0 0 20 30"><path d="M10 30 V14" stroke="#3E7D22" stroke-width="2.5"/><g fill="${c}"><circle cx="6" cy="10" r="4"/><circle cx="14" cy="10" r="4"/><circle cx="10" cy="5" r="4"/><circle cx="10" cy="14" r="4"/></g><circle cx="10" cy="10" r="3" fill="#FFD54A"/></svg>`;
const FIN_FLAME = `<svg viewBox="0 0 40 50"><path d="M20 2 C26 14 36 20 34 34 C32 44 26 48 20 48 C14 48 8 44 6 34 C4 24 12 20 14 10 C16 16 18 18 20 20 C20 12 18 8 20 2 Z" fill="url(#finFire)" stroke="#E8603C" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M20 22 C24 30 28 34 26 40 C24 46 16 46 14 40 C13 34 18 32 20 22 Z" fill="#FFF3B0"/></svg>`;
function storyScene(){
  const r = (a, b) => a + rnd() * (b - a);
  const trees = [[4,"leaf"],[22,"green"],[38,"leaf"],[58,"green"],[70,"leaf"],[90,"green"]].map(([x,c]) =>
    `<div class="st-tree" style="left:${x}%;--h:${r(.85,1.15)}">${FIN_TREE(c)}</div>`).join("");
  const flowers = Array.from({length:22}, (_, i) =>
    `<div class="st-flower" style="left:${i*4.5 + r(0,3)}%">${FIN_FLOWER(pick(["#FF88A8","#C0A4F0","#FFB062","#93BFF5"]))}</div>`).join("");
  const letter = (l, cls) => `<div class="st-letter ${cls}"><div class="st-post"></div>
    <div class="st-tile off">${l}</div><div class="st-tile on">${l}</div><div class="st-fire">${FIN_FLAME}</div></div>`;
  return `<div class="story">
    <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="finFire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FF6A3D"/><stop offset=".55" stop-color="#FFB13B"/><stop offset="1" stop-color="#FFE45C"/></linearGradient></defs></svg>
    <div class="st-sun"></div><div class="st-cloud c1"></div><div class="st-cloud c2"></div>
    <div class="st-hills"></div>
    <div class="st-strip">${trees}<div class="st-path"></div>${flowers}${letter("G","lg")}${letter("D","ld")}</div>
    <div class="st-fips"><div class="st-lean"><div class="st-walk" id="storyFips"></div></div></div>
    <div class="st-breath b1"></div><div class="st-breath b2"></div>
  </div>`;
}

const FIN_STAR  = c => `<svg viewBox="-12 -12 24 24"><path d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z" fill="${c}"/></svg>`;
const FIN_HEART = c => `<svg viewBox="-12 -12 24 24"><path d="M0 9 C-14 0 -12 -12 0 -5 C12 -12 14 0 0 9 Z" fill="${c}"/></svg>`;
const FIN_COLORS = ["#FF88A8","#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FFB062"];

/* Hintergrund-Effekte je Stufe */
function finaleFx(key){
  const fx = $("finFx"); fx.innerHTML = "";
  const add = (html, css, box = fx) => { const s = document.createElement("span"); s.className = "fx"; s.innerHTML = html; s.style.cssText = css; box.appendChild(s); };
  const r = (a, b) => a + rnd() * (b - a);
  if (key === "cheer"){
    for (let i = 0; i < 12; i++) add(FIN_HEART(pick(["#FF88A8","#FFB3C8","#7DD9B4"])),
      `left:${r(4,92)}%;--s:${r(.6,1.2)};animation:finRise ${r(3.5,5.5)}s linear ${-r(0,5)}s infinite`);
  } else if (key === "clap"){
    for (let i = 0; i < 16; i++) add(FIN_STAR(pick(FIN_COLORS)),
      `left:${r(4,92)}%;top:${r(4,60)}%;--s:${r(.6,1.3)};animation:finTwinkle ${r(1,1.6)}s ease-in-out ${-r(0,1.6)}s infinite`);
  } else if (key === "jump"){
    for (let i = 0; i < 28; i++) add(`<i style="background:${pick(FIN_COLORS)}"></i>`,
      `left:${r(0,98)}%;--s:${r(.7,1.2)};--r:${r(-540,540)}deg;animation:finFall ${r(2.4,4)}s linear ${-r(0,4)}s infinite`);
  } else if (key === "flip"){
    // Sterne springen genau bei der Landung (70 % des Salto-Takts) heraus
    for (let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2;
      add(FIN_STAR(pick(FIN_COLORS)), `left:50%;top:92%;--x:${Math.cos(a)*r(110,160)}px;--y:${Math.sin(a)*r(50,90)}px;--s:${r(.8,1.3)};animation:finBurst 2.7s ease-out infinite`, $("endDragon")); }
    for (let i = 0; i < 10; i++) add(FIN_STAR("#FFD54A"),
      `left:${r(4,92)}%;top:${r(4,55)}%;--s:${r(.5,.9)};animation:finTwinkle ${r(1.2,2)}s ease-in-out ${-r(0,2)}s infinite`);
  } else if (key === "story"){
    for (let b = 0; b < 4; b++){
      const x = r(12,88), y = r(8,45), c = pick(FIN_COLORS), d = b * .7;
      for (let i = 0; i < 10; i++){ const a = i / 10 * Math.PI * 2;
        add(FIN_STAR(c), `left:${x}%;top:${y}%;--x:${Math.cos(a)*70}px;--y:${Math.sin(a)*70}px;--s:.9;animation:finFirework 2.8s ease-out ${STORY_END + d}s infinite`); }
    }
    for (let i = 0; i < 10; i++) add(FIN_STAR("#FFD54A"),
      `left:${r(4,92)}%;top:${r(4,70)}%;--s:${r(.5,1)};animation:finTwinkle ${r(1,1.8)}s ease-in-out ${STORY_END + r(0,2)}s infinite both`);
  }
}

/* Sterne-Wertung: so viele goldene Sterne wie die Stufe */
function finaleStars(level){
  return Array.from({length:5}, (_, i) =>
    `<svg class="fin-star ${i < level ? "on" : ""}" style="--i:${i}" viewBox="0 0 24 24"><path d="M12 2.5 L14.8 8.6 L21.4 9.3 L16.4 13.8 L17.9 20.4 L12 17 L6.1 20.4 L7.6 13.8 L2.6 9.3 L9.2 8.6 Z" stroke-width="1.6" stroke-linejoin="round"/></svg>`
  ).join("");
}

async function showFinale(ok, n){
  const ratio = n ? ok / n : 0;
  let level = 0; FINALE.forEach((f, i) => { if (ratio >= f.min) level = i; });
  const f = FINALE[level];

  $("endTitle").textContent = f.title;
  $("endStars").innerHTML = finaleStars(level + 1);
  $("endText").innerHTML = `<b>${ok} von ${n}</b> richtig!<br>${f.text}`;

  const ov = $("endOverlay");
  ov.className = "overlay finale fin-" + f.key;
  let stage = $("endDragon");
  stage.innerHTML = "";
  if (f.key === "story"){ stage.innerHTML = storyScene(); stage = $("storyFips"); }
  const svg = await loadFinaleSvg();
  if (svg){
    stage.innerHTML = svg;
    const el = stage.querySelector("svg");
    el.removeAttribute("width"); el.removeAttribute("height");
    el.setAttribute("aria-label", "Fips"); el.classList.add("fin-svg");
    if (f.key === "story") el.querySelector(".tilt")?.insertAdjacentHTML("beforeend", FIN_CROWN);
  } else {
    stage.innerHTML = `<img class="fin-svg" src="img/fips-tanz.svg?v=${APP_VERSION}" alt="Fips">`;
  }
  finaleFx(f.key);
  show("endOverlay");
  sfx(level >= 2 ? "fanfare" : "right");
}
