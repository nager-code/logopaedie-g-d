"""Generator für die Fips-Drachen-Varianten (Begrüßung, Jubel, Hoppla)."""
import os

OUT = os.path.dirname(os.path.abspath(__file__))
LINE = "#2F7D63"
SW = 4.5

DEFS = """
  <defs>
    <radialGradient id="skinHead" cx="0.36" cy="0.28" r="0.85">
      <stop offset="0" stop-color="#B4F2D9"/><stop offset="0.55" stop-color="#7DD9B4"/><stop offset="1" stop-color="#55BE96"/>
    </radialGradient>
    <radialGradient id="skinBody" gradientUnits="userSpaceOnUse" cx="178" cy="262" r="125">
      <stop offset="0" stop-color="#A6EDD0"/><stop offset="0.6" stop-color="#76D5AF"/><stop offset="1" stop-color="#58BF97"/>
    </radialGradient>
    <linearGradient id="shadeDown" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="#2F7D63" stop-opacity="0"/><stop offset="1" stop-color="#2F7D63" stop-opacity="0.22"/>
    </linearGradient>
    <radialGradient id="belly" cx="0.45" cy="0.3" r="0.75">
      <stop offset="0" stop-color="#FFFBEA"/><stop offset="1" stop-color="#FFE29C"/>
    </radialGradient>
    <radialGradient id="pinkG" cx="0.4" cy="0.35" r="0.8">
      <stop offset="0" stop-color="#FFD3DF"/><stop offset="1" stop-color="#FFA5BE"/>
    </radialGradient>
    <linearGradient id="horn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFEBB8"/><stop offset="1" stop-color="#FFB95E"/>
    </linearGradient>
    <radialGradient id="iris" cx="0.5" cy="0.75" r="0.7">
      <stop offset="0" stop-color="#9C7BE0"/><stop offset="0.6" stop-color="#4C3784"/><stop offset="1" stop-color="#2A1F4A"/>
    </radialGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#C9F5E4" stop-opacity="0.9"/><stop offset="1" stop-color="#C9F5E4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="skinFoot" gradientUnits="userSpaceOnUse" x1="0" y1="326" x2="0" y2="374">
      <stop offset="0" stop-color="#A2EACB"/><stop offset="1" stop-color="#6BCDA6"/>
    </linearGradient>
    <radialGradient id="padG" cx="0.4" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#FFC6D5"/><stop offset="1" stop-color="#FF97B3"/>
    </radialGradient>
    <linearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D6F1FF"/><stop offset="1" stop-color="#8CCBF2"/>
    </linearGradient>
    <linearGradient id="shadeBody" gradientUnits="userSpaceOnUse" x1="0" y1="282" x2="0" y2="362">
      <stop offset="0" stop-color="#2F7D63" stop-opacity="0"/><stop offset="1" stop-color="#2F7D63" stop-opacity="0.24"/>
    </linearGradient>
    <radialGradient id="headShadow" gradientUnits="userSpaceOnUse" cx="200" cy="254" r="86"
        gradientTransform="translate(200 254) scale(1 .32) translate(-200 -254)">
      <stop offset="0" stop-color="#2F7D63" stop-opacity="0.32"/><stop offset="0.65" stop-color="#2F7D63" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#2F7D63" stop-opacity="0"/>
    </radialGradient>
    <path id="spark" d="M0 -10 Q2 -2 10 0 Q2 2 0 10 Q-2 2 -10 0 Q-2 -2 0 -10 Z"/>
    <path id="heart" d="M0 7 C-15 -3 -11 -17 0 -9 C11 -17 15 -3 0 7 Z"/>
    %EXTRA_DEFS%
  </defs>
"""

