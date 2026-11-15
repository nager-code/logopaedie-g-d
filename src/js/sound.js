/* ================= Abspielen (nur eigene Aufnahmen) ================= */
function setTalking(on){ const s = document.querySelector(".speaker"); if (s) s.classList.toggle("talking", on); }
let curAudio = null, curFin = null, playToken = 0;
/* Stoppt alles, was gerade läuft – auch eine angefangene Wortfolge läuft danach nicht weiter */
function stopAll(){
  playToken++;
  if (curAudio){ try { curAudio.pause(); } catch(e){} curAudio = null; }
  if (curFin) curFin();
  setTalking(false);
}
function playRec(k){
  return new Promise(resolve => {
    const url = recURL[k];
    if (!url){ resolve(false); return; }
    const a = new Audio(url);
    curAudio = a;
    let done = false;
    const fin = () => { if (done) return; done = true; if (curFin === fin) curFin = null; setTalking(false); resolve(true); };
    curFin = fin;
    a.onended = a.onerror = fin;
    setTalking(true);
    a.play().catch(fin);
    setTimeout(fin, 8000);
  });
}
async function playSeq(keys){
  stopAll();
  const token = playToken;
  if (typeof partyOn !== "undefined" && partyOn) return;   // während einer Feier still sein
  for (const k of keys){
    if (token !== playToken) return;                        // inzwischen weitergeschaltet → nichts Altes mehr abspielen
    if (recURL[k]) await playRec(k);
  }
}

/* ================= Geräusche ================= */
let sfxCtx = null;
function getCtx(){
  try {
    if (!sfxCtx){ const AC = window.AudioContext || window.webkitAudioContext; sfxCtx = new AC(); }
    if (sfxCtx.state === "suspended") sfxCtx.resume();
    return sfxCtx;
  } catch(e){ return null; }
}
function tone(ctx, freq, start, dur, type, vol, freqEnd){
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, start);
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(vol, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g); g.connect(ctx.destination);
  o.start(start); o.stop(start + dur + 0.05);
}
function sfx(kind){
  const ctx = getCtx(); if (!ctx) return;
  const t = ctx.currentTime + 0.02;
  if (kind === "right"){
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(ctx, f, t + i * 0.09, 0.35, "triangle", 0.35);
      tone(ctx, f * 2, t + i * 0.09, 0.2, "sine", 0.08);
    });
  } else if (kind === "wrong"){
    tone(ctx, 330, t, 0.22, "square", 0.12, 260);
    tone(ctx, 247, t + 0.22, 0.4, "square", 0.12, 165);
  } else if (kind === "recstart"){
    tone(ctx, 880, t, 0.12, "sine", 0.25);
  } else if (kind === "fanfare"){
    // kleine Fanfare: ta-ta-ta-taaa
    const n = [[523.25,0],[523.25,0.13],[523.25,0.26],[698.46,0.42]];
    n.forEach(([f, d], i) => tone(ctx, f, t + d, i === 3 ? 0.7 : 0.12, "square", 0.1));
    [[698.46],[880],[1046.5]].forEach(([f]) => tone(ctx, f, t + 0.42, 0.8, "triangle", 0.18));
  } else if (kind === "giggle"){
    [880, 1046.5, 880, 1174.7].forEach((f, i) => tone(ctx, f, t + i * 0.08, 0.1, "sine", 0.18));
  } else if (kind === "recstop"){
    tone(ctx, 660, t, 0.1, "sine", 0.2); tone(ctx, 990, t + 0.1, 0.14, "sine", 0.2);
  }
}
