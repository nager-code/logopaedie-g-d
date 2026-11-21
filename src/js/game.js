/* ================= Was ist spielbar? ================= */
const hasRec = k => !!recURL[k];
function recordedG(){ return ALL_G.filter(([w]) => hasRec(w)); }
function recordedD(){ return ALL_D.filter(([w]) => hasRec(w)); }
function recordedPairs(){ return PAIRS.filter(p => p.every(x => hasRec(x.w))); }
function gdStatus(){
  const g = recordedG().length, d = recordedD().length, n = g + d;
  const missing = n < MIN_WORDS ? `Noch ${MIN_WORDS - n} ${MIN_WORDS - n === 1 ? "Wort" : "Wörter"} aufnehmen` : "";
  // nur ein Tipp, kein Hindernis: am meisten bringt das Spiel mit G- und D-Wörtern
  const tip = !g && n ? "Tipp: Nimm auch Wörter mit G auf." : !d && n ? "Tipp: Nimm auch Wörter mit D auf." : "";
  return {g, d, n, ok: n >= MIN_WORDS, missing, tip};
}
function canPlay(m){ return m === "gd" ? gdStatus().ok : recordedPairs().length >= 1; }
function dots(n, max){ return Array.from({length:max}, (_,i) => `<span class="gdot ${i < n ? "on" : ""}"></span>`).join(""); }

function refreshCounts(){
  const words = REC_ITEMS.filter(i => i.word), have = words.filter(i => hasRec(i.k)).length;
  $("recCount").textContent = `${have}/${words.length}`;
  $("recBar").style.width = (100 * have / words.length) + "%";
  $("recSummary").textContent = have ? `${have} von ${words.length} Wörtern aufgenommen` : "Noch keine Wörter aufgenommen – hier geht’s los!";
  $("recSummaryBar").style.width = (words.length ? Math.round(have / words.length * 100) : 0) + "%";
  // Startbildschirm
  const st = gdStatus();
  const gdOK = st.ok;
  document.querySelector('.mode[data-mode="gd"]').classList.toggle("locked", !gdOK);
  $("sub-gd").textContent = gdOK ? "Hör gut zu! 👂" : `${st.n} von ${MIN_WORDS} Wörtern`;

  // Hinweis auf dem Startbildschirm
  $("needRec").classList.toggle("hidden", gdOK);
  $("needDots").innerHTML = dots(Math.min(st.n, MIN_WORDS), MIN_WORDS);
  $("needText").innerHTML = `<b>${Math.min(st.n, MIN_WORDS)} von ${MIN_WORDS}</b> Wörtern aufgenommen`;

  // Ziel-Anzeige im Aufnahme-Studio
  const goal = $("recGoal");
  goal.classList.toggle("ok", gdOK);
  goal.innerHTML = gdOK
    ? `✅ <span><b>Genug zum Spielen!</b><br><small>${st.tip || "Jedes weitere Wort macht das Spiel abwechslungsreicher."}</small></span>`
    : `🎯 <span><b>${st.missing}</b>, dann kann das Spiel starten.<br><span class="gdots">${dots(Math.min(st.n, MIN_WORDS), MIN_WORDS)}</span> <small>mind. ${MIN_WORDS} Wörter</small></span>`;
}

/* ================= Spiel ================= */
function freshFirst(list, n){
  const fresh = shuffle(list.filter(x => !lastUsed.includes(x[0])));
  const old = shuffle(list.filter(x => lastUsed.includes(x[0])));
  const base = fresh.concat(old);
  const out = [];
  while (out.length < n) out.push(...(out.length ? shuffle(base) : base));
  return out.slice(0, n);
}

function startGame(m){
  loadFinaleSvg();   // Fips fürs Finale schon mal laden
  if (!canPlay(m)){ openParents(); return; }
  mode = m; stars = 0; $("stars").textContent = "⭐ 0";
  hide("home"); show("game"); hide("endOverlay");
  newGame();
}