BASE_CSS = """
    .blink { transform-box: fill-box; transform-origin: center; animation: blink 4.5s infinite; }
    .tw    { transform-box: fill-box; transform-origin: center; animation: tw 2.4s ease-in-out infinite; }
    .tw2 { animation-delay: .8s; } .tw3 { animation-delay: 1.6s; }
    .tail  { transform-origin: 250px 332px; animation: tail 2.2s ease-in-out infinite; }
    @keyframes blink { 0%,93%,100% { transform: scaleY(1); } 96% { transform: scaleY(0.08); } }
    @keyframes tw    { 0%,100% { transform: scale(.4); opacity: .3; } 50% { transform: scale(1.1); opacity: 1; } }
    @keyframes tail  { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-7deg); } }
"""

# ---------------------------------------------------------------- Arme
def raised_arm(hand_rot, palm=True, w=1.0):
    """Erhobener Arm, lokal: Schulter im Ursprung, zeigt nach oben."""
    shapes = f"""
      <path d="M{-14*w:.1f} 10 C{-16*w:.1f} -18 {-14*w:.1f} -40 {-10*w:.1f} -56 L{10*w:.1f} -56 C{14*w:.1f} -40 {16*w:.1f} -18 {14*w:.1f} 10 Z"/>
      <g transform="rotate({hand_rot} 0 -56)">
        <ellipse cx="0" cy="-70" rx="18" ry="16"/>
        <ellipse cx="-12" cy="-83" rx="6.5" ry="9" transform="rotate(-22 -12 -83)"/>
        <ellipse cx="0" cy="-88" rx="6.5" ry="9.5"/>
        <ellipse cx="12" cy="-83" rx="6.5" ry="9" transform="rotate(22 12 -83)"/>
        <ellipse cx="-19" cy="-64" rx="6.5" ry="8.5" transform="rotate(-55 -19 -64)"/>
      </g>"""
    joint = f"""
      <path d="M{12.5*w:.1f} 8 C{14.5*w:.1f} -2 {14.8*w:.1f} -12 {13.6*w:.1f} -24" fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round"/>"""
    if palm:
        detail = joint + f"""
      <g transform="rotate({hand_rot} 0 -56)" fill="#FFA9C0" stroke="none">
        <ellipse cx="0" cy="-68" rx="8" ry="6.5"/>
        <circle cx="-12" cy="-84" r="3.2"/><circle cx="0" cy="-90" r="3.3"/><circle cx="12" cy="-84" r="3.2"/>
        <circle cx="-20" cy="-65" r="2.8"/>
      </g>
      <path d="M-5 -8 C-7 -24 -6 -38 -4 -50" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>"""
    else:  # Handrücken: Fingerfugen statt Ballen
        detail = joint + f"""
      <g transform="rotate({hand_rot} 0 -56)" fill="none" stroke="{LINE}" stroke-width="3" stroke-linecap="round">
        <path d="M-6 -79 L-5 -72"/><path d="M6 -79 L5 -72"/>
      </g>
      <path d="M-5 -8 C-7 -24 -6 -38 -4 -50" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>"""
    return shapes, detail


def hanging_arm():
    """Herabhängendes Ärmchen, lokal: Schulter im Ursprung, zeigt nach unten."""
    shapes = """
      <path d="M-12 0 C-12 -17 12 -17 12 0 C14 10 13 20 10 30 L-10 30 C-13 20 -14 10 -12 0 Z"/>
      <ellipse cx="0" cy="36" rx="13" ry="12"/>
      <circle cx="-8" cy="45" r="5"/><circle cx="0" cy="47" r="5"/><circle cx="8" cy="45" r="5"/>"""
    # Innenkontur: trennt Arm vom Bauch, läuft zur Schulter hin aus
    detail = f"""
      <path d="M11 6 C12.5 16 12 26 10 32 C14 38 12 44 8 49" fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M-3 47 L-3.5 43 M4 47 L4.5 43" fill="none" stroke="{LINE}" stroke-width="2.5" stroke-linecap="round"/>"""
    return shapes, detail


def place(inner, transform, cls=None):
    g = f'<g transform="{transform}">{inner}</g>'
    return f'<g class="{cls}">{g}</g>' if cls else g


