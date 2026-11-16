"""Stimmungen Teil 3: Hungrig, Grummelig, Erschrocken, Schüchtern, Stolz, Daumen hoch."""
import os
from gen import LINE, SW, OUT, raised_arm, hanging_arm, place, brows, cheeks, sparkles, mouth
from emotions import (scene, COMMON_CSS, HANG_L, HANG_R, look_eyes, custom_brows, mouth2,
                      eyes_small_lash)

HANG_L_IN = "translate(151 282) rotate(-16) scale(.9)"
HANG_R_IN = "translate(249 282) scale(-1 1) rotate(-16) scale(.9)"


def both_hanging(l=HANG_L, r=HANG_R):
    arms = [(*hanging_arm(), l, None), (*hanging_arm(), r, None)]
    return arms


def one_open_eye(cx, dx=0, dy=0):
    return f"""
    <g class="blink">
      <ellipse cx="{cx}" cy="184" rx="28" ry="32" fill="#1C1530"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="20" ry="23" fill="url(#iris)"/>
      <ellipse cx="{cx+dx}" cy="{190+dy}" rx="9.5" ry="12.5" fill="#140F24"/>
      <path d="M{cx-19} 202 Q{cx} 222 {cx+19} 202 Q{cx} 213 {cx-19} 202 Z" fill="#8BEBD6" opacity="0.9"/>
      <circle cx="{cx+dx+9}" cy="{173+dy}" r="10.5" fill="#fff"/>
      <circle cx="{cx+dx-10}" cy="{198+dy}" r="4.5" fill="#fff"/>
    </g>"""


# ================================================================ Hungrig
def hungry():
    arms = both_hanging(HANG_L_IN, HANG_R_IN)
    cookie = """
  <g class="cookie">
    <mask id="bite" maskUnits="userSpaceOnUse" x="280" y="40" width="100" height="100">
      <rect x="280" y="40" width="100" height="100" fill="#fff"/>
      <circle cx="356" cy="66" r="10" fill="#000"/><circle cx="350" cy="56" r="8" fill="#000"/>
    </mask>
    <g mask="url(#bite)">
      <circle cx="332" cy="84" r="27" fill="url(#cookieG)" stroke="#A8652A" stroke-width="4"/>
      <g fill="#6B3A1E">
        <ellipse cx="320" cy="74" rx="4.5" ry="3.5"/><ellipse cx="338" cy="92" rx="5" ry="3.8"/>
        <ellipse cx="322" cy="96" rx="3.8" ry="3"/><ellipse cx="340" cy="74" rx="3.5" ry="2.8"/>
      </g>
      <ellipse cx="320" cy="68" rx="9" ry="4" fill="#fff" opacity="0.35" transform="rotate(-25 320 68)"/>
    </g>
    <g fill="#E9B46E"><circle cx="366" cy="56" r="3"/><circle cx="370" cy="70" r="2.2"/></g>
  </g>"""
    rumble = """
  <g class="rumble" fill="none" stroke="#3F9C7B" stroke-width="3.5" stroke-linecap="round">
    <path d="M118 296 q-7 5 0 10 q7 5 0 10"/><path d="M106 300 q-5 4 0 8 q5 4 0 8"/>
    <path d="M282 296 q7 5 0 10 q-7 5 0 10"/><path d="M294 300 q5 4 0 8 q-5 4 0 8"/>
  </g>"""
    lick = f"""
    <path d="M182 214 Q200 238 218 214 Q200 220 182 214 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <g class="lick">
      <path d="M204 220 C210 210 224 206 229 214 C233 222 224 230 212 229 Z" fill="#FF8FAB" stroke="#E0607F" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M210 222 Q218 218 224 216" fill="none" stroke="#E0607F" stroke-width="2" stroke-linecap="round"/>
    </g>
    <path d="M186 217.5 L189.5 223.5 L192.8 218.4 Z" fill="#fff"/>
    <g class="drool">
      <path d="M186 224 C188 230 190 233 190 236 C190 239.5 188 241 186 241 C184 241 182 239.5 182 236 C182 233 184 230 186 224 Z" fill="#CDEEFF" stroke="#7DB9DE" stroke-width="2"/>
    </g>"""
    css = COMMON_CSS + """
    .cookie { animation: cookie 2.4s ease-in-out infinite; }
    .lick { transform-box: fill-box; transform-origin: 0% 60%; animation: lick 1.2s ease-in-out infinite; }
    .rumble { animation: rumble .35s steps(2) infinite; }
    .drool { animation: drool 2.4s ease-in infinite; }
    @keyframes cookie { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-6px) rotate(4deg); } }
    @keyframes lick { 0%,100% { transform: rotate(0) scale(1); } 50% { transform: rotate(-12deg) scale(1.08); } }
    @keyframes rumble { 0% { transform: translateX(-1.5px); } 100% { transform: translateX(1.5px); } }
    @keyframes drool { 0%,40% { transform: translateY(0) scaleY(1); opacity: 1; } 90% { transform: translateY(6px) scaleY(1.2); opacity: 1; } 100% { opacity: 0; } }"""
    extra = """<radialGradient id="cookieG" cx="0.4" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#F6CF8E"/><stop offset="1" stop-color="#DDA055"/></radialGradient>"""
    face = (look_eyes(8, -7) + brows("high") + cheeks(1.05) + lick)
    return scene(title="Fips der Drache ist hungrig", css=css, extra_defs=extra, arms=arms, mid="h",
                 front=arms, face=face, tilt="rotate(4 200 258)", top=cookie + rumble)


