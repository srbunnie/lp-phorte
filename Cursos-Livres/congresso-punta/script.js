(function () {
  "use strict";

  var CUPON = "punta100";
  // Fin de la promoción: 26/10/2026, 12:00 hora de Brasilia (UTC−3)
  var FIN = new Date("2026-10-26T12:00:00-03:00").getTime();

  // Cabecera: línea inferior al desplazar
  var topo = document.querySelector("[data-topo]");
  if (topo) {
    var marcarTopo = function () { topo.toggleAttribute("data-rolado", window.scrollY > 8); };
    marcarTopo();
    window.addEventListener("scroll", marcarTopo, { passive: true });
  }

  // Aviso (toast) del Design System
  var tonos = { sucesso: "i-sucesso", erro: "i-erro", info: "i-info", atencao: "i-atencao" };
  function avisar(tono, titulo, texto) {
    var region = document.getElementById("avisos");
    if (!region || !tonos[tono]) return;
    var el = document.createElement("div");
    el.className = "ph-alerta ph-alerta--" + tono;
    el.innerHTML = '<svg class="ph-icone" aria-hidden="true"><use href="#' + tonos[tono] + '"/></svg>' +
      '<div class="ph-alerta__corpo"><p class="ph-alerta__titulo"></p><p class="ph-alerta__texto"></p></div>' +
      '<button type="button" class="ph-fechar" aria-label="Cerrar aviso"><svg class="ph-icone ph-icone--sm" aria-hidden="true"><use href="#i-x"/></svg></button>';
    el.querySelector(".ph-alerta__titulo").textContent = titulo;
    el.querySelector(".ph-alerta__texto").textContent = texto;
    el.querySelector(".ph-fechar").addEventListener("click", function () { el.remove(); });
    region.replaceChildren(el);
    setTimeout(function () { el.remove(); }, 6000);
  }

  // Copiar cupón
  function copiarManual(texto) {
    var campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.opacity = "0";
    document.body.append(campo);
    campo.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    campo.remove();
    return ok;
  }
  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto).then(function () { return true; }, function () { return copiarManual(texto); });
    }
    return Promise.resolve(copiarManual(texto));
  }

  document.querySelectorAll("[data-copiar]").forEach(function (boton) {
    var etiqueta = boton.querySelector("[data-copiar-texto]");
    var original = etiqueta ? etiqueta.textContent : "";
    boton.addEventListener("click", function () {
      copiar(CUPON).then(function (ok) {
        if (!ok) {
          avisar("atencao", "No pudimos copiar", "Escribe el código manualmente: " + CUPON + ".");
          return;
        }
        avisar("sucesso", "Cupón copiado", "Pégalo en el campo de cupón durante tu inscripción.");
        if (etiqueta) etiqueta.textContent = "¡Copiado!";
        boton.setAttribute("data-copiado", "");
        setTimeout(function () {
          if (etiqueta) etiqueta.textContent = original;
          boton.removeAttribute("data-copiado");
        }, 2400);
      });
    });
  });

  // Contadores y texto del modal
  var contadores = document.querySelectorAll("[data-contador]");
  var textos = document.querySelectorAll("[data-contador-texto]");
  var aviso = document.querySelector("[data-finalizada]");
  var dos = function (n) { return String(n).padStart(2, "0"); };
  var temporizador;

  function pintar(valores) {
    contadores.forEach(function (c) {
      c.querySelectorAll("[data-cd]").forEach(function (u) {
        var nuevo = valores[u.dataset.cd];
        if (u.textContent === nuevo) return;
        u.textContent = nuevo;
        // Animación del dígito (solo en el contador grande)
        if (u.classList.contains("lp-contador__valor")) {
          u.classList.remove("lp-tic");
          void u.offsetWidth;
          u.classList.add("lp-tic");
        }
      });
    });
  }

  function actualizar() {
    var resta = FIN - Date.now();

    if (resta <= 0) {
      document.documentElement.setAttribute("data-promo", "finalizada");
      pintar({ d: "00", h: "00", m: "00", s: "00" });
      textos.forEach(function (t) { t.textContent = "La promoción terminó el 26 de octubre a las 12:00 (hora de Brasilia)"; });
      if (aviso) aviso.hidden = false;
      clearInterval(temporizador);
      return;
    }

    var d = Math.floor(resta / 86400000);
    var h = Math.floor((resta % 86400000) / 3600000);
    var m = Math.floor((resta % 3600000) / 60000);
    var s = Math.floor((resta % 60000) / 1000);
    pintar({ d: dos(d), h: dos(h), m: dos(m), s: dos(s) });

    var resumen = (d > 0 ? d + " d " : "") + dos(h) + " h " + dos(m) + " min";
    textos.forEach(function (t) { t.textContent = "La promoción termina en " + resumen + " · 26 de octubre, 12:00 (hora de Brasilia)"; });
  }

  actualizar();
  temporizador = setInterval(actualizar, 1000);

  // Revelar bloques al entrar en pantalla
  var revelables = document.querySelectorAll("[data-revelar]");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("es-visible");
        observador.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revelables.forEach(function (el) { observador.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add("es-visible"); });
  }

  // Barra fija del cupón en el móvil: aparece cuando el cupón del hero sale de la pantalla
  var barra = document.querySelector("[data-barra]");
  var cuponHero = document.querySelector("[data-cupon]");
  if (barra && cuponHero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entradas) {
      var fuera = !entradas[0].isIntersecting && entradas[0].boundingClientRect.top < 0;
      barra.toggleAttribute("data-visible", fuera);
    }).observe(cuponHero);
  }

  // Modal del Design System (modo presentación del QR)
  document.querySelectorAll("[data-abrir-modal]").forEach(function (b) {
    b.addEventListener("click", function () { document.getElementById(b.dataset.abrirModal).showModal(); });
  });
  document.querySelectorAll("[data-fechar-modal]").forEach(function (b) {
    b.addEventListener("click", function () { b.closest("dialog").close(); });
  });
  document.querySelectorAll("dialog.ph-modal").forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  });
})();