# ---------------------------------------------------------------- Teile
def tail(droop=False):
    if droop:
        d, heart = "M246 338 C290 362 330 366 354 352", "translate(366 346) rotate(105) scale(1.6)"
        spines = """<path d="M286 352 Q292 334 304 352 Z"/><path d="M316 356 Q324 338 334 356 Z"/>"""
    else:
        d, heart = "M246 334 C298 354 342 342 350 312", "translate(353 293) rotate(18) scale(1.7)"
        spines = """<path d="M286 336 Q292 316 306 332 Z"/><path d="M314 330 Q318 310 332 322 Z"/>"""
    return f"""
    <g class="tail">
      <g fill="url(#horn)" stroke-width="3.5">{spines}</g>
      <path d="{d}" fill="none" stroke="{LINE}" stroke-width="30"/>
      <path d="{d}" fill="none" stroke="#6FD1AA" stroke-width="21"/>
      <g transform="{heart}" stroke-width="2.6"><use href="#heart" fill="url(#pinkG)"/></g>
    </g>"""


def wings(droop=0):
    return f"""
    <g transform="rotate({-droop} 150 280)"><g class="wingL">
      <path d="M152 270 C122 248 94 250 88 270 C102 268 104 282 97 293 C111 289 117 300 112 311 C128 304 142 298 156 292 Z" fill="url(#pinkG)"/>
      <path d="M142 274 L106 272 M140 284 L112 298" fill="none" stroke="#F08AAB" stroke-width="3"/>
    </g></g>
    <g transform="rotate({droop} 250 280)"><g class="wingR">
      <path d="M248 270 C278 248 306 250 312 270 C298 268 296 282 303 293 C289 289 283 300 288 311 C272 304 258 298 244 292 Z" fill="url(#pinkG)"/>
      <path d="M258 274 L294 272 M260 284 L288 298" fill="none" stroke="#F08AAB" stroke-width="3"/>
    </g></g>"""


def body(arms, mid="a", front=()):
    """arms: Liste von (shapes, detail, transform, css_class).
    Körper und Arme werden als EINE Silhouette gezeichnet (Kontur-Durchgang,
    dann Füllung), damit die Arme nahtlos aus dem Körper wachsen."""
    def union(fill, stroke):
        parts = ['<ellipse cx="200" cy="306" rx="64" ry="56"/>',
                 '<ellipse cx="157" cy="336" rx="25" ry="23"/>',
                 '<ellipse cx="243" cy="336" rx="25" ry="23"/>']
        for shapes, _, tf, cls in arms:
            parts.append(place(shapes, tf, cls))
        st = f'stroke="{stroke}" stroke-width="{SW*2}"' if stroke else 'stroke="none"'
        return f'<g fill="{fill}" {st}>{"".join(parts)}</g>'

    details = "".join(place(det, tf, cls) for _, det, tf, cls in arms)
    return f"""
    {union(LINE, LINE)}
    <mask id="bodyMask{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">{union("#fff", None)}</mask>
    <rect width="400" height="400" fill="url(#skinBody)" stroke="none" mask="url(#bodyMask{mid})"/>
    <rect width="400" height="400" fill="url(#shadeBody)" stroke="none" mask="url(#bodyMask{mid})"/>
    <ellipse cx="200" cy="318" rx="40" ry="39" fill="url(#belly)" stroke-width="3.5"/>
    <g fill="none" stroke="#EDC46A" stroke-width="3">
      <path d="M170 300 Q200 309 230 300"/><path d="M163 318 Q200 328 237 318"/><path d="M170 337 Q200 345 230 337"/>
    </g>
    <ellipse cx="186" cy="300" rx="12" ry="7" transform="rotate(-20 186 300)" fill="#fff" opacity="0.55" stroke="none"/>
    <rect width="400" height="400" fill="url(#headShadow)" stroke="none" mask="url(#bodyMask{mid})"/>
    {details}
    <g fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round">
      <path d="M135 330 Q141 315 160 313"/><path d="M265 330 Q259 315 240 313"/>
    </g>
    {front_arms(front, mid)}
    {feet(mid)}"""


