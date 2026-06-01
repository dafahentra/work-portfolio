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

import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import Typed from 'typed.js';

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

        // Force a popstate/pushstate URL change EVEN if we click the same page (to keep history stack sane)
        if (window.location.href !== url) {
            history.pushState({ pjax: true, url }, document.title, url);
        }

        // Re-initialize page-specific components
        reinitComponents();

        // Explicitly update nav active state AFTER pushState so pathname is correct
        updateNavActiveState();
    }

    // ── Component Re-initialization ──────────────────────────────────────────
    function reinitComponents() {
        // 1. Locomotive Scroll
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            const scroll = new LocomotiveScroll({
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

            imagesLoaded(scrollContainer, { background: true }, () => {
                scroll.update();
            });
        }

        // 2. Navbar active-state update only
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
            new Typed(elem, options);
        });

        // 5. Contact form
        initContactForm();

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

        menuOverlay.querySelectorAll('.fullscreen-nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            
            // Determine the core page name from the current path
            let pageName = currentPath.split('/').pop().replace('.html', '');
            if (!pageName || pageName === '') pageName = 'index';
            
            // Determine the core page name from the link href
            let linkName = href.split('/').pop().replace('.html', '');
            if (!linkName || linkName === '') linkName = 'index';
            
            // Exact match for the current page
            if (pageName === linkName || (pageName === 'index' && linkName === 'home') || (pageName === 'home' && linkName === 'index')) {
                link.classList.add('active');
            } 
            // Highlight WORK if we are inside an individual project page
            else if (currentPath.includes('/work/') && linkName === 'work-listing') {
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
