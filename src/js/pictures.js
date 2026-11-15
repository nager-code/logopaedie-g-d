/* ================= Bilder zu den Wörtern ================= */
/* Alle Bilder sind von Hand als SVG gezeichnet – im gleichen Stil wie Fips:
   weiche Farbverläufe, farbige Umrisse (dunklere Version der Füllfarbe), Glanzlichter, runde Ecken. */

/* Palette: [hell, mittel, dunkel, Umriss] */
const PIC_PAL = {
  green:  ["#C8F5DE","#7DD9B4","#55BE96","#2F7D63"],
  leaf:   ["#DDF7B8","#96D965","#66B53C","#3E7D22"],
  blue:   ["#DCEBFF","#93BFF5","#6295E0","#2F5FA8"],
  water:  ["#E3F7FF","#8FD6F5","#4FB0E0","#2A7AA8"],
  ice:    ["#F4FDFF","#BDEBFA","#7FD0EE","#3A93B8"],
  yellow: ["#FFF7CC","#FFDB5E","#F5B82E","#B07A12"],
  yolk:   ["#FFEBA8","#FFC23A","#F59E1B","#B8730E"],
  orange: ["#FFE2BD","#FFB062","#F28C2E","#B5601A"],
  red:    ["#FFD3D9","#FF7A8E","#E8455F","#A8243C"],
  pink:   ["#FFE6EE","#FFB3C8","#FF88A8","#C9507A"],
  purple: ["#EFE5FF","#C0A4F0","#9474D8","#5E449E"],
  brown:  ["#F2D5B5","#C9946A","#A8714A","#6E4429"],
  wood:   ["#FFE8C6","#EDBA80","#D49756","#8F5A2B"],
  metal:  ["#FFFFFF","#DCE2EC","#AEB7C6","#5B6478"],
  storm:  ["#E4E6F0","#AEB3C8","#878EA8","#4E5578"],
  white:  ["#FFFFFF","#FFFFFF","#E9E4F4","#8B7FB0"],
  skin:   ["#FFF2E8","#FFD6BA","#F5B690","#B87452"],
  gold:   ["#FFF6BF","#FFD54A","#E8A800","#A87500"],
  dark:   ["#9A8CC0","#5E5088","#3B2C5A","#2A1F4A"],
};