def front_arms(front, mid):
    """Unterarm/Pfote, die VOR dem Oberschenkel liegt: nochmal mit voller Kontur,
    nur unterhalb der Hüftlinie (oben bleibt der nahtlose Schulteransatz)."""
    if not front:
        return ""
    sh = "".join(place(shapes, tf, cls) for shapes, _, tf, cls in front)
    det = "".join(place(d, tf, cls) for _, d, tf, cls in front)
    return f"""
    <clipPath id="lowClip{mid}"><rect x="0" y="300" width="400" height="100"/></clipPath>
    <g clip-path="url(#lowClip{mid})">
      <g fill="{LINE}" stroke="{LINE}" stroke-width="{SW*2}">{sh}</g>
      <mask id="frontMask{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><g fill="#fff" stroke="none">{sh}</g></mask>
      <rect width="400" height="400" fill="url(#skinBody)" stroke="none" mask="url(#frontMask{mid})"/>
      {det}
    </g>"""


def feet(mid):
    """Kuschelige Füßchen, Sohle zum Betrachter (Plüschtier-Sitzpose)."""
    foot = """
      <ellipse cx="0" cy="2" rx="19" ry="17"/>
      <circle cx="-12.5" cy="-11" r="8.2"/><circle cx="0" cy="-15.5" r="8.8"/><circle cx="12.5" cy="-11" r="8.2"/>"""
    pads = """
      <path d="M0 -1 C-7 -6 -12 -1 -11 5 C-10 11 -5 13 0 13 C5 13 10 11 11 5 C12 -1 7 -6 0 -1 Z" fill="url(#padG)"/>
      <ellipse cx="-12.5" cy="-12" rx="3.6" ry="4.2" fill="url(#padG)" transform="rotate(-20 -12.5 -12)"/>
      <ellipse cx="0" cy="-17" rx="3.8" ry="4.5" fill="url(#padG)"/>
      <ellipse cx="12.5" cy="-12" rx="3.6" ry="4.2" fill="url(#padG)" transform="rotate(20 12.5 -12)"/>
      <ellipse cx="-4" cy="3" rx="3" ry="2" fill="#fff" opacity="0.6" transform="rotate(-20 -4 3)"/>"""
    tfs = ["translate(167 353) rotate(-16) scale(1.12)", "translate(233 353) rotate(16) scale(1.12)"]
    both = "".join(f'<g transform="{t}">{foot}</g>' for t in tfs)
    return f"""
    <g fill="{LINE}" stroke="{LINE}" stroke-width="{SW*2/1.12:.2f}">{both}</g>
    <mask id="feetMask{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><g fill="#fff" stroke="none">{both}</g></mask>
    <rect width="400" height="400" fill="url(#skinFoot)" stroke="none" mask="url(#feetMask{mid})"/>
    <g stroke="none">{"".join(f'<g transform="{t}">{pads}</g>' for t in tfs)}</g>"""


