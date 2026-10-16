(() => {
  if (window.PhorteGraduacaoHeader) { window.PhorteGraduacaoHeader.init(); return; }
  const init = () => {
    const root = document.getElementById('hg-cabecalho');
    if (!root || root.dataset.headerReady === 'true') return;
    const toggle = root.querySelector('.hg-menu-toggle');
    const nav = root.querySelector('#hg-nav');
    if (!toggle || !nav) return;
    root.dataset.headerReady = 'true';
    const mobile = window.matchMedia('(max-width: 1199px)');
    const closeDetails = () => root.querySelectorAll('details[open]').forEach(d => { d.open = false; });
    const setOpen = open => {
      root.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      nav.inert = mobile.matches && !open;
      if (!open) closeDetails();
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    mobile.addEventListener('change', () => setOpen(false));
    root.querySelectorAll('details').forEach(details => {
      details.addEventListener('toggle', () => {
        if (details.open) root.querySelectorAll('details[open]').forEach(other => { if (other !== details) other.open = false; });
      });
    });
    root.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const openDetails = root.querySelector('details[open]');
      if (openDetails) { openDetails.open = false; openDetails.querySelector('summary').focus(); }
      else if (toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', event => { if (!root.contains(event.target)) { setOpen(false); closeDetails(); } });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    root.querySelector('.hg-skip').addEventListener('click', event => {
      const main = document.querySelector('#hg-main,main,[role="main"],#content');
      if (!main) return;
      event.preventDefault();
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      main.focus(); main.scrollIntoView({ block:'start', behavior:'instant' });
    });
  };
  window.PhorteGraduacaoHeader = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true }); else init();
  let pending = false;
  new MutationObserver(() => { if (pending) return; pending = true; requestAnimationFrame(() => { pending = false; init(); }); }).observe(document.documentElement, { childList:true,subtree:true });
})();
