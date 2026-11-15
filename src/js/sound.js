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
let sfxCtx = null, sfxLaughUntil = 0;
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
function sfx(kind, lvl = 1){
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
  } else if (kind === "laugh"){
    // Lachen: „hi-hi-hi“ (1), „ha-ha-ha“ (2), langes Losprusten (3) – Silben aus Ton + gefiltertem Hauch
    if (sfxLaughUntil > ctx.currentTime) return;        // nicht übereinander lachen
    const n = lvl === 1 ? 4 : lvl === 2 ? 6 : 12, gap = lvl === 1 ? .1 : .14;
    const base = lvl === 1 ? 1100 : lvl === 2 ? 620 : 560;
    for (let i = 0; i < n; i++){
      const st = t + i * gap + (lvl === 3 && i > 5 ? .12 : 0);
      const f = base * (1 - i * (lvl === 3 ? .025 : .03)) * (1 + (i % 2) * .06);
      const o = ctx.createOscillator(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = lvl === 1 ? "sine" : "sawtooth";
      o.frequency.setValueAtTime(f * 1.12, st); o.frequency.exponentialRampToValueAtTime(f * .82, st + gap * .8);
      bp.type = "bandpass"; bp.frequency.value = lvl === 1 ? 1800 : 1200; bp.Q.value = 2;
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(lvl === 1 ? .25 : .35, st + .015); g.gain.exponentialRampToValueAtTime(0.0001, st + gap * .85);
      o.connect(bp); bp.connect(g); g.connect(ctx.destination); o.start(st); o.stop(st + gap);
    }
    sfxLaughUntil = t + n * gap + .2;
  } else if (kind === "giggle"){
    [880, 1046.5, 880, 1174.7].forEach((f, i) => tone(ctx, f, t + i * 0.08, 0.1, "sine", 0.18));
  } else if (kind === "fire"){
    // Fauchen und Knistern: gefiltertes Rauschen, das an- und abschwillt, dazu kleine Knackser
    const len = 2.2, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++){ d[i] = (Math.random() * 2 - 1) * 0.6; if (Math.random() < 0.0009) d[i] = (Math.random() < .5 ? -1 : 1); }
    const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = buf; bp.type = "bandpass"; bp.frequency.setValueAtTime(500, t); bp.frequency.linearRampToValueAtTime(1400, t + 0.5); bp.frequency.linearRampToValueAtTime(800, t + len); bp.Q.value = 0.8;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.25); g.gain.setValueAtTime(0.5, t + 1.2); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start(t); src.stop(t + len);
  } else if (kind === "recstop"){
    tone(ctx, 660, t, 0.1, "sine", 0.2); tone(ctx, 990, t + 0.1, 0.14, "sine", 0.2);
  }
}
