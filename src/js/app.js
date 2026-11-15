/* ================= Navigation ================= */
function openParents(){
  stopAll(); refreshCounts();
  $("diag").textContent = `Version ${APP_VERSION} · Speicher: ${dbOK ? "ok" : "nicht dauerhaft"}`;
  show("parentsOverlay");
}
document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => startGame(b.dataset.mode)));
$("homeBtn").addEventListener("click", goHome);
$("endHome").addEventListener("click", goHome);
$("restartBtn").addEventListener("click", () => { hide("endOverlay"); stars = 0; $("stars").textContent = "⭐ 0"; newGame(); });
$("next").addEventListener("click", () => { partyAfter = null; endParty(); next(); });
$("party").addEventListener("click", endParty);
$("card").addEventListener("click", () => { if (!answered) answer(undefined); });
$("parentsBtn").addEventListener("click", openParents);
$("needRecBtn").addEventListener("click", openRecorder);
$("openRec").addEventListener("click", openRecorder);
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => {
  const id = b.dataset.close;
  if (id === "recOverlay"){ closeMic(); stopAll(); }
  if (id === "eggOverlay"){ closeEgg(); return; }
  hide(id);
  refreshCounts();
}));

/* Fips begrüßt den Besucher */
let heroTimer = null;
function heroSay(html, ms = 3500){
  const b = $("heroBubble");
  b.innerHTML = html; b.classList.remove("hidden");
  b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
  clearTimeout(heroTimer);
  heroTimer = setTimeout(() => b.classList.add("hidden"), ms);
}
function greet(){
  dragonDo("homeDragon", "wave", 3600);
  heroSay(pick(HELLO), 4200);
}
/* G und D oben antippen: sie fliegen im Bogen übereinander und tauschen die Plätze */
let swapping = false;
function swapTiles(){
  if (swapping) return;
  const h = document.querySelector(".home-title h1"), [a, b] = h.querySelectorAll(".tile");
  if (!a || !b || !a.animate){ return; }
  swapping = true;
  const dx = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
  const opts = { duration: 700, easing: "cubic-bezier(.45,0,.3,1)", fill: "forwards" };
  const over = a.animate([
    { transform: "translate(0,0) rotate(-6deg) scale(1)" },
    { transform: `translate(${dx / 2}px,-58px) rotate(170deg) scale(1.18)`, offset: .5 },
    { transform: `translate(${dx}px,0) rotate(366deg) scale(1)` }], opts);
  const under = b.animate([
    { transform: "translate(0,0) rotate(6deg) scale(1)" },
    { transform: `translate(${-dx / 2}px,30px) rotate(-12deg) scale(.86)`, offset: .5 },
    { transform: `translate(${-dx}px,0) rotate(-6deg) scale(1)` }], opts);
  sfx("swap");
  over.finished.then(() => {
    // Plätze im Dokument tauschen und die Flug-Animation im selben Moment entfernen – kein Flackern
    const ph = document.createElement("span");
    h.replaceChild(ph, a); h.replaceChild(a, b); h.replaceChild(b, ph);
    over.cancel(); under.cancel();
    const t = h.querySelectorAll(".tile");
    h.setAttribute("aria-label", `${t[0].textContent} oder ${t[1].textContent}?`);
    swapping = false;
  });
}
document.querySelectorAll(".home-title .tile").forEach(t => {
  t.setAttribute("role", "button"); t.setAttribute("tabindex", "0"); t.setAttribute("aria-label", "G und D tauschen");
  t.addEventListener("click", swapTiles);
  t.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); swapTiles(); } });
});

$("eggFips").addEventListener("click", eggPoke);
$("eggMusicBtn").addEventListener("click", () => {
  eggMusicOn = !eggMusicOn;
  try { localStorage.setItem("eggMusic", eggMusicOn ? "on" : "off"); } catch(e){}
  eggMusic(eggMusicOn);
});

/* Kitzeln: je öfter man schnell hintereinander tippt, desto mehr lacht Fips –
   kichern → lachen → er kugelt sich vor Lachen auf dem Boden */
let tickles = 0, tickleTimer = null, rofl = false, eggTaps = 0, eggTimer = null;
$("homeDragon").addEventListener("click", () => {
  // Easter Egg: ganz oft ohne Pause kitzeln (auch während er sich am Boden kugelt) → Muffin-Party
  eggTaps++;
  clearTimeout(eggTimer);
  eggTimer = setTimeout(() => eggTaps = 0, 2500);
  if (eggTaps >= EGG_TAPS){ eggTaps = 0; tickles = 0; openEgg(); return; }
  if (rofl) return;                                   // kugelt sich gerade – erst wieder aufstehen lassen
  tickles++;
  clearTimeout(tickleTimer);
  tickleTimer = setTimeout(() => tickles = 0, 1500);   // kurze Pause → Fips beruhigt sich wieder
  if (tickles >= 10){
    tickles = 0; rofl = true;
    dragonDo("homeDragon", "rofl", 3000);
    heroSay(pick(["Hahahaha! 😂<br>Ich kann nicht mehr!","Hahaha! 🤣<br>Gnade, Gnade!","Hihihaha! 😂<br>Ich platze gleich!"]), 3200);
    sfx("laugh", 3);
    setTimeout(() => { rofl = false; }, 3000);
  } else if (tickles >= 6){
    dragonDo("homeDragon", "laugh", 1500);
    heroSay(pick(["Hahaha! Aufhören! 😆","Hahaha, das kitzelt so! 🤣","Haha! Nicht am Bauch! 😆"]), 2200);
    sfx("laugh", 2);
  } else if (tickles >= 3){
    dragonDo("homeDragon", "giggle", 1200);
    heroSay(pick(["Hihihi! 😄","Hihi, nicht da! 🙈","Hihihi, das kitzelt! 😄"]), 2000);
    sfx("laugh", 1);
  } else {
    dragonDo("homeDragon", "giggle", 1200);
    heroSay(pick(GIGGLE), 2200);
    sfx("giggle");
  }
});

mountDragons();
refreshCounts();
loadAllRecs();
setTimeout(greet, 500);
