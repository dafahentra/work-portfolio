(function () {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const menuOverlay = document.getElementById('fullscreenMenu');
  const navbar = document.querySelector('.navbar-custom');

  if (!menuOverlay) return;

  document.body.appendChild(menuOverlay);
  if (navbar) {
    document.body.insertBefore(navbar, document.body.firstChild);
  }

  const splitTextIntoSpans = (element) => {
    const text = element.textContent.trim();
    element.innerHTML = '';
    [...text].forEach((char, index) => {
      if (char === ' ') {
        const space = document.createElement('span');
        space.style.display = 'inline-block';
        space.innerHTML = '&nbsp;';
        element.appendChild(space);
        return;
      }
      const charWrapper = document.createElement('span');
      charWrapper.className = 'char-wrapper';

      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char;
      charSpan.style.setProperty('--char-index', index);

      const charHoverSpan = document.createElement('span');
      charHoverSpan.className = 'char-hover';
      charHoverSpan.textContent = char;
      charHoverSpan.style.setProperty('--char-index', index);

      charWrapper.appendChild(charSpan);
      charWrapper.appendChild(charHoverSpan);
      element.appendChild(charWrapper);
    });
  };

  const splitNavLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link .nav-text');
  splitNavLinks.forEach(splitTextIntoSpans);

  const socialLinks = menuOverlay.querySelectorAll('.meta-links .meta-link');
  socialLinks.forEach(splitTextIntoSpans);

  const emailLink = menuOverlay.querySelector('.meta-email');
  if (emailLink) {
    splitTextIntoSpans(emailLink);
  }

  let closingTimeout = null;

  function openMenu() {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
      document.documentElement.classList.remove('menu-closing');
      document.body.classList.remove('menu-closing');
      closingTimeout = null;
    }

    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');

    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('data-state', 'opened');
      menuToggleBtn.setAttribute('aria-expanded', 'true');
    }

    if (window.locoScroll) {
      window.locoScroll.stop();
    }
  }

  function closeMenu() {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
    }

    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');

    document.documentElement.classList.add('menu-closing');
    document.body.classList.add('menu-closing');

    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('data-state', 'closed');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (window.locoScroll) {
      window.locoScroll.start();
    }

    closingTimeout = setTimeout(() => {
      document.documentElement.classList.remove('menu-closing');
      document.body.classList.remove('menu-closing');
      closingTimeout = null;
    }, 1200);
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (document.body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  const navLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function applyNavActiveState() {
    const path = window.location.pathname;

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href') || '';

      let pageName = path.split('/').pop().replace('.html', '');
      if (!pageName || pageName === '') pageName = 'index';

      let linkName = linkHref.split('/').pop().replace('.html', '');
      if (!linkName || linkName === '') linkName = 'index';

      if (
        pageName === linkName ||
        (pageName === 'index' && linkName === 'home') ||
        (pageName === 'home' && linkName === 'index')
      ) {
        link.classList.add('active');
      } else if (path.includes('/work/') && linkName === 'work-listing') {
        link.classList.add('active');
      }
    });
  }

  applyNavActiveState();

  document.addEventListener('page:load', applyNavActiveState);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  menuOverlay.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
  menuOverlay.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

  const clockElement = menuOverlay.querySelector('.time-clock');

  function updateTime() {
    if (!clockElement) return;

    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const timeString = formatter.format(new Date());
      clockElement.textContent = `${timeString} WIB`;
    } catch (e) {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const jakartaTime = new Date(utc + (3600000 * 7));
      const hours = String(jakartaTime.getHours()).padStart(2, '0');
      const minutes = String(jakartaTime.getMinutes()).padStart(2, '0');
      const seconds = String(jakartaTime.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

})();
