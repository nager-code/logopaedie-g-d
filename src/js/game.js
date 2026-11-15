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
  $("recSummary").textContent = have ? `${have} von ${words.length} Wörtern aufgenommen` : "Noch keine Wörter aufgenommen";
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
  if (!canPlay(m)){ openParents(); return; }
  mode = m; stars = 0; $("stars").textContent = "⭐ 0";
  hide("home"); show("game"); hide("endOverlay");
  newGame();
}

function newGame(){
  round = 0; results = []; answered = false; streak = 0;
  if (mode === "gd"){
    const rg = recordedG(), rd = recordedD();
    const nG = !rd.length ? ROUNDS : !rg.length ? 0 : ROUNDS/2;
    const g = nG ? freshFirst(rg, nG).map(([w,e]) => ({w,e,l:"G"})) : [];
    const d = ROUNDS - nG ? freshFirst(rd, ROUNDS - nG).map(([w,e]) => ({w,e,l:"D"})) : [];
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

function goHome(){ partyAfter = null; endParty(); stopAll(); setTimeout(greet, 300); hide("game"); hide("endOverlay"); show("home"); refreshCounts(); }

function setBubble(text, cls){
  const b = $("bubble");
  b.className = "bubble " + (cls || "");
  b.textContent = text;
  b.style.animation = "none"; void b.offsetWidth; b.style.animation = "";
}
function highlight(word, letter){
  const i = word.toLowerCase().indexOf(letter.toLowerCase());
  if (i < 0) return word;
  return word.slice(0,i) + `<span class="hl ${letter}">${word[i]}</span>` + word.slice(i+1);
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

function renderRound(){
  answered = false;
  dragonReset("buddyDragon");
  cur = deck[round];
  renderProgress();
  hide("next");
  setBubble(mode === "gd" ? "G oder D? 👂" : "Welches Bild? 👂");

  const card = $("card");
  card.className = "card";
  card.innerHTML = `
    <button class="speaker" id="spk" aria-label="Nochmal hören">🔊</button>
    <button class="peek" id="peek" aria-label="Lösung zeigen">👀</button>`;
  $("spk").addEventListener("click", e => { e.stopPropagation(); playCurrent(); });
  $("peek").addEventListener("click", e => { e.stopPropagation(); answer(undefined); });

  const ans = $("answers");
  if (mode === "gd"){
    ans.innerHTML = `
      <button class="letter G" data-l="G"><b>G</b><small>${pic("Giraffe","🦒")}</small></button>
      <button class="letter D" data-l="D"><b>D</b><small>${pic("Dino","🦕")}</small></button>`;
    ans.querySelectorAll(".letter").forEach(b => b.addEventListener("click", () => answer(b.dataset.l)));
  } else {
    ans.innerHTML = cur.pair.map((p,i) => `
      <button class="pic" data-i="${i}"><span class="e">${pic(p.w, p.e)}</span><span class="lbl"></span></button>`).join("");
    ans.querySelectorAll(".pic").forEach(b => b.addEventListener("click", () => answer(+b.dataset.i)));
  }
  setTimeout(playCurrent, 350);
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
    dragonDo("buddyDragon", "happy", 2000);
    sfx("right");
    card.classList.add("flip","is-right");
    stars++; updateStars(); confetti();
    streak++;
    partyDue = streak % STREAK_EVERY === 0;
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
  renderProgress();
  show("next");

  const seq = correct === false ? ["#" + item.l, item.w] : correct === true ? ["#ok", item.w] : [item.w];
  if (partyDue){
    // erst feiern, danach das Wort – nichts soll sich überlagern
    partyDue = false;
    const n = streak;
    setTimeout(() => celebrate(n, seq), 800);
  } else {
    setTimeout(() => { if (!partyOn) playSeq(seq); }, correct === null ? 400 : 900);
  }
}

function next(){
  round++;
  if (round >= deck.length) return showEnd();
  renderRound();
}
function showEnd(){
  const ok = results.filter(r => r === "ok").length, n = deck.length;
  $("endStars").textContent = "⭐".repeat(Math.max(1, Math.round(ok/2)));
  $("endText").innerHTML = `<b>${ok} von ${n}</b> richtig!<br>${ok >= n*0.8 ? "Du bist ein Hör-Profi! 🏆" : ok >= n/2 ? "Richtig gut! 👏" : "Weiter üben – du schaffst das! 💪"}`;
  show("endOverlay");
  dragonDo("endDragon", ok >= n/2 ? "happy" : "wave", 0);
  $("endDragon").classList.toggle("dancing", ok >= n/2);   // gutes Ergebnis: Fips tanzt
  sfx("right"); confetti(); setTimeout(confetti, 400);
  playSeq(["#end"]);
}
/* ================= Zwischendurch-Feier bei einer Serie ================= */
const STREAK_EVERY = 3;
let streak = 0, partyTimer = null, lastParty = -1, partyDue = false, partyOn = false, partyAfter = null;
/* Jede Feier: Fips tanzt – jedes Mal ein anderer Tanzschritt */
const PARTIES = ["sway","spin","hop","twist","steps"].map(cls => ({cls, html:
  `<div class="p-stage"></div><div class="p-dance"><div class="p-dragon" data-dragon></div></div><div class="p-notes"><span>🎵</span><span>🎶</span><span>🎵</span><span>🎶</span></div>`}));
function celebrate(n, afterSeq){
  stopAll();                       // Sprachausgabe pausieren
  partyOn = true; partyAfter = afterSeq || null;
  document.body.classList.add("partying");
  let i; do { i = Math.floor(rnd() * PARTIES.length); } while (i === lastParty && PARTIES.length > 1);
  lastParty = i;
  const p = PARTIES[i], el = $("party");
  el.className = "party pt-" + p.cls;
  el.innerHTML = `${p.html}<div class="p-badge"><span class="p-fire">🔥</span><b>${n}</b><small>richtig hintereinander!</small></div>`;
  mountDragons(el);
  el.querySelectorAll("[data-dragon]").forEach(d => dragonDo(d, "happy", 0));
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
  if (wasOn && seq && !$("game").classList.contains("hidden")) setTimeout(() => playSeq(seq), 250);   // danach weiter
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
