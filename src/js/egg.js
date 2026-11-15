/* ================= Easter Egg: Fips' geheime Muffin-Party =================
   Erreicht man, indem man Fips auf der Startseite ganz oft hintereinander kitzelt.
   Muffins antippen → sie fliegen in Fips' Maul, er wird immer runder,
   bis er einen riesigen Feuerstrahl rauslässt und wieder normal wird. */
const EGG_TAPS = 25;      // so oft ohne Pause kitzeln
const EGG_FULL = 6;       // nach so vielen Muffins kommt der Feuerstrahl
const EGG_SAY = [
  "Hast du Muffins für mich? 🥺",
  "Mmmh, lecker! 😋",
  "Mampf! Noch einen! 🧁",
  "Schmatz! So gut! 😋",
  "Uff … ich werd’ ganz rund! 😮",
  "Mein Bauch blubbert … 😳",
  "Oh oh … gleich kommt’s! 😵"
];
const EGG_MUFFINS = [["pink","brown","chips"],["blue","pink","sprinkles"],["yellow","wood","cherry"],["purple","cream","sprinkles"],["leaf","brown","cherry"]];

function muffinSvg([cup, top, deco]){
  const decos = {
    chips: `<g fill="#4A2E3A"><circle cx="20" cy="22" r="2.2"/><circle cx="31" cy="17" r="2.2"/><circle cx="40" cy="24" r="2.2"/><circle cx="26" cy="27" r="1.8"/><circle cx="36" cy="14" r="1.6"/></g>`,
    sprinkles: `<g stroke-width="2.6" stroke-linecap="round"><path d="M18 22 l4 -2" stroke="#FFD54A"/><path d="M28 16 l3 3" stroke="#7DD9B4"/><path d="M38 21 l4 1" stroke="#93BFF5"/><path d="M24 28 l3 -2" stroke="#FF88A8"/><path d="M34 27 l-2 3" stroke="#FFD54A"/><path d="M32 12 l-3 1" stroke="#FF88A8"/></g>`,
    cherry: `<path d="M30 8 Q32 1 38 0" fill="none" stroke="#3E7D22" stroke-width="2"/><circle cx="30" cy="9" r="5.5" fill="url(#pg-red)" stroke="#A8243C" stroke-width="2"/><ellipse cx="28" cy="7" rx="1.6" ry="1.1" fill="#fff" opacity=".8"/>`
  };
  return `<svg viewBox="0 0 60 60"><g stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 31 L48 31 L44 55 Q30 58 16 55 Z" ${pf(cup)}/>
    <path d="M21 32 L22 55 M30 32 V56 M39 32 L38 55" stroke="${pln(cup)}" stroke-width="1.8" fill="none"/>
    <path d="M8 33 Q5 12 30 9 Q55 12 52 33 Q46 37 40 33 Q35 38 30 33 Q25 38 20 33 Q14 37 8 33 Z" ${pf(top)}/>
    ${decos[deco]}
    <ellipse cx="18" cy="18" rx="5" ry="2.5" transform="rotate(-30 18 18)" fill="#fff" opacity=".55"/>
  </g></svg>`;
}

let eggFat = 0, eggBusy = false;

function eggSay(text){
  const b = $("eggBubble"); b.textContent = text;
  b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
}
function eggMeter(){
  $("eggMeter").innerHTML = Array.from({length: EGG_FULL}, (_, i) => `<i class="${i < eggFat ? "on" : ""}"></i>`).join("");
}
function eggApplyFat(){
  $("eggFips").style.setProperty("--fat", eggFat);
  $("eggFips").classList.toggle("full", eggFat >= EGG_FULL - 1);
  eggMeter();
}
function eggTray(){
  $("eggTray").innerHTML = EGG_MUFFINS.map((m, i) =>
    `<button class="egg-muffin" data-i="${i}" aria-label="Muffin">${muffinSvg(m)}</button>`).join("");
  $("eggTray").querySelectorAll(".egg-muffin").forEach(b => b.addEventListener("click", () => eggFeed(b)));
}

/* Wo ist Fips' Maul gerade auf dem Bildschirm? */
function eggMouth(){
  const svg = $("eggFips").querySelector("svg"), head = svg && svg.querySelector(".tilt");
  try { if (head) return new DOMPoint(200, 232).matrixTransform(head.getScreenCTM()); } catch(e){}
  const r = $("eggFips").getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * .58 };
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
  anim.finished.then(() => {
    fly.remove();
    eggFat++;
    const f = $("eggFips"); f.classList.remove("nom"); void f.offsetWidth; f.classList.add("nom");
    sfx("nom");
    eggCrumbs(to);
    eggApplyFat();
    eggSay(EGG_SAY[Math.min(eggFat, EGG_SAY.length - 1)]);
    setTimeout(() => { btn.classList.remove("gone"); }, 900);   // neuer Muffin auf dem Teller
    if (eggFat >= EGG_FULL) setTimeout(eggFire, 700);
    else setTimeout(() => { eggBusy = false; }, 250);
  });
}

function eggCrumbs(p){
  for (let i = 0; i < 8; i++){
    const c = document.createElement("i");
    c.className = "egg-crumb";
    c.style.cssText = `left:${p.x}px;top:${p.y}px;--x:${(rnd() * 80 - 40).toFixed(0)}px;--y:${(rnd() * 50 + 20).toFixed(0)}px;background:${pick(["#C9946A","#A8714A","#FFD6BA","#FF88A8"])}`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 800);
  }
}

/* Der große Moment: Bauch grummelt, Fips wird rot – FEUER – und wieder normal */
function eggFire(){
  const f = $("eggFips");
  eggSay("Hui … 😵‍💫");
  sfx("rumble");
  f.classList.add("rumble");
  setTimeout(() => {
    f.classList.remove("rumble"); f.classList.add("fire");
    eggSay("FEUER! 🔥🔥🔥");
    const svg = f.querySelector("svg"), head = svg && svg.querySelector(".tilt");
    if (head){
      if (!svg.querySelector("#fbOuter")) svg.insertAdjacentHTML("afterbegin", FIN_BREATH_DEFS);
      head.insertAdjacentHTML("beforeend", finBreath(0, .25));
      const fb = head.querySelector(".fb");
      fb.style.setProperty("--len", "520"); fb.style.setProperty("--k", "5.2"); fb.style.setProperty("--ang", "-28deg");
    }
    sfx("fire");
    setTimeout(() => {
      f.classList.remove("fire");
      head && head.querySelectorAll(".fb").forEach(g => g.remove());
      eggFat = 0; eggApplyFat();
      f.classList.remove("nom"); void f.offsetWidth; f.classList.add("nom");
      eggSay("Puh! Das tat gut! 😅 Noch mal?");
      sfx("giggle");
      eggBusy = false;
    }, 1700);
  }, 1300);
}

async function openEgg(){
  eggFat = 0; eggBusy = false;
  const st = $("eggFips");
  st.className = "egg-fips";
  const svg = await loadFinaleSvg();
  if (svg){
    st.innerHTML = svg;
    const el = st.querySelector("svg");
    el.removeAttribute("width"); el.removeAttribute("height"); el.classList.add("fin-svg"); el.setAttribute("aria-label", "Fips");
  } else {
    st.innerHTML = `<img class="fin-svg" src="img/fips-tanz.svg?v=${APP_VERSION}" alt="Fips">`;
  }
  eggApplyFat(); eggTray();
  eggSay(EGG_SAY[0]);
  show("eggOverlay");
  sfx("fanfare");
}
