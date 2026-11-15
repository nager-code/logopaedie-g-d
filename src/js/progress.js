/* ================= Fortschritt: merken, gezielt üben, Übersicht für Eltern =================
   Pro Wort wird gespeichert, wie oft es kam, wie oft es richtig/falsch war und wie die letzten Antworten waren.
   Daraus: (1) Wörter, die oft verwechselt werden, kommen öfter dran; (2) eine Übersicht im Elternbereich. */
let STATS = load("stats", {});          // { Wort: {n, ok, no, last:[1,0,…], l:"G"|"D"} }
let META = load("meta", {rounds: 0});   // gespielte Runden

function recordAnswer(w, l, correct){
  const s = STATS[w] || (STATS[w] = {n: 0, ok: 0, no: 0, last: [], l});
  s.n++; s.l = l;
  if (correct === true) s.ok++; else s.no++;          // 👀 (Lösung angeschaut) zählt als „noch unsicher“
  s.last = (s.last || []).concat(correct === true ? 1 : 0).slice(-5);
  save("stats", STATS);
}
function recordRound(){ META.rounds = (META.rounds || 0) + 1; save("meta", META); }
function resetStats(){ STATS = {}; META = {rounds: 0}; save("stats", STATS); save("meta", META); }

/* Wie dringend sollte das Wort geübt werden? */
function wordWeight(w){
  const s = STATS[w];
  if (!s) return 2;                                    // neu → gern einstreuen
  const err = (s.no + .5) / (s.n + 1);                 // geglättete Fehlerquote
  const recent = (s.last || []).slice(-3);
  const recentWrong = recent.filter(x => !x).length;
  if (recent.length >= 3 && !recentWrong) return .45;  // sitzt → seltener
  return .6 + 4 * err + 1.2 * recentWrong;
}
/* n Wörter ziehen – gewichtet, ohne Wiederholung (solange es reicht), zuletzt gespielte etwas seltener */
function adaptivePick(list, n){
  const out = [];
  while (out.length < n && list.length){
    let pool = list.map(x => ({x, w: wordWeight(x[0]) * (lastUsed.includes(x[0]) ? .5 : 1)}));
    while (out.length < n && pool.length){
      const sum = pool.reduce((a, p) => a + p.w, 0);
      let r = rnd() * sum, i = 0;
      while (i < pool.length - 1 && (r -= pool[i].w) > 0) i++;
      out.push(pool[i].x); pool.splice(i, 1);
    }
  }
  return out;
}

/* ---------- Übersicht für Eltern ---------- */
function letterRate(l){
  let n = 0, ok = 0;
  Object.values(STATS).forEach(s => { if (s.l === l){ n += s.n; ok += s.ok; } });
  return {n, ok, pct: n ? Math.round(ok / n * 100) : null};
}
function hardWords(k = 6){
  return Object.entries(STATS)
    .filter(([w, s]) => s.n >= 2 && (s.no / s.n >= .34 || (s.last || []).slice(-2).includes(0)))
    .sort((a, b) => wordWeight(b[0]) - wordWeight(a[0])).slice(0, k).map(([w, s]) => ({w, s}));
}
function goodWords(k = 6){
  return Object.entries(STATS)
    .filter(([w, s]) => s.n >= 3 && (s.last || []).slice(-3).every(x => x) && s.ok / s.n >= .75)
    .sort((a, b) => b[1].ok - a[1].ok).slice(0, k).map(([w, s]) => ({w, s}));
}
function wordChip({w, s}){
  return `<span class="pg-word">${pic(w, "")}<b>${highlight(w, s.l)}</b><small>${s.ok}/${s.n}</small></span>`;
}
function renderParentProgress(){
  const el = $("progressBox"); if (!el) return;
  const g = letterRate("G"), d = letterRate("D"), total = g.n + d.n;
  if (!total){
    el.innerHTML = `<h3>📈 Fortschritt</h3><p class="pg-empty">Noch keine Spiele. Nach der ersten Runde siehst du hier, wie gut G und D schon klappen und welche Wörter noch schwer sind.</p>`;
    return;
  }
  const bar = (l, r) => `<div class="pg-bar ${l}"><span class="pg-l">${l}</span><span class="pg-track"><i style="width:${r.pct ?? 0}%"></i></span><span class="pg-pct">${r.pct === null ? "–" : r.pct + " %"}</span></div>`;
  const hard = hardWords(), good = goodWords();
  el.innerHTML = `<h3>📈 Fortschritt</h3>
    <p class="pg-sum"><b>${META.rounds || 0}</b> Runden · <b>${total}</b> Antworten · so oft richtig erkannt:</p>
    ${bar("G", g)}${bar("D", d)}
    ${hard.length ? `<p class="pg-h">💪 Noch schwer – kommen jetzt öfter dran:</p><div class="pg-words">${hard.map(wordChip).join("")}</div>` : ""}
    ${good.length ? `<p class="pg-h">🌟 Klappt schon super:</p><div class="pg-words">${good.map(wordChip).join("")}</div>` : ""}
    <button class="pg-reset" id="pgReset">Fortschritt zurücksetzen</button>`;
  $("pgReset").addEventListener("click", () => {
    if (confirm("Fortschritt wirklich zurücksetzen? Die Aufnahmen bleiben erhalten.")){ resetStats(); renderParentProgress(); }
  });
}
