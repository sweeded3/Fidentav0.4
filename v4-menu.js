(() => {
  const topbars = document.querySelectorAll('.topbar');
  if (!topbars.length) return;

  const closeAll = () => {
    topbars.forEach((bar) => bar.classList.remove('is-menu-open'));
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  topbars.forEach((topbar) => {
    const nav = topbar.querySelector('.nav');
    if (!nav) return;

    const toggleFromPoint = (event) => {
      if (window.innerWidth > 860) return;

      const point = event.touches ? event.touches[0] : event;
      if (!point) return;

      const rect = topbar.getBoundingClientRect();
      const clickInBurgerZone = point.clientX > rect.right - 76;

      if (!clickInBurgerZone) return;

      event.preventDefault();
      event.stopPropagation();
      topbar.classList.toggle('is-menu-open');
    };

    topbar.addEventListener('click', toggleFromPoint);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeAll);
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (window.innerWidth > 860) return;
    if (!event.target.closest('.topbar')) closeAll();
  });

  document.addEventListener('scroll', () => {
    if (window.innerWidth <= 860) closeAll();
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeAll();
  });
})();