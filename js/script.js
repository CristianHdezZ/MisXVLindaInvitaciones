function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* =========================================================
   LIBRERÍA DE ÍCONOS — SVG inline propios.
   No dependen de ningún CDN (Iconify): siempre cargan, incluso
   en redes que bloquean recursos externos. Cada clave es el mismo
   identificador que guarda el backend, así la config existente sigue
   siendo válida. Todos usan currentColor -> heredan el color de --icono.
   viewBox unificado 0 0 48 48.
   ========================================================= */
const ICON_SVG = {
  'mdi:glass-cocktail': '<path d="M10 12 L38 12 L24 28 Z" fill="currentColor"/><rect x="22.5" y="28" width="3" height="12" rx="1" fill="currentColor"/><rect x="16" y="40" width="16" height="3" rx="1.5" fill="currentColor"/><circle cx="19" cy="15" r="2.4" fill="var(--blush)"/><path d="M30 14 C33 13 34 16 32 18" stroke="var(--blush)" stroke-width="1.3" fill="none" stroke-linecap="round"/>',
  'mdi:church': '<path d="M24 4 L24 10 M21 7 L27 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 11 L38 22 L38 42 L28 42 L28 32 C28 30 20 30 20 32 L20 42 L10 42 L10 22 Z" fill="currentColor"/><path d="M24 20 L24 27 M20.5 23.5 L27.5 23.5" stroke="var(--blush)" stroke-width="1.4" stroke-linecap="round"/><rect x="21" y="35" width="6" height="7" rx="3" fill="var(--blush)"/>',
  'mdi:dance-ballroom': '<circle cx="19" cy="11" r="3.4" fill="currentColor"/><circle cx="29" cy="11" r="3.4" fill="currentColor"/><path d="M15 17 C11 21 11 30 15 40 L21 40 C21 30 19 22 15 17 Z" fill="currentColor"/><path d="M33 17 C37 21 37 30 33 40 L25 40 C24 33 27 24 33 17 Z" fill="currentColor"/><path d="M19 20 C22 23 26 23 29 20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  'mdi:silverware-fork-knife': '<circle cx="24" cy="24" r="13" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="24" cy="24" r="7" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M8 9 L8 18 M6 9 L6 15 M10 9 L10 15 M6 15 C6 17.5 10 17.5 10 15" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M8 18 L8 40" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M40 9 C43 12 43 17 40 20 L40 40" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  'mdi:heart': '<path d="M24 40 C8 28 10 14 18 14 C22 14 24 18 24 18 C24 18 26 14 30 14 C38 14 40 28 24 40 Z" fill="currentColor"/>',
  'mdi:gift': '<rect x="10" y="18" width="28" height="22" rx="2" fill="currentColor"/><rect x="10" y="18" width="28" height="7" rx="1.5" fill="currentColor" opacity="0.85"/><path d="M24 18 L24 40" stroke="var(--blush)" stroke-width="2.2"/><path d="M24 18 C18 18 15 10 20 9 C24 8.5 24 14 24 18 C24 14 24 8.5 28 9 C33 10 30 18 24 18 Z" fill="currentColor"/>',
  'mdi:clock-outline': '<circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M24 14 L24 24 L31 28" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  'fa6-solid:person-dress': '<path d="M24 6 C22.5 6 21.5 7.2 21.8 8.8 L22.5 13 C20 14 19.5 17 20.5 20 L18 30 C16 36 14 40 12 43 C16 44.5 32 44.5 36 43 C34 40 32 36 30 30 L27.5 20 C28.5 17 28 14 25.5 13 L26.2 8.8 C26.5 7.2 25.5 6 24 6 Z" fill="currentColor"/><path d="M20.8 20 C22.8 22 25.2 22 27.2 20" stroke="var(--blush)" stroke-width="0.8" fill="none"/><path d="M15 34 C20 36 28 36 33 34" stroke="var(--blush)" stroke-width="0.8" fill="none" opacity="0.7"/>',
  'mdi:tie': '<path d="M24 9 L29 12 L33 10 L34 15 L31 18 L36 42 L28 42 L26.5 24 L24 26 L21.5 24 L20 42 L12 42 L17 18 L14 15 L15 10 L19 12 Z" fill="currentColor"/><path d="M21 13 L24 20 L27 13 L24 15 Z" fill="var(--blush)"/><path d="M20.5 17 L24 20.5 L27.5 17" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
  'mdi:ring': '<circle cx="24" cy="28" r="11" stroke="currentColor" stroke-width="3" fill="none"/><path d="M19 15 L24 7 L29 15 Z" fill="var(--oro)"/>',
  'mdi:flower': '<circle cx="24" cy="14" r="6" fill="currentColor"/><circle cx="34" cy="24" r="6" fill="currentColor"/><circle cx="24" cy="34" r="6" fill="currentColor"/><circle cx="14" cy="24" r="6" fill="currentColor"/><circle cx="24" cy="24" r="5" fill="var(--oro)"/>',
  'mdi:butterfly': '<path d="M24 24 C12 10 4 12 6 24 C4 36 14 40 24 24 Z" fill="currentColor"/><path d="M24 24 C36 10 44 12 42 24 C44 36 34 40 24 24 Z" fill="currentColor"/><path d="M24 14 L24 34" stroke="var(--oro)" stroke-width="2.4" stroke-linecap="round"/>',
  'mdi:star-four-points': '<path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" fill="currentColor"/>',
  'mdi:diamond-stone': '<path d="M14 10 L34 10 L42 22 L24 42 L6 22 Z" fill="currentColor"/><path d="M14 10 L18 22 L24 42 M34 10 L30 22 L24 42 M6 22 L42 22 M18 22 L30 22" stroke="var(--blush)" stroke-width="1" fill="none" opacity="0.6"/>',
  'mdi:music-note': '<circle cx="16" cy="34" r="5" fill="currentColor"/><path d="M21 34 L21 10 L34 14 L34 20" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="24" r="4" fill="currentColor"/>',
  'mdi:cake-variant': '<rect x="10" y="24" width="28" height="16" rx="2" fill="currentColor"/><path d="M10 30 C14 33 18 27 24 30 C30 33 34 27 38 30" stroke="var(--blush)" stroke-width="1.4" fill="none"/><rect x="16" y="16" width="16" height="8" rx="2" fill="currentColor" opacity="0.9"/><path d="M24 16 L24 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="8" r="2" fill="var(--oro)"/>',
  'mdi:crown': '<path d="M8 34 L8 16 L17 24 L24 12 L31 24 L40 16 L40 34 Z" fill="currentColor"/><rect x="8" y="34" width="32" height="4" rx="1" fill="currentColor"/><circle cx="24" cy="12" r="2.4" fill="var(--oro)"/>',
  'mdi:hat-fedora': '<path d="M16 10 L32 10 L34 30 L14 30 Z" fill="currentColor"/><ellipse cx="24" cy="32" rx="18" ry="5" fill="currentColor"/><path d="M15 28 L33 28" stroke="var(--blush)" stroke-width="2"/>',
  'mdi:shoe-heel': '<path d="M8 34 L8 24 C8 18 18 16 26 20 L36 26 L38 32 L38 34 Z" fill="currentColor"/><path d="M36 34 L36 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  'mdi:fan': '<path d="M24 40 L24 20" stroke="currentColor" stroke-width="2"/><path d="M24 40 A20 20 0 0 1 6 30 L24 22 Z" fill="currentColor" opacity="0.75"/><path d="M24 40 A20 20 0 0 1 24 4 L24 22 Z" fill="currentColor"/><path d="M24 40 A20 20 0 0 0 42 30 L24 22 Z" fill="currentColor" opacity="0.6"/>',
  'mdi:email-outline': '<rect x="7" y="12" width="34" height="24" rx="2.5" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M8 14 L24 27 L40 14" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  'mdi:email-heart-outline': '<rect x="7" y="12" width="34" height="24" rx="2.5" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M8 14 L24 27 L40 14" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 34 C18 29 19.5 24 23 25.5 C24 26 24 27 24 27 C24 27 24 26 25 25.5 C28.5 24 30 29 24 34 Z" fill="currentColor"/>',
  'mdi:champagne': '<path d="M18 6 L30 6 L28 24 C28 30 20 30 20 24 Z" fill="currentColor"/><rect x="22.5" y="30" width="3" height="10" fill="currentColor"/><rect x="17" y="40" width="14" height="3" rx="1.5" fill="currentColor"/><circle cx="24" cy="14" r="1.4" fill="var(--blush)"/><circle cx="21" cy="18" r="1" fill="var(--blush)"/>'
};

