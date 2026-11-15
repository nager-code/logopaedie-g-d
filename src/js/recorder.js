/* ================= Aufnahme-Studio ================= */
let micStream = null, recorder = null, recActive = false, recTimer = null, rafId = 0;
let analyser = null, micSource = null, maxLevel = 0, recStart = 0;
let selKey = null, studioState = "idle";

function itemByKey(k){ return REC_ITEMS.find(i => i.k === k); }
function firstMissing(after){
  const start = after ? REC_ITEMS.findIndex(i => i.k === after) + 1 : 0;
  for (let n=0;n<REC_ITEMS.length;n++){
    const it = REC_ITEMS[(start + n) % REC_ITEMS.length];
    if (it.word && !hasRec(it.k)) return it.k;
  }
  return null;
}

function setStudio(state, msg){
  studioState = state;
  const st = $("studio");
  st.className = "studio " + state;
  const it = itemByKey(selKey);
  $("stEmoji").textContent = it ? it.e : "";
  $("stWord").textContent = it ? it.t : "";
  const has = selKey && hasRec(selKey);
  const msgs = {
    idle: has ? "✅ Schon aufgenommen. Tippe ▶ zum Anhören oder 🎙️ für eine neue Aufnahme."
              : "Tippe auf 🎙️ und sag das Wort laut und deutlich.",
    asking: "🎤 Bitte das Mikrofon erlauben …",
    recording: `<span class="rec-dot"></span> Aufnahme läuft – jetzt sprechen!`,
    saving: "⏳ Wird gespeichert …",
    done: "✅ Gespeichert! Hör sie dir an – passt sie? Dann weiter ➜",
    quiet: "⚠️ Das war sehr leise. Bitte näher ans Handy und nochmal aufnehmen.",
    error: msg || "⚠️ Das hat nicht geklappt."
  };
  $("stStatus").innerHTML = msgs[state] || "";
  const rec = $("stRec");
  rec.classList.toggle("on", state === "recording");
  $("stRecLbl").textContent = state === "recording" ? "Stopp" : has ? "Nochmal" : "Aufnehmen";
  rec.querySelector(".ic").textContent = state === "recording" ? "⏹" : "🎙️";
  rec.disabled = state === "saving" || state === "asking";
  $("stPlay").disabled = !has || state === "recording" || state === "saving";
  $("stNext").disabled = state === "recording" || state === "saving";
  $("stNext").classList.toggle("attn", state === "done");
  $("timebar").classList.toggle("hidden", state !== "recording");
  if (state !== "recording") $("meter").style.width = "0";
  $("stHint").textContent = state === "recording" ? "Tippe ⏹, wenn du fertig bist – nach 4 Sekunden stoppt es von selbst." : "Stille am Anfang und Ende wird automatisch abgeschnitten.";
}

function selectKey(k){
  if (recActive) return;
  stopAll();
  selKey = k;
  setStudio("idle");
  renderRecList();
  $("studio").scrollIntoView({behavior:"smooth", block:"nearest"});
}

function showRecWarn(){
  const msgs = [];
  if (!window.isSecureContext || !navigator.mediaDevices || !window.MediaRecorder)
    msgs.push("⚠️ In dieser Ansicht geht das Mikrofon nicht. Öffne das Spiel im Browser (Safari oder Chrome) über die Web-Adresse. Alternativ kannst du mit 📁 eine Sprachmemo-Datei wählen.");
  if (!dbOK)
    msgs.push("⚠️ Aufnahmen können hier nicht dauerhaft gespeichert werden. Öffne das Spiel in Safari oder Chrome.");
  $("recWarn").innerHTML = msgs.join("<br><br>");
  $("recWarn").classList.toggle("hidden", !msgs.length);
}

function renderRecList(){
  const only = $("onlyMissing").checked;
  $("recList").innerHTML = REC_SECTIONS.map(sec => {
    const rows = sec.items.filter(i => !only || !hasRec(i.k) || i.k === selKey).map(i => {
      const has = hasRec(i.k);
      return `<div class="recrow ${has ? "has" : ""} ${i.k === selKey ? "sel" : ""}" data-k="${i.k}">
        <span class="e">${i.e}</span>
        <span class="w">${i.t}</span>
        <span class="st">${has ? "✅ fertig" : "fehlt"}</span>
        ${has ? `<button class="rbtn" data-act="del" aria-label="Löschen">🗑</button>` : ""}
        <label class="rbtn" aria-label="Datei wählen">📁<input type="file" accept="audio/*" data-act="file"></label>
      </div>`;
    }).join("");
    if (!rows) return "";
    const head = `<div class="rec-sec">${sec.title}${sec.note ? `<small>${sec.note}</small>` : ""}</div>`;
    return sec.box ? `<div class="sec-box">${head}${rows}</div>` : head + rows;
  }).join("") || `<p>🎉 Alle Wörter sind aufgenommen!</p>`;
}

