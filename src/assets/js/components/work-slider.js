(function () {
  'use strict';

  class WorkSlider {
    constructor(container, list) {
      this.container     = container;
      this.list          = list;
      this.currentPos    = 0;
      this.targetPos     = 0;
      this.initialPos    = 0;
      this.offsetSpeed   = 5000;
      this.lerpSpeed     = 0.1;
      this.isDragging    = false;
      this.hasMoved      = false;
      this.locked        = false;

      this._bindEvents();
      this._animate();

      const setPadding = () => {
        const containerEl = document.querySelector('#recent-work').previousElementSibling;
        if (containerEl) {
          const subtitle = containerEl.querySelector('h2');
          const rect = subtitle.getBoundingClientRect();
          this.list.style.paddingLeft = rect.left + 'px';
        }
      };
      setPadding();
      window.addEventListener('resize', setPadding);
    }

    _bindEvents() {
      this.container.addEventListener('mousedown', this._onHold.bind(this));
      window.addEventListener('mouseup',           this._onRelease.bind(this));
      window.addEventListener('mousemove',         this._onMouseMove.bind(this));

      this.container.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
      window.addEventListener('touchend',           this._onTouchEnd.bind(this));
      window.addEventListener('touchmove',          this._onTouchMove.bind(this), { passive: false });
    }

    _onHold(e) {
      if (this.locked) return;
      if (e.target.closest('.close-button-wrapper, .btn-panel-link, .btn-view')) return;

      this.isDragging = true;
      this.hasMoved   = false;

      const matrix    = new WebKitCSSMatrix(window.getComputedStyle(this.list).transform);
      this.initialPos = matrix.m41 || 0;
      this._dragStartX = e.clientX;

      this.list.classList.add('hold');
    }

    _onMouseMove(e) {
      if (!this.isDragging || this.locked) return;
      const diff = (e.clientX - this._dragStartX) * -1;
      if (Math.abs(diff) > 5) this.hasMoved = true;

      this.targetPos = Math.round(
        (this.initialPos - (this.offsetSpeed * (diff / document.body.clientWidth))) * 100
      ) / 100;
    }

    _onRelease() {
      this.isDragging = false;
      this.list.classList.remove('hold');
      requestAnimationFrame(() => requestAnimationFrame(() => { this.hasMoved = false; }));
    }

    _onTouchStart(e) {
      if (this.locked) return;
      this.isDragging  = true;
      this.hasMoved    = false;
      this._dragStartX = e.touches[0].clientX;
      const matrix     = new WebKitCSSMatrix(window.getComputedStyle(this.list).transform);
      this.initialPos  = matrix.m41 || 0;
      this.list.classList.add('hold');
    }

    _onTouchMove(e) {
      if (!this.isDragging || this.locked) return;
      const diff = (e.touches[0].clientX - this._dragStartX) * -1;
      if (Math.abs(diff) > 5) { this.hasMoved = true; e.preventDefault(); }
      this.targetPos = Math.round(
        (this.initialPos - (this.offsetSpeed * 0.5 * (diff / document.body.clientWidth))) * 100
      ) / 100;
    }

    _onTouchEnd() {
      this.isDragging = false;
      this.list.classList.remove('hold');
      requestAnimationFrame(() => requestAnimationFrame(() => { this.hasMoved = false; }));
    }

    _clamp() {
      const endPoint = this.list.offsetWidth - document.body.clientWidth;
      const limit    = endPoint < 0 ? this.list.offsetWidth : endPoint;
      if (this.targetPos > 0)     this.targetPos = 0;
      if (this.targetPos < -limit) this.targetPos = -limit;
    }

    _lerp(a, b, t) { return a * (1 - t) + b * t; }

    _animate() {
      if (!document.body.contains(this.container)) return;
      if (!this.locked) this._clamp();

      this.currentPos = this._lerp(this.currentPos, this.targetPos, this.lerpSpeed);
      this.list.style.transform = `translate3d(${Math.round(this.currentPos * 100) / 100}px, 0px, 0px)`;

      requestAnimationFrame(() => this._animate());
    }

    scrollToItem(cardEl) {
      const listRect = this.list.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const trueOffsetLeft = cardRect.left - listRect.left;
      this.targetPos = -(trueOffsetLeft - (window.innerWidth / 4) + window.innerWidth / 10);
      this.locked = true;
      this.container.classList.add('disabled');
    }

    unlock() {
      this.locked = false;
      this.container.classList.remove('disabled');
    }
  }


  class WorkItems {
    constructor(slider) {
      this.slider        = slider;
      this.currentActive = -1;
      this.items         = [];
      this.panel         = document.getElementById('workDetailsPanel');
      this.closeBtn      = document.getElementById('workPanelClose');

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._close();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.currentActive >= 0) this._close();
      });
    }

    register(liEl, index) {
      this.items.push({ el: liEl, index });

      const handleExpand = (e) => {
        e.stopPropagation();
        if (this.slider.hasMoved) return;
        this._toggle(index, liEl);
      };

      const btnView = liEl.querySelector('.btn-view');
      if (btnView) {
        btnView.addEventListener('click', handleExpand);
      }

      const imgWrapper = liEl.querySelector('.img-wrapper');
      if (imgWrapper) {
        imgWrapper.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            handleExpand(e);
          }
        });
      }
    }

    _toggle(index, liEl) {
      this.currentActive === index ? this._close() : this._open(index, liEl);
    }

    _open(index, liEl) {
      this.currentActive = index;
      const cardEl = liEl.querySelector('.list-item');

      this.slider.scrollToItem(cardEl);

      this.items.forEach(({ el, index: i }) => {
        const card = el.querySelector('.list-item');
        const top  = el.querySelector('.text-top-wrapper');
        const bot  = el.querySelector('.text-wrapper');

        card.classList.remove('active', 'ambient');
        card.classList.add(i === index ? 'active' : 'ambient');

        if (top) top.classList.add('hidden');
        if (bot) bot.classList.add('hidden');
      });

      if (cardEl && this.panel) {
        this._populatePanel(cardEl, index);
        this.panel.classList.add('is-visible');
        this.panel.setAttribute('aria-hidden', 'false');
      }
    }

    _close() {
      this.currentActive = -1;

      this.items.forEach(({ el }) => {
        const card = el.querySelector('.list-item');
        const top  = el.querySelector('.text-top-wrapper');
        const bot  = el.querySelector('.text-wrapper');
        if (card) card.classList.remove('active', 'ambient');
        if (top)  top.classList.remove('hidden');
        if (bot)  bot.classList.remove('hidden');
      });

      if (this.panel) {
        this.panel.classList.remove('is-visible');
        this.panel.setAttribute('aria-hidden', 'true');
      }

      this.slider.unlock();
    }

    _populatePanel(cardEl, index) {
      const title       = cardEl.dataset.title       || '';
      const summary     = cardEl.dataset.summary     || '';
      const description = cardEl.dataset.description || '';
      const padded      = (index + 1) < 10 ? '0' + (index + 1) : String(index + 1);

      let roles = [], links = [];
      try { roles = JSON.parse(cardEl.dataset.roles || '[]'); } catch (_) {}
      try { links = JSON.parse(cardEl.dataset.links || '[]'); } catch (_) {}

      const get = (sel) => this.panel.querySelector(sel);

      const panelIndex   = get('.panel-index');
      const captionEl    = get('.caption');
      if (panelIndex) panelIndex.textContent = padded;
      if (captionEl)  captionEl.textContent  = summary;

      const panelTitle = get('.panel-title');
      if (panelTitle) panelTitle.textContent = title;

      const panelDesc      = get('.panel-description');
      const panelRolesList = get('.panel-roles-list');
      const linksEl        = get('.links');

      if (panelDesc) panelDesc.textContent = description;

      if (panelRolesList) {
        panelRolesList.innerHTML = roles
          .map(r => `<li>+ ${r}</li>`)
          .join('');
      }

      if (linksEl) {
        linksEl.innerHTML = links
          .map(l => `<a href="${l.url || l.link || '#'}" target="_blank" class="btn-panel-link link-body">${l.text}</a>`)
          .join('');
      }
    }
  }


  function initEntranceAnimations(listItems) {
    const section = document.getElementById('recent-work');
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      listItems.forEach((li, i) => {
        li.style.transitionDelay = `${i * 60}ms`;
        li.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          listItems.forEach((li, i) => {
            setTimeout(() => li.classList.add('is-visible'), i * 80);
          });
          observer.disconnect();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }


  function init() {
    const container = document.getElementById('workSliderContainer');
    const list      = document.getElementById('workList');
    if (!container || !list) return;

    const slider    = new WorkSlider(container, list);
    const workItems = new WorkItems(slider);

    const listItems = Array.from(list.querySelectorAll('li'));
    listItems.forEach((li, i) => workItems.register(li, i));

    initEntranceAnimations(listItems);
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('page:load', init);

})();
