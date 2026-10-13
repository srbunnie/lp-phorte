// Genera elementor/widget-html.html: la versión de campaña (index.html) en un solo bloque
// para pegar en el widget "HTML" de Elementor.
//
//   node elementor/generar.js [URL base de las imágenes .webp]
//
// Sin argumento, las fotos se cargan desde GitHub Pages. Para servirlas desde WordPress, súbelas a
// la biblioteca de medios y pasa la carpeta donde quedaron, p. ej.:
//   node elementor/generar.js https://phorte.com/wp-content/uploads/2026/10/
//
// Qué hace:
// - Junta phorte.css + styles.css y antepone #lp-punta a cada selector, para que el tema y Elementor
//   no pisen la página (y la página no toque el resto del sitio). Las reglas del kit que la página no
//   usa se descartan.
// - Inserta los logotipos y el QR como data URI (WordPress no acepta SVG por defecto).
// - Incluye script.js tal cual.
"use strict";

const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const SALIDA = path.join(__dirname, "widget-html.html");
const ID = "#lp-punta";
const BASE = (process.argv[2] || "https://srbunnie.github.io/lp-phorte/Cursos-Livres/congresso-punta/assets/images/").replace(/\/?$/, "/");

const leer = (f) => fs.readFileSync(path.join(RAIZ, f), "utf8");
const html = leer("index.html");
const script = leer("script.js");

// ── Clases del kit que la página usa (las de los avisos se arman en script.js)
const usadas = new Set((html + script).match(/ph-[a-z0-9_-]+/g));
const claseUsada = (c) => usadas.has(c) || c.startsWith("ph-alerta--");

// ── CSS: separar en reglas respetando llaves, comillas y paréntesis
function bloques(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    const ini = i;
    let prof = 0, comilla = null;
    // preludio hasta "{" o ";"
    while (i < css.length) {
      const ch = css[i];
      if (comilla) { if (ch === comilla && css[i - 1] !== "\\") comilla = null; }
      else if (ch === '"' || ch === "'") comilla = ch;
      else if (ch === "(") prof++;
      else if (ch === ")") prof--;
      else if (prof === 0 && (ch === "{" || ch === ";")) break;
      i++;
    }
    const preludio = css.slice(ini, i).trim();
    if (i >= css.length) break;
    if (css[i] === ";") { out.push({ preludio, cuerpo: null }); i++; continue; }
    // cuerpo hasta la llave que cierra
    let nivel = 1, j = i + 1;
    comilla = null;
    while (j < css.length && nivel > 0) {
      const ch = css[j];
      if (comilla) { if (ch === comilla && css[j - 1] !== "\\") comilla = null; }
      else if (ch === '"' || ch === "'") comilla = ch;
      else if (ch === "{") nivel++;
      else if (ch === "}") nivel--;
      j++;
    }
    out.push({ preludio, cuerpo: css.slice(i + 1, j - 1) });
    i = j;
  }
  return out;
}

function partirSelectores(sel) {
  const partes = [];
  let prof = 0, actual = "";
  for (const ch of sel) {
    if (ch === "(" || ch === "[") prof++;
    if (ch === ")" || ch === "]") prof--;
    if (ch === "," && prof === 0) { partes.push(actual.trim()); actual = ""; } else actual += ch;
  }
  if (actual.trim()) partes.push(actual.trim());
  return partes;
}

