/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"theme": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([3,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/assets/js/components/contact.js":
/*!*********************************************!*\
  !*** ./src/assets/js/components/contact.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Contact form handler - Fixed for Netlify Functions
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Real-time validation helper
    const validateField = (field) => {
      if (!field.required && field.value.trim() === '' && field.name !== 'name' && field.name !== 'email' && field.name !== 'phone' && field.name !== 'subject') return true;

      let isValid = true;
      const value = field.value.trim();

      if (field.name === 'name' || field.name === 'subject') {
        isValid = value.length > 0;
      } else if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = value.length > 0 && emailRegex.test(value);
      } else if (field.name === 'phone') {
        const phoneDigits = value.replace(/\D/g, '');
        isValid = value.length > 0 && phoneDigits.length >= 10 && phoneDigits.length <= 15;
      }

      if (isValid) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
      return isValid;
    };

    // Attach real-time listeners to inputs
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        phone: this.phone.value.trim(),
        subject: this.subject ? this.subject.value.trim() : '',
        about: this.about.value.trim()
      };

      let isFormValid = true;
      formInputs.forEach(input => {
        if (input.name === 'name' || input.name === 'email' || input.name === 'phone' || input.name === 'subject') {
          if (!validateField(input)) {
            isFormValid = false;
          }
        }
      });

      // Stop submission if validation fails
      if (!isFormValid) {
        return;
      }

      // Disable submit button while sending
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Encode form data for Netlify Forms
        const encode = (data) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        };

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            'name': formData.name,
            'email': formData.email,
            'phone': formData.phone,
            'subject': formData.subject,
            'about': formData.about
          })
        });

        if (res.ok) {
          // Success notification
          alert('Message sent successfully! Thank you for reaching out.');
          this.reset();
        } else {
          // Error notification
          alert('Failed to send message. Please try again later.');
          console.error('Server error:', res.status);
        }
      } catch (err) {
        // Network or other errors
        console.error('Request error:', err);
        alert('Error sending message: ' + err.message + '\nPlease check your internet connection and try again.');
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

// Export for use in other modules if needed
if ( true && module.exports) {
  module.exports = initContactForm;
}

/***/ }),

/***/ "./src/assets/js/components/dark-mode.js":
/*!***********************************************!*\
  !*** ./src/assets/js/components/dark-mode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
    // Add no-transition class to HTML/body immediately to prevent transition flash on load
    document.documentElement.classList.add('no-transition');

    const modeToggleBtns = document.querySelectorAll('.btn-toggle-mode');
    const LIGHT_MODE = 'light';
    const DARK_MODE = 'dark';
    const MODE = 'mode';

    /**
     * On page load, check for localStorage value of mode.
     * If not set, set it to user preference (if dark mode) or light mode.
     */
    function init() {
        const mode = getMode();

        if (!mode) {
            setMode({ isInitial: true });
        } else {
            setMode({ type: mode, isInitial: true });
        }

        const clearNoTransition = () => {
            setTimeout(() => {
                document.documentElement.classList.remove('no-transition');
            }, 50);
        };

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', clearNoTransition);
        } else {
            clearNoTransition();
        }
    }

    /**
     * Set our mode
     * @param {type} String
     * @param {isInitial} Boolean
     */
    function setMode({ type = LIGHT_MODE, isInitial = false }) {
        localStorage.setItem(MODE, type);
        setHTMLAttrMode({ type });
        updateButtonIcons({ type, animate: !isInitial });
    }

    /**
     * Set HTML data attribute value for our mode
     * @param {type} String
     */
    function setHTMLAttrMode({ type }) {
        const html = document.querySelector('html');
        if (html) {
            html.setAttribute('data-mode', type);
            // Sinkronisasi dengan Bootstrap theme untuk preloader
            html.setAttribute('data-bs-theme', type);
        }
    }

    /**
     * Update button icons based on current mode with micro-animations
     * @param {type} String
     * @param {animate} Boolean
     */
    function updateButtonIcons({ type, animate = false }) {
        modeToggleBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (!animate) {
                    if (type === DARK_MODE) {
                        icon.className = 'ri-moon-line';
                        icon.style.transform = 'rotate(90deg)';
                    } else {
                        icon.className = 'ri-sun-line';
                        icon.style.transform = '';
                    }
                    icon.style.opacity = '';
                    return;
                }

                // Apply rotation and scale transition for micro-animation with elastic bounce
                icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
                icon.style.transform = 'rotate(180deg) scale(0)';
                icon.style.opacity = '0';

                setTimeout(() => {
                    if (type === DARK_MODE) {
                        icon.className = 'ri-moon-line';
                        icon.style.transform = 'rotate(450deg) scale(1)';
                    } else {
                        icon.className = 'ri-sun-line';
                        icon.style.transform = 'rotate(360deg) scale(1)';
                    }
                    icon.style.opacity = '1';
                }, 150);
            }
        });
    }

    /**
     * Get localStorage value for our mode
     * @returns String
     */
    function getMode() {
        const currentMode = localStorage.getItem(MODE);

        if (currentMode) {
            return currentMode;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_MODE;
        }
        
        return LIGHT_MODE;
    }

    let isTransitioning = false;

    /**
     * Toggle our mode via button in navbar
     * @param {event} Event
     * @param {HTMLElement} btn
     */
    function toggleMode(event, btn) {
        if (isTransitioning) return;

        const currentMode = getMode();
        const targetMode = currentMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
        
        const performToggle = () => {
            if (targetMode === DARK_MODE) {
                setMode({ type: DARK_MODE });
            } else {
                setMode({});
            }
        };

        // If event is present and browser supports View Transitions API
        if (event && document.startViewTransition) {
            isTransitioning = true;

            // Dapatkan titik koordinat dari event klik (atau fallback ke pusat button jika event tidak ada)
            let x = event ? event.clientX : undefined;
            let y = event ? event.clientY : undefined;

            if ((x === undefined || y === undefined) && btn) {
                const rect = btn.getBoundingClientRect();
                x = rect.left + rect.width / 2;
                y = rect.top + rect.height / 2;
            }

            if (x === undefined || y === undefined) {
                x = window.innerWidth / 2;
                y = window.innerHeight / 2;
            }

            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            // Temporarily disable standard CSS transitions during the View Transition to avoid interference
            document.documentElement.classList.add('no-transition');

            const transition = document.startViewTransition(() => {
                performToggle();
            });

            transition.ready.then(() => {
                const clipPath = [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ];

                document.documentElement.animate(
                    {
                        clipPath: clipPath
                    },
                    {
                        duration: 400, // Dipercepat menjadi 400ms agar terasa lebih cepat dan mulus
                        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        pseudoElement: '::view-transition-new(root)'
                    }
                );
            });

            transition.finished
                .catch(() => {}) // Mencegah unhandled promise rejection jika transisi diinterupsi/dilewati
                .finally(() => {
                    // Re-enable normal CSS transitions
                    document.documentElement.classList.remove('no-transition');
                    isTransitioning = false;
                });
        } else {
            // Fallback for older browsers
            performToggle();
        }
    }

    if (modeToggleBtns) {
        modeToggleBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMode(e, btn);
            });
        });
    }

    init();
})();

