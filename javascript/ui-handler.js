// ui-handler.js

// Wait for full page load
document.addEventListener("DOMContentLoaded", () => {
  // ====== Page Load Animation ======
  const body = document.querySelector("body");
  body.classList.add("page-loaded");

  // ====== Scroll-based Reveal Animation ======
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger on load

  // ====== Smooth Scroll for Anchor Links ======
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ====== Button Click Pulse Effect ======
  const buttons = document.querySelectorAll(".btn, button, .card");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 300);
    });
  });
});
