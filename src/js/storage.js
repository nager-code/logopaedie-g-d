/* ================= Speicher (IndexedDB) ================= */
const recURL = {};
let dbOK = true, dbPromise = null;
/* Promise mit Zeitlimit – manche Browser antworten bei IndexedDB nie */
function withTimeout(p, ms){ return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]); }

function idb(){
  if (!dbPromise) dbPromise = withTimeout(new Promise((res, rej) => {
    try {
      const r = indexedDB.open("gd-stimme", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("rec");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch(e){ rej(e); }
  }), 3000);
  return dbPromise;
}
async function dbDo(modeRW, fn){
  const db = await idb();
  return new Promise((res, rej) => {
    const t = db.transaction("rec", modeRW);
    fn(t.objectStore("rec"));
    t.oncomplete = () => res();
    t.onerror = () => rej(t.error);
  });
}
function setURL(k, blob){
  if (recURL[k]) URL.revokeObjectURL(recURL[k]);
  if (blob) recURL[k] = URL.createObjectURL(blob); else delete recURL[k];
}
async function loadAllRecs(){
  try {
    const db = await idb();
    await withTimeout(new Promise(res => {
      const c = db.transaction("rec","readonly").objectStore("rec").openCursor();
      c.onsuccess = () => {
        const x = c.result;
        if (x){ const v = x.value; setURL(x.key, new Blob([v.buf], {type: v.type})); x.continue(); }
        else res();
      };
      c.onerror = () => res();
    }), 4000);
  } catch(e){ dbOK = false; }
  refreshCounts();
}
async function storeRec(k, blob){
  const clean = await trimBlob(blob);
  setURL(k, clean);
  refreshCounts();                       // sofort zählen, auch wenn das Speichern dauert
  try {
    const buf = await clean.arrayBuffer();
    await withTimeout(dbDo("readwrite", s => s.put({buf, type: clean.type}, k)), 4000);
  } catch(e){ dbOK = false; showRecWarn(); }
  refreshCounts();
}
async function deleteRec(k){
  setURL(k, null);
  try { await dbDo("readwrite", s => s.delete(k)); } catch(e){}
  refreshCounts();
}

/* Stille abschneiden, Lautstärke angleichen, als WAV speichern */
async function trimBlob(blob){
  let ac;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    ac = new AC();
    const ab = await blob.arrayBuffer();
    const buf = await withTimeout(new Promise((res, rej) => ac.decodeAudioData(ab, res, rej)), 3000);
    const d = buf.getChannelData(0), sr = buf.sampleRate;
    let peak = 0; for (let i=0;i<d.length;i++){ const a = Math.abs(d[i]); if (a > peak) peak = a; }
    if (peak < 0.005) return blob;
    const th = Math.max(0.015, peak * 0.07);
    let s = 0; while (s < d.length && Math.abs(d[s]) < th) s++;
    let e = d.length - 1; while (e > s && Math.abs(d[e]) < th) e--;
    s = Math.max(0, s - Math.floor(sr * 0.10));
    e = Math.min(d.length, e + Math.floor(sr * 0.18));
    if (e - s < sr * 0.15) return blob;
    return encodeWav(d.subarray(s, e), sr, Math.min(0.9 / peak, 5));
  } catch(err){ return blob; }
  finally { try { ac && ac.close && ac.close(); } catch(e){} }
}
function encodeWav(samples, sr, gain){
  const n = samples.length, buf = new ArrayBuffer(44 + n*2), v = new DataView(buf);
  const w = (o, str) => { for (let i=0;i<str.length;i++) v.setUint8(o+i, str.charCodeAt(i)); };
  w(0,"RIFF"); v.setUint32(4, 36 + n*2, true); w(8,"WAVE"); w(12,"fmt ");
  v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,sr,true); v.setUint32(28,sr*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true);
  w(36,"data"); v.setUint32(40, n*2, true);
  const fade = Math.min(Math.floor(sr * 0.006), Math.floor(n/4));
  for (let i=0;i<n;i++){
    let g = gain;
    if (i < fade) g *= i / fade; else if (i > n - fade) g *= (n - i) / fade;
    const x = Math.max(-1, Math.min(1, samples[i] * g));
    v.setInt16(44 + i*2, x < 0 ? x * 0x8000 : x * 0x7fff, true);
  }
  return new Blob([buf], {type:"audio/wav"});
}

/* ================= Sichern & Übertragen =================
   Alle Aufnahmen (und der Fortschritt) als eine Datei – zur Sicherheit oder für ein anderes Gerät.
   Die Datei entsteht direkt im Browser und wird nirgends hochgeladen. */
