(() => {
  const topbars = document.querySelectorAll('.topbar');
  if (!topbars.length) return;

  const closeAll = () => {
    topbars.forEach((bar) => bar.classList.remove('is-menu-open'));
  };

  topbars.forEach((topbar) => {
    const nav = topbar.querySelector('.nav');
    if (!nav) return;

    topbar.addEventListener('click', (event) => {
      if (window.innerWidth > 860) return;

      const rect = topbar.getBoundingClientRect();
      const clickInBurgerZone = event.clientX > rect.right - 76;

      if (!clickInBurgerZone) return;

      event.preventDefault();
      event.stopPropagation();
      topbar.classList.toggle('is-menu-open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        topbar.classList.remove('is-menu-open');
      });
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 860) return;
    const clickedInsideTopbar = event.target.closest('.topbar');
    if (!clickedInsideTopbar) closeAll();
  });

  document.addEventListener('touchstart', (event) => {
    if (window.innerWidth > 860) return;
    const touchedInsideTopbar = event.target.closest('.topbar');
    if (!touchedInsideTopbar) closeAll();
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeAll();
  });
})();