def head_shapes(fin_droop=0, fin_r=None, fin_r_cls=""):
    return f"""
    <g stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
      <g transform="rotate({-fin_droop} 98 165)">
        <path d="M98 140 C70 122 54 138 63 151 C52 160 58 177 74 173 C68 185 80 196 96 186 Z" fill="url(#pinkG)"/>
        <path d="M92 152 L72 151 M92 168 L76 172" fill="none" stroke="#F08AAB" stroke-width="3"/>
      </g>
      <g class="{fin_r_cls}"><g transform="{fin_r if fin_r else f'rotate({fin_droop} 302 165)'}">
        <path d="M302 140 C330 122 346 138 337 151 C348 160 342 177 326 173 C332 185 320 196 304 186 Z" fill="url(#pinkG)"/>
        <path d="M308 152 L328 151 M308 168 L324 172" fill="none" stroke="#F08AAB" stroke-width="3"/>
      </g></g>
      <path d="M138 108 Q126 70 150 58 Q168 64 176 98 Z" fill="url(#horn)"/>
      <path d="M262 108 Q274 70 250 58 Q232 64 224 98 Z" fill="url(#horn)"/>
      <path d="M137 86 Q150 82 162 90 M141 72 Q150 70 156 76" fill="none" stroke="#E79A3F" stroke-width="3"/>
      <path d="M263 86 Q250 82 238 90 M259 72 Q250 70 244 76" fill="none" stroke="#E79A3F" stroke-width="3"/>
      <path d="M172 96 C168 78 182 70 190 80 C190 58 212 58 210 80 C218 70 232 78 228 96 Z" fill="url(#horn)"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#skinHead)"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="url(#shadeDown)" stroke="none"/>
      <ellipse cx="200" cy="172" rx="112" ry="90" fill="none"/>
    </g>
    <ellipse cx="148" cy="116" rx="40" ry="15" transform="rotate(-22 148 116)" fill="#fff" opacity="0.38"/>
    <circle cx="190" cy="98" r="5" fill="#fff" opacity="0.4"/>
    <g fill="#5CC49B"><circle cx="200" cy="106" r="4"/><circle cx="186" cy="114" r="3"/><circle cx="214" cy="114" r="3"/></g>"""


def open_eyes(look=(0, 0)):
    dx, dy = look
    out = ""
    for cx in (155, 245):
        out += f"""
    <g class="blink">
      <ellipse cx="{cx}" cy="184" rx="28" ry="32" fill="#1C1530"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="21" ry="24" fill="url(#iris)"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="10" ry="13" fill="#140F24"/>
      <path d="M{cx-19} 202 Q{cx} 222 {cx+19} 202 Q{cx} 213 {cx-19} 202 Z" fill="#8BEBD6" opacity="0.9"/>
      <circle cx="{cx+10}" cy="170" r="11.5" fill="#fff"/>
      <circle cx="{cx-11}" cy="196" r="5" fill="#fff"/>
      <circle cx="{cx+12}" cy="198" r="2.4" fill="#fff"/>
    </g>"""
    out += """
    <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M129 170 L119 162"/><path d="M128 181 L117 179"/>
      <path d="M271 170 L281 162"/><path d="M272 181 L283 179"/>
    </g>"""
    return out


def happy_eyes():
    return """
    <g stroke="#1C1530" stroke-width="8" stroke-linecap="round" fill="none">
      <path d="M131 194 Q155 162 179 194"/>
      <path d="M221 194 Q245 162 269 194"/>
    </g>
    <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M131 190 L121 186"/><path d="M269 190 L279 186"/>
    </g>"""


def brows(kind):
    d = {
        "normal":  ("M140 140 Q152 133 166 138", "M234 138 Q248 133 260 140"),
        "high":    ("M138 132 Q152 122 168 128", "M232 128 Q248 122 262 132"),
        "worried": ("M136 146 Q150 142 167 130", "M233 130 Q250 142 264 146"),
    }[kind]
    return f"""
    <g stroke="#3F9C7B" stroke-width="4.5" stroke-linecap="round" fill="none">
      <path d="{d[0]}"/><path d="{d[1]}"/>
    </g>"""