/***/ }),

/***/ "./src/assets/js/components/locomotive-scroll.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/components/locomotive-scroll.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);



(function () {

  const scrollContainer = document.querySelector('[data-scroll-container]');

  const scroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__["default"]({
    el: scrollContainer,
    smooth: true,
    offset: ['17.5%'],
    repeat: true,
    class: 'animate',
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  window.locoScroll = scroll;

  window.addEventListener('resize', () => {
    scroll.update();
  });

  imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(scrollContainer, { background: true }, () => {
    scroll.update();
  });

})();

/***/ }),

/***/ "./src/assets/js/components/navbar.js":
/*!********************************************!*\
  !*** ./src/assets/js/components/navbar.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  // Helper to split text into staggered spans
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

  // Staggered split text effect for fullscreen menu links
  const splitNavLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link .nav-text');
  splitNavLinks.forEach(splitTextIntoSpans);

  // Staggered split text effect for socials
  const socialLinks = menuOverlay.querySelectorAll('.meta-links .meta-link');
  socialLinks.forEach(splitTextIntoSpans);

  // Staggered split text effect for email
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
    }, 1200); // 1200ms matches the close animation duration (0.4s delay + 0.8s wipe)
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

  // --- Active Page Detection and Highlighting ---
  const currentPath = window.location.pathname;
  let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (currentPage === '' || currentPage === 'index.html') {
    currentPage = 'home.html';
  }
  
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref && (linkHref.includes(currentPage) || (currentPage === 'home.html' && linkHref.includes('index.html')))) {
      link.classList.add('active');
    }
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


/***/ }),

/***/ "./src/assets/js/components/page-transition.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/components/page-transition.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_2__);
/**
 * PJAX Page Transition Controller
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW IT WORKS (zero browser loading spinner):
 *
 *  CLICK FLOW:
 *    1. User clicks a link → intercept, call playLeave()
 *    2. Strip animation covers the viewport (~770ms)
 *    3. Simultaneously, fetch() the new page HTML in background
 *    4. After strips fully cover → swap DOM content (body innerHTML swap)
 *       + history.pushState() → URL changes, NO browser navigation
 *    5. Re-initialize all JS components on the new content
 *    6. Strip animation reveals new page
 *
 *  RESULT: Browser never navigates → zero loading spinner, zero flash.
 *
 *  FALLBACK:
 *    If fetch fails (offline, error) → fall back to window.location.href.
 *
 *  BACK/FORWARD:
 *    Handled via popstate event — same PJAX swap.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */





(function () {
    'use strict';

    // ── Config ──────────────────────────────────────────────────────────────
    const STRIPS      = 5;
    const STAGGER     = 55;   // ms between each strip
    const DURATION    = 550;  // ms per strip animation
    const LEAVE_TOTAL = DURATION + (STRIPS - 1) * STAGGER;  // ~770ms
    const ENTER_TOTAL = DURATION + (STRIPS - 1) * STAGGER;

    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    let isAnimating = false;
    const prefetched = new Set();

    // ── Utility ─────────────────────────────────────────────────────────────
    function isInternalLink(anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return false;
        if (
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:') ||
            anchor.getAttribute('target') === '_blank'
        ) return false;

        try {
            const url = new URL(href, window.location.href);
            if (url.pathname === window.location.pathname && !url.search) return false;
            return url.hostname === window.location.hostname;
        } catch {
            return true;
        }
    }

    function resolveUrl(href) {
        return new URL(href, window.location.href).href;
    }

    // ── Prefetch ────────────────────────────────────────────────────────────
    function prefetchUrl(href) {
        const full = resolveUrl(href);
        if (prefetched.has(full)) return;
        prefetched.add(full);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = full;
        link.as = 'document';
        document.head.appendChild(link);
    }

    // ── Strip Animations ────────────────────────────────────────────────────
    function playLeaveAnim() {
        overlay.classList.remove('is-entering');
        overlay.offsetHeight; // force reflow
        overlay.classList.add('is-leaving');
    }

    function playEnterAnim() {
        // Force overlay visible for the entire state swap.
        // Without this, the browser renders one frame between
        // removing 'is-leaving' and adding 'is-entering' where
        // the overlay has neither class → visibility:hidden → content flash.
        overlay.style.visibility = 'visible';

        // Swap classes in the SAME frame — no reflow gap.
        // Strips are already at translateY(0%) from the leaving animation;
        // is-entering keyframe starts from translateY(0%) so it's seamless.
        overlay.classList.remove('is-leaving');
        overlay.classList.add('is-entering');

        document.body.classList.add('pt-content-reveal');

        setTimeout(function () {
            overlay.classList.remove('is-entering');
            overlay.style.visibility = ''; // Let CSS control visibility again
            document.body.classList.remove('pt-content-reveal');
            isAnimating = false;
        }, ENTER_TOTAL + 150);
    }

    // ── DOM Swap ─────────────────────────────────────────────────────────────
    //
    // KEY INSIGHT: Only swap [data-scroll-container], never body.innerHTML.
    //
    // After the first page load, navbar.js moves .navbar-custom and
    // #fullscreenMenu OUT of the scroll container and into direct body children.
    // The #preloader and #page-transition-overlay are also direct body children
    // (never inside the scroll container).
    //
    // So the actual live DOM layout is:
    //   body
    //     ├── .navbar-custom          (moved out by navbar.js)
    //     ├── #fullscreenMenu         (moved out by navbar.js)
    //     ├── #preloader              (original position)
    //     ├── #page-transition-overlay (original position) ← OVERLAY STAYS HERE
    //     └── [data-scroll-container] ← ONLY THIS IS SWAPPED
    //
    // By replacing just the scroll container, the overlay is NEVER detached
    // from the DOM — eliminating the 1-frame flash of page content.
    //
    function swapPage(html, url) {
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');

        // Update <title>
        document.title = newDoc.title;

        // Update meta description
        const newMeta = newDoc.querySelector('meta[name="description"]');
        const oldMeta = document.querySelector('meta[name="description"]');
        if (newMeta && oldMeta) oldMeta.setAttribute('content', newMeta.getAttribute('content'));

        // Find scroll containers
        const currentContainer = document.querySelector('[data-scroll-container]');
        const newContainer     = newDoc.querySelector('[data-scroll-container]');

        if (!currentContainer || !newContainer) {
            // Fallback: shouldn't happen, but navigate normally if no container found
            window.location.href = url;
            return;
        }

        // Remove the navbar from the new container — it's persisted outside the
        // scroll container in the live DOM, so we don't want a duplicate.
        const navbarInNew = newContainer.querySelector('.navbar-custom');
        if (navbarInNew) navbarInNew.remove();

        // Destroy Locomotive Scroll before DOM mutation
        if (window.locoScroll) {
            try { window.locoScroll.destroy(); } catch (e) {}
            window.locoScroll = null;
        }

        // ── Atomic swap of ONLY the scroll container ─────────────────────────
        // The overlay (fixed, z-index 1000001) is a sibling of the container,
        // not a child — so it stays in the DOM untouched during replaceWith().
        // No detach → no flash.
        currentContainer.replaceWith(newContainer);

        // Sync body className (e.g. page-specific classes)
        // but keep preloader-active removed and page-loaded present
        document.body.className = newDoc.body.className;
        document.body.classList.remove('preloader-active');
        document.body.classList.add('page-loaded');

        // Re-apply dark mode (inline head script doesn't re-run over PJAX)
        const mode = localStorage.getItem('mode');
        document.documentElement.setAttribute('data-mode',    mode === 'dark' ? 'dark' : 'light');
        document.documentElement.setAttribute('data-bs-theme', mode === 'dark' ? 'dark' : 'light');

        // Update URL — no browser navigation, no loading spinner
        history.pushState({ pjax: true, url }, document.title, url);

        // Re-initialize page-specific components
        reinitComponents();
    }

    // ── Component Re-initialization ──────────────────────────────────────────
    function reinitComponents() {
        // 1. Locomotive Scroll
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            const scroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__["default"]({
                el: scrollContainer,
                smooth: true,
                offset: ['17.5%'],
                repeat: true,
                class: 'animate',
                smartphone: { smooth: true },
                tablet: { smooth: true }
            });
            window.locoScroll = scroll;

            window.addEventListener('resize', () => scroll.update());

            imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(scrollContainer, { background: true }, () => {
                scroll.update();
            });
        }

        // 2. Navbar active-state update only — the navbar element itself is
        //    persisted across swaps (savedNavbar/savedMenu in swapPage) so
        //    all event listeners from navbar.js IIFE remain intact.
        updateNavActiveState();

        // 3. Swiper — destroy existing then re-init
        if (window.Swiper || typeof Swiper !== 'undefined') {
            reinitSwipers();
        } else {
            // Swiper is bundled with vendor — access via global if available
            try { reinitSwipers(); } catch (e) {}
        }

        // 4. Typed.js
        const typedElems = document.querySelectorAll('[data-typed]');
        typedElems.forEach(elem => {
            const elemOptions = elem.dataset.typed ? JSON.parse(elem.dataset.typed) : {};
            const options = {
                typeSpeed: 50,
                backSpeed: 35,
                backDelay: 1000,
                loop: true,
                ...elemOptions
            };
            new typed_js__WEBPACK_IMPORTED_MODULE_2___default.a(elem, options);
        });

        // 5. Contact form
        initContactForm();

        // Note: dark mode toggle buttons do NOT need re-binding here.
        // The .navbar-custom element is persisted across PJAX swaps, so the
        // original event listeners from dark-mode.js (including the View
        // Transitions circle-reveal animation) remain attached and working.

        // 6. Misc: page-loaded class
        document.body.classList.add('page-loaded');
        document.dispatchEvent(new CustomEvent('page:load'));
    }

    function reinitSwipers() {
        // Default data-swiper elements
        const swipers = document.querySelectorAll('[data-swiper]');
        swipers.forEach(elem => {
            // Destroy if already initialized
            if (elem.swiper) { try { elem.swiper.destroy(true, true); } catch(e) {} }
            const options = elem.dataset && elem.dataset.options ? JSON.parse(elem.dataset.options) : {};
            new window.Swiper(elem, options);
        });

        // Linked swipers on homepage
        const topEl = document.querySelector('.swiper-linked-top');
        const botEl = document.querySelector('.swiper-linked-bottom');
        if (topEl && botEl) {
            if (topEl.swiper) { try { topEl.swiper.destroy(true, true); } catch(e) {} }
            if (botEl.swiper) { try { botEl.swiper.destroy(true, true); } catch(e) {} }

            const swiperLinkedTop = new window.Swiper('.swiper-linked-top', {
                spaceBetween: 23,
                breakpoints: {
                    300: { slidesPerView: 2 },
                    999: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                },
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                }
            });
            new window.Swiper('.swiper-linked-bottom', {
                spaceBetween: 0,
                slidesPerView: 1,
                parallax: true,
                thumbs: { swiper: swiperLinkedTop },
                effect: 'fade',
                fadeEffect: { crossFade: true }
            });
        }
    }

    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Prevent double-binding
        if (contactForm._pjaxBound) return;
        contactForm._pjaxBound = true;

        const validateField = (field) => {
            if (!field.required && field.value.trim() === '' && !['name','email','phone','subject'].includes(field.name)) return true;
            let isValid = true;
            const value = field.value.trim();
            if (field.name === 'name' || field.name === 'subject') {
                isValid = value.length > 0;
            } else if (field.name === 'email') {
                isValid = value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (field.name === 'phone') {
                const digits = value.replace(/\D/g, '');
                isValid = value.length > 0 && digits.length >= 10 && digits.length <= 15;
            }
            field.classList.toggle('is-invalid', !isValid);
            return isValid;
        };

        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => { if (input.classList.contains('is-invalid')) validateField(input); });
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formInputs = this.querySelectorAll('.form-control');
            let isValid = true;
            formInputs.forEach(input => {
                if (['name','email','phone','subject'].includes(input.name)) {
                    if (!validateField(input)) isValid = false;
                }
            });
            if (!isValid) return;

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const encode = data => Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
                const res = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encode({
                        'form-name': 'contact',
                        name: this.name.value.trim(),
                        email: this.email.value.trim(),
                        phone: this.phone.value.trim(),
                        subject: this.subject ? this.subject.value.trim() : '',
                        about: this.about.value.trim()
                    })
                });
                if (res.ok) {
                    alert('Message sent successfully! Thank you for reaching out.');
                    this.reset();
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            } catch (err) {
                alert('Error sending message: ' + err.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    function reinitDarkModeButtons() {
        const modeToggleBtns = document.querySelectorAll('.btn-toggle-mode');
        const mode = localStorage.getItem('mode') || 'light';

        // Restore icon state
        modeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = mode === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
                icon.style.transform = mode === 'dark' ? 'rotate(90deg)' : '';
                icon.style.opacity = '';
            }
            // Re-bind click (dark-mode.js global handler still works because it uses
            // event delegation on the document — but the buttons need to fire it)
            // The global dark-mode IIFE already ran, so its event listeners on
            // existing btns are gone. We dispatch a synthetic click to the original logic.
            // Simplest: directly re-bind toggle logic here.
            if (!btn._pjaxBound) {
                btn._pjaxBound = true;
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const currentMode = localStorage.getItem('mode') || 'light';
                    const targetMode = currentMode === 'dark' ? 'light' : 'dark';
                    localStorage.setItem('mode', targetMode);
                    document.documentElement.setAttribute('data-mode', targetMode);
                    document.documentElement.setAttribute('data-bs-theme', targetMode);

                    const allBtns = document.querySelectorAll('.btn-toggle-mode');
                    allBtns.forEach(b => {
                        const ic = b.querySelector('i');
                        if (ic) {
                            ic.className = targetMode === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
                            ic.style.transform = targetMode === 'dark' ? 'rotate(90deg)' : '';
                        }
                    });
                });
            }
        });
    }

    function updateNavActiveState() {
        const menuOverlay = document.getElementById('fullscreenMenu');
        if (!menuOverlay) return;
        const currentPath = window.location.pathname;
        let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        if (currentPage === '' || currentPage === 'index.html') currentPage = 'home.html';

        menuOverlay.querySelectorAll('.fullscreen-nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && (href.includes(currentPage) || (currentPage === 'home.html' && href.includes('index.html')))) {
                link.classList.add('active');
            }
        });
    }

    // ── PJAX Navigate ────────────────────────────────────────────────────────
    function navigate(targetUrl) {
        if (isAnimating) return;
        isAnimating = true;

        const fullUrl = resolveUrl(targetUrl);

        // Close menu if open
        if (document.body.classList.contains('menu-open')) {
            document.documentElement.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            if (window.locoScroll) { try { window.locoScroll.start(); } catch(e) {} }
        }

        // Start strip-cover animation immediately
        playLeaveAnim();

        // Fetch new page in parallel — no browser navigation, no spinner
        const fetchPromise = fetch(fullUrl, {
            headers: { 'X-PJAX': 'true' },
            cache: 'default'
        }).then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        });

        // Wait for strips to finish covering, then swap
        setTimeout(function () {
            fetchPromise
                .then(function (html) {
                    swapPage(html, fullUrl);
                    // Small RAF delay so DOM paint settles before revealing
                    requestAnimationFrame(function () {
                        requestAnimationFrame(playEnterAnim);
                    });
                })
                .catch(function () {
                    // Fetch failed — fall back to real navigation
                    window.location.href = fullUrl;
                });
        }, LEAVE_TOTAL);
    }

    // ── Event Listeners ──────────────────────────────────────────────────────

    // Prefetch on hover
    document.addEventListener('mouseover', function (e) {
        const anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) prefetchUrl(anchor.getAttribute('href'));
    }, { passive: true });

    document.addEventListener('touchstart', function (e) {
        const anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) prefetchUrl(anchor.getAttribute('href'));
    }, { passive: true });

    // Intercept clicks
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a');
        if (!anchor || !isInternalLink(anchor)) return;
        e.preventDefault();
        e.stopPropagation();
        navigate(anchor.getAttribute('href'));
    });

    // Browser back / forward
    window.addEventListener('popstate', function (e) {
        navigate(window.location.href);
    });

    // BFCache restore
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            overlay.classList.remove('is-leaving', 'is-entering');
            document.body.style.visibility = '';
            document.body.style.overflow = '';
            isAnimating = false;
        }
    });

    // ── First-load reveal (direct navigation / refresh) ───────────────────
    // On first visit, body.page-loaded is added by misc.js.
    // On PJAX swap, we add it in reinitComponents().
    // No enter animation needed here — preloader handles the first load.

})();