# ================================================================ Grummelig
def grumpy():
    arms = both_hanging()
    extra = """
    <clipPath id="angryL"><path d="M118 156 L192 176 L192 230 L118 230 Z"/></clipPath>
    <clipPath id="angryR"><path d="M208 176 L282 156 L282 230 L208 230 Z"/></clipPath>"""
    eyes = f"""
    <g clip-path="url(#angryL)">{one_open_eye(155, 3, 4)}</g>
    <g clip-path="url(#angryR)">{one_open_eye(245, -3, 4)}</g>
    <g stroke="#1C1530" stroke-width="5" stroke-linecap="round">
      <path d="M128 162 L183 176"/><path d="M217 176 L272 162"/>
    </g>"""
    vein = """
    <g class="vein" transform="translate(262 116) scale(1.35)" fill="none" stroke="#E5484D" stroke-width="3.5" stroke-linecap="round">
      <path d="M-10 -3 Q-3 -3 -3 -10"/><path d="M3 -10 Q3 -3 10 -3"/><path d="M10 3 Q3 3 3 10"/><path d="M-3 10 Q-3 3 -10 3"/>
    </g>"""
    puff = lambda x, y, c: (f'<g class="puff {c}" fill="#EEF2F2" stroke="#B8C6C3" stroke-width="2.5">'
                            f'<circle cx="{x}" cy="{y}" r="8"/><circle cx="{x+9}" cy="{y-5}" r="7"/><circle cx="{x+4}" cy="{y-12}" r="6"/></g>')
    steam = puff(98, 64, "p1") + puff(292, 52, "p2") + puff(310, 80, "p3")
    face = (eyes + custom_brows("M134 134 Q152 140 170 150", "M230 150 Q248 140 266 134")
            + '<g fill="#FF8C9E" opacity="0.95"><ellipse cx="114" cy="218" rx="24" ry="14"/><ellipse cx="286" cy="218" rx="24" ry="14"/></g>'
            + '<ellipse cx="193" cy="206" rx="3.2" ry="2.2" fill="#2F7D63"/><ellipse cx="207" cy="206" rx="3.2" ry="2.2" fill="#2F7D63"/>'
            + '<path d="M186 230 Q200 218 214 230" fill="none" stroke="#5A2A3C" stroke-width="4.5" stroke-linecap="round"/>'
            + vein)
    css = """
    .shake { animation: shake 2.2s ease-in-out infinite; }
    .puff { opacity: 0; animation: puff 2.2s ease-out infinite; } .p2 { animation-delay: .7s; } .p3 { animation-delay: 1.4s; }
    .vein { transform-box: fill-box; transform-origin: center; animation: vein .8s ease-in-out infinite; }
    @keyframes shake { 0%,60%,100% { transform: translateX(0); } 64% { transform: translateX(-3px); } 68% { transform: translateX(3px); } 72% { transform: translateX(-2px); } 76% { transform: translateX(2px); } }
    @keyframes puff { 0% { opacity: 0; transform: translateY(8px) scale(.6); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-16px) scale(1.1); } }
    @keyframes vein { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }"""
    css = css.replace(".puff { opacity: 0; animation:", ".puff { animation:")
    return scene(title="Fips der Drache ist grummelig", css=css, extra_defs=extra, arms=arms, mid="g",
                 front=arms, face=face, top=steam, wrap_cls="shake")