def cheeks(scale=1.0, lines=True):
    rx, ry = 21 * scale, 12.5 * scale
    out = f"""
    <ellipse cx="114" cy="218" rx="{rx}" ry="{ry}" fill="#FF9BB5" opacity="0.9"/>
    <ellipse cx="286" cy="218" rx="{rx}" ry="{ry}" fill="#FF9BB5" opacity="0.9"/>"""
    if lines:
        out += """
    <g stroke="#FF7CA0" stroke-width="2.5" stroke-linecap="round">
      <path d="M104 222 L108 214"/><path d="M112 222 L116 214"/><path d="M120 222 L124 214"/>
      <path d="M276 222 L280 214"/><path d="M284 222 L288 214"/><path d="M292 222 L296 214"/>
    </g>"""
    out += """
    <circle cx="124" cy="212" r="2.5" fill="#fff" opacity="0.8"/>
    <circle cx="296" cy="212" r="2.5" fill="#fff" opacity="0.8"/>
    <ellipse cx="193" cy="206" rx="2.6" ry="1.8" fill="#2F7D63"/>
    <ellipse cx="207" cy="206" rx="2.6" ry="1.8" fill="#2F7D63"/>"""
    return out


def mouth(kind):
    if kind == "smile":
        return f"""
    <path d="M185 216 Q200 237 215 216 Q200 220 185 216 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M192 226 Q200 219 208 226 Q205 232 200 232 Q195 232 192 226 Z" fill="#FF8FAB"/>
    <path d="M190 217.5 L193.6 223.5 L196.8 218.4 Z" fill="#fff"/>"""
    if kind == "laugh":
        return f"""
    <path d="M176 214 Q200 256 224 214 Q200 222 176 214 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M187 236 Q200 225 213 236 Q209 246 200 246 Q191 246 187 236 Z" fill="#FF8FAB"/>
    <path d="M182 216.5 L186.5 224.5 L190.5 218 Z" fill="#fff"/>
    <path d="M218 216.5 L213.5 224.5 L209.5 218 Z" fill="#fff"/>"""
    if kind == "oops":
        return """
    <path d="M182 224 Q188 215 195 220 Q201 225 206 220 Q212 214 218 222" fill="none" stroke="#5A2A3C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>"""


def sweat_drop():
    return """
    <g class="sweat">
      <g transform="translate(112 104) rotate(-12)">
        <path d="M0 -17 C7 -6 11 1 11 6 C11 12.5 6 16.5 0 16.5 C-6 16.5 -11 12.5 -11 6 C-11 1 -7 -6 0 -17 Z" fill="url(#drop)" stroke="#4A90C2" stroke-width="3" stroke-linejoin="round"/>
        <ellipse cx="-4" cy="6" rx="2.5" ry="4" fill="#fff" opacity="0.9"/>
      </g>
    </g>"""


def sparkles(positions):
    out = '<g fill="#FFD36E">'
    for i, (x, y, s) in enumerate(positions):
        cls = ["tw", "tw tw2", "tw tw3"][i % 3]
        out += f'<use href="#spark" class="{cls}" transform="translate({x} {y}) scale({s})"/>'
    return out + "</g>"


