/* ============================================
   YLZ MEDIA — Main JavaScript
   Cursor / Reveal / Counter / Marquee / Portfolio / Lightbox / Form
============================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     Custom Cursor
  ───────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .filter-btn, .portfolio-item, .service-item, .solution-step'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  }

  /* ─────────────────────────────────────────
     Navigation
  ───────────────────────────────────────── */
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveNav();
    handleScrollTop();
  }, { passive: true });

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.querySelector('.nav-cta')?.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Active nav link on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ─────────────────────────────────────────
     Scroll Reveal — Intersection Observer
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseFloat(el.dataset.delay || 0) * 1000;
          setTimeout(() => el.classList.add('is-visible'), delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ─────────────────────────────────────────
     Counter Animation
  ───────────────────────────────────────── */
  const counters = document.querySelectorAll('.count');

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const isDecimal = el.dataset.decimal === 'true';
    const target    = parseFloat(el.dataset.target);
    const duration  = 2000;
    const start     = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOut(progress) * target;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  /* ─────────────────────────────────────────
     Portfolio — cursor hover 등록
  ───────────────────────────────────────── */
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  /* ─────────────────────────────────────────
     Contact Form — 버튼 선택 인터랙션
  ───────────────────────────────────────── */

  // 예산 버튼 (단일 선택)
  const budgetBtns = document.querySelectorAll('.budget-btn');
  const budgetInput = document.getElementById('budget');
  budgetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      budgetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (budgetInput) budgetInput.value = btn.dataset.value;
    });
  });

  // 유입경로 버튼 (단일 선택)
  const sourceBtns = document.querySelectorAll('.source-btn');
  const sourceInput = document.getElementById('source');
  sourceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sourceBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (sourceInput) sourceInput.value = btn.dataset.value;
    });
  });

  // 미팅 여부 버튼 (단일 선택)
  const meetingBtns = document.querySelectorAll('.meeting-btn');
  const meetingInput = document.getElementById('meeting');
  meetingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      meetingBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (meetingInput) meetingInput.value = btn.dataset.value;
    });
  });

  /* ─────────────────────────────────────────
     Contact Form — 제출
  ───────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn     = contactForm.querySelector('.btn-submit');
      const btnText = btn.querySelector('.btn-text');
      const original = btnText.textContent;

      // 서비스 선택값 수집
      const selectedServices = Array.from(
        contactForm.querySelectorAll('input[name="services"]:checked')
      ).map((el) => el.value).join(', ');

      // 로딩 상태
      btnText.textContent = '전송 중...';
      btn.disabled = true;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const fd = new FormData(contactForm);
        await fetch('tables/contact_inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:           fd.get('name'),
            company:        fd.get('company'),
            phone:          fd.get('phone'),
            email:          fd.get('email'),
            intro:          fd.get('intro'),
            sns:            fd.get('sns'),
            services:       selectedServices,
            start_date:     fd.get('start_date'),
            end_date:       fd.get('end_date'),
            budget:         fd.get('budget'),
            project_desc:   fd.get('project_desc'),
            source:         fd.get('source'),
            source_detail:  fd.get('source_detail'),
            meeting:        fd.get('meeting'),
          }),
        });
      } catch (_) { /* silent fail */ }

      // 성공 상태
      btnText.textContent = '✓ 문의가 완료되었습니다!';
      btn.style.background = '#161616';
      btn.style.border = '1px solid #3B4EFF';

      setTimeout(() => {
        contactForm.reset();
        budgetBtns.forEach((b) => b.classList.remove('active'));
        sourceBtns.forEach((b) => b.classList.remove('active'));
        meetingBtns.forEach((b) => b.classList.remove('active'));
        btnText.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.border = '';
      }, 4000);
    });
  }

  /* ─────────────────────────────────────────
     Scroll to Top
  ───────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  function handleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────────
     Text Split — Char-by-Char Reveal
     (applies to hero-title .word elements)
  ───────────────────────────────────────── */
  function splitTextIntoChars(el) {
    const text = el.textContent.trim();
    el.textContent = '';
    el.setAttribute('aria-label', text);

    [...text].forEach((char) => {
      const charSpan  = document.createElement('span');
      charSpan.classList.add('char');
      if (char === ' ') {
        charSpan.style.display = 'inline';
        charSpan.innerHTML = '&nbsp;';
      } else {
        const inner = document.createElement('span');
        inner.classList.add('char-inner');
        inner.textContent = char;
        charSpan.appendChild(inner);
      }
      el.appendChild(charSpan);
    });
  }

  const words = document.querySelectorAll('.hero-title .word');
  words.forEach((word) => splitTextIntoChars(word));

  // Trigger hero reveal on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      const delay = parseFloat(el.dataset.delay || i * 0.1) * 1000;
      setTimeout(() => el.classList.add('is-visible'), delay + 200);
    });
  });

  /* ─────────────────────────────────────────
     Marquee — duplicate for seamless loop
  ───────────────────────────────────────── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const clone = marqueeTrack.cloneNode(true);
    marqueeTrack.parentElement.appendChild(clone);
  }

  /* ─────────────────────────────────────────
     Smooth Scroll for anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     Service Item — hover line animation
  ───────────────────────────────────────── */
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const num = item.querySelector('.service-num');
      if (num) {
        num.style.transform = 'translateX(8px)';
        num.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      }
    });
    item.addEventListener('mouseleave', () => {
      const num = item.querySelector('.service-num');
      if (num) num.style.transform = 'translateX(0)';
    });
  });

  /* ─────────────────────────────────────────
     Stagger Delay for section items
  ───────────────────────────────────────── */
  document.querySelectorAll('[data-delay]').forEach((el) => {
    el.style.transitionDelay = el.dataset.delay + 's';
  });

})();