# ================================================================ Erschrocken
def scared():
    arms = [(*raised_arm(-48, w=0.85), "translate(252 288) rotate(80)", "upR"),
            (*raised_arm(-48, w=0.85), "translate(148 288) scale(-1 1) rotate(80)", "upL")]
    eyes = ""
    for cx in (155, 245):
        eyes += f"""
    <ellipse cx="{cx}" cy="182" rx="29" ry="34" fill="#1C1530"/>
    <ellipse cx="{cx}" cy="184" rx="13" ry="15" fill="url(#iris)"/>
    <circle cx="{cx}" cy="184" r="6" fill="#140F24"/>
    <circle cx="{cx+6}" cy="176" r="5" fill="#fff"/>
    <circle cx="{cx-5}" cy="192" r="2.4" fill="#fff"/>"""
    eyes += eyes_small_lash()
    gloom = """
    <g stroke="#7FA9E0" stroke-width="3.5" stroke-linecap="round" opacity="0.75">
      <path d="M168 96 L168 124"/><path d="M182 92 L182 132"/><path d="M196 90 L196 128"/><path d="M210 90 L210 132"/><path d="M224 92 L224 124"/>
    </g>"""
    mouth_scared = f"""
    <path d="M178 224 Q189 214 200 222 Q211 230 222 220 Q224 244 200 244 Q176 244 178 224 Z" fill="#8C3A55" stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M181 224.5 Q190 217 200 224 Q210 231 219.5 222.5 L219 228 Q210 236 200 229 Q190 222 181.5 230 Z" fill="#fff"/>"""
    drops = """
    <g class="sweat"><g transform="translate(108 112) rotate(-14) scale(.85)">
      <path d="M0 -17 C7 -6 11 1 11 6 C11 12.5 6 16.5 0 16.5 C-6 16.5 -11 12.5 -11 6 C-11 1 -7 -6 0 -17 Z" fill="url(#drop)" stroke="#4A90C2" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="-4" cy="6" rx="2.5" ry="4" fill="#fff" opacity="0.9"/></g></g>
    <g class="sweat s2"><g transform="translate(294 108) rotate(14) scale(.75)">
      <path d="M0 -17 C7 -6 11 1 11 6 C11 12.5 6 16.5 0 16.5 C-6 16.5 -11 12.5 -11 6 C-11 1 -7 -6 0 -17 Z" fill="url(#drop)" stroke="#4A90C2" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="-4" cy="6" rx="2.5" ry="4" fill="#fff" opacity="0.9"/></g></g>"""
    shock = """
  <g class="shockl" stroke="#5BB8E8" stroke-width="5" stroke-linecap="round">
    <path d="M118 58 L104 36"/><path d="M200 40 L200 14"/><path d="M282 58 L296 36"/>
  </g>"""
    face = (eyes + gloom + custom_brows("M136 140 Q150 132 166 120", "M234 120 Q250 132 264 140")
            + cheeks(0.85, lines=False) + mouth_scared + drops)
    css = """
    .jitter { animation: jitter .18s linear infinite; }
    .upR { transform-origin: 252px 288px; animation: upR .18s linear infinite; }
    .upL { transform-origin: 148px 288px; animation: upL .18s linear infinite; }
    .sweat { animation: sweat 1.6s ease-in infinite; } .s2 { animation-delay: .6s; }
    .shockl { animation: shockl .9s ease-out infinite; }
    @keyframes jitter { 0%,100% { transform: translate(0,0); } 25% { transform: translate(-1.2px,.6px); } 50% { transform: translate(1.2px,-.6px); } 75% { transform: translate(-.6px,-.6px); } }
    @keyframes upR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-2deg); } }
    @keyframes upL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(2deg); } }
    @keyframes sweat { 0% { transform: translateY(-4px); opacity: 0; } 20%,80% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
    @keyframes shockl { 0% { opacity: 1; } 100% { opacity: .2; } }"""
    return scene(title="Fips der Drache erschrickt", css=css, arms=arms, mid="e", face=face,
                 fins=-18, wing_droop=-8, top=shock, wrap_cls="jitter")


