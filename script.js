(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navOverlay = document.getElementById('nav-overlay');
  const backToTop = document.getElementById('back-to-top');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openMenu() {
    if (!mobileNav || !hamburger || !navOverlay) return;
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!mobileNav || !hamburger || !navOverlay) return;
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    const isOpen = mobileNav && mobileNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  function handleScroll() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('slider-dots');

  let currentSlide = 0;
  let autoSlideInterval;

  if (slides.length > 0) {
    if (dotsContainer) {
      slides.forEach(function (_, index) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', function () {
          goToSlide(index);
          resetAutoSlide();
        });

        dotsContainer.appendChild(dot);
      });
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlide() {
      slides.forEach(function (s) { s.classList.remove('active'); });
      dots.forEach(function (d) { d.classList.remove('active'); });
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlide();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoSlide();
      });
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
  window.addEventListener('orientationchange', closeMenu);

  if (mobileNav) {
    mobileNav.setAttribute('aria-hidden', 'true');
  }
})();

