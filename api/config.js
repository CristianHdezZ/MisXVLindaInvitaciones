const { getConfig, setConfig } = require('../lib/store');

const ADMIN_KEY = process.env.ADMIN_KEY || '';

// Íconos permitidos — lista cerrada para no aceptar SVG/HTML arbitrario
// desde el formulario (evita inyección de contenido). Se usan tanto en
// el itinerario como en la sección de vestimenta.
const ICONOS_VALIDOS = [
  'copa', 'ceremonia', 'vals', 'cena', 'iglesia', 'corazon', 'regalo', 'reloj',
  'vestido', 'esmoquin', 'anillo', 'flor', 'mariposa', 'estrella', 'diamante',
  'musica', 'pastel', 'corona', 'sombrero', 'zapato', 'abanico', 'sobre'
];

// Fuentes permitidas — lista cerrada (no texto libre) para no tener que
// cargar URLs de Google Fonts arbitrarias ni romper el diseño con una
// fuente que no combine.
const FUENTES_DISPLAY = ['Cormorant Garamond', 'Playfair Display', 'EB Garamond', 'Marcellus'];
const FUENTES_SCRIPT = ['Alex Brush', 'Great Vibes', 'Parisienne', 'Dancing Script', 'Playball'];
const FUENTES_BODY = ['Jost', 'Poppins', 'Montserrat', 'Lato'];
const ESCALAS_VALIDAS = ['compacta', 'normal', 'grande'];

const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;

// Contenido por defecto — se usa si todavía no se guardó ninguna
// configuración (primer arranque) o si algo falla al leerla.
const DEFAULT_CONFIG = {
  nombre: 'Linda',
  apellido: 'Hernández',
  fechaEvento: '2026-09-19T18:00:00',
  fraseGate: 'Hay momentos inolvidables que se atesoran en el corazón para siempre. Me siento muy feliz de llegar a este momento de mi vida y quiero compartirlo contigo.',
  mensajeCarta: 'Hoy quiero compartir contigo uno de los días más felices de mi vida. Quince años de historias, de risas y de aprender a florecer, y quiero que estés ahí para verlo con tus propios ojos. Esta invitación es un pedacito de mi corazón, hecha con la misma ilusión con la que espero abrazarte ese día.',
  hashtag: '#LindaXV2026',
  fotoPrincipal: 'assets/gallery/Image01.jpeg',
  colores: {
    blush: '#FBEAEE',
    blush2: '#F6D8DF',
    rosa: '#E9AABB',
    rosaDeep: '#C97D95',
    vino: '#8B4F62',
    oro: '#B8935C',
    vestido: '#E9AABB'
  },
  tipografia: {
    display: 'Cormorant Garamond',
    script: 'Alex Brush',
    body: 'Jost',
    escalaNombre: 'normal',
    escalaTitulos: 'normal',
    escalaMensajes: 'normal'
  },
  itinerario: [
    { titulo: 'Recepción', hora: '7:00 p.m.', icono: 'copa' },
    { titulo: 'Ceremonia', hora: '7:30 p.m.', icono: 'ceremonia' },
    { titulo: 'Vals', hora: '8:00 p.m.', icono: 'vals' },
    { titulo: 'Cena', hora: '9:00 p.m.', icono: 'cena' }
  ],
  vestimenta: {
    nota: 'Color a evitar: rosa palo — ¡es el mío! 🌹',
    colorEvitar: '#E9AABB',
    iconoIzquierdo: 'vestido',
    iconoDerecho: 'esmoquin'
  },
  ubicacion: {
    nombreLugar: 'Salón de Eventos Imperial Eventos Deluxe',
    direccion: 'Cr 40ªª Nº 48ª -12 Sector UCO Rionegro- Antioquia',
    hora: '7:00 p.m.',
    mapaEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1784564524946!6m8!1m7!1sCOvTRbTPuU5mPLvsMMZbUw!2m2!1d6.188724376340286!2d-75.36359884954642!3f325.46288285307287!4f8.27229985678568!5f0.7820865974627469',
    mapaLink: 'https://www.google.com/maps/place/Imperial+Eventos+Deluxe/@6.1887244,-75.3635988'
  },
  galeria: [
    'assets/gallery/Image01.jpeg',
    'assets/gallery/Image02.jpeg',
    'assets/gallery/Image03.jpeg'
  ]
};

function sanitizeText(value, maxLen, fallback) {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  return value.trim().slice(0, maxLen);
}

function sanitizeColor(value, fallback) {
  return typeof value === 'string' && HEX_COLOR.test(value.trim()) ? value.trim() : fallback;
}

function sanitizeChoice(value, allowed, fallback) {
  return typeof value === 'string' && allowed.includes(value) ? value : fallback;
}

function sanitizeUrl(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const v = value.trim();
  if (!v) return fallback;
  // Bloquea esquemas peligrosos (javascript:, data:, vbscript:); acepta
  // cualquier otra cosa — rutas relativas propias del sitio (con o sin
  // barra inicial), URLs http(s) completas, etc.
  if (/^(javascript|data|vbscript):/i.test(v)) return fallback;
  return v.slice(0, 2000);
}

