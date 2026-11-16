/* ================= Maskottchen: Fips, der kleine Drache ================= */
const DRAGON_NAME = "Fips";

/* Eine Pose pro Gefühl. Die Bilder bringen ihre Animationen selbst mit. */
const DRAGON_POSES = {
  hello: { src: "img/fips-begruessung.svg", alt: `${DRAGON_NAME} winkt` },
  cheer: { src: "img/fips-jubel.svg",       alt: `${DRAGON_NAME} jubelt` },
  oops:  { src: "img/fips-hoppla.svg",      alt: `${DRAGON_NAME} kratzt sich am Kopf` },
  dance: { src: "img/fips-tanz.svg",        alt: `${DRAGON_NAME} tanzt` },
  listen:{ src: "img/fips-zuhoeren.svg",    alt: `${DRAGON_NAME} hört genau zu` },
  think: { src: "img/fips-nachdenken.svg",  alt: `${DRAGON_NAME} überlegt` },
  wow:   { src: "img/fips-staunen.svg",     alt: `${DRAGON_NAME} staunt` },
  sleep: { src: "img/fips-schlafen.svg",    alt: `${DRAGON_NAME} schläft` },
  startle:{ src: "img/fips-erschrocken.svg", alt: `${DRAGON_NAME} ist erschrocken` }
};
/* Gefühl → Pose (ohne Gefühl: Begrüßungs-Pose) */
const DRAGON_STATE_POSE = { wave: "hello", happy: "cheer", yay: "dance", giggle: "cheer", oops: "oops", dance: "dance", laugh: "cheer", rofl: "cheer",
  listen: "listen", think: "think", wow: "wow", sleep: "sleep", startle: "startle" };
const DRAGON_STATES = Object.keys(DRAGON_STATE_POSE);

const DRAGON_FX = {
  happy: ["💖","✨","⭐","💚","🌟"],
  yay:   ["💖","💚","✨","⭐","💗"],
  oops:  ["❓","💧","💭"],
  wave:  ["✨","💖"],
  giggle:["💗","✨"],
  laugh: ["😆","💗","✨","Ha!"],
  rofl:  ["😂","🤣","💗","Ha!","Hi!"],
  wow:   ["✨","⭐"],
  startle:["❗","❕"]
};

/* Alle Platzhalter mit data-dragon füllen */
function mountDragons(root = document){
  root.querySelectorAll("[data-dragon]").forEach(el => {
    if (el.querySelector(".dr-pose")) return;
    el.classList.add("dragon");
    el.innerHTML = Object.entries(DRAGON_POSES).map(([k, p]) =>
      `<img class="dr-pose dr-${k}" src="${p.src}?v=${APP_VERSION}" alt="${p.alt}" draggable="false">`
    ).join("") + `<div class="dr-fx"></div>`;
    showPose(el, null);
  });
}

function showPose(el, state){
  const pose = DRAGON_STATE_POSE[state] || "hello";
  el.querySelectorAll(".dr-pose").forEach(img => {
    const on = img.classList.contains("dr-" + pose);
    img.classList.toggle("on", on);
    img.setAttribute("aria-hidden", on ? "false" : "true");
  });
}

/* Drache zeigt ein Gefühl: happy | oops | wave | giggle | listen | think | sleep …  (ms = 0 → bleibt so) */
function dragonDo(el, state, ms = 1800){
  if (typeof el === "string") el = $(el);
  if (!el) return;
  clearTimeout(el._drTimer);
  el.classList.remove(...DRAGON_STATES);
  void el.offsetWidth;
  el.classList.add(state);
  showPose(el, state);
  dragonFx(el, state);
  if (ms > 0) el._drTimer = setTimeout(() => dragonReset(el), ms);
}
function dragonReset(el){
  if (typeof el === "string") el = $(el);
  if (!el) return;
  clearTimeout(el._drTimer);
  el.classList.remove(...DRAGON_STATES);
  showPose(el, null);
}
function dragonFx(el, state){
  const box = el.querySelector(".dr-fx"); if (!box) return;
  const items = DRAGON_FX[state] || [];
  if (!items.length) return;
  const n = state === "happy" || state === "yay" ? 7 : state === "rofl" ? 10 : state === "laugh" ? 6 : state === "oops" ? 4 : 3;
  for (let i = 0; i < n; i++){
    const s = document.createElement("span");
    s.textContent = pick(items);
    s.style.left = (30 + rnd() * 40) + "%";
    s.style.setProperty("--dx", (rnd() * 120 - 60) + "px");
    s.style.animationDelay = (i * 0.09) + "s";
    box.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}