const pf  = k => `fill="url(#pg-${k})" stroke="${PIC_PAL[k][3]}"`;   // Fläche mit Verlauf + Umriss
const pln = k => PIC_PAL[k][3];                                      // Umrissfarbe
const pmd = k => PIC_PAL[k][1];                                      // Mittelton (flach)
/* Glanzlicht */
const phi = (x,y,rx,ry,r=-25,o=.6) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="#fff" opacity="${o}" stroke="none"/>`;
/* Schatten am Boden */
const pgr = (rx=36,cx=60,cy=108) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="5" fill="#3B2C5A" opacity=".13" stroke="none"/>`;
/* Auge wie bei Fips */
const peye = (x,y,r=5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2A1F4A" stroke="none"/><circle cx="${x-r*.32}" cy="${y-r*.35}" r="${r*.42}" fill="#fff" stroke="none"/><circle cx="${x+r*.38}" cy="${y+r*.32}" r="${r*.18}" fill="#fff" stroke="none"/>`;
const pcheek = (x,y,rx=5,ry=3.2) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FF8FB0" opacity=".6" stroke="none"/>`;
const psmile = (x,y,w=8) => `<path d="M${x-w/2} ${y} Q${x} ${y+w*.65} ${x+w/2} ${y}" fill="none" stroke="#3B2C5A" stroke-width="2.6"/>`;
/* dicke Linie mit Umriss (wie Fips' Arm und Schwanz) */
const ptube = (d,k,w=8) => `<path d="${d}" fill="none" stroke="${pln(k)}" stroke-width="${w+6}"/><path d="${d}" fill="none" stroke="${pmd(k)}" stroke-width="${w}"/>`;
/* Tropfen, Glitzer, Wolke */
const pdrop = (x,y,s=1,k="water") => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -9 C2 -4 7 0 7 4 A7 7 0 0 1 -7 4 C-7 0 -2 -4 0 -9 Z" ${pf(k)} stroke-width="${2.6/s}"/>`;
const pspark = (x,y,s=1,c="#FFD36E") => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z" fill="${c}" stroke="none"/>`;
const pcloud = (x,y,s=1,k="white") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 14 A14 14 0 0 1 -32 -14 A20 20 0 0 1 6 -26 A16 16 0 0 1 34 -14 A14 14 0 0 1 32 14 Z" ${pf(k)} stroke-width="${3/s}"/>${phi(-14,-12,9,4,-15,.55)}</g>`;

const PICS = {
  /* ---------- D ---------- */
  Dach: `${pgr(44)}
    <rect x="76" y="20" width="13" height="26" rx="2" ${pf("red")}/>
    <rect x="73" y="16" width="19" height="7" rx="3" ${pf("red")}/>
    <rect x="24" y="58" width="72" height="48" rx="4" ${pf("white")}/>
    <rect x="32" y="68" width="16" height="16" rx="3" ${pf("water")}/>
    <path d="M40 68 V84 M32 76 H48" stroke="${pln("water")}" stroke-width="2"/>
    <rect x="68" y="78" width="18" height="28" rx="8" ${pf("wood")}/>
    <circle cx="82" cy="93" r="1.8" fill="${pln("wood")}" stroke="none"/>
    <path d="M10 66 L60 20 L110 66 Q60 74 10 66 Z" ${pf("red")}/>
    <path d="M34 44 Q60 49 86 44 M22 56 Q60 62 98 56" fill="none" stroke="${pln("red")}" stroke-width="2.4"/>
    ${phi(46,36,10,4,-40)}`,

  Dino: `${pgr(46)}
    <rect x="44" y="84" width="13" height="22" rx="6" ${pf("leaf")}/>
    <rect x="74" y="84" width="13" height="22" rx="6" ${pf("leaf")}/>
    <path d="M36 74 Q16 80 6 100 Q22 92 42 90 Z" ${pf("leaf")}/>
    <path d="M76 70 Q78 44 84 34 L100 36 Q94 54 94 74 Z" ${pf("leaf")}/>
    <ellipse cx="62" cy="76" rx="32" ry="22" ${pf("leaf")}/>
    <rect x="36" y="86" width="13" height="20" rx="6" ${pf("leaf")}/>
    <rect x="66" y="86" width="13" height="20" rx="6" ${pf("leaf")}/>
    <ellipse cx="94" cy="28" rx="17" ry="12" ${pf("leaf")}/>
    <g fill="${pln("leaf")}" opacity=".25" stroke="none"><circle cx="52" cy="66" r="5"/><circle cx="68" cy="62" r="4"/><circle cx="76" cy="74" r="3.5"/></g>
    ${phi(50,62,10,5,-15)}
    ${peye(97,24,5)} ${pcheek(104,32,4,2.6)}
    <path d="M100 34 Q105 37 109 33" fill="none" stroke="#3B2C5A" stroke-width="2.4"/>`,

  Delfin: `
    <path d="M0 98 Q15 90 30 98 T60 98 T90 98 T120 98 V120 H0 Z" ${pf("water")}/>
    <path d="M58 42 Q62 22 76 25 Q68 32 72 41 Z" ${pf("blue")}/>
    <path d="M22 80 Q8 70 4 76 Q11 82 12 92 Q18 84 26 82 Z" ${pf("blue")}/>
    <path d="M20 80 C30 50 60 36 86 42 C96 45 102 50 110 54 C104 59 96 59 90 58 C80 66 60 72 40 77 C32 79 26 85 20 80 Z" ${pf("blue")}/>
    <path d="M42 75 C60 70 78 64 88 58 C96 59 104 58 110 54 C98 64 70 74 44 78 Z" fill="#fff" opacity=".7" stroke="none"/>
    <path d="M64 64 Q64 78 52 82 Q60 72 58 64 Z" ${pf("blue")}/>
    ${phi(56,46,14,5,-18)}
    ${peye(86,48,4)} <path d="M96 56 Q100 58 104 56" fill="none" stroke="#3B2C5A" stroke-width="2.2"/>
    ${pdrop(30,94,.8)} ${pdrop(16,88,.6)} ${pdrop(98,90,.7)}`,

  Nadel: `
    <path d="M18 108 L93 19.3 Q97 14 101.5 17.5 Q105 22 99 24.7 Z" ${pf("metal")}/>
    <ellipse cx="96" cy="21.5" rx="4.5" ry="1.6" transform="rotate(-48 96 21.5)" fill="#fff" stroke="${pln("metal")}" stroke-width="1.8"/>
    ${phi(70,52,14,1.4,-48,.9)}
    <path d="M96 22 Q78 8 62 30 Q44 56 70 66 Q98 74 92 96 Q88 108 74 106" fill="none" stroke="${pln("red")}" stroke-width="6"/>
    <path d="M96 22 Q78 8 62 30 Q44 56 70 66 Q98 74 92 96 Q88 108 74 106" fill="none" stroke="${pmd("red")}" stroke-width="3"/>`,

  /* ---------- G ---------- */
  Giraffe: `
    <path d="M40 120 Q44 74 56 44 L76 48 Q68 82 74 120 Z" ${pf("yellow")}/>
    <path d="M42 112 Q44 76 54 48" fill="none" stroke="${pln("brown")}" stroke-width="7" stroke-dasharray="1 9"/>
    <g fill="${pmd("orange")}" stroke="${pln("orange")}" stroke-width="2">
      <path d="M58 64 Q66 60 68 68 Q64 76 57 72 Z"/><path d="M52 88 Q60 82 64 90 Q60 99 52 96 Z"/><path d="M66 100 Q72 96 74 104 Q70 112 64 108 Z"/></g>
    <path d="M56 22 L54 8" stroke="${pln("yellow")}" stroke-width="4"/><path d="M68 20 L70 6" stroke="${pln("yellow")}" stroke-width="4"/>
    <circle cx="54" cy="7" r="4.5" ${pf("brown")} stroke-width="2.4"/><circle cx="70" cy="5" r="4.5" ${pf("brown")} stroke-width="2.4"/>
    <path d="M46 26 Q32 20 30 28 Q38 34 48 32 Z" ${pf("yellow")}/>
    <ellipse cx="66" cy="32" rx="20" ry="15" ${pf("yellow")}/>
    <ellipse cx="82" cy="40" rx="15" ry="11" ${pf("orange")}/>
    <circle cx="80" cy="38" r="1.8" fill="${pln("orange")}" stroke="none"/><circle cx="88" cy="38" r="1.8" fill="${pln("orange")}" stroke="none"/>
    ${phi(58,24,8,4)} ${peye(64,30,5)} ${pcheek(70,40)} ${psmile(84,44,8)}`,

  Gabel: `${pgr(26)}
    <g transform="rotate(-18 60 60)">
      <path d="M40 10 L40 36 Q40 52 54 55 L54 104 Q54 110 60 110 Q66 110 66 104 L66 55 Q80 52 80 36 L80 10 Q77 7 74 10 L74 34 L68.7 34 L68.7 10 Q65.7 7 62.7 10 L62.7 34 L57.3 34 L57.3 10 Q54.3 7 51.3 10 L51.3 34 L46 34 L46 10 Q43 7 40 10 Z" ${pf("metal")}/>
      ${phi(58,80,2.5,16,0,.9)} ${phi(48,40,2.5,6,0,.9)}
    </g>`,

  Geschenk: `${pgr(44)}
    <rect x="22" y="52" width="76" height="54" rx="5" ${pf("purple")}/>
    <g fill="#fff" opacity=".45" stroke="none"><circle cx="34" cy="66" r="3.5"/><circle cx="42" cy="90" r="3.5"/><circle cx="82" cy="70" r="3.5"/><circle cx="88" cy="94" r="3.5"/></g>
    <rect x="54" y="52" width="12" height="54" ${pf("yellow")}/>
    <rect x="17" y="40" width="86" height="17" rx="5" ${pf("purple")}/>
    <rect x="54" y="40" width="12" height="17" ${pf("yellow")}/>
    <path d="M60 40 Q40 14 30 26 Q24 38 60 40 Z" ${pf("yellow")}/>
    <path d="M60 40 Q80 14 90 26 Q96 38 60 40 Z" ${pf("yellow")}/>
    <ellipse cx="60" cy="40" rx="7" ry="6" ${pf("yellow")}/>
    ${phi(32,46,10,2.5,0,.7)}`,

  Igel: (() => {
    let sp = "M18 92";
    for (let i = 0; i <= 14; i++){
      const a = Math.PI * (1 - i/14), r = i % 2 ? 46 : 36;
      sp += ` L${(60 + Math.cos(a)*r*.95).toFixed(1)} ${(92 - Math.sin(a)*r*1.05).toFixed(1)}`;
    }
    return `${pgr(44,60,106)}
      <path d="${sp} Z" ${pf("brown")}/>
      <path d="M40 70 L46 60 M60 58 L62 46 M78 64 L84 54" stroke="${pln("brown")}" stroke-width="2.2" opacity=".6"/>
      <ellipse cx="44" cy="102" rx="8" ry="5" ${pf("skin")}/><ellipse cx="74" cy="102" rx="8" ry="5" ${pf("skin")}/>
      <path d="M70 92 Q72 64 92 66 Q110 70 112 86 Q104 98 82 98 Z" ${pf("skin")}/>
      <circle cx="112" cy="85" r="4.5" fill="#3B2C5A" stroke="none"/>
      ${phi(96,74,7,3.5,-10)} ${peye(92,80,4.5)} ${pcheek(96,90,4.5,2.8)}
      <path d="M100 93 Q104 95 107 92" fill="none" stroke="#3B2C5A" stroke-width="2.2"/>
      <circle cx="38" cy="60" r="10" ${pf("red")}/><path d="M38 50 Q40 44 44 44" fill="none" stroke="${pln("brown")}" stroke-width="2.4"/>${phi(34,56,3,2)}`;
  })(),
};

/* Verläufe einmal ins Dokument einfügen */
(function(){
  const g = Object.entries(PIC_PAL).map(([k,[a,b,c]]) =>
    `<radialGradient id="pg-${k}" cx=".36" cy=".28" r=".85"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`).join("");
  document.body.insertAdjacentHTML("afterbegin",
    `<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>${g}</defs></svg>`);
})();

/* Bild zu einem Wort – falls es (noch) keins gibt, das Emoji */
function pic(word, fallback = ""){
  const p = PICS[word];
  if (!p) return fallback;
  return `<svg class="pic-svg" viewBox="0 0 120 120" role="img" aria-label="${word}"><g stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${p}</g></svg>`;
}
