/*
===========================================
File: scroll-effects.js
Description: Implements scroll-based animations and
reveal effects (e.g., scroll-triggered classes).
Author: Muhammad Yasir
Project: Final-Year-Diploma-Web-Project
===========================================
*/


document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll Reveal Animation =====
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // ===== Click Pulse Animation =====
  const containers = document.querySelectorAll(
    '.team-container, .portfolio-container, .services-container'
  );

  // ہر container کے لیے الگ listener لگائیں (document پر نہیں)
  containers.forEach(container => {
    container.addEventListener('click', e => {
      const item = e.target.closest('.team-member, .portfolio-item, .service-card');
      if (!item) return;

      // restart animation smoothly
      item.classList.remove('clicked');
      void item.offsetWidth;
      item.classList.add('clicked');
    });
  });
});
