"""Weitere Gefühle für Fips: Zuhören, Nachdenken, Staunen, Traurig, Verliebt, Schlafen.
Baut auf den Bauteilen aus gen.py auf (gleiche Proportionen, Farben, Konturen)."""
import os
import re
from gen import (LINE, SW, OUT, raised_arm, hanging_arm, place, tail, wings, body,
                 head_shapes, open_eyes, brows, cheeks, mouth, sparkles, svg)

HANG_L = "translate(151 282) rotate(-6) scale(.9)"
HANG_R = "translate(249 282) scale(-1 1) rotate(-6) scale(.9)"


def hand_over_head(arm, tf, cls, clip_id, mask_id):
    """Arm/Hand, die vor Kopf oder Körper liegt: mit voller Kontur nochmal zeichnen,
    begrenzt auf clip_id (die Schulter bleibt nahtlos aus der Körper-Silhouette)."""
    shapes, detail = arm
    sh = place(shapes, tf, cls)
    return f"""
   <g clip-path="url(#{clip_id})" stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
     <g fill="{LINE}" stroke-width="{SW*2}">{sh}</g>
     <mask id="{mask_id}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><g fill="#fff" stroke="none">{sh}</g></mask>
     <rect width="400" height="400" fill="url(#skinBody)" stroke="none" mask="url(#{mask_id})"/>
     {place(detail, tf, cls)}
   </g>"""


def head_clip(cid, tilt):
    return f'<clipPath id="{cid}"><ellipse cx="200" cy="172" rx="122" ry="100" transform="{tilt}"/></clipPath>'


def scene(*, title, css, extra_defs="", back="", arms, mid, front=(), tilt="rotate(0 200 258)",
          tilt_cls="", fins=0, fin_r=None, fin_r_cls="", wing_droop=0, tail_droop=False, face="", over="", top="", wrap_cls="bob", mid_layer=""):
    content = f"""
  <circle cx="200" cy="215" r="180" fill="url(#glow)"/>
  {back}
  <ellipse class="shadow" cx="200" cy="377" rx="96" ry="10" fill="#2B4A40" opacity="0.14"/>
  <g class="{wrap_cls}">
   <g stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
    {tail(droop=tail_droop)}
    {wings(droop=wing_droop)}
    {body(arms, mid, front=front)}
    {mid_layer}
   </g>
   <g class="{tilt_cls}"><g transform="{tilt}">
    {head_shapes(fin_droop=fins, fin_r=fin_r, fin_r_cls=fin_r_cls)}
    {face}
   </g></g>
   {over}
  </g>
  {top}"""
    return svg(title, css, extra_defs, content)


COMMON_CSS = """
    .bob { animation: bob 3s ease-in-out infinite; }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }"""


# ---------------------------------------------------------------- Augen & Münder
def eyes_small_lash():
    return """
    <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M129 170 L119 162"/><path d="M271 170 L281 162"/>
    </g>"""


def star_eyes():
    """Staunende Augen: groß, mit Stern-Glanzlicht."""
    out = ""
    for cx in (155, 245):
        out += f"""
    <g class="blink">
      <ellipse cx="{cx}" cy="182" rx="30" ry="35" fill="#1C1530"/>
      <ellipse cx="{cx}" cy="188" rx="23" ry="27" fill="url(#iris)"/>
      <ellipse cx="{cx}" cy="188" rx="9" ry="11" fill="#140F24"/>
      <path d="M{cx-21} 203 Q{cx} 225 {cx+21} 203 Q{cx} 215 {cx-21} 203 Z" fill="#8BEBD6" opacity="0.9"/>
      <use href="#spark" transform="translate({cx+9} 170) scale(1.25)" fill="#fff"/>
      <circle cx="{cx-12}" cy="197" r="4.5" fill="#fff"/>
    </g>"""
    return out + eyes_small_lash()