function newGame(){
  round = 0; results = []; answered = false; streak = 0;
  if (mode === "gd"){
    let rg = recordedG(), rd = recordedD();
    // Hörpaare (Gaumen / Daumen …) lassen sich im Elternbereich abschalten.
    // Bleiben ohne sie zu wenige Wörter übrig, spielen sie trotzdem mit, damit das Spiel nicht stehen bleibt.
    if (!opt("pairs")){
      const g2 = rg.filter(([w]) => !PAIR_WORDS.has(w)), d2 = rd.filter(([w]) => !PAIR_WORDS.has(w));
      if (g2.length + d2.length >= MIN_WORDS && (g2.length || !rg.length) && (d2.length || !rd.length)){ rg = g2; rd = d2; }
    }
    const nG = !rd.length ? ROUNDS : !rg.length ? 0 : ROUNDS/2;
    // gezielt üben: oft verwechselte Wörter kommen häufiger, sicher gekonnte seltener (progress.js)
    const g = nG ? adaptivePick(rg, nG).map(([w,e]) => ({w,e,l:"G"})) : [];
    const d = ROUNDS - nG ? adaptivePick(rd, ROUNDS - nG).map(([w,e]) => ({w,e,l:"D"})) : [];
    let tries = 0;
    do {
      deck = shuffle(g.concat(d)); tries++;
    } while (tries < 300 && (/(G{4}|D{4})/.test(deck.map(x => x.l).join("")) || deck.some((x,i) => i && x.w === deck[i-1].w)));
    lastUsed = deck.map(x => x.w); save("last", lastUsed);
  } else {
    const pairs = recordedPairs();
    deck = []; let prev = null;
    for (let i=0;i<ROUNDS;i++){
      let p, t, n = 0;
      do { p = pick(pairs); t = pick(p); n++; } while (n < 20 && prev && t.w === prev.w);
      prev = t;
      deck.push({pair: shuffle(p), target: t});
    }
  }
  renderRound();
}

function goHome(){ cancelRoundTimers(); partyAfter = null; endParty(); stopAll(); setTimeout(greet, 300); hide("game"); hide("endOverlay"); show("home"); refreshCounts(); }

function setBubble(text, cls){
  const b = $("bubble");
  b.className = "bubble " + (cls || "");
  b.textContent = text;
  b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
}
/* Die farbige Box soll genau auf dem Buchstaben sitzen – auch auf kleinen wie „g“, das nur halb so hoch ist und
   unter die Zeile reicht. Dazu wird einmal ausgemessen, wo der Buchstabe in der Schrift dieses Geräts wirklich
   liegt: Abstand von der Oberkante der Zeile und Höhe, beides in em (also passend zu jeder Schriftgröße). */
const glyphBoxes = {};
function glyphBox(ch){
  if (ch in glyphBoxes) return glyphBoxes[ch];
  let box = null;
  try {
    const c = document.createElement("canvas").getContext("2d");
    c.font = `900 100px ${getComputedStyle(document.body).fontFamily}`;
    const m = c.measureText(ch), up = m.actualBoundingBoxAscent, down = m.actualBoundingBoxDescent, pad = 9;   // pad: Rand oben und unten
    if (m.fontBoundingBoxAscent != null && up != null && up + down > 0)
      box = {top: (m.fontBoundingBoxAscent - up - pad) / 100, h: (up + down + 2 * pad) / 100};
  } catch(e){}
  return glyphBoxes[ch] = box;
}
function highlight(word, letter){
  const i = word.toLowerCase().indexOf(letter.toLowerCase());
  if (i < 0) return word;
  const m = glyphBox(word[i]);
  const fit = m ? ` fit" style="--ht:${m.top.toFixed(3)}em;--hh:${m.h.toFixed(3)}em` : "";
  return word.slice(0,i) + `<span class="hl ${letter}${fit}">${word[i]}</span>` + word.slice(i+1);
}
function renderProgress(){
  $("progress").innerHTML = deck.map((_,i) => {
    const r = results[i]; const cls = r ? r : (i === round ? "now" : "");
    const sym = r === "ok" ? "✓" : r === "no" ? "✗" : "";
    return `<div class="dot ${cls}">${sym}</div>`;
  }).join("");
}
function currentWord(){ return mode === "gd" ? cur.w : cur.target.w; }
function playCurrent(){ playSeq([currentWord()]); }