/***/ }),

/***/ "./src/assets/js/components/preloader.js":
/*!***********************************************!*\
  !*** ./src/assets/js/components/preloader.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ==========================================================================
// PRELOADER — Awwwards-Grade Progress Bar
//
// EXIT SEQUENCE:
//   1. Progress bar fills to 100%, pauses briefly
//   2. page-transition-overlay plays is-leaving (5 strips sweep UP from below,
//      identical to the page-to-page transition out animation)
//   3. Once strips fully cover the viewport (~770ms):
//        – preloader hidden (display:none)
//        – overlay instantly removed (visibility:hidden)
//        – page is now directly visible — NO is-entering strip reveal
//
// This gives the exact same "out" animation as a normal page transition,
// but instead of revealing via colored strips, the page appears directly.
//
// Page-to-page transitions handled separately by page-transition.js
// ==========================================================================

class SimplePreloader {
    constructor() {
        this.preloader  = document.getElementById('preloader');
        this.bar        = document.getElementById('pl-bar');
        this.percentEl  = document.getElementById('pl-percent');
        this.block      = document.getElementById('pl-block');
        this.body       = document.body;
        this.hasLoaded  = false;
        this._progress  = 0;
        this._rafId     = null;

        if (this.preloader) {
            this.init();
        }
    }

    init() {
        this.body.classList.add('preloader-active');

        const hasSeenPreloader = sessionStorage.getItem('preloader_seen_v4') === 'true';
        const isTransition     = document.documentElement.classList.contains('is-page-entering');

        if (hasSeenPreloader || isTransition) {
            // Skip — hide instantly, page-transition strips handle the reveal.
            this.preloader.classList.add('transition-only');
            this.body.classList.remove('preloader-active');
            this.hasLoaded = true;
            return;
        }

        // ── First visit ──────────────────────────────────────────────────────
        sessionStorage.setItem('preloader_seen_v4', 'true');
        this._startProgress();

        const onReady = () => {
            if (this.hasLoaded) return;
            this.hasLoaded = true;
            this._finishProgress(() => this.hidePreloader());
        };

        // Minimum display: 3200ms — matches _startProgress duration so bar
        // reaches ~70% exactly when the timer fires (never looks stalled).
        setTimeout(() => {
            if (document.readyState === 'complete') {
                onReady();
            } else {
                window.addEventListener('load', onReady, { once: true });
                setTimeout(onReady, 2500); // safety fallback
            }
        }, 3200);
    }

    // ── Phase 1: organic crawl 0 → 70% over 3200ms ───────────────────────────
    // Ease-in-out-quad: slow start → accelerates → decelerates near ceiling.
    // At CSS fade-in time (0.5s), value ≈ 2% — visually near zero. ✓
    _startProgress() {
        const CEILING  = 70;
        const DURATION = 3200;

        const ease = (t) =>
            t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const start = performance.now();

        const tick = (now) => {
            const t     = Math.min((now - start) / DURATION, 1);
            const value = Math.round(ease(t) * CEILING);
            this._setProgress(value);
            if (t < 1) this._rafId = requestAnimationFrame(tick);
        };

        this._rafId = requestAnimationFrame(tick);
    }

    // ── Phase 2: rush current → 100% in 500ms, then fire callback ────────────
    _finishProgress(callback) {
        cancelAnimationFrame(this._rafId);

        const from     = this._progress;
        const DURATION = 500;
        const start    = performance.now();

        const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

        const tick = (now) => {
            const t     = Math.min((now - start) / DURATION, 1);
            const value = Math.round(from + (100 - from) * ease(t));
            this._setProgress(value);

            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(callback, 350); // brief hold at 100% before exit
            }
        };

        requestAnimationFrame(tick);
    }

    _setProgress(value) {
        this._progress = value;
        if (this.bar)       this.bar.style.width      = value + '%';
        if (this.percentEl) this.percentEl.textContent = String(value).padStart(2, '0');
    }

    // ── Exit: strip-reveal, page shows directly (no black flash) ─────────────
    //
    // Flow:
    //   1. Preloader content fades out quickly (200ms)
    //   2. Strips snap to full-cover with page-background color (pl-exit-mode)
    //      — seamless handoff, looks like preloader is still there
    //   3. Preloader hidden instantly behind strips
    //   4. is-entering: strips lift off upward (bottom strip first), page
    //      appears directly underneath — no solid color visible, just page
    hidePreloader() {
        const overlay = document.getElementById('page-transition-overlay');

        // Timing — must match page-transition.js constants
        const STRIPS      = 5;
        const STAGGER     = 55;
        const DURATION    = 550;
        const ENTER_TOTAL = DURATION + (STRIPS - 1) * STAGGER; // ~770ms

        // ── Step 1: fade out preloader content ───────────────────────────────
        if (this.block) {
            this.block.style.transition = 'opacity 0.2s ease';
            this.block.style.opacity    = '0';
        }
        const corner = this.preloader.querySelector('.pl-corner-label');
        if (corner) {
            corner.style.transition = 'opacity 0.2s ease';
            corner.style.opacity    = '0';
        }

        // ── Step 2 (after fade): snap strips to full cover in preloader color ─
        setTimeout(() => {
            if (overlay) {
                // Change strip color to match preloader background (not black)
                overlay.classList.add('pl-exit-mode');

                // Snap all strips to translateY(0%) instantly — no animation
                overlay.classList.remove('is-leaving', 'is-entering');
                overlay.style.visibility = 'visible';
                overlay.classList.add('is-preload-ready');
                overlay.offsetHeight; // force reflow to commit position
            }

            // ── Step 3: hide preloader behind the (now same-color) strips ────
            this.preloader.style.display = 'none';
            this.body.classList.remove('preloader-active');

            // ── Step 4: play is-entering — strips lift upward, page revealed ──
            // Bottom strip (pt-strip--5) lifts first → page reveals bottom-up
            if (overlay) {
                overlay.classList.remove('is-preload-ready');
                overlay.classList.add('is-entering');
            }

            // Subtle page content lift-up during the reveal
            this.body.classList.add('pt-content-reveal');

            // ── Step 5: clean up after animation ─────────────────────────────
            setTimeout(() => {
                if (overlay) {
                    overlay.classList.remove('is-entering', 'pl-exit-mode');
                    overlay.style.visibility = '';
                }
                this.body.classList.remove('pt-content-reveal');
            }, ENTER_TOTAL + 150);

        }, 220); // wait for content fade-out
    }

    hide() {
        this.hidePreloader();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new SimplePreloader();
});

/* harmony default export */ __webpack_exports__["default"] = (SimplePreloader);

