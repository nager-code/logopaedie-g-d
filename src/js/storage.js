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