# ================================================================ Schüchtern
def shy():
    arms = both_hanging(HANG_L_IN, HANG_R_IN)
    face = (look_eyes(-7, 7) + custom_brows("M140 142 Q152 137 166 135", "M234 135 Q248 137 260 142")
            + '<g class="blush">' + cheeks(1.2) + '</g>'
            + '<path d="M190 223 Q195 227 200 223 Q205 227 210 223" fill="none" stroke="#5A2A3C" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>')
    css = """
    .sway2 { transform-origin: 200px 372px; animation: sway2 3.2s ease-in-out infinite; }
    .blush { animation: blush 2.4s ease-in-out infinite; }
    @keyframes sway2 { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
    @keyframes blush { 0%,100% { opacity: .85; } 50% { opacity: 1; } }"""
    hearts = """<g fill="#FFB3C7" class="tw"><use href="#heart" transform="translate(78 120) scale(.8)"/></g>"""
    return scene(title="Fips der Drache ist schüchtern", css=css, arms=arms, mid="y", front=arms,
                 face=face, tilt="translate(0 5) rotate(-8 200 258)", fins=10, wrap_cls="sway2", top=hearts)


# ================================================================ Stolz
def proud():
    arms = both_hanging("translate(151 282) rotate(26) scale(.9)", "translate(249 282) scale(-1 1) rotate(26) scale(.9)")
    medal = f"""
    <g stroke="{LINE}" stroke-width="3.5" stroke-linejoin="round">
      <path d="M176 252 L196 306 L206 302 L190 252 Z" fill="#6B9BF2"/>
      <path d="M224 252 L204 306 L194 302 L210 252 Z" fill="#E86A8C"/>
      <g class="medal">
        <circle cx="200" cy="318" r="19" fill="url(#gold)" stroke="#B8862B"/>
        <circle cx="200" cy="318" r="13" fill="none" stroke="#E6B04A" stroke-width="2.5"/>
        <path d="M200 309 L202.8 315 L209 315.6 L204.3 319.8 L205.7 326 L200 322.8 L194.3 326 L195.7 319.8 L191 315.6 L197.2 315 Z" fill="#FFF3C4" stroke="#C8962F" stroke-width="1.5"/>
      </g>
    </g>
    <path class="shine" d="M186 306 L190 302" stroke="#fff" stroke-width="3" stroke-linecap="round"/>"""
    extra = """<radialGradient id="gold" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0" stop-color="#FFF0B3"/><stop offset="0.55" stop-color="#FFD25E"/><stop offset="1" stop-color="#E9A930"/></radialGradient>"""
    face = (""" <g stroke="#1C1530" stroke-width="7" stroke-linecap="round" fill="none">
      <path d="M133 190 Q155 168 177 190"/><path d="M223 190 Q245 168 267 190"/></g>"""
            + brows("high") + cheeks(1.1) + mouth2("big_smile"))
    css = COMMON_CSS + """
    .medal { transform-box: fill-box; transform-origin: 50% 0%; animation: medal 2.4s ease-in-out infinite; }
    @keyframes medal { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }"""
    return scene(title="Fips der Drache ist stolz", css=css, extra_defs=extra, arms=arms, mid="p", front=arms,
                 face=face, tilt="translate(0 -3) rotate(3 200 258)", mid_layer=medal,
                 back=sparkles([(60, 100, 1.2), (342, 96, 1.1), (44, 240, .8), (358, 240, .9)]))