/* Verzögerte Aktionen einer Runde – beim Weiterschalten werden sie verworfen,
   damit nie das Wort der vorigen Runde nachkommt */
let roundTimers = [];
function later(fn, ms){ const t = setTimeout(() => { roundTimers = roundTimers.filter(x => x !== t); fn(); }, ms); roundTimers.push(t); }
function cancelRoundTimers(){ roundTimers.forEach(clearTimeout); roundTimers = []; }

function renderRound(){
  cancelRoundTimers(); stopAll();
  answered = false;
  dragonReset("buddyDragon");
  cur = deck[round];
  renderProgress();
  hide("next");
  setBubble(mode === "gd" ? "G oder D? 👂" : "Welches Bild? 👂");

  const card = $("card");
  card.className = "card";
  card.innerHTML = `
    <button class="speaker" id="spk" aria-label="Nochmal hören">🔊</button>${hintPic()}
    <button class="peek" id="peek" aria-label="Lösung zeigen">👀</button>`;
  $("spk").addEventListener("click", e => { e.stopPropagation(); playCurrent(); });
  card.querySelector(".hint-pic")?.addEventListener("click", e => { e.stopPropagation(); playCurrent(); });   // Tipp antippen = nochmal hören, nicht auflösen
  $("peek").addEventListener("click", e => { e.stopPropagation(); answer(undefined); });

  const ans = $("answers");
  if (mode === "gd"){
    ans.innerHTML = `
      <button class="letter G" data-l="G"><b>G</b><small>${pic("Giraffe","🦒")}</small></button>
      <button class="letter D" data-l="D"><b>D</b><small>${pic("Dino","🦕")}</small></button>`;
    ans.querySelectorAll(".letter").forEach(b => onPress(b, () => answer(b.dataset.l)));
  } else {
    ans.innerHTML = cur.pair.map((p,i) => `
      <button class="pic" data-i="${i}"><span class="e">${pic(p.w, p.e)}</span><span class="lbl"></span></button>`).join("");
    ans.querySelectorAll(".pic").forEach(b => onPress(b, () => answer(+b.dataset.i)));
  }
  later(playCurrent, 350);
}

/* Tipp-Bild für sehr ähnliche Wörter (Hörpaare) bei „G oder D?“ – zeigt, worum es geht, nicht das Wort selbst */
function hintPic(){
  const h = mode === "gd" && PAIR_HINTS[cur.w];
  return h ? `<div class="hint-pic" role="img" aria-label="Tipp: ${h[1]}"><span aria-hidden="true">💡</span>${pic(h[0])}</div>` : "";
}
function addBadge(el, ok){
  const b = document.createElement("span");
  b.className = "badge " + (ok ? "ok" : "no");
  b.textContent = ok ? "✓" : "✗";
  el.appendChild(b);
}

