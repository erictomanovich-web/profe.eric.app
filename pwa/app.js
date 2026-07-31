/* ============================================================
   APP.JS — lógica de la app. No hace falta tocar esto para
   cargar rutinas/tests nuevos: eso se edita en config.js.
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let alumnoActual = localStorage.getItem("alumnoActual") || null;

/* ---------- Selector de alumno ---------- */
function initSelectorAlumno(){
  const overlay = $("#selectorOverlay");
  const list = $("#alumnoList");
  list.innerHTML = "";
  ALUMNOS.forEach(nombre => {
    const b = document.createElement("button");
    b.className = "alumno-opt";
    b.textContent = nombre;
    b.onclick = () => {
      alumnoActual = nombre;
      localStorage.setItem("alumnoActual", nombre);
      overlay.style.display = "none";
      renderAll();
    };
    list.appendChild(b);
  });

  if (alumnoActual && ALUMNOS.includes(alumnoActual)) {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "flex";
  }
}

/* ---------- Navegación entre tabs ---------- */
const TITULOS = {
  inicio: "Inicio", plan: "Mi Plan", tests: "Tests",
  rpe: "RPE", rm: "Calculadora %RM", videos: "Videos",
  sobre: "Sobre mí", faq: "Preguntas frecuentes"
};

function goTo(view){
  $$(".view").forEach(v => v.classList.remove("active"));
  $(`#view-${view}`).classList.add("active");
  $$("nav.tabbar button").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  $("#tituloVista").textContent = TITULOS[view];
  if (view === "tests") renderTests();
  if (view === "sobre") renderSobre();
  if (view === "faq") renderFaq();
}
$$("nav.tabbar button").forEach(b => b.addEventListener("click", () => goTo(b.dataset.view)));
$("#sobreLink").addEventListener("click", () => goTo("sobre"));
$("#faqLink").addEventListener("click", () => goTo("faq"));
$$("[data-back]").forEach(a => a.addEventListener("click", (e) => { e.preventDefault(); goTo("inicio"); }));

/* ---------- Chip de alumno + Inicio ---------- */
function renderInicio(){
  $("#alumnoChip").style.display = "inline-flex";
  $("#alumnoNombre").textContent = alumnoActual;

  const rutina = RUTINAS[alumnoActual] || RUTINA_DEFAULT;
  const dias = diasDisponibles();
  const completados = getDiasCompletados();
  const totalSemanas = getHistorialSemanas().length;
  $("#resumenHoy").innerHTML = rutina.length
    ? `<div class="ejercicio"><div><div class="nombre">${completados.length}/${dias.length} días completados esta semana</div>
        <div class="detalle">Tocá "Mi Plan" para ver el detalle y marcar tu progreso</div></div></div>
       <div class="ejercicio"><div><div class="nombre">${totalSemanas} semana${totalSemanas === 1 ? "" : "s"} completa${totalSemanas === 1 ? "" : "s"} en total</div>
        <div class="detalle">Se suma cada vez que terminás todos los días de una semana</div></div></div>`
    : `<div class="detalle">Todavía no tenés una rutina cargada. Hablá con tu profe.</div>`;

  const pend = JSON.parse(localStorage.getItem("rpePendientes") || "[]");
  $("#resumenRpe").innerHTML = pend.length
    ? `<div class="detalle">Tenés ${pend.length} registro(s) de RPE sin enviar (se reintentará solo cuando tengas señal).</div>`
    : `<div class="detalle">Todo tus registros de RPE están al día.</div>`;
}

