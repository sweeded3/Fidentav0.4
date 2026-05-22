const navigationLogoStyle = document.createElement("style");
navigationLogoStyle.textContent = `
  .topbar .brand {
    gap: 18px !important;
  }

  .topbar .brand-mark,
  .topbar.brand-dark .brand-mark,
  .brand-dark .brand-mark {
    display: block !important;
    width: 46px !important;
    height: 46px !important;
    min-width: 46px !important;
    min-height: 46px !important;
    max-width: 46px !important;
    max-height: 46px !important;
    flex: 0 0 46px !important;
    aspect-ratio: 1 / 1 !important;
    border-radius: 50% !important;
    border: 0 !important;
    outline: 0 !important;
    transform: none !important;
    box-shadow: none !important;
    background: linear-gradient(135deg, var(--gold), #f0dcc4) !important;
  }

  @media (min-width: 861px) {
    .topbar::after {
      display: none !important;
      content: none !important;
      width: 0 !important;
      height: 0 !important;
      min-width: 0 !important;
      flex-basis: 0 !important;
      border: 0 !important;
      box-shadow: none !important;
      background: none !important;
    }

    .topbar > .button {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 0 0 auto !important;
      width: auto !important;
      min-width: 158px !important;
      max-width: none !important;
      height: 44px !important;
      min-height: 44px !important;
      max-height: 44px !important;
      padding: 0 24px !important;
      margin-left: 18px !important;
      border-radius: 999px !important;
      font-size: 0.94rem !important;
      line-height: 1 !important;
      font-weight: 600 !important;
      letter-spacing: -0.01em !important;
      color: rgba(21,20,17,.84) !important;
      border: 1px solid rgba(126,101,68,.14) !important;
      background: linear-gradient(135deg, rgba(255,250,244,.64), rgba(234,224,210,.46)) !important;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.74),
        inset 0 -1px 0 rgba(126,101,68,.06),
        0 12px 24px rgba(31,26,20,.06) !important;
      backdrop-filter: blur(18px) saturate(1.04) !important;
      -webkit-backdrop-filter: blur(18px) saturate(1.04) !important;
    }

    .topbar > .button::before {
      display: none !important;
      content: none !important;
      width: 0 !important;
      height: 0 !important;
      background: none !important;
    }

    .hero {
      min-height: 88svh !important;
      padding-top: 104px !important;
      padding-bottom: 34px !important;
    }

    .hero-inner {
      min-height: calc(88svh - 138px) !important;
      align-content: center !important;
      gap: 22px !important;
    }

    .hero-stage {
      align-items: center !important;
    }

    .hero-text {
      margin-top: 18px !important;
    }

    .hero-actions {
      margin-top: 24px !important;
    }
  }
`;
document.head.appendChild(navigationLogoStyle);

document.querySelectorAll('.topbar > .button[href$="account.html"]').forEach((button) => {
  button.textContent = 'Личный кабинет';
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hasDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const mobileNavQuery = window.matchMedia("(max-width: 860px)");

const topbar = document.querySelector(".topbar");
if (topbar) {
  topbar.addEventListener("click", (event) => {
    if (!mobileNavQuery.matches) {
      return;
    }

    const rect = topbar.getBoundingClientRect();
    const burgerHitArea = 56;
    const clickedBurger = event.clientX >= rect.right - burgerHitArea;

    if (clickedBurger) {
      event.preventDefault();
      topbar.classList.toggle("is-menu-open");
    }
  });

  topbar.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => topbar.classList.remove("is-menu-open"));
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavQuery.matches || topbar.contains(event.target)) {
      return;
    }

    topbar.classList.remove("is-menu-open");
  });
}

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
