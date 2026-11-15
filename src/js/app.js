/* ================= Navigation ================= */
function openParents(){
  stopAll(); refreshCounts();
  const st = gdStatus();
  $("diag").textContent = `Version ${APP_VERSION} · ${st.n} Wörter (G: ${st.g}, D: ${st.d}) · Speicher: ${dbOK ? "ok" : "nicht dauerhaft"}`;
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
/* Kitzeln: je öfter man schnell hintereinander tippt, desto mehr lacht Fips –
   kichern → lachen → er kugelt sich vor Lachen auf dem Boden */
let tickles = 0, tickleTimer = null, rofl = false;
$("homeDragon").addEventListener("click", () => {
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