function sanitizeConfig(body) {
  const d = DEFAULT_CONFIG;
  const b = body || {};

  const colores = {
    blush: sanitizeColor(b?.colores?.blush, d.colores.blush),
    blush2: sanitizeColor(b?.colores?.blush2, d.colores.blush2),
    rosa: sanitizeColor(b?.colores?.rosa, d.colores.rosa),
    rosaDeep: sanitizeColor(b?.colores?.rosaDeep, d.colores.rosaDeep),
    vino: sanitizeColor(b?.colores?.vino, d.colores.vino),
    oro: sanitizeColor(b?.colores?.oro, d.colores.oro),
    vestido: sanitizeColor(b?.colores?.vestido, d.colores.vestido)
  };

  const tipografia = {
    display: sanitizeChoice(b?.tipografia?.display, FUENTES_DISPLAY, d.tipografia.display),
    script: sanitizeChoice(b?.tipografia?.script, FUENTES_SCRIPT, d.tipografia.script),
    body: sanitizeChoice(b?.tipografia?.body, FUENTES_BODY, d.tipografia.body),
    escalaNombre: sanitizeChoice(b?.tipografia?.escalaNombre, ESCALAS_VALIDAS, d.tipografia.escalaNombre),
    escalaTitulos: sanitizeChoice(b?.tipografia?.escalaTitulos, ESCALAS_VALIDAS, d.tipografia.escalaTitulos),
    escalaMensajes: sanitizeChoice(b?.tipografia?.escalaMensajes, ESCALAS_VALIDAS, d.tipografia.escalaMensajes)
  };

  const itinerario = Array.isArray(b.itinerario)
    ? b.itinerario.slice(0, 10).map((item) => ({
        titulo: sanitizeText(item?.titulo, 60, 'Actividad'),
        hora: sanitizeText(item?.hora, 30, ''),
        icono: ICONOS_VALIDOS.includes(item?.icono) ? item.icono : 'copa'
      }))
    : d.itinerario;

  const vestimenta = {
    nota: sanitizeText(b?.vestimenta?.nota, 200, d.vestimenta.nota),
    colorEvitar: sanitizeColor(b?.vestimenta?.colorEvitar, d.vestimenta.colorEvitar),
    iconoIzquierdo: ICONOS_VALIDOS.includes(b?.vestimenta?.iconoIzquierdo) ? b.vestimenta.iconoIzquierdo : d.vestimenta.iconoIzquierdo,
    iconoDerecho: ICONOS_VALIDOS.includes(b?.vestimenta?.iconoDerecho) ? b.vestimenta.iconoDerecho : d.vestimenta.iconoDerecho
  };

  const galeria = Array.isArray(b.galeria)
    ? b.galeria.slice(0, 24).map((url) => sanitizeUrl(url, null)).filter(Boolean)
    : d.galeria;

  const ubicacion = {
    nombreLugar: sanitizeText(b?.ubicacion?.nombreLugar, 150, d.ubicacion.nombreLugar),
    direccion: sanitizeText(b?.ubicacion?.direccion, 250, d.ubicacion.direccion),
    hora: sanitizeText(b?.ubicacion?.hora, 30, d.ubicacion.hora),
    mapaEmbedUrl: sanitizeUrl(b?.ubicacion?.mapaEmbedUrl, d.ubicacion.mapaEmbedUrl),
    mapaLink: sanitizeUrl(b?.ubicacion?.mapaLink, d.ubicacion.mapaLink)
  };

  let fechaEvento = d.fechaEvento;
  if (typeof b.fechaEvento === 'string' && !isNaN(new Date(b.fechaEvento).getTime())) {
    fechaEvento = b.fechaEvento;
  }

  return {
    nombre: sanitizeText(b.nombre, 60, d.nombre),
    apellido: sanitizeText(b.apellido, 60, d.apellido),
    fechaEvento,
    fraseGate: sanitizeText(b.fraseGate, 400, d.fraseGate),
    mensajeCarta: sanitizeText(b.mensajeCarta, 800, d.mensajeCarta),
    hashtag: sanitizeText(b.hashtag, 40, d.hashtag),
    fotoPrincipal: sanitizeUrl(b.fotoPrincipal, d.fotoPrincipal),
    colores,
    tipografia,
    itinerario,
    vestimenta,
    ubicacion,
    galeria: galeria.length ? galeria : d.galeria
  };
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Lectura pública: el propio sitio la usa para pintar el contenido.
  if (req.method === 'GET') {
    try {
      const stored = await getConfig();
      return res.status(200).json({ ok: true, config: stored || DEFAULT_CONFIG });
    } catch (err) {
      console.error('Error leyendo configuración:', err);
      return res.status(200).json({ ok: true, config: DEFAULT_CONFIG });
    }
  }

  // Escritura protegida: solo con la clave de administrador.
  if (req.method === 'POST') {
    const key = req.headers['x-admin-key'] || req.query.key;
    if (!ADMIN_KEY || key !== ADMIN_KEY) {
      return res.status(401).json({ ok: false, error: 'No autorizado' });
    }

    const config = sanitizeConfig(req.body);
    try {
      await setConfig(config);
      return res.status(200).json({ ok: true, config });
    } catch (err) {
      console.error('Error guardando configuración:', err);
      return res.status(500).json({ ok: false, error: 'No se pudo guardar la configuración.' });
    }
  }

  res.status(405).json({ ok: false, error: 'Método no permitido' });
};