/* ---------- Semana / progreso ---------- */
function getWeekKey(date = new Date()){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

function diasDisponibles(){
  const rutina = RUTINAS[alumnoActual] || RUTINA_DEFAULT;
  const dias = [...new Set(rutina.map(ej => ej.dia))];
  return dias.sort((a,b) => a-b);
}

function diasCompletadosKey(){
  return `dias_ok_${alumnoActual}_${getWeekKey()}`;
}
function getDiasCompletados(){
  return JSON.parse(localStorage.getItem(diasCompletadosKey()) || "[]");
}

// Historial acumulado de semanas 100% completadas (no se resetea nunca)
function historialSemanasKey(){
  return `historial_semanas_${alumnoActual}`;
}
function getHistorialSemanas(){
  return JSON.parse(localStorage.getItem(historialSemanasKey()) || "[]");
}
function actualizarHistorialSemana(){
  const dias = diasDisponibles();
  const completados = getDiasCompletados();
  const semanaCompleta = dias.length > 0 && dias.every(d => completados.includes(d));
  let historial = getHistorialSemanas();
  const wk = getWeekKey();
  if (semanaCompleta && !historial.includes(wk)){
    historial.push(wk);
    localStorage.setItem(historialSemanasKey(), JSON.stringify(historial));
  } else if (!semanaCompleta && historial.includes(wk)){
    historial = historial.filter(w => w !== wk);
    localStorage.setItem(historialSemanasKey(), JSON.stringify(historial));
  }
}

function checklistKey(dia){
  return `check_${alumnoActual}_${getWeekKey()}_dia${dia}`;
}

let diaSeleccionado = null;

/* ---------- Mi Plan (tabs de día + rutina + checklist) ---------- */
function renderPlan(){
  const rutina = RUTINAS[alumnoActual] || RUTINA_DEFAULT;
  const cont = $("#listaEjercicios");
  const tabsCont = $("#diaTabs");
  const btn = $("#terminarDiaBtn");
  const status = $("#diaStatus");
  status.textContent = "";

  if (!rutina.length){
    tabsCont.innerHTML = "";
    btn.style.display = "none";
    cont.innerHTML = `<div class="detalle">Todavía no tenés una rutina cargada. Hablá con tu profe.</div>`;
    return;
  }

  const dias = diasDisponibles();
  const completados = getDiasCompletados();

  if (diaSeleccionado === null || !dias.includes(diaSeleccionado)){
    diaSeleccionado = dias.find(d => !completados.includes(d)) ?? dias[0];
  }

  // Tabs de día
  tabsCont.innerHTML = "";
  dias.forEach(dia => {
    const tab = document.createElement("button");
    tab.className = "dia-tab" + (dia === diaSeleccionado ? " active" : "");
    tab.innerHTML = `Día ${dia} ${completados.includes(dia) ? '<span class="tick">✓</span>' : ""}`;
    tab.addEventListener("click", () => { diaSeleccionado = dia; renderPlan(); });
    tabsCont.appendChild(tab);
  });

  // Ejercicios del día, agrupados por categoría en orden fijo
  const doneKey = checklistKey(diaSeleccionado);
  let done = JSON.parse(localStorage.getItem(doneKey) || "[]");
  const rutinaConIndice = rutina.map((ej, i) => ({ ...ej, _i: i }));

  cont.innerHTML = "";
  CATEGORIAS_ORDEN.forEach(categoria => {
    const ejerciciosCat = rutinaConIndice.filter(
      ej => ej.dia === diaSeleccionado && ej.categoria === categoria
    );
    if (!ejerciciosCat.length) return;

    const header = document.createElement("div");
    header.className = "categoria-header";
    header.textContent = categoria;
    cont.appendChild(header);

    // Agrupar ejercicios consecutivos que compartan el mismo "circuito"
    let idx = 0;
    while (idx < ejerciciosCat.length){
      const ej = ejerciciosCat[idx];
      if (ej.circuito !== undefined && ej.circuito !== "" && ej.circuito !== null){
        const grupo = [];
        while (idx < ejerciciosCat.length && ejerciciosCat[idx].circuito === ej.circuito){
          grupo.push(ejerciciosCat[idx]);
          idx++;
        }
        const box = document.createElement("div");
        box.className = "circuito-box";
        const rounds = grupo[0].rounds;
        box.innerHTML = `<div class="circuito-header">🔁 Circuito${rounds ? " · " + rounds + " ROUNDS" : ""}</div>`;
        grupo.forEach(g => box.appendChild(renderEjercicioRow(g, g._i, done, doneKey)));
        cont.appendChild(box);
      } else {
        cont.appendChild(renderEjercicioRow(ej, ej._i, done, doneKey));
        idx++;
      }
    }
  });

  function renderEjercicioRow(ej, i, done, doneKey){
    const row = document.createElement("div");
    row.className = "ejercicio";
    row.innerHTML = `
      <div class="ej-row">
        <div class="check ${done.includes(i) ? "done" : ""}" data-i="${i}"></div>
        <div>
          <div class="nombre">${ej.nombre}</div>
          <div class="detalle">${ej.detalle}</div>
        </div>
      </div>
      <div class="series">${ej.reps}</div>`;
    row.querySelector(".check").addEventListener("click", () => {
      let d = JSON.parse(localStorage.getItem(doneKey) || "[]");
      if (d.includes(i)) d = d.filter(x => x !== i);
      else d.push(i);
      localStorage.setItem(doneKey, JSON.stringify(d));
      renderPlan();
    });
    return row;
  }

  // Botón de marcar día como terminado
  btn.style.display = "block";
  const yaCompletado = completados.includes(diaSeleccionado);
  btn.textContent = yaCompletado ? "Deshacer (marcar como no terminada)" : "Marcar rutina de hoy como terminada";
  btn.onclick = () => {
    let comp = getDiasCompletados();
    if (comp.includes(diaSeleccionado)) comp = comp.filter(d => d !== diaSeleccionado);
    else comp.push(diaSeleccionado);
    localStorage.setItem(diasCompletadosKey(), JSON.stringify(comp));
    actualizarHistorialSemana();
    if (!yaCompletado){
      const siguiente = dias.find(d => !comp.includes(d) && d !== diaSeleccionado);
      if (siguiente) diaSeleccionado = siguiente;
    }
    renderPlan();
  };
}

/* ---------- Tests (gráfico histórico) ---------- */
let testChartInstance = null;
function renderTests(){
  const tests = getTestsCombinados();
  const nombres = Object.keys(tests);
  const select = $("#testSelect");

  if (!nombres.length){
    select.innerHTML = `<option>Sin tests cargados</option>`;
    if (testChartInstance) testChartInstance.destroy();
    return;
  }

  select.innerHTML = nombres.map(n => `<option value="${n}">${n}</option>`).join("");
  select.onchange = () => dibujarTest(select.value);
  dibujarTest(select.value || nombres[0]);
}

function dibujarTest(nombreTest){
  const datos = (getTestsCombinados()[nombreTest]) || [];
  const ctx = $("#testChart").getContext("2d");
  if (testChartInstance) testChartInstance.destroy();
  testChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: datos.map(d => d.fecha),
      datasets: [{
        label: nombreTest,
        data: datos.map(d => d.valor),
        borderColor: "#C1440E",
        backgroundColor: "rgba(193,68,14,0.15)",
        tension: 0.25,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#D8B93B"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#9A9A94" }, grid: { color: "#3A3A3E" } },
        y: { ticks: { color: "#9A9A94" }, grid: { color: "#3A3A3E" } }
      }
    }
  });
}

