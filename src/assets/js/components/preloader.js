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

export default SimplePreloader;