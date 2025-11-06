// assets/js/script.js
// Main site script — common utilities & initializers

/* -------------------------
   
What this file does — short description

initSmoothScroll() : Makes internal anchor links (href="#...") smooth scroll.

initBackToTop() :

initScrollSpy() : Sets the active class to the navigation based on scroll.

submitForm() : Temporary/simple form handler — will be improved later with form-validation.js.

initPage() is called on DOMContentLoaded. 

Script.js 

   ------------------------- */
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

/* Smooth scroll for internal anchors (works for links like href="#team") */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // update active class on click (optional)
      $$('.nav-link, nav a').forEach(l => l.classList && l.classList.remove('active'));
      this.classList && this.classList.add('active');
    });
  });
}

/* Back-to-top button (optional): element with id="backToTop" */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.style.display = 'block';
    else btn.style.display = 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Small utility: mark nav link active based on current scroll position */
function initScrollSpy(offset = 120) {
  const sections = $$('section[id]');
  if (!sections.length) return;

  function onScroll() {
    const fromTop = window.scrollY + offset;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.id;
      const link = document.querySelector(`nav a[href="#${id}"], .nav-link[href="#${id}"]`);
      if (!link) return;
      if (top <= fromTop && bottom > fromTop) {
        $$('.nav-link, nav a').forEach(l => l.classList && l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  // run once
  onScroll();
}

/* Simple page initializers */
function initPage() {
  // add 'animated' class to #home if exists (keeps backward compatibility with your CSS)
  const home = $('#home');
  if (home) home.classList.add('animated');

  initSmoothScroll();
  initBackToTop();
  initScrollSpy(120);

  console.log('Main script initialized ✔');
}

/* Expose a safe function for legacy inline handlers (e.g., onsubmit="submitForm(event)") */
/* NOTE: form-validation.js will later replace/augment this. For now keep a lightweight handler. */
function submitForm(event) {
  event.preventDefault();
  // basic UX: show message and reset
  
  alert("Your message has been received. We'll contact you shortly!");
  if (event.target && typeof event.target.reset === 'function') event.target.reset();
}




/* Start when DOM ready */
document.addEventListener('DOMContentLoaded', initPage);

/* Export to window so HTML inline handlers (if any) can call them */
window.submitForm = submitForm;


// js/scroll-effects.js  (append to same file)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.team-container') 
                 || document.querySelector('.portfolio-container') 
                 || document.querySelector('.services-container') 
                 || document; // fallback

  if (container) {
    container.addEventListener('click', (e) => {
      const item = e.target.closest('.team-member, .portfolio-item, .service-card');
      if (!item) return;
      // restart animation reliably:
      item.classList.remove('clicked');
      void item.offsetWidth; // force reflow
      item.classList.add('clicked');
    });
  }
});


// muhammad yasir create a fulll satck full satck wev 
//

// assets/js/data-loader.js  (or paste into script.js)

// helper to fetch JSON safely
async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.error('Error loading JSON:', path, err);
    return null;
  }
}

// populate site-info (footer + title)
async function loadSiteInfo() {
  const siteInfo = await fetchJSON('../data/site-info.json');
  if (!siteInfo) return;

  // change document title
  document.title = `${siteInfo.siteName} | ${siteInfo.tagline || ''}`;

  // footer contact (example)
  const footerContact = document.querySelector('.footer-contact');
  if (footerContact) {
    footerContact.innerHTML = `
      <h3>Contact & Location</h3>
      <p>© ${siteInfo.year} ${siteInfo.author}. All rights reserved.</p>
      <p>Location: ${siteInfo.location}</p>
      <p>Email: <a href="mailto:${siteInfo.email}">${siteInfo.email}</a></p>
      <p>Phone: ${siteInfo.phone}</p>
    `;
  }
}

// populate team section
async function loadTeam() {
  const team = await fetchJSON('../data/team.json');
  if (!team) return;
  const container = document.getElementById('team-container');
  if (!container) return;

  container.innerHTML = team.map(member => `
    <div class="team-member reveal">
      <img src="${member.image}" alt="${member.name}">
      <h4>${member.name}</h4>
      <p class="role">${member.role}</p>
    </div>
  `).join('');
}

// populate services section
async function loadServices() {
  const services = await fetchJSON('../data/services.json');
  if (!services) return;
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = services.map(s => `
    <div class="service-card reveal">
      <img src="${s.image}" alt="${s.title}">
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>
  `).join('');
}

// initialize all data
document.addEventListener('DOMContentLoaded', () => {
  loadSiteInfo();
  loadTeam();
  loadServices();
});
