/* ================= Finale: Fips' große Abschluss-Animation =================
   Je nach Ergebnis eine von 5 Stufen. Fips wird dafür als echtes SVG eingebettet,
   damit sich Kopf, Arme, Flügel und Schwanz einzeln bewegen können. */
const FINALE = [   // ab welchem Anteil richtiger Antworten
  {min:0,  key:"cheer", title:"Gut geübt!",          text:"Fips winkt dir zu – weiter üben, du schaffst das! 💪"},
  {min:.4, key:"clap",  title:"Schon richtig gut!",  text:"Fips klatscht für dich! 👏"},
  {min:.6, key:"jump",  title:"Toll gemacht!",       text:"Fips hüpft vor Freude!"},
  {min:.8, key:"flip",  title:"Super stark!",        text:"Fips macht einen Salto für dich!"},
  {min:1,  key:"story", title:"Alles richtig!",      text:"Fips hat G und D verbrannt – puff, nur noch Asche! Du bist ein Hör-Profi! 👑"}
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
const STORY_END = 10.3;
const STORY_FIRE = [3.2, 8.3];     // Zeitpunkte, an denen G und D Feuer fangen
const STORY_BREATH = [2.75, 7.85]; // Beginn des Feueratems (dauert 1,1 s)

/* Feueratem – sitzt in Fips' Kopf (Mund bei 200/228), bewegt sich also mit, wenn er sich vorbeugt.
   Richtung und Länge werden kurz vor dem Feuer auf den Buchstaben ausgerichtet (finAim). */
/* Feuerball am Maul: Flammenkranz aus Zungen – runde, lodernde Feuerwolke:
   Bögen nach außen, nach rechts (zum Strahl hin) etwas länger gezogen */
function finTongues(n, r1, r2, rot = 0){
  let d = "";
  const p = (a, rr) => { const st = 1 + .28 * Math.max(0, Math.cos(a)); return `${(Math.cos(a) * rr * st).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; };
  for (let k = 0; k < n; k++){
    const a0 = (k / n) * Math.PI * 2 + rot, a2 = ((k + 1) / n) * Math.PI * 2 + rot, w = (a2 - a0) * .45;
    d += (k ? "" : "M" + p(a0, r1)) + ` C${p(a0 + w * .2, r2 * 1.05)} ${p(a2 - w * .2, r2 * 1.05)} ${p(a2, r1)}`;
  }
  return d + " Z";
}
const FB_CONE = ["M0 -26 C14 -28 26 -32 40 -34 C46 -40 56 -44 62 -40 C72 -50 88 -50 96 -42 C108 -38 114 -22 110 -8 C116 0 116 6 110 10 C114 26 106 42 94 44 C84 52 68 50 60 42 C50 46 40 40 38 32 C24 32 14 28 0 26 Z",
  "M0 -18 C24 -20 48 -26 76 -28 C94 -29 104 -16 102 0 C104 16 94 29 76 28 C48 26 24 20 0 18 Z",
  "M0 -11 C24 -12 46 -14 66 -14 C76 -13 80 -6 80 0 C80 6 76 13 66 14 C46 14 24 12 0 11 Z"];
/* smokeOnly: nur Rauch und Glut im Maul – Strahl und Feuerball kommen dann als eigene Ebenen (storyFire) */
function finBreath(i, bt, smokeOnly){
  const r = (a, b) => (a + rnd() * (b - a)).toFixed(1);
  const smoke = (cls, pts) => pts.map(([x,y], k) => `<circle class="${cls}" cx="${x}" cy="${y}" r="7" style="--j:${k}"/>`).join("");
  const nose = `<g class="fb-nose">${smoke("fb-smoke", [[193,204],[207,204],[193,204],[207,204]])}</g>
    <g class="fb-mouth"><ellipse cx="200" cy="232" rx="28" ry="24" fill="url(#fbGlow)"/></g>`;
  const after = `<g class="fb-after">${smoke("fb-smoke2", [[214,226],[220,222],[226,226]])}</g>`;
  if (smokeOnly) return `<g class="fb" style="--bt:${bt}s">${nose}${after}</g>`;
  const puffs = Array.from({length:14}, (_, k) => `<circle class="fb-puff" r="${r(12,19)}" style="--j:${k};--oy:${r(-34,34)}"/>`).join("");
  const sparks = Array.from({length:10}, (_, k) => `<circle class="fb-spark" r="${r(2.5,4)}" style="--j:${k};--oy:${r(-60,60)}"/>`).join("");
  return `<g class="fb" style="--bt:${bt}s;--k:3.3;--len:330;--ang:10deg">
    ${nose}
    <g class="fb-jet">
      <g class="fb-cone">
        <path class="fb-outer" d="${FB_CONE[0]}"/>
        <path class="fb-mid" d="${FB_CONE[1]}"/>
        <path class="fb-core" d="${FB_CONE[2]}"/>
      </g>
      ${puffs}${sparks}
    </g>
    <g class="fb-ball">
      <circle class="fb-halo" r="58" fill="url(#fbHalo)"/>
      <path class="fb-ring" d="${finTongues(8, 31, 41)}" fill="url(#fbBallOut)" stroke="#F06A3A" stroke-width="2" stroke-linejoin="round"/>
      <path class="fb-ring2" d="${finTongues(7, 21, 29, .4)}" fill="url(#fbBallMid)"/>
      <ellipse rx="17" ry="14" fill="url(#fbBallCore)"/>
    </g>
    ${after}
  </g>`;
}
const FIN_BREATH_DEFS = `<defs>
  <linearGradient id="fbOuter" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE45C"/><stop offset=".3" stop-color="#FFB13B"/><stop offset=".65" stop-color="#FF7A3D"/><stop offset=".9" stop-color="#E8455F" stop-opacity=".9"/><stop offset="1" stop-color="#E8455F" stop-opacity=".5"/></linearGradient>
  <linearGradient id="fbMid" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF6C0"/><stop offset=".45" stop-color="#FFD54A"/><stop offset="1" stop-color="#FF9A3D" stop-opacity=".8"/></linearGradient>
  <linearGradient id="fbCore" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#FFF6C0"/><stop offset="1" stop-color="#FFE45C" stop-opacity="0"/></linearGradient>
  <radialGradient id="fbHalo" cx=".5" cy=".5" r=".5"><stop offset=".4" stop-color="#FFB13B" stop-opacity=".55"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient>
  <radialGradient id="fbBallOut" cx=".5" cy=".5" r=".5"><stop offset=".35" stop-color="#FFD54A"/><stop offset=".75" stop-color="#FF8A3D"/><stop offset="1" stop-color="#E8455F"/></radialGradient>
  <radialGradient id="fbBallMid" cx=".5" cy=".5" r=".5"><stop offset=".2" stop-color="#FFF6C0"/><stop offset="1" stop-color="#FFC23A"/></radialGradient>
  <radialGradient id="fbBallCore" cx=".45" cy=".45" r=".55"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#FFFBE0"/><stop offset="1" stop-color="#FFE45C"/></radialGradient>
  <radialGradient id="fbGlow" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".45" stop-color="#FFD54A"/><stop offset="1" stop-color="#FF7A3D"/></radialGradient>
</defs>`;
/* ---------- Feuerstrahl im Finale: eigene Ebenen über der Szene ----------
   Strahl, Feuerbälle, Funken und der Feuerball am Maul sind hier HTML-Elemente, bei denen sich nur
   transform und opacity ändern – das bewegt die Grafikkarte, ohne dass etwas neu gezeichnet wird.
   (Als Teil von Fips' SVG müsste das Handy Fips samt Strahl für jedes Bild neu malen → es ruckelt.)
   Gezeichnet wird in SVG-Einheiten von Fips (Maul = Nullpunkt), --u rechnet in Pixel um. */
/* Wo liegt Fips' Maul, wo der Buchstabe? Dafür stehen Fips und Landschaft für einen Moment in der Feuer-Pose
   (Klasse „aim“, style.css) – gleich beim Öffnen, also bevor die Animation sichtbar anläuft. */
function storyAim(){
  const story = document.querySelector("#endDragon .story"), walk = $("storyFips"), head = walk && walk.querySelector("svg .tilt");
  if (!story || !head) return [];
  const out = [];
  head.insertAdjacentHTML("beforeend", `<circle class="fb-probe" cx="200" cy="230" r="1" fill="none"/>`);
  const probe = head.lastElementChild;
  story.classList.add("aim");
  try {
    const mid = (el, fx, fy) => { const r = el.getBoundingClientRect(); return [r.left + r.width * fx, r.top + r.height * fy]; };
    for (let i = 0; i < STORY_BREATH.length; i++){
      story.classList.add("aim" + (i + 1));
      const sr = story.getBoundingClientRect(), z = story.offsetWidth / sr.width || 1;      // z: falls die Szene gerade skaliert ist
      const loc = ([x, y]) => [(x - sr.left) * z - story.clientLeft, (y - sr.top) * z - story.clientTop];
      const [mx, my] = loc(mid(probe, .5, .5)), [tx, ty] = loc(mid(story.querySelectorAll(".st-tile.off")[i], .3, .55));
      const u = walk.offsetWidth / 400;                                                    // Fips' SVG ist 400 Einheiten breit
      out.push({x: mx, y: my, u, len: Math.hypot(tx - mx, ty - my) / u, ang: Math.atan2(ty - my, tx - mx) * 180 / Math.PI});
      story.classList.remove("aim" + (i + 1));
    }
  } catch(e){ out.length = 0; }
  story.classList.remove("aim", "aim1", "aim2"); probe.remove();
  return out;
}
/* Ein Feueratem als Ebenen; bt = Sekunden bis der Strahl losgeht */
function storyFire(a, bt){
  const story = document.querySelector("#endDragon .story"); if (!story || !a) return;
  const r = (x, y) => +(x + rnd() * (y - x)).toFixed(1);
  const dot = (cls, k, s, oy) => `<i class="${cls}" style="--j:${k};--oy:${oy};width:${2 * s}px;height:${2 * s}px;margin:${-s}px"></i>`;
  const puffs = Array.from({length:14}, (_, k) => dot("sf-puff", k, r(12,19), r(-34,34))).join("");
  const sparks = Array.from({length:10}, (_, k) => dot("sf-spark", k, r(2.5,4), r(-60,60))).join("");
  const cone = (cls, k, grad) => `<svg class="${cls}" viewBox="0 -54 120 108"><path d="${FB_CONE[k]}" fill="url(#${grad})"/></svg>`;
  const ring = (cls, inner) => `<svg class="${cls}" viewBox="-64 -48 128 96">${inner}</svg>`;
  story.insertAdjacentHTML("beforeend", `<div class="st-fire" style="left:${a.x.toFixed(1)}px;top:${a.y.toFixed(1)}px;--u:${a.u.toFixed(4)};--ang:${a.ang.toFixed(1)}deg;--len:${a.len.toFixed(1)};--k:${(a.len / 100).toFixed(3)};--bt:${bt.toFixed(3)}s">
    <div class="sf-jet"><div class="sf-cone">${cone("sf-outer", 0, "fbOuter")}${cone("sf-mid", 1, "fbMid")}${cone("sf-core", 2, "fbCore")}</div>${puffs}${sparks}</div>
    <div class="sf-ball"><i class="sf-halo"></i>
      ${ring("sf-ring", `<path d="${finTongues(8, 31, 41)}" fill="url(#fbBallOut)" stroke="#F06A3A" stroke-width="2" stroke-linejoin="round"/>`)}
      ${ring("sf-ring2", `<path d="${finTongues(7, 21, 29, .4)}" fill="url(#fbBallMid)"/>`)}
      ${ring("sf-kern", `<ellipse rx="17" ry="14" fill="url(#fbBallCore)"/>`)}</div>
  </div>`);
  const el = story.lastElementChild;
  later(() => el.remove(), (bt + 1.5) * 1000);
}
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
  // Buchstabe: grau → fängt Feuer → Flammen klettern hoch, er glüht und verkohlt, Rauch und Funken → leuchtet bunt
  const burn = [[6,.8,0],[22,1.1,.15],[40,1.25,.05],[56,1,.25],[72,.85,.1],[30,.9,.45],[50,.95,.55]].map(([x,s,d]) =>
    `<div class="st-flame" style="left:${x}%;--s:${s};--d:${d}s">${FIN_FLAME}</div>`).join("");
  const smoke = [0,1,2,3].map(i => `<i style="--i:${i};left:${20 + i * 14}%"></i>`).join("");
  const embers = Array.from({length:10}, (_, i) => `<i style="--i:${i};--x:${r(-40,40)}px;--y:${r(-110,-60)}px;left:${r(15,85)}%"></i>`).join("");
  // nach dem Brand: das verkohlte Schild zerbricht in glühende Brocken, die herunterfallen und zu Asche zerfallen
  const bits = Array.from({length:16}, (_, k) => {
    const cx = k % 4, cy = Math.floor(k / 4);
    return `<i style="left:${cx * 16}px;top:${cy * 16}px;--x:${r(-26,26).toFixed(0)}px;--y:${(70 - cy * 16 + r(-6,10)).toFixed(0)}px;--r:${r(-200,200).toFixed(0)}deg;--d:${(r(0,.25) + (3 - cy) * .05).toFixed(2)}s"></i>`;
  }).join("");
  const letter = (l, cls) => `<div class="st-letter ${cls}"><div class="st-ash"></div><div class="st-post"></div>
    <div class="st-tile off">${l}<div class="st-char"></div><b class="st-hot">${l}</b></div><div class="st-bits">${bits}</div>
    <div class="st-smoke">${smoke}</div><div class="st-burn">${burn}</div><div class="st-embers">${embers}</div></div>`;
  return `<div class="story">
    <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="finFire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FF6A3D"/><stop offset=".55" stop-color="#FFB13B"/><stop offset="1" stop-color="#FFE45C"/></linearGradient></defs>${FIN_BREATH_DEFS}</svg>
    <div class="st-sun"></div><div class="st-cloud c1"></div><div class="st-cloud c2"></div>
    <div class="st-hills"></div>
    <div class="st-strip">${trees}<div class="st-path"></div>${flowers}${letter("G","lg")}${letter("D","ld")}</div>
    <div class="st-fips"><div class="st-lean"><div class="st-walk" id="storyFips"></div></div></div>
    <div class="st-glow g1"></div><div class="st-glow g2"></div>
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
    if (f.key === "story"){
      // die Farbverläufe fürs Feuer stehen schon in der Szene (storyScene)
      el.querySelector(".tilt")?.insertAdjacentHTML("beforeend", STORY_BREATH.map((t, i) => finBreath(i, t, true)).join("") + FIN_CROWN);
    }
  } else {
    stage.innerHTML = `<img class="fin-svg" src="img/fips-tanz.svg?v=${APP_VERSION}" alt="Fips">`;
  }
  finaleFx(f.key);
  show("endOverlay");
  if (f.key === "story"){
    sfxWarm("fire");                         // Rauschen fürs Fauchen jetzt schon berechnen, nicht erst beim Feuer
    const aim = storyAim(), t0 = performance.now(), strip = document.querySelector("#endDragon .st-strip");
    // Wie weit ist die Geschichte? Am genauesten weiß das die Animation selbst (Zeitgeber können sich verspäten)
    const now = () => { try { const t = strip.getAnimations()[0].currentTime; if (t != null) return t / 1000; } catch(e){} return (performance.now() - t0) / 1000; };
    STORY_BREATH.forEach((t, i) => {
      // die Ebenen kommen kurz vor dem Feuer dazu und danach wieder weg – so sind nie unnötig viele da
      later(() => storyFire(aim[i], Math.max(0, t - now())), t * 1000 - 600);
      later(() => sfx("fire"), t * 1000);
    });
  }
  sfx(level >= 2 ? "fanfare" : "right");
}
