/* ================= Wörter ================= */
/* Übungsliste: 40 D-Wörter und 40 G-Wörter, nach Schwierigkeit geordnet (leicht → schwer).
   D und G am Wortende klingen wie t und k – deshalb stehen sie hier nur am Anfang oder in der Mitte. */
const D_LEVELS = [
  {name:"D – Stufe 1: D am Wortanfang", words:[
    ["Dach","🏠"],["Dose","🥫"],["Dusche","🚿"],["Dino","🦕"],["Daumen","👍"],
    ["Delfin","🐬"],["Dorf","🏘️"],["Dame","👩"],["Donner","🌩️"],["Diamant","💎"],
    ["Dieb","🦹"],["Dampfer","🛳️"],["Dirndl","👗"],["Dattel","🌴"],["Düse","🚀"],
    ["Duft","🌸"],["Domino","🎲"],["Dübel","🔩"],["Dotter","🍳"],["Dorn","🌵"]]},
  {name:"D – Stufe 2: D in der Wortmitte", words:[
    ["Nudel","🍝"],["Pudel","🐩"],["Feder","🪶"],["Boden","🟫"],["Leder","👜"],
    ["Nadel","🪡"],["Ruder","🚣"],["Rodel","🛷"],["Radio","📻"],["Wade","🦵"],
    ["Schublade","🗄️"],["Limonade","🍋"],["Faden","🧵"],["Paddel","🛶"],["Bude","🛖"]]},
  {name:"D – Stufe 3: schwer (DR oder K im Wort)", words:[
    ["Drache","🐉"],["Drei","3️⃣"],["Dackel","🐕"],["Deckel","🫙"],["Knödel","🥟"]]}
];
const G_LEVELS = [
  {name:"G – Stufe 1: G am Anfang mit a, o, u", words:[
    ["Gummi","🍬"],["Gockel","🐓"],["Gurke","🥒"],["Gabel","🍴"],["Gaul","🐴"],
    ["Gugelhupf","🍰"],["Gorilla","🦍"],["Gulasch","🍲"],["Gong","🥁"],["Gas","⛽"]]},
  {name:"G – Stufe 2: G am Wortanfang", words:[
    ["Geige","🎻"],["Gemüse","🥦"],["Giraffe","🦒"],["Gips","🩹"],["Geschenk","🎁"],
    ["Gewitter","⛈️"],["Gitarre","🎸"],["Gans","🪿"],["Garten","🏡"],["Gold","🥇"]]},
  {name:"G – Stufe 3: G in der Wortmitte", words:[
    ["Auge","👁️"],["Vogel","🐦"],["Kugel","🔮"],["Magen","😋"],["Wagen","🚗"],
    ["Igel","🦔"],["Hagel","🧊"],["Bagger","🏗️"],["Regen","🌧️"],["Nagel","💅"],
    ["Bogen","🏹"],["Säge","🪚"],["Ziege","🐐"],["Tiger","🐯"],["Feige","🍑"]]},
  {name:"G – Stufe 4: GR und GL am Anfang", words:[
    ["Gras","🌱"],["Grille","🦗"],["Glas","🥛"],["Glocke","🔔"],["Glitzer","✨"]]}
];
const D_WORDS = D_LEVELS.flatMap(l => l.words);
const G_WORDS = G_LEVELS.flatMap(l => l.words);

/* Hörpaare (Minimalpaare): ihre Wörter kommen zusätzlich ins G-oder-D-Spiel.
   Allein gehört sind sie kaum auseinanderzuhalten (Gaumen oder Daumen?) – deshalb hat jedes ein Tipp-Bild
   (h: [Bild in pictures.js, Bezeichnung]), das den Zusammenhang zeigt, ohne das Wort selbst abzubilden:
   beim Daumen eine Hand, beim Gaumen einen Mund. */
const PAIRS = [
  [{w:"Nagel",e:"💅",l:"G",h:["Hammer","Hammer"]},{w:"Nadel",e:"🪡",l:"D",h:["Faden","Faden"]}],
  [{w:"Bogen",e:"🏹",l:"G",h:["Zielscheibe","Zielscheibe"]},{w:"Boden",e:"🟫",l:"D",h:["Besen","Besen"]}],
  [{w:"Regen",e:"🌧️",l:"G",h:["Regenschirm","Regenschirm"]},{w:"reden",e:"🗣️",l:"D",h:["Sprechblase","Sprechblase"]}],
  [{w:"Wagen",e:"🚗",l:"G",h:["Ampel","Ampel"]},{w:"Waden",e:"🦵",l:"D",h:["Wade","Bein"]}],
  [{w:"Gaumen",e:"👄",l:"G",h:["Mund","Mund"]},{w:"Daumen",e:"👍",l:"D",h:["Hand","Hand"]}]
];
const PAIR_WORDS = new Set(PAIRS.flat().map(p => p.w));
const PAIR_HINTS = Object.fromEntries(PAIRS.flat().map(p => [p.w, p.h]));
const APP_VERSION = "__VERSION__";  // wird beim Veröffentlichen durch die Commit-Nummer ersetzt
const ROUNDS = 10;
const MIN_WORDS = 5;          // so viele Wörter (G + D) braucht „G oder D?“ mindestens
const MAX_REC_MS = 4000;
const PRAISE = ["Super!","Toll gemacht!","Klasse!","Spitze!","Richtig!"];
const OOPS = ["Brrr, ich bin ganz blau! 🥶","Hoppla! Nochmal hinhören!","Huch! Das war knapp!","Blubb! Fast!"];
const HELLO = ["Hallo! Ich bin Fips! 👋<br>Spielst du mit mir?","Hallo! Schön, dass du da bist! 💚","Hallo! Ich bin Fips, der kleine Drache! 🐉"];
const GIGGLE = ["Hihi, das kitzelt! 😄","Ich bin Fips! 💚","Los, spielen wir! 🎉","Hörst du G oder D? 👂"];

const REC_SECTIONS = (() => {
  const seen = new Set();
  const uniq = arr => arr.filter(x => !seen.has(x.k) && seen.add(x.k));
  const lvl = l => ({title: l.name, items: uniq(l.words.map(([w,e]) => ({k:w, e, t:w, word:true})))});
  return [
    ...G_LEVELS.map(lvl),
    ...D_LEVELS.map(lvl),
    {title:"Weitere Wörter (Hörpaare wie Nagel / Nadel)", items: uniq(PAIRS.flat().map(p => ({k:p.w, e:p.e, t:p.w, word:true})))},
    {title:"Sätze (freiwillig)", note:"Damit hört dein Kind auch Lob und Hinweise mit deiner Stimme.", box:true, items: [
      {k:"#G",  e:"🟢", t:"„Das ist ein G.“"},
      {k:"#D",  e:"🔵", t:"„Das ist ein D.“"},
      {k:"#ok", e:"⭐", t:"„Super!“"},
      {k:"#end",e:"🎉", t:"„Super gemacht!“"}
    ]}
  ].filter(sec => sec.items.length);
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
