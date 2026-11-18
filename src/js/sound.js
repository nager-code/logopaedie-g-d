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
  if (typeof partyOn !== "undefined" && partyOn) return false;   // während einer Feier still sein
  for (const k of keys){
    if (token !== playToken) return false;                  // inzwischen weitergeschaltet → nichts Altes mehr abspielen
    if (recURL[k]) await playRec(k);
  }
  return token === playToken;                               // true = komplett abgespielt, nicht unterbrochen
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
    // Zeichentrick-Lachen statt nachgemachter Stimme: hüpfende, wackelnde Töne
    //   1 = Kichern (hohes Trillern) · 2 = Lachen (hüpfende Tonleiter) · 3 = Losprusten (lange Lachkaskade mit „Juhu“ am Ende)
    if (sfxLaughUntil > ctx.currentTime) return;        // nicht übereinander lachen
    const note = (f, st, dur, type, vol, bend) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, st); o.frequency.exponentialRampToValueAtTime(f * bend, st + dur);
      lfo.frequency.value = 22; lg.gain.value = f * .035; lfo.connect(lg); lg.connect(o.frequency);   // leichtes Tremolo = „kichrig“
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(vol, st + .012); g.gain.exponentialRampToValueAtTime(0.0001, st + dur);
      o.connect(g); g.connect(ctx.destination); o.start(st); lfo.start(st); o.stop(st + dur + .02); lfo.stop(st + dur + .02);
    };
    let end = t;
    if (lvl === 1){
      [1568, 1760, 1568, 1976, 1760].forEach((f, i) => note(f, t + i * .075, .07, "sine", .2, 1.12));
      end = t + 5 * .075;
    } else if (lvl === 2){
      const m = [1175, 1047, 1175, 988, 1047, 880, 988, 784];
      m.forEach((f, i) => { note(f, t + i * .11, .1, "triangle", .26, .86); note(f * 2, t + i * .11, .06, "sine", .05, .9); });
      end = t + m.length * .11;
    } else {
      const m = [1319, 1175, 1319, 1047, 1175, 988, 1047, 880, 988, 784, 880, 698, 784, 659];
      m.forEach((f, i) => { const st = t + i * .1 + (i > 6 ? .08 : 0); note(f, st, .09, "triangle", .26, .85); note(f * 2, st, .05, "sine", .05, .9); });
      const st = t + m.length * .1 + .2;                         // „Juhuuu“: Gleiten nach oben
      note(523, st, .5, "triangle", .22, 3); note(784, st + .05, .45, "sine", .1, 2.5);
      end = st + .5;
    }
    sfxLaughUntil = end + .1;
  } else if (kind === "whoosh"){
    tone(ctx, 300, t, 0.35, "sine", 0.15, 900);
  } else if (kind === "nom"){
    // Mampf-mampf: zwei tiefe, kurze Plopps
    tone(ctx, 260, t, 0.09, "triangle", 0.35, 140);
    tone(ctx, 230, t + 0.14, 0.09, "triangle", 0.3, 120);
    tone(ctx, 1400, t + 0.3, 0.12, "sine", 0.08, 1800);
  } else if (kind === "rumble"){
    // Bauchgrummeln: tiefer, wackelnder Ton
    const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    o.type = "sawtooth"; o.frequency.setValueAtTime(70, t); o.frequency.linearRampToValueAtTime(110, t + 1.1);
    lfo.frequency.value = 9; lg.gain.value = 18; lfo.connect(lg); lg.connect(o.frequency);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 400;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    o.connect(lp); lp.connect(g); g.connect(ctx.destination); o.start(t); lfo.start(t); o.stop(t + 1.25); lfo.stop(t + 1.25);
  } else if (kind === "pop"){
    // Feuerwerk: Zischen hoch, dann Plopp
    tone(ctx, 500, t, 0.25, "sine", 0.08, 1600);
    tone(ctx, 140, t + 0.26, 0.18, "triangle", 0.3, 60);
    tone(ctx, 1800, t + 0.27, 0.25, "sine", 0.05, 2400);
  } else if (kind === "yuck"){
    // „Bäh!“: zwei absackende, quäkige Töne
    tone(ctx, 420, t, 0.18, "square", 0.08, 300);
    tone(ctx, 330, t + 0.2, 0.35, "square", 0.08, 180);
  } else if (kind === "burp"){
    // Rülpser: tiefer, knarziger Ton, der absackt
    const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain(), lp = ctx.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(72, t + .55);
    lfo.frequency.value = 32; lg.gain.value = 26; lfo.connect(lg); lg.connect(o.frequency);
    lp.type = "lowpass"; lp.frequency.value = 650;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.4, t + .04); g.gain.exponentialRampToValueAtTime(0.0001, t + .6);
    o.connect(lp); lp.connect(g); g.connect(ctx.destination); o.start(t); lfo.start(t); o.stop(t + .65); lfo.stop(t + .65);
  } else if (kind === "boing"){
    tone(ctx, 180, t, 0.5, "sine", 0.35, 420);
    tone(ctx, 360, t + 0.02, 0.35, "triangle", 0.08, 700);
  } else if (kind === "hic"){
    tone(ctx, 700, t, 0.08, "square", 0.08, 1400);
    tone(ctx, 1400, t + 0.06, 0.06, "sine", 0.12, 900);
  } else if (kind === "sprinkle"){
    // Streusel: ein paar winzige, helle Klicks
    for (let i = 0; i < 3; i++) tone(ctx, 2200 + Math.random() * 1600, t + i * .03, .03, "sine", .05);
  } else if (kind === "chew"){
    // Kauen: weiches, tiefes Mampfen
    tone(ctx, 150 + Math.random() * 30, t, 0.08, "triangle", 0.22, 95);
  } else if (kind === "swap"){
    // Wusch: zwei Töne, die aneinander vorbeigleiten
    tone(ctx, 520, t, 0.45, "sine", 0.22, 1040);
    tone(ctx, 1040, t + 0.03, 0.45, "triangle", 0.12, 520);
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
