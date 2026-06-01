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

    // ── 1. Hero reveal (scroll -> meta -> title) ──────────────────
    // Stagger: scroll hint first, then meta, then title last
    function triggerAnimations() {
      if (scrollHint) {
        setTimeout(() => {
          scrollHint.offsetHeight; // force reflow so browser sees initial state
          scrollHint.classList.add('is-revealed');
        }, 100);
      }
      if (heroMeta) {
        setTimeout(() => {
          heroMeta.offsetHeight;
          heroMeta.classList.add('is-revealed');
        }, 300);
      }
      if (heroTitle) {
        setTimeout(() => {
          heroTitle.offsetHeight;
          heroTitle.classList.add('is-revealed');
        }, 500);
      }
    }

    // Detect if any overlay (preloader or page-transition) is covering the screen.
    // If so, wait for it to finish before triggering animations.
    function isOverlayActive() {
      const overlay = document.getElementById('page-transition-overlay');
      const hasPreloader = document.body.classList.contains('preloader-active');
      const hasTransition = overlay && (overlay.classList.contains('is-leaving') || overlay.classList.contains('is-entering') || overlay.classList.contains('is-preload-ready'));
      return hasPreloader || hasTransition;
    }

    function checkAndTrigger() {
      if (isOverlayActive()) {
        const checkInterval = setInterval(() => {
          if (!isOverlayActive()) {
            clearInterval(checkInterval);
            triggerAnimations();
          }
        }, 100);
      } else {
        triggerAnimations();
      }
    }

    // Wait for fonts to load so huge text doesn't skip transition due to FOIT
    if ('fonts' in document) {
      document.fonts.ready.then(checkAndTrigger);
    } else {
      checkAndTrigger();
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
