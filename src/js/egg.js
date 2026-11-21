/* ================= Easter Egg: Fips' geheime Muffin-Party =================
   Der Weg dorthin führt übers Üben: Bei 10 von 10 oder nach drei gespielten Runden gibt es im Finale
   den Knopf „Zur Muffin-Party“ (partyOffer in game.js).
   Picknick auf der Sommerwiese: Muffins antippen oder zu Fips ziehen → er wird immer runder,
   bis er einen riesigen Feuerstrahl rauslässt (mit Feuerwerk) und wieder normal wird.
   Dazu: Goldmuffins, Schluckauf, Wackelbauch, Zähler und eine kleine Spieluhr-Melodie.
   Ganz selten ist ein Muffin in Wahrheit ein Brokkoli-Muffin (sieht aus wie jeder andere) → Bäh! und Rülpser.
   Die Deko in der Küche wird nach und nach freigeschaltet – durch richtige Antworten im Spiel.
   Geheimnis im Geheimnis: Nach 10 Goldmuffins (über alle Besuche) liegt ein Drachenei im Gras.
   Beim nächsten Besuch lässt es sich aufklopfen – heraus kommt ein Baby-Drache, der ab dann mitfeiert. */
const EGG_FULL = 6;       // so satt → Feuerstrahl
const EGG_SAY = [
  "Hast du Muffins für mich? 🥺",
  "Mmmh, lecker! 😋",
  "Mampf! Noch einen! 🧁",
  "Schmatz! So gut! 😋",
  "Uff … ich werd’ ganz rund! 😮",
  "Mein Bauch blubbert … 😳",
  "Oh oh … gleich kommt’s! 😵"
];
const EGG_GOLD_SAY = ["Ein GOLDMUFFIN! ✨😍", "Wow, der glitzert ja! ✨", "Goldig lecker! ✨🤩"];
const EGG_POKE_SAY = ["Hihi, mein Bauch! 😆", "Boing! 🤭", "Wabbel-wabbel! 😂", "Das kitzelt! 😄"];
const EGG_IDLE_SAY = ["Ich hab noch Hunger! 😋", "Zieh mir einen Muffin her! 🧁", "Mmmh … Muffins … 🤤"];
const EGG_KINDS = [["pink","brown","chips"],["blue","pink","sprinkles"],["yellow","wood","cherry"],["purple","cream","sprinkles"],["leaf","brown","cherry"],["orange","cream","chips"],["red","pink","cherry"]];
const EGG_GOLD = ["gold","gold","stars"];

/* ---------- Feuer je nach Muffin-Sorte: die Sorte, die Fips seit dem letzten Feuer am meisten gegessen hat, färbt es ----------
   Farben: outer = Flammenrand (gelb → rot), mid/core = innen, puff = Feuerbälle (hell → dunkel), spark = Funken */
const EGG_FLAMES = {
  feuer:  {say:"FEUER! 🔥🔥🔥",            outer:["#FFE45C","#FFB13B","#FF7A3D","#E8455F"], mid:["#FFF6C0","#FFD54A","#FF9A3D"], puff:[["#FFFBE0","#FFD54A","#FF8A3D","#E8455F"]], spark:"#FFF3A0", stroke:"#F06A3A", sky:["#FFD54A","#FFB062","#FF88A8"]},
  schoko: {say:"SCHOKO-FEUER! 🍫🔥",       outer:["#FFE0B0","#D9A06A","#A8714A","#6E4429"], mid:["#FFF4E2","#E9C08E","#B98250"], puff:[["#FFF4E2","#D9A06A","#A8714A","#5A3A2E"]], spark:"#FFE8C6", stroke:"#8F5A2B", sky:["#C9946A","#EDBA80","#FFE8C6"]},
  kirsch: {say:"KIRSCH-FEUER! 🍒🔥",       outer:["#FFC2D0","#FF7A8E","#E8455F","#A8243C"], mid:["#FFE6EE","#FF9DB2","#E8455F"], puff:[["#FFE6EE","#FF7A8E","#E8455F","#A8243C"]], spark:"#FFE6EE", stroke:"#C8304C", sky:["#FF7A8E","#E8455F","#FFB3C8"]},
  herz:   {say:"HERZCHEN-FEUER! 💖🔥",     outer:["#FFE6EE","#FFB3C8","#FF88A8","#C9507A"], mid:["#FFF5F8","#FFCCDA","#FF88A8"], puff:[["#FFF5F8","#FFB3C8","#FF88A8","#C9507A"]], spark:"#FFFFFF", stroke:"#E0608A", sky:["#FF88A8","#FFB3C8","#C0A4F0"]},
  blau:   {say:"BLAUBEER-FEUER! 🫐🔥",     outer:["#DCF4FF","#93BFF5","#6295E0","#2F5FA8"], mid:["#F4FBFF","#BDEBFA","#7FB4F0"], puff:[["#F4FBFF","#93BFF5","#6295E0","#2F5FA8"]], spark:"#E3F7FF", stroke:"#4A7FD0", sky:["#93BFF5","#8FD6F5","#C0A4F0"]},
  lila:   {say:"ZAUBER-FEUER! 🔮🔥",       outer:["#EFE5FF","#C0A4F0","#9474D8","#5E449E"], mid:["#FAF6FF","#D9C8F8","#A98AE6"], puff:[["#FAF6FF","#C0A4F0","#9474D8","#5E449E"]], spark:"#FFF3A0", stroke:"#7A5CC4", sky:["#C0A4F0","#FF88A8","#93BFF5"]},
  gruen:  {say:"PISTAZIEN-FEUER! 💚🔥",     outer:["#E9FFD6","#96D965","#66B53C","#3E7D22"], mid:["#F7FFEE","#C8F5A0","#7DD9B4"], puff:[["#F7FFEE","#96D965","#66B53C","#3E7D22"]], spark:"#FFF3A0", stroke:"#55A33A", sky:["#96D965","#7DD9B4","#FFD54A"]},
  gold:   {say:"GOLD-FEUER! ✨🔥✨",       outer:["#FFFBE0","#FFE45C","#FFD54A","#E8A800"], mid:["#FFFFFF","#FFF6BF","#FFD54A"], puff:[["#FFFFFF","#FFF6BF","#FFD54A","#E8A800"]], spark:"#FFFFFF", stroke:"#E8A800", sky:["#FFD54A","#FFF6BF","#FFE45C"]},
  bunt:   {say:"REGENBOGEN-FEUER! 🌈🔥",   outer:["#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FF88A8"], mid:["#FFFFFF","#FFF6C0","#FFB3C8"],
           puff:[["#FFF6C0","#FFD54A","#FFB062","#F28C2E"],["#E9FFF4","#7DD9B4","#55BE96","#2F7D63"],["#DCEBFF","#93BFF5","#6295E0","#2F5FA8"],["#EFE5FF","#C0A4F0","#9474D8","#5E449E"],["#FFE6EE","#FF88A8","#E8455F","#A8243C"]],
           spark:"#FFFFFF", stroke:"#C0A4F0", sky:["#FF88A8","#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FFB062"]}
};
const EGG_DECO_FLAME = {chips:"schoko", cherry:"kirsch", sprinkles:"bunt", stars:"gold"};
const EGG_KIND_FLAME = {bunt:"bunt", schoko:"schoko", stern:"gold", herz:"herz", kirsche:"kirsch", punkte:"bunt", blume:"herz", perle:"blau", kerze:"feuer"};
const EGG_TOP_FLAME  = {brown:"schoko", pink:"herz", blue:"blau", purple:"lila", wood:"feuer", cream:"feuer", yellow:"gold", leaf:"gruen", red:"kirsch", orange:"feuer", white:"feuer"};
let eggFlavors = [];   // Sorten seit dem letzten Feuer (die neueste zuletzt)
/* Selbst verzierte Muffins: die meiste Deko zählt; ohne Deko die Farbe vom Guss */
function eggCustomFlavor(m){
  const n = {}; m.items.forEach(i => n[i.t] = (n[i.t] || 0) + (i.t === "kirsche" || i.t === "kerze" ? 12 : i.t === "herz" || i.t === "stern" || i.t === "blume" ? 2 : 1));
  const best = Object.keys(n).sort((a, b) => n[b] - n[a])[0];
  return best ? EGG_KIND_FLAME[best] : EGG_TOP_FLAME[m.top] || "feuer";
}
/* Meiste Sorte gewinnt; bei Gleichstand die, die Fips zuletzt gegessen hat */
function eggFlameKind(){
  const n = {}; let best = "feuer", bestN = 0;
  eggFlavors.forEach(f => { n[f] = (n[f] || 0) + 1; if (n[f] >= bestN){ bestN = n[f]; best = f; } });
  return EGG_FLAMES[best] ? best : "feuer";
}
function eggFlameDefs(k){
  const t = EGG_FLAMES[k], id = "egF-" + k;
  const stops = (cs, ops = []) => cs.map((c, i) => `<stop offset="${(i / (cs.length - 1)).toFixed(2)}" stop-color="${c}"${ops[i] != null ? ` stop-opacity="${ops[i]}"` : ""}/>`).join("");
  const o = t.outer, last = o.length - 1;
  return `<defs>
    <linearGradient id="${id}-o" x1="0" y1="0" x2="1" y2="0">${stops(o, o.map((_, i) => i === last ? .6 : null))}</linearGradient>
    <linearGradient id="${id}-m" x1="0" y1="0" x2="1" y2="0">${stops(t.mid, [null, null, .8])}</linearGradient>
    <linearGradient id="${id}-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="${t.mid[0]}"/><stop offset="1" stop-color="${t.mid[1]}" stop-opacity="0"/></linearGradient>
    <radialGradient id="${id}-h" cx=".5" cy=".5" r=".5"><stop offset=".4" stop-color="${o[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${o[2]}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-bo" cx=".5" cy=".5" r=".5"><stop offset=".35" stop-color="${o[0]}"/><stop offset=".75" stop-color="${o[Math.min(2, last)]}"/><stop offset="1" stop-color="${o[last]}"/></radialGradient>
    <radialGradient id="${id}-bm" cx=".5" cy=".5" r=".5"><stop offset=".2" stop-color="${t.mid[0]}"/><stop offset="1" stop-color="${t.mid[1]}"/></radialGradient>
    <radialGradient id="${id}-bc" cx=".45" cy=".45" r=".55"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="${t.mid[0]}"/><stop offset="1" stop-color="${t.mid[1]}"/></radialGradient>
    <radialGradient id="${id}-g" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="${t.mid[1]}"/><stop offset="1" stop-color="${o[2]}"/></radialGradient>
  </defs>`;
}
/* den eben eingesetzten Feueratem umfärben */
function eggColorFlame(svg, fb, k){
  const t = EGG_FLAMES[k], id = "egF-" + k, u = s => `url(#${id}-${s})`;
  if (!document.getElementById(id + "-o")) svg.insertAdjacentHTML("afterbegin", eggFlameDefs(k));
  fb.style.setProperty("--fbo", u("o")); fb.style.setProperty("--fbm", u("m")); fb.style.setProperty("--fbc", u("c")); fb.style.setProperty("--fbs", t.spark);
  fb.querySelectorAll(".fb-puff").forEach((c, i) => t.puff[i % t.puff.length].forEach((col, j) => c.style.setProperty("--fp" + (j + 1), col)));
  const set = (sel, a, v) => { const e = fb.querySelector(sel); e && e.setAttribute(a, v); };
  set(".fb-halo", "fill", u("h")); set(".fb-ring", "fill", u("bo")); set(".fb-ring", "stroke", t.stroke); set(".fb-ring2", "fill", u("bm"));
  set(".fb-ball ellipse", "fill", u("bc")); set(".fb-mouth ellipse", "fill", u("g"));
}