/* ---------- RPE ---------- */
const RPE_LABELS = ["Nada","Muy muy leve","Muy leve","Leve","Moderado","Algo duro","Duro","Muy duro","Muy muy duro","Casi máximo","Máximo"];

function initRpe(){
  $("#rpeFecha").value = new Date().toISOString().slice(0,10);
  const slider = $("#rpeSlider");
  const actualizar = () => {
    $("#rpeVal").textContent = slider.value;
    $("#rpeValLabel").textContent = RPE_LABELS[+slider.value];
  };
  slider.addEventListener("input", actualizar);
  actualizar();

  $("#rpeEnviar").addEventListener("click", enviarRpe);
}

async function enviarRpe(){
  const payload = {
    alumno: alumnoActual,
    fecha: $("#rpeFecha").value,
    rpe: $("#rpeSlider").value,
    sueno: $("#rpeSueno").value,
    dolor: $("#rpeDolor").value,
    ts: new Date().toISOString()
  };
  const statusEl = $("#rpeStatus");
  statusEl.className = "status-msg";
  statusEl.textContent = "Enviando...";

  if (!APPS_SCRIPT_URL){
    guardarPendiente(payload);
    statusEl.textContent = "Backend no configurado todavía — guardado localmente.";
    return;
  }

  try{
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script Web Apps no siempre habilitan CORS
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    });
    statusEl.textContent = "¡Enviado! Gracias.";
    statusEl.classList.add("ok");
    limpiarFormRpe();
    reintentarPendientes(); // por si había cola vieja
  }catch(err){
    guardarPendiente(payload);
    statusEl.textContent = "Sin conexión: se guardó y se enviará solo más tarde.";
    statusEl.classList.add("err");
  }
}

