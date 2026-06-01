/* ==========================================================================
   Work Single — Scroll Animations & Interactions
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    const page     = document.querySelector('.ws-page');
    if (!page) return;

    const wsHero    = page.querySelector('.ws-hero');
    const heroTitle = page.querySelector('.ws-hero__title');
    const heroMeta  = page.querySelector('.ws-hero__meta');
    const heroImg   = page.querySelector('.ws-image--hero img');
    const scrollHint = page.querySelector('.ws-hero__scroll');

    // ── 1. Hero reveal (title clip-path + meta fade in) ───────────────────
    if (heroTitle) {
      setTimeout(() => heroTitle.classList.add('is-revealed'), 200);
    }
    if (heroMeta) {
      setTimeout(() => heroMeta.classList.add('is-revealed'), 400);
    }

    // ── 2. Scroll-driven active classes (scroll hint + metadata fade out) ──
    function handleScroll(scrollY) {
      // Hide scroll hint
      if (scrollHint) {
        if (scrollY > 60) {
          scrollHint.classList.add('is-hidden');
        } else {
          scrollHint.classList.remove('is-hidden');
        }
      }

      // Hide metadata
      if (heroMeta) {
        if (scrollY > 150) {
          heroMeta.classList.add('is-hidden');
        } else {
          heroMeta.classList.remove('is-hidden');
        }
      }
    }

    // Use Locomotive Scroll if available, else fallback to native scroll
    if (window.locoScroll) {
      window.locoScroll.on('scroll', ({ scroll }) => {
        handleScroll(scroll.y);
      });
    } else {
      document.addEventListener('scroll', () => {
        handleScroll(window.scrollY);
      }, { passive: true });
    }

    // ── 4. Detail items: stagger reveal on scroll ─────────────────────────
    const detailItems = page.querySelectorAll('.ws-detail__item');
    detailItems.forEach((item, i) => {
      item.style.setProperty('--item-delay', i * 80);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    detailItems.forEach(item => revealObserver.observe(item));

    // ── 5. Next project name: clip-path reveal on scroll ──────────────────
    const nextName = page.querySelector('.ws-next__name');
    if (nextName) {
      const nextObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              nextName.classList.add('is-visible');
              nextObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      nextObserver.observe(nextName);
    }

    // ── 6. Sub-image parallax (desktop only) ──────────────────────────────
    if (window.innerWidth > 768) {
      page.querySelectorAll('.ws-sub-image img').forEach(img => {
        img.setAttribute('data-scroll', '');
        img.setAttribute('data-scroll-speed', '-2');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('page:load', init);

})();