def svg(title, css, extra_defs, content):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-labelledby="t">
  <title id="t">{title}</title>
{DEFS.replace("%EXTRA_DEFS%", extra_defs)}
  <style>{BASE_CSS}{css}
    @media (prefers-reduced-motion: reduce) {{ * {{ animation: none !important; }} }}
  </style>
{content}
</svg>
"""


# ================================================================ Varianten
def greeting():
    arm_r = raised_arm(-38)
    arm_l = hanging_arm()
    arms = [(*arm_r, "translate(252 288) rotate(60)", "wave"),
            (*arm_l, "translate(151 282) rotate(-6) scale(.9)", None)]
    css = """
    .bob  { animation: bob 3s ease-in-out infinite; }
    .tilt { transform-origin: 200px 258px; animation: tilt 6s ease-in-out infinite; }
    .wave { transform-origin: 252px 288px; animation: wave 1.4s ease-in-out infinite; }
    .wingL { transform-origin: 150px 280px; animation: flapL 1.8s ease-in-out infinite; }
    .wingR { transform-origin: 250px 280px; animation: flapR 1.8s ease-in-out infinite; }
    .float { animation: float 2.8s ease-out infinite; }
    @keyframes bob   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes tilt  { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(-2deg); } }
    @keyframes wave  { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(8deg); } }
    @keyframes flapL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(10deg); } }
    @keyframes flapR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-10deg); } }
    @keyframes float { 0% { transform: translate(0,10px); opacity: 0; } 25% { opacity: 1; } 100% { transform: translate(6px,-30px); opacity: 0; } }"""
    content = f"""
  <circle cx="200" cy="215" r="180" fill="url(#glow)"/>
  {sparkles([(58, 92, 1.3), (348, 104, 1.1), (48, 236, .8), (300, 46, .7)])}
  <ellipse cx="200" cy="377" rx="96" ry="10" fill="#2B4A40" opacity="0.14"/>
  <g class="bob">
   <g stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
    {tail()}
    {wings()}
    {body(arms, "g", front=[arms[1]])}
   </g>
   <g class="tilt">
    {head_shapes()}
    {open_eyes()}
    {brows("normal")}
    {cheeks()}
    {mouth("smile")}
   </g>
  </g>
  <g class="float"><use href="#heart" transform="translate(354 200) scale(.9)" fill="#FF8FAB"/></g>"""
    return svg("Fips der Drache winkt zur Begrüßung", css, "", content)


def happy():
    arm_r = raised_arm(-42)
    arm_l = raised_arm(-42)
    arms = [(*arm_r, "translate(252 288) rotate(66)", "wigR"),
            (*arm_l, "translate(148 288) scale(-1 1) rotate(66)", "wigL")]
    css = """
    .jump { transform-origin: 200px 372px; animation: jump .9s cubic-bezier(.3,0,.4,1) infinite; }
    .shadow { transform-origin: 200px 377px; animation: shadow .9s cubic-bezier(.3,0,.4,1) infinite; }
    .tilt { transform-origin: 200px 258px; animation: tilt 1.8s ease-in-out infinite; }
    .wigR { transform-origin: 252px 288px; animation: wigR .45s ease-in-out infinite alternate; }
    .wigL { transform-origin: 148px 288px; animation: wigL .45s ease-in-out infinite alternate; }
    .wingL { transform-origin: 150px 280px; animation: flapL .45s ease-in-out infinite alternate; }
    .wingR { transform-origin: 250px 280px; animation: flapR .45s ease-in-out infinite alternate; }
    .confetti > * { transform-box: fill-box; transform-origin: center; animation: pop 1.8s ease-in-out infinite; }
    .confetti > :nth-child(2n) { animation-delay: .6s; } .confetti > :nth-child(3n) { animation-delay: 1.2s; }
    @keyframes jump { 0%,100% { transform: translateY(0) scale(1.04,.96); } 15% { transform: translateY(0) scale(1,1); }
                      45% { transform: translateY(-20px) scale(.98,1.03); } 75% { transform: translateY(0) scale(1,1); } }
    @keyframes shadow { 0%,15%,75%,100% { transform: scale(1); opacity: .14; } 45% { transform: scale(.8); opacity: .08; } }
    @keyframes tilt { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    @keyframes wigR { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
    @keyframes wigL { from { transform: rotate(6deg); } to { transform: rotate(-6deg); } }
    @keyframes flapL { from { transform: rotate(-4deg); } to { transform: rotate(14deg); } }
    @keyframes flapR { from { transform: rotate(4deg); } to { transform: rotate(-14deg); } }
    @keyframes pop { 0%,100% { transform: scale(.6) rotate(0); opacity: .5; } 50% { transform: scale(1.15) rotate(25deg); opacity: 1; } }"""
    confetti = """
  <g class="confetti">
    <rect x="70" y="60" width="10" height="16" rx="3" fill="#FF8FAB" transform="rotate(-20 75 68)"/>
    <rect x="318" y="58" width="10" height="16" rx="3" fill="#8EC5FF" transform="rotate(25 323 66)"/>
    <circle cx="40" cy="160" r="6" fill="#B39CF0"/>
    <circle cx="364" cy="170" r="6" fill="#FFD36E"/>
    <rect x="30" y="300" width="10" height="16" rx="3" fill="#FFD36E" transform="rotate(30 35 308)"/>
    <rect x="356" y="250" width="10" height="16" rx="3" fill="#FF8FAB" transform="rotate(-30 361 258)"/>
    <circle cx="110" cy="34" r="5" fill="#7FE0BE"/>
    <circle cx="290" cy="30" r="5" fill="#B39CF0"/>
  </g>"""
    content = f"""
  <circle cx="200" cy="215" r="180" fill="url(#glow)"/>
  {confetti}
  {sparkles([(56, 104, 1.3), (346, 112, 1.2), (200, 26, .9), (30, 230, .8), (372, 330, .7)])}
  <ellipse class="shadow" cx="200" cy="377" rx="96" ry="10" fill="#2B4A40" opacity="0.14"/>
  <g class="jump">
   <g stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
    {tail()}
    {wings()}
    {body(arms, "j")}
   </g>
   <g class="tilt">
    {head_shapes()}
    {happy_eyes()}
    {brows("high")}
    {cheeks(1.15)}
    {mouth("laugh")}
   </g>
  </g>"""
    return svg("Fips der Drache jubelt", css, "", content)


def oops():
    tilt = "rotate(6 200 258)"
    arm_r = raised_arm(-55, palm=False)
    arm_l = hanging_arm()
    arm_tf = "translate(256 290) rotate(48)"
    arms = [(*arm_r, arm_tf, "scratch"),
            (*arm_l, "translate(151 282) rotate(-6) scale(.9)", None)]
    # Hand, die vor dem Kopf liegt: nochmal zeichnen, auf die Kopffläche begrenzt
    hand_front = f"""
   <g clip-path="url(#headClip)" stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
     <g fill="{LINE}" stroke-width="{SW*2}">{place(arm_r[0], arm_tf, "scratch")}</g>
     <mask id="handMask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><g fill="#fff" stroke="none">{place(arm_r[0], arm_tf, "scratch")}</g></mask>
     <rect width="400" height="400" fill="url(#skinBody)" stroke="none" mask="url(#handMask)"/>
     {place(arm_r[1], arm_tf, "scratch")}
   </g>"""
    extra_defs = f'<clipPath id="headClip"><ellipse cx="200" cy="172" rx="122" ry="100" transform="{tilt}"/></clipPath>'
    css = """
    .sway { transform-origin: 200px 372px; animation: sway 2.6s ease-in-out infinite; }
    .scratch { transform-origin: 256px 290px; animation: scratch .5s ease-in-out infinite alternate; }
    .sweat { animation: sweat 2.2s ease-in infinite; }
    @keyframes sway { 0%,100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
    @keyframes scratch { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
    @keyframes sweat { 0% { transform: translate(0,-6px); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translate(-2px,14px); opacity: 0; } }"""
    content = f"""
  <circle cx="200" cy="215" r="180" fill="url(#glow)"/>
  <ellipse cx="200" cy="377" rx="96" ry="10" fill="#2B4A40" opacity="0.14"/>
  <g class="sway">
   <g stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
    {tail(droop=True)}
    {wings(droop=16)}
    {body(arms, "o", front=[arms[1]])}
   </g>
   <g transform="{tilt}">
    {head_shapes(fin_droop=22)}
    {open_eyes(look=(3, -3))}
    {brows("worried")}
    {cheeks(0.9, lines=False)}
    {mouth("oops")}
    {sweat_drop()}
   </g>
   {hand_front}
  </g>"""
    return svg("Fips der Drache – Hoppla, das war leider falsch", css, extra_defs, content)


if __name__ == "__main__":
    for name, fn in [("fips-begruessung", greeting), ("fips-jubel", happy), ("fips-hoppla", oops)]:
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(fn())
    print("ok")
