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

  const headerSunStyle = document.createElement('style');
  headerSunStyle.textContent = `
    @media (min-width: 861px) {
      .topbar .brand {
        gap: 14px !important;
      }

      .topbar .brand-mark {
        width: 26px !important;
        height: 26px !important;
        min-width: 26px !important;
        border-radius: 999px !important;
        background:
          radial-gradient(circle at 34% 30%, rgba(255, 238, 202, 0.98) 0%, rgba(224, 175, 111, 0.94) 43%, rgba(182, 129, 67, 0.88) 100%) !important;
        box-shadow:
          0 0 0 8px rgba(255, 250, 244, 0.18),
          0 10px 24px rgba(138, 91, 42, 0.16),
          inset 0 1px 0 rgba(255, 255, 255, 0.46) !important;
        transform: none !important;
        opacity: 1 !important;
      }

      .topbar .brand-mark::after {
        background: linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0)) !important;
      }
    }

    .topbar > .button::before {
      background: url("./assets/lucide-briefcase-business.svg") center / contain no-repeat !important;
      opacity: 0.74 !important;
      filter: drop-shadow(0 1px 0 rgba(255,255,255,0.26)) !important;
    }

    .topbar::after {
      background-image: url("./assets/lucide-align-left.svg") !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: 22px 22px !important;
      opacity: 0.78 !important;
    }

    @media (min-width: 861px) {
      .topbar::after {
        content: "" !important;
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
        border-radius: 999px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: url("./assets/lucide-align-left.svg") center / 22px 22px no-repeat, rgba(255, 250, 244, 0.32) !important;
        border: 1px solid rgba(126, 101, 68, 0.105) !important;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.58),
          0 10px 24px rgba(31,26,20,0.045) !important;
        backdrop-filter: blur(18px) saturate(1.02) !important;
        -webkit-backdrop-filter: blur(18px) saturate(1.02) !important;
      }
    }

    @media (max-width: 860px) {
      .topbar::after {
        background: url("./assets/lucide-align-left.svg") center / 22px 22px no-repeat, rgba(255, 250, 244, 0.40) !important;
      }
    }
  `;
  document.head.appendChild(headerSunStyle);
})();