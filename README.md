# G oder D? – Hörspiel für Kinder

Ein kleines Lernspiel im Browser, mit dem Kinder üben, die Laute **G** und **D** zu unterscheiden.

**▶ Spielen:** https://nager-code.github.io/logopaedie-g-d/

## Fips, der kleine Drache

Fips begleitet durchs Spiel: Auf der Startseite winkt er und begrüßt das Kind. Bei einer richtigen Antwort springt er jubelnd in die Luft. Bei einer falschen kratzt er sich verlegen am Kopf („Hoppla!“). Tippt man ihn auf der Startseite an, kichert er.

## Wörter

40 Wörter mit D und 40 mit G, nach Schwierigkeit in Stufen geordnet (z. B. *D am Wortanfang*, *D in der Wortmitte*, *GR und GL am Anfang*). D und G am Wortende kommen nicht vor, weil sie dort wie t und k klingen. Beim Aufnehmen werden die leichten Wörter zuerst vorgeschlagen, abwechselnd mit G und D.

## Spielarten

- **G oder D?** – Ein Wort wird vorgesprochen, das Kind tippt auf **G** oder **D**.
- **Welches Bild?** – Hörpaare wie *Nagel / Nadel*, *Bogen / Boden* oder *Regen / reden*: Das Kind tippt auf das passende Bild.

Richtige und falsche Antworten werden mit Farbe und Geräusch zurückgemeldet. Nach jeweils 3 richtigen Antworten hintereinander gibt es eine kleine Feier-Animation. Währenddessen sind die Knöpfe ausgeblendet und die Wiedergabe pausiert, danach geht es weiter. 👀 zeigt die Lösung.

## Für Eltern

Das Spiel verwendet **nur eigene Aufnahmen**, es gibt keine Computerstimme. Über **👪 Für Eltern → Wörter aufnehmen** sprechen Mama oder Papa die Wörter ein. Eine Anzeige zeigt dabei Lautstärke und Restzeit. Gespielt werden kann ab **5 aufgenommenen Wörtern** (mit G und D). Im Spiel kommen nur Wörter vor, die schon aufgenommen sind. Die Aufnahmen bleiben nur lokal im Browser gespeichert.

## Technik

Reines HTML, CSS und JavaScript, ohne Abhängigkeiten und ohne Build-Schritt. Genutzt werden MediaRecorder, Web Audio und IndexedDB.

Alles, was zum Spiel gehört, liegt in `src/`:

```
src/index.html        Seitenaufbau
src/favicon.svg       Icon
src/img/fips-*.svg    Fips in drei Posen: Begrüßung, Jubel, Hoppla
src/css/style.css     Design und Animationen
src/js/words.js       Wortlisten, Wortpaare, Mindestanzahl Wörter
src/js/util.js        Hilfsfunktionen und Spielzustand
src/js/dragon.js      Fips: zeigt je nach Gefühl die passende Pose
src/js/storage.js     Aufnahmen speichern (IndexedDB), Stille abschneiden
src/js/sound.js       Aufnahmen abspielen, Geräusche und Fanfare
src/js/game.js        Spiellogik und Zwischendurch-Feiern
src/js/recorder.js    Aufnahme-Studio
src/js/app.js         Navigation und Start
```

Neue Wörter kommen in `src/js/words.js` dazu. Lokal testen: `src/index.html` im Browser öffnen
(das Mikrofon funktioniert nur über `https://` oder `localhost`, z. B. `python3 -m http.server -d src`).
Bei jedem Push auf `main` veröffentlicht eine GitHub Action die Seite auf GitHub Pages.

## Lizenz

MIT
