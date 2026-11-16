/* ================= Easter Egg: Fips' geheime Muffin-Party =================
   Erreicht man, indem man Fips auf der Startseite ganz oft hintereinander kitzelt.
   Picknick auf der Sommerwiese: Muffins antippen oder zu Fips ziehen → er wird immer runder,
   bis er einen riesigen Feuerstrahl rauslässt (mit Feuerwerk) und wieder normal wird.
   Dazu: Goldmuffins, Schluckauf, Wackelbauch, Zähler und eine kleine Spieluhr-Melodie. */
const EGG_TAPS = 25;      // so oft ohne Pause kitzeln
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
const K_KINDS = [
  {k:"bunt",   label:"Bunt",    icon:"🌈"},
  {k:"schoko", label:"Schoko",  icon:"🍫"},
  {k:"stern",  label:"Sterne",  icon:"⭐"},
  {k:"herz",   label:"Herzen",         icon:"💗"},
  {k:"kirsche",label:"Kirsche",        icon:"🍒"}
];
let kMuffin = null, kKind = "bunt";
function kItem(it){
  const {t, x, y, r, c} = it;
  if (t === "bunt" || t === "schoko") return `<rect x="${x - 2.2}" y="${y - .8}" width="4.4" height="1.6" rx=".8" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`;
  if (t === "stern") return `<path transform="translate(${x} ${y}) rotate(${r}) scale(.55)" d="M0 -5 L1.4 -1.6 5 -1.5 2.2 .9 3.1 4.6 0 2.5 -3.1 4.6 -2.2 .9 -5 -1.5 -1.4 -1.6 Z" fill="${c}" stroke="#A87500" stroke-width=".6"/>`;
  if (t === "herz") return `<path transform="translate(${x} ${y}) rotate(${r}) scale(.5)" d="M0 4 C-7 -1 -5 -7 0 -3 C5 -7 7 -1 0 4 Z" fill="${c}"/>`;
  return `<g transform="translate(${x} ${y})"><path d="M0 -4 Q2 -10 7 -11" fill="none" stroke="#3E7D22" stroke-width="1.6"/><circle r="4.5" fill="url(#pg-red)" stroke="#A8243C" stroke-width="1.5"/><ellipse cx="-1.5" cy="-1.6" rx="1.3" ry=".9" fill="#fff" opacity=".8"/></g>`;
}
function customMuffinSvg(m){
  return `<svg viewBox="0 0 60 60"><g stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 31 L48 31 L44 55 Q30 58 16 55 Z" ${pf(m.cup)}/>
    <path d="M21 32 L22 55 M30 32 V56 M39 32 L38 55" stroke="${pln(m.cup)}" stroke-width="1.8" fill="none"/>
    <path class="k-top" d="M8 33 Q5 12 30 9 Q55 12 52 33 Q46 37 40 33 Q35 38 30 33 Q25 38 20 33 Q14 37 8 33 Z" ${pf(m.top)}/>
    <ellipse cx="18" cy="18" rx="5" ry="2.5" transform="rotate(-30 18 18)" fill="#fff" opacity=".55"/>
    <g stroke="none">${m.items.map(kItem).join("")}</g>
  </g></svg>`;
}
function kRender(){
  $("kMuffin").innerHTML = customMuffinSvg(kMuffin);
  document.querySelectorAll("#kCups button").forEach(b => b.classList.toggle("on", b.dataset.v === kMuffin.cup));
  document.querySelectorAll("#kTops button").forEach(b => b.classList.toggle("on", b.dataset.v === kMuffin.top));
  document.querySelectorAll("#kKinds button").forEach(b => b.classList.toggle("on", b.dataset.v === kKind));
}
function kNew(){ kMuffin = {cup: pick(K_CUPS), top: pick(K_TOPS), items: []}; kRender(); }
/* Streusel rieseln an die angetippte Stelle – aber nur auf den Guss */
function kSprinkle(ev){
  const svg = $("kMuffin").querySelector("svg"), top = svg && svg.querySelector(".k-top");
  if (!top) return;
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(svg.getScreenCTM().inverse());
  const n = kKind === "kirsche" ? 1 : kKind === "herz" || kKind === "stern" ? 2 : 4;
  if (kKind === "kirsche" && kMuffin.items.filter(i => i.t === "kirsche").length >= 3) return;
  let added = 0;
  for (let i = 0; i < n * 3 && added < n; i++){
    const x = p.x + (n > 1 ? rnd() * 10 - 5 : 0), y = p.y + (n > 1 ? rnd() * 7 - 3.5 : 0);
    const pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
    if (!top.isPointInFill(pt) || y > 31) continue;
    const c = kKind === "bunt" ? pick(["#FF88A8","#FFD54A","#7DD9B4","#93BFF5","#C0A4F0","#FFB062"])
            : kKind === "schoko" ? pick(["#4A2E3A","#6E4429","#5A3A2E"])
            : kKind === "stern" ? pick(["#FFE45C","#FFF6C0","#FFD54A"]) : kKind === "herz" ? pick(["#FF88A8","#E8455F","#FFB3C8"]) : "";
    kMuffin.items.push({t: kKind, x: +x.toFixed(1), y: +y.toFixed(1), r: Math.round(rnd() * 180), c});
    added++;
  }
  if (kMuffin.items.length > 220) kMuffin.items.splice(0, kMuffin.items.length - 220);
  if (added){ kRender(); sfx("sprinkle"); }
}
function kInit(){
  $("kCups").innerHTML = K_CUPS.map(c => `<button data-v="${c}" style="--c:${PIC_PAL[c][1]};--b:${PIC_PAL[c][3]}" aria-label="Förmchen ${c}"></button>`).join("");
  $("kTops").innerHTML = K_TOPS.map(c => `<button data-v="${c}" style="--c:${PIC_PAL[c][1]};--b:${PIC_PAL[c][3]}" aria-label="Guss ${c}"></button>`).join("");
  $("kKinds").innerHTML = K_KINDS.map(k => `<button data-v="${k.k}" aria-label="${k.label}"><span>${k.icon}</span><small>${k.label}</small></button>`).join("");
  $("kCups").addEventListener("click", e => { const b = e.target.closest("button"); if (b){ kMuffin.cup = b.dataset.v; kRender(); sfx("hic"); } });
  $("kTops").addEventListener("click", e => { const b = e.target.closest("button"); if (b){ kMuffin.top = b.dataset.v; kRender(); sfx("hic"); } });
  $("kKinds").addEventListener("click", e => { const b = e.target.closest("button"); if (b){ kKind = b.dataset.v; kRender(); } });
  // Berührungen gehen an eine feste, unsichtbare Fläche über dem Muffin – der Muffin selbst wird bei jedem Streusel
  // neu gezeichnet; läge der Finger auf einem Element, das dabei verschwindet, würde Safari den Tipp als Zoom deuten
  let down = false, last = 0;
  const box = $("kTouch");
  box.addEventListener("pointerdown", e => { down = true; box.setPointerCapture(e.pointerId); kSprinkle(e); });
  box.addEventListener("pointermove", e => { if (down && Date.now() - last > 60){ last = Date.now(); kSprinkle(e); } });
  ["pointerup","pointercancel"].forEach(t => box.addEventListener(t, () => down = false));
  $("kNew").addEventListener("click", kNew);
  $("kDone").addEventListener("click", kDone);
  $("kOpen").addEventListener("click", kOpen);
  $("kClose").addEventListener("click", () => $("eggKitchen").classList.add("hidden"));
}
function kOpen(){ if (eggBusy) return; if (!kMuffin) kNew(); else kRender(); $("eggKitchen").classList.remove("hidden"); sfx("whoosh"); }
/* Fertig: der selbst verzierte Muffin kommt auf den Teller (vorne) */
function kDone(){
  const btn = $("eggTray").querySelector(".egg-muffin");
  btn.dataset.gold = ""; btn.dataset.custom = JSON.stringify(kMuffin);
  btn.classList.remove("golden"); btn.classList.add("custom");
  btn.innerHTML = customMuffinSvg(kMuffin);
  btn.style.animation = "none"; void btn.offsetWidth; btn.style.animation = "";
  $("eggKitchen").classList.add("hidden");
  kMuffin = null;
  eggSay("Oh! Hast du den für mich verziert? 😍");
  sfx("right");
}

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
  btn.innerHTML = muffinSvg(gold ? EGG_GOLD : pick(EGG_KINDS));
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
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", cancel);
  });
}