def teary_eyes():
    """Traurige Augen: Blick nach unten, großer Tränenglanz."""
    out = ""
    for cx in (155, 245):
        out += f"""
    <g class="blink">
      <ellipse cx="{cx}" cy="186" rx="27" ry="30" fill="#1C1530"/>
      <ellipse cx="{cx}" cy="195" rx="20" ry="22" fill="url(#iris)"/>
      <ellipse cx="{cx}" cy="197" rx="9.5" ry="12" fill="#140F24"/>
      <path d="M{cx-24} 196 Q{cx} 226 {cx+24} 196 Q{cx} 210 {cx-24} 196 Z" fill="#9FE6FF" opacity="0.75"/>
      <circle cx="{cx+9}" cy="176" r="10" fill="#fff"/>
      <circle cx="{cx-10}" cy="200" r="5" fill="#fff"/>
      <circle cx="{cx+11}" cy="204" r="3" fill="#fff"/>
    </g>"""
    return out + eyes_small_lash()


def heart_eyes():
    out = ""
    for cx in (155, 245):
        out += f"""
    <g class="beat" style="transform-origin:{cx}px 186px">
      <g transform="translate({cx} 190) scale(2.5)">
        <path d="M0 9 C-17 -2 -13 -19 0 -10 C13 -19 17 -2 0 9 Z" fill="#FF5E8A" stroke="#C93B66" stroke-width="1.4" stroke-linejoin="round"/>
      </g>
      <ellipse cx="{cx-12}" cy="176" rx="7" ry="5" transform="rotate(-30 {cx-12} 176)" fill="#fff" opacity="0.9"/>
      <circle cx="{cx-2}" cy="172" r="2.6" fill="#fff" opacity="0.9"/>
    </g>"""
    return out


def sleep_eyes():
    return """
    <g stroke="#1C1530" stroke-width="7" stroke-linecap="round" fill="none">
      <path d="M131 184 Q155 206 179 184"/>
      <path d="M221 184 Q245 206 269 184"/>
    </g>
    <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M137 196 L131 204"/><path d="M147 200 L144 209"/>
      <path d="M263 196 L269 204"/><path d="M253 200 L256 209"/>
    </g>"""


def look_eyes(dx, dy):
    """Augen mit Blickrichtung: Iris UND Glanzlichter wandern mit."""
    out = ""
    for cx in (155, 245):
        out += f"""
    <g class="blink">
      <ellipse cx="{cx}" cy="184" rx="28" ry="32" fill="#1C1530"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="20" ry="23" fill="url(#iris)"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="9.5" ry="12.5" fill="#140F24"/>
      <path d="M{cx-19} 202 Q{cx} 222 {cx+19} 202 Q{cx} 213 {cx-19} 202 Z" fill="#8BEBD6" opacity="0.9"/>
      <circle cx="{cx+dx+9}" cy="{173+dy}" r="10.5" fill="#fff"/>
      <circle cx="{cx+dx-10}" cy="{198+dy}" r="4.5" fill="#fff"/>
    </g>"""
    return out + eyes_small_lash()


def custom_brows(l, r):
    return f"""
    <g stroke="#3F9C7B" stroke-width="4.5" stroke-linecap="round" fill="none">
      <path d="{l}"/><path d="{r}"/>
    </g>"""


def mouth2(kind):
    if kind == "o":
        return f"""
    <ellipse cx="200" cy="228" rx="11" ry="13" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5"/>
    <ellipse cx="200" cy="234" rx="6.5" ry="5" fill="#FF8FAB"/>"""
    if kind == "small_o":
        return f"""<ellipse cx="200" cy="224" rx="6" ry="7" fill="#8C3A55" stroke="{LINE}" stroke-width="3"/>"""
    if kind == "smile_closed":
        return """
    <path d="M186 218 Q193 226 200 220 Q207 226 214 218" fill="none" stroke="#5A2A3C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>"""
    if kind == "hmm":
        return """
    <path d="M186 224 Q196 219 206 222 Q212 224 216 219" fill="none" stroke="#5A2A3C" stroke-width="4" stroke-linecap="round"/>"""
    if kind == "sad":
        return f"""
    <path d="M186 230 Q200 214 214 230 Q200 224 186 230 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>"""
    if kind == "big_smile":
        return f"""
    <path d="M180 214 Q200 248 220 214 Q200 220 180 214 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M189 232 Q200 223 211 232 Q207 240 200 240 Q193 240 189 232 Z" fill="#FF8FAB"/>
    <path d="M186 216.5 L190 223.5 L193.5 217.8 Z" fill="#fff"/>"""