# ================================================================ Daumen hoch
def thumb_arm(hand_rot, w=0.85):
    """Erhobener Arm mit Faust und Daumen nach oben."""
    shapes = f"""
      <path d="M{-14*w:.1f} 10 C{-16*w:.1f} -18 {-14*w:.1f} -40 {-10*w:.1f} -56 L{10*w:.1f} -56 C{14*w:.1f} -40 {16*w:.1f} -18 {14*w:.1f} 10 Z"/>
      <g transform="rotate({hand_rot} 0 -56)">
        <rect x="-18" y="-86" width="36" height="32" rx="15"/>
        <rect x="-16" y="-106" width="15.5" height="29" rx="7.7" transform="rotate(-6 -8.5 -92)"/>
      </g>"""
    detail = f"""
      <g transform="rotate({hand_rot} 0 -56)" fill="none" stroke="{LINE}" stroke-width="3" stroke-linecap="round">
        <path d="M2 -77 Q10 -77 14 -74"/><path d="M2 -68 Q10 -68 15 -66"/><path d="M3 -60 Q9 -60 13 -58"/>
        <path d="M-3 -82 Q-1 -76 2 -77"/>
      </g>
      <path d="M{12.5*w:.1f} 8 C{14.5*w:.1f} -2 {14.8*w:.1f} -12 {13.6*w:.1f} -24" fill="none" stroke="{LINE}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M-4 -8 C-6 -24 -5 -38 -3 -50" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity="0.4"/>"""
    return shapes, detail


def thumbs_up():
    arms = [(*thumb_arm(-58), "translate(252 292) rotate(80)", "pump"), (*hanging_arm(), HANG_L, None)]
    wink = (one_open_eye(155) + """
    <g stroke="#1C1530" stroke-width="7" stroke-linecap="round" fill="none"><path d="M222 190 Q245 170 268 190"/></g>
    <g stroke="#1C1530" stroke-width="4" stroke-linecap="round" fill="none"><path d="M129 170 L119 162"/><path d="M268 186 L278 181"/></g>""")
    face = wink + custom_brows("M140 136 Q152 128 166 133", "M232 138 Q248 132 262 138") + cheeks(1.1) + mouth2("big_smile")
    css = COMMON_CSS + """
    .pump { transform-origin: 252px 292px; animation: pump 1.1s ease-in-out infinite; }
    @keyframes pump { 0%,100% { transform: rotate(0); } 30% { transform: rotate(-7deg); } 45% { transform: rotate(-4deg); } }"""
    return scene(title="Fips der Drache – Daumen hoch, du schaffst das!", css=css, arms=arms, mid="u",
                 front=[arms[1]], face=face, tilt="rotate(-5 200 258)",
                 top=sparkles([(352, 150, 1.3), (330, 112, .8), (60, 110, 1.0), (48, 250, .7)]))


VARIANTS = [("fips-hungrig", hungry), ("fips-grummelig", grumpy), ("fips-erschrocken", scared),
            ("fips-schuechtern", shy), ("fips-stolz", proud), ("fips-daumen-hoch", thumbs_up)]

if __name__ == "__main__":
    for name, fn in VARIANTS:
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(fn())
    print("ok")