function eggFeed(btn){
  if (eggBusy || btn.classList.contains("gone")) return;
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
  const gold = btn.dataset.gold === "1", custom = !!btn.dataset.custom;
  const f = $("eggFips");
  f.classList.remove("hungry");
  eggFat = Math.min(EGG_FULL, eggFat + (gold ? 2 : 1));
  eggEaten++; eggLastAct = Date.now();
  eggPlay("nom", 450);
  eggPlay("chew", 1350);                                   // kurz kauen …
  sfx("nom");
  [.35, .62, .89, 1.16].forEach(d => eggT(() => sfx("chew"), d * 1000));
  eggCrumbs(at, gold);
  eggApplyFat();
  if (custom){ eggSay(pick(["Selbst verziert! Der ist der allerbeste! 🤩", "Mmmh, mit Streuseln! Danke! 💖", "Den hast du gemacht? Sooo lecker! 😍"])); eggPlay("glitter", 1400); setTimeout(() => sfx("right"), 250); }
  else if (gold){ eggSay(pick(EGG_GOLD_SAY)); eggPlay("glitter", 1400); setTimeout(() => sfx("right"), 250); }
  else eggSay(EGG_SAY[Math.min(eggFat, EGG_SAY.length - 1)]);
  eggT(() => { eggFill(btn); btn.classList.remove("gone"); }, 900);   // neuer Muffin auf dem Teller
  if (eggFat >= EGG_FULL) eggT(eggFire, 800);
  else eggT(() => { eggBusy = false; }, 250);
}

