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

  const asset = document.querySelector('.asset-story');
  if (asset) {
    const title = asset.querySelector('.asset-copy h2');
    const text = asset.querySelector('.asset-copy > p:not(.eyebrow)');
    const metricTitles = asset.querySelectorAll('.metrics-row span');
    const metricTexts = asset.querySelectorAll('.metrics-row p');

    if (title) title.textContent = 'Портфель под управлением, а не просто перечень площадей.';
    if (text) text.textContent = 'Фидента собирает вокруг объекта операционный контур: арендаторы, документы, финансовая модель и понятные точки контроля для собственника или инвестора.';

    if (metricTitles[0]) metricTitles[0].textContent = 'Доходность';
    if (metricTexts[0]) metricTexts[0].textContent = 'модель аренды, платежи, прогноз и контроль ключевых показателей';

    if (metricTitles[1]) metricTitles[1].textContent = 'Контроль';
    if (metricTexts[1]) metricTexts[1].textContent = 'управление объектом, обращениями, подрядчиками и отчетностью';
  }
})();