# ================================================================ Varianten
def listening():
    tilt = "rotate(9 200 258)"
    arms = [(*hanging_arm(), HANG_L, None), (*hanging_arm(), HANG_R, None)]
    waves = """
  <g fill="none" stroke="#5BB8E8" stroke-width="5" stroke-linecap="round">
    <path class="w w1" d="M366 150 Q378 166 372 186"/>
    <path class="w w2" d="M374 126 Q396 152 388 184"/>
    <path class="w w3" d="M378 100 Q410 136 398 182"/>
  </g>
  <g fill="#5BB8E8" class="w w2">
    <circle cx="352" cy="96" r="4.5"/><path d="M356 96 L356 76 L366 80" fill="none" stroke="#5BB8E8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>"""
    css = COMMON_CSS + """
    .perk { transform-origin: 304px 165px; animation: perk 1.2s ease-in-out infinite; }
    .w { animation: w 1.8s ease-out infinite; }
    .w2 { animation-delay: .3s; } .w3 { animation-delay: .6s; }
    @keyframes perk { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-7deg); } }
    @keyframes w { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; } }"""
    face = (look_eyes(7, -3)
            + custom_brows("M140 140 Q152 134 166 138", "M232 128 Q248 118 262 126")
            + cheeks() + mouth2("small_o"))
    return scene(title="Fips der Drache hört genau zu", css=css, arms=arms, mid="l", front=arms,
                 tilt=tilt, face=face, fins=6, fin_r="rotate(-26 304 165) translate(304 165) scale(1.22) translate(-304 -165)",
                 fin_r_cls="perk", top=waves)


def upper_arm():
    """Oberarm ohne Pfote (liegt am Körper an, Ellbogen unten)."""
    shapes = """<path d="M-12 0 C-12 -17 12 -17 12 0 C14 10 13 20 10 30 C8 39 -8 39 -10 30 C-13 20 -14 10 -12 0 Z"/>"""
    detail = f"""<path d="M11 6 C12.5 16 12 24 10 30" fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round"/>"""
    return shapes, detail


def chin_forearm():
    """Unterarm vom Ellbogen hoch zum Kinn, Pfote (Handrücken) unterm Mund."""
    E, W = (251, 322), (217, 266)
    shapes = f"""
      <circle cx="{E[0]}" cy="{E[1]}" r="13"/>
      <path d="M262.1 315.3 L226.4 260.6 L207.6 271.4 L239.9 328.7 Z"/>
      <circle cx="{W[0]}" cy="{W[1]}" r="11"/>
      <ellipse cx="208" cy="252" rx="17" ry="14" transform="rotate(-20 208 252)"/>
      <circle cx="195" cy="242" r="7.5"/><circle cx="205" cy="236.5" r="7.5"/><circle cx="216" cy="236" r="7"/>
      <ellipse cx="224" cy="252" rx="6" ry="8" transform="rotate(30 224 252)"/>"""
    detail = f"""
      <g fill="none" stroke="{LINE}" stroke-linecap="round">
        <path d="M200 241 L201.5 248" stroke-width="3"/><path d="M210.5 239 L211 246" stroke-width="3"/>
        <path d="M219 246 Q222 252 220 258" stroke-width="3"/>
      </g>
      <path d="M244 314 L224 282" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>"""
    return f"""
   <g class="tap">
     <g fill="{LINE}" stroke="{LINE}" stroke-width="{SW*2}" stroke-linejoin="round">{shapes}</g>
     <g fill="url(#skinBody)" stroke="none">{shapes}</g>
     {detail}
   </g>"""


