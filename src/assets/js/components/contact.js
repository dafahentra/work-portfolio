const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const validateField = (field) => {
      if (!field.required && field.value.trim() === '' && field.name !== 'name' && field.name !== 'email' && field.name !== 'phone' && field.name !== 'subject') return true;

      let isValid = true;
      const value = field.value.trim();

      if (field.name === 'name' || field.name === 'subject') {
        isValid = value.length > 0;
      } else if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = value.length > 0 && emailRegex.test(value);
      } else if (field.name === 'phone') {
        const phoneDigits = value.replace(/\D/g, '');
        isValid = value.length > 0 && phoneDigits.length >= 10 && phoneDigits.length <= 15;
      }

      if (isValid) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
      return isValid;
    };

    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        phone: this.phone.value.trim(),
        subject: this.subject ? this.subject.value.trim() : '',
        about: this.about.value.trim()
      };

      let isFormValid = true;
      formInputs.forEach(input => {
        if (input.name === 'name' || input.name === 'email' || input.name === 'phone' || input.name === 'subject') {
          if (!validateField(input)) {
            isFormValid = false;
          }
        }
      });

      if (!isFormValid) {
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const encode = (data) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        };

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            'name': formData.name,
            'email': formData.email,
            'phone': formData.phone,
            'subject': formData.subject,
            'about': formData.about
          })
        });

        if (res.ok) {
          alert('Message sent successfully! Thank you for reaching out.');
          this.reset();
        } else {
          alert('Failed to send message. Please try again later.');
          console.error('Server error:', res.status);
        }
      } catch (err) {
        console.error('Request error:', err);
        alert('Error sending message: ' + err.message + '\nPlease check your internet connection and try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = initContactForm;
}