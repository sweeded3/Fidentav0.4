(() => {
  const topbars = document.querySelectorAll('.topbar');
  if (!topbars.length) return;

  const isMobile = () => window.innerWidth <= 860;

  const closeAll = () => {
    topbars.forEach((bar) => bar.classList.remove('is-menu-open'));
  };

  document.querySelectorAll('.topbar .brand-mark').forEach((mark) => {
    mark.addEventListener('click', (event) => {
      if (!isMobile()) return;

      event.preventDefault();
      event.stopPropagation();
      mark.classList.toggle('is-moon');
    });
  });

  topbars.forEach((topbar) => {
    const nav = topbar.querySelector('.nav');
    if (!nav) return;

    topbar.addEventListener('click', (event) => {
      if (!isMobile()) return;

      const point = event.touches ? event.touches[0] : event;
      if (!point) return;

      const rect = topbar.getBoundingClientRect();
      const clickedBurger = point.clientX >= rect.right - 52;
      if (!clickedBurger) return;

      event.preventDefault();
      event.stopPropagation();
      topbar.classList.toggle('is-menu-open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeAll);
    });
  });

  document.addEventListener('pointerdown', (event) => {
    if (isMobile() && !event.target.closest('.topbar')) closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) closeAll();
  });
})();