function eggCrumbs(p, gold){
  for (let i = 0; i < (gold ? 16 : 9); i++){
    const c = document.createElement("i");
    c.className = "egg-crumb" + (gold ? " gold" : "");
    c.style.cssText = `left:${p.x}px;top:${p.y}px;--x:${(rnd() * 100 - 50).toFixed(0)}px;--y:${(rnd() * 60 + (gold ? -60 : 20)).toFixed(0)}px;` +
      (gold ? "" : `background:${pick(["#C9946A","#A8714A","#FFD6BA","#FF88A8"])}`);
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
    eggSay("FEUER! 🔥🔥🔥");
    const svg = f.querySelector("svg"), head = svg && svg.querySelector(".tilt");
    if (head && head.insertAdjacentHTML){
      if (!svg.querySelector("#fbOuter")) svg.insertAdjacentHTML("afterbegin", FIN_BREATH_DEFS);
      head.insertAdjacentHTML("beforeend", finBreath(0, .25));
      const fb = head.querySelector(".fb");
      fb.style.setProperty("--len", "560"); fb.style.setProperty("--k", "5.6"); fb.style.setProperty("--ang", "-32deg");
    }
    sfx("fire");
    $("eggOverlay").classList.add("lit");                 // Lichterkette blinkt
    eggT(eggFireworks, 700);
    eggT(() => {
      f.classList.remove("fire");
      head && head.querySelectorAll(".fb").forEach(g => g.remove());
      eggFat = 0; eggFires++; eggApplyFat();
      eggPlay("nom", 450);
      eggSay(pick(["Puh! Das tat gut! 😅 Noch mal?", "Uff, wieder ganz schlank! 😎", "Hihi, ein Feuerwerk für dich! 🎆"]));
      sfx("giggle");
      eggBusy = false; eggLastAct = Date.now();
      eggT(() => $("eggOverlay").classList.remove("lit"), 2600);
    }, 1700);
  }, 1300);
}
function eggFireworks(){
  const sky = $("eggSky"); if (!sky) return;
  for (let b = 0; b < 4; b++){
    const x = 12 + rnd() * 76, y = 8 + rnd() * 30, c = pick(FIN_COLORS), d = b * .35;
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
  if ($("eggOverlay").classList.contains("hidden") || eggBusy) return;
  const quiet = Date.now() - eggLastAct;
  if (eggFat >= 3 && quiet > 1800 && rnd() < .55){
    eggPlay("hic", 500); sfx("hic"); eggSay(pick(["Hicks! 😳", "Hick! 🙊", "Hicks! Hihi."]));
    eggLastAct = Date.now() - 600;
  } else if (eggFat < 3 && quiet > 7000){
    eggSay(pick(EGG_IDLE_SAY)); eggPlay("nom", 450); eggLastAct = Date.now();
  }
}

/* ---------- Spieluhr-Melodie (leise, lässt sich ausschalten) ---------- */
const EGG_TUNE = [[784,1],[659,1],[784,1],[1047,1],[988,1],[880,1],[784,2],[698,1],[659,1],[587,1],[659,1],[698,1],[784,1],[659,2],
                  [784,1],[659,1],[784,1],[1047,1],[1175,1],[1047,1],[988,2],[880,1],[988,1],[1047,1],[784,1],[659,1],[587,1],[523,2]];
function eggMusic(on){
  clearTimeout(eggMusicTimer); eggMusicTimer = null;
  $("eggMusicBtn").textContent = eggMusicOn ? "🔊" : "🔇";
  if (!on || !eggMusicOn) return;
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
  $("eggKitchen").classList.add("hidden");
  eggFat = 0; eggBusy = false; eggEaten = 0; eggFires = 0; eggLastAct = Date.now();
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
  show("eggOverlay");
  sfx("fanfare");
  clearInterval(eggIdleTimer); eggIdleTimer = setInterval(eggIdle, 2200);
  eggT(() => eggMusic(true), 1200);
}
/* Alles, was gerade läuft, sauber abbrechen: fliegende/gezogene Muffins, Feuerstrahl, Timer.
   Fips bleibt so rund, wie er war – nur ist er danach wieder bereit für den nächsten Muffin. */
function eggReset(){
  eggGen++;
  if (eggDragEnd) eggDragEnd();
  eggTimers.forEach(clearTimeout); eggTimers.clear();
  document.querySelectorAll(".egg-fly,.egg-crumb").forEach(el => el.remove());
  const sky = $("eggSky"); if (sky) sky.innerHTML = "";
  const f = $("eggFips");
  ["hungry","rumble","fire","nom","chew","glitter","jiggle","hic"].forEach(c => f.classList.remove(c));
  f.querySelectorAll(".fb").forEach(g => g.remove());
  $("eggOverlay").classList.remove("lit");
  $("eggTray").querySelectorAll(".egg-muffin.gone").forEach(b => { eggFill(b); b.classList.remove("gone"); });
  if (eggFat >= EGG_FULL) eggFat = 0;               // Feuerstrahl wurde unterbrochen → wieder schlank
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
  }
});
function closeEgg(){
  eggReset();
  clearInterval(eggIdleTimer); eggIdleTimer = null;
  eggMusic(false);
  hide("eggOverlay");
}
