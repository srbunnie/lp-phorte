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

  // GTM/GA4: clique em cada curso. Evento "clique_pos_graduacao" com
  //   curso   → mba-gestao | personal-internacional | biomecanica-mulheres
  //   posicao → card | fechamento
  //   destino → URL da página do curso
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-curso]");
    if (!link) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clique_pos_graduacao",
      curso: link.dataset.curso,
      posicao: link.dataset.local,
      destino: link.href
    });
  });
})();
