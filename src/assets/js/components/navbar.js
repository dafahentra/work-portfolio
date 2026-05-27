(function () {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const menuOverlay = document.getElementById('fullscreenMenu');
  const navbar = document.querySelector('.navbar-custom');

  if (!menuOverlay) return;

  // Move overlay and navbar to body to escape Locomotive Scroll translations
  document.body.appendChild(menuOverlay);
  if (navbar) {
    document.body.insertBefore(navbar, document.body.firstChild);
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

    // Stop scroll container if Locomotive Scroll is active
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

    // Restart scroll container if Locomotive Scroll is active
    if (window.locoScroll) {
      window.locoScroll.start();
    }

    closingTimeout = setTimeout(() => {
      document.documentElement.classList.remove('menu-closing');
      document.body.classList.remove('menu-closing');
      closingTimeout = null;
    }, 800); // 800ms matches the close animation duration
  }

  // Toggle button actions
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

  // Close menu when a navigation link is clicked
  const navLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  // Prevent scroll propagation on overlay touch/wheel
  menuOverlay.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
  menuOverlay.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

  // --- Dynamic Jakarta Local Time ---
  const clockElement = menuOverlay.querySelector('.time-clock');
  
  function updateTime() {
    if (!clockElement) return;
    
    // Get current time in Jakarta (UTC + 7)
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
      // Fallback if Intl.DateTimeFormat is not supported/fails
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const jakartaTime = new Date(utc + (3600000 * 7));
      const hours = String(jakartaTime.getHours()).padStart(2, '0');
      const minutes = String(jakartaTime.getMinutes()).padStart(2, '0');
      const seconds = String(jakartaTime.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  }

  // Initial call and set interval
  updateTime();
  setInterval(updateTime, 1000);

})();
