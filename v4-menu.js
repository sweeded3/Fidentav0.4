(() => {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const close = () => topbar.classList.remove('is-menu-open');

  topbar.addEventListener('click', (event) => {
    const rect = topbar.getBoundingClientRect();
    const clickInBurgerZone = event.clientX > rect.right - 68;
    if (window.innerWidth > 860 || !clickInBurgerZone) return;
    event.preventDefault();
    topbar.classList.toggle('is-menu-open');
  });

  topbar.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) close();
  });
})();
