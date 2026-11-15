/* ================= Wörter ================= */
const G_WORDS = [
  ["Giraffe","🦒"],["Gabel","🍴"],["Gurke","🥒"],["Geschenk","🎁"],["Geist","👻"],
  ["Gitarre","🎸"],["Glocke","🔔"],["Igel","🦔"],["Vogel","🐦"],["Tiger","🐯"],
  ["Kugel","🔮"],["Auge","👁️"],["Geige","🎻"],["Garten","🏡"],["Gold","🥇"],["Ziege","🐐"]
];
const D_WORDS = [
  ["Dino","🦕"],["Drache","🐉"],["Daumen","👍"],["Delfin","🐬"],["Dose","🥫"],
  ["Dusche","🚿"],["Donut","🍩"],["Nudeln","🍝"],["Pudel","🐩"],["Feder","🪶"],
  ["Radio","📻"],["Schokolade","🍫"],["Dach","🏠"],["Decke","🛏️"],["Dampflok","🚂"],["Kinder","🧒"]
];
const PAIRS = [
  [{w:"Nagel",e:"💅",l:"G"},{w:"Nadel",e:"🪡",l:"D"}],
  [{w:"Regen",e:"🌧️",l:"G"},{w:"reden",e:"🗣️",l:"D"}],
  [{w:"Wagen",e:"🚗",l:"G"},{w:"Waden",e:"🦵",l:"D"}],
  [{w:"Gaumen",e:"👄",l:"G"},{w:"Daumen",e:"👍",l:"D"}]
];
const ROUNDS = 10;
const MIN_WORDS = 5;          // so viele Wörter (G + D) braucht „G oder D?“ mindestens
const MAX_REC_MS = 4000;
const PRAISE = ["Super!","Toll gemacht!","Klasse!","Spitze!","Richtig!"];
const OOPS = ["Hoppla!","Fast!","Nochmal hinhören!"];

const REC_SECTIONS = (() => {
  const seen = new Set();
  const uniq = arr => arr.filter(x => !seen.has(x.k) && seen.add(x.k));
  return [
    {title:"Wörter mit G", items: uniq(G_WORDS.map(([w,e]) => ({k:w, e, t:w, word:true})))},
    {title:"Wörter mit D", items: uniq(D_WORDS.map(([w,e]) => ({k:w, e, t:w, word:true})))},
    {title:"Wortpaare für „Welches Bild?“", items: uniq(PAIRS.flat().map(p => ({k:p.w, e:p.e, t:p.w, word:true})))},
    {title:"Sätze (freiwillig)", note:"Damit hört dein Kind auch Lob und Hinweise mit deiner Stimme.", box:true, items: [
      {k:"#G",  e:"🟢", t:"„Das ist ein G.“"},
      {k:"#D",  e:"🔵", t:"„Das ist ein D.“"},
      {k:"#ok", e:"⭐", t:"„Super!“"},
      {k:"#end",e:"🎉", t:"„Super gemacht!“"}
    ]}
  ];
})();
const REC_ITEMS = REC_SECTIONS.flatMap(s => s.items);

/* Alle Wörter mit Buchstabe – auch die aus den Wortpaaren zählen für „G oder D?“ */
const ALL_G = (() => { const m = new Map(G_WORDS.map(x => [x[0], x])); PAIRS.flat().filter(p => p.l === "G").forEach(p => m.has(p.w) || m.set(p.w, [p.w, p.e])); return [...m.values()]; })();
const ALL_D = (() => { const m = new Map(D_WORDS.map(x => [x[0], x])); PAIRS.flat().filter(p => p.l === "D").forEach(p => m.has(p.w) || m.set(p.w, [p.w, p.e])); return [...m.values()]; })();

/* Reihenfolge beim Aufnehmen: abwechselnd G und D, damit schnell beide Buchstaben dabei sind */
const REC_ORDER = (() => {
  const g = REC_ITEMS.filter(i => i.word && ALL_G.some(x => x[0] === i.k));
  const d = REC_ITEMS.filter(i => i.word && ALL_D.some(x => x[0] === i.k) && !g.includes(i));
  const out = [];
  for (let i = 0; i < Math.max(g.length, d.length); i++){ if (g[i]) out.push(g[i]); if (d[i]) out.push(d[i]); }
  return out;
})();
