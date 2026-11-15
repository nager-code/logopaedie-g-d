/* ================= Maskottchen: Fips, der kleine Drache ================= */
const DRAGON_NAME = "Fips";

/* __ID__ wird pro Drache ersetzt, damit Farbverläufe sich nicht gegenseitig stören */
const DRAGON_SVG = `
<svg class="dr" viewBox="30 36 350 356" role="img" aria-label="${DRAGON_NAME}, der kleine Drache">
  <defs>
    <radialGradient id="drskin__ID__" cx="0.38" cy="0.3" r="0.8">
      <stop offset="0" class="dr-s1"/>
      <stop offset="1" class="dr-s2"/>
    </radialGradient>
    <radialGradient id="drbelly__ID__" cx="0.5" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#FFF8E1"/>
      <stop offset="1" stop-color="#FFE7A8"/>
    </radialGradient>
    <radialGradient id="dreye__ID__" cx="0.5" cy="0.3" r="0.75">
      <stop offset="0" stop-color="#5A4386"/>
      <stop offset="0.7" stop-color="#211A35"/>
    </radialGradient>
    <linearGradient id="drhorn__ID__" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFE3A3"/>
      <stop offset="1" stop-color="#FFBE6B"/>
    </linearGradient>
    <path id="drspark__ID__" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z"/>
    <path id="drheart__ID__" d="M0 7 C-15 -3 -11 -17 0 -9 C11 -17 15 -3 0 7 Z"/>
  </defs>

  <!-- Glitzer -->
  <g class="dr-sparks" fill="#FFD36E">
    <use href="#drspark__ID__" class="dr-tw"     transform="translate(58 92) scale(1.3)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw2" transform="translate(344 96) scale(1.1)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw3" transform="translate(52 236) scale(.8)"/>
    <use href="#drspark__ID__" class="dr-tw dr-tw2" transform="translate(296 52) scale(.7)"/>
  </g>

  <!-- Schatten -->
  <ellipse class="dr-shadow" cx="200" cy="376" rx="92" ry="10" fill="#2B4A40" opacity="0.12"/>

  <g class="dr-all">
  <g class="dr-bob dr-outline" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">

    <!-- Schwanz mit Herz-Spitze -->
    <g class="dr-tail">
      <path class="dr-line-s" d="M246 334 C298 354 342 342 350 312" fill="none" stroke-width="30"/>
      <path class="dr-mid-s" d="M246 334 C298 354 342 342 350 312" fill="none" stroke-width="21"/>
      <g transform="translate(353 293) rotate(18) scale(1.7)" stroke-width="2.6">
        <use href="#drheart__ID__" fill="#FFB8CB"/>
      </g>
    </g>

    <!-- Flügelchen -->
    <g class="dr-wingL">
      <path d="M152 270 C122 248 94 250 88 270 C102 268 104 282 97 293 C111 289 117 300 112 311 C128 304 142 298 156 292 Z" fill="#FFB8CB"/>
      <path d="M140 274 L106 274 M138 284 L112 298" fill="none" stroke="#F28DAE" stroke-width="3"/>
    </g>
    <g class="dr-wingR">
      <path d="M248 270 C278 248 306 250 312 270 C298 268 296 282 303 293 C289 289 283 300 288 311 C272 304 258 298 244 292 Z" fill="#FFB8CB"/>
      <path d="M260 274 L294 274 M262 284 L288 298" fill="none" stroke="#F28DAE" stroke-width="3"/>
    </g>

    <!-- Körper -->
    <ellipse cx="200" cy="306" rx="64" ry="56" fill="url(#drskin__ID__)"/>
    <ellipse cx="200" cy="316" rx="40" ry="40" fill="url(#drbelly__ID__)"/>
    <g fill="none" stroke="#EBC874" stroke-width="3">
      <path d="M172 300 Q200 308 228 300"/>
      <path d="M166 318 Q200 327 234 318"/>
      <path d="M172 336 Q200 344 228 336"/>
    </g>

    <!-- linkes Ärmchen (auf dem Bauch) -->
    <ellipse cx="150" cy="306" rx="13" ry="20" transform="rotate(28 150 306)" fill="url(#drskin__ID__)"/>

    <!-- Füßchen mit Zehenbohnen -->
    <ellipse cx="168" cy="356" rx="25" ry="15" fill="url(#drskin__ID__)"/>
    <ellipse cx="232" cy="356" rx="25" ry="15" fill="url(#drskin__ID__)"/>
    <g fill="#FFB8CB" stroke="none">
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
      <g fill="#FFB8CB" stroke="none">
        <ellipse cx="322" cy="239" rx="7" ry="5"/>
        <circle cx="311" cy="228" r="3"/><circle cx="320" cy="224" r="3"/><circle cx="330" cy="228" r="3"/>
      </g>
    </g>

    <!-- Ohr-Flossen -->
    <path d="M98 140 C70 122 54 138 63 151 C52 160 58 177 74 173 C68 185 80 196 96 186 Z" fill="#FFB8CB"/>
    <path d="M302 140 C330 122 346 138 337 151 C348 160 342 177 326 173 C332 185 320 196 304 186 Z" fill="#FFB8CB"/>

    <!-- Hörnchen & Haarbüschel -->
    <path d="M138 108 Q126 70 150 58 Q168 64 176 98 Z" fill="url(#drhorn__ID__)"/>
    <path d="M262 108 Q274 70 250 58 Q232 64 224 98 Z" fill="url(#drhorn__ID__)"/>
    <path d="M172 96 C168 78 182 70 190 80 C190 58 212 58 210 80 C218 70 232 78 228 96 Z" fill="url(#drhorn__ID__)"/>

    <!-- Kopf -->
    <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#drskin__ID__)"/>
  </g>

  <!-- Gesicht -->
  <g class="dr-bob">
    <ellipse cx="150" cy="118" rx="38" ry="15" transform="rotate(-22 150 118)" fill="#fff" opacity="0.3"/>
    <g class="dr-dot">
      <circle cx="200" cy="104" r="4"/><circle cx="186" cy="112" r="3"/><circle cx="214" cy="112" r="3"/>
    </g>

    <!-- Augen: normal -->
    <g class="dr-eyes-open">
      <g class="dr-blink">
        <ellipse cx="155" cy="184" rx="27" ry="31" fill="url(#dreye__ID__)"/>
        <path d="M136 201 Q155 220 174 201 Q155 211 136 201 Z" fill="#7FE6CF" opacity="0.85"/>
        <circle cx="164" cy="171" r="11" fill="#fff"/>
        <circle cx="145" cy="195" r="4.5" fill="#fff"/>
        <circle cx="166" cy="197" r="2.2" fill="#fff"/>
      </g>
      <g class="dr-blink">
        <ellipse cx="245" cy="184" rx="27" ry="31" fill="url(#dreye__ID__)"/>
        <path d="M226 201 Q245 220 264 201 Q245 211 226 201 Z" fill="#7FE6CF" opacity="0.85"/>
        <circle cx="254" cy="171" r="11" fill="#fff"/>
        <circle cx="235" cy="195" r="4.5" fill="#fff"/>
        <circle cx="256" cy="197" r="2.2" fill="#fff"/>
      </g>
      <g stroke="#211A35" stroke-width="4" stroke-linecap="round" fill="none">
        <path d="M130 170 L120 163"/><path d="M131 180 L120 178"/>
        <path d="M270 170 L280 163"/><path d="M269 180 L280 178"/>
      </g>
    </g>

    <!-- Augen: fröhlich ^^ -->
    <g class="dr-eyes-happy" fill="none" stroke="#211A35" stroke-width="9" stroke-linecap="round">
      <path d="M128 194 Q155 156 182 194"/>
      <path d="M218 194 Q245 156 272 194"/>
      <path d="M128 176 L118 168 M272 176 L282 168" stroke-width="4"/>
    </g>

    <!-- Augen: verdreht @@ -->
    <g class="dr-eyes-dizzy">
      <g class="dr-swirl">
        <circle cx="155" cy="184" r="27" fill="#fff" stroke="#211A35" stroke-width="4"/>
        <path d="M155 184 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16" fill="none" stroke="#211A35" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g class="dr-swirl">
        <circle cx="245" cy="184" r="27" fill="#fff" stroke="#211A35" stroke-width="4"/>
        <path d="M245 184 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16" fill="none" stroke="#211A35" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>

    <!-- Bäckchen -->
    <g class="dr-cheeks">
      <ellipse cx="116" cy="216" rx="20" ry="12" fill="#FF9BB5" opacity="0.9"/>
      <ellipse cx="284" cy="216" rx="20" ry="12" fill="#FF9BB5" opacity="0.9"/>
      <g stroke="#FF7FA2" stroke-width="2.5" stroke-linecap="round">
        <path d="M106 220 L110 212"/><path d="M114 220 L118 212"/><path d="M122 220 L126 212"/>
        <path d="M274 220 L278 212"/><path d="M282 220 L286 212"/><path d="M290 220 L294 212"/>
      </g>
    </g>

    <!-- Mund: normal -->
    <g class="dr-m-idle">
      <path class="dr-line-s" d="M186 214 Q200 234 214 214 Q200 218 186 214 Z" fill="#8C3A55" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M193 223 Q200 217 207 223 Q204 229 200 229 Q196 229 193 223 Z" fill="#FF8FAB"/>
      <path d="M191 215.5 L194.5 221 L197.5 216.3 Z" fill="#fff"/>
    </g>
    <!-- Mund: lacht -->
    <g class="dr-m-happy">
      <path class="dr-line-s" d="M174 210 Q200 256 226 210 Q200 218 174 210 Z" fill="#8C3A55" stroke-width="4" stroke-linejoin="round"/>
      <path d="M186 234 Q200 222 214 234 Q208 244 200 244 Q192 244 186 234 Z" fill="#FF8FAB"/>
      <path d="M181 212 L185 219 L189 213 Z" fill="#fff"/>
    </g>
    <!-- Mund: Zunge raus -->
    <g class="dr-m-oops">
      <path class="dr-line-s" d="M178 220 Q189 210 200 220 Q211 230 222 220" fill="none" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M198 222 Q194 250 210 248 Q220 238 210 224 Z" fill="#FF8FAB" stroke="#E0607F" stroke-width="3" stroke-linejoin="round"/>
      <path d="M204 230 L206 242" stroke="#E0607F" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>
  </g>

  <!-- schwebendes Herzchen -->
  <g class="dr-float">
    <use href="#drheart__ID__" transform="translate(350 206) scale(.9)" fill="#FF8FAB"/>
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
