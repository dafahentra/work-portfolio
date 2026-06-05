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
            this.preloader.classList.add('transition-only');
            this.body.classList.remove('preloader-active');
            this.hasLoaded = true;
            return;
        }

        sessionStorage.setItem('preloader_seen_v4', 'true');
        this._startProgress();

        const onReady = () => {
            if (this.hasLoaded) return;
            this.hasLoaded = true;
            this._finishProgress(() => this.hidePreloader());
        };

        setTimeout(() => {
            if (document.readyState === 'complete') {
                onReady();
            } else {
                window.addEventListener('load', onReady, { once: true });
                setTimeout(onReady, 2500);
            }
        }, 3200);
    }

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

    _finishProgress(callback) {
        cancelAnimationFrame(this._rafId);

        const from     = this._progress;
        const DURATION = 500;
        const start    = performance.now();

        const ease = (t) => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
            const t     = Math.min((now - start) / DURATION, 1);
            const value = Math.round(from + (100 - from) * ease(t));
            this._setProgress(value);

            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(callback, 350);
            }
        };

        requestAnimationFrame(tick);
    }

    _setProgress(value) {
        this._progress = value;
        if (this.bar)       this.bar.style.width      = value + '%';
        if (this.percentEl) this.percentEl.textContent = String(value).padStart(2, '0');
    }

    hidePreloader() {
        const overlay = document.getElementById('page-transition-overlay');

        const STRIPS      = 5;
        const STAGGER     = 55;
        const DURATION    = 550;
        const ENTER_TOTAL = DURATION + (STRIPS - 1) * STAGGER;

        if (this.block) {
            this.block.style.transition = 'opacity 0.2s ease';
            this.block.style.opacity    = '0';
        }
        const corner = this.preloader.querySelector('.pl-corner-label');
        if (corner) {
            corner.style.transition = 'opacity 0.2s ease';
            corner.style.opacity    = '0';
        }

        setTimeout(() => {
            if (overlay) {
                overlay.classList.add('pl-exit-mode');
                overlay.classList.remove('is-leaving', 'is-entering');
                overlay.style.visibility = 'visible';
                overlay.classList.add('is-preload-ready');
                overlay.offsetHeight;
            }

            this.preloader.style.display = 'none';
            this.body.classList.remove('preloader-active');

            if (overlay) {
                overlay.classList.remove('is-preload-ready');
                overlay.classList.add('is-entering');
            }

            this.body.classList.add('pt-content-reveal');

            setTimeout(() => {
                if (overlay) {
                    overlay.classList.remove('is-entering', 'pl-exit-mode');
                    overlay.style.visibility = '';
                }
                this.body.classList.remove('pt-content-reveal');
            }, ENTER_TOTAL + 150);

        }, 220);
    }

    hide() {
        this.hidePreloader();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new SimplePreloader();
});

export default SimplePreloader;