// Devuelve el HTML de un ícono a partir de su identificador. Si no se
// reconoce, cae en un ícono neutro (corazón) para no dejar un hueco.
function iconoSvg(id, extraClass) {
  const cuerpo = ICON_SVG[id] || ICON_SVG['mdi:heart'];
  const cls = extraClass ? ` class="${extraClass}"` : '';
  return `<svg${cls} viewBox="0 0 48 48" fill="none" aria-hidden="true">${cuerpo}</svg>`;
}

function applyColors(colores) {
  if (!colores) return;
  const root = document.documentElement.style;
  if (colores.blush) root.setProperty('--blush', colores.blush);
  if (colores.blush2) root.setProperty('--blush-2', colores.blush2);
  if (colores.rosa) root.setProperty('--rosa', colores.rosa);
  if (colores.rosaDeep) root.setProperty('--rosa-deep', colores.rosaDeep);
  if (colores.vino) root.setProperty('--vino', colores.vino);
  if (colores.oro) root.setProperty('--oro', colores.oro);
  if (colores.vestido) root.setProperty('--vestido', colores.vestido);
  if (colores.icono) root.setProperty('--icono', colores.icono);
}

// Pesos que se piden a Google Fonts por cada tipografía permitida —
// deben coincidir con la lista cerrada de api/config.js.
const FONT_WEIGHTS = {
  'Cormorant Garamond': 'ital,wght@0,400;0,500;0,600;1,400',
  'Playfair Display': 'ital,wght@0,500;0,600;1,500',
  'EB Garamond': 'ital,wght@0,400;0,500;0,600;1,400',
  'Marcellus': '400',
  'Alex Brush': '400',
  'Great Vibes': '400',
  'Parisienne': '400',
  'Dancing Script': '500;700',
  'Playball': '400',
  'Jost': '300;400;500;600',
  'Poppins': '300;400;500;600',
  'Montserrat': '300;400;500;600',
  'Lato': '300;400;700'
};

