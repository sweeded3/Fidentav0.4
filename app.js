const navigationLogoStyle = document.createElement("style");
navigationLogoStyle.textContent = `
  .topbar .brand {
    gap: 18px !important;
  }

  .topbar .brand-mark,
  .topbar.brand-dark .brand-mark,
  .brand-dark .brand-mark {
    width: 58px !important;
    height: 58px !important;
    min-width: 58px !important;
    min-height: 58px !important;
    transform: none !important;
    box-shadow: none !important;
  }

  @media (min-width: 861px) {
    .topbar::after {
      display: none !important;
      content: none !important;
    }

    .topbar > .button {
      width: auto !important;
      min-width: 168px !important;
      height: 44px !important;
      min-height: 44px !important;
      padding: 0 24px !important;
      border-radius: 999px !important;
      font-size: 0.94rem !important;
      font-weight: 600 !important;
      color: rgba(21,20,17,.84) !important;
      border: 1px solid rgba(126,101,68,.14) !important;
      background: linear-gradient(135deg, rgba(255,250,244,.62), rgba(234,224,210,.46)) !important;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.72),
        0 12px 24px rgba(31,26,20,.06) !important;
    }

    .topbar > .button::before {
      display: none !important;
      content: none !important;
    }
  }

  @media (max-width: 860px) {
    .topbar .brand-mark {
      width: 58px !important;
      height: 58px !important;
      min-width: 58px !important;
      min-height: 58px !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }

  @media (max-width: 420px) {
    .topbar .brand-mark {
      width: 56px !important;
      height: 56px !important;
      min-width: 56px !important;
      min-height: 56px !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }
`;
document.head.appendChild(navigationLogoStyle);

document.querySelectorAll('.topbar > .button[href$="account.html"]').forEach((button) => {
  button.textContent = 'Личный кабинет';
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hasDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const revealItems = document.querySelectorAll(".reveal");

if (!prefersReducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  for (const item of revealItems) {
    observer.observe(item);
  }
} else {
  for (const item of revealItems) {
    item.classList.add("visible");
  }
}

const topbar = document.querySelector(".topbar");
const parallaxItems = document.querySelectorAll(
  ".hero-media img, .page-hero-media img, .objects-hero-media img, .detail-hero-media img, .dashboard-hero-backdrop img",
);

let scrollFrame = null;

const updateOnScroll = () => {
  scrollFrame = null;
  const y = window.scrollY;

  if (topbar) {
    topbar.classList.toggle("is-condensed", y > 28);
  }

  if (prefersReducedMotion.matches) {
    return;
  }

  for (const item of parallaxItems) {
    const speed = item.closest(".dashboard-hero") ? 0.02 : 0.035;
    item.style.transform = `scale(1.04) translate3d(0, ${y * speed}px, 0)`;
  }
};

const onScroll = () => {
  if (scrollFrame !== null) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(updateOnScroll);
};

window.addEventListener("scroll", onScroll, { passive: true });
updateOnScroll();

const motionSurfaces = document.querySelectorAll(
  ".hero-aside, .hero-facts article, .direction-panel, .page-hero-panel, .investor-note, .property-card, .showcase-panel, .application-panel, .detail-hero-rail, .gallery-note, .detail-card, .dashboard-session, .dashboard-hero-rail, .dashboard-kpis article, .dashboard-panel",
);

for (const surface of motionSurfaces) {
  surface.classList.add("motion-surface");
}

if (hasDesktopPointer.matches && !prefersReducedMotion.matches) {
  for (const surface of motionSurfaces) {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 100;
      const py = ((event.clientY - rect.top) / rect.height) * 100;
      const rotateY = ((px - 50) / 50) * 3.2;
      const rotateX = ((50 - py) / 50) * 3.2;

      surface.style.setProperty("--mx", `${px}%`);
      surface.style.setProperty("--my", `${py}%`);
      surface.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    surface.addEventListener("pointerleave", () => {
      surface.style.removeProperty("--mx");
      surface.style.removeProperty("--my");
      surface.style.removeProperty("transform");
    });
  }
}
