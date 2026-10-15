(function () {
  "use strict";

  // Cabeçalho: marcas grandes na entrada; ao rolar, barra compacta com menu
  var topo = document.querySelector("[data-topo]");
  if (topo) {
    var marcarTopo = function () { topo.toggleAttribute("data-rolado", window.scrollY > 40); };
    marcarTopo();
    window.addEventListener("scroll", marcarTopo, { passive: true });
  }

  // Revelar blocos ao entrar na tela (data-observado desliga o fallback de 3 s do CSS)
  var revelables = document.querySelectorAll("[data-revelar]");
  revelables.forEach(function (el) { el.setAttribute("data-observado", ""); });
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
})();
