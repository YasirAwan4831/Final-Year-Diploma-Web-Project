// File: javascript/navbar.js
// Purpose: Sticky header + active link highlight + smooth responsive menu

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav a");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav");

  //  Sticky Header on Scroll 
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  //  Smooth Scroll to Section 
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      // Active link update
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Close mobile menu on link click
      navMenu.classList.remove("open");
      menuToggle?.classList.remove("open");
    });
  });

  //  Mobile Menu Toggle 
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuToggle.classList.toggle("open");

      // Animate toggle button (optional)
      menuToggle.classList.add("bounce");
      setTimeout(() => menuToggle.classList.remove("bounce"), 300);
    });
  }

  // ===== Keyboard Accessibility (optional but recommended) =====
  document.addEventListener("keyup", e => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuToggle?.classList.remove("open");
    }
  });
});
