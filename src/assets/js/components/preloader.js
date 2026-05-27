// One-Time Session Preloader
// Page-to-page transitions are handled separately by page-transition.js
class SimplePreloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.body = document.body;
        this.hasLoaded = false;
        
        if (this.preloader) {
            this.init();
        }
    }
    
    init() {
        // Prevent scrolling while loading
        this.body.classList.add('preloader-active');
        
        // 1. Is this the first time the user visits the site in this session?
        const hasSeenPreloader = sessionStorage.getItem('preloader_seen_v4') === 'true';
        
        // 2. Are we arriving via an internal page transition?
        // (Uses the class set by the inline head script in head.html)
        const isTransition = document.documentElement.classList.contains('is-page-entering');

        // We SKIP the full preloader if they've already seen it this session,
        // or if they are in the middle of a seamless page transition.
        if (hasSeenPreloader || isTransition) {
            
            // Instantly hide the preloader
            this.preloader.classList.add('transition-only');
            
            const fastHide = () => {
                if (this.hasLoaded) return;
                this.hasLoaded = true;
                this.preloader.style.display = 'none';
                this.body.classList.remove('preloader-active');
            };
            
            if (document.readyState === 'complete') {
                fastHide();
            } else {
                window.addEventListener('load', fastHide);
            }
            
        } else {
            // This is their FIRST visit to the site!
            // Mark it as seen so it doesn't play on refresh or subsequent direct visits.
            sessionStorage.setItem('preloader_seen_v4', 'true');
            
            // Play full detailed brand animation
            const fullHide = () => {
                if (this.hasLoaded) return;
                this.hasLoaded = true;
                this.hidePreloader(800);
            };
            
            // Guarantee the preloader stays visible for AT LEAST 2000ms
            setTimeout(() => {
                if (document.readyState === 'complete') {
                    fullHide();
                } else {
                    window.addEventListener('load', fullHide);
                    // Additional safety fallback
                    setTimeout(fullHide, 2500);
                }
            }, 2000);
        }
    }
    
    hidePreloader(duration = 800) {
        this.preloader.classList.add('fade-out');
        setTimeout(() => {
            this.preloader.style.display = 'none';
            this.body.classList.remove('preloader-active');
        }, duration);
    }
    
    hide() {
        this.hidePreloader();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new SimplePreloader();
});

export default SimplePreloader;