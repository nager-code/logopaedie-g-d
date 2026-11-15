# G oder D? – Hörspiel für Kinder

Ein kleines Lernspiel im Browser, mit dem Kinder üben, die Laute **G** und **D** zu unterscheiden.

**▶ Spielen:** https://nager-code.github.io/logopaedie-g-d/

## Spielarten

- **G oder D?** – Ein Wort wird vorgesprochen, das Kind tippt auf **G** oder **D**.
- **Welches Bild?** – Wortpaare wie *Nagel / Nadel* oder *Wagen / Waden*: Das Kind tippt auf das passende Bild.

Richtige und falsche Antworten werden mit Farbe, Geräusch und Sprachausgabe zurückgemeldet. 👀 zeigt die Lösung.

## Für Eltern

Das Spiel verwendet **nur eigene Aufnahmen**, es gibt keine Computerstimme. Über **👪 Für Eltern → Wörter aufnehmen** sprechen Mama oder Papa die Wörter ein. Eine Anzeige zeigt dabei Lautstärke und Restzeit. Im Spiel kommen nur Wörter vor, die schon aufgenommen sind. Die Aufnahmen bleiben nur lokal im Browser gespeichert.

## Technik

Reines HTML, CSS und JavaScript, ohne Abhängigkeiten und ohne Build-Schritt. Genutzt werden MediaRecorder, Web Audio und IndexedDB.

```
index.html        Seitenaufbau
css/style.css     Design
js/words.js       Wortlisten und Wortpaare
js/util.js        Hilfsfunktionen und Spielzustand
js/storage.js     Aufnahmen speichern (IndexedDB), Stille abschneiden
js/sound.js       Aufnahmen abspielen, Geräusche für richtig/falsch
js/game.js        Spiellogik
js/recorder.js    Aufnahme-Studio
js/app.js         Navigation und Start
```

Neue Wörter kommen in `js/words.js` dazu.
Bei jedem Push auf `main` veröffentlicht eine GitHub Action die Seite auf GitHub Pages.

## Lizenz

MIT
