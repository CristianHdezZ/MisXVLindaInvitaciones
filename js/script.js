function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

// Íconos disponibles para el itinerario — deben coincidir con los que
// acepta api/config.js. Cada valor es el contenido interno del <svg>.
const ICON_LIBRARY = {
  copa: '<path d="M10,8 H30 L20,22 Z" class="tl-stroke"/><line x1="20" y1="22" x2="20" y2="32" class="tl-stroke"/><line x1="12" y1="32" x2="28" y2="32" class="tl-stroke"/>',
  ceremonia: '<path d="M12,6 L15,20 A5,5 0 0 0 25,20 L28,6" class="tl-stroke"/><line x1="20" y1="20" x2="20" y2="30" class="tl-stroke"/><line x1="14" y1="34" x2="26" y2="34" class="tl-stroke"/><line x1="20" y1="30" x2="20" y2="34" class="tl-stroke"/>',
  vals: '<circle cx="15" cy="12" r="4" class="tl-stroke"/><circle cx="25" cy="12" r="4" class="tl-stroke"/><path d="M15,16 C10,20 10,28 14,33" class="tl-stroke"/><path d="M25,16 C30,20 30,28 26,33" class="tl-stroke"/>',
  cena: '<circle cx="20" cy="20" r="12" class="tl-stroke"/><circle cx="20" cy="20" r="5" class="tl-stroke"/>',
  iglesia: '<path d="M20,6 L20,14 M14,10 L26,10 M12,34 L12,18 L20,12 L28,18 L28,34 Z" class="tl-stroke"/>',
  corazon: '<path d="M20,32 C6,22 8,10 16,10 C19,10 20,13 20,13 C20,13 21,10 24,10 C32,10 34,22 20,32Z" class="tl-stroke"/>',
  regalo: '<rect x="9" y="15" width="22" height="17" class="tl-stroke"/><line x1="9" y1="21" x2="31" y2="21" class="tl-stroke"/><line x1="20" y1="15" x2="20" y2="32" class="tl-stroke"/><path d="M20,15 C15,15 13,8 20,8 C27,8 25,15 20,15Z" class="tl-stroke"/>',
  reloj: '<circle cx="20" cy="20" r="13" class="tl-stroke"/><line x1="20" y1="20" x2="20" y2="12" class="tl-stroke"/><line x1="20" y1="20" x2="26" y2="24" class="tl-stroke"/>'
};

function applyColors(colores) {
  if (!colores) return;
  const root = document.documentElement.style;
  if (colores.blush) root.setProperty('--blush', colores.blush);
  if (colores.blush2) root.setProperty('--blush-2', colores.blush2);
  if (colores.rosa) root.setProperty('--rosa', colores.rosa);
  if (colores.rosaDeep) root.setProperty('--rosa-deep', colores.rosaDeep);
  if (colores.vino) root.setProperty('--vino', colores.vino);
  if (colores.oro) root.setProperty('--oro', colores.oro);
}

function renderTextos(config) {
  const setText = (sel, val) => {
    const el = document.querySelector(sel);
    if (el && val) el.textContent = val;
  };
  setText('.gate__name', config.nombre);
  setText('.hero__name', config.nombre);
  setText('.hero__apellido', config.apellido);
  setText('.gate__quote', config.fraseGate);
  setText('.carta__texto', config.mensajeCarta);
  if (config.nombre) setText('.carta__firma', 'Con cariño, ' + config.nombre);
  setText('.footer__hashtag', config.hashtag);
}

function renderFecha(fechaEvento) {
  if (!fechaEvento) return;
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) countdownEl.dataset.date = fechaEvento;

  const d = new Date(fechaEvento);
  if (isNaN(d.getTime())) return;

  const dia = d.toLocaleDateString('es-ES', { weekday: 'long' });
  const mes = d.toLocaleDateString('es-ES', { month: 'long' });

  const badge = document.querySelector('.hero__badge');
  if (badge) {
    const spans = badge.querySelectorAll('span');
    const strong = badge.querySelector('strong');
    if (spans[0]) spans[0].textContent = dia;
    if (strong) strong.textContent = d.getDate();
    if (spans[1]) spans[1].textContent = mes;
  }
  const year = document.querySelector('.hero__year');
  if (year) year.textContent = d.getFullYear();
}

function renderItinerario(items) {
  const ul = document.querySelector('.timeline');
  if (!ul || !Array.isArray(items) || !items.length) return;
  ul.innerHTML = items
    .map(
      (item) => `
    <li class="timeline__item">
      <span class="timeline__icon" aria-hidden="true"><svg viewBox="0 0 40 40">${ICON_LIBRARY[item.icono] || ICON_LIBRARY.copa}</svg></span>
      <span class="timeline__text"><strong>${escapeHtml(item.titulo)}</strong><em>${escapeHtml(item.hora)}</em></span>
    </li>`
    )
    .join('');
}

