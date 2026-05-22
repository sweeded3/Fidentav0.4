(() => {
  const topbars = document.querySelectorAll('.topbar');
  if (!topbars.length) return;

  const isMobile = () => window.innerWidth <= 860;
  let lastMoonToggle = 0;

  const closeAll = () => {
    topbars.forEach((bar) => bar.classList.remove('is-menu-open'));
  };

  const toggleMoon = (mark, event) => {
    if (!isMobile()) return;

    const now = Date.now();
    if (now - lastMoonToggle < 260) return;
    lastMoonToggle = now;

    event.preventDefault();
    event.stopPropagation();
    mark.classList.toggle('is-moon');
  };

  document.querySelectorAll('.topbar .brand').forEach((brand) => {
    const mark = brand.querySelector('.brand-mark');
    if (!mark) return;

    mark.setAttribute('role', 'button');
    mark.setAttribute('aria-label', 'Переключить вид знака');
    mark.setAttribute('tabindex', '-1');

    mark.addEventListener('pointerdown', (event) => toggleMoon(mark, event));
    mark.addEventListener('click', (event) => toggleMoon(mark, event));
  });

  topbars.forEach((topbar) => {
    const nav = topbar.querySelector('.nav');
    if (!nav) return;

    topbar.addEventListener('click', (event) => {
      if (!isMobile()) return;
      if (event.target.closest('.brand')) return;

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
