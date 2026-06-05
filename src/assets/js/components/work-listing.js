(function () {
  'use strict';

  let rafId = null;
  let onKeyDownHandler = null;
  let onResizeHandler = null;

  function init() {
    const section = document.querySelector('.wl-section');
    if (!section) return;

    const menuWrap   = document.querySelector('#wl-menu-wrap');
    const menu       = document.querySelector('#wl-menu');
    const thumbnail  = document.querySelector('#wl-thumbnail');
    const scrollHint = document.querySelector('#wl-scroll-hint');
    const counter    = document.querySelector('#wl-counter');

    if (!menu || !menuWrap) return;

    if (rafId) cancelAnimationFrame(rafId);
    if (onKeyDownHandler) document.removeEventListener('keydown', onKeyDownHandler);
    if (onResizeHandler) window.removeEventListener('resize', onResizeHandler);

    menu.querySelectorAll('.wl-clone').forEach(el => el.remove());
    if (thumbnail) thumbnail.querySelectorAll('.wl-clone').forEach(el => el.remove());

    const originalItems = Array.from(menu.querySelectorAll('li'));
    const originalThumbs = thumbnail ? Array.from(thumbnail.querySelectorAll('.wl-thumb-item')) : [];
    const totalOriginal = originalItems.length;

    if (totalOriginal === 0) return;

    const counterCur = counter ? counter.querySelector('.wl-counter__current') : null;
    const counterTotal = counter ? counter.querySelector('.wl-counter__total') : null;

    if (counterTotal) {
      counterTotal.textContent = totalOriginal < 10 ? '0' + totalOriginal : '' + totalOriginal;
    }

    const CLONE_SETS = 6;
    for (let s = 0; s < CLONE_SETS; s++) {
      originalItems.forEach((li, i) => {
        const clone = li.cloneNode(true);
        clone.dataset.origIndex = i;
        clone.classList.add('wl-clone');
        menu.appendChild(clone);
      });

      if (thumbnail) {
        originalThumbs.forEach((t, i) => {
          const clone = t.cloneNode(true);
          clone.dataset.origIndex = i;
          clone.classList.add('wl-clone');
          thumbnail.appendChild(clone);
        });
      }
    }

    const allItems = Array.from(menu.querySelectorAll('li'));
    const allThumbs = thumbnail ? Array.from(thumbnail.querySelectorAll('.wl-thumb-item')) : [];

    function syncThumbHeights() {
      if (!thumbnail || allThumbs.length === 0) return;
      allThumbs.forEach((thumb, i) => {
        const origIdx = i % totalOriginal;
        const menuItem = allItems[origIdx] || allItems[0];
        const h = menuItem.offsetHeight;
        thumb.style.height = h + 'px';
      });
    }

    let oneSetHeight = 0;
    function computeSetHeight() {
      let h = 0;
      for (let i = 0; i < totalOriginal; i++) {
        h += allItems[i].offsetHeight;
      }
      oneSetHeight = h;
      syncThumbHeights();
    }
    computeSetHeight();

    document.body.classList.add('is-work-listing');

    const initialOffset = 0;
    let scrollY = oneSetHeight - initialOffset;
    let targetScrollY = oneSetHeight - initialOffset;
    let hasScrolled = false;
    let isTouching = false;
    let touchStartY = 0;
    let touchScrollY = 0;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function updateCounter(index) {
      if (!counterCur) return;
      const wrapped = ((index % totalOriginal) + totalOriginal) % totalOriginal;
      const num = wrapped + 1;
      counterCur.textContent = num < 10 ? '0' + num : '' + num;
    }

    let closestAbsIdx = 0;
    function getActiveOrigIndex() {
      const wrapRect = menuWrap.getBoundingClientRect();
      const centerY  = wrapRect.top + wrapRect.height * 0.4;
      let closestIdx = 0;
      let closestDist = Infinity;

      allItems.forEach((li, i) => {
        const rect = li.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx  = i;
        }
      });

      closestAbsIdx = closestIdx;
      return closestIdx % totalOriginal;
    }

    let lastActiveOrig = -1;
    let lastClosestAbs = -1;
    let isMouseHovering = false;

    function syncActiveFromScroll() {
      const origIdx = getActiveOrigIndex();

      if (origIdx !== lastActiveOrig || closestAbsIdx !== lastClosestAbs) {
        lastActiveOrig = origIdx;
        lastClosestAbs = closestAbsIdx;
        updateCounter(origIdx);

        const isMobile = window.innerWidth <= 768;
        if (isMobile || !isMouseHovering) {
          allItems.forEach((li, i) => {
            li.classList.toggle('is-center', i === closestAbsIdx);
          });
          allThumbs.forEach((t, i) => {
            t.classList.toggle('is-hovered', i === closestAbsIdx);
          });
        }
      }
    }

    function wrapScroll() {
      if (scrollY >= oneSetHeight * 2 && oneSetHeight > 0) {
        scrollY -= oneSetHeight;
        targetScrollY -= oneSetHeight;
      }
      if (scrollY < oneSetHeight && oneSetHeight > 0) {
        scrollY += oneSetHeight;
        targetScrollY += oneSetHeight;
      }
    }

    function animate() {
      if (!document.body.contains(menuWrap)) return;

      scrollY = lerp(scrollY, targetScrollY, 0.1);

      if (Math.abs(scrollY - targetScrollY) < 0.5) {
        scrollY = targetScrollY;
      }

      wrapScroll();

      menu.style.transform = `translateY(${-scrollY}px)`;
      if (thumbnail) {
        thumbnail.style.transform = `translateY(${-scrollY}px)`;
      }

      syncActiveFromScroll();
      rafId = requestAnimationFrame(animate);
    }

    function onWheel(e) {
      e.preventDefault();
      if (!hasScrolled) {
        hasScrolled = true;
        if (scrollHint) scrollHint.classList.add('is-hidden');
      }
      targetScrollY += e.deltaY * 0.8;
    }

    function onTouchStart(e) {
      isTouching = true;
      touchStartY = e.touches[0].clientY;
      touchScrollY = targetScrollY;
    }

    function onTouchMove(e) {
      if (!isTouching) return;
      e.preventDefault();
      if (!hasScrolled) {
        hasScrolled = true;
        if (scrollHint) scrollHint.classList.add('is-hidden');
      }
      const deltaY = touchStartY - e.touches[0].clientY;
      targetScrollY = touchScrollY + deltaY;
    }

    function onTouchEnd() {
      isTouching = false;
      if (window.innerWidth <= 768 && allItems.length > 0) {
        const itemH = allItems[0].offsetHeight;
        targetScrollY = Math.round(targetScrollY / itemH) * itemH;
      }
    }

    function onItemMouseEnter(e) {
      if (window.innerWidth <= 768) return;
      isMouseHovering = true;

      const li = e.currentTarget;
      const absIdx = allItems.indexOf(li);
      const origIdx = parseInt(li.dataset.origIndex || li.dataset.index, 10);

      allThumbs.forEach((t, i) => {
        t.classList.toggle('is-hovered', i === absIdx);
      });
      updateCounter(origIdx);
    }

    function onItemMouseLeave() {
      if (window.innerWidth <= 768) return;
      isMouseHovering = false;
    }

    onKeyDownHandler = function (e) {
      if (!document.body.contains(menuWrap)) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!hasScrolled) {
          hasScrolled = true;
          if (scrollHint) scrollHint.classList.add('is-hidden');
        }
        const itemHeight = allItems[0] ? allItems[0].offsetHeight : 100;
        if (e.key === 'ArrowDown') {
          targetScrollY += itemHeight;
        } else {
          targetScrollY -= itemHeight;
        }
      }
    };

    onResizeHandler = function () {
      if (!document.body.contains(menuWrap)) return;
      computeSetHeight();
    };

    function playIntro() {
      if (!document.body.contains(menuWrap)) return;
      requestAnimationFrame(() => {
        menu.style.transform = `translateY(${-scrollY}px)`;
        if (thumbnail) thumbnail.style.transform = `translateY(${-scrollY}px)`;

        const visibleCount = Math.min(allItems.length, totalOriginal * 3);
        for (let i = 0; i < visibleCount; i++) {
          const li = allItems[i];
          const delay = 0.15 + (i % totalOriginal) * 0.08;
          li.style.transition = `clip-path 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`;
          li.style.clipPath = 'inset(0% 0 0 0)';
        }
        for (let i = visibleCount; i < allItems.length; i++) {
          allItems[i].style.clipPath = 'inset(0% 0 0 0)';
        }

        const visibleThumbCount = Math.min(allThumbs.length, totalOriginal * 3);
        for (let i = 0; i < visibleThumbCount; i++) {
          const t = allThumbs[i];
          const delay = 0.2 + (i % totalOriginal) * 0.08;
          t.style.transition = `clip-path 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`;
          t.style.clipPath = 'inset(0% 0 0 0)';
        }
        for (let i = visibleThumbCount; i < allThumbs.length; i++) {
          allThumbs[i].style.clipPath = 'inset(0% 0 0 0)';
        }

        setTimeout(() => {
          if (!document.body.contains(menuWrap)) return;
          menu.classList.remove('is-intro');
          if (thumbnail) thumbnail.classList.remove('is-intro');

          allItems.forEach(li => {
            li.style.transition = '';
            li.style.clipPath = '';
          });
          allThumbs.forEach(t => {
            t.style.transition = '';
            t.style.clipPath = '';
          });
        }, 1200);
      });
    }

    menuWrap.addEventListener('wheel', onWheel, { passive: false });
    menuWrap.addEventListener('touchstart', onTouchStart, { passive: true });
    menuWrap.addEventListener('touchmove', onTouchMove, { passive: false });
    menuWrap.addEventListener('touchend', onTouchEnd, { passive: true });

    allItems.forEach(li => {
      li.addEventListener('mouseenter', onItemMouseEnter);
      li.addEventListener('mouseleave', onItemMouseLeave);
    });

    document.addEventListener('keydown', onKeyDownHandler);
    window.addEventListener('resize', onResizeHandler);

    rafId = requestAnimationFrame(animate);

    setTimeout(playIntro, 300);
    updateCounter(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('page:load', init);

})();