/***/ }),

/***/ "./src/assets/js/components/swiper.js":
/*!********************************************!*\
  !*** ./src/assets/js/components/swiper.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");


swiper__WEBPACK_IMPORTED_MODULE_0__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_0__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_0__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_0__["Scrollbar"], swiper__WEBPACK_IMPORTED_MODULE_0__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_0__["Mousewheel"], swiper__WEBPACK_IMPORTED_MODULE_0__["Keyboard"], swiper__WEBPACK_IMPORTED_MODULE_0__["Parallax"], swiper__WEBPACK_IMPORTED_MODULE_0__["Lazy"], swiper__WEBPACK_IMPORTED_MODULE_0__["EffectFade"], swiper__WEBPACK_IMPORTED_MODULE_0__["Thumbs"], swiper__WEBPACK_IMPORTED_MODULE_0__["Controller"]]);

// Expose to window so PJAX re-init can access it after DOM swap
window.Swiper = swiper__WEBPACK_IMPORTED_MODULE_0__["default"];

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // Handle Default swipers
    const swipers = document.querySelectorAll('[data-swiper]') || [];

    swipers.forEach((elem) => {
      let options = elem.dataset && elem.dataset.options ? JSON.parse(elem.dataset.options) : {};
      var swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](elem, options);
    });

    // Handle our linked swipers on homepage
    var swiperLinkedTop = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"]('.swiper-linked-top', {
      spaceBetween: 23,
      breakpoints: {
        300: {
          slidesPerView: 2
        },       
        999: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4
        }
      },      
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      }
    });
    var swiperLinkedBottom = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"]('.swiper-linked-bottom', {
      spaceBetween: 0,
      slidesPerView: 1,
      parallax: true,
      thumbs: {
        swiper: swiperLinkedTop
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });  

  })
})();

/***/ }),