const SCALE_MAP = { compacta: 0.9, normal: 1, grande: 1.12, pequeno: 0.8, mediano: 1, grande2: 1.25, xl: 1.5 };

function applyTipografia(tipografia) {
  if (!tipografia) return;
  const root = document.documentElement.style;

  const families = [tipografia.display, tipografia.script, tipografia.body].filter(Boolean);
  if (families.length) {
    const params = families
      .map((f) => `family=${encodeURIComponent(f)}${FONT_WEIGHTS[f] ? ':' + FONT_WEIGHTS[f] : ''}`)
      .join('&');
    const href = `https://fonts.googleapis.com/css2?${params}&display=swap`;

    let link = document.getElementById('dynamicFontLink');
    if (!link) {
      link = document.createElement('link');
      link.id = 'dynamicFontLink';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }

  if (tipografia.display) root.setProperty('--f-display', `'${tipografia.display}', serif`);
  if (tipografia.script) root.setProperty('--f-script', `'${tipografia.script}', cursive`);
  if (tipografia.body) root.setProperty('--f-body', `'${tipografia.body}', sans-serif`);

  if (tipografia.escalaNombre && SCALE_MAP[tipografia.escalaNombre]) {
    root.setProperty('--scale-nombre', SCALE_MAP[tipografia.escalaNombre]);
  }
  if (tipografia.escalaTitulos && SCALE_MAP[tipografia.escalaTitulos]) {
    root.setProperty('--scale-titulos', SCALE_MAP[tipografia.escalaTitulos]);
  }
  if (tipografia.escalaMensajes && SCALE_MAP[tipografia.escalaMensajes]) {
    root.setProperty('--scale-mensajes', SCALE_MAP[tipografia.escalaMensajes]);
  }
  if (tipografia.escalaIconos && SCALE_MAP[tipografia.escalaIconos]) {
    root.setProperty('--scale-iconos', SCALE_MAP[tipografia.escalaIconos]);
  }
}

function renderVestimenta(v) {
  if (!v) return;
  const container = document.getElementById('vestimentaIcons');
  if (container && (v.iconoIzquierdo || v.iconoDerecho)) {
    const left = v.iconoIzquierdo || 'fa6-solid:person-dress';
    const right = v.iconoDerecho || 'mdi:tie';
    container.innerHTML = `
      <span class="vestimenta__icon">${iconoSvg(left)}</span>
      <span class="vestimenta__icon">${iconoSvg(right)}</span>
    `;
  }
  const swatch = document.getElementById('colorEvitarSwatch');
  if (swatch && v.colorEvitar) swatch.style.background = v.colorEvitar;
  const nota = document.getElementById('vestimentaNota');
  if (nota && v.nota) nota.textContent = v.nota;
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
      <span class="timeline__icon" aria-hidden="true">${iconoSvg(item.icono || 'mdi:glass-cocktail')}</span>
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
  const wrapper = document.getElementById('galeriaWrapper');
  if (!wrapper || !Array.isArray(urls) || !urls.length) return false;
  wrapper.innerHTML = urls
    .map(
      (url, i) => `
    <div class="swiper-slide"><button class="galeria__item" data-full="${escapeHtml(url)}"><img src="${escapeHtml(url)}" alt="Foto ${i + 1}" loading="lazy"></button></div>`
    )
    .join('');
  // Si Swiper ya está inicializado, avísale que cambiaron los slides.
  if (window.__galeriaSwiper) {
    window.__galeriaSwiper.update();
    if (window.__galeriaSwiper.params.loop) {
      window.__galeriaSwiper.loopDestroy();
      window.__galeriaSwiper.loopCreate();
    }
  }
  return true;
}

function renderFotoPrincipal(url, nombre, apellido) {
  const img = document.getElementById('fotoPrincipal');
  if (!img) return;
  if (url) img.src = url;
  if (nombre) img.alt = 'Retrato de ' + nombre + (apellido ? ' ' + apellido : '');
}

function renderLottieGate(url) {
  const player = document.getElementById('gateLottie');
  if (!player || !url) return;
  if (player.getAttribute('src') === url) return;

  // El componente <lottie-player> a veces no repinta al solo cambiar el
  // atributo src (ya cargó la animación anterior). La forma más confiable
  // de forzar la nueva es reemplazar el nodo por uno recién creado.
  const aplicar = () => {
    const nuevo = document.createElement('lottie-player');
    nuevo.id = 'gateLottie';
    nuevo.className = player.className;
    nuevo.setAttribute('src', url);
    nuevo.setAttribute('background', 'transparent');
    nuevo.setAttribute('speed', '0.6');
    nuevo.setAttribute('loop', '');
    nuevo.setAttribute('autoplay', '');
    player.replaceWith(nuevo);
  };

  if (customElements.get('lottie-player')) {
    aplicar();
  } else {
    customElements.whenDefined('lottie-player').then(aplicar);
  }
}

function renderRegalos(regalos) {
  const section = document.getElementById('regalos');
  if (!section) return;
  if (!regalos || regalos.activo === false) {
    section.style.display = 'none';
    return;
  }
  section.style.display = '';
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
  if (regalos.titulo) setText('regalosTitulo', regalos.titulo);
  if (regalos.mensaje) setText('regalosMensaje', regalos.mensaje);
  setText('regalosDetalle', regalos.detalle || '');
}

// Lluvia de sobres: crea unos cuantos sobres animados que caen dentro
// de la sección de regalos. CSS puro (animación), sin librería extra.
function iniciarLluviaSobres() {
  const cont = document.getElementById('regalosLluvia');
  if (!cont || cont.dataset.iniciada) return;
  cont.dataset.iniciada = '1';
  const total = 14;
  let html = '';
  for (let i = 0; i < total; i++) {
    const left = Math.round(Math.random() * 96);
    const dur = (5 + Math.random() * 5).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);
    const size = (16 + Math.random() * 16).toFixed(0);
    html += `<span class="regalos__sobre-anim" style="left:${left}%;width:${size}px;animation-duration:${dur}s;animation-delay:${delay}s">${iconoSvg('mdi:email-outline')}</span>`;
  }
  cont.innerHTML = html;
}

