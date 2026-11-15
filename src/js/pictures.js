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
  cream:  ["#FFFDF5","#F7EBD3","#E2CBA2","#A88B5E"],
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
    <path d="M8 100 Q20 92 32 98 T56 98 T80 98 T104 98 Q116 98 112 106 Q60 116 12 108 Q4 104 8 100 Z" ${pf("water")}/>
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
    let sp = "", n = 11;
    for (let i = 0; i <= n; i++){
      const a = Math.PI*(0.97 - 0.86*i/n), v = [56+Math.cos(a)*40, 92-Math.sin(a)*40];
      if (i === 0) sp = `M${v[0].toFixed(1)} ${v[1].toFixed(1)}`;
      else {
        const m = Math.PI*(0.97 - 0.86*(i-.5)/n), t = [56+Math.cos(m)*54, 92-Math.sin(m)*54];
        sp += ` Q${t[0].toFixed(1)} ${t[1].toFixed(1)} ${t[0].toFixed(1)} ${t[1].toFixed(1)} L${v[0].toFixed(1)} ${v[1].toFixed(1)}`;
      }
    }
    return `${pgr(46,60,106)}
      <path d="${sp} Q92 100 56 100 Q18 100 16 92 Z" ${pf("brown")}/>
      <path d="${sp}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".25" transform="translate(56 92) scale(.8) translate(-56 -92)"/>
      <ellipse cx="42" cy="102" rx="8" ry="5" ${pf("skin")}/><ellipse cx="76" cy="102" rx="8" ry="5" ${pf("skin")}/>
      <path d="M68 94 Q70 66 90 66 Q108 70 112 86 Q104 98 82 98 Z" ${pf("skin")}/>
      <circle cx="112" cy="85" r="4.5" fill="#3B2C5A" stroke="none"/>
      ${phi(94,73,7,3.5,-10)} ${peye(92,80,4.5)} ${pcheek(96,90,4.5,2.8)}
      <path d="M100 93 Q104 95 107 92" fill="none" stroke="#3B2C5A" stroke-width="2.2"/>
      <circle cx="44" cy="52" r="10" ${pf("red")}/><path d="M44 42 Q46 36 50 36" fill="none" stroke="${pln("brown")}" stroke-width="2.4"/>${phi(40,48,3,2)}`;
  })(),

  Dose: `${pgr(32)}
    <path d="M34 30 V96 A26 8 0 0 0 86 96 V30 Z" ${pf("metal")}/>
    <path d="M34 44 V84 A26 8 0 0 0 86 84 V44 A26 8 0 0 1 34 44 Z" ${pf("red")}/>
    <ellipse cx="60" cy="66" rx="13" ry="12" fill="#fff" stroke="${pln("red")}" stroke-width="2.4"/>
    <circle cx="60" cy="66" r="7" ${pf("red")} stroke-width="2"/><path d="M60 59 Q62 55 66 55" fill="none" stroke="${pln("leaf")}" stroke-width="2.4"/>
    <ellipse cx="60" cy="30" rx="26" ry="8" ${pf("metal")}/>
    <ellipse cx="60" cy="30" rx="20" ry="5.5" fill="none" stroke="${pln("metal")}" stroke-width="1.8"/>
    <path d="M58 29 Q62 22 70 26 Q66 30 60 30" fill="none" stroke="${pln("metal")}" stroke-width="2.2"/>
    ${phi(42,70,3,20,0,.55)}`,

  Dusche: `
    ${ptube("M24 8 V28 Q24 38 34 38 H58", "metal", 7)}
    <path d="M48 34 H72 L86 56 H34 Z" ${pf("metal")}/>
    <ellipse cx="60" cy="56" rx="26" ry="6" ${pf("metal")}/>
    <g fill="${pln("water")}" stroke="none"><circle cx="48" cy="56" r="1.4"/><circle cx="56" cy="57" r="1.4"/><circle cx="64" cy="57" r="1.4"/><circle cx="72" cy="56" r="1.4"/></g>
    ${phi(54,42,8,2.5,0,.8)}
    ${pdrop(40,72,.8)} ${pdrop(54,78,.9)} ${pdrop(68,72,.8)} ${pdrop(80,80,.7)}
    ${pdrop(46,94,.8)} ${pdrop(62,98,.9)} ${pdrop(76,96,.7)} ${pdrop(34,88,.6)}
    <ellipse cx="60" cy="110" rx="36" ry="5" fill="${pmd("water")}" opacity=".5" stroke="none"/>`,

  Daumen: `
    <rect x="36" y="96" width="50" height="18" rx="6" ${pf("blue")}/>
    <path d="M44 56 Q38 26 50 18 Q64 14 64 30 L62 54 Z" ${pf("skin")}/>
    <rect x="36" y="50" width="52" height="50" rx="16" ${pf("skin")}/>
    <path d="M60 62 H86 M60 74 H87 M60 86 H85" fill="none" stroke="${pln("skin")}" stroke-width="2.4"/>
    <path d="M44 58 Q52 54 62 56" fill="none" stroke="${pln("skin")}" stroke-width="2.4"/>
    <ellipse cx="54" cy="24" rx="5.5" ry="4.5" fill="#FFEAF0" stroke="${pln("skin")}" stroke-width="2"/>
    ${phi(46,66,4,10,-10)}
    ${pspark(98,28,.9)} ${pspark(22,38,.6)}`,

  Dorf: `
    <path d="M0 100 Q60 86 120 100 V120 H0 Z" ${pf("leaf")}/>
    <rect x="46" y="38" width="26" height="62" rx="2" ${pf("white")}/>
    <path d="M42 40 L59 8 L76 40 Z" ${pf("purple")}/>
    <circle cx="59" cy="52" r="7" fill="#fff" stroke="${pln("purple")}" stroke-width="2.4"/>
    <path d="M59 48 V52 L62 54" fill="none" stroke="#3B2C5A" stroke-width="1.8"/>
    <rect x="54" y="80" width="10" height="20" rx="5" ${pf("wood")}/>
    <rect x="10" y="66" width="30" height="34" rx="2" ${pf("yellow")}/>
    <path d="M6 68 L25 48 L44 68 Z" ${pf("red")}/>
    <rect x="18" y="76" width="10" height="10" rx="2" ${pf("water")} stroke-width="2"/>
    <rect x="80" y="62" width="32" height="38" rx="2" ${pf("pink")}/>
    <path d="M76 64 L96 44 L116 64 Z" ${pf("blue")}/>
    <rect x="86" y="74" width="10" height="10" rx="2" ${pf("water")} stroke-width="2"/>
    <rect x="100" y="82" width="8" height="18" rx="4" ${pf("wood")} stroke-width="2.4"/>
    ${phi(54,24,3,8,25)}`,

  Dame: `
    <path d="M38 52 Q34 72 42 84 H78 Q86 72 82 52 Z" ${pf("brown")}/>
    <path d="M20 118 Q22 86 60 82 Q98 86 100 118 Z" ${pf("purple")}/>
    <path d="M48 84 Q60 98 72 84" fill="${pmd("skin")}" stroke="${pln("skin")}"/>
    <g fill="#fff" stroke="${pln("white")}" stroke-width="1.5"><circle cx="48" cy="90" r="2.8"/><circle cx="54" cy="94" r="2.8"/><circle cx="60" cy="96" r="2.8"/><circle cx="66" cy="94" r="2.8"/><circle cx="72" cy="90" r="2.8"/></g>
    <circle cx="60" cy="56" r="22" ${pf("skin")}/>
    <path d="M40 46 Q50 38 62 40 Q74 38 80 48 Q72 34 60 34 Q46 34 40 46 Z" ${pf("brown")}/>
    <ellipse cx="60" cy="36" rx="40" ry="8" ${pf("pink")}/>
    <path d="M40 36 Q40 12 60 12 Q80 12 80 36 Z" ${pf("pink")}/>
    <path d="M41 30 Q60 34 79 30" fill="none" stroke="${pln("purple")}" stroke-width="5"/>
    <circle cx="82" cy="26" r="6" ${pf("yellow")} stroke-width="2.4"/><circle cx="82" cy="26" r="2.4" fill="${pmd("orange")}" stroke="none"/>
    ${phi(52,20,8,4,-15)}
    ${peye(52,56,4)} ${peye(68,56,4)} ${pcheek(47,65)} ${pcheek(73,65)} ${psmile(60,66,9)}
    <path d="M47 50 L44 47 M73 50 L76 47" stroke="#3B2C5A" stroke-width="2"/>`,

  Donner: `
    <path d="M62 56 L46 84 H58 L50 112 L78 74 H64 L74 56 Z" ${pf("yellow")}/>
    ${pcloud(60,46,1.12,"storm")}
    <g fill="none" stroke="${pln("storm")}" stroke-width="3"><path d="M14 84 Q8 74 14 64"/><path d="M6 90 Q-2 74 6 58"/><path d="M106 84 Q112 74 106 64"/><path d="M114 90 Q122 74 114 58"/></g>
    <path d="M44 44 Q48 40 52 44 M68 44 Q72 40 76 44" fill="none" stroke="#3B2C5A" stroke-width="2.6"/>
    <ellipse cx="60" cy="54" rx="5" ry="4" fill="#3B2C5A" stroke="none"/>`,

  Diamant: `${pgr(30)}
    <path d="M24 44 L42 24 H78 L96 44 L60 100 Z" ${pf("ice")}/>
    <path d="M24 44 H96 M42 24 L50 44 L60 24 L70 44 L78 24 M50 44 L60 100 M70 44 L60 100" fill="none" stroke="${pln("ice")}" stroke-width="2.4"/>
    <path d="M42 24 L50 44 L60 24 Z M24 44 L50 44 L60 100 Z" fill="#fff" opacity=".55" stroke="none"/>
    ${pspark(98,20,1.1)} ${pspark(18,24,.7)} ${pspark(100,74,.6,"#C9F2FF")}`,

  Dieb: `
    <path d="M20 118 Q22 82 56 78 Q90 82 92 118 Z" ${pf("white")}/>
    <path d="M24 96 H88 M22 108 H90" fill="none" stroke="${pln("dark")}" stroke-width="6"/>
    <path d="M90 62 Q106 56 112 74 Q118 96 98 104 Q80 108 76 92 Q74 72 90 62 Z" ${pf("wood")}/>
    <path d="M86 64 Q92 58 96 64" fill="none" stroke="${pln("wood")}" stroke-width="3"/>
    <circle cx="56" cy="52" r="22" ${pf("skin")}/>
    <path d="M33 46 Q34 22 56 22 Q78 22 79 46 Z" ${pf("dark")}/>
    <circle cx="56" cy="20" r="6" ${pf("dark")}/>
    <rect x="33" y="44" width="46" height="13" rx="6.5" ${pf("dark")}/>
    <ellipse cx="47" cy="50.5" rx="6" ry="4.5" fill="#fff" stroke="none"/><ellipse cx="65" cy="50.5" rx="6" ry="4.5" fill="#fff" stroke="none"/>
    <circle cx="48" cy="51" r="2.6" fill="#2A1F4A" stroke="none"/><circle cx="66" cy="51" r="2.6" fill="#2A1F4A" stroke="none"/>
    ${pcheek(44,63)} ${pcheek(68,63)}
    <path d="M50 66 Q58 70 64 64" fill="none" stroke="#3B2C5A" stroke-width="2.6"/>
    ${phi(46,30,8,3,-15,.35)}`,

  Dampfer: `
    <circle cx="44" cy="22" r="7" ${pf("storm")} stroke-width="2.4"/><circle cx="36" cy="12" r="5" ${pf("storm")} stroke-width="2.2"/>
    <circle cx="70" cy="18" r="8" ${pf("storm")} stroke-width="2.4"/><circle cx="80" cy="8" r="5" ${pf("storm")} stroke-width="2.2"/>
    <rect x="38" y="30" width="13" height="24" ${pf("red")}/><rect x="38" y="30" width="13" height="6" fill="${pln("dark")}" stroke="${pln("red")}"/>
    <rect x="63" y="28" width="13" height="26" ${pf("red")}/><rect x="63" y="28" width="13" height="6" fill="${pln("dark")}" stroke="${pln("red")}"/>
    <rect x="26" y="52" width="66" height="20" rx="3" ${pf("white")}/>
    <g fill="${pmd("water")}" stroke="${pln("water")}" stroke-width="2"><circle cx="38" cy="62" r="4"/><circle cx="52" cy="62" r="4"/><circle cx="66" cy="62" r="4"/><circle cx="80" cy="62" r="4"/></g>
    <path d="M10 72 H110 L98 96 H22 Z" ${pf("blue")}/>
    <path d="M14 82 H106" stroke="${pln("red")}" stroke-width="4"/>
    <path d="M8 102 Q20 94 32 100 T56 100 T80 100 T104 100 Q116 100 112 108 Q60 116 12 110 Q4 106 8 102 Z" ${pf("water")}/>
    ${phi(30,76,10,2.5,0,.6)}`,

  Dirndl: `
    <path d="M54 14 Q54 6 60 6 Q66 6 66 12" fill="none" stroke="${pln("metal")}" stroke-width="3"/>
    <path d="M30 22 Q60 12 90 22" fill="none" stroke="${pln("wood")}" stroke-width="5"/>
    <circle cx="38" cy="30" r="9" ${pf("white")}/><circle cx="82" cy="30" r="9" ${pf("white")}/>
    <path d="M40 54 L80 54 L104 106 Q60 116 16 106 Z" ${pf("red")}/>
    <path d="M44 24 H76 L80 56 H40 Z" ${pf("leaf")}/>
    <path d="M48 24 Q60 38 72 24 Z" fill="#fff" stroke="${pln("white")}" stroke-width="2"/>
    <path d="M54 38 L66 42 M54 44 L66 48 M54 50 L66 54" stroke="${pln("yellow")}" stroke-width="2"/>
    <path d="M48 56 H72 L80 102 Q60 106 40 102 Z" ${pf("blue")}/>
    <path d="M44 66 L76 66" stroke="${pln("blue")}" stroke-width="2" stroke-dasharray="2 4"/>
    <path d="M72 56 Q84 50 84 60 Q80 64 72 58 Z M72 56 L78 72 M72 58 L70 72" ${pf("pink")} stroke-width="2.4"/>
    <g fill="#fff" opacity=".7" stroke="none"><circle cx="26" cy="96" r="2.5"/><circle cx="92" cy="96" r="2.5"/><circle cx="34" cy="80" r="2.5"/><circle cx="86" cy="80" r="2.5"/></g>`,

  Dattel: `${pgr(40)}
    <path d="M58 54 Q40 30 14 26 Q34 40 40 56 M60 52 Q66 26 92 14 Q78 34 74 54 M58 54 Q50 40 34 14" fill="none" stroke="${pln("leaf")}" stroke-width="4"/>
    <path d="M58 54 Q40 30 14 26 Q34 40 40 56 M60 52 Q66 26 92 14 Q78 34 74 54" fill="none" stroke="${pmd("leaf")}" stroke-width="1.5"/>
    <ellipse cx="40" cy="84" rx="13" ry="22" transform="rotate(-30 40 84)" ${pf("brown")}/>
    <ellipse cx="80" cy="84" rx="13" ry="22" transform="rotate(30 80 84)" ${pf("brown")}/>
    <ellipse cx="60" cy="78" rx="13" ry="23" ${pf("brown")}/>
    <path d="M54 66 Q58 74 54 84 M66 80 Q62 88 66 94" fill="none" stroke="${pln("brown")}" stroke-width="1.8"/>
    ${phi(54,68,3,8,0)} ${phi(34,76,3,7,-30)} ${phi(76,72,3,7,30)}`,

  Düse: `
    <path d="M44 84 Q60 124 76 84 Z" ${pf("orange")}/>
    <path d="M51 84 Q60 108 69 84 Z" fill="${pmd("yellow")}" stroke="none"/>
    <path d="M42 64 Q28 70 26 88 L42 80 Z" ${pf("red")}/>
    <path d="M78 64 Q92 70 94 88 L78 80 Z" ${pf("red")}/>
    <path d="M46 72 H74 L80 86 H40 Z" ${pf("metal")}/>
    <path d="M60 6 Q82 26 79 72 H41 Q38 26 60 6 Z" ${pf("white")}/>
    <path d="M47 20 Q60 4 73 20 Q60 16 47 20 Z" ${pf("red")}/>
    <circle cx="60" cy="42" r="10" ${pf("water")}/>
    ${phi(57,39,4,2.5)} ${phi(50,52,3,14,0,.5)}
    ${pspark(18,26,.7)} ${pspark(100,40,.9)}`,

  Duft: `${pgr(26)}
    ${ptube("M60 108 Q58 86 60 66", "leaf", 5)}
    <path d="M60 92 Q44 80 36 90 Q46 100 60 92 Z" ${pf("leaf")}/>
    <path d="M60 86 Q74 72 84 80 Q76 92 60 86 Z" ${pf("leaf")}/>
    <g ${pf("pink")}><circle cx="60" cy="38" r="11"/><circle cx="73" cy="48" r="11"/><circle cx="68" cy="62" r="11"/><circle cx="52" cy="62" r="11"/><circle cx="47" cy="48" r="11"/></g>
    <circle cx="60" cy="52" r="8" ${pf("yellow")}/>
    ${phi(57,34,4,2.5)}
    <g fill="none" stroke="${pln("purple")}" stroke-width="2.6" opacity=".8">
      <path d="M30 34 Q24 28 30 22 Q36 16 30 10"/><path d="M90 30 Q84 24 90 18 Q96 12 90 6"/><path d="M104 54 Q98 48 104 42 Q110 36 104 30"/></g>`,

  Domino: `${pgr(40)}
    <g transform="rotate(14 74 60)">
      <rect x="56" y="18" width="38" height="76" rx="8" ${pf("white")}/>
      <path d="M60 56 H90" stroke="${pln("white")}" stroke-width="2.4"/>
      <g fill="#3B2C5A" stroke="none"><circle cx="75" cy="37" r="4.5"/><circle cx="66" cy="66" r="4.5"/><circle cx="84" cy="66" r="4.5"/><circle cx="66" cy="84" r="4.5"/><circle cx="84" cy="84" r="4.5"/><circle cx="75" cy="75" r="4.5"/></g>
    </g>
    <g transform="rotate(-12 46 62)">
      <rect x="26" y="22" width="38" height="78" rx="8" ${pf("white")}/>
      <path d="M30 61 H60" stroke="${pln("white")}" stroke-width="2.4"/>
      <g fill="#3B2C5A" stroke="none"><circle cx="36" cy="32" r="4.5"/><circle cx="54" cy="50" r="4.5"/><circle cx="45" cy="41" r="4.5"/><circle cx="36" cy="72" r="4.5"/><circle cx="54" cy="90" r="4.5"/></g>
      ${phi(32,40,2.5,10,0,.9)}
    </g>`,

  Dübel: `${pgr(26)}
    <path d="M46 34 H74 L70 42 L76 50 L70 58 L76 66 L70 74 L74 82 L66 94 L60 104 L54 94 L46 82 L50 74 L44 66 L50 58 L44 50 L50 42 Z" ${pf("storm")}/>
    <path d="M60 40 V92" stroke="${pln("storm")}" stroke-width="2.4"/>
    ${phi(52,60,2.5,14,0,.6)}
    <path d="M42 30 V26 A18 6 0 0 1 78 26 V30 A18 6 0 0 1 42 30 Z" ${pf("metal")}/>
    <ellipse cx="60" cy="26" rx="18" ry="6" ${pf("metal")}/>
    <path d="M52 26 H68 M60 23 V29" stroke="${pln("metal")}" stroke-width="2.6"/>
    ${pspark(96,30,.7)}`,

  Dotter: `
    <ellipse cx="60" cy="76" rx="52" ry="26" ${pf("water")}/>
    <ellipse cx="60" cy="72" rx="42" ry="19" fill="#fff" opacity=".45" stroke="none"/>
    <path d="M24 66 Q20 46 42 42 Q56 30 76 38 Q102 40 100 62 Q104 84 80 86 Q60 94 40 86 Q20 84 24 66 Z" ${pf("white")}/>
    <circle cx="62" cy="62" r="17" ${pf("yolk")}/>
    ${phi(56,55,6,4)} ${phi(36,58,6,2.5,-30,.9)}`,

  Dorn: `
    <path d="M14 108 Q50 74 70 48 Q86 26 108 12" fill="none" stroke="${pln("leaf")}" stroke-width="13"/>
    <g ${pf("red")} stroke-width="2.6">
      <path d="M34 84 L18 74 L40 76 Z"/><path d="M54 66 L58 46 L64 58 Z"/><path d="M72 46 L92 46 L78 54 Z"/><path d="M86 28 L84 10 L94 22 Z"/><path d="M48 76 L58 92 L42 84 Z"/></g>
    <path d="M14 108 Q50 74 70 48 Q86 26 108 12" fill="none" stroke="${pmd("leaf")}" stroke-width="7"/>
    <path d="M20 100 Q50 72 66 50" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>
    <path d="M78 38 Q96 44 106 34 Q96 26 78 38 Z" ${pf("leaf")}/>
    <path d="M40 80 Q30 96 16 96 Q22 80 40 80 Z" ${pf("leaf")}/>`,
  Nudel: `
    <ellipse cx="60" cy="80" rx="52" ry="22" ${pf("white")}/>
    <ellipse cx="60" cy="78" rx="38" ry="14" fill="none" stroke="${pln("white")}" stroke-width="1.6" opacity=".6"/>
    <path d="M24 78 Q22 52 46 46 Q60 40 76 46 Q100 52 96 78 Q60 90 24 78 Z" ${pf("yellow")}/>
    <g fill="none" stroke="${pln("yellow")}" stroke-width="2" opacity=".8">
      <path d="M30 72 Q40 56 52 70 T74 66 T92 72"/><path d="M34 62 Q46 50 58 60 T82 58"/><path d="M40 80 Q52 70 64 80 T88 78"/></g>
    <path d="M42 54 Q48 38 62 40 Q78 38 80 54 Q72 62 60 58 Q48 62 42 54 Z" ${pf("red")}/>
    <path d="M60 42 Q66 34 74 38 Q68 44 60 42 Z" ${pf("leaf")} stroke-width="2.2"/>
    ${phi(52,46,5,2.5)}
    ${ptube("M96 30 L76 62", "metal", 4)}`,

  Pudel: `${pgr(40)}
    <rect x="34" y="70" width="7" height="30" rx="3.5" ${pf("pink")} stroke-width="2.6"/>
    <rect x="72" y="70" width="7" height="30" rx="3.5" ${pf("pink")} stroke-width="2.6"/>
    <path d="M30 64 Q16 52 18 40" fill="none" stroke="${pln("pink")}" stroke-width="3"/>
    <circle cx="18" cy="38" r="8" ${pf("pink")}/>
    <ellipse cx="54" cy="66" rx="28" ry="14" ${pf("pink")}/>
    <g ${pf("pink")}><circle cx="78" cy="62" r="13"/><circle cx="72" cy="52" r="10"/></g>
    <rect x="42" y="72" width="7" height="30" rx="3.5" ${pf("pink")} stroke-width="2.6"/>
    <rect x="80" y="72" width="7" height="30" rx="3.5" ${pf("pink")} stroke-width="2.6"/>
    <g ${pf("pink")}><circle cx="38" cy="102" r="6.5"/><circle cx="46" cy="104" r="6.5"/><circle cx="76" cy="102" r="6.5"/><circle cx="84" cy="104" r="6.5"/></g>
    <path d="M78 44 Q92 26 100 40 Q104 48 96 50 Z" ${pf("pink")}/>
    <ellipse cx="92" cy="40" rx="15" ry="13" ${pf("pink")}/>
    <ellipse cx="104" cy="46" rx="9" ry="6" ${pf("pink")}/>
    <circle cx="111" cy="44" r="3.5" fill="#3B2C5A" stroke="none"/>
    <g ${pf("pink")}><circle cx="86" cy="26" r="7"/><circle cx="96" cy="24" r="7"/></g>
    <path d="M86 18 L80 12 L86 10 Z M86 18 L92 12 L92 18 Z" ${pf("purple")} stroke-width="2"/>
    <ellipse cx="80" cy="46" rx="7" ry="11" ${pf("pink")}/>
    <path d="M70 60 Q80 64 88 58" fill="none" stroke="${pln("purple")}" stroke-width="4"/>
    ${peye(93,38,4)} ${pcheek(98,47,3.5,2.4)}`,

  Feder: `
    <path d="M30 96 Q34 58 66 32 Q88 14 104 12 Q104 30 88 54 Q66 84 30 96 Z" ${pf("purple")}/>
    <path d="M66 32 Q80 24 86 28 M52 48 Q64 44 70 48 M44 64 L56 64 M80 46 Q86 50 84 58 M70 62 Q74 68 70 74" fill="none" stroke="${pln("purple")}" stroke-width="2"/>
    <path d="M20 108 Q60 64 102 14" fill="none" stroke="${pln("purple")}" stroke-width="3.5"/>
    <path d="M42 80 Q64 54 92 26" fill="none" stroke="#fff" stroke-width="2" opacity=".55"/>
    ${phi(62,40,8,3,-40)}`,

  Boden: `
    <rect x="8" y="8" width="104" height="40" rx="6" ${pf("pink")}/>
    <rect x="22" y="16" width="26" height="22" rx="3" ${pf("water")}/>
    <path d="M35 16 V38 M22 27 H48" stroke="${pln("water")}" stroke-width="2"/>
    <path d="M8 48 H112 L118 104 Q118 112 110 112 H10 Q2 112 2 104 Z" ${pf("wood")}/>
    <path d="M7 60 H113 M5 74 H115 M3 90 H117" stroke="${pln("wood")}" stroke-width="2"/>
    <path d="M30 48 L26 60 M70 48 L71 60 M50 60 L48 74 M92 60 L94 74 M24 74 L20 90 M68 74 L68 90 M44 90 L42 112 M88 90 L90 112" stroke="${pln("wood")}" stroke-width="2"/>
    <rect x="8" y="44" width="104" height="6" rx="2" ${pf("white")} stroke-width="2.2"/>
    ${pgr(12,84,98)}
    <circle cx="84" cy="86" r="11" ${pf("red")}/><path d="M73 86 H95" stroke="${pln("red")}" stroke-width="2"/>
    ${phi(80,81,3.5,2.5)} ${phi(30,66,16,2,0,.45)} ${phi(40,96,14,2,0,.35)}`,

  Leder: `${pgr(42)}
    <path d="M40 54 Q40 22 60 22 Q80 22 80 54" fill="none" stroke="${pln("brown")}" stroke-width="10"/>
    <path d="M40 54 Q40 22 60 22 Q80 22 80 54" fill="none" stroke="${pmd("brown")}" stroke-width="5"/>
    <path d="M20 52 H100 L94 104 H26 Z" ${pf("brown")}/>
    <path d="M26 58 H94 L90 98 H30 Z" fill="none" stroke="${pln("wood")}" stroke-width="1.8" stroke-dasharray="4 3"/>
    <path d="M20 52 H100 L98 70 Q60 82 22 70 Z" ${pf("brown")}/>
    <rect x="53" y="68" width="14" height="12" rx="3" ${pf("gold")} stroke-width="2.4"/>
    ${phi(36,60,10,3,0,.45)}`,

  Ruder: `
    <path d="M6 92 Q20 84 34 90 T60 90 T86 90 T112 90 Q120 96 112 104 Q60 114 10 106 Q0 100 6 92 Z" ${pf("water")}/>
    <path d="M14 58 H106 Q100 86 78 88 H42 Q20 86 14 58 Z" ${pf("red")}/>
    <path d="M16 66 H104" stroke="#fff" stroke-width="4" opacity=".7"/>
    ${phi(32,74,12,2.5,0,.5)}
    ${ptube("M44 56 L18 90", "wood", 5)}
    <ellipse cx="15" cy="94" rx="6" ry="13" transform="rotate(38 15 94)" ${pf("wood")}/>
    ${ptube("M76 56 L102 90", "wood", 5)}
    <ellipse cx="105" cy="94" rx="6" ry="13" transform="rotate(-38 105 94)" ${pf("wood")}/>
    <path d="M10 100 Q20 96 30 100 M90 100 Q100 96 110 100" fill="none" stroke="${pln("water")}" stroke-width="2.4"/>`,

  Rodel: `
    <path d="M10 102 Q40 90 70 96 Q96 100 112 94 Q120 104 108 110 H14 Q2 110 10 102 Z" ${pf("white")}/>
    <path d="M100 66 Q114 60 112 46" fill="none" stroke="${pln("brown")}" stroke-width="2.6"/>
    <path d="M30 62 V86 M50 62 V86 M70 62 V86 M88 62 V86" stroke="${pln("wood")}" stroke-width="8"/>
    <path d="M30 62 V86 M50 62 V86 M70 62 V86 M88 62 V86" stroke="${pmd("wood")}" stroke-width="3.5"/>
    ${ptube("M14 88 H90 Q104 88 104 76 Q104 66 96 64", "red", 5)}
    <rect x="20" y="54" width="80" height="12" rx="5" ${pf("wood")}/>
    <path d="M40 54 V66 M60 54 V66 M80 54 V66" stroke="${pln("wood")}" stroke-width="2"/>
    ${phi(32,58,10,2,0,.6)}
    <g fill="#fff" stroke="${pln("ice")}" stroke-width="1.5"><circle cx="20" cy="22" r="3"/><circle cx="58" cy="14" r="2.5"/><circle cx="96" cy="26" r="3"/><circle cx="36" cy="38" r="2"/><circle cx="80" cy="40" r="2"/></g>`,

  Radio: `${pgr(44)}
    <path d="M36 40 Q36 22 60 22 Q84 22 84 40" fill="none" stroke="${pln("dark")}" stroke-width="7"/>
    <path d="M36 40 Q36 22 60 22 Q84 22 84 40" fill="none" stroke="${pmd("dark")}" stroke-width="3"/>
    <path d="M84 40 L104 10" stroke="${pln("metal")}" stroke-width="3"/><circle cx="104" cy="10" r="4" ${pf("red")} stroke-width="2"/>
    <rect x="14" y="38" width="92" height="64" rx="14" ${pf("red")}/>
    <circle cx="42" cy="70" r="20" ${pf("white")}/>
    <g fill="${pln("white")}" stroke="none"><circle cx="42" cy="70" r="3"/><circle cx="34" cy="64" r="2.4"/><circle cx="50" cy="64" r="2.4"/><circle cx="34" cy="76" r="2.4"/><circle cx="50" cy="76" r="2.4"/><circle cx="42" cy="58" r="2.4"/><circle cx="42" cy="82" r="2.4"/></g>
    <rect x="68" y="52" width="28" height="14" rx="4" ${pf("yellow")} stroke-width="2.4"/>
    <path d="M74 52 V58 M80 52 V60 M86 52 V58 M83 50 V68" stroke="${pln("yellow")}" stroke-width="1.8"/>
    <circle cx="74" cy="84" r="6" ${pf("dark")} stroke-width="2.4"/><circle cx="90" cy="84" r="6" ${pf("dark")} stroke-width="2.4"/>
    ${phi(26,48,8,3,-10)}
    <g fill="${pmd("purple")}" stroke="${pln("purple")}" stroke-width="2"><ellipse cx="14" cy="22" rx="4" ry="3"/><path d="M18 22 V8 L24 10" fill="none"/></g>`,

  Wade: `${pgr(30,64,108)}
    <path d="M42 18 Q30 42 42 66 L48 92 H68 L70 66 Q74 42 74 18 Z" ${pf("skin")}/>
    <path d="M40 34 Q34 48 42 62" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
    <rect x="36" y="4" width="42" height="22" rx="6" ${pf("blue")}/>
    <rect x="46" y="80" width="23" height="16" rx="3" ${pf("white")}/>
    <path d="M46 86 H69" stroke="${pln("red")}" stroke-width="3"/>
    <path d="M44 94 H70 Q96 94 100 104 V108 H44 Z" ${pf("red")}/>
    <path d="M44 104 H100" stroke="#fff" stroke-width="4"/>
    ${pspark(22,46,.9)} ${pspark(28,64,.5)}`,

  Schublade: `${pgr(48)}
    <rect x="24" y="96" width="8" height="12" ${pf("wood")} stroke-width="2.4"/><rect x="88" y="96" width="8" height="12" ${pf("wood")} stroke-width="2.4"/>
    <rect x="18" y="22" width="84" height="76" rx="5" ${pf("wood")}/>
    <rect x="14" y="16" width="92" height="9" rx="3" ${pf("wood")}/>
    <rect x="24" y="30" width="72" height="18" rx="3" ${pf("wood")} stroke-width="2.4"/>
    <rect x="24" y="76" width="72" height="16" rx="3" ${pf("wood")} stroke-width="2.4"/>
    <circle cx="60" cy="39" r="3" ${pf("gold")} stroke-width="2"/><circle cx="60" cy="84" r="3" ${pf("gold")} stroke-width="2"/>
    <path d="M30 52 Q36 46 44 52 Q48 44 56 52 Q62 46 72 52" fill="none"/>
    <path d="M34 56 Q34 44 44 44 L44 56 Z" ${pf("red")} stroke-width="2.4"/>
    <path d="M60 56 Q58 42 70 40 Q78 42 76 56 Z" ${pf("blue")} stroke-width="2.4"/>
    <path d="M14 54 H106 L102 74 H18 Z" ${pf("orange")}/>
    <circle cx="60" cy="64" r="3.5" ${pf("gold")} stroke-width="2"/>
    ${phi(30,60,10,2,0,.5)}`,

  Limonade: `${pgr(26)}
    <path d="M32 28 H88 L80 104 H40 Z" ${pf("white")} stroke="${pln("ice")}"/>
    <path d="M35 46 H85 L80 100 H40 Z" ${pf("yellow")} stroke="none"/>
    <path d="M35 46 H85" stroke="${pln("yellow")}" stroke-width="2.4"/>
    <path d="M32 28 H88 L80 104 H40 Z" fill="none" stroke="${pln("ice")}"/>
    <path d="M70 6 L56 92" stroke="${pln("red")}" stroke-width="7"/><path d="M70 6 L56 92" stroke="#fff" stroke-width="3.5"/>
    <path d="M69 12 L67 24 M66 32 L64 44" stroke="${pmd("red")}" stroke-width="3.5"/>
    <rect x="44" y="54" width="14" height="14" rx="3" transform="rotate(15 51 61)" fill="#fff" opacity=".7" stroke="${pln("ice")}" stroke-width="1.6"/>
    <g fill="#fff" opacity=".8" stroke="none"><circle cx="66" cy="78" r="2.5"/><circle cx="72" cy="66" r="2"/><circle cx="50" cy="86" r="2"/><circle cx="60" cy="94" r="1.6"/></g>
    <circle cx="88" cy="30" r="15" ${pf("yellow")}/>
    <circle cx="88" cy="30" r="10" fill="#FFF7CC" stroke="${pln("yellow")}" stroke-width="1.6"/>
    <path d="M88 20 V40 M78 30 H98 M81 23 L95 37 M95 23 L81 37" stroke="${pln("yellow")}" stroke-width="1.4"/>
    ${phi(40,60,2.5,16,-4,.7)}`,

  Faden: `${pgr(32)}
    <path d="M40 36 H80 V84 H40 Z" ${pf("red")}/>
    <path d="M40 44 H80 M40 52 H80 M40 60 H80 M40 68 H80 M40 76 H80" stroke="${pln("red")}" stroke-width="1.6" opacity=".7"/>
    <path d="M30 86 V96 A30 8 0 0 0 90 96 V86 Z" ${pf("wood")}/>
    <ellipse cx="60" cy="86" rx="30" ry="8" ${pf("wood")}/>
    <path d="M30 26 V34 A30 8 0 0 0 90 34 V26 Z" ${pf("wood")}/>
    <ellipse cx="60" cy="26" rx="30" ry="8" ${pf("wood")}/>
    <ellipse cx="60" cy="26" rx="7" ry="2.5" fill="${pln("wood")}" stroke="none"/>
    ${phi(48,60,3,16,0,.5)}
    <path d="M80 70 Q100 72 104 86 Q108 100 92 100 Q80 98 88 88 Q96 80 112 92" fill="none" stroke="${pln("red")}" stroke-width="5"/>
    <path d="M80 70 Q100 72 104 86 Q108 100 92 100 Q80 98 88 88 Q96 80 112 92" fill="none" stroke="${pmd("red")}" stroke-width="2.4"/>`,

  Paddel: `${pgr(26)}
    <g transform="rotate(22 60 60)">
      <rect x="47" y="6" width="26" height="8" rx="4" ${pf("dark")}/>
      ${ptube("M60 12 V70", "wood", 6)}
      <path d="M60 62 Q76 66 76 86 Q76 108 60 112 Q44 108 44 86 Q44 66 60 62 Z" ${pf("yellow")}/>
      <path d="M60 68 V104" stroke="${pln("yellow")}" stroke-width="2.4"/>
      ${phi(52,80,3,10,0,.7)}
    </g>`,

  Bude: `${pgr(46)}
    <rect x="22" y="50" width="76" height="56" ${pf("wood")}/>
    <path d="M22 60 H98 M22 71 H98 M22 82 H98 M22 94 H98" stroke="${pln("wood")}" stroke-width="2" opacity=".8"/>
    <rect x="30" y="62" width="22" height="20" rx="2" ${pf("water")}/>
    <path d="M41 62 V82 M30 72 H52" stroke="${pln("water")}" stroke-width="2"/>
    <path d="M28 60 H54" stroke="${pln("red")}" stroke-width="5"/>
    <rect x="66" y="68" width="22" height="38" rx="3" ${pf("brown")}/>
    <circle cx="84" cy="88" r="2" fill="${pln("brown")}" stroke="none"/>
    <path d="M10 54 L38 22 H82 L110 54 Z" ${pf("leaf")}/>
    <path d="M24 40 H96" stroke="${pln("leaf")}" stroke-width="2"/>
    ${phi(48,30,12,2.5,0)}`,

  Drache: `${pgr(40)}
    <path d="M78 88 Q104 96 106 74 Q112 72 112 66 Q104 64 100 70 Q98 84 80 80 Z" ${pf("green")}/>
    <path d="M40 56 Q20 40 14 52 Q26 54 24 64 Q34 62 36 70 Z" ${pf("pink")}/>
    <path d="M80 56 Q100 40 106 52 Q94 54 96 64 Q86 62 84 70 Z" ${pf("pink")}/>
    <ellipse cx="60" cy="80" rx="26" ry="24" ${pf("green")}/>
    <ellipse cx="60" cy="86" rx="16" ry="16" fill="#FFF3C8" stroke="#D9A93E" stroke-width="2.4"/>
    <ellipse cx="46" cy="104" rx="10" ry="6" ${pf("green")}/><ellipse cx="74" cy="104" rx="10" ry="6" ${pf("green")}/>
    <path d="M44 22 L40 6 L52 18 Z M76 22 L80 6 L68 18 Z" fill="#FFD490" stroke="#C98A2E" stroke-width="2.4"/>
    <ellipse cx="60" cy="38" rx="28" ry="24" ${pf("green")}/>
    <ellipse cx="60" cy="50" rx="14" ry="9" ${pf("green")}/>
    <circle cx="55" cy="48" r="1.8" fill="${pln("green")}" stroke="none"/><circle cx="65" cy="48" r="1.8" fill="${pln("green")}" stroke="none"/>
    ${phi(48,26,8,4)} ${peye(48,36,6)} ${peye(72,36,6)} ${pcheek(40,48)} ${pcheek(80,48)}
    <path d="M54 55 Q60 59 66 55" fill="none" stroke="#3B2C5A" stroke-width="2.4"/>`,

  Drei: `${pgr(32)}
    ${ptube("M36 30 Q46 12 64 14 Q86 16 84 34 Q82 50 62 54 Q88 56 88 76 Q86 100 60 100 Q42 100 34 88", "purple", 13)}
    <path d="M40 28 Q50 18 62 18" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
    ${pspark(18,58,.9,"#FFB3C8")} ${pspark(102,22,.9,"#FFD36E")} ${pspark(104,94,.7,"#93BFF5")}`,

  Dackel: `${pgr(46)}
    <path d="M26 66 Q10 58 10 44" fill="none" stroke="${pln("brown")}" stroke-width="8"/><path d="M26 66 Q10 58 10 44" fill="none" stroke="${pmd("brown")}" stroke-width="3.5"/>
    <rect x="28" y="80" width="11" height="22" rx="5" ${pf("brown")}/><rect x="74" y="80" width="11" height="22" rx="5" ${pf("brown")}/>
    <rect x="20" y="56" width="74" height="32" rx="16" ${pf("brown")}/>
    <rect x="36" y="82" width="11" height="22" rx="5" ${pf("brown")}/><rect x="82" y="82" width="11" height="22" rx="5" ${pf("brown")}/>
    <path d="M30 80 Q56 90 84 80" fill="none" stroke="#fff" stroke-width="2.5" opacity=".35"/>
    ${phi(40,62,14,4,-5,.4)}
    <circle cx="90" cy="48" r="16" ${pf("brown")}/>
    <ellipse cx="104" cy="56" rx="13" ry="8" ${pf("brown")}/>
    <circle cx="115" cy="54" r="4" fill="#3B2C5A" stroke="none"/>
    <path d="M80 42 Q68 48 72 70 Q82 72 86 56 Z" ${pf("brown")} fill="${pln("brown")}"/>
    <path d="M78 62 Q88 70 98 62" fill="none" stroke="${pln("red")}" stroke-width="4"/>
    ${peye(93,44,4.5)} ${pcheek(100,54,3.5,2.4)}
    <path d="M104 62 Q108 64 112 61" fill="none" stroke="#3B2C5A" stroke-width="2.2"/>`,

  Deckel: `${pgr(44)}
    <g fill="none" stroke="${pln("white")}" stroke-width="2.6" opacity=".8"><path d="M44 48 Q38 40 44 32"/><path d="M60 46 Q54 38 60 30"/></g>
    <path d="M18 62 H102 V92 Q102 104 90 104 H30 Q18 104 18 92 Z" ${pf("red")}/>
    <ellipse cx="60" cy="62" rx="42" ry="7" fill="${pln("dark")}" stroke="${pln("red")}"/>
    <rect x="8" y="66" width="12" height="8" rx="4" ${pf("dark")} stroke-width="2.4"/><rect x="100" y="66" width="12" height="8" rx="4" ${pf("dark")} stroke-width="2.4"/>
    ${phi(30,80,4,10,0,.5)}
    <g transform="rotate(-18 70 40)">
      <path d="M30 46 Q32 24 70 22 Q108 24 110 46 Z" ${pf("metal")}/>
      <ellipse cx="70" cy="46" rx="40" ry="5" ${pf("metal")}/>
      <rect x="62" y="12" width="16" height="10" rx="5" ${pf("dark")} stroke-width="2.4"/>
      ${phi(52,32,10,3,-10,.9)}
    </g>`,

  Knödel: `
    <ellipse cx="60" cy="82" rx="54" ry="22" ${pf("white")}/>
    <ellipse cx="60" cy="84" rx="40" ry="12" ${pf("brown")} stroke-width="2.4"/>
    <circle cx="42" cy="68" r="20" ${pf("wood")} fill="url(#pg-white)" stroke="${pln("wood")}"/>
    <circle cx="78" cy="66" r="21" ${pf("wood")} fill="url(#pg-white)" stroke="${pln("wood")}"/>
    <g fill="${pmd("wood")}" stroke="none" opacity=".7"><circle cx="36" cy="72" r="1.6"/><circle cx="48" cy="76" r="1.6"/><circle cx="44" cy="62" r="1.6"/><circle cx="74" cy="72" r="1.6"/><circle cx="86" cy="64" r="1.6"/><circle cx="82" cy="76" r="1.6"/></g>
    <path d="M30 56 Q42 48 54 56 Q50 62 42 60 Q34 62 30 56 Z M66 54 Q78 46 90 54 Q86 60 78 58 Q70 60 66 54 Z" ${pf("brown")} stroke-width="2.2"/>
    <g fill="${pmd("leaf")}" stroke="${pln("leaf")}" stroke-width="1.4"><circle cx="40" cy="52" r="2.2"/><circle cx="46" cy="54" r="1.8"/><circle cx="76" cy="50" r="2.2"/><circle cx="82" cy="52" r="1.8"/></g>
    ${phi(34,62,4,2.5)} ${phi(70,60,4,2.5)}`,
  Gummi: (() => {
    const bear = (x,y,s,k) => `<g transform="translate(${x} ${y}) scale(${s})" ${pf(k)} stroke-width="${3/s}">
      <circle cx="-13" cy="-30" r="7"/><circle cx="13" cy="-30" r="7"/>
      <ellipse cx="-17" cy="14" rx="8" ry="10"/><ellipse cx="17" cy="14" rx="8" ry="10"/>
      <ellipse cx="-20" cy="-4" rx="6" ry="9" transform="rotate(30 -20 -4)"/><ellipse cx="20" cy="-4" rx="6" ry="9" transform="rotate(-30 20 -4)"/>
      <ellipse cx="0" cy="6" rx="19" ry="21"/><circle cx="0" cy="-20" r="16"/>
      <ellipse cx="0" cy="-14" rx="7" ry="5" stroke-width="${2/s}"/>
      ${phi(-6,-28,5,3)} ${phi(-7,0,3,8,0,.5)}
      <circle cx="-6" cy="-22" r="2.2" fill="${pln(k)}" stroke="none"/><circle cx="6" cy="-22" r="2.2" fill="${pln(k)}" stroke="none"/></g>`;
    return `${pgr(44)} ${bear(84,64,.9,"leaf")} ${bear(36,64,.9,"yellow")} ${bear(60,72,1.05,"red")}`;
  })(),

  Gockel: `${pgr(32)}
    <path d="M60 104 V90 M70 104 V90 M54 106 H64 M64 106 H76" stroke="${pln("yolk")}" stroke-width="3.5"/>
    <path d="M78 58 Q86 18 112 26 Q100 34 98 46 Q112 40 114 54 Q100 54 92 66 Z" ${pf("leaf")}/>
    <path d="M80 62 Q96 40 110 62 Q98 62 88 74 Z" ${pf("blue")}/>
    <ellipse cx="62" cy="72" rx="28" ry="22" ${pf("orange")}/>
    <path d="M36 70 Q34 40 42 30 L58 34 Q56 52 62 62 Z" ${pf("orange")}/>
    <path d="M56 70 Q68 60 82 68 Q76 86 60 82 Z" ${pf("red")} stroke-width="2.6"/>
    <circle cx="46" cy="34" r="14" ${pf("orange")}/>
    <path d="M36 24 Q34 12 42 16 Q44 6 50 14 Q56 8 56 22 Z" ${pf("red")}/>
    <path d="M34 34 L22 38 L34 42 Z" ${pf("yellow")}/>
    <path d="M36 44 Q30 54 38 54 Q42 50 40 44 Z" ${pf("red")} stroke-width="2.4"/>
    ${phi(54,62,8,4)} ${peye(44,32,4.5)} ${pcheek(50,42,3.5,2.4)}`,

  Gurke: `${pgr(44)}
    <path d="M14 82 Q12 66 30 58 Q60 44 92 30 Q108 24 110 38 Q112 50 96 60 Q66 80 34 94 Q16 98 14 82 Z" ${pf("leaf")}/>
    <g fill="${pln("leaf")}" stroke="none" opacity=".5"><circle cx="30" cy="70" r="2"/><circle cx="46" cy="64" r="2"/><circle cx="62" cy="56" r="2"/><circle cx="78" cy="48" r="2"/><circle cx="40" cy="80" r="2"/><circle cx="58" cy="72" r="2"/><circle cx="76" cy="62" r="2"/><circle cx="94" cy="44" r="2"/></g>
    <path d="M110 36 Q116 30 114 24" fill="none" stroke="${pln("leaf")}" stroke-width="3"/>
    ${phi(54,52,16,3.5,-25)}
    <circle cx="86" cy="88" r="16" ${pf("leaf")}/>
    <circle cx="86" cy="88" r="12" fill="#EAFBD4" stroke="none"/>
    <g fill="${pmd("leaf")}" stroke="none"><ellipse cx="86" cy="82" rx="1.6" ry="2.6"/><ellipse cx="80" cy="91" rx="1.6" ry="2.6" transform="rotate(60 80 91)"/><ellipse cx="92" cy="91" rx="1.6" ry="2.6" transform="rotate(-60 92 91)"/></g>`,

  Gaul: `${pgr(44)}
    <path d="M90 56 Q106 60 104 86 Q98 74 92 70 Z" ${pf("dark")}/>
    <rect x="72" y="70" width="10" height="34" rx="4" ${pf("brown")}/><rect x="36" y="70" width="10" height="34" rx="4" ${pf("brown")}/>
    <ellipse cx="62" cy="64" rx="32" ry="18" ${pf("brown")}/>
    <rect x="80" y="72" width="10" height="34" rx="4" ${pf("brown")}/><rect x="44" y="72" width="10" height="34" rx="4" ${pf("brown")}/>
    <g fill="${pmd("dark")}" stroke="${pln("dark")}" stroke-width="2.4"><rect x="35" y="100" width="12" height="7" rx="2"/><rect x="43" y="102" width="12" height="7" rx="2"/><rect x="71" y="100" width="12" height="7" rx="2"/><rect x="79" y="102" width="12" height="7" rx="2"/></g>
    <path d="M48 60 Q36 44 34 26 L48 22 Q54 40 62 52 Z" ${pf("brown")}/>
    <path d="M30 26 Q30 14 40 12 Q50 14 50 26 L34 52 Q20 56 16 46 Q14 38 30 26 Z" ${pf("brown")}/>
    <path d="M38 14 L36 4 L44 10 Z" ${pf("brown")} stroke-width="2.4"/>
    <path d="M42 12 Q56 18 54 32 Q60 44 64 52 Q56 50 50 40 Q50 28 42 20 Z" ${pf("dark")}/>
    <ellipse cx="22" cy="46" rx="8" ry="6" fill="${pmd("skin")}" stroke="${pln("brown")}" stroke-width="2.4"/>
    <circle cx="20" cy="45" r="1.6" fill="${pln("brown")}" stroke="none"/>
    ${phi(54,56,12,4,-10,.45)} ${peye(36,28,4.5)} ${pcheek(32,38,3.5,2.4)}`,

  Gugelhupf: `
    <ellipse cx="60" cy="96" rx="52" ry="12" ${pf("white")}/>
    <path d="M20 92 L30 48 Q60 38 90 48 L100 92 Q60 104 20 92 Z" ${pf("orange")} fill="url(#pg-wood)" stroke="${pln("wood")}"/>
    <path d="M32 50 Q30 72 30 96 M46 46 Q44 72 45 99 M60 44 V100 M74 46 Q76 72 75 99 M88 50 Q90 72 90 96" fill="none" stroke="${pln("wood")}" stroke-width="2.2"/>
    <path d="M28 50 Q60 32 92 50 Q92 60 86 58 Q82 66 76 58 Q70 66 64 58 Q58 66 52 58 Q46 66 40 58 Q34 64 30 58 Q26 58 28 50 Z" ${pf("white")}/>
    <ellipse cx="60" cy="46" rx="9" ry="4" fill="${pln("wood")}" stroke="${pln("white")}" stroke-width="2"/>
    ${phi(40,48,8,2.5,-10,.9)}`,

  Gorilla: `
    <path d="M10 120 Q14 76 60 72 Q106 76 110 120 Z" ${pf("dark")}/>
    <path d="M30 96 Q30 108 36 120 M90 96 Q90 108 84 120" fill="none" stroke="${pln("dark")}" stroke-width="2.6"/>
    <circle cx="28" cy="54" r="9" ${pf("dark")}/><circle cx="92" cy="54" r="9" ${pf("dark")}/>
    <circle cx="28" cy="54" r="4.5" fill="#C8B8D8" stroke="none"/><circle cx="92" cy="54" r="4.5" fill="#C8B8D8" stroke="none"/>
    <path d="M60 14 Q90 14 92 46 Q94 78 60 82 Q26 78 28 46 Q30 14 60 14 Z" ${pf("dark")}/>
    <path d="M60 36 Q66 30 78 32 Q86 36 84 50 Q90 70 60 76 Q30 70 36 50 Q34 36 42 32 Q54 30 60 36 Z" fill="url(#pg-skin)" stroke="${pln("brown")}" stroke-width="2.6"/>
    <path d="M40 40 Q50 34 58 40 M62 40 Q70 34 80 40" fill="none" stroke="${pln("brown")}" stroke-width="2.6"/>
    <ellipse cx="60" cy="56" rx="10" ry="6" fill="${pmd("brown")}" stroke="none"/>
    <circle cx="56" cy="56" r="2" fill="#3B2C5A" stroke="none"/><circle cx="64" cy="56" r="2" fill="#3B2C5A" stroke="none"/>
    ${phi(46,24,9,4,-15,.35)} ${peye(49,46,4.5)} ${peye(71,46,4.5)} ${pcheek(42,60,4,2.6)} ${pcheek(78,60,4,2.6)}
    <path d="M52 66 Q60 72 68 66" fill="none" stroke="#3B2C5A" stroke-width="2.6"/>`,

  Gulasch: `
    <g fill="none" stroke="${pln("white")}" stroke-width="2.6" opacity=".8"><path d="M44 30 Q38 22 44 14 Q50 6 44 0"/><path d="M62 28 Q56 20 62 12 Q68 4 62 -2"/><path d="M80 30 Q74 22 80 14"/></g>
    <path d="M12 54 H108 Q106 100 60 104 Q14 100 12 54 Z" ${pf("blue")}/>
    <path d="M30 80 Q60 92 90 80" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/>
    <ellipse cx="60" cy="54" rx="48" ry="12" ${pf("orange")} fill="url(#pg-red)"/>
    <g ${pf("brown")} stroke-width="2.2"><rect x="30" y="48" width="12" height="9" rx="3"/><rect x="52" y="44" width="12" height="9" rx="3"/><rect x="72" y="50" width="12" height="9" rx="3"/><rect x="44" y="54" width="10" height="8" rx="3"/></g>
    <g fill="${pmd("leaf")}" stroke="${pln("leaf")}" stroke-width="1.4"><circle cx="66" cy="58" r="2.2"/><circle cx="40" cy="46" r="2"/><circle cx="88" cy="50" r="2.2"/></g>
    ${ptube("M86 46 L104 22", "metal", 5)}
    ${phi(24,66,4,8,10,.6)}`,

  Gong: `${pgr(48)}
    ${ptube("M18 106 V14", "wood", 7)} ${ptube("M102 106 V14", "wood", 7)} ${ptube("M12 18 H108", "wood", 7)}
    <path d="M46 18 L52 30 M74 18 L68 30" stroke="${pln("dark")}" stroke-width="2"/>
    <circle cx="60" cy="62" r="32" ${pf("gold")}/>
    <circle cx="60" cy="62" r="23" fill="none" stroke="${pln("gold")}" stroke-width="2"/>
    <circle cx="60" cy="62" r="10" ${pf("gold")} stroke-width="2.4"/>
    ${phi(46,46,10,5,-35)}
    ${ptube("M86 106 L100 86", "wood", 4)}
    <circle cx="86" cy="104" r="7" ${pf("red")} stroke-width="2.4"/>`,

  Gas: `${pgr(44)}
    <path d="M24 74 Q16 50 36 30 Q34 46 44 50 Q40 26 60 10 Q58 32 72 40 Q76 28 84 24 Q102 46 96 74 Z" ${pf("blue")} fill="url(#pg-water)" stroke="${pln("blue")}"/>
    <path d="M38 74 Q34 58 46 48 Q48 60 56 60 Q56 46 66 38 Q70 54 80 56 Q86 64 82 74 Z" fill="#fff" opacity=".7" stroke="none"/>
    <rect x="8" y="86" width="104" height="18" rx="6" ${pf("white")}/>
    <ellipse cx="60" cy="78" rx="36" ry="8" ${pf("metal")}/>
    <ellipse cx="60" cy="77" rx="22" ry="4" fill="${pln("metal")}" stroke="none"/>
    <circle cx="22" cy="95" r="4" ${pf("dark")} stroke-width="2"/><circle cx="98" cy="95" r="4" ${pf("dark")} stroke-width="2"/>`,

  Geige: `
    <g transform="rotate(28 60 60)">
      <path d="M60 46 C44 46 36 52 38 63 C40 69 46 70 46 75 C46 79 34 83 34 95 C34 107 48 112 60 112 C72 112 86 107 86 95 C86 83 74 79 74 75 C74 70 80 69 82 63 C84 52 76 46 60 46 Z" ${pf("brown")}/>
      <path d="M48 82 Q44 86 48 92 M72 82 Q76 86 72 92" fill="none" stroke="${pln("brown")}" stroke-width="2.4"/>
      <rect x="55" y="10" width="10" height="84" rx="4" ${pf("dark")}/>
      <circle cx="60" cy="8" r="7" ${pf("dark")}/>
      <path d="M53 18 H49 M53 26 H49 M67 18 H71 M67 26 H71" stroke="${pln("dark")}" stroke-width="3.5"/>
      <rect x="50" y="96" width="20" height="4" rx="1" ${pf("wood")} stroke-width="2"/>
      <path d="M57.5 14 V106 M62.5 14 V106" stroke="#fff" stroke-width="1" opacity=".8"/>
      ${phi(46,58,5,3,-30)} ${phi(42,98,4,7,10,.5)}
    </g>
    <path d="M14 30 L104 102" stroke="${pln("wood")}" stroke-width="6"/><path d="M14 30 L104 102" stroke="${pmd("wood")}" stroke-width="2.5"/>
    <path d="M18 36 L100 102" stroke="#fff" stroke-width="1.6"/>`,

  Gemüse: `${pgr(46)}
    <path d="M36 70 Q30 56 22 54 M36 70 Q36 54 30 46 M36 70 Q42 56 40 46" fill="none" stroke="${pln("leaf")}" stroke-width="4"/>
    <path d="M30 70 Q46 64 52 74 L30 104 Q22 108 20 100 Z" ${pf("orange")} transform="rotate(-10 36 86)"/>
    <path d="M28 82 L36 84 M24 92 L30 94" stroke="${pln("orange")}" stroke-width="2"/>
    ${ptube("M64 100 L64 76", "leaf", 6)}
    <g ${pf("leaf")}><circle cx="54" cy="60" r="12"/><circle cx="74" cy="60" r="12"/><circle cx="64" cy="48" r="13"/></g>
    ${phi(60,44,5,3)}
    <circle cx="90" cy="88" r="18" ${pf("red")}/>
    <path d="M82 72 L90 76 L98 72 L94 78 L90 72 L86 78 Z" ${pf("leaf")} stroke-width="2.2"/>
    ${phi(84,82,5,3.5)}`,

  Gips: `${pgr(46)}
    <path d="M78 58 Q86 46 96 50 Q110 50 112 62 Q114 76 100 80 L80 80 Z" ${pf("skin")}/>
    <path d="M96 50 Q98 40 104 42 Q106 48 104 54" ${pf("skin")} stroke-width="2.6"/>
    <path d="M100 62 H110 M100 70 H110" stroke="${pln("skin")}" stroke-width="2"/>
    <rect x="12" y="52" width="74" height="32" rx="15" ${pf("white")}/>
    <path d="M30 54 L28 82 M46 54 L44 82 M62 54 L60 82" stroke="${pln("white")}" stroke-width="1.6" opacity=".6"/>
    <path d="M36 64 C33 60 28 63 31 67 L36 72 L41 67 C44 63 39 60 36 64 Z" fill="${pmd("red")}" stroke="${pln("red")}" stroke-width="1.6"/>
    ${pspark(54,68,.7,pmd("yellow"))}
    <circle cx="70" cy="68" r="6" fill="${pmd("leaf")}" stroke="${pln("leaf")}" stroke-width="1.6"/>
    <path d="M67 70 Q70 73 73 70" fill="none" stroke="${pln("leaf")}" stroke-width="1.4"/>
    ${phi(30,58,14,2.5,0,.9)}`,

  Gewitter: `
    <path d="M4 112 Q60 96 116 112 V116 H4 Z" ${pf("leaf")}/>
    <path d="M70 52 L58 76 H68 L60 100 L84 68 H72 L80 52 Z" ${pf("yellow")}/>
    <g stroke="${pln("water")}" stroke-width="3"><path d="M24 64 L18 78 M38 70 L32 84 M22 90 L16 104 M96 66 L90 80 M104 82 L98 96 M48 92 L42 106"/></g>
    ${pcloud(82,36,.75,"storm")}
    ${pcloud(44,50,.95,"storm")}`,

  Gitarre: `
    <g transform="rotate(-35 60 60)">
      <rect x="54" y="2" width="12" height="18" rx="4" ${pf("brown")}/>
      <g fill="${pmd("metal")}" stroke="${pln("metal")}" stroke-width="1.6"><circle cx="51" cy="7" r="2.5"/><circle cx="51" cy="15" r="2.5"/><circle cx="69" cy="7" r="2.5"/><circle cx="69" cy="15" r="2.5"/></g>
      <path d="M60 50 C40 50 34 60 38 70 C40 76 32 80 32 94 C32 110 46 118 60 118 C74 118 88 110 88 94 C88 80 80 76 82 70 C86 60 80 50 60 50 Z" ${pf("orange")}/>
      <rect x="55" y="18" width="10" height="64" rx="2" ${pf("brown")}/>
      <path d="M55 30 H65 M55 40 H65 M55 50 H65" stroke="${pln("brown")}" stroke-width="1.6"/>
      <circle cx="60" cy="80" r="9" ${pf("dark")}/>
      <rect x="50" y="100" width="20" height="5" rx="2" ${pf("brown")} stroke-width="2"/>
      <path d="M57.5 20 V102 M62.5 20 V102" stroke="#fff" stroke-width="1"/>
      ${phi(44,64,4,8,-20)}
    </g>`,

  Gans: `${pgr(40)}
    <path d="M52 92 V104 M66 92 V104" stroke="${pln("orange")}" stroke-width="3.5"/>
    <path d="M44 106 L52 102 L60 106 Z M58 106 L66 102 L74 106 Z" ${pf("orange")} stroke-width="2.4"/>
    <path d="M30 66 Q34 52 50 52 L90 58 Q108 62 104 52 Q112 60 108 70 Q100 96 64 96 Q34 94 30 66 Z" ${pf("white")}/>
    <path d="M56 66 Q78 60 92 72 Q80 84 58 78" ${pf("white")} stroke-width="2.6"/>
    <path d="M38 64 Q30 46 28 32" fill="none" stroke="${pln("white")}" stroke-width="15"/>
    <path d="M38 64 Q30 46 28 32" fill="none" stroke="#FFFFFF" stroke-width="9"/>
    <circle cx="30" cy="26" r="11" ${pf("white")}/>
    <path d="M20 24 Q12 26 8 32 Q16 34 22 32 Z" ${pf("orange")} stroke-width="2.4"/>
    ${peye(30,23,3.8)} ${pcheek(34,31,3,2)}`,

  Garten: `
    <path d="M0 96 Q60 84 120 96 V116 H0 Z" ${pf("leaf")}/>
    <rect x="80" y="40" width="9" height="50" rx="2" ${pf("brown")}/>
    <g ${pf("leaf")}><circle cx="84" cy="30" r="20"/><circle cx="72" cy="40" r="13"/><circle cx="98" cy="40" r="13"/></g>
    <g fill="${pmd("red")}" stroke="${pln("red")}" stroke-width="1.6"><circle cx="78" cy="26" r="3.5"/><circle cx="92" cy="34" r="3.5"/><circle cx="74" cy="42" r="3.5"/></g>
    ${phi(78,20,6,3)}
    <g ${pf("white")} stroke-width="2.4">
      <path d="M8 98 V66 L13 60 L18 66 V98 Z"/><path d="M26 96 V62 L31 56 L36 62 V96 Z"/><path d="M44 94 V60 L49 54 L54 60 V94 Z"/><path d="M62 94 V60 L67 54 L72 60 V94 Z"/><path d="M98 94 V62 L103 56 L108 62 V94 Z"/></g>
    <path d="M6 72 H112 M6 86 H112" stroke="${pln("white")}" stroke-width="4"/>
    <g>${["30 102","56 104","88 104"].map((p,i)=>{const [x,y]=p.split(" ");const c=["pink","yellow","purple"][i];return `<path d="M${x} ${y} V${y-14}" stroke="${pln("leaf")}" stroke-width="2.6"/><g ${pf(c)} stroke-width="2"><circle cx="${x-4}" cy="${y-16}" r="4"/><circle cx="${+x+4}" cy="${y-16}" r="4"/><circle cx="${x}" cy="${y-20}" r="4"/><circle cx="${x}" cy="${y-12}" r="4"/></g><circle cx="${x}" cy="${y-16}" r="2.4" fill="${pmd("yolk")}" stroke="none"/>`}).join("")}</g>`,

  Gold: `${pgr(48)}
    <g ${pf("gold")}>
      <path d="M14 96 L22 78 H54 L60 96 Z"/><path d="M22 78 L54 78 L50 72 L26 72 Z" fill="${PIC_PAL.gold[0]}"/>
      <path d="M60 96 L66 78 H98 L106 96 Z"/>
      <path d="M36 78 L44 60 H76 L84 78 Z"/></g>
    ${phi(40,86,10,2.5,0,.8)} ${phi(84,86,10,2.5,0,.8)} ${phi(58,68,10,2.5,0,.8)}
    <g ${pf("gold")}><ellipse cx="96" cy="104" rx="12" ry="5"/><ellipse cx="96" cy="100" rx="12" ry="5"/><circle cx="22" cy="100" r="9"/></g>
    <path d="M22 95 V105" stroke="${pln("gold")}" stroke-width="2"/>
    ${pspark(30,40,1.1)} ${pspark(92,36,.9)} ${pspark(62,24,.6)}`,
  Auge: `
    <path d="M28 34 Q60 18 92 34" fill="none" stroke="${pln("brown")}" stroke-width="7"/>
    <path d="M14 70 Q60 22 106 70 Q60 108 14 70 Z" ${pf("white")}/>
    <circle cx="60" cy="68" r="21" ${pf("water")}/>
    <circle cx="60" cy="68" r="10" fill="#2A1F4A" stroke="none"/>
    <circle cx="53" cy="61" r="6" fill="#fff" stroke="none"/><circle cx="67" cy="74" r="2.5" fill="#fff" stroke="none"/>
    <path d="M14 70 Q60 22 106 70" fill="none" stroke="#3B2C5A" stroke-width="4"/>
    <path d="M24 58 L16 50 M38 48 L32 38 M54 43 L52 32 M70 43 L72 32 M84 48 L90 38 M96 58 L104 50" stroke="#3B2C5A" stroke-width="3.5"/>`,

  Vogel: `
    ${ptube("M8 98 Q60 90 112 100", "brown", 6)}
    <path d="M86 94 Q96 84 104 90 Q96 98 86 94 Z" ${pf("leaf")} stroke-width="2.4"/>
    <path d="M52 92 V100 M64 92 V100" stroke="${pln("orange")}" stroke-width="3"/>
    <path d="M30 70 Q12 72 8 60 Q20 60 34 62 Z" ${pf("blue")}/>
    <circle cx="58" cy="62" r="30" ${pf("blue")}/>
    <ellipse cx="62" cy="74" rx="18" ry="15" fill="#FFF3D6" stroke="#E2B66E" stroke-width="2.4"/>
    <path d="M36 60 Q46 50 58 62 Q50 80 34 72 Z" ${pf("blue")}/>
    <path d="M88 56 L100 60 L88 66 Z" ${pf("yolk")} stroke-width="2.4"/>
    <path d="M58 32 Q60 22 68 24 Q64 28 64 34" ${pf("blue")} stroke-width="2.4"/>
    ${phi(48,44,8,4)} ${peye(76,52,5)} ${pcheek(80,64,4,2.6)}
    <g fill="${pmd("purple")}" stroke="${pln("purple")}" stroke-width="2"><ellipse cx="98" cy="30" rx="4" ry="3"/><path d="M102 30 V14 L108 16" fill="none"/></g>`,

  Kugel: `${pgr(34,60,104)}
    <circle cx="60" cy="62" r="40" ${pf("purple")}/>
    <path d="M24 48 Q60 70 98 46" fill="none" stroke="${PIC_PAL.pink[2]}" stroke-width="8"/>
    <path d="M22 70 Q60 90 98 72" fill="none" stroke="${PIC_PAL.water[1]}" stroke-width="8"/>
    <circle cx="60" cy="62" r="40" fill="none" stroke="${pln("purple")}" stroke-width="3"/>
    ${phi(44,40,12,7,-35,.75)} <circle cx="78" cy="84" r="3" fill="#fff" opacity=".6" stroke="none"/>
    ${pspark(104,22,.8)}`,

  Magen: `
    ${ptube("M48 6 Q48 22 46 32", "pink", 10)}
    <path d="M40 30 Q30 46 36 66 Q44 98 78 98 Q104 96 106 74 Q106 56 90 54 Q80 54 76 62 Q70 56 66 42 Q62 28 56 28 Z" ${pf("pink")}/>
    <path d="M50 40 Q46 60 56 76" fill="none" stroke="${pln("pink")}" stroke-width="2" opacity=".6"/>
    ${ptube("M94 92 Q96 104 106 108", "pink", 7)}
    ${phi(46,46,5,10,-10)}
    ${peye(66,76,5)} ${peye(86,74,5)} ${pcheek(60,86)} ${pcheek(94,84)} ${psmile(77,84,10)}`,

  Wagen: `${pgr(46)}
    ${ptube("M92 70 L112 40", "dark", 4)}
    <rect x="104" y="34" width="14" height="7" rx="3.5" transform="rotate(-56 111 37)" ${pf("dark")} stroke-width="2.4"/>
    <path d="M14 46 H102 L96 82 H20 Z" ${pf("red")}/>
    <path d="M18 56 H100 M20 68 H98" stroke="${pln("red")}" stroke-width="2.2"/>
    <path d="M38 46 V82 M60 46 V82 M82 46 V82" stroke="${pln("red")}" stroke-width="2.2"/>
    ${phi(26,52,8,2.5,0,.7)}
    <g><circle cx="34" cy="90" r="14" ${pf("dark")}/><circle cx="34" cy="90" r="5" ${pf("metal")} stroke-width="2"/>
       <circle cx="84" cy="90" r="14" ${pf("dark")}/><circle cx="84" cy="90" r="5" ${pf("metal")} stroke-width="2"/></g>`,

  Hagel: `
    ${pcloud(60,38,1,"storm")}
    <g ${pf("ice")} stroke-width="2.4"><circle cx="32" cy="66" r="6"/><circle cx="56" cy="72" r="7"/><circle cx="82" cy="64" r="6"/><circle cx="44" cy="88" r="6"/><circle cx="72" cy="90" r="7"/><circle cx="96" cy="84" r="5"/><circle cx="24" cy="100" r="6"/><circle cx="58" cy="106" r="5"/><circle cx="90" cy="106" r="6"/></g>
    <g fill="#fff" stroke="none"><circle cx="30" cy="64" r="2"/><circle cx="54" cy="69" r="2.2"/><circle cx="80" cy="62" r="2"/><circle cx="42" cy="86" r="2"/><circle cx="70" cy="87" r="2.2"/></g>`,

  Bagger: `${pgr(50)}
    <rect x="8" y="84" width="70" height="22" rx="11" ${pf("dark")}/>
    <g ${pf("metal")} stroke-width="2"><circle cx="20" cy="95" r="6"/><circle cx="36" cy="95" r="5"/><circle cx="50" cy="95" r="5"/><circle cx="66" cy="95" r="6"/></g>
    <rect x="12" y="62" width="64" height="22" rx="4" ${pf("yellow")}/>
    <path d="M22 62 V28 H50 L56 62 Z" ${pf("yellow")}/>
    <path d="M27 58 V34 H46 L50 58 Z" ${pf("water")} stroke-width="2.4"/>
    ${phi(34,40,3,8,10,.7)}
    ${ptube("M64 64 L86 22 L104 52", "yellow", 9)}
    <path d="M96 50 H116 L112 76 Q100 80 92 70 Z" ${pf("metal")}/>
    <path d="M98 76 L96 82 M104 78 L104 84 M110 76 L112 82" stroke="${pln("metal")}" stroke-width="3"/>
    ${phi(20,70,10,2.5,0,.6)}`,

  Regen: `
    ${pcloud(60,36,1,"blue")}
    ${pdrop(30,62,.9)} ${pdrop(52,68,.9)} ${pdrop(76,62,.9)} ${pdrop(96,70,.8)}
    ${pdrop(40,86,.9)} ${pdrop(64,90,.9)} ${pdrop(88,92,.8)} ${pdrop(22,90,.7)}
    <ellipse cx="60" cy="108" rx="44" ry="6" ${pf("water")} stroke-width="2.4"/>
    <ellipse cx="60" cy="107" rx="18" ry="2.4" fill="none" stroke="#fff" stroke-width="1.6" opacity=".8"/>`,

  Nagel: `
    <path d="M6 82 L114 82 L114 104 L6 104 Z" ${pf("wood")}/>
    <path d="M14 92 Q40 88 60 94 T106 92" fill="none" stroke="${pln("wood")}" stroke-width="2" opacity=".7"/>
    <path d="M57 82 V30 H63 V82 Z" ${pf("metal")}/>
    <ellipse cx="60" cy="28" rx="16" ry="5" ${pf("metal")}/>
    <path d="M44 28 V24 A16 5 0 0 1 76 24 V28" ${pf("metal")}/>
    <ellipse cx="60" cy="24" rx="16" ry="5" ${pf("metal")}/>
    ${phi(58.5,56,1,18,0,.9)} ${phi(54,23,6,1.6,0,.9)}
    <g fill="none" stroke="${pln("yellow")}" stroke-width="3"><path d="M28 30 L36 34 M26 44 L35 44 M92 30 L84 34 M94 44 L85 44"/></g>`,

  Bogen: `${pgr(28)}
    <path d="M38 12 Q90 60 38 108" fill="none" stroke="${pln("wood")}" stroke-width="12"/>
    <path d="M38 12 Q90 60 38 108" fill="none" stroke="${pmd("wood")}" stroke-width="6"/>
    <rect x="58" y="52" width="9" height="16" rx="3" ${pf("red")} stroke-width="2.4"/>
    <path d="M38 12 L38 108" stroke="${pln("white")}" stroke-width="2"/>
    ${ptube("M24 60 H98", "brown", 3)}
    <path d="M98 54 L112 60 L98 66 Z" ${pf("metal")} stroke-width="2.4"/>
    <path d="M24 60 L12 50 L20 50 L30 60 L20 70 L12 70 Z" ${pf("red")} stroke-width="2.4"/>`,

  Säge: (() => {
    let t = "M20 82";
    for (let x = 20; x < 100; x += 8) t += ` L${x+4} 90 L${x+8} 82`;
    return `${pgr(46)}
      <path d="M20 82 L28 48 H100 L100 82 Z" ${pf("metal")}/>
      <path d="${t} Z" ${pf("metal")} stroke-width="2.2"/>
      <path d="M20 82 L28 48 H100 L100 82" fill="none" stroke="${pln("metal")}"/>
      <circle cx="36" cy="60" r="3" fill="#fff" stroke="${pln("metal")}" stroke-width="2"/>
      ${phi(60,56,24,2.5,0,.9)}
      <path d="M94 40 H116 Q120 40 118 46 L114 90 Q112 96 106 96 H96 Q90 96 92 90 Z" ${pf("red")}/>
      <rect x="100" y="54" width="9" height="28" rx="4.5" fill="#fff" stroke="${pln("red")}" stroke-width="2.4"/>`;
  })(),

  Ziege: `${pgr(40)}
    <path d="M90 58 L98 48 L100 58 Z" ${pf("cream")} stroke-width="2.4"/>
    <rect x="76" y="70" width="9" height="34" rx="4" ${pf("cream")}/><rect x="40" y="70" width="9" height="34" rx="4" ${pf("cream")}/>
    <ellipse cx="64" cy="66" rx="30" ry="18" ${pf("cream")}/>
    <path d="M70 58 Q80 54 86 62 Q80 72 70 68 Z" fill="${pmd("brown")}" stroke="none" opacity=".6"/>
    <rect x="84" y="72" width="9" height="34" rx="4" ${pf("cream")}/><rect x="48" y="72" width="9" height="34" rx="4" ${pf("cream")}/>
    <g fill="${pmd("dark")}" stroke="${pln("dark")}" stroke-width="2"><rect x="39" y="100" width="11" height="6" rx="2"/><rect x="47" y="102" width="11" height="6" rx="2"/><rect x="75" y="100" width="11" height="6" rx="2"/><rect x="83" y="102" width="11" height="6" rx="2"/></g>
    <path d="M46 60 Q36 46 34 36 L48 32 Q50 44 58 54 Z" ${pf("cream")}/>
    <path d="M36 22 Q36 6 52 6 Q46 12 46 24" ${pf("wood")} stroke-width="2.6"/>
    <path d="M24 34 Q12 32 10 38 Q18 42 28 40 Z" ${pf("cream")} stroke-width="2.6"/>
    <path d="M30 22 Q46 18 46 34 L36 54 Q24 58 20 48 Q20 30 30 22 Z" ${pf("cream")}/>
    <path d="M26 54 Q28 66 34 66 Q36 60 34 52 Z" ${pf("cream")} stroke-width="2.4"/>
    <ellipse cx="24" cy="48" rx="6" ry="4.5" fill="${pmd("pink")}" stroke="${pln("pink")}" stroke-width="2"/>
    ${peye(36,34,4.5)} ${pcheek(40,44,3.5,2.4)}`,

  Tiger: `
    <path d="M14 120 Q20 88 60 86 Q100 88 106 120 Z" ${pf("orange")}/>
    <path d="M60 92 Q74 100 76 120 H44 Q46 100 60 92 Z" fill="#fff" stroke="none" opacity=".85"/>
    <circle cx="28" cy="28" r="12" ${pf("orange")}/><circle cx="92" cy="28" r="12" ${pf("orange")}/>
    <circle cx="28" cy="28" r="6" fill="${pmd("pink")}" stroke="none"/><circle cx="92" cy="28" r="6" fill="${pmd("pink")}" stroke="none"/>
    <path d="M60 16 Q98 16 102 52 Q104 74 86 84 Q74 92 60 92 Q46 92 34 84 Q16 74 18 52 Q22 16 60 16 Z" ${pf("orange")}/>
    <g fill="#3B2C5A" stroke="none"><path d="M60 18 L56 30 L60 34 L64 30 Z"/><path d="M50 20 L48 28 L52 26 Z"/><path d="M70 20 L72 28 L68 26 Z"/>
      <path d="M19 52 L32 54 L20 58 Z"/><path d="M20 64 L32 62 L22 70 Z"/><path d="M101 52 L88 54 L100 58 Z"/><path d="M100 64 L88 62 L98 70 Z"/></g>
    <path d="M60 52 Q76 54 78 68 Q76 84 60 86 Q44 84 42 68 Q44 54 60 52 Z" fill="#fff" stroke="none"/>
    <path d="M54 62 H66 L60 68 Z" fill="${pmd("pink")}" stroke="${pln("pink")}" stroke-width="2"/>
    <path d="M60 68 V72 M52 74 Q56 78 60 72 Q64 78 68 74" fill="none" stroke="#3B2C5A" stroke-width="2.4"/>
    ${phi(46,26,9,4,-15)} ${peye(46,46,5.5)} ${peye(74,46,5.5)} ${pcheek(38,66)} ${pcheek(82,66)}`,

  Feige: `${pgr(46)}
    <path d="M42 14 Q46 8 50 14 V22" fill="none" stroke="${pln("leaf")}" stroke-width="3.5"/>
    <path d="M44 20 Q56 26 60 50 Q74 68 66 90 Q54 106 36 104 Q14 100 12 80 Q12 60 28 50 Q34 28 44 20 Z" ${pf("purple")}/>
    <path d="M36 32 Q30 56 34 90" fill="none" stroke="${pln("purple")}" stroke-width="1.6" opacity=".5"/>
    ${phi(30,62,5,12,10)}
    <path d="M86 46 Q96 52 96 66 Q112 74 108 92 Q102 108 84 108 Q66 108 62 92 Q60 74 76 66 Q76 52 86 46 Z" ${pf("purple")}/>
    <path d="M86 54 Q91 58 90 68 Q104 74 102 90 Q98 102 84 102 Q70 102 68 90 Q68 76 82 68 Q81 58 86 54 Z" fill="#FFE9D2" stroke="none"/>
    <path d="M86 62 Q90 66 89 72 Q98 78 96 90 Q92 98 84 98 Q74 98 74 90 Q74 80 83 72 Q82 66 86 62 Z" fill="${PIC_PAL.pink[2]}" stroke="none"/>
    <g fill="#FFF3C8" stroke="none"><circle cx="80" cy="84" r="1.4"/><circle cx="86" cy="90" r="1.4"/><circle cx="90" cy="82" r="1.4"/><circle cx="84" cy="78" r="1.4"/><circle cx="80" cy="92" r="1.4"/><circle cx="92" cy="90" r="1.4"/></g>`,

  Gras: (() => {
    const blades = [[20,-14,"leaf"],[30,6,"green"],[40,-8,"leaf"],[50,10,"leaf"],[58,-4,"green"],[68,8,"leaf"],[78,-10,"leaf"],[88,6,"green"],[98,-6,"leaf"]];
    return `<path d="M8 104 Q60 92 112 104 Q112 112 60 112 Q8 112 8 104 Z" ${pf("brown")}/>
      ${blades.map(([x,b,k],i) => { const h = 40 + (i*13 % 30); return `<path d="M${x-6} 104 Q${x-2} ${104-h*.5} ${x+b} ${104-h} Q${x+4} ${104-h*.5} ${x+6} 104 Z" ${pf(k)} stroke-width="2.6"/>`; }).join("")}
      <g transform="translate(70 40)"><path d="M0 0 V22" stroke="${pln("leaf")}" stroke-width="2.4"/><g ${pf("yellow")} stroke-width="1.8"><circle cx="-4" cy="-2" r="4"/><circle cx="4" cy="-2" r="4"/><circle cx="0" cy="-6" r="4"/><circle cx="0" cy="2" r="4"/></g><circle cx="0" cy="-2" r="2.4" fill="${pmd("orange")}" stroke="none"/></g>
      <g transform="translate(34 58)"><ellipse rx="7" ry="6" ${pf("red")} stroke-width="2"/><path d="M0 -6 V6" stroke="#3B2C5A" stroke-width="1.6"/><circle cx="-3" cy="-1" r="1.4" fill="#3B2C5A" stroke="none"/><circle cx="3" cy="2" r="1.4" fill="#3B2C5A" stroke="none"/></g>`;
  })(),

  Grille: `${pgr(44)}
    <path d="M28 44 Q20 18 6 12 M34 42 Q36 16 26 4" fill="none" stroke="${pln("brown")}" stroke-width="2.6"/>
    <path d="M44 74 L36 98 M56 76 L54 100" stroke="${pln("leaf")}" stroke-width="4"/>
    <path d="M40 60 Q66 50 104 66 Q100 80 80 82 Q56 82 40 72 Z" ${pf("leaf")}/>
    <path d="M44 58 Q74 46 108 70 Q76 70 48 66 Z" ${pf("green")} fill="url(#pg-leaf)" stroke="${pln("leaf")}" stroke-width="2.6"/>
    <path d="M56 58 Q78 56 100 66" fill="none" stroke="${pln("leaf")}" stroke-width="1.6"/>
    <path d="M70 76 Q84 40 96 56 L80 98" fill="none" stroke="${pln("leaf")}" stroke-width="9"/>
    <path d="M70 76 Q84 40 96 56 L80 98" fill="none" stroke="${pmd("leaf")}" stroke-width="4"/>
    <path d="M74 98 H88" stroke="${pln("leaf")}" stroke-width="3"/>
    <circle cx="36" cy="58" r="14" ${pf("leaf")}/>
    ${phi(32,52,5,3)} ${peye(32,56,4.5)} ${pcheek(28,64,3.5,2.4)}
    <g fill="${pmd("purple")}" stroke="${pln("purple")}" stroke-width="2"><ellipse cx="100" cy="30" rx="4" ry="3"/><path d="M104 30 V14 L110 16" fill="none"/><ellipse cx="82" cy="22" rx="3.5" ry="2.6"/><path d="M85.5 22 V10" fill="none"/></g>`,

  Glas: `${pgr(28)}
    <path d="M32 22 H88 L82 104 H38 Z" ${pf("white")} stroke="${pln("ice")}"/>
    <path d="M34.5 46 H85.5 L82 100 H38 Z" ${pf("water")} stroke="none" opacity=".85"/>
    <path d="M34.5 46 Q60 52 85.5 46" fill="none" stroke="${pln("water")}" stroke-width="2.4"/>
    <path d="M32 22 H88 L82 104 H38 Z" fill="none" stroke="${pln("ice")}"/>
    <g fill="#fff" stroke="none" opacity=".85"><circle cx="66" cy="80" r="2.5"/><circle cx="72" cy="66" r="2"/><circle cx="56" cy="90" r="2"/><circle cx="62" cy="60" r="1.6"/></g>
    ${phi(42,62,3,22,-4,.75)} ${phi(76,32,2,6,-4,.75)}`,

  Glocke: `
    <path d="M36 92 Q60 102 84 92" fill="none"/>
    <g fill="none" stroke="${pln("gold")}" stroke-width="3" opacity=".8"><path d="M14 54 Q8 66 14 78"/><path d="M106 54 Q112 66 106 78"/></g>
    <circle cx="60" cy="98" r="8" ${pf("gold")}/>
    <path d="M60 24 Q34 24 32 56 Q30 78 18 88 Q20 94 60 94 Q100 94 102 88 Q90 78 88 56 Q86 24 60 24 Z" ${pf("gold")}/>
    <path d="M24 86 Q60 92 96 86" fill="none" stroke="${pln("gold")}" stroke-width="2"/>
    <path d="M60 24 Q48 10 40 18 Q42 26 60 24 Q72 10 80 18 Q78 26 60 24 Z" ${pf("red")}/>
    <circle cx="60" cy="22" r="5" ${pf("red")}/>
    ${phi(44,48,4,14,15,.7)}`,

  Glitzer: `
    ${pspark(42,46,2.6,PIC_PAL.pink[1])} ${pspark(82,30,1.6,PIC_PAL.gold[1])} ${pspark(84,80,2.2,PIC_PAL.water[1])}
    ${pspark(30,92,1.3,PIC_PAL.purple[1])} ${pspark(104,56,1,PIC_PAL.leaf[1])} ${pspark(18,20,1,PIC_PAL.gold[1])}
    <g fill="none" stroke-width="2.6">
      <path transform="translate(42 46) scale(2.6)" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z" stroke="${pln("pink")}" stroke-width="1"/>
      <path transform="translate(84 80) scale(2.2)" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z" stroke="${pln("water")}" stroke-width="1.2"/>
      <path transform="translate(82 30) scale(1.6)" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z" stroke="${pln("gold")}" stroke-width="1.6"/></g>
    ${phi(38,40,3,6,0,.8)} ${phi(81,75,2.5,5,0,.8)}
    <g stroke="none"><circle cx="62" cy="62" r="3" fill="${pmd("yellow")}"/><circle cx="60" cy="98" r="2.5" fill="${pmd("pink")}"/><circle cx="104" cy="104" r="3" fill="${pmd("purple")}"/><circle cx="16" cy="64" r="2.5" fill="${pmd("water")}"/><circle cx="58" cy="14" r="2.5" fill="${pmd("leaf")}"/><circle cx="102" cy="12" r="2" fill="${pmd("pink")}"/></g>`,

  reden: `
    <path d="M6 120 Q8 92 30 90 Q52 92 54 120 Z" ${pf("leaf")}/>
    <path d="M66 120 Q68 92 90 90 Q112 92 114 120 Z" ${pf("purple")}/>
    <circle cx="30" cy="70" r="20" ${pf("skin")}/>
    <path d="M10 66 Q10 46 30 46 Q50 46 50 62 Q40 54 28 56 Q18 58 10 66 Z" ${pf("yolk")}/>
    <circle cx="90" cy="70" r="20" ${pf("skin")}/>
    <path d="M70 64 Q70 46 90 46 Q110 46 110 64 Q100 56 90 58 Q80 56 70 64 Z" ${pf("brown")}/>
    ${peye(36,68,3.6)} ${peye(84,68,3.6)} ${pcheek(40,77,3.5,2.4)} ${pcheek(80,77,3.5,2.4)}
    <ellipse cx="38" cy="82" rx="4" ry="3.5" fill="#B83A5A" stroke="#3B2C5A" stroke-width="2"/>
    ${psmile(84,80,7)}
    <path d="M38 10 H82 Q90 10 90 18 V30 Q90 38 82 38 H58 L50 46 L50 38 H38 Q30 38 30 30 V18 Q30 10 38 10 Z" ${pf("white")}/>
    <g fill="${pln("white")}" stroke="none"><circle cx="48" cy="24" r="3.5"/><circle cx="60" cy="24" r="3.5"/><circle cx="72" cy="24" r="3.5"/></g>`,

  Gaumen: `
    <path d="M10 56 Q60 8 110 56 Q60 116 10 56 Z" ${pf("red")}/>
    <path d="M20 56 Q60 24 100 56 Q60 100 20 56 Z" fill="#5A1E3A" stroke="none"/>
    <path d="M24 52 Q60 22 96 52 Q60 44 24 52 Z" ${pf("pink")} stroke-width="2.4"/>
    <path d="M40 46 Q60 36 80 46 M48 42 V48 M60 39 V46 M72 42 V48" fill="none" stroke="${pln("pink")}" stroke-width="1.8"/>
    <path d="M30 76 Q60 98 90 76 Q76 60 60 66 Q44 60 30 76 Z" ${pf("pink")}/>
    <path d="M60 68 V82" stroke="${pln("pink")}" stroke-width="2"/>
    <g fill="#fff" stroke="${pln("white")}" stroke-width="1.6"><rect x="30" y="47" width="10" height="9" rx="3"/><rect x="80" y="47" width="10" height="9" rx="3"/></g>
    ${phi(30,40,10,3,-30,.6)}
    ${pspark(60,30,.8,"#FFF")}`,

  Waden: `${pgr(46)}
    <g transform="translate(-24 0)">
      <path d="M42 18 Q30 42 42 66 L48 92 H68 L70 66 Q74 42 74 18 Z" ${pf("skin")}/>
      <rect x="36" y="4" width="42" height="22" rx="6" ${pf("blue")}/>
      <rect x="46" y="80" width="23" height="16" rx="3" ${pf("white")}/><path d="M46 86 H69" stroke="${pln("red")}" stroke-width="3"/>
      <path d="M44 94 H70 Q90 94 92 104 V108 H44 Z" ${pf("red")}/><path d="M44 104 H92" stroke="#fff" stroke-width="4"/>
    </g>
    <g transform="translate(26 0)">
      <path d="M42 18 Q30 42 42 66 L48 92 H68 L70 66 Q74 42 74 18 Z" ${pf("skin")}/>
      <rect x="36" y="4" width="42" height="22" rx="6" ${pf("blue")}/>
      <rect x="46" y="80" width="23" height="16" rx="3" ${pf("white")}/><path d="M46 86 H69" stroke="${pln("red")}" stroke-width="3"/>
      <path d="M44 94 H70 Q90 94 92 104 V108 H44 Z" ${pf("red")}/><path d="M44 104 H92" stroke="#fff" stroke-width="4"/>
    </g>`,
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

/* Bilder in festen Stellen der Seite (z. B. Spielarten auf der Startseite) */
document.querySelectorAll("[data-pics]").forEach(el => {
  el.innerHTML = el.dataset.pics.split(" ").map(w => pic(w)).join("");
});