function answer(choice){
  if (answered) return;
  answered = true;
  let correct = null, chosenLabel = "";

  if (mode === "gd"){
    if (choice !== undefined){ correct = (choice === cur.l); chosenLabel = choice; }
    document.querySelectorAll(".letter").forEach(b => {
      const l = b.dataset.l;
      if (l === cur.l){ b.classList.add("right"); addBadge(b, true); }
      else if (choice === l){ b.classList.add("wrong"); addBadge(b, false); }
      else b.classList.add("dim");
    });
  } else {
    const targetIdx = cur.pair.indexOf(cur.target);
    if (choice !== undefined){ correct = (choice === targetIdx); chosenLabel = pic(cur.pair[choice].w, cur.pair[choice].e); }
    document.querySelectorAll(".pic").forEach((b,i) => {
      const p = cur.pair[i];
      b.querySelector(".lbl").innerHTML = highlight(p.w, p.l);
      if (i === targetIdx){ b.classList.add("right"); addBadge(b, true); }
      else if (choice === i){ b.classList.add("wrong"); addBadge(b, false); }
      else b.classList.add("dim");
    });
  }

  const item = mode === "gd" ? cur : cur.target;
  const card = $("card");
  card.className = "card"; void card.offsetWidth;
  let explain = "";
  stopAll();

  if (correct === true){
    setBubble("✅ " + pick(PRAISE), "good");
    dragonDo("buddyDragon", "yay", 2000);
    sfx("right");
    card.classList.add("flip","is-right");
    stars++; updateStars(); confetti();
    streak++;
    // keine Zwischen-Feier mehr kurz vor Schluss (z. B. 9 richtig hintereinander) – gleich kommt ja das große Finale
    partyDue = opt("party") && streak % STREAK_EVERY === 0 && round < deck.length - 2;
  } else if (correct === false){
    setBubble(pick(OOPS), "bad");
    dragonDo("buddyDragon", "oops", 2600);
    sfx("wrong");
    streak = 0;
    explain = mode === "gd"
      ? `<div class="explain"><span class="chip ${chosenLabel} x">${chosenLabel}</span> ➜ <span class="chip ${item.l}">${item.l}</span></div>`
      : `<div class="explain"><span class="chip pic-chip x">${chosenLabel}</span> ➜ <span class="chip pic-chip ${item.l}">${pic(item.w, item.e)}</span></div>`;
    card.classList.add("is-wrong");
    try { if (navigator.vibrate) navigator.vibrate([120,60,120]); } catch(e){}
  } else {
    setBubble("👀 Schau mal!");
    card.classList.add("flip","is-seen");
  }

  card.innerHTML = `
    <div class="big-emoji">${pic(item.w, item.e)}</div>
    <div class="word">${highlight(item.w, item.l)}</div>
    ${explain}`;

  results[round] = correct === true ? "ok" : correct === false ? "no" : "skip";
  recordAnswer(item.w, item.l, correct);
  renderProgress();
  // bei fälliger Feier kommt der Pfeil erst mit Fips' Tanz – sonst tippt man die Feier weg.
  // Nach einem Fehler erscheint er erst nach 1 Sekunde, damit das Kind die Korrektur sieht und nicht gleich weitertippt.
  if (correct === false) later(() => show("next"), 1000);
  else if (!partyDue) show("next");

  const seq = correct === false ? ["#" + item.l, item.w] : correct === true ? ["#ok", item.w] : [item.w];
  if (partyDue){
    // erst das Wort wiederholen, danach feiern – so passt die Wiederholung noch zum gerade gelösten Bild
    partyDue = false;
    const n = streak, r = round;
    later(async () => {
      const done = await playSeq(seq);
      if (round !== r || $("game").classList.contains("hidden")) return;   // inzwischen weiter oder zurück zum Start
      if (done) celebrate(n);
      show("next");
    }, 900);
  } else {
    later(() => { if (!partyOn) playSeq(seq); }, correct === null ? 400 : 900);
  }
}

function next(){
  round++;
  if (round >= deck.length) return showEnd();
  renderRound();
}
function showEnd(){
  cancelRoundTimers();
  recordRound();
  const ok = results.filter(r => r === "ok").length, n = deck.length;
  showFinale(ok, n);   // große Abschluss-Animation von Fips, je nach Ergebnis
  partyOffer(ok, n);
  playSeq(["#end"]);
}
/* Muffin-Party als Belohnung: bei 10 von 10 – oder nach drei gespielten Runden seit der letzten Party.
   Die Runden werden auf dem Gerät gezählt, auch über mehrere Tage. Vorher steht im Finale, wie viele noch fehlen. */
