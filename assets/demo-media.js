/* Shared controls for the existing product captures and evidence screenshots. */
document.addEventListener('DOMContentLoaded', () => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('video[data-src]')];
  const started = new WeakSet();
  const isVisible = (video) => {
    if (document.hidden || !video.getClientRects().length) return false;
    const rect = video.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
  };
  const syncVideos = () => {
    // Read all geometry before changing sources or posters.
    const visibility = videos.map((video) => [video, isVisible(video)]);
    visibility.forEach(([video, visible]) => {
      if (!visible) {
        video.pause();
        return;
      }
      if (video.dataset.poster && !video.hasAttribute('poster')) {
        video.poster = video.dataset.poster;
      }
      // No source is attached until the capture is on screen in its selected tab.
      if (!video.hasAttribute('src')) {
        video.preload = 'metadata';
        video.src = video.dataset.src;
      }
      if (!motion.matches && video.hasAttribute('data-autoplay') && !started.has(video)) {
        started.add(video);
        video.play().catch(() => { /* Native controls remain available. */ });
      }
    });
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(syncVideos) : null;
  videos.forEach((video) => observer?.observe(video));
  document.addEventListener('orchen:mediachange', syncVideos);
  document.addEventListener('visibilitychange', syncVideos);
  // Also cover tab changes that move a video without crossing an observer threshold.
  let pending = false;
  const scheduleSync = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; syncVideos(); });
  };
  window.addEventListener('scroll', scheduleSync, { passive: true });
  window.addEventListener('resize', scheduleSync);
  motion.addEventListener('change', () => {
    if (motion.matches) videos.forEach((video) => video.pause());
    else syncVideos();
  });
  syncVideos();

  document.querySelectorAll('[data-demo-gallery]').forEach((gallery) => {
    gallery.querySelectorAll('[data-demo-select]').forEach((button) => {
      button.addEventListener('click', () => {
        gallery.querySelectorAll('[data-demo-select]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        gallery.querySelectorAll('[data-demo-panel]').forEach((panel) => { panel.hidden = panel.dataset.demoPanel !== button.dataset.demoSelect; });
        syncVideos();
      });
    });
  });

  // Keep the original asset link as a no-JavaScript fallback.
  let dialog;
  let trigger;
  document.querySelectorAll('[data-enlarge]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !window.HTMLDialogElement) return;
      event.preventDefault();
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.className = 'demo-zoom';
        dialog.setAttribute('aria-labelledby', 'demo-zoom-title');
        dialog.innerHTML = '<div class="demo-zoom-bar"><h2 id="demo-zoom-title">Demo screenshot</h2><button type="button" data-zoom-toggle aria-pressed="false">View full size</button><button type="button" data-zoom-close autofocus>Close</button></div><div class="demo-zoom-viewport" tabindex="0" role="region" aria-label="Screenshot; scroll to explore at full size"><img alt=""></div><p class="demo-zoom-help">Demo data · At full size, scroll to explore the image. Press Escape to close.</p>';
        document.body.append(dialog);
        dialog.querySelector('[data-zoom-close]').addEventListener('click', () => dialog.close());
        dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
        dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));
        dialog.querySelector('[data-zoom-toggle]').addEventListener('click', () => {
          const full = dialog.querySelector('.demo-zoom-viewport').classList.toggle('is-full-size');
          setZoomLabel(full);
          positionImage(full);
        });
      }
      trigger = link;
      const original = link.querySelector('img');
      const enlarged = dialog.querySelector('img');
      enlarged.src = link.href;
      enlarged.alt = original.alt;
      enlarged.width = Number(original.getAttribute('width'));
      enlarged.height = Number(original.getAttribute('height'));
      enlarged.style.setProperty('--image-width', `${original.getAttribute('width') || original.naturalWidth}px`);
      const full = window.matchMedia('(max-width: 760px)').matches;
      const viewport = dialog.querySelector('.demo-zoom-viewport');
      viewport.classList.toggle('is-full-size', full);
      viewport.scrollTo(0, 0);
      setZoomLabel(full);
      dialog.showModal();
      enlarged.decode().then(() => positionImage(full)).catch(() => {});
    });
  });
  function setZoomLabel(full) {
    const button = dialog.querySelector('[data-zoom-toggle]');
    button.setAttribute('aria-pressed', String(full));
    button.textContent = full ? 'Fit to window' : 'View full size';
  }
  function positionImage(full) {
    dialog.querySelector('.demo-zoom-viewport').scrollTo({
      left: full ? Number(trigger.dataset.focusX || 0) : 0,
      top: full ? Number(trigger.dataset.focusY || 0) : 0,
      behavior: 'instant'
    });
  }
});
