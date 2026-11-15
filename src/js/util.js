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
  // Doppeltippen verhindert das CSS (touch-action) – ohne JS, damit schnelles Tippen auf Knöpfe nie verschluckt wird
  // Computer: Strg/⌘ + Mausrad bzw. Trackpad-Zoom und Strg/⌘ + Plus/Minus
  document.addEventListener("wheel", e => { if (e.ctrlKey || e.metaKey) e.preventDefault(); }, {passive:false});
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && ["+","-","=","0"].includes(e.key)) e.preventDefault();
  });
})();
