/* ================= Hilfen ================= */
function rnd(){
  try { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] / 4294967296; }
  catch(e){ return (Math.random() + (Date.now() % 1000) / 1000) % 1; }
}
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(rnd()*a.length)];
const wait = ms => new Promise(r => setTimeout(r, ms));
const $ = id => document.getElementById(id);
function load(k, def){ try { const v = localStorage.getItem("gd_"+k); return v === null ? def : JSON.parse(v); } catch(e){ return def; } }
function save(k, v){ try { localStorage.setItem("gd_"+k, JSON.stringify(v)); } catch(e){} }
function show(id){ $(id).classList.remove("hidden"); }
function hide(id){ $(id).classList.add("hidden"); }
/* Große Antwort-Knöpfe für Kinderhände. Ein normaler „click“ kommt nur bei einem sauberen Tipp an: ein Finger,
   kurz, ohne zu rutschen. Kinder drücken aber oft lange, rutschen dabei oder haben die andere Hand am Bildschirm –
   dann passierte bisher nichts. Deshalb zählt hier das Loslassen: Finger war auf dem Knopf und hebt in seiner Nähe ab.
   (Dazu gehört touch-action:none am Knopf, sonst macht der Browser aus dem Rutschen ein Wischen und bricht ab.) */
function onPress(el, fn){
  let id = null, t = 0;
  el.addEventListener("pointerdown", e => { if (e.button) return; id = e.pointerId; try { el.setPointerCapture(id); } catch(err){} });
  el.addEventListener("pointerup", e => {
    if (e.pointerId !== id) return;
    id = null;
    const r = el.getBoundingClientRect(), m = 30;                // etwas über den Rand hinaus zählt noch
    if (e.clientX < r.left - m || e.clientX > r.right + m || e.clientY < r.top - m || e.clientY > r.bottom + m) return;
    // Bei einem sauberen Tipp folgt sofort der „click“ – der soll auslösen wie bisher (nur er gilt dem Browser als
    // Fingertipp, der Ton starten darf). Bleibt er aus, war es eine der Berührungen oben: dann zählt das Loslassen.
    clearTimeout(t); t = setTimeout(() => fn(e), 120);
  });
  el.addEventListener("pointercancel", e => { if (e.pointerId === id) id = null; });
  el.addEventListener("click", e => { clearTimeout(t); fn(e); });   // auch Tastatur und Bedienhilfen
}
/* Einstellungen aus dem Elternbereich (bleiben auf dem Gerät gespeichert):
   party = Zwischen-Feier bei einer Serie · pairs = sehr ähnliche Wörter (Hörpaare) spielen mit */
const OPT_DEFAULTS = {party: true, pairs: true};
function opt(k){ return !!load("opt_" + k, OPT_DEFAULTS[k]); }

let mode = "gd", deck = [], round = 0, results = [], stars = 0, answered = false, cur = null;
let lastUsed = load("last", []);

/* ================= Kein Zoomen =================
   iOS Safari ignoriert „user-scalable=no“ – deshalb Zoom-Gesten hier zusätzlich abfangen */
(function(){
  const stop = e => e.preventDefault();
  // iOS: Auseinanderziehen mit zwei Fingern
  ["gesturestart","gesturechange","gestureend"].forEach(t => document.addEventListener(t, stop, {passive:false}));
  // alle anderen: Bewegung mit mehr als einem Finger
  document.addEventListener("touchmove", e => { if (e.touches.length > 1) e.preventDefault(); }, {passive:false});
  // Doppeltippen: Safari auf dem iPhone beachtet touch-action nicht überall. Ein zweiter Tipp kurz nach dem ersten
  // wird deshalb abgefangen (kein Zoom) – und als normaler Klick weitergegeben, damit kein Tipp verloren geht.
  let lastTouchEnd = 0;
  document.addEventListener("touchend", e => {
    const now = Date.now(), quick = now - lastTouchEnd < 380;
    lastTouchEnd = now;
    if (!quick || !e.cancelable || e.touches.length) return;
    const t = e.target;
    if (t.closest && t.closest("input,select,textarea,[contenteditable]")) return;   // Texteingaben normal lassen
    e.preventDefault();
    const p = e.changedTouches[0];
    t.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window, clientX: p.clientX, clientY: p.clientY}));
  }, {passive:false});
  // Flächen zum Ziehen/Streuen: dort gar keine Browser-Gesten
  document.addEventListener("touchstart", e => {
    if (e.target.closest && e.target.closest("#kTouch,#kMuffin,.egg-muffin")) e.preventDefault();
  }, {passive:false});
  // Computer: Strg/⌘ + Mausrad bzw. Trackpad-Zoom und Strg/⌘ + Plus/Minus
  document.addEventListener("wheel", e => { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, {passive:false});
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && ["+","-","=","0"].includes(e.key)) e.preventDefault();
  });
})();
