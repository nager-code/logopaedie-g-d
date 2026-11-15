/* ================= Navigation ================= */
function openParents(){ stopAll(); refreshCounts(); show("parentsOverlay"); }
document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => startGame(b.dataset.mode)));
$("homeBtn").addEventListener("click", goHome);
$("endHome").addEventListener("click", goHome);
$("restartBtn").addEventListener("click", () => { hide("endOverlay"); stars = 0; $("stars").textContent = "⭐ 0"; newGame(); });
$("next").addEventListener("click", next);
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

refreshCounts();
loadAllRecs();