function b64ToBuf(b64){
  const s = atob(b64), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u.buffer;
}
async function readAllRecs(){
  const out = {};
  try {
    const db = await idb();
    await new Promise(res => {
      const c = db.transaction("rec", "readonly").objectStore("rec").openCursor();
      c.onsuccess = () => { const x = c.result; if (x){ out[x.key] = x.value; x.continue(); } else res(); };
      c.onerror = () => res();
    });
  } catch(e){}
  // Falls der Speicher nicht dauerhaft war: was gerade im Speicher ist, trotzdem sichern
  for (const k of Object.keys(recURL)) if (!out[k]){
    try { const b = await (await fetch(recURL[k])).blob(); out[k] = {buf: await b.arrayBuffer(), type: b.type}; } catch(e){}
  }
  return out;
}
/* ---------- kleines ZIP – ohne Bibliothek ---------- */
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++){ let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(u8){ let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
/* files: [{name, data: Uint8Array}] → ZIP-Blob (gespeichert, nicht komprimiert – Audio lässt sich eh kaum packen) */
function makeZip(files){
  const enc = new TextEncoder(), parts = [], central = [];
  let offset = 0;
  const d = new Date(), dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
        dosDate = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  for (const f of files){
    const name = enc.encode(f.name), crc = crc32(f.data), size = f.data.length;
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);   // UTF-8-Namen
    lh.setUint16(8, 0, true); lh.setUint16(10, dosTime, true); lh.setUint16(12, dosDate, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, size, true); lh.setUint32(22, size, true);
    lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
    parts.push(lh, name, f.data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
    ch.setUint16(10, 0, true); ch.setUint16(12, dosTime, true); ch.setUint16(14, dosDate, true);
    ch.setUint32(16, crc, true); ch.setUint32(20, size, true); ch.setUint32(24, size, true);
    ch.setUint16(28, name.length, true); ch.setUint32(42, offset, true);
    central.push(ch, name);
    offset += 30 + name.length + size;
  }
  const cdSize = central.reduce((a, x) => a + (x.byteLength || x.length), 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
  end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], {type: "application/zip"});
}
/* ZIP lesen → {Name: Uint8Array}; kann gespeicherte und (falls der Browser es kann) komprimierte Einträge */
async function readZip(buf){
  const v = new DataView(buf), dec = new TextDecoder(), out = {};
  let e = buf.byteLength - 22;
  while (e >= 0 && v.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) throw new Error("kein ZIP");
  let p = v.getUint32(e + 16, true);
  const count = v.getUint16(e + 10, true);
  for (let i = 0; i < count; i++){
    if (v.getUint32(p, true) !== 0x02014b50) break;
    const method = v.getUint16(p + 10, true), csize = v.getUint32(p + 20, true);
    const nl = v.getUint16(p + 28, true), xl = v.getUint16(p + 30, true), cl = v.getUint16(p + 32, true), lo = v.getUint32(p + 42, true);
    const name = dec.decode(new Uint8Array(buf, p + 46, nl));
    const start = lo + 30 + v.getUint16(lo + 26, true) + v.getUint16(lo + 28, true);
    const raw = new Uint8Array(buf, start, csize);
    if (method === 0) out[name] = raw.slice();
    else if (method === 8 && typeof DecompressionStream !== "undefined")
      out[name] = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
    p += 46 + nl + xl + cl;
  }
  return out;
}
const AUDIO_EXT = t => /wav/.test(t) ? "wav" : /webm/.test(t) ? "webm" : /ogg/.test(t) ? "ogg" : /mp4|m4a|aac/.test(t) ? "m4a" : /mpeg|mp3/.test(t) ? "mp3" : "audio";
/* Dateinamen in der Sicherung: englisch, nur a–z, Ziffern und Bindestrich (keine Umlaute) */
const REC_EN = {
  Dach:"roof", Dose:"can", Dusche:"shower", Dino:"dino", Daumen:"thumb", Delfin:"dolphin", Dorf:"village", Dame:"lady",
  Donner:"thunder", Diamant:"diamond", Dieb:"thief", Dampfer:"steamboat", Dirndl:"dirndl", Dattel:"date-fruit", "Düse":"nozzle",
  Duft:"scent", Domino:"domino", "Dübel":"wall-plug", Dotter:"yolk", Dorn:"thorn", Nudel:"noodle", Pudel:"poodle", Feder:"feather",
  Boden:"floor", Leder:"leather", Nadel:"needle", Ruder:"oar", Rodel:"sled", Radio:"radio", Wade:"calf", Schublade:"drawer",
  Limonade:"lemonade", Faden:"thread", Paddel:"paddle", Bude:"hut", Drache:"dragon", Drei:"three", Dackel:"dachshund",
  Deckel:"lid", "Knödel":"dumpling", Gummi:"gummy", Gockel:"rooster", Gurke:"cucumber", Gabel:"fork", Gaul:"horse",
  Gugelhupf:"bundt-cake", Gorilla:"gorilla", Gulasch:"goulash", Gong:"gong", Gas:"gas", Geige:"violin", "Gemüse":"vegetables",
  Giraffe:"giraffe", Gips:"plaster-cast", Geschenk:"gift", Gewitter:"thunderstorm", Gitarre:"guitar", Gans:"goose",
  Garten:"garden", Gold:"gold", Auge:"eye", Vogel:"bird", Kugel:"ball", Magen:"stomach", Wagen:"wagon", Igel:"hedgehog",
  Hagel:"hail", Bagger:"excavator", Regen:"rain", Nagel:"nail", Bogen:"bow", "Säge":"saw", Ziege:"goat", Tiger:"tiger",
  Feige:"fig", Gras:"grass", Grille:"cricket", Glas:"glass", Glocke:"bell", Glitzer:"glitter", reden:"talk", Waden:"calves",
  Gaumen:"palate",
  "#G":"sentence-this-is-a-g", "#D":"sentence-this-is-a-d", "#ok":"sentence-great", "#end":"sentence-well-done"
};
const asciiName = s => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
  .normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "recording";
function recFileName(k, type){ return `recordings/${REC_EN[k] || asciiName(k)}.${AUDIO_EXT(type)}`; }

async function exportBackup(){
  const recs = await readAllRecs(), files = [], index = {};
  for (const [k, v] of Object.entries(recs)){
    const name = recFileName(k, v.type || "");
    index[name] = {key: k, type: v.type};
    files.push({name, data: new Uint8Array(v.buf)});
  }
  if (!files.length) return 0;
  const manifest = {app: "g-oder-d", format: 2, created: new Date().toISOString(), files: index, stats: STATS, meta: META};
  files.unshift({name: "fips-backup.json", data: new TextEncoder().encode(JSON.stringify(manifest, null, 1))});
  files.push({name: "README.txt", data: new TextEncoder().encode(
    "Sicherung von „G oder D? – Das Hörspiel mit Fips“\r\n\r\nIm Ordner „recordings“ liegen alle eingesprochenen Wörter als Audiodateien (englische Dateinamen, z. B. saw.wav = Säge).\r\n" +
    "Welche Datei zu welchem Wort gehört, steht in fips-backup.json.\r\n\r\n" +
    "Zum Wiederherstellen: Im Spiel unter „Für Eltern“ → „Sicherung laden“ diese ZIP-Datei auswählen.\r\n")});
  const blob = makeZip(files);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `fips-aufnahmen-${new Date().toISOString().slice(0, 10)}.zip`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return files.length - 2;
}
async function putRec(k, buf, type){
  setURL(k, new Blob([buf], {type}));
  try { await withTimeout(dbDo("readwrite", s => s.put({buf, type}, k)), 4000); } catch(e){ dbOK = false; }
}
async function importBackup(fileObj){
  const head = new Uint8Array(await fileObj.slice(0, 2).arrayBuffer());
  let n = 0, stats = null, meta = null;
  if (head[0] === 0x50 && head[1] === 0x4B){                 // „PK“ → ZIP
    const z = await readZip(await fileObj.arrayBuffer());
    const mName = Object.keys(z).find(x => /(^|\/)fips-(backup|sicherung)\.json$/.test(x));
    if (!mName) throw new Error("Das ist keine Sicherung von „G oder D?“.");
    const m = JSON.parse(new TextDecoder().decode(z[mName]));
    const prefix = mName.slice(0, mName.lastIndexOf("/") + 1);        // falls die ZIP in einem Ordner neu gepackt wurde
    for (const [name, info] of Object.entries(m.files || {})){
      const data = z[prefix + name] || z[name];
      if (!data) continue;
      await putRec(info.key, data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), info.type || "audio/wav");
      n++;
    }
    stats = m.stats; meta = m.meta;
  } else {                                                    // ältere Sicherung als .json
    const file = JSON.parse(await fileObj.text());
    if (!file || file.app !== "g-oder-d" || !file.recs) throw new Error("Das ist keine Sicherung von „G oder D?“.");
    for (const [k, v] of Object.entries(file.recs)){ await putRec(k, b64ToBuf(v.b64), v.type); n++; }
    stats = file.stats; meta = file.meta;
  }
  if (stats){ STATS = stats; save("stats", STATS); }
  if (meta){ META = meta; save("meta", META); }
  refreshCounts();
  return n;
}
