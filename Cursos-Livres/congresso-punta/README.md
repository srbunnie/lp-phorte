# Cursos gratis Phorte · Promoción por tiempo limitado

Landing page temporal en español para presentar dos cursos Phorte y explicar cómo usar el cupón `punta100`. La difusión cuenta con el apoyo del evento de Punta del Este; la página presenta la promoción de Phorte sin atribuirla al evento.

## Oferta

- 100% de descuento en los dos productos identificados en las imágenes de referencia del cupón.
- Cursos: Formación Avanzada en Biomecánica y Sistemas y Métodos de Entrenamiento de Musculación.
- El cupón se introduce durante la inscripción en el sitio de Phorte.
- La promoción termina el 26 de octubre de 2026 a las 12:00, hora de Brasilia (UTC−3), y la página muestra un contador regresivo.
- El QR local enlaza a `https://srbunnie.github.io/lp-phorte/Cursos-Livres/congresso-punta/`; si cambia la URL pública, hay que generar un nuevo QR.

## Dos versiones

Hay dos landing pages con el mismo contenido y el mismo `script.js`. El QR abre `index.html`.

### `index.html` + `styles.css` — campaña (versión principal)

Rojo Phorte, Barlow Condensed (títulos en mayúsculas e itálica) + Poppins, foto del hero en duotono rojo.

1. Hero a pantalla completa: "Dos cursos 100% gratis", cupón con forma de entrada (clic para copiar, sello "¡Copiado!") y fecha límite + mini contador.
2. Dos fajas cruzadas en movimiento (decorativas).
3. "Dos caminos. El mismo beneficio." (Paso 1 · Elige tu curso): tarjetas con foto completa.
4. "Tres pasos y listo." (fondo oscuro) + condiciones.
5. Cierre rojo: contador grande y QR con modo "pantalla grande".

### `minimalista.html` + `minimalista.css` — minimalista (alternativa)

Fondo blanco, Inter Tight en peso regular, el rojo Phorte solo como acento.

1. Hero dividido con la fila del cupón y foto.
2. "Elige tu curso" en grilla tipo bento.
3. "Cómo aplicar el cupón": tres pasos + ilustración de checkout (marcada como ilustración).
4. "Lo que necesitas saber": foto + condiciones.
5. Cierre con foto y tarjetas translúcidas: contador y QR.

En las dos, en el móvil aparece una barra fija con el cupón cuando el cupón del hero sale de la pantalla.

Cuando termina el plazo, la página cambia sola: oculta el cupón, muestra un aviso y el contador queda en cero. Esto no desactiva el cupón en WooCommerce; la fecha de vencimiento debe configurarse allí.

## WordPress + Elementor (versión de campaña)

`elementor/widget-html.html` es la versión roja (`index.html`) en un solo bloque para el widget **HTML** de Elementor: estilos aislados con `#lp-punta` (el tema no la pisa y ella no toca el resto del sitio), logotipos y QR incrustados y el script incluido.

1. En WordPress: **Páginas → Añadir nueva**. En *Atributos de página → Plantilla*, elige **Elementor Canvas** (sin la cabecera ni el pie del tema; la página trae los suyos).
2. Edita con Elementor. Añade un contenedor de **ancho completo**, con relleno y espacio entre elementos en 0, y dentro un widget **HTML**.
3. Pega todo el contenido de `elementor/widget-html.html` y publica.
4. Título y descripción para buscadores/redes: configúralos en el plugin SEO (los `<meta>` de `index.html` no van en el widget).

Fotos: por defecto se cargan desde GitHub Pages. Para servirlas desde WordPress, sube `assets/images/formacion-avanzada-biomecanica.webp` y `assets/images/sistemas-metodos-musculacion.webp` a la biblioteca de medios (en el mismo mes, para que queden en la misma carpeta) y genera de nuevo con esa carpeta:

```
node elementor/generar.js https://phorte.com/wp-content/uploads/2026/10/
```

Después de cualquier cambio en `index.html`, `styles.css` o `script.js`, vuelve a ejecutar `node elementor/generar.js` y pega el resultado de nuevo. Si la página de WordPress pasa a ser la URL pública, hay que generar un nuevo QR que apunte a ella.

## Archivos

- `index.html` / `minimalista.html`: las dos versiones de la landing page.
- `phorte.css`: kit oficial del Design System (copiado sin cambios). Se usa solo como base: reset, contenedor, íconos, alerta, aviso y modal. No editar.
- `styles.css` / `minimalista.css`: estilos de cada versión (prefijo `lp-`, colores en `:root`).
- `script.js`: compartido: copiar cupón, contadores, animaciones al desplazar, barra fija del móvil, aviso y modal del QR.
- `elementor/generar.js` → `elementor/widget-html.html`: versión de campaña para el widget HTML de Elementor (ver arriba).
- `assets/images/`: logotipos (color y blanco), portadas de los cursos y QR en SVG/PNG.

Abre `index.html` o sirve esta carpeta con un servidor HTTP local para ver la página.

## Referencias

- [Página de cursos Phorte en español](https://phorte.com/es/)
- [Formación Avanzada en Biomecánica](https://phorte.com/es/formacion/formacion-avanzada-en-biomecanica/)
- [Sistemas y Métodos de Entrenamiento de Musculación](https://phorte.com/es/curso/sistemas-y-metodos-de-entrenamiento-de-musculacion/)
- [Design System Phorte](https://phorte-design-system.vercel.app/styleguide)
- [Congreso de Punta en Instagram](https://www.instagram.com/congresodepunta/)
