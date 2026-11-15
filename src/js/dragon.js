/* ================= Maskottchen: Fips, der kleine Drache ================= */
const DRAGON_NAME = "Fips";

/* __ID__ wird pro Drache ersetzt, damit Farbverläufe sich nicht gegenseitig stören */
const DRAGON_SVG = `
<svg class="dr" viewBox="28 30 352 360" role="img" aria-label="${DRAGON_NAME}, der kleine Drache">
  <defs>
    <radialGradient id="drskin__ID__" cx="0.36" cy="0.28" r="0.85">
      <stop offset="0" class="dr-s1"/>
      <stop offset="0.55" class="dr-s2"/>
      <stop offset="1" class="dr-s3"/>
    </radialGradient>
    <linearGradient id="drshade__ID__" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" class="dr-sh" stop-opacity="0"/>
      <stop offset="1" class="dr-sh" stop-opacity="0.22"/>
    </linearGradient>
    <radialGradient id="drbelly__ID__" cx="0.45" cy="0.3" r="0.75">
      <stop offset="0" stop-color="#FFFBEA"/>
      <stop offset="1" stop-color="#FFE29C"/>
    </radialGradient>
    <radialGradient id="drpink__ID__" cx="0.4" cy="0.35" r="0.8">
      <stop offset="0" stop-color="#FFD3DF"/>
      <stop offset="1" stop-color="#FFA5BE"/>
    </radialGradient>
    <linearGradient id="drhorn__ID__" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFEBB8"/>
      <stop offset="1" stop-color="#FFB95E"/>
    </linearGradient>
    <radialGradient id="driris__ID__" cx="0.5" cy="0.75" r="0.7">
      <stop offset="0" stop-color="#9C7BE0"/>
      <stop offset="0.6" stop-color="#4C3784"/>
      <stop offset="1" stop-color="#2A1F4A"/>
    </radialGradient>
    <radialGradient id="drglow__ID__" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" class="dr-gl" stop-opacity="0.9"/>
      <stop offset="1" class="dr-gl" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="drclip__ID__"><ellipse cx="200" cy="306" rx="64" ry="56"/></clipPath>
    <path id="drspark__ID__" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z"/>
    <path id="drheart__ID__" d="M0 7 C-15 -3 -11 -17 0 -9 C11 -17 15 -3 0 7 Z"/>
  </defs>

  <!-- sanfter Schein -->
  <circle class="dr-glow" cx="200" cy="215" r="180" fill="url(#drglow__ID__)"/>

  <!-- Glitzer -->
  <g class="dr-sparks" fill="#FFD36E">
    <use href="#drspark__ID__" class="dr-tw"         transform="translate(58 92) scale(1.3)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw2"  transform="translate(348 104) scale(1.1)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw3"  transform="translate(48 236) scale(.8)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw2"  transform="translate(300 46) scale(.7)"/>
  </g>

  <!-- Schatten am Boden -->
  <ellipse class="dr-shadow" cx="200" cy="377" rx="96" ry="10" fill="#2B4A40" opacity="0.14"/>

  <g class="dr-all">
  <g class="dr-bob">
   <g class="dr-outline" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">

    <!-- Schwanz mit Zacken und Herz-Spitze -->
    <g class="dr-tail">
      <path d="M286 336 Q292 316 306 332 Z" fill="url(#drhorn__ID__)" stroke-width="3.5"/>
      <path d="M314 330 Q318 310 332 322 Z" fill="url(#drhorn__ID__)" stroke-width="3.5"/>
      <path class="dr-line-s" d="M246 334 C298 354 342 342 350 312" fill="none" stroke-width="30"/>
      <path class="dr-mid-s" d="M246 334 C298 354 342 342 350 312" fill="none" stroke-width="21"/>
      <path d="M262 334 C300 346 334 338 344 318" fill="none" stroke="#fff" stroke-width="4" opacity="0.35"/>
      <g transform="translate(353 293) rotate(18) scale(1.7)" stroke-width="2.6">
        <use href="#drheart__ID__" fill="url(#drpink__ID__)"/>
      </g>
    </g>

    <!-- Flügelchen -->
    <g class="dr-wingL">
      <path d="M152 270 C122 248 94 250 88 270 C102 268 104 282 97 293 C111 289 117 300 112 311 C128 304 142 298 156 292 Z" fill="url(#drpink__ID__)"/>
      <path d="M142 274 L106 272 M140 284 L112 298" fill="none" stroke="#F08AAB" stroke-width="3"/>
    </g>
    <g class="dr-wingR">
      <path d="M248 270 C278 248 306 250 312 270 C298 268 296 282 303 293 C289 289 283 300 288 311 C272 304 258 298 244 292 Z" fill="url(#drpink__ID__)"/>
      <path d="M258 274 L294 272 M260 284 L288 298" fill="none" stroke="#F08AAB" stroke-width="3"/>
    </g>

    <!-- Körper -->
    <ellipse cx="200" cy="306" rx="64" ry="56" fill="url(#drskin__ID__)" stroke="none"/>
    <g clip-path="url(#drclip__ID__)" stroke="none">
      <ellipse cx="200" cy="306" rx="64" ry="56" fill="url(#drshade__ID__)"/>
    </g>
    <ellipse cx="200" cy="318" rx="40" ry="39" fill="url(#drbelly__ID__)" stroke-width="3.5"/>
    <g fill="none" stroke="#EDC46A" stroke-width="3">
      <path d="M170 300 Q200 309 230 300"/>
      <path d="M163 318 Q200 328 237 318"/>
      <path d="M170 337 Q200 345 230 337"/>
    </g>
    <ellipse cx="186" cy="300" rx="12" ry="7" transform="rotate(-20 186 300)" fill="#fff" opacity="0.55" stroke="none"/>
    <g clip-path="url(#drclip__ID__)" stroke="none">
      <ellipse class="dr-sh-fill" cx="200" cy="258" rx="74" ry="18" opacity="0.25"/>
    </g>
    <ellipse cx="200" cy="306" rx="64" ry="56" fill="none"/>

    <!-- linkes Ärmchen (auf dem Bauch) -->
    <ellipse cx="150" cy="306" rx="13" ry="20" transform="rotate(28 150 306)" fill="url(#drskin__ID__)"/>

    <!-- Füßchen mit Zehenbohnen -->
    <ellipse cx="168" cy="356" rx="25" ry="15" fill="url(#drskin__ID__)"/>
    <ellipse cx="232" cy="356" rx="25" ry="15" fill="url(#drskin__ID__)"/>
    <g fill="#FFA9C0" stroke="none">
      <ellipse cx="168" cy="359" rx="8" ry="5"/>
      <circle cx="155" cy="350" r="3.2"/><circle cx="166" cy="346" r="3.2"/><circle cx="177" cy="348" r="3.2"/>
      <ellipse cx="232" cy="359" rx="8" ry="5"/>
      <circle cx="223" cy="348" r="3.2"/><circle cx="234" cy="346" r="3.2"/><circle cx="245" cy="350" r="3.2"/>
    </g>

    <!-- rechtes Ärmchen (winkt / jubelt) -->
    <g class="dr-arm">
      <path class="dr-line-s" d="M252 292 L316 240" fill="none" stroke-width="30"/>
      <path class="dr-mid-s" d="M252 292 L316 240" fill="none" stroke-width="21"/>
      <circle cx="320" cy="236" r="17" fill="url(#drskin__ID__)"/>
      <g fill="#FFA9C0" stroke="none">
        <ellipse cx="322" cy="239" rx="7" ry="5"/>
        <circle cx="311" cy="228" r="3"/><circle cx="320" cy="224" r="3"/><circle cx="330" cy="228" r="3"/>
      </g>
    </g>
   </g>

   <!-- Kopf (leicht geneigt) -->
   <g class="dr-tilt">
    <g class="dr-outline" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
      <path d="M98 140 C70 122 54 138 63 151 C52 160 58 177 74 173 C68 185 80 196 96 186 Z" fill="url(#drpink__ID__)"/>
      <path d="M302 140 C330 122 346 138 337 151 C348 160 342 177 326 173 C332 185 320 196 304 186 Z" fill="url(#drpink__ID__)"/>
      <path d="M92 152 L72 151 M92 168 L76 172" fill="none" stroke="#F08AAB" stroke-width="3"/>
      <path d="M308 152 L328 151 M308 168 L324 172" fill="none" stroke="#F08AAB" stroke-width="3"/>
      <path d="M138 108 Q126 70 150 58 Q168 64 176 98 Z" fill="url(#drhorn__ID__)"/>
      <path d="M262 108 Q274 70 250 58 Q232 64 224 98 Z" fill="url(#drhorn__ID__)"/>
      <path d="M137 86 Q150 82 162 90 M141 72 Q150 70 156 76" fill="none" stroke="#E79A3F" stroke-width="3"/>
      <path d="M263 86 Q250 82 238 90 M259 72 Q250 70 244 76" fill="none" stroke="#E79A3F" stroke-width="3"/>
      <path d="M172 96 C168 78 182 70 190 80 C190 58 212 58 210 80 C218 70 232 78 228 96 Z" fill="url(#drhorn__ID__)"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#drskin__ID__)"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#drshade__ID__)" stroke="none"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="none"/>
    </g>

    <ellipse cx="148" cy="116" rx="40" ry="15" transform="rotate(-22 148 116)" fill="#fff" opacity="0.38"/>
    <circle cx="190" cy="98" r="5" fill="#fff" opacity="0.4"/>
    <g class="dr-dot">
      <circle cx="200" cy="106" r="4"/><circle cx="186" cy="114" r="3"/><circle cx="214" cy="114" r="3"/>
    </g>

    <!-- Augen: normal -->
    <g class="dr-eyes-open">
      <g class="dr-blink">
        <ellipse cx="155" cy="184" rx="28" ry="32" fill="#1C1530"/>
        <ellipse cx="155" cy="190" rx="21" ry="24" fill="url(#driris__ID__)"/>
        <ellipse cx="155" cy="190" rx="10" ry="13" fill="#140F24"/>
        <path d="M136 202 Q155 222 174 202 Q155 213 136 202 Z" fill="#8BEBD6" opacity="0.9"/>
        <circle cx="165" cy="170" r="11.5" fill="#fff"/>
        <circle cx="144" cy="196" r="5" fill="#fff"/>
        <circle cx="167" cy="198" r="2.4" fill="#fff"/>
      </g>
      <g class="dr-blink">
        <ellipse cx="245" cy="184" rx="28" ry="32" fill="#1C1530"/>
        <ellipse cx="245" cy="190" rx="21" ry="24" fill="url(#driris__ID__)"/>
        <ellipse cx="245" cy="190" rx="10" ry="13" fill="#140F24"/>
        <path d="M226 202 Q245 222 264 202 Q245 213 226 202 Z" fill="#8BEBD6" opacity="0.9"/>
        <circle cx="255" cy="170" r="11.5" fill="#fff"/>
        <circle cx="234" cy="196" r="5" fill="#fff"/>
        <circle cx="257" cy="198" r="2.4" fill="#fff"/>
      </g>
      <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none">
        <path d="M129 170 L119 162"/><path d="M128 181 L117 179"/>
        <path d="M271 170 L281 162"/><path d="M272 181 L283 179"/>
      </g>
    </g>

    <!-- Augen: fröhlich ^^ -->
    <g class="dr-eyes-happy" fill="none" stroke="#1C1530" stroke-width="9" stroke-linecap="round">
      <path d="M127 194 Q155 154 183 194"/>
      <path d="M217 194 Q245 154 273 194"/>
      <path d="M127 176 L117 168 M273 176 L283 168" stroke-width="4"/>
    </g>

    <!-- Augen: verdreht @@ -->
    <g class="dr-eyes-dizzy">
      <g class="dr-swirl">
        <circle cx="155" cy="184" r="28" fill="#fff" stroke="#1C1530" stroke-width="4"/>
        <path d="M155 184 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16" fill="none" stroke="#1C1530" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g class="dr-swirl">
        <circle cx="245" cy="184" r="28" fill="#fff" stroke="#1C1530" stroke-width="4"/>
        <path d="M245 184 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16" fill="none" stroke="#1C1530" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>

    <!-- Brauen -->
    <g class="dr-brows" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M140 140 Q152 133 166 138"/>
      <path d="M234 138 Q248 133 260 140"/>
    </g>

    <!-- Bäckchen -->
    <ellipse cx="114" cy="218" rx="21" ry="12.5" fill="#FF9BB5" opacity="0.9"/>
    <ellipse cx="286" cy="218" rx="21" ry="12.5" fill="#FF9BB5" opacity="0.9"/>
    <g stroke="#FF7CA0" stroke-width="2.5" stroke-linecap="round">
      <path d="M104 222 L108 214"/><path d="M112 222 L116 214"/><path d="M120 222 L124 214"/>
      <path d="M276 222 L280 214"/><path d="M284 222 L288 214"/><path d="M292 222 L296 214"/>
    </g>
    <circle cx="124" cy="212" r="2.5" fill="#fff" opacity="0.8"/>
    <circle cx="296" cy="212" r="2.5" fill="#fff" opacity="0.8"/>

    <!-- Näschen -->
    <ellipse class="dr-nose" cx="193" cy="206" rx="2.6" ry="1.8"/>
    <ellipse class="dr-nose" cx="207" cy="206" rx="2.6" ry="1.8"/>

    <!-- Mund: normal -->
    <g class="dr-m-idle">
      <path class="dr-line-s" d="M185 216 Q200 237 215 216 Q200 220 185 216 Z" fill="#8C3A55" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M192 226 Q200 219 208 226 Q205 232 200 232 Q195 232 192 226 Z" fill="#FF8FAB"/>
      <path d="M190 217.5 L193.6 223.5 L196.8 218.4 Z" fill="#fff"/>
    </g>
    <!-- Mund: lacht -->
    <g class="dr-m-happy">
      <path class="dr-line-s" d="M173 213 Q200 258 227 213 Q200 221 173 213 Z" fill="#8C3A55" stroke-width="4" stroke-linejoin="round"/>
      <path d="M186 237 Q200 225 214 237 Q208 247 200 247 Q192 247 186 237 Z" fill="#FF8FAB"/>
      <path d="M180 215 L184 222 L188 216 Z" fill="#fff"/>
    </g>
    <!-- Mund: Zunge raus -->
    <g class="dr-m-oops">
      <path class="dr-line-s" d="M178 222 Q189 212 200 222 Q211 232 222 222" fill="none" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M198 224 Q194 252 210 250 Q220 240 210 226 Z" fill="#FF8FAB" stroke="#E0607F" stroke-width="3" stroke-linejoin="round"/>
      <path d="M204 232 L206 244" stroke="#E0607F" stroke-width="2" stroke-linecap="round"/>
    </g>
   </g>
  </g>
  </g>

  <!-- schwebendes Herzchen -->
  <g class="dr-float">
    <use href="#drheart__ID__" transform="translate(352 206) scale(.9)" fill="#FF8FAB"/>
  </g>
</svg>`;