function muffinSvg([cup, top, deco]){
  const decos = {
    chips: `<g fill="#4A2E3A"><circle cx="20" cy="22" r="2.2"/><circle cx="31" cy="17" r="2.2"/><circle cx="40" cy="24" r="2.2"/><circle cx="26" cy="27" r="1.8"/><circle cx="36" cy="14" r="1.6"/></g>`,
    sprinkles: `<g stroke-width="2.6" stroke-linecap="round"><path d="M18 22 l4 -2" stroke="#FFD54A"/><path d="M28 16 l3 3" stroke="#7DD9B4"/><path d="M38 21 l4 1" stroke="#93BFF5"/><path d="M24 28 l3 -2" stroke="#FF88A8"/><path d="M34 27 l-2 3" stroke="#FFD54A"/><path d="M32 12 l-3 1" stroke="#FF88A8"/></g>`,
    cherry: `<path d="M30 8 Q32 1 38 0" fill="none" stroke="#3E7D22" stroke-width="2"/><circle cx="30" cy="9" r="5.5" fill="url(#pg-red)" stroke="#A8243C" stroke-width="2"/><ellipse cx="28" cy="7" rx="1.6" ry="1.1" fill="#fff" opacity=".8"/>`,
    stars: `<g fill="#fff"><path d="M30 4 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z"/><path d="M18 20 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z"/><path d="M41 22 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1z"/></g>`
  };
  return `<svg viewBox="0 0 60 60"><g stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 31 L48 31 L44 55 Q30 58 16 55 Z" ${pf(cup)}/>
    <path d="M21 32 L22 55 M30 32 V56 M39 32 L38 55" stroke="${pln(cup)}" stroke-width="1.8" fill="none"/>
    <path d="M8 33 Q5 12 30 9 Q55 12 52 33 Q46 37 40 33 Q35 38 30 33 Q25 38 20 33 Q14 37 8 33 Z" ${pf(top)}/>
    ${decos[deco]}
    <ellipse cx="18" cy="18" rx="5" ry="2.5" transform="rotate(-30 18 18)" fill="#fff" opacity=".55"/>
  </g></svg>`;
}