async function applyConfig() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return;
    const data = await res.json();
    const config = data.config;
    if (!config) return;

    renderTextos(config);
    renderFotoPrincipal(config.fotoPrincipal, config.nombre, config.apellido);
    renderLottieGate(config.lottieGate);
    renderFecha(config.fechaEvento);
    applyColors(config.colores);
    applyTipografia(config.tipografia);
    renderItinerario(config.itinerario);
    renderVestimenta(config.vestimenta);
    renderRegalos(config.regalos);
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
     LIBRERÍAS PREMIUM (AOS, Swiper, tsParticles, confetti, GSAP)
     Todas se cargan por CDN en index.html. Aquí se inicializan.
     Cada una va protegida con typeof por si un CDN no cargó
     (sin internet, bloqueador, etc.) — el sitio sigue funcionando.
     ========================================================= */

  // -- AOS: animaciones al hacer scroll --
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
  }

  // -- Swiper: carrusel de la galería --
  // La galería puede haberse repintado desde /api/config, así que
  // inicializamos DESPUÉS de applyConfig para tomar los slides actuales.
  let galeriaSwiper = null;
  if (typeof Swiper !== 'undefined' && document.getElementById('galeriaSwiper')) {
    galeriaSwiper = new Swiper('#galeriaSwiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 1.6 },
        900: { slidesPerView: 2.2 }
      }
    });
    // Exponer para que applyConfig pueda refrescarlo si recarga fotos.
    window.__galeriaSwiper = galeriaSwiper;
  }

  // -- tsParticles: corazones/brillos flotando en la portada --
  if (typeof tsParticles !== 'undefined' && document.getElementById('gateParticles')) {
    tsParticles.load({
      id: 'gateParticles',
      options: {
        fpsLimit: 60,
        fullScreen: { enable: false },
        particles: {
          number: { value: 26, density: { enable: true, area: 800 } },
          color: { value: ['#E9AABB', '#C97D95', '#F6D8DF', '#B8935C'] },
          shape: { type: ['circle', 'heart'] },
          opacity: { value: { min: 0.2, max: 0.7 }, animation: { enable: true, speed: 0.6 } },
          size: { value: { min: 3, max: 7 } },
          move: { enable: true, speed: 1.1, direction: 'top', outModes: { default: 'out' }, straight: false }
        },
        detectRetina: true
      }
    });
  }

  // -- Lluvia de sobres en la sección de regalos --
  iniciarLluviaSobres();

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

    // -- Canvas Confetti: estallido al abrir la invitación --
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 140,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E9AABB', '#C97D95', '#B8935C', '#F6D8DF', '#ffffff'],
        scalar: 0.9
      });
    }

    // -- GSAP: entrada suave del hero al abrir --
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero__frame', { duration: 1, y: 30, opacity: 0, ease: 'power2.out', delay: 0.15 });
      gsap.from('.hero__name', { duration: 1, y: 20, opacity: 0, ease: 'power2.out', delay: 0.35 });
    }

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
     2. REVEAL ON SCROLL — reemplazado por AOS (data-aos en el HTML),
        inicializado arriba. Ya no se usa IntersectionObserver aquí.
     ========================================================= */

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

  // Delegación: un solo listener en el carrusel sirve para cualquier
  // slide, incluidos los que se repintan dinámicamente desde /api/config.
  const galeriaSwiperEl = document.getElementById('galeriaSwiper');
  if (galeriaSwiperEl) {
    galeriaSwiperEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.galeria__item');
      if (!btn) return;
      lightboxImg.src = btn.dataset.full;
      const img = btn.querySelector('img');
      lightboxImg.alt = img ? img.alt : '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden','false');
    });
  }

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

        // -- Canvas Confetti: celebración al confirmar asistencia --
        if (data.asistencia === 'si' && typeof confetti === 'function') {
          const fin = Date.now() + 800;
          (function lluvia() {
            confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#E9AABB', '#C97D95', '#B8935C'] });
            confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#E9AABB', '#C97D95', '#B8935C'] });
            if (Date.now() < fin) requestAnimationFrame(lluvia);
          })();
        }
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