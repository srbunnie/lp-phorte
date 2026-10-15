/* Cabeçalho Pós Phorte: menu recolhível e submenus. Nenhum dado é enviado para serviços externos. */
(() => {
  'use strict';
  function initialize(root) {
    if (root.dataset.hpInitialized) return;
    root.dataset.hpInitialized = 'true';
    const menu = root.querySelector('#hp-navigation');
    const toggle = root.querySelector('.hp-menu-toggle');
    const narrow = window.matchMedia('(max-width: 1199px)');
    // O cabeçalho é publicado em várias páginas; sem #hp-main, o atalho usa o elemento main do tema.
    root.querySelector('.hp-skip').addEventListener('click', event => {
      if (document.getElementById('hp-main')) return;
      const target = document.querySelector('main, [role="main"], #content');
      if (!target) return;
      event.preventDefault();
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView();
    });
    const dropdowns = [...menu.querySelectorAll('details')];
    menu.classList.add('hp-menu-enhanced');
    toggle.hidden = false;
    function closeMenu(returnFocus = false) {
      menu.classList.remove('hp-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').textContent = 'Abrir menu';
      dropdowns.forEach(d => { d.open = false; });
      if (returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('hp-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? 'Fechar menu' : 'Abrir menu';
    });
    dropdowns.forEach(d => {
      d.addEventListener('toggle', () => {
        if (d.open) dropdowns.forEach(other => { if (other !== d) other.open = false; });
      });
      d.addEventListener('keydown', event => {
        if (event.key === 'Escape' && d.open) {
          event.stopPropagation();
          d.open = false;
          d.querySelector('summary').focus();
        }
      });
    });
    root.addEventListener('keydown', event => {
      if (event.key === 'Escape' && narrow.matches && menu.classList.contains('hp-menu-open')) closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        dropdowns.forEach(d => { d.open = false; });
        if (narrow.matches) closeMenu();
      }
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a') && narrow.matches) closeMenu();
    });
    narrow.addEventListener('change', () => closeMenu());
  }
  const start = () => document.querySelectorAll('#hp-cabecalho').forEach(initialize);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