function renderUbicacion(ubicacion) {
  if (!ubicacion) return;
  const h3 = document.querySelector('.detalle-card h3');
  const hora = document.querySelector('.detalle-card__hora');
  const p = document.querySelector('.detalle-card p');
  const iframe = document.querySelector('.mapa-wrap iframe');
  const link = document.querySelector('.btn-link');

  if (h3 && ubicacion.nombreLugar) h3.textContent = ubicacion.nombreLugar;
  if (hora && ubicacion.hora) hora.textContent = ubicacion.hora;
  if (p && ubicacion.nombreLugar) {
    p.innerHTML = escapeHtml(ubicacion.nombreLugar) + '<br>' + escapeHtml(ubicacion.direccion || '');
  }
  if (iframe && ubicacion.mapaEmbedUrl) iframe.src = ubicacion.mapaEmbedUrl;
  if (link && ubicacion.mapaLink) link.href = ubicacion.mapaLink;
}

function renderGaleria(urls) {
  const grid = document.getElementById('galeriaGrid');
  if (!grid || !Array.isArray(urls) || !urls.length) return;
  grid.innerHTML = urls
    .map(
      (url, i) => `
    <button class="galeria__item" data-full="${escapeHtml(url)}"><img src="${escapeHtml(url)}" alt="Foto ${i + 1}" loading="lazy"></button>`
    )
    .join('');
}

