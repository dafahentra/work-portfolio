/**
 * Zero-Flash Page Transition Controller
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * WHY THIS IS SEAMLESS:
 *
 *  Frame 0 (HTML parse):
 *    <head> inline <script> reads sessionStorage → sets html.is-page-entering
 *    <head> inline <style>  paints body with strip-color bg, hides all content
 *    → No external CSS needed yet. Viewport is a solid color from frame 0.
 *
 *  Frame 1+ (external CSS loads):
 *    _page-transition.scss sees html.is-page-entering → positions strips at
 *    translateY(0), fully covering the viewport. The solid bg → solid strips
 *    transition is invisible (same color).
 *
 *  Frame N (this JS loads, page ready):
 *    Removes html.is-page-entering → reflow → adds is-entering animation
 *    → strips sweep away, revealing the fully-rendered page underneath.
 *    → body.pt-content-reveal adds a subtle lift-up fade-in to content.
 *
 *  EXIT FLOW:
 *    Click intercepted → is-leaving animation → strips cover → navigate
 *    → sessionStorage flag set → new page picks it up at parse time.
 *
 *  PREFETCH:
 *    On hover/touchstart, the target URL is prefetched into browser cache.
 *    This means the navigation after strips cover is near-instant.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
    'use strict';

    // ── Config ──────────────────────────────────────────────────────────────
    const STRIPS        = 5;
    const STAGGER       = 55;    // ms between each strip
    const DURATION      = 550;   // ms per strip animation
    const LEAVE_TOTAL   = DURATION + (STRIPS - 1) * STAGGER;  // ~770ms
    const ENTER_TOTAL   = DURATION + (STRIPS - 1) * STAGGER;

    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    let isAnimating = false;  // Guard against double-clicks
    const prefetched = new Set();

    // ── Prefetch ────────────────────────────────────────────────────────────
    // Inject a <link rel="prefetch"> so the browser fetches the page in idle
    // time. By the time strips finish covering, the HTML is already cached.
    function prefetchUrl(href) {
        if (prefetched.has(href)) return;
        prefetched.add(href);

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.as = 'document';
        document.head.appendChild(link);
    }

    // ── Link detection ──────────────────────────────────────────────────────
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

    // ── ENTER animation (reveal new page) ───────────────────────────────────
    function playEnter() {
        // Body is hidden via inline CSS (visibility: hidden).
        // First: make body visible but keep the overlay covering.
        document.body.style.visibility = 'visible';
        document.body.style.overflow = '';

        // Remove the CSS-freeze class
        document.documentElement.classList.remove('is-page-entering');

        // Force reflow so browser acknowledges class removal
        overlay.offsetHeight;

        // Start strip reveal animation
        overlay.classList.add('is-entering');

        // Trigger content entrance animation
        document.body.classList.add('pt-content-reveal');

        // Cleanup after animation finishes
        setTimeout(function () {
            overlay.classList.remove('is-entering');
            document.body.classList.remove('pt-content-reveal');
            isAnimating = false;
        }, ENTER_TOTAL + 150);
    }

    // ── EXIT animation (cover old page, then navigate) ──────────────────────
    function playLeave(targetUrl) {
        if (isAnimating) return;
        isAnimating = true;

        // Reset any prior state
        overlay.classList.remove('is-entering');
        overlay.offsetHeight;

        // Start covering animation
        overlay.classList.add('is-leaving');

        // Navigate after strips fully cover
        setTimeout(function () {
            sessionStorage.setItem('pt-entering', 'true');
            window.location.href = targetUrl;
        }, LEAVE_TOTAL);
    }

    // ── Event listeners ─────────────────────────────────────────────────────

    // Prefetch on hover / touchstart
    document.addEventListener('mouseover', function (e) {
        var anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) {
            prefetchUrl(anchor.getAttribute('href'));
        }
    }, { passive: true });

    document.addEventListener('touchstart', function (e) {
        var anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) {
            prefetchUrl(anchor.getAttribute('href'));
        }
    }, { passive: true });

    // Click interception
    document.addEventListener('click', function (e) {
        var anchor = e.target.closest('a');
        if (!anchor || !isInternalLink(anchor)) return;

        e.preventDefault();
        e.stopPropagation();
        playLeave(anchor.getAttribute('href'));
    });

    // ── Boot: if arriving via transition, play reveal ────────────────────────
    var isEntering = sessionStorage.getItem('pt-entering') === 'true';
    if (isEntering) {
        sessionStorage.removeItem('pt-entering');
        isAnimating = true;

        // Wait for everything to be ready before revealing
        let readyFired = false;
        function onReady() {
            if (readyFired) return;
            readyFired = true;
            // Double-RAF ensures layout is computed and composited
            requestAnimationFrame(function () {
                requestAnimationFrame(playEnter);
            });
        }

        if (document.readyState === 'complete') {
            onReady();
        } else {
            // Wait for all resources (images, fonts) — not just DOM
            window.addEventListener('load', onReady);
            // Safety: don't wait more than 2.5s on slow connections
            setTimeout(onReady, 2500);
        }
    }

    // ── Handle browser back/forward buttons ─────────────────────────────────
    window.addEventListener('pageshow', function (e) {
        // If navigating back to a bfcached page, clean up any stale state
        if (e.persisted) {
            overlay.classList.remove('is-leaving', 'is-entering');
            document.documentElement.classList.remove('is-page-entering');
            document.body.style.visibility = '';
            document.body.style.overflow = '';
            isAnimating = false;
        }
    });

})();
