/* ─────────────────────────────────────────────
   Orchen — script.js
   · Scroll-triggered fade-in animations
   · Sticky nav shadow on scroll
   · Mobile navigation toggle
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  // ─── Wait for DOM ───
  document.addEventListener('DOMContentLoaded', function () {

    // ─── SCROLL ANIMATIONS ───────────────────────
    // Fade-in elements with .animate-in as they enter the viewport
    var animateEls = document.querySelectorAll('.animate-in');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -48px 0px'
      });

      animateEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: just show everything if IntersectionObserver unsupported
      animateEls.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    // ─── NAV: SHADOW ON SCROLL ───────────────────
    var nav = document.getElementById('nav');
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // run once on load
    }

    // ─── MOBILE NAV TOGGLE ───────────────────────
    var toggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
      toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      // Close on link click (smooth-scroll targets)
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        }
      });
    }

    // ─── SMOOTH SCROLL POLYFILL ──────────────────
    // For browsers that don't support CSS scroll-behavior (rare now, but safe)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // ─── CONTACT FORM: SUCCESS STATE ─────────────
    // Netlify redirects to /success after submit. If you add a success page,
    // this handles client-side confirmation as a fallback.
    var form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', function () {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Sending…';
          btn.disabled = true;
        }
      });
    }

  });

})();