const DRAGON_FX = {
  happy: ["💖","✨","⭐","💚","🌟"],
  oops:  ["💨","❄️","💧"],
  wave:  ["✨","💖"],
  giggle:["💗","✨"]
};

let dragonCount = 0;
/* Alle Platzhalter mit data-dragon füllen */
function mountDragons(root = document){
  root.querySelectorAll("[data-dragon]").forEach(el => {
    if (el.querySelector("svg")) return;
    const id = "-" + (++dragonCount);
    el.classList.add("dragon");
    el.innerHTML = DRAGON_SVG.replace(/__ID__/g, id) + `<div class="dr-fx"></div>`;
  });
}

/* Drache zeigt ein Gefühl: happy | oops | wave | giggle  (ms = 0 → bleibt so) */
function dragonDo(el, state, ms = 1800){
  if (typeof el === "string") el = $(el);
  if (!el) return;
  clearTimeout(el._drTimer);
  el.classList.remove("happy","oops","wave","giggle");
  void el.offsetWidth;
  el.classList.add(state);
  dragonFx(el, state);
  if (ms > 0) el._drTimer = setTimeout(() => el.classList.remove(state), ms);
}
function dragonReset(el){
  if (typeof el === "string") el = $(el);
  if (!el) return;
  clearTimeout(el._drTimer);
  el.classList.remove("happy","oops","wave","giggle");
}
function dragonFx(el, state){
  const box = el.querySelector(".dr-fx"); if (!box) return;
  const items = DRAGON_FX[state] || [];
  const n = state === "happy" ? 7 : state === "oops" ? 4 : 3;
  for (let i = 0; i < n; i++){
    const s = document.createElement("span");
    s.textContent = pick(items);
    s.style.left = (30 + rnd() * 40) + "%";
    s.style.setProperty("--dx", (rnd() * 120 - 60) + "px");
    s.style.animationDelay = (i * 0.09) + "s";
    box.appendChild(s);
    setTimeout(() => s.remove(), 1800);
  }
}