const PARTY_ROUNDS = 3;
function partyOffer(ok, n){
  const rounds = (+load("partyRounds", 0) || 0) + 1; save("partyRounds", rounds);
  const can = (n > 0 && ok === n) || rounds >= PARTY_ROUNDS, rest = PARTY_ROUNDS - rounds;
  $("endParty").classList.toggle("hidden", !can);
  $("endPartyHint").classList.toggle("hidden", can);
  $("endPartyHint").textContent = `🧁 Noch ${rest} ${rest === 1 ? "Runde" : "Runden"} bis zur Muffin-Party`;
  finaleFit();                               // Knopf oder Hinweis ändern die Höhe ein wenig
}
/* ================= Zwischendurch-Feier bei einer Serie ================= */
const STREAK_EVERY = 3;
let streak = 0, partyTimer = null, lastParty = -1, partyDue = false, partyOn = false, partyAfter = null;
const PARTY_PRAISE = ["Juhu!","Wow!","Spitze!","Super!","Klasse!"];
/* Jede Feier: Fips tanzt – jedes Mal ein anderer Tanzschritt */
const PARTIES = ["sway","spin","hop","twist","steps"].map(cls => ({cls, html:
  `<div class="p-floor"><div class="p-stage"></div><div class="p-dance"><div class="p-dragon" data-dragon></div></div></div><div class="p-notes"><span>🎵</span><span>🎶</span><span>🎵</span><span>🎶</span></div>`}));
function celebrate(n, afterSeq){
  stopAll();                       // Sprachausgabe pausieren
  partyOn = true; partyAfter = afterSeq || null;
  document.body.classList.add("partying");
  let i; do { i = Math.floor(rnd() * PARTIES.length); } while (i === lastParty && PARTIES.length > 1);
  lastParty = i;
  const p = PARTIES[i], el = $("party");
  el.className = "party pt-" + p.cls;
  const star = i => `<svg class="p-star" style="--i:${i}" viewBox="0 0 24 24"><path d="M12 2.5 L14.8 8.6 L21.4 9.3 L16.4 13.8 L17.9 20.4 L12 17 L6.1 20.4 L7.6 13.8 L2.6 9.3 L9.2 8.6 Z" fill="url(#pg-gold)" stroke="#A87500" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="10" cy="9.5" rx="1.8" ry="1.1" fill="#fff" opacity=".8"/></svg>`;
  el.innerHTML = `${p.html}<div class="p-badge">
    <div class="p-praise">${pick(PARTY_PRAISE)}</div>
    <div class="p-stars">${Array.from({length: Math.min(n, 10)}, (_, i) => star(i)).join("")}</div>
    <div class="p-ribbon"><span class="p-num">${n}</span><span>richtig hintereinander!</span></div>
  </div>`;
  mountDragons(el);
  el.querySelectorAll("[data-dragon]").forEach(d => dragonDo(d, "dance", 0));
  dragonDo("buddyDragon", "happy", 2500);
  sfx("fanfare");
  clearTimeout(partyTimer);
  partyTimer = setTimeout(endParty, 2800);
}
function endParty(){
  clearTimeout(partyTimer);
  $("party").className = "party hidden"; $("party").innerHTML = "";
  document.body.classList.remove("partying");
  const wasOn = partyOn; partyOn = false;
  const seq = partyAfter; partyAfter = null;
  if (wasOn && seq && !$("game").classList.contains("hidden")) later(() => playSeq(seq), 250);   // danach weiter
}

function updateStars(){
  const s = $("stars"); s.textContent = "⭐ " + stars;
  s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop");
}
function confetti(){
  const items = ["⭐","✨","🌟","💚","💛"];
  for (let i=0;i<18;i++){
    const el = document.createElement("span");
    el.className = "confetti"; el.textContent = pick(items);
    const a = rnd()*Math.PI*2, d = 120 + rnd()*160;
    el.style.setProperty("--x", Math.cos(a)*d + "px");
    el.style.setProperty("--y", Math.sin(a)*d + "px");
    el.style.setProperty("--r", (rnd()*720-360) + "deg");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}
