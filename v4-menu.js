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

  const style = document.createElement('style');
  style.textContent = `
    .footer-finished .footer-brand-block { display: none !important; }
    .footer-finished .footer-main {
      grid-template-columns: minmax(132px,.58fr) minmax(180px,.72fr) minmax(230px,1fr) !important;
      align-items: stretch !important;
    }
    .footer.footer-finished {
      margin-top: 0 !important;
      padding-top: 38px !important;
      padding-bottom: 32px !important;
    }
    .footer-finished .footer-col,
    .footer-finished .demo-footer-nav {
      min-height: 0 !important;
      background: rgba(255,255,255,.026) !important;
    }
    .footer-finished .footer-col a {
      display: block !important;
    }
    .footer-finished .footer-col:nth-child(3) a:nth-child(2),
    .footer-finished .footer-col:nth-child(3) a:nth-child(3),
    .footer-finished .footer-col:nth-child(3) a:nth-child(4) {
      margin-top: 6px !important;
      padding: 10px 12px !important;
      border: 1px solid rgba(255,255,255,.075) !important;
      border-radius: 14px !important;
      background: rgba(255,255,255,.035) !important;
    }
    .model {
      padding-top: 34px !important;
      padding-bottom: 38px !important;
    }
    .model .timeline {
      margin-top: 30px !important;
      gap: 18px !important;
    }
    .model .timeline-step {
      padding: 26px 28px !important;
      border-radius: 24px !important;
      background: rgba(255,250,244,.42) !important;
      border: 1px solid rgba(126,101,68,.12) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.58), 0 16px 42px rgba(31,26,20,.045) !important;
    }
    .model .section-heading {
      align-items: end !important;
      gap: clamp(36px,8vw,118px) !important;
    }
    @media (max-width: 860px) {
      .footer-finished .footer-main { grid-template-columns: 1fr !important; }
      .footer-finished .footer-brand-block { display: none !important; }
      .footer-finished .footer-col:nth-child(3) a:nth-child(2),
      .footer-finished .footer-col:nth-child(3) a:nth-child(3),
      .footer-finished .footer-col:nth-child(3) a:nth-child(4) {
        padding: 8px 0 !important;
        border: 0 !important;
        background: transparent !important;
      }
      .model .timeline-step { padding: 22px 0 !important; background: transparent !important; box-shadow: none !important; }
    }
  `;
  document.head.appendChild(style);
})();