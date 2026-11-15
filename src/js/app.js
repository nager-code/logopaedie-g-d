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
$("next").addEventListener("click", () => { endParty(); next(); });
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
$("homeDragon").addEventListener("click", () => {
  dragonDo("homeDragon", "giggle", 1200);
  heroSay(pick(GIGGLE), 2200);
  sfx("giggle");
});

mountDragons();
refreshCounts();
loadAllRecs();
setTimeout(greet, 500);