function pickMime(){
  for (const m of ["audio/mp4","audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus"]){
    try { if (MediaRecorder.isTypeSupported(m)) return m; } catch(e){}
  }
  return "";
}

function meterLoop(){
  if (!recActive) return;
  const elapsed = performance.now() - recStart;
  $("timeFill").style.transform = `scaleX(${Math.max(0, 1 - elapsed / MAX_REC_MS)})`;
  if (analyser){
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    let sum = 0, pk = 0;
    for (const x of data){ sum += x*x; const a = Math.abs(x); if (a > pk) pk = a; }
    const rms = Math.sqrt(sum / data.length);
    if (pk > maxLevel) maxLevel = pk;
    $("meter").style.width = Math.min(100, Math.round(Math.pow(rms * 6, 0.7) * 100)) + "%";
  }
  rafId = requestAnimationFrame(meterLoop);
}

async function startRec(){
  if (!navigator.mediaDevices || !window.MediaRecorder){ showRecWarn(); setStudio("error", "⚠️ Mikrofon geht hier nicht – öffne das Spiel in Safari oder Chrome oder nutze 📁."); return; }
  stopAll();
  if (!micStream){
    setStudio("asking");
    try {
      micStream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true, noiseSuppression:true, autoGainControl:true}});
    } catch(e){
      setStudio("error", "⚠️ Kein Zugriff aufs Mikrofon. Bitte in den Browser-Einstellungen das Mikrofon für diese Seite erlauben.");
      return;
    }
  }
  const ctx = getCtx();
  try {
    if (ctx && !analyser){
      micSource = ctx.createMediaStreamSource(micStream);
      analyser = ctx.createAnalyser(); analyser.fftSize = 1024;
      micSource.connect(analyser);
    }
  } catch(e){ analyser = null; }

  sfx("recstart");
  await wait(180);                       // Piepton nicht mit aufnehmen
  const mime = pickMime(), chunks = [], key = selKey;
  const r = mime ? new MediaRecorder(micStream, {mimeType: mime}) : new MediaRecorder(micStream);
  recorder = r; recActive = true; maxLevel = 0; recStart = performance.now();
  r.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  r.onstop = async () => {
    recActive = false; clearTimeout(recTimer); cancelAnimationFrame(rafId);
    sfx("recstop");
    if (!chunks.length){ setStudio("error"); return; }
    setStudio("saving");
    await storeRec(key, new Blob(chunks, {type: r.mimeType || mime || "audio/webm"}));
    renderRecList();
    const quiet = analyser && maxLevel < 0.04;
    setStudio(quiet ? "quiet" : "done");
    await wait(250);
    playRec(key);
  };
  r.start();
  setStudio("recording");
  meterLoop();
  recTimer = setTimeout(() => { if (r.state === "recording") r.stop(); }, MAX_REC_MS);
}
function stopRec(){ if (recorder && recorder.state === "recording") recorder.stop(); }

function closeMic(){
  stopRec();
  try { micSource && micSource.disconnect(); } catch(e){}
  micSource = null; analyser = null;
  if (micStream){ micStream.getTracks().forEach(t => t.stop()); micStream = null; }
}

function openRecorder(){
  hide("parentsOverlay");
  showRecWarn();
  selKey = firstMissing() || REC_ITEMS[0].k;
  setStudio("idle");
  renderRecList();
  show("recOverlay");
}

$("stRec").addEventListener("click", () => { recActive ? stopRec() : startRec(); });
$("stPlay").addEventListener("click", () => { stopAll(); playRec(selKey); });
$("stNext").addEventListener("click", () => {
  const nxt = firstMissing(selKey);
  if (nxt) selectKey(nxt);
  else { const i = REC_ITEMS.findIndex(x => x.k === selKey); selectKey(REC_ITEMS[(i + 1) % REC_ITEMS.length].k); }
});
$("recList").addEventListener("click", e => {
  const row = e.target.closest(".recrow"); if (!row) return;
  const btn = e.target.closest("[data-act]");
  const k = row.dataset.k;
  if (btn && btn.dataset.act === "del"){
    e.stopPropagation();
    if (confirm("Aufnahme löschen?")) deleteRec(k).then(() => { renderRecList(); if (k === selKey) setStudio("idle"); });
    return;
  }
  if (e.target.closest("label.rbtn")) return;   // Dateiauswahl
  selectKey(k);
});
$("recList").addEventListener("change", async e => {
  const inp = e.target; if (inp.dataset.act !== "file" || !inp.files || !inp.files[0]) return;
  const k = inp.closest(".recrow").dataset.k;
  selKey = k; setStudio("saving");
  await storeRec(k, inp.files[0]);
  renderRecList(); setStudio("done"); playRec(k);
});
$("onlyMissing").addEventListener("change", renderRecList);
