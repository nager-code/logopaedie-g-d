<div align="center">

<a href="https://nager-code.github.io/logopaedie-g-d/"><img src="src/img/share.png" alt="G oder D? – Das Hörspiel mit Fips, dem kleinen Drachen" width="100%"></a>

# G oder D? – Das Hörspiel mit Fips

**Ein kleines Lernspiel im Browser, mit dem Kinder üben, die Laute G und D zu unterscheiden –<br>mit den Stimmen von Mama und Papa.**

[![▶ Jetzt spielen](https://img.shields.io/badge/%E2%96%B6%20Jetzt%20spielen-nager--code.github.io-ff7aa2?style=for-the-badge)](https://nager-code.github.io/logopaedie-g-d/)

![Ohne Werbung](https://img.shields.io/badge/Werbung-keine-2fbf71?style=flat-square)
![Aufnahmen bleiben auf dem Gerät](https://img.shields.io/badge/Aufnahmen-bleiben%20auf%20dem%20Ger%C3%A4t-2fbf71?style=flat-square)
![Ohne Installation](https://img.shields.io/badge/l%C3%A4uft%20im-Browser-3a8dff?style=flat-square)
![Lizenz MIT](https://img.shields.io/badge/Lizenz-MIT-8b7fb0?style=flat-square)

</div>

<table>
  <tr>
    <td align="center" width="25%"><img src="docs/start.png" alt="Startseite mit Fips" width="200"><br><b>Fips begrüßt das Kind</b></td>
    <td align="center" width="25%"><img src="docs/richtig.png" alt="Richtige Antwort im Spiel" width="200"><br><b>Hören und tippen</b></td>
    <td align="center" width="25%"><img src="docs/feier.png" alt="Fips tanzt nach drei richtigen Antworten" width="200"><br><b>Fips tanzt bei Erfolgen</b></td>
    <td align="center" width="25%"><img src="docs/eltern.png" alt="Elternbereich mit Datenschutz-Hinweis" width="200"><br><b>Elternbereich</b></td>
  </tr>
</table>

## 🎧 So wird gespielt

1. Ein Wort wird vorgesprochen – mit der Stimme von Mama oder Papa.
2. Das Kind tippt auf **G** 🦒 oder **D** 🦕.
3. Danach erscheint das Wort mit Bild, der gesuchte Buchstabe ist farbig markiert.

- ✅ **Richtig:** Fips springt vor Freude mit einer Drehung in die Luft.
- 🤔 **Falsch:** Fips kratzt sich verlegen am Kopf, und das Spiel zeigt, welcher Buchstabe richtig gewesen wäre.
- 🎉 **3 richtig hintereinander:** Fips tanzt – jedes Mal mit einem anderen Tanzschritt.
- 🔊 hört das Wort nochmal, 👀 zeigt die Lösung.

### 🏁 Das große Finale

Am Ende jeder Runde gibt es je nach Ergebnis eine von fünf Fips-Animationen – Kopf, Arme, Flügel und Schwanz bewegen sich dabei einzeln:

| Ergebnis | Fips … |
|---|---|
| unter 4 richtig | wiegt sich, nickt und winkt dir Mut zu 💚 |
| 4–5 richtig | klatscht für dich 👏 |
| 6–7 richtig | macht Freudensprünge, mit Konfetti 🎊 |
| 8–9 richtig | springt einen Salto ⭐ |
| **10 von 10** | **erlebt eine kleine Geschichte:** läuft durch eine Landschaft, zündet mit seinem Feueratem erst das **G** und dann das **D** an und jubelt mit Krone und Feuerwerk 👑 |

## 🐉 Fips, der kleine Drache

Fips begleitet durchs ganze Spiel: Er winkt zur Begrüßung, kichert, wenn man ihn antippt, freut sich über jede richtige Antwort und tanzt bei Erfolgen. Er ist in vier Posen gezeichnet – Begrüßung, Jubel, Hoppla und Tanz.

## 🖼️ 83 gezeichnete Wörter

40 Wörter mit **D** und 40 mit **G** (dazu 3 Hörpaare), nach Schwierigkeit in Stufen geordnet – zum Beispiel *D am Wortanfang*, *G in der Wortmitte* oder *GR und GL am Anfang*. D und G am Wortende kommen nicht vor, weil sie dort wie t und k klingen.

Jedes Wort hat ein eigenes, von Hand gezeichnetes Bild – alle im gleichen Stil wie Fips: weiche Farbverläufe, farbige Umrisse, Glanzlichter und Tiere mit Fips-Augen und rosa Bäckchen.

## 👪 Für Eltern

- **Eure eigenen Stimmen:** Es gibt keine Computerstimme. Unter **👪 Für Eltern → Wörter aufnehmen** sprecht ihr die Wörter ein. Eine Anzeige hilft mit Lautstärke und Restzeit, Stille am Anfang und Ende wird automatisch abgeschnitten.
- **Schnell startklar:** Gespielt werden kann ab **5 aufgenommenen Wörtern** (G und D). Beim Aufnehmen werden die leichten Wörter zuerst vorgeschlagen, abwechselnd mit G und D. Im Spiel kommen nur Wörter vor, die schon aufgenommen sind.
- **Tipps zum Üben:** Im Elternbereich steht kurz, wie G und D gebildet werden und wie ihr gemeinsam üben könnt.

### 🔒 Datenschutz

Die Aufnahmen werden **nur auf eurem Gerät** im Browser gespeichert (IndexedDB). Sie werden nicht hochgeladen, an niemanden geschickt und für nichts anderes verwendet. Das Spiel lädt nichts von fremden Servern nach, es gibt **keine Werbung und kein Tracking**.

## 🛠️ Technik

Reines HTML, CSS und JavaScript – ohne Abhängigkeiten und ohne Build-Schritt. Genutzt werden MediaRecorder, Web Audio und IndexedDB.

<details>
<summary><b>Aufbau des Projekts</b></summary>

```
src/                    alles, was veröffentlicht wird
  index.html            Seitenaufbau, Vorschau fürs Teilen (Open Graph)
  favicon.svg           Icon
  img/fips-*.svg        Fips in vier Posen: Begrüßung, Jubel, Hoppla, Tanz
  img/share.png         Vorschaubild fürs Teilen (1200 × 630)
  img/apple-touch-icon.png  Icon für den Home-Bildschirm
  css/style.css         Design und Animationen
  js/words.js           Wortlisten, Wortpaare, Mindestanzahl Wörter
  js/pictures.js        Gezeichnete Bilder zu allen Wörtern
  js/util.js            Hilfsfunktionen und Spielzustand
  js/dragon.js          Fips: zeigt je nach Gefühl die passende Pose
  js/storage.js         Aufnahmen speichern (IndexedDB), Stille abschneiden
  js/sound.js           Aufnahmen abspielen, Geräusche und Fanfare
  js/game.js            Spiellogik und Feiern
  js/finale.js          Abschluss-Animationen (5 Stufen, 10 von 10 als Geschichte)
  js/recorder.js        Aufnahme-Studio
  js/app.js             Navigation und Start
docs/                   Screenshots für diese README
tools/                  Vorlagen und Skript für Vorschaubild, Icon und Screenshots
```

</details>

<details>
<summary><b>Lokal starten und weiterentwickeln</b></summary>

```bash
python3 -m http.server -d src
```

Dann http://localhost:8000 öffnen (das Mikrofon funktioniert nur über `https://` oder `localhost`).

- **Neue Wörter** kommen in `src/js/words.js` dazu, das passende Bild in `src/js/pictures.js` (ohne Bild wird das Emoji gezeigt).
- **Vorschaubild, Icon und Screenshots neu erzeugen** (braucht [Playwright](https://playwright.dev)):

```bash
node tools/make-images.js
```

- **Veröffentlichen:** Bei jedem Push auf `main` stellt eine GitHub Action den Inhalt von `src/` auf GitHub Pages.

</details>

## 📄 Lizenz

[MIT](LICENSE)
