// Contact form handler - Fixed for Netlify Functions
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        about: this.about.value.trim()
      };

      // Basic validation
      if (!formData.name || !formData.email) {
        alert('Please fill in your name and email');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Disable submit button while sending
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Netlify Functions endpoint
        // Development: /.netlify/functions/sendtelegram
        // Production: akan otomatis menggunakan domain yang sama
        const endpoint = '/.netlify/functions/sendtelegram';
        
        console.log('Sending to:', endpoint);
        console.log('Form data:', formData);

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        console.log('Response status:', res.status);

        let data;
        try {
          data = await res.json();
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          throw new Error('Invalid response from server');
        }

        console.log('Response data:', data);

        if (res.ok && data.success) {
          // Success notification
          alert('Message sent successfully! Thank you for reaching out.');
          this.reset();
        } else {
          // Error notification
          const errorMsg = data.message || `Server error (${res.status})`;
          alert('Failed to send message: ' + errorMsg);
          console.error('Server error:', data);
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
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initContactForm;
}