/***/ "./src/assets/js/components/typed.js":
/*!*******************************************!*\
  !*** ./src/assets/js/components/typed.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_0__);


(function () {
    const typedElems = document.querySelectorAll('[data-typed]') || [];

    typedElems.forEach(elem => {
      const elemOptions = elem.dataset.typed ? JSON.parse(elem.dataset.typed) : {};

      const defaultOptions = {
        typeSpeed: 50,
        backSpeed: 35,
        backDelay: 1000,
        loop: true,
      };
      const options = {
        ...defaultOptions,
        ...elemOptions
      };
      new typed_js__WEBPACK_IMPORTED_MODULE_0___default.a(elem, options);
    });
})();

/***/ }),

/***/ "./src/assets/js/components/work-slider.js":
/*!*************************************************!*\
  !*** ./src/assets/js/components/work-slider.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Work Slider — faithful port of musabhassan.com
 *
 * Fixed: Using getBoundingClientRect() to avoid offsetParent bugs
 * caused by CSS transforms on parent elements.
 */

(function () {
  'use strict';

  // ──────────────────────────────────────────────────────────────────────────
  // WorkSlider — LERP drag (ported from Musab's WorkSlider class)
  // ──────────────────────────────────────────────────────────────────────────

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
      this.locked        = false;  // locked when a card is active

      this._bindEvents();
      this._animate();


      // Dynamic left padding to align with container
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
      // Skip if locked or clicking interactive controls
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

      // Musab's exact formula
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
        (this.initialPos - (this.offsetSpeed * (diff / document.body.clientWidth))) * 100
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

    /**
     * Scroll formula (equivalent to Musab's targetPos = 0.15W - offsetLeft).
     * By calling this BEFORE adding .active class, offsetLeft reflects the
     * unexpanded position (matching Musab's Svelte synchronous timing).
     */
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


  // ──────────────────────────────────────────────────────────────────────────
  // WorkItems — card expand + panel populate
  // ──────────────────────────────────────────────────────────────────────────

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

      // ONLY btn-view triggers expand (desktop)
      const btnView = liEl.querySelector('.btn-view');
      if (btnView) {
        btnView.addEventListener('click', handleExpand);
      }

      // Allow expand by clicking image on mobile view
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

      // *** Scroll to 15vw visual left BEFORE adding .active ***
      this.slider.scrollToItem(cardEl);

      // Now apply card states (adds margin-left: 10vw, shifting visual left to 25vw)
      this.items.forEach(({ el, index: i }) => {
        const card = el.querySelector('.list-item');
        const top  = el.querySelector('.text-top-wrapper');
        const bot  = el.querySelector('.text-wrapper');

        card.classList.remove('active', 'ambient');
        card.classList.add(i === index ? 'active' : 'ambient');

        // Hide ALL text overlays while any card is expanded
        if (top) top.classList.add('hidden');
        if (bot) bot.classList.add('hidden');
      });

      // Populate & show panel
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

      // top-align
      const panelIndex   = get('.panel-index');
      const captionEl    = get('.caption');
      if (panelIndex) panelIndex.textContent = padded;
      if (captionEl)  captionEl.textContent  = summary;

      // mid-align
      const panelTitle = get('.panel-title');
      if (panelTitle) panelTitle.textContent = title;

      // bottom-align
      const panelDesc      = get('.panel-description');
      const panelRolesList = get('.panel-roles-list');
      const linksEl        = get('.links');

      if (panelDesc) panelDesc.textContent = description;

      if (panelRolesList) {
        // Include '+' prefix in text content
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


  // ──────────────────────────────────────────────────────────────────────────
  // Entrance animation
  // ──────────────────────────────────────────────────────────────────────────

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


  // ──────────────────────────────────────────────────────────────────────────
  // Init
  // ──────────────────────────────────────────────────────────────────────────

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


/***/ }),

/***/ "./src/assets/js/misc.js":
/*!*******************************!*\
  !*** ./src/assets/js/misc.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {

    // Add a body class once page has loaded
    // Used to add CSS transitions to elems
    // and avoids content shifting during page load
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
    
})();

/***/ }),

