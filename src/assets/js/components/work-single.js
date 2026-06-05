import { webGLStage } from './work-single-webgl';

(function () {
  'use strict';

  function init() {
    const page = document.querySelector('.ws-page');
    if (!page) {
      webGLStage.destroy();
      return;
    }

    webGLStage.init();

    const wsHero    = page.querySelector('.ws-hero');
    const heroTitle = page.querySelector('.ws-hero__title');
    const heroMeta  = page.querySelector('.ws-hero__meta');
    const heroImg   = page.querySelector('.ws-image--hero img');
    const scrollHint = page.querySelector('.ws-hero__scroll');

    function triggerAnimations() {
      if (scrollHint) {
        setTimeout(() => {
          scrollHint.offsetHeight;
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

    if ('fonts' in document) {
      document.fonts.ready.then(checkAndTrigger);
    } else {
      checkAndTrigger();
    }

    function handleScroll(scrollY) {
      if (scrollHint) {
        if (scrollY > 60) {
          scrollHint.classList.add('is-hidden');
        } else {
          scrollHint.classList.remove('is-hidden');
        }
      }

      if (heroMeta) {
        if (scrollY > 150) {
          heroMeta.classList.add('is-hidden');
        } else {
          heroMeta.classList.remove('is-hidden');
        }
      }
    }

    if (window.locoScroll) {
      window.locoScroll.on('scroll', ({ scroll }) => {
        handleScroll(scroll.y);
      });
    } else {
      document.addEventListener('scroll', () => {
        handleScroll(window.scrollY);
      }, { passive: true });
    }

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
