// Advanced Preloader with Auto Redirect
class AdvancedPreloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.body = document.body;
        this.duration = 3000; // 3 seconds
        
        if (this.preloader) {
            this.init();
        }
    }
    
    init() {
        // Prevent scrolling
        this.body.classList.add('preloader-active');
        
        // Detect preloader type and initialize
        if (this.preloader.classList.contains('particles')) {
            this.initParticleNetwork();
        } else if (this.preloader.classList.contains('hexagon')) {
            this.initHexagonLoader();
        } else if (this.preloader.classList.contains('liquid')) {
            this.initLiquidLoader();
        }
        
        // Start common animations
        this.startAnimations();
        
        // Set timer for redirect
        setTimeout(() => {
            this.prepareRedirect();
        }, this.duration);
    }
    
    startAnimations() {
        // Progress bar animation (particles theme)
        const progressBar = this.preloader.querySelector('.progress-bar');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100);
        }
        
        // Any theme-specific animations
        const morphPath = this.preloader.querySelector('.morph-path');
        if (morphPath) {
            // SVG morph is handled by SMIL animation in HTML
        }
    }
    
    // Liquid Loader Enhancement
    initLiquidLoader() {
        // Liquid animation is handled by CSS
        // Could add canvas-based metaballs here for more advanced effect
    }
    
    prepareRedirect() {
        // Clean up any running animations
        if (this.particleAnimation) {
            cancelAnimationFrame(this.particleAnimation);
        }
        if (this.percentInterval) {
            clearInterval(this.percentInterval);
        }
        
        // Add fade out class
        this.preloader.classList.add('fade-out');
        
        // Wait for fade animation then redirect
        setTimeout(() => {
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            window.location.href = basePath + 'home.html';
        }, 800);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Only run on index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        new AdvancedPreloader();
    }
});

// Export for module system
export default AdvancedPreloader;