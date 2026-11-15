# G oder D? – Hörspiel für Kinder

Ein kleines Lernspiel im Browser, mit dem Kinder üben, die Laute **G** und **D** zu unterscheiden.

**▶ Spielen:** https://nager-code.github.io/logopaedie-g-d/

## Spielarten

- **G oder D?** – Ein Wort wird vorgesprochen, das Kind tippt auf **G** oder **D**.
- **Welches Bild?** – Wortpaare wie *Nagel / Nadel* oder *Wagen / Waden*: Das Kind tippt auf das passende Bild.

Richtige und falsche Antworten werden mit Farbe, Geräusch und Sprachausgabe zurückgemeldet. 👀 zeigt die Lösung.

## Für Eltern

Über **👪 Für Eltern** lassen sich alle Wörter mit der eigenen Stimme aufnehmen. Das klingt deutlich natürlicher als die Computerstimme. Die Aufnahmen bleiben nur lokal im Browser gespeichert. Wörter ohne Aufnahme liest die Sprachausgabe des Geräts vor.

## Technik

Eine einzige Datei (`index.html`), ohne Abhängigkeiten. Genutzt werden Web Speech API, MediaRecorder, Web Audio und IndexedDB.
Bei jedem Push auf `main` veröffentlicht eine GitHub Action die Seite auf GitHub Pages.

## Lizenz

MIT