/* ---------- Muffin-Küche: selbst verzieren ---------- */
const K_CUPS = ["pink","blue","yellow","purple","leaf","orange"];
const K_TOPS = ["brown","pink","cream","wood","blue","purple"];
/* Am großen Bildschirm (Desktop) gibt es mehr Auswahl – auf dem Handy bleiben diese Knöpfe ausgeblendet (.k-more) */
const K_CUPS_MORE = ["red","green","water","gold","white"];
const K_TOPS_MORE = ["yellow","leaf","red","orange","white"];
const K_KINDS = [
  {k:"bunt",   label:"Bunt",    icon:"🌈"},
  {k:"schoko", label:"Schoko",  icon:"🍫"},
  {k:"stern",  label:"Sterne",  icon:"⭐"},
  {k:"herz",   label:"Herzen",         icon:"💗"},
  {k:"kirsche",label:"Kirsche",        icon:"🍒"},
  {k:"punkte", label:"Linsen",  icon:`<svg class="k-ico" viewBox="0 0 28 28">${[[8,9,"#E8455F"],[19,8,"#FFD54A"],[14,15,"#6295E0"],[7,20,"#55BE96"],[20,20,"#9474D8"]].map(([x,y,c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}"/><circle cx="${x - 1.6}" cy="${y - 1.7}" r="1.4" fill="#fff" opacity=".7"/>`).join("")}</svg>`, more:true},
  {k:"blume",  label:"Blumen",  icon:"🌼", more:true},
  {k:"perle",  label:"Perlen",  icon:"⚪", more:true},
  {k:"kerze",  label:"Kerze",   icon:"🕯️", more:true}
];
/* ---------- Freischalten durch Üben: so viele richtige Antworten (insgesamt) braucht es für eine Deko ----------
   Gezählt wird der höchste je erreichte Stand – setzen Eltern den Fortschritt zurück, bleibt die Deko trotzdem. */
const K_UNLOCK = {stern: 10, herz: 20, kirsche: 35, punkte: 50, blume: 70, perle: 90, kerze: 120};
const K_SMALL = "(width < 900px),(height < 600px)";   // wie in style.css: dort sind die Zusatz-Knöpfe (.k-more) ausgeblendet
function eggStars(){
  const now = Object.values(STATS).reduce((a, s) => a + (s.ok || 0), 0);
  const best = Math.max(now, +load("eggStars", 0) || 0);
  if (best !== +load("eggStars", 0)) save("eggStars", best);
  return best;
}
function kLocked(k, stars = eggStars()){ return (K_UNLOCK[k] || 0) > stars; }
/* Freigeschaltete Deko, die das Kind noch nicht gesehen hat (auf dem Handy nur die, die es dort auch gibt) */
function kFresh(){
  const stars = eggStars(), seen = load("eggSeen", []), small = matchMedia(K_SMALL).matches;
  return K_KINDS.filter(k => K_UNLOCK[k.k] && !kLocked(k.k, stars) && !seen.includes(k.k) && !(small && k.more));
}
let kFreshNow = [];   // beim Öffnen der Küche „NEU“ markiert
function kKindsRender(){
  const stars = eggStars();
  $("kKinds").innerHTML = K_KINDS.map(k => {
    const lock = kLocked(k.k, stars), cls = [k.more && "k-more", lock && "locked", kFreshNow.includes(k.k) && "fresh"].filter(Boolean).join(" ");
    return `<button data-v="${k.k}"${cls ? ` class="${cls}"` : ""} aria-label="${k.label}${lock ? " (noch gesperrt)" : ""}"><span>${k.icon}</span><small>${lock ? `🔒 ${K_UNLOCK[k.k] - stars}` : k.label}</small></button>`;
  }).join("");
}
let kHintTimer = null;
function kHint(text, html){
  const h = $("kHint"); clearTimeout(kHintTimer);
  if (html){ h.innerHTML = html; h.setAttribute("aria-label", text); } else h.textContent = text;
  h.classList.add("say");
  kHintTimer = setTimeout(() => { h.textContent = h.dataset.def; h.removeAttribute("aria-label"); h.classList.remove("say"); }, 4500);
}
let kHist = [];   // Schnappschüsse für „Rückgängig“
let kMuffin = null, kKind = "bunt";
function kItem(it){
  const {t, x, y, r, c} = it;
  if (t === "bunt" || t === "schoko") return `<rect x="${x - 2.2}" y="${y - .8}" width="4.4" height="1.6" rx=".8" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`;
  if (t === "stern") return `<path transform="translate(${x} ${y}) rotate(${r}) scale(.55)" d="M0 -5 L1.4 -1.6 5 -1.5 2.2 .9 3.1 4.6 0 2.5 -3.1 4.6 -2.2 .9 -5 -1.5 -1.4 -1.6 Z" fill="${c}" stroke="#A87500" stroke-width=".6"/>`;
  if (t === "punkte") return `<g><circle cx="${x}" cy="${y}" r="1.7" fill="${c}"/><circle cx="${x - .5}" cy="${y - .55}" r=".5" fill="#fff" opacity=".7"/></g>`;
  if (t === "perle") return `<g><circle cx="${x}" cy="${y}" r="1.15" fill="#E9EEF6" stroke="#AEB7C6" stroke-width=".35"/><circle cx="${x - .35}" cy="${y - .4}" r=".35" fill="#fff"/></g>`;
  if (t === "blume") return `<g transform="translate(${x} ${y}) rotate(${r})">${[0,72,144,216,288].map(a => `<ellipse rx="1.5" ry="2.3" cy="-2" transform="rotate(${a})" fill="${c}"/>`).join("")}<circle r="1.3" fill="#FFD54A"/></g>`;
  if (t === "kerze") return `<g transform="translate(${x} ${y}) scale(.75)"><rect x="-2.2" y="-15" width="4.4" height="15" rx="1.2" fill="#FFF6F8" stroke="#E86A8E" stroke-width=".8"/><path d="M-2.2 -11 L2.2 -13.5 M-2.2 -6 L2.2 -8.5 M-2.2 -1 L2.2 -3.5" stroke="#FF88A8" stroke-width="1.2"/><path d="M0 -15 V-17" stroke="#4A2E3A" stroke-width=".7"/><path class="k-flame" d="M0 -23.5 Q3 -19.5 0 -16.8 Q-3 -19.5 0 -23.5 Z" fill="#FFB13B"/><path d="M0 -21.5 Q1.4 -19 0 -17.6 Q-1.4 -19 0 -21.5 Z" fill="#FFF6C0"/></g>`;
  if (t === "herz") return `<path transform="translate(${x} ${y}) rotate(${r}) scale(.5)" d="M0 4 C-7 -1 -5 -7 0 -3 C5 -7 7 -1 0 4 Z" fill="${c}"/>`;
  return `<g transform="translate(${x} ${y})"><path d="M0 -4 Q2 -10 7 -11" fill="none" stroke="#3E7D22" stroke-width="1.6"/><circle r="4.5" fill="url(#pg-red)" stroke="#A8243C" stroke-width="1.5"/><ellipse cx="-1.5" cy="-1.6" rx="1.3" ry=".9" fill="#fff" opacity=".8"/></g>`;
}
function customMuffinSvg(m){
  return `<svg viewBox="0 0 60 60"><g stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 31 L48 31 L44 55 Q30 58 16 55 Z" ${pf(m.cup)}/>
    <path d="M21 32 L22 55 M30 32 V56 M39 32 L38 55" stroke="${pln(m.cup)}" stroke-width="1.8" fill="none"/>
    <path class="k-top" d="M8 33 Q5 12 30 9 Q55 12 52 33 Q46 37 40 33 Q35 38 30 33 Q25 38 20 33 Q14 37 8 33 Z" ${pf(m.top)}/>
    <ellipse cx="18" cy="18" rx="5" ry="2.5" transform="rotate(-30 18 18)" fill="#fff" opacity=".55"/>
    <g stroke="none">${m.items.filter(i => i.t !== "kirsche" && i.t !== "kerze").map(kItem).join("")}${m.items.filter(i => i.t === "kirsche" || i.t === "kerze").map(kItem).join("")}</g>
  </g></svg>`;
}
function kRender(){
  $("kMuffin").innerHTML = customMuffinSvg(kMuffin);
  document.querySelectorAll("#kCups button").forEach(b => b.classList.toggle("on", b.dataset.v === kMuffin.cup));
  document.querySelectorAll("#kTops button").forEach(b => b.classList.toggle("on", b.dataset.v === kMuffin.top));
  document.querySelectorAll("#kKinds button").forEach(b => b.classList.toggle("on", b.dataset.v === kKind));
  $("kUndo").disabled = !kHist.length; $("kWipe").disabled = !kMuffin.items.length;
}
function kNew(){ kMuffin = {cup: pick(K_CUPS), top: pick(K_TOPS), items: []}; kHist = []; kRender(); }
function kSnap(){ kHist.push({cup: kMuffin.cup, top: kMuffin.top, items: kMuffin.items.slice()}); if (kHist.length > 40) kHist.shift(); }
function kUndo(){ const h = kHist.pop(); if (!h) return; kMuffin = h; kRender(); sfx("hic"); }
function kWipe(){ if (!kMuffin.items.length) return; kSnap(); kMuffin.items = []; kRender(); sfx("whoosh"); }
/* Streusel rieseln an die angetippte Stelle – aber nur auf den Guss */
function kSprinkle(ev){
  const svg = $("kMuffin").querySelector("svg"), top = svg && svg.querySelector(".k-top");
  if (!top) return;
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(svg.getScreenCTM().inverse());
  const n = kKind === "kirsche" || kKind === "kerze" || kKind === "blume" || kKind === "perle" ? 1 : kKind === "herz" || kKind === "stern" || kKind === "punkte" ? 2 : 4;
  if (kKind === "kirsche" && kMuffin.items.filter(i => i.t === "kirsche").length >= 3) return;
  let added = 0;
  for (let i = 0; i < n * 3 && added < n; i++){
    const x = p.x + (n > 1 ? rnd() * 10 - 5 : 0);
    // die Kerze ragt nach oben – ganz oben angetippt rutscht sie ein Stück tiefer, damit die Flamme nicht abgeschnitten wird
    const y = kKind === "kerze" ? Math.max(p.y, 19) : p.y + (n > 1 ? rnd() * 7 - 3.5 : 0);
    const pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
    if (!top.isPointInFill(pt) || y > 31) continue;
    const c = kKind === "bunt" ? pick(["#FF88A8","#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FFB062"])
            : kKind === "schoko" ? pick(["#4A2E3A","#6E4429","#5A3A2E"])
            : kKind === "stern" ? pick(["#FFE45C","#FFF6C0","#FFD54A"]) : kKind === "herz" ? pick(["#FF88A8","#E8455F","#FFB3C8"])
            : kKind === "punkte" ? pick(["#E8455F","#FFB062","#FFD54A","#55BE96","#6295E0","#9474D8"])
            : kKind === "blume" ? pick(["#FFFFFF","#FFB3C8","#C0A4F0","#93BFF5"]) : "";
    kMuffin.items.push({t: kKind, x: +x.toFixed(1), y: +y.toFixed(1), r: Math.round(rnd() * 180), c});
    added++;
  }
  if (added && kKind === "kerze"){ const last = kMuffin.items[kMuffin.items.length - 1]; kMuffin.items = kMuffin.items.filter(i => i.t !== "kerze" || i === last); }   // nur eine Kerze – sie zieht um
  // erst ab 600 Teilchen verschwinden die ältesten Streusel wieder – Kirschen und Kerze bleiben immer
  let over = kMuffin.items.length - 600;
  if (over > 0) kMuffin.items = kMuffin.items.filter(i => i.t === "kirsche" || i.t === "kerze" || over-- <= 0);
  if (added){ kRender(); sfx("sprinkle"); }
  return added;
}
function kInit(){
  const sw = (list, more, what) => list.concat(more).map((c, i) => `<button data-v="${c}"${i >= list.length ? ' class="k-more"' : ""} style="--c:${PIC_PAL[c][1]};--b:${PIC_PAL[c][3]}" aria-label="${what} ${c}"></button>`).join("");
  $("kCups").innerHTML = sw(K_CUPS, K_CUPS_MORE, "Förmchen");
  $("kTops").innerHTML = sw(K_TOPS, K_TOPS_MORE, "Guss");
  $("kHint").dataset.def = $("kHint").textContent;
  kKindsRender();
  $("kCups").addEventListener("click", e => { const b = e.target.closest("button"); if (b && b.dataset.v !== kMuffin.cup){ kSnap(); kMuffin.cup = b.dataset.v; kRender(); sfx("hic"); } });
  $("kTops").addEventListener("click", e => { const b = e.target.closest("button"); if (b && b.dataset.v !== kMuffin.top){ kSnap(); kMuffin.top = b.dataset.v; kRender(); sfx("hic"); } });
  $("kUndo").addEventListener("click", kUndo);
  $("kWipe").addEventListener("click", kWipe);
  document.addEventListener("keydown", e => {
    if ($("eggKitchen").classList.contains("hidden")) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z"){ e.preventDefault(); kUndo(); }
  });
  $("kKinds").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const k = K_KINDS.find(x => x.k === b.dataset.v), need = K_UNLOCK[k.k] - eggStars();
    if (need > 0){
      sfx("boing"); b.classList.remove("nope"); void b.offsetWidth; b.classList.add("nope");
      // für Kinder, die noch nicht lesen: 🎧 ✅ ×7 ➜ 🍒 (= noch 7 richtige Antworten im Spiel, dann gibt’s Kirschen)
      kHint(`${k.label} gibt’s nach ${need} ${need === 1 ? "richtigen Antwort" : "richtigen Antworten"} mehr im G-oder-D-Spiel.`,
        `<span class="k-lockpic" aria-hidden="true"><span>🎧</span><span>✅</span><b>×${need}</b><i>➜</i><span>${k.icon}</span></span>`);
      return;
    }
    b.classList.remove("fresh");
    kKind = k.k; kRender();
  });
  // Berührungen gehen an eine feste, unsichtbare Fläche über dem Muffin – der Muffin selbst wird bei jedem Streusel
  // neu gezeichnet; läge der Finger auf einem Element, das dabei verschwindet, würde Safari den Tipp als Zoom deuten
  let down = false, last = 0;
  const box = $("kTouch");
  box.addEventListener("pointerdown", e => { down = true; box.setPointerCapture(e.pointerId); kSnap(); if (!kSprinkle(e)) kHist.pop(); else kRender(); });
  box.addEventListener("pointermove", e => { if (down && Date.now() - last > 60){ last = Date.now(); kSprinkle(e); } });
  ["pointerup","pointercancel"].forEach(t => box.addEventListener(t, () => down = false));
  $("kNew").addEventListener("click", kNew);
  $("kDone").addEventListener("click", kDone);
  $("kOpen").addEventListener("click", kOpen);
  $("fOpen").addEventListener("click", fOpen);
  $("kClose").addEventListener("click", () => { $("eggKitchen").classList.add("hidden"); eggT(eggHowtoShow, 300); });
}
function kOpen(){
  if (eggBusy) return;
  eggHowtoHide();
  // neu freigeschaltete Deko bekommt diesmal ein „NEU“ – danach gilt sie als gesehen
  kFreshNow = kFresh().map(k => k.k);
  if (kFreshNow.length) save("eggSeen", load("eggSeen", []).concat(kFreshNow));
  $("kOpen").classList.remove("fresh");
  if (kLocked(kKind)) kKind = "bunt";
  kKindsRender();
  if (!kMuffin) kNew(); else kRender();
  $("eggKitchen").classList.remove("hidden"); sfx("whoosh");
}
/* Fertig: der selbst verzierte Muffin kommt auf den Teller (vorne) */
function kDone(){
  const btn = $("eggTray").querySelector(".egg-muffin");
  btn.dataset.gold = ""; btn.dataset.veg = ""; btn.dataset.custom = JSON.stringify(kMuffin); btn.dataset.flavor = eggCustomFlavor(kMuffin);
  btn.classList.remove("golden"); btn.classList.add("custom");
  btn.innerHTML = customMuffinSvg(kMuffin);
  btn.style.animation = "none"; void btn.offsetWidth; btn.style.animation = "";
  $("eggKitchen").classList.add("hidden");
  kMuffin = null;
  eggSay("Oh! Hast du den für mich verziert? 😍");
  eggT(eggHowtoShow, 300);
  sfx("right");
}

/* ---------- Muffin-Fabrik: zweite Möglichkeit neben der Küche ----------
   Die Fabrik ist eine eigene Seite (muffin-fabrik.html) und läuft hier eingebettet. Am Ende schickt sie die
   gebackenen Muffins zurück – die kommen auf den Teller, vorn angefangen. */
function fIsOpen(){ const f = $("eggFactory"); return !!f && !f.classList.contains("hidden"); }
function fOpen(){
  if (eggBusy) return;
  eggHowtoHide(); eggMusic(false);
  const f = $("eggFactory");
  f.innerHTML = `<iframe src="muffin-fabrik.html?embed=1&stars=${eggStars()}&v=${APP_VERSION}" title="Muffin-Fabrik"></iframe>
    <button class="close-x f-close" id="fClose" aria-label="Fabrik schließen">✕</button>`;
  $("fClose").addEventListener("click", () => fClose());
  f.classList.remove("hidden"); sfx("whoosh");
}
function fClose(quiet){
  const f = $("eggFactory"); if (!f || f.classList.contains("hidden")) return;
  f.classList.add("hidden"); f.innerHTML = "";
  if (!quiet){ eggLastAct = Date.now(); eggT(() => eggMusic(true), 400); eggT(eggHowtoShow, 500); }
}
window.addEventListener("message", e => {
  if (e.origin !== location.origin || !e.data || e.data.type !== "muffin-fabrik" || !fIsOpen()) return;
  const list = (e.data.muffins || []).filter(m => m && typeof m.svg === "string" && /^<svg /.test(m.svg));
  fClose();
  const btns = $("eggTray").querySelectorAll(".egg-muffin");
  list.slice(0, btns.length).forEach((m, i) => {
    const b = btns[i];
    b.dataset.gold = ""; b.dataset.veg = ""; b.dataset.custom = "fabrik";
    b.dataset.flavor = eggCustomFlavor({items: (m.items || []).filter(x => x && typeof x.t === "string"), top: m.top});
    b.classList.remove("golden", "gone"); b.classList.add("custom");
    b.innerHTML = m.svg;
    b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
  });
  if (list.length){ eggSay(list.some(m => m.big) ? "Ein RIESEN-Muffin?! 😍 Frisch aus der Fabrik!" : "Mmmh! Frisch aus der Fabrik! 😍"); sfx("right"); }
});

/* ---------- Bühne: Sommerwiese mit Picknick ---------- */
function eggScene(){
  const r = (a, b) => a + rnd() * (b - a);
  const flagCols = ["#FF88A8","#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FFB062"];
  // Wimpelkette: Schnur als Bogen, Wimpel hängen daran
  const flags = Array.from({length:13}, (_, i) => {
    const x = 4 + i * 7.6, y = 6 + Math.sin(i / 12 * Math.PI) * 9;
    return `<g class="eg-flag" style="--i:${i}" transform="translate(${x} ${y})"><path d="M-3 0 L3 0 L0 7 Z" fill="${flagCols[i % flagCols.length]}" stroke="rgba(59,44,90,.25)" stroke-width=".4"/></g>`;
  }).join("");
  // Lichterkette etwas tiefer
  const bulbs = Array.from({length:16}, (_, i) => {
    const x = 2 + i * 6.4, y = 14 + Math.sin(i / 15 * Math.PI) * 9;
    return `<circle class="eg-bulb" style="--i:${i}" cx="${x}" cy="${y + 1.6}" r="1.3" fill="${flagCols[(i + 2) % flagCols.length]}"/>`;
  }).join("");
  const flowers = Array.from({length:18}, (_, i) =>
    `<div class="eg-flower" style="left:${(i * 5.6 + r(0, 3)).toFixed(1)}%;bottom:${r(2, 22).toFixed(0)}%;--s:${r(.7, 1.2).toFixed(2)}">${FIN_FLOWER(pick(["#FF88A8","#C0A4F0","#FFB062","#93BFF5","#FFD54A"]))}</div>`).join("");
  const bfly = c => `<svg viewBox="-12 -10 24 20"><g class="eg-wings"><ellipse cx="-5" cy="-3" rx="6" ry="5" fill="${c}" stroke="rgba(59,44,90,.35)" stroke-width=".8"/><ellipse cx="5" cy="-3" rx="6" ry="5" fill="${c}" stroke="rgba(59,44,90,.35)" stroke-width=".8"/>
    <ellipse cx="-4" cy="4" rx="4" ry="3.5" fill="${c}" opacity=".85"/><ellipse cx="4" cy="4" rx="4" ry="3.5" fill="${c}" opacity=".85"/></g><rect x="-1" y="-6" width="2" height="12" rx="1" fill="#5E5088"/></svg>`;
  return `
    <div class="eg-sun"><i></i></div>
    <div class="eg-cloud c1"></div><div class="eg-cloud c2"></div><div class="eg-cloud c3"></div>
    <svg class="eg-garland" viewBox="0 0 100 26" preserveAspectRatio="none">
      <path d="M0 6 Q50 24 100 6" fill="none" stroke="#B9A9D9" stroke-width=".5"/>
      <path d="M0 14 Q50 32 100 14" fill="none" stroke="#B9A9D9" stroke-width=".35"/>
      ${flags}${bulbs}
    </svg>
    <div class="eg-hills"></div>
    <div class="eg-meadow">${flowers}</div>
    <div class="eg-bfly b1">${bfly("#FFB3C8")}</div>
    <div class="eg-bfly b2">${bfly("#C0A4F0")}</div>
    <div class="eg-bfly b3">${bfly("#FFD54A")}</div>
    <div class="eg-sky" id="eggSky"></div>`;
}

/* ---------- Zustand ---------- */
let eggFat = 0, eggBusy = false, eggEaten = 0, eggFires = 0, eggLastAct = 0, eggIdleTimer = null;
let eggMusicOn = true, eggMusicTimer = null;
/* Alle Ablauf-Timer der Party laufen über eggT – so lassen sie sich beim Sperren des Handys gemeinsam abbrechen */
let eggTimers = new Set(), eggDragEnd = null, eggGen = 0;   // eggGen zählt hoch, sobald alles abgebrochen wird
function eggT(fn, ms){
  const id = setTimeout(() => { eggTimers.delete(id); fn(); }, ms);
  eggTimers.add(id); return id;
}
/* Animation fertig → fn. Auch wenn der Browser die Animation abbricht (z. B. Handy gesperrt)
   oder sie hängen bleibt: fn läuft garantiert genau einmal, sonst bliebe Fips für immer „beschäftigt“. */
function eggAnimDone(anim, ms, fn){
  let done = false; const gen = eggGen;
  const go = () => { if (!done && gen === eggGen){ done = true; fn(); } };
  anim.finished.then(go, go);
  eggT(go, ms + 400);
}
try { eggMusicOn = localStorage.getItem("eggMusic") !== "off"; } catch(e){}

function eggSay(text){
  const b = $("eggBubble"); b.textContent = text;
  b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
}
function eggMeter(){
  $("eggMeter").innerHTML = Array.from({length: EGG_FULL}, (_, i) => `<i class="${i < eggFat ? "on" : ""}"></i>`).join("");
  $("eggEaten").textContent = eggEaten;
  $("eggFires").textContent = eggFires;
}
function eggApplyFat(){
  $("eggFips").style.setProperty("--fat", eggFat);
  $("eggFips").classList.toggle("full", eggFat >= EGG_FULL - 1);
  eggMeter();
}
function eggPlay(cls, ms){
  const f = $("eggFips"); f.classList.remove(cls); void f.offsetWidth; f.classList.add(cls);
  setTimeout(() => f.classList.remove(cls), ms);
}

/* Teller: jeder Platz bekommt zufällig einen Muffin, ab und zu einen goldenen */
function eggFill(btn){
  btn.dataset.custom = ""; btn.classList.remove("custom");
  const gold = rnd() < .16;
  btn.dataset.gold = gold ? "1" : "";
  btn.classList.toggle("golden", gold);
  btn.dataset.veg = !gold && rnd() < .07 ? "1" : "";      // Überraschung: sieht aus wie jeder andere Muffin …
  const kind = gold ? EGG_GOLD : pick(EGG_KINDS);
  btn.dataset.flavor = EGG_DECO_FLAME[kind[2]] || "feuer";
  btn.innerHTML = muffinSvg(kind);
}
function eggTray(){
  $("eggTray").innerHTML = Array.from({length:5}, (_, i) => `<button class="egg-muffin" aria-label="Muffin für Fips"></button>`).join("");
  $("eggTray").querySelectorAll(".egg-muffin").forEach(b => { eggFill(b); eggDrag(b); });
}

/* Wo ist Fips' Maul gerade auf dem Bildschirm? */
function eggMouth(){
  const svg = $("eggFips").querySelector("svg"), head = svg && svg.querySelector(".tilt");
  try { if (head && head.getScreenCTM) return new DOMPoint(200, 232).matrixTransform(head.getScreenCTM()); } catch(e){}
  const r = $("eggFips").getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * .58 };
}

/* ---------- Erster Besuch: eine Hand zeigt, wie man Fips füttert ----------
   Ein Muffin gleitet (halb durchsichtig) mit dem Finger vom Teller zu Fips' Maul – so lange, bis das Kind das erste Mal füttert. */
let eggHowtoAnims = [];
function eggHowtoHide(){
  eggHowtoAnims.forEach(a => a.cancel()); eggHowtoAnims = [];
  document.querySelectorAll(".egg-howto").forEach(e => e.remove());
}
function eggHowtoShow(){
  eggHowtoHide();
  if (load("eggFed", false) || !eggOpen() || eggBusy || !$("eggKitchen").classList.contains("hidden") || fIsOpen()) return;
  const btn = $("eggTray").querySelectorAll(".egg-muffin")[1]; if (!btn) return;
  const r = btn.getBoundingClientRect(), m = eggMouth();
  const sx = r.left + r.width / 2, sy = r.top + r.height / 2, mx = m.x - 6, my = m.y + 10;
  const cx = Math.min(sx, mx) - 90, cy = (sy + my) / 2;
  const el = document.createElement("div"); el.className = "egg-howto"; el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<svg><path d="M${sx} ${sy - 12} Q${cx} ${cy} ${mx} ${my + 16}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round" opacity=".9"/></svg>
    <div class="ht-ghost">${btn.innerHTML}</div><div class="ht-hand">👆</div>`;
  $("eggOverlay").appendChild(el);
  // Punkte auf der Kurve (quadratische Bézierkurve) für die Bewegung
  const pt = t => [(1 - t) ** 2 * sx + 2 * (1 - t) * t * cx + t * t * mx, (1 - t) ** 2 * sy + 2 * (1 - t) * t * cy + t * t * my];
  const steps = [0, .15, .3, .45, .6, .75, .9, 1];
  const frames = (dx, dy, extra = {}) => [
    {transform: `translate(${sx + dx}px,${sy + dy}px)`, opacity: 0, offset: 0},
    {transform: `translate(${sx + dx}px,${sy + dy}px)`, opacity: 1, offset: .12},
    ...steps.map((t, i) => { const [x, y] = pt(t); return {transform: `translate(${x + dx}px,${y + dy}px)`, opacity: 1, offset: .2 + i / (steps.length - 1) * .6}; }),
    {transform: `translate(${mx + dx}px,${my + dy}px) scale(.6)`, opacity: 0, offset: 1}];
  const opt = {duration: 2600, iterations: Infinity, easing: "ease-in-out"};
  eggHowtoAnims = [el.querySelector(".ht-ghost").animate(frames(0, 0), opt), el.querySelector(".ht-hand").animate(frames(4, 4), opt)];
}
window.addEventListener("resize", () => { if (document.querySelector(".egg-howto")) eggHowtoShow(); });