async function applyConfig() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const data = await res.json();
    const config = data.config;
    if (!config) return;

    renderTextos(config);
    renderFecha(config.fechaEvento);
    applyColors(config.colores);
    renderItinerario(config.itinerario);
    renderGaleria(config.galeria);
    renderUbicacion(config.ubicacion);
  } catch (err) {
    console.warn('No se pudo cargar la configuración dinámica; se usa el contenido por defecto del HTML.', err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  // Carga el contenido editable desde /api/config ANTES de inicializar
  // el resto (así el countdown, la galería y el itinerario ya usan los
  // datos actualizados desde el primer render).
  await applyConfig();

  /* =========================================================
     0. PORTADA — botón "abrir invitación"
     ========================================================= */
  const gate = document.getElementById('gate');
  const gateBtn = document.getElementById('gateBtn');
  const musicToggleRef = document.getElementById('musicToggle');
  const musicRef = document.getElementById('bgMusic');

  gateBtn.addEventListener('click', () => {
    gate.classList.add('is-closed');
    document.body.classList.remove('gate-active');
    window.scrollTo({ top:0 });

    // Intenta iniciar la música de fondo al abrir la invitación.
    musicRef.play().then(() => {
      musicToggleRef.setAttribute('aria-pressed','true');
      musicToggleRef.setAttribute('aria-label','Pausar música');
    }).catch(() => { /* el navegador puede bloquearlo; el botón flotante sigue disponible */ });
  });

  /* =========================================================
     1. ENREDADERA — crece según el progreso de scroll
     ========================================================= */
  const vinePath = document.getElementById('vinePath');
  const vineLength = vinePath.getTotalLength();
  vinePath.style.strokeDasharray = vineLength;
  vinePath.style.strokeDashoffset = vineLength;

  function updateVine(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    vinePath.style.strokeDashoffset = vineLength - (vineLength * progress);
  }
  window.addEventListener('scroll', updateVine, { passive:true });
  updateVine();

  /* =========================================================
     2. REVEAL ON SCROLL
     ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.2 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* =========================================================
     3. DOT NAV — sección activa
     ========================================================= */
  const dotLinks = document.querySelectorAll('.dot-nav a');
  const sections = [...dotLinks].map(link => document.querySelector(link.getAttribute('href')));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = '#' + entry.target.id;
        dotLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  }, { threshold:0.5 });
  sections.forEach(sec => sec && sectionObserver.observe(sec));

  /* =========================================================
     4. CUENTA REGRESIVA
     ========================================================= */
  const countdownEl = document.getElementById('countdown');
  const targetDate = new Date(countdownEl.dataset.date).getTime();

  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tickCountdown(){
    const now = Date.now();
    let diff = targetDate - now;

    if (diff <= 0){
      elDays.textContent = elHours.textContent = elMins.textContent = elSecs.textContent = '00';
      clearInterval(countdownTimer);
      return;
    }
    const days  = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins  = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs  = Math.floor(diff / 1000);

    elDays.textContent  = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }
  tickCountdown();
  const countdownTimer = setInterval(tickCountdown, 1000);

  /* =========================================================
     5. GALERÍA + LIGHTBOX
     ========================================================= */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.galeria__item').forEach(btn => {
    btn.addEventListener('click', () => {
      lightboxImg.src = btn.dataset.full;
      lightboxImg.alt = btn.querySelector('img').alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* =========================================================
     6. MÚSICA DE FONDO
     ========================================================= */
  const music = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  musicToggle.addEventListener('click', () => {
    if (music.paused){
      music.play().catch(() => {
        console.warn('El navegador bloqueó la reproducción automática. Requiere interacción del usuario (ya cubierta por este click).');
      });
      musicToggle.setAttribute('aria-pressed','true');
      musicToggle.setAttribute('aria-label','Pausar música');
    } else {
      music.pause();
      musicToggle.setAttribute('aria-pressed','false');
      musicToggle.setAttribute('aria-label','Reproducir música');
    }
  });

  /* =========================================================
     7. RSVP — formulario de confirmación
     ========================================================= */
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpStatus = document.getElementById('rsvpStatus');
  const rsvpSubmit = document.getElementById('rsvpSubmit');
  const endpoint = rsvpForm.dataset.endpoint;

  function setStatus(text, state){
    rsvpStatus.textContent = text;
    rsvpStatus.setAttribute('data-state', state || '');
  }

  function saveLocalBackup(data){
    try {
      const stored = JSON.parse(localStorage.getItem('rsvps') || '[]');
      stored.push(data);
      localStorage.setItem('rsvps', JSON.stringify(stored));
    } catch (err){ /* localStorage no disponible: no es crítico */ }
  }

  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: si el campo oculto viene lleno, es un bot — ignorar en silencio.
    if (rsvpForm._gotcha.value){ return; }

    const asistenciaInput = rsvpForm.querySelector('input[name="asistencia"]:checked');
    const data = {
      nombre: rsvpForm.nombre.value.trim(),
      telefono: rsvpForm.telefono.value.trim(),
      acompanantes: rsvpForm.acompanantes.value,
      asistencia: asistenciaInput ? asistenciaInput.value : '',
      mensaje: rsvpForm.mensaje.value.trim(),
      fecha: new Date().toISOString()
    };

    saveLocalBackup(data);

    const endpointConfigured = endpoint && !endpoint.includes('TU_ID');

    if (!endpointConfigured){
      // No hay backend configurado todavía: guarda solo localmente y avisa.
      console.warn('RSVP: configura data-endpoint en el <form id="rsvpForm"> con tu URL de Formspree para recibir confirmaciones reales. Por ahora solo se guardó localmente.');
      setStatus(
        data.asistencia === 'si'
          ? '¡Gracias, ' + data.nombre + '! (Guardado local — falta conectar el formulario a un backend real, ver README)'
          : 'Gracias por avisarnos, ' + data.nombre + '. (Guardado local — falta conectar el backend)',
        'ok'
      );
      rsvpForm.reset();
      return;
    }

    rsvpSubmit.disabled = true;
    rsvpSubmit.textContent = 'Enviando…';
    setStatus('Enviando tu confirmación…', '');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Siempre intenta leer el body — ahí vienen los mensajes reales
      // de validación del backend (ej. "Ingresa un teléfono válido.").
      let payload = null;
      try { payload = await response.json(); } catch (parseErr) { /* respuesta sin JSON: se maneja abajo */ }

      if (response.ok){
        setStatus(
          data.asistencia === 'si'
            ? '¡Gracias, ' + data.nombre + '! Tu asistencia quedó confirmada. 💕'
            : 'Gracias por avisarnos, ' + data.nombre + '. ¡Te extrañaremos!',
          'ok'
        );
        rsvpForm.reset();
      } else if (response.status === 409){
        setStatus(payload?.error || 'Ya existe una confirmación registrada con este número de teléfono.', 'error');
      } else if (response.status === 400 && Array.isArray(payload?.errors) && payload.errors.length){
        setStatus(payload.errors.join(' '), 'error');
      } else {
        setStatus(payload?.error || 'No pudimos enviar tu confirmación. Inténtalo de nuevo en un momento.', 'error');
      }
    } catch (err){
      setStatus('Sin conexión. Tu respuesta quedó guardada en este dispositivo; inténtalo de nuevo cuando tengas internet.', 'error');
    } finally {
      rsvpSubmit.disabled = false;
      rsvpSubmit.textContent = 'Enviar confirmación';
    }
  });

});