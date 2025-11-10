/*
===========================================
File: form-validation.js
Description: Handles client-side form validation for
contact page inputs (name, email & message).
Ensures clean data before submission.
Author: Muhammad Yasir
Project: Final-Year-Diploma-Web-Project
===========================================
*/

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (!form) return; // Exit if no form exists

  // ====== Create Floating Alert (Top Notification) ======
  const createAlert = (message, type = 'success') => {
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);

    // Add simple fade animation
    setTimeout(() => {
      alert.classList.add('show');
    }, 50);

    // Remove alert after 3 seconds
    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get all input fields
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    // Clear previous error messages (if any)
    form.querySelectorAll('.error-msg').forEach(msg => msg.remove());

    let isValid = true;

    // Helper function to show error below input field
    const showError = (input, msg) => {
      const error = document.createElement('small');
      error.className = 'error-msg';
      error.style.color = 'red';
      error.textContent = msg;
      input.insertAdjacentElement('afterend', error);
    };

    // ===== Name Validation =====
    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    // ===== Email Validation =====
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'Please enter your email');
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    // ===== Message Validation =====
    if (!message.value.trim()) {
      showError(message, 'Please enter your message');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters long');
      isValid = false;
    }

    // ===== If All Fields Are Valid =====
    if (isValid) {
      createAlert(' Thank you! Your message has been sent successfully.', 'success');
      form.reset();
    } else {
      createAlert(' Please correct the highlighted errors and try again.', 'error');
    }
  });
});
