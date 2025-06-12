// Contact form handler
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: this.name.value,
        email: this.email.value,
        about: this.about.value
      };

      // Disable submit button while sending
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Ganti URL sesuai dengan server Anda
        // Development: http://localhost:3000/send-telegram
        // Production: https://your-server.com/send-telegram
        const res = await fetch('http://localhost:3000/send-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
          // Success notification
          alert('Message sent successfully!');
          this.reset();
        } else {
          // Error notification
          alert('Failed to send message: ' + data.message);
        }
      } catch (err) {
        // Network or other errors
        alert('Error sending message: ' + err.message);
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
export default initContactForm;