function limpiarFormRpe(){
  $("#rpeSueno").value = "";
  $("#rpeDolor").value = "";
}

function guardarPendiente(payload){
  const pend = JSON.parse(localStorage.getItem("rpePendientes") || "[]");
  pend.push(payload);
  localStorage.setItem("rpePendientes", JSON.stringify(pend));
}

async function reintentarPendientes(){
  if (!APPS_SCRIPT_URL) return;
  let pend = JSON.parse(localStorage.getItem("rpePendientes") || "[]");
  if (!pend.length) return;
  const restantes = [];
  for (const p of pend){
    try{
      await fetch(APPS_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(p)
      });
    }catch(e){ restantes.push(p); }
  }
  localStorage.setItem("rpePendientes", JSON.stringify(restantes));
}

/* ---------- Calculadora %RM + registro de test ---------- */
function rmHistoryKey(){
  return `rm_history_${alumnoActual}`;
}
function getRmHistory(){
  return JSON.parse(localStorage.getItem(rmHistoryKey()) || "{}");
}

function initRm(){
  const select = $("#rmEjercicio");
  select.innerHTML = EJERCICIOS_RM.map(e => `<option value="${e}">${e}</option>`).join("");

  let ultimoRm = null;

  $("#rmCalcular").addEventListener("click", () => {
    const peso = parseFloat($("#rmPeso").value);
    const reps = parseFloat($("#rmReps").value);
    if (!peso || !reps){
      $("#rmResultado").style.display = "none";
      return;
    }
    ultimoRm = reps === 1 ? peso : peso * (1 + reps/30);
    $("#rmValor").textContent = ultimoRm.toFixed(1) + " kg";
    const porcentajes = [100,95,90,85,80,75,70,65,60,55,50];
    $("#rmTabla").innerHTML = porcentajes.map(p =>
      `<tr><td>${p}%</td><td>${(ultimoRm*p/100).toFixed(1)} kg</td></tr>`
    ).join("");
    $("#rmResultado").style.display = "block";
    $("#rmStatus").textContent = "";
    $("#rmStatus").className = "status-msg";
  });

  $("#rmGuardar").addEventListener("click", async () => {
    if (ultimoRm === null) return;
    const ejercicio = select.value;
    const fecha = new Date().toISOString().slice(0,10);
    const statusEl = $("#rmStatus");

    // Guardar localmente para que aparezca ya mismo en "Tests"
    const hist = getRmHistory();
    if (!hist[ejercicio]) hist[ejercicio] = [];
    hist[ejercicio].push({ fecha, valor: Math.round(ultimoRm * 10) / 10 });
    localStorage.setItem(rmHistoryKey(), JSON.stringify(hist));

    statusEl.textContent = "¡Guardado! Ya lo podés ver en 'Tests'.";
    statusEl.classList.add("ok");

    // Mandarlo también al backend, si está configurado (mismo Sheet que el RPE)
    if (APPS_SCRIPT_URL){
      const payload = { tipo: "test_rm", alumno: alumnoActual, ejercicio, peso: $("#rmPeso").value, reps: $("#rmReps").value, rm: ultimoRm.toFixed(1), fecha, ts: new Date().toISOString() };
      try{
        await fetch(APPS_SCRIPT_URL, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload)
        });
      }catch(e){ /* queda guardado local igual; no es crítico si esto falla */ }
    }
  });
}

/* ---------- Tests combinados: los que carga el profe + los que se
   auto-registra el alumno desde %RM ---------- */