/* ---------- Muffin antippen oder ziehen ---------- */
function eggDrag(btn){
  btn.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); eggFeed(btn); } });
  btn.addEventListener("pointerdown", e => {
    if (eggBusy || btn.classList.contains("gone")) return;
    e.preventDefault();
    const r0 = btn.getBoundingClientRect(), sx = e.clientX, sy = e.clientY;
    let ghost = null;
    const end = () => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", cancel);
      eggDragEnd = null;
    };
    // abgebrochen (Anruf, Handy gesperrt …): Muffin einfach zurück auf den Teller
    const cancel = () => {
      end();
      if (ghost){ ghost.remove(); ghost = null; }
      btn.classList.remove("gone"); $("eggFips").classList.remove("hungry");
    };
    const move = ev => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (!ghost && Math.hypot(dx, dy) > 8){
        ghost = btn.cloneNode(true); ghost.className = "egg-fly dragging";
        ghost.style.cssText = `left:${r0.left}px;top:${r0.top}px;width:${r0.width}px;height:${r0.height}px`;
        document.body.appendChild(ghost); btn.classList.add("gone");
      }
      if (ghost){
        ghost.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * .15}deg) scale(1.15)`;
        const m = eggMouth(), d = Math.hypot(r0.left + r0.width / 2 + dx - m.x, r0.top + r0.height / 2 + dy - m.y);
        $("eggFips").classList.toggle("hungry", d < 150);
      }
    };
    const up = ev => {
      end();
      if (!ghost){ eggFeed(btn); return; }               // nur angetippt
      const m = eggMouth(), gr = ghost.getBoundingClientRect();
      const cx = gr.left + gr.width / 2, cy = gr.top + gr.height / 2;
      if (Math.hypot(cx - m.x, cy - m.y) < 110){         // nah genug am Maul → happs!
        eggBusy = true;
        const t0 = ghost.style.transform;
        const g = ghost;
        eggAnimDone(g.animate([{ transform: t0 }, { transform: `translate(${ev.clientX - sx + m.x - cx}px,${ev.clientY - sy + m.y - cy}px) scale(.3) rotate(40deg)` }],
          { duration: 220, easing: "ease-in" }), 220, () => { g.remove(); eggEat(btn, m); });
      } else {                                           // zurück auf den Teller
        $("eggFips").classList.remove("hungry");
        const g = ghost;
        eggAnimDone(g.animate([{ transform: g.style.transform }, { transform: "translate(0,0) scale(1)" }], { duration: 300, easing: "cubic-bezier(.3,1.4,.5,1)" }),
          300, () => { g.remove(); btn.classList.remove("gone"); });
      }
    };
    if (eggDragEnd) eggDragEnd();                    // ein alter, nie beendeter Zug darf nicht weiterlaufen
    eggDragEnd = cancel;
    eggHowtoHide();
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", cancel);
  });
}

function eggFeed(btn){
  if (eggBusy || btn.classList.contains("gone")) return;
  eggHowtoHide();
  eggBusy = true;
  const from = btn.getBoundingClientRect(), to = eggMouth();
  const fly = btn.cloneNode(true);
  fly.className = "egg-fly";
  fly.style.cssText = `left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px`;
  document.body.appendChild(fly);
  btn.classList.add("gone");
  const dx = to.x - (from.left + from.width / 2), dy = to.y - (from.top + from.height / 2);
  const anim = fly.animate([
    { transform: "translate(0,0) rotate(0) scale(1)" },
    { transform: `translate(${dx * .5}px,${dy * .5 - 90}px) rotate(200deg) scale(1.1)`, offset: .55 },
    { transform: `translate(${dx}px,${dy}px) rotate(360deg) scale(.35)` }
  ], { duration: 650, easing: "cubic-bezier(.4,0,.6,1)" });
  sfx("whoosh");
  eggT(() => $("eggFips").classList.add("hungry"), 300);   // Maul auf, gleich kommt er!
  eggAnimDone(anim, 650, () => { fly.remove(); eggEat(btn, to); });
}

function eggEat(btn, at){
  if (!load("eggFed", false)) save("eggFed", true);
  eggHowtoHide();
  const gold = btn.dataset.gold === "1", custom = !!btn.dataset.custom;
  const f = $("eggFips");
  f.classList.remove("hungry");
  if (btn.dataset.veg === "1") return eggYuck(btn, at);
  eggFat = Math.min(EGG_FULL, eggFat + (gold ? 2 : 1));
  eggEaten++; eggLastAct = Date.now();
  const fl = btn.dataset.flavor || "feuer";
  eggFlavors.push(fl); if (gold) eggFlavors.push(fl);     // Goldmuffin zählt doppelt (macht auch doppelt satt)
  eggPlay("nom", 450);
  eggPlay("chew", 1350);                                   // kurz kauen …
  bbPlay("hop", 500);                                      // der Kleine freut sich mit
  if (eggDragon.stage === 2 && rnd() < .3) eggT(() => bbSay(pick(["Piep! 😋", "Auch haben! 🥺", "Mjam! 💚"])), 700);
  sfx("nom");
  [.35, .62, .89, 1.16].forEach(d => eggT(() => sfx("chew"), d * 1000));
  eggCrumbs(at, gold);
  eggApplyFat();
  if (custom){ eggSay(pick(["Selbst verziert! Der ist der allerbeste! 🤩", "Mmmh, mit Streuseln! Danke! 💖", "Den hast du gemacht? Sooo lecker! 😍"])); eggPlay("glitter", 1400); setTimeout(() => sfx("right"), 250); }
  else if (gold){ eggSay(pick(EGG_GOLD_SAY)); eggPlay("glitter", 1400); setTimeout(() => sfx("right"), 250); }
  else eggSay(EGG_SAY[Math.min(eggFat, EGG_SAY.length - 1)]);
  eggT(() => { eggFill(btn); btn.classList.remove("gone"); }, 900);   // neuer Muffin auf dem Teller
  if (gold) eggGotGold(eggFat >= EGG_FULL ? 4600 : 1600);
  if (eggFat >= EGG_FULL) eggT(eggFire, 800);
  else eggT(() => { eggBusy = false; }, 250);
}

/* ---------- Überraschung: Brokkoli-Muffin! Bäh – und dann ein grüner Rülpser. Macht nicht satt. ---------- */
function eggYuck(btn, at){
  const f = $("eggFips");
  eggEaten++; eggLastAct = Date.now();
  eggPlay("nom", 450); sfx("nom");
  eggCrumbs(at, false, ["#66B53C","#96D965","#3E7D22","#C8F5A0"]);
  eggMeter();
  eggT(() => {
    f.classList.add("yuck");
    eggSay(pick(["Bäh! Da war ja BROKKOLI drin! 🥦🤢", "Iiih! Ein Brokkoli-Muffin! 🥦😖", "Bääh! Das ist ja Gemüse! 🥦😝"]));
    sfx("yuck");
  }, 350);
  eggT(() => { eggFill(btn); btn.classList.remove("gone"); }, 900);
  eggT(() => {
    eggBurp(eggMouth());
    sfx("burp");
    eggSay(pick(["Ups … ein Brokkoli-Rülpser! 💚😅", "Rüüülps! 'Tschuldigung! 🙊💚", "Hihi … das war der Brokkoli! 💨🥦"]));
  }, 1500);
  eggT(() => { f.classList.remove("yuck"); eggBusy = false; eggLastAct = Date.now(); }, 2300);
}
function eggBurp(p){
  const b = document.createElement("div");
  b.className = "egg-burp";
  b.style.cssText = `left:${p.x}px;top:${p.y}px`;
  b.innerHTML = `<svg viewBox="0 0 120 90"><g fill="#B8EC8E" stroke="#66B53C" stroke-width="3">
    <circle cx="36" cy="52" r="22"/><circle cx="60" cy="36" r="26"/><circle cx="86" cy="52" r="22"/><ellipse cx="60" cy="62" rx="40" ry="18"/></g>
    <ellipse cx="60" cy="56" rx="34" ry="16" fill="#B8EC8E"/><ellipse cx="50" cy="32" rx="9" ry="5" fill="#fff" opacity=".6"/></svg><span>🥦</span>`;
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 1700);
}

function eggCrumbs(p, gold, cols = ["#C9946A","#A8714A","#FFD6BA","#FF88A8"]){
  for (let i = 0; i < (gold ? 16 : 9); i++){
    const c = document.createElement("i");
    c.className = "egg-crumb" + (gold ? " gold" : "");
    c.style.cssText = `left:${p.x}px;top:${p.y}px;--x:${(rnd() * 100 - 50).toFixed(0)}px;--y:${(rnd() * 60 + (gold ? -60 : 20)).toFixed(0)}px;` +
      (gold ? "" : `background:${pick(cols)}`);
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 900);
  }
}

/* ---------- Der große Moment: Bauch grummelt, Fips wird rot – FEUER – Feuerwerk – wieder normal ---------- */
function eggFire(){
  const f = $("eggFips");
  eggSay("Hui … 😵‍💫");
  sfx("rumble");
  f.classList.add("rumble");
  eggT(() => {
    f.classList.remove("rumble"); f.classList.add("fire");
    const kind = eggFlameKind();
    eggSay(EGG_FLAMES[kind].say);
    const svg = f.querySelector("svg"), head = svg && svg.querySelector(".tilt");
    if (head && head.insertAdjacentHTML){
      if (!svg.querySelector("#fbOuter")) svg.insertAdjacentHTML("afterbegin", FIN_BREATH_DEFS);
      head.insertAdjacentHTML("beforeend", finBreath(0, .25));
      const fb = head.querySelector(".fb");
      fb.style.setProperty("--len", "560"); fb.style.setProperty("--k", "5.6"); fb.style.setProperty("--ang", "-32deg");
      if (kind !== "feuer") eggColorFlame(svg, fb, kind);
    }
    sfx("fire");
    $("eggOverlay").classList.add("lit");                 // Lichterkette blinkt
    eggT(() => eggFireworks(EGG_FLAMES[kind].sky), 700);
    eggT(() => bbPlay("puff", 900), 500);                 // und der Kleine macht ein Mini-Feuerchen
    eggT(() => {
      f.classList.remove("fire");
      head && head.querySelectorAll(".fb").forEach(g => g.remove());
      eggFat = 0; eggFires++; eggFlavors = []; eggApplyFat();
      eggPlay("nom", 450);
      eggSay(pick(["Puh! Das tat gut! 😅 Noch mal?", "Uff, wieder ganz schlank! 😎", "Hihi, ein Feuerwerk für dich! 🎆"]));
      sfx("giggle");
      eggBusy = false; eggLastAct = Date.now();
      eggT(() => $("eggOverlay").classList.remove("lit"), 2600);
    }, 1700);
  }, 1300);
}
function eggFireworks(cols = FIN_COLORS){
  const sky = $("eggSky"); if (!sky) return;
  for (let b = 0; b < 4; b++){
    const x = 12 + rnd() * 76, y = 8 + rnd() * 30, c = pick(cols), d = b * .35;
    for (let i = 0; i < 12; i++){
      const a = i / 12 * Math.PI * 2, s = document.createElement("span");
      s.className = "fx"; s.innerHTML = FIN_STAR(c);
      s.style.cssText = `left:${x}%;top:${y}%;--x:${(Math.cos(a) * 60).toFixed(0)}px;--y:${(Math.sin(a) * 60).toFixed(0)}px;--s:.8;animation:finFirework 1.8s ease-out ${d}s forwards`;
      sky.appendChild(s); setTimeout(() => s.remove(), 2600);
    }
  }
  eggT(() => sfx("pop"), 0); eggT(() => sfx("pop"), 350); eggT(() => sfx("pop"), 700); eggT(() => sfx("pop"), 1050);
}

/* ---------- Kleinigkeiten: Bauch antippen, Schluckauf, Langeweile ---------- */
function eggPoke(){
  if (eggBusy) return;
  eggLastAct = Date.now();
  eggPlay("jiggle", 900);
  sfx("boing");
  eggSay(pick(EGG_POKE_SAY));
}
function eggIdle(){
  if ($("eggOverlay").classList.contains("hidden") || eggBusy || fIsOpen()) return;
  const quiet = Date.now() - eggLastAct;
  if (eggFat >= 3 && quiet > 1800 && rnd() < .55){
    eggPlay("hic", 500); sfx("hic"); eggSay(pick(["Hicks! 😳", "Hick! 🙊", "Hicks! Hihi."]));
    eggLastAct = Date.now() - 600;
  } else if (eggFat < 3 && quiet > 7000){
    eggSay(pick(EGG_IDLE_SAY)); eggPlay("nom", 450); eggLastAct = Date.now();
  }
}

/* ---------- Geheimnis im Geheimnis: Drachenei und Baby-Drache ---------- */
const EGG_HATCH = 10;                                   // so viele Goldmuffins → Drachenei
let eggDragon = load("eggDragon", {gold: 0, stage: 0}); // stage: 0 nichts · 1 Ei liegt im Gras · 2 geschlüpft
let eggLaidNow = false, bbTaps = 0;                     // frisch gelegte Eier schlafen erst bis zum nächsten Besuch
function eggGotGold(delay){
  if (eggDragon.stage) return;
  eggDragon.gold = (eggDragon.gold || 0) + 1; save("eggDragon", eggDragon);
  if (eggDragon.gold >= EGG_HATCH) eggT(eggLay, delay);
}
function eggLay(){
  eggDragon.stage = 1; save("eggDragon", eggDragon);
  eggLaidNow = true; bbRender("drop");
  eggSay("Nanu? Was liegt denn da im Gras? Ein DRACHENEI! 🥚✨");
  sfx("right");
}
const BB_EGG = `<svg viewBox="0 0 100 110"><defs><radialGradient id="bbEggG" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#FFF4D6"/><stop offset="1" stop-color="#F2D9A6"/></radialGradient></defs>
  <ellipse cx="50" cy="104" rx="30" ry="5" fill="rgba(59,44,90,.15)"/>
  <path d="M50 14 C74 14 86 50 86 70 C86 92 70 104 50 104 C30 104 14 92 14 70 C14 50 26 14 50 14 Z" fill="url(#bbEggG)" stroke="#C9A56A" stroke-width="3"/>
  <g stroke="none"><circle cx="34" cy="56" r="7" fill="#7DD9B4"/><circle cx="62" cy="40" r="5" fill="#FF88A8"/><circle cx="66" cy="76" r="8" fill="#C0A4F0"/><circle cx="40" cy="86" r="5" fill="#FFD54A"/><circle cx="56" cy="60" r="3.5" fill="#93BFF5"/></g>
  <ellipse cx="36" cy="32" rx="8" ry="5" transform="rotate(-35 36 32)" fill="#fff" opacity=".8"/>
  <g fill="none" stroke="#8F6A3A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path class="ck ck1" d="M30 50 L38 56 L34 63 L43 68"/>
    <path class="ck ck2" d="M43 68 L52 62 L58 70 L66 63 L72 68"/></g></svg>`;
const BB_BABY = `<svg viewBox="0 0 100 100"><defs><radialGradient id="bbSkin" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#D6F7E8"/><stop offset="1" stop-color="#7DD9B4"/></radialGradient></defs>
  <g stroke-linejoin="round" stroke-linecap="round">
  <ellipse cx="50" cy="97" rx="26" ry="3.5" fill="rgba(59,44,90,.15)"/>
  <path d="M70 84 Q90 86 90 72 Q94 78 92 70" fill="none" stroke="#2F7D63" stroke-width="9"/><path d="M70 84 Q90 86 90 72" fill="none" stroke="#9FE3C5" stroke-width="4"/>
  <path d="M27 62 Q10 50 14 40 Q20 50 30 52 Z" fill="#FFB3C8" stroke="#E0608A" stroke-width="2.5"/>
  <path d="M73 62 Q90 50 86 40 Q80 50 70 52 Z" fill="#FFB3C8" stroke="#E0608A" stroke-width="2.5"/>
  <ellipse cx="50" cy="74" rx="25" ry="21" fill="url(#bbSkin)" stroke="#2F7D63" stroke-width="3"/>
  <ellipse cx="50" cy="78" rx="14" ry="13" fill="#FFE7A8" stroke="#D9A93E" stroke-width="2"/>
  <ellipse cx="38" cy="94" rx="8" ry="4.5" fill="url(#bbSkin)" stroke="#2F7D63" stroke-width="2.6"/><ellipse cx="62" cy="94" rx="8" ry="4.5" fill="url(#bbSkin)" stroke="#2F7D63" stroke-width="2.6"/>
  <path d="M36 22 L39 10 L45 20 Z M64 22 L61 10 L55 20 Z" fill="#FFD54A" stroke="#D9A93E" stroke-width="2"/>
  <ellipse cx="50" cy="40" rx="27" ry="23" fill="url(#bbSkin)" stroke="#2F7D63" stroke-width="3"/>
  <path d="M27 30 L33 24 L38 30 L44 22 L50 29 L56 22 L62 30 L67 24 L73 30 Q70 14 50 13 Q30 14 27 30 Z" fill="#FFF8E7" stroke="#C9A56A" stroke-width="2.2"/>
  <g class="bb-eyes"><ellipse cx="40" cy="41" rx="7" ry="8.5" fill="#fff" stroke="#2F7D63" stroke-width="2"/><ellipse cx="60" cy="41" rx="7" ry="8.5" fill="#fff" stroke="#2F7D63" stroke-width="2"/>
    <circle cx="41" cy="43" r="4.5" fill="#3B2C5A"/><circle cx="59" cy="43" r="4.5" fill="#3B2C5A"/><circle cx="42.6" cy="41" r="1.6" fill="#fff"/><circle cx="60.6" cy="41" r="1.6" fill="#fff"/></g>
  <ellipse cx="31" cy="51" rx="5" ry="3" fill="#FF9BB5"/><ellipse cx="69" cy="51" rx="5" ry="3" fill="#FF9BB5"/>
  <path d="M44 53 Q50 58 56 53" fill="none" stroke="#2F7D63" stroke-width="2.6"/>
  <ellipse cx="36" cy="28" rx="5" ry="2.5" transform="rotate(-25 36 28)" fill="#fff" opacity=".5"/></g></svg>`;
function bbRender(anim){
  const el = $("eggBaby"), st = eggDragon.stage;
  el.className = "egg-baby" + (st === 1 ? " is-egg" : st === 2 ? " is-baby" : "") + (anim ? " " + anim : "");
  el.innerHTML = st === 1 ? BB_EGG : st === 2 ? BB_BABY : "";
  el.setAttribute("aria-label", st === 2 ? "Baby-Drache" : "Drachenei");
}
function bbPlay(cls, ms){
  const el = $("eggBaby"); if (!el.innerHTML) return;
  el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}
let bbSayTimer = null;
function bbSay(text){
  const b = $("bbBubble"); if (!b) return;
  b.textContent = text; b.classList.remove("on"); void b.offsetWidth; b.classList.add("on");
  clearTimeout(bbSayTimer); bbSayTimer = setTimeout(() => b.classList.remove("on"), 2200);
}
function bbTap(){
  eggLastAct = Date.now();
  if (eggDragon.stage === 2){
    bbPlay("hop", 500); sfx("laugh", 1);
    bbSay(pick(["Piep! 🐣", "Piep-piep! 💚", "Hunger! 🧁", "Piep! 🔥", "Hihi! 😆"]));
    if (rnd() < .3) eggT(() => bbPlay("puff", 900), 250);
    return;
  }
  if (eggDragon.stage !== 1) return;
  bbPlay("wobble", 500);
  if (eggLaidNow){ sfx("hic"); eggSay("Psst … das Ei schläft noch. Komm später wieder! 🤫🥚"); return; }
  bbTaps++; sfx("hic");
  const el = $("eggBaby");
  if (bbTaps === 1){ el.classList.add("c1"); eggSay("Knack! Da tut sich was! 😮"); }
  else if (bbTaps === 2){ el.classList.add("c2"); eggSay("Knack-knack! Gleich …! 😲"); }
  else if (bbTaps === 3) bbHatch();
}
function bbHatch(){
  const el = $("eggBaby"), r = el.getBoundingClientRect();
  el.classList.add("hatching"); sfx("pop");
  eggCrumbs({x: r.left + r.width / 2, y: r.top + r.height * .45}, false, ["#FFF8E7","#F2D9A6","#7DD9B4","#FF88A8"]);
  eggT(() => {
    eggDragon.stage = 2; save("eggDragon", eggDragon);
    bbRender("born"); sfx("fanfare");
    eggSay("Ein Baby-Drache! Hallo, kleiner Fips! 🐣💚");
    eggFireworks(["#7DD9B4","#FFB3C8","#FFD54A","#C0A4F0"]);
  }, 450);
}

/* ---------- Spieluhr-Melodie (leise, lässt sich ausschalten) ---------- */
const EGG_TUNE = [[784,1],[659,1],[784,1],[1047,1],[988,1],[880,1],[784,2],[698,1],[659,1],[587,1],[659,1],[698,1],[784,1],[659,2],
                  [784,1],[659,1],[784,1],[1047,1],[1175,1],[1047,1],[988,2],[880,1],[988,1],[1047,1],[784,1],[659,1],[587,1],[523,2]];
function eggMusic(on){
  clearTimeout(eggMusicTimer); eggMusicTimer = null;
  $("eggMusicBtn").textContent = eggMusicOn ? "🔊" : "🔇";
  if (!on || !eggMusicOn || fIsOpen()) return;
  const ctx = getCtx(); if (!ctx) return;
  const beat = .3; let t = ctx.currentTime + .1, total = 0;
  EGG_TUNE.forEach(([f, n]) => {
    tone(ctx, f, t, beat * n * .95, "sine", .05);
    tone(ctx, f * 2, t, beat * .4, "sine", .012);
    t += beat * n; total += beat * n;
  });
  eggMusicTimer = setTimeout(() => eggMusic(true), total * 1000 + 600);
}

/* Speck-Teile für Fips: Kugelbauch (wächst mit jedem Muffin, Arme und Füße bleiben obendrauf),
   Pausbacken, die seitlich aus dem Kopf quellen, und ein Doppelkinn */
function eggFatParts(svg){
  const body = svg.querySelector(".jump > g"), arm = body && body.querySelector(":scope > .wigR");
  if (arm) arm.insertAdjacentHTML("beforebegin", `<g class="egg-belly">
    <ellipse cx="200" cy="306" rx="64" ry="56" fill="url(#skinHead)" stroke="#2F7D63" stroke-width="4.5"/>
    <ellipse cx="200" cy="306" rx="64" ry="56" fill="url(#shadeDown)" stroke="none" opacity=".5"/>
    <ellipse cx="200" cy="320" rx="42" ry="40" fill="url(#belly)" stroke="#D9A93E" stroke-width="3"/>
    <g fill="none" stroke="#EDC46A" stroke-width="3" stroke-linecap="round">
      <path d="M170 300 Q200 309 230 300"/><path d="M162 319 Q200 329 238 319"/><path d="M170 339 Q200 347 230 339"/></g>
    <path class="egg-navel" d="M195 322 Q200 328 205 322" fill="none" stroke="#C99A3E" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="176" cy="282" rx="16" ry="8" transform="rotate(-25 176 282)" fill="#fff" opacity=".6"/>
    <ellipse cx="238" cy="330" rx="5" ry="3" fill="#fff" opacity=".45"/>
  </g>`);
  const head = svg.querySelector(".tilt"), skull = head && head.firstElementChild;
  if (skull){
    // Pausbacken hinter dem Kopf: nur der Teil, der seitlich herausquillt, ist zu sehen
    skull.insertAdjacentHTML("beforebegin", `<g class="egg-cheeks">
      <ellipse class="egg-cheek l" cx="112" cy="226" rx="38" ry="32" fill="url(#skinHead)" stroke="#2F7D63" stroke-width="4.5"/>
      <ellipse class="egg-cheek r" cx="288" cy="226" rx="38" ry="32" fill="url(#skinHead)" stroke="#2F7D63" stroke-width="4.5"/></g>`);
    skull.insertAdjacentHTML("afterend", `<path class="egg-chin" d="M170 258 Q200 276 230 258" fill="none" stroke="#2F7D63" stroke-width="4" stroke-linecap="round"/>`);
  }
}

let kReady = false;
async function openEgg(){
  if (!kReady){ kInit(); kReady = true; }
  // Ein Fips aus dem letzten Finale liegt noch unsichtbar in der Seite. Beide Zeichnungen benutzen dieselben
  // Namen für Farbverläufe und Masken – der Party-Fips griffe sonst auf die des versteckten zu und würde dunkel.
  if ($("endOverlay").classList.contains("hidden")){ $("endDragon").innerHTML = ""; $("finFx").innerHTML = ""; }
  document.documentElement.classList.add("egg-open");   // Seite dahinter festhalten: kein Scrollen, kein Zoomen
  $("eggKitchen").classList.add("hidden");
  eggFat = 0; eggBusy = false; eggEaten = 0; eggFires = 0; eggFlavors = []; eggLastAct = Date.now();
  eggLaidNow = false; bbTaps = 0; bbRender();
  $("eggScene").innerHTML = eggScene();
  const st = $("eggFips");
  st.className = "egg-fips";
  const svg = await loadFinaleSvg();
  if (svg){
    st.innerHTML = svg;
    const el = st.querySelector("svg");
    el.removeAttribute("width"); el.removeAttribute("height"); el.classList.add("fin-svg"); el.setAttribute("aria-label", "Fips");
    eggFatParts(el);
    // Kau-Gesicht: Maul zu, Kiefer mahlt, eine Backe ist abwechselnd links und rechts voll
    // (die Abdeckung über dem offenen Mund ist ein Ausschnitt des Kopfes – gleicher Farbverlauf, kein Fleck)
    el.querySelector(".tilt")?.insertAdjacentHTML("beforeend", `<g class="egg-chew">
      <clipPath id="chewClip"><ellipse cx="200" cy="233" rx="31" ry="22"/></clipPath>
      <g clip-path="url(#chewClip)">
        <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#skinHead)"/>
        <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#shadeDown)"/>
      </g>
      <ellipse class="chew-cheek l" cx="114" cy="220" rx="27" ry="17" fill="#FF9BB5"/>
      <ellipse class="chew-cheek r" cx="286" cy="220" rx="27" ry="17" fill="#FF9BB5"/>
      <g class="chew-jaw">
        <path d="M184 230 Q192 238 200 232 Q208 238 216 230" fill="none" stroke="#2F7D63" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g class="chew-crumbs" fill="#A8714A"><circle cx="219" cy="240" r="2.6"/><circle cx="225" cy="246" r="2"/><circle cx="181" cy="243" r="2.2"/></g>
    </g>`);
    // hungriges, offenes Maul (wird beim Füttern gezeigt)
    el.querySelector(".tilt")?.insertAdjacentHTML("beforeend", `<g class="egg-mouth">
      <ellipse cx="200" cy="234" rx="24" ry="22" fill="#8C3A55" stroke="#2F7D63" stroke-width="4"/>
      <ellipse cx="200" cy="246" rx="14" ry="8" fill="#FF8FAB"/>
      <path d="M183 218 L188 228 L193 219 Z M217 218 L212 228 L207 219 Z" fill="#fff"/></g>`);
  } else {
    st.innerHTML = `<img class="fin-svg" src="img/fips-tanz.svg?v=${APP_VERSION}" alt="Fips">`;
  }
  eggApplyFat(); eggTray();
  eggSay(EGG_SAY[0]);
  // Neues in der Küche freigeschaltet? Fips verrät es – und der Küchen-Knopf glitzert
  const fresh = kFresh();
  $("kOpen").classList.toggle("fresh", fresh.length > 0);
  if (fresh.length){
    const names = fresh.map(k => `${k.label} ${/^</.test(k.icon) ? "" : k.icon}`.trim());
    const list = names.length > 1 ? names.slice(0, -1).join(", ") + " und " + names[names.length - 1] : names[0];
    eggT(() => eggSay(`Psst … in der Küche gibt’s was Neues: ${list}! 👩‍🍳`), 2200);
  }
  if (eggDragon.stage === 1) eggT(() => { if (bbTaps || eggDragon.stage !== 1) return; eggSay("Guck mal, das Drachenei wackelt! Klopf mal an! 🥚"); bbPlay("wobble", 500); }, fresh.length ? 5200 : 2200);
  show("eggOverlay");
  sfx("fanfare");
  clearInterval(eggIdleTimer); eggIdleTimer = setInterval(eggIdle, 2200);
  eggT(() => eggMusic(true), 1200);
  eggT(eggHowtoShow, 1600);
}
/* Alles, was gerade läuft, sauber abbrechen: fliegende/gezogene Muffins, Feuerstrahl, Timer.
   Fips bleibt so rund, wie er war – nur ist er danach wieder bereit für den nächsten Muffin. */
function eggReset(){
  eggHowtoHide();
  $("bbBubble") && $("bbBubble").classList.remove("on");
  eggGen++;
  if (eggDragEnd) eggDragEnd();
  eggTimers.forEach(clearTimeout); eggTimers.clear();
  document.querySelectorAll(".egg-fly,.egg-crumb,.egg-burp").forEach(el => el.remove());
  const sky = $("eggSky"); if (sky) sky.innerHTML = "";
  const f = $("eggFips");
  ["hungry","rumble","fire","nom","chew","glitter","jiggle","hic","yuck"].forEach(c => f.classList.remove(c));
  f.querySelectorAll(".fb").forEach(g => g.remove());
  $("eggOverlay").classList.remove("lit");
  $("eggTray").querySelectorAll(".egg-muffin.gone").forEach(b => { eggFill(b); b.classList.remove("gone"); });
  if (eggFat >= EGG_FULL) eggFat = 0;               // Feuerstrahl wurde unterbrochen → wieder schlank
  bbTaps = 0; bbRender();                            // halb aufgeklopftes Ei fängt wieder von vorne an
  eggApplyFat();
  eggBusy = false; eggLastAct = Date.now();
}
function eggOpen(){ return !$("eggOverlay").classList.contains("hidden"); }
/* Handy gesperrt / App gewechselt: anhalten. Zurück: weiter, wo man war. */
document.addEventListener("visibilitychange", () => {
  if (!eggOpen()) return;
  if (document.hidden){
    eggReset();
    clearInterval(eggIdleTimer); eggIdleTimer = null;
    eggMusic(false);
  } else {
    eggReset();
    clearInterval(eggIdleTimer); eggIdleTimer = setInterval(eggIdle, 2200);
    eggSay(pick(["Da bist du ja wieder! 😊", "Hallo! Hast du noch Muffins? 🧁"]));
    eggT(() => eggMusic(true), 600);
    eggT(eggHowtoShow, 900);
  }
});
function closeEgg(){
  fClose(true);
  eggReset();
  clearInterval(eggIdleTimer); eggIdleTimer = null;
  eggMusic(false);
  hide("eggOverlay");
  document.documentElement.classList.remove("egg-open");
}
/* iOS scrollt sonst die Startseite hinter der Party mit – nur echte Scrollbereiche (z. B. Küche auf kleinen Handys) dürfen scrollen */
document.addEventListener("touchmove", e => {
  if (!document.documentElement.classList.contains("egg-open") || !e.cancelable) return;
  for (let el = e.target; el && el !== document.body; el = el.parentElement){
    const o = getComputedStyle(el).overflowY;
    if ((o === "auto" || o === "scroll") && el.scrollHeight > el.clientHeight + 1) return;
  }
  e.preventDefault();
}, {passive:false});
