(() => {
  'use strict';

  function setupLazyVideo() {
    const button = document.querySelector('[data-video-src]');
    const container = document.getElementById('depoimento-player');
    if (!button || !container) return;

    button.addEventListener('click', () => {
      if (container.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.title = 'Depoimento de aluna da pós-graduação em Jardim Fabulinus';
      iframe.src = button.dataset.videoSrc;
      iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.tabIndex = 0;
      container.replaceChildren(iframe);
      iframe.focus();
    }, { once: true });

    button.hidden = false;
    container.hidden = false;
  }

  setupLazyVideo();
})();
