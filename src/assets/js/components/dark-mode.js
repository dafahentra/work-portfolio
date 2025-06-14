(function () {
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
            setMode({});
            return;
        }
        setMode({ type: mode });
    }

    /**
     * Set our mode
     * @param {type} String
     */
    function setMode({ type = LIGHT_MODE }) {
        localStorage.setItem(MODE, type);
        setHTMLAttrMode({ type });
        updateButtonIcons({ type });
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
     * Update button icons based on current mode
     * @param {type} String
     */
    function updateButtonIcons({ type }) {
        modeToggleBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (type === DARK_MODE) {
                    // Jika dark mode, tampilkan icon bulan
                    icon.classList.remove('ri-sun-line');
                    icon.classList.add('ri-moon-line');
                } else {
                    // Jika light mode, tampilkan icon matahari
                    icon.classList.remove('ri-moon-line');
                    icon.classList.add('ri-sun-line');
                }
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

    /**
     * Toggle our mode via button in navbar
     */
    function toggleMode() {
        const currentMode = getMode();
        if (currentMode === LIGHT_MODE) {
            setMode({ type: DARK_MODE });
        } else {
            setMode({});
        }
    }

    if (modeToggleBtns) {
        modeToggleBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                toggleMode();
            });
        });
    }

    init();
})();