function getTestsCombinados(){
  const base = { ...(TESTS[alumnoActual] || {}) };
  const propios = getRmHistory();
  Object.keys(propios).forEach(ej => {
    const combinado = [...(base[ej] || []), ...propios[ej]];
    combinado.sort((a,b) => a.fecha.localeCompare(b.fecha));
    base[ej] = combinado;
  });
  return base;
}

/* ---------- Videos ---------- */
function renderVideos(){
  const buscador = $("#videoBuscador");
  buscador.addEventListener("input", () => dibujarVideos(buscador.value));
  dibujarVideos("");
  renderMetodos();
}

function dibujarVideos(filtro){
  const f = filtro.trim().toLowerCase();
  const filtrados = f
    ? VIDEOS.filter(v => v.titulo.toLowerCase().includes(f) || v.grupo.toLowerCase().includes(f))
    : VIDEOS;

  if (!filtrados.length){
    $("#listaVideos").innerHTML = `<div class="detalle">No se encontraron ejercicios para "${filtro}".</div>`;
    return;
  }

  // Agrupar manteniendo el orden en que aparecen los grupos
  const grupos = [];
  const porGrupo = {};
  filtrados.forEach(v => {
    if (!porGrupo[v.grupo]){ porGrupo[v.grupo] = []; grupos.push(v.grupo); }
    porGrupo[v.grupo].push(v);
  });

  $("#listaVideos").innerHTML = grupos.map(g => `
    <div class="categoria-header">${g}</div>
    ${porGrupo[g].map(v => `
      <div class="video-item">
        <a class="video-link" href="${v.url}" target="_blank" rel="noopener">
          <div class="video-thumb">
            <svg viewBox="0 0 24 24"><path d="M10 9l5 3-5 3z"/><circle cx="12" cy="12" r="9"/></svg>
          </div>
          <div>
            <div class="titulo">${v.titulo}</div>
          </div>
        </a>
      </div>`).join("")}
  `).join("");
}

/* ---------- Métodos de entrenamiento (glosario tipo acordeón) ---------- */
function renderMetodos(){
  $("#listaMetodos").innerHTML = METODOS_ENTRENAMIENTO.map((m, i) => `
    <div class="faq-item" data-i="${i}">
      <div class="faq-pregunta">${m.nombre}<span class="faq-icono">+</span></div>
      <div class="faq-respuesta">${m.descripcion}</div>
    </div>
  `).join("");
  $$("#listaMetodos .faq-item").forEach(el => {
    el.querySelector(".faq-pregunta").addEventListener("click", () => el.classList.toggle("open"));
  });
}

/* ---------- Sobre mí (bio + foto + novedades) ---------- */
function renderSobre(){
  $("#bioTexto").innerHTML = PERFIL.bio.split("\n\n").map(p => `<p>${p}</p>`).join("");
  if (PERFIL.foto){
    $("#fotoPerfilGrande").innerHTML = `<img src="${PERFIL.foto}" alt="Foto de perfil">`;
    $("#sobreFotoChip").innerHTML = `<img src="${PERFIL.foto}" alt="Foto de perfil">`;
  }
  $("#instagramBtn").href = PERFIL.instagram || "#";
}

/* ---------- FAQ ---------- */
function renderFaq(){
  if (!FAQ.length){
    $("#listaFaq").innerHTML = `<div class="detalle">Todavía no hay preguntas frecuentes cargadas.</div>`;
    return;
  }
  $("#listaFaq").innerHTML = FAQ.map((item, i) => `
    <div class="faq-item" data-i="${i}">
      <div class="faq-pregunta">${item.pregunta}<span class="faq-icono">+</span></div>
      <div class="faq-respuesta">${item.respuesta}</div>
    </div>
  `).join("");
  $$("#listaFaq .faq-item").forEach(el => {
    el.querySelector(".faq-pregunta").addEventListener("click", () => el.classList.toggle("open"));
  });
}

/* ---------- Init general ---------- */
function renderAll(){
  if (!alumnoActual) return;
  renderInicio();
  renderPlan();
  renderVideos();
  reintentarPendientes();
}

initSelectorAlumno();
initRpe();
initRm();
if (alumnoActual) renderAll();

if ("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
