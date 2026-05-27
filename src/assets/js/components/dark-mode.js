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