def thinking():
    tilt = "rotate(-4 200 258)"
    arm = raised_arm(-60, palm=False, w=0.64)
    tf = "translate(256 290) rotate(40)"
    arms = [(*arm, tf, "tap"), (*hanging_arm(), HANG_L, None)]
    bubble = """
  <g class="think">
    <circle cx="112" cy="70" r="6" fill="#fff" stroke="#B9D9CC" stroke-width="3"/>
    <circle cx="92" cy="50" r="9" fill="#fff" stroke="#B9D9CC" stroke-width="3"/>
    <path d="M30 32 C18 30 14 14 28 10 C30 -2 50 -4 56 6 C66 -2 84 4 80 18 C92 22 88 40 74 40 C70 50 52 50 48 42 C40 48 26 44 30 32 Z"
          fill="#fff" stroke="#B9D9CC" stroke-width="3" stroke-linejoin="round" transform="translate(4 16)"/>
    <g fill="#7CC9AB"><circle class="d d1" cx="40" cy="38" r="4.5"/><circle class="d d2" cx="54" cy="38" r="4.5"/><circle class="d d3" cx="68" cy="38" r="4.5"/></g>
  </g>"""
    css = COMMON_CSS + """
    .tap { transform-origin: 256px 290px; animation: tap 1.6s ease-in-out infinite; }
    .d { animation: dot 1.4s ease-in-out infinite; } .d2 { animation-delay: .2s; } .d3 { animation-delay: .4s; }
    @keyframes tap { 0%,100% { transform: rotate(0); } 50% { transform: rotate(2deg); } }
    @keyframes dot { 0%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-4px); opacity: 1; } }"""
    face = (look_eyes(-6, -6)
            + custom_brows("M138 132 Q152 122 168 128", "M234 140 Q248 136 262 140")
            + re.sub(r'\s*<(ellipse cx="286"|circle cx="296")[^>]*/>', "", cheeks(0.9, lines=False)) + mouth2("hmm"))
    return scene(title="Fips der Drache denkt nach", css=css, extra_defs='<clipPath id="hcT"><rect x="0" y="0" width="400" height="268"/></clipPath>',
                 arms=arms, mid="t", front=[arms[1]], tilt=tilt, face=face,
                 over=hand_over_head(arm, tf, "tap", "hcT", "hmT"), top=bubble)


def amazed():
    a = raised_arm(-48)
    arms = [(*a, "translate(252 288) rotate(78)", "upR"),
            (*raised_arm(-48), "translate(148 288) scale(-1 1) rotate(78)", "upL")]
    burst = """
  <g class="burst" stroke="#FFC24D" stroke-width="5" stroke-linecap="round">
    <path d="M96 58 L84 38"/><path d="M70 82 L50 72"/><path d="M304 58 L316 38"/><path d="M330 82 L350 72"/>
  </g>"""
    css = COMMON_CSS + """
    .upR { transform-origin: 252px 288px; animation: upR 1.2s ease-in-out infinite; }
    .upL { transform-origin: 148px 288px; animation: upL 1.2s ease-in-out infinite; }
    .burst { animation: burst 1.2s ease-out infinite; }
    @keyframes upR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-6deg); } }
    @keyframes upL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(6deg); } }
    @keyframes burst { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; } }"""
    face = (star_eyes() + brows("high") + cheeks(1.0) + mouth2("o"))
    return scene(title="Fips der Drache staunt", css=css, arms=arms, mid="s", face=face,
                 fins=-14, back=sparkles([(56, 120, 1.1), (346, 126, 1.0), (40, 250, .8), (362, 300, .7)]),
                 top=burst)


