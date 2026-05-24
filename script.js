/* ========================================
   EBEN HAIR & BEAUTY SALON - JAVASCRIPT
   ======================================== */

// ========= CURSOR =========
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}

animateRing();

document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1.8)';
    cursorRing.style.borderColor = 'rgba(212,175,55,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.borderColor = 'rgba(212,175,55,0.5)';
  });
});

// ========= NAV SCROLL =========
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ========= MOBILE MENU =========
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('open');
}

function closeMenuFn() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
}

menuBtn.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
menuOverlay.addEventListener('click', closeMenuFn);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenuFn));

// ========= HERO PARALLAX =========
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.35}px) scale(1.08)`;
  }
}, { passive: true });

// ========= SCROLL REVEAL =========
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ========= ANIMATED COUNTERS =========
const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = target * ease;
      el.textContent = val.toFixed(decimal) + suffix;
      if (t < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ========= LIGHTBOX =========
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('lightboxImg').src = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({target: document.getElementById('lightbox')});
});

// ========= CAROUSEL =========
(function() {
  const track = document.getElementById('carouselTrack');
  const cards = track.querySelectorAll('.review-card');

  // Carousel runs on infinite scroll animation
  // The CSS animation handles the scrolling automatically
})();
