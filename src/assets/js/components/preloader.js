// Simple Preloader without redirect
class SimplePreloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.body = document.body;
        this.duration = 3000; // 3 seconds default
        
        if (this.preloader) {
            this.init();
        }
    }
    
    init() {
        // Prevent scrolling while loading
        this.body.classList.add('preloader-active');
        
        // Hide preloader after duration
        setTimeout(() => {
            this.hidePreloader();
        }, this.duration);
    }
    
    hidePreloader() {
        // Add fade out class
        this.preloader.classList.add('fade-out');
        
        // Remove preloader and enable scrolling after animation
        setTimeout(() => {
            this.preloader.style.display = 'none';
            this.body.classList.remove('preloader-active');
        }, 800); // Match CSS transition duration
    }
    
    // Manual hide method if needed
    hide() {
        this.hidePreloader();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new SimplePreloader();
});

// Export for module system
export default SimplePreloader;