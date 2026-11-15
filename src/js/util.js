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
    if (e.target.closest && e.target.closest("#kMuffin,.egg-muffin")) e.preventDefault();
  }, {passive:false});
  // Computer: Strg/⌘ + Mausrad bzw. Trackpad-Zoom und Strg/⌘ + Plus/Minus
  document.addEventListener("wheel", e => { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, {passive:false});
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && ["+","-","=","0"].includes(e.key)) e.preventDefault();
  });
})();