def sad():
    arms = [(*hanging_arm(), HANG_L, None), (*hanging_arm(), HANG_R, None)]
    tear = """
    <g class="tear">
      <path d="M268 210 C272 218 275 223 275 227 C275 232 271 235 268 235 C265 235 261 232 261 227 C261 223 264 218 268 210 Z"
            fill="url(#drop)" stroke="#4A90C2" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="265.5" cy="227" rx="1.6" ry="2.8" fill="#fff"/>
    </g>"""
    css = COMMON_CSS.replace("3s", "4s").replace("-6px", "-3px") + """
    .tear { animation: tear 2.6s ease-in infinite; }
    @keyframes tear { 0% { transform: translateY(-6px); opacity: 0; } 25% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(20px); opacity: 0; } }"""
    face = (teary_eyes() + brows("worried") + cheeks(0.9, lines=False) + mouth2("sad") + tear)
    return scene(title="Fips der Drache ist traurig", css=css, arms=arms, mid="d", front=arms,
                 tilt="translate(0 4) rotate(-3 200 258)", fins=24, wing_droop=18, tail_droop=True, face=face)


def in_love():
    arms = [(*hanging_arm(), HANG_L, None), (*hanging_arm(), HANG_R, None)]
    hearts = """
  <g fill="#FF8FAB">
    <g class="h h1"><use href="#heart" transform="translate(70 120) scale(1.2)"/></g>
    <g class="h h2"><use href="#heart" transform="translate(334 110) scale(1)"/></g>
    <g class="h h3"><use href="#heart" transform="translate(352 220) scale(.8)"/></g>
    <g class="h h4"><use href="#heart" transform="translate(48 230) scale(.9)"/></g>
  </g>"""
    css = COMMON_CSS + """
    .sw { transform-origin: 200px 258px; animation: sw 3s ease-in-out infinite; }
    .beat { animation: beat .9s ease-in-out infinite; }
    .h { animation: h 3s ease-out infinite; } .h2 { animation-delay: .7s; } .h3 { animation-delay: 1.4s; } .h4 { animation-delay: 2.1s; }
    @keyframes sw { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    @keyframes beat { 0%,100% { transform: scale(1); } 20% { transform: scale(1.12); } 40% { transform: scale(.98); } }
    @keyframes h { 0% { transform: translateY(12px); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateY(-26px); opacity: 0; } }"""
    face = heart_eyes() + brows("high") + cheeks(1.25) + mouth2("big_smile")
    return scene(title="Fips der Drache ist verliebt", css=css, arms=arms, mid="v", front=arms,
                 tilt_cls="sw", face=face, top=hearts)


def sleeping():
    arms = [(*hanging_arm(), HANG_L, None), (*hanging_arm(), HANG_R, None)]
    z = lambda x, y, s, c: (f'<g class="z {c}"><path transform="translate({x} {y}) scale({s})" d="M0 0 L14 0 L0 16 L14 16" '
                            'fill="none" stroke="#8E7CC3" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></g>')
    zzz = z(300, 88, 1.0, "z1") + z(326, 56, 1.3, "z2") + z(356, 18, 1.6, "z3")
    css = """
    .breath { transform-origin: 200px 372px; animation: breath 3.6s ease-in-out infinite; }
    .z { animation: z 3.6s ease-out infinite; } .z2 { animation-delay: 1.2s; } .z3 { animation-delay: 2.4s; }
    @keyframes breath { 0%,100% { transform: scale(1,1); } 50% { transform: scale(1.02,.985); } }
    @keyframes z { 0% { opacity: 0; transform: translate(0,8px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(10px,-14px); } }"""
    face = (sleep_eyes() + custom_brows("M140 146 Q152 141 166 144", "M234 144 Q248 141 260 146")
            + cheeks(1.0, lines=False) + mouth2("small_o"))
    return scene(title="Fips der Drache schläft", css=css, arms=arms, mid="z", front=arms,
                 tilt="translate(0 6) rotate(9 200 258)", fins=18, wing_droop=14, tail_droop=True,
                 face=face, top=zzz, wrap_cls="breath")


VARIANTS = [("fips-zuhoeren", listening), ("fips-nachdenken", thinking), ("fips-staunen", amazed),
            ("fips-traurig", sad), ("fips-verliebt", in_love), ("fips-schlafen", sleeping)]

if __name__ == "__main__":
    for name, fn in VARIANTS:
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(fn())
    print("ok")