/***/ "./src/assets/js/theme.js":
/*!********************************!*\
  !*** ./src/assets/js/theme.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _components_dark_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dark-mode */ "./src/assets/js/components/dark-mode.js");
/* harmony import */ var _components_dark_mode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_dark_mode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_locomotive_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/locomotive-scroll */ "./src/assets/js/components/locomotive-scroll.js");
/* harmony import */ var _components_swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/swiper */ "./src/assets/js/components/swiper.js");
/* harmony import */ var _components_typed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/typed */ "./src/assets/js/components/typed.js");
/* harmony import */ var _components_contact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/contact */ "./src/assets/js/components/contact.js");
/* harmony import */ var _components_contact__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_contact__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_preloader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/preloader */ "./src/assets/js/components/preloader.js");
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/navbar */ "./src/assets/js/components/navbar.js");
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_components_navbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_page_transition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/page-transition */ "./src/assets/js/components/page-transition.js");
/* harmony import */ var _components_work_slider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/work-slider */ "./src/assets/js/components/work-slider.js");
/* harmony import */ var _components_work_slider__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_components_work_slider__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./misc */ "./src/assets/js/misc.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_misc__WEBPACK_IMPORTED_MODULE_10__);
// Vendor Imports


// Components





 // Tambahkan ini




// theme misc js


/***/ }),

/***/ "./src/assets/scss/theme.scss":
/*!************************************!*\
  !*** ./src/assets/scss/theme.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 3:
/*!*********************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:8080 ./src/assets/js/theme.js ./src/assets/scss/theme.scss ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/user/Documents/GitHub/Works-portfolio/node_modules/webpack-dev-server/client/index.js?http://localhost:8080 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:8080");
__webpack_require__(/*! ./src/assets/js/theme.js */"./src/assets/js/theme.js");
module.exports = __webpack_require__(/*! ./src/assets/scss/theme.scss */"./src/assets/scss/theme.scss");


/***/ })

/******/ });
//# sourceMappingURL=theme.bundle.js.map