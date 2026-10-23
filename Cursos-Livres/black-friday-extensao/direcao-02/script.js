(() => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  function selectTab(index, focus = false, updateHash = true) {
    tabs.forEach((tab, current) => {
      const selected = current === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[current].hidden = !selected;
    });
    if (focus) tabs[index].focus();
    if (updateHash) {
      // Keep a shareable area without forcing a scroll when using the tabs.
      window.history.replaceState(null, '', `#${panels[index].id}`);
    }
  }

  function syncFromHash() {
    const hash = window.location.hash.slice(1);
    const index = hash === 'combos' ? tabs.findIndex((tab) => tab.dataset.area === 'educacao')
      : panels.findIndex((panel) => panel.id === hash);
    if (index < 0) return;
    selectTab(index, false, false);
    const target = document.getElementById(hash);
    window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }

  document.querySelectorAll('[data-area-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const index = tabs.findIndex((tab) => tab.dataset.area === link.dataset.areaLink);
      if (index >= 0) selectTab(index, false, false);
    });
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(next, true);
    });
  });

  window.addEventListener('hashchange', syncFromHash);
  syncFromHash();
})();