// Contextos que viven fuera del contenedor: se mantienen delante de #lp-punta
const CONTEXTO = /^(html|\.js|\[data-promo[^\]]*\])(?=[\s.[:]|$)/;

function aislar(sel) {
  if (sel === ":root" || sel === "body") return ID;
  if (sel.startsWith("body:")) return ID + sel.slice(4); // body:has(...) X → #lp-punta:has(...) X
  const m = sel.match(CONTEXTO);
  if (m) {
    let resto = sel.slice(m[0].length);
    // html.js X / .js X: el contexto puede tener más de una parte compuesta
    if (resto.startsWith(".js")) { resto = resto.slice(3); return m[0] + ".js " + ID + resto; }
    return resto.trim() ? m[0] + " " + ID + " " + resto.trim() : null; // "html" a secas queda global
  }
  return ID + " " + sel;
}

function procesar(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  let out = "";
  for (const { preludio, cuerpo } of bloques(css)) {
    if (cuerpo === null) { out += preludio + ";\n"; continue; }
    if (/^@(media|supports|container|layer)\b/.test(preludio)) {
      const dentro = procesar(cuerpo);
      if (dentro.trim()) out += preludio + "{\n" + dentro + "}\n";
      continue;
    }
    if (preludio.startsWith("@")) { out += preludio + "{" + cuerpo.trim() + "}\n"; continue; }

    const selectores = [];
    for (const s of partirSelectores(preludio)) {
      const clases = s.match(/\.ph-[a-z0-9_-]+/g) || [];
      if (!clases.every((c) => claseUsada(c.slice(1)))) continue;
      if (s === "html") { selectores.push("html"); continue; } // scroll-padding: aplica a la página
      const aislado = aislar(s);
      if (aislado) selectores.push(aislado);
    }
    if (selectores.length) out += selectores.join(",\n") + "{" + cuerpo.trim().replace(/\s*\n\s*/g, " ") + "}\n";
  }
  return out;
}

// Neutraliza estilos típicos del tema (Hello Elementor, kit global de Elementor) en elementos sin
// clase. Con :where() solo pesa el #id: cualquier regla con clase de la página gana igual.
const NEUTRO = `
${ID}{display:block;position:relative;isolation:auto;text-align:left;}
${ID} :where(h1,h2,h3,h4,h5,h6){font-family:inherit;font-weight:inherit;line-height:inherit;color:inherit;text-transform:none;letter-spacing:inherit;margin:0;}
${ID} :where(p,ul,ol,li,figure,blockquote,dl,dd){margin:0;}
${ID} :where(ul,ol){padding:0;list-style:none;}
${ID} :where(a){color:inherit;text-decoration:none;font-weight:inherit;}
${ID} :where(button,[type=button]){background:none;border:0;border-radius:0;padding:0;margin:0;box-shadow:none;text-transform:none;letter-spacing:inherit;font:inherit;color:inherit;cursor:pointer;white-space:normal;}
${ID} :where(img){height:auto;border:0;border-radius:0;box-shadow:none;}
${ID} :where(code){font-family:inherit;background:none;padding:0;font-size:inherit;color:inherit;}
${ID} :where(strong){font-weight:700;}
${ID} [hidden]{display:none!important;}
/* Barra de administración de WordPress (solo cuando hay sesión iniciada) */
body.admin-bar ${ID} .lp-topo{top:32px;}
@media (max-width:782px){body.admin-bar ${ID} .lp-topo{top:46px;}}
`;

const css = procesar(leer("phorte.css")) + NEUTRO + procesar(leer("styles.css"));

// ── HTML: contenido del <body> sin el <script src>
let cuerpo = html.slice(html.indexOf("<body>") + 6, html.lastIndexOf("</body>"));
cuerpo = cuerpo.replace(/\s*<script src="script\.js"[^>]*><\/script>\s*/, "\n");

const dataUri = (f, tipo) => `data:${tipo};base64,` + fs.readFileSync(path.join(RAIZ, f)).toString("base64");
const reemplazos = {
  "assets/images/phorte-logo-blanco.svg": dataUri("assets/images/phorte-logo-blanco.svg", "image/svg+xml"),
  "assets/images/qr-promocion.svg": dataUri("assets/images/qr-promocion.svg", "image/svg+xml"),
  "assets/images/qr-promocion.png": dataUri("assets/images/qr-promocion.png", "image/png"),
  "assets/images/formacion-avanzada-biomecanica.webp": BASE + "formacion-avanzada-biomecanica.webp",
  "assets/images/sistemas-metodos-musculacion.webp": BASE + "sistemas-metodos-musculacion.webp",
};
for (const [de, a] of Object.entries(reemplazos)) cuerpo = cuerpo.split(de).join(a);
if (/="assets\//.test(cuerpo)) throw new Error("Quedó una ruta relativa a assets/ sin reemplazar.");

const fuentes = html.match(/<link rel="preconnect"[^>]*>\s*<link rel="preconnect"[^>]*>\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/)[0];

const salida = `<!-- LP "Cursos gratis Phorte" (cupón punta100) para el widget HTML de Elementor.
     Generado por elementor/generar.js a partir de index.html, phorte.css, styles.css y script.js.
     No editar a mano: cambia los archivos de origen y vuelve a generar. -->
${fuentes}
<script>document.documentElement.classList.add("js");</script>
<style>
${css}</style>
<div id="lp-punta" class="lp-punta">
${cuerpo.trim()}
</div>
<script>
${script.trim()}
</script>
`;

fs.writeFileSync(SALIDA, salida);
console.log("OK " + path.relative(RAIZ, SALIDA) + " · " + (Buffer.byteLength(salida) / 1024).toFixed(1) + " KB · imágenes en " + BASE);
